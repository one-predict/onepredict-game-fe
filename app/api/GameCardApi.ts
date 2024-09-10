import { ApiClient } from './ApiClient';

export enum GameCardId {
  CommonBearRead = 'common_bear_raid',
  CommonStopLoss = 'common_stop_loss',
  CommonBullaRun = 'common_bulla_run',
}

export enum GameCardRarity {
  Common = 'common',
  Rare = 'rare',
  Epic = 'epic',
  Legendary = 'legendary',
}

export interface GameCard {
  id: GameCardId;
  name: string;
  rarity: GameCardRarity;
  description: string;
  price: number;
}

export interface GameCardApi {
  getCards(): Promise<GameCard[]>;
  getCardsByIds(ids: GameCardId[]): Promise<GameCard[]>;
}

export class HttpGameCardApi implements GameCardApi {
  public constructor(private client: ApiClient) {}

  public getCards() {
    return this.client.makeCall<GameCard[]>('/game-cards', 'GET');
  }

  public getCardsByIds(ids: GameCardId[]): Promise<GameCard[]> {
    return this.client.makeCall<GameCard[]>(`/game-cards/by-ids-list`, 'POST', { ids });
  }
}
