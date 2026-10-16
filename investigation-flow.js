'use strict';
// Investigation flow: every access question is placed with its evidence in the preceding envelope.
envelopes[0].items.push('clockAudit');
envelopes[1].items.push('personnelIndex');
envelopes[2].items.push('handover');
docs.clockAudit={name:'TIME_SYNC_SERVICE_0918.log',title:'REGISTER SINKRONISASI JAM',meta:'FACILITY IT • 18 SEP 2018 • EXTRACT',sections:[['Sumber Referensi','SERVER-NTP-01 • 02:10:00 WIB • pengujian lampu koridor / SYNC PULSE.'],['Perangkat Kamera','CAM-AR03 • 02:03:00 • pengujian lampu koridor / SYNC PULSE. Status: CLOCK OFFSET / SERVICE PENDING.'],['Perangkat Pembanding','Kamera koridor dan server menggunakan sumber waktu yang berbeda. Log ini tidak mencatat identitas pemegang kartu.']],callout:'Angka waktu berasal dari perangkat berbeda. Cocokkan dengan catatan pintu arsip.'};
docs.personnelIndex={name:'PERSONNEL_REFERENCE_CARD.pdf',title:'REGISTER KODE PERSONEL DAN PROYEK',meta:'RECORDS CONTROL • 17 SEP 2018',sections:[['Elemen','STR / C7 — tindak lanjut teknik; STR / C8 — inspeksi rutin; STR / C9 — inspeksi rutin.'],['Penelitian','CLN / VX17 — studi neural recovery. CLN / VX09 — arsip terdahulu.'],['Catatan','Referensi silang antara laporan teknik dan arsip klinis hanya menunjukkan keterkaitan dokumen, bukan kesalahan individu.']],callout:'Bandingkan penanda yang berulang dalam dua jalur penyelidikan.'};
docs.handover={name:'SAFETY_RECONCILIATION.csv',title:'REKONSILIASI POPULASI KESELAMATAN',meta:'CLINICAL QA • EXPORT 04 SEP 2018',sections:[],callout:''};
const oldShowHint=showHint;
showHint=function(i){const h=document.getElementById('hint');if(!h)return;const hints=[['Periksa log sensor dalam Amplop 01.','Urutkan alarm dan getaran; gunakan format HHMM.'],['Bandingkan dua sumber waktu dalam Amplop 02.','Jam kamera dan jam server tidak menunjukkan waktu yang sama.'],['Periksa log aktivitas terminal pada Amplop 03.','Temukan peristiwa TASK_HOLD pukul 01.38.22 WIB, lalu baca kolom SESSION.']];const n=Number(state.hints[i]||0);h.textContent=(hints[i-1]||['Periksa berkas sebelumnya.'])[Math.min(n,1)];state.hints[i]=n+1;persist()};

function hidePrematureConclusions(){
const t=document.getElementById('timelineItems');
if(t)t.innerHTML='<div class="tline"><b>12 SEP 2018</b><p>Pemeriksaan rutin Blok C dicatat dalam arsip teknik.</p></div><div class="tline"><b>16–17 SEP 2018</b><p>Surat keselamatan dan disposisi operasional tercatat; rinciannya berada di berkas asli.</p></div><div class="tline"><b>18 SEP 2018</b><p>Beberapa perangkat merekam aktivitas sebelum keruntuhan. Sumber waktu belum diselaraskan.</p></div><div class="tline"><b>2026</b><p>Arsip perkara dibuka kembali.</p></div>';
const b=document.getElementById('boardcards');
if(b)b.innerHTML=[['STR / ZONA C','Laporan teknik, pengujian dan disposisi belum direkonsiliasi.'],['SENSOR / GAS','Waktu kejadian berasal dari sistem berbeda.'],['CAM-AR03 / ACCESS','Identitas pemegang kartu dan identitas pengguna belum tentu sama.'],['CLINICAL / VX-17','Data keselamatan perlu dibandingkan dengan ringkasan publik.']].map(([h,p])=>'<div class="boardcard"><b>'+h+'</b><p>'+p+'</p></div>').join('');
const p=document.querySelector('.reportbody');if(p){const blocks=p.querySelectorAll('p');if(blocks[1])blocks[1].textContent='Beberapa hasil pemeriksaan elemen struktur membutuhkan peninjauan lanjutan. Rincian angka dan waktu terdapat dalam lampiran pengujian.'}
}
hidePrematureConclusions();
const originalRender=render;render=function(){originalRender();hidePrematureConclusions()};

function submitChapterCode(i){const input=document.getElementById('chapterAnswer'+i);const fb=document.getElementById('chapterAnswerFeedback'+i);const value=(input?.value||'').toUpperCase().replace(/[\s:-]/g,'');if(value===envelopes[i].code){state.unlocked=Math.max(state.unlocked,i+2);persist();render();openEnvelope(i+1)}else if(fb){fb.textContent='Kode belum sesuai. Periksa kembali berkas yang disebutkan dalam pertanyaan.'}}

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
top.innerHTML='<div class="wo-notice"><b>WO/2018/0917-C7 · REV 03</b><span>STATUS AKHIR: PEKERJAAN TERBATAS / PENGOSONGAN TIDAK DIOTORISASI</span></div><h3>REGISTER AKTIVITAS & DISPOSISI</h3><p>Catatan ini merekam pengajuan, persetujuan administratif, keberatan, dan keputusan penghentian operasi. Status administrasi tidak membuktikan pekerjaan fisik telah dilaksanakan.</p><div class="rawdata-scroll"><table class="rawtable wo-table"><thead><tr><th>TANGGAL / JAM</th><th>REF</th><th>URAIAN</th><th>HASIL / CATATAN</th><th>PARAF / GORESAN</th><th>STATUS</th></tr></thead><tbody>'+workOrderRows.map(row=>'<tr><td>'+row[0]+'</td><td>'+row[1]+'</td><td>'+row[2]+'</td><td>'+row[3]+'</td><td><span class="wo-signature">'+row[4]+'</span></td><td><span class="wo-status '+(row[5]==='DITOLAK'?'wo-reject':row[5]==='KEBERATAN'?'wo-object':'')+'">'+row[5]+'</span></td></tr>').join('')+'</tbody></table></div><h3>LEMBAR OTORISASI / TANDA TANGAN</h3><div class="wo-sign-grid"><div><small>DIAJUKAN OLEH • ENGINEERING</small><div class="wo-ink">'+woScribble('Dimas Arga')+'</div><span>16 SEP 2018 / 08:55</span><b>REKOMENDASI EVAKUASI</b></div><div><small>DITERUSKAN OLEH • OPERATIONS</small><div class="wo-ink">'+woScribble('Raka Wijaya')+'</div><span>17 SEP 2018 / 09:40</span><b>PERLU KEPUTUSAN DIREKSI</b></div><div><small>OTORISASI • DIREKTUR</small><div class="wo-ink">'+woScribble('Dr. Adrian Putra')+'</div><span>17 SEP 2018 / 13:10</span><b class="wo-reject">EVAKUASI TIDAK DISETUJUI</b></div><div><small>CATATAN KEBERATAN • ENGINEERING</small><div class="wo-ink">'+woScribble('Dimas Arga')+'</div><span>17 SEP 2018 / 16:20</span><b class="wo-object">REKOMENDASI TETAP BERLAKU</b></div></div><p class="small">Paraf dan otorisasi direproduksi dari salinan dokumen yang tersimpan dalam arsip.</p>';
el.appendChild(top);
};

