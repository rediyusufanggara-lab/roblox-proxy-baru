const express = require("express");
const app = express();

app.get("/catalog", async (req, res) => {
  try {
    const query = req.query.q || "hat"; // default cari "hat"
    const response = await fetch(`https://roblox.com{query}&limit=30`);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Proxy running on port ${PORT}`);
});
