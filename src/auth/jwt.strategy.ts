import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Users } from "src/users/entities/user.entity";

export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET
        });
    }

    async validate(dataPayload: any): Promise<any> {
      const {payload} = dataPayload
      const user = {
        id: payload.id,
        email: payload.email,
        name: payload.name,
      };
      return user;
    }
} 