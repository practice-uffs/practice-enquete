import { InputType, Field } from 'type-graphql';
import { IsArray, IsInt, IsString, Min } from 'class-validator';
import { CreateSurveyInputModel } from '@domain/model';
import { DescriptionLocale, ValidationLocale } from '@locale';
import { QuestionInput } from '@api/schema/question/question.input';

@InputType()
export class CreateSurveyInput implements CreateSurveyInputModel {
  @Field({ description: DescriptionLocale.userId })
  @IsInt({ message: ValidationLocale.surveyIdIsNotInt })
  @Min(0, { message: ValidationLocale.surveyIdMin })
  userId!: number;

  @Field({ description: DescriptionLocale.surveyTitle })
  @IsString({ message: ValidationLocale.surveyTitleIsString })
  title!: string;

  @Field(() => [QuestionInput], { description: DescriptionLocale.surveyQuestions })
  @IsArray({ message: ValidationLocale.surveyQuestionsIsArray })
  questions!: Array<QuestionInput>;
}
