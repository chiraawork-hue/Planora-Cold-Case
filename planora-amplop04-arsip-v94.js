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
  title:'LEMBAR PEMERIKSAAN FORENSIK STRUKTUR', meta:'ENGINEERING REVIEW · STR-FR/0927 · DRAFT / 27 SEP 2018',
  sections:[
   ['IDENTITAS PEMERIKSAAN', 'LOKASI | ZONA C / ELEMEN C7\nDASAR | LAPORAN INSPEKSI 12–16 SEP 2018\nKONDISI BARANG BUKTI | SEBAGIAN FRAGMEN TELAH DIPINDAHKAN'],
   ['REGISTER TEMUAN', 'NO | OBJEK | HASIL OBSERVASI | STATUS\nF-01 | C7 | RETAK 2,8 mm PRAINSIDEN | TERCATAT\nF-02 | ZONA C | KERUSAKAN LAMA / DEFORMASI BARU | OBSERVASI\nF-03 | FRAGMEN PENGHUBUNG A/B | JEJAK INTERVENSI | UJI LANJUT\nF-04 | RANTAI BARANG BUKTI | POSISI ASAL TIDAK LENGKAP | TERBATAS'],
   ['REKAMAN SENSOR', 'WAKTU | PERANGKAT | PERISTIWA\n02:13 | STR-C-04 | GETARAN DI ATAS AMBANG OBSERVASI\n02:17 | GAS-ALARM | ALARM AKTIF'],
   ['PERMINTAAN UJI LANJUT', '[X] FOTO FRAGMEN SEBELUM PEMBERSIHAN\n[X] COCOKKAN DENGAN WORK ORDER PEMELIHARAAN\n[X] WAWANCARA PERSONEL TERKAIT\n[ ] UJI LANJUT MEKANISME KEGAGALAN'],
   ['PENGESAHAN', 'STATUS LAPORAN | DRAFT / MEKANISME AKHIR BELUM DITETAPKAN\nPEMERIKSA | __________  PENINJAU | __________']
  ]
 },
 maintenanceCross: {
  title:'EKSPOR REKONSILIASI PEMELIHARAAN', meta:'FACILITY IT / OPS · IT-MNT/0917-04 · 18 SEP 2018',
  sections:[
   ['HEADER TIKET', 'TICKET | IT-MNT/0917-04\nPEMOHON | F. MAHENDRA\nAREA | AR-03 / KORIDOR ARSIP\nJENDELA KERJA | 18/09 01:30–02:10\nRUANG LINGKUP | PEMBACA PINTU DAN JARINGAN'],
   ['EKSPOR PERISTIWA', 'WAKTU | SISTEM | KEGIATAN | REFERENSI\n17/09 18:30 | IT-MNT | TIKET DIBUKA | IT-MNT/0917-04\n18/09 01:41 | AR03-RDR | KARTU 5172 DITERIMA | SEC-TEMP/0917\n18/09 01:30–02:10 | NET-MAINT | KONEKSI SEGMEN AR-03 | PERANGKAT BELUM DIPASTIKAN\n18/09 02:13 | STR-C-04 | GETARAN ABNORMAL | STR-LOG/0918'],
   ['MATRIS OTORISASI', 'AKSES AREA | TERCATAT\nIZIN PEKERJAAN STRUKTUR C7 | TIDAK TERLAMPIR\nIDENTITAS OPERATOR JARINGAN | BELUM TERVERIFIKASI'],
   ['PENUTUPAN TIKET', 'STATUS | OPEN / REKONSILIASI TERTUNDA\nOPS REVIEW | __________  IT REVIEW | __________']
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
const priorOpen=window.openDocument;
window.openDocument=function(id){
 priorOpen(id);
 if(!original[id])return;
 const root=document.querySelector('#modalBody .modalcontent');
 if(root)root.classList.add('archive-v94');
};
})();
