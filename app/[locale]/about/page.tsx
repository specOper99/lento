import { CarpetPattern } from '@/components/patterns/CarpetPattern';
import { Divider } from '@/components/patterns/Divider';
import { getTranslations } from 'next-intl/server';

interface AboutPageProps {
  params: Promise<{ locale: string }>;
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { locale } = await params;
  const t = await getTranslations('about');

  return (
    <div className="w-full">
      {/* Header */}
      <section className="bg-gradient-to-b from-muted/50 to-background py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <CarpetPattern variant="geometric" className="w-full h-full" />
        </div>

        <div className="container-custom text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-amiri font-bold mb-6">
            {t('title')}
          </h1>
          <div className="max-w-3xl mx-auto">
            <CarpetPattern variant="medallion" size={100} className="mx-auto mb-6 opacity-60" />
          </div>
        </div>
      </section>

      <Divider variant="ornate" />

      {/* Our Story */}
      <section className="py-20">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-amiri font-bold text-center mb-8">
              {t('story')}
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed text-center mb-12">
              {t('storyText')}
            </p>

            <div className="relative p-8 bg-muted/50 rounded-lg ornate-border">
              <div className="absolute top-4 right-4 opacity-20">
                <CarpetPattern variant="diamond" size={80} />
              </div>
              <h3 className="text-2xl md:text-3xl font-amiri font-bold mb-4 text-secondary">
                {t('mission')}
              </h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {t('missionText')}
              </p>
            </div>
          </div>
        </div>
      </section>

      <Divider variant="ornate" />

      {/* Our Values */}
      <section className="py-20 bg-muted/30 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <CarpetPattern variant="border" className="w-full h-full" />
        </div>

        <div className="container-custom relative z-10">
          <h2 className="text-3xl md:text-5xl font-amiri font-bold text-center mb-16">
            {t('values')}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {['quality', 'tradition', 'craftsmanship'].map((value, index) => (
              <div
                key={value}
                className="relative p-8 bg-background rounded-lg ornate-border hover:shadow-2xl transition-all hover:-translate-y-2 animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="absolute top-4 right-4 opacity-10">
                  <CarpetPattern variant="medallion" size={60} />
                </div>
                <div className="relative z-10">
                  <h3 className="text-3xl font-amiri font-bold text-primary mb-4">
                    {t(value)}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {t(`${value}Text`)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Craftsmanship Process */}
      <section className="py-20">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center space-y-12">
            <h2 className="text-3xl md:text-5xl font-amiri font-bold">
              {t('process.title')}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { step: '1', key: 'step1' },
                { step: '2', key: 'step2' },
                { step: '3', key: 'step3' },
                { step: '4', key: 'step4' },
              ].map((item, index) => (
                <div
                  key={item.step}
                  className="relative p-6 animate-slide-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="text-6xl font-amiri font-bold text-secondary/20 mb-4">
                    {item.step}
                  </div>
                  <h4 className="text-xl font-amiri font-bold mb-2">{t(`process.${item.key}.title`)}</h4>
                  <p className="text-sm text-muted-foreground">{t(`process.${item.key}.desc`)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
