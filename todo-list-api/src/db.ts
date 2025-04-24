import sqlite3  from "sqlite3";
import { open } from "sqlite"; 

export const connectDB = async () => {
    return open({
        filename: "./db.sqlite",
        driver: sqlite3.Database,
    });
};

(async () => {
    const db = await connectDB();
    await db.exec(`
        CREATE TABLE IF NOT EXISTS todos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            completed INTEGER DEFAULT 0
        );
    `);
    console.log("Tabela todos criada ou já existe.");
    await db.close();
})();