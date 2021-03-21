import { SurveyUseCase } from '@domain/use-case/survey.use-case';
import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { SurveyInput } from './survey.input';
import { SurveyType } from './survey.type';

@Resolver()
export class SurveyResolver {
  @Mutation(() => SurveyType)
  createSurvey(@Arg('data') data: SurveyInput): Promise<SurveyType> {
    return SurveyUseCase.create(data);
  }
}
