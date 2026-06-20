import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import type { RootState } from '../../app/store';
import { loginSuccess, loginFailure, clearLoginError } from '../../features/store/authSlice';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Alert from '@mui/material/Alert';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';

const adminLoginSchema = Yup.object({
  username: Yup.string()
    .trim()
    .required('Username is required')
    .min(3, 'Username must be at least 3 characters'),
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters'),
});

type AdminLoginValues = Yup.InferType<typeof adminLoginSchema>;

const AdminLogin: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, currentUser, loginError } = useSelector(
    (s: RootState) => s.auth
  );
  const admins = useSelector((s: RootState) => s.admins.admins);

  const from = (location.state as any)?.from?.pathname ?? '/admin';

  useEffect(() => {
    if (
      isAuthenticated &&
      (currentUser?.role === 'admin' || currentUser?.role === 'superadmin')
    ) {
      navigate('/admin', { replace: true });
    }
  }, [isAuthenticated, currentUser, navigate]);

  useEffect(() => {
    return () => {
      dispatch(clearLoginError());
    };
  }, [dispatch]);

  const [showPassword, setShowPassword] = React.useState(false);

  const formik = useFormik<AdminLoginValues>({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: adminLoginSchema,

    onSubmit: (values, { setSubmitting }) => {
      setTimeout(() => {
        const admin = admins.find(
          (a) =>
            a.username.toLowerCase() === values.username.trim().toLowerCase() &&
            a.password === values.password &&
            a.isActive
        );

        if (admin) {
          dispatch(
            loginSuccess({
              id: admin.id,
              username: admin.username,
              name: admin.name,
              role: 'admin',
              adminId: admin.id,
            })
          );
          navigate(from, { replace: true });
        } else {
          const inactiveAdmin = admins.find(
            (a) =>
              a.username.toLowerCase() === values.username.trim().toLowerCase()
          );
          if (inactiveAdmin && !inactiveAdmin.isActive) {
            dispatch(
              loginFailure(
                'Your account has been deactivated. Contact the super admin.'
              )
            );
          } else {
            dispatch(loginFailure('Invalid username or password'));
          }
        }
        setSubmitting(false);
      }, 600);
    },
  });

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#F7F4F1', display: 'flex', alignItems: 'center', justifyContent: 'center', p: 2}}>
      <Box sx={{ width: '100%', maxWidth: 420 }}>

        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography sx={{ fontSize: '3rem', lineHeight: 1, mb: 1.5, animation: 'float 3s ease-in-out infinite', '@keyframes float': { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-10px)' } } }}>⬡</Typography>
          <Typography variant="h5" sx={{ fontWeight: 800, color: '#2E2522', mb: 0.5 }}>
            Admin Login
          </Typography>
          <Typography variant="body2" sx={{ color: '#A89890' }}>
            Sign in to manage workflows and forms
          </Typography>
        </Box>

        <Paper
          variant="outlined"
          component="form"
          onSubmit={formik.handleSubmit}
          sx={{borderRadius: 3, p: 3.5, bgcolor: '#FFFFFF', border: '1.5px solid rgba(92,79,74,0.18)', display: 'flex', flexDirection: 'column', gap: 2.5}}
        >
          {loginError && (
            <Alert
              severity="error"
              onClose={() => dispatch(clearLoginError())}
              sx={{ borderRadius: 2 }}
            >
              {loginError}
            </Alert>
          )}

          {admins.length === 0 && (
            <Alert severity="warning" sx={{ borderRadius: 2 }}>
              No admin accounts exist yet. Ask the super admin to create one.
            </Alert>
          )}

          <TextField
            label="Username"
            id="username"
            name="username"
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.username && Boolean(formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username}
            fullWidth
            size="small"
            autoComplete="username"
            autoFocus
            slotProps={{ htmlInput: { spellCheck: false } }}
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
            helperText={formik.touched.password && formik.errors.password}
            fullWidth
            size="small"
            autoComplete="current-password"
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      size="small"
                      onClick={() => setShowPassword((p) => !p)}
                      edge="end"
                    >
                      {showPassword ? '◡' : '👁'}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={
              formik.isSubmitting ||
              !formik.isValid ||
              !formik.dirty ||
              admins.length === 0
            }
            sx={{ fontWeight: 700, py: 1.25, borderRadius: 2, mt: 0.5 }}
          >
            {formik.isSubmitting ? 'Signing in…' : 'Login'}
          </Button>

        </Paper>
      </Box>
    </Box>
  );
};

export default AdminLogin;