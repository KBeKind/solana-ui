import React from "react";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { mplTokenMetadata } from "@metaplex-foundation/mpl-token-metadata";

// Use the RPC endpoint of your choice.
const umi = createUmi("http://127.0.0.1:8899").use(mplTokenMetadata());

import { generateSigner, percentAmount } from "@metaplex-foundation/umi";
import {
  createNft,
  fetchDigitalAsset,
} from "@metaplex-foundation/mpl-token-metadata";

const mint = generateSigner(umi);

const page = async () => {
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
