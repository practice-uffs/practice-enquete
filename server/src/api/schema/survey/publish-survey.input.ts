import { InputType, Field } from 'type-graphql';
import { IsInt, Min } from 'class-validator';
import { PublishSurveyInputModel } from '@domain/model/survey.model';

@InputType()
export class PublishSurveyInput implements PublishSurveyInputModel {
  @Field({ description: 'Identificador do usuário' })
  @IsInt({ message: 'O identificador da enquete deve ser um número inteiro' })
  @Min(0, { message: 'O identificador da enquete deve ser maior que zero' })
  surveyId!: number;
}
