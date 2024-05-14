import { Collectable } from '@boosting-game/Collectable';

export interface CollectableDrawer {
  draw(collectable: Collectable, currentGameTime: number): void;
}
