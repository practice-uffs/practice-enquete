import { OptionTypeModel } from '@domain/model';
import { DescriptionLocale } from '@locale';
import { ObjectType, Field } from 'type-graphql';

@ObjectType()
export class OptionType implements OptionTypeModel {
  @Field(() => String, { description: DescriptionLocale.optionValue })
  value!: string;

  @Field(() => String, { description: DescriptionLocale.optionLabel })
  label!: string;
}
