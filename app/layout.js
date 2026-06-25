import './globals.css';

export const metadata = {
  title: 'Akbar Rahmat Arifin | Portofolio IT Student & UI/UX Designer',
  description: 'Portofolio profesional Akbar Rahmat Arifin - Mahasiswa Teknik Informatika (Informatics Engineering Student). Keahlian dalam UI/UX Design, Web Development dasar, dan Creative Design.',
  keywords: 'Akbar Rahmat Arifin, Portofolio, Teknik Informatika, UI/UX Design, Web Developer, Universitas Maritim Raja Ali Haji, UMRAH, Indonesia',
  authors: [{ name: 'Akbar Rahmat Arifin' }],
  openGraph: {
    type: 'website',
    title: 'Akbar Rahmat Arifin | Portofolio IT Student & UI/UX Designer',
    description: 'Portofolio profesional Akbar Rahmat Arifin - Mahasiswa Teknik Informatika. Fokus pada UI/UX Design, Web Development dasar, dan Creative Design.',
    images: [{ url: '/assets/og-image.jpg' }],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" style={{ scrollBehavior: 'smooth' }}>
      <body>
        {children}
      </body>
    </html>
  );
}
