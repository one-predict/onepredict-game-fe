export interface GridDrawer {
  draw(gameWindowWidth: number, gameWindowHeight: number, gridCellSize: number, bannedGridCells: Set<number>): void;
}
