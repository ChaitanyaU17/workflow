import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import PlayArrowOutlinedIcon from '@mui/icons-material/PlayArrowOutlined';
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined';
import AccountTreeOutlinedIcon from '@mui/icons-material/AccountTreeOutlined';
import DynamicFormOutlinedIcon from '@mui/icons-material/DynamicFormOutlined';
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';
import WorkspacesOutlinedIcon from '@mui/icons-material/WorkspacesOutlined';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import VerifiedOutlinedIcon from '@mui/icons-material/VerifiedOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import MailOutlineIcon from '@mui/icons-material/MailOutlined';
import SEOHead from '../../components/public/SEOHead';

const FEATURES = [
  {
    icon: <AccountTreeOutlinedIcon sx={{ fontSize: '1.5rem', color: '#5C4F4A' }} />,
    title: 'Dynamic Workflow Designer',
    desc: 'A visual drag-and-drop canvas to design multi-step onboarding journeys. Connect nodes, define flow logic, and publish instantly.',
  },
  {
    icon: <DynamicFormOutlinedIcon sx={{ fontSize: '1.5rem', color: '#5C4F4A' }} />,
    title: 'Form Builder',
    desc: 'Add typed input fields — text, email, select, number, boolean — with Yup validation rules configured per workflow step.',
  },
  {
    icon: <PersonAddOutlinedIcon sx={{ fontSize: '1.5rem', color: '#5C4F4A' }} />,
    title: 'Consumer Onboarding',
    desc: 'Consumers follow a guided, step-by-step onboarding journey with auto-saved progress. Mobile-friendly and intuitive by design.',
  },
  {
    icon: <WorkspacesOutlinedIcon sx={{ fontSize: '1.5rem', color: '#5C4F4A' }} />,
    title: 'Multi Workflow Management',
    desc: 'Manage multiple independent onboarding workflows per admin. Publish, duplicate, or archive workflows without affecting others.',
  },
  {
    icon: <LockOutlinedIcon sx={{ fontSize: '1.5rem', color: '#5C4F4A' }} />,
    title: 'Role Based Access',
    desc: 'Three distinct roles — Super Admin, Admin, and Consumer — each with scoped permissions to keep data secure and structured.',
  },
  {
    icon: <AdminPanelSettingsOutlinedIcon sx={{ fontSize: '1.5rem', color: '#5C4F4A' }} />,
    title: 'Admin & Super Admin Controls',
    desc: 'Super Admins manage the full platform and admin roster. Admins control their own workflows and sessions independently.',
  },
  {
    icon: <VerifiedOutlinedIcon sx={{ fontSize: '1.5rem', color: '#5C4F4A' }} />,
    title: 'Form Validation',
    desc: 'Every form field supports built-in validation: required, min/max length, email format, number ranges — powered by Yup schemas.',
  },
  {
    icon: <ShareOutlinedIcon sx={{ fontSize: '1.5rem', color: '#5C4F4A' }} />,
    title: 'Workflow Sharing',
    desc: 'Generate shareable onboarding links for consumers. Super Admins can view select consumer data via expiring share tokens.',
  },
];

const BENEFITS = [
  {
    icon: <TimerOutlinedIcon sx={{ fontSize: '1.4rem', color: '#5C4F4A' }} />,
    title: 'Reduce Manual Work',
    desc: 'Eliminate paper forms and manual data collection. Workflow X automates the entire consumer data intake process digitally.',
  },
  {
    icon: <TrendingUpIcon sx={{ fontSize: '1.4rem', color: '#5C4F4A' }} />,
    title: 'Improve Onboarding Efficiency',
    desc: 'Structured workflows guide consumers through every required step, reducing drop-offs and incomplete registrations significantly.',
  },
  {
    icon: <AccountBalanceWalletOutlinedIcon sx={{ fontSize: '1.4rem', color: '#5C4F4A' }} />,
    title: 'Manage Multiple Workflows',
    desc: 'Support multiple business processes simultaneously. Each admin manages their own independent workflow without cross-interference.',
  },
  {
    icon: <QueryStatsIcon sx={{ fontSize: '1.4rem', color: '#5C4F4A' }} />,
    title: 'Track Onboarding Progress',
    desc: 'Super Admins and Admins can view real-time session status and completion data for every consumer onboarding journey.',
  },
];

