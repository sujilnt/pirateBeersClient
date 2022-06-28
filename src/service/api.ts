import type { ConfigurationParameters } from '@/api';
import {Configuration, ProductsApi } from '@/api';


class API{
  public products: ProductsApi;

  private static readonly CONFIG: ConfigurationParameters = {
    basePath: `${API_URL}`,
    credentials: 'include' as RequestCredentials,
  };

  constructor() {
    const config = new Configuration(API.CONFIG);
    this.products = new ProductsApi(config);
  }
}

export default new API();
