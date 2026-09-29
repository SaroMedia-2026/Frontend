import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us | Start Your Project with Saro Media',
  description:
    'Ready to turn your brand into a digital legacy? Get in touch with our team for consultations, project inquiries, and strategic collaborations.',
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    title: 'Contact Saro Media | Inquiries & Consultations',
    description: 'Tell us about your brand vision and let us craft a bespoke growth proposal for you.',
    url: 'https://saromedia.com.np/contact',
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
