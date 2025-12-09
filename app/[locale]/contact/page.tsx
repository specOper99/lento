'use client';

import { CarpetPattern } from '@/components/patterns/CarpetPattern';
import { Divider } from '@/components/patterns/Divider';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import { Facebook, Instagram, Mail, MapPin, Phone, Send, Twitter } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import React, { useState } from 'react';

export default function ContactPage() {
  const { locale } = useParams<{ locale: string }>();
  const t = useTranslations('contact');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate form submission
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setStatus('idle'), 3000);
    }, 1000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook', color: 'hover:text-blue-600' },
    { icon: Instagram, href: '#', label: 'Instagram', color: 'hover:text-pink-600' },
    { icon: Twitter, href: '#', label: 'Twitter', color: 'hover:text-sky-600' },
  ];

  return (
    <div className="w-full">
      {/* Header */}
      <section className="bg-gradient-to-b from-muted/50 to-background py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <CarpetPattern variant="geometric" className="w-full h-full" />
        </div>

        <div className="container-custom text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-amiri font-bold mb-4">
            {t('title')}
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </div>
      </section>

      <Divider variant="ornate" />

      {/* Contact Form & Info */}
      <section className="py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="relative p-8 bg-muted/30 rounded-lg ornate-border">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold mb-2">
                    {t('form.name')}
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className={cn(
                      'w-full px-4 py-3 rounded-lg border-2 border-border/30',
                      'bg-background text-foreground',
                      'focus:outline-none focus:border-secondary',
                      'transition-colors'
                    )}
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold mb-2">
                    {t('form.email')}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className={cn(
                      'w-full px-4 py-3 rounded-lg border-2 border-border/30',
                      'bg-background text-foreground',
                      'focus:outline-none focus:border-secondary',
                      'transition-colors'
                    )}
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-semibold mb-2">
                    {t('form.subject')}
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className={cn(
                      'w-full px-4 py-3 rounded-lg border-2 border-border/30',
                      'bg-background text-foreground',
                      'focus:outline-none focus:border-secondary',
                      'transition-colors'
                    )}
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold mb-2">
                    {t('form.message')}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className={cn(
                      'w-full px-4 py-3 rounded-lg border-2 border-border/30',
                      'bg-background text-foreground',
                      'focus:outline-none focus:border-secondary',
                      'transition-colors resize-none'
                    )}
                  />
                </div>

                {status === 'success' && (
                  <div className="p-4 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-200 rounded-lg">
                    {t('form.success')}
                  </div>
                )}

                {status === 'error' && (
                  <div className="p-4 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200 rounded-lg">
                    {t('form.error')}
                  </div>
                )}

                <Button type="submit" size="lg" variant="primary" className="w-full">
                  <Send className={`w-5 h-5 ${locale === 'ar' ? 'ml-2' : 'mr-2'}`} />
                  {t('form.submit')}
                </Button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              {/* Contact Details */}
              <div className="p-8 bg-muted/30 rounded-lg">
                <h2 className="text-2xl font-amiri font-bold mb-6">{t('contactInfo')}</h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <MapPin className="w-6 h-6 text-secondary mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-1">{t('info.address')}</h3>
                      <p className="text-muted-foreground">
                        {t('details.address')}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Phone className="w-6 h-6 text-secondary mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-1">{t('info.phone')}</h3>
                      <p className="text-muted-foreground">{t('details.phone')}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Mail className="w-6 h-6 text-secondary mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-1">{t('info.email')}</h3>
                      <p className="text-muted-foreground">{t('details.email')}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="p-8 bg-muted/30 rounded-lg">
                <h2 className="text-2xl font-amiri font-bold mb-6">{t('social')}</h2>
                <div className="flex gap-4">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        'p-4 rounded-full bg-background hover:bg-primary hover:text-primary-foreground',
                        'transition-all hover:scale-110 shadow-md',
                        social.color
                      )}
                      aria-label={social.label}
                    >
                      <social.icon className="w-6 h-6" />
                    </a>
                  ))}
                </div>
              </div>

              {/* Decorative Pattern */}
              <div className="flex justify-center opacity-30">
                <CarpetPattern variant="medallion" size={200} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
