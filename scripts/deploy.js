const hre = require('hardhat');
const fs = require('fs');

async function main() {
  const NFTMarket = await hre.ethers.getContractFactory('KBMarket');
  const nftMarket = await NFTMarket.deploy();
  await nftMarket.deployed();
  console.log('nftMarket deployed to:', nftMarket.address);

  const NFT = await hre.ethers.getContractFactory('NFT');
  const nft = await NFT.deploy(nftMarket.address);
  await nft.deployed();
  console.log('nft contract deploy to:', nftMarket.address);

  let config = ` 
export const nftmarketaddressRopsten = ${nftMarket.address}
export const nftaddressRoptsen = ${nft.address}
`;
  let data = JSON.stringify(config);
  fs.writeFileSync('ropstenConfig.js', JSON.parse(data));
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
