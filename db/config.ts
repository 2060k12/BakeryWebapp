import "reflect-metadata";
import { DataSource } from "typeorm";
import { Cake } from "./models/CakeModel";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.HOST ?? "",
  port: Number(process.env.DB_PORT!),
  username: process.env.USERNAME,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  entities: [Cake],
  synchronize: process.env.NODE_ENV === "production" ? false : true,
  ssl: { rejectUnauthorized: false },
  connectTimeoutMS: 10000, // Set timeout to 10 seconds
});

export const initializeDataSource = async () => {
  console.log(
    process.env.HOST,
    process.env.DB_PORT,
    process.env.USERNAME,
    process.env.DATABASE
  );
  if (!AppDataSource.isInitialized) {
    try {
      await AppDataSource.initialize();
      console.log("Database connected");
    } catch (error) {
      console.error("Error connecting to the database", error);
      throw new Error("Database connection failed");
    }
  }
};
