module.exports = {
    up:`CREATE TABLE interaction(
        originuser INTEGER NOT NULL,
        targetuser INTEGER NOT NULL,
        category STRING NOT NULL,
        value INTEGER,
        PRIMARY KEY (originuser, targetuser, category)
        )`,
}