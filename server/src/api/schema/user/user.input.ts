import { InputType, Field } from 'type-graphql';
import { Length, IsEmail, IsDate, Matches } from 'class-validator';

@InputType()
export class UserInput {
  @Field()
  name!: string;

  @Field()
  @IsEmail(undefined, { message: 'O email precisa ser um endereço de e-mail válido' })
  email!: string;

  @Field()
  @Length(7, undefined, { message: 'A senha precisa ter pelo menos 7 caracteres' })
  @Matches('(?=.*[a-zA-ZÀ-ÖÙ-öù-ÿĀ-ž]+)(?=.*[0-9]+).*', undefined, {
    message: 'A senha precisa ter pelo uma letra e um número',
  })
  password!: string;

  @Field()
  @IsDate({ message: 'A data de nascimento precisa ser uma data válida' })
  birthDate!: Date;
}
