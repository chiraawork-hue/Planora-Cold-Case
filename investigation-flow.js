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

/* Original-style multi-line work order: sign-off trail is evidence, not a verdict. */
const workOrderRows=[
['12/09 09:15','ENG-01','Inspeksi visual C7','Retak 2,8 mm dicatat','Dimas Arga','DITERIMA'],
['12/09 10:42','ENG-02','Pengukuran pembanding C8–C9','C8: 0,4 mm; C9: 0,6 mm','Dimas Arga','DITERIMA'],
['13/09 08:20','ENG-03','Permintaan uji material C7','Permintaan sampel & uji tambahan','Dimas Arga','DIAJUKAN'],
['13/09 14:05','OPS-01','Pembukaan tiket kerja','Nomor WO/2018/0917-C7 dibuat','Raka Wijaya','DISETUJUI'],
['14/09 11:30','OPS-02','Permintaan akses alat uji','Akses ruang mesin dijadwalkan','Raka Wijaya','DISETUJUI'],
['15/09 16:10','SEC-01','Rencana pembatasan koridor C','Penjagaan dan pita pembatas disiapkan','Siska Arum','DISETUJUI'],
['16/09 08:55','ENG-04','Pembatasan beban dan evakuasi','Kosongkan Zona C hingga pemeriksaan selesai','Dimas Arga','DIAJUKAN'],
['16/09 11:20','OPS-03','Kajian dampak penghentian operasi','Akses fasilitas dan jadwal terganggu','Raka Wijaya','CATATAN'],
['16/09 15:05','SEC-02','Persiapan pengosongan area','Personel keamanan siap setelah otorisasi','Siska Arum','BERSYARAT'],
['17/09 08:35','ENG-05','Penegasan risiko C7','Rekomendasi evakuasi tetap berlaku','Dimas Arga','TIDAK DICABUT'],
['17/09 09:40','OPS-04','Eskalasi keputusan ke direksi','Meminta keputusan tertulis atas penutupan','Raka Wijaya','DITERUSKAN'],
['17/09 13:10','DIR-01','Otorisasi penghentian operasi','Permintaan evakuasi sementara tidak disetujui','Dr. Adrian Putra','DITOLAK'],
['17/09 13:45','OPS-05','Instruksi operasional sementara','Pemeriksaan terbatas; area belum dikosongkan','Raka Wijaya','DITERIMA'],
['17/09 16:20','ENG-06','Keberatan atas disposisi DIR-01','Inspeksi terbatas tidak mengganti evakuasi','Dimas Arga','KEBERATAN'],
['17/09 17:05','SEC-03','Status lapangan','Pembatasan penuh belum dilaksanakan','Siska Arum','TERCATAT']
];
const signatureStrokes={
'Dimas Arga':[
'M12 45 C18 30 21 11 30 10 C45 7 43 35 28 38 C21 39 17 39 17 39 M31 39 C42 31 46 24 50 30 C54 38 61 20 65 23 C69 27 60 39 72 34 C81 30 84 18 89 20 C94 24 82 37 96 33 C107 29 109 22 116 27 C124 32 132 21 139 24 C147 26 150 24 156 19',
'M34 47 C64 43 113 44 161 36',
'M111 14 C115 10 121 12 123 14'
],
'Raka Wijaya':[
'M10 44 C14 34 20 11 30 9 C45 7 43 27 30 30 C22 33 17 30 17 30 M31 30 C46 28 48 15 53 14 C61 13 57 33 64 36 C70 39 77 24 83 22 C89 19 87 38 95 34 C105 29 112 17 118 19 C126 23 120 38 129 33 C137 28 145 20 156 16',
'M27 42 C53 40 71 41 91 43',
'M107 46 C129 39 147 38 160 39',
'M56 9 C65 3 73 8 72 15'
],
'Siska Arum':[
'M11 35 C21 11 40 12 37 21 C34 30 16 29 20 37 C25 47 49 32 53 27 C60 19 59 35 65 36 C74 36 76 18 84 20 C94 23 79 37 96 33 C106 30 108 24 116 26 C125 28 130 20 142 18',
'M31 45 C66 48 114 43 151 36'
],
'Dr. Adrian Putra':[
'M12 39 C22 23 28 11 35 12 C42 13 36 35 43 34 C52 32 56 12 63 13 C69 15 60 36 71 33 C83 29 84 17 92 18 C103 20 92 38 105 34 C118 30 118 14 128 17 C139 20 133 31 148 29',
'M17 47 C62 39 110 47 160 34',
'M26 11 C38 4 49 8 48 14',
'M123 10 C129 7 133 9 135 12'
]
};
function woScribble(name){const strokes=signatureStrokes[name]||signatureStrokes['Raka Wijaya'];return '<svg class="wo-scribble" viewBox="0 0 170 56" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Tanda tangan pena">'+strokes.map((d,i)=>'<path d="'+d+'" fill="none" stroke="#253b59" stroke-width="'+(i===0?1.9:i===1?1.1:0.9)+'" stroke-linecap="round" stroke-linejoin="round"/>').join('')+'</svg>'}
const priorWorkOrder=openDocument;
openDocument=function(id){
priorWorkOrder(id);
if(id!=='maintenance')return;
const el=document.querySelector('#modalBody .modalcontent');if(!el)return;
el.querySelectorAll('h3,p,.callout').forEach(n=>{if(n.closest('.letterhead'))return;n.remove()});
const top=document.createElement('div');top.className='wo-register';
top.innerHTML='<div class="wo-notice"><b>WO/2018/0917-C7 · REV 03</b><span>STATUS AKHIR: PEKERJAAN TERBATAS / PENGOSONGAN TIDAK DIOTORISASI</span></div><h3>REGISTER AKTIVITAS & DISPOSISI</h3><p>Catatan ini merekam pengajuan, persetujuan administratif, keberatan, dan keputusan penghentian operasi. Status administrasi tidak membuktikan pekerjaan fisik telah dilaksanakan.</p><div class="rawdata-scroll"><table class="rawtable wo-table"><thead><tr><th>TANGGAL / JAM</th><th>REF</th><th>URAIAN</th><th>HASIL / CATATAN</th><th>PARAF / GORESAN</th><th>STATUS</th></tr></thead><tbody>'+workOrderRows.map(row=>'<tr><td>'+row[0]+'</td><td>'+row[1]+'</td><td>'+row[2]+'</td><td>'+row[3]+'</td><td><span class="wo-signature">'+row[4]+'</span></td><td><span class="wo-status '+(row[5]==='DITOLAK'?'wo-reject':row[5]==='KEBERATAN'?'wo-object':'')+'">'+row[5]+'</span></td></tr>').join('')+'</tbody></table></div><h3>LEMBAR OTORISASI / TANDA TANGAN</h3><div class="wo-sign-grid"><div><small>DIAJUKAN OLEH • ENGINEERING</small><div class="wo-ink">'+woScribble('Dimas Arga')+'</div><span>16 SEP 2018 / 08:55</span><b>REKOMENDASI EVAKUASI</b></div><div><small>DITERUSKAN OLEH • OPERATIONS</small><div class="wo-ink">'+woScribble('Raka Wijaya')+'</div><span>17 SEP 2018 / 09:40</span><b>PERLU KEPUTUSAN DIREKSI</b></div><div><small>OTORISASI • DIREKTUR</small><div class="wo-ink">'+woScribble('Dr. Adrian Putra')+'</div><span>17 SEP 2018 / 13:10</span><b class="wo-reject">EVAKUASI TIDAK DISETUJUI</b></div><div><small>CATATAN KEBERATAN • ENGINEERING</small><div class="wo-ink">'+woScribble('Dimas Arga')+'</div><span>17 SEP 2018 / 16:20</span><b class="wo-object">REKOMENDASI TETAP BERLAKU</b></div></div><p class="small">Kolom paraf dan otorisasi menampilkan goresan tanda tangan, bukan nama terbaca. Cocokkan dengan contoh tanda tangan pada berkas personel untuk memeriksa keasliannya.</p>';
el.appendChild(top);
};

