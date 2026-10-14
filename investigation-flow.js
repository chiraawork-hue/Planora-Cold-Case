'use strict';
// Investigation flow: every access question is placed with its evidence in the preceding envelope.
envelopes[0].items.push('clockAudit');
envelopes[1].items.push('personnelIndex');
envelopes[2].items.push('handover');
docs.clockAudit={name:'TIME_SYNC_SERVICE_0918.log',title:'REGISTER SINKRONISASI JAM',meta:'FACILITY IT • 18 SEP 2018 • EXTRACT',sections:[['Sumber Referensi','SERVER-NTP-01 • 02:06:00 WIB • sinkronisasi berhasil.'],['Perangkat Kamera','CAM-AR03 • 01:59:00 • status: CLOCK OFFSET / SERVICE PENDING.'],['Perangkat Pembanding','Kamera koridor dan server menggunakan sumber waktu yang berbeda. Log ini tidak mencatat identitas pemegang kartu.']],callout:'Angka waktu berasal dari perangkat berbeda. Cocokkan dengan catatan pintu arsip.'};
docs.personnelIndex={name:'PERSONNEL_REFERENCE_CARD.pdf',title:'REGISTER KODE PERSONEL DAN PROYEK',meta:'RECORDS CONTROL • 17 SEP 2018',sections:[['Elemen','STR / C7 — tindak lanjut teknik; STR / C8 — inspeksi rutin; STR / C9 — inspeksi rutin.'],['Penelitian','CLN / VX17 — studi neural recovery. CLN / VX09 — arsip terdahulu.'],['Catatan','Referensi silang antara laporan teknik dan arsip klinis hanya menunjukkan keterkaitan dokumen, bukan kesalahan individu.']],callout:'Bandingkan penanda yang berulang dalam dua jalur penyelidikan.'};
docs.handover={name:'SAFETY_RECONCILIATION.csv',title:'REKONSILIASI POPULASI KESELAMATAN',meta:'CLINICAL QA • EXPORT 04 SEP 2018',sections:[['Ekspor','Dosed participants: 40. Serious event flags: 10. Public report subset: 30. Serious event flags in public subset: 2.'],['Metode','Analisis keselamatan menggunakan seluruh subjek yang menerima dosis, terlepas dari kelengkapan kunjungan akhir.'],['Kontrol','Catatan ini tidak menunjukkan editor yang mengubah dataset.']],callout:'Bandingkan pembilang dan penyebut dari kedua sumber.'};
const previousOpenEnvelope=openEnvelope;
openEnvelope=function(i){
previousOpenEnvelope(i);
if(i>=state.unlocked)return;
const content=document.querySelector('#modalBody .modalcontent');
if(!content)return;
if(i<3){
const box=document.createElement('section');box.className='next-seal-review';
const names=['SEGEL 02 — PEMERIKSAAN KRONOLOGI','SEGEL 03 — VERIFIKASI WAKTU ARSIP','SEGEL 04 — REFERENSI SILANG'];
const prompts=['Catat waktu anomali pertama pada rekaman sensor struktur (HHMM).','Jam kamera arsip menunjukkan 01:59. Cocokkan dengan register sinkronisasi dan tulis waktu sistem sebenarnya (HHMM).','Gabungkan kode elemen teknik yang perlu ditindaklanjuti dan kode proyek klinis dari register.'];
box.innerHTML='<h3>'+names[i]+'</h3><p>'+prompts[i]+'</p><p class="small">Jawaban berasal dari dokumen dalam amplop ini. Kamu bisa memasukkannya saat membuka segel berikutnya.</p><button class="primary" onclick="openEnvelope('+(i+1)+')">PERIKSA SEGEL AMPLOP '+(i+2)+'</button>';
content.appendChild(box);
}
if(i===1){
const visual=document.createElement('div');visual.className='clock-comparison';
visual.innerHTML='<h3>REKONSTRUKSI FRAME / CAM-AR03</h3><div class="cctv-monitor"><div class="cctv-top">● REC &nbsp; CAM-AR03 / ARCHIVE CORRIDOR</div><div class="cctv-scene"><div class="cctv-door">ARSIP<br>AR-03</div><div class="cctv-floor"></div></div><div class="cctv-stamp">18/09/2018 &nbsp; 01:59:00</div></div><div class="clock-device"><div class="clock-label">SERVER-NTP-01 / SYSTEM LOG</div><div class="digital-clock">02:06:00</div><small>18 SEP 2018 • WIB</small></div><p class="small">Visualisasi rekonstruksi berdasarkan dua sumber waktu. Kedua timestamp tidak membuktikan siapa yang memasuki ruang arsip.</p>';
content.insertBefore(visual,content.querySelector('.gallery'));
}
};
const oldShowHint=showHint;
showHint=function(i){const h=document.getElementById('hint');if(!h)return;const hints=[['Periksa log sensor dalam Amplop 01.','Urutkan alarm dan getaran; gunakan format HHMM.'],['Bandingkan dua sumber waktu dalam Amplop 02.','Jam kamera dan jam server tidak menunjukkan waktu yang sama.'],['Baca register kode elemen dan kode proyek di Amplop 03.','Gunakan dua kode referensi tanpa tanda pemisah.']];const n=Number(state.hints[i]||0);h.textContent=(hints[i-1]||['Periksa berkas sebelumnya.'])[Math.min(n,1)];state.hints[i]=n+1;persist()};

function hidePrematureConclusions(){
const t=document.getElementById('timelineItems');
if(t)t.innerHTML='<div class="tline"><b>12 SEP 2018</b><p>Pemeriksaan rutin Blok C dicatat dalam arsip teknik.</p></div><div class="tline"><b>16–17 SEP 2018</b><p>Surat keselamatan dan disposisi operasional tercatat; rinciannya berada di berkas asli.</p></div><div class="tline"><b>18 SEP 2018</b><p>Beberapa perangkat merekam aktivitas sebelum keruntuhan. Sumber waktu belum diselaraskan.</p></div><div class="tline"><b>2026</b><p>Arsip perkara dibuka kembali.</p></div>';
const b=document.getElementById('boardcards');
if(b)b.innerHTML=[['STR / ZONA C','Laporan teknik, pengujian dan disposisi belum direkonsiliasi.'],['SENSOR / GAS','Waktu kejadian berasal dari sistem berbeda.'],['CAM-AR03 / ACCESS','Identitas pemegang kartu dan identitas pengguna belum tentu sama.'],['CLINICAL / VX-17','Data keselamatan perlu dibandingkan dengan ringkasan publik.']].map(([h,p])=>'<div class="boardcard"><b>'+h+'</b><p>'+p+'</p></div>').join('');
const p=document.querySelector('.reportbody');if(p){const blocks=p.querySelectorAll('p');if(blocks[1])blocks[1].textContent='Beberapa hasil pemeriksaan elemen struktur membutuhkan peninjauan lanjutan. Rincian angka dan waktu terdapat dalam lampiran pengujian.'}
}
hidePrematureConclusions();
const originalRender=render;render=function(){originalRender();hidePrematureConclusions()};
