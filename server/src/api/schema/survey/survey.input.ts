import { InputType, Field } from 'type-graphql';
import { IsInt, IsJSON, IsString, Min } from 'class-validator';
import { SurveyInputModel } from '@domain/model/survey.model';

@InputType()
export class SurveyInput implements SurveyInputModel {
  @Field({ description: 'Identificador do usuário' })
  @IsInt({ message: 'O identificador do usuário deve ser um número inteiro' })
  @Min(0, { message: 'O identificador do usuário deve ser maior que zero' })
  userId!: number;

  @Field({ description: 'Título da enquete' })
  @IsString({ message: 'O título precisa ser uma sequência de caracteres' })
  title!: string;

  @Field({ description: 'Perguntas da enquete' })
  @IsJSON({ message: 'As perguntas precisam ser uma lista de objetos transformada em JSON' })
  questions!: string;
}