/* V13 forensic data: the chronology is a register, not a solution sheet. */
docs.chronology={name:'KRONOLOGI_SISTEM.log',title:'REGISTER PERISTIWA SISTEM / RAW EXPORT',meta:'VRC / FACILITY EVENT BUS / 18 SEP 2018',sections:[['Integritas Data','Gabungan catatan perangkat berbeda. Kolom waktu memakai WIB; event gateway bukan jaminan waktu fisik kejadian.'],['Ruang Lingkup','Event bus menggabungkan status sistem struktur, jaringan gas, akses ruang, dan terminal audit. Data pengukuran sensor disimpan pada berkas terpisah.']],callout:'Status sistem dan alarm adalah catatan perangkat. Penyebab kerusakan fisik memerlukan bukti teknis lain.'};
docs.gasTelemetry={name:'GAS_DETECTOR_RAW_0918.csv',title:'REKAMAN DETEKTOR GAS / ZONA C',meta:'GAS MONITORING / GZ-C-02 / 18 SEP 2018',sections:[['Skema','Pembacaan dinyatakan dalam %LEL (persen dari batas bawah mudah terbakar). Nilai adalah simulasi untuk cerita fiksi.'],['Batas Interpretasi','Waktu alarm tidak identik dengan waktu kebocoran dimulai. Sensor dapat mengalami jeda, kegagalan, atau perubahan kondisi setelah kerusakan struktur.']],callout:'Bandingkan pembacaan gas dengan data struktur; urutan waktu saja belum menetapkan sebab-akibat.'};
docs.auditTerminal={name:'AUDIT_TERMINAL_EVENTS.log',title:'AKTIVITAS TERMINAL AUDIT',meta:'IDENTITY & ACCESS SERVICE / EXTRACT',sections:[['Sistem','Catatan berikut merekam akun dan perangkat, bukan verifikasi biometrik pengguna.'],['Validasi','Untuk menetapkan identitas operator, perlu membandingkan terminal, kartu akses, dan kesaksian.']],callout:'Akun milik seseorang tidak membuktikan orang tersebut sedang mengoperasikannya.'};
envelopes[0].items.push('gasTelemetry','auditTerminal');
const facilityEvents=[
['01:32:14','SYS-AUTH','SESSION_OPEN','CLN-AUDIT / WS-CLN-02','OK'],
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
if(id==='chronology'){html='<h3>EVENT BUS / PERANGKAT & STATUS</h3>'+forensicTable(['WAKTU WIB','DEVICE','EVENT','DETAIL','STATE'],facilityEvents)+'<details class="forensic-glossary"><summary>📖 KAMUS KODE SISTEM — klik untuk membaca</summary><p class="small">Keterangan teknis untuk membaca log. Kode ini tidak dengan sendirinya membuktikan siapa yang melakukan tindakan.</p><table><tbody><tr><th>KODE</th><th>ARTI</th></tr><tr><td>RAISED</td><td>Peringatan baru dipicu karena nilai melewati ambang.</td></tr><tr><td>ACTIVE</td><td>Kondisi atau alarm masih tercatat aktif; bukan alarm baru.</td></tr><tr><td>OK</td><td>Pemeriksaan atau pencatatan perangkat berhasil.</td></tr><tr><td>QUEUED</td><td>Tugas tercatat dalam antrean, belum tentu dijalankan.</td></tr><tr><td>RETRY</td><td>Sistem sedang mencoba menghubungkan ulang.</td></tr><tr><td>FAILED</td><td>Upaya komunikasi atau proses gagal.</td></tr><tr><td>SESSION_OPEN</td><td>Sesi akses sistem dibuka; belum memastikan identitas orang.</td></tr><tr><td>TASK_HOLD</td><td>Tugas audit diberi status ditahan.</td></tr><tr><td>HEALTH_CHECK</td><td>Pemeriksaan kondisi perangkat.</td></tr><tr><td>SAMPLE_WRITE</td><td>Pembacaan sensor disimpan.</td></tr><tr><td>THRESHOLD_EVENT</td><td>Nilai sensor melewati batas pemantauan.</td></tr><tr><td>ALARM_LATCH</td><td>Alarm masuk status aktif/terkunci hingga ditangani atau direset.</td></tr><tr><td>COMMS_LOSS</td><td>Koneksi komunikasi dengan perangkat terputus.</td></tr><tr><td>STR-C04 / GZ-C02 / FAC-GW</td><td>Perangkat sensor struktur / detektor gas / gerbang komunikasi fasilitas.</td></tr></tbody></table></details>'+'<p class="small">Urutan di atas adalah hasil penggabungan beberapa perangkat. Nilai sensor dapat dilihat dalam rekaman per kanal.</p>';}
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

/* V16: press clipping replaces the explanatory press-release summary. */
docs.press={name:'KLIPING_HARIAN_METROPOLIS_190918.jpg',title:'HARIAN METROPOLIS',meta:'ARSIP MEDIA CETAK • 19 SEP 2018',sections:[],callout:''};
const clippingPreviousDocument=openDocument;
openDocument=function(id){
if(id!=='press'){clippingPreviousDocument(id);return}
if(!state.seen.includes(id))state.seen.push(id);persist();render();
show('C:\\VEYRA\\PRESS\\HARIAN_METROPOLIS_190918.jpg',`<div class="modalcontent"><button class="backfile" onclick="backModal()">← KEMBALI KE BERKAS SEBELUMNYA</button><article class="news-clipping"><header class="news-masthead"><div class="news-edition"><span>RABU, 19 SEPTEMBER 2018</span><span>EDISI 247 · HALAMAN 03</span></div><div class="news-rule"></div><h1>HARIAN METROPOLIS</h1><p>INDEPENDEN · FAKTUAL · TERPERCAYA</p><div class="news-rule heavy"></div></header><div class="news-category">PERISTIWA / INVESTIGASI</div><h2>11 Tewas dalam Runtuhnya Fasilitas Riset Veyra</h2><p class="news-deck">Perusahaan Menyebut Dugaan Kebocoran Gas; Pemeriksaan Lokasi Berlanjut</p><div class="news-byline">Oleh Redaksi Metro · 19 September 2018</div><div class="news-columns"><p><b>VEYRA —</b> Sebelas orang dinyatakan meninggal dunia setelah sebagian bangunan Veyra Research Center runtuh pada Selasa dini hari. Pihak perusahaan menyebut dugaan kebocoran gas sebagai salah satu fokus pemeriksaan awal. Tim gabungan masih membatasi akses menuju bangunan yang mengalami kerusakan.</p><p>Dalam konferensi pers, juru bicara Veyra menyampaikan bahwa fasilitas tersebut telah menjalankan prosedur pemantauan rutin. Ia tidak merinci hasil pemeriksaan kondisi bangunan sebelum kejadian. Sejumlah keluarga korban meminta agar informasi keselamatan fasilitas dibuka kepada pemeriksa independen.</p><p>Juru bicara perusahaan juga menyebut bahwa sejumlah kegiatan administrasi dan pemeriksaan internal sempat dihentikan sementara sebelum kejadian. Menurut manajemen, langkah tersebut merupakan bagian dari penyesuaian operasional rutin dan tidak berkaitan dengan insiden yang terjadi.</p><p>Ketika dimintai keterangan mengenai dokumen yang belum diserahkan kepada tim pemeriksa, pihak perusahaan menyatakan bahwa proses pengumpulan arsip masih berlangsung.</p><p>Seorang perwakilan manajemen menambahkan bahwa operasional di luar area terdampak akan dievaluasi secara bertahap. Hingga berita ini diturunkan, penyebab pasti keruntuhan belum diumumkan oleh otoritas pemeriksa.</p></div><footer class="news-footer"><span>ARSIP KLIPING · VRC-PRESS-0919</span><span>REKONSTRUKSI FIKTIF</span></footer></article></div>`);
};

/* V17 - visual clock synchronization service record, no investigator commentary. */
docs.clockAudit={name:'CAM_AR03_SERVICE_REPORT.pdf',title:'CAMERA TIME VERIFICATION',meta:'FACILITY IT • SERVICE COPY • 18 SEP 2018',sections:[],callout:''};
const priorClockDocument=openDocument;
openDocument=function(id){
if(id!=='clockAudit'){priorClockDocument(id);return}
if(!state.seen.includes(id))state.seen.push(id);persist();render();
const technicianSig='<svg viewBox="0 0 220 68" class="clock-technician-sign" role="img" aria-label="Paraf teknisi dalam tinta biru"><path d="M12 47 C23 24 28 11 38 15 C48 19 27 45 44 41 C55 39 60 17 71 22 C80 28 67 44 81 40 C93 36 95 25 106 27 C117 29 112 44 124 38 C137 30 146 18 153 25 C160 32 147 44 166 37 C178 32 188 27 202 20" fill="none" stroke="#29486a" stroke-width="2.3" stroke-linecap="round"/><path d="M36 54 C86 48 152 51 209 39" fill="none" stroke="#29486a" stroke-width="1.2"/></svg>';
show('C:\\VEYRA\\CASE_001\\CAM_AR03_SERVICE_REPORT.pdf',`<div class="modalcontent"><button class="backfile" onclick="backModal()">← KEMBALI KE BERKAS SEBELUMNYA</button><article class="clock-service"><div class="clock-service-head"><b>VEYRA RESEARCH CENTER</b><span>FACILITY IT · 18 SEP 2018</span></div><h2>CAMERA TIME VERIFICATION</h2><div class="clock-service-sub">SERVICE REGISTER / VR-IT-0918-AR03 · UNIT CAM-AR03</div><div class="clock-dual"><div class="clock-panel"><div class="clock-panel-label">SERVER-NTP-01</div><div class="clock-digits">02:10:00</div><div class="clock-panel-footer">SYNC PULSE · REF OK</div></div><div class="clock-panel"><div class="clock-panel-label">CAM-AR03 / OSD</div><div class="clock-digits">02:03:00</div><div class="clock-panel-footer">SYNC PULSE · SERVICE PENDING</div></div></div><div class="clock-service-note"><b>OBSERVED EVENT</b><p>Koridor AR-03: satu pulsa lampu servis terekam bersamaan pada server dan kamera. Pembacaan layar dicatat saat pulsa terlihat. Penyetelan waktu kamera ditunda sampai unit dapat diisolasi dari perekaman aktif.</p></div><div class="rawdata-scroll"><table class="rawtable clock-service-table"><thead><tr><th>PERANGKAT</th><th>TEST ID</th><th>HASIL</th><th>TINDAKAN</th></tr></thead><tbody><tr><td>SERVER-NTP-01</td><td>SYNC-0918-01</td><td>REFERENCE OK</td><td>NO ACTION</td></tr><tr><td>CAM-AR03</td><td>SYNC-0918-01</td><td>CLOCK OFFSET</td><td>SERVICE PENDING</td></tr><tr><td>CAM-AR03</td><td>OSD-CHECK</td><td>DISPLAY ACTIVE</td><td>RETAIN FOOTAGE</td></tr></tbody></table></div><div class="clock-signature"><div><small>TECHNICIAN INITIAL / FACILITY IT</small>${technicianSig}<span>F. MAHENDRA · 18/09/2018</span></div><div><small>STATUS PEKERJAAN</small><strong>OPEN / PENDING</strong><span>Ticket IT-AR03-0918</span></div></div><div class="clock-archive-note">SALINAN ARSIP PERAWATAN · DOKUMEN FIKTIF PLANORA COLD CASE</div></article></div>`);
};

/* V19: pre-incident engineering inspection is a primary-source form, not a timeline summary. */
docs.warning={name:'FIELD_INSPECTION_C7_120918.pdf',title:'FIELD INSPECTION SHEET',meta:'FORM STR-09 • 12 SEP 2018 • STRUCTURAL ENGINEERING',sections:[],callout:''};
const originalWarningDocument=openDocument;
openDocument=function(id){
if(id!=='warning'){originalWarningDocument(id);return}
if(!state.seen.includes(id))state.seen.push(id);persist();render();
const sig=typeof woScribble==='function'?woScribble('Dimas Arga'):'';
show('C:\\VEYRA\\CASE_001\\FIELD_INSPECTION_C7_120918.pdf',`<div class="modalcontent"><button class="backfile" onclick="backModal()">← KEMBALI KE BERKAS SEBELUMNYA</button><article class="field-inspection"><header class="field-head"><div><strong>VEYRA RESEARCH CENTER</strong><small>STRUCTURAL ENGINEERING DIVISION</small></div><span>FORM STR-09 / COPY 01</span></header><h2>FIELD INSPECTION SHEET</h2><p class="field-meta">12 SEP 2018 · ZONA C · GEDUNG RISET UTAMA</p><table class="field-table"><tbody><tr><th>ELEMENT ID</th><td>COL-C7</td><th>GRID / LEVEL</th><td>C/7 · LANTAI 1</td></tr><tr><th>INSPECTOR ID</th><td>ENG-014</td><th>METHOD</th><td>VISUAL / CRACK GAUGE</td></tr><tr><th>OBSERVATION REF</th><td>STR-C7-012</td><th>WORK STATUS</th><td>ENG-04 / OPEN</td></tr></tbody></table><h3>MEASUREMENT RECORD</h3><table class="field-table"><thead><tr><th>ITEM</th><th>OBSERVATION</th><th>UNIT / NOTE</th></tr></thead><tbody><tr><td>CRACK WIDTH / MAX</td><td>2,8</td><td>mm</td></tr><tr><td>CRACK ORIENTATION</td><td>DIAGONAL</td><td>FACE EAST</td></tr><tr><td>SURFACE SPALLING</td><td>OBSERVED</td><td>LOCALIZED</td></tr><tr><td>PHOTO REF</td><td>STR-C7-012</td><td>IMAGE ARCHIVE</td></tr></tbody></table><h3>FIELD SKETCH / COL-C7</h3><div class="field-sketch"><svg viewBox="0 0 390 180" role="img" aria-label="Sketsa teknis kolom C7 dengan garis retakan diagonal"><rect x="145" y="8" width="105" height="152" fill="#d0c7b6" stroke="#655f54" stroke-width="2"/><path d="M177 13 L191 35 L177 56 L205 77 L187 96 L214 118 L199 154 M177 56 L156 65 M205 77 L230 63 M214 118 L235 131" fill="none" stroke="#745548" stroke-width="2.5"/><path d="M205 77 L305 52" stroke="#5e574a"/><text x="310" y="48" font-size="13" fill="#393a33">2,8 mm</text><text x="197" y="175" text-anchor="middle" font-size="12" fill="#393a33">COL-C7</text></svg></div><div class="field-sign-row"><div><small>INSPECTED BY / ENG-014</small>${sig}<span>12 SEP 2018 · 09:15 WIB</span></div><div><small>FOLLOW-UP REGISTER</small><strong>ENG-04 / OPEN</strong><span>Filed to maintenance archive</span></div></div><footer class="field-footer">VRC ENGINEERING RECORDS · ORIGINAL MEASUREMENT COPY · DOKUMEN FIKTIF</footer></article></div>`);
};

/* Gas distribution visual inspection register: field measurements are fictional case evidence. */
const previousGasDocument=openDocument;
openDocument=function(id){
if(id!=='gas'){previousGasDocument(id);return}
if(!state.seen.includes(id))state.seen.push(id);persist();render();
show('C:\\VEYRA\\CASE_001\\GAS_PIPELINE_DAMAGE_REGISTER.pdf',`<div class="modalcontent"><button class="backfile" onclick="backModal()">← KEMBALI KE BERKAS SEBELUMNYA</button><article style="background:#eae2d1;color:#2d302d;padding:clamp(14px,3vw,30px);font-family:Arial,sans-serif"><header style="display:flex;justify-content:space-between;gap:10px;flex-wrap:wrap;border-bottom:2px solid #56645d;padding-bottom:13px;font:11px monospace"><strong>VEYRA RESEARCH CENTER / FACILITY SAFETY</strong><span>FS-GAS-2018-019</span></header><h2 style="margin:22px 0 6px;color:#2d302d">REGISTER KERUSAKAN JARINGAN GAS</h2><p style="font:12px monospace">19 SEP 2018 · ZONA C · INSPEKSI VISUAL PASCAKEJADIAN</p><p style="line-height:1.6;font-size:13px">Inventarisasi kondisi komponen pada titik yang dapat dijangkau. Nomor titik merujuk ke peta distribusi dan register foto. Hasil pengukuran terbatas pada kondisi saat pemeriksaan.</p><div class="rawdata-scroll"><table class="rawtable" style="min-width:670px"><thead><tr><th>POINT ID</th><th>COMPONENT</th><th>OBSERVED CONDITION</th><th>MEASUREMENT / NOTE</th><th>PHOTO REF</th></tr></thead><tbody><tr><td>GP-C01</td><td>Pipa utama</td><td>Permukaan utuh secara visual</td><td>Inspeksi sisi luar</td><td>GAS-01</td></tr><tr><td>GP-C02</td><td>Sambungan cabang</td><td>Perubahan posisi sambungan</td><td>Offset terukur 18 mm</td><td>GAS-02</td></tr><tr><td>GP-C03</td><td>Sambungan pipa</td><td>Celah terbuka pada sisi sambungan</td><td>Pengujian material tertunda</td><td>GAS-03</td></tr><tr><td>GP-C04</td><td>Katup isolasi</td><td>Tuas pada posisi tertutup saat ditemukan</td><td>Riwayat perubahan posisi tidak tersedia</td><td>GAS-04</td></tr><tr><td>GP-C05</td><td>Penyangga pipa</td><td>Dudukan terlepas</td><td>Pengikat ditemukan pada puing</td><td>GAS-05</td></tr></tbody></table></div><h3 style="margin-top:25px">PETA TITIK INSPEKSI / ZONA C</h3><div style="border:1px solid #aaa18f;padding:12px;overflow:auto;background:#e4dac7"><svg viewBox="0 0 740 390" style="width:100%;min-width:480px" role="img" aria-label="Denah Zona C: ruangan, kolom C7 C8 C9, jalur gas, katup, detektor GZ-C02 dan titik inspeksi"><rect x="12" y="12" width="716" height="366" fill="#e9e0d0" stroke="#7b756b" stroke-width="2"/><g stroke="#8e887c" stroke-width="3" fill="none"><path d="M30 78 H710 M30 215 H710 M245 30 V350 M488 30 V350"/><path d="M245 120 V162 M488 120 V162" stroke="#e9e0d0" stroke-width="7"/></g><g font-family="monospace" font-size="15" fill="#645e51"><text x="45" y="45">LABORATORIUM C</text><text x="270" y="45">RUANG UTILITAS</text><text x="505" y="45">KORIDOR C</text><text x="42" y="245">AKSES SERVIS</text><text x="510" y="245">RUANG MESIN</text></g><rect x="72" y="158" width="233" height="95" fill="#b96b5f" fill-opacity=".15" stroke="#995a4e" stroke-width="2" stroke-dasharray="7 5"/><g fill="#8e7967" opacity=".8"><path d="M88 210 l15 -9 8 17 -16 8z"/><path d="M185 230 l14 -13 15 13 -8 12z"/><path d="M255 200 l12 -10 10 16 -14 7z"/></g><text x="90" y="190" font-family="monospace" font-size="13" fill="#884b43">SEKTOR KERUSAKAN</text><text x="90" y="205" font-family="monospace" font-size="11" fill="#884b43">SURVEI AWAL / C7</text><g fill="#7a746b" stroke="#46453f"><rect x="110" y="150" width="22" height="22"/><rect x="353" y="150" width="22" height="22"/><rect x="596" y="150" width="22" height="22"/></g><g font-family="monospace" font-size="15" fill="#302f2a"><text x="107" y="143">C7</text><text x="350" y="143">C8</text><text x="593" y="143">C9</text></g><path d="M45 280 H690 M275 280 V95 H430 M510 280 V340 H635" fill="none" stroke="#637b77" stroke-width="8" stroke-linejoin="round"/><g font-family="monospace" font-size="13" fill="#302f2a" stroke="#4c524c"><circle cx="95" cy="280" r="10" fill="#c8a679"/><circle cx="275" cy="280" r="10" fill="#c8a679"/><circle cx="430" cy="95" r="10" fill="#c8a679"/><circle cx="510" cy="280" r="10" fill="#c8a679"/><circle cx="635" cy="340" r="10" fill="#c8a679"/></g><g font-family="monospace" font-size="14" fill="#302f2a"><text x="62" y="264">GP-C01</text><text x="242" y="307">GP-C02</text><text x="394" y="79">GP-C03</text><text x="478" y="307">GP-C04</text><text x="603" y="326">GP-C05</text></g><g transform="translate(532 100)" stroke="#8b594c" stroke-width="2" fill="none"><circle r="16"/><path d="M-8 -8 L8 8 M8 -8 L-8 8"/></g><text x="551" y="106" font-family="monospace" font-size="14" fill="#784c42">GZ-C02</text><g font-family="monospace" font-size="12" fill="#665c4c"><text x="35" y="364">■ KOLOM   ● TITIK INSPEKSI   ⊗ DETEKTOR GAS</text><text x="580" y="364">SKEMA / NOT TO SCALE</text></g></svg></div><p style="font:11px/1.6 monospace;color:#675d50;margin-top:9px">ARSIR MERAH: SEKTOR KERUSAKAN TERAMATI DALAM SURVEI AWAL (REFERENSI VRC-SITE-01). BATAS SKEMATIS; BUKAN ARAH PENYEBAB ATAU URUTAN KERUNTUHAN.</p><h3 style="margin-top:24px">REGISTER INSPEKSI RUTIN / SEBELUM INSIDEN</h3><div class="rawdata-scroll"><table class="rawtable" style="min-width:620px"><thead><tr><th>TANGGAL</th><th>REGISTER</th><th>LOKASI</th><th>PEMERIKSAAN</th><th>HASIL</th></tr></thead><tbody><tr><td>10 SEP 2018</td><td>FS-GAS-2018-071</td><td>GP-C01 / GP-C02</td><td>Visual sambungan &amp; indikator tekanan</td><td>Tidak tercatat anomali pada saat pemeriksaan</td></tr><tr><td>10 SEP 2018</td><td>FS-GAS-2018-071</td><td>GP-C03 / GP-C04</td><td>Visual jalur &amp; posisi katup</td><td>Tidak tercatat anomali pada saat pemeriksaan</td></tr><tr><td>10 SEP 2018</td><td>FS-GAS-2018-071</td><td>GP-C05</td><td>Visual dudukan penyangga</td><td>Tidak tercatat anomali pada saat pemeriksaan</td></tr></tbody></table></div><p style="font:11px/1.5 monospace;color:#716758;margin-top:10px">Sumber: salinan register pemeriksaan rutin. Hasil berlaku untuk waktu dan metode pemeriksaan yang dicatat.</p><div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:22px;font-size:12px"><div style="border-top:1px solid #777;padding-top:8px"><small>INSPECTED BY</small><p>FS-021 / FACILITY SAFETY</p><p>19 SEP 2018 · 10:40 WIB</p></div><div style="border-top:1px solid #777;padding-top:8px"><small>REGISTER STATUS</small><p>VISUAL SURVEY / PARTIAL</p><p>SAMPLE REQUEST OPEN</p></div></div><footer style="margin-top:20px;border-top:1px solid #aaa;padding-top:9px;font:10px monospace">FIELD RECORD · DOKUMEN FIKTIF PLANORA COLD CASE</footer></article></div>`);
};

/* V24: parent site plan is keyed to the existing Zone C pipeline plan. */
docs.siteOverview={name:'VRC_SITE_01_SITE_PLAN.pdf',title:'DENAH GEDUNG RISET UTAMA',meta:'FACILITY RECORDS • VRC-SITE-01 • REVISI ARSIP 2018',sections:[],callout:''};
envelopes[0].items.unshift('siteOverview');
const priorSiteDocument=openDocument;
openDocument=function(id){
if(id!=='siteOverview'){priorSiteDocument(id);return}
if(!state.seen.includes(id))state.seen.push(id);persist();render();
show('C:\\VEYRA\\CASE_001\\VRC_SITE_01_SITE_PLAN.pdf',`<div class="modalcontent"><button class="backfile" onclick="backModal()">← KEMBALI KE BERKAS SEBELUMNYA</button><article style="background:#ebe3d2;color:#30352f;padding:clamp(16px,3vw,30px);font-family:Arial,sans-serif"><header style="border-bottom:2px solid #62675d;padding-bottom:12px;display:flex;justify-content:space-between;gap:12px;flex-wrap:wrap;font:12px monospace"><strong>VEYRA RESEARCH CENTER / FACILITY RECORDS</strong><span>VRC-SITE-01</span></header><h2 style="margin:22px 0 6px">DENAH GEDUNG RISET UTAMA</h2><p style="font:12px/1.5 monospace">SITE ORIENTATION / 2018 · BLOK A, B DAN C</p><p style="font-size:13px;line-height:1.6">Gambar orientasi area bangunan dan akses menuju Zona C. Detail posisi kolom, jaringan gas, dan perangkat deteksi tercatat pada lembar VRC-ZC-01.</p><div style="border:1px solid #9c9485;background:#e6dcc9;padding:12px;overflow:auto"><svg viewBox="0 0 740 445" style="width:100%;min-width:460px" role="img" aria-label="Denah lokasi Gedung Riset Utama, Blok A, B, C, pembesaran Zona C, area runtuh sekitar C7, kolom C7 C8 C9 dan lokasi detektor GZ-C02"><rect x="12" y="12" width="716" height="420" fill="#ece4d5" stroke="#706c63" stroke-width="2"/><text x="34" y="39" font-family="monospace" font-size="16" fill="#343a36">GEDUNG RISET UTAMA · SITE OVERVIEW</text><rect x="36" y="61" width="668" height="62" fill="#d7d0c0" stroke="#777366"/><text x="60" y="88" font-family="monospace" font-size="18" fill="#30352f">BLOK A</text><text x="60" y="109" font-family="monospace" font-size="13" fill="#54564e">ADMINISTRASI / DIREKSI</text><rect x="36" y="131" width="668" height="66" fill="#d0d9d4" stroke="#777366"/><text x="60" y="160" font-family="monospace" font-size="18" fill="#30352f">BLOK B</text><text x="60" y="181" font-family="monospace" font-size="13" fill="#54564e">LABORATORIUM / ARSIP PENELITIAN</text><rect x="36" y="205" width="668" height="210" fill="#dfd3c0" stroke="#777366"/><text x="50" y="229" font-family="monospace" font-size="17" fill="#30352f">BLOK C / ZONA C</text><text x="50" y="248" font-family="monospace" font-size="12" fill="#54564e">DETAIL: VRC-ZC-01</text><g stroke="#8e8678" stroke-width="2"><path d="M45 281 H695 M270 260 V405 M485 260 V405"/></g><rect x="47" y="285" width="223" height="120" fill="#b96c5f" fill-opacity=".24" stroke="#9a5147" stroke-width="2" stroke-dasharray="6 4"/><g fill="#6d6c63" stroke="#45433d"><rect x="126" y="310" width="18" height="18"/><rect x="360" y="310" width="18" height="18"/><rect x="592" y="310" width="18" height="18"/></g><g font-family="monospace" font-size="15" fill="#373b35"><text x="121" y="304">C7</text><text x="355" y="304">C8</text><text x="587" y="304">C9</text><text x="61" y="374" fill="#8b4c42">AREA KERUSAKAN</text><text x="61" y="392" fill="#8b4c42">TERCATAT / C7</text><circle cx="540" cy="278" r="11" fill="none" stroke="#985e50" stroke-width="2"/><path d="M533 271 L547 285 M547 271 L533 285" stroke="#985e50" stroke-width="2"/><text x="556" y="283" font-size="12">GZ-C02</text></g><text x="675" y="402" font-family="monospace" font-size="11" fill="#696257" text-anchor="end">SKEMA / NOT TO SCALE</text></svg></div><div style="margin-top:18px;border-top:1px solid #aca08e;padding-top:13px;font:12px/1.8 monospace"><div><b>REFERENCE:</b> VRC-ZC-01 / GAS PIPELINE DAMAGE REGISTER</div><div><b>LEVEL:</b> LANTAI 1 / ZONA C</div><div><b>INCIDENT AREA:</b> SEKTOR C7, BATAS KERUSAKAN BERDASARKAN SURVEI AWAL</div><div><b>NOTE:</b> Peta orientasi tidak menggantikan survei struktur terperinci.</div></div><footer style="margin-top:20px;border-top:1px solid #aca08e;padding-top:10px;font:10px monospace;color:#70685b">FACILITY RECORDS · REKONSTRUKSI FIKTIF</footer></article></div>`);
};

/* V26: audit activity is discovered in Envelope 03, as a raw terminal export. */
envelopes[0].items=envelopes[0].items.filter(id=>id!=='auditTerminal');
if(!envelopes[2].items.includes('auditTerminal'))envelopes[2].items.push('auditTerminal');
docs.auditTerminal={name:'AUDIT_TERMINAL_EVENTS.log',title:'TERMINAL ACTIVITY LOG',meta:'INFORMATION TECHNOLOGY / SYS-AUTH • AUDIT-SVC / 18 SEP 2018',sections:[],callout:''};
const previousAuditTerminalDocument=openDocument;
openDocument=function(id){
if(id!=='auditTerminal'){previousAuditTerminalDocument(id);return;}
if(!state.seen.includes(id))state.seen.push(id);persist();render();
const rows=[
['01:32:14','SYS-AUTH','SESSION_OPEN','CLN-AUDIT / WS-CLN-02','OK'],
['01:34:09','FS-SVC','FILE_ACCESS','VX17/REV-04','OK'],
['01:38:22','AUDIT-SVC','TASK_HOLD','SESSION 6F2 / VX17-AUDIT','QUEUED'],
['01:38:27','AUDIT-SVC','QUEUE_ACK','JOB-118','OK'],
['01:41:06','FS-SVC','FILE_ACCESS','VX17/RAW','OK'],
['01:46:10','SYS-AUTH','SESSION_IDLE','WS-DIR-02','ACTIVE'],
['02:04:18','AUDIT-SVC','REMOTE_REQ','SESSION 6F2 / JOB-118','PENDING'],
['02:09:31','SYS-AUTH','SESSION_END','DIR-ADMIN / WS-DIR-02','OK']];
const table='<div class="rawdata-scroll"><table class="rawtable" style="min-width:720px"><thead><tr><th>TIME (WIB)</th><th>SERVICE</th><th>EVENT</th><th>PROCESS / REFERENCE</th><th>STATE</th></tr></thead><tbody>'+rows.map(row=>'<tr>'+row.map(v=>'<td>'+v+'</td>').join('')+'</tr>').join('')+'</tbody></table></div>';
show('C:\\VEYRA\\CASE_001\\AUDIT_TERMINAL_EVENTS.log',`<div class="modalcontent"><button class="backfile" onclick="backModal()">← KEMBALI KE BERKAS SEBELUMNYA</button><article style="background:#eae2d0;color:#303833;padding:clamp(16px,3vw,30px);font-family:Arial,sans-serif"><header style="border-bottom:2px solid #69716a;padding-bottom:12px;display:flex;justify-content:space-between;flex-wrap:wrap;gap:12px;font:12px/1.6 monospace"><b>VEYRA RESEARCH CENTER / INFORMATION TECHNOLOGY</b><span>INTERNAL · EXTRACT</span></header><h2 style="margin:24px 0 8px">TERMINAL ACTIVITY LOG</h2><p style="font:12px/1.6 monospace">18 SEP 2018 · 01:20–02:25 WIB · EXPORT SYS-2018-0918-6F2</p><div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;background:#ded5c4;border:1px solid #bdb3a1;padding:15px;font:12px/1.6 monospace;margin:20px 0"><div><b>HOST</b><div>WS-DIR-02</div></div><div><b>ACCOUNT</b><div>DIR-ADMIN</div></div><div><b>SESSION</b><div>6F2</div></div><div><b>SOURCE</b><div>SYS-AUTH / AUDIT-SVC</div></div></div><h3 style="margin:25px 0 12px">SYSTEM EVENT EXPORT</h3>${table}<p style="margin-top:15px;font:11px/1.6 monospace;color:#766c5c">SYS-EXPORT / SESSION 6F2 / END OF RECORD</p><footer style="margin-top:25px;border-top:1px solid #bcb2a0;padding-top:12px;font:10px monospace;color:#736b5d">INTERNAL ARCHIVE COPY · REKONSTRUKSI FIKTIF</footer></article></div>`);
};

// Stage two archive cross-reference pending review.

docs.stage2Clock={name:'IT_CLOCK_COMPARISON.csv',title:'REGISTER PEMBANDING WAKTU',meta:'IT / 18 SEP 2018',sections:[['Reference Pulse','SERVER-NTP-01 / 02:10:00 WIB / LIGHT PULSE. CAM-AR03 / 02:03:00 / LIGHT PULSE.'],['Controller','DC-AR03 / 02:10:00 / LIGHT PULSE / NTP LOCKED.']],callout:''};
docs.stage2Door={name:'AR03_DOOR_EVENTS.csv',title:'REGISTER PINTU ARSIP',meta:'SECURITY / 18 SEP 2018',sections:[['Door Controller','01:48:04 / CARD 3006 / DENIED. 02:06:01 / CARD 4418 / GRANTED. 02:06:03 / DOOR OPEN. 02:06:18 / DOOR CLOSED.'],['Controller Clock','NTP LOCKED / SERVER TIME']],callout:''};
envelopes[1].items.push('stage2Clock','stage2Door');

const stage2Rows={
stage2Clock:[['SERVER-NTP-01','02:10:00','LIGHT PULSE'],['CAM-AR03','02:03:00','LIGHT PULSE'],['DC-AR03','02:10:00','LIGHT PULSE']],
stage2Door:[['01:48:04','3006','DENIED'],['02:06:01','4418','GRANTED'],['02:06:03','DOOR CONTACT','OPEN'],['02:06:18','DOOR CONTACT','CLOSED']]
};
const stage2OldOpen=openDocument;
openDocument=function(id){
if(!stage2Rows[id]){stage2OldOpen(id);return}
const d=docs[id];
const table='<div style="overflow-x:auto"><table class="rawtable"><thead><tr><th>REFERENCE / TIME</th><th>DEVICE / CARD</th><th>EVENT</th></tr></thead><tbody>'+stage2Rows[id].map(row=>'<tr>'+row.map(v=>'<td>'+v+'</td>').join('')+'</tr>').join('')+'</tbody></table></div>';
if(!state.seen.includes(id))state.seen.push(id);persist();render();
show(d.name,'<div class="modalcontent"><button class="backfile" onclick="backModal()">← KEMBALI KE BERKAS SEBELUMNYA</button><div class="letterhead"><b>VEYRA RESEARCH CENTER / DATA EXPORT</b></div><h2>'+d.title+'</h2><div class="meta">'+d.meta+'</div>'+table+'</div>');
};

/* v34 / Envelope 02: suspect-led investigation without asserting identity. */
docs.scene={name:'SCENE_EXAMINATION_AR03.pdf',title:'BERITA ACARA PEMERIKSAAN ARSIP AR-03',meta:'FIELD EXAMINATION / 19 SEP 2018 / INSPECTION COPY',sections:[
['AR-03 / ENTRY','Pintu ruang arsip ditemukan tertutup saat pemeriksaan pagi. Pelat pengunci memiliki goresan permukaan. Asal dan usia goresan tidak dapat ditentukan dari pengamatan visual.'],
['B-04 / STORAGE','Posisi B-04/17 tercatat pada inventaris sebagai lokasi penyimpanan sementara ENG/STR/07. Kondisi isi boks belum dapat dipastikan dari dokumentasi foto yang tersedia.'],
['CAM-AR03 / CORRIDOR','Kamera menghadap koridor timur. Wajah sosok yang terekam tidak teridentifikasi pada indeks frame yang tersedia.'],
['EVIDENCE INDEX','AR03-01 / kondisi pintu; AR03-02 / pelat pengunci; B04-01 / rak penyimpanan; CAM-AR03 / indeks frame. Dokumentasi visual bersifat rekonstruksi fiktif.']
],callout:''};
docs.sceneCardRegistry={name:'SECURITY_CARD_ASSIGNMENT_2018.csv',title:'REGISTER INVENTARIS KARTU AKSES',meta:'SECURITY SYSTEMS / 17 SEP 2018 / SEC-AC-0917',sections:[],callout:''};
docs.sceneNadiaStatement={name:'INTERVIEW_NS_0919_EXTRACT.pdf',title:'PETIKAN WAWANCARA PERSONEL',meta:'SECURITY INTERVIEW / 19 SEP 2018 / SUBJECT: N.S.',sections:[
['QUESTION / CARD 4418','Pemeriksa: Apakah kartu akses 4418 tercatat atas nama Anda?'],
['RESPONSE / N.S.','N.S.: Kartu itu memang terdaftar atas nama saya. Saya belum memeriksa seluruh catatan akses malam itu.'],
['QUESTION / AR-03','Pemeriksa: Apakah Anda dapat memastikan siapa yang memakai kartu tersebut pada pukul 02.06?'],
['RESPONSE / N.S.','N.S.: Tidak. Saya tidak dapat memastikan identitas orang hanya dari nomor kartu.'],
['RECORD STATUS','Keterangan ini belum diverifikasi dengan bukti lokasi independen.']
],callout:''};
['sceneCardRegistry','sceneNadiaStatement'].forEach(id=>{if(!envelopes[1].items.includes(id))envelopes[1].items.push(id)});

/* v35: field report formatting for the archive examination record */
const oldSceneReportOpen=openDocument;
openDocument=function(id){
if(id!=='scene'){oldSceneReportOpen(id);return}
if(!state.seen.includes(id))state.seen.push(id);persist();render();
const body='<div class="modalcontent"><button class="backfile" onclick="backModal()">← KEMBALI KE BERKAS SEBELUMNYA</button><article class="scene-field-report"><header class="scene-report-head"><div class="scene-report-mark">◇</div><div><strong>VEYRA RESEARCH CENTER</strong><small>SECURITY & FORENSIC DOCUMENTATION UNIT</small></div><span class="scene-report-copy">SALINAN ARSIP</span></header><h2>BERITA ACARA PEMERIKSAAN TEMPAT KEJADIAN</h2><div class="scene-report-subtitle">RUANG ARSIP AR-03 / BLOK B</div><table class="scene-report-meta"><tbody><tr><th>NO. BERKAS</th><td>VRC / SEC / TKP / 0919-03</td><th>KLASIFIKASI</th><td>INTERNAL</td></tr><tr><th>TANGGAL</th><td>19 SEPTEMBER 2018</td><th>LOKASI</th><td>AR-03, BLOK B</td></tr><tr><th>OBJEK</th><td colspan="3">Pintu arsip, koridor timur, rak penyimpanan B-04</td></tr></tbody></table><h3>I. RUANG LINGKUP PEMERIKSAAN</h3><p>Pemeriksaan visual awal dilakukan pada akses ruang arsip AR-03, koridor timur, dan rak penyimpanan B-04 setelah kejadian 18 September 2018. Temuan dicatat berdasarkan kondisi yang dapat diamati dan register yang tersedia.</p><h3>II. HASIL OBSERVASI</h3><table class="scene-report-findings"><thead><tr><th>NO.</th><th>OBJEK</th><th>HASIL PEMERIKSAAN</th><th>REFERENSI</th></tr></thead><tbody><tr><td>01</td><td>Pintu AR-03</td><td>Pintu tertutup saat pemeriksaan. Terdapat goresan permukaan pada pelat pengunci; usia dan asalnya belum ditentukan.</td><td>AR03-01 / AR03-02</td></tr><tr><td>02</td><td>Rak B-04</td><td>Register mencatat lokasi B-04/17 sebagai penyimpanan sementara ENG/STR/07. Kelengkapan isi boks belum diverifikasi.</td><td>B04-01 / REGISTER</td></tr><tr><td>03</td><td>Koridor timur</td><td>Kamera CAM-AR03 menghadap akses arsip. Indeks frame tidak menyediakan identifikasi wajah yang meyakinkan.</td><td>CAM-AR03</td></tr></tbody></table><h3>III. DAFTAR LAMPIRAN</h3><p>AR03-01 — Kondisi pintu; AR03-02 — Pelat pengunci; B04-01 — Rak penyimpanan; CAM-AR03 — Indeks rekaman koridor.</p><h3>IV. BATAS PEMERIKSAAN</h3><p>Temuan visual tidak menetapkan waktu terjadinya goresan, identitas pengguna kartu, maupun waktu perpindahan berkas. Verifikasi memerlukan pemeriksaan silang terhadap catatan sistem dan inventaris.</p><div class="scene-report-sign"><div>DISUSUN OLEH<br><svg class="scene-ink-sign" viewBox="0 0 180 68" aria-label="Tanda tangan fiktif Rina Pradipta"><path d="M12 47 C22 18 28 12 32 31 C35 43 16 59 19 43 C23 25 42 19 46 37 C48 50 36 52 41 37 C52 13 61 13 58 40 C57 51 67 30 74 32 C84 34 74 52 83 39 C92 25 98 33 98 42 C99 51 111 26 121 32 C130 38 114 50 127 40 C142 25 151 29 162 31 M22 57 C58 49 106 48 170 44" fill="none" stroke="#293f4d" stroke-width="1.7" stroke-linecap="round"/></svg><strong>RINA PRADIPTA</strong><small>Petugas Dokumentasi TKP<br>19 September 2018</small></div><div>DIPERIKSA OLEH<br><svg class="scene-ink-sign" viewBox="0 0 180 68" aria-label="Tanda tangan fiktif Bagas Wiratama"><path d="M16 51 C20 30 27 17 35 20 C46 23 32 42 19 45 C47 41 53 20 59 26 C64 34 50 52 64 44 C77 34 82 17 88 22 C92 27 78 48 92 39 C103 27 111 33 105 42 C100 50 121 29 132 32 C143 36 135 44 148 38 L163 28 M40 56 C73 51 111 51 161 47" fill="none" stroke="#233c4a" stroke-width="2" stroke-linecap="round"/></svg><strong>BAGAS WIRATAMA</strong><small>Koordinator Records Control<br>19 September 2018</small></div></div><footer>VRC / SEC / TKP / 0919-03 &nbsp; • &nbsp; HALAMAN 1 / 1<br>Dokumen rekonstruksi fiktif untuk permainan Planora Cold Case.</footer></article></div>';
show('VRC_SEC_TKP_0919-03.pdf',body);
};

/* v36 / printed report pages with separate evidence attachments */
const priorScenePages=openDocument;
openDocument=function(id){
priorScenePages(id);
if(id!=='scene')return;
const article=document.querySelector('#modalBody .scene-field-report');
if(!article)return;
const first=article.innerHTML;
const attachments=[
'<h2>LAMPIRAN FOTO TKP</h2><div class="scene-report-subtitle">ARSIP AR-03 / HALAMAN 2 DARI 3</div><h3>AR03-01 — PINTU ARSIP</h3><div class="scene-evidence-plate"><img class="scene-evidence-photo" src="Planora_Cold_Case_TKP_Photos/AR03-01.png" alt="Rekonstruksi bukti AR03-01.png"><small>REKONSTRUKSI VISUAL FIKSI / AR03-01.png</small></div><p>Lokasi: Koridor timur, pintu ruang arsip AR-03. Kondisi pemeriksaan: pintu tertutup.</p><h3>AR03-02 — DETAIL PELAT PENGUNCI</h3><div class="scene-evidence-plate"><img class="scene-evidence-photo" src="Planora_Cold_Case_TKP_Photos/AR03-02.png" alt="Rekonstruksi bukti AR03-02.png"><small>REKONSTRUKSI VISUAL FIKSI / AR03-02.png</small></div><p>Pengamatan: goresan permukaan terlihat pada pelat pengunci. Waktu dan penyebab belum diketahui.</p>',
'<h2>LAMPIRAN FOTO TKP</h2><div class="scene-report-subtitle">ARSIP AR-03 / HALAMAN 3 DARI 3</div><h3>B04-01 — RAK PENYIMPANAN</h3><div class="scene-evidence-plate"><img class="scene-evidence-photo" src="Planora_Cold_Case_TKP_Photos/B04-01.png" alt="Rekonstruksi bukti B04-01.png"><small>REKONSTRUKSI VISUAL FIKSI / B04-01.png</small></div><p>Register mencatat B-04/17 sebagai lokasi penyimpanan sementara. Ilustrasi tidak menetapkan kondisi aktual isi boks.</p><h3>CAM-AR03 — KORIDOR TIMUR</h3><div class="scene-evidence-plate"><img class="scene-evidence-photo" src="Planora_Cold_Case_TKP_Photos/CAM-AR03.png" alt="Rekonstruksi frame CCTV CAM-AR03 pukul 01.59"><small>REKONSTRUKSI VISUAL FIKSI / CAM-AR03</small></div><p>Rekaman kamera dan indeks frame tersedia sebagai berkas terpisah pada Amplop 02. Waktu kamera tidak identik dengan waktu server.</p>'
];
article.innerHTML='<div class="scene-page-content">'+first+'</div><div class="scene-page-content" hidden>'+attachments[0]+'</div><div class="scene-page-content" hidden>'+attachments[1]+'</div><nav class="scene-page-nav"><button type="button" onclick="sceneGoPage(-1)">← SEBELUMNYA</button><span id="scenePageCount">HALAMAN 1 / 3</span><button type="button" onclick="sceneGoPage(1)">BERIKUTNYA →</button></nav>';
article.dataset.page='0';
};
function sceneGoPage(delta){
const article=document.querySelector('#modalBody .scene-field-report');if(!article)return;
const pages=[...article.querySelectorAll('.scene-page-content')];const n=Math.max(0,Math.min(2,Number(article.dataset.page||0)+delta));
article.dataset.page=String(n);pages.forEach((p,i)=>p.hidden=i!==n);
document.getElementById('scenePageCount').textContent='HALAMAN '+(n+1)+' / 3';
article.querySelectorAll('.scene-page-nav button')[0].disabled=n===0;
article.querySelectorAll('.scene-page-nav button')[1].disabled=n===2;
article.scrollIntoView({block:'start',behavior:'smooth'});
}

/* v39: CCTV clock offset must be deduced from independent records, not revealed. */
for(const envelope of envelopes){envelope.items=envelope.items.filter(id=>id!=='cctv');}

/* v41 — dedicated physical archive register rendering */
const priorArchiveRegisterOpen=openDocument;
openDocument=function(id){
if(id!=='index'){priorArchiveRegisterOpen(id);return}
if(!state.seen.includes(id))state.seen.push(id);persist();render();
const entries=[
['00:11','RC-031','OPS/SHIFT/12','B-02/04','●','RT'],
['00:18','RC-032','ENG/PLAN/04','B-04/05','▲','HS'],
['00:27','RC-033','ADM/NOTE/21','A-01/09','◆','RT'],
['00:35','RC-034','SEC/LOG/08','C-01/03','●','MW'],
['00:42','RC-035','ENG/STR/07','B-04/17','▲','HS'],
['00:49','RC-036','OPS/FORM/14','B-02/07','●','RT'],
['00:57','RC-037','CLN/FORM/11','B-04/10','◆','MW'],
['01:06','RC-038','CLN/RAW/17','B-04/12','●','HS'],
['01:13','RC-039','ENG/LOG/03','B-03/02','▲','RT'],
['01:21','RC-040','FIN/PAY/09','A-02/08','◆','MW'],
['01:29','RC-041','ADM/MEMO/06','A-01/12','●','RT'],
['01:36','RC-042','SEC/SHIFT/05','C-01/06','▲','HS']
];
const rows=entries.map(row=>'<tr>'+row.map(cell=>'<td>'+cell+'</td>').join('')+'</tr>').join('');
show('REGISTER_DOKUMEN_2018.pdf','<div class="modalcontent"><button class="backfile" onclick="backModal()">← KEMBALI KE BERKAS SEBELUMNYA</button><article class="archive-ledger"><div class="archive-ledger-head"><div><b>VEYRA RESEARCH CENTER</b><small>RECORDS CONTROL / REGISTER COPY</small></div><span class="archive-ledger-stamp">RECEIVED<br>18 SEP 2018</span></div><h2>REGISTER PERPINDAHAN ARSIP</h2><div class="archive-ledger-meta"><span>NO. RC-0918/03</span><span>18 SEPTEMBER 2018</span><span>LEMBAR 03 / 07</span></div><div class="archive-ledger-scroll"><table><thead><tr><th>WAKTU</th><th>NO. TRANSAKSI</th><th>KODE BERKAS</th><th>LOKASI</th><th>KLAS.</th><th>PARAF</th></tr></thead><tbody>'+rows+'</tbody></table></div><div class="archive-ledger-legend" style="margin:16px 0;padding:12px 14px;border:1px solid #b7ac94;font-size:12px;line-height:1.7"><strong>KETERANGAN KOLOM & SIMBOL</strong><div>KLAS. = kelompok administrasi arsip: <b>●</b> dokumen operasional/rutin; <b>▲</b> dokumen teknis atau pengawasan; <b>◆</b> dokumen administrasi khusus. Simbol menunjukkan jenis pengelompokan, bukan tingkat kerahasiaan atau bukti pelanggaran.</div><div>PARAF = inisial petugas pencatat perpindahan, bukan otomatis orang yang mengambil berkas. RT, HS, dan MW adalah kode paraf dalam register; identitas lengkap memerlukan daftar petugas arsip.</div><div>LOKASI = kode rak/slot penyimpanan. WAKTU = waktu pencatatan administrasi, bukan bukti waktu masuk seseorang ke ruang arsip.</div></div><div class="archive-ledger-foot"><span>RC / COPY 03</span><span>RECORDS CONTROL</span></div><p class="archive-ledger-disclaimer">Dokumen rekonstruksi fiktif untuk Planora Cold Case.</p></article></div>');
};

/* v42 — camera event export with linked evidence frame */
const priorCameraIndexOpen=openDocument;
openDocument=function(id){
if(id!=='cctvMovement'){priorCameraIndexOpen(id);return;}
if(!state.seen.includes(id))state.seen.push(id);persist();render();
const events=[
['01:56:00','FRAME','CORRIDOR EMPTY','CAM-AR03/015600'],
['01:58:12','MOTION','CORRIDOR EAST','CAM-AR03/015812'],
['01:59:00','DOOR','AR-03 OPEN','CAM-AR03/015900'],
['02:03:00','LIGHT','PULSE DETECTED','CAM-AR03/020300'],
['02:04:16','MOTION','STAIR DIRECTION','CAM-AR03/020416']
];
const rows=events.map((e,i)=>'<tr><td>'+e[0]+'</td><td>'+e[1]+'</td><td>'+e[2]+'</td><td>'+(i===2?'<button class="camera-frame-link" type="button" onclick="showCameraFrame()">VIEW FRAME ↗</button>':e[3])+'</td></tr>').join('');
const html='<div class="modalcontent"><button class="backfile" onclick="backModal()">← KEMBALI KE BERKAS SEBELUMNYA</button><article class="camera-export"><header><strong>VEYRA RESEARCH CENTER</strong><span>SECURITY SYSTEM / EXPORT</span></header><h2>CAM-AR03 EVENT LOG</h2><div class="camera-export-meta"><span>18 SEP 2018</span><span>DEVICE: CAM-AR03</span><span>TIMEBASE: CAMERA LOCAL</span></div><div class="camera-export-table"><table><thead><tr><th>CAM TIME</th><th>EVENT</th><th>DETECTION</th><th>RECORD / FRAME</th></tr></thead><tbody>'+rows+'</tbody></table></div><div class="camera-export-footer"><span>EXPORT REF: AR03-EVT-0918</span><span>TIME SYNC: UNVERIFIED</span></div><section id="cameraFramePanel" class="camera-frame-panel" hidden><h3>CAM-AR03 / FRAME 01:59:00</h3><img src="Planora_Cold_Case_TKP_Photos/CAM-AR03.png" alt="Rekonstruksi frame CCTV koridor timur pada waktu kamera 01:59"><p>VISUAL RECONSTRUCTION / FICTIONAL CASE EVIDENCE</p></section><p class="camera-export-note">Dokumen rekonstruksi fiktif untuk permainan Planora Cold Case.</p></article></div>';
show('CAM_AR03_ACTIVITY_INDEX.csv',html);
};
function showCameraFrame(){
const p=document.getElementById('cameraFramePanel');if(!p)return;
p.hidden=!p.hidden;
if(!p.hidden)p.scrollIntoView({behavior:'smooth',block:'nearest'});
}

/* v43 — expanded access-controller export; preserve canonical 4418 event */
const previousDoorLogOpen=openDocument;
openDocument=function(id){
if(id!=='stage2Door'){previousDoorLogOpen(id);return}
if(!state.seen.includes(id))state.seen.push(id);persist();render();
const events=[
['01:17:42','DC-AR03','SYSTEM','HEARTBEAT','OK'],
['01:18:04','AR03-RDR','3006','ACCESS_DENIED','INVALID_ZONE'],
['01:18:09','AR03-RDR','3006','ACCESS_DENIED','INVALID_ZONE'],
['01:22:41','AR03-DCT','—','CONTACT_CLOSED','OK'],
['01:30:00','DC-AR03','SYSTEM','HEARTBEAT','OK'],
['01:41:26','AR03-RDR','5172','ACCESS_GRANTED','VALID'],
['01:41:29','AR03-DCT','—','CONTACT_OPEN','OK'],
['01:41:46','AR03-DCT','—','CONTACT_CLOSED','OK'],
['01:48:04','AR03-RDR','3006','ACCESS_DENIED','INVALID_ZONE'],
['01:52:30','DC-AR03','SYSTEM','HEARTBEAT','OK'],
['01:58:00','DC-AR03','SYSTEM','NTP_SYNC','LOCKED'],
['02:00:00','DC-AR03','SYSTEM','HEARTBEAT','OK'],
['02:06:01','AR03-RDR','4418','ACCESS_GRANTED','VALID'],
['02:06:03','AR03-DCT','—','CONTACT_OPEN','OK'],
['02:06:18','AR03-DCT','—','CONTACT_CLOSED','OK'],
['02:10:00','DC-AR03','SYSTEM','SYNC_PULSE','NTP_LOCKED'],
['02:12:00','DC-AR03','SYSTEM','HEARTBEAT','OK'],
['02:15:00','DC-AR03','SYSTEM','HEARTBEAT','OK']
];
const rows=events.map((e,i)=>'<tr><td>'+String(i+1).padStart(3,'0')+'</td>'+e.map(v=>'<td>'+v+'</td>').join('')+'</tr>').join('');
const html='<div class="modalcontent"><button class="backfile" onclick="backModal()">← KEMBALI KE BERKAS SEBELUMNYA</button><article class="door-controller-log"><header><strong>VEYRA RESEARCH CENTER</strong><span>ACCESS CONTROL / SYSTEM EXPORT</span></header><h2>REGISTER PINTU ARSIP</h2><div class="door-log-meta"><span>CONTROLLER: DC-AR03</span><span>18 SEP 2018</span><span>TIMEBASE: SERVER / NTP LOCKED</span></div><div class="door-log-scroll"><table><thead><tr><th>SEQ</th><th>SERVER TIME</th><th>DEVICE</th><th>CARD ID</th><th>EVENT</th><th>STATUS</th></tr></thead><tbody>'+rows+'</tbody></table></div><footer><span>EXPORT: DC-AR03 / EVT-0918</span><span>RECORD COUNT: 018</span></footer><p class="door-log-note">Rekonstruksi dokumen fiktif untuk Planora Cold Case.</p></article></div>';
show('AR03_DOOR_EVENTS.csv',html);
};

/* v44 — witness examination files, released only in Envelope 02 */
const witnessFiles={
bapNadia:{name:'BAP_NS_0919.pdf',person:'NADIA SANTOSO',age:'38',role:'Kepala Laboratorium',unit:'Research Division',initials:'N.S.',number:'BAP-NS-019/2018',qa:[
['Apakah kartu akses 4418 tercatat atas nama Anda?','Ya. Kartu itu terdaftar atas nama saya.'],
['Apakah kartu tersebut dapat dipakai untuk mengakses ruang arsip?','Sepengetahuan saya, kartu itu memiliki izin akses untuk area laboratorium dan arsip tertentu.'],
['Di mana kartu itu Anda simpan pada hari sebelum kejadian?','Biasanya saya membawanya bersama identitas kerja. Saya tidak mencatat setiap kali kartu saya letakkan.'],
['Apakah Anda melihat catatan penggunaan kartu pada malam kejadian?','Belum seluruhnya ketika pemeriksaan ini dimulai.'],
['Apakah Anda berada di depan pintu AR-03 pukul 02.06?','Saya tidak dapat mengonfirmasi waktu itu berdasarkan ingatan saja.'],
['Dalam catatan awal Saudari memperkirakan perjalanan dari sekitar AR-03 ke pos SEC-01 hanya sepuluh detik. Apakah waktu itu Saudari ukur?','Tidak. Itu perkiraan saya ketika diminta mengingat perpindahan malam itu. Saya tidak menyalakan stopwatch dan tidak bisa memastikan jam tepatnya.'],
['Apakah Saudari memastikan melewati simpang J-01?','Saya biasa melewati koridor itu, tetapi tidak dapat memastikan setiap langkah saya pada malam kejadian.'],
['Apakah Anda dapat mengenali sosok pada rekaman koridor?','Tidak dari gambar yang diperlihatkan kepada saya.'],
['Apakah Anda mengetahui isi rak B-04/17?','Saya mengetahui ada dokumen lintas unit yang disimpan sementara, tetapi tidak memeriksa isinya.'],
['Apakah ada dokumen pembanding hasil uji VX-17 yang Saudari cari?','Ada salinan tabel kerja dan catatan perbedaan angka yang ingin saya cocokkan dengan laporan revisi. Saya belum dapat memastikan apakah seluruh lembar masih lengkap setelah kejadian.'],
['Apakah nomor kartu cukup untuk menentukan siapa yang masuk?','Menurut saya tidak. Perlu bukti lain untuk memastikan orangnya.']
]},
bapSiska:{name:'BAP_SA_0919.pdf',person:'SISKA ARUM',age:'29',role:'Petugas Keamanan',unit:'Security Operations',initials:'S.A.',number:'BAP-SA-020/2018',qa:[
['Apa tugas Anda pada malam 17–18 September?','Memantau area keamanan sesuai penugasan dan mencatat kejadian yang dilaporkan.'],
['Apakah setiap pintu arsip dijaga langsung?','Tidak. Sebagian akses menggunakan pembaca kartu dan sensor pintu.'],
['Apakah pembaca kartu merekam wajah pengguna?','Setahu saya tidak. Pembaca mencatat kartu yang digunakan.'],
['Apakah Anda melihat langsung seseorang membuka AR-03?','Saya tidak menyaksikan pembukaan pintu itu secara langsung.'],
['Apa yang Anda ketahui tentang kartu 4418?','Nomor tersebut bisa dicocokkan dengan register penugasan kartu.'],
['Apakah akses yang disetujui selalu berarti pintu dibuka?','Belum tentu. Sensor kontak pintu mencatat perubahan posisi secara terpisah.'],
['Apakah Anda memeriksa seluruh rekaman kamera malam itu?','Tidak seluruhnya. Pemeriksaan rekaman dilakukan dari salinan yang tersedia.'],
['Apakah Anda dapat menyebutkan identitas orang pada frame koridor?','Tidak dapat dipastikan dari frame yang saya lihat.']
]},
bapFarhan:{name:'BAP_FM_0919.pdf',person:'FARHAN MAHENDRA',age:'33',role:'Teknisi IT / CCTV',unit:'Information Technology',initials:'F.M.',number:'BAP-FM-021/2018',qa:[
['Sistem apa yang Anda tangani?','Perangkat jaringan, kamera pengawas, dan dukungan pencatatan waktu sistem.'],
['Apakah jam setiap perangkat selalu identik?','Tidak selalu. Status sinkronisasi harus dilihat pada catatan perangkat.'],
['Apakah DC-AR03 memakai referensi waktu server?','Log pengendali pintu mencatat status NTP; detailnya ada pada ekspor perangkat.'],
['Apakah CAM-AR03 menggunakan referensi yang sama?','Saya tidak akan menyamakan kedua jam tanpa membandingkan hasil uji.'],
['Apa fungsi kejadian SYNC PULSE?','Itu penanda pengujian yang dapat muncul pada lebih dari satu sistem.'],
['Apakah gambar CCTV cukup untuk mengenali wajah?','Tidak pada semua kondisi. Sudut dan mutu gambar membatasi identifikasi.'],
['Apakah Anda dapat mengetahui siapa membawa kartu 4418?','Tidak hanya dari log pembaca kartu.'],
['Dalam log ada SESSION 6F2 / VX17-AUDIT. Apa maksudnya?','6F2 adalah penanda sesi sistem, bukan nama orang. VX17-AUDIT merujuk pada tugas audit. Untuk mengetahui akun yang terhubung, perlu mencocokkan log autentikasi; status antrean sendiri tidak membuktikan tugas dijalankan.'],
['Apa arti CHANNEL 01 dan CHANNEL 02 dalam kronologi?','Nomor kanal harus dibaca bersama kode perangkatnya. CHANNEL 01 pada STR-C04 berkaitan dengan pembacaan getaran struktur; CHANNEL 02 pada GZ-C02 berkaitan dengan detektor gas Zona C. Angka kanal saja tidak cukup untuk menentukan jenis sensor.'],
['Apa perbedaan RAISED dan ACTIVE?','RAISED menandai peringatan yang baru dipicu; ACTIVE berarti statusnya masih tercatat aktif. Dua baris itu tidak otomatis berarti dua peristiwa terpisah.'],
['Apakah Anda mengubah rekaman asli setelah kejadian?','Saya tidak mencatat perubahan terhadap sumber asli dalam pekerjaan pemeriksaan awal saya. Pernyataan ini dapat diperiksa terhadap log pekerjaan.']
]}
};
for(const [id,w] of Object.entries(witnessFiles)){
docs[id]={name:w.name,title:'BERITA ACARA PEMERIKSAAN — '+w.person,meta:'INTERNAL INVESTIGATION / 19 SEP 2018',sections:[],callout:''};
if(!envelopes[1].items.includes(id))envelopes[1].items.push(id);
}
envelopes[1].items=envelopes[1].items.filter(id=>id!=='sceneNadiaStatement');
const priorBapOpen=openDocument;
openDocument=function(id){
if(!witnessFiles[id]){priorBapOpen(id);return}
const w=witnessFiles[id];
if(!state.seen.includes(id))state.seen.push(id);persist();render();
const qa=w.qa.map((p,i)=>'<div class="bap-entry"><div class="bap-question"><b>P'+String(i+1).padStart(2,'0')+' / PEMERIKSA</b><p>'+p[0]+'</p></div><div class="bap-answer"><b>J'+String(i+1).padStart(2,'0')+' / '+w.initials+'</b><p>'+p[1]+'</p></div></div>').join('');
const ink=(d)=>'<svg class="bap-ink" viewBox="0 0 180 62" aria-label="Tanda tangan fiktif"><path d="'+d+'" fill="none" stroke="#293e4b" stroke-width="1.9" stroke-linecap="round"/></svg>';
const inspectorInk=ink('M12 42 Q26 7 32 24 T24 47 Q40 21 47 35 T57 38 Q65 16 71 31 T83 36 Q95 20 103 35 T120 30 Q140 18 162 29 M19 51 Q91 45 170 42');
const witnessInk=ink(w.initials==='N.S.'?'M11 46 Q26 9 31 30 T42 36 Q55 16 60 35 T74 31 Q86 12 92 34 T110 32 Q128 14 143 30 L166 24 M35 51 Q104 43 167 46':w.initials==='S.A.'?'M15 38 Q31 11 39 25 Q45 38 22 45 Q52 36 62 20 T74 38 Q88 14 95 36 T116 30 Q137 15 158 33 M28 53 Q92 49 166 43':'M12 46 Q18 12 29 23 Q36 35 22 41 Q46 18 55 37 Q66 49 73 24 T89 36 Q98 21 109 33 T135 28 Q150 17 167 26 M32 51 Q98 43 166 45');
const html='<div class="modalcontent"><button class="backfile" onclick="backModal()">← KEMBALI KE BERKAS SEBELUMNYA</button><article class="bap-sheet"><header><strong>VEYRA RESEARCH CENTER</strong><span>INTERNAL INVESTIGATION / WITNESS RECORD</span></header><h2>BERITA ACARA PEMERIKSAAN</h2><p class="bap-subtitle">KETERANGAN SAKSI / '+w.number+'</p><div class="bap-person"><div><b>NAMA</b><span>'+w.person+'</span></div><div><b>USIA</b><span>'+w.age+' TAHUN</span></div><div><b>JABATAN</b><span>'+w.role+'</span></div><div><b>UNIT</b><span>'+w.unit+'</span></div><div><b>TANGGAL</b><span>19 SEPTEMBER 2018</span></div><div><b>STATUS</b><span>SAKSI / KETERANGAN BELUM DIVERIFIKASI</span></div></div><h3>TRANSKRIP PEMERIKSAAN</h3>'+qa+'<div class="bap-signatures"><div>PEMERIKSA<div class="bap-sign-space">'+inspectorInk+'</div><b>UNIT INVESTIGASI INTERNAL</b></div><div>PEMBERI KETERANGAN<div class="bap-sign-space">'+witnessInk+'</div><b>'+w.person+'</b></div></div><footer>'+w.number+' / SALINAN TRANSKRIP<br>Dokumen fiktif untuk permainan Planora Cold Case.</footer></article></div>';
show(w.name,html);
};

/* v46 — neutral two-page facility plan, no suggested route */
const priorFacilityMapOpen=openDocument;
openDocument=function(id){
if(id!=='map'){priorFacilityMapOpen(id);return;}
if(!state.seen.includes(id))state.seen.push(id);persist();render();
const plan='<svg viewBox="0 0 720 450" role="img" aria-label="Denah skematis lantai satu Veyra sektor timur tanpa garis rute" xmlns="http://www.w3.org/2000/svg"><rect width="720" height="450" fill="#f0eadc"/><g stroke="#59645d" stroke-width="2" fill="#e0ded2"><rect x="30" y="45" width="190" height="125"/><rect x="250" y="45" width="190" height="125"/><rect x="470" y="45" width="220" height="125" fill="#d7e4dd"/><rect x="30" y="275" width="190" height="125"/><rect x="250" y="275" width="190" height="125"/><rect x="470" y="275" width="220" height="125"/><rect x="30" y="190" width="660" height="65" fill="#d5d9d0"/><rect x="326" y="255" width="38" height="20" fill="#d5d9d0" stroke="none"/></g><g fill="#263b36" font-family="monospace" font-size="17" text-anchor="middle"><text x="125" y="99">POS KEAMANAN</text><text x="125" y="124" font-size="13">SEC-01</text><text x="345" y="99">RUANG IT</text><text x="345" y="124" font-size="13">IT-02</text><text x="580" y="99">ARSIP AR-03</text><text x="580" y="124" font-size="13">CARD ACCESS</text><text x="125" y="332">LOBI</text><text x="125" y="357" font-size="13">ENTRANCE</text><text x="345" y="332">TANGGA TIMUR</text><text x="345" y="357" font-size="13">STAIR-E</text><text x="580" y="332">LABORATORIUM C</text><text x="580" y="357" font-size="13">LAB-C</text><text x="360" y="211" font-size="13">KORIDOR TIMUR</text></g><g><circle cx="345" cy="231" r="12" fill="#f9f0c7" stroke="#425b54" stroke-width="2"/><text x="345" y="235" text-anchor="middle" font-family="monospace" font-size="10" font-weight="bold" fill="#213e38">J</text><rect x="357" y="236" width="160" height="24" rx="3" fill="#f0eadc" stroke="#88948a"/><text x="365" y="252" font-family="monospace" font-size="13" font-weight="bold" fill="#213e38">J-01 / SIMPANG</text></g><g fill="#b65e4d"><circle cx="580" cy="187" r="8"/><circle cx="450" cy="222" r="8"/></g><g fill="#4a554f" font-family="monospace" font-size="12"><text x="591" y="183">RDR-AR03</text><text x="462" y="217">CAM-AR03</text><text x="35" y="29">VRC-FAC-01 / REV 02</text><text x="36" y="433">N ↑ / SCHEMATIC / NOT TO SCALE</text></g><path d="M680 30 V12 M674 20 L680 12 L686 20" stroke="#263b36" fill="none" stroke-width="2"/></svg>';
const page1='<h3>I. DENAH LANTAI 01 — SEKTOR TIMUR</h3><div class="facility-plan">'+plan+'</div><p class="facility-note">Titik J-01 merupakan simpang pengukuran di koridor timur, dekat akses tangga. Denah tidak menunjukkan rute perjalanan seseorang.</p>';
const page2='<h3>II. REFERENSI PENGUKURAN</h3><div class="facility-table"><table><thead><tr><th>SEGMEN</th><th>JARAK SKEMATIS</th><th>KONDISI</th></tr></thead><tbody><tr><td>SEC-01 → J-01</td><td>18 m</td><td>Koridor umum</td></tr><tr><td>J-01 → AR-03</td><td>24 m</td><td>Pintu akses kartu</td></tr><tr><td>STAIR-E → J-01</td><td>12 m</td><td>Koridor umum</td></tr><tr><td>LAB-C → AR-03</td><td>31 m</td><td>Melalui koridor timur</td></tr></tbody></table></div><h3>III. LEMBAR SIMULASI WAKTU TEMPUH</h3><p class="facility-note">VRC-FAC/TIME-01 · Rekonstruksi perhitungan, bukan pengukuran perjalanan saksi. PANDUAN KECEPATAN (ASUMSI SIMULASI): BERJALAN = 1,4 meter/detik; BERLARI = 3,0 meter/detik. Rumus waktu tempuh (detik) = jarak (meter) dibagi kecepatan (meter/detik). Contoh: 42 meter / 3,0 = 14 detik. Untuk memeriksa alibi, hitung juga kecepatan yang dibutuhkan = jarak dibagi selisih waktu klaim. Angka simulasi bukan batas maksimum kemampuan manusia.</p><div class="facility-table"><table><thead><tr><th>SEGMEN</th><th>JARAK</th><th>BERJALAN 1,4 m/s</th><th>BERLARI 3,0 m/s</th></tr></thead><tbody><tr><td>SEC-01 → J-01</td><td>18 m</td><td>12,9 detik</td><td>6,0 detik</td></tr><tr><td>J-01 → AR-03</td><td>24 m</td><td>17,1 detik</td><td>8,0 detik</td></tr><tr><td>STAIR-E → J-01</td><td>12 m</td><td>8,6 detik</td><td>4,0 detik</td></tr><tr><td>LAB-C → AR-03</td><td>31 m</td><td>22,1 detik</td><td>10,3 detik</td></tr><tr><td>SEC-01 → J-01 → AR-03</td><td>42 m</td><td>30,0 detik</td><td>14,0 detik</td></tr></tbody></table></div><p class="facility-note"><b>METODE:</b> Angka dihitung dari jarak skematis, dibulatkan satu desimal. Belum memperhitungkan percepatan, belokan, pintu kartu, waktu tunggu, kepadatan koridor, atau rute lain. Kecepatan lari di koridor merupakan skenario pembanding, bukan hasil uji lapangan.</p><p class="facility-note"><b>CATATAN VERIFIKASI:</b> Untuk menguji klaim waktu personel, bandingkan Register Alibi, log kartu AR-03, dan CCTV CAM-AR03. Waktu tampilan kamera perlu diperiksa terhadap dokumen verifikasi jam kamera. Perhitungan ini saja tidak menetapkan identitas atau membuktikan kebohongan.</p>';
show('DENAH_AKSES.pdf','<div class="modalcontent"><button class="backfile" onclick="backModal()">← KEMBALI KE BERKAS SEBELUMNYA</button><article class="facility-sheet"><header><strong>VEYRA RESEARCH CENTER / FACILITY RECORDS</strong><span>VRC-FAC-01 · REV 02</span></header><h2>DENAH & JALUR AKSES</h2><p>18 SEPTEMBER 2018 / SEKTOR TIMUR</p>'+page1+page2+'<footer>REKONSTRUKSI FIKTIF / PLANORA COLD CASE</footer></article></div>');
};

/* v48 — departmental master reference register, not an investigator's explanation */
docs.personnelIndex={name:'VRC_MASTER_REFERENCE_REGISTER_REV03.pdf',title:'REGISTER REFERENSI UNIT & PROYEK',meta:'PENGENDALIAN ARSIP / REV.03 / 17 SEP 2018',sections:[],callout:''};
const previousMasterRegisterOpen=openDocument;
openDocument=function(id){
if(id!=='personnelIndex'){previousMasterRegisterOpen(id);return;}
if(!state.seen.includes(id))state.seen.push(id);persist();render();
const records=[
['STR','STRUKTUR','Rekayasa Struktur','TEKNIK','AKTIF','12/09/18'],
['STR/C7','ELEMEN','Kolom C7','TEKNIK','TINDAK LANJUT','16/09/18'],
['STR/C8','ELEMEN','Kolom C8','TEKNIK','RUTIN','12/09/18'],
['STR/C9','ELEMEN','Kolom C9','TEKNIK','RUTIN','12/09/18'],
['ENG/STR/07','BERKAS','Pemeriksaan elemen struktur','TEKNIK','TERBATAS','16/09/18'],
['CLN','KLINIS','Penelitian Klinis','PENELITIAN','AKTIF','01/09/18'],
['CLN/VX17','STUDI','Studi pemulihan saraf','KLINIS','AKTIF','04/09/18'],
['CLN/VX09','ARSIP','Studi pendahuluan','KLINIS','DIARSIPKAN','30/08/18'],
['CLN/RAW/17','BERKAS','Register data primer','KLINIS','TERBATAS','04/09/18'],
['OPS','OPERASIONAL','Operasional Fasilitas','OPERASIONAL','AKTIF','01/09/18'],
['SEC','KEAMANAN','Operasional Keamanan','KEAMANAN','AKTIF','01/09/18'],
['IT','SISTEM','Teknologi Informasi','IT','AKTIF','01/09/18'],
['AR-03','LOKASI','Ruang arsip timur','ARSIP','AKTIF','17/09/18'],
['B-04/17','LOKASI','Rak penyimpanan sementara','ARSIP','AKTIF','17/09/18'],
['FIN','KEUANGAN','Keuangan & Pengadaan','KEUANGAN','AKTIF','01/09/18']
];
const rows=records.map((r,i)=>'<tr><td>'+String(i+1).padStart(2,'0')+'</td>'+r.map(v=>'<td>'+v+'</td>').join('')+'</tr>').join('');
const html='<div class="modalcontent"><button class="backfile" onclick="backModal()">← KEMBALI KE BERKAS SEBELUMNYA</button><article class="master-register"><header><strong>VEYRA RESEARCH CENTER / PENGENDALIAN ARSIP</strong><span>SALINAN TERKENDALI · RC-MR-03</span></header><h2>REGISTER REFERENSI UNIT & PROYEK</h2><p class="small">Keterangan status: AKTIF = masih berlaku; RUTIN = pemantauan berkala; TINDAK LANJUT = memerlukan pemeriksaan lanjutan; TERBATAS = akses hanya bagi personel berwenang; DIARSIPKAN = tidak lagi aktif dan disimpan sebagai arsip.</p><div class="master-meta"><span>REVISI: 03</span><span>BERLAKU: 17 SEP 2018</span><span>HALAMAN: 01 / 01</span></div><div class="master-scroll"><table><thead><tr><th>NO.</th><th>KODE</th><th>JENIS</th><th>REFERENSI</th><th>UNIT PENANGGUNG JAWAB</th><th>STATUS</th><th>TGL. REVISI</th></tr></thead><tbody>'+rows+'</tbody></table></div><div class="master-approval"><span>DISUSUN OLEH: PENGENDALIAN ARSIP</span><span>DISETUJUI: RC / 17 SEP 2018</span></div><footer>VRC / RC-MR-03 / REGISTER REFERENSI TERKENDALI<br>Rekonstruksi fiktif untuk Planora Cold Case.</footer></article></div>';
show('VRC_MASTER_REFERENCE_REGISTER_REV03.pdf',html);
};

/* v49 — technical clock comparison report, multiple synchronized test records */
docs.stage2Clock={name:'IT_CLOCK_COMPARISON.csv',title:'LAPORAN SINKRONISASI WAKTU PERANGKAT',meta:'IT SYSTEMS / 18 SEP 2018 / CALIBRATION EXPORT',sections:[],callout:''};
const priorTimeComparisonOpen=openDocument;
openDocument=function(id){
if(id!=='stage2Clock'){priorTimeComparisonOpen(id);return;}
if(!state.seen.includes(id))state.seen.push(id);persist();render();
const records=[
['01','01:30:00','01:30:00','01:23:00','NTP HEARTBEAT','CAM: LOCAL'],
['02','01:45:00','01:45:00','01:38:00','TIME CHECK','CAM: LOCAL'],
['03','02:00:00','02:00:00','01:53:00','TIME CHECK','CAM: LOCAL'],
['04','02:10:00','02:10:00','02:03:00','LIGHT / SYNC PULSE','CAM: LOCAL'],
['05','02:12:00','02:12:00','02:05:00','POST-PULSE SAMPLE','CAM: LOCAL']
];
const rows=records.map(r=>'<tr>'+r.map(v=>'<td>'+v+'</td>').join('')+'</tr>').join('');
const html='<div class="modalcontent"><button class="backfile" onclick="backModal()">← KEMBALI KE BERKAS SEBELUMNYA</button><article class="time-compare"><header><strong>VEYRA RESEARCH CENTER / INFORMATION TECHNOLOGY</strong><span>SYSTEM AUDIT EXPORT</span></header><h2>LAPORAN SINKRONISASI WAKTU PERANGKAT</h2><div class="time-meta"><span>REF: IT-TIME-0918/04</span><span>DATE: 18 SEP 2018</span><span>TECHNICAL COPY</span></div><h3>I. PERANGKAT PEMBANDING</h3><div class="time-scroll"><table><thead><tr><th>DEVICE ID</th><th>FUNCTION</th><th>TIME SOURCE</th><th>SYNC STATUS</th></tr></thead><tbody><tr><td>SERVER-NTP-01</td><td>REFERENCE SERVER</td><td>NTP / WIB</td><td>LOCKED</td></tr><tr><td>DC-AR03</td><td>DOOR CONTROLLER</td><td>SERVER-NTP-01</td><td>LOCKED</td></tr><tr><td>CAM-AR03</td><td>CORRIDOR CAMERA</td><td>LOCAL CLOCK</td><td>SERVICE PENDING</td></tr></tbody></table></div><h3>II. HASIL PENGUJIAN</h3><div class="time-scroll"><table><thead><tr><th>SEQ</th><th>SERVER WIB</th><th>DC-AR03</th><th>CAM-AR03</th><th>TEST MARKER</th><th>REMARK</th></tr></thead><tbody>'+rows+'</tbody></table></div><h3>III. STATUS PEMERIKSAAN</h3><p>Ekspor diagnostik memuat sampel pembacaan perangkat dan penanda uji. Koreksi jam kamera belum tercatat pada salinan ini. Identitas orang pada rekaman tidak diperiksa dalam dokumen pengujian waktu.</p><div class="time-approval"><span>PREPARED: IT SYSTEMS</span><span>EXPORT ID: IT-TIME-0918/04</span></div><footer>CONTROLLED TECHNICAL COPY / REKONSTRUKSI FIKTIF</footer></article></div>';
show('IT_CLOCK_COMPARISON.csv',html);
};

/* v50: additional camera clock service record */
docs.camConfigAudit={name:'CAM_AR03_CLOCK_SERVICE.log',title:'RIWAYAT LAYANAN JAM CAM-AR03',meta:'IT SYSTEMS / 18 SEP 2018',sections:[
['17 SEP / 21:14','CAM-AR03 / BOOT COMPLETE / TIME SOURCE: LOCAL RTC'],
['17 SEP / 21:16','CAM-AR03 / TIME SERVICE CHECK / NTP REQUEST: TIMEOUT'],
['17 SEP / 23:09','CAM-AR03 / MAINTENANCE REVIEW / TIME SETTINGS: VIEWED'],
['18 SEP / 01:45','CAM-AR03 / TIME CHECK / STATUS: UNSYNCHRONIZED'],
['18 SEP / 02:03','CAM-AR03 / LIGHT PULSE / FRAME MARKER CAPTURED'],
['18 SEP / 02:05','CAM-AR03 / TIME CHECK / STATUS: UNSYNCHRONIZED'],
['18 SEP / 02:16','CAM-AR03 / TIME SERVICE CHECK / NTP REQUEST: TIMEOUT']
],callout:''};
if(!envelopes[1].items.includes('camConfigAudit'))envelopes[1].items.push('camConfigAudit');

/* v51 camera service table */
const beforeCameraService=openDocument;
openDocument=function(id){
 if(id!=='camConfigAudit'){return beforeCameraService(id);}
 if(!state.seen.includes(id))state.seen.push(id);persist();render();
 const entries=[['17/09 21:14','SERVER','BOOT_COMPLETE','LOCAL_RTC','OK'],['17/09 21:16','SERVER','NTP_CHECK','SERVER-NTP-01','TIMEOUT'],['17/09 23:09','SERVER','MAINTENANCE_REVIEW','TIME_SETTINGS','VIEW ONLY'],['18/09 01:45','CAMERA','TIME_CHECK','LOCAL_RTC','UNSYNC'],['18/09 02:03','CAMERA','LIGHT_PULSE','FRAME_MARKER','CAPTURED'],['18/09 02:05','CAMERA','TIME_CHECK','LOCAL_RTC','UNSYNC'],['18/09 02:16','SERVER','NTP_CHECK','SERVER-NTP-01','TIMEOUT']];
 const rows=entries.map((r,i)=>'<tr><td>'+String(i+1).padStart(2,'0')+'</td>'+r.map(v=>'<td>'+v+'</td>').join('')+'</tr>').join('');
 const html='<div class="modalcontent"><button class="backfile" onclick="backModal()">← KEMBALI KE BERKAS SEBELUMNYA</button><article class="time-compare"><header><strong>VEYRA RESEARCH CENTER / IT SYSTEMS</strong><span>SERVICE HISTORY EXPORT</span></header><h2>RIWAYAT LAYANAN JAM CAM-AR03</h2><div class="time-meta"><span>IT-CAM03-0918</span><span>17–18 SEP 2018</span><span>TIMEBASE PER ROW</span></div><div class="time-scroll"><table><thead><tr><th>SEQ</th><th>TIME</th><th>CLOCK</th><th>EVENT</th><th>PARAMETER</th><th>RESULT</th></tr></thead><tbody>'+rows+'</tbody></table></div><h3>KETERANGAN ISTILAH TEKNIS</h3><div class="time-scroll"><table><thead><tr><th>ISTILAH</th><th>ARTI DALAM CATATAN</th></tr></thead><tbody><tr><td>SERVER / CAMERA</td><td>Waktu sistem pusat / waktu lokal yang tertulis pada rekaman kamera. Kedua jam belum tentu sama.</td></tr><tr><td>LOCAL_RTC</td><td>Jam internal perangkat.</td></tr><tr><td>NTP_CHECK</td><td>Pemeriksaan sinkronisasi jam terhadap server waktu.</td></tr><tr><td>TIMEOUT</td><td>Permintaan tidak memperoleh respons dalam batas waktu; bukan bukti perubahan jam.</td></tr><tr><td>UNSYNC</td><td>Jam kamera belum tersinkronisasi dengan waktu acuan.</td></tr><tr><td>LIGHT_PULSE / FRAME_MARKER</td><td>Kilatan lampu yang terekam sebagai penanda untuk dibandingkan dengan catatan waktu perangkat lain.</td></tr><tr><td>CAPTURED</td><td>Penanda berhasil direkam.</td></tr><tr><td>MAINTENANCE_REVIEW / VIEW ONLY</td><td>Pemeriksaan pengaturan / hanya dilihat; tidak menunjukkan pengaturan diubah.</td></tr><tr><td>BOOT_COMPLETE / OK</td><td>Proses awal perangkat selesai / proses dilaporkan berhasil.</td></tr></tbody></table></div><p><b>CATATAN TEKNIS:</b> Untuk membandingkan waktu pada dua perangkat, gunakan peristiwa fisik yang sama sebagai penanda. Status UNSYNC tidak menunjukkan besar selisih waktu. Catatan ini tidak menetapkan identitas operator atau membuktikan perubahan konfigurasi.</p><footer>IT-CAM03-0918 / FICTIONAL TECHNICAL RECORD</footer></article></div>';
 show('CAM_AR03_CLOCK_SERVICE.log',html);
};

/* v52 — investigative basis for archive examination */
docs.archiveExaminationOrder={name:'SP_INV_019_2018.pdf',title:'SURAT PERINTAH PEMERIKSAAN LANJUTAN',meta:'UNIT INVESTIGASI INTERNAL / 19 SEP 2018 / SP-INV-019',sections:[],callout:''};
envelopes[1].items=envelopes[1].items.filter(x=>x!=='archiveExaminationOrder');
envelopes[1].items.unshift('archiveExaminationOrder');
const beforeArchiveOrder=openDocument;
openDocument=function(id){
 if(id!=='archiveExaminationOrder')return beforeArchiveOrder(id);
 if(!state.seen.includes(id))state.seen.push(id);persist();render();
 const html='<div class="modalcontent"><button class="backfile" onclick="backModal()">← KEMBALI KE BERKAS SEBELUMNYA</button><article class="time-compare"><header><strong>VEYRA RESEARCH CENTER / UNIT INVESTIGASI INTERNAL</strong><span>SALINAN TERKENDALI · SP-INV-019/2018</span></header><h2>SURAT PERINTAH PEMERIKSAAN LANJUTAN</h2><div class="time-meta"><span>TANGGAL: 19 SEP 2018</span><span>PERIHAL: VERIFIKASI DOKUMEN STRUKTUR</span><span>STATUS: TERBUKA</span></div><h3>I. DASAR PEMERIKSAAN</h3><p>Sehubungan dengan pemeriksaan pascainsiden 18 September 2018, Unit Investigasi Internal menerima rujukan laporan inspeksi struktur <strong>ENG/STR/07</strong> dan catatan rekomendasi tindak lanjut terhadap elemen C7. Pemeriksaan salinan laporan, distribusi, dan pencatatan penerimaannya diperlukan untuk merekonstruksi alur administrasi sebelum insiden.</p><h3>II. RUANG LINGKUP</h3><p>Petugas Records Control diminta mencocokkan nomor berkas ENG/STR/07 dengan register perpindahan, memverifikasi lokasi penyimpanan sementara <strong>B-04/17</strong>, serta memeriksa apakah berkas yang dirujuk tersedia dalam inventaris ruang arsip <strong>AR-03</strong>. Hubungan antara kode rak dan lokasi ruang harus diverifikasi melalui register fasilitas, bukan diasumsikan.</p><h3>III. PELAKSANAAN</h3><p>Setiap pemeriksaan fisik harus disertai dokumentasi kondisi pintu, rak, dan segel; catatan akses elektronik serta rekaman pengawasan hanya digunakan untuk mencocokkan waktu dan riwayat pergerakan dokumen. Salinan asli dan hasil pencocokan dicatat secara terpisah.</p><h3>IV. BATAS PENUGASAN</h3><p>Surat ini merupakan dasar pemeriksaan administratif. Tidak ada penetapan kehilangan dokumen, perubahan berkas, pelanggaran akses, ataupun keterlibatan personel berdasarkan surat ini.</p><div class="time-approval"><span>DITERBITKAN: UNIT INVESTIGASI INTERNAL</span><span>REGISTRASI: RECORDS CONTROL / 19 SEP 2018</span></div><footer>SP-INV-019/2018 · HALAMAN 01 / 01 · REKONSTRUKSI FIKTIF</footer></article></div>';
 show('SP_INV_019_2018.pdf',html);
};

const priorSecurityCardOpen=openDocument;
openDocument=function(id){
if(id!=='sceneCardRegistry')return priorSecurityCardOpen(id);
if(!state.seen.includes(id))state.seen.push(id);persist();render();
const data=[['4418','NADIA SANTOSO','KEPALA LABORATORIUM','LAB-ARCHIVE','AKTIF','PERSONEL'],['3006','KARTU TAMU','TAMU FASILITAS','WAJIB PENDAMPING','AKTIF','BERSAMA'],['5172','BELUM TERVERIFIKASI','TIDAK TERCATAT','LOG AKSES AR-03','PERLU PENCOCOKAN','ENTRI AUDIT']];
data.push(['4102','ADRIAN PUTRA','DIREKTUR','EKSEKUTIF','AKTIF','PERSONEL']);
data.push(['4236','RAKA WIJAYA','MANAJER OPERASIONAL','OPERASIONAL','AKTIF','PERSONEL'],['4371','DIMAS ARGA','INSINYUR STRUKTUR','TEKNIK','AKTIF','PERSONEL'],['4529','SISKA ARUM','PETUGAS KEAMANAN','KEAMANAN','AKTIF','PERSONEL']);
data.push(['4650','MAYA KIRANA','DIREKTUR KLINIS','PENELITIAN','AKTIF','PERSONEL'],['4782','FARHAN MAHENDRA','TEKNISI TI','SISTEM TI','AKTIF','PERSONEL'],['4894','ELENA PRAMESWARI','KEPALA KEUANGAN','KEUANGAN','AKTIF','PERSONEL']);
data.push(['3011','KARTU KONTRAKTOR','TAMU PEMELIHARAAN','WAJIB PENDAMPING','AKTIF','BERSAMA'],['3024','KARTU INSPEKSI','TAMU INSPEKSI','WAJIB PENDAMPING','AKTIF','BERSAMA'],['2998','KARTU CADANGAN','TIDAK DITUGASKAN','TANPA AKSES','NONAKTIF','CADANGAN']);
const rows=data.map((r,i)=>'<tr><td>'+String(i+1).padStart(2,'0')+'</td>'+r.map(v=>'<td>'+v+'</td>').join('')+'</tr>').join('');
show('SECURITY_CARD_ASSIGNMENT_2018.csv','<div class="modalcontent"><button class="backfile" onclick="backModal()">← KEMBALI KE BERKAS SEBELUMNYA</button><article class="time-compare"><header><strong>VEYRA RESEARCH CENTER / SISTEM KEAMANAN</strong><span>SEC-AC-0917 / EKSPOR</span></header><h2>REGISTER INVENTARIS KARTU AKSES</h2><div class="time-meta"><span>DATA PER: 17 SEP 2018</span><span>KONTROL AKSES</span></div><div class="time-scroll"><table><thead><tr><th>NO</th><th>NOMOR KARTU</th><th>PEMEGANG TERDAFTAR</th><th>JABATAN</th><th>HAK AKSES</th><th>STATUS</th><th>JENIS</th></tr></thead><tbody>'+rows+'</tbody></table></div><p>PEMEGANG TERDAFTAR adalah data registrasi kartu. Log pembaca pintu tidak memuat verifikasi identitas fisik pengguna.</p><footer>SEC-AC-0917 / SALINAN TERKENDALI</footer></article></div>');
};

/* v56 — susunan bacaan Amplop 02: alasan pemeriksaan → TKP → arsip → akses → waktu → kesaksian */
const urutanBerkasAmplop02=['archiveExaminationOrder','scene','map','index','personnelIndex','sceneCardRegistry','stage2Door','cctvMovement','stage2Clock','camConfigAudit','bapNadia','bapSiska','bapFarhan'];
const daftarAmplop02=envelopes[1].items;
envelopes[1].items=[...urutanBerkasAmplop02.filter(id=>daftarAmplop02.includes(id)),...daftarAmplop02.filter(id=>!urutanBerkasAmplop02.includes(id))];

/* v58 — pernyataan awal di Amplop 02; BAP untuk verifikasi di Amplop 03 */
docs.personnelAlibiRegister={name:'REGISTER_ALIBI_PERSONEL_0919.pdf',title:'REGISTER KETERANGAN KEBERADAAN PERSONEL',meta:'INVESTIGASI INTERNAL / 19 SEP 2018 / INV-019-ALB',sections:[],callout:''};
const alibiAwal=[
['ADRIAN PUTRA','Ruang direktur','Mengaku tetap berada di ruang kerja sebelum alarm'],
['NADIA SANTOSO','Area administrasi','Mengaku berada di area administrasi saat kejadian'],
['RAKA WIJAYA','Area operasional dan utilitas','Mengaku melakukan pemeriksaan fasilitas'],
['DIMAS ARGA','Area pemantauan struktur','Mengaku memeriksa kondisi struktur dan laporan sensor'],
['SISKA ARUM','Pos keamanan','Mengaku menjalankan tugas pemantauan keamanan'],
['MAYA KIRANA','Ruang dokumentasi klinis','Mengaku memeriksa dokumen penelitian'],
['FARHAN MAHENDRA','Ruang perangkat jaringan','Mengaku menangani perangkat jaringan dan kamera'],
['ELENA PRAMESWARI','Ruang administrasi keuangan','Mengaku berada di ruang kerja keuangan']
];
envelopes[1].items=envelopes[1].items.filter(id=>!['bapNadia','bapSiska','bapFarhan','personnelAlibiRegister'].includes(id));
const posisiAlibi=envelopes[1].items.indexOf('sceneCardRegistry');
envelopes[1].items.splice(posisiAlibi<0?envelopes[1].items.length:posisiAlibi+1,0,'personnelAlibiRegister');
for(const id of ['bapNadia','bapSiska','bapFarhan'])if(!envelopes[2].items.includes(id))envelopes[2].items.push(id);
const sebelumAlibi=openDocument;
openDocument=function(id){
if(id!=='personnelAlibiRegister')return sebelumAlibi(id);
if(!state.seen.includes(id))state.seen.push(id);persist();render();
const rows=alibiAwal.map((p,i)=>'<tr><td>'+String(i+1).padStart(2,'0')+'</td>'+p.map(v=>'<td>'+v+'</td>').join('')+'<td>BELUM DIVERIFIKASI</td></tr>').join('');
show('REGISTER_ALIBI_PERSONEL_0919.pdf','<div class="modalcontent"><button class="backfile" onclick="backModal()">← KEMBALI KE BERKAS SEBELUMNYA</button><article class="archive-ledger"><div class="archive-ledger-head"><div><b>VEYRA RESEARCH CENTER</b><small>UNIT INVESTIGASI INTERNAL / SALINAN KERJA</small></div></div><h2>REGISTER KETERANGAN KEBERADAAN PERSONEL</h2><div class="archive-ledger-meta"><span>INV-019-ALB</span><span>19 SEPTEMBER 2018</span><span>PERIODE 01.00–02.20 WIB</span></div><p>Ringkasan pernyataan awal mengenai keberadaan personel pada malam kejadian. Lokasi dan waktu yang disebutkan merupakan pengakuan, bukan hasil verifikasi independen.</p><div class="archive-ledger-scroll alibi-ledger-scroll"><table class="alibi-ledger-table"><thead><tr><th>NO.</th><th>PERSONEL</th><th>LOKASI YANG DIAKUI</th><th>KETERANGAN AWAL</th><th>STATUS</th></tr></thead><tbody>'+rows+'</tbody></table></div><p>Verifikasi memerlukan pemeriksaan silang dengan catatan akses, waktu perangkat, kesaksian, dan dokumen pendukung. Ketidaksesuaian catatan tidak dengan sendirinya membuktikan kebohongan atau keterlibatan.</p><div class="archive-ledger-foot"><span>INV / COPY 01</span><span>PEMERIKSAAN LANJUTAN</span></div></article></div>');
};

/* v72 — tabulasi keselamatan klinis tanpa ringkasan jawaban */
const priorSafetyDocument=openDocument;
openDocument=function(id){
 if(id!=='handover')return priorSafetyDocument(id);
 if(!state.seen.includes(id))state.seen.push(id);persist();render();
 const flagged=new Set([4,19,31,32,33,34,35,36,37,38]);
 const rows=Array.from({length:40},(_,i)=>{
  const n=i+1,serious=flagged.has(n);
  return '<tr><td>VX17-'+String(n).padStart(3,'0')+'</td><td>YA</td><td>'+(n<=30?'SELESAI':'BELUM LENGKAP')+'</td><td>'+(serious?'SERIOUS':'NONE')+'</td><td>'+(n<=30?'YA':'TIDAK')+'</td></tr>';
 }).join('');
 show('SAFETY_RECONCILIATION.csv','<div class="modalcontent"><button class="backfile" onclick="backModal()">← KEMBALI KE BERKAS SEBELUMNYA</button><article class="archive-ledger"><div class="archive-ledger-head"><div><b>VEYRA RESEARCH CENTER</b><small>UNIT UJI KLINIS / QUALITY ASSURANCE</small></div></div><h2>REKONSILIASI POPULASI KESELAMATAN</h2><div class="archive-ledger-meta"><span>QA/VX17/0904</span><span>EKSPOR 04 SEP 2018</span><span>40 BARIS DATA</span></div><p>Ekstrak tingkat subjek untuk pemeriksaan konsistensi populasi analisis. ID subjek telah dianonimkan. Kolom INKLUSI PUBLIK menunjukkan keanggotaan pada subset laporan yang didistribusikan.</p><div class="archive-ledger-scroll"><table><thead><tr><th>ID SUBJEK</th><th>DOSIS DITERIMA</th><th>KUNJUNGAN AKHIR</th><th>FLAG KEJADIAN</th><th>INKLUSI PUBLIK</th></tr></thead><tbody>'+rows+'</tbody></table></div><p><b>Definisi kolom:</b> SERIOUS = penanda kejadian serius yang memerlukan penelaahan keselamatan; NONE = tidak ada penanda serius pada ekstrak ini. Status kunjungan akhir tidak mengubah status penerimaan dosis. Ekspor ini tidak mencatat operator perubahan dataset.</p><div class="archive-ledger-foot"><span>CLINICAL QA / COPY 01</span><span>END OF EXPORT</span></div></article></div>');
};

/* v73 — pemeriksaan delapan personel, keterangan awal bukan temuan terbukti */
const pertanyaanWaktuBAP=[
['Di mana Saudara/Saudari berada sekitar pukul 01.35 pada 18 September 2018?','Saya perlu mencocokkan waktu tersebut dengan catatan pekerjaan dan ingatan saya.'],
['Di mana Saudara/Saudari berada sekitar pukul 01.58 pada tanggal yang sama?','Saya belum dapat memastikan menitnya tanpa memeriksa catatan pendukung.'],
['Dari lokasi yang disebutkan, jalur mana yang biasa digunakan menuju AR-03?','Jalur dan waktu tempuh perlu diperiksa bersama denah.']
];
for(const w of Object.values(witnessFiles))w.qa.push(...pertanyaanWaktuBAP);
const bapTambahan={
bapAdrian:{name:'BAP_AP_0919.pdf',person:'DR. ADRIAN PUTRA',age:'43',role:'Direktur',unit:'Direksi',initials:'A.P.',number:'BAP-AP-019/2018',qa:[
['Apa kegiatan Saudara pada giliran malam 17–18 September?','Saya menyelesaikan pekerjaan administrasi di ruang direktur. Saya tidak mencatat setiap perpindahan selama malam itu.'],
['Apakah Saudara meninggalkan ruang direktur sebelum alarm?','Sepanjang yang saya ingat, saya tetap di area direksi. Waktu tepatnya perlu saya periksa lagi.'],
['Siapa yang mempunyai kewenangan menggunakan terminal direksi?','Terminal itu ditempatkan untuk pekerjaan direksi. Pengaturan akun dan pendelegasian teknis ditangani sesuai prosedur internal.'],
['Apakah Saudara mengetahui pekerjaan audit VX-17 pada malam tersebut?','Saya mengetahui ada kegiatan audit yang belum selesai, tetapi tidak mengingat seluruh nomor pekerjaan dalam antreannya.'],
['Apakah Saudara dapat memastikan siapa yang memakai akun DIR-ADMIN pada 01.38?','Tidak berdasarkan ingatan saya saja. Periksa catatan otorisasi dan sesi perangkat.'],
['Siapa yang dapat mengonfirmasi keberadaan Saudara?','Petugas yang bertugas di area direksi mungkin mengetahui, tetapi saya tidak dapat memastikan siapa yang melihat saya setiap saat.']]},
bapRaka:{name:'BAP_RW_0919.pdf',person:'RAKA WIJAYA',age:'',role:'Manajer Operasional',unit:'Operasional',initials:'R.W.',number:'BAP-RW-019/2018',qa:[
['Apa penugasan Saudara pada malam kejadian?','Saya memeriksa kesiapan operasional fasilitas dan menerima laporan dari beberapa unit.'],
['Di mana Saudara berada sekitar pukul 02.00?','Di area operasional dan utilitas. Saya berpindah antarpos, jadi tidak bisa menyebut satu ruangan sepanjang periode itu.'],
['Apakah Saudara menerima laporan mengenai kondisi bangunan?','Ada laporan teknis yang diteruskan melalui jalur operasional. Rincian waktunya tercantum pada register unit.'],
['Apakah Saudara pernah menggunakan ruang arsip AR-03?','Saya pernah mengurus dokumen operasional, tetapi tidak mengingat memasuki AR-03 pada waktu yang ditanyakan.'],
['Siapa yang dapat mengonfirmasi rute pemeriksaan Saudara?','Petugas jaga dan buku serah terima pekerjaan dapat diperiksa.'],
['Apakah Saudara mengubah data penelitian VX-17?','Pengelolaan dataset klinis bukan tugas rutin unit saya.']]},
bapDimas:{name:'BAP_DA_0919.pdf',person:'DIMAS ARGA',age:'',role:'Insinyur Struktur',unit:'Teknik',initials:'D.A.',number:'BAP-DA-019/2018',qa:[
['Apa tugas Saudara menjelang 18 September?','Melakukan pemeriksaan kondisi struktur dan menyerahkan catatan pengukuran melalui prosedur teknik.'],
['Di mana Saudara berada sebelum alarm?','Di area pemantauan struktur, memeriksa pembacaan dan laporan yang tersedia.'],
['Apakah Saudara membawa salinan laporan ke arsip?','Saya menyerahkan berkas melalui jalur pencatatan yang biasa digunakan. Saya tidak hafal setiap tahap perpindahannya.'],
['Apakah Saudara mengetahui isi rak B-04/17?','Saya mengetahui kode rujukan pada beberapa berkas teknik, tetapi tidak mengelola inventaris rak.'],
['Siapa yang dapat memeriksa waktu pekerjaan Saudara?','Register pemeriksaan, sistem pemantauan, dan catatan serah terima.'],
['Apakah Saudara menyaksikan penyebab runtuhnya struktur?','Tidak. Saya mengetahui peristiwa dari kondisi lapangan dan catatan setelah kejadian.']]},
bapMaya:{name:'BAP_MK_0919.pdf',person:'DR. MAYA KIRANA',age:'',role:'Direktur Uji Klinis VX-17',unit:'Uji Klinis',initials:'M.K.',number:'BAP-MK-019/2018',qa:[
['Apa pekerjaan Saudara pada malam 17–18 September?','Saya menelaah dokumen uji klinis di ruang dokumentasi.'],
['Apa yang Saudara pahami mengenai populasi keselamatan VX-17?','Definisi populasi tercantum dalam protokol dan rencana analisis. Angka dalam satu laporan harus dibaca bersama kriteria inklusinya.'],
['Apakah Saudara menyusun sendiri seluruh tabel laporan publik?','Penyusunan melibatkan beberapa fungsi. Saya tidak mengoperasikan semua tahapan ekspor data.'],
['Apakah Saudara melihat perubahan dokumen revisi?','Saya pernah menerima berkas revisi, tetapi perlu melihat nomor dan tanggal revisinya untuk menjawab lebih tepat.'],
['Siapa yang dapat mengonfirmasi aktivitas Saudara?','Daftar akses dokumen dan catatan penugasan unit klinis.'],
['Apakah Saudara berada di AR-03?','Saya tidak mengingat ada keperluan memasuki ruang itu pada malam tersebut.']]},
bapElena:{name:'BAP_EP_0919.pdf',person:'ELENA PRAMESWARI',age:'',role:'Kepala Keuangan',unit:'Keuangan',initials:'E.P.',number:'BAP-EP-019/2018',qa:[
['Apa kegiatan Saudara menjelang kejadian?','Saya menyelesaikan berkas anggaran dan administrasi pembayaran di unit keuangan.'],
['Di mana Saudara berada sekitar pukul 02.00?','Di area administrasi keuangan. Saya tidak memeriksa jam secara terus-menerus.'],
['Apakah Saudara memiliki kewenangan terhadap data klinis?','Saya menangani pembiayaan dan dokumen pengadaan, bukan pencatatan hasil subjek penelitian.'],
['Apakah Saudara berhubungan dengan bagian direksi malam itu?','Komunikasi administrasi dapat terjadi melalui sistem kantor. Saya perlu melihat arsip pesan untuk memastikan waktunya.'],
['Siapa yang dapat memeriksa aktivitas kerja Saudara?','Register dokumen keuangan dan log perangkat kantor yang dipakai.'],
['Apakah Saudara mengakses AR-03?','Tidak ada kunjungan ke ruang itu yang saya ingat pada malam tersebut.']]}
};
for(const w of Object.values(bapTambahan))w.qa.push(...pertanyaanWaktuBAP);
for(const [id,w] of Object.entries(bapTambahan)){
 docs[id]={name:w.name,title:'BERITA ACARA PEMERIKSAAN — '+w.person,meta:'UNIT INVESTIGASI INTERNAL / 19 SEP 2018',sections:[],callout:''};
 if(!envelopes[2].items.includes(id))envelopes[2].items.push(id);
}
const beforeExtraBap=openDocument;
openDocument=function(id){
 const w=bapTambahan[id];if(!w)return beforeExtraBap(id);
 if(!state.seen.includes(id))state.seen.push(id);persist();render();
 const qa=w.qa.map((p,i)=>'<div class="bap-entry"><div class="bap-question"><b>P'+String(i+1).padStart(2,'0')+' / PEMERIKSA</b><p>'+p[0]+'</p></div><div class="bap-answer"><b>J'+String(i+1).padStart(2,'0')+' / '+w.initials+'</b><p>'+p[1]+'</p></div></div>').join('');
 show(w.name,'<div class="modalcontent"><button class="backfile" onclick="backModal()">← KEMBALI KE BERKAS SEBELUMNYA</button><article class="bap-sheet"><header><strong>VEYRA RESEARCH CENTER</strong><span>UNIT INVESTIGASI INTERNAL / SALINAN</span></header><h2>BERITA ACARA PEMERIKSAAN</h2><p class="bap-subtitle">'+w.number+' / 19 SEPTEMBER 2018</p><div class="bap-person"><div><b>NAMA</b><span>'+w.person+'</span></div><div><b>JABATAN</b><span>'+w.role+'</span></div><div><b>UNIT</b><span>'+w.unit+'</span></div><div><b>STATUS</b><span>PEMBERI KETERANGAN</span></div></div><h3>TRANSKRIP PEMERIKSAAN</h3>'+qa+'<div class="bap-signatures"><div>PEMERIKSA<br>UNIT INVESTIGASI INTERNAL</div><div>PEMBERI KETERANGAN<br>'+w.person+'</div></div><footer>'+w.number+' / SALINAN KERJA</footer></article></div>');
};

/* v73 — lembar penilaian sementara, tanpa kunci pelaku sebelum Amplop 04 */
function openAssessment03(){
 const key='veyra_assessment_03';
 let saved={people:[],basis:'alibi',reason:''};
 try{saved=Object.assign(saved,JSON.parse(localStorage.getItem(key)||'{}'))}catch(e){}
 const names=suspect.map(p=>({id:p.id,name:p.name}));
 const cards=names.map(p=>'<label class="assessment-person"><input type="checkbox" name="assessmentPerson" value="'+p.id+'" '+(saved.people.includes(p.id)?'checked':'')+' onchange="assessmentSelection03(this)"> '+p.name+'</label>').join('');
 const opts=[['alibi','Keterangan keberadaan'],['akses','Kewenangan dan akses'],['dokumen','Perbedaan catatan administratif'],['lainnya','Temuan lain yang dapat diuji']].map(x=>'<option value="'+x[0]+'" '+(saved.basis===x[0]?'selected':'')+'>'+x[1]+'</option>').join('');
 show('ASSESSMENT_03_PERSONNEL.pdf','<div class="modalcontent"><button class="backfile" onclick="backModal()">← KEMBALI KE BERKAS SEBELUMNYA</button><article class="archive-ledger assessment-sheet"><div class="archive-ledger-head"><div><b>VEYRA RESEARCH CENTER</b><small>UNIT INVESTIGASI INTERNAL / SALINAN KERJA</small></div></div><h2>LEMBAR PENILAIAN PERSONEL</h2><div class="archive-ledger-meta"><span>INV-019-AS03</span><span>TAHAP PEMERIKSAAN 03</span><span>BUKAN PENETAPAN KESALAHAN</span></div><p>Tetapkan dua personel untuk pemeriksaan lanjutan berdasarkan dokumen yang telah diperoleh. Penilaian bersifat sementara dan dapat direvisi.</p><h3>PERSONEL YANG DIPERIKSA LANJUT</h3><div class="assessment-grid">'+cards+'</div><p id="assessmentCount03" class="assessment-status">Pilih tepat dua personel.</p><label class="assessment-label" for="assessmentBasis03">DASAR PEMERIKSAAN</label><select id="assessmentBasis03">'+opts+'</select><label class="assessment-label" for="assessmentReason03">REFERENSI BERKAS DAN URAIAN</label><textarea id="assessmentReason03" rows="6" placeholder="Cantumkan sedikitnya dua sumber dokumen, waktu atau peristiwa terkait, dan batas kesimpulan..."></textarea><button class="assessment-save" onclick="saveAssessment03()">SIMPAN PENILAIAN SEMENTARA</button><p id="assessmentStatus03" role="status" class="assessment-status"></p><div class="archive-ledger-foot"><span>INV / COPY 01</span><span>ASSESSMENT 03</span></div></article></div>');
 document.getElementById('assessmentReason03').value=saved.reason||'';
 assessmentSelection03();
}
function assessmentSelection03(el){
 const checked=[...document.querySelectorAll('input[name="assessmentPerson"]:checked')];
 if(el&&checked.length>2){el.checked=false}
 const count=document.querySelectorAll('input[name="assessmentPerson"]:checked').length;
 const elCount=document.getElementById('assessmentCount03');if(elCount)elCount.textContent=count+' dari 2 personel dipilih.';
}
function saveAssessment03(){
 const people=[...document.querySelectorAll('input[name="assessmentPerson"]:checked')].map(e=>e.value);
 const basis=document.getElementById('assessmentBasis03').value;
 const reason=document.getElementById('assessmentReason03').value.trim();
 const status=document.getElementById('assessmentStatus03');
 const citations=reason.match(/(?:BAP[-_]|\.csv|\.log|\.pdf|AR-03|VX17|VX-17|ENG\/STR)/gi)||[];
 if(people.length!==2){status.textContent='Pilih tepat dua personel.';return}
 if(reason.length<70||citations.length<2){status.textContent='Uraian minimal 70 karakter dan sertakan sekurangnya dua rujukan dokumen atau catatan yang dapat diuji.';return}
 localStorage.setItem('veyra_assessment_03',JSON.stringify({people,basis,reason,savedAt:new Date().toISOString()}));
 status.textContent='PENILAIAN SEMENTARA TERSIMPAN DI PERANGKAT INI. Kamu dapat merevisi pilihan setelah memeriksa barang bukti. Penilaian ini belum menetapkan siapa yang bersalah.';
}

/* v74 — signature sheet; preserve original signature evidence in envelope 01 */
const bapSignaturePaths={
'Adrian Putra':signatureStrokes['Dr. Adrian Putra'],
'Raka Wijaya':signatureStrokes['Raka Wijaya'],
'Dimas Arga':signatureStrokes['Dimas Arga'],
'Siska Arum':signatureStrokes['Siska Arum'],
'Nadia Santoso':['M13 49 C21 22 28 9 31 11 C37 15 25 43 37 37 C47 32 43 15 52 17 C59 20 48 40 61 35 C72 29 68 20 78 24 C88 29 77 40 94 34 C108 26 117 22 132 18','M22 48 C58 43 110 43 157 35'],
'Maya Kirana':['M16 47 Q25 11 32 16 Q39 22 29 40 M43 40 Q52 18 60 28 Q66 42 77 28 Q87 14 92 31 Q97 42 110 29 Q121 20 126 35 Q138 42 154 27','M20 52 Q59 45 90 47','M117 13 Q128 7 137 17'],
'Farhan Mahendra':['M16 49 C22 29 24 10 34 13 C47 17 31 31 23 34 C47 33 53 18 60 24 C65 31 53 40 70 34 C82 28 83 16 93 21 C103 26 89 39 109 34 C125 28 132 18 152 20','M27 46 C68 44 114 43 163 35'],
'Elena Prameswari': [
  'M12 43 Q23 17 38 13 Q48 11 42 24 Q37 32 21 39 Q43 37 53 31 M55 44 L74 17 L67 43 Q82 34 93 26 Q101 19 102 31 Q105 42 121 29 Q132 20 141 29 Q147 36 163 26',
  'M19 52 Q55 49 83 48 M109 49 L165 43'
]

};
const examinerSignature=['M10 44 L24 15 Q30 8 34 19 L28 39 Q46 34 55 24 Q61 19 62 35 Q67 43 81 30 L96 17 Q99 14 102 25 L97 39 Q117 30 130 32 L161 24','M18 53 Q70 56 113 48 L156 43'];
function signatureInk74(paths){return '<svg class="bap-ink bap-signature-v74" viewBox="0 0 180 62" role="img" aria-label="Goresan tanda tangan fiktif">'+paths.map((d,i)=>'<path d="'+d+'" fill="none" stroke="#283d54" stroke-width="'+(i?1.25:1.85)+'" stroke-linecap="round" stroke-linejoin="round"/>').join('')+'</svg>'}
const previousBapSignatureOpen=openDocument;
openDocument=function(id){
 previousBapSignatureOpen(id);
 const all=Object.assign({},witnessFiles,bapTambahan);
 if(!all[id])return;
 const w=all[id], el=document.querySelector('#modalBody .bap-sheet');
 if(!el)return;
 const name=w.person.replace(/^DR\.\s*/,'').toLowerCase();
 const canonical=Object.keys(bapSignaturePaths).find(n=>n.toLowerCase()===name);
 const sig=signatureInk74(bapSignaturePaths[canonical]||examinerSignature);
 const inspector=signatureInk74(examinerSignature);
 const block='<div class="bap-signature-pair"><div><small>PEMBERI KETERANGAN</small>'+sig+'<b>'+w.person+'</b></div><div><small>PEMERIKSA</small>'+inspector+'<b>R. Hadi Pratama</b><span>ID INV-0147</span></div></div><p class="bap-signature-place">19 SEPTEMBER 2018 · RUANG PEMERIKSAAN 2 · VEYRA RESEARCH CENTER</p>';
 const existing=el.querySelector('.bap-signatures');
 if(existing){existing.innerHTML=block;return}
 const existingInk=el.querySelector('.bap-ink');
 if(existingInk){const section=existingInk.closest('.bap-signatures')||existingInk.parentElement.parentElement; if(section)section.innerHTML=block}
};

/* v80 — original security event extract, not an investigator's interpretation */
const beforeArchiveAccess80=openDocument;
openDocument=function(id){
 if(id!=='access')return beforeArchiveAccess80(id);
 if(!state.seen.includes(id))state.seen.push(id);persist();render();
 const rows=[
 ['01:18:04','AR-03','3006','ACCESS_DENIED','INVALID_ZONE','AR03-0918-018'],
 ['01:18:09','AR-03','3006','ACCESS_DENIED','INVALID_ZONE','AR03-0918-019'],
 ['01:41:26','AR-03','5172','ACCESS_GRANTED','VALID','AR03-0918-026'],
 ['01:41:29','AR-03','—','CONTACT_OPEN','DOOR','AR03-0918-027'],
 ['01:41:46','AR-03','—','CONTACT_CLOSED','DOOR','AR03-0918-028'],
 ['01:48:04','AR-03','3006','ACCESS_DENIED','INVALID_ZONE','AR03-0918-031'],
 ['02:06:01','AR-03','4418','ACCESS_GRANTED','VALID','AR03-0918-044'],
 ['02:06:03','AR-03','—','CONTACT_OPEN','DOOR','AR03-0918-045'],
 ['02:06:18','AR-03','—','CONTACT_CLOSED','DOOR','AR03-0918-046'],
 ['02:10:00','SYS','—','SYNC_PULSE','NTP_LOCKED','SYS-0918-210']
 ];
 const table=rows.map(row=>'<tr>'+row.map(v=>'<td>'+v+'</td>').join('')+'</tr>').join('');
 show('ACCESS_4418.log','<div class="modalcontent"><button class="backfile" onclick="backModal()">← KEMBALI KE BERKAS SEBELUMNYA</button><article class="archive-ledger"><div class="archive-ledger-head"><div><b>VEYRA RESEARCH CENTER / SECURITY OPERATIONS</b><small>EKSPOR PENCATAT PINTU · SALINAN FORENSIK</small></div><span>INTERNAL</span></div><h2>LOG AKSES RUANG ARSIP</h2><div class="archive-ledger-meta"><span>18 SEP 2018 / WIB</span><span>READER AR-03</span><span>SERVER TIME / NTP</span></div><div class="rawdata-scroll"><table class="rawtable"><thead><tr><th>WAKTU</th><th>READER</th><th>KARTU</th><th>EVENT</th><th>HASIL</th><th>REFERENSI</th></tr></thead><tbody>'+table+'</tbody></table></div><h3>REFERENSI KARTU</h3><div class="archive-ledger-meta"><span>4418 / NADIA SANTOSO</span><span>3006 / KARTU TAMU</span><span>5172 / BELUM TERVERIFIKASI</span></div><p class="assessment-status">Sumber: ekspor pembaca AR-03. Waktu menggunakan jam server. Nomor kartu menunjukkan kredensial yang dibaca perangkat.</p><div class="archive-ledger-foot"><span>SEC-AR03 / COPY 01</span><span>END OF EXTRACT</span></div></article></div>');
};

/* v80: risk register */
docs.financialExposure80={name:'VX17_RISK_REGISTER.pdf',title:'REGISTER RISIKO PROGRAM VX-17',meta:'FINANCE / CLINICAL GOVERNANCE · 14 SEP 2018',sections:[['Pencairan Tahap Lanjut','Status: ditahan sementara sampai persyaratan pelaporan terpenuhi.'],['Kewajiban Pelaporan','Perbedaan populasi keselamatan antara data internal dan laporan publik memerlukan rekonsiliasi dan jejak persetujuan revisi.'],['Risiko Kontrak','Penundaan atau penghentian program dapat mengubah jadwal pembayaran dan meningkatkan biaya operasional.'],['Distribusi','Salinan untuk Direksi, Keuangan, Tata Kelola Klinis, dan Audit Internal.']],callout:''};
if(!envelopes[3].items.includes('financialExposure80'))envelopes[3].items.push('financialExposure80');

const priorRiskDoc80=openDocument;
openDocument=function(id){priorRiskDoc80(id);if(id==='financialExposure80'){const callout=document.querySelector('#modalBody .callout');if(callout)callout.remove();}};

/* v82 — controlled clinical protocol, four archival pages */
const previousProtocol82=openDocument;
openDocument=function(id){
 if(id!=='labmemo')return previousProtocol82(id);
 if(!state.seen.includes(id))state.seen.push(id);persist();render();
 const header=(num,sub)=>'<div style="display:flex;justify-content:space-between;gap:12px;border-bottom:2px solid #304748;padding-bottom:12px;font-size:11px;letter-spacing:.06em"><span>VEYRA RESEARCH CENTER<br>UNIT TATA KELOLA KLINIS</span><span style="text-align:right">VRC/CLN/VX17/SAP-02<br>HALAMAN '+num+' / 4</span></div><p style="font-size:11px;letter-spacing:.09em;color:#56676a">DOKUMEN TERKENDALI · REVISI 02 · 05 SEPTEMBER 2018</p><h2 style="font-size:21px;margin:12px 0">PROTOKOL ANALISIS KESELAMATAN VX-17</h2><p style="font-size:12px;border-bottom:1px solid #aaa;padding-bottom:12px">'+sub+'</p>';
 const page=(body)=>'<section style="background:#f5f0e3;border:1px solid #bcb4a2;padding:26px 28px;margin:18px 0 24px;min-height:450px;box-sizing:border-box">'+body+'</section>';
 const tbl=(heads,rows)=>'<div style="overflow-x:auto"><table style="border-collapse:collapse;width:100%;font-size:12px;margin:16px 0"><thead><tr>'+heads.map(h=>'<th style="border:1px solid #b5b0a4;background:#ded6c5;text-align:left;padding:9px">'+h+'</th>').join('')+'</tr></thead><tbody>'+rows.map(r=>'<tr>'+r.map(v=>'<td style="border:1px solid #b5b0a4;padding:9px;vertical-align:top">'+v+'</td>').join('')+'</tr>').join('')+'</tbody></table></div>';
 const sign=(label,name,paths)=>'<div style="flex:1;min-width:170px"><div style="font-size:11px">'+label+'</div>'+signatureInk74(paths)+'<div style="border-top:1px solid #aaa;padding-top:7px;font-size:12px"><b>'+name+'</b></div></div>';
 const html='<div class="modalcontent"><button class="backfile" onclick="backModal()">← KEMBALI KE BERKAS SEBELUMNYA</button>'+
 page(header('01','Rencana analisis statistik (SAP) · Salinan terdistribusi')+
 '<h3>1. TUJUAN DAN CAKUPAN</h3><p>Dokumen ini menetapkan aturan pembentukan populasi keselamatan, pengelompokan kejadian tidak diinginkan, dan pengendalian perubahan tabel untuk studi VX-17. Aturan berlaku sebelum pembekuan data dan penyusunan ringkasan eksternal.</p>'+
 '<h3>2. KENDALI DOKUMEN</h3>'+tbl(['Revisi','Tanggal','Perubahan','Status'],[['00','20 AGU 2018','Rancangan awal definisi populasi','ARSIP'],['01','29 AGU 2018','Penegasan kriteria kejadian serius','DIGANTIKAN'],['02','05 SEP 2018','Pengendalian revisi dan tabel ringkasan','BERLAKU']])+
 '<p><b>Distribusi:</b> Kepala Uji Klinis; Kepala Laboratorium; Pengelola Data; Audit Internal. <b>Dokumen terkait:</b> VX17-CRF, VX17-AE, VX17-DATA-LOCK.</p>')+
 page(header('02','Ketentuan analisis · Bab 3')+
 '<h3>3.1 DEFINISI POPULASI</h3><p><b>Safety Population</b> meliputi seluruh subjek yang telah menerima sedikitnya satu dosis produk investigasi. Subjek yang menghentikan terapi, mengundurkan diri, atau tidak menyelesaikan kunjungan akhir tetap dihitung apabila telah menerima dosis.</p>'+
 '<h3>3.2 KLASIFIKASI KEJADIAN</h3>'+tbl(['Kode','Kategori','Kriteria pencatatan'],[['AE','Kejadian tidak diinginkan','Seluruh kejadian medis setelah pemberian dosis'],['SAE','Kejadian serius','Kematian, ancaman jiwa, rawat inap, kecacatan bermakna, atau kejadian penting menurut penilaian klinis'],['FOLLOW-UP','Tindak lanjut','Perkembangan status dicatat tanpa menghapus kejadian awal']])+
 '<h3>3.3 DASAR PERHITUNGAN</h3><p>Proporsi subjek dengan SAE dihitung menggunakan jumlah subjek unik yang mengalami sedikitnya satu SAE sebagai pembilang dan seluruh subjek dalam Safety Population sebagai penyebut. Jumlah kejadian dan jumlah subjek terdampak disimpan sebagai variabel berbeda.</p>')+
 page(header('03','Pemrosesan dan pemeriksaan mutu · Bab 4')+
 '<h3>4.1 ALUR PEMROSESAN</h3><p>Data sumber dari formulir klinis diekspor ke dataset kerja. Pemutakhiran status subjek dan klasifikasi SAE harus dapat ditelusuri ke formulir sumber, tanggal entri, dan petugas yang berwenang.</p>'+
 '<h3>4.2 REKONSILIASI</h3>'+tbl(['Tahap','Penanggung jawab fungsi','Rekaman wajib'],[['Ekspor data','Pengelola data','Nomor ekspor, waktu, checksum'],['Pemeriksaan SAE','Peninjau klinis','Daftar ketidaksesuaian dan disposisi'],['Tabel ringkasan','Analis data','Skrip/versi dan populasi terpilih'],['Persetujuan rilis','Peninjau independen','Versi, tanggal, nomor persetujuan']])+
 '<h3>4.4 KENDALI REVISI</h3><p>Setiap perubahan pada tabel keluaran setelah pemeriksaan awal wajib memiliki alasan, identitas akun editor, waktu sistem, nilai sebelum/sesudah, serta persetujuan peninjau. Paraf pada salinan cetak hanya menandakan penelaahan dokumen; rekaman perubahan elektronik tetap menjadi sumber jejak edit.</p>')+
 page(header('04','Pengesahan dokumen · Rekaman distribusi')+
 '<h3>5. PENGESAHAN REVISI 02</h3><p>Kolom di bawah merupakan reproduksi tanda tangan pada salinan kerja yang didistribusikan tanggal 05 September 2018. Pengesahan protokol tidak sekaligus mengesahkan perubahan dataset berikutnya.</p>'+
 '<div style="display:flex;flex-wrap:wrap;gap:26px;margin:32px 0">'+sign('DISUSUN / TATA KELOLA KLINIS','Dr. Maya Kirana',bapSignaturePaths['Maya Kirana'])+sign('DITINJAU / LABORATORIUM','Nadia Santoso',bapSignaturePaths['Nadia Santoso'])+'</div>'+
 '<h3>6. REGISTER DISTRIBUSI</h3>'+tbl(['Salinan','Unit penerima','Tanggal'],[['01','Tata Kelola Klinis','05 SEP 2018'],['02','Laboratorium','05 SEP 2018'],['03','Pengelola Data','06 SEP 2018'],['04','Audit Internal','06 SEP 2018']])+
 '<p style="font-size:11px;color:#777;margin-top:28px">SALINAN KERJA · VRC/CLN/VX17/SAP-02 · AKHIR DOKUMEN</p>')+
 '<p class="small">Dokumen fiksi untuk permainan Planora Cold Case.</p></div>';
 show('VX17_PROTOKOL_ANALISIS.pdf',html);
};

/* v84 — cross-document transition, envelope 03 → 04 */
docs.auditQueue84={name:'AUDIT_JOB_QUEUE_0918.csv',title:'REGISTER ANTRIAN TUGAS AUDIT',meta:'AUDIT-SVC / JOB SCHEDULER · 18 SEP 2018 · WIB',sections:[
['SUMBER','HOST: AUD-SRV-01 | SERVICE: AUDIT-SVC | EXPORT: Q-0918-02 | WAKTU: WIB'],
['01:38:27 | JOB-118','EVENT: QUEUE_ACK | ACTION: AUDIT_HOLD | TARGET: VX17-AUDIT | STATUS: ACCEPTED'],
['01:42:11 | JOB-119','EVENT: QUEUE_ACK | ACTION: REPORT_EXPORT | TARGET: VX17-SUM | STATUS: ACCEPTED'],
['01:53:08 | JOB-120','EVENT: QUEUE_ACK | ACTION: INDEX_REFRESH | TARGET: DOC-ARCHIVE | STATUS: ACCEPTED'],
['02:04:18 | JOB-118','EVENT: REMOTE_REQ | ACTION: AUDIT_HOLD | TARGET: VX17-AUDIT | STATUS: PENDING'],
['02:12:44 | JOB-121','EVENT: QUEUE_ACK | ACTION: SENSOR_EXPORT | TARGET: STR-C04 | STATUS: ACCEPTED']
],callout:''};
if(!envelopes[2].items.includes('auditQueue84'))envelopes[2].items.push('auditQueue84');
envelopes[3].code='6F2118';
envelopes[3].hint='Hubungkan sesi TASK_HOLD pada log terminal dengan nomor pekerjaan AUDIT_HOLD pada register antrean audit.';
const priorEnvelope84=openEnvelope;
openEnvelope=function(i){
 priorEnvelope84(i);
 if(i!==3||i<state.unlocked||i>state.unlocked)return;
 const question=document.querySelector('#modalBody .question p');
 if(question)question.textContent='PERTANYAAN AMPLOP 04: Pada AUDIT_TERMINAL_EVENTS.log, cari SESSION untuk TASK_HOLD pukul 01.38.22 WIB. Lalu buka AUDIT_JOB_QUEUE_0918.csv dan temukan nomor JOB dengan ACTION AUDIT_HOLD yang diakui pada 01.38.27 WIB. Gabungkan ID SESSION dan tiga digit nomor JOB, tanpa spasi atau tanda baca.';
};

/* v85 — risk register with auditable scoring and 5×5 heat map */
const priorRisk85=openDocument;
openDocument=function(id){
 if(id!=='financialExposure80')return priorRisk85(id);
 if(!state.seen.includes(id))state.seen.push(id);persist();render();
 const risks=[
 ['R-01','Ketidaksesuaian populasi keselamatan','Klinis',4,5,'Terbuka','Rekonsiliasi sumber data'],
 ['R-02','Penundaan pencairan tahap lanjut','Keuangan',3,4,'Dalam telaah','Verifikasi syarat pembayaran'],
 ['R-03','Ketidakpatuhan pengendalian revisi','Audit Internal',4,4,'Terbuka','Uji log perubahan dan persetujuan'],
 ['R-04','Gangguan operasional laboratorium','Operasional',2,3,'Dipantau','Rencana kesinambungan operasi'],
 ['R-05','Biaya kontrak akibat penundaan','Keuangan',3,3,'Dalam telaah','Kajian klausul dan proyeksi biaya']
 ];
 const level=n=>n>=20?'KRITIS':n>=12?'TINGGI':n>=6?'SEDANG':'RENDAH';
 const color=n=>n>=20?'#c87870':n>=12?'#e8a779':n>=6?'#efdb9f':'#d4e2cc';
 const table=(heads,rows)=>'<div style="overflow-x:auto"><table style="width:100%;border-collapse:collapse;font-size:12px;margin:16px 0"><thead><tr>'+heads.map(h=>'<th style="padding:8px;border:1px solid #aaa;background:#d9cfb9;text-align:left">'+h+'</th>').join('')+'</tr></thead><tbody>'+rows.map(row=>'<tr>'+row.map(c=>'<td style="padding:8px;border:1px solid #b6ae9e;vertical-align:top">'+c+'</td>').join('')+'</tr>').join('')+'</tbody></table></div>';
 const head=(page,subtitle)=>'<div style="display:flex;justify-content:space-between;border-bottom:2px solid #294448;padding-bottom:12px;font-size:11px"><span>VEYRA RESEARCH CENTER<br>DIREKTORAT KEUANGAN / TATA KELOLA KLINIS</span><span style="text-align:right">VRC/RISK/VX17/014<br>HALAMAN '+page+' / 3</span></div><p style="font-size:11px;color:#53696b">SALINAN TERKENDALI · 14 SEPTEMBER 2018 · REV 01</p><h2 style="font-size:21px">REGISTER RISIKO PROGRAM VX-17</h2><p style="font-size:12px;border-bottom:1px solid #b7b0a0;padding-bottom:12px">'+subtitle+'</p>';
 const page=body=>'<section style="background:#f5f0e3;border:1px solid #bdb4a1;padding:24px 26px;margin:16px 0 24px;box-sizing:border-box">'+body+'</section>';
 const grid='<div style="overflow-x:auto"><div style="display:grid;grid-template-columns:48px repeat(5,minmax(68px,1fr));gap:3px;min-width:420px">'+[5,4,3,2,1].map(y=>'<div style="display:contents"><div style="display:flex;align-items:center;justify-content:center;font-size:12px">'+y+'</div>'+[1,2,3,4,5].map(x=>{const matches=risks.filter(r=>r[3]===x&&r[4]===y);return '<div style="background:'+color(x*y)+';min-height:65px;display:flex;align-items:center;justify-content:center;flex-direction:column;gap:3px;color:#302b25;font-size:11px;font-weight:700">'+matches.map(r=>'<span>'+r[0]+'</span>').join('')+'</div>'}).join('')+'</div>').join('')+'<div></div>'+[1,2,3,4,5].map(x=>'<div style="text-align:center;font-size:12px">'+x+'</div>').join('')+'</div></div>';
 const html='<div class="modalcontent"><button class="backdoc" onclick="openEnvelope(3)">← KEMBALI KE BERKAS SEBELUMNYA</button>'+
 page(head(1,'DAFTAR PENILAIAN RISIKO · KEMUNGKINAN × DAMPAK')+
 '<p><b>1. TUJUAN</b></p><p>Register ini mendokumentasikan penilaian risiko program pada tanggal peninjauan. Skor mencerminkan estimasi sebelum tindakan mitigasi, bukan bukti bahwa suatu kejadian telah terjadi.</p>'+
 table(['ID','Uraian risiko','Pemilik risiko','K','D','Skor','Kategori','Status'],risks.map(r=>[r[0],r[1],r[2],r[3],r[4],r[3]*r[4],level(r[3]*r[4]),r[5]]))+
 '<p style="font-size:12px">K = kemungkinan; D = dampak; skala masing-masing 1–5. Skor = K × D. Rentang: 1–5 rendah, 6–11 sedang, 12–19 tinggi, 20–25 kritis.</p>')+
 page(head(2,'MATRIKS PENILAIAN 5 × 5 · POSISI RISIKO PER 14 SEP 2018')+
 '<h3>2. PETA PANAS RISIKO</h3><p style="font-size:12px">Sumbu vertikal: dampak (meningkat ke atas). Sumbu horizontal: kemungkinan (meningkat ke kanan).</p>'+grid+
 '<p style="text-align:center;font-size:12px">KEMUNGKINAN →</p><p style="font-size:12px">Warna menunjukkan kelas skor. Posisi kode sesuai angka K dan D pada register halaman 1.</p>'+
 table(['Kelas','Skor','Ketentuan eskalasi'],[['RENDAH','1–5','Pemantauan rutin'],['SEDANG','6–11','Rencana pengendalian unit'],['TINGGI','12–19','Tinjauan komite risiko'],['KRITIS','20–25','Eskalasi kepada direksi dan audit']]))+
 page(head(3,'TINDAK LANJUT, REFERENSI, DAN RIWAYAT PENILAIAN')+
 '<h3>3. REGISTER TINDAK LANJUT</h3>'+table(['ID','Tindakan yang diminta','Batas telaah','Referensi'],risks.map((r,i)=>[r[0],r[6],['17 SEP','18 SEP','17 SEP','21 SEP','20 SEP'][i]+' 2018',['VX17/SAFETY/RECON','FIN/VX17/DISB','VX17/REV/04','OPS/BCP/09','FIN/CONTRACT/12'][i]]))+
 '<h3>4. RIWAYAT PENILAIAN</h3>'+table(['Tanggal','Revisi','Keterangan','Unit'],[['05 SEP 2018','00','Pembukaan register risiko program','Tata Kelola Klinis'],['14 SEP 2018','01','Penilaian ulang atas ketidaksesuaian pelaporan dan status pencairan','Keuangan / Klinis']])+
 '<h3>5. DISTRIBUSI DAN BATASAN</h3><p>Salinan: Direksi, Keuangan, Tata Kelola Klinis, Audit Internal. Kepemilikan risiko menunjukkan unit yang wajib menindaklanjuti, bukan identitas pembuat perubahan data atau pelaksana instruksi.</p><p style="font-size:11px;color:#716e66">VRC/RISK/VX17/014 · AKHIR REGISTER</p>')+
 '<p class="small">Dokumen fiksi untuk permainan Planora Cold Case.</p></div>';
 show('VX17_RISK_REGISTER.pdf',html);
};

/* v87 — participant-level disposition reconciliation replaces redundant summary */
const previousTrial87=openDocument;
openDocument=function(id){
 if(id!=='trial')return previousTrial87(id);
 if(!state.seen.includes(id))state.seen.push(id);persist();render();
 const excluded=new Set([3,7,11,14,18,22,27,31,9,36]);
 const serious=new Set([3,7,11,14,18,22,27,31,35,39]);
 const ids=Array.from({length:40},(_,i)=>i+1);
 const rows=ids.map(n=>{
 const key='VX17-'+String(n).padStart(3,'0');
 const status=excluded.has(n)?'TIDAK':'YA';
 const reason=excluded.has(n)?(serious.has(n)?'TINDAK LANJUT KLINIS':'KUNJUNGAN AKHIR BELUM LENGKAP'):'—';
 const flag=serious.has(n)?'SAE':'—';
 const ref=excluded.has(n)?'CLN/FU/'+String(n).padStart(3,'0'):'—';
 return [key,'YA',flag,status,reason,ref];
 });
 const table=(heads,rs)=>'<div style="overflow-x:auto"><table style="border-collapse:collapse;width:100%;font-size:11px"><thead><tr>'+heads.map(h=>'<th style="text-align:left;padding:7px;border:1px solid #b8b09f;background:#d9cfb9">'+h+'</th>').join('')+'</tr></thead><tbody>'+rs.map(row=>'<tr>'+row.map(v=>'<td style="padding:6px;border:1px solid #c6bdac">'+v+'</td>').join('')+'</tr>').join('')+'</tbody></table></div>';
 const page=(n,title,body)=>'<section style="background:#f4eee0;border:1px solid #c1b7a5;padding:24px;margin:14px 0 24px"><div style="display:flex;justify-content:space-between;border-bottom:2px solid #28474a;padding-bottom:12px;font-size:11px"><span>VEYRA RESEARCH CENTER<br>CLINICAL DATA MANAGEMENT</span><span>VX17/CDM/0918 · '+n+'/2</span></div><h2 style="margin:22px 0 6px">'+title+'</h2><p style="font-size:11px;border-bottom:1px solid #b7ae9d;padding-bottom:14px">EKSPOR REKONSILIASI · 18 SEP 2018 · DATA UJI KLINIS</p>'+body+'</section>';
 const page1=page('01','REGISTER STATUS PESERTA VX-17','<p><b>1. DAFTAR SUBJEK YANG MENERIMA DOSIS</b></p><p style="font-size:12px">Kolom PUBLIK mencatat keikutsertaan dalam ringkasan REV04. SAE adalah penanda kejadian serius pada dataset keselamatan. Kode rujukan menunjukkan berkas tindak lanjut yang tercatat dalam indeks klinis; keberadaan dan perpindahan fisiknya memerlukan verifikasi arsip terpisah.</p>'+table(['ID SUBJEK','DOSIS','SAE','PUBLIK REV04','STATUS ADMINISTRATIF','RUJUKAN'],rows)+'<p style="font-size:11px">AKHIR REGISTER: 40 SUBJEK · 40 DOSIS · 10 PENANDA SAE · 30 MASUK REV04 · 10 TIDAK MASUK REV04</p>');
 const page2=page('02','REGISTER REKONSILIASI & JEJAK REVISI','<p><b>2. KONTROL POPULASI</b></p>'+table(['SUMBER','DOSIS','MASUK ANALISIS','PENANDA SAE','REFERENSI'],[['VX17_RAW','40','40','10','VX17-SAF-2018-09'],['VX17_PUBLIC','—','30','2','VX17-SUM-REV04']])+'<p style="font-size:12px">Definisi Safety Population dalam protokol: setiap subjek yang menerima sedikitnya satu dosis. Status kunjungan akhir tidak mengubah status penerimaan dosis.</p><p><b>3. RIWAYAT DOKUMEN YANG TERSEDIA</b></p>'+table(['TANGGAL','REFERENSI','CATATAN','SUMBER'],[['04 SEP 2018','VX17-SAF-2018-09','Ekspor dataset keselamatan','Indeks CDM'],['05 SEP 2018','VRC/CLN/17 REV02','Protokol analisis keselamatan','Register protokol'],['—','VX17-SUM-REV04','Ringkasan publik revisi 04; tanggal perubahan tidak termuat pada ekspor ini','Salinan publik']])+'<p><b>4. KETERBATASAN REKAMAN</b></p><p>Register ini tidak memuat nama pengubah data, identitas pengesah elektronik, atau bukti pemindahan fisik berkas tindak lanjut. Referensi persetujuan cetak N. SANTOSO tercatat pada salinan REV04; log audit terpisah diperlukan untuk menentukan pelaksana perubahan.</p><p style="font-size:11px">VX17/CDM/0918 · AKHIR EKSPOR</p>');
 show('VX17_SUBJECT_DISPOSITION_2018.csv','<div class="modalcontent"><button class="backdoc" onclick="openEnvelope(3)">← KEMBALI KE BERKAS SEBELUMNYA</button>'+page1+page2+'<p class="small">Dokumen fiksi untuk permainan Planora Cold Case.</p></div>');
};

// v87: update archive listing title to match evidence export
if(typeof docs!=='undefined'&&docs.trial){docs.trial.name='VX17_SUBJECT_DISPOSITION_2018.csv';docs.trial.title='REGISTER STATUS PESERTA VX-17';}

/* v88 — internal messaging: read-only forensic conversation export */
const previousMessages88=openDocument;
openDocument=function(id){
 if(id!=='messages')return previousMessages88(id);
 if(!state.seen.includes(id))state.seen.push(id);persist();render();
 const entries=[
 ['01:37:58','MSG-1841','DIR-ADMIN','AUDIT-OPS','Stop audit.','DELIVERED','VX17-AUDIT'],
 ['01:39:04','MSG-1842','AUDIT-OPS','DIR-ADMIN','Perintah diterima. Mohon nomor otorisasi penghentian.','TIDAK TERSEDIA','RE: VX17-AUDIT'],
 ['01:43:16','MSG-1843','DIR-ADMIN','AUDIT-OPS','Tunda distribusi berkas sampai pemeriksaan selesai.','TIDAK TERSEDIA','RE: VX17-AUDIT']
 ];
 const item=e=>'<div style="display:flex;justify-content:'+(e[2]==='DIR-ADMIN'?'flex-end':'flex-start')+';margin:15px 0"><article style="box-sizing:border-box;max-width:83%;min-width:260px;padding:13px 16px;border:1px solid #b9b2a2;border-radius:8px;background:'+(e[2]==='DIR-ADMIN'?'#dce8df':'#fcf8ef')+';color:#29332e"><div style="display:flex;justify-content:space-between;gap:18px;font-size:11px"><b>'+e[2]+'</b><span>'+e[0]+' WIB</span></div><p style="margin:13px 0;font-size:15px">'+e[4]+'</p><div style="border-top:1px solid #bcb8a9;padding-top:8px;font-size:10px;line-height:1.6">'+e[1]+' · '+e[2]+' → '+e[3]+'<br>'+e[6]+' · '+e[5]+'</div></article></div>';
 const html='<div class="modalcontent"><button class="backfile" onclick="backModal()">← KEMBALI KE BERKAS SEBELUMNYA</button><article style="background:#f1ebdc;padding:25px 30px;border:1px solid #c4b8a4"><header style="display:flex;justify-content:space-between;gap:12px;border-bottom:2px solid #284a4d;padding-bottom:14px;font-size:11px"><span>VEYRA RESEARCH CENTER<br>UNIT SISTEM INFORMASI</span><span style="text-align:right">COMM-EXP/0918-04<br>ARSIP · HANYA BACA</span></header><h2 style="margin:22px 0 7px">REKAMAN PESAN INTERNAL</h2><p style="font-size:12px">CHANNEL VX17-AUDIT · 18 SEPTEMBER 2018 · WAKTU SERVER (WIB)</p><div style="border-top:1px solid #b9b0a0;padding-top:12px;font-size:12px">Ekspor pesan dari akun sistem. Identitas akun tidak memverifikasi orang yang mengetik pesan. Status pengiriman tidak menunjukkan pesan telah dibaca.</div><h3 style="margin-top:25px">A. PESAN TEREKAM</h3>'+entries.map(item).join('')+'<h3 style="margin-top:30px">B. INDEKS PERISTIWA TERKAIT</h3><div style="overflow-x:auto"><table style="border-collapse:collapse;width:100%;font-size:12px"><thead><tr style="background:#d9d0bd"><th style="padding:10px;border:1px solid #b9b0a0;text-align:left">WAKTU SERVER</th><th style="padding:10px;border:1px solid #b9b0a0;text-align:left">SUMBER</th><th style="padding:10px;border:1px solid #b9b0a0;text-align:left">EVENT / STATUS</th></tr></thead><tbody><tr><td style="padding:10px;border:1px solid #b9b0a0">01:38:22</td><td style="padding:10px;border:1px solid #b9b0a0">AUDIT_TERMINAL_EVENTS.log</td><td style="padding:10px;border:1px solid #b9b0a0">TASK_HOLD · SESSION 6F2 · QUEUED</td></tr><tr><td style="padding:10px;border:1px solid #b9b0a0">01:38:27</td><td style="padding:10px;border:1px solid #b9b0a0">AUDIT_TERMINAL_EVENTS.log</td><td style="padding:10px;border:1px solid #b9b0a0">QUEUE_ACK · JOB-118 · OK</td></tr></tbody></table></div><h3 style="margin-top:25px">C. BATAS REKAMAN</h3><p>Ekspor ini tidak menyertakan identitas perangkat pengetik, lokasi operator, tanda baca pesan, atau nomor otorisasi yang terverifikasi. QUEUE_ACK menyatakan pengakuan penerimaan antrean oleh layanan, bukan bukti bahwa seluruh audit telah dihentikan.</p><p style="font-size:11px;color:#706b60;margin-top:24px">COMM-EXP/0918-04 · AKHIR EKSPOR</p></article><p class="small">Dokumen fiksi untuk permainan Planora Cold Case.</p></div>';
 show('INTERNAL_MESSAGES.txt',html);
};

/* v89 — make the final-verdict evidence field usable and give explicit feedback */
showVerdict=function(){
 if(state.unlocked<4){setView('verdict');return}
 show('FINAL_VERDICT','<div class="modalcontent"><span class="overline">FINAL INVESTIGATION REPORT</span><h2>FINAL VERDICT</h2><p>Keempat amplop telah terbuka. Verifikasi data keselamatan sebagai tahap awal penyusunan putusan. Persentase saja bukan bukti identitas pelaku.</p><section class="question"><label for="finalCode"><b>VERIFIKASI DATA MENTAH VX-17</b></label><p>Menurut register keselamatan, berapa persen dari seluruh peserta yang menerima dosis mengalami kejadian serius?</p><form id="finalEvidenceForm" onsubmit="event.preventDefault();submitVerdict();"><input id="finalCode" name="finalCode" type="text" inputmode="decimal" placeholder="Contoh: 12,5" autocomplete="off" aria-describedby="finalFeedback" style="pointer-events:auto;user-select:text;position:relative;z-index:1"><button type="submit" class="primary">VERIFIKASI BUKTI</button></form><p id="finalFeedback" class="feedback" role="status" aria-live="polite"></p></section>'+(state.verdict?'<p class="feedback">Verifikasi sebelumnya tersimpan. Kamu boleh memeriksa ulang.</p>':'')+'</div>');
 const field=document.getElementById('finalCode');if(field){field.disabled=false;field.readOnly=false;field.removeAttribute('inert');field.addEventListener('click',()=>field.focus());}
};
submitVerdict=function(){
 const input=document.getElementById('finalCode');
 const feedback=document.getElementById('finalFeedback');
 if(!input||!feedback)return;
 const raw=input.value.trim().replace(/%/g,'').replace(',','.');
 if(!raw){feedback.textContent='Kolom belum diisi. Masukkan persentase hasil perhitungan.';input.focus();return}
 const number=Number(raw);
 if(!Number.isFinite(number)){feedback.textContent='Masukkan angka persentase, misalnya 12,5.';input.focus();return}
 if(Math.abs(number-25)<0.001){state.verdict=true;persist();render();feedback.textContent='VERIFIKASI BERHASIL. Nilai 25% sesuai register keselamatan (10 dari 40 peserta). Ini belum menetapkan identitas pengubah data atau pihak yang bertanggung jawab atas keruntuhan.';}
 else{feedback.textContent='Belum sesuai. Gunakan jumlah kejadian serius dibagi seluruh peserta yang menerima dosis, kemudian kalikan 100.';input.focus();}
};

/* v90 — two-track evidence-based final investigation report */
const finalReportKey90='planora_cc_final_report_v90';
const finalEscape90=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;','\'':'&#39;'}[c]));
function finalReportData90(){try{return JSON.parse(localStorage.getItem(finalReportKey90)||'{}')}catch(e){return {}}}
function finalChoices90(value){return '<option value="">— PILIH —</option>'+suspect.map(p=>'<option value="'+finalEscape90(p.id)+'" '+(value===p.id?'selected':'')+'>'+finalEscape90(p.name)+'</option>').join('')+'<option value="unknown" '+(value==='unknown'?'selected':'')+'>Belum dapat dipastikan</option>'}
function finalField90(prefix,title,description,data){
return '<section class="question" style="margin:20px 0"><h3>'+title+'</h3><p>'+description+'</p><label for="'+prefix+'Person">Pihak yang diduga bertanggung jawab</label><select id="'+prefix+'Person" style="display:block;max-width:100%;width:100%;padding:12px;margin:8px 0 16px">'+finalChoices90(data[prefix+'Person'])+'</select><label for="'+prefix+'Motive">Motif atau kepentingan yang diduga</label><textarea id="'+prefix+'Motive" rows="3" style="display:block;width:100%;box-sizing:border-box;margin:8px 0 16px" placeholder="Apa kepentingan pihak tersebut?">'+finalEscape90(data[prefix+'Motive'])+'</textarea><label for="'+prefix+'Action">Tindakan atau keputusan yang diduga</label><textarea id="'+prefix+'Action" rows="3" style="display:block;width:100%;box-sizing:border-box;margin:8px 0 16px" placeholder="Apa yang diduga dilakukan, dan kapan?">'+finalEscape90(data[prefix+'Action'])+'</textarea><label for="'+prefix+'Evidence">Referensi minimal dua bukti berbeda</label><textarea id="'+prefix+'Evidence" rows="3" style="display:block;width:100%;box-sizing:border-box;margin:8px 0 16px" placeholder="Sebut nama berkas, waktu, kode atau temuan">'+finalEscape90(data[prefix+'Evidence'])+'</textarea><label for="'+prefix+'Limit">Batas pembuktian / penjelasan alternatif</label><textarea id="'+prefix+'Limit" rows="3" style="display:block;width:100%;box-sizing:border-box;margin:8px 0" placeholder="Apa yang belum dapat disimpulkan?">'+finalEscape90(data[prefix+'Limit'])+'</textarea></section>';
}
showVerdict=function(){
 if(state.unlocked<4){setView('verdict');return}
 const d=finalReportData90();
 const verified=!!state.verdict;
 show('FINAL_VERDICT','<div class="modalcontent"><span class="overline">FINAL INVESTIGATION REPORT / CASE 001</span><h2>LAPORAN KESIMPULAN INVESTIGASI</h2><p>Susun dua jalur perkara secara terpisah. Nama pemilik akun atau tanda tangan pada salinan tidak otomatis membuktikan siapa yang bertindak. Pilihan “Belum dapat dipastikan” diperbolehkan bila bukti belum cukup.</p><section class="question"><h3>01 / VERIFIKASI DATA KESELAMATAN</h3><p>Berapa persen peserta yang menerima dosis mengalami kejadian serius pada data mentah VX-17?</p><form onsubmit="event.preventDefault();submitVerdict();"><input id="finalCode" type="text" inputmode="decimal" autocomplete="off" placeholder="Persentase" value="'+(verified?'25':'')+'"><button class="primary" type="submit">VERIFIKASI DATA</button></form><p id="finalFeedback" class="feedback" role="status">'+(verified?'DATA TERVERIFIKASI · 10 dari 40 peserta.':'')+'</p></section><form id="finalReportForm90" onsubmit="event.preventDefault();saveFinalReport90();">'+finalField90('structure','02 / KESELAMATAN STRUKTUR','Identifikasi keputusan atau kelalaian yang relevan dengan risiko keruntuhan. Bedakan kewenangan mengambil keputusan dari penyebab fisik keruntuhan.',d)+finalField90('clinical','03 / DATA UJI KLINIS VX-17','Identifikasi dugaan perubahan data dan pihak yang dapat dikaitkan melalui jejak sistem, bukan hanya tanda tangan cetak.',d)+'<section class="question"><h3>04 / HUBUNGAN DUA JALUR KASUS</h3><label for="finalRelation90">Apakah ada hubungan yang terbukti antara kedua peristiwa?</label><select id="finalRelation90" style="display:block;width:100%;padding:12px;margin:8px 0 16px"><option value="">— PILIH KESIMPULAN —</option><option value="proven" '+(d.relation==='proven'?'selected':'')+'>Ada hubungan yang didukung bukti</option><option value="unproven" '+(d.relation==='unproven'?'selected':'')+'>Hubungan belum terbukti</option><option value="separate" '+(d.relation==='separate'?'selected':'')+'>Bukti mendukung dua perkara terpisah</option></select><label for="finalRelationEvidence90">Dasar kesimpulan dan bukti silang</label><textarea id="finalRelationEvidence90" rows="4" style="display:block;width:100%;box-sizing:border-box;margin:8px 0" placeholder="Cantumkan bukti dan jelaskan batas kesimpulan">'+finalEscape90(d.relationEvidence)+'</textarea></section><button class="primary" type="submit">SIMPAN LAPORAN FINAL</button><p id="finalReportFeedback90" class="feedback" role="status">'+(d.submitted?'LAPORAN FINAL TERSIMPAN. Dapat direvisi setelah meninjau ulang bukti.':'')+'</p></form></div>');
};
function saveFinalReport90(){
 const fb=document.getElementById('finalReportFeedback90');
 if(!state.verdict){fb.textContent='Verifikasi data keselamatan pada bagian 01 terlebih dahulu.';return}
 const data={};for(const prefix of ['structure','clinical'])for(const field of ['Person','Motive','Action','Evidence','Limit'])data[prefix+field]=document.getElementById(prefix+field).value.trim();
 data.relation=document.getElementById('finalRelation90').value;data.relationEvidence=document.getElementById('finalRelationEvidence90').value.trim();
 for(const prefix of ['structure','clinical']){
 if(!data[prefix+'Person']||['Motive','Action','Evidence','Limit'].some(k=>data[prefix+k].length<20)){fb.textContent='Lengkapi kedua jalur: pilih pihak, lalu tulis motif, tindakan, bukti, dan batas pembuktian (minimal 20 karakter tiap bagian).';return}
 }
 if(!data.relation||data.relationEvidence.length<25){fb.textContent='Pilih hubungan kedua kasus dan tulis dasar kesimpulan minimal 25 karakter.';return}
 data.submitted=true;data.savedAt=new Date().toISOString();localStorage.setItem(finalReportKey90,JSON.stringify(data));
 fb.textContent='LAPORAN FINAL TERSIMPAN. Dua jalur kasus dan bukti pendukung tercatat di perangkat ini. Ini adalah pengajuan hipotesis, bukan penetapan pelaku otomatis.';
}

