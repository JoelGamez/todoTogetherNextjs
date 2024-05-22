// src/app/page.tsx
"use client";

import dynamic from 'next/dynamic';

const TaskList = dynamic(() => import('../components/TaskList'), {
  ssr: false,
});

const Home: React.FC = () => {
  return <TaskList />;
};

export default Home;