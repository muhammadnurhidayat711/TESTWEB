'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  BriefcaseBusiness, 
  ChevronDown, 
  ChevronUp, 
  GraduationCap, 
  HeartHandshake, 
  Users, 
  Check, 
  Clock, 
  MapPin, 
  Calendar,
  Mail
} from 'lucide-react'
import WaveBackground from '@/components/WaveBackground'
import { useContent } from '@/components/ContentProvider'
import { useLanguage } from '@/components/LanguageProvider'
import HeroBackground from '@/components/HeroBackground'

const valuesId = [
  {
    icon: GraduationCap,
    title: 'Tumbuh Bersama',
    text: 'Ruang kerja yang menghargai pembelajaran, refleksi, dan pengembangan profesional.',
  },
  {
    icon: Users,
    title: 'Kolaboratif',
    text: 'Guru dan tim sekolah bergerak bersama untuk mendampingi perjalanan siswa.',
  },
  {
    icon: HeartHandshake,
    title: 'Berdampak',
    text: 'Setiap peran ikut membentuk lingkungan belajar yang hangat dan bermakna.',
  },
]

const valuesEn = [
  {
    icon: GraduationCap,
    title: 'Grow Together',
    text: 'A workspace that values learning, reflection, and professional development.',
  },
  {
    icon: Users,
    title: 'Collaborative',
    text: 'Teachers and school teams move together to guide students\' journeys.',
  },
  {
    icon: HeartHandshake,
    title: 'Impactful',
    text: 'Every role shapes a warm and meaningful learning environment.',
  },
]

