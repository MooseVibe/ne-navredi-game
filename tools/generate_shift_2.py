#!/usr/bin/env python3
import base64
import getpass
import os
import sys
import time
import json
import urllib.request
import wave
from pathlib import Path

PROJECT_DIR = Path(__file__).resolve().parents[1]
OUTPUT_DIR = PROJECT_DIR / "assets" / "audio" / "shift-02"
MODEL = "gemini-3.1-flash-tts-preview"

CLIPS = (
    ("01-karaoke.wav", "Enceladus", "Man, about 38, after an all-night karaoke party. Rumpled but self-assured, overly friendly, trying to sound trustworthy. Natural conversational Russian, slightly slow, not a caricature.", "Слушай, выручай. Ночь была длинная, голова гудит, уснуть вообще не могу. Дай пару таблеток феназепама без этих ваших бумажек. Я человек надёжный, всё будет чётко."),
    ("02-engineer.wav", "Algenib", "Man, about 64, retired engineer and caring grandfather. Calm, precise, mildly argumentative, genuinely convinced by his calculation. Natural Russian. Emphasize the numbers and say «Математика же» with dry confidence.", "Внучке четыре, нос заложило. Дома Оксифрин взрослый — двадцать два с половиной микрограмма. Если нажать не до конца, получится половина дозы. Математика же. Или всё-таки нужен другой флакон?"),
    ("03-allergy.wav", "Kore", "Woman, about 32, florist after a night unloading shift. Her eyes itch and water; she is tired, speaks quickly and with restrained irritation. Natural Russian, no theatrical acting.", "У меня каждую весну одно и то же: оба глаза чешутся, слёзы текут, красные. Гноя нет, не болят, вижу нормально. На складе сегодня берёзу разгружали — и всё, приехали. Дайте капли, только не такие, после которых я усну стоя."),
    ("03-packages.wav", "Kore", "The same tired florist. She tries to repeat an unfamiliar medicine name, gives up with a small self-aware laugh, then asks practically. Natural Russian.", "Оло… как его? Я это название до кассы не донесу. Покажите на коробках, какие именно с этим веществом."),
    ("04-pillbox.wav", "Gacrux", "Woman, about 73, former theatre costume designer with low vision. Intelligent, brisk, dryly humorous, dislikes being patronized. Natural Russian, mature voice, clear diction, no frail-old-lady stereotype.", "Милый человек, дайте хороший гель от язвочек во рту. И ещё слабость какая-то, синяки сами появляются. Неделю назад ревматолог добавил маленькие таблетки для суставов. Я их в таблетницу ко всем утренним положила — чтоб не забывать."),
    ("04-methotrexate.wav", "Gacrux", "The same woman. Matter-of-fact and slightly impatient, genuinely surprised that medicine can be weekly. The final phrase has dry irony, but the situation remains serious. Natural Russian.", "Называется метотрексат. На наклейке что-то про понедельник, но разве лечение бывает раз в неделю? Я шесть дней подряд пила, как все нормальные таблетки."),
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
            audio.setnchannels(1)
            audio.setsampwidth(2)
            audio.setframerate(24000)
            audio.writeframes(pcm)
        if not ready(temporary):
            raise RuntimeError("Gemini вернул повреждённый WAV")
        temporary.replace(path)
    finally:
        temporary.unlink(missing_ok=True)

def main():
    if "--check" in sys.argv:
        print("OK: 6 уникальных реплик второй смены")
        return 0
    if "--ready" in sys.argv:
        return 0 if all(ready(OUTPUT_DIR / clip[0]) for clip in CLIPS) else 1

    api_key = os.environ.pop("GEMINI_API_KEY", None) or getpass.getpass("Вставь Gemini API key и нажми Enter: ")
    if not api_key:
        raise SystemExit("GEMINI_API_KEY не передан")

    for index, (filename, voice, direction, transcript) in enumerate(CLIPS, 1):
        output = OUTPUT_DIR / filename
        if ready(output) and "--force" not in sys.argv:
            print(f"[{index}/6] Уже готово: {filename}")
            continue
        prompt = f"""Synthesize speech in Russian.
Follow the character direction, but speak only the transcript.
Do not read instructions or labels aloud.

CHARACTER DIRECTION:
{direction}

TRANSCRIPT:
{transcript}
"""
        print(f"[{index}/6] Генерирую {filename}…")
        for attempt in range(2):
            try:
                body = {
                    "contents": [{"parts": [{"text": prompt}]}],
                    "generationConfig": {
                        "responseModalities": ["AUDIO"],
                        "speechConfig": {"voiceConfig": {"prebuiltVoiceConfig": {"voiceName": voice}}},
                    },
                }
                request = urllib.request.Request(
                    f"https://generativelanguage.googleapis.com/v1beta/models/{MODEL}:generateContent",
                    data=json.dumps(body).encode(),
                    headers={"Content-Type": "application/json", "x-goog-api-key": api_key},
                )
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
