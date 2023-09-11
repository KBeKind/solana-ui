"use client"; //Had to add "use client;" to allow use of "useState"

import type { NextPage } from 'next'
import { useState } from 'react'
import AddressForm from './AddressForm'
import * as Web3 from '@solana/web3.js'
import Link from "next/link";

import Dotenv from 'dotenv';
Dotenv.config()

//NextPage uses server side rendering for the intial render and has security features
//defined Home as const to make it more secure
const Home: NextPage = () => {

  // useState is a React Hook that lets you add a state variable to your component.
  // const [state, setState] = useState(initialState);
  const [balance, setBalance] = useState(0);
  const [address, setAddress] = useState('');
  const [isExecutable, setisExecutable ] = useState(false);

//WALLET ADDRESS LOOKUP

  // addressSubmittedHandler takes an address and sets the state address.  
  const addressSubmittedHandler = (address: string) => {
    // try catch to handle if the address is invalid
    try{
        setAddress(address)

    // sets a new public key based on the address
    const key = new Web3.PublicKey(address)

    //creates a new connection to solana network
    const connection = new Web3.Connection(Web3.clusterApiUrl('devnet'))
    // gets the balance from the connection using the public key then sets the state balance
    // the state balance is set in SOL by dividing by lamports per sol.
    connection.getBalance(key).then(balance => {
      setBalance(balance / Web3.LAMPORTS_PER_SOL)
    })
    connection.getAccountInfo(key).then(info => {
      setisExecutable(info?.executable ?? false);
    })
  
  }
   catch(error) {
      setAddress('');
      setBalance(0);
      setisExecutable(false);
      alert(error);
  }
}
  return (
    <div>
      <main className='flex'>
        <div className='m-5 p-5 bg-slate-600 flex-initial rounded w-2/5'>
          <div className='mx-5'>
        the AddressForm handler is set to the addressSubmittedHandler above
        <AddressForm handler={addressSubmittedHandler} />

        {/* displaying the state variales */}
        <p>{`Address: ${address}`}</p>
        <p>{`Balance: ${balance} SOL`}</p>
        <p>{`Executable Account: ${isExecutable}`}</p>
        <br />
        <hr />
        <br />
        <Link href="/sendsol" className="m-2">
               <button className='my-4 center bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded'>Send Sol Page</button>
        </Link>

        </div></div>
        </main>
    </div>
  )
}

export default Home