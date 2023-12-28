export interface ICustomer {
    _id?: string | number;
    name?: string;
    fullname?: string;
    ngaysinh?: Date; 
    email: string;
    password: string;
    trang_thai: "Active" | "Inactive";
    image_url: string; 
    favoriteProducts: string[]; 
    addressUser: string[];     
    confirmPassword: string;
}
