import React from "react";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { mplTokenMetadata } from "@metaplex-foundation/mpl-token-metadata";

import { generateSigner, percentAmount } from "@metaplex-foundation/umi";
import {
  createNft,
  fetchDigitalAsset,
} from "@metaplex-foundation/mpl-token-metadata";

const umi = createUmi("https://api.devnet.solana.com").use(mplTokenMetadata());

const myUris = await umi.uploader.upload(myFiles, {
  signal: myAbortSignal,
  onProgress: (percent) => {
    console.log(`${percent * 100}% uploaded...`);
  },
});

const myUri = await umi.uploader.uploadJson({ name: "John", age: 42 });

// Use the RPC endpoint of your choice.
// selecting solana devnet

const mint = generateSigner(umi);

const page = async () => {
  // the createNft stuff?
  await createNft(umi, {
    mint,
    name: "My NFT",
    uri: "https://example.com/my-nft.json",
    sellerFeeBasisPoints: percentAmount(5.5),
  }).sendAndConfirm(umi);

  const asset = await fetchDigitalAsset(umi, mint.publicKey);

  return <div>page</div>;
};

export default page;
