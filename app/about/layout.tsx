import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us | The Minds Behind Saro Media',
  description:
    'Learn about Saro Media, our leadership, our creative philosophy, and how we engineer compounding growth for ambitious brands in Nepal and worldwide.',
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    title: 'About Saro Media | Creative Digital Marketing Agency',
    description: 'Learn about our team, our mission, and our data-backed creative process.',
    url: 'https://saromedia.com.np/about',
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
