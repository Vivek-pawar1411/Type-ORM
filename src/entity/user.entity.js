const { EntitySchema } = require("typeorm");

const UserEntity = new EntitySchema({
  name: "User",
  tableName: "user",
  columns: {
    id: { primary: true, type: "int", generated: true },
    name: { type: "varchar", length: 100, nullable: false },
    email: { type: "varchar", length: 100, unique: true },
    password: { type: "varchar", length: 20 },
    role: { type: "enum", enum: ["admin", "employee"], default: "employee" },
    createdAt: { type: "timestamp", default: () => "CURRENT_TIMESTAMP"},
  }
});

module.exports = { UserEntity };
