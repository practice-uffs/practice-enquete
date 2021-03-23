export const userFragment = `
{
  id
  idUFFS
  name
  email
}`;

export const surveyFragment = `
{
  id
  status
  title
  questions
  code
  user ${userFragment}
}`;
