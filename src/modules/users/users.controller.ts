import { SETTINGS } from '../app/app.utils';
import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, HttpStatus, Query, DefaultValuePipe, ParseIntPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserRegisterRequestDto } from './dto/users-register.req.dto';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { Users } from './entities/user.entity';
import { IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';

@ApiTags('User')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Get()
  async getUser(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(2), ParseIntPipe) limit: number = 1,
  ): Promise<Pagination<Users>> {
    const options: IPaginationOptions = {
      limit,
      page
    };
    return await this.usersService.paginate(options)
  }

  @ApiCreatedResponse({
    description: 'Create user object as response',
    type: Users
  })
  @Post('/register')
  async doUserRegistration(@Body(SETTINGS.VALIDATION_PIPE) dto: UserRegisterRequestDto) {
    console.log(dto);
    return await this.usersService.doUserRegistration(dto)
  }
}
