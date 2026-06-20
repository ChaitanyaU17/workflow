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

const SA_USERNAME = import.meta.env.VITE_SA_USERNAME;
const SA_PASSWORD = import.meta.env.VITE_SA_PASSWORD;

const superAdminLoginSchema = Yup.object({
  username: Yup.string()
    .trim()
    .required('Username is required')
    .min(3, 'Username must be at least 3 characters'),
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters'),
});

type SuperAdminLoginValues = Yup.InferType<typeof superAdminLoginSchema>;

const SuperAdminLogin: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, currentUser, loginError } = useSelector(
    (s: RootState) => s.auth
  );

  const from = (location.state as any)?.from?.pathname ?? '/superadmin';

  useEffect(() => {
    if (isAuthenticated && currentUser?.role === 'superadmin') {
      navigate('/superadmin', { replace: true });
    }
  }, [isAuthenticated, currentUser, navigate]);

  useEffect(() => {
    return () => {
      dispatch(clearLoginError());
    };
  }, [dispatch]);

  const formik = useFormik<SuperAdminLoginValues>({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: superAdminLoginSchema,

    onSubmit: (values, { setSubmitting }) => {
      setTimeout(() => {
        if (
          values.username.trim() === SA_USERNAME &&
          values.password === SA_PASSWORD
        ) {
          dispatch(
            loginSuccess({
              id: 'superadmin',
              username: SA_USERNAME,
              name: 'Super Admin',
              role: 'superadmin',
            })
          );
          navigate(from, { replace: true });
        } else {
          dispatch(loginFailure('Invalid username or password'));
        }
        setSubmitting(false);
      }, 600);
    },
  });

  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <Box sx={{minHeight: '100vh', bgcolor: '#F7F4F1', display: 'flex', alignItems: 'center', justifyContent: 'center', p: 2}}>
      <Box sx={{ width: '100%', maxWidth: 420 }}>
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography sx={{ fontSize: '3rem', lineHeight: 1, mb: 1.5, animation: 'float 3s ease-in-out infinite', '@keyframes float': { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-10px)' } } }}>⬡</Typography>
          <Typography variant="h5" sx={{ fontWeight: 800, color: '#2E2522', mb: 0.5 }}>
            Super Admin Portal
          </Typography>
          <Typography variant="body2" sx={{ color: '#A89890' }}>
            Restricted access — authorized personnel only
          </Typography>
        </Box>

        <Paper
          variant="outlined"
          component="form"
          onSubmit={formik.handleSubmit} 
          sx={{borderRadius: 3, p: 3.5, bgcolor: '#FFFFFF', border: '1.5px solid rgba(92,79,74,0.18)', display: 'flex', flexDirection: 'column', gap: 2.5}}>
          <Box sx={{px: 1.5, py: 1, bgcolor: 'rgba(192,57,43,0.06)', borderRadius: 2, border: '1px solid rgba(192,57,43,0.15)', textAlign: 'center'}}>
            <Typography variant="caption" sx={{ color: '#C0392B', fontWeight: 600 }}>
              Super Admin Access Only
            </Typography>
          </Box>

          {loginError && (
            <Alert
              severity="error"
              onClose={() => dispatch(clearLoginError())}
              sx={{ borderRadius: 2 }}
            >
              {loginError}
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
            disabled={formik.isSubmitting || !formik.isValid || !formik.dirty}
            sx={{ fontWeight: 700, py: 1.25, borderRadius: 2, mt: 0.5 }}
          >
            {formik.isSubmitting ? 'Verifying…' : 'Login as Super Admin'}
          </Button>

          <Typography variant="caption" sx={{ textAlign: 'center', color: '#A89890', display: 'block' }} >
            Admin?{' '}
            <Box
              component="a"
              href="/admin/login"
              sx={{ color: '#5C4F4A', fontWeight: 600, textDecoration: 'none', '&:hover': { textDecoration: 'underline' }}}
              >
              Login here
            </Box>
          </Typography>
        </Paper>
      </Box>
    </Box>
  );
};

export default SuperAdminLogin;