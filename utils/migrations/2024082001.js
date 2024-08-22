module.exports = {
    up:`CREATE TABLE flower(
        id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
        name STRING NOT NULL,
        time STRING,
        rarity STRING);
        `,

}