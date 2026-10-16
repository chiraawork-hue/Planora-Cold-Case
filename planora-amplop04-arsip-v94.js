/* Planora Cold Case — Envelope 04 archival records, v94.
   Load AFTER investigation-flow.js and case-evidence-v92.js. */
(function(){
'use strict';
const records = {
 card5172: {
  title:'REGISTER KARTU AKSES SEMENTARA / 5172', meta:'SECURITY CONTROL · SEC-TEMP/0917 · LEMBAR 02/04',
  sections:[
   ['IDENTITAS KARTU', 'KARTU | JENIS | AREA | TIKET RUJUKAN\n5172 | SEMENTARA | AR-03 | IT-MNT/0917-04'],
   ['BUKU SERAH TERIMA', 'TANGGAL / JAM | PEMOHON TERCETAK | PARAF PENERIMA | PENGEMBALIAN\n17/09 19:12 | F. MAHENDRA | TIDAK TERBACA | BELUM TERCATAT'],
   ['EKSPOR PEMBACA PINTU', 'WAKTU SERVER | KARTU | EVENT | STATUS\n18/09 01:41:26 | 5172 | ACCESS_GRANTED | VALID\n18/09 01:41:29 | — | CONTACT_OPEN | OK\n18/09 01:41:46 | — | CONTACT_CLOSED | OK'],
   ['REKONSILIASI KARTU', 'KARTU DIKEMBALIKAN | [ ] YA [X] BELUM TERCATAT\nPEMEGANG FISIK SAAT AKSES | TIDAK TERVERIFIKASI\nPETUGAS PEMERIKSA | __________  TANGGAL | __________']
  ]
 },
 structuralForensic: {
  title:'LEMBAR PEMERIKSAAN FORENSIK STRUKTUR',
  meta:'ENGINEERING REVIEW · STR-FR/0927 · DRAFT / 27 SEP 2018',
  sections:[
   ['01 / IDENTITAS DAN RUANG LINGKUP',
    'NOMOR LAPORAN | STR-FR/0927\nTANGGAL PEMERIKSAAN | 19–27 SEP 2018\nLOKASI | GEDUNG RISET UTAMA / ZONA C\nELEMEN UTAMA | KOLOM C7\nACUAN | INSPEKSI 12 DAN 16 SEP 2018\nMETODE | OBSERVASI VISUAL, TELAAH FOTO, INVENTARISASI FRAGMEN, REKONSILIASI SENSOR\nSTATUS | PEMERIKSAAN LANJUTAN / BELUM FINAL'],

   ['02 / KONDISI BARANG BUKTI',
    'KODE | OBJEK | KONDISI SAAT DIPERIKSA\nF-01 | PERMUKAAN KOLOM C7 | SEBAGIAN TERTUTUP PUING\nF-02 | FRAGMEN BETON C7-A | TELAH DIPINDAHKAN KE AREA SORTIR\nF-03 | SAMBUNGAN C7-B | POSISI ASAL BELUM DAPAT DIREKONSTRUKSI\nF-04 | FOTO INSPEKSI | SALINAN 12 DAN 16 SEP TERSEDIA\n\nCATATAN | PEMINDAHAN PUING MEMBATASI PENENTUAN POSISI ASAL DAN URUTAN KERUSAKAN.'],

   ['03 / PEMERIKSAAN RETAK KOLOM C7',
    'REFERENSI | FOTO INSPEKSI 12 SEP 2018\nLOKASI | SISI TIMUR KOLOM C7\nLEBAR RETAK TERCATAT | 2,8 mm\nSUMBER ANGKA | CATATAN PENGUKURAN INSPEKSI PRAKEJADIAN\nPEMBACAAN ULANG | BELUM DAPAT DILAKUKAN PADA TITIK ASAL\n\nOBSERVASI | RETAK TELAH DICATAT SEBELUM PERISTIWA 18 SEP 2018. NILAI 2,8 mm BUKAN HASIL PENGUKURAN BARU PASCAKERUNTUHAN.\n\nBATASAN | LEBAR RETAK SAJA TIDAK CUKUP UNTUK MENENTUKAN KAPASITAS SISA KOLOM ATAU MEKANISME KEGAGALAN.'],

   ['04 / REGISTER TEMUAN FISIK',
    'NO | LOKASI / OBJEK | TEMUAN | STATUS\nF-01 | C7 / SISI TIMUR | RETAK PRAKEJADIAN TERCATAT | TERDOKUMENTASI\nF-02 | ZONA C | DEFORMASI DAN PATAHAN PASCAKEJADIAN | TERVERIFIKASI VISUAL\nF-03 | SAMBUNGAN C7-A/B | PERMUKAAN PATAHAN PERLU DIUJI | UJI LANJUT\nF-04 | PUING C7 | POSISI ASAL SEBAGIAN TIDAK PASTI | TERBATAS\n\nCATATAN | TEMUAN PASCAKEJADIAN BELUM DAPAT DIURUTKAN SEBAGAI SEBAB ATAU AKIBAT TANPA ANALISIS TAMBAHAN.'],

   ['05 / REKONSILIASI DATA SENSOR',
    'SUMBER | STR-C04 / LOG GETARAN ZONA C\nWAKTU | NILAI CHANNEL 01 | STATUS\n02:08 | 0,10 | TEREKAM\n02:09 | 0,12 | TEREKAM\n02:10 | 0,11 | TEREKAM\n02:11 | 0,19 | TEREKAM\n02:12 | 0,27 | TEREKAM\n02:13 | 0,91 | THRESHOLD EVENT\n02:14 | 1,22 | THRESHOLD ACTIVE\n02:15 | 1,34 | THRESHOLD ACTIVE\n02:16 | 1,46 | THRESHOLD ACTIVE\n02:17 | 1,58 | THRESHOLD ACTIVE\n\nSATUAN | NILAI INDEKS SENSOR SESUAI EKSPOR SISTEM; BUKAN LANGSUNG PERPINDAHAN KOLOM DALAM mm.\n\nSUMBER LAIN | GZ-C02 / ALARM GAS AKTIF 02:17:06 WIB.\nCATATAN | PERBEDAAN WAKTU AKTIVASI SENSOR TIDAK SENDIRINYA MENETAPKAN HUBUNGAN SEBAB-AKIBAT.'],

   ['06 / REKONSILIASI DOKUMEN TEKNIS',
    '12 SEP 2018 | RETAK C7 TERCATAT DALAM NOTA PEMERIKSAAN\n16 SEP 2018 | REKOMENDASI PEMBATASAN AREA / EVAKUASI SEMENTARA DITERBITKAN\n17 SEP 2018 | DOKUMEN DISPOSISI OPERASIONAL PERLU DICOCOKKAN\n18 SEP 2018 | PERISTIWA GETARAN DAN ALARM TERCATAT\n\nDOKUMEN YANG HARUS DIPERIKSA | NOTA C7, REGISTER RISIKO, DISPOSISI, LOG SENSOR, DAN BERITA ACARA PEMELIHARAAN.\n\nCATATAN | LAPORAN FORENSIK TIDAK MENETAPKAN SIAPA YANG MEMUTUSKAN KELANJUTAN OPERASIONAL.'],

   ['07 / PENILAIAN SEMENTARA AHLI',
    'TEMUAN TERKONFIRMASI | INDIKASI KERUSAKAN KOLOM C7 SUDAH TERDOKUMENTASI SEBELUM KERUNTUHAN.\n\nTEMUAN TERKONFIRMASI | DATA SENSOR MENUNJUKKAN PENINGKATAN PEMBACAAN PADA RENTANG 02:11–02:17 WIB.\n\nBELUM TERKONFIRMASI | TITIK AWAL KEGAGALAN STRUKTUR DAN URUTAN KERUSAKAN ANTARELEMEN.\n\nBELUM TERKONFIRMASI | APAKAH KERUSAKAN SAMBUNGAN MERUPAKAN PENYEBAB AWAL ATAU AKIBAT KERUNTUHAN.\n\nPENILAIAN | RIWAYAT KERUSAKAN C7 MEMERLUKAN PENELUSURAN TEKNIS DAN ADMINISTRATIF. PENYEBAB AKHIR BELUM DAPAT DITETAPKAN.'],

   ['08 / TINDAK LANJUT DAN PENGESAHAN',
    '[X] AMANKAN FOTO DAN FRAGMEN C7\n[X] COCOKKAN PENGUKURAN DENGAN CATATAN INSPEKSI\n[X] VERIFIKASI RIWAYAT PEMELIHARAAN DAN DISPOSISI\n[ ] SELESAIKAN UJI MATERIAL DAN SAMBUNGAN\n[ ] SELESAIKAN REKONSTRUKSI MEKANISME KEGAGALAN\n\nSTATUS | DRAFT / BELUM DISAHKAN SEBAGAI KESIMPULAN AKHIR\nPEMERIKSA STRUKTUR | __________________\nPENINJAU TEKNIS | __________________\nTANGGAL PENGESAHAN | __________________']
  ]
 },

 maintenanceCross: {
  title: 'LAPORAN REKONSILIASI PEMELIHARAAN', meta:'FACILITY IT / OPS · IT-MNT/0917-04 · 18 SEP 2018',
  sections:[
  ['1. IDENTITAS TIKET PEMELIHARAAN', 'NOMOR TIKET | IT-MNT/0917-04\nPEMOHON | F. MAHENDRA\nLOKASI PEKERJAAN | AR-03 / KORIDOR ARSIP\nJENDELA KERJA | 18/09 01:30–02:10\nRUANG LINGKUP | PEMBACA PINTU DAN JARINGAN'],
   ['2. EKSPOR PERISTIWA', 'WAKTU | SISTEM | KEGIATAN | REFERENSI\n17/09 18:30 | IT-MNT | TIKET DIBUKA | IT-MNT/0917-04\n18/09 01:41 | AR03-RDR | KARTU 5172 DITERIMA | SEC-TEMP/0917\n18/09 01:30–02:10 | NET-MAINT | KONEKSI SEGMEN AR-03 | PERANGKAT BELUM DIPASTIKAN\n18/09 02:13 | STR-C-04 | GETARAN ABNORMAL | STR-LOG/0918'],
   ['3. MATRIKS OTORISASI', 'AKSES AREA | TERCATAT\nIZIN PEKERJAAN STRUKTUR C7 | TIDAK TERLAMPIR\nIDENTITAS OPERATOR JARINGAN | BELUM TERVERIFIKASI'],
   ['4. PENUTUPAN TIKET', 'STATUS | OPEN / REKONSILIASI TERTUNDA\nOPS REVIEW | __________  IT REVIEW | __________']
  ]
 },
 clinicalCustody: {
  title:'REGISTER KENDALI SALINAN SUMBER / VX-17', meta:'CLINICAL QA · QA-RC/17-0918 · REVISI 02',
  sections:[
   ['IDENTITAS REGISTER', 'REGISTER | QA-RC/17-0918\nUNIT | CLINICAL QUALITY ASSURANCE\nLOKASI INDUK | AR-03 / ZONA C\nLOKASI SALINAN | QA-B/17'],
   ['DAFTAR KENDALI', 'KODE | JENIS | LOKASI | STATUS\nVX17-PUB/03 | MAP LAPORAN DISTRIBUSI | AR-03 | TERSEDIA\nVX17-SRC/17 | LAMPIRAN DATA SUMBER | QA-B/17 | VERIFIKASI TERTUNDA\nVX17-QA/02 | REKONSILIASI | CLINICAL QA | TERCATAT'],
   ['LOG PEMERIKSAAN', 'WAKTU | REF | PERISTIWA\n17/09 16:20 | QA-CHK/0917 | PEMISAHAN MAP DAN LAMPIRAN\n18/09 01:46 | INV-AR03/18 | MAP ADA, LAMPIRAN TIDAK DI RAK\n18/09 02:06 | SEC-AR03/4418 | AKSES PINTU DITERIMA'],
   ['REKONSILIASI 2026', 'REFERENSI | REOPEN/CASE001/QA-04\nSALINAN ANONIM | 40 ENTRI PESERTA\nASAL PENYIMPANAN | BELUM TERVERIFIKASI\nIDENTITAS PEMINDAH | TIDAK TERCATAT']
  ]
 }
};
const original = {};
for (const [id,record] of Object.entries(records)) {
 if(typeof docs==='undefined'||!docs[id])continue;
 original[id]={sections:docs[id].sections, title:docs[id].title,meta:docs[id].meta};
 Object.assign(docs[id],record);
}
// Render rows as compact, readable archival grids, including on narrow screens.
const css=document.createElement('style');
css.textContent='.modalcontent.archive-v94 h3{font-size:12px;letter-spacing:.09em;border-bottom:1px solid #9bb0a8;padding-bottom:7px;margin-top:22px}.modalcontent.archive-v94 h3+p{white-space:pre-wrap;overflow-wrap:anywhere;font-family:ui-monospace,SFMono-Regular,Consolas,monospace;font-size:12px;line-height:1.85;background:#f7f5ec;border:1px solid #c2c7b9;padding:12px;border-radius:3px}.modalcontent.archive-v94 .letterhead{border-bottom:2px solid #55796c}.modalcontent.archive-v94 .meta{letter-spacing:.04em}@media(max-width:600px){.modalcontent.archive-v94 h3+p{font-size:11px;padding:9px}}';
document.head.appendChild(css);
function formatStructuralReport(root){
 const headings=[...root.querySelectorAll('h3')];
 const section=headings.find(h=>h.textContent.includes('01 / IDENTITAS'));
 if(!section)return;
 const first=section;
 const last=headings.find(h=>h.textContent.includes('08 / TINDAK LANJUT'));
 if(!last)return;
 let end=last.nextElementSibling;
 if(!end)return;
 const report=document.createElement('div');
 report.className='structural-report forensic-sheet';
 report.innerHTML=`<div class="sr-banner"><span>VEYRA RESEARCH CENTER · UNIT REKAYASA STRUKTUR</span><strong>SALINAN PEMERIKSAAN TEKNIS</strong></div>
 <p class="sr-intro">Pemeriksaan ini disusun berdasarkan dokumentasi inspeksi sebelum kejadian, pengamatan material pascakejadian, serta rekaman instrumen di Zona C. Penilaian masih bersifat sementara karena sebagian material telah dipindahkan dan pengujian laboratorium belum selesai.</p>
 <h3>I. Identitas pemeriksaan</h3>
 <table><tbody><tr><th>Nomor laporan</th><td>STR-FR/0927</td><th>Tanggal pemeriksaan</th><td>19–27 September 2018</td></tr><tr><th>Lokasi</th><td>Gedung Riset Utama, Zona C</td><th>Elemen</th><td>Kolom C7</td></tr><tr><th>Metode</th><td colspan="3">Inspeksi visual, telaah foto, inventarisasi fragmen dan rekonsiliasi rekaman sensor.</td></tr></tbody></table>
 <h3>II. Pemeriksaan fisik dan barang bukti</h3>
 <p>Pengamatan dilakukan terhadap area kolom C7 dan fragmen yang tersedia. Posisi asal sebagian material belum dapat dipastikan akibat pemindahan puing setelah kejadian.</p>
 <table><thead><tr><th>Nomor</th><th>Objek</th><th>Hasil pemeriksaan</th><th>Status</th></tr></thead><tbody>
 <tr><td>F-01</td><td>Kolom C7, sisi timur</td><td>Catatan inspeksi 12 September menunjukkan retak selebar 2,8 mm sebelum keruntuhan.</td><td>Terdokumentasi</td></tr>
 <tr><td>F-02</td><td>Zona C</td><td>Deformasi dan patahan ditemukan setelah kejadian; urutan terbentuknya belum dapat dipastikan.</td><td>Observasi visual</td></tr>
 <tr><td>F-03</td><td>Fragmen sambungan C7-A/B</td><td>Permukaan patahan memerlukan pemeriksaan material dan sambungan.</td><td>Uji lanjutan</td></tr>
 <tr><td>F-04</td><td>Rantai barang bukti</td><td>Posisi asal sebagian fragmen tidak lengkap.</td><td>Terbatas</td></tr></tbody></table>
 <p class="sr-note"><b>Catatan pengukuran.</b> Angka 2,8 mm berasal dari laporan inspeksi prakejadian, bukan pengukuran ulang pada puing. Lebar retak saja tidak cukup untuk menghitung kapasitas sisa kolom.</p>
 <h3>III. Telaah rekaman instrumen</h3>
 <p>Rekaman perangkat STR-C04 memperlihatkan peningkatan indeks getaran pada rentang 02.11–02.17 WIB. Nilai berikut merupakan indeks pembacaan sistem, bukan simpangan kolom dalam milimeter.</p>
 <table><thead><tr><th>Waktu (WIB)</th><th>Indeks kanal 01</th><th>Keterangan</th></tr></thead><tbody>
 <tr><td>02.08</td><td>0,10</td><td>Terekam</td></tr><tr><td>02.10</td><td>0,11</td><td>Terekam</td></tr><tr><td>02.12</td><td>0,27</td><td>Terekam</td></tr><tr><td>02.13</td><td>0,91</td><td>Ambang terlampaui</td></tr><tr><td>02.14</td><td>1,22</td><td>Ambang aktif</td></tr><tr><td>02.17</td><td>1,58</td><td>Ambang aktif</td></tr></tbody></table>
 <p>Perangkat gas GZ-C02 mencatat alarm aktif pada 02.17.06 WIB. Urutan waktu kedua perangkat tidak dengan sendirinya membuktikan hubungan sebab-akibat.</p>
 <h3>IV. Penelaahan riwayat teknis</h3>
 <p>Nota pemeriksaan tanggal 12 September memuat catatan retak C7. Rekomendasi pembatasan area dan evakuasi sementara tercatat pada 16 September. Dokumen disposisi tanggal 17 September perlu dicocokkan untuk menilai tindak lanjut administratif terhadap rekomendasi tersebut.</p>
 <h3>V. Pendapat sementara pemeriksa</h3><table class="sr-assessment"><thead><tr><th>Kategori penilaian</th><th>Uraian</th></tr></thead><tbody><tr><td>Fakta terverifikasi</td><td>Catatan retak C7 telah ada sebelum kejadian; rekaman sensor menunjukkan peningkatan pembacaan pada malam keruntuhan.</td></tr><tr><td>Keterbatasan</td><td>Posisi asal sebagian fragmen tidak diketahui; pengujian material dan rekonstruksi belum selesai.</td></tr><tr><td>Belum dapat ditetapkan</td><td>Titik awal kegagalan, urutan kerusakan, dan keterkaitan kerusakan sambungan dengan keruntuhan.</td></tr></tbody></table>
 <p>Indikasi kerusakan pada elemen C7 telah terdokumentasi sebelum peristiwa 18 September. Rekaman sensor menunjukkan peningkatan aktivitas pada malam kejadian. Namun, titik awal kegagalan, urutan kerusakan antarelemen, serta hubungan kerusakan sambungan dengan keruntuhan belum dapat ditetapkan dari bukti yang tersedia.</p>
 <p><b>Kesimpulan sementara:</b> diperlukan rekonstruksi mekanisme kegagalan dan verifikasi riwayat penanganan peringatan struktur. Dokumen ini tidak menetapkan pihak yang bertanggung jawab atas keputusan operasional.</p>
 <h3>VI. Referensi berkas dan pemeriksaan lanjutan</h3><table><thead><tr><th>Kode referensi</th><th>Jenis berkas</th><th>Kegunaan pemeriksaan</th></tr></thead><tbody><tr><td>VR-MNT-2018-092</td><td>Nota pemeriksaan C7</td><td>Memeriksa riwayat retak dan rekomendasi pengamanan.</td></tr><tr><td>STR-C04 / 0918</td><td>Rekaman sensor struktur</td><td>Merekonstruksi urutan kenaikan indeks getaran.</td></tr><tr><td>F-01 s.d. F-04</td><td>Register temuan lapangan</td><td>Menelusuri posisi dan kondisi barang bukti.</td></tr><tr><td>Disposisi operasional 17 Sep</td><td>Arsip keputusan fasilitas</td><td>Memeriksa tindak lanjut rekomendasi teknis.</td></tr></tbody></table><h3>VII. Pengesahan dan status dokumen</h3>
 <p>Foto dan fragmen C7 perlu diamankan, pengukuran prakejadian diverifikasi, dan dokumen pemeliharaan serta disposisi direkonsiliasi. Pengujian material dan rekonstruksi mekanisme kegagalan masih tertunda.</p>
 <div class="sr-sign"><div><span>Disusun oleh · Unit Rekayasa Struktur</span><b>Pemeriksa teknis: belum dicantumkan pada salinan</b><i>Paraf: ______________________</i></div><div><span>Peninjauan · Pengendalian Mutu Teknik</span><b>Peninjau: belum ditetapkan</b><i>Paraf: ______________________</i></div></div>
 <p class="sr-status">STATUS: DRAF PEMERIKSAAN · BELUM MERUPAKAN KESIMPULAN AKHIR</p>`;
 let node=first;
 while(node){const next=node.nextElementSibling;node.remove();if(node===end)break;node=next;}
 const meta=root.querySelector('.meta');if(meta)meta.insertAdjacentElement('afterend',report);else root.appendChild(report);
 root.classList.add('structural-document');
}
function formatClinicalCustody(root){
 const headings=[...root.querySelectorAll('h3')];
 const first=headings.find(h=>h.textContent.trim()==='IDENTITAS REGISTER');
 const last=headings.find(h=>h.textContent.trim()==='REKONSILIASI 2026');
 if(!first||!last||!last.nextElementSibling)return;
 const end=last.nextElementSibling;
 const report=document.createElement('div');
 report.className='structural-report custody-report';
 report.innerHTML=`<div class="sr-banner"><span>VEYRA RESEARCH CENTER / CLINICAL QUALITY ASSURANCE</span><strong>REGISTER PENGENDALIAN DOKUMEN · REVISI 02</strong></div>
 <p class="sr-intro">Register ini digunakan untuk mencatat lokasi penyimpanan, status pemeriksaan, dan pergerakan dokumen sumber penelitian VX-17. Catatan lokasi berkas tidak dengan sendirinya mengidentifikasi orang yang memindahkannya.</p>
 <h3>I. Identitas register</h3>
 <table><tbody><tr><th>Nomor register</th><td>QA-RC/17-0918</td><th>Unit</th><td>Clinical Quality Assurance</td></tr><tr><th>Lokasi induk</th><td>AR-03 / Zona C</td><th>Lokasi salinan</th><td>QA-B/17</td></tr><tr><th>Versi dokumen</th><td>Revisi 02</td><th>Status</th><td>Rekonsiliasi belum selesai</td></tr></tbody></table>
 <h3>II. Daftar kendali berkas</h3>
 <p>Daftar berikut menunjukkan berkas yang tercatat pada sistem pengendalian salinan. Status tersedia atau tercatat tidak selalu berarti isi berkas telah diverifikasi.</p>
 <table><thead><tr><th>Kode berkas</th><th>Deskripsi</th><th>Lokasi register</th><th>Status</th></tr></thead><tbody>
 <tr><td>VX17-PUB/03</td><td>Map laporan distribusi</td><td>AR-03</td><td>Tersedia</td></tr>
 <tr><td>VX17-SRC/17</td><td>Lampiran data sumber</td><td>QA-B/17</td><td>Verifikasi tertunda</td></tr>
 <tr><td>VX17-QA/02</td><td>Dokumen rekonsiliasi</td><td>Clinical QA</td><td>Tercatat</td></tr></tbody></table>
 <h3>III. Riwayat pemeriksaan dan akses</h3>
 <table><thead><tr><th>Waktu (WIB)</th><th>Referensi</th><th>Peristiwa tercatat</th></tr></thead><tbody>
 <tr><td>17 Sep · 16.20</td><td>QA-CHK/0917</td><td>Pemisahan map laporan dan lampiran sumber dicatat dalam pemeriksaan.</td></tr>
 <tr><td>18 Sep · 01.46</td><td>INV-AR03/18</td><td>Map tersedia, tetapi lampiran tidak ditemukan pada rak yang diperiksa.</td></tr>
 <tr><td>18 Sep · 02.06</td><td>SEC-AR03/4418</td><td>Pembaca pintu AR-03 menerima akses kartu 4418; identitas pengguna fisik memerlukan verifikasi.</td></tr></tbody></table>
 <h3>IV. Rekonsiliasi arsip perkara tahun 2026</h3>
 <table><tbody><tr><th>Referensi pembukaan ulang</th><td>REOPEN/CASE001/QA-04</td></tr><tr><th>Salinan data</th><td>40 entri peserta anonim</td></tr><tr><th>Asal penyimpanan</th><td>Belum terverifikasi</td></tr><tr><th>Identitas pemindah</th><td>Tidak tercatat</td></tr></tbody></table>
 <h3>V. Catatan pengendalian dan pengesahan</h3>
 <p>Ketidaksesuaian antara lokasi berkas yang tercatat dan kondisi rak perlu ditelusuri melalui daftar peminjaman, akses ruangan, serta berita acara serah terima. Register ini tidak dapat digunakan sendirian untuk menentukan identitas pengambil dokumen.</p>
 <div class="sr-sign"><div><span>Petugas rekonsiliasi</span><b>Nama belum dicantumkan pada salinan</b><i>Paraf: __________________</i></div><div><span>Peninjau QA</span><b>Verifikasi belum selesai</b><i>Paraf: __________________</i></div></div>
 <p class="sr-status">STATUS: REKONSILIASI TERTUNDA · SALINAN ARSIP PERKARA</p>`;
 let node=first;
 while(node){const next=node.nextElementSibling;node.remove();if(node===end)break;node=next;}
 const meta=root.querySelector('.meta');
 if(meta)meta.insertAdjacentElement('afterend',report);else root.appendChild(report);
 root.classList.add('structural-document');
}
function paperLayoutForensic(root){
 const report=root.querySelector('.forensic-sheet');
 const title=root.querySelector('h2');
 const meta=root.querySelector('.meta');
 const letterhead=root.querySelector('.letterhead');
 if(!report||!title||!meta)return;
 const paper=document.createElement('article');
 paper.className='forensic-paper';
 paper.innerHTML='<div class="forensic-paperhead"><span>VEYRA RESEARCH CENTER<br>UNIT REKAYASA STRUKTUR</span><span>STR-FR/0927<br>HALAMAN 01 / DRAF</span></div><p class="forensic-paperline">SALINAN PEMERIKSAAN TEKNIS · 27 SEPTEMBER 2018</p>';
 (letterhead||title).insertAdjacentElement('beforebegin',paper);
 if(letterhead)letterhead.remove();
 paper.appendChild(title);
 paper.appendChild(meta);
 paper.appendChild(report);
 const note=[...root.querySelectorAll('p.small')].find(x=>x.textContent.includes('karya fiksi'));
 if(note)paper.appendChild(note);
 root.classList.add('forensic-paper-host');
}
function paperLayoutCustody(root){
 const report=root.querySelector('.custody-report');
 const title=root.querySelector('h2');
 const meta=root.querySelector('.meta');
 const letterhead=root.querySelector('.letterhead');
 if(!report||!title||!meta)return;
 const paper=document.createElement('article');
 paper.className='custody-paper';
 paper.innerHTML='<div class="custody-paperhead"><span>VEYRA RESEARCH CENTER<br>UNIT CLINICAL QUALITY ASSURANCE</span><span>QA-RC/17-0918<br>SALINAN TERKENDALI</span></div><p class="custody-paperline">REVISI 02 · 18 SEPTEMBER 2018 · ARSIP PERKARA</p>';
 (letterhead||title).insertAdjacentElement('beforebegin',paper);
 if(letterhead)letterhead.remove();
 paper.appendChild(title);
 paper.appendChild(meta);
 paper.appendChild(report);
 const note=[...root.querySelectorAll('p.small')].find(x=>x.textContent.includes('karya fiksi'));
 if(note)paper.appendChild(note);
 root.classList.add('custody-paper-host');
}
function paperLayoutCard5172(root){
 const report=root.querySelector('.access-card-report');
 const title=root.querySelector('h2');
 const meta=root.querySelector('.meta');
 const letterhead=root.querySelector('.letterhead');
 if(!report||!title||!meta)return;
 const paper=document.createElement('article');
 paper.className='card5172-paper';
 paper.innerHTML='<div class="card5172-paperhead"><span>VEYRA RESEARCH CENTER<br>SECURITY CONTROL</span><span>SEC-TEMP/0917<br>LEMBAR 02/04</span></div><p class="card5172-paperline">REGISTER AKSES SEMENTARA · 17 SEPTEMBER 2018</p>';
 (letterhead||title).insertAdjacentElement('beforebegin',paper);
 if(letterhead)letterhead.remove();
 paper.appendChild(title);
 paper.appendChild(meta);
 paper.appendChild(report);
 const note=[...root.querySelectorAll('p.small')].find(x=>x.textContent.includes('karya fiksi'));
 if(note)paper.appendChild(note);
 root.classList.add('card5172-paper-host');
}
function formatCard5172(root){
 const headings=[...root.querySelectorAll('h3')];
 const first=headings.find(h=>h.textContent.trim()==='IDENTITAS KARTU');
 const last=headings.find(h=>h.textContent.trim()==='REKONSILIASI KARTU');
 if(!first||!last||!last.nextElementSibling)return;
 const end=last.nextElementSibling;
 const report=document.createElement('div');
 report.className='structural-report access-card-report';
 report.innerHTML=`<div class="sr-banner"><span>VEYRA RESEARCH CENTER / SECURITY CONTROL</span><strong>SEC-TEMP/0917 · LEMBAR 02/04</strong></div>
 <div class="acr-meta"><span>Nomor dokumen: <b>SEC-TEMP/0917</b></span><span>Tanggal terbit: <b>17 September 2018</b></span><span>Status: <b>Rekonsiliasi terbuka</b></span></div>
 <h3>1. Identitas kartu akses</h3>
 <div class="acr-identity"><table><tbody><tr><th>Nomor kartu</th><td><b>5172</b></td></tr><tr><th>Jenis akses</th><td>Sementara (temporary)</td></tr><tr><th>Area</th><td>AR-03 / ruang arsip Zona C</td></tr><tr><th>Tiket rujukan</th><td>IT-MNT/0917-04</td></tr><tr><th>Status pengembalian</th><td>Belum tercatat</td></tr></tbody></table>
 <figure><img src="./kartu.png" alt="Dokumentasi kartu akses sementara 5172" loading="lazy"><figcaption>Gambar 1. Dokumentasi kartu akses sementara 5172 (lampiran register).</figcaption></figure></div>
 <h3>2. Buku serah terima</h3>
 <table class="acr-ledger"><thead><tr><th>Tanggal</th><th>Jam</th><th>Kegiatan</th><th>Pemohon / petugas</th><th>Paraf</th><th>Keterangan</th></tr></thead><tbody>
 <tr><td>17 Sep 2018</td><td>19:12</td><td>Penerbitan kartu akses sementara</td><td>F. Mahendra<br><small>(Security Control)</small></td><td class="acr-paraf"><span class="acr-farhan-mark">F.M.</span><small>F. Mahendra</small></td><td>Tidak tercatat<br>(penulisan lisan)</td></tr>
 <tr><td>19 Sep 2018</td><td>—</td><td>Pengembalian kartu akses</td><td>—</td><td>—</td><td><span class="acr-warning">BELUM TERCATAT</span></td></tr>
 </tbody></table>
 <h3>3. Log ekspor pembaca pintu (access log)</h3>
 <table class="acr-events"><thead><tr><th>Tanggal</th><th>Jam</th><th>Kartu</th><th>Event</th><th>Lokasi</th><th>Status</th></tr></thead><tbody>
 <tr><td>18 Sep 2018</td><td>01:41:26</td><td>5172</td><td>ACCESS_GRANTED</td><td>AR-03 (Pintu Utara)</td><td><span class="acr-ok">VALID</span></td></tr>
 <tr><td>18 Sep 2018</td><td>01:41:29</td><td>5172</td><td>CONTACT_OPEN</td><td>AR-03 (Pintu Utara)</td><td><span class="acr-ok">OK</span></td></tr>
 <tr><td>18 Sep 2018</td><td>01:41:46</td><td>5172</td><td>CONTACT_CLOSED</td><td>AR-03 (Pintu Utara)</td><td><span class="acr-ok">OK</span></td></tr>
 </tbody></table>
 <div class="acr-bottom">
 <section><h3>4. Rekonsiliasi kartu</h3><table class="acr-reconcile"><tbody>
 <tr><th>Kartu dikembalikan</th><td><span class="acr-choice"><span class="acr-box" aria-hidden="true"></span> Ya</span><span class="acr-choice"><span class="acr-box acr-box-checked" aria-hidden="true">✓</span> <strong>Belum tercatat</strong></span></td></tr>
 <tr><th>Kondisi fisik</th><td>—</td></tr>
 <tr><th>Catatan</th><td>Tidak ditemukan catatan pengembalian pada buku serah terima maupun sistem inventaris. Perlu verifikasi lebih lanjut melalui rekaman CCTV dan laporan petugas jaga.</td></tr>
 </tbody></table></section>
 <section><h3>5. Pengesahan</h3><table class="acr-approval"><thead><tr><th>Petugas Security Control</th><th>Peninjau operasional</th></tr></thead><tbody><tr><td><div class="acr-signline"></div>Nama : __________________<br>Jabatan : __________________<br>Tanggal : __________________</td><td><div class="acr-signline"></div>Nama : __________________<br>Jabatan : __________________<br>Tanggal : __________________</td></tr></tbody></table><span class="acr-draft">DRAFT<small>BELUM DISAHKAN</small></span></section>
 </div>
 <p class="acr-footnote">Catatan: nomor kartu dan peristiwa pembaca pintu tidak memastikan identitas pemegang fisik. Waktu mengikuti server akses.</p>`;
 let node=first;
 while(node){const next=node.nextElementSibling;node.remove();if(node===end)break;node=next;}
 const meta=root.querySelector('.meta');
 if(meta)meta.insertAdjacentElement('afterend',report);else root.appendChild(report);
 root.classList.add('structural-document');
}
const priorOpen=window.openDocument;
window.openDocument=function(id){
 priorOpen(id);
 if(!original[id])return;
 const root=document.querySelector('#modalBody .modalcontent');
 if(root){root.classList.add('archive-v94');if(id==='structuralForensic'){formatStructuralReport(root);paperLayoutForensic(root);}if(id==='clinicalCustody'){formatClinicalCustody(root);paperLayoutCustody(root);}if(id==='card5172'){formatCard5172(root);paperLayoutCard5172(root);}if(id==='maintenanceCross'&&window.formatMaintenanceReport)window.formatMaintenanceReport(root);}
};
})();
