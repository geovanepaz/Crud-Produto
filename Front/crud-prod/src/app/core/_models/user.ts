export class User {
    id: number;
    email: string;
    senha: string;
    firstName: string;
    lastName: string;
    accessToken?: string;
    expiresIn:number
}