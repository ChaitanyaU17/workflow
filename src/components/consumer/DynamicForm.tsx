import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import type { FormSchema } from '../../type/type';
import { buildYupSchema, buildInitialValues } from '../../utils/yupBuilder';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';

interface DynamicFormProps {
  schema: FormSchema;
  initialValues?: Record<string, unknown>;
  onSubmit: (values: Record<string, unknown>) => void;
  onBack?: () => void;
  isLastStep?: boolean;
  isFirstStep?: boolean;
}

const DynamicForm: React.FC<DynamicFormProps> = ({
  schema,
  initialValues,
  onSubmit,
  onBack,
  isLastStep = false,
  isFirstStep = true,
}) => {
  const yupSchema = buildYupSchema(schema.fields);
  const defaults = buildInitialValues(schema.fields);
  const merged = { ...defaults, ...(initialValues ?? {}) };

  return (
    <Formik
      initialValues={merged as Record<string, string | number | boolean>}
      validationSchema={yupSchema}
      onSubmit={(values) => onSubmit(values as Record<string, unknown>)}
      enableReinitialize
    >
      {({ isSubmitting, values, setFieldValue, errors, touched }) => (
        <Form noValidate>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider', pb: 2 }}>
              <Typography variant="h5" sx={{ fontWeight: 700 }}>{schema.title}</Typography>
              <Typography variant="body2" color="text.secondary">
                {schema.fields.length} field{schema.fields.length !== 1 ? 's' : ''}
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
              {schema.fields.map(field => {
                const hasError = Boolean(touched[field.name] && errors[field.name]);
                const errorMsg = errors[field.name] as string | undefined;

                return (
                  <Box key={field.id}>
                    {field.type === 'textarea' ? (
                      <Field name={field.name}>
                        {({ field: formikField }: { field: { name: string; value: string; onChange: React.ChangeEventHandler; onBlur: React.FocusEventHandler } }) => (
                          <TextField
                            {...formikField}
                            id={field.name}
                            label={
                              <Box component="span" sx={{ display: 'inline-flex', gap: 0.5 }}>
                                {field.label}
                                {field.validation.required && <Box component="span" sx={{ color: 'error.main' }}>*</Box>}
                                <Box component="span" sx={{ color: 'text.disabled', fontSize: '0.75rem' }}>({field.type})</Box>
                              </Box>
                            }
                            placeholder={field.placeholder}
                            multiline
                            rows={4}
                            fullWidth
                            error={hasError}
                            helperText={hasError ? errorMsg : ''}
                            size="small"
                          />
                        )}
                      </Field>
                    ) : field.type === 'select' ? (
                      <Field name={field.name}>
                        {({ field: formikField, form }: { 
                          field: { name: string; value: string; onBlur: React.FocusEventHandler }; 
                          form: { setFieldValue: (name: string, value: unknown) => void } 
                        }) => (
                          <FormControl fullWidth size="small" error={hasError}>
                            <InputLabel id={`${field.name}-label`}>
                              {field.label}
                              {field.validation.required && <Box component="span" sx={{ color: 'error.main', ml: 0.25 }}>*</Box>}
                            </InputLabel>
                            <Select
                              name={formikField.name}
                              value={formikField.value}
                              onBlur={formikField.onBlur}
                              onChange={(e) => form.setFieldValue(field.name, e.target.value)}
                              variant="outlined"
                              labelId={`${field.name}-label`}
                              id={field.name}
                              label={`${field.label}${field.validation.required ? ' *' : ''}`}
                            >
                              <MenuItem value=""><em>— Select —</em></MenuItem>
                              {(field.validation.options ?? []).map(opt => (
                                <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                              ))}
                            </Select>
                            {hasError && <FormHelperText>{errorMsg}</FormHelperText>}
                          </FormControl>
                        )}
                      </Field>
                    ) : field.type === 'checkbox' ? (
                      <Box>
                        <FormControlLabel
                          control={
                            <Checkbox
                              id={field.name}
                              checked={Boolean(values[field.name])}
                              onChange={e => setFieldValue(field.name, e.target.checked)}
                              size="small"
                            />
                          }
                          label={
                            <Box component="span" sx={{ display: 'inline-flex', gap: 0.5, alignItems: 'center' }}>
                              <Typography variant="body2" sx={{ fontWeight: 500 }}>{field.label}</Typography>
                              {field.validation.required && <Box component="span" sx={{ color: 'error.main' }}>*</Box>}
                              <Typography variant="caption" color="text.disabled">({field.type})</Typography>
                            </Box>
                          }
                        />
                        <ErrorMessage name={field.name}>
                          {msg => <FormHelperText error>{msg}</FormHelperText>}
                        </ErrorMessage>
                      </Box>
                    ) : (
                      <Field name={field.name}>
                        {({ field: formikField }: { field: { name: string; value: string; onChange: React.ChangeEventHandler; onBlur: React.FocusEventHandler } }) => (
                          <TextField
                            {...formikField}
                            id={field.name}
                            type={field.type === 'phone' ? 'tel' : field.type}
                            label={
                              <Box component="span" sx={{ display: 'inline-flex', gap: 0.5 }}>
                                {field.label}
                                {field.validation.required && <Box component="span" sx={{ color: 'error.main' }}>*</Box>}
                                <Box component="span" sx={{ color: 'text.disabled', fontSize: '0.75rem' }}>({field.type})</Box>
                              </Box>
                            }
                            placeholder={field.placeholder}
                            fullWidth
                            error={hasError}
                            helperText={hasError ? errorMsg : ''}
                            size="small"
                            slotProps={{ htmlInput: { autoComplete: field.type === 'email' ? 'email' : field.type === 'phone' ? 'tel' : 'off' } }}
                          />
                        )}
                      </Field>
                    )}
                  </Box>
                );
              })}
            </Box>

            <Box sx={{ display: 'flex', justifyContent: isFirstStep ? 'flex-end' : 'space-between', alignItems: 'center', pt: 1, borderTop: 1, borderColor: 'divider' }}>
              {!isFirstStep && onBack && (
                <Button type="button" variant="outlined" onClick={onBack} sx={{ fontWeight: 600 }}>
                  ← Back
                </Button>
              )}
              <Button type="submit" variant="contained" disabled={isSubmitting} sx={{ fontWeight: 600 }}>
                {isLastStep ? 'Submit & Complete' : 'Next Step →'}
              </Button>
            </Box>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default DynamicForm;