import BaseCollectable, { Collectable } from './Collectable';

import aipickCoinSrc from '@assets/coins/aipick.png';

export default class Coin extends BaseCollectable implements Collectable {
  public getImage() {
    return aipickCoinSrc;
  }
}
