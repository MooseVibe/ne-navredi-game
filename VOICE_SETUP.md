# Озвучка Gemini

Создайте Gemini API key в Google AI Studio, затем выполните в терминале из папки проекта:

```bash
export GEMINI_API_KEY='ваш-ключ'
python3 generate_voices.py
```

Будут созданы `assets/voices/1.wav`–`6.wav`. Ключ читается только из окружения и нигде не сохраняется.
