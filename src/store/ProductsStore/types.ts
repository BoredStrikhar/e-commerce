export type GetProductsListParams = {
  offset?: number;
  limit?: number;
  title?: string;
  categoryId?: number;
};

export interface IProductsStore {
  getProductsList(params: GetProductsListParams): Promise<void>;
}
