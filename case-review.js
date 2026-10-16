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
function openSuspectPicker(){const root=document.getElementById('modalBody');if(!root)return;const overlay=document.createElement('div');overlay.id='suspectPickerOverlay';overlay.className='suspect-picker-overlay';overlay.innerHTML='<div class="suspect-picker-panel"><div class="picker-head"><h3>PERSONNEL ARCHIVE / PILIH TERSANGKA</h3><button type="button" onclick="closeSuspectPicker()" aria-label="Tutup pilihan tersangka">✕</button></div><p>Ketuk foto orang yang ingin kamu ajukan sebagai tersangka utama babak ini.</p><div class="picker-grid">'+suspect.map(p=>'<button type="button" class="picker-person" onclick="selectSuspect(\''+p.id+'\')"><img src="Planora_Cold_Case_Portraits/'+p.id+'.jpg" alt="Potret '+p.name+'"><b>'+p.name+'</b><small>'+p.job+'</small></button>').join('')+'</div></div>';root.appendChild(overlay)}
function closeSuspectPicker(){document.getElementById('suspectPickerOverlay')?.remove()}
function selectSuspect(id){const selected=suspect.find(p=>p.id===id);if(!selected)return;document.getElementById('reviewSuspect').value=id;document.getElementById('chosenSuspect').textContent=selected.name;closeSuspectPicker()}
const originalOpenEnvelope=openEnvelope;
openEnvelope=function(i){
originalOpenEnvelope(i);
if(i>=state.unlocked)return;
const board=document.querySelector('#modalBody .suspectgrid');if(board&&board.previousElementSibling?.tagName==='P'&&board.previousElementSibling.previousElementSibling?.textContent?.includes('SUSPECT BOARD')){board.previousElementSibling.previousElementSibling.remove();board.previousElementSibling.remove();board.remove()}
const body=document.getElementById('modalBody');
const panel=document.createElement('div');
panel.innerHTML='<button type="button" class="review-launch" onclick="openReviewPopup('+i+')">✎ BUAT KESIMPULAN BABAK '+(i+1)+'</button>';
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
question.insertAdjacentHTML('afterbegin','<h3>ARSIP TERSEGEL / REKONSTRUKSI TEKNIS</h3><p>Identifikasi elemen struktur yang mendapat rekomendasi pemeriksaan lanjutan. Gabungkan <b>kode elemen</b>, <b>lebar retak maksimum</b> tanpa koma dalam persepuluhan milimeter, dan <b>waktu pertama kali ambang sensor terlampaui</b> dalam format HHMM.</p><p class="small">Format arsip: identitas elemen, diikuti dua digit hasil pengukuran, lalu empat digit waktu. Tulis berurutan tanpa pemisah. Semua bagian dapat ditemukan di Amplop 01.</p>');
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

/* V31 — Evidence Contradiction: compare two records before submitting stage 2. */
const contradictionFiles=[
['cctvMovement','CCTV / rekaman pergerakan'],
['stage2Clock','IT / pembanding waktu'],
['stage2Door','SECURITY / log pintu'],
['sceneCardRegistry','SECURITY / pemegang kartu'],
['sceneNadiaStatement','INTERVIEW / kesaksian N.S.'],
['scene','TKP / pemeriksaan AR-03'],
['personnelIndex','PERSONNEL / data personel'],
['initial','INSPECTION / laporan awal']
];
const previousReviewSection=reviewSection;
reviewSection=function(i){
const base=previousReviewSection(i);
if(i!==1)return base;
const saved=reviews[i]||{};
const safe=v=>String(v||'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;','\'':'&#39;'}[c]));
const options=selected=>'<option value="">— PILIH BERKAS —</option>'+contradictionFiles.map(([id,name])=>'<option value="'+id+'" '+(selected===id?'selected':'')+'>'+name+'</option>').join('');
const panel='<div class="contradiction-panel"><h3>EVIDENCE CONTRADICTION / BABAK 02</h3><p>Pilih dua sumber bukti, lalu jelaskan ketidaksesuaian atau batas kesimpulan yang kamu temukan. Dua catatan yang tampak bertentangan belum tentu benar-benar saling membantah.</p><label>BERKAS A</label><select id="contradictionA">'+options(saved.contradictionA)+'</select><label>BERKAS B</label><select id="contradictionB">'+options(saved.contradictionB)+'</select><label>ANALISIS KAMU</label><textarea id="contradictionReason" placeholder="Catat waktu, kejadian, dan apa yang dapat atau belum dapat dibuktikan...">'+safe(saved.contradictionReason)+'</textarea></div>';
return base.replace('<button class="primary" onclick="submitReview('+i+')">',panel+'<button class="primary" onclick="submitReview('+i+')">');
};
const previousSubmitReview=submitReview;
submitReview=function(i){
if(i===1){
const a=document.getElementById('contradictionA')?.value;
const b=document.getElementById('contradictionB')?.value;
const reason=document.getElementById('contradictionReason')?.value.trim()||'';
if(!a||!b||a===b||reason.length<25){
const msg=document.getElementById('reviewStatus');
if(msg)msg.textContent='Pilih dua berkas berbeda dan tulis analisis minimal 25 karakter.';
return;
}
previousSubmitReview(i);
if(reviews[i]?.id&&reviews[i]?.evidence&&reviews[i]?.reason){
reviews[i].contradictionA=a;reviews[i].contradictionB=b;reviews[i].contradictionReason=reason;
localStorage.setItem(REVIEW_KEY,JSON.stringify(reviews));
}
return;
}
previousSubmitReview(i);
};

