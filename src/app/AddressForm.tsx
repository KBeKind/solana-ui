"use client"; //Had to add "use client;" to allow use of "useState"
import React, { ChangeEvent, FormEvent, useState } from 'react';


function AddressForm(props: { handler: (address: string) => void }) {

  const [values, setValues] = useState({
    address: '',
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    props.handler(values.address)
  };

  const handleAddressInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.persist();
    setValues((values) => ({
      ...values,
      address: event.target.value,
    }));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          id="public-key"
          type="text"
          placeholder="Public Address, e.g. 7C4jsPZpht42Tw6MjXWF56Q5RQUocjBBmciEjDa8HRtp"
          name="firstName"
          value={values.address}
          onChange={handleAddressInputChange}
        />
        <br />
        <button type="submit">
          Check SOL Balance
        </button>
      </form>
    </div>
  );
}

export default AddressForm;