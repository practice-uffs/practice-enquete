import { InputType, Field } from 'type-graphql';
import { IsInt, IsJSON, IsString, Min } from 'class-validator';
import { CreateSurveyInputModel } from '@domain/model';
import { DescriptionLocale, ValidationLocale } from '@locale';

@InputType()
export class CreateSurveyInput implements CreateSurveyInputModel {
  @Field({ description: DescriptionLocale.userId })
  @IsInt({ message: ValidationLocale.surveyIdIsNotInt })
  @Min(0, { message: ValidationLocale.surveyIdMin })
  userId!: number;

  @Field({ description: DescriptionLocale.surveyTitle })
  @IsString({ message: ValidationLocale.surveyTitleIsString })
  title!: string;

  @Field({ description: DescriptionLocale.surveyQuestions })
  @IsJSON({ message: ValidationLocale.surveyQuestionsIsJson })
  questions!: string;
}
