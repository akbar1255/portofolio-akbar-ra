import { list, put } from '@vercel/blob';
import fs from 'fs';
import path from 'path';

const LOCAL_CONTENT_PATH = path.join(process.cwd(), 'portfolio-content.json');
const LOCAL_MESSAGES_PATH = path.join(process.cwd(), 'portfolio-messages.json');

const defaultSeedData = {
  profile: {
    name: "Akbar Rahmat Arifin",
    role: "Informatics Engineering Student",
    subtitle_roles: ["Informatics Engineering Student", "UI/UX Designer", "Front-End Developer", "Creative Designer"],
    location: "Tanjung Pinang, Kepri",
    about_lead: "Saya adalah mahasiswa aktif Teknik Informatika di Universitas Maritim Raja Ali Haji (UMRAH) angkatan 2023.",
    about_text: "Ketertarikan saya yang kuat pada teknologi digital mendorong saya untuk terus belajar dan mendalami UI/UX design, pengembangan web dasar, editing video/gambar, serta manajemen dokumen digital.",
    about_text2: "Saya memiliki antusiasme tinggi untuk terus berkembang, cepat beradaptasi dengan teknologi baru, serta bersemangat untuk memberikan kontribusi nyata dalam proyek inovatif.",
    about_philosophy: "\"Menulis kode yang bersih, terdokumentasi dengan baik, dan mudah dipelihara adalah bentuk tanggung jawab moral seorang developer kepada masa depan produk.\"",
    stat_college_year: "2023",
    stat_projects: "3",
    stat_skills: "5+",
    stat_college_year_label: "Tahun Masuk Kuliah",
    stat_projects_label: "Proyek Akademik",
    stat_skills_label: "Kategori Keahlian",
    email: "aarifin@student.umrah.ac.id",
    phone: "+62 812-7038-8388",
    github: "https://github.com/akbar1255",
    linkedin: "https://www.linkedin.com/in/akbar-rahmat-456a39288?utm_source=share_via&utm_content=profile&utm_medium=member_android",
    avatar: "/assets/avatar.png"
  },
  skills: [
    { id: 1, category: "Design & Creative", name: "UI/UX Design (Figma)", icon: "fa-palette" },
    { id: 2, category: "Design & Creative", name: "Video Editing", icon: "fa-palette" },
    { id: 3, category: "Design & Creative", name: "Image Editing (Adobe Photoshop/Canva)", icon: "fa-palette" },
    { id: 4, category: "Web Development", name: "HTML", icon: "fa-code" },
    { id: 5, category: "Web Development", name: "CSS", icon: "fa-code" },
    { id: 6, category: "Web Development", name: "JavaScript", icon: "fa-code" },
    { id: 7, category: "Web Development", name: "Basic Programming", icon: "fa-code" },
    { id: 8, category: "Productivity", name: "Microsoft Word", icon: "fa-list-check" },
    { id: 9, category: "Productivity", name: "Microsoft Excel", icon: "fa-list-check" },
    { id: 10, category: "Productivity", name: "Microsoft PowerPoint", icon: "fa-list-check" },
    { id: 11, category: "Soft Skills", name: "Creativity", icon: "fa-users" },
    { id: 12, category: "Soft Skills", name: "Teamwork", icon: "fa-users" },
    { id: 13, category: "Soft Skills", name: "Communication", icon: "fa-users" },
    { id: 14, category: "Soft Skills", name: "Adaptability", icon: "fa-users" },
    { id: 15, category: "Soft Skills", name: "Problem Solving", icon: "fa-users" },
    { id: 16, category: "Languages", name: "Indonesian (Native)", icon: "fa-language" },
    { id: 17, category: "Languages", name: "English (Intermediate)", icon: "fa-language" }
  ],
  projects: [
    {
      id: 1,
      title: "PS Rental Management Dashboard",
      description: "Sistem dashboard untuk manajemen rental PlayStation. Fitur meliputi manajemen data pelanggan, pencatatan transaksi, pemantauan status penggunaan PS, serta summary data administrasi secara real-time.",
      category: "Dashboard / Web App",
      tech_stack: ["HTML", "CSS", "JavaScript", "Admin Panel"],
      github_url: "https://github.com",
      demo_url: "#",
      icon_class: "fa-gamepad",
      gradient_class: "p-glow-1"
    },
    {
      id: 2,
      title: "Hide and Seek Mini Game",
      description: "Game interaktif petak umpet berbasis web. Dilengkapi karakter dan objek interaktif, sistem pencarian target yang menantang, serta antarmuka game dinamis yang ditenagai oleh logika JavaScript.",
      category: "Web Game",
      tech_stack: ["HTML5", "CSS3", "JavaScript", "Game Logic"],
      github_url: "https://github.com",
      demo_url: "#",
      icon_class: "fa-ghost",
      gradient_class: "p-glow-2"
    },
    {
      id: 3,
      title: "Financial Tracker Mobile App",
      description: "Aplikasi mobile untuk membantu pencatatan dan pemantauan pemasukan/pengeluaran harian. Memiliki fitur saldo kumulatif, riwayat transaksi terperinci, serta ringkasan dasbor finansial sederhana.",
      category: "Mobile App / UI",
      tech_stack: ["UI/UX Design", "Figma", "Mobile Layout", "Financial Dashboard"],
      github_url: "https://github.com",
      demo_url: "#",
      icon_class: "fa-wallet",
      gradient_class: "p-glow-3"
    }
  ],
  education: [
    {
      id: 1,
      title: "S1 Teknik Informatika",
      institution: "Universitas Maritim Raja Ali Haji (UMRAH)",
      period: "2023 - Sekarang",
      description: "Mahasiswa aktif program studi Teknik Informatika. Mempelajari konsep dasar pemrograman, basis data, struktur data, UI/UX design, serta metodologi pengembangan perangkat lunak secara akademis."
    }
  ],
  experiences: [
    {
      id: 1,
      title: "PS Rental Management Dashboard",
      description: "Sistem dashboard untuk manajemen rental PlayStation. Fitur meliputi manajemen data pelanggan, pencatatan transaksi, pemantauan status penggunaan PS, serta summary data administrasi secara real-time.",
      tech_stack: ["HTML", "CSS", "JavaScript", "Admin Panel"]
    },
    {
      id: 2,
      title: "Hide and Seek Mini Game",
      description: "Game interaktif petak umpet berbasis web. Dilengkapi karakter dan objek interaktif, sistem pencarian target yang menantang, serta antarmuka game dinamis yang ditenagai oleh logika JavaScript.",
      tech_stack: ["HTML5", "CSS3", "JavaScript", "Game Logic"]
    },
    {
      id: 3,
      title: "Financial Tracker Mobile App",
      description: "Aplikasi mobile untuk membantu pencatatan dan pemantauan pemasukan/pengeluaran harian. Memiliki fitur saldo kumulatif, riwayat transaksi terperinci, serta ringkasan dasbor finansial sederhana.",
      tech_stack: ["UI/UX Design", "Figma", "Mobile Layout", "Financial Dashboard"]
    }
  ]
};

