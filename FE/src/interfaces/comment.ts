export interface Icomment {
    _id?: string;
    content: string;
    fullname: string;
    userId:string | number | undefined;
    productId: string | number | undefined;
  }