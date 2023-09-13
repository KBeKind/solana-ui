"use client"; //Had to add "use client;" to allow use of "useState"

import type { NextPage } from "next";
import { useState } from "react";
import { WalletNotConnectedError } from "@solana/wallet-adapter-base";
import {
  WalletDisconnectButton,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import * as Web3 from "@solana/web3.js";
import React, { FC, useCallback } from "react";
import AddressForm from "./AddressForm";

const Page: NextPage = () => {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();

  const [balance, setBalance] = useState(0);
  const [anAddress, setAddress] = useState("");
  const [isExecutable, setisExecutable] = useState(false);

  // addressSubmittedHandler takes an address and sets the state address.
  const addressSubmittedHandler = (address: string) => {
    // try catch to handle if the address is invalid
    try {
      setAddress(address);

      // sets a new public key based on the address
      const key = new Web3.PublicKey(address);

      //creates a new connection to solana network
      const connection = new Web3.Connection(Web3.clusterApiUrl("devnet"));
      // gets the balance from the connection using the public key then sets the state balance
      // the state balance is set in SOL by dividing by lamports per sol.
      connection.getBalance(key).then((balance) => {
        setBalance(balance / Web3.LAMPORTS_PER_SOL);
      });
      connection.getAccountInfo(key).then((info) => {
        setisExecutable(info?.executable ?? false);
      });
    } catch (error) {
      setAddress("");
      setBalance(0);
      setisExecutable(false);
      alert(error);
    }
  };

  const sendSol = useCallback(async () => {
    if (!publicKey) throw new WalletNotConnectedError();

    const lamports = 100_000_000;
    const receiverPubKey = new Web3.PublicKey(String(anAddress));
    const transaction = new Web3.Transaction().add(
      Web3.SystemProgram.transfer({
        fromPubkey: publicKey,
        toPubkey: receiverPubKey,
        lamports,
      })
    );

    const {
      context: { slot: minContextSlot },
      value: { blockhash, lastValidBlockHeight },
    } = await connection.getLatestBlockhashAndContext();

    const signature = await sendTransaction(transaction, connection, {
      minContextSlot,
    });

    await connection.confirmTransaction({
      blockhash,
      lastValidBlockHeight,
      signature,
    });
  }, [publicKey, sendTransaction, connection]);

  return (
    <div>
      <main className="flex">
        <div className="m-5 p-5 bg-slate-600 flex-initial rounded w-2/5">
          <div className="mx-5">
            TEST SEND SOL PAGE
            <WalletMultiButton />
            <WalletDisconnectButton />
            <br />
            <hr />
            <br />
            <AddressForm handler={addressSubmittedHandler} />
            <p>{`Address: ${anAddress}`}</p>
            <p>{`Balance: ${balance} SOL`}</p>
            <p>{`Executable Account: ${isExecutable}`}</p>
            <br />
            <hr />
            <br />
            <button
              onClick={sendSol}
              className="my-4 center bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
            >
              Click To Send Sol to the selected wallet
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Page;