// Detailed static content for the 4 default openings in both ID & EN (Fallback)
const openingDetails: Record<string, {
  id: string
  idDetails: {
    description: string
    requirements: string[]
    responsibilities: string[]
  }
  enDetails: {
    description: string
    requirements: string[]
    responsibilities: string[]
  }
}> = {
  'primary-bilingual-teacher': {
    id: 'primary-bilingual-teacher',
    idDetails: {
      description: 'Bertanggung jawab untuk merencanakan, memfasilitasi, dan mengevaluasi pembelajaran interaktif bagi siswa Sekolah Dasar dengan menggunakan bahasa pengantar ganda (Bahasa Inggris dan Bahasa Indonesia).',
      requirements: [
        'Lulusan S1 Pendidikan Guru Sekolah Dasar (PGSD), Sastra Inggris, atau bidang terkait.',
        'Fasih berbahasa Inggris secara lisan dan tulisan (skor TOEFL min. 550 atau IELTS min. 6.0).',
        'Memiliki pengalaman mengajar di sekolah bilingual min. 2 tahun.',
        'Memiliki keterampilan komunikasi yang sangat baik dengan anak-anak dan orang tua.'
      ],
      responsibilities: [
        'Menyusun rencana pembelajaran harian (lesson plan) berbasis kurikulum bilingual sekolah.',
        'Mengajar mata pelajaran utama (Bahasa Inggris, Matematika, Sains) menggunakan metode interaktif dan berpusat pada siswa.',
        'Memantau dan mendokumentasikan perkembangan akademis serta karakter siswa secara berkala.',
        'Berkomunikasi secara aktif dan profesional dengan orang tua terkait perkembangan belajar siswa.'
      ]
    },
    enDetails: {
      description: 'Responsible for planning, facilitating, and evaluating interactive learning for Primary students using dual instruction languages (English and Indonesian).',
      requirements: [
        'Bachelor\'s Degree in Primary Education (PGSD), English Literature, or a related field.',
        'Fluent in English, both written and spoken (TOEFL score min. 550 or IELTS min. 6.0).',
        'Minimum 2 years of teaching experience in a bilingual or international school setting.',
        'Excellent communication and interpersonal skills with children and parents.',
      ],
      responsibilities: [
        'Prepare daily lesson plans based on the school\'s bilingual curriculum.',
        'Teach core subjects (English, Mathematics, Science) using interactive, student-centered methods.',
        'Monitor, assess, and document students\' academic and character progress.',
        'Actively and professionally communicate with parents regarding student learning progress.'
      ]
    }
  },
  'secondary-science-teacher': {
    id: 'secondary-science-teacher',
    idDetails: {
      description: 'Mengampu mata pelajaran Sains (Fisika/Kimia/Biologi) di tingkat Secondary (SMP/SMA) menggunakan kurikulum Cambridge/Nasional terintegrasi dengan penekanan pada eksperimen praktis.',
      requirements: [
        'Lulusan S1/S2 Pendidikan Fisika, Kimia, Biologi, Sains Murni, atau bidang linier.',
        'Memahami dan berpengalaman mengajar kurikulum Cambridge (IGCSE / A-Level) min. 2 tahun.',
        'Fasih berbahasa Inggris (seluruh penyampaian Sains dilakukan penuh dalam Bahasa Inggris).',
        'Memiliki kemampuan mengelola laboratorium sains sekolah dengan aman dan teratur.'
      ],
      responsibilities: [
        'Menyampaikan pembelajaran sains yang analitis, eksploratif, dan aplikatif untuk menumbuhkan pemikiran kritis.',
        'Merancang, mempersiapkan, dan memimpin kegiatan praktikum laboratorium secara berkala.',
        'Membimbing siswa dalam proyek penelitian sains, pameran sains sekolah, dan kompetisi ilmiah nasional/internasional.',
        'Melakukan evaluasi serta asesmen berkala terhadap pemahaman konseptual dan aplikatif siswa.'
      ]
    },
    enDetails: {
      description: 'Teach Science subjects (Physics/Chemistry/Biology) at the Secondary school level (SMP/SMA) using an integrated Cambridge/National curriculum with an emphasis on practical experiments.',
      requirements: [
        'Bachelor\'s or Master\'s Degree in Physics, Chemistry, Biology, Science Education, or related fields.',
        'Minimum 2 years of experience teaching the Cambridge curriculum (IGCSE / A-Level).',
        'Highly fluent in English (Science subjects are delivered entirely in English).',
        'Capable of managing and maintaining school science laboratories safely and organized.',
      ],
      responsibilities: [
        'Deliver analytical, exploratory, and applicable science lessons to foster critical thinking.',
        'Design, prepare, and lead regular laboratory practical sessions for students.',
        'Guide students in science research projects, school science fairs, and national/international scientific competitions.',
        'Conduct regular evaluations and assessments of students\' conceptual and practical understanding.'
      ]
    }
  },
  'student-counselor': {
    id: 'student-counselor',
    idDetails: {
      description: 'Mendampingi kesehatan mental, sosial, emosional, dan memberikan bimbingan karir serta akademik bagi seluruh siswa untuk memastikan kenyamanan belajar mereka.',
      requirements: [
        'Lulusan S1/S2 Bimbingan Konseling (BK) atau Psikologi.',
        'Memiliki empati yang tinggi, keterampilan mendengarkan aktif, dan integritas tinggi dalam menjaga kerahasiaan.',
        'Berpengalaman min. 2 tahun sebagai konselor sekolah atau psikolog anak/remaja.',
        'Memiliki pemahaman mendalam tentang psikologi perkembangan anak dan remaja.'
      ],
      responsibilities: [
        'Memberikan layanan konseling individual maupun kelompok bagi siswa yang membutuhkan bantuan emosional atau akademis.',
        'Menyusun, mengevaluasi, dan mengimplementasikan program bimbingan pengembangan karakter dan kesehatan mental sekolah.',
        'Berkolaborasi aktif dengan guru kelas dan orang tua dalam memberikan solusi atas tantangan perilaku siswa.',
        'Melakukan mediasi dan intervensi krisis sosial-emosional siswa dengan pendekatan yang ramah anak.'
      ]
    },
    enDetails: {
      description: 'Assist students\' mental, social, and emotional well-being, while providing career and academic guidance to ensure their learning comfort and holistic growth.',
      requirements: [
        'Bachelor\'s or Master\'s Degree in Psychology or Guidance & Counseling.',
        'High level of empathy, active listening skills, and strong integrity in maintaining absolute confidentiality.',
        'Minimum 2 years of experience as a school counselor or child/adolescent psychologist.',
        'Deep understanding of child and adolescent developmental psychology.'
      ],
      responsibilities: [
        'Provide individual and group counseling sessions for students requiring emotional, social, or academic guidance.',
        'Design, evaluate, and implement school character development and mental health guidance programs.',
        'Collaborate actively with classroom teachers and parents to provide effective solutions for student behavioral challenges.',
        'Perform mediation and crisis intervention for students\' social-emotional needs using child-friendly approaches.'
      ]
    }
  },
  'admission-officer': {
    id: 'admission-officer',
    idDetails: {
      description: 'Ujung tombak pendaftaran siswa baru, promosi citra sekolah, pelayanan informasi bagi calon orang tua murid.',
      requirements: [
        'Lulusan S1 Ilmu Komunikasi, Pemasaran (Marketing), Hubungan Masyarakat (PR), atau bidang terkait.',
        'Ramah, komunikatif, persuasif, berpenampilan rapi, dan berorientasi pada pelayanan pelanggan prima.',
        'Memiliki keterampilan komunikasi verbal dan tertulis yang kuat dalam Bahasa Indonesia & Bahasa Inggris.',
        'Menguasai dasar digital marketing, manajemen media sosial (Instagram, YouTube), dan copywriting.'
      ],
      responsibilities: [
        'Mengelola seluruh proses admisi pendaftaran siswa baru dari tahap prospek, ujian masuk, hingga registrasi ulang.',
        'Menyambut, melayani konsultasi, dan memberikan presentasi sekolah (school tour) bagi calon orang tua murid.',
        'Merancang, mengoordinasikan, dan mengeksekusi kampanye promosi sekolah secara online maupun offline.',
        'Memelihara database prospek pendaftar serta menjalin hubungan baik berkelanjutan dengan komunitas sekolah.'
      ]
    },
    enDetails: {
      description: 'The spearhead of new student admissions, school image promotion, social media management, and information services for prospective parents.',
      requirements: [
        'Bachelor\'s Degree in Communication Science, Marketing, Public Relations, or related fields.',
        'Warm, highly communicative, persuasive, well-groomed, and service-oriented.',
        'Strong verbal and written communication skills in both Indonesian and English.',
        'Proficient in digital marketing basics, social media management (Instagram, YouTube), and copywriting.'
      ],
      responsibilities: [
        'Manage the entire new student admission process from inquiries and entrance tests to re-registration.',
        'Welcome, consult, and provide comprehensive school tours for prospective parents.',
        'Design, coordinate, and execute school promotional campaigns both online and offline.',
        'Maintain admission database, track enrollment funnels, and build excellent relationships with the community.'
      ]
    }
  }
}

