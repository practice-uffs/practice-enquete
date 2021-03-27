import { OptionTypeModel } from '@domain/model';
import { DescriptionLocale } from '@locale';
import { Field, InputType } from 'type-graphql';

@InputType()
export class OptionInput implements OptionTypeModel {
  @Field(() => String, { description: DescriptionLocale.optionValue })
  value!: string;

  @Field(() => String, { description: DescriptionLocale.optionLabel })
  label!: string;
}
