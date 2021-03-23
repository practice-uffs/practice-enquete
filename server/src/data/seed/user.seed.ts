import { UserEntity } from '@data/entity/user.entity';
import faker from 'faker';

export const UserSeed = async (numUsers: Number = 50): Promise<void> => {
  faker.seed(0);

  await UserEntity.delete({});

  for (let i = 0; i < numUsers; i++) {
    let user = UserEntity.create({
      idUFFS: faker.internet.userName(),
      name: faker.name.findName(),
      email: faker.internet.email(),
    });
    await user.save();
  }
};
