import { Request, Response } from 'express';
import { BaseError } from '@api/error/base-error';
import { AuthChecker } from 'type-graphql';
import jwt, { TokenExpiredError } from 'jsonwebtoken';

export interface Payload {
  id: string;
}

export interface ServerContext {
  userId?: string;
  error?: BaseError;
}

interface ServerRequest {
  req: Request;
  res: Response;
}

export class Authenticator {
  static getJWT = (payload: Payload, extendedExpiration: boolean = false): string => {
    return jwt.sign(payload, String(process.env.JWT_SECRET), {
      expiresIn: extendedExpiration ? process.env.JWT_EXTENDED_EXPIRATION_TIME : process.env.JWT_EXPIRATION_TIME,
    });
  };

  static context = ({ req, res }: ServerRequest) => {
    const bearerToken = req.headers?.authorization;
    if (!bearerToken) {
      return null;
    }

    const token = bearerToken.replace('Bearer ', '');
    let payload: Payload | undefined;
    const context: ServerContext = {};

    try {
      payload = jwt.verify(token, String(process.env.JWT_SECRET)) as Payload;
      context.userId = payload.id;
    } catch (err) {
      if (err instanceof TokenExpiredError) {
        context.error = new BaseError(401, 'Usuário não autorizado', 'Token expirado');
      } else {
        context.error = new BaseError(401, 'Usuário não autorizado', 'Token inválido');
      }
    }

    return context;
  };

  static authChecker: AuthChecker<ServerContext> = ({ context }, roles) => {
    if (context.userId) {
      return true;
    } else {
      throw context.error;
    }
  };
}
