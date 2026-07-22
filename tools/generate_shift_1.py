#!/usr/bin/env python3
import base64
import getpass
import json
import os
import sys
import time
import urllib.request
import wave
from pathlib import Path

PROJECT_DIR = Path(__file__).resolve().parents[1]
OUTPUT_DIR = PROJECT_DIR / "assets" / "audio" / "shift-01"
MODEL = "gemini-3.1-flash-tts-preview"

COURIER = "Man, about 27, a hurried night courier. Familiar and slightly cheeky, but fully realistic. Natural conversational Russian, quick pace, no theatrical acting."
COLD = "Woman, about 36, tired after work and focused on getting through tomorrow. Natural conversational Russian, slightly impatient, no theatrical acting."
MOTHER = "Woman, about 31, mother of a four-year-old child. Calm, practical, slightly tired. Natural conversational Russian, no advertising intonation."
RINSE = "Woman, about 34, mother of a one-and-a-half-year-old child. Attentive, doubtful and polite. Natural conversational Russian, no advertising intonation."

CLIPS = (
    ("01-courier-request.wav", "Puck", COURIER, "Привет, слушай, выручи по-братски. Мне сегодня ещё всю ночь кататься. Две чашки кофе выпил — вообще не помогает. Дай что-нибудь прям бодрое. Рецепт завтра занесу."),
    ("01-courier-sold.wav", "Puck", COURIER + " Warm, sincerely grateful and relieved.", "Спасибо огромное, вы очень выручили. С меня шоколадка, честно."),
    ("01-courier-refused.wav", "Puck", COURIER + " Offended and passive-aggressive, trying to make the pharmacist regret the refusal.", "Ну и ладно. Не здесь, так в соседней аптеке продадут. Там, наверное, деньги нужнее."),
    ("01-courier-energy.wav", "Puck", COURIER + " Quick and satisfied, already planning what to do.", "Давайте два. Один сейчас, второй потом."),
    ("01-courier-dismissed.wav", "Puck", COURIER + " Cold, disappointed, with restrained sarcasm.", "Ясно. Спасибо за помощь."),
    ("02-cold-request.wav", "Achernar", COLD, "Добрый день. Я пакетик от простуды выпила часа полтора назад, а голова всё равно трещит. Можно, пожалуйста, пару таблеток парацетамола? Мне завтра на работу, нужно, чтобы голова перестала болеть."),
    ("02-cold-sold.wav", "Achernar", COLD + " Grateful and matter-of-fact, confident in her plan.", "Спасибо большое. Сейчас ещё пару таблеток выпью — к утру должно отпустить."),
    ("02-cold-checked.wav", "Achernar", COLD + " Genuinely surprised, then relieved and grateful.", "А, там уже был парацетамол? Хорошо, что вы спросили. Спасибо вам огромное."),
    ("02-cold-ibuprofen.wav", "Achernar", COLD + " Tired, willing to take anything that might work.", "Ибупрофен? Давайте. Лишь бы подействовало."),
    ("02-cold-doctor.wav", "Achernar", COLD + " Surprised and mildly irritated by an impractical suggestion.", "К врачу из-за головы? Да мне завтра на работу."),
    ("03-analogue-request.wav", "Callirrhoe", MOTHER, "Здравствуйте. Дочке четыре года. Раньше врач назначал детский Отривин — хорошо помогал. Сейчас хочется попробовать другой спрей с тем же действующим веществом. Что можете предложить?"),
    ("03-analogue-correct.wav", "Callirrhoe", MOTHER + " She checks an old package photo while speaking.", "Да, на фотографии тоже ксилометазолин. А что с ним есть для детей?"),
    ("03-analogue-wrong.wav", "Callirrhoe", MOTHER + " Doubtful and concerned after noticing a mismatch in the old package photo.", "Подождите, а на фотографии ксилометазолин написан. Вы точно то же самое предлагаете?"),
    ("03-analogue-bought.wav", "Callirrhoe", MOTHER + " Calm, reassured, making a purchase.", "Да, давайте попробуем. Спасибо."),
    ("03-analogue-left.wav", "Callirrhoe", MOTHER + " Polite but no longer trusting the recommendation.", "Нет, знаете, я лучше ничего не буду брать. Вдруг опять что-нибудь перепутаем."),
    ("04-rinse-request.wav", "Vindemiatrix", RINSE, "Здравствуйте. Сыну полтора года, нос заложен. Хочу промывать морской водой, без сосудосуживающих. Смотрю на ЛинАква Софт и Норм — коробки почти одинаковые. Какой лучше взять?"),
    ("04-rinse-correct.wav", "Vindemiatrix", RINSE + " Relieved that she asked, then asks a practical follow-up.", "Ага, Норм только с двух лет. Хорошо, что спросила. А Софт чем-нибудь отличается от детского Аква Мариса или там всё одинаковое?"),
    ("04-rinse-wrong.wav", "Vindemiatrix", RINSE + " Concerned after noticing the age label, carefully challenges the recommendation.", "Подождите, здесь на Норме написано с двух лет. А моему полтора. Может, всё-таки не его? И чем Софт отличается от детского Аква Мариса?"),
    ("04-rinse-bought.wav", "Vindemiatrix", RINSE + " Reassured and grateful, making a purchase.", "Понятно. Тогда давайте ЛинАква Софт. Спасибо, что объяснили."),
    ("04-rinse-left.wav", "Vindemiatrix", RINSE + " Polite but unconvinced, deciding not to buy.", "Нет, спасибо. Я лучше ещё раз уточню и потом решу."),
)

