
export interface User {
    _id: string;
    name: string;
    email: string;
    token: string;
    providers?: string[];
    avatar?: string;
}