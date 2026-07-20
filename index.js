const express = require("express");
const app = express();

app.get("/catalog", async (req, res) => {
  try {
    const query = req.query.q || "hat";
    const robloxUrl = "https://roblox.com" + encodeURIComponent(query) + "&limit=30";
    
    // PERBAIKAN MUTLAK: Menambahkan header User-Agent agar tidak kena "fetch failed" / diblokir Roblox
    const response = await fetch(robloxUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
      }
    });
    
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Proxy running on port " + PORT);
});
