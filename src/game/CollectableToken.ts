import { Collectable } from './Collectable';
import TokenType from '../enums/TokenType';
import BaseCollectable from './Collectable';
import aptosSrc from '../assets/Aptos.png';
import arbitrumSrc from '../assets/arbitrum-arb-logo.png';
import bnb from '../assets/bnb-bnb-logo.png';
import doge from '../assets/Doge.png';
import etherum from '../assets/ethereum-eth-logo.png';
import optimismEthereum from '../assets/optimism-ethereum-op-logo.png';
import pancakeSwap from '../assets/pancakeswap-cake-logo.png';
import polygonMatic from '../assets/polygon-matic-logo.png';
import shiba from '../assets/Shiba.png';
import sui from '../assets/sui-sui-logo.png';

export default class CollectableToken extends BaseCollectable<TokenType> implements Collectable<TokenType> {
  public getImage() {
    switch (this.getType()) {
      case TokenType.Aptos:
        return aptosSrc;
      case TokenType.Arbitrum:
        return arbitrumSrc;
      case TokenType.Bnb:
        return bnb;
      case TokenType.Doge:
        return doge;
      case TokenType.Etherum:
        return etherum;
      case TokenType.OptimismEthereum:
        return optimismEthereum;
      case TokenType.PancakeSwap:
        return pancakeSwap;
      case TokenType.PolygonMatic:
        return polygonMatic;
      case TokenType.Shiba:
        return shiba;
      case TokenType.Sui:
        return sui;
    }
  }
}