export async function getContent() {
  if (process.env.VERCEL !== '1' && !process.env.BLOB_READ_WRITE_TOKEN) {
    if (fs.existsSync(LOCAL_CONTENT_PATH)) {
      try {
        const content = fs.readFileSync(LOCAL_CONTENT_PATH, 'utf-8');
        return JSON.parse(content);
      } catch (e) {
        console.error("Failed to read local content JSON", e);
      }
    }
    return defaultSeedData;
  }

  try {
    const { blobs } = await list({ prefix: 'portfolio-content.json' });
    if (blobs.length > 0) {
      const res = await fetch(blobs[0].url, { cache: 'no-store' });
      return await res.json();
    }
  } catch (e) {
    console.error("Vercel Blob getContent failed, using seed", e);
  }
  return defaultSeedData;
}

export async function saveContent(data) {
  if (process.env.VERCEL !== '1' && !process.env.BLOB_READ_WRITE_TOKEN) {
    fs.writeFileSync(LOCAL_CONTENT_PATH, JSON.stringify(data, null, 2), 'utf-8');
    return { url: 'local' };
  }

  return await put('portfolio-content.json', JSON.stringify(data), {
    access: 'public',
    addRandomSuffix: false
  });
}

export async function getMessages() {
  if (process.env.VERCEL !== '1' && !process.env.BLOB_READ_WRITE_TOKEN) {
    if (fs.existsSync(LOCAL_MESSAGES_PATH)) {
      try {
        const content = fs.readFileSync(LOCAL_MESSAGES_PATH, 'utf-8');
        return JSON.parse(content);
      } catch (e) {
        console.error("Failed to read local messages JSON", e);
      }
    }
    return [];
  }

  try {
    const { blobs } = await list({ prefix: 'portfolio-messages.json' });
    if (blobs.length > 0) {
      const res = await fetch(blobs[0].url, { cache: 'no-store' });
      return await res.json();
    }
  } catch (e) {
    console.error("Vercel Blob getMessages failed", e);
  }
  return [];
}

export async function saveMessages(messages) {
  if (process.env.VERCEL !== '1' && !process.env.BLOB_READ_WRITE_TOKEN) {
    fs.writeFileSync(LOCAL_MESSAGES_PATH, JSON.stringify(messages, null, 2), 'utf-8');
    return { url: 'local' };
  }

  return await put('portfolio-messages.json', JSON.stringify(messages), {
    access: 'public',
    addRandomSuffix: false
  });
}
