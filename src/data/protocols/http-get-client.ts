export interface HttpGetClient {
  get: (params: HttpGetClient.Params) => Promise<any>;
}

declare namespace HttpGetClient {
  export type Params = {
    url: string;
    body?: any;
    headers?: {
      [key: string]: string;
    };
  };
}