const FAQS = [
  {
    q: 'What is Workflow X?',
    a: 'Workflow X is a consumer onboarding automation platform that lets admins design multi-step onboarding workflows using a visual drag-and-drop designer. Consumers follow a guided journey to submit their information securely.',
  },
  {
    q: 'Who is Workflow X designed for?',
    a: 'Workflow X is designed for businesses that need to collect consumer data during onboarding — such as financial services, HR platforms, insurance companies, legal firms, and SaaS products with multi-step registration requirements.',
  },
  {
    q: 'Do I need to code to use Workflow X?',
    a: 'Absolutely not. Workflow X is a no-code platform. Admins use a visual workflow designer and form builder to create onboarding flows without writing a single line of code.',
  },
  {
    q: 'How does role-based access work?',
    a: 'Workflow X has three roles: Super Admin (manages the entire platform, creates admins, and views all workflows), Admin (manages their own workflows and sessions), and Consumer (completes the assigned onboarding journey).',
  },
  {
    q: 'Is consumer data secure?',
    a: 'Yes. Consumer data is stored in encrypted format and all onboarding sessions are tied to unique session IDs. Share tokens for data sharing expire automatically and expose only admin-approved fields.',
  },
  {
    q: 'Can I create multiple workflows?',
    a: 'Yes. Each admin can create, manage, and publish multiple workflows independently. Each workflow can have its own unique steps, form fields, and validation rules.',
  },
  {
    q: 'What happens if a consumer leaves mid-onboarding?',
    a: 'Workflow X automatically saves progress at every step. If a consumer returns to the same onboarding link, they are offered the option to resume from where they left off.',
  },
  {
    q: 'How do I share onboarding data with a third party?',
    a: 'Super Admins can generate a time-limited share token for a specific consumer session. Only the fields explicitly approved for sharing will be visible through the share link.',
  },
  {
    q: 'Can I try Workflow X before creating an account?',
    a: 'Yes. Visit our demo onboarding link at /onboarding/wf-demo-001 to experience the full consumer onboarding flow without needing to log in.',
  },
  {
    q: 'How do I publish a workflow and make it live?',
    a: 'After designing your workflow in the visual designer, click the "Publish" button on the workflow card. Once published, the onboarding link becomes active and consumers can begin their journey immediately.',
  },
];

