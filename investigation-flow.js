'use strict';
// Investigation flow: every access question is placed with its evidence in the preceding envelope.
envelopes[0].items.push('clockAudit');
envelopes[1].items.push('personnelIndex');
envelopes[2].items.push('handover');
docs.clockAudit={name:'TIME_SYNC_SERVICE_0918.log',title:'REGISTER SINKRONISASI JAM',meta:'FACILITY IT • 18 SEP 2018 • EXTRACT',sections:[['Sumber Referensi','SERVER-NTP-01 • 02:10:00 WIB • pengujian lampu koridor / SYNC PULSE.'],['Perangkat Kamera','CAM-AR03 • 02:03:00 • pengujian lampu koridor / SYNC PULSE. Status: CLOCK OFFSET / SERVICE PENDING.'],['Perangkat Pembanding','Kamera koridor dan server menggunakan sumber waktu yang berbeda. Log ini tidak mencatat identitas pemegang kartu.']],callout:'Angka waktu berasal dari perangkat berbeda. Cocokkan dengan catatan pintu arsip.'};
docs.personnelIndex={name:'PERSONNEL_REFERENCE_CARD.pdf',title:'REGISTER KODE PERSONEL DAN PROYEK',meta:'RECORDS CONTROL • 17 SEP 2018',sections:[['Elemen','STR / C7 — tindak lanjut teknik; STR / C8 — inspeksi rutin; STR / C9 — inspeksi rutin.'],['Penelitian','CLN / VX17 — studi neural recovery. CLN / VX09 — arsip terdahulu.'],['Catatan','Referensi silang antara laporan teknik dan arsip klinis hanya menunjukkan keterkaitan dokumen, bukan kesalahan individu.']],callout:'Bandingkan penanda yang berulang dalam dua jalur penyelidikan.'};
docs.handover={name:'SAFETY_RECONCILIATION.csv',title:'REKONSILIASI POPULASI KESELAMATAN',meta:'CLINICAL QA • EXPORT 04 SEP 2018',sections:[],callout:''};
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
['01:32:14','SYS-AUTH','SESSION_OPEN','DIR-ADMIN / WS-DIR-02','OK'],
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
show('REGISTER_DOKUMEN_2018.pdf','<div class="modalcontent"><button class="backfile" onclick="backModal()">← KEMBALI KE BERKAS SEBELUMNYA</button><article class="archive-ledger"><div class="archive-ledger-head"><div><b>VEYRA RESEARCH CENTER</b><small>RECORDS CONTROL / REGISTER COPY</small></div><span class="archive-ledger-stamp">RECEIVED<br>18 SEP 2018</span></div><h2>REGISTER PERPINDAHAN ARSIP</h2><div class="archive-ledger-meta"><span>NO. RC-0918/03</span><span>18 SEPTEMBER 2018</span><span>LEMBAR 03 / 07</span></div><div class="archive-ledger-scroll"><table><thead><tr><th>WAKTU</th><th>NO. TRANSAKSI</th><th>KODE BERKAS</th><th>LOKASI</th><th>KLAS.</th><th>PARAF</th></tr></thead><tbody>'+rows+'</tbody></table></div><div class="archive-ledger-foot"><span>RC / COPY 03</span><span>RECORDS CONTROL</span></div><p class="archive-ledger-disclaimer">Dokumen rekonstruksi fiktif untuk Planora Cold Case.</p></article></div>');
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
['Apakah Anda dapat mengenali sosok pada rekaman koridor?','Tidak dari gambar yang diperlihatkan kepada saya.'],
['Apakah Anda mengetahui isi rak B-04/17?','Saya mengetahui ada dokumen lintas unit yang disimpan sementara, tetapi tidak memeriksa isinya.'],
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
const page2='<h3>II. REFERENSI PENGUKURAN</h3><div class="facility-table"><table><thead><tr><th>SEGMEN</th><th>JARAK SKEMATIS</th><th>KONDISI</th></tr></thead><tbody><tr><td>SEC-01 → J-01</td><td>18 m</td><td>Koridor umum</td></tr><tr><td>J-01 → AR-03</td><td>24 m</td><td>Pintu akses kartu</td></tr><tr><td>STAIR-E → J-01</td><td>12 m</td><td>Koridor umum</td></tr><tr><td>LAB-C → AR-03</td><td>31 m</td><td>Melalui koridor timur</td></tr></tbody></table></div><p class="facility-note">Jarak merupakan estimasi rekonstruksi; tidak termasuk waktu tunggu, interaksi pintu, atau perubahan kecepatan berjalan. Jalur aktual seseorang tidak dapat ditentukan hanya dari denah.</p>';
show('DENAH_AKSES.pdf','<div class="modalcontent"><button class="backfile" onclick="backModal()">← KEMBALI KE BERKAS SEBELUMNYA</button><article class="facility-sheet"><header><strong>VEYRA RESEARCH CENTER / FACILITY RECORDS</strong><span>VRC-FAC-01 · REV 02</span></header><h2>DENAH & JALUR AKSES</h2><p>18 SEPTEMBER 2018 / SEKTOR TIMUR</p>'+page1+page2+'<footer>REKONSTRUKSI FIKTIF / PLANORA COLD CASE</footer></article></div>');
};

