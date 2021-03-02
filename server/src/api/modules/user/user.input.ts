import { InputType, Field } from 'type-graphql';
import { Length, IsEmail, IsDate, Matches } from 'class-validator';

@InputType()
export class UserInput {
  @Field()
  name!: string;

  @Field()
  @IsEmail()
  email!: string;

  @Field()
  @Length(7)
  @Matches('(?=.*[a-zA-ZÀ-ÖÙ-öù-ÿĀ-ž]+)(?=.*[0-9]+).*')
  password!: string;

  @Field()
  @IsDate()
  birthDate!: Date;
}
