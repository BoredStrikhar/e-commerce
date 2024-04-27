export type CategoryModel = {
  id: number;
  name: string;
  image: string;
};

export type CategoryApi = {
  id: number;
  name: string;
  image: string;
};

export const normalizeCategory = (from: CategoryApi[]): CategoryModel[] => {
  return from.map((item) => ({
    id: item.id,
    name: item.name,
    image: item.image,
  }));
};
