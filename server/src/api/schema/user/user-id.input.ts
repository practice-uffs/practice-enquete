import { InputType, Field, Int } from 'type-graphql';
import { IsInt, Min } from 'class-validator';
import { UserIdInputModel } from '@domain/model';
import { DescriptionLocale, ValidationLocale } from '@locale';

@InputType()
export class UserIdInput implements UserIdInputModel {
  @Field(() => Int, { description: DescriptionLocale.userId })
  @IsInt({ message: ValidationLocale.userIdIsNotInt })
  @Min(0, { message: ValidationLocale.userIdMin })
  userId!: number;
}
