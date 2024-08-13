import { ApiClient } from './ApiClient';
import { GameCardId } from '@api/GameCardApi';

export interface UserInventory {
  purchasedCardIds: GameCardId[];
  availableCardSlots: number;
}

export interface UserInventoryApi {
  getMyInventory(): Promise<UserInventory>;
  purchaseCard(cardId: GameCardId): Promise<void>;
}

export class HttpUserInventoryApi implements UserInventoryApi {
  public constructor(private client: ApiClient) {}

  public getMyInventory() {
    return this.client.makeCall<UserInventory>('/inventories/my', 'GET');
  }

  public purchaseCard(cardId: GameCardId) {
    return this.client.makeCall('/inventory/cards/purchase', 'POST', {
      cardId,
    });
  }
}
