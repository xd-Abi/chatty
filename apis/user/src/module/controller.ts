import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities';
import { GetUserInterface, RegisterInterface } from './interfaces';

@Controller()
export class UserController {
  @MessagePattern({ cmd: 'register' })
  async register(data: RegisterInterface) {
    return await this.repository.save(data);
  }

  @MessagePattern({ cmd: 'get-user' })
  async getUser(data: GetUserInterface) {
    return await this.repository.findOneBy({ uid: data.uid });
  }

  constructor(@InjectRepository(User) private repository: Repository<User>) {}
}
