"use client"; //Had to add "use client;" to allow use of "useState"
import React, { ChangeEvent, FormEvent, useState } from 'react';


// The props object is a standard component in React.
// It is used to pass data from a parent component to a child component.
// The props object can contain any type of data, such as strings, numbers, objects, and functions.
// In this code the props object is passed to the AddressForm component from the parent component.
// The handler property of the props object is a function that is called when the form is submitted.
// The address parameter of the handler function is the value of the address input field.
function AddressForm(props: { handler: (address: string) => void }) {

  // useState is a React Hook that lets you add a state variable to your component.
  // const [state, setState] = useState(initialState);
  // setting the values state variable as an object with a property of address initialized as a blank string
    const [values, setValues] = useState({
    address: '',
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    // the default submission event is prevented
    e.preventDefault();
    // the handler function is called here with the values.address
    props.handler(values.address)
  };

// handleAddressInputChange takes one argument, event, which is an event object
// that is emitted whenever the value of the address input changes.
   const handleAddressInputChange = (event: ChangeEvent<HTMLInputElement>) => {

    // event.persist(), tells the browser to keep the event object so it can be used later
    // This is important because we need to access the value of the input element
    event.persist();
    
//setValues((values) => ({...values, address: event.target.value})),
//updates the values object with the new value of the address input.
//The setValues function takes a function as its argument.
//This function takes the current values object as its input and returns
//a new values object with the updated value of the address input.
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
          value={values.address}
          onChange={handleAddressInputChange}
          className='text-slate-800 w-full'
        />
        <br />
        <div className='flex flex-col items-center'>
        <button type="submit" className='my-4 center bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded'>
          Check SOL Balance
        </button>
        </div>
      </form>
    </div>
  );
}

export default AddressForm;