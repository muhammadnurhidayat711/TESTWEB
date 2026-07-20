import type { SiteContent } from '@/types/siteContent'
import type { SupportedLanguage } from '@/lib/i18n'

export const defaultSiteContent: SiteContent = {
  pages: {
    home: { 
      id: 'home', 
      heroTitle: 'Membangun Masa Depan Cemerlang', 
      heroSubtitle: 'Memberikan pendidikan berkualitas dengan kurikulum bilingual, fasilitas modern, dan pengembangan karakter yang komprehensif.', 
      heroBgImage: '/images/hero-g.jpg', 
      heroBgImages: ['/images/hero-g.jpg'],
      introText: '',
      coreValues: {
        title: 'Nilai Inti Kami',
        subtitle: 'Membangun karakter unggul yang IMPACTFUL bagi sesama.',
        items: [
          { letter: 'I', word: 'ntegrity', desc: 'Kejujuran dan etika yang tinggi dalam setiap tindakan.' },
          { letter: 'M', word: 'indful', desc: 'Kesadaran penuh dan bijak dalam bertindak.' },
          { letter: 'P', word: 'rogressive', desc: 'Berpikir maju dan selalu berinovasi.' },
          { letter: 'A', word: 'gility', desc: 'Ketangkasan dalam beradaptasi dengan perubahan.' },
          { letter: 'C', word: 'ompassion', desc: 'Empati dan kepedulian tulus pada sesama.' },
          { letter: 'T', word: 'enacity', desc: 'Kegigihan dan daya juang pantang menyerah.' },
          { letter: 'F', word: 'idelity', desc: 'Kesetiaan pada prinsip dan nilai kebenaran.' },
          { letter: 'U', word: 'plifting', desc: 'Saling mengangkat, mendukung, dan memotivasi.' },
          { letter: 'L', word: 'ifelong Learner', desc: 'Semangat belajar yang tak pernah padam.' },
        ]
      },
      curriculum: {
        label: 'Standar Pendidikan Global',
        title: 'Kurikulum Bertaraf Internasional',
        desc: 'Pelita Cemerlang School mengadopsi kurikulum berstandar internasional yang dipadukan dengan nilai-nilai luhur nasional.',
        cards: [
          { title: 'Pearson Edexcel', desc: 'Sebagai pusat resmi UK Academic Curriculum, kami menerapkan lingkungan bilingual interaktif untuk kefasihan global.' },
          { title: 'Kurikulum Merdeka', desc: 'Penerapan kurikulum nasional yang adaptif, memerdekakan potensi siswa, dan selaras dengan profil pelajar Pancasila.' }
        ]
      },
      cta: {
        title: 'Mulai Perjalanan Anda Bersama Kami.',
        desc: 'Bergabunglah dengan komunitas pembelajar yang berdedikasi. Pendaftaran untuk tahun ajaran baru kini telah dibuka.',
        buttonText: 'Pendaftaran Online',
        buttonLink: '/admission'
      },
      testimonialsSection: {
        label: 'Testimoni',
        title: 'Apa Kata Mereka',
        desc: 'Cerita otentik dari komunitas Pelita Cemerlang.',
        videos: []
      },
      alumniSection: {
        label: 'Berita & Pengumuman',
        title: 'Informasi terkini',
        desc: 'Dapatkan informasi terkini seputar kegiatan, prestasi, dan pengumuman penting di Pelita Cemerlang School.'
      }
    },
    about: { 
      id: 'about', 
      heroTitle: 'Dedikasi Untuk Pendidikan', 
      heroSubtitle: 'Lebih dari dua dekade membentuk generasi unggul dengan wawasan global, integritas, dan semangat inovasi berkelanjutan.', 
      heroBgImage: '/images/hero-g.jpg', 
      introText: '',
      sambutan: {
        image: '/images/principal-2.jpg',
        quote: 'Pendidikan Sejati Adalah Transformasi Karakter.',
        descParagraphs: [
          'Selamat datang di Pelita Cemerlang School. Kami percaya bahwa pendidikan sejati melampaui keunggulan akademik semata. Ini adalah tentang membentuk karakter, memelihara integritas, dan menginspirasi hasrat untuk terus belajar sepanjang hayat.',
          'Di tengah dunia yang berubah dengan cepat, misi kami tetap teguh: membekali generasi masa depan dengan kecerdasan intelektual dan keanggunan moral. Kami mengundang Anda untuk bergabung dalam perjalanan transformatif ini, di mana setiap anak didorong untuk menemukan potensi terbaik mereka dan memberikan dampak positif bagi dunia.'
        ],
        name: 'Dr. Robert C. Alexander',
        role: 'Direktur Eksekutif Pelita Cemerlang'
      },
      visionMission: {
        visionLabel: 'Visi Kami',
        visionTitle: 'Menjadi institusi pendidikan bertaraf internasional yang membentuk pemimpin masa depan berkarakter mulia.',
        visionDesc: 'Kami berkomitmen untuk menyediakan ekosistem pendidikan berkelanjutan yang tidak hanya berfokus pada keunggulan akademis, tetapi juga pengembangan kecerdasan emosional dan spiritual.',
        missionLabel: 'Misi Kami',
        missionTitle: 'Pilar Pendidikan Cemerlang',
        missionItems: [
          'Menyelenggarakan kurikulum global dengan pendekatan lokal',
          'Mengembangkan karakter unggul berbasis nilai luhur',
          'Membina kemampuan kepemimpinan dan kolaborasi siswa',
          'Menciptakan lingkungan belajar yang inovatif dan aman'
        ]
      },
      timelineSection: {
        label: 'Perjalanan Kami',
        title: 'Sejarah Singkat',
        desc: 'Menelusuri jejak langkah dedikasi Pelita Cemerlang dalam memajukan pendidikan selama dua dekade.',
        items: [
          { year: '2005', title: 'Awal Perjalanan', desc: 'Pelita Cemerlang didirikan dengan visi menghadirkan pendidikan berkualitas global.' },
          { year: '2010', title: 'Akreditasi Internasional', desc: 'Resmi menjadi pusat ujian Pearson Edexcel dan mengadopsi kurikulum Cambridge.' },
          { year: '2015', title: 'Kampus Baru Terpadu', desc: 'Peresmian kampus baru dengan fasilitas modern untuk jenjang TK hingga SMA.' },
          { year: '2025', title: 'Inovasi Digital', desc: 'Penerapan ekosistem pembelajaran digital komprehensif.' }
        ]
      }
    },
    admission: { 
      id: 'admission', 
      heroTitle: 'Pendaftaran Siswa Baru', 
      heroSubtitle: 'Bergabunglah dengan komunitas pembelajar kami dan jadilah bagian dari masa depan yang cerah.', 
      heroBgImage: '/images/hero-g.jpg', 
      introText: '',
      programsSection: {
        label: 'Investasi Pendidikan',
        title: 'Program Pembelajaran',
        desc: 'Kami menawarkan program pendidikan komprehensif dari jenjang anak usia dini hingga menengah atas.',
        items: [
          { id: 'preschool', name: 'Preschool', age: 'Usia 3 - 5 Tahun', fee: 'Rp 2.500.000', period: 'Bulan', icon: 'Blocks' },
          { id: 'primary', name: 'Primary', age: 'Usia 6 - 11 Tahun', fee: 'Rp 3.500.000', period: 'Bulan', icon: 'BookOpen' },
          { id: 'secondary', name: 'Secondary', age: 'Usia 12 - 17 Tahun', fee: 'Rp 4.500.000', period: 'Bulan', icon: 'GraduationCap' }
        ]
      },
      timelineAdmission: {
        label: 'Jadwal Penting',
        title: 'Alur Pendaftaran',
        desc: 'Berikut adalah jadwal tahapan penerimaan siswa baru tahun ajaran 2026/2027.',
        items: [
          { phase: 'Pendaftaran Gelombang 1', date: '01 Sep - 30 Nov 2025', status: 'Dibuka' },
          { phase: 'Tes Seleksi & Wawancara', date: '05 - 10 Des 2025', status: 'Menunggu' },
          { phase: 'Pengumuman Hasil', date: '15 Des 2025', status: 'Menunggu' },
          { phase: 'Pendaftaran Gelombang 2', date: '01 Jan - 31 Mar 2026', status: 'Segera' }
        ]
      },
      requirementsSection: {
        label: 'Dokumen Persyaratan',
        title: 'Syarat Pendaftaran',
        desc: 'Siapkan dokumen berikut untuk melengkapi proses administrasi.',
        items: [
          'Mengisi formulir pendaftaran secara online',
          'Fotokopi Akta Kelahiran (2 lembar)',
          'Fotokopi Kartu Keluarga (2 lembar)',
          'Pas foto ukuran 3x4 dan 4x6 (masing-masing 4 lembar)',
          'Fotokopi Rapor pendidikan terakhir yang dilegalisir',
          'Sertifikat prestasi akademik/non-akademik (jika ada)'
        ]
      },
      cta: {
        title: 'Masih Memiliki Pertanyaan?',
        desc: 'Tim admisi kami siap membantu memberikan informasi lebih lanjut.',
        buttonText: 'Hubungi Kami',
        phoneText: '+62 811-1234-5678'
      }
    },
    career: { 
      id: 'career', 
      heroTitle: 'Karir di Pelita Cemerlang', 
      heroSubtitle: 'Bergabunglah dengan tim pendidik kami yang berdedikasi tinggi.', 
      heroBgImage: '/images/hero-g.jpg', 
      introText: '',
      valuesSection: {
        items: [
          { icon: 'GraduationCap', title: 'Pertumbuhan Profesional', text: 'Program pelatihan rutin dan dukungan untuk sertifikasi tingkat lanjut.' },
          { icon: 'Users', title: 'Lingkungan Kolaboratif', text: 'Budaya kerja yang saling mendukung, terbuka, dan menghargai setiap ide.' },
          { icon: 'HeartHandshake', title: 'Keseimbangan Hidup', text: 'Fasilitas kesehatan, jam kerja fleksibel, dan dukungan kesejahteraan.' },
        ]
      },
      openingsSection: {
        label: 'Bergabung Bersama Kami',
        title: 'Lowongan Tersedia',
        desc: 'Temukan posisi yang sesuai dengan keahlian dan passion Anda.'
      }
    },
    facilities: { id: 'facilities', heroTitle: 'Fasilitas Modern', heroSubtitle: 'Lingkungan belajar yang mendukung eksplorasi tanpa batas.', heroBgImage: '/images/hero-g.jpg', introText: '' },
    gallery: { id: 'gallery', heroTitle: 'Galeri Sekolah', heroSubtitle: 'Merekam jejak perjalanan siswa dan momen berharga di sekolah.', heroBgImage: '/images/hero-g.jpg', introText: '' },
    news: { id: 'news', heroTitle: 'Berita Terbaru', heroSubtitle: 'Informasi terkini dan aktivitas seputar kampus Pelita Cemerlang.', heroBgImage: '/images/hero-g.jpg', introText: '' },
    achievements: { id: 'achievements', heroTitle: 'Prestasi Siswa', heroSubtitle: 'Kumpulan apresiasi dan penghargaan yang diraih oleh siswa-siswi kami.', heroBgImage: '/images/hero-g.jpg', introText: '' },
    social: { id: 'social', heroTitle: 'Media Sosial Kami', heroSubtitle: 'Terhubung dengan keseharian dan keseruan aktivitas kampus.', heroBgImage: '/images/hero-g.jpg', introText: '' },
    contact: { id: 'contact', heroTitle: 'Hubungi Kami', heroSubtitle: 'Kami siap melayani dan menjawab pertanyaan Anda.', heroBgImage: '/images/hero-g.jpg', introText: '' },
    terms: {
      id: 'terms',
      heroTitle: 'Syarat dan Ketentuan Penggunaan Situs Web Sekolah',
      heroSubtitle: 'Ketentuan penggunaan situs web resmi Pelita Cemerlang School.',
      heroBgImage: '/images/hero-g.jpg',
      introText: 'Dengan mengakses dan menggunakan situs web ini, Anda menyetujui untuk terikat oleh Syarat dan Ketentuan berikut. Jika Anda tidak setuju dengan ketentuan ini, mohon untuk tidak menggunakan situs ini.',
      legalContent: `Hak Kekayaan Intelektual
Seluruh konten yang terdapat di situs ini, termasuk, gambar, logo, dan materi lainnya, adalah milik sekolah dan dilindungi oleh undang-undang hak cipta. Penggunaan konten tanpa izin tertulis dari pihak sekolah dilarang.

Penggunaan yang Diperbolehkan
Anda diperbolehkan untuk mengakses dan menggunakan situs ini untuk tujuan informasi dan pendidikan. dan Dilarang keras menggunakan situs ini untuk, Mengunggah atau menyebarkan konten yang melanggar hukum atau tidak pantas, Mengakses data atau area yang tidak diperuntukkan bagi publik, Mengganggu atau merusak fungsi situs web.

Penggunaan yang Tidak Diperbolehkan
Sekolah tidak bertanggung jawab atas kerugian atau kerusakan yang timbul dari penggunaan atau ketidakmampuan untuk menggunakan situs ini.

Tautan ke Situs Pihak Ketiga
Situs ini mungkin berisi tautan ke situs web pihak ketiga. Sekolah tidak bertanggung jawab atas konten atau kebijakan privasi situs-situs tersebut.

Perubahan Syarat dan Ketentuan
Sekolah berhak untuk mengubah Syarat dan Ketentuan ini kapan saja tanpa pemberitahuan sebelumnya. Perubahan akan berlaku segera setelah diposting di situs ini.

Hukum Yang Berlaku
Syarat dan Ketentuan ini diatur oleh dan ditafsirkan sesuai dengan hukum yang berlaku di Indonesia.`,
    },
  },
  news: [
    {
      id: 'featured-science-2025',
      title: 'Siswa Pelita Cemerlang Raih Medali Emas di Olimpiade Sains Internasional 2025',
      excerpt: 'Prestasi membanggakan kembali ditorehkan oleh kontingen Pelita Cemerlang School di kancah internasional. Kali ini, tim sains sekolah berhasil menyisihkan ratusan peserta dari 40 negara di Asia Pasifik.',
      category: 'Prestasi',
      date: '15 Mei 2025',
      author: 'Tim Editorial',
      image: 'https://picsum.photos/1200/800?random=401',
      featured: true,
    },
    {
      id: 'digital-curriculum-sma',
      title: 'Inovasi Kurikulum Digital Terapan untuk Siswa SMA',
      excerpt: 'Menyikapi perkembangan teknologi masa kini, sekolah secara resmi meluncurkan program literasi digital baru yang terintegrasi langsung dengan kurikulum komprehensif...',
      category: 'Akademik',
      date: '10 Mei 2025',
      author: 'Dr. Hendra',
      image: 'https://picsum.photos/800/600?random=402',
      featured: false,
    },
    {
      id: 'annual-art-exhibition',
      title: 'Pameran Seni Tahunan Berlangsung Sangat Meriah',
      excerpt: 'Karya-karya menakjubkan hasil kreativitas siswa-siswi dipamerkan di aula utama kampus dengan mengangkat tema Keberagaman Nusantara dan Ekologi Hijau...',
      category: 'Acara',
      date: '05 Mei 2025',
      author: 'Sarah Wijaya',
      image: 'https://picsum.photos/800/600?random=403',
      featured: false,
    },
    {
      id: 'tokyo-student-exchange',
      title: 'Program Pertukaran Pelajar Pelita Cemerlang ke Tokyo',
      excerpt: 'Lima belas siswa berprestasi terpilih akan mengikuti program cultural exchange selama sebulan penuh di Tokyo untuk memperdalam wawasan lintas budaya...',
      category: 'Global',
      date: '28 Apr 2025',
      author: 'Tim Editorial',
      image: 'https://picsum.photos/800/600?random=404',
      featured: false,
    },
    {
      id: 'exam-preparation-guide',
      title: 'Tips Menghadapi Ujian Akhir Secara Efektif & Tenang',
      excerpt: 'Panduan praktis dan komprehensif dari konselor sekolah mengenai manajemen stres serta pembagian waktu belajar yang optimal bagi seluruh siswa akhir...',
      category: 'Edukasi',
      date: '20 Apr 2025',
      author: 'Budi Santoso',
      image: 'https://picsum.photos/800/600?random=405',
      featured: false,
    },
  ],
  gallery: [
    { id: 'chemistry-research', src: 'https://picsum.photos/800/1000?random=301', category: 'Academics', title: 'Riset Laboratorium Kimia Modern', aspect: 'aspect-[3/4]' },
    { id: 'culture-festival', src: 'https://picsum.photos/1000/600?random=302', category: 'Events', title: 'Pertunjukan Teater Festival Budaya', aspect: 'aspect-[16/9]' },
    { id: 'basket-championship', src: 'https://picsum.photos/800/800?random=303', category: 'Sports', title: 'Kejuaraan Basket Antar Sekolah', aspect: 'aspect-square' },
    { id: 'library-corner', src: 'https://picsum.photos/800/1200?random=304', category: 'Campus', title: 'Sudut Baca Perpustakaan Pusat', aspect: 'aspect-[2/3]' },
    { id: 'robotics-workshop', src: 'https://picsum.photos/1200/800?random=305', category: 'Academics', title: 'Workshop Pembuatan Robotik & IoT', aspect: 'aspect-[3/2]' },
    { id: 'graduation-day', src: 'https://picsum.photos/800/800?random=306', category: 'Events', title: 'Keseruan Upacara Kelulusan Angkatan XXI', aspect: 'aspect-square' },
    { id: 'multimedia-building', src: 'https://picsum.photos/1000/1400?random=307', category: 'Campus', title: 'Gedung Multimedia Arsitektur Modern', aspect: 'aspect-[5/7]' },
    { id: 'swimming-practice', src: 'https://picsum.photos/1200/600?random=308', category: 'Sports', title: 'Latihan Renang Rutin Ekstrakurikuler', aspect: 'aspect-[2/1]' },
    { id: 'student-art-showcase', src: 'https://picsum.photos/800/1000?random=309', category: 'Academics', title: 'Pameran Karya Seni Rupa Siswa', aspect: 'aspect-[4/5]' },
  ],
  academicPages: {
    preschool: {
      id: 'preschool',
      name: 'Preschool',
      title: 'Membangun Fondasi Karakter & Kreativitas',
      desc: 'Fokus pada pengembangan motorik, sosial, emosional, dan kognitif anak melalui pendekatan bermain yang terstruktur dalam lingkungan yang aman.',
      age: '3 - 6 Tahun',
      principalName: 'Ms. Maria Christina, M.Pd.',
      principalRole: 'Principal of Preschool',
      principalImage: 'https://picsum.photos/1200/1600?random=11',
      principalMessage: 'Selamat datang di jenjang Preschool. Kami percaya setiap anak adalah unik dan memiliki potensi luar biasa. Di sini, kami menciptakan lingkungan belajar yang hangat, menyenangkan, dan menstimulasi rasa ingin tahu mereka untuk mulai menjelajahi dunia.',
      bgImage: '/images/hero-g.jpg',
      bgImages: ['/images/hero-g.jpg'],
      highlightImage: '/images/hero-g.jpg',
      focusDesc: 'Di jenjang Preschool, kami menyesuaikan pendekatan pedagogi dengan tahap perkembangan psikologis dan kognitif siswa untuk memberikan hasil pembelajaran yang paling optimal.',
      philosophySections: [
        {
          title: 'Sekolah sebagai Rumah Bertumbuh',
          desc: 'Program pendidikan dirancang sebagai ekosistem yang aman, hangat, dan terarah agar setiap anak merasa dikenal, didampingi, dan percaya diri untuk bertumbuh.',
          image: '/images/hero-g.jpg',
        },
        {
          title: 'Guru sebagai Pendamping Belajar',
          desc: 'Guru hadir bukan hanya sebagai penyampai materi, tetapi sebagai fasilitator yang membaca kebutuhan siswa, membangun rasa ingin tahu, dan menuntun karakter melalui keseharian belajar.',
          image: '/images/hero-g.jpg',
        },
        {
          title: 'Tenaga Pengajar yang Saling Terhubung',
          desc: 'Setiap tenaga pengajar bekerja bersama dalam komunikasi yang konsisten sehingga perkembangan akademik, sosial, dan emosional siswa dipantau secara utuh.',
          image: '/images/hero-g.jpg',
        },
      ],
      highlights: [
        { icon: 'Heart', text: 'Sensory & Motor Play' },
        { icon: 'Target', text: 'Character Building' },
        { icon: 'BookOpen', text: 'Basic Literacy' },
        { icon: 'Lightbulb', text: 'Creative Arts' }
      ]
    },
    primary: {
      id: 'primary',
      name: 'Primary School',
      title: 'Eksplorasi Pengetahuan & Kemandirian',
      desc: 'Mengembangkan literasi dasar, numerasi, dan pemahaman dunia melalui kurikulum yang adaptif dan menantang untuk merangsang potensi maksimal siswa.',
      age: '6 - 12 Tahun',
      principalName: 'Mr. David Santoso, S.Pd.',
      principalRole: 'Principal of Primary School',
      principalImage: 'https://picsum.photos/1200/1600?random=12',
      principalMessage: 'Di jenjang Primary, kami berdedikasi untuk membekali siswa dengan fondasi akademik yang kuat serta menumbuhkan jiwa kepemimpinan sejak dini. Kami mendorong kemandirian dan rasa tanggung jawab dalam setiap langkah pembelajaran mereka.',
      bgImage: '/images/hero-g.jpg',
      bgImages: ['/images/hero-g.jpg'],
      highlightImage: '/images/hero-g.jpg',
      focusDesc: 'Di jenjang Primary School, kami menyesuaikan pendekatan pedagogi dengan tahap perkembangan psikologis dan kognitif siswa untuk memberikan hasil pembelajaran yang paling optimal.',
      philosophySections: [
        {
          title: 'Sekolah sebagai Rumah Bertumbuh',
          desc: 'Program pendidikan dirancang sebagai ekosistem yang aman, hangat, dan terarah agar setiap anak merasa dikenal, didampingi, dan percaya diri untuk bertumbuh.',
          image: '/images/hero-g.jpg',
        },
        {
          title: 'Guru sebagai Pendamping Belajar',
          desc: 'Guru hadir bukan hanya sebagai penyampai materi, tetapi sebagai fasilitator yang membaca kebutuhan siswa, membangun rasa ingin tahu, dan menuntun karakter melalui keseharian belajar.',
          image: '/images/hero-g.jpg',
        },
        {
          title: 'Tenaga Pengajar yang Saling Terhubung',
          desc: 'Setiap tenaga pengajar bekerja bersama dalam komunikasi yang konsisten sehingga perkembangan akademik, sosial, dan emosional siswa dipantau secara utuh.',
          image: '/images/hero-g.jpg',
        },
      ],
      highlights: [
        { icon: 'Globe', text: 'Bilingual Program' },
        { icon: 'Brain', text: 'STEM Integration' },
        { icon: 'Users', text: 'Leadership Skills' },
        { icon: 'Target', text: 'Physical Education' }
      ]
    },
    secondary: {
      id: 'secondary',
      name: 'Secondary School',
      title: 'Persiapan Masa Depan Global',
      desc: 'Membentuk pemikir kritis, inovator, dan pemimpin masa depan melalui program akademik komprehensif dan panduan karir.',
      age: '12 - 18 Tahun',
      principalName: 'Dr. Sarah Wijaya, M.Ed.',
      principalRole: 'Principal of Secondary School',
      principalImage: 'https://picsum.photos/1200/1600?random=13',
      principalMessage: 'Masa Secondary adalah fase transisi krusial menuju kedewasaan. Kurikulum kami dirancang untuk menantang pemikiran kritis, memupuk inovasi, dan secara strategis mempersiapkan siswa untuk sukses di perguruan tinggi dan panggung karir global.',
      bgImage: '/images/hero-g.jpg',
      bgImages: ['/images/hero-g.jpg'],
      highlightImage: '/images/hero-g.jpg',
      focusDesc: 'Di jenjang Secondary School, kami menyesuaikan pendekatan pedagogi dengan tahap perkembangan psikologis dan kognitif siswa untuk memberikan hasil pembelajaran yang paling optimal.',
      philosophySections: [
        {
          title: 'Sekolah sebagai Rumah Bertumbuh',
          desc: 'Program pendidikan dirancang sebagai ekosistem yang aman, hangat, dan terarah agar setiap anak merasa dikenal, didampingi, dan percaya diri untuk bertumbuh.',
          image: '/images/hero-g.jpg',
        },
        {
          title: 'Guru sebagai Pendamping Belajar',
          desc: 'Guru hadir bukan hanya sebagai penyampai materi, tetapi sebagai fasilitator yang membaca kebutuhan siswa, membangun rasa ingin tahu, dan menuntun karakter melalui keseharian belajar.',
          image: '/images/hero-g.jpg',
        },
        {
          title: 'Tenaga Pengajar yang Saling Terhubung',
          desc: 'Setiap tenaga pengajar bekerja bersama dalam komunikasi yang konsisten sehingga perkembangan akademik, sosial, dan emosional siswa dipantau secara utuh.',
          image: '/images/hero-g.jpg',
        },
      ],
      highlights: [
        { icon: 'Lightbulb', text: 'Advanced Mentorship' },
        { icon: 'Target', text: 'Career Counseling' },
        { icon: 'Globe', text: 'Global Perspective' },
        { icon: 'Heart', text: 'Community Service' }
      ],
      secondaryPrograms: [
        {
          id: 'junior-high-school',
          title: 'Junior High School',
          desc: 'Membangun fondasi akademik menengah, kemandirian belajar, karakter, dan kemampuan berpikir kritis melalui pembelajaran aktif yang terarah.',
          points: ['Transisi belajar yang suportif', 'Penguatan literasi, numerasi, dan sains', 'Pembentukan karakter dan kolaborasi'],
          icon: 'BookOpen',
        },
        {
          id: 'senior-high-school',
          title: 'Senior High School',
          desc: 'Mempersiapkan siswa menuju perguruan tinggi dan masa depan global melalui pendampingan akademik, pengembangan portofolio, dan eksplorasi karier.',
          points: ['Persiapan universitas', 'Career guidance dan mentoring', 'Penguatan leadership dan global readiness'],
          icon: 'GraduationCap',
        },
      ]
    },
  },
  academicExtracurriculars: {
    preschool: [
      { id: 'preschool-dancing', name: 'Dancing', desc: 'Membangun kelenturan dan kepercayaan diri melalui gerak tari ceria.', image: 'https://picsum.photos/1200/800?random=101' },
      { id: 'preschool-lukis', name: 'Lukis', desc: 'Mengekspresikan imajinasi dan melatih kreativitas dengan kanvas warna.', image: 'https://picsum.photos/1200/800?random=102' },
      { id: 'preschool-renang', name: 'Renang', desc: 'Pengenalan air dan pelatihan motorik dasar untuk keselamatan.', image: 'https://picsum.photos/1200/800?random=103' },
      { id: 'preschool-futsal', name: 'Futsal', desc: 'Aktivitas bermain bola untuk melatih koordinasi dan kekompakan tim.', image: 'https://picsum.photos/1200/800?random=104' },
      { id: 'preschool-dancing-modern', name: 'Dancing Modern', desc: 'Tarian modern yang merangsang kepekaan ritmik dan motorik kasar anak.', image: 'https://picsum.photos/1200/800?random=105' },
    ],
    primary: [
      { id: 'primary-futsal', name: 'Futsal', desc: 'Pengembangan teknik dasar sepak bola dan strategi kerja sama tim.', image: 'https://picsum.photos/1200/800?random=106' },
      { id: 'primary-dancing', name: 'Dancing', desc: 'Melatih keluwesan, kebugaran fisik, dan ekspresi melalui tarian.', image: 'https://picsum.photos/1200/800?random=107' },
      { id: 'primary-basket', name: 'Basket', desc: 'Pelatihan dasar melempar, menangkap, dan kompetisi sehat bola basket.', image: 'https://picsum.photos/1200/800?random=108' },
      { id: 'primary-wusho', name: 'Wusho', desc: 'Pelatihan seni bela diri untuk menanamkan kedisiplinan dan fokus.', image: 'https://picsum.photos/1200/800?random=109' },
      { id: 'primary-renang', name: 'Renang', desc: 'Pelatihan teknik renang gaya utama untuk kebugaran tubuh secara holistik.', image: 'https://picsum.photos/1200/800?random=110' },
      { id: 'primary-batminton', name: 'Batminton', desc: 'Keterampilan dasar pukulan, refleks, dan kegesitan dalam bulu tangkis.', image: 'https://picsum.photos/1200/800?random=111' },
    ],
    secondary: [
      { id: 'secondary-cookery', name: 'Cookery', desc: 'Pengembangan keterampilan tata boga, kreativitas menu, dan pemahaman nutrisi.', image: 'https://picsum.photos/1200/800?random=112' },
      { id: 'secondary-basket', name: 'Basket', desc: 'Pembinaan bola basket kompetitif yang mengasah taktik dan stamina.', image: 'https://picsum.photos/1200/800?random=113' },
      { id: 'secondary-futsal', name: 'Futsal', desc: 'Latihan teknik lanjutan, kepemimpinan tim, dan persiapan kompetisi.', image: 'https://picsum.photos/1200/800?random=114' },
      { id: 'secondary-computer', name: 'Computer', desc: 'Pengembangan literasi digital, desain, pemrograman dasar, dan multimedia.', image: 'https://picsum.photos/1200/800?random=115' },
    ],
  },
  achievements: [
    {
      id: 'science-olympiad-international',
      title: 'Juara 1 Olympiade Sains Internasional',
      year: 2025,
      category: 'akademik',
      student: 'Andi Pratama',
      class: 'Kelas 12 IPA',
      level: 'international',
      medal: 'gold',
      desc: 'Gold Medal di International Science Olympiad, Singapore',
      image: 'https://picsum.photos/800/600?random=111',
      featured: true,
      featuredLabel: 'Tingkat Internasional',
      featuredTeam: 'Tim Sains Pelita Cemerlang',
      featuredMentor: 'Bimbingan: Dr. Albert W.',
      studentImage: 'https://picsum.photos/100/100?random=81',
    },
    {
      id: 'english-debate-national',
      title: 'Juara Debat Bahasa Inggris Nasional',
      year: 2025,
      category: 'bahasa',
      student: 'Sarah Wijaya',
      class: 'Kelas 10',
      level: 'national',
      medal: 'gold',
      desc: 'Best Speaker & Champion di National English Debate Championship',
      image: 'https://picsum.photos/800/600?random=112',
      featured: false,
      featuredLabel: '',
      featuredTeam: '',
      featuredMentor: '',
      studentImage: '',
    },
    {
      id: 'robotics-innovation',
      title: 'Best Robot Competition',
      year: 2024,
      category: 'teknologi',
      student: 'Tim Robotika',
      class: 'SMP-SMA',
      level: 'national',
      medal: 'gold',
      desc: 'Juara 1 Indonesian Robotics Competition (IRC)',
      image: 'https://picsum.photos/800/600?random=113',
      featured: true,
      featuredLabel: 'Tingkat Nasional',
      featuredTeam: 'Tim Robotika Pelita Cemerlang',
      featuredMentor: 'Bimbingan: Ir. Nadia Putri',
      studentImage: 'https://picsum.photos/100/100?random=82',
    },
    {
      id: 'osn-champion',
      title: 'Juara Umum OSN',
      year: 2024,
      category: 'akademik',
      student: 'Tim OSN',
      class: 'SMP-SMA',
      level: 'national',
      medal: 'gold',
      desc: 'Juara Umum Olympiade Sains Nasional tingkat Provinsi',
      image: 'https://picsum.photos/800/600?random=114',
      featured: false,
      featuredLabel: '',
      featuredTeam: '',
      featuredMentor: '',
      studentImage: '',
    },
    {
      id: 'math-jabodetabek',
      title: 'Juara 1 Lomba Matematika',
      year: 2025,
      category: 'akademik',
      student: 'Budi Santoso',
      class: 'Kelas 8',
      level: 'provincial',
      medal: 'gold',
      desc: 'Juara 1 Math Competition se-Jabodetabek',
      image: 'https://picsum.photos/800/600?random=115',
      featured: false,
      featuredLabel: '',
      featuredTeam: '',
      featuredMentor: '',
      studentImage: '',
    },
    {
      id: 'english-speech',
      title: 'Juara 2 English Speech',
      year: 2025,
      category: 'bahasa',
      student: 'Maya Lestari',
      class: 'Kelas 11',
      level: 'national',
      medal: 'silver',
      desc: 'Second Runner Up National English Speech Contest',
      image: 'https://picsum.photos/800/600?random=116',
      featured: false,
      featuredLabel: '',
      featuredTeam: '',
      featuredMentor: '',
      studentImage: '',
    },
    {
      id: 'animation-award',
      title: 'Best Animation Award',
      year: 2024,
      category: 'teknologi',
      student: 'Kylie Chen',
      class: 'Kelas 9',
      level: 'international',
      medal: 'gold',
      desc: 'Winner di International Digital Art Competition',
      image: 'https://picsum.photos/800/600?random=117',
      featured: false,
      featuredLabel: '',
      featuredTeam: '',
      featuredMentor: '',
      studentImage: '',
    },
    {
      id: 'futsal-champion',
      title: 'Juara Futsal Antar Sekolah',
      year: 2025,
      category: 'olahraga',
      student: 'Tim Futsal',
      class: 'SMP',
      level: 'regional',
      medal: 'gold',
      desc: 'Champion Jakarta Youth Futsal Championship',
      image: 'https://picsum.photos/800/600?random=118',
      featured: false,
      featuredLabel: '',
      featuredTeam: '',
      featuredMentor: '',
      studentImage: '',
    },
    {
      id: 'ballet-national',
      title: 'Juara 1 Ballet Competition',
      year: 2024,
      category: 'seni',
      student: 'Anya Putri',
      class: 'Kelas 6',
      level: 'national',
      medal: 'gold',
      desc: 'First Place National Ballet Competition',
      image: 'https://picsum.photos/800/600?random=119',
      featured: true,
      featuredLabel: 'Tingkat Provinsi',
      featuredTeam: 'Delegasi Seni Pelita Cemerlang',
      featuredMentor: 'Bimbingan: Ms. Clara S.',
      studentImage: 'https://picsum.photos/100/100?random=83',
    },
  ],
  facilities: [
    { id: 'computer-lab', title: 'Laboratorium Komputer', zone: 'Riset Digital', image: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1600&q=80', description: 'Dilengkapi 40+ workstation mutakhir dengan akses internet berkecepatan tinggi dan perangkat lunak terbaru untuk pembelajaran coding, desain, dan riset digital.' },
    { id: 'science-lab', title: 'Laboratorium Sains', zone: 'Eksperimen', image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1600&q=80', description: 'Laboratorium sains modern dengan peralatan canggih untuk eksperimen fisika, kimia, dan biologi yang mendukung kurikulum internasional.' },
    { id: 'modern-library', title: 'Perpustakaan Modern', zone: 'Literasi', image: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1600&q=80', description: 'Perpustakaan seluas 500m² dengan koleksi 10.000+ buku, area baca yang nyaman, dan zona digital untuk akses e-book dan jurnal internasional.' },
    { id: 'swimming-pool', title: 'Kolam Renang Semi-Olympic', zone: 'Olahraga Air', image: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=1600&q=80', description: 'Kolam renang semi-olympic dengan standar internasional, dilengkapi tribun penonton dan sistem filtrasi modern.' },
    { id: 'football-field', title: 'Lapangan Sepak Bola Hijau', zone: 'Atletik', image: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1600&q=80', description: 'Lapangan rumput sintetis berstandar FIFA dengan pencahayaan profesional dan lintasan lari mengelilingi lapangan.' },
    { id: 'indoor-sports-hall', title: 'Gedung Olahraga Indoor', zone: 'Turnamen', image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=1600&q=80', description: 'Gedung serbaguna ber-AC untuk bulu tangkis, basket, futsal, dan kegiatan olahraga indoor lainnya dengan kapasitas 500 penonton.' },
    { id: 'visual-art-studio', title: 'Studio Seni Visual', zone: 'Kreativitas', image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=1600&q=80', description: 'Studio seni yang luas dengan pencahayaan alami, peralatan melukis, keramik, dan ruang pameran karya siswa.' },
    { id: 'music-studio', title: 'Studio Musik & Rekaman', zone: 'Musik', image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1600&q=80', description: 'Studio musik profesional dengan akustik berkualitas, ruang rekaman, dan berbagai alat musik dari klasik hingga modern.' },
  ],
  careerOpenings: [
    { id: 'primary-bilingual-teacher', title: 'Guru Primary Bilingual', team: 'Academic', type: 'Full Time' },
    { id: 'secondary-science-teacher', title: 'Guru Sains Secondary', team: 'Academic', type: 'Full Time' },
    { id: 'student-counselor', title: 'Student Counselor', team: 'Student Support', type: 'Full Time' },
    { id: 'admission-officer', title: 'Marketing & Admission Officer', team: 'School Office', type: 'Full Time' },
  ],
  socialPosts: [
    {
      id: 'market-day-primary',
      sourceUrl: 'https://www.instagram.com/',
      platform: 'Instagram',
      type: 'Carousel',
      title: 'Market Day karya siswa Primary',
      excerpt: 'Dokumentasi kegiatan entrepreneurship dengan booth kreatif, presentasi produk, dan pembelajaran literasi finansial.',
      date: '20 Mei 2026',
      image: 'https://picsum.photos/900/1100?random=701',
      video: 'https://videos.pexels.com/video-files/8616750/8616750-hd_1080_1920_25fps.mp4',
      objectPosition: 'center',
      metric: '2.4K likes',
      comments: '186 komentar',
    },
    {
      id: 'campus-tour',
      sourceUrl: 'https://www.youtube.com/',
      platform: 'YouTube',
      type: 'Video',
      title: 'Campus tour Pelita Cemerlang',
      excerpt: 'Jelajahi ruang kelas interaktif, laboratorium, perpustakaan, dan fasilitas olahraga dalam video tur sekolah terbaru.',
      date: '18 Mei 2026',
      image: 'https://picsum.photos/1200/675?random=702',
      video: 'https://videos.pexels.com/video-files/5734828/5734828-hd_1920_1080_30fps.mp4',
      objectPosition: 'center',
      metric: '18K views',
      comments: '420 komentar',
    },
    {
      id: 'art-practice-bts',
      sourceUrl: 'https://www.tiktok.com/',
      platform: 'TikTok',
      type: 'Shorts',
      title: 'Behind the scene latihan seni',
      excerpt: 'Potongan singkat latihan musik dan tari sebelum pentas budaya tahunan bersama guru pembimbing.',
      date: '16 Mei 2026',
      image: 'https://picsum.photos/800/1200?random=703',
      video: 'https://videos.pexels.com/video-files/8616750/8616750-hd_1080_1920_25fps.mp4',
      objectPosition: 'center',
      metric: '35K views',
      comments: '690 komentar',
    },
    {
      id: 'chemistry-reels',
      sourceUrl: 'https://www.instagram.com/',
      platform: 'Instagram',
      type: 'Reels',
      title: 'Eksperimen sains di lab kimia',
      excerpt: 'Siswa Secondary mempraktikkan reaksi aman dengan metode observasi, pencatatan, dan diskusi kelompok.',
      date: '14 Mei 2026',
      image: 'https://picsum.photos/900/1100?random=704',
      video: 'https://videos.pexels.com/video-files/6672356/6672356-uhd_3840_2160_24fps.mp4',
      objectPosition: 'center',
      metric: '3.1K likes',
      comments: '214 komentar',
    },
    {
      id: 'graduation-highlight',
      sourceUrl: 'https://www.youtube.com/',
      platform: 'YouTube',
      type: 'Live Recap',
      title: 'Graduation ceremony highlight',
      excerpt: 'Momen wisuda, pesan kepala sekolah, dan perayaan hangat bersama keluarga besar Pelita Cemerlang.',
      date: '10 Mei 2026',
      image: 'https://picsum.photos/1200/675?random=705',
      video: 'https://videos.pexels.com/video-files/6672356/6672356-uhd_3840_2160_24fps.mp4',
      objectPosition: 'center',
      metric: '24K views',
      comments: '510 komentar',
    },
    {
      id: 'english-week-game',
      sourceUrl: 'https://www.tiktok.com/',
      platform: 'TikTok',
      type: 'Challenge',
      title: 'English week pronunciation game',
      excerpt: 'Keseruan siswa melatih public speaking lewat permainan cepat, ekspresif, dan penuh percaya diri.',
      date: '08 Mei 2026',
      image: 'https://picsum.photos/800/1200?random=706',
      video: 'https://videos.pexels.com/video-files/8616750/8616750-hd_1080_1920_25fps.mp4',
      objectPosition: 'center',
      metric: '42K views',
      comments: '830 komentar',
    },
  ],
  testimonials: [
    {
      id: 'parent-budi',
      text: 'Kurikulum yang diterapkan sangat membantu anak saya berkembang secara akademis dan karakter. Pendekatannya benar-benar holistik dan komprehensif.',
      author: 'Budi Santoso',
      role: 'Orang Tua Siswa',
      photo: 'https://picsum.photos/240/240?random=901',
    },
    {
      id: 'parent-maria',
      text: 'Fasilitas berstandar internasional yang disediakan sangat mendukung proses eksplorasi siswa. Lingkungan yang kondusif untuk mencetak pemimpin masa depan.',
      author: 'Maria Angelina',
      role: 'Orang Tua Siswa',
      photo: 'https://picsum.photos/240/240?random=902',
    },
    {
      id: 'alumni-sarah',
      text: 'Sekolah ini tidak hanya mengajarkan ilmu, tetapi juga menanamkan nilai moral yang kuat. Para pendidik sangat berdedikasi tinggi.',
      author: 'Sarah Wijaya',
      role: 'Alumni',
      photo: 'https://picsum.photos/240/240?random=903',
    },
    {
      id: 'parent-linda',
      text: 'Metode pembelajaran interaktif membuat anak saya selalu semangat pergi ke sekolah setiap hari. Perkembangan sosialnya pun sangat pesat.',
      author: 'Linda Kusuma',
      role: 'Orang Tua Siswa',
      photo: 'https://picsum.photos/240/240?random=904',
    },
    {
      id: 'alumni-reza',
      text: 'Masa SMA saya di Pelita Cemerlang adalah pondasi terbaik. Saya dibekali kemampuan berpikir kritis yang sangat berguna di dunia perkuliahan.',
      author: 'Reza Pratama',
      role: 'Alumni',
      photo: 'https://picsum.photos/240/240?random=905',
    },
  ],
  alumniDestinations: [
    { id: 'alumni-ui', name: 'Universitas Indonesia', image: '' },
    { id: 'alumni-itb', name: 'Institut Teknologi Bandung', image: '' },
    { id: 'alumni-ugm', name: 'Universitas Gadjah Mada', image: '' },
    { id: 'alumni-nus', name: 'National Univ. of Singapore', image: '' },
    { id: 'alumni-ntu', name: 'Nanyang Tech. University', image: '' },
    { id: 'alumni-melbourne', name: 'University of Melbourne', image: '' },
    { id: 'alumni-monash', name: 'Monash University', image: '' },
    { id: 'alumni-oxford', name: 'University of Oxford', image: '' },
  ],
  contactInfo: {
    address: 'Jl.Perdana No.8',
    phone: '+62 (021) 1234-5678',
    email: 'hello@pelitacemerlang.sch.id',
    hours: 'Senin - Jumat: 07:00 - 16:00 WIB',
    facebookUrl: '#',
    instagramUrl: '#',
    linkedinUrl: '#',
    youtubeUrl: '#',
    mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.8164836203273!2d109.3421480740391!3d-0.05497723551785519!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e1d5997093c64bb%3A0x1ddc1b259a7d381d!2sPelita%20Cemerlang%20School!5e0!3m2!1sen!2sid!4v1779435467815!5m2!1sen!2sid',
  },
  footer: {
    description: 'Mendidik generasi muda dengan wawasan global, integritas tinggi, dan semangat inovasi berkelanjutan.'
  },
  globalConfig: {
    headerLogo: '/images/logo.png',
    footerLogo: '',
    activeMenus: {
      'nav.home': true,
      'nav.about': true,
      'nav.academic': true,
      'nav.facilities': true,
      'nav.achievements': true,
      'nav.mediacenter': true,
      'nav.information': true,
    }
  },
  updatedAt: '2026-05-22T00:00:00.000Z',
}

export function getDefaultSiteContent(lang: SupportedLanguage = 'id'): SiteContent {
  const content = structuredClone(defaultSiteContent)

  if (lang === 'id') {
    return content
  }

  content.pages.home.heroTitle = 'Pelita Cemerlang School'
  content.pages.home.heroSubtitle = 'Be Bright and IMPACTFUL for Others'
  content.pages.home.coreValues = {
    title: 'Our Core Values',
    subtitle: 'Building excellent character that creates meaningful impact for others.',
    items: [
      { letter: 'I', word: 'ntegrity', desc: 'Honesty and strong ethics in every action.' },
      { letter: 'M', word: 'indful', desc: 'Awareness and wisdom in making decisions.' },
      { letter: 'P', word: 'rogressive', desc: 'Forward-thinking and always open to growth.' },
      { letter: 'A', word: 'gility', desc: 'The ability to adapt confidently to change.' },
      { letter: 'C', word: 'ompassion', desc: 'Empathy and sincere care for others.' },
      { letter: 'T', word: 'enacity', desc: 'Perseverance and the courage to keep improving.' },
      { letter: 'F', word: 'idelity', desc: 'Loyalty to principles, truth, and responsibility.' },
      { letter: 'U', word: 'plifting', desc: 'Supporting and encouraging one another.' },
      { letter: 'L', word: 'ifelong Learner', desc: 'A lasting desire to keep learning.' },
    ],
  }
  content.pages.home.curriculum = {
    label: 'Global Education Standards',
    title: 'International-Standard Curriculum',
    desc: 'Pelita Cemerlang School adopts an international-standard curriculum enriched with strong national values.',
    images: content.pages.home.curriculum?.images || [],
    cards: [
      { title: 'Global Perspective', desc: 'Learning experiences that prepare students to think critically and engage with the world.' },
      { title: 'Merdeka Curriculum', desc: 'A national curriculum approach that supports student potential and character development.' },
    ],
  }
  content.pages.home.cta = {
    title: 'Start Your Journey With Us.',
    desc: 'Join a dedicated learning community. Admission for the new academic year is now open.',
    buttonText: 'Online Registration',
    buttonLink: '/admission',
  }

  content.pages.about.heroTitle = 'Dedicated to Education'
  content.pages.about.heroSubtitle = 'Shaping an excellent generation with global insight, integrity, and a continuous spirit of innovation.'
  content.pages.about.sambutan = {
    image: content.pages.about.sambutan?.image || '/images/hero-g.jpg',
    quote: 'A Place Where Every Child Grows and Shines',
    descParagraphs: [
      'At Pelita Cemerlang School, learning is a journey of discovery, character formation, and meaningful impact.',
      'In a caring and inspiring environment, students are encouraged to think independently, solve problems creatively, and pursue excellence.',
      'Beyond academics, students explore their interests through sports, arts, technology, leadership, and community engagement.',
    ],
    name: 'Be Bright',
    role: 'And IMPACTFUL for Others',
  }
  content.pages.about.visionMission = {
    visionLabel: 'Our Vision',
    visionTitle: 'Vision',
    visionDesc: 'To become a leading educational institution that prepares students for a rapidly changing world.',
    missionLabel: 'Our Mission',
    missionTitle: 'Mission',
    missionItems: [
      'Develop a balanced curriculum',
      'Equip students with applicable knowledge',
      'Strengthen critical thinking skills',
      'Build responsibility and effective communication',
      'Instill character based on tolerance and mutual respect',
    ],
  }
  content.pages.about.timelineSection = {
    label: 'Our Journey',
    title: 'A Brief History',
    desc: "Tracing Pelita Cemerlang's dedication to advancing education.",
    items: [
      { year: '2006', title: 'The Beginning', desc: 'Pelita Cemerlang School was established in Pontianak.' },
      { year: '2013', title: 'School Relocation', desc: 'The school relocated to Jalan Perdana with more complete facilities.' },
      { year: '2018', title: 'Senior High School Opening', desc: 'The Senior High School level opened in the 2018 academic year.' },
    ],
  }

  content.pages.admission.heroTitle = 'New Student Admission'
  content.pages.admission.heroSubtitle = 'Join our learning community and become part of a bright future.'
  content.pages.career.heroTitle = 'Careers'
  content.pages.career.heroSubtitle = 'Join our dedicated team of educators.'
  content.pages.career.openingsSection = {
    label: 'Join Us',
    title: 'Open Positions',
    desc: 'Find a position that matches your skills and interests.',
  }
  content.pages.facilities.heroTitle = 'Facilities'
  content.pages.facilities.heroSubtitle = 'A learning environment that supports limitless exploration.'
  content.pages.gallery.heroTitle = 'School Gallery'
  content.pages.gallery.heroSubtitle = 'Capturing student journeys and meaningful school moments.'
  content.pages.news.heroTitle = 'Latest News'
  content.pages.news.heroSubtitle = 'Recent updates and activities from Pelita Cemerlang.'
  content.pages.achievements.heroTitle = 'Student Achievements'
  content.pages.achievements.heroSubtitle = 'A collection of recognition and awards earned by our students.'
  content.pages.social.heroTitle = 'Our Social Media'
  content.pages.social.heroSubtitle = 'Stay connected with daily activities and campus excitement.'
  content.pages.contact.heroTitle = 'Contact Us'
  content.pages.contact.heroSubtitle = 'We are ready to help and answer your questions.'
  content.pages.terms.heroTitle = 'Terms and Conditions'
  content.pages.terms.heroSubtitle = 'Terms for using Pelita Cemerlang School website services and information.'
  content.pages.terms.introText = 'Please read these terms carefully before using the information and services on this website.'
  content.pages.terms.legalContent = `Website Use
By accessing the Pelita Cemerlang School website, users are considered to have read, understood, and agreed to these terms and conditions. The information on this website is provided for general purposes, school communication, and information services for prospective students, parents, students, alumni, and the public.

Information Accuracy
We strive to keep all displayed information accurate and up to date. However, schedules, fees, programs, activities, or other information may change at any time according to school policy. Official administrative information remains subject to announcements or documents issued by the school.

Content Use
All text, photos, videos, logos, designs, and other materials on this website belong to Pelita Cemerlang School or are used with appropriate permission. Users may not copy, republish, modify, or use the content for commercial purposes without written approval from the school.

Forms and User Data
Data submitted through website forms must be accurate and provided responsibly. Pelita Cemerlang School may use the data to follow up on inquiries, admissions, communication, or school-related services as needed for operations.

External Links
This website may include links to third-party platforms, including social media, maps, or communication services. Pelita Cemerlang School is not responsible for the content, policies, or privacy practices of those third-party websites.

Terms Updates
Pelita Cemerlang School may update these terms and conditions when needed. Changes apply once they are displayed on this page.

Contact
For questions about these terms and conditions, please contact the school through the official contact information available on the Contact Us page.`

  content.academicPages.preschool.title = 'Building Character & Creativity Foundations'
  content.academicPages.preschool.desc = 'Focused on motor, social, emotional, and cognitive development through structured play in a safe environment.'
  content.academicPages.preschool.age = '3 - 6 Years'
  content.academicPages.preschool.principalRole = 'Principal of Preschool'
  content.academicPages.preschool.principalMessage = 'Welcome to Preschool. We believe every child is unique and has extraordinary potential.'
  content.academicPages.preschool.philosophySections = [
    {
      title: 'School as a Place to Grow',
      desc: 'The education program is designed as a safe, warm, and guided ecosystem where every child feels known, supported, and confident to grow.',
      image: '/images/hero-g.jpg',
    },
    {
      title: 'Teachers as Learning Companions',
      desc: 'Teachers are not only content deliverers, but facilitators who understand student needs, nurture curiosity, and guide character through daily learning.',
      image: '/images/hero-g.jpg',
    },
    {
      title: 'Connected Educators',
      desc: 'Every educator works through consistent communication so students academic, social, and emotional development can be supported as a whole.',
      image: '/images/hero-g.jpg',
    },
  ]
  content.academicPages.primary.title = 'Exploring Knowledge & Independence'
  content.academicPages.primary.desc = 'Developing literacy, numeracy, and world understanding through an adaptive and challenging curriculum.'
  content.academicPages.primary.age = '6 - 12 Years'
  content.academicPages.primary.principalRole = 'Principal of Primary School'
  content.academicPages.primary.principalMessage = 'At Primary School, we build strong academic foundations and nurture leadership from an early age.'
  content.academicPages.primary.philosophySections = [
    {
      title: 'School as a Place to Grow',
      desc: 'The education program is designed as a safe, warm, and guided ecosystem where every child feels known, supported, and confident to grow.',
      image: '/images/hero-g.jpg',
    },
    {
      title: 'Teachers as Learning Companions',
      desc: 'Teachers are not only content deliverers, but facilitators who understand student needs, nurture curiosity, and guide character through daily learning.',
      image: '/images/hero-g.jpg',
    },
    {
      title: 'Connected Educators',
      desc: 'Every educator works through consistent communication so students academic, social, and emotional development can be supported as a whole.',
      image: '/images/hero-g.jpg',
    },
  ]
  content.academicPages.secondary.title = 'Preparing for a Global Future'
  content.academicPages.secondary.desc = 'Shaping critical thinkers, innovators, and future leaders through comprehensive academic programs and career guidance.'
  content.academicPages.secondary.age = '12 - 18 Years'
  content.academicPages.secondary.principalRole = 'Principal of Secondary School'
  content.academicPages.secondary.principalMessage = 'Secondary School is a crucial transition toward adulthood, university readiness, and global opportunities.'
  content.academicPages.secondary.philosophySections = [
    {
      title: 'School as a Place to Grow',
      desc: 'The education program is designed as a safe, warm, and guided ecosystem where every child feels known, supported, and confident to grow.',
      image: '/images/hero-g.jpg',
    },
    {
      title: 'Teachers as Learning Companions',
      desc: 'Teachers are not only content deliverers, but facilitators who understand student needs, nurture curiosity, and guide character through daily learning.',
      image: '/images/hero-g.jpg',
    },
    {
      title: 'Connected Educators',
      desc: 'Every educator works through consistent communication so students academic, social, and emotional development can be supported as a whole.',
      image: '/images/hero-g.jpg',
    },
  ]
  content.academicPages.secondary.secondaryPrograms = [
    {
      id: 'junior-high-school',
      title: 'Junior High School',
      desc: 'Building a strong middle-school academic foundation, independent learning habits, character, and critical thinking.',
      points: ['Supportive learning transition', 'Stronger literacy, numeracy, and science', 'Character building and collaboration'],
      icon: 'BookOpen',
    },
    {
      id: 'senior-high-school',
      title: 'Senior High School',
      desc: 'Preparing students for university and a global future through academic guidance, portfolio development, and career exploration.',
      points: ['University preparation', 'Career guidance and mentoring', 'Leadership and global readiness'],
      icon: 'GraduationCap',
    },
  ]

  content.contactInfo.hours = 'Monday - Friday: 07:00 - 16:00 WIB'
  content.footer.description = 'Educating young generations with global insight, integrity, and a continuous spirit of innovation.'

  return content
}
