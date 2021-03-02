import { Resolver, Query, Mutation, Arg } from 'type-graphql';
import { UserEntity } from '@data/entity/user.entity';
import { UserInput } from './user.input';
import { UserType } from './user.type';
import bcrypt from 'bcrypt';

@Resolver()
export class UserResolver {
  @Query(() => [UserType])
  async users() {
    return UserEntity.find();
  }

  @Mutation(() => UserType)
  async createUser(@Arg('data') data: UserInput) {
    const user = UserEntity.create(data);

    user.password = await bcrypt.hash(user.password, 10);

    await user.save();

    return user;
  }
}
