import { InputType, Field } from 'type-graphql';
import { IsInt, Min } from 'class-validator';
import { GetSurveysByUserInputModel } from '@domain/model/survey.model';
import { DescriptionLocale, ValidationLocale } from '@locale';

@InputType()
export class GetSurveysByUserInput implements GetSurveysByUserInputModel {
  @Field({ description: DescriptionLocale.userId })
  @IsInt({ message: ValidationLocale.userIdIsNotInt })
  @Min(0, { message: ValidationLocale.userIdMin })
  userId!: number;
}
