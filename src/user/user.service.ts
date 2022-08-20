/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';

// Service for actions with user
@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>,
    ) {};

    public async findById(id: number): Promise<UserEntity> {
        return await this.userRepository.findOneBy({
            id: id
        });
    };

    public async findByNameWithPassword(name: string, password: string): Promise<UserEntity> {        
        return await this.userRepository.findOneBy({
            name: name,
            password: password
        });
    };

    public async findByName(name: string): Promise<UserEntity> {
        return await this.userRepository.findOneBy({
            name: name
        });
    };

    public async getAllUsers(): Promise<UserEntity[]> {
        return await this.userRepository.find();
    }
}
