// src/models/index.ts
import User from "./user";
import Task from "./task";

User.hasMany(Task, {
  sourceKey: "id",
  foreignKey: "userId",
  as: "tasks", // alias
});

Task.belongsTo(User, {
  targetKey: "id",
  foreignKey: "userId",
  as: "user", // alias
});

export { User, Task };
