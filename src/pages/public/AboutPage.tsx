import React from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import SearchIcon from '@mui/icons-material/Search';
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import BoltIcon from '@mui/icons-material/Bolt';
import HandshakeOutlinedIcon from '@mui/icons-material/HandshakeOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import CropFreeIcon from '@mui/icons-material/CropFree';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import MailOutlineIcon from '@mui/icons-material/MailOutlined';
import SEOHead from '../../components/public/SEOHead';

const SECTIONS = [
  {
    icon: <TrackChangesIcon sx={{ fontSize: '1.6rem', color: '#5C4F4A' }} />,
    title: 'Our Mission',
    content: `Workflow X was built with a single, clear mission: to eliminate the friction, delays, and manual effort that slow down consumer onboarding processes across industries. Every organisation — from early-stage startups to established enterprises — faces the challenge of collecting accurate consumer data at the point of registration. Forms are filled incorrectly, processes are inconsistent, and valuable team time is spent chasing incomplete submissions.

We believe onboarding should be a seamless, guided experience — not a barrier. Workflow X gives teams the tools to design, deploy, and manage intelligent onboarding workflows without needing a single line of code. By automating the most repetitive parts of data collection and structuring the consumer journey from start to finish, we free up time for teams to focus on what truly matters: building relationships and growing their business.`,
  },
  {
    icon: <SearchIcon sx={{ fontSize: '1.6rem', color: '#5C4F4A' }} />,
    title: 'The Problem We Solve',
    content: `Consumer onboarding is one of the most critical — and most neglected — parts of any business operation. When done poorly, it creates a cascade of problems. Consumers drop off mid-registration when forms are too long or confusing. Teams receive incomplete, inconsistent, or inaccurate data that requires time-consuming manual review. There is no clear audit trail of who submitted what, when, and in which state.

Traditional approaches rely on email chains, PDF attachments, spreadsheets, or expensive custom-built portals that require significant development resources to maintain. Small businesses cannot afford bespoke solutions, and large teams struggle to enforce consistent processes across departments.

The result is wasted time, poor consumer experience, lost revenue, and compliance risk. Workflow X was created specifically to solve this problem — providing a structured, validated, and auditable onboarding system that any team can use without technical expertise.`,
  },
  {
    icon: <LightbulbOutlinedIcon sx={{ fontSize: '1.6rem', color: '#5C4F4A' }} />,
    title: 'How Workflow X Works',
    content: `Workflow X is built around three core concepts: Workflow Design, Form Building, and Consumer Journey Management.

Admins log in to their dashboard and use the visual Workflow Designer to build a multi-step onboarding journey. Each node in the workflow represents a step — such as "Personal Information", "Document Upload", or "Agreement & Consent". Nodes are connected in a logical sequence using a drag-and-drop canvas that requires no technical skill.

For each step node, admins use the Form Builder to configure the data fields consumers will fill in. Fields support multiple types — text, email, number, boolean, and select — with full Yup validation: required fields, minimum and maximum character lengths, email format checks, and more.

Once the workflow is published, admins receive a unique onboarding URL that they can share with consumers. Consumers visit the link, see the list of steps ahead of them, and begin their journey. Progress is automatically saved at every step, so if a consumer closes the browser and returns later, they can resume exactly where they left off.`,
  },
  {
    icon: <BoltIcon sx={{ fontSize: '1.6rem', color: '#5C4F4A' }} />,
    title: 'Why Workflow Automation Matters',
    content: `Workflow automation is no longer a luxury reserved for large enterprises. It is a competitive necessity for any organisation that interacts with consumers at scale. The benefits of automating onboarding workflows are significant and measurable.

First, automation eliminates human error. When every step is defined in advance — with mandatory fields, validation rules, and a structured sequence — consumers cannot skip required information or submit invalid data. This dramatically reduces the need for manual data correction.

Second, automation creates consistency. Every consumer goes through exactly the same onboarding experience, regardless of which team member initiated the process. This is essential for regulatory compliance, where consistent data collection procedures must be demonstrable.

Third, automation accelerates time-to-value. Consumers complete onboarding faster when guided through a clear, step-by-step process rather than facing an overwhelming single-page form. Faster completion means faster activation, faster revenue, and better consumer satisfaction scores.

Finally, automation provides visibility.`,
  },
];

const VALUES = [
  {
    icon: <HandshakeOutlinedIcon sx={{ fontSize: '1.7rem', color: '#5C4F4A' }} />,
    title: 'Simplicity First',
    desc: 'Every feature is designed to be intuitive. If it takes more than a minute to figure out, we rethink it.',
  },
  {
    icon: <LockOutlinedIcon sx={{ fontSize: '1.7rem', color: '#5C4F4A' }} />,
    title: 'Security by Default',
    desc: 'Consumer data is encrypted and access is strictly role-controlled at every level of the platform.',
  },
  {
    icon: <CropFreeIcon sx={{ fontSize: '1.7rem', color: '#5C4F4A' }} />,
    title: 'Precision Over Complexity',
    desc: 'We focus on solving the onboarding problem exceptionally well rather than becoming a bloated all-in-one tool.',
  },
  {
    icon: <TrendingUpIcon sx={{ fontSize: '1.7rem', color: '#5C4F4A' }} />,
    title: 'Built to Grow',
    desc: 'Workflow X scales from a single-admin startup to a multi-team enterprise without changing how it works.',
  },
];

