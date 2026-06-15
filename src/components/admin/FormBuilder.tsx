import React, { useState } from 'react';
import type { FormSchema, FormField, FieldType } from '../../type/type';
import { generateId } from '../../utils/helpers';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Chip from '@mui/material/Chip';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import Collapse from '@mui/material/Collapse';
import Alert from '@mui/material/Alert';
import Tooltip from '@mui/material/Tooltip';

interface FormBuilderProps {
  form: FormSchema;
  onSave: (form: FormSchema) => void;
  onCancel: () => void;
}

const FIELD_TYPES: { value: FieldType; label: string; icon: string; desc: string }[] = [
  { value: 'text', label: 'Text', icon: 'T', desc: 'Single line text' },
  { value: 'number', label: 'Number', icon: '#', desc: 'Numeric input' },
  { value: 'email', label: 'Email', icon: '@', desc: 'Email with validation' },
  { value: 'phone', label: 'Phone', icon: '☎', desc: 'Phone number' },
  { value: 'date', label: 'Date', icon: '📅', desc: 'Date picker' },
  { value: 'select', label: 'Select', icon: '▾', desc: 'Dropdown options' },
  { value: 'checkbox', label: 'Checkbox', icon: '☑', desc: 'True/false toggle' },
  { value: 'textarea', label: 'Textarea', icon: '¶', desc: 'Multi-line text' },
];

