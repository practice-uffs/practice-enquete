export const userFragment = `
{
  id
  idUFFS
  name
  email
}`;

export const optionFragment = `
{
  value
  label
}`;

export const questionFragment = `
{
  title
  type
  required
  options ${optionFragment}
  placeholder
  default
  min
  max
}`;

export const surveyFragment = `
{
  id
  status
  title
  code
  questions ${questionFragment}
  user ${userFragment}
}`;
