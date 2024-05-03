import { Collectable } from '../../game/Collectable';

export interface CollectableDrawer {
  draw(
    collectable: Collectable,
    gameWindowWidth: number,
    gameWindowHeight: number,
    currentGameTime: number,
  ): void;
}