/* V13 forensic data: the chronology is a register, not a solution sheet. */
docs.chronology={name:'KRONOLOGI_SISTEM.log',title:'REGISTER PERISTIWA SISTEM / RAW EXPORT',meta:'VRC / FACILITY EVENT BUS / 18 SEP 2018',sections:[['Integritas Data','Gabungan catatan perangkat berbeda. Kolom waktu memakai WIB; event gateway bukan jaminan waktu fisik kejadian.'],['Ruang Lingkup','Event bus menggabungkan status sistem struktur, jaringan gas, akses ruang, dan terminal audit. Data pengukuran sensor disimpan pada berkas terpisah.']],callout:'Status sistem dan alarm adalah catatan perangkat. Penyebab kerusakan fisik memerlukan bukti teknis lain.'};
docs.gasTelemetry={name:'GAS_DETECTOR_RAW_0918.csv',title:'REKAMAN DETEKTOR GAS / ZONA C',meta:'GAS MONITORING / GZ-C-02 / 18 SEP 2018',sections:[['Skema','Pembacaan dinyatakan dalam %LEL (persen dari batas bawah mudah terbakar). Nilai adalah simulasi untuk cerita fiksi.'],['Batas Interpretasi','Waktu alarm tidak identik dengan waktu kebocoran dimulai. Sensor dapat mengalami jeda, kegagalan, atau perubahan kondisi setelah kerusakan struktur.']],callout:'Bandingkan pembacaan gas dengan data struktur; urutan waktu saja belum menetapkan sebab-akibat.'};
docs.auditTerminal={name:'AUDIT_TERMINAL_EVENTS.log',title:'AKTIVITAS TERMINAL AUDIT',meta:'IDENTITY & ACCESS SERVICE / EXTRACT',sections:[['Sistem','Catatan berikut merekam akun dan perangkat, bukan verifikasi biometrik pengguna.'],['Validasi','Untuk menetapkan identitas operator, perlu membandingkan terminal, kartu akses, dan kesaksian.']],callout:'Akun milik seseorang tidak membuktikan orang tersebut sedang mengoperasikannya.'};
envelopes[0].items.push('gasTelemetry','auditTerminal');
const facilityEvents=[
['01:32:14','SYS-AUTH','SESSION_OPEN','DIR-ADMIN / WS-DIR-02','OK'],
['01:38:22','AUDIT-SVC','TASK_HOLD','SESSION 6F2 / VX17-AUDIT','QUEUED'],
['01:46:10','STR-C04','HEALTH_CHECK','ZONE-C / CHANNEL 01','OK'],
['01:57:03','GZ-C02','HEALTH_CHECK','ZONE-C / CHANNEL 02','OK'],
['02:08:00','STR-C04','SAMPLE_WRITE','BATCH 0918-C','OK'],
['02:10:00','STR-C04','SAMPLE_WRITE','BATCH 0918-C','OK'],
['02:12:00','STR-C04','SAMPLE_WRITE','BATCH 0918-C','OK'],
['02:13:00','STR-C04','THRESHOLD_EVENT','CHANNEL 01 / CODE VIB-HI','RAISED'],
['02:14:00','STR-C04','THRESHOLD_EVENT','CHANNEL 01 / CODE VIB-HI','ACTIVE'],
['02:16:37','GZ-C02','SAMPLE_WRITE','ZONE-C / CHANNEL 02','OK'],
['02:17:06','GZ-C02','ALARM_LATCH','ZONE-C / CHANNEL 02','ACTIVE'],
['02:17:20','FAC-GW','COMMS_LOSS','ZONE-C SUBNET','RETRY'],
['02:19:11','FAC-GW','COMMS_LOSS','ZONE-C SUBNET','FAILED']
];
const gasEvents=[
['02:08','3','OK'],['02:09','4','OK'],['02:10','4','OK'],['02:11','5','OK'],['02:12','6','OK'],['02:13','8','OK'],['02:14','12','OK'],['02:15','17','OK'],['02:16','23','OK'],['02:17','36','ALARM'],['02:18','—','COMMS LOSS']
];
const columnVibration=[
['02:08',.10,.09,.11],['02:09',.12,.10,.11],['02:10',.11,.12,.13],['02:11',.19,.14,.15],['02:12',.27,.16,.18],['02:13',.91,.20,.19],['02:14',1.22,.26,.23],['02:15',1.34,.31,.29],['02:16',1.46,.39,.35],['02:17',1.58,.62,.59]
];
function forensicTable(head,rows){return '<div class="rawdata-scroll"><table class="rawtable forensic-table"><thead><tr>'+head.map(v=>'<th>'+v+'</th>').join('')+'</tr></thead><tbody>'+rows.map(row=>'<tr>'+row.map(v=>'<td>'+v+'</td>').join('')+'</tr>').join('')+'</tbody></table></div>'}
function multiSensorGraph(){const w=800,h=285,l=58,t=22,pw=710,ph=210;const sets=[{ix:1,color:'#ad483b',label:'C7'},{ix:2,color:'#247a75',label:'C8'},{ix:3,color:'#967e32',label:'C9'}];const y=v=>t+ph-v/1.7*ph;const x=i=>l+i*pw/9;return '<div class="forensic-plot"><h3>STR-C04 / RMS ACCELERATION</h3><p>Ambang pengamatan: 0,80 g. Ketuk titik untuk melihat nilai. Grafik menampilkan tiga kanal pengukuran.</p><svg viewBox="0 0 '+w+' '+h+'" role="img" aria-label="Grafik getaran C7 C8 C9 dari pukul 02:08 sampai 02:17"><line x1="'+l+'" y1="'+(t+ph)+'" x2="'+(l+pw)+'" y2="'+(t+ph)+'" stroke="#53615e"/><line x1="'+l+'" y1="'+y(.8)+'" x2="'+(l+pw)+'" y2="'+y(.8)+'" stroke="#b75c50" stroke-dasharray="5 5"/><text x="60" y="'+(y(.8)-7)+'" font-size="12">0,80 g</text>'+sets.map(set=>'<path fill="none" stroke="'+set.color+'" stroke-width="3" d="'+columnVibration.map((row,i)=>(i?'L':'M')+x(i)+' '+y(row[set.ix])).join(' ')+'"/>'+columnVibration.map((row,i)=>'<circle cx="'+x(i)+'" cy="'+y(row[set.ix])+'" r="4" fill="'+set.color+'"><title>'+set.label+' / '+row[0]+' / '+row[set.ix].toFixed(2)+' g</title></circle>').join('')).join('')+columnVibration.map((row,i)=>'<text x="'+x(i)+'" y="'+(h-22)+'" text-anchor="middle" font-size="12">'+row[0].slice(3)+'</text>').join('')+'<text x="16" y="20" font-size="12">g RMS</text></svg><div class="graph-legend"><span style="color:#ad483b">● C7</span><span style="color:#247a75">● C8</span><span style="color:#967e32">● C9</span></div></div>'}
const priorForensicDocument=openDocument;
openDocument=function(id){
priorForensicDocument(id);
if(!['chronology','gasTelemetry','auditTerminal'].includes(id))return;
const el=document.querySelector('#modalBody .modalcontent');if(!el)return;
let html='';
if(id==='chronology'){html='<h3>EVENT BUS / PERANGKAT & STATUS</h3>'+forensicTable(['WAKTU WIB','DEVICE','EVENT','DETAIL','STATE'],facilityEvents)+'<p class="small">Urutan di atas adalah hasil penggabungan beberapa perangkat. Nilai sensor dapat dilihat dalam rekaman per kanal.</p>';}
if(id==='gasTelemetry'){html='<h3>CHANNEL GZ-C02 / PEMBACAAN MENITAN</h3>'+forensicTable(['WAKTU WIB','%LEL','DEVICE STATE'],gasEvents)+'<p class="small">Nilai tidak dapat digunakan sendirian untuk menentukan apakah terjadi ledakan.</p>';}
if(id==='auditTerminal'){html='<h3>IDENTITY SERVICE / TERMINAL REGISTER</h3>'+forensicTable(['WAKTU','TERMINAL','EVENT','REFERENSI','STATUS'],facilityEvents.slice(0,2))+'<p class="small">Identitas pengguna akun belum terverifikasi.</p>';}
el.insertAdjacentHTML('beforeend',html);
};
const previousRawData=openRawData;
openRawData=function(kind){previousRawData(kind);if(kind!=='structure')return;const el=document.querySelector('#modalBody .modalcontent');if(!el)return;el.insertAdjacentHTML('beforeend',multiSensorGraph()+forensicTable(['WAKTU','C7 (g)','C8 (g)','C9 (g)'],columnVibration.map(row=>row.map((v,i)=>i===0?v:v.toFixed(2)))))};

