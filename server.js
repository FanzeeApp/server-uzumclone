const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

// Mahsulot modelini yaratish
const Product = require("./models/Product"); // Mahsulot modelini yaratganingizni taxmin qilaman

const app = express();

// JSON formatda so'rovni qabul qilish uchun body-parser
app.use(bodyParser.json());

// MongoDB bilan ulanish
mongoose
  .connect("mongodb://localhost:27017/yourDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDBga ulanish muvaffaqiyatli"))
  .catch((err) => console.log(err));

// Mahsulot qo'shish uchun API endpoint
app.post("/api/products", async (req, res) => {
  try {
    const { image, title, description, price, rate } = req.body;

    // Yangi mahsulot yaratish
    const newProduct = new Product({
      image,
      title,
      description,
      price,
      rate,
    });

    // Mahsulotni saqlash
    await newProduct.save();

    res.status(201).json(newProduct); // Mahsulotni qaytarish
  } catch (error) {
    res.status(400).json({ message: "Xato yuz berdi", error });
  }
});

// Serverni ishga tushurish
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server ${PORT}-portda ishlamoqda`);
});
