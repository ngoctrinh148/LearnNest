import { BaseEntity, BeforeInsert, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import * as bcrypt from 'bcrypt'
import { ApiProperty, ApiTags } from "@nestjs/swagger";

@ApiTags('User')
@Entity({ name: 'Users' })
export class Users extends BaseEntity {
    @PrimaryGeneratedColumn()
    UserID: number

    @ApiProperty({
        description: 'The name of the User',
        example: 'Example'
    })
    @Column({ nullable : false})
    UserName: string

    @ApiProperty({
        description: 'The email address of the User',
        example: 'abc@example.com'
    })
    @Column({
        nullable : false,
        unique: true
    })
    Email: string


    @ApiProperty({
        description: 'The password of the User',
        example: 'Password@123'
    })
    @Column({ nullable : false})
    Password: string

    @ApiProperty({ description: 'When User was created'})
    @CreateDateColumn({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    createAt: Date;

    @ApiProperty({ description: 'When User was updated'})
    @UpdateDateColumn({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updateAt: Date;

    @BeforeInsert()
    async setPassword(password: string) {
        const salt = await bcrypt.genSalt()
        this.Password = await bcrypt.hash(password || this.Password, salt)
    }
}
