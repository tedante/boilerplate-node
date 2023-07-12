import { MongoClient } from "mongodb";
import { MONGODB_URL, MONGODB_DB_NAME } from "#config/app";

/**
 * --------------------------------------------
 * Connecttion to database
 * --------------------------------------------
 */
const client = new MongoClient(MONGODB_URL);
let db = null;

export function getDB() {
  return db;
}

export async function connectDB() {
  try {
    await client.connect();
    db = client.db(MONGODB_DB_NAME);

    return "connected successfully to server";
  } catch (err) {
    throw err;
  }
}
