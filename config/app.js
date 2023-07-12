import * as dotenv from "dotenv";
dotenv.config();

/**
 * --------------------------------------------
 * APP
 * - PORT
 * - NODE_ENV
 * - TIMEZONE
 * --------------------------------------------
 */
export const PORT = process.env.PORT || 8000;
export const NODE_ENV = process.env.NODE_ENV || "development";
export const TIMEZONE = process.env.TIMEZONE || "Asia/Jakarta";

/**
 * --------------------------------------------
 * MONGODB
 * - MONGODB_URL
 * - MONGODB_DB_NAME
 * - MONGODB_PASSWORD
 * --------------------------------------------
 */
export const MONGODB_URL = process.env.MONGODB_URL || "mongodb://root:password@localhost:27017/?authMechanism=DEFAULT";
export const MONGODB_DB_NAME = process.env.MONGODB_DB_NAME || "db-name";
export const MONGODB_USERNAME = process.env.MONGODB_USERNAME || "";
export const MONGODB_PASSWORD = process.env.MONGODB_PASSWORD || "";

/**
 * --------------------------------------------
 * REDIS
 * - PORT
 * - HOST
 * - PASSWORD
 * --------------------------------------------
 */
export const REDIS_PORT = process.env.REDIS_PORT || 6379;
export const REDIS_HOST = process.env.REDIS_HOST || "127.0.0.1";
export const REDIS_PASSWORD = process.env.REDIS_PASSWORD || "";

/**
 * --------------------------------------------
 * JWT
 * - JWT_EXPIRE_IN
 * - JWT_KEY
 * --------------------------------------------
 */
export const JWT_EXPIRE_IN = process.env.JWT_EXPIRE_IN || "1d";
export const JWT_KEY = process.env.JWT_KEY;