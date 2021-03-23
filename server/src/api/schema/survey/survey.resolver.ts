import { SurveyDomain } from '@domain/survey.domain';
import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { CreateSurveyInput } from './create-survey.input';
import { GetSurveysByUserInput } from './get-surveys-by-user-id.input';
import { SurveyType } from './survey.type';

@Resolver()
export class SurveyResolver {
  @Mutation(() => SurveyType)
  createSurvey(@Arg('data') data: CreateSurveyInput): Promise<SurveyType> {
    return SurveyDomain.create(data);
  }

  @Query(() => [SurveyType])
  getSurveysByUser(@Arg('data') data: GetSurveysByUserInput): Promise<SurveyType[]> {
    return SurveyDomain.getByUser(data.userId);
  }
}
