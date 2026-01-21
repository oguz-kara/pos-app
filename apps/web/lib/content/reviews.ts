export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  content: string;
  service?: string;
}

export const CUSTOMER_REVIEWS: Review[] = [
  {
    id: "1",
    author: "Adil Kandaş",
    rating: 5,
    date: "2024-12-21",
    content:
      "Bahçeme renk katmak için geldim, çalışanlar hangi çiçek fidanı nereye olur tek tek anlattı. Sardunyalar efsane sağlıklıydı. Evka3'te böyle ilgili bir işletme bulmak güzel ya.",
    service: "Çiçekçi",
  },
  {
    id: "2",
    author: "Yiğit Çatalkaya",
    rating: 5,
    date: "2024-12-21",
    content:
      "Yerinden gidip Erik fidanı aldım, çok ilgili davrandılar. Hangi ortamda daha iyi yetişeceği konusunda detaylı bilgi verdiler. Aldığım fidanlar diri ve bakımlı çıktı, çok memnun kaldım. Tavsiye ederim!",
    service: "Fidanlık",
  },
  {
    id: "3",
    author: "Zeynep Demir",
    rating: 5,
    date: "2024-12-21",
    content:
      "Rahmetli hasan amcanın yeri şuan eşi gülsüm teyze işletiyor evka3 de hırdavattan çiçeğe ve fidana her şey var kaliteli bir dükkan tavsiye ederim.",
    service: "Genel",
  },
  {
    id: "4",
    author: "Dicle Kalioğlu",
    rating: 5,
    date: "2024-12-21",
    content:
      "Çiçek toprağı almaya gelmiştim, yanına ufak bi iki hırdavat ürünü de ekledim ama asıl olay fidanlar. Aldığım zeytin fidanı çok iyi durumda, yaprakları bile dökülmeden eve geldi. Bornova'da böyle işletme bulmak zor.",
    service: "Fidanlık",
  },
  {
    id: "5",
    author: "Fatma Gürokur",
    rating: 5,
    date: "2024-12-21",
    content:
      "Kaliteli ürünler aradığınız herşeyi bulabilirsiniz mevsimine göre fidanlar salon çiçekleri güzel hizmet ve güler yüzlü herkes herzaman eksiğimizi aldığımız ilk yer 🙏🏻",
    service: "Genel",
  },
];

export const GOOGLE_PLACE_ID = "kara-ticaret"; // Google Business Profile ID
export const GOOGLE_REVIEW_URL = "https://www.google.com/search?q=kara+ticaret&newwindow=1&sca_esv=151c323f417ae83f&authuser=2#lrd=0x14bbd862e338da69:0xd53b73fa5b74ce69,3"; // Direct link to reviews
