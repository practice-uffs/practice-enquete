import { UserTypeModel } from '@domain/model/user.model';
import { ObjectType, Field, ID } from 'type-graphql';

@ObjectType()
export class UserType implements UserTypeModel {
  @Field(() => ID, { description: 'Identificador do usuário' })
  id!: number;

  @Field(() => String, { description: 'IdUFFS do usuário' })
  idUFFS!: string;

  @Field(() => String, { description: 'Email do usuário' })
  email!: string;

  @Field(() => String, { description: 'Nome do usuário' })
  name!: string;
}
