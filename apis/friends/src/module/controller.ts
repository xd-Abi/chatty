import { Controller } from '@nestjs/common';
import { MessagePattern, RpcException } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  AcceptFriendRequestInterface,
  AddFriendInterface,
  GetFriendRequestsInterface,
  GetFriendsInterface,
  RejectFriendRequestInterface,
} from './interfaces';
import { Friend } from './entities';

@Controller()
export class FriendController {
  @MessagePattern({ cmd: 'get-friends' })
  async getFriends(data: GetFriendsInterface) {
    let friends = [];
    friends.push(
      await this.repository.findBy({
        recipient: data.uid,
        status: 'accepted',
      }),
    );
    friends.push(
      await this.repository.findBy({
        sender: data.uid,
        status: 'accepted',
      }),
    );

    return friends;
  }

  @MessagePattern({ cmd: 'get-friends-requests' })
  async getFriendsRequest(data: GetFriendRequestsInterface) {
    let requests = [];
    requests.push(
      await this.repository.findBy({
        recipient: data.uid,
        status: 'pending',
      }),
    );
    requests.push(
      await this.repository.findBy({
        sender: data.uid,
        status: 'pending',
      }),
    );

    return requests;
  }

  @MessagePattern({ cmd: 'add-friend' })
  async addFriend(data: AddFriendInterface) {
    const request = await this.repository.findOneBy({
      sender: data.uid,
      recipient: data.recipient,
    });

    if (request) {
      throw new RpcException('Request is already sent');
    }

    return await this.repository.save({
      sender: data.uid,
      recipient: data.recipient,
      status: 'pending',
    });
  }

  @MessagePattern({ cmd: 'accept-friend' })
  async acceptFriend(data: AcceptFriendRequestInterface) {
    const request = await this.repository.findOneBy({
      id: data.id,
      recipient: data.uid,
    });

    if (!request) {
      throw new RpcException('Request is does not exists');
    }

    request.status = 'accepted';
    return await this.repository.save(request);
  }

  @MessagePattern({ cmd: 'reject-friend' })
  async rejectFriend(data: RejectFriendRequestInterface) {
    const request = await this.repository.findOneBy({
      id: data.id,
      recipient: data.uid,
    });

    if (!request) {
      throw new RpcException('Request is does not exists');
    }

    request.status = 'accepted';
    return await this.repository.save(request);
  }

  constructor(
    @InjectRepository(Friend) private repository: Repository<Friend>,
  ) {}
}
