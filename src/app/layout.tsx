import './globals.css';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
export const metadata = {
  title: 'My Blog',
  description: 'A modern blog built with Next.js and Tailwind CSS',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white text-black dark:bg-gray-900 dark:text-white transition-colors">
        <Navbar />
        <main className="flex-grow max-w-4xl mx-auto p-9">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
