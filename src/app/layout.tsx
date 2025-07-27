import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'FerraTech - Ferramentas Profissionais',
    template: '%s | FerraTech'
  },
  description: 'A maior loja de ferramentas profissionais do Brasil. Encontre furadeiras, serras, esmerilhadeiras e muito mais com qualidade e preços competitivos.',
  keywords: ['ferramentas', 'furadeiras', 'serras', 'esmerilhadeiras', 'ferramentas elétricas', 'construção'],
  authors: [{ name: 'FerraTech' }],
  creator: 'FerraTech',
  publisher: 'FerraTech',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://ferratech.shop'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://ferratech.shop',
    title: 'FerraTech - Ferramentas Profissionais',
    description: 'A maior loja de ferramentas profissionais do Brasil.',
    siteName: 'FerraTech',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FerraTech - Ferramentas Profissionais',
    description: 'A maior loja de ferramentas profissionais do Brasil.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen bg-gray-50">
        {children}
      </body>
    </html>
  );
} 