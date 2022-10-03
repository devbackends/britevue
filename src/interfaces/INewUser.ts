export interface INewUser{
    id: string;
    firstName: string;
    lastName: string;
    image?: string;
    email: string;
    hometownPlaceId?: string;
    active?: boolean;
    password?: string;
    confirmPassword?: string;
}