export default function CareerPage() {
  const content = useContent()
  const { lang, t } = useLanguage()
  const pageContent = content.pages.career
  const openings = content.careerOpenings

  // Accordion state for job details
  const [expandedOpening, setExpandedOpening] = useState<string | null>(null)

  const fallbackValues = lang === 'id' ? valuesId : valuesEn

  const toggleOpening = (id: string) => {
    if (expandedOpening === id) {
      setExpandedOpening(null)
    } else {
      setExpandedOpening(id)
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#FFFAF0] pb-24 font-jakarta text-neutral-800 antialiased selection:bg-[#164AA8] selection:text-white">
      <WaveBackground />

      {/* Hero Section */}
      <section className="relative flex h-[52vh] min-h-[390px] items-center justify-center overflow-hidden">
        <HeroBackground
          alt="Career at Pelita Cemerlang"
          fallbackImage={pageContent.heroBgImage}
          images={pageContent.heroBgImages}
        />
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-[#0A3A8D]/80 via-[#0A3A8D]/50 to-[#FFFAF0]" />

        <div className="relative z-20 mx-auto mt-8 max-w-4xl px-6 text-center animate-fade-in">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#164AA8]/30 bg-[#164AA8]/20 px-4 py-2">
            <BriefcaseBusiness className="h-4 w-4 text-[#DCC9AA]" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#DCC9AA]">
              {lang === 'id' ? 'Karier' : 'Career'}
            </span>
          </div>

          <h1 className="mb-4 font-playfair text-4xl font-bold leading-tight tracking-tight text-white md:text-6xl">
            {pageContent.heroTitle.split(' ').map((word, i, arr) => (
              i === arr.length - 1 ? (
                <span key={i} className="bg-gradient-to-r from-[#DCC9AA] to-[#C8A35A] bg-clip-text text-transparent">{word}</span>
              ) : (
                word + ' '
              )
            ))}
          </h1>

          <p className="mx-auto max-w-xl text-sm font-light leading-relaxed text-white/80 md:text-lg">
            {pageContent.heroSubtitle}
          </p>

          {pageContent.introText && (
            <p className="mx-auto mt-4 max-w-xl text-sm font-light leading-relaxed text-white/60">
              {pageContent.introText}
            </p>
          )}
        </div>

        <div className="absolute bottom-6 left-1/2 z-20 -translate-x-1/2">
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-white/40">Scroll</span>
            <ChevronDown className="h-5 w-5 animate-bounce text-white/40" />
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="relative z-20 mx-auto -mt-12 max-w-7xl px-6">
        <div className="grid gap-4 md:grid-cols-3">
          {(pageContent.valuesSection?.items || fallbackValues).map((value) => {
            const Icon = value.icon === 'GraduationCap' ? GraduationCap : value.icon === 'Users' ? Users : HeartHandshake
            return (
              <article
                key={value.title}
                className="rounded-[1.75rem] border border-[#C8A35A]/25 bg-white/75 p-6 shadow-[0_16px_42px_rgba(6,27,73,0.05)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-[#C8A35A] hover:bg-white md:p-8"
              >
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl border border-[#C8A35A]/20 bg-[#C8A35A]/10 text-[#0A3A8D]">
                  <Icon className="h-5 w-5" />
                </div>
                <h2 className="mb-2 font-playfair text-2xl font-bold tracking-tight text-[#061B49]">
                  {value.title}
                </h2>
                <p className="text-sm font-light leading-relaxed text-neutral-500">
                  {value.text}
                </p>
              </article>
            )
          })}
        </div>
      </section>

      {/* Job Openings Section with Expansion */}
      <section className="relative z-20 mx-auto max-w-7xl px-6 pt-24">
        <div className="mb-8 flex flex-col gap-4 border-b border-[#DCC9AA]/55 pb-6 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="mb-3 block text-[10px] font-bold uppercase tracking-[0.25em] text-[#C8A35A]">
              {pageContent.openingsSection?.label || (lang === 'id' ? 'Posisi Terbuka' : 'Available Openings')}
            </span>
            <h2 className="font-playfair text-3xl font-bold tracking-tight text-[#061B49] md:text-4xl">
              {pageContent.openingsSection?.title || (lang === 'id' ? 'Temukan Peran Terbaik Anda.' : 'Find Your Perfect Role.')}
            </h2>
          </div>
          <p className="max-w-md text-sm font-light leading-relaxed text-[#164AA8]/75">
            {pageContent.openingsSection?.desc || (lang === 'id' 
              ? 'Berikut daftar posisi pengajaran dan staf pendukung sekolah yang sedang dibuka untuk aplikasi.' 
              : 'Here is the list of teaching and support staff positions currently open for application.')}
          </p>
        </div>

        <div className="grid gap-4">
          {openings.map((opening) => {
            const isExpanded = expandedOpening === opening.id
            
            // Determine if the opening object has dynamically saved requirements/responsibilities/description in CMS
            const hasCustomDetails = opening.description || (opening.requirements && opening.requirements.length > 0) || (opening.responsibilities && opening.responsibilities.length > 0)

            const details = hasCustomDetails ? {
              id: opening.id,
              idDetails: {
                description: opening.description || 'Bergabunglah dengan tim profesional kami untuk posisi ini dan bantu kami membangun masa depan pendidikan yang lebih baik.',
                requirements: opening.requirements && opening.requirements.length > 0 ? opening.requirements : [
                  'Lulusan S1 dari bidang studi terkait.',
                  'Fasih berbahasa Indonesia dan memiliki kemampuan Bahasa Inggris dasar/lanjutan.',
                  'Memiliki dedikasi tinggi, berintegritas, dan mencintai dunia pendidikan.',
                  'Memiliki kemampuan bekerja secara mandiri maupun kolaboratif.'
                ],
                responsibilities: opening.responsibilities && opening.responsibilities.length > 0 ? opening.responsibilities : [
                  'Menjalankan tugas dan kewajiban sesuai dengan lingkup kerja posisi terkait.',
                  'Bekerja sama dengan tim sekolah untuk menciptakan iklim belajar/kerja yang positif.',
                  'Menyusun laporan kinerja dan berpartisipasi dalam program pengembangan staf sekolah.',
                  'Mendukung visi dan misi utama Pelita Cemerlang School.'
                ]
              },
              enDetails: {
                description: opening.description || 'Join our professional team for this role and help us build a brighter future for education.',
                requirements: opening.requirements && opening.requirements.length > 0 ? opening.requirements : [
                  'Bachelor\'s Degree in a related field.',
                  'Fluent in Indonesian; basic/advanced English proficiency is highly preferred.',
                  'Dedicated, high integrity, and passionate about the education sector.',
                  'Capable of working independently and collaboratively within a team.'
                ],
                responsibilities: opening.responsibilities && opening.responsibilities.length > 0 ? opening.responsibilities : [
                  'Execute tasks and duties corresponding to the scope of the specific role.',
                  'Cooperate with the school team to foster a positive learning/working environment.',
                  'Prepare performance reports and participate in school staff development programs.',
                  'Support the core vision and mission of Pelita Cemerlang School.'
                ]
              }
            } : (openingDetails[opening.id] || {
              id: opening.id,
              idDetails: {
                description: 'Bergabunglah dengan tim profesional kami untuk posisi ini dan bantu kami membangun masa depan pendidikan yang lebih baik.',
                requirements: [
                  'Lulusan S1 dari bidang studi terkait.',
                  'Fasih berbahasa Indonesia dan memiliki kemampuan Bahasa Inggris dasar/lanjutan.',
                  'Memiliki dedikasi tinggi, berintegritas, dan mencintai dunia pendidikan.',
                  'Memiliki kemampuan bekerja secara mandiri maupun kolaboratif.'
                ],
                responsibilities: [
                  'Menjalankan tugas dan kewajiban sesuai dengan lingkup kerja posisi terkait.',
                  'Bekerja sama dengan tim sekolah untuk menciptakan iklim belajar/kerja yang positif.',
                  'Menyusun laporan kinerja dan berpartisipasi dalam program pengembangan staf sekolah.',
                  'Mendukung visi dan misi utama Pelita Cemerlang School.'
                ]
              },
              enDetails: {
                description: 'Join our professional team for this role and help us build a brighter future for education.',
                requirements: [
                  'Bachelor\'s Degree in a related field.',
                  'Fluent in Indonesian; basic/advanced English proficiency is highly preferred.',
                  'Dedicated, high integrity, and passionate about the education sector.',
                  'Capable of working independently and collaboratively within a team.'
                ],
                responsibilities: [
                  'Execute tasks and duties corresponding to the scope of the specific role.',
                  'Cooperate with the school team to foster a positive learning/working environment.',
                  'Prepare performance reports and participate in school staff development programs.',
                  'Support the core vision and mission of Pelita Cemerlang School.'
                ]
              }
            })

            const currentDetail = lang === 'id' ? details.idDetails : details.enDetails

            return (
              <article
                key={opening.id}
                className="overflow-hidden rounded-[1.5rem] border border-[#DCC9AA]/55 bg-white/65 shadow-sm transition-all duration-300 hover:border-[#C8A35A] hover:bg-white"
              >
                {/* Accordion Header */}
                <div 
                  onClick={() => toggleOpening(opening.id)}
                  className="flex cursor-pointer flex-col gap-4 px-6 py-6 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex-1">
                    <h3 className="font-playfair text-2xl font-bold tracking-tight text-[#061B49]">
                      {opening.title}
                    </h3>
                    <div className="mt-2 flex flex-wrap items-center gap-3 text-[10px] font-bold uppercase tracking-[0.2em] text-[#164AA8]/70">
                      <span className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        {opening.team}
                      </span>
                      <span className="text-[#C8A35A]">/</span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {opening.type}
                      </span>
                      <span className="text-[#C8A35A]">/</span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        Pontianak
                      </span>
                      {opening.postedDate && (
                        <>
                          <span className="text-[#C8A35A]">/</span>
                          <span className="flex items-center gap-1 text-[#061B49]/80 font-semibold">
                            <Calendar className="h-3 w-3 text-[#C8A35A]" />
                            {lang === 'id' ? 'Buka:' : 'Open:'} {opening.postedDate}
                          </span>
                        </>
                      )}
                      {opening.deadlineDate && (
                        <>
                          <span className="text-[#C8A35A]">/</span>
                          <span className="flex items-center gap-1 text-red-600/90 font-bold bg-red-50/80 px-2 py-0.5 rounded border border-red-200/40">
                            <Calendar className="h-3 w-3 text-red-500" />
                            {lang === 'id' ? 'Batas Akhir:' : 'Deadline:'} {opening.deadlineDate}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center justify-between sm:justify-end gap-4 mt-2 sm:mt-0">
                    <button 
                      className="text-xs font-semibold uppercase tracking-wider text-[#164AA8]/80 hover:text-[#061B49] flex items-center gap-1"
                    >
                      {isExpanded ? (lang === 'id' ? 'Tutup Detail' : 'Hide Details') : (lang === 'id' ? 'Lihat Detail' : 'View Details')}
                      {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4 animate-pulse" />}
                    </button>
                  </div>
                </div>

                {/* Accordion Body */}
                {isExpanded && (
                  <div className="border-t border-[#DCC9AA]/45 bg-[#FFFAF0]/30 px-6 py-6 transition-all duration-500 ease-in-out animate-slide-down">
                    
                    {/* Date details inside expanded accordion */}
                    <div className="mb-6 grid gap-4 sm:grid-cols-2 rounded-xl bg-white/60 p-4 border border-[#DCC9AA]/35 shadow-sm">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#C8A35A]/10 text-[#C8A35A]">
                          <Calendar className="h-4 w-4" />
                        </div>
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block">
                            {lang === 'id' ? 'Tanggal Pembukaan' : 'Date Opened'}
                          </span>
                          <span className="text-xs font-bold text-[#061B49]">
                            {opening.postedDate || (lang === 'id' ? '15 Mei 2026' : 'May 15, 2026')}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-100/80 text-red-600">
                          <Calendar className="h-4 w-4" />
                        </div>
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-red-400 block">
                            {lang === 'id' ? 'Batas Akhir Pendaftaran' : 'Application Deadline'}
                          </span>
                          <span className="text-xs font-bold text-red-600">
                            {opening.deadlineDate || (lang === 'id' ? '30 Juni 2026' : 'June 30, 2026')}
                          </span>
                        </div>
                      </div>
                    </div>

                    <p className="text-sm font-light leading-relaxed text-neutral-600 mb-6">
                      {currentDetail.description}
                    </p>

                    <div className="grid gap-6 md:grid-cols-2">
                      {/* Requirements List */}
                      <div>
                        <h4 className="font-bold text-[#061B49] text-sm uppercase tracking-wider mb-3 flex items-center gap-2">
                          <Check className="h-4 w-4 text-[#C8A35A]" />
                          {lang === 'id' ? 'Kualifikasi & Persyaratan' : 'Requirements & Qualifications'}
                        </h4>
                        <ul className="space-y-2">
                          {currentDetail.requirements.map((req, rIdx) => (
                            <li key={rIdx} className="text-xs font-light text-neutral-500 leading-relaxed flex items-start gap-2">
                              <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#C8A35A] mt-1.5 shrink-0" />
                              <span>{req}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Responsibilities List */}
                      <div>
                        <h4 className="font-bold text-[#061B49] text-sm uppercase tracking-wider mb-3 flex items-center gap-2">
                          <BriefcaseBusiness className="h-4 w-4 text-[#C8A35A]" />
                          {lang === 'id' ? 'Tanggung Jawab Utama' : 'Key Responsibilities'}
                        </h4>
                        <ul className="space-y-2">
                          {currentDetail.responsibilities.map((resp, rIdx) => (
                            <li key={rIdx} className="text-xs font-light text-neutral-500 leading-relaxed flex items-start gap-2">
                              <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#164AA8] mt-1.5 shrink-0" />
                              <span>{resp}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Dynamic Application Submission Methods (Email / Walk-in) */}
                    {(opening.applyEmail || opening.applyAddress) ? (
                      <div className="mt-8 rounded-xl bg-white p-5 border border-[#DCC9AA]/35 shadow-sm">
                        <h4 className="font-bold text-[#061B49] text-xs uppercase tracking-wider mb-3 flex items-center gap-2">
                          <Check className="h-4 w-4 text-[#C8A35A]" />
                          {lang === 'id' ? 'Tata Cara Pendaftaran' : 'How to Apply'}
                        </h4>
                        <div className="space-y-3">
                          {opening.applyEmail && (
                            <div className="text-xs text-neutral-500 font-light flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-3 bg-[#FFFAF0]/55 rounded-lg border border-[#DCC9AA]/20">
                              <div>
                                <span className="font-semibold text-[#061B49] block">
                                  {lang === 'id' ? 'Kirim via Email' : 'Submit via Email'}
                                </span>
                                {lang === 'id' ? 'Kirimkan berkas lamaran Anda ke alamat email resmi rekrutmen kami:' : 'Send your application files to our official recruitment email:'}
                                <code className="block mt-1 font-mono text-xs font-semibold text-[#0A3A8D]">
                                  {opening.applyEmail}
                                </code>
                              </div>
                              <Link
                                href={`mailto:${opening.applyEmail}?subject=PC Recruitment - ${opening.title}`}
                                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#061B49] px-4 py-2 text-[10px] font-bold uppercase tracking-[0.15em] text-[#FFFAF0] transition-colors hover:bg-[#164AA8] shrink-0"
                              >
                                {lang === 'id' ? 'Kirim Email' : 'Email Now'}
                              </Link>
                            </div>
                          )}
                          {opening.applyAddress && (
                            <div className="text-xs text-neutral-500 font-light p-3 bg-[#FFFAF0]/55 rounded-lg border border-[#DCC9AA]/20">
                              <span className="font-semibold text-[#061B49] block">
                                {lang === 'id' ? 'Kirim Berkas Fisik / Datang Langsung' : 'Submit Hardcopy / Walk-in'}
                              </span>
                              {lang === 'id' ? 'Anda dapat menyerahkan berkas lamaran fisik Anda secara langsung ke alamat:' : 'You can submit your physical application files directly to the address:'}
                              <p className="mt-1.5 font-sans font-bold text-xs text-[#061B49] bg-white p-2 rounded border border-gray-100 whitespace-pre-line leading-relaxed">
                                {opening.applyAddress}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    ) : (
                      /* Static Fallback Application Method if none specified in CMS */
                      <div className="mt-8 rounded-xl bg-white p-5 border border-[#DCC9AA]/35 shadow-sm">
                        <h4 className="font-bold text-[#061B49] text-xs uppercase tracking-wider mb-3 flex items-center gap-2">
                          <Check className="h-4 w-4 text-[#C8A35A]" />
                          {lang === 'id' ? 'Tata Cara Pendaftaran' : 'How to Apply'}
                        </h4>
                        <div className="space-y-3">
                          <div className="text-xs text-neutral-500 font-light flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-3 bg-[#FFFAF0]/55 rounded-lg border border-[#DCC9AA]/20">
                            <div>
                              <span className="font-semibold text-[#061B49] block">
                                {lang === 'id' ? 'Kirim via Email' : 'Submit via Email'}
                              </span>
                              {lang === 'id' ? 'Kirimkan berkas lamaran Anda ke alamat email resmi rekrutmen kami:' : 'Send your application files to our official recruitment email:'}
                              <code className="block mt-1 font-mono text-xs font-semibold text-[#0A3A8D]">
                                career@pelitacemerlang.sch.id
                              </code>
                            </div>
                            <Link
                              href={`mailto:career@pelitacemerlang.sch.id?subject=PC Recruitment - ${opening.title}`}
                              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#061B49] px-4 py-2 text-[10px] font-bold uppercase tracking-[0.15em] text-[#FFFAF0] transition-colors hover:bg-[#164AA8] shrink-0"
                            >
                              {lang === 'id' ? 'Kirim Email' : 'Email Now'}
                            </Link>
                          </div>
                          <div className="text-xs text-neutral-500 font-light p-3 bg-[#FFFAF0]/55 rounded-lg border border-[#DCC9AA]/20">
                            <span className="font-semibold text-[#061B49] block">
                              {lang === 'id' ? 'Kirim Berkas Fisik / Datang Langsung' : 'Submit Hardcopy / Walk-in'}
                            </span>
                            {lang === 'id' 
                              ? 'Anda dapat menyerahkan berkas lamaran fisik Anda secara langsung ke Kantor Admisi Sekolah Pelita Cemerlang.' 
                              : 'You can submit your physical application files directly to the Admission Office of Pelita Cemerlang School.'}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </article>
            )
          })}
          {openings.length === 0 && (
            <div className="rounded-[1.5rem] border border-[#DCC9AA]/55 bg-white/65 px-6 py-8 text-center text-sm font-light leading-relaxed text-neutral-500">
              {lang === 'id' ? 'Belum ada posisi terbuka saat ini.' : 'No openings available at the moment.'}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
