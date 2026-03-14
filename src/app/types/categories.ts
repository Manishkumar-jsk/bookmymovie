export type Category = {
  _id: string;
  name: string;
  description: string;
  isActive: boolean;
  createdBy: string;
  createdAt: string; // ISO date
  updatedAt: string; // ISO date
  slug: string;
  image: string;
  __v: number;
};

export type GetCategoriesResponse = {
  success: boolean;
  data: Category[];
};