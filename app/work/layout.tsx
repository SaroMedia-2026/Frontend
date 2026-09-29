import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Work | Portfolio & Case Studies',
  description:
    'Browse our curated portfolio of campaigns, creative assets, digital experiences, and brand growth case studies produced by Saro Media.',
  alternates: {
    canonical: '/work',
  },
  openGraph: {
    title: 'Work & Portfolio | Saro Media',
    description: 'Explore the visual stories, brand identities, and high-ROI campaigns we have crafted.',
    url: 'https://saromedia.com.np/work',
  },
};

export default function WorkLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
