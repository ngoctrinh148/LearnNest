import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/modules/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Users } from 'src/modules/users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) { }

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.getUserByUserName(username);
    if (user) {
      if (await bcrypt.compare(pass, user.Password)) {
        const { password, ...result } = user;
        return result;
      }
    }
    return null;
  }

  async generateToken(Users: any) {
    const payload = {
      id: Users.UserID,
      name: Users.UserName,
      email: Users.Email,
    };

    return {
      access_token: this.jwtService.sign(payload)
    };
  }
}
