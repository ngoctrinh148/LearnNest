import { BaseEntity, BeforeInsert, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import * as bcrypt from 'bcrypt'

@Entity({ name: 'Users' })
export class Users extends BaseEntity {
    @PrimaryGeneratedColumn()
    UserID: number

    @Column({ nullable : false})
    UserName: string

    @Column({
        nullable : false,
        unique: true
    })
    Email: string

    @Column({ nullable : false})
    Password: string

    @CreateDateColumn({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    createAt: Date;

    @UpdateDateColumn({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updateAt: Date;

    @BeforeInsert()
    async setPassword(password: string) {
        const salt = await bcrypt.genSalt()
        this.Password = await bcrypt.hash(password || this.Password, salt)
    }
}
