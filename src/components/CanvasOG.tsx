"use client";
import React, { useEffect } from "react";
import { useRef } from "react";

const CanvasOG = (props) => {
  const { textObject, ...rest } = props;
  const ref = useRef();

  const draw = (aTextObject, context /*,count: number*/) => {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    // const delta = count % 500;
    context.fillStyle = "white";
    context.font = "30px Arial";
    context.fillRect(0, 0, 500, 500);
    context.fillStyle = "black";
    context.fillText(`${aTextObject.customer}`, 10 /*+ delta*/, 50);
    context.fillText(`${aTextObject.vendor}`, 10 /*+ delta*/, 100);
    context.fillText(`${aTextObject.description}`, 10 /*+ delta*/, 150);
  };

  useEffect(() => {
    const theCanvas = ref.current;
    // const dataURL = theCanvas.toDataURL("image/jpeg", 0.5);
    // console.log(dataURL);
    const context = theCanvas.getContext("2d");
    draw(textObject, context);
    const dataURL = theCanvas.toDataURL("image/jpeg", 0.5);
    console.log(dataURL);
  }, []);

  return <canvas className="bg-white" ref={ref} {...rest} />;
};

export default CanvasOG;