/* V14: distinct physical inspection vs synchronized vibration telemetry. */
docs.motion={name:'STRUCTURAL_VIBRATION_C7-C9.csv',title:'TELEMETRI GETARAN / KANAL C7, C8, C9',meta:'STR-C04 / FACILITY MONITORING / 18 SEP 2018',sections:[['Rekaman','Sampel getaran RMS per menit dari tiga kanal. Nilai menggunakan satuan g dan waktu server fasilitas.'],['Batas Observasi','Ambang pengamatan internal: 0,80 g. Data ini tidak cukup untuk menetapkan penyebab runtuhnya bangunan.'],['Referensi','Bandingkan dengan pengukuran retak pada pemeriksaan fisik terdahulu dan catatan status gateway.']],callout:'Gunakan data tiap kanal untuk membedakan anomali lokal dari kejadian serentak.'};
const vibrationBaseDocument=openDocument;
openDocument=function(id){
vibrationBaseDocument(id);
if(id!=='motion')return;
const el=document.querySelector('#modalBody .modalcontent');if(!el)return;
const plots=el.querySelectorAll('.forensic-plot,.rawdata-scroll');
plots.forEach(node=>node.remove());
el.insertAdjacentHTML('beforeend',multiSensorGraph()+forensicTable(['WAKTU WIB','C7 (g)','C8 (g)','C9 (g)'],columnVibration.map(row=>row.map((v,i)=>i===0?v:v.toFixed(2)))));
};
const physicalInspectionRaw=openRawData;
openRawData=function(kind){
physicalInspectionRaw(kind);
if(kind!=='structure')return;
const el=document.querySelector('#modalBody .modalcontent');if(!el)return;
el.querySelectorAll('.forensic-plot').forEach(node=>node.remove());
el.querySelectorAll('.forensic-table').forEach(node=>node.closest('.rawdata-scroll')?.remove());
};
