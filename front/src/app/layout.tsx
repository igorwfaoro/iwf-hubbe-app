import '../styles/globals.scss';
import dayjs from 'dayjs';
import { ReactNode } from 'react';
import { Metadata } from 'next';
import { locale } from '../util/locale';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import ToastProvider from '../contexts/ToastContext';

dayjs.locale(locale.id);

export const metadata: Metadata = {
  title: 'IWF Eventy App'
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang={locale.id}>
      <body>
        <ToastProvider>
          <Navbar />
          <>{children}</>
          <Footer />
        </ToastProvider>
      </body>
    </html>
  );
}
