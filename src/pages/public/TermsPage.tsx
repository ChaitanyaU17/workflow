import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import GavelOutlinedIcon from '@mui/icons-material/GavelOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import SEOHead from '../../components/public/SEOHead';

const LAST_UPDATED = 'June 20, 2025';

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <Box sx={{ mb: 5 }}>
    <Typography
      variant="h3"
      sx={{ fontFamily: '"Playfair Display", Georgia, serif', fontSize: { xs: '1.3rem', sm: '1.6rem' }, color: '#2E2522', mb: 2}}
    >
      {title}
    </Typography>
    {children}
  </Box>
);

const Para: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Typography
    variant="body1"
    sx={{ color: '#6B5F59', lineHeight: 1.85, mb: 1.75, fontSize: '0.975rem' }}
  >
    {children}
  </Typography>
);

const TermsPage: React.FC = () => (
  <>
    <SEOHead
      title="Terms and Conditions — Workflow X"
      description="Read the Workflow X Terms and Conditions. Understand your rights and responsibilities when using our consumer onboarding automation platform."
      canonical="/terms-and-conditions"
    />

    <Box sx={{bgcolor: '#FFFFFF', borderBottom: '1.5px solid rgba(92,79,74,0.12)', py: { xs: 6, sm: 8 }, px: { xs: 3, sm: 5 }, textAlign: 'center'}}>
      <Box sx={{ maxWidth: 640, mx: 'auto' }}>
        <Box sx={{ width: 52, height: 52, borderRadius: 3, bgcolor: 'rgba(92,79,74,0.07)', border: '1.5px solid rgba(92,79,74,0.14)', display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto', mb: 2.5,}} >
          <GavelOutlinedIcon sx={{ fontSize: '1.6rem', color: '#5C4F4A' }} />
        </Box>

        <Chip
          label={`Last Updated: ${LAST_UPDATED}`}
          size="small"
          sx={{ mb: 2.5, fontWeight: 600, bgcolor: 'rgba(92,79,74,0.08)', color: '#5C4F4A', border: '1px solid rgba(92,79,74,0.18)'}}
        />
        <Typography
          variant="h1"
          sx={{ fontFamily: '"Playfair Display", Georgia, serif', fontSize: { xs: '2rem', sm: '2.8rem' }, color: '#2E2522', mb: 2}}
        >
          Terms and Conditions
        </Typography>
        <Typography variant="body1" sx={{ color: '#6B5F59', lineHeight: 1.7 }}>
          Please read these Terms and Conditions carefully before using the Workflow X platform. By
          accessing or using our service, you agree to be bound by these terms.
        </Typography>
      </Box>
    </Box>

    <Box sx={{ maxWidth: 820, mx: 'auto', px: { xs: 3, sm: 5 }, py: { xs: 6, sm: 8 } }}>
      <Paper
        variant="outlined"
        sx={{ p: { xs: 3, sm: 4.5 }, borderRadius: 3, border: '1.5px solid rgba(92,79,74,0.14)', bgcolor: '#FFFFFF'}}
      >
        <Section title="1. Acceptance of Terms">
          <Para>
            By accessing or using the Workflow X platform at workflow-x274.onrender.com (the
            "Service"), you confirm that you have read, understood, and agree to be bound by these
            Terms and Conditions ("Terms"), our Privacy Policy, and any additional guidelines we
            may publish from time to time. If you do not agree to these Terms, you must not access
            or use the Service.
          </Para>
          <Para>
            These Terms constitute a legally binding agreement between you and Workflow X. We
            reserve the right to update or modify these Terms at any time. Any changes will be
            effective immediately upon posting to the website. Continued use of the Service after
            any such changes constitutes your acceptance of the revised Terms.
          </Para>
        </Section>

        <Divider sx={{ mb: 4, borderColor: 'rgba(92,79,74,0.08)' }} />

        <Section title="2. Description of Service">
          <Para>
            Workflow X is a consumer onboarding automation platform that enables registered
            administrators to design multi-step onboarding workflows using a visual workflow
            designer, build dynamic data collection forms with validation rules, publish onboarding
            journeys accessible via unique links, manage multiple workflows independently, and view
            consumer onboarding sessions.
          </Para>
          <Para>
            Consumers use the Service to complete guided onboarding journeys as directed by
            administrators. Super Admins manage the platform at the highest level, including
            creating admin accounts and overseeing all workflows and sessions.
          </Para>
        </Section>

        <Divider sx={{ mb: 4, borderColor: 'rgba(92,79,74,0.08)' }} />

        <Section title="3. User Accounts and Registration">
          <Para>
            To access the admin features of Workflow X, you must be registered by a Super Admin.
            You are responsible for maintaining the confidentiality of your account credentials,
            including your username and password. You agree to notify us immediately if you become
            aware of any unauthorised use of your account.
          </Para>
          <Para>
            You must provide accurate, current, and complete information during the registration
            process. Workflow X reserves the right to suspend or terminate any account that
            contains inaccurate information, violates these Terms, or is used for purposes that
            are harmful, fraudulent, or otherwise improper.
          </Para>
          <Para>
            You are solely responsible for all activities that occur under your account. You must
            not share your account credentials with any other person or allow any other person to
            access the Service using your credentials.
          </Para>
        </Section>

        <Divider sx={{ mb: 4, borderColor: 'rgba(92,79,74,0.08)' }} />

        <Section title="4. Acceptable Use">
          <Para>
            You agree to use the Service only for lawful purposes and in accordance with these
            Terms. You must not use the Service in any way that violates applicable local,
            national, or international laws or regulations.
          </Para>
          <Para>
            You must not use the Service to collect, store, or process personal data without
            appropriate consent from the individuals concerned. If you are an administrator
            collecting consumer data through onboarding workflows, you are responsible for ensuring
            that your data collection practices comply with all applicable data protection laws,
            including but not limited to GDPR, CCPA, and PDPA.
          </Para>
          <Para>
            You must not attempt to probe, scan, or test the vulnerability of the Service or any
            network connected to it. You must not attempt to gain unauthorised access to any
            portion of the Service, other accounts, or any related systems or networks.
          </Para>
          <Para>
            You must not use the Service to design onboarding workflows intended to deceive,
            defraud, or mislead consumers. All consumer data collected through the platform must
            be used only for legitimate business purposes.
          </Para>
        </Section>

        <Divider sx={{ mb: 4, borderColor: 'rgba(92,79,74,0.08)' }} />

        <Section title="5. Intellectual Property">
          <Para>
            The Workflow X platform, including all software, visual design elements, workflow
            designer, form builder, user interface components, documentation, and content created
            by us, is and remains the exclusive intellectual property of Workflow X and its
            licensors. All rights, title, and interest in and to the Service are reserved.
          </Para>
          <Para>
            You are granted a limited, non-exclusive, non-transferable licence to access and use
            the Service for its intended purpose in accordance with these Terms. This licence does
            not include the right to reproduce, distribute, modify, create derivative works of,
            publicly display, or commercially exploit any portion of the Service without our prior
            written consent.
          </Para>
          <Para>
            Workflows, forms, and other content created by admin users through the platform remain
            the intellectual property of the respective admin. However, by creating content on the
            platform, you grant Workflow X a limited licence to host, display, and process that
            content as necessary to provide the Service.
          </Para>
        </Section>

        <Divider sx={{ mb: 4, borderColor: 'rgba(92,79,74,0.08)' }} />

        <Section title="6. Privacy and Data Protection">
          <Para>
            Your use of the Service is subject to our Privacy Policy, which is incorporated into
            these Terms by reference. Our Privacy Policy explains how we collect, use, and protect
            your personal information, including how we use cookies and how Google AdSense may
            serve personalised advertisements.
          </Para>
          <Para>
            If you are an administrator collecting personal data from consumers through onboarding
            workflows, you act as a data controller with respect to that consumer data. You are
            independently responsible for complying with all applicable data protection laws and
            for obtaining any necessary consents from consumers before collecting their data.
          </Para>
        </Section>

        <Divider sx={{ mb: 4, borderColor: 'rgba(92,79,74,0.08)' }} />

        <Section title="7. Disclaimer of Warranties">
          <Para>
            The Service is provided "as is" and "as available" without any warranties of any kind,
            either express or implied. To the fullest extent permitted by applicable law, Workflow
            X expressly disclaims all warranties, including implied warranties of merchantability,
            fitness for a particular purpose, and non-infringement.
          </Para>
          <Para>
            We do not warrant that the Service will be uninterrupted, error-free, or completely
            secure. We do not warrant that any defects in the Service will be corrected, or that
            the Service is free of viruses or other harmful components. You use the Service at your
            own risk.
          </Para>
        </Section>

        <Divider sx={{ mb: 4, borderColor: 'rgba(92,79,74,0.08)' }} />

        <Section title="8. Limitation of Liability">
          <Para>
            To the maximum extent permitted by applicable law, Workflow X and its directors,
            employees, partners, and licensors shall not be liable for any indirect, incidental,
            special, consequential, or punitive damages, including but not limited to loss of
            profits, data, goodwill, or other intangible losses, resulting from your access to or
            use of (or inability to access or use) the Service.
          </Para>
          <Para>
            In no event shall our total aggregate liability to you for all claims relating to the
            Service exceed the amount you have paid to us, if any, in the twelve months preceding
            the claim, or one hundred dollars ($100), whichever is greater.
          </Para>
        </Section>

        <Divider sx={{ mb: 4, borderColor: 'rgba(92,79,74,0.08)' }} />

        <Section title="9. Termination">
          <Para>
            We reserve the right to suspend or terminate your access to the Service at any time,
            with or without cause, and with or without notice. Upon termination, your right to use
            the Service will immediately cease. Workflow X shall not be liable to you or any third
            party for any termination of your access to the Service.
          </Para>
          <Para>
            You may discontinue your use of the Service at any time. If you are an admin user,
            please contact a Super Admin to deactivate your account.
          </Para>
        </Section>

        <Divider sx={{ mb: 4, borderColor: 'rgba(92,79,74,0.08)' }} />

        <Section title="10. Governing Law">
          <Para>
            These Terms shall be governed by and construed in accordance with the laws applicable
            in the jurisdiction in which Workflow X operates, without regard to its conflict of law
            provisions. Any disputes arising under or in connection with these Terms shall be
            subject to the exclusive jurisdiction of the courts in that jurisdiction.
          </Para>
        </Section>

        <Divider sx={{ mb: 4, borderColor: 'rgba(92,79,74,0.08)' }} />

        <Section title="11. Contact Information">
          <Para>
            If you have any questions about these Terms and Conditions, please contact us at:
          </Para>
          <Para>
            <strong style={{ color: '#2E2522' }}>Email:</strong> support@workflowx.app
            <br />
            <strong style={{ color: '#2E2522' }}>Website:</strong>{' '}
            https://workflow-x274.onrender.com/contact
          </Para>
        </Section>

        <Box sx={{ mt: 4, p: 2.5, borderRadius: 2, bgcolor: 'rgba(92,79,74,0.04)', border: '1px solid rgba(92,79,74,0.12)', display: 'flex', alignItems: 'flex-start', gap: 1.25}} >
          <InfoOutlinedIcon sx={{ fontSize: '1rem', color: '#A89890', mt: 0.15, flexShrink: 0 }} />
          <Typography variant="caption" sx={{ color: '#A89890', display: 'block' }}>
            These Terms and Conditions were last updated on {LAST_UPDATED}. We may revise these
            Terms from time to time. The most current version will always be posted on this page.
          </Typography>
        </Box>
      </Paper>
    </Box>
  </>
);

export default TermsPage;