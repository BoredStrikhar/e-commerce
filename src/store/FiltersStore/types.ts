export type GetProductsListParams = {
  offset?: number;
  limit?: number;
  title?: string;
};

export interface IProductsStore {
  getProductsList(params: GetProductsListParams): Promise<void>;
}
