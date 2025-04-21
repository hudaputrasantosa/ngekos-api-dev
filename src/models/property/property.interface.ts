interface Property {
  name: string;
  type: string;
  city: string;
  address: string;
  stock: number;
  description: string;
  price: number;
  featured: boolean;
  rating?: number;
  facility?: string[];
  photos?: string[];
}

interface IPropertyQuery {
  min?: number;
  max?: number;
  limit?: number;
  [key: string]: any;
}

interface IPropertyTypeCount {
  type: string;
  count: number;
}
