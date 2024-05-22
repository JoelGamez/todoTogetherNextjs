import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { GET_TASKS, ADD_TASK } from '../graphql/queries';


const TaskForm: React.FC = () => {
const [addTask] = useMutation(ADD_TASK, {
    update(cache, { data: { addTask } }) {
        const existingTasks: any = cache.readQuery({ query: GET_TASKS });
        console.log(cache);
        cache.writeQuery({
        query: GET_TASKS,
        data: { tasks: [...existingTasks.tasks, addTask] },
        });
    },
    });
  const [title, setTitle] = useState('untitled');
  const [points, setPoints] = useState(0);
  const [priority, setPriority] = useState('LOW');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await addTask({ variables: { title, points, priority } });
    setTitle('untitled');
    setPoints(0);
    setPriority('LOW');
    console.log(event);
  };

  return (
    <>
        <h2>Add Task</h2>
        <form
            onSubmit={handleSubmit}
        >
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" className="placeholder-red-600" />
        < br />
        <select value={priority} onChange={(e) => setPriority(e.target.value)} className="placeholder-red-600">
            <option value="LOW">Low</option>
            <option value="MEDIUM">Medium</option>
            <option value="HIGH">High</option>
        </select>
        < br />
        <input value={points} onChange={(e) => setPoints(parseInt(e.target.value))} placeholder="0" type="number" className="placeholder-red-600" />
        <button type="submit" className="placeholder-red-600">Add Task</button>
        </form>
  </>
  );
};

export default TaskForm;