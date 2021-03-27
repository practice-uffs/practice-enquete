export enum QuestionContentType {
  shortText = 'shortText',
  longText = 'longText',
  intNumber = 'intNumber',
  floatNumber = 'floatNumber',
  date = 'date',
  time = 'time',
  dateTime = 'dateTime',
  multipleChoice = 'multipleChoice',
  oneChoice = 'oneChoice',
  gridMultipleChoice = 'gridMultipleChoice',
  gridOneChoice = 'gridOneChoice',
  linearScale = 'linearScale',
}

export interface OptionTypeModel {
  value: string;
  label: string;
}

export interface QuestionTypeModel {
  title: string;
  type: QuestionContentType;
  required: boolean;
  options?: Array<OptionTypeModel>;
  placeholder?: string;
  default?: string;
  min?: string;
  max?: string;
}
