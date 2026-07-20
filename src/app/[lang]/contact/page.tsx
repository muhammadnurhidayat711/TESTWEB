'use client'

import { useState, useRef } from 'react'
import { motion, Variants } from 'framer-motion'
import { MapPin, Phone, Mail, Clock, Send, ArrowRight, ChevronDown } from 'lucide-react'
import WaveBackground from '@/components/WaveBackground'
import ScrollReveal from '@/components/ScrollReveal'
import { useContent } from '@/components/ContentProvider'
import { useLanguage } from '@/components/LanguageProvider'
import HeroBackground from '@/components/HeroBackground'

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 25 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 75,
      damping: 18
    }
  }
}

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05
    }
  }
}

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const { lang, t } = useLanguage()
  const content = useContent()
  const pageContent = content.pages.contact
  const headerRef = useRef<HTMLDivElement>(null)
  const mapEmbedUrl = content.contactInfo.mapEmbedUrl?.trim() || ''
  const isGoogleMapEmbed = /^https:\/\/www\.google\.com\/maps\/embed\?/i.test(mapEmbedUrl)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Konfigurasi URL Webhook Google Sheets & Nomor WA
    const GOOGLE_SHEETS_WEBHOOK_URL = 'https://script.google.com/macros/s/AKfycbwWXhDRTHhqc3dTVJ3zLscRqkkutA6HQE-8EsoLYtBOJW46hNKr_RC4YvC7i2NbaQ/exec';
    const WA_ADMIN_NUMBER = '6282292214605';

    try {
      // 1. Kirim Data ke Google Sheets (POST request)
      fetch(GOOGLE_SHEETS_WEBHOOK_URL, {
        method: 'POST',
        mode: 'no-cors', // Penting agar tidak terkena pemblokiran CORS browser
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'contact',
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          subject: formData.subject,
          message: formData.message,
        })
      }).catch(err => console.error("Error sending to sheets:", err));

      // 2. Format Pesan WhatsApp
      const waMessage = lang === 'id'
        ? `Halo Admin Pelita Cemerlang, saya ingin bertanya dari Formulir Website:
      
*Nama:* ${formData.name}
*Email:* ${formData.email}
*No. HP:* ${formData.phone}
*Tujuan:* ${formData.subject}

*Pesan:*
${formData.message}`
        : `Hello Admin Pelita Cemerlang, I would like to inquire via the Website Form:
      
*Name:* ${formData.name}
*Email:* ${formData.email}
*Phone:* ${formData.phone}
*Subject:* ${formData.subject}

*Message:*
${formData.message}`;

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

  const contacts = [
    { icon: MapPin, label: lang === 'id' ? 'Alamat Utama' : 'Main Address', value: content.contactInfo.address, color: 'from-[#0A3A8D]/10 to-[#164AA8]/5' },
    { icon: Phone, label: lang === 'id' ? 'Layanan Telepon' : 'Phone Service', value: content.contactInfo.phone, color: 'from-[#C8A35A]/15 to-[#C8A35A]/5' },
    { icon: Mail, label: lang === 'id' ? 'Surel Resmi' : 'Official Email', value: content.contactInfo.email, color: 'from-[#0A3A8D]/10 to-[#C8A35A]/5' },
    { icon: Clock, label: lang === 'id' ? 'Jam Operasional' : 'Working Hours', value: content.contactInfo.hours, color: 'from-[#C8A35A]/15 to-[#164AA8]/5' },
  ]

  return (
    <div className="bg-[#FFFAF0] min-h-screen selection:bg-[#164AA8] selection:text-white relative overflow-hidden font-jakarta antialiased pb-24 text-neutral-800">

      <WaveBackground />

      <section ref={headerRef} className="relative h-[65vh] min-h-[480px] flex items-center justify-center overflow-hidden">
        <HeroBackground
          alt="Contact Background"
          fallbackImage={pageContent.heroBgImage}
          images={pageContent.heroBgImages}
        />

        <div className="absolute inset-0 z-10 bg-gradient-to-b from-[#0A3A8D]/80 via-[#0A3A8D]/50 to-[#FFFAF0]" />

        <motion.div
          initial="hidden"
          animate="show"
          variants={staggerContainer}
          className="relative z-20 max-w-5xl mx-auto px-6 text-center mt-12"
        >
          <motion.div
            variants={fadeUp}
            className="mb-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#164AA8]/20 border border-[#164AA8]/30"
          >
            <MapPin className="w-4.5 h-4.5 text-[#DCC9AA]" />
            <span className="text-[#DCC9AA] font-semibold text-xs tracking-[0.2em] uppercase font-jakarta">{lang === 'id' ? 'Hubungi Kami' : 'Contact Us'}</span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="font-playfair text-5xl md:text-7xl font-bold text-white tracking-tight mb-6 leading-tight"
          >
            {pageContent.heroTitle.split(' ').map((word, i, arr) => (
              i === arr.length - 1 ? (
                <span key={i} className="text-transparent bg-clip-text bg-gradient-to-r from-[#DCC9AA] to-[#C8A35A]">{word}</span>
              ) : (
                word + ' '
              )
            ))}
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="text-lg md:text-xl text-white/80 font-jakarta font-light max-w-2xl mx-auto leading-relaxed"
          >
            {pageContent.heroSubtitle}
          </motion.p>

          {pageContent.introText && (
            <motion.p
              variants={fadeUp}
              className="mt-4 text-md text-white/60 font-jakarta font-light max-w-2xl mx-auto leading-relaxed"
            >
              {pageContent.introText}
            </motion.p>
          )}
        </motion.div>

        <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
          <div className="flex flex-col items-center gap-2">
            <span className="text-white/40 text-xs font-jakarta tracking-wider uppercase font-semibold">Scroll</span>
            <ChevronDown className="w-5 h-5 text-white/40 animate-bounce" />
          </div>
        </motion.div>
      </section>

      <section className="max-w-7xl mx-auto px-6 -mt-16 relative z-30">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">

          <div className="lg:col-span-5 space-y-8">
            <ScrollReveal direction="left" once={true}>
              <div className="grid sm:grid-cols-2 gap-4">
                {contacts.map((contact, index) => (
                  <div
                    key={index}
                    className="bg-white/70 backdrop-blur-md p-6 rounded-[2rem] border border-[#C8A35A]/25 shadow-[0_15px_30px_rgba(0,0,0,0.01)] hover:shadow-[0_20px_45px_rgba(200,163,90,0.06)] hover:border-[#C8A35A]/50 group transition-all duration-500 flex flex-col justify-between min-h-[220px]"
                  >
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${contact.color} flex items-center justify-center mb-6 text-[#0A3A8D] group-hover:bg-[#0A3A8D] group-hover:text-white transition-all duration-500 border border-[#C8A35A]/20`}>
                      <contact.icon className="w-5 h-5 group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <div>
                      <h4 className="font-poppins text-[#061B49] text-xs font-bold tracking-wider uppercase mb-2">{contact.label}</h4>
                      <p className="text-neutral-500 font-jakarta font-light text-sm leading-relaxed">{contact.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollReveal>

            <ScrollReveal direction="left" once={true} delay={0.1}>
              <div className="bg-white/70 backdrop-blur-md p-3 rounded-[2.5rem] border border-[#C8A35A]/25 shadow-[0_15px_35px_rgba(0,0,0,0.01)] overflow-hidden h-[360px] relative">
                <div className="relative w-full h-full rounded-[2rem] overflow-hidden border border-neutral-100">
                  {isGoogleMapEmbed ? (
                    <iframe
                      title={lang === 'id' ? 'Peta lokasi Pelita Cemerlang School' : 'Pelita Cemerlang School location map'}
                      src={mapEmbedUrl}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="opacity-90 grayscale hover:grayscale-0 transition-all duration-[1000ms]"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center bg-[#0A3A8D]/5 px-8 text-center">
                      <div>
                        <MapPin className="mx-auto mb-4 h-10 w-10 text-[#C8A35A]" />
                        <p className="font-poppins text-sm font-bold uppercase tracking-[0.16em] text-[#061B49]">
                          {lang === 'id' ? 'Peta belum tersedia' : 'Map unavailable'}
                        </p>
                        <p className="mt-3 font-jakarta text-sm font-light leading-relaxed text-neutral-500">
                          {content.contactInfo.address}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </ScrollReveal>
          </div>

          <div className="lg:col-span-7">
            <ScrollReveal direction="right" once={true}>
              <div className="bg-white/70 backdrop-blur-md rounded-[2.5rem] border border-[#C8A35A]/25 shadow-[0_20px_50px_rgba(0,0,0,0.02)] p-8 sm:p-12 lg:p-14 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-[#164AA8]/3 to-transparent rounded-bl-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />

                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-16"
                  >
                    <div className="w-20 h-20 bg-[#C8A35A]/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-[#C8A35A]/20">
                      <Send className="w-8 h-8 text-[#C8A35A]" />
                    </div>
                    <h3 className="font-playfair text-3xl font-bold text-[#061B49] mb-4">{t('form.success')}</h3>
                    <p className="text-neutral-500 font-jakarta font-light text-base mb-10 max-w-sm mx-auto leading-relaxed">
                      {t('form.successDesc')}
                    </p>
                    <button
                      onClick={() => { setIsSubmitted(false); setFormData({ name: '', email: '', phone: '', subject: '', message: '' }) }}
                      className="inline-flex items-center gap-2.5 px-8 py-4 bg-[#0A3A8D] text-white font-poppins font-semibold text-xs tracking-widest uppercase rounded-2xl hover:bg-[#164AA8] hover:shadow-[0_10px_35px_rgba(10,58,141,0.2)] transition-all duration-300"
                    >
                      {t('form.sendAnother')}
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                    <div className="mb-6">
                      <h3 className="font-playfair text-3xl font-bold text-[#061B49] tracking-tight">{t('form.send')}</h3>
                      <p className="text-neutral-400 font-jakarta font-light text-sm mt-2">{t('form.fill')}</p>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[#061B49] text-xs font-bold tracking-wider uppercase font-poppins">{t('form.name')}</label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full bg-[#FFFAF0]/50 border border-[#C8A35A]/30 rounded-2xl px-5 py-4 text-[#061B49] placeholder-neutral-400 focus:outline-none focus:border-[#0A3A8D] focus:bg-white focus:ring-4 focus:ring-[#0A3A8D]/5 transition-all font-jakarta font-light text-sm"
                          placeholder="John Doe"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-[#061B49] text-xs font-bold tracking-wider uppercase font-poppins">{t('form.email')}</label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full bg-[#FFFAF0]/50 border border-[#C8A35A]/30 rounded-2xl px-5 py-4 text-[#061B49] placeholder-neutral-400 focus:outline-none focus:border-[#0A3A8D] focus:bg-white focus:ring-4 focus:ring-[#0A3A8D]/5 transition-all font-jakarta font-light text-sm"
                          placeholder="johndoe@example.com"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[#061B49] text-xs font-bold tracking-wider uppercase font-poppins">{t('form.phone')}</label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full bg-[#FFFAF0]/50 border border-[#C8A35A]/30 rounded-2xl px-5 py-4 text-[#061B49] placeholder-neutral-400 focus:outline-none focus:border-[#0A3A8D] focus:bg-white focus:ring-4 focus:ring-[#0A3A8D]/5 transition-all font-jakarta font-light text-sm"
                          placeholder="+62 812..."
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-[#061B49] text-xs font-bold tracking-wider uppercase font-poppins">{t('form.subject')}</label>
                        <div className="relative">
                          <select
                            required
                            value={formData.subject}
                            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                            className="w-full bg-[#FFFAF0]/50 border border-[#C8A35A]/30 rounded-2xl px-5 py-4 text-[#061B49] focus:outline-none focus:border-[#0A3A8D] focus:bg-white focus:ring-4 focus:ring-[#0A3A8D]/5 transition-all font-jakarta font-light text-sm appearance-none cursor-pointer"
                          >
                            <option value="" disabled>{t('form.selectService')}</option>
                            <option value="admission">{t('form.serviceAdmission')}</option>
                            <option value="tour">{t('form.serviceTour')}</option>
                            <option value="general">{t('form.serviceGeneral')}</option>
                          </select>
                          <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-400">
                            <ChevronDown className="w-4 h-4" />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[#061B49] text-xs font-bold tracking-wider uppercase font-poppins">{t('form.message')}</label>
                      <textarea
                        required
                        rows={5}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full bg-[#FFFAF0]/50 border border-[#C8A35A]/30 rounded-2xl px-5 py-4 text-[#061B49] placeholder-neutral-400 focus:outline-none focus:border-[#0A3A8D] focus:bg-white focus:ring-4 focus:ring-[#0A3A8D]/5 transition-all font-jakarta font-light text-sm resize-none"
                        placeholder={t('form.messagePlaceholder')}
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full group flex items-center justify-center gap-3 px-8 py-5 bg-[#0A3A8D] text-white font-poppins font-semibold text-xs tracking-widest uppercase rounded-2xl hover:bg-[#164AA8] hover:shadow-[0_10px_35px_rgba(10,58,141,0.2)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <span>{isSubmitting ? t('form.processing') : t('form.send')}</span>
                      {!isSubmitting && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />}
                    </button>

                  </form>
                )}
              </div>
            </ScrollReveal>
          </div>

        </div>
      </section>

    </div>
  )
}
