import { Product } from "@/types";

export const PRODUCTS: Product[] = [
  {
    id: "prod-1",
    slug: "bouquet-mawar-rossa-romantis",
    nama: "Bouquet Mawar Rossa Romantis",
    kategori: ["Anniversary", "Ulang Tahun"],
    harga: 185000,
    hargaAsli: 220000,
    rating: 4.9,
    jumlahUlasan: 127,
    label: "Terlaris DISKON",
    gambar: "https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=800&q=80",
    deskripsi:
      "Rangkaian mawar merah segar yang penuh makna cinta dan ketulusan. Cocok untuk mengungkapkan perasaan terdalam kepada orang yang kamu sayang.",
    maknaBunga:
      "Mawar merah telah lama menjadi simbol cinta yang abadi. Setiap kelopaknya menyimpan janji kesetiaan dan kehangatan yang tak lekang oleh waktu.",
    isiPaket: [
      "12 tangkai mawar merah segar pilihan",
      "Dibungkus kertas kraft premium warna nude",
      "Pita satin merah mewah",
      "Kartu ucapan custom gratis",
    ],
    pilihanKustomisasi: [
      "Jumlah bunga (6, 12, 24, 50 tangkai)",
      "Warna pita (Merah, Emas, Pink, Putih)",
      "Pesan di kartu ucapan",
      "Tambah cokelat premium Ferrero Rocher",
    ],
    ulasan: [
      {
        id: "rev-1",
        name: "Aisyah",
        rating: 5,
        date: "2 hari lalu",
        comment:
          "Bunganya cantik sekali! Segar dan packagingnya rapi. Pasti pesan lagi!",
      },
      {
        id: "rev-2",
        name: "Budi",
        rating: 5,
        date: "1 minggu lalu",
        comment:
          "Pengiriman tepat waktu, kondisi bunga masih sangat segar. Recommended!",
      },
      {
        id: "rev-3",
        name: "Citra",
        rating: 4.8,
        date: "2 minggu lalu",
        comment:
          "Buketnya indah sesuai foto. Harga terjangkau untuk kualitas yang sebagus ini.",
      },
    ],
  },
  {
    id: "prod-2",
    slug: "handbouquet-wisuda-pink-dreamy",
    nama: "Handbouquet Wisuda Pink Dreamy",
    kategori: ["Wisuda"],
    harga: 225000,
    rating: 4.8,
    jumlahUlasan: 203,
    label: "Best Seller Wisuda",
    gambar: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=800&q=80",
    deskripsi:
      "Kombinasi buket kelulusan bernuansa pink lembut yang anggun. Dilengkapi bunga baby's breath segar dan aksen pita pastel manis.",
    maknaBunga:
      "Warna pink lembut melambangkan kekaguman, kelembutan, dan apresiasi tulus atas perjuangan dan prestasi kelulusan yang membanggakan.",
    isiPaket: [
      "10 tangkai mawar pink pastel & baby's breath",
      "Kertas wrapping premium korean style water-resistant",
      "Pita satin baby pink",
      "Topper boneka toga wisuda mini + kartu ucapan",
    ],
    pilihanKustomisasi: [
      "Warna tema wrapping (Soft Pink, Lilac, Sage Green)",
      "Pilihan kartu ucapan ucapan selamat gelar",
      "Bordir nama wisudawan di selempang pita",
    ],
    ulasan: [
      {
        id: "rev-4",
        name: "Aisyah R.",
        rating: 5,
        date: "2 hari lalu",
        comment:
          "Buketnya cantik banget! Pas banget buat wisuda aku. Bunganya segar dan packagingnya rapi. Teman-teman pada nanya beli di mana 😍",
      },
      {
        id: "rev-5",
        name: "Dinda S.",
        rating: 4.8,
        date: "3 hari lalu",
        comment:
          "Wrapping rapi banget ala Korea. Bunga tahan seharian selama prosesi wisuda.",
      },
    ],
  },
  {
    id: "prod-3",
    slug: "buket-tulip-pastel-dreamy",
    nama: "Buket Tulip Pastel Dreamy",
    kategori: ["Ulang Tahun", "Anniversary"],
    harga: 165000,
    rating: 4.7,
    jumlahUlasan: 89,
    gambar: "https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?auto=format&fit=crop&w=800&q=80",
    deskripsi:
      "Keindahan bunga tulip pastel yang elegan dan menenangkan. Cocok sebagai hadiah ulang tahun atau ungkapan kasih sayang yang manis.",
    maknaBunga:
      "Tulip pastel adalah lambang kasih sayang murni, rasa hormat, dan doa tulus untuk awal yang baru dan penuh harapan.",
    isiPaket: [
      "7 tangkai tulip pastel segar kualitas import",
      "Kertas cellophane matte elegan",
      "Pita organza lembut",
      "Kartu ucapan kaligrafi cetak",
    ],
    pilihanKustomisasi: [
      "Pilihan warna tulip (Pink, Kuning Pastel, Putih)",
      "Pesan khusus di amplop lilin segel",
    ],
    ulasan: [
      {
        id: "rev-6",
        name: "Fadhil",
        rating: 5,
        date: "5 hari lalu",
        comment:
          "Pacar saya suka sekali tulip pastelnya! Masih kuncup segar saat sampai.",
      },
    ],
  },
  {
    id: "prod-4",
    slug: "bouquet-sunflower-ceria",
    nama: "Bouquet Sunflower Ceria",
    kategori: ["Ucapan", "Ulang Tahun"],
    harga: 145000,
    rating: 4.6,
    jumlahUlasan: 56,
    gambar: "https://images.unsplash.com/photo-1597848212624-a19eb35e2651?auto=format&fit=crop&w=800&q=80",
    deskripsi:
      "Bunga matahari mekar cerah yang memancarkan energi positif, kebahagiaan, dan kehangatan untuk hari istimewa sahabat atau keluarga.",
    maknaBunga:
      "Bunga matahari melambangkan keceriaan, loyalitas tanpa syarat, dan semangat untuk selalu menatap masa depan yang terang benderang.",
    isiPaket: [
      "3 kuntum sunflower mekar besar + daun eucalyptus segar",
      "Wrapping kertas cokelat kraft natural",
      "Tali rami aesthetic + pita kuning cerah",
      "Kartu ucapan custom",
    ],
    pilihanKustomisasi: [
      "Pesan motivasi atau doa di kartu",
      "Tambah balon foil mini ucapan",
    ],
    ulasan: [
      {
        id: "rev-7",
        name: "Gita",
        rating: 4.7,
        date: "1 minggu lalu",
        comment:
          "Warnanya bener-bener cerah dan bikin yang nerima langsung senyum lebar!",
      },
    ],
  },
  {
    id: "prod-5",
    slug: "handbouquet-wisuda-classic-white",
    nama: "Handbouquet Wisuda Classic White",
    kategori: ["Wisuda", "Pernikahan"],
    harga: 195000,
    rating: 4.8,
    jumlahUlasan: 142,
    label: "Pilihan Elegan",
    gambar: "https://images.unsplash.com/photo-1508610048659-a06b669e3321?auto=format&fit=crop&w=800&q=80",
    deskripsi:
      "Rangkaian mawar putih murni dan dedaunan eucalyptus pilihan yang memberikan nuansa klasik, bersih, dan berkelas tinggi.",
    maknaBunga:
      "Mawar putih melambangkan ketulusan hati, kesucian niat, dan penghormatan terdalam dalam momen bersejarah.",
    isiPaket: [
      "10 tangkai mawar putih holland segar",
      "Daun eucalyptus cinerea wangi",
      "Wrapping putih mutiara semi-transparan",
      "Pita sutra putih gading + kartu ucapan",
    ],
    pilihanKustomisasi: [
      "Warna pita (Putih, Silver, Emas lembut)",
      "Kartu ucapan kaligrafi",
    ],
    ulasan: [
      {
        id: "rev-8",
        name: "Hendra",
        rating: 5,
        date: "2 minggu lalu",
        comment:
          "Sangat cocok untuk foto wisuda dan resepsi. Tampak mewah dan tahan lama.",
      },
    ],
  },
  {
    id: "prod-6",
    slug: "buket-mawar-putih-duka",
    nama: "Buket Mawar Putih Duka",
    kategori: ["Bela Sungkawa", "Pernikahan"],
    harga: 175000,
    rating: 4.7,
    jumlahUlasan: 34,
    gambar: "https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?auto=format&fit=crop&w=800&q=80",
    deskripsi:
      "Rangkaian bunga putih tenang untuk menyampaikan ungkapan belasungkawa, simpati yang tulus, dan doa penghiburan bagi keluarga yang berduka.",
    maknaBunga:
      "Bunga putih dalam momen duka cita adalah lambang doa ketenangan jiwa, kepedulian mendalam, dan kedamaian abadi.",
    isiPaket: [
      "Rangkaian mawar putih, krisan putih, dan daun pakis",
      "Wrapping monokrom tenang dengan pita hitam/putih",
      "Kartu ucapan simpati bertulisan belasungkawa resmi",
    ],
    pilihanKustomisasi: [
      "Pita belasungkawa cetak nama pengirim",
      "Pesan penghiburan khusus di kartu duka",
    ],
    ulasan: [
      {
        id: "rev-9",
        name: "Keluarga Gunawan",
        rating: 5,
        date: "3 minggu lalu",
        comment:
          "Pengiriman sangat cepat dan tepat waktu ke rumah duka. Karangannya rapi dan sopan.",
      },
    ],
  },
  {
    id: "prod-7",
    slug: "bouquet-mix-pastel-romantis",
    nama: "Bouquet Mix Pastel Romantis",
    kategori: ["Ulang Tahun", "Anniversary"],
    harga: 155000,
    rating: 4.7,
    jumlahUlasan: 78,
    gambar: "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80",
    deskripsi:
      "Paduan manis aneka bunga bernuansa pastel lembut yang menyegarkan pandangan dan membangkitkan suasana hati bahagia.",
    maknaBunga:
      "Perpaduan warna pastel mencerminkan keharmonisan hubungan, keramahan, dan kelembutan kasih yang tulus tanpa pamrih.",
    isiPaket: [
      "Kombinasi mawar pastel, carnation lembut, dan gomphrena",
      "Wrapping kertas lilac & pink pastel kombinasi",
      "Pita satin pastel ganda + kartu ucapan",
    ],
    pilihanKustomisasi: [
      "Warna dominan buket (Pink / Ungu Lilac / Peach)",
      "Kartu ucapan custom",
    ],
    ulasan: [
      {
        id: "rev-10",
        name: "Larasati",
        rating: 4.8,
        date: "4 hari lalu",
        comment:
          "Warnanya gemas banget! Wangi bunganya juga alami dan tidak layu.",
      },
    ],
  },
  {
    id: "prod-8",
    slug: "handbouquet-premium-rose-gold",
    nama: "Handbouquet Premium Rose Gold",
    kategori: ["Anniversary", "Pernikahan"],
    harga: 285000,
    hargaAsli: 320000,
    rating: 4.9,
    jumlahUlasan: 61,
    label: "Premium DISKON",
    gambar: "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=800&q=80",
    deskripsi:
      "Buket eksklusif berukuran besar dengan paduan mawar premium impor, sentuhan emas mewah, dan kemasan eksklusif berkilau.",
    maknaBunga:
      "Kombinasi mawar impor dan rose gold melambangkan cinta yang berharga, penghormatan tinggi, dan kemegahan momen spesial.",
    isiPaket: [
      "18 tangkai mawar premium pilihan dengan kelopak tebal",
      "Wrapping metalik rose gold eksklusif",
      "Pita beludru burgundy dengan aksen gold",
      "Kotak kartu ucapan embossed mewah",
    ],
    pilihanKustomisasi: [
      "Pilihan 18 hingga 36 tangkai",
      "Tambah lampu LED fairy lights terpasang di buket",
      "Pesan khusus berlapis laminasi emas",
    ],
    ulasan: [
      {
        id: "rev-11",
        name: "Rian P.",
        rating: 5,
        date: "1 minggu lalu",
        comment:
          "Buket paling mewah yang pernah saya pesan. Istri saya sangat terharu saat anniversary ke-5.",
      },
    ],
  },
];
