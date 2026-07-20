#!/bin/zsh
set -eu

PROJECT_DIR="${0:A:h}"
VENV_DIR="$PROJECT_DIR/.venv-tts-312"
PYTHON="$VENV_DIR/bin/python"
GENERATOR="$PROJECT_DIR/tools/generate_shift_1.py"
PORT=4174

on_exit() {
  local exit_code=$?
  if (( exit_code != 0 )); then
    echo
    echo "Не получилось завершить настройку. Текст ошибки находится выше."
    echo "Нажми любую клавишу, чтобы закрыть окно."
    read -k 1
  fi
}
trap on_exit EXIT

cd "$PROJECT_DIR"
echo "НЕ НАВРЕДИ · ОЗВУЧКА ПЕРВОЙ СМЕНЫ"
echo

if [[ "${1:-}" == "--check" ]]; then
  python3 "$GENERATOR" --check
  echo "OK: Mac-запускатель готов"
  exit 0
fi

if ! command -v brew >/dev/null 2>&1 && [[ -x /opt/homebrew/bin/brew ]]; then
  export PATH="/opt/homebrew/bin:$PATH"
fi
if ! command -v brew >/dev/null 2>&1; then
  echo "На Маке не найден Homebrew. Установи его с https://brew.sh/ и запусти файл снова."
  exit 1
fi

PYTHON_HOME="$(brew --prefix python@3.12 2>/dev/null || true)"
PYTHON312="$PYTHON_HOME/bin/python3.12"
if [[ ! -x "$PYTHON312" ]]; then
  echo "Один раз устанавливаю Python 3.12 через Homebrew…"
  brew install python@3.12
  PYTHON_HOME="$(brew --prefix python@3.12)"
  PYTHON312="$PYTHON_HOME/bin/python3.12"
fi

if [[ ! -x "$PYTHON" ]]; then
  echo "Создаю отдельное окружение…"
  "$PYTHON312" -m venv "$VENV_DIR"
fi

if "$PYTHON" "$GENERATOR" --ready; then
  echo "Все 7 реплик уже готовы — повторно деньги не списываю."
else
  if ! "$PYTHON" -c 'import importlib.metadata as m; raise SystemExit(0 if m.version("google-genai") == "2.12.1" else 1)' >/dev/null 2>&1; then
    echo "Один раз устанавливаю официальный Gemini SDK…"
    "$PYTHON" -m pip install 'google-genai==2.12.1'
  fi
  "$PYTHON" "$GENERATOR"
fi

echo
echo "Озвучка подключена. Открываю игру…"

if ! curl -fsS --max-time 1 "http://127.0.0.1:$PORT/" >/dev/null 2>&1; then
  nohup python3 -m http.server "$PORT" --directory "$PROJECT_DIR" >"${TMPDIR:-/tmp}/ne-navredi-shifts-http.log" 2>&1 &
  sleep 1
fi

open "http://127.0.0.1:$PORT/"
echo "Готово. Ключ нигде не сохранён."
echo "Нажми любую клавишу, чтобы закрыть это окно."
read -k 1
