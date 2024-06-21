// import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
// import { UsersService } from 'src/users/users.service';
// import * as bcrypt from 'bcrypt'
// import { JwtService } from '@nestjs/jwt';

// @Injectable()
// export class AuthService {
//     constructor(private userService: UsersService,
//                 private jwtService: JwtService) { }

//     async validateUserCreds(email: string, password: string): Promise<any> {
//         console.log(`Fetching user with email: ${email}`);
//         const user = await this.userService.getUserByEmail(email)

//         if (!user) throw new BadRequestException();

//         const isMatch = await bcrypt.compare(password, user.Password);
//         console.log(isMatch);
//         const passwordMatch = await bcrypt.compare(password, user.Password);

//         if (! await passwordMatch) {
//             throw new UnauthorizedException('Invalid password');
//         }

//         return user;
//     }


//     async generateToken(user: any){
//         return{
//             access_token: this.jwtService.sign({
//                 name : user.name,
//                 sub: user
//             })
//         }
//     }
// }

import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Users } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {
    constructor(
        private userService: UsersService,
        private jwtService: JwtService
    ) {}

    async validateUser(UserName: string, Password: string): Promise<any> {
        const user = await this.userService.getUserByUsername(UserName);
        if (!user) {
            throw new BadRequestException();
        }
        if (!await bcrypt.compare(Password, user.Password)) {
            throw new UnauthorizedException('Invalid password');
        }
        return user;
    }

    async login(user: Users){
        const payload = {
            username: user.UserName,
            sub:{
                email: user.Email
            }
        }
        return{
            ...user,
            accessToken: this.jwtService.sign(payload)
        }
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
