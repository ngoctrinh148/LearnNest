import { Module } from "@nestjs/common";
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { LocalStrategy } from "./local.strategy";
import { UsersModule } from "src/users/users.module";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "./jwt.strategy";
import { jwtConfig } from "src/config/jwt.config";

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register(jwtConfig)
  ],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy],
  controllers: [AuthController]
})
export class AuthModule { }

