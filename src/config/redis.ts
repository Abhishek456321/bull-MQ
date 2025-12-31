import Redis from "ioredis";
import "dotenv/config";
const redis = new Redis(process.env.redis!, {
  host: process.env.redis!,
  port: 16021,
  password: process.env.redisPassword!,
});
export default redis;

redis.on("connect", () => {
  console.log("Redis connected");
});

redis.on("error", (error) => {
  console.log("Redis error", error);
});

redis.on("end", () => {
  console.log("Redis disconnected");
});
