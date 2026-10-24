import { Body, Controller, Post } from '@nestjs/common'
import { CreateUserDto } from './dto/craete-user-dto.js';
import { UserService } from './user.service.js';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}
    
    @Post()
    create(@Body() createUserDto: CreateUserDto) {
        return this.userService.createUser(createUserDto);
    }
}
