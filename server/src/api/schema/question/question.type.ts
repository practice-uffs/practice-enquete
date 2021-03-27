import { ObjectType, Field, registerEnumType } from 'type-graphql';
import { QuestionContentType, QuestionTypeModel } from '@domain/model';
import { DescriptionLocale } from '@locale';
import { OptionType } from './option.type';

registerEnumType(QuestionContentType, {
  name: 'QuestionContentType',
  description: 'Tipos de pergunta',
});

@ObjectType()
export class QuestionType implements QuestionTypeModel {
  @Field(() => String, { description: DescriptionLocale.questionTitle })
  title!: string;

  @Field(() => QuestionContentType, { description: DescriptionLocale.questionType })
  type!: QuestionContentType;

  @Field(() => Boolean, { description: DescriptionLocale.questionRequired })
  required!: boolean;

  @Field(() => [OptionType], { description: DescriptionLocale.questionOptions })
  options?: Array<OptionType>;

  @Field(() => String, { description: DescriptionLocale.questionPlaceholder })
  placeholder?: string;

  @Field(() => String, { description: DescriptionLocale.questionDefault })
  default?: string;

  @Field(() => String, { description: DescriptionLocale.questionMin })
  min?: string;

  @Field(() => String, { description: DescriptionLocale.questionMax })
  max?: string;
}
