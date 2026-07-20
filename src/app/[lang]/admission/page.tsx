'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronRight, Check, Calendar, User, Mail, Phone, FileText } from 'lucide-react'
import { useContent } from '@/components/ContentProvider'
import { useLanguage } from '@/components/LanguageProvider'
import FadeInSection from '@/components/FadeInSection'
import WaveBackground from '@/components/WaveBackground'
import HeroBackground from '@/components/HeroBackground'

const programs = [
  { id: 'playgroup', name: 'Playgroup & PAUD', age: '2-4 tahun', fee: 'Rp 5.000.000', period: 'per semester', icon: '🧒' },
  { id: 'tk', name: 'TK / Preschool', age: '4-6 tahun', fee: 'Rp 6.500.000', period: 'per semester', icon: '👶' },
  { id: 'sd', name: 'SD / Primary', age: '6-12 tahun', fee: 'Rp 8.000.000', period: 'per semester', icon: '📚' },
  { id: 'smp', name: 'SMP / Junior High', age: '12-15 tahun', fee: 'Rp 10.000.000', period: 'per semester', icon: '📖' },
  { id: 'sma', name: 'SMA / Senior High', age: '15-18 tahun', fee: 'Rp 12.000.000', period: 'per semester', icon: '🎓' },
]

const requirements = [
  'Pas foto 3x4 (3 lembar)',
  'Akta Kelahiran asli',
  'Kartu Keluarga (KK)',
  'Ijazah/SKHUN (jika ada)',
  'Rapor terakhir (untuk pindahan)',
  'Kartu Identitas Orang Tua (KTP)',
  'Surat Keterangan Sehat',
]

const timeline = [
  { phase: 'Gelombang 1', date: '1 Nov - 31 Des 2025', status: 'early-bird' },
  { phase: 'Gelombang 2', date: '1 Jan - 28 Feb 2026', status: 'normal' },
  { phase: 'Gelombang 3', date: '1 Mar - 30 Apr 2026', status: 'late' },
  { phase: 'Pengumuman', date: '15 Mei 2026', status: 'announcement' },
  { phase: 'Daftar Ulang', date: '20-31 Mei 2026', status: 'registration' },
  { phase: 'Masuk Sekolah', date: '15 Juli 2026', status: 'start' },
]

