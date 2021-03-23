import { InputType, Field } from 'type-graphql';
import { IsInt, Min } from 'class-validator';
import { GetSurveysByUserInputModel } from '@domain/model/survey.model';

@InputType()
export class GetSurveysByUserInput implements GetSurveysByUserInputModel {
  @Field({ description: 'Identificador do usuário' })
  @IsInt({ message: 'O identificador do usuário deve ser um número inteiro' })
  @Min(0, { message: 'O identificador do usuário deve ser maior que zero' })
  userId!: number;
}
