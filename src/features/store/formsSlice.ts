import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { FormSchema, FormsState } from '../../type/type';

export const seedForms: FormSchema[] = [
  {
    id: 'fs-personal',
    title: 'Personal Information',
    fields: [
      { id: 'f1', name: 'firstName',   label: 'First Name',    type: 'text',     placeholder: 'John',             validation: { required: true, minLength: 2, maxLength: 50 } },
      { id: 'f2', name: 'lastName',    label: 'Last Name',     type: 'text',     placeholder: 'Doe',              validation: { required: true, minLength: 2, maxLength: 50 } },
      { id: 'f3', name: 'dateOfBirth', label: 'Date of Birth', type: 'date',                                      validation: { required: true } },
      { id: 'f4', name: 'gender',      label: 'Gender',        type: 'select',                                    validation: { required: true, options: ['Male', 'Female', 'Non-binary', 'Prefer not to say'] } },
    ],
  },
  {
    id: 'fs-contact',
    title: 'Contact Details',
    fields: [
      { id: 'f5', name: 'email',   label: 'Email Address',  type: 'email',    placeholder: 'john@example.com', validation: { required: true } },
      { id: 'f6', name: 'phone',   label: 'Phone Number',   type: 'phone',    placeholder: '+1 234 567 8900',  validation: { required: true, minLength: 7, maxLength: 15 } },
      { id: 'f7', name: 'address', label: 'Street Address', type: 'textarea', placeholder: '123 Main St',      validation: { required: true, maxLength: 200 } },
      { id: 'f8', name: 'city',    label: 'City',           type: 'text',     placeholder: 'New York',         validation: { required: true } },
    ],
  },
  {
    id: 'fs-identity',
    title: 'Identity Verification',
    fields: [
      { id: 'f9',  name: 'idType',        label: 'ID Type',                         type: 'select',   validation: { required: true, options: ['Passport', 'Driver License', 'National ID', 'Social Security'] } },
      { id: 'f10', name: 'idNumber',      label: 'ID Number',                       type: 'text',     placeholder: 'AB123456', validation: { required: true, minLength: 5, maxLength: 20 } },
      { id: 'f11', name: 'idExpiry',      label: 'ID Expiry Date',                  type: 'date',     validation: { required: true } },
      { id: 'f12', name: 'termsAccepted', label: 'I accept the Terms & Conditions', type: 'checkbox', validation: { required: true } },
    ],
  },
  {
    id: 'fs-financial',
    title: 'Financial Information',
    fields: [
      { id: 'f13', name: 'employmentStatus', label: 'Employment Status',   type: 'select', validation: { required: true, options: ['Employed', 'Self-Employed', 'Unemployed', 'Retired', 'Student'] } },
      { id: 'f14', name: 'annualIncome',     label: 'Annual Income (USD)', type: 'number', placeholder: '50000', validation: { required: true, min: 0 } },
      { id: 'f15', name: 'sourceOfFunds',    label: 'Source of Funds',     type: 'select', validation: { required: true, options: ['Salary', 'Business', 'Investment', 'Inheritance', 'Other'] } },
    ],
  },
];

const initialState: FormsState = { forms: seedForms };

const formsSlice = createSlice({
  name: 'forms',
  initialState,
  reducers: {
    addForm(state, action: PayloadAction<FormSchema>) {
      const exists = state.forms.some(f => f.id === action.payload.id);
      if (!exists) state.forms.push(action.payload);
    },
    updateForm(state, action: PayloadAction<FormSchema>) {
      const idx = state.forms.findIndex(f => f.id === action.payload.id);
      if (idx !== -1) state.forms[idx] = action.payload;
    },
    deleteForm(state, action: PayloadAction<string>) {
      if (seedForms.some(s => s.id === action.payload)) return;
      state.forms = state.forms.filter(f => f.id !== action.payload);
    },
  },
});

export const { addForm, updateForm, deleteForm } = formsSlice.actions;
export default formsSlice.reducer;