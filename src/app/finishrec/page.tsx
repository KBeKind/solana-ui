"use client";

import { useState } from "react";
import { useEffect } from "react";

const page = () => {
  const [imageBlob, setImageBlob] = useState();

  useEffect(() => {
    setImageBlob();
  }, []);
  return (
    <div>
      TEST
      <br />
      <img src={URL.createObjectURL(imageBlob)} />
    </div>
  );
};

export default page;
