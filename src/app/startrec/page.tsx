"use client";

import React from "react";
import ReceiptForm from "@/components/ReceiptForm";
import CanvasOG from "@/components/CanvasOG";
import { useState } from "react";
import Link from "next/link";

const page = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [textObject, setTextObject] = useState({
    customer: "Alice",
    vendor: "Sol Products Inc",
    description: "Software Engineer",
  });
  const [imageBlobSet, setImageBlobSet] = useState(false);
  const [imageBlob, setImageBlob] = useState();

  // passing two callback functions into RecieptForm
  return (
    <div>
      page
      <ReceiptForm
        setFormSubmitted={setFormSubmitted}
        setTextObject={setTextObject}
      ></ReceiptForm>
      <div className="bg-slate-500 p-8">
        {formSubmitted && (
          <CanvasOG
            textObject={textObject}
            setImageBlob={setImageBlob}
            setImageBlobSet={setImageBlobSet}
            width="700"
            height="500"
          ></CanvasOG>
        )}
      </div>
      <br />
      <div className="bg-slate-500 p-8">
        {imageBlobSet && <img src={imageBlob} width="700" height="500"></img>}
      </div>
    </div>
  );
};

export default page;