const FormBuilder: React.FC<FormBuilderProps> = ({ form, onSave, onCancel }) => {
  const [title, setTitle] = useState(form.title);
  const [fields, setFields] = useState<FormField[]>(form.fields);
  const [expandedFieldId, setExpandedFieldId] = useState<string | null>(null);

  const addField = (type: FieldType) => {
    const newField: FormField = {
      id: generateId('fld'),
      name: `field_${Date.now()}`,
      label: `New ${type} field`,
      type,
      placeholder: '',
      validation: { required: false },
    };
    setFields(prev => [...prev, newField]);
    setExpandedFieldId(newField.id);
  };

  const updateField = (id: string, patch: Partial<FormField>) => {
    setFields(prev => prev.map(f => f.id === id ? { ...f, ...patch } : f));
  };

  const updateValidation = (id: string, patch: Partial<FormField['validation']>) => {
    setFields(prev => prev.map(f => f.id === id ? { ...f, validation: { ...f.validation, ...patch } } : f));
  };

  const removeField = (id: string) => {
    setFields(prev => prev.filter(f => f.id !== id));
    if (expandedFieldId === id) setExpandedFieldId(null);
  };

  const moveField = (id: string, dir: -1 | 1) => {
    setFields(prev => {
      const idx = prev.findIndex(f => f.id === id);
      if (idx < 0) return prev;
      const next = [...prev];
      const target = idx + dir;
      if (target < 0 || target >= next.length) return prev;
      [next[idx], next[target]] = [next[target], next[idx]];
      return next;
    });
  };

  const handleSave = () => onSave({ ...form, title, fields });

  const getValidationSummary = (field: FormField): string[] => {
    const rules: string[] = [];
    if (field.validation.required) rules.push('Required');
    if (field.validation.minLength !== undefined) rules.push(`Min ${field.validation.minLength} chars`);
    if (field.validation.maxLength !== undefined) rules.push(`Max ${field.validation.maxLength} chars`);
    if (field.validation.min !== undefined) rules.push(`Min: ${field.validation.min}`);
    if (field.validation.max !== undefined) rules.push(`Max: ${field.validation.max}`);
    if (field.type === 'email') rules.push('Valid email format');
    if (field.type === 'phone') rules.push('7–15 digit format');
    if (field.validation.options?.length) rules.push(`${field.validation.options.length} options`);
    return rules;
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', bgcolor: '#FFFFFF' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 2, py: 1.5, borderBottom: '1.5px solid rgba(92,79,74,0.18)', bgcolor: '#F7F4F1', flexShrink: 0 }}>
        <Box>
          <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#2E2522' }}>📋 Form Builder</Typography>
          <Typography variant="caption" sx={{ color: '#A89890' }}>{fields.length} field{fields.length !== 1 ? 's' : ''} configured</Typography>
        </Box>
        <IconButton size="small" onClick={onCancel} sx={{ color: '#A89890' }}>✕</IconButton>
      </Box>

      <Box sx={{ flex: 1, overflowY: 'auto', p: 2, display: 'flex', flexDirection: 'column', gap: 2.5 }}>
        <TextField
          label="Form Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="e.g. Personal Information"
          fullWidth
          size="small"
          helperText="This title is shown to consumers at the top of the form"
        />

        <Divider />
        <Box>
          <Typography variant="caption" sx={{ fontWeight: 700, color: '#A89890', textTransform: 'uppercase', letterSpacing: 0.8, display: 'block', mb: 1.5 }}>Add a Field</Typography>
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0.75 }}>
            {FIELD_TYPES.map(ft => (
              <Tooltip key={ft.value} title={ft.desc} placement="top">
                <Paper
                  variant="outlined"
                  onClick={() => addField(ft.value)}
                  sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.5, p: 1, cursor: 'pointer', borderRadius: 2, border: '1.5px solid rgba(92,79,74,0.18)', bgcolor: '#F7F4F1', transition: 'all 0.15s', '&:hover': { borderColor: '#5C4F4A', bgcolor: 'rgba(92,79,74,0.06)', transform: 'translateY(-1px)' } }}
                >
                  <Typography sx={{ fontSize: '1rem', lineHeight: 1, fontWeight: 700, color: '#5C4F4A' }}>{ft.icon}</Typography>
                  <Typography variant="caption" sx={{ fontWeight: 600, color: '#6B5F59', fontSize: '0.65rem', textAlign: 'center' }}>{ft.label}</Typography>
                </Paper>
              </Tooltip>
            ))}
          </Box>
        </Box>

        <Box>
          <Typography variant="caption" sx={{ fontWeight: 700, color: '#A89890', textTransform: 'uppercase', letterSpacing: 0.8, display: 'block', mb: 1 }}>Form Fields</Typography>

          {fields.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 4, border: '1.5px dashed rgba(92,79,74,0.25)', borderRadius: 2, bgcolor: '#F7F4F1' }}>
              <Typography variant="body2" sx={{ color: '#A89890', mb: 0.5 }}>No fields yet</Typography>
              <Typography variant="caption" sx={{ color: '#A89890' }}>Click a field type above to add your first field</Typography>
            </Box>
          ) : (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {fields.map((field, idx) => {
                const isExpanded = expandedFieldId === field.id;
                const validationRules = getValidationSummary(field);
                return (
                  <Paper key={field.id} variant="outlined" sx={{ borderRadius: 2, overflow: 'hidden', border: '1.5px solid', borderColor: isExpanded ? '#5C4F4A' : 'rgba(92,79,74,0.18)', transition: 'border-color 0.15s' }}>
                    <Box
                      onClick={() => setExpandedFieldId(isExpanded ? null : field.id)}
                      sx={{ display: 'flex', alignItems: 'center', gap: 1, px: 1.5, py: 1, cursor: 'pointer', bgcolor: isExpanded ? 'rgba(92,79,74,0.04)' : '#F7F4F1', '&:hover': { bgcolor: 'rgba(92,79,74,0.06)' } }}
                    >
                      <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, mb: 0.25 }}>
                          <Chip label={field.type} size="small" sx={{ height: 18, fontSize: '0.6rem', fontWeight: 700, bgcolor: 'rgba(92,79,74,0.1)', color: '#5C4F4A' }} />
                          <Typography variant="body2" sx={{ fontWeight: 600, color: '#2E2522', fontSize: '0.82rem' }} noWrap>{field.label}</Typography>
                          {field.validation.required && <Typography sx={{ color: '#C0392B', fontSize: '0.75rem', lineHeight: 1 }}>*</Typography>}
                        </Box>
                        {validationRules.length > 0 && (
                          <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                            {validationRules.map(rule => (
                              <Typography key={rule} variant="caption" sx={{ fontSize: '0.6rem', color: '#A89890', bgcolor: 'rgba(92,79,74,0.06)', px: 0.75, py: 0.125, borderRadius: 1 }}>{rule}</Typography>
                            ))}
                          </Box>
                        )}
                      </Box>
                      <Box sx={{ display: 'flex', gap: 0.25, flexShrink: 0 }}>
                        <IconButton size="small" onClick={e => { e.stopPropagation(); moveField(field.id, -1); }} disabled={idx === 0} sx={{ width: 24, height: 24, fontSize: '0.7rem' }}>↑</IconButton>
                        <IconButton size="small" onClick={e => { e.stopPropagation(); moveField(field.id, 1); }} disabled={idx === fields.length - 1} sx={{ width: 24, height: 24, fontSize: '0.7rem' }}>↓</IconButton>
                        <IconButton size="small" color="error" onClick={e => { e.stopPropagation(); removeField(field.id); }} sx={{ width: 24, height: 24, fontSize: '0.7rem' }}>✕</IconButton>
                      </Box>
                    </Box>

                    <Collapse in={isExpanded}>
                      <Divider />
                      <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 2, bgcolor: '#FFFFFF' }}>
                        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1.5 }}>
                          <TextField
                            label="Label *"
                            value={field.label}
                            onChange={e => updateField(field.id, { label: e.target.value })}
                            fullWidth
                            size="small"
                            helperText="Shown above the field"
                          />
                          <TextField
                            label="Field Key"
                            value={field.name}
                            onChange={e => updateField(field.id, { name: e.target.value.replace(/\s/g, '_').replace(/[^a-zA-Z0-9_]/g, '') })}
                            fullWidth
                            size="small"
                            helperText="Used in data export"
                          />
                        </Box>

                        {field.type !== 'checkbox' && field.type !== 'select' && field.type !== 'date' && (
                          <TextField
                            label="Placeholder"
                            value={field.placeholder ?? ''}
                            onChange={e => updateField(field.id, { placeholder: e.target.value })}
                            fullWidth
                            size="small"
                            helperText="Hint text inside the field"
                          />
                        )}

                        {field.type === 'select' && (
                          <TextField
                            label="Options (comma-separated)"
                            value={(field.validation.options ?? []).join(', ')}
                            onChange={e => updateValidation(field.id, { options: e.target.value.split(',').map(s => s.trim()).filter(Boolean) })}
                            placeholder="Option A, Option B, Option C"
                            fullWidth
                            size="small"
                            helperText={`${(field.validation.options ?? []).length} options defined`}
                          />
                        )}

                        <Divider />

                        <Box>
                          <Typography variant="caption" sx={{ fontWeight: 700, color: '#A89890', textTransform: 'uppercase', letterSpacing: 0.8, display: 'block', mb: 1 }}>Yup Validation Rules</Typography>

                          <FormControlLabel
                            control={<Checkbox size="small" checked={field.validation.required ?? false} onChange={e => updateValidation(field.id, { required: e.target.checked })} />}
                            label={<Typography variant="body2" sx={{ fontWeight: 600, color: '#2E2522', fontSize: '0.82rem' }}>Required field</Typography>}
                          />

                          {field.type === 'email' && (
                            <Alert severity="info" sx={{ mt: 1, py: 0.5, fontSize: '0.75rem' }}>Auto-validates email format (Yup .email())</Alert>
                          )}

                          {field.type === 'phone' && (
                            <Alert severity="info" sx={{ mt: 1, py: 0.5, fontSize: '0.75rem' }}>Auto-validates phone pattern 7–15 digits</Alert>
                          )}

                          {(field.type === 'text' || field.type === 'textarea' || field.type === 'email' || field.type === 'phone') && (
                            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1.5, mt: 1.5 }}>
                              <TextField
                                label="Min Length"
                                type="number"
                                value={field.validation.minLength ?? ''}
                                onChange={e => updateValidation(field.id, { minLength: e.target.value ? Number(e.target.value) : undefined })}
                                fullWidth
                                size="small"
                                helperText="Yup .min(n)"
                                slotProps={{htmlInput: {min: 0}}}
                              />
                              <TextField
                                label="Max Length"
                                type="number"
                                value={field.validation.maxLength ?? ''}
                                onChange={e => updateValidation(field.id, { maxLength: e.target.value ? Number(e.target.value) : undefined })}
                                fullWidth
                                size="small"
                                helperText="Yup .max(n)"
                                slotProps={{htmlInput: {min: 0}}}
                              />
                            </Box>
                          )}

                          {field.type === 'number' && (
                            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1.5, mt: 1.5 }}>
                              <TextField
                                label="Min Value"
                                type="number"
                                value={field.validation.min ?? ''}
                                onChange={e => updateValidation(field.id, { min: e.target.value ? Number(e.target.value) : undefined })}
                                fullWidth
                                size="small"
                                helperText="Yup .min(n)"
                              />
                              <TextField
                                label="Max Value"
                                type="number"
                                value={field.validation.max ?? ''}
                                onChange={e => updateValidation(field.id, { max: e.target.value ? Number(e.target.value) : undefined })}
                                fullWidth
                                size="small"
                                helperText="Yup .max(n)"
                              />
                            </Box>
                          )}

                          {field.type === 'checkbox' && field.validation.required && (
                            <Alert severity="warning" sx={{ mt: 1, py: 0.5, fontSize: '0.75rem' }}>Yup .oneOf([true]) — user must check this box</Alert>
                          )}
                        </Box>

                        <Box sx={{ bgcolor: '#F7F4F1', borderRadius: 1.5, p: 1.5, border: '1px solid rgba(92,79,74,0.12)' }}>
                          <Typography variant="caption" sx={{ fontWeight: 700, color: '#A89890', textTransform: 'uppercase', letterSpacing: 0.8, display: 'block', mb: 1 }}>Preview</Typography>
                          <Typography variant="caption" sx={{ fontWeight: 600, color: '#6B5F59', display: 'block', mb: 0.5 }}>
                            {field.label}{field.validation.required && <Box component="span" sx={{ color: '#C0392B' }}> *</Box>}
                            <Box component="span" sx={{ color: '#A89890', fontWeight: 400, ml: 0.5 }}>({field.type})</Box>
                          </Typography>
                          {field.type === 'select' ? (
                            <Box sx={{ p: 1, border: '1.5px solid rgba(92,79,74,0.25)', borderRadius: 1.5, bgcolor: '#FFFFFF', fontSize: '0.8rem', color: '#A89890' }}>
                              {(field.validation.options ?? []).length > 0 ? `— Select (${field.validation.options!.length} options) —` : '— No options defined —'}
                            </Box>
                          ) : field.type === 'checkbox' ? (
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                              <Box sx={{ width: 16, height: 16, border: '1.5px solid rgba(92,79,74,0.4)', borderRadius: 0.5, bgcolor: '#FFFFFF' }} />
                              <Typography variant="caption" sx={{ color: '#6B5F59' }}>{field.label}</Typography>
                            </Box>
                          ) : field.type === 'textarea' ? (
                            <Box sx={{ p: 1, border: '1.5px solid rgba(92,79,74,0.25)', borderRadius: 1.5, bgcolor: '#FFFFFF', height: 56, color: '#A89890', fontSize: '0.8rem' }}>{field.placeholder || 'Enter text…'}</Box>
                          ) : (
                            <Box sx={{ p: 1, border: '1.5px solid rgba(92,79,74,0.25)', borderRadius: 1.5, bgcolor: '#FFFFFF', color: '#A89890', fontSize: '0.8rem' }}>{field.placeholder || `Enter ${field.type}…`}</Box>
                          )}
                        </Box>
                      </Box>
                    </Collapse>
                  </Paper>
                );
              })}
            </Box>
          )}
        </Box>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 2, py: 1.5, borderTop: '1.5px solid rgba(92,79,74,0.18)', bgcolor: '#F7F4F1', flexShrink: 0 }}>
        <Typography variant="caption" sx={{ color: '#A89890' }}>{fields.length} field{fields.length !== 1 ? 's' : ''} · {fields.filter(f => f.validation.required).length} required</Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button variant="outlined" onClick={onCancel} sx={{ fontWeight: 600 }}>Cancel</Button>
          <Button variant="contained" onClick={handleSave} sx={{ fontWeight: 600 }}>Save Form</Button>
        </Box>
      </Box>
    </Box>
  );
};

export default FormBuilder;