import * as Yup from 'yup';
import type { FormField } from '../type/type';

export function buildYupSchema(fields: FormField[]) {
  const shape: Record<string, Yup.AnySchema> = {};

  for (const field of fields) {
    const { type, validation } = field;
    let schema: Yup.AnySchema;

    if (type === 'number') {
      let numSchema = Yup.number().typeError(`${field.label} must be a number`);
      if (validation.required) numSchema = numSchema.required(`${field.label} is required`);
      if (validation.min !== undefined) numSchema = numSchema.min(validation.min, `${field.label} must be at least ${validation.min}`);
      if (validation.max !== undefined) numSchema = numSchema.max(validation.max, `${field.label} must be at most ${validation.max}`);
      schema = numSchema;
    } else if (type === 'checkbox') {
      let boolSchema = Yup.boolean();
      if (validation.required) boolSchema = boolSchema.oneOf([true], `${field.label} must be accepted`);
      schema = boolSchema;
    } else {
      let strSchema = Yup.string();
      if (validation.required) strSchema = strSchema.required(`${field.label} is required`);
      if (type === 'email') strSchema = strSchema.email('Please enter a valid email address');
      if (type === 'phone') strSchema = strSchema.matches(/^[+\d\s\-().]{7,15}$/, 'Please enter a valid phone number');
      if (validation.minLength !== undefined) strSchema = strSchema.min(validation.minLength, `${field.label} must be at least ${validation.minLength} characters`);
      if (validation.maxLength !== undefined) strSchema = strSchema.max(validation.maxLength, `${field.label} must be at most ${validation.maxLength} characters`);
      if (validation.pattern) strSchema = strSchema.matches(new RegExp(validation.pattern), validation.patternMessage || `${field.label} format is invalid`);
      schema = strSchema;
    }

    shape[field.name] = schema;
  }

  return Yup.object().shape(shape);
}

export function buildInitialValues(fields: FormField[]): Record<string, unknown> {
  const values: Record<string, unknown> = {};
  for (const field of fields) {
    if (field.type === 'checkbox') values[field.name] = false;
    else if (field.type === 'number') values[field.name] = '';
    else values[field.name] = '';
  }
  return values;
}
