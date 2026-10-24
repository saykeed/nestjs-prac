import { ConflictException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import bycrypt from 'bcrypt'
import { User } from "./user.entity.js";
import { CreateUserDto } from "./dto/craete-user-dto.js";


@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
    ) {}

    async createUser(createUserDto: CreateUserDto) {
        const existing = await this.usersRepository.findOne({
            where: { email: createUserDto.email }
        })

        if (existing) {
            throw new ConflictException('Email already exists');
        }

        const password = await bycrypt.hash(createUserDto.password, 10)
        return this.usersRepository.save(
            this.usersRepository.create({
                ...createUserDto,
                password,
            })
        )
    }
}