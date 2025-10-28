const data = [
  { tag:'Recent Announcement', time:'21:10', timeTag:'time-tag-red', title:'Recent Announcement',
    content:'The University Research and Development Services (URDS) invites all faculty researchers to submit proposals.', date:'Oct 11, 2025'},
  { tag:'Latest Update', time:'18:23', timeTag:'time-tag-orange', title:'Latest Update',
    content:'URDS is now accepting applications for the Student Research Assistance Fund for AY 2024-2025.', date:'Oct 8, 2025'},
  { tag:'Previous Announcement', time:'14:00', timeTag:'time-tag-purple', title:'Previous Announcement',
    content:'Call for Paper Presentations for the upcoming Annual Research and Innovation Conference 2025.', date:'Sept 28, 2025'},
  { tag:'Old Notice', time:'10:30', timeTag:'time-tag-green', title:'Earlier Notice',
    content:'Reminder: Final report submission schedule updated.', date:'Sep 10, 2025'},
  { tag:'Recent Announcement', time:'21:10', timeTag:'time-tag-red', title:'Recent Announcement',
    content:'The University Research and Development Services (URDS) invites all faculty researchers to submit proposals.', date:'Oct 11, 2025'},
  { tag:'Latest Update', time:'18:23', timeTag:'time-tag-orange', title:'Latest Update',
    content:'URDS is now accepting applications for the Student Research Assistance Fund for AY 2024-2025.', date:'Oct 8, 2025'},
  { tag:'Previous Announcement', time:'14:00', timeTag:'time-tag-purple', title:'Previous Announcement',
    content:'Call for Paper Presentations for the upcoming Annual Research and Innovation Conference 2025.', date:'Sept 28, 2025'},
  { tag:'Old Notice', time:'10:30', timeTag:'time-tag-green', title:'Earlier Notice',
    content:'Reminder: Final report submission schedule updated.', date:'Sep 10, 2025'}
];

function buildHistoryCard(item) {
  const wrap = document.createElement('div');
  wrap.className = 'history-card';

  const left = document.createElement('div');
  left.className = 'time-mini ' + item.timeTag;
  left.innerHTML = `<div class="mini-day">${item.tag.replace(' Announcement','')}</div><div class="mini-clock">${item.time}</div>`;

  const content = document.createElement('div');
  content.className = 'history-content';
  content.innerHTML = `<h4>${item.title}</h4><p>${item.content}</p><div class="history-date">${item.date}</div>`;

  const icon = document.createElement('div');
  icon.className = 'history-icon';
  icon.innerHTML = `<img src="../asset/MPhone.png" alt="icon">`;

  wrap.appendChild(left);
  wrap.appendChild(content);
  wrap.appendChild(icon);

  return wrap;
}

// populate
const histBox = document.getElementById('historyList');
data.forEach(d => histBox.appendChild(buildHistoryCard(d)));

// search filter
document.getElementById('searchInput').addEventListener('input', (e) => {
  const q = e.target.value.toLowerCase().trim();
  document.querySelectorAll('.history-card').forEach(card => {
    const text = card.textContent.toLowerCase();
    card.style.display = text.includes(q) ? 'flex' : 'none';
  });
});

// "New Announcement" button
document.getElementById('newBtn').addEventListener('click', () => {
  const title = prompt('New announcement title', 'New Maintenance Notice');
  if (!title) return;
  const content = prompt('Content', 'Planned maintenance next week.');
  const time = '12:00';
  const date = new Date().toLocaleDateString();
  const newItem = { tag: 'New', time, timeTag: 'time-tag-green', title, content, date };
  histBox.prepend(buildHistoryCard(newItem));
  const n = Number(document.getElementById('notifCount').textContent.replace('+', '')) || 0;
  document.getElementById('notifCount').textContent = (n + 1) + '+';
});
