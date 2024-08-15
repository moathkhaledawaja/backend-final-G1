import { CategoryDTO } from "./categoryDto";
import { CommentDTO } from "./commentDto";
import { discountDTO } from "./discountDTO";
import { ratingDto } from "./ratingDTO";

export type ProductDTO = {
  name: string;
  price: number;
  description?: string;
  brand?: string;
  stock: number;
  userRatings?: ratingDto[];
  comments?: CommentDTO[];
  categories?: CategoryDTO[];
  discount?: discountDTO;
};
