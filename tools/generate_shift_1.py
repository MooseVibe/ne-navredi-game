#!/usr/bin/env python3
import base64
import getpass
import os
import sys
import time
import wave
from pathlib import Path


PROJECT_DIR = Path(__file__).resolve().parents[1]
OUTPUT_DIR = PROJECT_DIR / "assets" / "audio" / "shift-01"
MODEL = "gemini-3.1-flash-tts-preview"

CLIPS = (
    (
        "01-courier.wav",
        "Puck",
        "Adult man, about 27. A hurried night courier: familiar, slightly cheeky, energetic. Speak quickly but clearly, in natural neutral Russian. Keep it realistic, not cartoonish.",
        "Слушай, выручи по-братски. Мне сегодня ещё всю ночь кататься. Дай что-нибудь прям бодрое, не кофе. Рецепт, если надо, завтра занесу. Я аккуратно.",
    ),
    (
        "02-cold-medicine.wav",
        "Achernar",
        "Adult woman, about 36, tired after work but determined. Natural conversational Russian. Slight impatience, medium pace, no theatrical acting.",
        "Я пакетик от простуды выпила часа полтора назад, а голова всё равно трещит. Дайте парацетамол. Можно сразу две? Мне завтра на работу.",
    ),
    (
        "03-mnn.wav",
        "Callirrhoe",
        "Adult woman, about 31, a sleep-deprived mother. She speaks naturally, softly and a little hurriedly. Neutral Russian, realistic pharmacy conversation.",
        "Дочке четыре. Раньше врач назначал Отривин Для Детей — помогал. Сейчас нужен спрей с тем же действующим веществом, но лучше российского производителя. Какое МНН ищем?",
    ),
    (
        "03-package.wav",
        "Callirrhoe",
        "The same adult woman, about 31, a sleep-deprived mother. She now sounds reassured and practical. Neutral Russian, natural pace.",
        "МНН уточнили. Покажите теперь конкретный детский спрей с ксилометазолином. Если есть российский — возьму его.",
    ),
    (
        "04-recommendation.wav",
        "Vindemiatrix",
        "Adult woman, about 34, with a small child. She is attentive and doubtful, but polite. Natural neutral Russian, medium pace.",
        "Сыну полтора года, сильный насморк. Хочу именно промывать, не сосудосуживающие капли. Посоветуйте большой баллон, желательно российский.",
    ),
    (
        "04-objection.wav",
        "Vindemiatrix",
        "The same adult woman, about 34. Curious and mildly skeptical, asking a genuine follow-up question. Natural neutral Russian.",
        "Смотрю на ЛинАква Софт. А чем он вообще отличается от Аква Мариса Беби? Там же и там просто морская вода. Это только упаковка другая?",
    ),
    (
        "04-mode.wav",
        "Vindemiatrix",
        "The same adult woman, about 34. She compares two packages and wants a concrete explanation. Curious, practical, natural Russian.",
        "А если брать ЛинАква — почему именно Софт? Рядом стоит Норм, коробка почти такая же. Может, струя лучше промоет?",
    ),
)


def validate_manifest():
    names = [clip[0] for clip in CLIPS]
    if len(CLIPS) != 7 or len(names) != len(set(names)) or any(not name.endswith(".wav") for name in names):
        raise SystemExit("Ошибка в списке голосовых файлов")


def is_ready(path):
    try:
        with wave.open(str(path), "rb") as audio_file:
            return (
                audio_file.getnchannels() == 1
                and audio_file.getsampwidth() == 2
                and audio_file.getframerate() == 24000
                and audio_file.getnframes() > 0
            )
    except (OSError, EOFError, wave.Error):
        return False


def save_wave(path, pcm):
    path.parent.mkdir(parents=True, exist_ok=True)
    temporary = path.with_suffix(".wav.tmp")
    try:
        with wave.open(str(temporary), "wb") as audio_file:
            audio_file.setnchannels(1)
            audio_file.setsampwidth(2)
            audio_file.setframerate(24000)
            audio_file.writeframes(pcm)
        if not is_ready(temporary):
            raise RuntimeError("Получен повреждённый WAV")
        temporary.replace(path)
    finally:
        temporary.unlink(missing_ok=True)


def main():
    validate_manifest()
    if "--check" in sys.argv:
        print("OK: 7 уникальных реплик первой смены")
        return 0
    if "--ready" in sys.argv:
        return 0 if all(is_ready(OUTPUT_DIR / clip[0]) for clip in CLIPS) else 1

    api_key = os.environ.pop("GEMINI_API_KEY", None) or getpass.getpass("Вставь Gemini API key и нажми Enter: ")
    if not api_key:
        raise SystemExit("GEMINI_API_KEY не передан")

    force = "--force" in sys.argv
    from google import genai

    client = genai.Client(api_key=api_key)
    del api_key
    for index, (filename, voice, direction, transcript) in enumerate(CLIPS, 1):
        output = OUTPUT_DIR / filename
        if is_ready(output) and not force:
            print(f"[{index}/7] Уже готово: {filename}")
            continue

        prompt = f"""Synthesize speech in Russian.
Follow the character direction, but speak only the transcript.
Do not read the instructions or labels aloud.

CHARACTER DIRECTION:
{direction}

TRANSCRIPT:
{transcript}
"""
        print(f"[{index}/7] Генерирую {filename}…")
        for attempt in range(2):
            try:
                interaction = client.interactions.create(
                    model=MODEL,
                    input=prompt,
                    response_format={"type": "audio"},
                    generation_config={"speech_config": [{"voice": voice}]},
                )
                pcm = base64.b64decode(interaction.output_audio.data)
                if not pcm:
                    raise RuntimeError("Gemini вернул пустой звук")
                save_wave(output, pcm)
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
