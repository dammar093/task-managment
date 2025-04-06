import expres from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";
import dotenv from "dotenv";
import cookiePraser from "cookie-parser";
import authRoutes from "./routes/auth.routes";
import taskRoutes from "./routes/tasks.routes";

dotenv.config();

// connect to database
export const db = new PrismaClient();
async function main() {
  await db.$connect();
  console.log("Connected to database");
}
// initialize express
const app = expres();

// middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
}));
app.use(expres.json());
app.use(expres.urlencoded({ extended: true }));
app.use(cookiePraser());

// routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/tasks", taskRoutes);

// listen app
const PORT = process.env.PORT || 5000;
main()
  .then(async () => {
    await db.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await db.$disconnect()
    process.exit(1)
  })
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
