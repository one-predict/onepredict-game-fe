import { ApiClient } from './ApiClient';

export interface AuthApi {
  signIn(signInMessage: string): Promise<void>;
}

export class HttpAuthApi implements AuthApi {
  public constructor(private client: ApiClient) {}

  public async signIn(signInMessage: string) {
    await this.client.makeCall<{ success: boolean }>('/auth/sign-in', 'POST', { signInMessage });
  }
}
