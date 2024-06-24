import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UserRegisterRequestDto } from './dto/users-register.req.dto';
import { ApiBadRequestResponse } from '@nestjs/swagger';
import { IPaginationOptions, Pagination, paginate } from 'nestjs-typeorm-paginate';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(Users) private readonly usersRepository: Repository<Users>) { }

    getUsers() {
        return this.usersRepository.find();
    }

    async paginate(options: IPaginationOptions): Promise<Pagination<Users>>{
        const qb = this.usersRepository.createQueryBuilder('q')
        qb.orderBy('q.UserID', 'ASC');
        
        return paginate<Users>(qb, options)
    }

    @ApiBadRequestResponse({ description: 'User cannot register. Try again!'})
    async doUserRegistration(dto : UserRegisterRequestDto): Promise<Users> {
        const user = new Users();
        user.UserName = dto.UserName
        user.Email = dto.Email
        user.Password = dto.Password

        return await this.usersRepository.save(user);
    }

    async getUserByUserName(username: string): Promise<any> {        
        return await this.usersRepository.findOne({where:{UserName: username}})
      }
}
