import 'reflect-metadata'
import { config } from 'dotenv'
import { DataSource } from 'typeorm'
import { User } from '../users/user.entity.js' 
import { Folder } from '../folders/folder.entity.js'
import { Note } from '../notes/note.entity.js'

config();

export default new DataSource({
    type: 'mysql',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [User, Folder, Note],
    migrations: ['dist/database/migrations/*.js'],
})