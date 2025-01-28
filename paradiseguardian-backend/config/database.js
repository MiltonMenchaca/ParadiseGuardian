import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize(process.env.DB_URL, {
  dialect: "postgres",
  logging: false, // Para no llenar la consola de logs de SQL
});

export default sequelize;
