// Di dalam script asli lu, tambahin logic cursor ini aja biar bisa scroll terus:
const query = req.query.q || "hat";
const cursor = req.query.cursor || ""; // <-- 1. Tambahin variabel ini

// 2. Ini URL asli dari script lu, tinggal ditambahin pengecekan di bawahnya:
let robloxUrl = `https://roblox.com{encodeURIComponent(query)}&limit=30`;

if (cursor !== "") {
    robloxUrl += `&cursor=${cursor}`; // <-- 3. Tempel halaman berikutnya kalau diminta Roblox Studio
}
