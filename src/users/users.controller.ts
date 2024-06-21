import { SETTINGS } from './../app.utils';
import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserRegisterRequestDto } from './dto/users-register.req.dto';


@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Get()
  getUser() { return this.usersService.getUsers()}

  @Post('/register')
  async doUserRegistration(@Body(SETTINGS.VALIDATION_PIPE) dto: UserRegisterRequestDto) {
    console.log(dto);
    return await this.usersService.doUserRegistration(dto)
  }
}
