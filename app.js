const express = require("express");
const axios = require("axios");
const cors = require('cors');
const app = express();

const PORT = process.env.PORT || 3000;
// const URLAddress = `http://localhost:${PORT}`;

app.use(cors());

app.get("/", (req, res) => {
  res.json({
    message: "Selamat datang di pemberitahuan gempa"
  })
});

app.get('/gempa', async (req, res) => {
  try {

    const response = await axios.get("https://data.bmkg.go.id/DataMKG/TEWS/autogempa.json");
    res.status(200).json({
      gempa: response.data.Infogempa.gempa
    }
    );

  } catch (error) {
    console.error("Error on:", error);
    res.status(500).json({
      message: "Terjai kesalahan saat mengambil data gempa"
    })
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port : ${PORT}`);
  console.log(`Server running on http://localhost:${PORT}`);
});