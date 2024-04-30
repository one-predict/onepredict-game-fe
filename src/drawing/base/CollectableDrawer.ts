import { Collectable } from "../../game/Collectable.ts";

export interface CollectableDrawer {
  draw(collectable: Collectable, gameWindowWidth: number, gameWindowHeight: number, currentGameTime: number): void;
}