def ready(path):
    try:
        with wave.open(str(path), "rb") as audio:
            return audio.getnchannels() == 1 and audio.getsampwidth() == 2 and audio.getframerate() == 24000 and audio.getnframes() > 0
    except (OSError, EOFError, wave.Error):
        return False

def save(path, pcm):
    path.parent.mkdir(parents=True, exist_ok=True)
    temporary = path.with_suffix(".wav.tmp")
    try:
        with wave.open(str(temporary), "wb") as audio:
            audio.setnchannels(1); audio.setsampwidth(2); audio.setframerate(24000); audio.writeframes(pcm)
        if not ready(temporary):
            raise RuntimeError("Gemini вернул повреждённый WAV")
        temporary.replace(path)
    finally:
        temporary.unlink(missing_ok=True)

def main():
    names = [clip[0] for clip in CLIPS]
    if len(names) != len(set(names)):
        raise SystemExit("В манифесте повторяются имена файлов")
    if "--check" in sys.argv:
        print(f"OK: {len(CLIPS)} уникальных реплик первой смены")
        return 0
    if "--ready" in sys.argv:
        return 0 if all(ready(OUTPUT_DIR / name) for name in names) else 1

    api_key = os.environ.pop("GEMINI_API_KEY", None) or getpass.getpass("Вставь Gemini API key и нажми Enter: ")
    if not api_key:
        raise SystemExit("GEMINI_API_KEY не передан")

    for index, (filename, voice, direction, transcript) in enumerate(CLIPS, 1):
        output = OUTPUT_DIR / filename
        if ready(output) and "--force" not in sys.argv:
            print(f"[{index}/{len(CLIPS)}] Уже готово: {filename}")
            continue
        prompt = f"""Synthesize speech in Russian.
Follow the character direction, but speak only the transcript.
Do not read instructions or labels aloud.

CHARACTER DIRECTION:
{direction}

TRANSCRIPT:
{transcript}
"""
        print(f"[{index}/{len(CLIPS)}] Генерирую {filename}…")
        for attempt in range(2):
            try:
                body = {"contents": [{"parts": [{"text": prompt}]}], "generationConfig": {"responseModalities": ["AUDIO"], "speechConfig": {"voiceConfig": {"prebuiltVoiceConfig": {"voiceName": voice}}}}}
                request = urllib.request.Request(f"https://generativelanguage.googleapis.com/v1beta/models/{MODEL}:generateContent", data=json.dumps(body).encode(), headers={"Content-Type": "application/json", "x-goog-api-key": api_key})
                with urllib.request.urlopen(request, timeout=120) as response:
                    result = json.load(response)
                pcm = base64.b64decode(result["candidates"][0]["content"]["parts"][0]["inlineData"]["data"])
                save(output, pcm)
                break
            except Exception:
                if attempt:
                    raise
                print("  Временная ошибка, повторяю один раз…")
                time.sleep(2)
    print(f"Готово: {OUTPUT_DIR}")
    return 0

if __name__ == "__main__":
    raise SystemExit(main())
