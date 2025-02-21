const sqlite3 = require("sqlite3").verbose();

// Verbindung zur SQLite-Datenbank
const db = new sqlite3.Database("./languageapp.db", (err) => {
  if (err) {
    console.error("Fehler beim Verbinden zur SQLite-Datenbank:", err.message);
  } else {
    console.log("Verbunden mit der SQLite-Datenbank.");
  }
});

// Tabelle erstellen, falls sie nicht existiert
db.serialize(() => {
  db.run(
    `CREATE TABLE IF NOT EXISTS verlauf (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      source TEXT,
      target TEXT,
      text TEXT,
      translatedtext TEXT,
      alternatives TEXT,
      created_at TEXT
    )`
  );
});

module.exports = db;
