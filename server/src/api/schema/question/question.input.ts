import { Field, registerEnumType, InputType } from 'type-graphql';
import { QuestionContentType, QuestionTypeModel } from '@domain/model';
import { DescriptionLocale } from '@locale';
import { OptionInput } from './option.input';

registerEnumType(QuestionContentType, {
  name: 'QuestionContentType',
  description: 'Tipos de pergunta',
});

@InputType()
export class QuestionInput implements QuestionTypeModel {
  @Field(() => String, { description: DescriptionLocale.questionTitle })
  title!: string;

  @Field(() => QuestionContentType, { description: DescriptionLocale.questionType })
  type!: QuestionContentType;

  @Field(() => Boolean, { description: DescriptionLocale.questionRequired })
  required!: boolean;

  @Field(() => [OptionInput], { description: DescriptionLocale.questionOptions, nullable: true })
  options?: Array<OptionInput>;

  @Field(() => String, { description: DescriptionLocale.questionPlaceholder, nullable: true })
  placeholder?: string;

  @Field(() => String, { description: DescriptionLocale.questionDefault, nullable: true })
  default?: string;

  @Field(() => String, { description: DescriptionLocale.questionMin, nullable: true })
  min?: string;

  @Field(() => String, { description: DescriptionLocale.questionMax, nullable: true })
  max?: string;
}
