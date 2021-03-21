import { UserEntity } from '@data/entity/user.entity';
import faker from 'faker';

export const UserSeed = async (numUsers: Number = 50): Promise<UserEntity[]> => {
  faker.seed(10);

  await UserEntity.delete({});

  const users = [];
  for (let i = 0; i < numUsers; i++) {
    users.push(
      UserEntity.create({
        idUFFS: faker.internet.userName(),
        name: faker.name.findName(),
        email: faker.internet.email(),
      }),
    );

    await users[i].save();
  }

  return users;
};
