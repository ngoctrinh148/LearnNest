import { Controller, Post, Request, UseGuards, Get, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { JwtAuthGuard } from './jwt.auth.guard';
import { CreateCustomerDto } from 'src/customers/dto/create-customer.dto';
import { UsersService } from 'src/users/users.service';

@Controller('auth')
export class AuthController {
    constructor(private  authService: AuthService,
                private  usersService: UsersService) {}

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req): Promise<any> {
        // return  await this.authService.generateToken(req.user);
        return await this.authService.login(req.user)
    }

    @UseGuards(JwtAuthGuard)
    @Get('user')
    async getUser(@Request() req): Promise<any> {
        return req.user;
    }
}
