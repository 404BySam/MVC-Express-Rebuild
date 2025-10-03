require("dotenv").config();
const mysql = require("mysql2/promise");
const app = require("./src/app");

const port = parseInt(process.env.APP_PORT ?? "5000", 10);

app.listen(port, (err) => {
  if (err) {
    console.error("erreur au démarrage :", err);
  } else {
    console.log(`serveur prêt sur http://localhost:${port}`);
  }
});

(async () => {
  try {
    const db = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    console.log("✅ Connexion MySQL réussie !");
  } catch (err) {
    console.error("❌ Erreur de connexion :", err.message);
  }
})();
