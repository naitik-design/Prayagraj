import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

async function test() {
  const db = await open({
    filename: './database.sqlite',
    driver: sqlite3.Database
  });
  await db.exec('CREATE TABLE IF NOT EXISTS test (id INTEGER PRIMARY KEY, name TEXT)');
  await db.run('INSERT INTO test (name) VALUES (?)', 'hello');
  const result = await db.all('SELECT * FROM test');
  console.log('Result:', result);
  process.exit(0);
}
test();
