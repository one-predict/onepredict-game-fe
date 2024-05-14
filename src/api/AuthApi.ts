import { ApiClient } from './ApiClient';

export interface SignInParams {
  message: string;
  signature: string;
  name: string;
  pfp: string;
  nonce: string;
}

export interface AuthApi {
  signIn(params: SignInParams): Promise<void>;
}

export class HttpAuthApi implements AuthApi {
  public constructor(private client: ApiClient) {}

  public async signIn(params: SignInParams) {
    await this.client.makeCall<{ success: boolean }>(
      '/auth/sign-in',
      'POST',
      params,
    );
  }
}
