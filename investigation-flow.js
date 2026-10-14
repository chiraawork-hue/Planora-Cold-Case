'use strict';
// Investigation flow: every access question is placed with its evidence in the preceding envelope.
envelopes[0].items.push('clockAudit');
envelopes[1].items.push('personnelIndex');
envelopes[2].items.push('handover');
docs.clockAudit={name:'TIME_SYNC_SERVICE_0918.log',title:'REGISTER SINKRONISASI JAM',meta:'FACILITY IT • 18 SEP 2018 • EXTRACT',sections:[['Sumber Referensi','SERVER-NTP-01 • 02:10:00 WIB • pengujian lampu koridor / SYNC PULSE.'],['Perangkat Kamera','CAM-AR03 • 02:03:00 • pengujian lampu koridor / SYNC PULSE. Status: CLOCK OFFSET / SERVICE PENDING.'],['Perangkat Pembanding','Kamera koridor dan server menggunakan sumber waktu yang berbeda. Log ini tidak mencatat identitas pemegang kartu.']],callout:'Angka waktu berasal dari perangkat berbeda. Cocokkan dengan catatan pintu arsip.'};
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
const names=['PERTANYAAN INVESTIGASI 01 — AKSES AMPLOP 02','PERTANYAAN INVESTIGASI 02 — AKSES AMPLOP 03','PERTANYAAN INVESTIGASI 03 — AKSES AMPLOP 04'];
const prompts=['Pada malam kejadian, pukul berapa sinyal getaran pertama kali melampaui ambang pengamatan pada sensor struktur?','Pada pukul berapa waktu sebenarnya pintu ruang arsip terbuka? Selaraskan dua sumber waktu yang digunakan sistem pengawasan.','Gabungkan kode elemen struktur yang memerlukan pemeriksaan lanjutan dan kode proyek penelitian yang tercantum pada register personel.'];
box.innerHTML='<h3>'+names[i]+'</h3><p class="investigation-question">'+prompts[i]+'</p><p><b>FORMAT JAWABAN:</b> '+(i<2?'HHMM — empat digit tanpa tanda titik atau titik dua.':'Kode elemen + kode proyek, huruf dan angka tanpa spasi atau tanda hubung.')+'</p><label for="chapterAnswer'+i+'">MASUKKAN KODE AKSES AMPLOP '+(i+2)+'</label><div class="answerrow"><input id="chapterAnswer'+i+'" autocomplete="off" placeholder="'+(i<2?'Contoh format: 0130':'Contoh format: A1XY02')+'"><button class="primary" onclick="submitChapterCode('+i+')">VERIFIKASI & BUKA</button></div><p id="chapterAnswerFeedback'+i+'" class="feedback" aria-live="polite"></p><p class="small">Semua data yang dibutuhkan ada di dalam amplop ini. Kamu dapat kembali memeriksa berkas sebelum menjawab.</p>';
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

function submitChapterCode(i){const input=document.getElementById('chapterAnswer'+i);const fb=document.getElementById('chapterAnswerFeedback'+i);const value=(input?.value||'').toUpperCase().replace(/[\s:-]/g,'');if(value===envelopes[i+1].code){state.unlocked=Math.max(state.unlocked,i+2);persist();render();openEnvelope(i+1)}else if(fb){fb.textContent='Kode belum sesuai. Periksa kembali berkas yang disebutkan dalam pertanyaan.'}}

