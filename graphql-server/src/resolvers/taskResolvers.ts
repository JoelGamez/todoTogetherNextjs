import Task from "../../../src/models/task";

const taskResolvers = {
  Query: {
    tasks: async () => {
      try {
        return await Task.findAll({
          order: [["createdAt", "ASC"]],
        });
      } catch (error) {
        console.error("Error fetching tasks:", error);
        throw new Error("Error fetching tasks");
      }
    },
  },
  Mutation: {
    addTask: async (
      _: any,
      {
        title,
        points,
        priority,
      }: { title: string; points: number; priority: "LOW" | "MEDIUM" | "HIGH" }
    ) => {
      try {
        return await Task.create({ title, points, priority, completed: false });
      } catch (error) {
        console.error("Error adding task:", error);
        throw new Error("Error adding task");
      }
    },
    updateTask: async (
      _: any,
      {
        id,
        title,
        points,
        completed,
        priority,
      }: {
        id: string;
        title?: string;
        points?: number;
        completed?: boolean;
        priority?: "LOW" | "MEDIUM" | "HIGH";
      }
    ) => {
      try {
        const task = await Task.findByPk(id);
        if (!task) {
          throw new Error("Task not found");
        }
        if (title !== undefined) task.title = title;
        if (points !== undefined) task.points = points;
        if (completed !== undefined) task.completed = completed;
        if (priority !== undefined) task.priority = priority;
        await task.save();
        return task;
      } catch (error) {
        console.error("Error updating task:", error);
        throw new Error("Error updating task");
      }
    },
    deleteTask: async (_: any, { id }: { id: string }) => {
      try {
        const task = await Task.findByPk(id);
        if (!task) {
          throw new Error("Task not found");
        }
        await task.destroy();
        return task;
      } catch (error) {
        console.error("Error deleting task:", error);
        throw new Error("Error deleting task");
      }
    },
  },
};

export default taskResolvers;
