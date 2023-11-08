require('dotenv').config();
const PORT = process.env.PORT; // Port
const express = require("express");// Connection
const allRoutes = require("./routes");

// Membuat Express App
const app = express();

// Buat nerima Body disaat POST request
app.use(express.json());

// Ambil semua route dari dari dir Routes
app.use(allRoutes);

app.listen(PORT, () => {
  console.log(`Server Running on ${PORT}`);
})