const sensorReadings=[
['02:08',0.10,'N'],['02:09',0.12,'N'],['02:10',0.11,'N'],['02:11',0.19,'N'],['02:12',0.27,'N'],['02:13',0.91,'Y'],['02:14',1.22,'Y'],['02:15',1.34,'Y'],['02:16',1.46,'Y'],['02:17',1.58,'Y']
];
docs.motion={name:'SENSOR_VIBRATION_RAW_0918.csv',title:'EKSPOR SENSOR GERAK / ZONA C',meta:'FACILITY MONITORING • DEVICE STR-C-04 • 18 SEP 2018',sections:[['Metode Perekaman','RMS acceleration (g) per menit. Ambang observasi internal 0,80 g. Pengukuran ini tidak dapat sendirian menetapkan penyebab keruntuhan.'],['Rantai Data','Perangkat STR-C-04 menggunakan waktu server fasilitas. Log alarm gas berasal dari perangkat berbeda.']],callout:'Perhatikan titik perubahan pola pengukuran dan bandingkan dengan aktivitas di koridor.'};
docs.cctvMovement={name:'CAM_AR03_ACTIVITY_INDEX.csv',title:'INDEKS AKTIVITAS KAMERA KORIDOR',meta:'SECURITY EXPORT • CAMERA TIME (UNSYNCED)',sections:[['Camera Time 01:56','Koridor kosong. Pintu arsip tertutup.'],['Camera Time 01:58','Sosok membawa map memasuki koridor dari sisi timur; wajah tertutup sudut kamera.'],['Camera Time 01:59','Sensor visual menunjukkan pintu AR-03 terbuka; sosok berada di dekat pintu.'],['Camera Time 02:03','Lampu koridor berkedip satu kali saat uji SYNC PULSE.'],['Camera Time 02:04','Sosok bergerak menuju tangga. Identitas tidak dapat dipastikan.']],callout:'Seluruh waktu di lembar ini berasal dari jam kamera. Cocokkan dengan log server dan log akses sebelum menarik kesimpulan.'};
envelopes[0].items.push('motion');
envelopes[1].items.push('cctvMovement');
const originalOpenDocument=openDocument;
openDocument=function(id){
originalOpenDocument(id);
if(id!=='motion')return;
const content=document.querySelector('#modalBody .modalcontent');if(!content)return;
const max=1.65,threshold=.8;
const w=760,h=230,left=46,right=18,top=16,bottom=42;
const plotW=w-left-right,plotH=h-top-bottom;
const coords=sensorReadings.map((row,i)=>[left+i*plotW/(sensorReadings.length-1),top+plotH*(1-row[1]/max)]);
const path=coords.map((p,i)=>(i?'L':'M')+p[0].toFixed(1)+' '+p[1].toFixed(1)).join(' ');
const axis= '<line x1="'+left+'" y1="'+(top+plotH)+'" x2="'+(w-right)+'" y2="'+(top+plotH)+'" stroke="#667" />';
const thY=top+plotH*(1-threshold/max);
const marks=coords.map((p,i)=>'<circle cx="'+p[0]+'" cy="'+p[1]+'" r="5" fill="'+(sensorReadings[i][1]>=threshold?'#b54d43':'#267b77')+'"><title>'+sensorReadings[i][0]+' / '+sensorReadings[i][1]+' g</title></circle><text x="'+p[0]+'" y="'+(h-12)+'" font-size="11" text-anchor="middle">'+sensorReadings[i][0].slice(3)+'</text>').join('');
const chart='<div class="forensic-plot"><h3>GRAFIK GETARAN • 02:08–02:17 WIB</h3><p>Geser atau ketuk titik grafik untuk membaca nilai pengukuran.</p><svg viewBox="0 0 '+w+' '+h+'" role="img" aria-label="Grafik getaran sensor per menit">'+axis+'<line x1="'+left+'" y1="'+thY+'" x2="'+(w-right)+'" y2="'+thY+'" stroke="#a75b4e" stroke-dasharray="6 5"/><text x="'+(w-right-8)+'" y="'+(thY-6)+'" text-anchor="end" font-size="12">AMBANG 0,80 g</text><path d="'+path+'" fill="none" stroke="#24756f" stroke-width="3"/>'+marks+'<text x="12" y="20" font-size="12">g RMS</text><text x="16" y="'+(h-12)+'" font-size="12">02:</text></svg></div>';
const table='<div class="rawdata-scroll"><table class="rawtable"><thead><tr><th>WAKTU SERVER</th><th>RMS (g)</th><th>MELEBIHI AMBANG?</th></tr></thead><tbody>'+sensorReadings.map(row=>'<tr><td>'+row[0]+'</td><td>'+row[1].toFixed(2)+'</td><td>'+row[2]+'</td></tr>').join('')+'</tbody></table></div>';
content.insertAdjacentHTML('beforeend',chart+table);
};
