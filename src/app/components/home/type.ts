export interface Movie {
  _id?: string;
  title: string;
  description: string;
  duration: number; 
  genre: string[];
  language: string;
  releaseDate: string; 
  rating: number;
  posterUrl: string;
  status: string;
  totalBookings: number;
  createdAt?: string;
  updatedAt?: string;
}