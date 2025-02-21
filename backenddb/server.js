require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./database");

const app = express();
app.use(express.json());
app.use(cors());

app.get("/get-translations", (req, res) => {
  db.all("SELECT * FROM verlauf ORDER BY id DESC", [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

app.post("/save-translate", (req, res) => {
  const { source, target, text, translatedtext } = req.body;

  if (!source || !target || !text || !translatedtext) {
    return res.status(400).json({ error: "Alle Felder müssen ausgefüllt sein." });
  }
  db.run(
    "INSERT INTO verlauf (source, target, text, translatedtext) VALUES (?, ?, ?, ?)",
    [source, target, text, translatedtext],
    function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ id: this.lastID, source, target, text, translatedtext });
    }
  );
});

app.delete("/verlauf-delete", (req, res) => {
  db.run("DELETE FROM verlauf", function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ message: "Alle Aufgaben wurden gelöscht" });
  });
});


const PORT = 5003;
app.listen(PORT, () => console.log(`Server läuft auf Port ${PORT}`));