/* v48 — departmental master reference register, not an investigator's explanation */
docs.personnelIndex={name:'VRC_MASTER_REFERENCE_REGISTER_REV03.pdf',title:'REGISTER REFERENSI UNIT & PROYEK',meta:'RECORDS CONTROL / REV.03 / 17 SEP 2018',sections:[],callout:''};
const previousMasterRegisterOpen=openDocument;
openDocument=function(id){
if(id!=='personnelIndex'){previousMasterRegisterOpen(id);return;}
if(!state.seen.includes(id))state.seen.push(id);persist();render();
const records=[
['STR','STRUCTURAL','Structural Engineering','ENGINEERING','ACTIVE','12/09/18'],
['STR/C7','ELEMENT','Kolom C7','ENGINEERING','FOLLOW-UP','16/09/18'],
['STR/C8','ELEMENT','Kolom C8','ENGINEERING','ROUTINE','12/09/18'],
['STR/C9','ELEMENT','Kolom C9','ENGINEERING','ROUTINE','12/09/18'],
['ENG/STR/07','FILE','Pemeriksaan elemen struktur','ENGINEERING','RESTRICTED','16/09/18'],
['CLN','CLINICAL','Clinical Research','RESEARCH','ACTIVE','01/09/18'],
['CLN/VX17','STUDY','Neural recovery study','CLINICAL','ACTIVE','04/09/18'],
['CLN/VX09','ARCHIVE','Studi pendahulu','CLINICAL','ARCHIVED','30/08/18'],
['CLN/RAW/17','FILE','Primary data register','CLINICAL','RESTRICTED','04/09/18'],
['OPS','OPERATIONS','Facility Operations','OPERATIONS','ACTIVE','01/09/18'],
['SEC','SECURITY','Security Operations','SECURITY','ACTIVE','01/09/18'],
['IT','SYSTEMS','Information Technology','IT','ACTIVE','01/09/18'],
['AR-03','LOCATION','Ruang arsip timur','RECORDS','ACTIVE','17/09/18'],
['B-04/17','LOCATION','Rak penyimpanan sementara','RECORDS','ACTIVE','17/09/18'],
['FIN','FINANCE','Finance & Procurement','FINANCE','ACTIVE','01/09/18']
];
const rows=records.map((r,i)=>'<tr><td>'+String(i+1).padStart(2,'0')+'</td>'+r.map(v=>'<td>'+v+'</td>').join('')+'</tr>').join('');
const html='<div class="modalcontent"><button class="backfile" onclick="backModal()">← KEMBALI KE BERKAS SEBELUMNYA</button><article class="master-register"><header><strong>VEYRA RESEARCH CENTER / RECORDS CONTROL</strong><span>CONTROLLED COPY · RC-MR-03</span></header><h2>REGISTER REFERENSI UNIT & PROYEK</h2><div class="master-meta"><span>REVISION: 03</span><span>EFFECTIVE: 17 SEP 2018</span><span>PAGE: 01 / 01</span></div><div class="master-scroll"><table><thead><tr><th>NO</th><th>CODE</th><th>CLASS</th><th>REFERENCE</th><th>OWNER UNIT</th><th>STATUS</th><th>REV. DATE</th></tr></thead><tbody>'+rows+'</tbody></table></div><div class="master-approval"><span>PREPARED BY: RECORDS CONTROL</span><span>APPROVED: RC / 17 SEP 2018</span></div><footer>VRC / RC-MR-03 / CONTROLLED REFERENCE REGISTER<br>Rekonstruksi fiktif untuk Planora Cold Case.</footer></article></div>';
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
 const html='<div class="modalcontent"><button class="backfile" onclick="backModal()">← KEMBALI KE BERKAS SEBELUMNYA</button><article class="time-compare"><header><strong>VEYRA RESEARCH CENTER / IT SYSTEMS</strong><span>SERVICE HISTORY EXPORT</span></header><h2>RIWAYAT LAYANAN JAM CAM-AR03</h2><div class="time-meta"><span>IT-CAM03-0918</span><span>17–18 SEP 2018</span><span>TIMEBASE PER ROW</span></div><div class="time-scroll"><table><thead><tr><th>SEQ</th><th>TIME</th><th>CLOCK</th><th>EVENT</th><th>PARAMETER</th><th>RESULT</th></tr></thead><tbody>'+rows+'</tbody></table></div><p>SERVER = waktu log server; CAMERA = waktu lokal yang tertulis pada frame kamera. Catatan ini tidak menetapkan identitas operator atau membuktikan perubahan konfigurasi.</p><footer>IT-CAM03-0918 / FICTIONAL TECHNICAL RECORD</footer></article></div>';
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
['NADIA SANTOSO','Area administrasi','Mengaku meninggalkan laboratorium menuju administrasi; waktu perpindahan belum dipastikan'],
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
show('REGISTER_ALIBI_PERSONEL_0919.pdf','<div class="modalcontent"><button class="backfile" onclick="backModal()">← KEMBALI KE BERKAS SEBELUMNYA</button><article class="archive-ledger"><div class="archive-ledger-head"><div><b>VEYRA RESEARCH CENTER</b><small>UNIT INVESTIGASI INTERNAL / SALINAN KERJA</small></div></div><h2>REGISTER KETERANGAN KEBERADAAN PERSONEL</h2><div class="archive-ledger-meta"><span>INV-019-ALB</span><span>19 SEPTEMBER 2018</span><span>PERIODE 01.00–02.20 WIB</span></div><p>Ringkasan pernyataan awal mengenai keberadaan personel pada malam kejadian. Lokasi dan waktu yang disebutkan merupakan pengakuan, bukan hasil verifikasi independen.</p><div class="archive-ledger-scroll"><table><thead><tr><th>NO.</th><th>PERSONEL</th><th>LOKASI YANG DIAKUI</th><th>KETERANGAN AWAL</th><th>STATUS</th></tr></thead><tbody>'+rows+'</tbody></table></div><p>Verifikasi memerlukan pemeriksaan silang dengan catatan akses, waktu perangkat, kesaksian, dan dokumen pendukung. Ketidaksesuaian catatan tidak dengan sendirinya membuktikan kebohongan atau keterlibatan.</p><div class="archive-ledger-foot"><span>INV / COPY 01</span><span>PEMERIKSAAN LANJUTAN</span></div></article></div>');
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
