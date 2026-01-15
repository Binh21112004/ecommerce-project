// src/scripts/seedData.ts
import "dotenv/config";
import { connectDB } from "../config/db.js";
import { User } from "../models/User.js";
import { Store } from "../models/Store.js";
import { Product } from "../models/Product.js";
import bcrypt from "bcryptjs";

const categories = [
  "Electronics",
  "Fashion",
  "Home & Garden",
  "Sports & Outdoors",
  "Books",
  "Toys & Games",
  "Health & Beauty",
  "Food & Beverages",
];

async function seedDatabase() {
  try {
    await connectDB();

    // Clear existing data
    console.log("🗑️  Clearing existing data...");
    await User.deleteMany({});
    await Store.deleteMany({});
    await Product.deleteMany({});

    // Create password hash
    const passwordHash = await bcrypt.hash("123456", 10);

    // Create buyers
    console.log("👤 Creating buyers...");
    const buyers = await User.create([
      {
        name: "Nguyễn Văn A",
        email: "buyer1@gmail.com",
        passwordHash,
        role: "buyer",
      },
      {
        name: "Trần Thị B",
        email: "buyer2@gmail.com",
        passwordHash,
        role: "buyer",
      },
      {
        name: "Lê Văn C",
        email: "buyer3@gmail.com",
        passwordHash,
        role: "buyer",
      },
    ]);

    // Create sellers with stores
    console.log("🏪 Creating sellers and stores...");
    const sellers = [];
    const stores = [];

    const storesData = [
      {
        sellerName: "Nguyễn Minh Tuấn",
        sellerEmail: "seller1@gmail.com",
        storeName: "TechZone Vietnam",
        storeEmail: "contact@techzone.vn",
        storeCategory: "Electronics",
        description: "Chuyên cung cấp các sản phẩm công nghệ chính hãng",
      },
      {
        sellerName: "Phạm Thu Hà",
        sellerEmail: "seller2@gmail.com",
        storeName: "Fashion House",
        storeEmail: "info@fashionhouse.vn",
        storeCategory: "Fashion",
        description: "Thời trang cao cấp cho mọi lứa tuổi",
      },
      {
        sellerName: "Hoàng Văn Nam",
        sellerEmail: "seller3@gmail.com",
        storeName: "Home Decor Plus",
        storeEmail: "hello@homedecor.vn",
        storeCategory: "Home & Garden",
        description: "Đồ trang trí và nội thất gia đình",
      },
      {
        sellerName: "Đỗ Thị Lan",
        sellerEmail: "seller4@gmail.com",
        storeName: "SportsPro Store",
        storeEmail: "support@sportspro.vn",
        storeCategory: "Sports & Outdoors",
        description: "Thiết bị thể thao chuyên nghiệp",
      },
      {
        sellerName: "Vũ Đức Anh",
        sellerEmail: "seller5@gmail.com",
        storeName: "Book Haven",
        storeEmail: "contact@bookhaven.vn",
        storeCategory: "Books",
        description: "Sách hay cho mọi lứa tuổi",
      },
    ];

    for (const data of storesData) {
      const seller = await User.create({
        name: data.sellerName,
        email: data.sellerEmail,
        passwordHash,
        role: "seller",
      });

      const store = await Store.create({
        name: data.storeName,
        owner: seller._id,
        email: data.storeEmail,
        category: data.storeCategory,
        description: data.description,
        approved: true,
        status: "approved",
      });

      seller.store = store._id;
      await seller.save();

      sellers.push(seller);
      stores.push(store);
    }

    // Create products for each store
    console.log("📦 Creating products...");

    const productsData = [
      // TechZone Vietnam - Electronics
      {
        title: "iPhone 15 Pro Max 256GB",
        price: 29990000,
        compareAtPrice: 32990000,
        brand: "Apple",
        category: "Electronics",
        image: "https://images.unsplash.com/photo-1696446702283-818d05683773?w=500",
        stock: 25,
        rating: { value: 4.8, count: 156 },
        storeIndex: 0,
      },
      {
        title: "Samsung Galaxy S24 Ultra",
        price: 27990000,
        compareAtPrice: 30990000,
        brand: "Samsung",
        category: "Electronics",
        image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=500",
        stock: 30,
        rating: { value: 4.7, count: 142 },
        storeIndex: 0,
      },
      {
        title: "MacBook Pro 14\" M3 Pro",
        price: 52990000,
        compareAtPrice: 55990000,
        brand: "Apple",
        category: "Electronics",
        image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500",
        stock: 15,
        rating: { value: 4.9, count: 89 },
        storeIndex: 0,
      },
      {
        title: "Sony WH-1000XM5 Headphones",
        price: 8990000,
        compareAtPrice: 9990000,
        brand: "Sony",
        category: "Electronics",
        image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=500",
        stock: 45,
        rating: { value: 4.6, count: 234 },
        storeIndex: 0,
      },
      {
        title: "iPad Air M2 128GB",
        price: 16990000,
        compareAtPrice: 18990000,
        brand: "Apple",
        category: "Electronics",
        image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500",
        stock: 20,
        rating: { value: 4.7, count: 167 },
        storeIndex: 0,
      },

      // Fashion House - Fashion
      {
        title: "Áo Sơ Mi Nam Cao Cấp",
        price: 499000,
        compareAtPrice: 699000,
        brand: "The Shirts",
        category: "Fashion",
        image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=500",
        stock: 100,
        rating: { value: 4.5, count: 312 },
        storeIndex: 1,
      },
      {
        title: "Váy Dạ Hội Sang Trọng",
        price: 1299000,
        compareAtPrice: 1799000,
        brand: "Elegant",
        category: "Fashion",
        image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500",
        stock: 50,
        rating: { value: 4.8, count: 89 },
        storeIndex: 1,
      },
      {
        title: "Quần Jeans Nam Skinny Fit",
        price: 599000,
        compareAtPrice: 799000,
        brand: "Denim Pro",
        category: "Fashion",
        image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500",
        stock: 80,
        rating: { value: 4.4, count: 201 },
        storeIndex: 1,
      },
      {
        title: "Giày Sneaker Thể Thao",
        price: 899000,
        compareAtPrice: 1199000,
        brand: "SportStyle",
        category: "Fashion",
        image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500",
        stock: 65,
        rating: { value: 4.6, count: 178 },
        storeIndex: 1,
      },
      {
        title: "Túi Xách Nữ Da Thật",
        price: 1599000,
        compareAtPrice: 2199000,
        brand: "Luxury Bags",
        category: "Fashion",
        image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500",
        stock: 35,
        rating: { value: 4.7, count: 124 },
        storeIndex: 1,
      },

      // Home Decor Plus - Home & Garden
      {
        title: "Sofa 3 Chỗ Vải Bố Hiện Đại",
        price: 8990000,
        compareAtPrice: 11990000,
        brand: "HomeComfort",
        category: "Home & Garden",
        image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500",
        stock: 12,
        rating: { value: 4.8, count: 67 },
        storeIndex: 2,
      },
      {
        title: "Bàn Làm Việc Gỗ Cao Su",
        price: 2990000,
        compareAtPrice: 3990000,
        brand: "WoodCraft",
        category: "Home & Garden",
        image: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=500",
        stock: 25,
        rating: { value: 4.6, count: 89 },
        storeIndex: 2,
      },
      {
        title: "Đèn Trang Trí Phòng Khách",
        price: 799000,
        compareAtPrice: 1099000,
        brand: "LightArt",
        category: "Home & Garden",
        image: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=500",
        stock: 40,
        rating: { value: 4.5, count: 145 },
        storeIndex: 2,
      },
      {
        title: "Bộ Chăn Ga Gối Cotton Cao Cấp",
        price: 1299000,
        compareAtPrice: 1699000,
        brand: "SleepWell",
        category: "Home & Garden",
        image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=500",
        stock: 60,
        rating: { value: 4.7, count: 223 },
        storeIndex: 2,
      },
      {
        title: "Cây Cảnh Phong Thủy",
        price: 399000,
        compareAtPrice: 599000,
        brand: "GreenLife",
        category: "Home & Garden",
        image: "https://images.unsplash.com/photo-1509937528035-ad76254b0356?w=500",
        stock: 75,
        rating: { value: 4.4, count: 156 },
        storeIndex: 2,
      },

      // SportsPro Store - Sports & Outdoors
      {
        title: "Xe Đạp Địa Hình MTB 29 inch",
        price: 12990000,
        compareAtPrice: 15990000,
        brand: "Giant",
        category: "Sports & Outdoors",
        image: "https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?w=500",
        stock: 18,
        rating: { value: 4.7, count: 92 },
        storeIndex: 3,
      },
      {
        title: "Bóng Đá FIFA Quality Pro",
        price: 699000,
        compareAtPrice: 899000,
        brand: "Adidas",
        category: "Sports & Outdoors",
        image: "https://images.unsplash.com/photo-1614632537297-fd6f49f46ed9?w=500",
        stock: 100,
        rating: { value: 4.6, count: 267 },
        storeIndex: 3,
      },
      {
        title: "Vợt Cầu Lông Chuyên Nghiệp",
        price: 2499000,
        compareAtPrice: 2999000,
        brand: "Yonex",
        category: "Sports & Outdoors",
        image: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=500",
        stock: 45,
        rating: { value: 4.8, count: 134 },
        storeIndex: 3,
      },
      {
        title: "Giày Chạy Bộ Marathon",
        price: 1899000,
        compareAtPrice: 2399000,
        brand: "Nike",
        category: "Sports & Outdoors",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500",
        stock: 55,
        rating: { value: 4.7, count: 189 },
        storeIndex: 3,
      },
      {
        title: "Bộ Tạ Tay Điều Chỉnh 24kg",
        price: 1599000,
        compareAtPrice: 1999000,
        brand: "PowerFit",
        category: "Sports & Outdoors",
        image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=500",
        stock: 30,
        rating: { value: 4.5, count: 112 },
        storeIndex: 3,
      },

      // Book Haven - Books
      {
        title: "Đắc Nhân Tâm - Dale Carnegie",
        price: 89000,
        compareAtPrice: 120000,
        brand: "NXB Tổng Hợp",
        category: "Books",
        image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500",
        stock: 200,
        rating: { value: 4.9, count: 1234 },
        storeIndex: 4,
      },
      {
        title: "Nhà Giả Kim - Paulo Coelho",
        price: 79000,
        compareAtPrice: 105000,
        brand: "NXB Hội Nhà Văn",
        category: "Books",
        image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=500",
        stock: 180,
        rating: { value: 4.8, count: 892 },
        storeIndex: 4,
      },
      {
        title: "Sapiens - Lược Sử Loài Người",
        price: 199000,
        compareAtPrice: 250000,
        brand: "NXB Trẻ",
        category: "Books",
        image: "https://images.unsplash.com/photo-1491841573634-28140fc7ced7?w=500",
        stock: 150,
        rating: { value: 4.7, count: 567 },
        storeIndex: 4,
      },
      {
        title: "Atomic Habits - James Clear",
        price: 149000,
        compareAtPrice: 199000,
        brand: "NXB Thế Giới",
        category: "Books",
        image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=500",
        stock: 175,
        rating: { value: 4.9, count: 723 },
        storeIndex: 4,
      },
      {
        title: "Tuổi Trẻ Đáng Giá Bao Nhiêu",
        price: 69000,
        compareAtPrice: 95000,
        brand: "NXB Hội Nhà Văn",
        category: "Books",
        image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=500",
        stock: 220,
        rating: { value: 4.6, count: 456 },
        storeIndex: 4,
      },
    ];

    for (const productData of productsData) {
      const store = stores[productData.storeIndex];
      await Product.create({
        title: productData.title,
        price: productData.price,
        compareAtPrice: productData.compareAtPrice,
        store: store._id,
        brand: productData.brand,
        category: productData.category,
        image: productData.image,
        inStock: productData.stock > 0,
        stock: productData.stock,
        rating: productData.rating,
      });
    }

    console.log("✅ Seed data created successfully!");
    console.log(`📊 Summary:`);
    console.log(`   - Buyers: ${buyers.length}`);
    console.log(`   - Sellers: ${sellers.length}`);
    console.log(`   - Stores: ${stores.length}`);
    console.log(`   - Products: ${productsData.length}`);
    console.log(`\n🔐 Test accounts (password: 123456):`);
    console.log(`   Buyers: buyer1@gmail.com, buyer2@gmail.com, buyer3@gmail.com`);
    console.log(`   Sellers: seller1@gmail.com - seller5@gmail.com`);

    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding data:", error);
    process.exit(1);
  }
}

seedDatabase();