/* v60: Amplop 03 memakai hasil rekonstruksi waktu pintu arsip. */
envelopes[2].code='0206';
envelopes[2].hint='Cocokkan waktu kamera CAM-AR03 dengan log pintu dan waktu server. Gunakan format HHMM.';

/* v84: two-source hint for envelope 04 */
const previousHint84=showHint;
showHint=function(i){
 if(i!==3)return previousHint84(i);
 const h=document.getElementById('hint');if(!h)return;
 const n=Number(state.hints[i]||0);
 h.textContent=n===0?'Cari peristiwa TASK_HOLD di log terminal, lalu cocokkan waktunya dengan antrean tugas audit.':'SESSION berasal dari AUDIT_TERMINAL_EVENTS.log; nomor JOB berasal dari AUDIT_JOB_QUEUE_0918.csv. Susun SESSION di depan nomor JOB.';
 state.hints[i]=n+1;persist();
};

function openReviewPopup(i){
 const body=document.getElementById('modalBody');if(!body)return;
 document.getElementById('reviewPopupOverlay')?.remove();
 const overlay=document.createElement('div');overlay.id='reviewPopupOverlay';overlay.className='review-popup-overlay';
 overlay.innerHTML='<div class="review-popup-panel" role="dialog" aria-modal="true" aria-label="Case Review Babak '+(i+1)+'"><button type="button" class="review-popup-close" onclick="closeReviewPopup()" aria-label="Tutup">✕</button>'+reviewSection(i)+'</div>';
 overlay.addEventListener('click',e=>{if(e.target===overlay)closeReviewPopup()});
 body.appendChild(overlay);
}
function closeReviewPopup(){document.getElementById('reviewPopupOverlay')?.remove()}

/* v137 — staged forensic evidence reveal after verified VX-17 calculation */
(function(){
 const css=document.createElement('style');
 css.textContent='.phone-reveal-overlay{position:fixed;inset:0;z-index:99999;background:rgba(4,18,21,.95);display:flex;align-items:center;justify-content:center;padding:20px;animation:phoneRevealFade .35s ease}.phone-reveal-card{width:min(440px,100%);text-align:center;color:#e4f4ed;border:1px solid #3d786c;padding:38px 25px;background:#0b2528;box-shadow:0 0 65px #1a74604a}.phone-reveal-symbol{font-size:43px;color:#8df0c7;margin-bottom:18px}.phone-reveal-title{font-size:23px;letter-spacing:2px;margin:0 0 14px}.phone-reveal-sub{line-height:1.7;color:#b7d3c9}.phone-reveal-card button{margin-top:23px;padding:13px 23px;background:#9ee6cb;border:0;color:#102c29;font-weight:700;cursor:pointer}@keyframes phoneRevealFade{from{opacity:0}to{opacity:1}}';
 document.head.appendChild(css);
 const priorShow=showVerdict;
 showVerdict=function(){
   priorShow();
   if(state.unlocked<4)return;
   const box=[...document.querySelectorAll('#modalBody .question')].find(e=>e.textContent.includes('BARANG BUKTI TERAKHIR'));
   if(!box)return;
   const opened=localStorage.getItem('cc_phone91')==='open';
   if(!state.verdict&&!opened){box.style.display='none';return}
   if(!opened){box.style.display='none';return}
   box.style.display='';
   box.querySelector('h3').textContent='BARANG BUKTI DIPERIKSA · DEVICE-01';
   box.querySelector('p').textContent='Ekstrak percakapan telah tersedia dalam arsip penyelidikan.';
   const btn=box.querySelector('button');if(btn)btn.textContent='LIHAT KEMBALI HP FARHAN';
 };
 const priorSubmit=submitVerdict;
 submitVerdict=function(){
   const wasVerified=!!state.verdict;
   priorSubmit();
   if(wasVerified||!state.verdict)return;
   const box=[...document.querySelectorAll('#modalBody .question')].find(e=>e.textContent.includes('BARANG BUKTI TERAKHIR'));
   if(box)box.style.display='none';
   const overlay=document.createElement('div');
   overlay.className='phone-reveal-overlay';
   overlay.innerHTML='<div class="phone-reveal-card" role="dialog" aria-modal="true" aria-label="Barang bukti baru ditemukan"><div class="phone-reveal-symbol">◇</div><h2 class="phone-reveal-title">AKSES FORENSIK TERBUKA</h2><p class="phone-reveal-sub">Verifikasi data VX-17 berhasil.<br>Barang bukti digital baru ditemukan.<br><strong>DEVICE-01 · MILIK FARHAN</strong></p><button type="button" id="phoneRevealContinue">PERIKSA PERANGKAT →</button></div>';
   document.body.appendChild(overlay);
   overlay.querySelector('button').addEventListener('click',()=>{overlay.remove();openPhone91()});
 };
})();
