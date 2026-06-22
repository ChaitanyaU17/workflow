import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutlined';
import AccountTreeOutlinedIcon from '@mui/icons-material/AccountTreeOutlined';
import DynamicFormOutlinedIcon from '@mui/icons-material/DynamicFormOutlined';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import TuneIcon from '@mui/icons-material/Tune';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import TipsAndUpdatesOutlinedIcon from '@mui/icons-material/TipsAndUpdatesOutlined';
import EastIcon from '@mui/icons-material/East';
import SEOHead from '../../components/public/SEOHead';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel: React.FC<TabPanelProps> = ({ children, value, index }) => (
  <Box
    role="tabpanel"
    hidden={value !== index}
    id={`doc-panel-${index}`}
    aria-labelledby={`doc-tab-${index}`}
  >
    {value === index && <Box sx={{ pt: 4 }}>{children}</Box>}
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

const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Typography
    variant="h3"
    sx={{ fontFamily: '"Playfair Display", Georgia, serif', fontSize: { xs: '1.25rem', sm: '1.5rem' }, color: '#2E2522', mb: 2, mt: 3.5}}
  >
    {children}
  </Typography>
);

const CodeBlock: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Box sx={{ bgcolor: '#F0ECE8', border: '1.5px solid rgba(92,79,74,0.14)', borderRadius: 2, p: 2, mb: 2.5, fontFamily: '"JetBrains Mono", monospace', fontSize: '0.82rem', color: '#5C4F4A', lineHeight: 1.7, overflowX: 'auto'}} >
    {children}
  </Box>
);

