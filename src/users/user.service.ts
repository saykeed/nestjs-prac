import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import bycrypt from 'bcrypt'
import { User } from "./user.entity.js";
import { CreateUserDto } from "./dto/create-user-dto.js";
import { UpdateUserDto } from "./dto/update-user-dto.js";


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

    findByEmail(email: string) {
        return this.usersRepository.findOne({
            where: { email }
        })
    }

    async findById(id: number) {
        const user = await this.usersRepository.findOne({
            where: { id }
        })
        if (!user) {
            throw new NotFoundException('User not found')
        }
        return user;
    }

    async updateUser (userId: number, updateUserDto: UpdateUserDto) {
        const user = await this.findById(userId)
        Object.assign(user, updateUserDto)
        return this.usersRepository.save(user)
    }
}