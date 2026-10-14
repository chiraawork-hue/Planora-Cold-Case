'use strict';
const REVIEW_KEY='planora_cc_reviews_v1';
let reviews={};try{reviews=JSON.parse(localStorage.getItem(REVIEW_KEY)||'{}')}catch(e){}
function reviewSection(i){
const saved=reviews[i]||{};
return '<section class="case-review"><h3>CASE REVIEW / BABAK '+(i+1)+'</h3><p>Pilih tersangka utama, lalu pertanggungjawabkan kesimpulanmu berdasarkan berkas.</p><label>Tersangka utama</label><select id="reviewSuspect"><option value="">— PILIH TERSANGKA —</option>'+suspect.map(s=>'<option value="'+s.id+'" '+(saved.id===s.id?'selected':'')+'>'+s.name+'</option>').join('')+'</select><label>Kode atau nama bukti</label><input id="reviewEvidence" placeholder="Contoh: WO_C7_0917" value="'+(saved.evidence||'').replace(/"/g,'&quot;')+'"><label>Alasan investigasi</label><textarea id="reviewReason" placeholder="Jelaskan alasanmu...">'+(saved.reason||'').replace(/</g,'&lt;')+'</textarea><button class="primary" onclick="submitReview('+i+')">SIMPAN JAWABAN BABAK</button><p id="reviewStatus" class="feedback"></p></section>';
}
function submitReview(i){
const id=document.getElementById('reviewSuspect').value;
const evidence=document.getElementById('reviewEvidence').value.trim();
const reason=document.getElementById('reviewReason').value.trim();
const msg=document.getElementById('reviewStatus');
if(!id||!evidence||reason.length<15){msg.textContent='Pilih tersangka, masukkan bukti, dan jelaskan alasan minimal 15 karakter.';return}
reviews[i]={id,evidence,reason};localStorage.setItem(REVIEW_KEY,JSON.stringify(reviews));
msg.textContent='KEPUTUSAN TERSIMPAN. Kamu dapat merevisi jawaban setelah menemukan bukti baru.';
}
function openSuspectPicker(){const root=document.getElementById('modalBody');if(!root)return;const overlay=document.createElement('div');overlay.id='suspectPickerOverlay';overlay.className='suspect-picker-overlay';overlay.innerHTML='<div class="suspect-picker-panel"><div class="picker-head"><h3>PERSONNEL ARCHIVE / PILIH TERSANGKA</h3><button type="button" onclick="closeSuspectPicker()" aria-label="Tutup pilihan tersangka">✕</button></div><p>Ketuk foto orang yang ingin kamu ajukan sebagai tersangka utama babak ini.</p><div class="picker-grid">'+suspect.map(p=>'<button type="button" class="picker-person" onclick="selectSuspect(\''+p.id+'\')"><img src="assets/'+p.id+'.jpg" alt="Potret '+p.name+'"><b>'+p.name+'</b><small>'+p.job+'</small></button>').join('')+'</div></div>';root.appendChild(overlay)}
function closeSuspectPicker(){document.getElementById('suspectPickerOverlay')?.remove()}
function selectSuspect(id){const selected=suspect.find(p=>p.id===id);if(!selected)return;document.getElementById('reviewSuspect').value=id;document.getElementById('chosenSuspect').textContent=selected.name;closeSuspectPicker()}
const originalOpenEnvelope=openEnvelope;
openEnvelope=function(i){
originalOpenEnvelope(i);
if(i>=state.unlocked)return;
const board=document.querySelector('#modalBody .suspectgrid');if(board&&board.previousElementSibling?.tagName==='P'&&board.previousElementSibling.previousElementSibling?.textContent?.includes('SUSPECT BOARD')){board.previousElementSibling.previousElementSibling.remove();board.previousElementSibling.remove();board.remove()}
const body=document.getElementById('modalBody');
const panel=document.createElement('div');
panel.innerHTML=reviewSection(i);
body.querySelector('.modalcontent')?.appendChild(panel);
};
