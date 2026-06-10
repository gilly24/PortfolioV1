/**
 * terminal.js
 * Typewriter effect for the hero floating terminal window.
 * Lines are typed at different speeds depending on type.
 */

const LINES = [
  { type: 'prompt',  text: 'ls projects/' },
  { type: 'output',  text: 'inventory-monitor/   vynl-academy/' },
  { type: 'output',  text: 'booking-system/      lab-prep/' },
  { type: 'comment', text: '6 projects, all shipping' },
  { type: 'prompt',  text: 'git status' },
  { type: 'output',  text: 'On branch main' },
  { type: 'output',  text: 'nothing to commit, working tree clean' },
  { type: 'prompt',  text: 'node --version' },
  { type: 'output',  text: 'v20.11.0' },
  { type: 'prompt',  text: 'python --version' },
  { type: 'output',  text: 'Python 3.12.0' },
];

const CHAR_DELAY  = { prompt: 60, output: 20, comment: 20 };
const LINE_PAUSE  = { prompt: 400, output: 150, comment: 150 };

export function initTerminal(delayMs = 1800) {
  const body = document.getElementById('terminalBody');
  if (!body) return;

  let lineIdx = 0;
  let charIdx = 0;

  function typeChar() {
    if (lineIdx >= LINES.length) {
      addCursor(body);
      return;
    }

    const line = LINES[lineIdx];

    // Create DOM element for this line on first char
    if (charIdx === 0) {
      const el = document.createElement('span');
      el.className = `terminal-line ${line.type}`;
      el.dataset.lineIdx = lineIdx;
      body.appendChild(el);
    }

    const el = body.querySelector(`[data-line-idx="${lineIdx}"]`);
    if (!el) return;

    if (charIdx < line.text.length) {
      el.textContent = line.text.slice(0, charIdx + 1);
      charIdx++;
      setTimeout(typeChar, CHAR_DELAY[line.type] ?? 40);
    } else {
      lineIdx++;
      charIdx = 0;
      setTimeout(typeChar, LINE_PAUSE[line.type] ?? 200);
    }
  }

  setTimeout(typeChar, delayMs);
}

function addCursor(body) {
  if (body.querySelector('.terminal-cursor')) return;
  const line   = document.createElement('span');
  line.className = 'terminal-line prompt';
  const cursor = document.createElement('span');
  cursor.className = 'terminal-cursor';
  line.appendChild(cursor);
  body.appendChild(line);
}
