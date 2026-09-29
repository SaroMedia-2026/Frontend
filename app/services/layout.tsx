import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Services | Full-Funnel Digital Growth & Production',
  description:
    'From paid media management and high-converting creative testing to cinematic video production and brand design — explore Saro Media capabilities.',
  alternates: {
    canonical: '/services',
  },
  openGraph: {
    title: 'Services | Saro Media Digital Agency',
    description: 'Comprehensive digital marketing, video production, and performance creative services.',
    url: 'https://saromedia.com.np/services',
  },
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
