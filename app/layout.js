import './globals.css';
import { Outfit, Playfair_Display } from 'next/font/google';
import { CartProvider } from '@/lib/cart-context';
import { AuthProvider } from '@/lib/auth-context';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Toaster } from 'sonner';

const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit', display: 'swap' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair', display: 'swap' });

export const metadata = {
  title: 'Avani Organics — Pure. Organic. From the Earth.',
  description: 'Premium organic grocery from Karnataka farmers. 100% organic rice, millets, pulses, oils, spices and superfoods. Direct farm-to-home.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${outfit.variable} ${playfair.variable}`}>
      <body className="min-h-screen bg-cream text-forest font-sans">
        <AuthProvider>
          <CartProvider>
            <Navbar />
            <main className="min-h-[60vh]">{children}</main>
            <Footer />
            <Toaster position="top-center" richColors />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
