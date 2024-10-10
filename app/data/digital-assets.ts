import DigitalAssetId from '@enums/DigitalAssetId';

export const digitalAssetLogoConfigMap: Record<
  DigitalAssetId,
  {
    image: string;
    backgroundColor?: 'light' | 'dark';
  }
> = {
  aptos: {
    image: '/images/coins/aptos.png',
    backgroundColor: 'light',
  },
  arbitrum: {
    image: '/images/coins/arbitrum.png',
  },
  avalanche: {
    image: '/images/coins/avalanche.png',
  },
  axie: {
    image: '/images/coins/axie.png',
  },
  bitcoin: {
    image: '/images/coins/bitcoin.png',
  },
  bnb: {
    image: '/images/coins/bnb.png',
  },
  celestia: {
    image: '/images/coins/celestia.png',
  },
  chia: {
    image: '/images/coins/chia.png',
    backgroundColor: 'light',
  },
  cosmos: {
    image: '/images/coins/cosmos.png',
  },
  dogecoin: {
    image: '/images/coins/dogecoin.png',
  },
  ethereum: {
    image: '/images/coins/ethereum.png',
    backgroundColor: 'light',
  },
  fantom: {
    image: '/images/coins/fantom.png',
  },
  jupiter: {
    image: '/images/coins/jupiter.png',
  },
  litecoin: {
    image: '/images/coins/litecoin.png',
  },
  mantle: {
    image: '/images/coins/mantle.png',
  },
  near: {
    image: '/images/coins/near.png',
    backgroundColor: 'light',
  },
  optimism: {
    image: '/images/coins/optimism.png',
  },
  polkadot: {
    image: '/images/coins/polkadot.png',
  },
  polygon: {
    image: '/images/coins/polygon.png',
    backgroundColor: 'dark',
  },
  'shiba-inu': {
    image: '/images/coins/shiba-inu.png',
  },
  solana: {
    image: '/images/coins/solana.png',
  },
  starknet: {
    image: '/images/coins/starknet.png',
  },
  toncoin: {
    image: '/images/coins/toncoin.png',
  },
  wormhole: {
    image: '/images/coins/wormhole.png',
    backgroundColor: 'light',
  },
  xrp: {
    image: '/images/coins/xrp.png',
    backgroundColor: 'light',
  },
};
