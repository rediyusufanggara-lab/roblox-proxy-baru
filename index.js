const express = require("express");
const https = require("https");
const app = express();

app.get("/catalog", (req, res) => {
  try {
    const query = req.query.q || "hat"; 
    const limit = req.query.limit || 30;  
    const cursor = req.query.cursor || ""; 

    // URL murni menggunakan concatenating (+), dijamin bebas dari error tanda petik JavaScript
    let robloxUrl = "https://roblox.com/v1/search/items/details?keyword=" + encodeURIComponent(query) + "&limit=" + limit;
    
    if (cursor !== "") {
      robloxUrl += "&cursor=" + cursor;
    }

    https.get(robloxUrl, {
      headers: { "User-Agent": "RobloxCatalogProxy" }
    }, (robloxRes) => {
      let data = "";

      robloxRes.on("data", (chunk) => {
        data += chunk;
      });

      robloxRes.on("end", () => {
        try {
          const jsonData = JSON.parse(data);
          res.json(jsonData);
        } catch (e) {
          res.status(500).json({ error: "Gagal memproses data dari Roblox" });
        }
      });

    }).on("error", (err) => {
      res.status(500).json({ error: err.message });
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Proxy running on port ${PORT}`);
});