export default function AdmissionPage() {
  const { lang, t } = useLanguage()
  const { pages } = useContent()
  const pageContent = pages.admission
  const labels = lang === 'id'
    ? {
        parentPlaceholder: 'Masukkan nama lengkap',
        emailPlaceholder: 'email@contoh.com',
        phonePlaceholder: '08xxxxxxxxxx',
        studentPlaceholder: 'Masukkan nama lengkap siswa',
        schedule: 'Jadwal',
        timelineTitle: 'Timeline Pendaftaran',
        schoolYear: 'Tahun Ajaran 2026/2027',
        preparation: 'Persiapan',
        requirementsTitle: 'Persyaratan Pendaftaran',
        requirementsDesc: 'Siapkan dokumen-dokumen berikut sebelum melakukan pendaftaran online atau offline.',
        ctaTitle: 'Butuh Informasi Lebih Lanjut?',
        ctaDesc: 'Hubungi tim admisi kami untuk konsultasi gratis',
        ctaButton: 'Hubungi Kami',
        waIntro: 'Halo Admin Pelita Cemerlang, ada pendaftaran siswa baru dari Website:',
        parentName: 'Nama Orang Tua/Wali',
        studentName: 'Nama Siswa',
        level: 'Jenjang Pendidikan',
        additionalMessage: 'Pesan Tambahan',
      }
    : {
        parentPlaceholder: 'Enter full name',
        emailPlaceholder: 'email@example.com',
        phonePlaceholder: 'Phone number',
        studentPlaceholder: 'Enter student full name',
        schedule: 'Schedule',
        timelineTitle: 'Admission Timeline',
        schoolYear: 'Academic Year 2026/2027',
        preparation: 'Preparation',
        requirementsTitle: 'Admission Requirements',
        requirementsDesc: 'Prepare these documents before registering online or offline.',
        ctaTitle: 'Need More Information?',
        ctaDesc: 'Contact our admission team for a free consultation',
        ctaButton: 'Contact Us',
        waIntro: 'Hello Pelita Cemerlang Admin, there is a new student registration from the website:',
        parentName: 'Parent/Guardian Name',
        studentName: 'Student Name',
        level: 'Education Level',
        additionalMessage: 'Additional Message',
      }
  const getLocalizedPath = (path: string) => `/${lang}${path === '/' ? '' : path}`
  const [formData, setFormData] = useState({
    parentName: '',
    email: '',
    phone: '',
    studentName: '',
    level: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Konfigurasi URL Webhook Google Sheets & Nomor WA
    const GOOGLE_SHEETS_WEBHOOK_URL = 'https://script.google.com/macros/s/AKfycbwWXhDRTHhqc3dTVJ3zLscRqkkutA6HQE-8EsoLYtBOJW46hNKr_RC4YvC7i2NbaQ/exec';
    const WA_ADMIN_NUMBER = '6282292214605';

    try {
      // 1. Kirim Data ke Google Sheets
      fetch(GOOGLE_SHEETS_WEBHOOK_URL, {
        method: 'POST',
        mode: 'no-cors', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'admission',
          parentName: formData.parentName,
          email: formData.email,
          phone: formData.phone,
          studentName: formData.studentName,
          level: formData.level,
          message: formData.message,
        })
      }).catch(err => console.error("Error sending to sheets:", err));

      // 2. Format Pesan WhatsApp
      const waMessage = `${labels.waIntro}
      
*${labels.parentName}:* ${formData.parentName}
*Email:* ${formData.email}
*No. HP:* ${formData.phone}

*${labels.studentName}:* ${formData.studentName}
*${labels.level}:* ${formData.level}

*${labels.additionalMessage}:*
${formData.message || '-'}`;

      const encodedMessage = encodeURIComponent(waMessage);
      
      // 3. Buka WhatsApp di tab baru
      window.open(`https://wa.me/${WA_ADMIN_NUMBER}?text=${encodedMessage}`, '_blank');
      
      setIsSubmitting(false)
      setIsSubmitted(true)
    } catch (error) {
      console.error(error);
      setIsSubmitting(false);
    }
  }

  return (
    <div className="relative overflow-hidden bg-[#FFFAF0] selection:bg-[#164AA8] selection:text-white min-h-screen">
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <HeroBackground
            alt="Admission"
            fallbackImage={pageContent.heroBgImage}
            images={pageContent.heroBgImages}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#061B49]/90 via-[#0A3A8D]/80 to-[#164AA8]/70" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center text-white">
          <h1 className="font-poppins text-4xl md:text-5xl lg:text-6xl font-bold mb-6">{pageContent.heroTitle}</h1>
          <p className="text-xl text-white/80">{pageContent.heroSubtitle}</p>
          {pageContent.introText && <p className="text-md mt-4 text-white/60">{pageContent.introText}</p>}
        </div>
      </section>

      {/* Signature Elegant Waves Background */}
      <WaveBackground />



      {/* Timeline */}
      <section className="section bg-[#164AA8]/5 backdrop-blur-sm border-y border-[#D7C5A7]/20 relative z-30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <FadeInSection>
              <span className="text-gold font-semibold text-sm tracking-wider uppercase">{pageContent.timelineAdmission?.label || labels.schedule}</span>
              <h2 className="font-poppins text-3xl md:text-4xl lg:text-5xl font-bold text-[#0A3A8D] mt-4 mb-6">
                {pageContent.timelineAdmission?.title || labels.timelineTitle}
              </h2>
              <p className="text-[#164AA8] text-lg font-light">
                {pageContent.timelineAdmission?.desc || labels.schoolYear}
              </p>
            </FadeInSection>
          </div>

          <FadeInSection>
            <div className="relative">
              <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 md:-translate-x-px" />
              <div className="space-y-8">
                {(pageContent.timelineAdmission?.items || timeline).map((item, index) => (
                  <div key={item.phase} className={`relative flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                    <div className={`flex-1 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                      <div className="bg-white/40 backdrop-blur-sm rounded-2xl p-6 shadow-lg ml-12 md:ml-0 border border-[#D7C5A7]/40">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-2 ${
                          item.status === 'early-bird' ? 'bg-green-100 text-green-700' :
                          item.status === 'announcement' ? 'bg-primary/10 text-primary' :
                          'bg-gray-100 text-gray-600'
                        }`}>
                          {item.phase}
                        </span>
                        <div className="font-semibold text-gray-900">{item.date}</div>
                      </div>
                    </div>
                    <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-primary rounded-full md:-translate-x-1/2 -translate-y-1 border-4 border-white shadow" />
                  </div>
                ))}
              </div>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* Requirements */}
      <section className="section relative z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <FadeInSection>
              <div>
                <span className="text-gold font-semibold text-sm tracking-wider uppercase">{pageContent.requirementsSection?.label || labels.preparation}</span>
                <h2 className="font-poppins text-3xl md:text-4xl font-bold text-[#0A3A8D] mt-4 mb-6">
                  {pageContent.requirementsSection?.title || labels.requirementsTitle}
                </h2>
                <p className="text-[#164AA8] mb-8 font-light">
                  {pageContent.requirementsSection?.desc || labels.requirementsDesc}
                </p>
                <ul className="space-y-4">
                  {(pageContent.requirementsSection?.items || requirements).map((req, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-[#0A3A8D] rounded-full flex items-center justify-center flex-shrink-0">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-[#164AA8]">{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeInSection>

            <FadeInSection delay={100}>
              <div className="bg-white/40 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-[#D7C5A7]/50">
                <div className="flex items-center gap-3 mb-8">
                  <FileText className="w-8 h-8 text-primary" />
                  <h3 className="font-poppins text-2xl font-bold text-gray-900">{t('form.admission')}</h3>
                </div>

                {isSubmitted ? (
                  <div className="text-center py-8">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Check className="w-10 h-10 text-green-600" />
                    </div>
                    <h4 className="font-poppins text-xl font-bold text-gray-900 mb-2">{t('form.successAdmission')}</h4>
                    <p className="text-gray-600 mb-6">
                      {t('form.successDescAdmission')}
                    </p>
                    <button
                      onClick={() => {
                        setIsSubmitted(false)
                        setFormData({ parentName: '', email: '', phone: '', studentName: '', level: '', message: '' })
                      }}
                      className="text-primary font-semibold hover:underline"
                    >
                      {t('form.registerAnother')}
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <User className="w-4 h-4 inline mr-2" />
                        {t('form.parentName')}
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.parentName}
                        onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                        placeholder={labels.parentPlaceholder}
                      />
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <Mail className="w-4 h-4 inline mr-2" />
                          {t('form.email')}
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                          placeholder={labels.emailPlaceholder}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <Phone className="w-4 h-4 inline mr-2" />
                          {t('form.phone')}
                        </label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                          placeholder={labels.phonePlaceholder}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t('form.studentName')}
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.studentName}
                        onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                        placeholder={labels.studentPlaceholder}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t('form.level')}
                      </label>
                      <select
                        required
                        value={formData.level}
                        onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                      >
                        <option value="">{t('form.selectLevel')}</option>
                        {programs.map((p) => (
                          <option key={p.id} value={p.id}>{t(`admission.programs.${p.id}`)}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t('form.optionalMessage')}
                      </label>
                      <textarea
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        rows={3}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
                        placeholder={t('form.optionalMessagePlaceholder')}
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 bg-primary text-white font-semibold rounded-xl hover:bg-primary-dark transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          {t('form.sending')}
                        </>
                      ) : (
                        <>
                          {t('form.submitAdmission')}
                          <ChevronRight className="w-5 h-5" />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-[#061B49] to-[#0A3A8D] relative z-30">
        <div className="max-w-4xl mx-auto px-4 text-center text-white">
          <FadeInSection>
            <h2 className="font-poppins text-3xl md:text-4xl font-bold mb-6">{pageContent.cta?.title || labels.ctaTitle}</h2>
            <p className="text-xl text-white/80 mb-8">
              {pageContent.cta?.desc || labels.ctaDesc}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href={getLocalizedPath('/contact')} className="inline-flex items-center gap-2 px-8 py-4 bg-gold text-white font-semibold rounded-xl hover:bg-gold/90 transition-all">
                {pageContent.cta?.buttonText || labels.ctaButton}
                <ChevronRight className="w-5 h-5" />
              </Link>
              <a href={`tel:${(pageContent.cta?.phoneText || '+622112345678').replace(/\D/g, '')}`} className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 text-white font-semibold rounded-xl border border-white/30 hover:bg-white/20 transition-all">
                <Phone className="w-5 h-5" />
                {pageContent.cta?.phoneText || '(021) 1234-5678'}
              </a>
            </div>
          </FadeInSection>
        </div>
      </section>
    </div>
  )
}
