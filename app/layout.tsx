import { Roboto } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';
import { ModalProvider } from './context/ModalContext'; 

const roboto = Roboto({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  variable: '--font-roboto',
  display: 'swap',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={roboto.variable}>
        <TanStackProvider>
          <ModalProvider>
            <div className="layout">
              <Header />
              {children}
              <Footer />
            </div>
          </ModalProvider>
        </TanStackProvider>
      </body>
    </html>
  );
}