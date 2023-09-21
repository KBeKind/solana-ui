import React from "react";
import CanvasOG from "@/components/CanvasOG";

const page = () => {
  const textObject = {
    customer: "Alice",
    vendor: "Sol Products Inc",
    description: "Software Engineer",
  };

  return (
    <div className="bg-slate-500 p-8">
      <CanvasOG textObject={textObject} width="500" height="500"></CanvasOG>
    </div>
  );
};

export default page;
