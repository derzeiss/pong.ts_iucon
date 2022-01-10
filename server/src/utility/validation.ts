/**
 * Validation error class. Carries an error prop with syntax {[field]: error-msg}
 */
export class ValidationError extends Error {
  errors: { [key: string]: { message: string } };

  constructor(key?: string, message?: any) {
    super();
    // bug doesn't set prototype correctly (thanks typescript....)
    Object.setPrototypeOf(this, ValidationError.prototype);
    this.errors = {};
    this.name = 'ValidationError';
    if (key && message) this.add(key, message);
  }

  public add(key: string, message: string) {
    if (this.errors[key]?.message) message = this.errors[key].message + ', ' + message; // concat messages if one was already set for this field
    this.errors[key] = { message };
    return this;
  }

  public hasErrors() {
    return Object.keys(this.errors).length;
  }
}

/**
 * Validation function. Returns error message or null
 */
type Validator = (val: any) => string | null;
/**
 * Used to create a validator with user-defined error message
 */
type ValidatorFactory = (msg?: string) => Validator;
type FieldValidators = { [key: string]: Validator[] };

/**
 *
 * @param obj - object to validate
 * @param validationSchema - validator object with shape symmetric to obj
 */
export const validate = (obj: any, validationSchema: FieldValidators): ValidationError => {
  const errContainer = new ValidationError();
  Object.keys(validationSchema).forEach((key) => {
    const fieldValue = obj[key];
    for (const validator of validationSchema[key]) {
      const err = validator(fieldValue);
      if (err) errContainer.add(key, err);
    }
  });
  return errContainer;
};

/**
 * Collection of common validator functions
 */
export const Vs = {
  required:
    (msg = 'must be set') =>
    (val) =>
      val === undefined || val === null || val === '' ? msg : null,
  string:
    (msg = 'must be a string') =>
    (val) =>
      typeof val === 'string' ? null : msg,
  number:
    (msg = 'must be a number') =>
    (val) =>
      typeof val === 'number' ? null : msg,
  array:
    (msg = 'must be an array') =>
    (val) =>
      Array.isArray(val) ? null : msg,
} as { [name: string]: ValidatorFactory };
