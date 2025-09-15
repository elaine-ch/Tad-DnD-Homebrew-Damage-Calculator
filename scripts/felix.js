// v2-space-search-fullname-fix
// Fixes:
// - Photo lookup is robust to full vs first+last names (normalizes & falls back)
// - Search matches ANY token (first/middle/last), supports partial matches

const personPhotoMap = new Map();

function normalizeName(s) {
  return (s || '')
    .toLowerCase()
    .replace(/[\u2019'`.]/g, ' ')     // apostrophes/backticks -> space
    .replace(/[.,]/g, ' ')            // punctuation -> space
    .replace(/[-]/g, ' ')             // hyphens -> space (split double-barrels)
    .replace(/\s+/g, ' ')             // collapse whitespace
    .trim();
}

async function loadData() {
  try {
    const res = await fetch('family.json', { cache: 'no-store' });
    if (!res.ok) throw new Error(`Failed to load data.json: ${res.status}`);
    const data = await res.json();
    for (const p of data) {
      if (p && p.name && p.photo) {
        personPhotoMap.set(normalizeName(p.name), p.photo);
      }
    }
  } catch (err) {
    console.error(err);
  }
}

function splitTokens(full) {
  return normalizeName(full).split(' ').filter(Boolean);
}

function removeHighlights() {
  document.querySelectorAll('.person.match').forEach(el => el.classList.remove('match'));
}

function highlightByAnyName(q) {
  removeHighlights();
  const normQ = normalizeName(q);
  if (!normQ) return;

  const queries = normQ.split(' ').filter(Boolean);
  if (!queries.length) return;

  document.querySelectorAll('.person').forEach(btn => {
    const full = btn.dataset.fullname || btn.textContent;
    const tokens = splitTokens(full);
    const hit = queries.some(part => tokens.some(t => t.includes(part)));
    if (hit) btn.classList.add('match');
  });

  const first = document.querySelector('.person.match');
  if (first) first.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
}

function photoPathFor(fullName) {
  // 1) Try normalized full name
  const keyFull = normalizeName(fullName);
  if (personPhotoMap.has(keyFull)) return personPhotoMap.get(keyFull);

  // 2) Try FIRST + LAST only
  const tokens = splitTokens(fullName);
  if (tokens.length >= 2) {
    const firstLast = normalizeName(tokens[0] + ' ' + tokens[tokens.length - 1]);
    if (personPhotoMap.has(firstLast)) return personPhotoMap.get(firstLast);
  }

  // 3) Fuzzy: find a unique entry that shares first AND last token
  if (tokens.length >= 2) {
    const first = tokens[0];
    const last = tokens[tokens.length - 1];
    const candidates = [];
    for (const [k, v] of personPhotoMap.entries()) {
      const parts = k.split(' ');
      if (parts.includes(first) && parts.includes(last)) candidates.push(v);
    }
    if (candidates.length === 1) return candidates[0];
  }

  return null;
}

function togglePhoto(btn) {
  const wrapper = btn.nextElementSibling;
  if (!wrapper || !wrapper.classList.contains('photo')) return;

  const fullName = (btn.dataset.fullname || btn.textContent || '').trim();

  const opening = !wrapper.classList.contains('open');
  if (!opening) {
    wrapper.classList.remove('open');
    wrapper.setAttribute('aria-hidden', 'true');
    btn.setAttribute('aria-expanded', 'false');
    wrapper.innerHTML = '';
    return;
  }

  const src = photoPathFor(fullName);

  // Build content with full name heading + image or placeholder
  const heading = document.createElement('div');
  heading.className = 'full-name';
  heading.textContent = fullName;

  wrapper.innerHTML = '';
  wrapper.appendChild(heading);

  if (src) {
    const img = document.createElement('img');
    img.src = src;
    img.alt = fullName;
    img.loading = 'lazy';
    wrapper.appendChild(img);
  } else {
    const msg = document.createElement('div');
    msg.className = 'placeholder';
    msg.textContent = `No photo found for ${fullName} (check data.json).`;
    wrapper.appendChild(msg);
  }

  requestAnimationFrame(() => {
    wrapper.classList.add('open');
    wrapper.setAttribute('aria-hidden', 'false');
    btn.setAttribute('aria-expanded', 'true');
  });
}

function wireUpUI() {
  document.querySelectorAll('.person').forEach(btn => {
    btn.addEventListener('click', () => togglePhoto(btn));
    btn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        togglePhoto(btn);
      }
    });
  });

  const form = document.getElementById('search-form');
  const input = document.getElementById('search-input');
  const clearBtn = document.getElementById('clear-btn');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    highlightByAnyName(input.value);
  });
  clearBtn.addEventListener('click', () => {
    input.value = '';
    removeHighlights();
    input.focus();
  });
}

document.addEventListener('DOMContentLoaded', async () => {
  await loadData();
  wireUpUI();
});
