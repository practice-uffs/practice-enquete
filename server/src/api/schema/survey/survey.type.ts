import { QuestionTypeModel, SurveyTypeModel } from '@domain/model';
import { DescriptionLocale } from '@locale';
import { ObjectType, Field, Int } from 'type-graphql';
import { QuestionType } from '@api/schema/question/question.type';
import { UserType } from '@api/schema/user/user.type';

@ObjectType()
export class SurveyType implements SurveyTypeModel {
  @Field(() => Int, { description: DescriptionLocale.surveyId })
  id!: number;

  @Field(() => UserType, { description: DescriptionLocale.surveyUser })
  user!: UserType;

  @Field(() => String, { description: DescriptionLocale.surveyStatus })
  status!: string;

  @Field(() => String, { description: DescriptionLocale.surveyTitle })
  title!: string;

  @Field(() => [QuestionType], { description: DescriptionLocale.surveyQuestions })
  questions!: Array<QuestionTypeModel>;

  @Field(() => String, { description: DescriptionLocale.surveyCode })
  code!: string;
}
