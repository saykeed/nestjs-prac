import { Body, Controller, Get, Patch, Post, Request, UseGuards } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user-dto.js';
import { UserService } from './user.service.js';
import { JwtAuthGuard } from '../auth/jwt-auth.guard.js';
import { ApiBearerAuth } from '@nestjs/swagger';
import { UpdateUserDto } from './dto/update-user-dto.js';

type requestType = { user: { userId: number; email: string } }

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}
    
    @Post()
    create(@Body() createUserDto: CreateUserDto) {
        return this.userService.createUser(createUserDto);
    }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Get('me')
    getMe(@Request() req: requestType) {
        return this.userService.findById(req?.user?.userId)
    }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Patch('me')
    updateMe(@Request() req: requestType, @Body() updateUserDto: UpdateUserDto) {
        return this.userService.updateUser(req?.user?.userId, updateUserDto)
    }
}
