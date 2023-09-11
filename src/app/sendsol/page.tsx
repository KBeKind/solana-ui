"use client"; //Had to add "use client;" to allow use of "useState"

import type { NextPage } from 'next'
import { useState } from 'react'
import * as Web3 from '@solana/web3.js'
import SendSolForm from './SendSolForm'
import Link from "next/link";

import Dotenv from 'dotenv';
Dotenv.config()

//NextPage uses server side rendering for the intial render and has security features
//defined Home as const to make it more secure
const Page: NextPage = () => {

  const [receiverBalance, setReceiverBalance] = useState(0);
  const [receiverAddress, setReceiverAddress] = useState('');

  
  async function sendSol() {
    const payer = initializeKeypair()
    const connection = new Web3.Connection(Web3.clusterApiUrl('devnet'))
    await connection.requestAirdrop(payer.publicKey, Web3.LAMPORTS_PER_SOL*2)

    connection.getBalance(payer.publicKey).then(balance => {
      setReceiverBalance(balance / Web3.LAMPORTS_PER_SOL)
    })
    // await sendSol(connection, 0.1*Web3.LAMPORTS_PER_SOL, Web3.Keypair.generate().publicKey, payer)
}

  function initializeKeypair(): Web3.Keypair {
    const secret = JSON.parse(process.env.PRIVATE_KEY ?? "") as number[]
    const secretKey = Uint8Array.from(secret)
    const keypairFromSecretKey = Web3.Keypair.fromSecretKey(secretKey)
    return keypairFromSecretKey
}

const sendFormSubmittedHandler = (address: string) => {
  // try catch to handle if the address is invalid
  try {
    setReceiverAddress(address)

  // sets a new public key based on the address
  const key = new Web3.PublicKey(address)

  //creates a new connection to solana network
  const connection = new Web3.Connection(Web3.clusterApiUrl('devnet'))
  }  
  catch(error) {
    setReceiverAddress('');
    setReceiverBalance(0);
    alert(error);
}
}

  return (
    <main className='flex'>
    <div className='m-5 p-5 bg-slate-600 flex-initial rounded w-2/5'>
      <div className='mx-5'>

    <p>Send Sol to an address</p>
    <br />
    <button onClick={sendSol} className='my-4 center bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded'>
      Send Now
    </button>

      </div>
    <p>{`Address: ${receiverAddress}`}</p>
    <p>{`Balance: ${receiverBalance} SOL`}</p>
  </div>
</main>
  )
}

export default Page


