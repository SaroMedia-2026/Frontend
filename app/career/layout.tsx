import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Careers | Join the Saro Media Team',
  description:
    'Join our fast-growing collective of marketers, creatives, video editors, and digital strategists. View current openings and apply to Saro Media.',
  alternates: {
    canonical: '/career',
  },
  openGraph: {
    title: 'Careers at Saro Media | Creative Jobs in Kathmandu, Nepal',
    description: 'We are always looking for passionate storytellers, editors, and growth marketers. Join us.',
    url: 'https://saromedia.com.np/career',
  },
};

export default function CareerLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
