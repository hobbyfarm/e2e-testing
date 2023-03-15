import { APIRequestContext, expect } from '@playwright/test';
import { BaseResource } from '.';

export class AuthResource extends BaseResource {
  constructor(request: APIRequestContext, baseUrl: string) {
    super(request, baseUrl);
  }

  async login(emailAddress: string, password: string): Promise<void> {
    const newToken = await this.request.post(`${this.baseUrl}/auth/authenticate`, {
      form: {
        email: emailAddress,
        password: password
      }
    });
    expect(newToken.ok()).toBeTruthy();
  }
}
