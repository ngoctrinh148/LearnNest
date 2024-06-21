import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken,
            secretOrKey: 'qw12virtyuio125623sdfsb234xrt36'
        });
    }


    async validate(payload: any){
        return {
            id: payload.sub,
            name: payload.name,
            tenant: 'amitav',
        };
    }
}