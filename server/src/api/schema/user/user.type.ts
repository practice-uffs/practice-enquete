import { UserTypeModel } from '@domain/model/user.model';
import { DescriptionLocale } from '@locale';
import { ObjectType, Field, Int } from 'type-graphql';

@ObjectType()
export class UserType implements UserTypeModel {
  @Field(() => Int, { description: DescriptionLocale.userId })
  id!: number;

  @Field(() => String, { description: DescriptionLocale.userIdUFFS })
  idUFFS!: string;

  @Field(() => String, { description: DescriptionLocale.userEmail })
  email!: string;

  @Field(() => String, { description: DescriptionLocale.userName })
  name!: string;
}
