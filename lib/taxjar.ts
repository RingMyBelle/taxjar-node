import Request from './util/request';
import { TaxjarTypes } from './util/types';

class Taxjar {
  public static DEFAULT_API_URL = 'https://api.taxjar.com';
  public static API_VERSION = 'v2';

  private config: TaxjarTypes.Config;
  private request: any;

  constructor(config: object) {
    if (!config || !config['api_key']) {
      throw new Error('Please provide a TaxJar API key');
    }

    let api_url = Taxjar.DEFAULT_API_URL + '/' + Taxjar.API_VERSION + '/';

    if (config && config['api_url']) {
      api_url = config['api_url'] + '/' + Taxjar.API_VERSION + '/';
    }

    this.config = {
      api_url: api_url,
      api_key: config['api_key']
    };

    this.request = new Request(this);
  }

  getApiConfig(index: string): any {
    return this.config[index];
  }

  setApiConfig(index: string, value: any): void {
    if (index === 'api_url') {
      value += '/' + Taxjar.API_VERSION + '/';
    }

    this.config[index] = value;
    this.request = new Request(this);
  }

  categories(): object {
    return this.request.api({
      method: 'GET',
      url: 'categories'
    });
  }

  ratesForLocation(zip: string, params: TaxjarTypes.RateParams): object {
    return this.request.api({
      method: 'GET',
      url: 'rates/' + zip,
      query: params
    });
  }

  taxForOrder(params: TaxjarTypes.TaxParams): object {
    return this.request.api({
      method: 'POST',
      url: 'taxes',
      data: params
    });
  }

  listOrders(params: TaxjarTypes.TransactionListParams): object {
    return this.request.api({
      method: 'GET',
      url: 'transactions/orders',
      query: params
    });
  }

  showOrder(transactionId: string): object {
    return this.request.api({
      method: 'GET',
      url: 'transactions/orders/' + transactionId
    });
  }

  createOrder(params: object): object {
    return this.request.api({
      method: 'POST',
      url: 'transactions/orders',
      data: params
    });
  }

  updateOrder(params: object): object {
    return this.request.api({
      method: 'put',
      url: 'transactions/orders/' + params['transaction_id'],
      data: params
    });
  }

  deleteOrder(transactionId: string): object {
    return this.request.api({
      method: 'DELETE',
      url: 'transactions/orders/' + transactionId
    });
  }

  listRefunds(params: TaxjarTypes.TransactionListParams): object {
    return this.request.api({
      method: 'GET',
      url: 'transactions/refunds',
      query: params
    });
  }

  showRefund(transactionId: string): object {
    return this.request.api({
      method: 'GET',
      url: 'transactions/refunds/' + transactionId
    });
  }

  createRefund(params: object): object {
    return this.request.api({
      method: 'POST',
      url: 'transactions/refunds',
      data: params
    });
  }

  updateRefund(params: object): object {
    return this.request.api({
      method: 'put',
      url: 'transactions/refunds/' + params['transaction_id'],
      data: params
    });
  }

  deleteRefund(transactionId: string): object {
    return this.request.api({
      method: 'DELETE',
      url: 'transactions/refunds/' + transactionId
    });
  }

  nexusRegions(): object {
    return this.request.api({
      method: 'GET',
      url: 'nexus/regions'
    });
  }

  validate(params: object): object {
    return this.request.api({
      method: 'GET',
      url: 'validation',
      query: params
    });
  }

  summaryRates(): object {
    return this.request.api({
      method: 'GET',
      url: 'summary_rates'
    });
  }
}

export = Taxjar;
