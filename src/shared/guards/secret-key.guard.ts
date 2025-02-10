import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';


@Injectable()
export class SecretKeyGuard implements CanActivate{
    canActivate(
        context: ExecutionContext
    ): boolean | Promise<boolean> | Observable<boolean> {
        const req = context.switchToHttp().getRequest();
        const secretKey = req.headers['x-api-key'];
        const apiKey = process.env.MDB_KEY;

        if(!apiKey){
            throw new Error('Variável de ambiente MDB_KEY não está configurada');
        }
        if(!secretKey || secretKey !== apiKey){
            throw new UnauthorizedException('Chave secreta inválida');
        }
        
        
        return true;
    }
}