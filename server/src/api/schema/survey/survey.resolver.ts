import { SurveyDomain } from '@domain/survey.domain';
import { Arg, Mutation, Resolver } from 'type-graphql';
import { SurveyInput } from './survey.input';
import { SurveyType } from './survey.type';

@Resolver()
export class SurveyResolver {
  @Mutation(() => SurveyType)
  createSurvey(@Arg('data') data: SurveyInput): Promise<SurveyType> {
    return SurveyDomain.create(data);
  }
}
