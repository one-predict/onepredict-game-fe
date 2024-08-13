import { ApiClient } from './ApiClient';
import { GameCardId } from '@api/GameCardApi';

export interface PortfolioCardsDeck {
  id: string;
  cardIds: GameCardId[];
  userId: string;
}

export interface CreatePortfolioCardsDeckParams {
  cardIds: GameCardId[];
}

export interface UpdatePortfolioCardsDeckParams {
  cardIds?: GameCardId[];
}

export interface PortfolioCardsDeckApi {
  getMyPortfolioCardsDeck(): Promise<PortfolioCardsDeck | null>;
  createPortfolioCardsDeck(params: CreatePortfolioCardsDeckParams): Promise<PortfolioCardsDeck>;
  updatePortfolioCardsDeck(id: string, params: UpdatePortfolioCardsDeckParams): Promise<PortfolioCardsDeck>;
}

export class HttpPortfolioCardsDeckApi implements PortfolioCardsDeckApi {
  public constructor(private client: ApiClient) {}

  public async getMyPortfolioCardsDeck() {
    const [deck] = await this.client.makeCall<PortfolioCardsDeck[]>('/portfolio-cards-decks/my', 'GET');

    return deck ?? null;
  }

  public createPortfolioCardsDeck(params: CreatePortfolioCardsDeckParams) {
    return this.client.makeCall<PortfolioCardsDeck>('/portfolio-cards-decks', 'POST', params);
  }

  public updatePortfolioCardsDeck(id: string, params: UpdatePortfolioCardsDeckParams) {
    return this.client.makeCall<PortfolioCardsDeck>(`/portfolio-cards-decks/${id}`, 'PUT', params);
  }
}
