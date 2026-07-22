#!/bin/zsh
set -eu

PROJECT_DIR="${0:A:h}"
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

if python3 "$GENERATOR" --ready; then
  echo "Все реплики уже готовы — повторно деньги не списываю."
else
  python3 "$GENERATOR"
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
