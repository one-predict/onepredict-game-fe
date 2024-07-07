import { Collectable } from '@tap-video-game/collectables/Collectable';

export interface CollectableDrawer {
  draw(collectable: Collectable, currentGameTime: number): void;
}
