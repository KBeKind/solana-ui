import Arweave from "arweave";
import { Url } from "next/dist/shared/lib/router/router";

//   // Upload metadata to Arweave

//   const metadata = {
//     name: "Custom NFT #1",
//     symbol: "CNFT",
//     description: "A description about my custom NFT #1",
//     seller_fee_basis_points: 500,
//     external_url: "https://www.customnft.com/",
//     attributes: [
//       {
//         trait_type: "NFT type",
//         value: "Custom",
//       },
//     ],
//     collection: {
//       name: "Test Collection",
//       family: "Custom NFTs",
//     },
//     properties: {
//       files: [
//         {
//           uri: imageUrl,
//           type: "image/png",
//         },
//       ],
//       category: "image",
//       maxSupply: 0,
//       creators: [
//         {
//           address: "CBBUMHRmbVUck99mTCip5sHP16kzGj3QTYB8K3XxwmQx",
//           share: 100,
//         },
//       ],
//     },
//     image: imageUrl,
//   };

//   const metadataRequest = JSON.stringify(metadata);

//   const metadataTransaction = await arweave.createTransaction({
//     data: metadataRequest,
//   });

//   metadataTransaction.addTag("Content-Type", "application/json");

//   await arweave.transactions.sign(metadataTransaction, wallet);

//   console.log("metadata txid", metadataTransaction.id);

//   console.log(await arweave.transactions.post(metadataTransaction));
// })();

const ImageUploader = async (imageBlob) => {
  const arweave = Arweave.init({
    host: "arweave.net",
    port: 443,
    protocol: "https",
    timeout: 20000,
    logging: false,
  });

  //   // Upload image to Arweave
  const data = fs.readFileSync(imageBlob);

  const transaction = await arweave.createTransaction({
    data: data,
  });

  transaction.addTag("Content-Type", "image/jpeg");

  const wallet = JSON.parse(fs.readFileSync("wallet.json", "utf-8"));

  await arweave.transactions.sign(transaction, wallet);
  const response = await arweave.transactions.post(transaction);
  console.log(response);

  const id = transaction.id;
  const imageUrl = id ? `https://arweave.net/${id}` : undefined;
  console.log("imageUrl", imageUrl);

  return (
    <div>
      Image Uploader
      <br />
      <button className="my-4 center bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded">
        Upload Image
      </button>
    </div>
  );
};

export default ImageUploader;
