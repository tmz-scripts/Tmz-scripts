document.getElementById('year').textContent = new Date().getFullYear();
const intro = document.getElementById('intro');
document.getElementById('enterBtn').addEventListener('click',()=>intro.classList.add('hidden'));
const drawer=document.getElementById('drawer');
document.getElementById('menuBtn').addEventListener('click',()=>drawer.classList.add('open'));
document.getElementById('closeDrawer').addEventListener('click',()=>drawer.classList.remove('open'));
document.querySelectorAll('.drawer-link').forEach(a=>a.addEventListener('click',()=>drawer.classList.remove('open')));
const q=document.getElementById('search');const grid=document.getElementById('grid');
q.addEventListener('input',e=>{const term=e.target.value.toLowerCase();grid.querySelectorAll('.card').forEach(card=>{const hay=(card.innerText+(card.dataset.tags||'')).toLowerCase();card.style.display=hay.includes(term)?'':'none'})});
