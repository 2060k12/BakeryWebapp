import "reflect-metadata";
import { DataSource } from "typeorm";
import { Item } from "./models/ItemModel";
import { BusinessDetail } from "./models/BusinessModel";
import { Category } from "./models/CategoryModel";
import { Customers } from "./models/CustomerModel";
import { ProofOfPayment } from "./models/ProofOfPayment";
import { Orders } from "./models/OrderModel";
import { EventType } from "./models/EventType";
import { OrderItem } from "./models/orderItemModel";
import { Promotion } from "./models/Promotion";
import { Admin } from "./models/AdminModel";
import { VideoModel } from "./models/VideoModel";
import { CustomOrder } from "./models/CustomOrder";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.HOST ?? "",
  port: Number(process.env.DB_PORT!),
  username: process.env.USERNAME,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  entities: [
    Category,
    Item,
    BusinessDetail,
    Admin,
    ProofOfPayment,
    Orders,
    EventType,
    Customers,
    Promotion,
    OrderItem,
    VideoModel,
    CustomOrder,
  ],
  synchronize: process.env.NODE_ENV === "production" ? false : true,
  ssl: { rejectUnauthorized: false },
  connectTimeoutMS: 10000, // Set timeout to 10 seconds
});

export const initializeDataSource = async () => {
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
