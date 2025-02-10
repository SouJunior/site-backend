import { Injectable, NestMiddleware, ForbiddenException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class RefererCheckMiddleware implements NestMiddleware {
  private readonly allowedDomains = ['https://soujunior.tech'];

  use(req: Request, res: Response, next: NextFunction) {
    const referer = req.headers.referer;
    const origin = req.headers.origin;

    const isAllowed = this.allowedDomains.some(domain => 
      referer?.startsWith(domain) || origin?.startsWith(domain)
    );

    if (!isAllowed) {
      throw new ForbiddenException('Acesso não permitido');
    }

    next();
  }
}