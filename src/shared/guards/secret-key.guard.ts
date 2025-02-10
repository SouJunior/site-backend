import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';


@Injectable()
export class SecretKeyGuard implements CanActivate{
    canActivate(
        context: ExecutionContext
    ): boolean | Promise<boolean> | Observable<boolean> {
        const req = context.switchToHttp().getRequest();
        const secretKey = req.headers['x-api-key'];

        if(!secretKey || secretKey !== process.env.MDB_KEY){
            throw new UnauthorizedException('Chave secreta inválida');
        }
        
        
        return true;
    }
}