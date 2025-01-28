import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Log = sequelize.define(
  "Log",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    timestamp: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    source: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    severity: {
      type: DataTypes.ENUM("low", "medium", "high", "critical"),
      allowNull: false,
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

// Convertir la tabla en una Hypertable de TimescaleDB
sequelize.sync().then(async () => {
  await sequelize.query(`SELECT create_hypertable('logs', 'timestamp')`);
});

export default Log;
