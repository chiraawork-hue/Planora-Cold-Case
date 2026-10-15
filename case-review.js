'use strict';
const REVIEW_KEY='planora_cc_reviews_v1';
let reviews={};try{reviews=JSON.parse(localStorage.getItem(REVIEW_KEY)||'{}')}catch(e){}
function reviewSection(i){
const saved=reviews[i]||{};
const chosen=suspect.find(p=>p.id===saved.id);
const safe=v=>String(v||'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
return '<section class="case-review"><h3>CASE REVIEW / BABAK '+(i+1)+'</h3><p>Setelah memeriksa bukti, siapa yang paling perlu diselidiki? Keputusan ini dapat direvisi.</p><label>Tersangka utama</label><select id="reviewSuspect" hidden><option value="">— PILIH TERSANGKA —</option>'+suspect.map(p=>'<option value="'+p.id+'" '+(saved.id===p.id?'selected':'')+'>'+safe(p.name)+'</option>').join('')+'</select><button type="button" class="choose-suspect" onclick="openSuspectPicker()"><span id="chosenSuspect">'+(chosen?safe(chosen.name):'＋ PILIH TERSANGKA')+'</span><span>▸</span></button><label>Bukti yang mendukung</label><input id="reviewEvidence" placeholder="Catat temuan dan referensi bukti" value="'+safe(saved.evidence)+'"><label>Alasan investigasi</label><textarea id="reviewReason" placeholder="Jelaskan hipotesis dan keraguanmu...">'+safe(saved.reason)+'</textarea><button class="primary" onclick="submitReview('+i+')">SIMPAN JAWABAN BABAK</button><p id="reviewStatus" class="feedback"></p></section>';
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

/* v28 — Suspect submission closes the stage; access codes belong on the next sealed envelope. */
envelopes[1].code='C7280213';
envelopes[1].hint='Gunakan lembar pengukuran fisik dan ekspor sensor struktur. Satukan kode elemen, lebar retak maksimum dalam satuan persepuluhan milimeter, dan waktu anomali pertama (HHMM).';
const priorEnvelopeForSeal=openEnvelope;
openEnvelope=function(i){
priorEnvelopeForSeal(i);
const root=document.getElementById('modalBody');
if(i===0&&i<state.unlocked){
root?.querySelector('.next-seal-review')?.remove();
}
if(i===1&&i>=state.unlocked){
const question=root?.querySelector('.question');
if(question){
question.insertAdjacentHTML('afterbegin','<h3>ARSIP TERSEGEL / REKONSTRUKSI TEKNIS</h3><p>Identifikasi elemen struktur yang mendapat rekomendasi pemeriksaan lanjutan. Gabungkan <b>kode elemen</b>, <b>lebar retak maksimum</b> tanpa koma dalam persepuluhan milimeter, dan <b>waktu pertama kali ambang sensor terlampaui</b> dalam format HHMM.</p><p class="small">Format kode: ELEMEN + 2 DIGIT PENGUKURAN + 4 DIGIT WAKTU. Semua bagian dapat ditemukan di Amplop 01.</p>');
}
}
};
const priorCodeCheck=checkCode;
checkCode=function(i){
if(i===1){
const fb=document.getElementById('codeFeedback');
if(!reviews[0]?.id||!reviews[0]?.evidence||String(reviews[0]?.reason||'').trim().length<15){
if(fb)fb.textContent='Selesaikan CASE REVIEW di Amplop 01: pilih tersangka, tulis bukti dan alasan, lalu simpan keputusan babak.';
return;
}
}
priorCodeCheck(i);
};
