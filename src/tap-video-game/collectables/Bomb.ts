import BaseCollectable, { Collectable } from './Collectable';

import bombSrc from '@assets/bomb.png';

export default class Bomb extends BaseCollectable implements Collectable {
  public getImage() {
    return bombSrc;
  }
}
