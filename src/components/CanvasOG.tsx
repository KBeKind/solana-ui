"use client";
import { useEffect } from "react";
import { useRef } from "react";

interface CanvasOGProps {
  textObject: {
    customer: string;
    vendor: string;
    description: string;
  };
}

const CanvasOG = ({ textObject, ...rest }: CanvasOGProps) => {
  const ref = useRef();

  const draw = (aTextObject, context /*,count: number*/) => {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    // const delta = count % 500;
    context.fillStyle = "white";
    context.font = "30px Arial";
    context.fillRect(0, 0, 500, 700);
    context.fillStyle = "black";
    context.fillText(`Customer: ${aTextObject.customer}`, 10 /*+ delta*/, 50);
    context.fillText(`Vendor: ${aTextObject.vendor}`, 10 /*+ delta*/, 100);
    context.fillText(
      `Description: ${aTextObject.description}`,
      10 /*+ delta*/,
      150
    );
  };

  useEffect(() => {
    const theCanvas = ref.current;

    const context = theCanvas.getContext("2d");
    draw(textObject, context);
    const dataURL = theCanvas.toDataURL("image/jpeg", 0.5);
    console.log(dataURL);
  }, [textObject]);

  return <canvas className="bg-white" ref={ref} {...rest} />;
};

export default CanvasOG;
