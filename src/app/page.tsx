// src/app/page.tsx
"use client";

import dynamic from "next/dynamic";
import Home from "../components/Home";

const TaskList = dynamic(() => import("../components/TaskList"), {
  ssr: false,
});

const Page: React.FC = () => {
  return <Home />;
};

export default Page;
