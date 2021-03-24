import { SurveyDomain } from '@domain/survey.domain';
import { DescriptionLocale } from '@locale';
import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { CreateSurveyInput } from './create-survey.input';
import { GetSurveysByUserInput } from './get-surveys-by-user-id.input';
import { ChangeSurveyStatusInput } from './change-survey-status.input';
import { SurveyType } from './survey.type';

@Resolver()
export class SurveyResolver {
  @Mutation(() => SurveyType, { description: DescriptionLocale.createSurvey })
  createSurvey(@Arg('data') data: CreateSurveyInput): Promise<SurveyType> {
    return SurveyDomain.create(data);
  }

  @Mutation(() => String, { description: DescriptionLocale.publishSurvey })
  publishSurvey(@Arg('data') data: ChangeSurveyStatusInput): Promise<string> {
    return SurveyDomain.publishSurvey(data);
  }

  @Mutation(() => String, { description: DescriptionLocale.publishSurvey })
  closeSurvey(@Arg('data') data: ChangeSurveyStatusInput): Promise<string> {
    return SurveyDomain.closeSurvey(data);
  }

  @Query(() => [SurveyType], { description: DescriptionLocale.getSurveysByUser })
  getSurveysByUser(@Arg('data') data: GetSurveysByUserInput): Promise<SurveyType[]> {
    return SurveyDomain.getByUser(data);
  }
}
