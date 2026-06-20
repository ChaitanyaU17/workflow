import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import GppGoodOutlinedIcon from '@mui/icons-material/GppGoodOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import SEOHead from '../../components/public/SEOHead';

const LAST_UPDATED = 'June 20, 2025';

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <Box sx={{ mb: 5 }}>
    <Typography
      variant="h3"
      sx={{ fontFamily: '"Playfair Display", Georgia, serif', fontSize: { xs: '1.3rem', sm: '1.6rem' }, color: '#2E2522', mb: 2}}>
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

const PrivacyPolicyPage: React.FC = () => (
  <>
    <SEOHead
      title="Privacy Policy — Workflow X"
      description="Read the Workflow X Privacy Policy. Learn how we collect, use, and protect your personal data, including how Google AdSense uses cookies for personalised advertising."
      canonical="/privacy-policy"
    />

    <Box sx={{ bgcolor: '#FFFFFF', borderBottom: '1.5px solid rgba(92,79,74,0.12)', py: { xs: 6, sm: 8 }, px: { xs: 3, sm: 5 }, textAlign: 'center'}}>
      <Box sx={{ maxWidth: 640, mx: 'auto' }}>
        <Box sx={{ width: 52, height: 52, borderRadius: 3, bgcolor: 'rgba(92,79,74,0.07)', border: '1.5px solid rgba(92,79,74,0.14)', display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto', mb: 2.5, }}>
          <GppGoodOutlinedIcon sx={{ fontSize: '1.6rem', color: '#5C4F4A' }} />
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
          Privacy Policy
        </Typography>
        <Typography variant="body1" sx={{ color: '#6B5F59', lineHeight: 1.7 }}>
          This Privacy Policy explains how Workflow X ("we", "our", or "us") collects, uses,
          stores, and protects your personal information when you visit or interact with our
          platform at workflow-x274.onrender.com.
        </Typography>
      </Box>
    </Box>

    <Box sx={{ maxWidth: 820, mx: 'auto', px: { xs: 3, sm: 5 }, py: { xs: 6, sm: 8 } }}>
      <Paper variant="outlined" sx={{ p: { xs: 3, sm: 4.5 }, borderRadius: 3, border: '1.5px solid rgba(92,79,74,0.14)', bgcolor: '#FFFFFF'}} >
        <Section title="1. Introduction">
          <Para>
            Workflow X is committed to protecting your privacy and handling your personal data with
            transparency, integrity, and care. This Privacy Policy describes what data we collect
            from visitors and registered users, how we use that data, what rights you have
            regarding your data, and how we ensure your information remains secure.
          </Para>
          <Para>
            By using our website and platform, you agree to the practices described in this Privacy
            Policy. If you do not agree with any part of this policy, please discontinue your use
            of our platform. We may update this policy periodically, and we encourage you to review
            it regularly to stay informed of any changes.
          </Para>
        </Section>

        <Divider sx={{ mb: 4, borderColor: 'rgba(92,79,74,0.08)' }} />

        <Section title="2. Information We Collect">
          <Para>
            We collect information in several ways when you visit or use the Workflow X platform.
            The categories of information we may collect include:
          </Para>
          <Para>
            <strong style={{ color: '#2E2522' }}>Information you provide directly:</strong> When
            you register as an admin or super admin, we collect your name, username, and password
            credentials. When consumers complete onboarding workflows, we collect the information
            they enter in the form fields configured by the admin — which may include personal
            details, contact information, identification data, and more depending on the workflow
            design.
          </Para>
          <Para>
            <strong style={{ color: '#2E2522' }}>Usage and technical information:</strong> We
            automatically collect certain technical information when you visit our platform,
            including your IP address, browser type and version, operating system, referring URLs,
            pages visited, time spent on pages, and click interactions.
          </Para>
          <Para>
            <strong style={{ color: '#2E2522' }}>Cookies and tracking data:</strong> We use
            cookies, local storage, and similar tracking technologies to maintain your session,
            remember your preferences, and serve relevant advertisements. Please see Section 3 for
            detailed information about our use of cookies.
          </Para>
          <Para>
            <strong style={{ color: '#2E2522' }}>Contact and communication data:</strong> If you
            contact us through our contact form or email, we retain the information you share,
            including your name, email address, and message content, to respond to your enquiry
            and improve our support processes.
          </Para>
        </Section>

        <Divider sx={{ mb: 4, borderColor: 'rgba(92,79,74,0.08)' }} />

        <Section title="3. Cookies and Tracking Technologies">
          <Para>
            Cookies are small text files stored on your device by your web browser when you visit
            a website. Workflow X uses cookies and similar technologies for the following purposes:
          </Para>
          <Para>
            <strong style={{ color: '#2E2522' }}>Essential cookies:</strong> These cookies are
            necessary for the platform to function correctly. They maintain your authentication
            session, store your onboarding progress, and enable core features such as admin login
            and workflow management. Without these cookies, certain functionality will not be
            available.
          </Para>
          <Para>
            <strong style={{ color: '#2E2522' }}>Analytics cookies:</strong> We use analytics
            cookies to understand how visitors interact with our website. This data is aggregated
            and anonymised to protect individual privacy.
          </Para>
          <Para>
            <strong style={{ color: '#2E2522' }}>Advertising cookies:</strong> We participate in
            the Google AdSense advertising programme. Google AdSense uses cookies to serve
            personalised advertisements to visitors based on their browsing history and interests.
            You can opt out of personalised advertising by visiting{' '}
            <strong style={{ color: '#5C4F4A' }}>
              https://www.google.com/settings/ads
            </strong>
            .
          </Para>
          <Para>
            You may control your cookie preferences through your browser settings. However,
            disabling certain cookies may affect the functionality of the platform.
          </Para>
        </Section>

        <Divider sx={{ mb: 4, borderColor: 'rgba(92,79,74,0.08)' }} />

        <Section title="4. Google AdSense and Advertising">
          <Para>
            Workflow X uses Google AdSense to display advertisements on our website. As part of
            this service, Google may use cookies and similar technologies to collect information
            about your activity on our website and other websites to provide you with targeted
            advertisements.
          </Para>
          <Para>
            You may opt out of personalised advertising by visiting Google's Ads Settings at{' '}
            <strong style={{ color: '#5C4F4A' }}>https://www.google.com/settings/ads</strong> or
            by visiting the Network Advertising Initiative opt-out page at{' '}
            <strong style={{ color: '#5C4F4A' }}>https://www.networkadvertising.org</strong>.
          </Para>
          <Para>
            For more information about how Google uses data when you use our partners' sites or
            apps, please visit{' '}
            <strong style={{ color: '#5C4F4A' }}>
              https://policies.google.com/technologies/partner-sites
            </strong>
            .
          </Para>
        </Section>

        <Divider sx={{ mb: 4, borderColor: 'rgba(92,79,74,0.08)' }} />

        <Section title="5. How We Use Your Information">
          <Para>We use the information we collect for the following purposes:</Para>
          <Para>
            To provide and operate the Workflow X platform, including enabling admins to create and
            manage workflows, enabling consumers to complete onboarding journeys, and enabling
            super admins to manage the platform.
          </Para>
          <Para>
            To maintain and improve the security of the platform, detect fraudulent or unauthorised
            activity, and enforce our Terms and Conditions.
          </Para>
          <Para>
            To respond to your enquiries and provide customer support when you contact us through
            our contact form or email.
          </Para>
          <Para>
            To analyse usage patterns and improve the functionality, performance, and user
            experience of our platform over time.
          </Para>
          <Para>
            To serve relevant advertisements through the Google AdSense programme, which helps
            support the ongoing development and maintenance of Workflow X as a free platform.
          </Para>
        </Section>

        <Divider sx={{ mb: 4, borderColor: 'rgba(92,79,74,0.08)' }} />

        <Section title="6. Third-Party Services">
          <Para>
            We engage third-party services to help us operate, analyse, and improve our platform.
            Our current third-party service providers include:
          </Para>
          <Para>
            <strong style={{ color: '#2E2522' }}>Google Analytics:</strong> We use Google
            Analytics to collect and analyse anonymised usage data.
          </Para>
          <Para>
            <strong style={{ color: '#2E2522' }}>Google AdSense:</strong> We use Google AdSense
            to monetise the platform through contextual and personalised advertising. See Section 4
            for full details.
          </Para>
          <Para>
            <strong style={{ color: '#2E2522' }}>Render (Hosting):</strong> Workflow X is hosted
            on Render, a cloud platform. Render may collect server-level logs and infrastructure
            metrics as part of normal hosting operations.
          </Para>
        </Section>

        <Divider sx={{ mb: 4, borderColor: 'rgba(92,79,74,0.08)' }} />

        <Section title="7. Data Retention">
          <Para>
            We retain personal data only for as long as necessary to fulfil the purposes for which
            it was collected. Consumer onboarding session data is retained for the duration of the
            workflow process and may be retained for a reasonable period afterwards for audit and
            compliance purposes. If you wish to request deletion of your data, please contact us
            using the information in Section 10.
          </Para>
        </Section>

        <Divider sx={{ mb: 4, borderColor: 'rgba(92,79,74,0.08)' }} />

        <Section title="8. Data Security">
          <Para>
            We implement reasonable technical and organisational measures to protect your personal
            data against unauthorised access, loss, misuse, or disclosure. These measures include
            encrypted data storage, role-based access controls, session-scoped authentication
            tokens, and secure HTTPS communication for all data transmission. However, no method
            of data transmission or storage is completely secure, and we cannot guarantee absolute
            security.
          </Para>
        </Section>

        <Divider sx={{ mb: 4, borderColor: 'rgba(92,79,74,0.08)' }} />

        <Section title="9. Your Rights">
          <Para>
            Depending on your jurisdiction, you may have certain rights regarding your personal
            data, including:
          </Para>
          <Para>
            <strong style={{ color: '#2E2522' }}>Right of access:</strong> You may request a copy
            of the personal data we hold about you.
          </Para>
          <Para>
            <strong style={{ color: '#2E2522' }}>Right to rectification:</strong> You may request
            correction of any inaccurate or incomplete personal data.
          </Para>
          <Para>
            <strong style={{ color: '#2E2522' }}>Right to erasure:</strong> You may request
            deletion of your personal data, subject to certain legal and operational limitations.
          </Para>
          <Para>
            <strong style={{ color: '#2E2522' }}>Right to restrict processing:</strong> You may
            request that we limit the processing of your personal data in certain circumstances.
          </Para>
          <Para>
            <strong style={{ color: '#2E2522' }}>
              Right to opt out of personalised advertising:
            </strong>{' '}
            You may opt out of Google AdSense personalised advertising at any time by visiting{' '}
            <strong style={{ color: '#5C4F4A' }}>https://www.google.com/settings/ads</strong>.
          </Para>
          <Para>To exercise any of these rights, please contact us as described in Section 10.</Para>
        </Section>

        <Divider sx={{ mb: 4, borderColor: 'rgba(92,79,74,0.08)' }} />

        <Section title="10. Contact Us">
          <Para>
            If you have any questions, concerns, or requests regarding this Privacy Policy or our
            data practices, please contact us at:
          </Para>
          <Para>
            <strong style={{ color: '#2E2522' }}>Email:</strong> support@workflowx.app
            <br />
            <strong style={{ color: '#2E2522' }}>Website:</strong>{' '}
            https://workflow-x274.onrender.com/contact
          </Para>
          <Para>
            We are committed to resolving privacy-related concerns promptly and in good faith.
          </Para>
        </Section>

        <Box sx={{ mt: 4, p: 2.5, borderRadius: 2, bgcolor: 'rgba(92,79,74,0.04)', border: '1px solid rgba(92,79,74,0.12)', display: 'flex', alignItems: 'flex-start', gap: 1.25}} >
          <InfoOutlinedIcon sx={{ fontSize: '1rem', color: '#A89890', mt: 0.15, flexShrink: 0 }} />
          <Typography variant="caption" sx={{ color: '#A89890', display: 'block' }}>
            This Privacy Policy was last updated on {LAST_UPDATED}. We may update this policy from
            time to time. Continued use of the platform after updates constitutes acceptance of the
            revised policy.
          </Typography>
        </Box>
      </Paper>
    </Box>
  </>
);

export default PrivacyPolicyPage;