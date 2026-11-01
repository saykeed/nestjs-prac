import { Body, Controller, Get, HttpCode, Post, Request, UseGuards } from "@nestjs/common";
import { ApiBearerAuth } from "@nestjs/swagger";
import { AuthService } from "./auth.service.js";
import { CreateUserDto } from "../users/dto/create-user-dto.js";
import { LocalAuthGuard } from "./local-auth.guard.js";
import { LoginDto } from "./dto/login.dto.js";
import { JwtAuthGuard } from "./jwt-auth.guard.js";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('register')
    register(@Body() createUserDto: CreateUserDto) {
        return this.authService.register(createUserDto)
    }

    @HttpCode(200)
    @UseGuards(LocalAuthGuard)
    @Post('login')
    login(
        @Request() req: { user: { id: number, email: string }},
        @Body() _loginDto: LoginDto
    ) {
        return this.authService.login(req.user)
    }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Get('profile')
    getProfile(
        @Request() req: { user: { userId: number, email: string}}
    ) {
        return req.user
    }
}
