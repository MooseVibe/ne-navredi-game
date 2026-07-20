#!/usr/bin/env python3
"""Generate six character voices. Requires GEMINI_API_KEY."""
import base64, json, os, time, urllib.request, wave
from pathlib import Path

MODEL = "gemini-3.1-flash-tts-preview"
OUT = Path(__file__).parent / "assets" / "voices"
SCENES = [
    ("Puck", "Нервный мужчина старается казаться спокойным. Говорит быстро и заговорщически. Перед «посильнее» пауза, «я постоянный» — с нелепой самоуверенностью.", "Мне бы чего-нибудь… ну, чтобы всю ночь не спать. И посильнее. Рецепта нет, но я постоянный."),
    ("Callirrhoe", "Пожилая женщина говорит громко и неторопливо, уверенно, но теряет нить. Комедийные паузы; «синяя» — важнейшая улика.", "Милок, дай те таблетки, которые по телевизору от сердца. Название синее… или коробочка синяя?"),
    ("Leda", "Ребёнок проводит секретную операцию. Заговорщический тихий голос, торопливо и очень серьёзно; про вкусное — с надеждой.", "У меня живот болит. Мама в машине. Можно что-нибудь вкусное, которое лечит?"),
    ("Kore", "Уставшая беременная женщина, доброжелательно, но настойчиво. «Травки же» — с уверенностью интернет-эксперта.", "Отёки замучили. Дайте что-нибудь натуральное мочегонное — травки же точно безопасны?"),
    ("Enceladus", "Мужчина после застолья изо всех сил изображает трезвого профессора. Медленно, чрезмерно чётко; после «пару рюмок» неловкая пауза.", "Башка раскалывается. Дай сильное обезболивающее. Да я всего пару рюмок, нормально всё."),
    ("Aoede", "Героиня скандального прямого эфира: торжественно, громко и театрально. «Назовите закон» — кульминация судебной драмы.", "Почему вы не продаёте антибиотик без рецепта? Назовите закон. Я веду прямой эфир."),
]

def generate(number, voice, direction, transcript, key):
    target = OUT / f"{number}.wav"
    if target.exists() and target.stat().st_size > 44:
        print(f"↷ {number}.wav — already exists")
        return
    prompt = f"Synthesize speech in Russian. Do not read instructions aloud.\nDirector's notes: {direction}\nSpoken transcript only:\n{transcript}"
    body = {"contents":[{"parts":[{"text":prompt}]}],"generationConfig":{"responseModalities":["AUDIO"],"speechConfig":{"voiceConfig":{"prebuiltVoiceConfig":{"voiceName":voice}}}}}
    request = urllib.request.Request(f"https://generativelanguage.googleapis.com/v1beta/models/{MODEL}:generateContent", data=json.dumps(body).encode(), headers={"Content-Type":"application/json", "x-goog-api-key":key})
    for attempt in range(5):
        try:
            with urllib.request.urlopen(request, timeout=120) as response: result = json.load(response)
            pcm = base64.b64decode(result["candidates"][0]["content"]["parts"][0]["inlineData"]["data"])
            with wave.open(str(target), "wb") as audio:
                audio.setnchannels(1); audio.setsampwidth(2); audio.setframerate(24000); audio.writeframes(pcm)
            print(f"✓ {number}.wav — {voice}")
            return
        except Exception as error:
            if attempt == 4: raise
            wait = 30 * (attempt + 1)
            print(f"  Gemini временно недоступен ({error.__class__.__name__}); повтор через {wait} сек.")
            time.sleep(wait)

def main():
    key = os.environ.get("GEMINI_API_KEY")
    if not key: raise SystemExit("Set GEMINI_API_KEY first; it is never saved by this script.")
    OUT.mkdir(parents=True, exist_ok=True)
    for i, scene in enumerate(SCENES, 1): generate(i, *scene, key)

if __name__ == "__main__": main()
