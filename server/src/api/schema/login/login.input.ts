import { InputType, Field } from 'type-graphql';
import { Length, IsEmail, Matches, IsBoolean } from 'class-validator';

@InputType()
export class LoginInput {
  @Field()
  @IsEmail(undefined, { message: 'O email precisa ser um endereço de e-mail válido' })
  email!: string;

  @Field()
  @Length(7, undefined, { message: 'A senha precisa ter pelo menos 7 caracteres' })
  @Matches('(?=.*[a-zA-ZÀ-ÖÙ-öù-ÿĀ-ž]+)(?=.*[0-9]+).*', undefined, {
    message: 'A senha precisa ter pelo uma letra e um número',
  })
  password!: string;

  @Field(() => Boolean, { defaultValue: false })
  @IsBoolean({ message: 'Lembrar login precisa ser verdadeiro ou falso' })
  rememberMe: boolean = false;
}
