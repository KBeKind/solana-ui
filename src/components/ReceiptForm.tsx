"use client";
import { todo } from "node:test";
import { useState } from "react";

const ReceiptForm = () => {
  const [customer, setCustomer] = useState("");
  const [vendor, setVendor] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    //todo:  NEED TO MAKE THE NFT RECEIPT OR MAKE AN IMAGE OR PASS TO SOMETHING
  };

  return (
    <div className="m-4 p-4">
      ReceiptForm
      <form
        onSubmit={handleSubmit}
        className="m-4 p-4 bg-green-500 text-slate-800"
      >
        <input
          className="m-4"
          type="text"
          placeholder="customer name..."
          value={customer}
          // as the user types it sets the query state variable
          onChange={(e) => setCustomer(e.target.value)}
        />
        <input
          className="m-4"
          type="text"
          placeholder="vendor name..."
          value={vendor}
          // as the user types it sets the query state variable
          onChange={(e) => setVendor(e.target.value)}
        />
        <br />
        <textarea
          className="m-4 w-96 h-36"
          placeholder="description..."
          maxLength={250}
          value={description}
          // as the user types it sets the query state variable
          onChange={(e) => setDescription(e.target.value)}
        />
        <br />
        <button
          className="mx-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          type="submit"
        >
          Create Receipt NFT
        </button>
      </form>
    </div>
  );
};

export default ReceiptForm;
