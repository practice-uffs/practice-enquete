import { SurveyDomain } from '@domain/survey.domain';
import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { CreateSurveyInput } from './create-survey.input';
import { GetSurveysByUserInput } from './get-surveys-by-user-id.input';
import { PublishSurveyInput } from './publish-survey.input';
import { SurveyType } from './survey.type';

@Resolver()
export class SurveyResolver {
  @Mutation(() => SurveyType)
  createSurvey(@Arg('data') data: CreateSurveyInput): Promise<SurveyType> {
    return SurveyDomain.create(data);
  }

  @Mutation(() => String)
  publishSurvey(@Arg('data') data: PublishSurveyInput): Promise<string> {
    return SurveyDomain.publishSurvey(data);
  }

  @Query(() => [SurveyType])
  getSurveysByUser(@Arg('data') data: GetSurveysByUserInput): Promise<SurveyType[]> {
    return SurveyDomain.getByUser(data);
  }
}
