import { createParamDecorator, ExecutionContext, UnauthorizedException } from "@nestjs/common";

export const LoggedUser = createParamDecorator((_, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const userObject = request.user;

    if(!userObject) {
        throw new UnauthorizedException(
            'User does not have permission to access this route'
        )
    }

    return userObject;
})