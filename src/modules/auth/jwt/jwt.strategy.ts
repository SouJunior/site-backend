import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { AdminService } from "src/modules/admin/admin.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(
        private readonly adminService: AdminService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.SECRET_KEY
        });
    }

    async validate(payload: {email: string}){
        let user: any = {};

        user = await this.adminService.getUserByEmail(payload.email);
        
        if(!user){
            throw new UnauthorizedException("User not found, or not authorized.");
        }

        if (user) {
            delete user.password;
            return user;
        }
    }
}