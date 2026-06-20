import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import type { RootState } from '../../app/store';
import { addAdmin } from '../../features/store/adminsSlice';
import { generateId } from '../../utils/helpers';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';

interface Props {
  open: boolean;
  onClose: () => void;
}

const CreateAdminDialog: React.FC<Props> = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const existingAdmins = useSelector((s: RootState) => s.admins.admins);

  const [showPassword, setShowPassword] = React.useState(false);
  const [success, setSuccess] = React.useState(false);

  const createAdminSchema = Yup.object({
    name: Yup.string()
      .trim()
      .required('Full name is required')
      .min(2, 'Name must be at least 2 characters')
      .max(50, 'Name must be at most 50 characters'),

    username: Yup.string()
      .required('Username is required')
      .min(3, 'Username must be at least 3 characters')
      .max(30, 'Username must be at most 30 characters')
      .matches(/^\S+$/, 'Username cannot contain spaces')
      .matches(
        /^[a-zA-Z0-9_]+$/,
        'Username can only contain letters, numbers, and underscores'
      )
      .test(
        'username-taken',
        'Username already taken',
        (value) =>
          !existingAdmins.some(
            (a) => a.username.toLowerCase() === value?.trim().toLowerCase()
          )
      ),

    email: Yup.string()
      .trim()
      .required('Email is required')
      .email('Enter a valid email address'),

    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters')
      .max(50, 'Password must be at most 50 characters'),
  });

  type CreateAdminValues = {
    name: string;
    username: string;
    email: string;
    password: string;
  };

  const formik = useFormik<CreateAdminValues>({
    initialValues: {
      name: '',
      username: '',
      email: '',
      password: '',
    },
    validationSchema: createAdminSchema,

    onSubmit: (values, { setSubmitting }) => {
      dispatch(
        addAdmin({
          id: generateId('adm'),
          name: values.name.trim(),
          username: values.username.trim().toLowerCase(),
          email: values.email.trim().toLowerCase(),
          password: values.password,
          isActive: true,
          createdAt: new Date().toISOString(),
          createdBy: 'superadmin',
        })
      );

      setSuccess(true);
      setSubmitting(false);

      setTimeout(() => {
        handleClose();
      }, 1500);
    },
  });

  const handleClose = () => {
    formik.resetForm();
    setSuccess(false);
    setShowPassword(false);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="xs"
      fullWidth
      slotProps={{paper: {sx: { borderRadius: 3, border: '1.5px solid rgba(92,79,74,0.18)' }}}}
    >
      <DialogTitle sx={{ fontWeight: 800, color: '#2E2522', pb: 1 }}>
        Create Admin Account
      </DialogTitle>

      <DialogContent
        sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: '8px !important' }}
      >
        {success ? (
          <Alert severity="success" sx={{ borderRadius: 2 }}>
            Admin created successfully!
          </Alert>
        ) : (
          <>
            <TextField
              label="Full Name"
              id="name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
              fullWidth
              size="small"
              placeholder="e.g. John Smith"
              autoFocus
            />

            <TextField
              label="Username"
              id="username"
              name="username"
              value={formik.values.username}
              onChange={(e) => {
                formik.setFieldValue('username', e.target.value.replace(/\s/g, ''));
              }}
              onBlur={formik.handleBlur}
              error={formik.touched.username && Boolean(formik.errors.username)}
              helperText={
                (formik.touched.username && formik.errors.username) ||
                'Used to login — no spaces allowed'
              }
              fullWidth
              size="small"
              placeholder="e.g. johnsmith"
            />

            <TextField
              label="Email"
              id="email"
              name="email"
              type="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              fullWidth
              size="small"
              placeholder="john@company.com"
            />

            <TextField
              label="Password"
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={
                (formik.touched.password && formik.errors.password) ||
                'Minimum 6 characters'
              }
              fullWidth
              size="small"
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton size="small" onClick={() => setShowPassword((p) => !p)}>
                        {showPassword ? '◡' : '👁'}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />

            <Box sx={{bgcolor: 'rgba(92,79,74,0.04)', borderRadius: 2, p: 1.5}}>
              <Typography variant="caption" sx={{color: '#A89890', fontWeight: 600, display: 'block', mb: 0.5}}>
                Login credentials for admin:
              </Typography>
              <Typography variant="caption" sx={{color: '#6B5F59', fontFamily: 'monospace', display: 'block'}}>
                URL: /admin/login
              </Typography>
              <Typography variant="caption" sx={{color: '#6B5F59', fontFamily: 'monospace', display: 'block'}}>
                Username: {formik.values.username || '—'} · Password:{' '}
                {formik.values.password ? '••••••' : '—'}
              </Typography>
            </Box>
          </>
        )}
      </DialogContent>

      {!success && (
        <DialogActions sx={{ px: 3, pb: 2.5, gap: 1 }}>
          <Button variant="outlined" onClick={handleClose} sx={{ fontWeight: 600 }}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={() => formik.handleSubmit()}
            disabled={formik.isSubmitting || !formik.isValid || !formik.dirty}
            sx={{ fontWeight: 700 }}
          >
            {formik.isSubmitting ? 'Creating…' : 'Create Admin'}
          </Button>
        </DialogActions>
      )}
    </Dialog>
  );
};

export default CreateAdminDialog;