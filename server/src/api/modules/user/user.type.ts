import { ObjectType, Field, ID } from 'type-graphql';

@ObjectType()
export class UserType {
  @Field(() => ID, { description: 'User id' })
  id!: string;

  @Field(() => String, { description: 'User name' })
  name!: string;

  @Field(() => String, { description: 'User e-mail' })
  email!: string;

  @Field(() => Date, { description: 'User birth date' })
  birthDate!: Date;
}
