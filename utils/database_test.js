const path = require('path');
const fs = require('fs');

const dbPath = path.join(__dirname, 'test.sqlite');
const migrationsPath = path.join(__dirname, 'migrations');
const db = require('better-sqlite3')(dbPath, { verbose: console.log });

function parseVersion(file) {
  const v = parseInt(file.split('_')[0]);
  if (isNaN(v)) throw new Error(`invalid migration file name: ${file}`)
  return v
}

// create a table migrations if doesn't exist
db.prepare(`CREATE TABLE IF NOT EXISTS migrations (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          version INTEGER NOT NULL)`).run();

// get migration
const row = db.prepare('SELECT version FROM migrations ORDER BY version DESC LIMIT 1').get();
const lastVersion = row?.version ?? -Infinity;

// get migration file names in ascending order
const migrationFiles = fs.readdirSync(migrationsPath)
  .filter(fileName => fileName.endsWith('.js'))
  .sort((a, b) => parseVersion(a) - parseVersion(b));

// apply migrations
for (const fileName of migrationFiles) {
  const version = parseVersion(fileName);
  if (version <= lastVersion) continue;

  console.log(`Applying migration: ${fileName}`);
  const migration = require(path.join(migrationsPath, fileName));
  const stmt1 = db.prepare(migration.up);
  const stmt2 = db.prepare("INSERT INTO migrations (version) VALUES (?)");
  db.transaction(() => {
    stmt1.run()
    stmt2.run(version);
  })();
}

module.exports = {db};