const LandingPage: React.FC = () => {
  const [expanded, setExpanded] = useState<string | false>(false);

  return (
    <>
      <SEOHead
        title="Workflow X — Build, Manage & Automate Consumer Onboarding"
        description="Workflow X is a no-code consumer onboarding automation platform. Design multi-step workflows, build dynamic forms, and onboard consumers seamlessly with role-based access control."
        canonical="/"
      />

      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', px: { xs: 3, sm: 4 }, pt: { xs: 8, sm: 12 }, pb: { xs: 6, sm: 10 }, maxWidth: 760, mx: 'auto', width: '100%'}} >
        <Chip
          label="Consumer Onboarding Automation"
          size="small"
          sx={{ mb: 3, fontWeight: 700, bgcolor: 'rgba(92,79,74,0.1)', color: '#5C4F4A', border: '1px solid rgba(92,79,74,0.2)'}}
        />

        <Typography sx={{ fontSize: { xs: '3rem', sm: '4.5rem' }, lineHeight: 1, mb: 3, color: '#5C4F4A', animation: 'heroFloat 3s ease-in-out infinite', '@keyframes heroFloat': { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-12px)' }}}}>
          ⬡
        </Typography>

        <Typography
          variant="h1"
          sx={{ fontFamily: '"Playfair Display", Georgia, serif', fontSize: { xs: '2.4rem', sm: '3.5rem', md: '4.2rem' }, fontWeight: 700, color: '#2E2522', mb: 2.5, lineHeight: 1.1, letterSpacing: '-0.02em'}}
        >
          Workflow X
        </Typography>
        <Typography
          variant="h2"
          sx={{ fontFamily: '"Inter", sans-serif', fontSize: { xs: '1.1rem', sm: '1.35rem' }, fontWeight: 400, color: '#6B5F59', lineHeight: 1.6, mb: 5, maxWidth: 580}}
        >
          Build, Manage and Automate Consumer Onboarding Workflows
        </Typography>
        <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap', justifyContent: 'center' }}>
          <Button
            component={Link}
            to="/admin/login"
            variant="contained"
            size="large"
            endIcon={<ArrowForwardIcon />}
            sx={{ fontWeight: 700, px: 4, py: 1.5, fontSize: '0.95rem', borderRadius: 3 }}
          >
            Get Started Free
          </Button>
          <Button
            component="a"
            href="/onboarding/wf-demo-001"
            variant="outlined"
            size="large"
            startIcon={<PlayArrowOutlinedIcon />}
            sx={{ fontWeight: 600, px: 4, py: 1.5, fontSize: '0.95rem', borderRadius: 3 }}
          >
            Try Demo
          </Button>
          <Button
            component={Link}
            to="/documentation"
            variant="text"
            size="large"
            startIcon={<MenuBookOutlinedIcon sx={{ fontSize: '1rem' }} />}
            sx={{ fontWeight: 600, px: 3, py: 1.5, fontSize: '0.95rem', color: '#6B5F59' }}
          >
            View Docs
          </Button>
        </Box>
      </Box>

      <Box sx={{ bgcolor: '#FFFFFF', py: { xs: 7, sm: 10 }, px: { xs: 3, sm: 5 } }}>
        <Box sx={{ maxWidth: 1100, mx: 'auto' }}>
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography
              variant="overline"
              sx={{ color: '#A89890', letterSpacing: '0.12em', fontWeight: 700, display: 'block', mb: 1}}
            >
              Everything you need
            </Typography>
            <Typography
              variant="h2"
              sx={{ fontFamily: '"Playfair Display", Georgia, serif', fontSize: { xs: '1.8rem', sm: '2.4rem' }, color: '#2E2522'}}
            >
              Powerful Features Built for Scale
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: '#6B5F59', mt: 1.5, maxWidth: 520, mx: 'auto' }}
            >
              Everything you need to design, deploy, and manage consumer onboarding workflows in
              one platform.
            </Typography>
          </Box>
          <Grid container spacing={2.5}>
            {FEATURES.map(f => (
              <Grid size={{ xs: 12, sm: 6, lg: 3 }} key={f.title}>
                <Paper
                  variant="outlined"
                  sx={{ p: 3, borderRadius: 3, bgcolor: '#FFFFFF', border: '1.5px solid rgba(92,79,74,0.14)', height: '100%', transition: 'all 0.2s', '&:hover': { borderColor: '#5C4F4A', transform: 'translateY(-4px)', boxShadow: '0 8px 24px rgba(92,79,74,0.12)'}}}
                >
                  <Box sx={{ width: 44, height: 44, borderRadius: 2.5, bgcolor: 'rgba(92,79,74,0.07)', border: '1.5px solid rgba(92,79,74,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2}} >
                    {f.icon}
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: '#2E2522', mb: 1 }}>
                    {f.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#6B5F59', lineHeight: 1.65 }}>
                    {f.desc}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>

      <Box sx={{ py: { xs: 7, sm: 10 }, px: { xs: 3, sm: 5 } }}>
        <Box sx={{ maxWidth: 1100, mx: 'auto' }}>
          <Grid container spacing={4} sx={{alignItems: 'center'}}>
            <Grid size={{ xs: 12, md: 5 }}>
              <Typography variant="overline" sx={{ color: '#A89890', letterSpacing: '0.12em', fontWeight: 700, display: 'block', mb: 1}} >
                Why Workflow X
              </Typography>
              <Typography variant="h2" sx={{ fontFamily: '"Playfair Display", Georgia, serif', fontSize: { xs: '1.8rem', sm: '2.2rem' }, color: '#2E2522', mb: 2}} >
                Built to Solve Real Onboarding Challenges
              </Typography>
              <Typography variant="body1" sx={{ color: '#6B5F59', lineHeight: 1.7, mb: 3 }}>
                Manual onboarding costs time, creates errors, and frustrates customers. Workflow X
                replaces tedious manual processes with intelligent, automated workflows that guide
                every consumer seamlessly from start to completion.
              </Typography>
              <Button
                component={Link}
                to="/about"
                variant="outlined"
                endIcon={<ArrowForwardIcon sx={{ fontSize: '0.95rem' }} />}
                sx={{ fontWeight: 600, borderRadius: 2 }}
              >
                Learn More About Us
              </Button>
            </Grid>
            <Grid size={{ xs: 12, md: 7 }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {BENEFITS.map(b => (
                  <Paper
                    key={b.title}
                    variant="outlined"
                    sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, p: 2.5, borderRadius: 2.5, border: '1.5px solid rgba(92,79,74,0.14)', bgcolor: '#FFFFFF', transition: 'all 0.2s', '&:hover': { borderColor: '#5C4F4A', boxShadow: '0 4px 16px rgba(92,79,74,0.1)'}}}
                  >
                    <Box sx={{ width: 40, height: 40, borderRadius: 2, bgcolor: 'rgba(92,79,74,0.07)', border: '1.5px solid rgba(92,79,74,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}} >
                      {b.icon}
                    </Box>
                    <Box>
                      <Typography
                        variant="h6"
                        sx={{ fontWeight: 700, color: '#2E2522', mb: 0.5 }}
                      >
                        {b.title}
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#6B5F59', lineHeight: 1.65 }}>
                        {b.desc}
                      </Typography>
                    </Box>
                  </Paper>
                ))}
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>

      <Box sx={{ bgcolor: '#FFFFFF', py: { xs: 7, sm: 10 }, px: { xs: 3, sm: 5 } }}>
        <Box sx={{ maxWidth: 780, mx: 'auto' }}>
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography
              variant="overline"
              sx={{ color: '#A89890', letterSpacing: '0.12em', fontWeight: 700, display: 'block', mb: 1}}
            >
              FAQ
            </Typography>
            <Typography
              variant="h2"
              sx={{ fontFamily: '"Playfair Display", Georgia, serif', fontSize: { xs: '1.8rem', sm: '2.4rem' }, color: '#2E2522'}}
            >
              Frequently Asked Questions
            </Typography>
          </Box>
          {FAQS.map((faq, i) => (
            <Accordion
              key={i}
              expanded={expanded === `faq-${i}`}
              onChange={(_, isExp) => setExpanded(isExp ? `faq-${i}` : false)}
              disableGutters
              elevation={0}
              sx={{ border: '1.5px solid rgba(92,79,74,0.14)', borderRadius: '12px !important', mb: 1.5, bgcolor: '#FFFFFF', '&:before': { display: 'none' }, '&.Mui-expanded': { borderColor: '#5C4F4A' }}}
            >
              <AccordionSummary
                expandIcon={
                  expanded === `faq-${i}` ? (
                    <RemoveIcon sx={{ fontSize: '1.1rem', color: '#5C4F4A' }} />
                  ) : (
                    <AddIcon sx={{ fontSize: '1.1rem', color: '#5C4F4A' }} />
                  )
                }
                sx={{ px: 2.5, py: 1.5, '& .MuiAccordionSummary-content': { my: 0 } }}
              >
                <Typography sx={{ fontWeight: 600, color: '#2E2522', fontSize: '0.925rem' }}>
                  {faq.q}
                </Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ px: 2.5, pb: 2, pt: 0 }}>
                <Typography variant="body2" sx={{ color: '#6B5F59', lineHeight: 1.7 }}>
                  {faq.a}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </Box>

      <Box sx={{ py: { xs: 7, sm: 10 }, px: { xs: 3, sm: 5 }, textAlign: 'center', bgcolor: '#5C4F4A', position: 'relative', overflow: 'hidden'}} >
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', opacity: 0.04, pointerEvents: 'none'}}>
          <svg width="500" height="500" viewBox="0 0 56 56" fill="none">
            <path d="M28 4L52 17.5V38.5L28 52L4 38.5V17.5L28 4Z" fill="#EDE9E6" stroke="#EDE9E6" strokeWidth="1" />
          </svg>
        </Box>

        <Typography
          variant="h2"
          sx={{ fontFamily: '"Playfair Display", Georgia, serif', fontSize: { xs: '1.8rem', sm: '2.5rem' }, color: '#EDE9E6', mb: 2, position: 'relative', }}
        >
          Ready to streamline your onboarding?
        </Typography>
        <Typography
          variant="body1"
          sx={{ color: 'rgba(237,233,230,0.7)', mb: 4, maxWidth: 480, mx: 'auto', position: 'relative'}}
        >
          Join teams already using Workflow X to automate and simplify consumer onboarding at
          scale.
        </Typography>
        <Box sx={{ display: 'flex', gap: 1.5, justifyContent: 'center', flexWrap: 'wrap', position: 'relative'}} >
          <Button
            component={Link}
            to="/admin/login"
            variant="contained"
            size="large"
            endIcon={<ArrowForwardIcon />}
            sx={{ fontWeight: 700, px: 4, py: 1.5, bgcolor: '#C9996B', '&:hover': { bgcolor: '#DDB896' }, borderRadius: 3}}
          >
            Start for Free
          </Button>
          <Button
            component={Link}
            to="/contact"
            variant="outlined"
            size="large"
            endIcon={<MailOutlineIcon />}
            sx={{ fontWeight: 600, px: 4, py: 1.5, borderRadius: 3, borderColor: 'rgba(237,233,230,0.4)', color: '#EDE9E6', '&:hover': { borderColor: '#EDE9E6', bgcolor: 'rgba(237,233,230,0.08)'}}}
          >
            Contact Us
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default LandingPage;