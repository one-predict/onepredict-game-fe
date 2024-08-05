import BaseCollectable, { Collectable } from './Collectable';

export default class Bomb extends BaseCollectable implements Collectable {
  public getImage() {
    return 'images/bomb.png';
  }
}
