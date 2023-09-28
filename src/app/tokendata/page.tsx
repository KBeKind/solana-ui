import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { mplTokenMetadata } from "@metaplex-foundation/mpl-token-metadata";
import { mintV1, TokenStandard } from "@metaplex-foundation/mpl-token-metadata";
import { generateSigner, percentAmount } from "@metaplex-foundation/umi";
import {
  createNft,
  fetchDigitalAsset,
} from "@metaplex-foundation/mpl-token-metadata";

// Uploader Bundler is for Arweave
import { bundlrUploader, createBundlrUploader, } from "@metaplex-foundation/umi-uploader-bundlr";

const umi = createUmi("https://api.devnet.solana.com")
.use(bundlrUploader(...));



// Signers
// A signer is a public key that can sign transactions and messages. This enables transactions to be signed by the required accounts and wallets to prove their identity by signing messages. In Umi, it is represented by the following interface.
// interface Signer {
//   publicKey: PublicKey;
//   signMessage(message: Uint8Array): Promise<Uint8Array>;
//   signTransaction(transaction: Transaction): Promise<Transaction>;
//   signAllTransactions(transactions: Transaction[]): Promise<Transaction[]>;
// }

// You may generate a new signer cryptographically using the generateSigner
//  helper method. Under the hood, this method uses the 
// generateKeypair method of the EdDSA interface as described in the next section.
const mySigner = generateSigner(umi);

// The following helper functions can also be used to manage signers.
// Check if the provided value is a Signer.
isSigner(mySigner);
// Deduplicate an array of signers by public key.
uniqueSigners(mySigners);



const page = async () => {

  const [imageUri] = await umi.uploader.upload([imageFile]);
  const uri = await umi.uploader.uploadJson({
    name: "My NFT",
    description: "This is my NFT",
    image: imageUri,
  });

  //CREATING ACCOUNTS SEPARATE
  // has to do with creating needed accounts
  // const mint = generateSigner(umi)
  // await createV1(umi, {
  //   mint,
  //   authority,
  //   name: 'My NFT',
  //   uri,
  //   sellerFeeBasisPoints: percentAmount(5.5),
  //   tokenStandard: TokenStandard.NonFungible,
  // }).sendAndConfirm(umi)

  // MINT TOKEN  SEPARATE
  // We can use the Mint V1 instruction of the Token Metadata program to achieve this. It requires the following parameters:
  // Mint: The address of the asset's Mint account.
  // Authority: The authority that can authorize this instruction. For Non-Fungible assets, this is the update authority of the Metadata account, otherwise, this refers to the Mint Authority of the Mint account.
  // Token Owner: The address of the wallet to receive the token(s).
  // Amount: The number of tokens to mint. For Non-Fungible assets, this may only be 1.
  // Token Standard: The Token Standard of the asset. Here again, the program does not require this argument but our SDKs do so they can provide adequate default values for most of the other parameters.
  // Mint Tokens
  // await mintV1(umi, {
  //   mint: mint.publicKey,
  //   authority,
  //   amount: 1,
  //   tokenOwner,
  //   tokenStandard: TokenStandard.NonFungible,
  // }).sendAndConfirm(umi)

  //CREATE ACCOUNT AND MINT TOGETHER USING HELPERS
  // Create Helpers
  // since creating digital assets is such an important part of Token Metadata,
  //  our SDKs provide helper methods to make the process easier.
  //   Namely, these helper methods combine the Create V1 and Mint V1 instructions together
  //  in different ways, depending on the Token Standard we want to create.
  // Create a NonFungible
  // const mint = generateSigner(umi);
  // await createNft(umi, {
  //   mint,
  //   name: "My NFT",
  //   uri: "https://example.com/my-nft.json",
  //   sellerFeeBasisPoints: percentAmount(5.5),
  // }).sendAndConfirm(umi);
};

export default page;
