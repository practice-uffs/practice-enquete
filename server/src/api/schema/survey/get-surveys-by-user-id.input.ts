import { InputType, Field } from 'type-graphql';
import { IsInt, IsJSON, IsString, Min } from 'class-validator';
import { GetSurveysByUserIdInputModel } from '@domain/model/survey.model';

@InputType()
export class GetSurveysByUserIdInput implements GetSurveysByUserIdInputModel {
  @Field({ description: 'Identificador do usuário' })
  @IsInt({ message: 'O identificador do usuário deve ser um número inteiro' })
  @Min(0, { message: 'O identificador do usuário deve ser maior que zero' })
  userId!: number;
}
