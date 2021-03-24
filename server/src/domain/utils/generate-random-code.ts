export function generateRandomCode(length: number): string {
  const dictionary = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  let code = '';
  for (let i = 0; i < length; i++) {
    code += dictionary.charAt(Math.floor(Math.random() * dictionary.length));
  }

  return code;
}
