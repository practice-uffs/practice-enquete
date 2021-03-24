import { SurveyTypeModel } from '@domain/model/survey.model';
import { ObjectType, Field, Int } from 'type-graphql';
import { UserType } from '../user/user.type';

@ObjectType()
export class SurveyType implements SurveyTypeModel {
  @Field(() => Int, { description: 'Identificador da enquete' })
  id!: number;

  @Field(() => UserType, { description: 'Usuário criador da enquete' })
  user!: UserType;

  @Field(() => String, { description: 'Estado da enquete' })
  status!: string;

  @Field(() => String, { description: 'Título da enquete' })
  title!: string;

  @Field(() => String, { description: 'Perguntas da enquete' })
  questions!: string;

  @Field(() => String, { description: 'Código hash da enquete' })
  code!: string;
}
