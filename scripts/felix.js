// Client-only demo logic
// 1) Load the photo data from data.json
// 2) Toggle photos on name click
// 3) Highlight matches by FIRST name via the search box

const personPhotoMap = new Map();

async function loadData() {
  try {
    const res = await fetch('family.json', { cache: 'no-store' });
    if (!res.ok) throw new Error(`Failed to load data.json: ${res.status}`);
    const data = await res.json();
    for (const p of data) {
      if (p && p.name && p.photo) {
        personPhotoMap.set(p.name.trim().toLowerCase(), p.photo);
      }
    }
  } catch (err) {
    console.error(err);
  }
}

function firstNameOf(full) {
  // Take first token (split on spaces or hyphen)
  return (full || '').trim().split(/\s|-/)[0] || '';
}

function removeHighlights() {
  document.querySelectorAll('.person.match').forEach(el => el.classList.remove('match'));
}

function highlightByFirstName(q) {
  removeHighlights();
  if (!q) return;
  const query = q.trim().toLowerCase();

  const people = document.querySelectorAll('.person');
  people.forEach(btn => {
    const full = btn.dataset.name || btn.textContent;
    const first = firstNameOf(full).toLowerCase();
    if (first === query) {
      btn.classList.add('match');
      // Optionally bring into view if off-screen
      btn.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
    }
  });
}

function togglePhoto(btn) {
  const wrapper = btn.nextElementSibling; // the .photo div directly after the button
  if (!wrapper || !wrapper.classList.contains('photo')) return;

  const fullName = (btn.dataset.name || btn.textContent || '').trim();
  const key = fullName.toLowerCase();
  const src = personPhotoMap.get(key);

  if (wrapper.classList.contains('open')) {
    wrapper.classList.remove('open');
    wrapper.setAttribute('aria-hidden', 'true');
    btn.setAttribute('aria-expanded', 'false');
    wrapper.innerHTML = '';
    return;
  }

  // opening
  wrapper.innerHTML = '';
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

  // Let layout apply before opening to animate nicely
  requestAnimationFrame(() => {
    wrapper.classList.add('open');
    wrapper.setAttribute('aria-hidden', 'false');
    btn.setAttribute('aria-expanded', 'true');
  });
}

function wireUpUI() {
  // Click handlers for each person button
  document.querySelectorAll('.person').forEach(btn => {
    btn.addEventListener('click', () => togglePhoto(btn));
    btn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        togglePhoto(btn);
      }
    });
  });

  // Search handling
  const form = document.getElementById('search-form');
  const input = document.getElementById('search-input');
  const clearBtn = document.getElementById('clear-btn');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    highlightByFirstName(input.value);
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
