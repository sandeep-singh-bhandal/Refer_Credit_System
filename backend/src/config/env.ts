import "dotenv/config";

export default {
  PORT: Number(process.env.PORT) || 4000,
  MONGODB_URI: process.env.MONGODB_URI!,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY!,
  NODE_ENV: process.env.NODE_ENV,
};
