export interface ITokenPayload {
    id: string;
    email: string;
    role: string;
    iat?: number;
    exp?: number;
}