/* v91: recovered device */
function openPhone91(){
 if(state.unlocked<4)return;
 if(localStorage.getItem('cc_phone91')==='open')return phoneChat91();
 show('DEVICE_01','<div class="modalcontent"><span class="overline">DIGITAL FORENSICS</span><h2>HP FARHAN — TERKUNCI</h2><p>PIN enam digit. Empat digit pertama: jam sebenarnya akses arsip yang tampak 01:59 di CCTV (HHMM). Dua digit terakhir: nomor studi pada register klinis.</p><form onsubmit="event.preventDefault();verifyPhone91()"><input id="pin91" inputmode="numeric" maxlength="6" placeholder="6 DIGIT" autocomplete="off"><button class="primary">BUKA PERANGKAT</button></form><p id="pinFeedback91" role="status"></p></div>');
}
function verifyPhone91(){
 if(document.getElementById('pin91').value.trim()!=='020617'){document.getElementById('pinFeedback91').textContent='PIN salah. Cocokkan waktu CCTV dengan log pintu.';return}
 localStorage.setItem('cc_phone91','open');phoneChat91();
}
function phoneChat91(){
 show('DEVICE_01_CHAT','<div class="modalcontent"><span class="overline">RECOVERED CHAT · DEVICE-01</span><h2>EKSTRAK PERCAKAPAN</h2><p>Kontak M.K. belum terverifikasi sebagai identitas pengirim.</p><div class="question"><p><b>M.K. · 17 SEP 21:16</b><br>Tim audit meminta register asli. Jangan biarkan mereka membandingkan versi publik dengan lembar sumber.</p><p><b>F. · 21:19</b><br>Arsip utama masih di Zona C. Ada pembatasan dari bagian teknik.</p><p><b>M.K. · 21:22</b><br>Pastikan berkas itu tidak sampai ke meja audit. Jangan gunakan permintaan resmi.</p><p><b>F. · 18 SEP 01:46</b><br>Map laporan ada. Lampiran data sumber tidak di rak.</p><p><b>M.K. · 01:49</b><br>Cari salinannya. Kita tidak punya kesempatan kedua.</p><p><b>F. · 02:08</b><br>Ada akses kedua ke ruang arsip. Bukan saya yang mengizinkan.</p><p><b>M.K. · 02:09</b><br>[PESAN TIDAK TERPULIHKAN]</p></div><p>Catatan forensik: isi chat tidak sendirian membuktikan identitas M.K., pemegang kartu 5172, ataupun penyebab keruntuhan.</p><button class="primary" onclick="showVerdict()">LANJUT LAPORAN FINAL</button></div>');
}
const oldVerdict91=showVerdict;
showVerdict=function(){
 oldVerdict91();
 if(state.unlocked<4)return;
 const form=document.getElementById('finalReportForm90');if(!form)return;
 const box=document.createElement('section');box.className='question';box.innerHTML='<h3>BARANG BUKTI TERAKHIR · DEVICE-01</h3><p>Periksa percakapan pada perangkat Farhan sebelum menyusun kesimpulan.</p><button class="primary" type="button" onclick="openPhone91()">BUKA HP FARHAN</button>';
 form.parentNode.insertBefore(box,form);
 if(localStorage.getItem('cc_phone91')!=='open'){form.style.display='none';const note=document.createElement('p');note.textContent='Laporan final tersedia setelah DEVICE-01 diperiksa.';box.appendChild(note)}
};


