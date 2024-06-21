import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Users } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) { }

  async validateUser(username: string, pass: string): Promise<any> {
    console.log('check');
    console.log('check user:', username, pass);

    const user = await this.usersService.findOne(username);
    console.log('check userFindone', user);

    if (user) {
      console.log('check3:', user);
      if (!await bcrypt.compare(pass, user.password)) {
        const { password, ...result } = user;
        return result;
      }else{
        console.log("Pass fail");
        
      }
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async generateToken(user: any) {
    return {
      access_token: this.jwtService.sign({
        name: user.name,
        sub: user.id
      })
    };
  }
}