const StepCard: React.FC<{ step: number; title: string; desc: string }> = ({
  step,
  title,
  desc,
}) => (
  <Paper
    variant="outlined"
    sx={{ p: 2.5, borderRadius: 2.5, border: '1.5px solid rgba(92,79,74,0.14)', display: 'flex', gap: 2, mb: 2, transition: 'all 0.2s', '&:hover': { borderColor: '#5C4F4A', boxShadow: '0 4px 14px rgba(92,79,74,0.1)' }}}
  >
    <Box sx={{ width: 36, height: 36, borderRadius: '50%', bgcolor: '#5C4F4A', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}>
      <Typography sx={{ color: '#EDE9E6', fontWeight: 700, fontSize: '0.875rem' }}>
        {step}
      </Typography>
    </Box>
    <Box>
      <Typography
        variant="h6"
        sx={{ fontWeight: 700, color: '#2E2522', mb: 0.5, fontSize: '0.95rem' }}
      >
        {title}
      </Typography>
      <Typography variant="body2" sx={{ color: '#6B5F59', lineHeight: 1.65 }}>
        {desc}
      </Typography>
    </Box>
  </Paper>
);

const DOC_TABS = [
  { label: 'Getting Started', icon: <PlayCircleOutlineIcon sx={{ fontSize: '1rem' }} /> },
  { label: 'Workflow Designer', icon: <AccountTreeOutlinedIcon sx={{ fontSize: '1rem' }} /> },
  { label: 'Form Builder', icon: <DynamicFormOutlinedIcon sx={{ fontSize: '1rem' }} /> },
  { label: 'Assign Forms', icon: <AssignmentOutlinedIcon sx={{ fontSize: '1rem' }} /> },
  { label: 'Managing Users', icon: <GroupOutlinedIcon sx={{ fontSize: '1rem' }} /> },
  { label: 'Admin Features', icon: <TuneIcon sx={{ fontSize: '1rem' }} /> },
  { label: 'Sharing', icon: <ShareOutlinedIcon sx={{ fontSize: '1rem' }} /> },
  { label: 'Best Practices', icon: <TipsAndUpdatesOutlinedIcon sx={{ fontSize: '1rem' }} /> },
];

const DocumentationPage: React.FC = () => {
  const [tab, setTab] = useState(0);

  return (
    <>
      <SEOHead
        title="Documentation — Workflow X"
        description="Comprehensive documentation for Workflow X. Learn how to create workflows, build forms, manage users, and follow best practices for consumer onboarding automation."
        canonical="/documentation"
      />

      <Box sx={{ bgcolor: '#FFFFFF', borderBottom: '1.5px solid rgba(92,79,74,0.12)', py: { xs: 6, sm: 8 }, px: { xs: 3, sm: 5 }, textAlign: 'center'}}>
        <Box sx={{ maxWidth: 640, mx: 'auto' }}>
          <Chip
            label="Platform Guide"
            size="small"
            sx={{ mb: 2.5, fontWeight: 700, bgcolor: 'rgba(92,79,74,0.08)', color: '#5C4F4A', border: '1px solid rgba(92,79,74,0.18)', }}
          />
          <Typography
            variant="h1"
            sx={{ fontFamily: '"Playfair Display", Georgia, serif', fontSize: { xs: '2rem', sm: '2.8rem' }, color: '#2E2522', mb: 2}}
          >
            Documentation
          </Typography>
          <Typography variant="body1" sx={{ color: '#6B5F59', lineHeight: 1.7 }}>
            Everything you need to know about using Workflow X — from creating your first workflow
            to mastering advanced admin features.
          </Typography>
        </Box>
      </Box>

      <Box sx={{ maxWidth: 1100, mx: 'auto', px: { xs: 2, sm: 4 }, py: { xs: 4, sm: 6 } }}>
        <Grid container spacing={3} sx={{alignItems: "flex-start"}}>
          <Grid size={{ xs: 12, md: 3 }} sx={{ display: { xs: 'none', md: 'block' } }}>
            <Paper variant="outlined" sx={{ borderRadius: 3, border: '1.5px solid rgba(92,79,74,0.14)', overflow: 'hidden', position: 'sticky', top: 80}} >
              <Box sx={{ px: 2, py: 1.5, bgcolor: '#F0ECE8', borderBottom: '1px solid rgba(92,79,74,0.1)'}} >
                <Typography
                  variant="caption"
                  sx={{ fontWeight: 700, color: '#A89890', textTransform: 'uppercase', letterSpacing: '0.08em'}}
                >
                  Contents
                </Typography>
              </Box>
              {DOC_TABS.map((t, i) => (
                <Box
                  key={t.label}
                  onClick={() => setTab(i)}
                  sx={{ px: 2, py: 1.4, cursor: 'pointer', borderBottom: '1px solid rgba(92,79,74,0.07)', bgcolor: tab === i ? 'rgba(92,79,74,0.06)' : 'transparent', borderLeft: tab === i ? '3px solid #5C4F4A' : '3px solid transparent', transition: 'all 0.15s', display: 'flex', alignItems: 'center', gap: 1.25, '&:hover': { bgcolor: 'rgba(92,79,74,0.05)' }}} >
                  <Box sx={{ color: tab === i ? '#5C4F4A' : '#A89890', display: 'flex', alignItems: 'center', transition: 'color 0.15s'}}>
                    {t.icon}
                  </Box>
                  <Typography sx={{ fontSize: '0.85rem', fontWeight: tab === i ? 700 : 500, color: tab === i ? '#5C4F4A' : '#6B5F59'}} >
                    {t.label}
                  </Typography>
                </Box>
              ))}
            </Paper>
          </Grid>

          <Grid size={{ xs: 12, md: 9 }}>
            <Box sx={{ display: { xs: 'block', md: 'none' }, mb: 2 }}>
              <Tabs
                value={tab}
                onChange={(_, v) => setTab(v)}
                variant="scrollable"
                scrollButtons="auto"
                sx={{ borderBottom: '1.5px solid rgba(92,79,74,0.12)' }}
              >
                {DOC_TABS.map((t, i) => (
                  <Tab
                    key={t.label}
                    label={t.label}
                    icon={t.icon}
                    iconPosition="start"
                    id={`doc-tab-${i}`}
                    aria-controls={`doc-panel-${i}`}
                    sx={{ fontSize: '0.8rem', fontWeight: 600, textTransform: 'none', minHeight: 44, gap: 0.5}}
                  />
                ))}
              </Tabs>
            </Box>

            <Paper
              variant="outlined"
              sx={{ p: { xs: 3, sm: 4 }, borderRadius: 3, border: '1.5px solid rgba(92,79,74,0.14)', bgcolor: '#FFFFFF'}} >
              <TabPanel value={tab} index={0}>
                <Typography
                  variant="h2"
                  sx={{ fontFamily: '"Playfair Display", Georgia, serif', fontSize: { xs: '1.6rem', sm: '2rem' }, color: '#2E2522', mb: 1.5}}
                >
                  Getting Started with Workflow X
                </Typography>
                <Para>
                  Workflow X is a no-code consumer onboarding platform. This guide will walk you
                  through the initial setup and help you create, configure, and publish your first
                  onboarding workflow in minutes. No technical experience is required.
                </Para>
                <SectionTitle>Prerequisites</SectionTitle>
                <Para>
                  To use Workflow X as an admin, you need an admin account created by your Super
                  Admin. If you are setting up the platform for the first time, you will need Super
                  Admin credentials to log in and create admin accounts. Contact your system
                  administrator for access.
                </Para>
                <SectionTitle>Logging In</SectionTitle>
                <StepCard
                  step={1}
                  title="Navigate to Admin Login"
                  desc="Visit /admin/login on your Workflow X platform URL. Enter your username and password."
                />
                <StepCard
                  step={2}
                  title="Access Your Dashboard"
                  desc="Upon successful login, you will land on the Workflows dashboard where you can see all your existing workflows and create new ones."
                />
                <StepCard
                  step={3}
                  title="Explore the Interface"
                  desc="The top navigation bar shows Workflows and Sessions tabs. Use Workflows to design onboarding flows and Sessions to monitor consumer progress."
                />
                <SectionTitle>Platform Overview</SectionTitle>
                <Para>
                  Workflow X operates on three core concepts: Workflows (the overall onboarding
                  process), Nodes (individual steps within a workflow), and Forms (the data fields
                  consumers fill in at each step). Understanding the relationship between these
                  three concepts is the foundation for using the platform effectively.
                </Para>
                <Para>
                  Each workflow has a Start node and an End node by default. Between these, you add
                  Step nodes, each representing a stage in the onboarding journey. For each Step
                  node, you configure a form with the specific fields you want consumers to complete
                  at that stage.
                </Para>
                <Divider sx={{ my: 3, borderColor: 'rgba(92,79,74,0.08)' }} />
                <Box
                  sx={{ display: 'flex', alignItems: 'center', gap: 1, cursor: 'pointer' }}
                  onClick={() => setTab(1)}
                >
                  <EastIcon sx={{ fontSize: '0.9rem', color: '#5C4F4A' }} />
                  <Typography
                    variant="body2"
                    sx={{ color: '#5C4F4A', fontWeight: 600, '&:hover': { textDecoration: 'underline' } }}
                  >
                    Proceed to Workflow Designer
                  </Typography>
                </Box>
              </TabPanel>

              <TabPanel value={tab} index={1}>
                <Typography
                  variant="h2"
                  sx={{ fontFamily: '"Playfair Display", Georgia, serif', fontSize: { xs: '1.6rem', sm: '2rem' }, color: '#2E2522', mb: 1.5}}
                >
                  Using the Workflow Designer
                </Typography>
                <Para>
                  The Workflow Designer is a visual, drag-and-drop canvas where you build the
                  structure of your onboarding journey. Every workflow starts with a Start node and
                  ends with an End node. You add Step nodes between them to represent each stage
                  consumers must complete.
                </Para>
                <SectionTitle>Creating a New Workflow</SectionTitle>
                <StepCard
                  step={1}
                  title="Click 'New Workflow'"
                  desc="From the Workflows dashboard, click the 'New Workflow' button in the top-right corner. A new untitled workflow will be created and you will be taken directly to the designer."
                />
                <StepCard
                  step={2}
                  title="Add Step Nodes"
                  desc="In the designer toolbar on the left, click 'Add Step Node' to insert a new step into your workflow. Drag it to position it between the Start and End nodes on the canvas."
                />
                <StepCard
                  step={3}
                  title="Connect Nodes"
                  desc="Drag from the output handle of one node to the input handle of another to create a connection. This defines the sequence consumers will follow through the workflow."
                />
                <StepCard
                  step={4}
                  title="Label Each Node"
                  desc="Click on any node to select it and edit its label in the properties panel on the right. Use clear, descriptive labels like 'Personal Information' or 'Identity Verification'."
                />
                <StepCard
                  step={5}
                  title="Save Your Workflow"
                  desc="The workflow is auto-saved as you work. You can also manually trigger a save by clicking the 'Save' button in the designer toolbar."
                />
                <SectionTitle>Node Types</SectionTitle>
                <Para>
                  <strong style={{ color: '#2E2522' }}>Start Node:</strong> The entry point of
                  every workflow. Consumers begin here automatically. You cannot delete the Start
                  node.
                </Para>
                <Para>
                  <strong style={{ color: '#2E2522' }}>Step Node:</strong> Represents a stage in
                  the onboarding journey. Each step has its own form with configurable data fields.
                </Para>
                <Para>
                  <strong style={{ color: '#2E2522' }}>End Node:</strong> The final node in the
                  workflow. When a consumer reaches the End node, their session is marked as
                  complete. You cannot delete the End node.
                </Para>
                <SectionTitle>Publishing Your Workflow</SectionTitle>
                <Para>
                  A workflow must be in "Published" status before consumers can access it. To
                  publish, return to the Workflows dashboard and click the "Publish" button on your
                  workflow card. Once published, a unique onboarding URL is generated. Share this
                  URL with consumers to begin onboarding.
                </Para>
              </TabPanel>

              <TabPanel value={tab} index={2}>
                <Typography
                  variant="h2"
                  sx={{ fontFamily: '"Playfair Display", Georgia, serif', fontSize: { xs: '1.6rem', sm: '2rem' }, color: '#2E2522', mb: 1.5}}
                >
                  Building Forms for Workflow Steps
                </Typography>
                <Para>
                  Each Step node in your workflow can have a custom form with multiple fields. The
                  Form Builder lets you add, configure, and validate these fields without writing
                  any code.
                </Para>
                <SectionTitle>Available Field Types</SectionTitle>
                {[
                  {
                    type: 'Text',
                    desc: 'Single-line text input. Used for names, addresses, identification numbers, and other short string values.',
                  },
                  {
                    type: 'Email',
                    desc: 'Email input with built-in format validation. Automatically checks for valid email structure (user@domain.com).',
                  },
                  {
                    type: 'Number',
                    desc: 'Numeric input. Accepts integers and decimals. Supports min and max value constraints.',
                  },
                  {
                    type: 'Boolean',
                    desc: 'Yes/No toggle or checkbox. Used for consent confirmations, agreement acknowledgements, and binary choices.',
                  },
                  {
                    type: 'Select',
                    desc: 'Dropdown selector with predefined options. You define the list of choices consumers can select from.',
                  },
                ].map(f => (
                  <Box key={f.type} sx={{ mb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                      <Chip
                        label={f.type}
                        size="small"
                        sx={{ fontWeight: 700, bgcolor: 'rgba(92,79,74,0.1)', color: '#5C4F4A', fontSize: '0.78rem'}}
                      />
                    </Box>
                    <Typography
                      variant="body2"
                      sx={{ color: '#6B5F59', lineHeight: 1.65, pl: 1 }}
                    >
                      {f.desc}
                    </Typography>
                  </Box>
                ))}
                <SectionTitle>Adding a Field</SectionTitle>
                <StepCard
                  step={1}
                  title="Select a Step Node"
                  desc="In the Workflow Designer, click on a Step node to open its properties panel on the right side."
                />
                <StepCard
                  step={2}
                  title="Open the Form Builder"
                  desc="Click 'Edit Form' or 'Configure Fields' in the properties panel to open the Form Builder for that step."
                />
                <StepCard
                  step={3}
                  title="Add a Field"
                  desc="Click 'Add Field', then choose the field type from the dropdown. Give the field a clear label and key name."
                />
                <StepCard
                  step={4}
                  title="Configure Validation"
                  desc="Set whether the field is required, minimum and maximum length, allowed values, or numeric ranges."
                />
                <StepCard
                  step={5}
                  title="Save the Form"
                  desc="Click 'Save Form' to apply your field configuration to the step node."
                />
                <SectionTitle>Validation Rules</SectionTitle>
                <Para>
                  Workflow X uses Yup schema validation to enforce data quality at the form level.
                  You can configure required fields, minimum and maximum character lengths, email
                  format checking, and predefined option sets for select fields.
                </Para>
                <CodeBlock>
                  Example field configuration:{'\n'}
                  Field: "Full Name"{'\n'}
                  Type: Text{'\n'}
                  Required: Yes{'\n'}
                  Min Length: 2{'\n'}
                  Max Length: 100
                </CodeBlock>
              </TabPanel>

              <TabPanel value={tab} index={3}>
                <Typography
                  variant="h2"
                  sx={{ fontFamily: '"Playfair Display", Georgia, serif', fontSize: { xs: '1.6rem', sm: '2rem' }, color: '#2E2522', mb: 1.5}}
                >
                  Assigning Forms to Workflow Nodes
                </Typography>
                <Para>
                  Each Step node in a workflow is associated with exactly one form. This form
                  defines what information the consumer must provide at that stage.
                </Para>
                <SectionTitle>How Form Assignment Works</SectionTitle>
                <Para>
                  When you add a Step node to your workflow, it starts with an empty form. You must
                  explicitly configure the fields for each step. Workflow X does not share form
                  configurations between steps — each step has its own independent form.
                </Para>
                <SectionTitle>Best Practice: One Concept Per Step</SectionTitle>
                <Para>
                  We recommend limiting each step to a single conceptual area of data collection.
                  Dedicate one step to personal information, another to contact details, and another
                  to document references.
                </Para>
                <StepCard
                  step={1}
                  title="Open the Workflow Designer"
                  desc="Navigate to Admin → Workflows and click 'Design' on the workflow you want to configure."
                />
                <StepCard
                  step={2}
                  title="Click a Step Node"
                  desc="Click on any Step node in the canvas to select it. The node properties panel will appear on the right."
                />
                <StepCard
                  step={3}
                  title="Configure Fields"
                  desc="Click 'Edit Form Fields' to open the field editor. Add, reorder, and configure fields for this specific step."
                />
                <StepCard
                  step={4}
                  title="Set Validation Rules"
                  desc="For each field, configure whether it is required, its type constraints, and any validation parameters."
                />
                <StepCard
                  step={5}
                  title="Preview Consumer View"
                  desc="After saving, you can visit the onboarding URL to see exactly how the form appears to consumers."
                />
                <SectionTitle>Ordering Fields</SectionTitle>
                <Para>
                  Fields are presented to consumers in the order you define them in the form
                  builder. Place the most important or identifying fields first.
                </Para>
              </TabPanel>

              <TabPanel value={tab} index={4}>
                <Typography
                  variant="h2"
                  sx={{ fontFamily: '"Playfair Display", Georgia, serif', fontSize: { xs: '1.6rem', sm: '2rem' }, color: '#2E2522', mb: 1.5}}
                >
                  Managing Users
                </Typography>
                <Para>
                  Workflow X has a three-tier user model: Admins, and Consumers.
                  Understanding how each role works is essential to setting up and maintaining a
                  well-structured onboarding operation.
                </Para>
                <SectionTitle>User Roles Overview</SectionTitle>
                {[
                  {
                    role: 'Admin',
                    icon: <TuneIcon sx={{ fontSize: '1.3rem', color: '#5C4F4A' }} />,
                    desc: 'Manages their own workflows and sessions. Admins can create, edit, publish, duplicate, and delete their own workflows but cannot access other admins\' data.',
                  },
                  {
                    role: 'Consumer',
                    icon: <GroupOutlinedIcon sx={{ fontSize: '1.3rem', color: '#5C4F4A' }} />,
                    desc: 'The end user completing the onboarding journey. Consumers access onboarding via a shared URL. They do not have a login — their session is identified by a unique session ID.',
                  },
                ].map(r => (
                  <Paper
                    key={r.role}
                    variant="outlined"
                    sx={{p: 2.5, borderRadius: 2.5, border: '1.5px solid rgba(92,79,74,0.14)', mb: 2, transition: 'all 0.2s', '&:hover': { borderColor: '#5C4F4A' }}}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
                      <Box sx={{ width: 34, height: 34, borderRadius: 2, bgcolor: 'rgba(92,79,74,0.07)', display: 'flex', alignItems: 'center', justifyContent: 'center'}} >
                        {r.icon}
                      </Box>
                      <Typography sx={{ fontWeight: 700, color: '#2E2522' }}>{r.role}</Typography>
                    </Box>
                    <Typography variant="body2" sx={{ color: '#6B5F59', lineHeight: 1.65 }}>
                      {r.desc}
                    </Typography>
                  </Paper>
                ))}
                <SectionTitle>Creating Admin Accounts</SectionTitle>
                <Para>
                  Only Super Admins can create Admin accounts.
                </Para>
                <SectionTitle>Deactivating Admin Accounts</SectionTitle>
                <Para>
                  To deactivate an admin account contact Super Admin, Deactivated admins
                  cannot log in. Their existing workflows and consumer sessions remain intact.
                </Para>
              </TabPanel>

              <TabPanel value={tab} index={5}>
                <Typography variant="h2" sx={{ fontFamily: '"Playfair Display", Georgia, serif', fontSize: { xs: '1.6rem', sm: '2rem' }, color: '#2E2522', mb: 1.5}} >
                  Admin Features
                </Typography>
                <Para>
                  Admins are the primary workflow creators and managers in Workflow X. This section
                  covers all features available to admin users in detail.
                </Para>
                <SectionTitle>Workflows Dashboard</SectionTitle>
                <Para>
                  The Workflows dashboard is the central hub of the admin experience. From here
                  you can view all your workflows, see their current status (Draft or Published),
                  create new workflows, duplicate existing ones, publish drafts, copy onboarding
                  links, and delete workflows.
                </Para>
                <SectionTitle>Workflow Actions</SectionTitle>
                {[
                  {
                    action: 'Design',
                    desc: 'Opens the visual workflow designer where you can add nodes, create connections, and configure forms.',
                  },
                  {
                    action: 'Duplicate',
                    desc: 'Creates an exact copy of the workflow including all nodes, connections, and form configurations. The duplicate starts in Draft status.',
                  },
                  {
                    action: 'Publish',
                    desc: 'Changes a Draft workflow to Published status, making the onboarding URL active and accessible to consumers.',
                  },
                  {
                    action: 'Copy Link',
                    desc: 'Copies the consumer onboarding URL to your clipboard. Share this link with consumers to begin onboarding.',
                  },
                  {
                    action: 'Delete',
                    desc: 'Permanently deletes the workflow. Requires double-confirmation for safety. This action cannot be undone.',
                  },
                ].map(a => (
                  <Box key={a.action} sx={{ mb: 2, pl: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                      <EastIcon sx={{ fontSize: '0.8rem', color: '#C9996B' }} />
                      <Typography
                        sx={{
                          fontWeight: 700,
                          color: '#5C4F4A',
                          fontSize: '0.9rem',
                          fontFamily: '"JetBrains Mono", monospace',
                        }}
                      >
                        {a.action}
                      </Typography>
                    </Box>
                    <Typography
                      variant="body2"
                      sx={{ color: '#6B5F59', lineHeight: 1.65, pl: 2 }}
                    >
                      {a.desc}
                    </Typography>
                  </Box>
                ))}
                <SectionTitle>Sessions Management</SectionTitle>
                <Para>
                  The Sessions tab shows all consumer onboarding sessions for your workflows. Each
                  session entry shows the consumer's session ID, which workflow they are completing,
                  their current status, the date they started, and their progress through the steps.
                </Para>
              </TabPanel>

              <TabPanel value={tab} index={6}>
                <SectionTitle>Admin Account Management</SectionTitle>
                <StepCard
                  step={2}
                  title="Create a New Admin"
                  desc="Click 'Create Admin' and fill in the admin's display name, username, and initial password."
                />
                <StepCard
                  step={3}
                  title="Toggle Admin Status"
                  desc="Use the Active/Inactive toggle next to each admin account to enable or disable their access to the platform."
                />
                <StepCard
                  step={4}
                  title="View Admin Workflows"
                  desc="As a Super Admin, you can see all workflows created by all admins in the platform, not just your own."
                />
                <SectionTitle>Global Sessions View</SectionTitle>
                <Para>
                  Super Admins can view all consumer onboarding sessions across all workflows and
                  all admins. This provides a complete audit trail of consumer activity on the
                  platform.
                </Para>
                <SectionTitle>Share Token Generation</SectionTitle>
                <Para>
                  Super Admins can generate secure, time-limited share tokens for specific consumer
                  sessions. These tokens allow a third party to view selected consumer-submitted
                  data via a unique share URL. The Super Admin configures which fields are visible
                  in the share view.
                </Para>
              </TabPanel>

              <TabPanel value={tab} index={7}>
                <Typography
                  variant="h2"
                  sx={{ fontFamily: '"Playfair Display", Georgia, serif', fontSize: { xs: '1.6rem', sm: '2rem' }, color: '#2E2522', mb: 1.5}}
                >
                  Workflow Sharing
                </Typography>
                <Para>
                  Workflow X includes a secure consumer data sharing feature that allows Super
                  Admins to share selected onboarding data with third parties without exposing the
                  full consumer profile.
                </Para>
                <SectionTitle>How Sharing Works</SectionTitle>
                <Para>
                  When a consumer completes an onboarding workflow, their session data is stored
                  securely. A Super Admin can then generate a share token for that session,
                  creating a unique, time-limited URL that grants read-only access to selected
                  fields from the consumer's submitted data.
                </Para>
                <SectionTitle>Creating a Share Link</SectionTitle>
                <StepCard
                  step={1}
                  title="Go to Sessions"
                  desc="Navigate to the Sessions section in your dashboard and locate the consumer session you want to share."
                />
                <StepCard
                  step={2}
                  title="Open Session Details"
                  desc="Click on the session to open the full session detail view, showing all data submitted by the consumer."
                />
                <StepCard
                  step={3}
                  title="Select Fields to Share"
                  desc="Use the field selection panel to choose which specific data fields should be visible in the shared view."
                />
                <StepCard
                  step={4}
                  title="Generate Share Link"
                  desc="Click 'Generate Share Link'. A unique URL is created with a secure token. Copy this URL to share with the intended recipient."
                />
                <StepCard
                  step={5}
                  title="Share Responsibly"
                  desc="Send the share URL to the third party. The link provides read-only access to only the fields you selected. Never share tokens via unsecured channels."
                />
                <SectionTitle>Share Link Security</SectionTitle>
                <Para>
                  Each token is unique and tied to a specific session. Access via a share link is
                  read-only — recipients cannot modify consumer data. Super Admins control precisely
                  which fields are visible in every share link, ensuring data minimisation
                  principles are followed.
                </Para>
              </TabPanel>

              <TabPanel value={tab} index={8}>
                <Typography
                  variant="h2"
                  sx={{ fontFamily: '"Playfair Display", Georgia, serif', fontSize: { xs: '1.6rem', sm: '2rem' }, color: '#2E2522', mb: 1.5}}
                >
                  Best Practices
                </Typography>
                <Para>
                  Following these best practices will help you create effective, consumer-friendly
                  onboarding workflows that achieve high completion rates and produce high-quality
                  data.
                </Para>
                <SectionTitle>Workflow Design</SectionTitle>
                {[
                  'Keep workflows focused. Design each workflow for a single, specific onboarding purpose rather than trying to collect all possible data in one flow.',
                  'Limit each workflow to 5–8 steps. Longer workflows have lower completion rates. If you need to collect more data, consider whether some can be collected post-onboarding.',
                  'Use meaningful node labels. Labels like "Personal Information", "Contact Details", and "Document References" are far clearer than "Step 1", "Step 2", "Step 3".',
                  'Always test before publishing. Complete the consumer onboarding journey yourself before sharing the link with real consumers.',
                  'Duplicate before modifying live workflows. Make changes to the duplicate and test it before replacing the original.',
                ].map((tip, i) => (
                  <Box key={i} sx={{ display: 'flex', gap: 1.5, mb: 2 }}>
                    <EastIcon
                      sx={{ color: '#C9996B', fontSize: '1rem', flexShrink: 0, mt: 0.2 }}
                    />
                    <Typography variant="body2" sx={{ color: '#6B5F59', lineHeight: 1.7 }}>
                      {tip}
                    </Typography>
                  </Box>
                ))}
                <SectionTitle>Form Design</SectionTitle>
                {[
                  'Mark every field that is genuinely required as required. Avoid marking optional fields as required — this frustrates consumers and increases abandonment.',
                  'Use clear, plain-language field labels. Avoid jargon. Instead of "DOB", write "Date of Birth".',
                  'For select fields, provide a complete and ordered list of options. Include a "Prefer not to say" or "Other" option where appropriate.',
                  'Use boolean fields for explicit consents and agreements.',
                  'Set sensible min/max length limits for text fields.',
                ].map((tip, i) => (
                  <Box key={i} sx={{ display: 'flex', gap: 1.5, mb: 2 }}>
                    <EastIcon
                      sx={{ color: '#C9996B', fontSize: '1rem', flexShrink: 0, mt: 0.2 }}
                    />
                    <Typography variant="body2" sx={{ color: '#6B5F59', lineHeight: 1.7 }}>
                      {tip}
                    </Typography>
                  </Box>
                ))}
                <SectionTitle>Data Handling</SectionTitle>
                {[
                  'Only collect the data you genuinely need. Data minimisation reduces risk and improves consumer trust.',
                  'Inform consumers about how their data will be used before they begin the onboarding journey.',
                  'Use share tokens sparingly and only share the specific fields required by the recipient.',
                  'Regularly review completed sessions to identify common issues and refine your workflow accordingly.',
                ].map((tip, i) => (
                  <Box key={i} sx={{ display: 'flex', gap: 1.5, mb: 2 }}>
                    <EastIcon
                      sx={{ color: '#C9996B', fontSize: '1rem', flexShrink: 0, mt: 0.2 }}
                    />
                    <Typography variant="body2" sx={{ color: '#6B5F59', lineHeight: 1.7 }}>
                      {tip}
                    </Typography>
                  </Box>
                ))}
              </TabPanel>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default DocumentationPage;