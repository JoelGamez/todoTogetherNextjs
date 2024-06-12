const redis = require('redis');
import { createClient } from '@redis/client'
import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve(__dirname, "../.env") });

const host = process.env.REDIS_HOST || "localhost";
const port = Number(process.env.REDIS_PORT) || 6379;

const client = createClient({
  url: `redis://${host}:${port}`,
});

client.on('error', (err) => {
    console.error('Error connecting to Redis', err)
  })
  
client.connect()
  

export default client;
