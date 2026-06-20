import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Alert from '@mui/material/Alert';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import PublicIcon from '@mui/icons-material/Public';
import SendIcon from '@mui/icons-material/Send';
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined';
import RocketLaunchOutlinedIcon from '@mui/icons-material/RocketLaunchOutlined';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutlined';
import SEOHead from '../../components/public/SEOHead';

const contactSchema = Yup.object({
  name: Yup.string().trim().required('Your name is required').min(2, 'Name must be at least 2 characters'),
  email: Yup.string().trim().email('Please enter a valid email address').required('Email address is required'),
  subject: Yup.string().trim().required('Subject is required').min(5, 'Subject must be at least 5 characters'),
  message: Yup.string().trim().required('Message is required').min(20, 'Message must be at least 20 characters'),
});

type ContactValues = Yup.InferType<typeof contactSchema>;

const CONTACT_INFO = [
  {
    icon: <EmailOutlinedIcon sx={{ fontSize: '1.25rem', color: '#5C4F4A' }} />,
    title: 'Support Email',
    detail: 'support@workflowx.app',
    note: 'We respond within 1–2 business days',
  },
  {
    icon: <AccessTimeOutlinedIcon sx={{ fontSize: '1.25rem', color: '#5C4F4A' }} />,
    title: 'Business Hours',
    detail: 'Monday – Friday',
    note: '9:00 AM – 6:00 PM IST',
  },
  {
    icon: <PublicIcon sx={{ fontSize: '1.25rem', color: '#5C4F4A' }} />,
    title: 'Availability',
    detail: 'Global / Remote',
    note: 'We support teams worldwide',
  },
];

const ContactPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  const formik = useFormik<ContactValues>({
    initialValues: { name: '', email: '', subject: '', message: '' },
    validationSchema: contactSchema,
    onSubmit: (_values, { setSubmitting, resetForm }) => {
      setTimeout(() => {
        setSubmitted(true);
        resetForm();
        setSubmitting(false);
      }, 800);
    },
  });

  return (
    <>
      <SEOHead
        title="Contact Us — Workflow X Support"
        description="Get in touch with the Workflow X team. Reach out for support, questions, or feedback about our consumer onboarding automation platform."
        canonical="/contact"
      />

      <Box sx={{ bgcolor: '#FFFFFF', borderBottom: '1.5px solid rgba(92,79,74,0.12)', py: { xs: 7, sm: 9 }, px: { xs: 3, sm: 5 }, textAlign: 'center'}}>
        <Box sx={{ maxWidth: 580, mx: 'auto' }}>
          <Chip
            label="Get in Touch"
            size="small"
            sx={{ mb: 2.5, fontWeight: 700, bgcolor: 'rgba(92,79,74,0.08)', color: '#5C4F4A', border: '1px solid rgba(92,79,74,0.18)'}}
          />
          <Typography
            variant="h1"
            sx={{ fontFamily: '"Playfair Display", Georgia, serif', fontSize: { xs: '2.2rem', sm: '3rem' }, color: '#2E2522', mb: 2}}
          >
            Contact Us
          </Typography>
          <Typography variant="body1" sx={{ color: '#6B5F59', lineHeight: 1.7 }}>
            Have a question, need support, or want to share feedback? We'd love to hear from you.
            Fill in the form below and we'll get back to you promptly.
          </Typography>
        </Box>
      </Box>

      <Box sx={{ maxWidth: 1000, mx: 'auto', px: { xs: 3, sm: 5 }, py: { xs: 6, sm: 8 } }}>
        <Grid container spacing={4} sx={{alignItems: "flex-start"}}>
          <Grid size={{ xs: 12, md: 7 }}>
            <Paper
              variant="outlined"
              sx={{ p: { xs: 3, sm: 4 }, borderRadius: 3, border: '1.5px solid rgba(92,79,74,0.18)', bgcolor: '#FFFFFF'}}
            >
              <Typography variant="h5" sx={{ fontWeight: 700, color: '#2E2522', mb: 0.5 }}>
                Send Us a Message
              </Typography>
              <Typography variant="body2" sx={{ color: '#A89890', mb: 3 }}>
                All fields are required. We'll respond within 1–2 business days.
              </Typography>

              {submitted && (
                <Alert
                  severity="success"
                  id="contact-success-alert"
                  icon={<CheckCircleOutlineIcon fontSize="small" />}
                  sx={{ borderRadius: 2, mb: 3 }}
                  onClose={() => setSubmitted(false)}
                >
                  <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.25 }}>
                    Message sent successfully!
                  </Typography>
                  Thank you for reaching out. We'll be in touch shortly.
                </Alert>
              )}

              <Box
                component="form"
                onSubmit={formik.handleSubmit}
                sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}
              >
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      id="contact-name"
                      label="Full Name"
                      name="name"
                      fullWidth
                      value={formik.values.name}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched.name && Boolean(formik.errors.name)}
                      helperText={formik.touched.name && formik.errors.name}
                      autoComplete="name"
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      id="contact-email"
                      label="Email Address"
                      name="email"
                      type="email"
                      fullWidth
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched.email && Boolean(formik.errors.email)}
                      helperText={formik.touched.email && formik.errors.email}
                      autoComplete="email"
                    />
                  </Grid>
                </Grid>

                <TextField
                  id="contact-subject"
                  label="Subject"
                  name="subject"
                  fullWidth
                  value={formik.values.subject}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.subject && Boolean(formik.errors.subject)}
                  helperText={formik.touched.subject && formik.errors.subject}
                />

                <TextField
                  id="contact-message"
                  label="Message"
                  name="message"
                  fullWidth
                  multiline
                  minRows={5}
                  value={formik.values.message}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.message && Boolean(formik.errors.message)}
                  helperText={formik.touched.message && formik.errors.message}
                />

                <Button
                  id="contact-submit-btn"
                  type="submit"
                  variant="contained"
                  size="large"
                  fullWidth
                  endIcon={<SendIcon sx={{ fontSize: '1rem !important' }} />}
                  disabled={formik.isSubmitting || !formik.isValid || !formik.dirty}
                  sx={{ fontWeight: 700, py: 1.4, borderRadius: 2.5, mt: 0.5 }}
                >
                  {formik.isSubmitting ? 'Sending…' : 'Send Message'}
                </Button>
              </Box>
            </Paper>
          </Grid>

          <Grid size={{ xs: 12, md: 5 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {CONTACT_INFO.map(info => (
                <Paper
                  key={info.title}
                  variant="outlined"
                  sx={{ p: 2.5, borderRadius: 2.5, border: '1.5px solid rgba(92,79,74,0.14)', display: 'flex', alignItems: 'flex-start', gap: 2, transition: 'all 0.2s', '&:hover': {borderColor: '#5C4F4A', boxShadow: '0 4px 16px rgba(92,79,74,0.08)'}}}
                >
                  <Box sx={{ width: 38, height: 38, borderRadius: 2, bgcolor: 'rgba(92,79,74,0.07)', border: '1.5px solid rgba(92,79,74,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}} >
                    {info.icon}
                  </Box>
                  <Box>
                    <Typography variant="caption" sx={{ fontWeight: 700, color: '#A89890', textTransform: 'uppercase', letterSpacing: '0.06em'}} >
                      {info.title}
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600, color: '#2E2522', mt: 0.25 }} >
                      {info.detail}
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#6B5F59' }}>
                      {info.note}
                    </Typography>
                  </Box>
                </Paper>
              ))}

              <Divider sx={{ borderColor: 'rgba(92,79,74,0.1)', my: 0.5 }} />

              <Paper
                variant="outlined"
                sx={{ p: 2.5, borderRadius: 2.5, border: '1.5px solid rgba(92,79,74,0.14)', bgcolor: 'rgba(92,79,74,0.03)'}}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.75 }}>
                  <RocketLaunchOutlinedIcon sx={{ fontSize: '1.1rem', color: '#5C4F4A' }} />
                  <Typography variant="body2" sx={{ fontWeight: 600, color: '#2E2522' }}>
                    Looking to get started quickly?
                  </Typography>
                </Box>
                <Typography variant="body2" sx={{ color: '#6B5F59', lineHeight: 1.65, mb: 1.5 }}>
                  Visit our Documentation page for step-by-step guides on creating workflows,
                  building forms, and managing users.
                </Typography>
                <Button
                  component="a"
                  href="/documentation"
                  variant="outlined"
                  size="small"
                  endIcon={<MenuBookOutlinedIcon sx={{ fontSize: '0.9rem !important' }} />}
                  sx={{ fontWeight: 600, borderRadius: 2 }}
                >
                  View Documentation
                </Button>
              </Paper>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default ContactPage;