import { Injectable } from "@nestjs/common";
import { JwtService } from '@nestjs/jwt'
import { UserService } from "../users/user.service.js";
import { CreateUserDto } from "../users/dto/create-user-dto.js";
import bycrypt from 'bcrypt'

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ) {}

    register(createUserDto: CreateUserDto) {
        return this.userService.createUser(createUserDto)
    }

    async validateUser(email: string, password: string) {
        const user = await this.userService.findByEmail(email);
        if (!user) {
            return null;
        }

        const passwordValid = await bycrypt.compare(password, user.password);
        if (!passwordValid) {
            return null;
        }

        const { password: _password, ...result} = user
        return result;
    }

    login(user: { id: number, email: string }) {
        const payload = { email: user.email, sub: user.id}
        return {
            access_token: this.jwtService.sign(payload)
        }
    }
}
