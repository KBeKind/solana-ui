import React from "react";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { mplTokenMetadata } from "@metaplex-foundation/mpl-token-metadata";

import { generateSigner, percentAmount } from "@metaplex-foundation/umi";
import {
  createNft,
  fetchDigitalAsset,
} from "@metaplex-foundation/mpl-token-metadata";

//not sure which uploader to use yet.  bundlr should work with arweave
import { BundlrUploader } from "@metaplex-foundation/umi-uploader-bundlr";

// Use the RPC endpoint of your choice.
// selecting solana devnet
const umi = createUmi("https://api.devnet.solana.com").use(mplTokenMetadata());

//using the umi uploader interface
// upload: ((files: GenericFile[], options?: UploaderUploadOptions) => Promise<string[]>)

const myUris = await umi.uploader.upload(myFiles, {
  signal: myAbortSignal,
  onProgress: (percent) => {
    console.log(`${percent * 100}% uploaded...`);
  },
});

// URI is the json meta data location
const myUri = await umi.uploader.uploadJson({ name: "John", age: 42 });

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
