import { Resolver, Mutation, Arg } from 'type-graphql';
import { BaseError } from '@api/error/base-error';
import { LoginInput } from './login.input';
import { LoginType } from './login.type';
import { UserEntity } from '@data/entity/user.entity';
import { Authenticator } from '@api/server/authenticator';

import bcrypt from 'bcrypt';

@Resolver()
export class LoginResolver {
  @Mutation(() => LoginType)
  async login(@Arg('data') data: LoginInput) {
    const user: UserEntity | undefined = await UserEntity.findOne({ email: data.email });
    if (!user) {
      throw new BaseError(404, 'Email não cadastrado');
    }

    if (await bcrypt.compare(data.password, user.password)) {
      const token = Authenticator.getJWT({ id: user.id }, data.rememberMe);
      return { user, token };
    }

    throw new BaseError(401, 'Email ou senha incorretos');
  }
}
