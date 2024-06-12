// src/components/TaskList.tsx
import { useQuery, useMutation } from "@apollo/client";
import { useState } from "react";
import { GET_TASKS, DELETE_TASK, UPDATE_TASK } from "../graphql/taskQueries";
import { getUpdateTaskVariables } from "../utils/taskUtils";
import TaskForm from "./TaskForm";

const TaskList: React.FC = () => {
  const { loading, error, data } = useQuery(GET_TASKS);

  const [updateTask] = useMutation(UPDATE_TASK, {
    update(cache, { data: { updateTask } }) {
      const existingTasks: any = cache.readQuery({ query: GET_TASKS });
      const newTasks = existingTasks.tasks.map((task: any) =>
        task.id === updateTask.id ? updateTask : task
      );
      cache.writeQuery({
        query: GET_TASKS,
        data: { tasks: newTasks },
      });
    },
  });

  // Inside your TaskList component
  const [deleteTask] = useMutation(DELETE_TASK, {
    update(cache, { data: { deleteTask } }) {
      const existingTasks: any = cache.readQuery({ query: GET_TASKS });
      const newTasks = existingTasks.tasks.filter(
        (task: { id: any }) => task.id !== deleteTask.id
      );
      cache.writeQuery({
        query: GET_TASKS,
        data: { tasks: newTasks },
      });
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Tasks</h1>
      <ul>
        {data.tasks.map((task: any) => (
          <li key={task.id}>
            {task.title} - {task.points} points -{" "}
            {task.completed ? "Completed" : "Not Completed"} - priority:
            {task.priority}
            <button
              onClick={() =>
                updateTask({
                  variables: getUpdateTaskVariables(task, { completed: true }),
                })
              }
            >
              Mark as complete
            </button>
            <button
              onClick={() =>
                updateTask({
                  variables: getUpdateTaskVariables(task, { completed: false }),
                })
              }
            >
              Mark as incomplete
            </button>
            <button onClick={() => deleteTask({ variables: { id: task.id } })}>
              x
            </button>
            {/* <button
              onClick={() =>
                deleteTask({
                  variables: getUpdateTaskVariables(task, {
                    priority: "LOW",
                  }),
                })
              }
            > */}
            {/* DELETE
            </button> */}
          </li>
        ))}
      </ul>
      <TaskForm />
    </div>
  );
};

export default TaskList;
