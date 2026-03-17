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


export type addCategoryPayload = {
  name:string;
  description:string;
  isActive:boolean;
}

export type updateCategoryPayload = addCategoryPayload & {id:string}

export type addCategoryResponse = {
  success:boolean;
  message:string
}

export interface CategoryDetails {
  _id: string;
  name: string;
  description: string;
  isActive:boolean;
}

export interface DeleteCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  details?:CategoryDetails;
}