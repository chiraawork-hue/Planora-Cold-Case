/* CASE 001 supplemental records — deliberately distinguish allegations from verified findings */
docs.card5172={name:'SEC_CARD_5172_CHAIN_2018.pdf',title:'REGISTER PENERBITAN DAN PEMAKAIAN KARTU 5172',meta:'SECURITY ADMIN • 17–18 SEP 2018',sections:[
['17 SEP 2018 / 19:12','Kartu sementara 5172 diserahkan untuk pekerjaan jaringan koridor arsip AR-03. Formulir permintaan: IT-MNT/0917-04. Nama pemohon tercetak: F. MAHENDRA. Paraf penerima pada salinan tidak dapat diverifikasi secara biometrik.'],
['18 SEP 2018 / 01:41:26','Pembaca AR03-RDR merekam ACCESS_GRANTED kartu 5172. Kontak pintu membuka pada 01:41:29 dan menutup pada 01:41:46. Tidak ada identitas wajah yang tercatat oleh pembaca.'],
['Catatan pengembalian','Kolom pengembalian kartu kosong. Petugas keamanan mencatat daftar kartu sementara belum direkonsiliasi setelah insiden.'],
['Batas kesimpulan','Register mengaitkan kartu dengan permintaan atas nama Farhan, tetapi tidak membuktikan Farhan yang memegang kartu pada 01:41.']]};
docs.structuralForensic={name:'STRUCTURAL_FAILURE_REVIEW_2018.pdf',title:'KAJIAN FORENSIK KERUNTUHAN ZONA C',meta:'ENGINEERING REVIEW • 27 SEP 2018 • DRAFT',sections:[
['Dasar pemeriksaan','Inspeksi dilakukan setelah pemindahan material darurat. Beberapa sambungan dan fragmen tidak lagi berada pada posisi asal. Penetapan mekanisme akhir dibatasi oleh rantai penguasaan barang bukti.'],
['Temuan C7','Laporan sebelum insiden mencatat retakan 2,8 mm dan rekomendasi pengosongan area. Lebar retakan saja tidak menetapkan ambang kegagalan. Pemeriksaan pascainsiden menemukan indikasi kerusakan lama dan perubahan bentuk baru pada zona yang sama.'],
['Urutan data sensor','Sensor STR-C-04 meningkat mulai 02:13. Alarm gas aktif sekitar 02:17. Urutan ini tidak membuktikan gas menyebabkan keruntuhan, maupun bahwa getaran berasal dari sabotase.'],
['Temuan yang perlu diverifikasi','Pada dua fragmen penghubung terdapat bekas intervensi yang tidak dapat dicocokkan dengan daftar pekerjaan pemeliharaan yang tersedia. Pemeriksa meminta foto sebelum pembersihan, log alat, dan wawancara petugas.'],
['Kesimpulan sementara','Kegagalan progresif struktur merupakan hipotesis teknik yang memerlukan pengujian tambahan. Sabotase belum dapat dinyatakan terbukti hanya dari bekas intervensi tersebut.']]};
docs.maintenanceCross={name:'IT_MAINTENANCE_CROSSCHECK_2018.csv',title:'REKONSILIASI JADWAL PEMELIHARAAN',meta:'FACILITY IT / OPS • 18 SEP 2018',sections:[
['17 SEP / 18:30','Tiket IT-MNT/0917-04: inspeksi perangkat pembaca AR-03 dan kabel komunikasi. Pemohon: F. Mahendra. Otorisasi lokasi: OPS; persetujuan teknis pekerjaan struktur: TIDAK TERLAMPIR.'],
['18 SEP / 01:30–02:10','Jendela kerja yang tertera: 01:30–02:10. Log jaringan menunjukkan koneksi perangkat pemeliharaan ke segmen AR-03; nomor perangkat pada ekspor belum dapat dikaitkan dengan satu operator.'],
['18 SEP / 01:41','Akses kartu 5172 terjadi di tengah jendela pemeliharaan. Perlu dicocokkan dengan buku serah terima kartu dan keberadaan personel.'],
['18 SEP / 02:13','Sensor struktur mulai mencatat nilai abnormal setelah jendela kerja hampir berakhir. Kedekatan waktu tidak cukup untuk menyimpulkan sebab-akibat.'],
['Pekerjaan tidak tercatat','Tidak ditemukan work order yang mengizinkan perubahan komponen struktur C7. Absennya work order bukan bukti otomatis pekerjaan ilegal dilakukan.']]};
docs.clinicalCustody={name:'VX17_DUPLICATE_CUSTODY_2018.pdf',title:'REGISTER SALINAN DATA SUMBER VX-17',meta:'CLINICAL QA • 17–18 SEP 2018',sections:[
['17 SEP / 16:20','Pemeriksaan kendali mutu mencatat dua kelompok berkas: map laporan untuk distribusi audit dan lampiran data sumber yang harus disimpan terpisah. Lokasi lampiran pada salinan register diberi kode QA-B/17.'],
['18 SEP / 01:46','Catatan inventaris rak utama menyatakan map laporan masih tersedia; kolom lampiran data sumber ditandai “dipindah / belum diverifikasi”. Nama pemindah tidak tercantum.'],
['18 SEP / 02:06','Kartu 4418 terdaftar atas nama Nadia membuka AR-03. Log pintu tidak memuat isi barang yang dibawa.'],
['2026 / PEMBUKAAN ULANG','Salinan anonim yang diterima penyidik mengandung 40 entri peserta. Kesamaan jumlah dengan register lama mendukung pemeriksaan lanjut, tetapi keaslian berkas dan rantai penyimpanannya masih perlu diverifikasi.'],
['Batas kesimpulan','Tidak ada catatan serah terima yang memastikan Nadia memindahkan atau menyelamatkan lampiran.']]};
envelopes[3].items.push('card5172','structuralForensic','maintenanceCross','clinicalCustody');
