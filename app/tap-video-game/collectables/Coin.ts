import BaseCollectable, { Collectable } from './Collectable';

export default class Coin extends BaseCollectable implements Collectable {
  public getImage() {
    return '/images/coins/aipick.png';
  }
}
