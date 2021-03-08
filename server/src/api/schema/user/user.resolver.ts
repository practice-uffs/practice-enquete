import { Resolver, Query, Mutation, Arg, Authorized } from 'type-graphql';
import { UserEntity } from '@data/entity/user.entity';
import { UserInput } from './user.input';
import { UserType } from './user.type';
import { BaseError } from '@api/error/base-error';

import bcrypt from 'bcrypt';

@Resolver()
export class UserResolver {
  @Query(() => [UserType])
  async users() {
    return UserEntity.find();
  }

  @Mutation(() => UserType)
  @Authorized()
  async createUser(@Arg('data') data: UserInput) {
    try {
      const user = UserEntity.create(data);

      user.password = await bcrypt.hash(user.password, 10);
      await user.save();

      return user;
    } catch (error) {
      if (error.code == '23505') {
        throw new BaseError(400, 'Email já cadastrado');
      } else {
        throw new BaseError(500, 'Erro ao realizar ação');
      }
    }
  }
}
