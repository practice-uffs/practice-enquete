import { InputType, Field, Int } from 'type-graphql';
import { IsInt, Min } from 'class-validator';
import { SurveyIdInputModel } from '@domain/model';
import { DescriptionLocale, ValidationLocale } from '@locale';

@InputType()
export class SurveyIdInput implements SurveyIdInputModel {
  @Field(() => Int, { description: DescriptionLocale.surveyId })
  @IsInt({ message: ValidationLocale.surveyIdIsNotInt })
  @Min(0, { message: ValidationLocale.surveyIdMin })
  surveyId!: number;
}