/* v113 — rentang salinan CCTV diselaraskan dengan akses kartu 5172, memakai jam kamera. */
docs.cctvIntegrity={name:'CAM_AR03_EXPORT_INTEGRITY_0919.pdf',title:'BERITA ACARA PEMERIKSAAN KELENGKAPAN EKSPOR CCTV',meta:'SECURITY SYSTEMS / 19 SEP 2018 / CAM-INT-019',sections:[],callout:''};
if(!envelopes[1].items.includes('cctvIntegrity'))envelopes[1].items.push('cctvIntegrity');
const cctvIntegrityPreviousOpen=openDocument;
openDocument=function(id){
 if(id!=='cctvIntegrity')return cctvIntegrityPreviousOpen(id);
 if(!state.seen.includes(id))state.seen.push(id);persist();render();
 const segments=[
 ['CAM03-0130','01:30:00','01:32:59','180','180','12.4 MB','PASS'],
 ['CAM03-0133','01:33:00','01:38:59','360','80','5.1 MB','INCOMPLETE'],
 ['CAM03-0139','01:39:00','01:41:59','180','180','12.1 MB','PASS'],
 ['CAM03-0158','01:58:00','02:00:59','180','180','12.5 MB','PASS']
 ];
 const rows=segments.map(a=>'<tr>'+a.map(x=>'<td>'+x+'</td>').join('')+'</tr>').join('');
 const audits=[['17/09 23:09:18','MAINT-SVC','TIME_SETTINGS','VIEW','SUCCESS'],['18/09 01:38:42','MAINT-SVC','EXPORT_QUEUE','SESSION OPEN','SUCCESS'],['18/09 01:39:11','MAINT-SVC','EXPORT_QUEUE','SESSION CLOSE','SUCCESS'],['19/09 09:32:05','SEC-EXPORT','CAM03-0133','EXPORT CHECK','INCOMPLETE']];
 const auditRows=audits.map(a=>'<tr>'+a.map(x=>'<td>'+x+'</td>').join('')+'</tr>').join('');
 const html='<div class="modalcontent"><button class="backfile" onclick="backModal()">← KEMBALI KE BERKAS SEBELUMNYA</button><article class="time-compare"><header><strong>VEYRA RESEARCH CENTER / SECURITY SYSTEMS</strong><span>CAM-INT-019 / SALINAN PEMERIKSAAN</span></header><h2>BERITA ACARA PEMERIKSAAN KELENGKAPAN EKSPOR CCTV</h2><div class="time-meta"><span>19 SEP 2018</span><span>CAM-AR03 / KORIDOR ARSIP</span><span>BUKAN MEDIA SUMBER</span></div><p>Objek: empat segmen dari salinan ekspor video. Indeks gambar koridor diperiksa terpisah dari berkas video kontinu.</p><h3>I. REGISTER SEGMEN EKSPOR</h3><div class="time-scroll"><table><thead><tr><th>FILE ID</th><th>AWAL*</th><th>AKHIR*</th><th>DURASI NOMINAL (D)</th><th>DURASI TERBACA (D)</th><th>UKURAN</th><th>HASIL</th></tr></thead><tbody>'+rows+'</tbody></table></div><p><small>* Waktu awal/akhir menurut jam CAM-AR03; belum dikoreksi terhadap jam server. D = detik. PASS = dapat diputar sesuai durasi nominal. INCOMPLETE = salinan tidak memuat durasi penuh; bukan bukti penghapusan.</small></p><h3>II. PETIKAN AUDIT SISTEM</h3><div class="time-scroll"><table><thead><tr><th>WAKTU SERVER</th><th>AKUN LAYANAN</th><th>OBJEK</th><th>AKTIVITAS</th><th>STATUS</th></tr></thead><tbody>'+auditRows+'</tbody></table></div><p><small>MAINT-SVC adalah akun layanan bersama untuk proses pemeliharaan; log ini tidak memuat identitas operator fisik. SESSION OPEN/CLOSE hanya membuktikan sesi antrean ekspor, bukan perintah menghapus atau mengubah video.</small></p><h3>III. CATATAN PEMERIKSA</h3><p>Segmen CAM03-0133 hanya memuat 80 dari 360 detik nominal. Pemeriksaan media sumber, log penyimpanan dan catatan autentikasi lanjutan diperlukan untuk membedakan gangguan ekspor, kerusakan rekaman, dan tindakan pengguna.</p><p>Ketidaklengkapan salinan dan perbedaan waktu kamera merupakan dua temuan terpisah. Identitas sosok pada indeks gambar belum dapat dipastikan dari data ini.</p><footer>CAM-INT-019 · SALINAN KERJA PEMERIKSAAN · DOKUMEN FIKTIF</footer></article></div>';
 show('CAM_AR03_EXPORT_INTEGRITY_0919.pdf',html);
};

