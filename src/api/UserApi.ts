import ApiClient from './ApiClient';

export interface User {
  id: string;
  fid: number;
  name: string;
  balance: number;
  imageUrl: string;
}

export interface UserApi {
  getCurrentUser(): Promise<User | null>;
}

export default class HttpUserApi implements UserApi {
  public constructor(private client: ApiClient) {}

  public async getCurrentUser() {
    const data = await this.client.makeCall<{ user: User | null }>('/current-user', 'GET');

    return data.user;
  }
}
