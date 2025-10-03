require("dotenv").config();
const app = require("./src/app");

const port = parseInt(process.env.APP_PORT ?? "5000", 10);

app.listen(port, (err) => {
  if (err) {
    console.error("erreur au démarrage :", err);
  } else {
    console.log(`serveur prêt sur http://localhost:${port}`);
  }
});