/* v117: differentiated witness testimony for reconstructing travel times. */
const lokasiSaksi117={
bapAdrian:['Pukul 01.35 saya berada di ruang direktur, menandatangani lembar disposisi.','Sekitar 01.58 saya masih di area direksi, menunggu laporan operasional.','Saya akan menggunakan koridor utama menuju area timur. Saya tidak berjalan ke AR-03 menurut ingatan saya.'],
bapNadia:['Sekitar 01.35 saya berada di LAB-C, memeriksa catatan laboratorium.','Pukul 01.58 saya memperkirakan berada di meja administrasi dekat laboratorium, sebelum mencari berkas pembanding.','Dari LAB-C menuju AR-03 biasanya melalui koridor penghubung. Saya tidak mengukur perjalanan pada malam itu.'],
bapRaka:['Pukul 01.35 saya berada di ruang operasional untuk serah terima tugas.','Sekitar 01.58 saya berada di area utilitas; buku inspeksi mencatat putaran tugas saya.','Dari area utilitas saya biasanya melalui koridor timur. Saya tidak ingat pergi ke AR-03 malam itu.'],
bapDimas:['Sekitar 01.35 saya berada di ruang pemantauan struktur dan membaca grafik C7.','Pukul 01.58 saya masih berada di terminal pemantauan untuk menyalin hasil pengukuran.','Saya mengenal akses koridor timur menuju AR-03, tetapi pekerjaan saya malam itu berpusat di pemantauan struktur.'],
bapSiska:['Pukul 01.35 saya berjaga di SEC-01; buku jaga memuat pemeriksaan pos.','Sekitar 01.58 saya kembali ke SEC-01 setelah memeriksa koridor; waktunya dapat dibandingkan dengan buku jaga.','Dari SEC-01 ke AR-03 saya melewati J-01. Saya memperkirakan berjalan sekitar setengah menit bila koridor kosong.'],
bapMaya:['Pukul 01.35 saya sedang memeriksa berkas di ruang dokumentasi klinis.','Sekitar 01.58 saya mengaku masih menangani dokumen klinis di ruang kerja.','Saya mengetahui koridor menuju AR-03, tetapi tidak ingat menggunakannya pada malam kejadian.'],
bapFarhan:['Sekitar 01.35 saya berada di ruang perangkat jaringan untuk pemeriksaan layanan.','Pukul 01.58 saya mengoperasikan terminal pemeliharaan menurut catatan tugas saya.','Untuk menuju AR-03 saya biasanya melalui koridor timur. Catatan terminal tidak selalu membuktikan posisi fisik operator.'],
bapElena:['Pukul 01.35 saya berada di meja administrasi keuangan, menyelesaikan berkas pembayaran.','Sekitar 01.58 saya masih di ruang keuangan dan menerima panggilan internal.','Dari keuangan saya menggunakan koridor utama jika harus ke arsip; saya tidak memiliki tugas di AR-03 malam itu.']
};
for(const [id,w] of Object.entries({...witnessFiles,...bapTambahan})){
 const ans=lokasiSaksi117[id];if(!ans)continue;
 const questions=['Di mana Saudara/Saudari berada sekitar pukul 01.35 pada 18 September 2018?','Di mana Saudara/Saudari berada sekitar pukul 01.58 pada tanggal yang sama?','Dari lokasi yang disebutkan, jalur mana yang biasa digunakan menuju AR-03?'];
 for(let i=0;i<3;i++){const row=w.qa.find(q=>q[0]===questions[i]);if(row)row[1]=ans[i];}
}
