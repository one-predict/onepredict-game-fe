import { ApiClient } from './ApiClient';
import { GameCardId } from '@api/GameCardApi';

export interface GameCardsMarketplaceApi {
  purchaseGameCard(cardId: GameCardId): Promise<void>;
}

export class HttpGameCardsMarketplaceApi implements GameCardsMarketplaceApi {
  public constructor(private client: ApiClient) {}

  public purchaseGameCard(cardId: GameCardId) {
    return this.client.makeCall('/game-cards-marketplace/purchase', 'POST', {
      cardId,
    });
  }
}
