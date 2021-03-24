import { InputType, Field } from 'type-graphql';
import { IsInt, Min } from 'class-validator';
import { ChangeSurveyStatusInputModel } from '@domain/model/survey.model';
import { DescriptionLocale, ValidationLocale } from '@locale';

@InputType()
export class ChangeSurveyStatusInput implements ChangeSurveyStatusInputModel {
  @Field({ description: DescriptionLocale.surveyId })
  @IsInt({ message: ValidationLocale.surveyIdIsNotInt })
  @Min(0, { message: ValidationLocale.surveyIdMin })
  surveyId!: number;
}