const AboutPage: React.FC = () => (
  <>
    <SEOHead
      title="About Workflow X — Our Mission & Story"
      description="Learn about Workflow X — why it was built, the consumer onboarding challenges it solves, and how workflow automation transforms business operations."
      canonical="/about"
    />

    <Box sx={{ bgcolor: '#FFFFFF', borderBottom: '1.5px solid rgba(92,79,74,0.12)', py: { xs: 7, sm: 10 }, px: { xs: 3, sm: 5 }, textAlign: 'center'}}>
      <Box sx={{ maxWidth: 680, mx: 'auto' }}>
        <Chip
          label="Our Story"
          size="small"
          sx={{ mb: 2.5, fontWeight: 700, bgcolor: 'rgba(92,79,74,0.08)', color: '#5C4F4A',border: '1px solid rgba(92,79,74,0.18)'}} 
          />
        <Typography variant="h1" sx={{ fontFamily: '"Playfair Display", Georgia, serif', fontSize: { xs: '2.2rem', sm: '3rem' }, color: '#2E2522', mb: 2.5}}>
          About Workflow X
        </Typography>
        <Typography variant="body1" sx={{ color: '#6B5F59', lineHeight: 1.8, fontSize: '1.05rem' }}>
          Workflow X is a no-code consumer onboarding automation platform designed to replace manual,
          error-prone data collection processes with structured, guided, and validated digital workflows.
          Built for teams that believe onboarding should be effortless — for both the business and the consumer.
        </Typography>
      </Box>
    </Box>

    <Box sx={{ maxWidth: 860, mx: 'auto', px: { xs: 3, sm: 5 }, py: { xs: 6, sm: 8 } }}>
      {SECTIONS.map((sec, i) => (
        <Box key={sec.title}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2.5 }}>
            <Box sx={{ width: 44, height: 44, borderRadius: 2.5, bgcolor: 'rgba(92,79,74,0.07)', border: '1.5px solid rgba(92,79,74,0.14)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}>
              {sec.icon}
            </Box>
            <Typography variant="h2" sx={{ fontFamily: '"Playfair Display", Georgia, serif', fontSize: { xs: '1.5rem', sm: '1.9rem' }, color: '#2E2522'}}>
              {sec.title}
            </Typography>
          </Box>
          {sec.content.split('\n\n').map((para, j) => (
            <Typography
              key={j}
              variant="body1"
              sx={{ color: '#6B5F59', lineHeight: 1.85, mb: 2, fontSize: '0.975rem' }}
            >
              {para}
            </Typography>
          ))}
          {i < SECTIONS.length - 1 && (
            <Divider sx={{ my: 5, borderColor: 'rgba(92,79,74,0.1)' }} />
          )}
        </Box>
      ))}
    </Box>

    <Box sx={{ bgcolor: '#FFFFFF', py: { xs: 7, sm: 10 }, px: { xs: 3, sm: 5 } }}>
      <Box sx={{ maxWidth: 1000, mx: 'auto' }}>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="overline" sx={{ color: '#A89890', letterSpacing: '0.12em', fontWeight: 700, display: 'block', mb: 1}} >
            What We Stand For
          </Typography>
          <Typography variant="h2" sx={{fontFamily: '"Playfair Display", Georgia, serif', fontSize: { xs: '1.8rem', sm: '2.2rem' }, color: '#2E2522'}}>
            Our Core Values
          </Typography>
        </Box>
        <Grid container spacing={2.5}>
          {VALUES.map(v => (
            <Grid size={{ xs: 12, sm: 6 }} key={v.title}>
              <Paper
                variant="outlined"
                sx={{ p: 3, borderRadius: 3, border: '1.5px solid rgba(92,79,74,0.14)', height: '100%', transition: 'all 0.2s', '&:hover': { borderColor: '#5C4F4A', transform: 'translateY(-3px)', boxShadow: '0 6px 20px rgba(92,79,74,0.1)'}}}>
                <Box sx={{ width: 46, height: 46, borderRadius: 2.5, bgcolor: 'rgba(92,79,74,0.06)', border: '1.5px solid rgba(92,79,74,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2}}>
                  {v.icon}
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 700, color: '#2E2522', mb: 1 }}>
                  {v.title}
                </Typography>
                <Typography variant="body2" sx={{ color: '#6B5F59', lineHeight: 1.65 }}>
                  {v.desc}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>

    <Box sx={{ py: { xs: 6, sm: 8 }, px: { xs: 3, sm: 5 }, textAlign: 'center' }}>
      <Typography variant="h3" sx={{ fontFamily: '"Playfair Display", Georgia, serif', color: '#2E2522', mb: 1.5, fontSize: { xs: '1.6rem', sm: '2rem' }}}>
        Want to see it in action?
      </Typography>
      <Typography variant="body1" sx={{ color: '#6B5F59', mb: 3.5 }}>
        Experience the full onboarding journey or log in to start building your own workflow.
      </Typography>
      <Box sx={{ display: 'flex', gap: 1.5, justifyContent: 'center', flexWrap: 'wrap' }}>
        <Button
          component={Link}
          to="/admin/login"
          variant="contained"
          size="large"
          endIcon={<ArrowForwardIcon />}
          sx={{ fontWeight: 700, px: 4, borderRadius: 3 }}
        >
          Admin Login
        </Button>
        <Button
          component={Link}
          to="/contact"
          variant="outlined"
          size="large"
          endIcon={<MailOutlineIcon />}
          sx={{ fontWeight: 600, px: 4, borderRadius: 3 }}
        >
          Get in Touch
        </Button>
      </Box>
    </Box>
  </>
);

export default AboutPage;