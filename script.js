document.getElementById('y').textContent=new Date().getFullYear();
document.getElementById('enterBtn').addEventListener('click',()=>document.getElementById('intro').classList.add('hidden'));
document.getElementById('openMenu').addEventListener('click',()=>document.getElementById('sidebar').classList.add('open'));
document.getElementById('closeMenu').addEventListener('click',()=>document.getElementById('sidebar').classList.remove('open'));
