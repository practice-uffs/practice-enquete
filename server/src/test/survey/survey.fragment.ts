export const createSurveyFragment = `
  mutation createSurvey($data: SurveyInput!) {
    createSurvey(data: $data) {
      id
      status
      title
      questions
      code
      user {
        id
        idUFFS
        name
        email
      }
    }
  }`;
