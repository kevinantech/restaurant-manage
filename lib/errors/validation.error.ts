export class ValidationError extends Error {
  constructor(message = 'Formato inválido') {
    super(message);
  }
}
