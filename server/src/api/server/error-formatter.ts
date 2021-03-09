import { GraphQLError } from 'graphql';
import { ArgumentValidationError } from 'type-graphql';
import { BaseError } from '../error/base-error';

export const ErrorFormatter = (err: GraphQLError) => {
  const originalError = err.originalError;
  let code: number = 500;
  let message: string;
  let details;

  if (originalError instanceof BaseError) {
    code = originalError.code;
    message = originalError.message;
    details = originalError.details;
  } else if (originalError instanceof ArgumentValidationError) {
    const errors = originalError.validationErrors.map((validationError) => {
      const messages = [];
      for (let key in validationError.constraints) {
        messages.push(validationError.constraints[key]);
      }
      return messages;
    });
    code = 400;
    details = errors.toString().split(',');
    message = 'Argumentos inválidos';
  } else {
    message = err.message;
    details = err?.extensions?.exception.detail;
  }

  return {
    code: code,
    message: message,
    details: details,
  };
};
