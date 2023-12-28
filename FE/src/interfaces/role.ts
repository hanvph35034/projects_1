import { IUser } from "./user";
export interface IRole {
    _id: string | number;
    description: string;
    role_name: string;
    trang_thai: "Active" | "Inactive";
    // customerId: IUser;
}