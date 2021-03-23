import { SurveyDomain } from '@domain/survey.domain';
import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { CreateSurveyInput } from './create-survey.input';
import { GetSurveysByUserIdInput } from './get-surveys-by-user-id.input';
import { SurveyType } from './survey.type';

@Resolver()
export class SurveyResolver {
  @Mutation(() => SurveyType)
  createSurvey(@Arg('data') data: CreateSurveyInput): Promise<SurveyType> {
    return SurveyDomain.create(data);
  }

  @Query(() => [SurveyType])
  getSurveysByUserId(@Arg('data') data: GetSurveysByUserIdInput): Promise<SurveyType[]> {
    return SurveyDomain.getByUserId(data.userId);
  }
}
