const seedData = [
  {
    name: "Ürün 1",
    description: "Bu ürün harika bir açıklamaya sahiptir.",
    price: 49.99,
    stock: 20,
    category: "Elektronik",
    rating: 4.5,
    image: [
      {
        public_id: "image1",
        url: "https://example.com/image1.jpg"
      }
    ],
    user: "655aa275b6f66e19c9114f67", // Yukarıdaki örnek kullanıcı kimliği
    reviews: [
      {
        user: "655aa275b6f66e19c9114f67", // Aynı kullanıcı kimliği
        name: "Kullanıcı 1",
        comment: "Ürün gerçekten harika!",
        rating: 5
      },
      {
        user: "655aa275b6f66e19c9114f67", // Aynı kullanıcı kimliği
        name: "Kullanıcı 2",
        comment: "Fiyat performans ürünü.",
        rating: 4
      }
    ]
  },
  {
    name: "Ürün 2",
    description: "Bu ürünün özellikleri çok çeşitlidir.",
    price: 79.99,
    stock: 15,
    category: "Ev & Yaşam",
    rating: 4.2,
    image: [
      {
        public_id: "image2",
        url: "https://example.com/image2.jpg"
      }
    ],
    user: "655aa275b6f66e19c9114f67", // Yukarıdaki örnek kullanıcı kimliği
    reviews: [
      {
        user: "655aa275b6f66e19c9114f67", // Aynı kullanıcı kimliği
        name: "Kullanıcı 3",
        comment: "Fiyatına göre çok kaliteli.",
        rating: 4.5
      },
      {
        user: "655aa275b6f66e19c9114f67", // Aynı kullanıcı kimliği
        name: "Kullanıcı 4",
        comment: "Beklediğimden daha iyi çıktı.",
        rating: 4
      }
    ]
  },
  
];

module.exports = seedData;
  