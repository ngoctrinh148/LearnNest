import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UserRegisterRequestDto } from './dto/users-register.req.dto';
import * as bcrypt from 'bcrypt'

@Injectable()
export class UsersService {
    constructor(@InjectRepository(Users) private readonly usersRepository: Repository<Users>) { }

    getUsers() {
        return this.usersRepository.find();
    }

    async doUserRegistration(dto : UserRegisterRequestDto): Promise<Users> {
        const user = new Users();
        user.UserName = dto.UserName
        user.Email = dto.Email
        user.Password = dto.Password

        return await this.usersRepository.save(user);
    }

    async getUserByUsername(UserName: string): Promise<Users | null> {
        return await Users.findOne({ where: { UserName } });
    }
}
