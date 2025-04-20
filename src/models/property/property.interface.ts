interface IKosQuery {
  min?: number;
  max?: number;
  limit?: number;
  [key: string]: any;
}

interface IKosTypeCount {
  type: string;
  count: number;
}
