import { ITokenPayload } from '../../interfaces/ITokenPayload.interface';

declare global {
    namespace Express {
        interface Request {
            user?: ITokenPayload;
        }
    }
}