import { Controller, Post, Request, UseGuards, Get, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard, LocalAuthGuard } from './local-auth.guard';
import { UsersService } from 'src/users/users.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
        private usersService: UsersService) { }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req) {
        return this.authService.generateToken(req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Request() res) {
        return res.user;
    }
}
