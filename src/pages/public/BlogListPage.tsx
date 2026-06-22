import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Collapse from '@mui/material/Collapse';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PersonOutlineIcon from '@mui/icons-material/PersonOutlined';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import SEOHead from '../../components/public/SEOHead';

interface BlogPost {
  slug: string;
  title: string;
  author: string;
  date: string;
  category: string;
  excerpt: string;
  content: string[];
}

const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'how-to-design-effective-onboarding-workflows',
    title: 'How to Design Effective Consumer Onboarding Workflows',
    author: 'Workflow X Team',
    date: 'June 15, 2025',
    category: 'Workflow Design',
    excerpt:
      'Designing an effective consumer onboarding workflow is both an art and a science. Learn the principles that separate high-completion workflows from frustrating, abandoned ones.',
    content: [
      'Consumer onboarding is one of the most important touchpoints between a business and its customers. A well-designed onboarding workflow creates a positive first impression, collects accurate data, and sets the tone for the entire relationship. A poorly designed one frustrates consumers, leads to abandonment, and results in incomplete or inaccurate information that costs your team hours of manual correction.',
      'The first principle of effective workflow design is clarity of purpose. Before you build a single node, you should be able to answer two questions: What specific information do I need to collect? And why does the consumer need to provide it at each stage? When you can answer these questions clearly, every decision in the design process becomes easier.',
      'Keep workflows focused and sequential. Each step should represent a single conceptual area of data collection — personal information, contact details, identity verification, agreement and consent. When consumers understand what each step is about from the label alone, they feel oriented and confident. Confusion is the enemy of completion.',
      'Limit your workflow to 5–8 steps. Research consistently shows that onboarding completion rates drop sharply beyond the seventh or eighth step. If you genuinely need more than eight steps, consider whether some data can be collected post-onboarding through a follow-up process.',
      'Use progressive disclosure strategically. Start with the easiest, least sensitive information — typically name and email address. Build consumer trust progressively before asking for more sensitive data like identification numbers or financial information. By the time consumers reach the sensitive steps, they have already invested time and are more likely to complete the journey.',
      'Test your workflow before publishing it. This sounds obvious, but many admins publish workflows without completing the consumer journey themselves. Walk through every step as if you were a consumer encountering your business for the first time. Notice where you hesitate, where labels are unclear, and where the journey feels disjointed.',
      'Monitor completion data regularly. If you see high drop-off at a particular step, investigate. Is the form too long? Are fields unclear? Is a required field too invasive? Treat your workflow as a living document that improves over time based on real consumer behaviour.',
      'Finally, always provide clear progress indication. When consumers can see how many steps remain, they are far more likely to continue than when the end feels undefined. Workflow X automatically shows consumers the full list of steps before they begin — this transparency significantly improves completion rates.',
    ],
  },
  {
    slug: 'benefits-of-workflow-automation',
    title: 'The Business Benefits of Workflow Automation in 2025',
    author: 'Workflow X Team',
    date: 'June 12, 2025',
    category: 'Automation',
    excerpt:
      'Workflow automation has moved from a nice-to-have to a competitive necessity. Explore the measurable business benefits that automation delivers across industries.',
    content: [
      'In 2025, workflow automation is no longer a technology reserved for large enterprises with significant IT budgets. Cloud-based platforms like Workflow X have democratised automation, making it accessible to businesses of any size — from solo founders to growing SMEs to established corporations. The question is no longer whether to automate, but how quickly you can start.',
      'The most immediate benefit of workflow automation is time savings. Manual onboarding processes — chasing email attachments, manually reviewing paper forms, copying data from PDFs into spreadsheets — consume enormous amounts of staff time. When you automate these processes, that time is freed up for higher-value activities: building client relationships, improving products, and driving growth.',
      'Automation dramatically reduces human error. When data is entered directly by consumers into a validated digital form, with field-level validation catching mistakes in real time, the accuracy of the information collected increases substantially. Incorrectly entered dates, invalid email addresses, and missing required fields are caught before submission rather than discovered weeks later during a review process.',
      'Consistency is another major benefit. Every consumer who goes through an automated onboarding workflow experiences exactly the same process in the same order with the same data requirements. This consistency is essential for compliance — regulators increasingly require demonstrable consistency in data collection practices across all customers.',
      'Automation also accelerates time-to-value. The time between a consumer expressing interest in your product and completing their registration is directly correlated with conversion rate. The faster and smoother the onboarding process, the higher the percentage of interested prospects who complete it.',
      'Visibility and auditability are greatly enhanced by automation. With manual processes, it is impossible to know at a glance which prospects have started onboarding, which have completed, and which have stalled at a particular step. With Workflow X, admins have real-time visibility into every consumer session.',
      'Finally, automation scales. A manual onboarding process that works for 10 consumers per month will struggle at 100 and fail at 1000. An automated workflow scales linearly — it handles 10, 100, or 1000 consumers with identical effort from your team.',
    ],
  },
  {
    slug: 'dynamic-form-building-best-practices',
    title: 'Dynamic Form Building Best Practices for Data Collection',
    author: 'Workflow X Team',
    date: 'June 10, 2025',
    category: 'Form Design',
    excerpt:
      'Building forms that consumers actually complete requires careful attention to field design, validation, and user experience. Here are the proven best practices.',
    content: [
      'Forms are the workhorses of digital data collection. They are the interface through which consumers provide the information your business needs to serve them. Yet most forms are poorly designed — too long, too confusing, with validation errors that frustrate rather than help.',
      'The most fundamental rule of form design is to only ask for information you genuinely need. Every additional field you add to a form increases cognitive load and reduces the probability of completion.',
      'Choose field types thoughtfully. A text field forces users to type and opens the door to inconsistent input. A select field with predefined options ensures consistency but restricts user choice. A boolean field is perfect for binary yes/no decisions.',
      'Write field labels in plain, conversational language. "First Name" is better than "Forename". "Date of Birth" is better than "DOB". Users of varying literacy levels and non-native speakers should understand exactly what is being requested without needing to think.',
      'Use validation to help, not to punish. Validation errors should appear at the right time — after a field loses focus, not while the user is typing — and should explain clearly what is wrong and how to fix it.',
      'Group related fields logically. Personal identification fields belong together. Contact fields belong together. Do not scatter related information across the form.',
      'Mark required fields clearly and consistently. In Workflow X, fields marked as required are indicated to the consumer before they attempt to submit the step.',
      'Test your forms with real users or colleagues before going live. Watch how they interact with the form. Where do they hesitate? Where do they express confusion?',
    ],
  },
  {
    slug: 'role-based-access-management',
    title: 'Role-Based Access Management in Multi-User Platforms',
    author: 'Workflow X Team',
    date: 'June 8, 2025',
    category: 'Security',
    excerpt:
      'Role-based access control (RBAC) is a foundational security principle that ensures users only access what they need. Learn how it works and why it matters.',
    content: [
      'Role-based access control (RBAC) is a security paradigm that restricts system access based on the roles assigned to individual users within an organisation. Rather than granting permissions to individual users directly, RBAC assigns permissions to roles, and users are assigned to roles.',
      'The principle behind RBAC is the concept of least privilege: every user should have access only to the minimum set of resources and capabilities necessary to perform their job function.',
      'Workflow X implements RBAC with three distinct roles. The Admin role is scoped to the admin\'s own resources. The Consumer role is the most restricted.',
      'RBAC provides several important benefits. It simplifies user management. It reduces the blast radius of security incidents. It creates a clear audit trail of who can access what and why.',
      'When implementing RBAC in your organisation, document your role definitions clearly. Review role assignments regularly. Enforce the principle of least privilege rigorously.',
    ],
  },
  {
    slug: 'improving-consumer-onboarding',
    title: 'Improving Consumer Onboarding: Strategies That Actually Work',
    author: 'Workflow X Team',
    date: 'June 5, 2025',
    category: 'Strategy',
    excerpt:
      'Consumer onboarding is the make-or-break moment of every customer relationship. These proven strategies will help you design an onboarding experience that converts.',
    content: [
      'Consumer onboarding is the process by which new customers are introduced to your product or service and guided through the initial steps required to begin using it.',
      'The first strategy for improving onboarding is to understand the consumer\'s perspective. Map the consumer journey from their perspective: what do they know, what are they unsure about, and what do they find intimidating?',
      'Set clear expectations upfront. Before consumers begin the onboarding journey, show them exactly what is involved: how many steps are there, what types of information they will need to provide, and approximately how long it will take.',
      'Minimise the time to first value. The faster a consumer experiences a benefit from completing onboarding, the more motivated they are to complete the process.',
      'Save progress automatically. One of the biggest abandonment triggers in onboarding is the fear of losing progress. Workflow X saves progress at every step automatically.',
      'Provide clear and helpful error messages. When a consumer makes a mistake, the error message they see significantly affects whether they correct the mistake and continue or give up.',
      'Follow up with incomplete sessions. With Workflow X, admins can see exactly which sessions are in-progress and which consumers stalled.',
    ],
  },
  {
    slug: 'workflow-management-strategies',
    title: 'Workflow Management Strategies for Growing Teams',
    author: 'Workflow X Team',
    date: 'June 3, 2025',
    category: 'Strategy',
    excerpt:
      'As your team grows, managing multiple onboarding workflows becomes increasingly complex. These strategies will keep your workflow library organised and effective.',
    content: [
      'When you first start using a workflow management platform, organisation comes naturally. But as your team grows and your workflow library expands, without deliberate management strategies, things can become disorganised quickly.',
      'The first strategy is consistent naming conventions. Establish a naming pattern before you create your second workflow and stick to it rigorously.',
      'Use workflow duplication strategically. When creating a new workflow that is similar to an existing one, always start by duplicating the existing workflow rather than building from scratch.',
      'Maintain a clear draft/published discipline. A workflow should only be Published when it is genuinely ready for consumer use.',
      'Document significant workflows. For workflows that are business-critical or complex, maintain a brief document that explains the purpose, intended consumers, and workflow owner.',
      'Audit your workflow library regularly. Schedule a monthly or quarterly review of all workflows.',
      'Plan for workflow evolution. Rather than editing live workflows directly, maintain a versioning approach.',
    ],
  },
  {
    slug: 'form-validation-techniques',
    title: 'Form Validation Techniques That Improve Data Quality',
    author: 'Workflow X Team',
    date: 'May 30, 2025',
    category: 'Form Design',
    excerpt:
      'Form validation is the difference between a database full of clean, usable data and one full of errors, inconsistencies, and missing values. Here is how to do it right.',
    content: [
      'Form validation is the process of ensuring that data entered by a user meets the requirements of your data schema before it is accepted and stored.',
      'There are two broad categories of validation: client-side and server-side. For consumer-facing forms, client-side validation is the primary mechanism.',
      'Workflow X uses Yup, a JavaScript schema builder, for client-side validation. Yup allows you to define a validation schema for each form field using chainable methods.',
      'Required field validation is the most basic and important type. A field marked as required must have a non-empty value before the form can be submitted.',
      'Format validation ensures that the data entered matches the expected format. Email format validation checks for the presence of an @ symbol and a valid domain structure.',
      'Range validation applies to numeric fields. Setting minimum and maximum values prevents out-of-range entries.',
      'Always validate at the field level, not just at the form level. Field-level validation that triggers when a field loses focus gives users feedback immediately.',
    ],
  },
  {
    slug: 'enterprise-workflow-automation',
    title: 'Enterprise Workflow Automation: Scaling Onboarding Operations',
    author: 'Workflow X Team',
    date: 'May 27, 2025',
    category: 'Enterprise',
    excerpt:
      'Scaling consumer onboarding operations to enterprise volumes requires more than just tools — it requires thoughtful architecture, governance, and process design.',
    content: [
      'Enterprise workflow automation presents a unique set of challenges that differ significantly from small-team implementations.',
      'At the platform level, role-based access control becomes essential rather than optional.',
      'At the process level, enterprise onboarding automation requires standardisation without rigidity.',
      'Workflow template libraries are a key enterprise practice.',
      'Data governance at the enterprise level means knowing exactly what data is collected, where it is stored, how long it is retained, and who can access it.',
      'Change management is often the most significant challenge in enterprise automation adoption.',
      'Monitor performance at scale with dashboards that provide visibility across the entire workflow portfolio.',
    ],
  },
  {
    slug: 'reducing-manual-processes',
    title: 'Reducing Manual Processes in Consumer Data Management',
    author: 'Workflow X Team',
    date: 'May 24, 2025',
    category: 'Automation',
    excerpt:
      'Manual processes are the hidden cost of growing businesses. Learn how to identify, prioritise, and eliminate the manual work that holds your team back.',
    content: [
      'Manual processes are insidious. They start small and accumulate into time-consuming, error-prone routines that your team accepts as "just how things work".',
      'The first step to reducing manual processes is to map them. Ask every team member who handles consumer data to log every manual task they perform.',
      'Once you have mapped your manual processes, prioritise them by frequency and effort.',
      'Consumer onboarding data collection is almost always a high-priority automation target.',
      'Beyond data collection, look for manual processes in data transfer.',
      'Manual review and approval processes are another significant opportunity.',
      'Measure the impact of your automation initiatives before and after.',
    ],
  },
  {
    slug: 'digital-transformation-through-workflows',
    title: 'Digital Transformation Through Intelligent Workflow Management',
    author: 'Workflow X Team',
    date: 'May 20, 2025',
    category: 'Digital Transformation',
    excerpt:
      'Digital transformation is more than buying new software — it is fundamentally rethinking how work gets done. Intelligent workflow management is at the heart of it.',
    content: [
      'Digital transformation refers to the integration of digital technology into all areas of a business, fundamentally changing how the business operates and delivers value to customers.',
      'Workflow management is one of the foundational elements of digital transformation.',
      'Consumer-facing workflows are particularly high-impact targets for digital transformation.',
      'The journey to digital transformation through workflow automation typically follows a pattern.',
      'Data is a critical byproduct of digital workflow transformation.',
      'Culture is the hardest part of digital transformation.',
      'The organisations that succeed treat digital transformation as a continuous journey rather than a one-time project.',
    ],
  },
];

const CATEGORY_COLORS: Record<string, string> = {
  'Workflow Design': '#5C7A5C',
  'Automation': '#5C4F4A',
  'Form Design': '#6B5C7A',
  'Security': '#7A5C5C',
  'Strategy': '#5C6B7A',
  'Enterprise': '#7A6B5C',
  'Digital Transformation': '#5C7A74',
};

const BlogListPage: React.FC = () => {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <>
      <SEOHead
        title="Blog — Workflow X Insights & Guides"
        description="Read the Workflow X blog for expert guides on workflow automation, consumer onboarding best practices, form design, and digital transformation."
        canonical="/blog"
      />

      <Box sx={{ bgcolor: '#FFFFFF', borderBottom: '1.5px solid rgba(92,79,74,0.12)', py: { xs: 7, sm: 9 }, px: { xs: 3, sm: 5 }, textAlign: 'center'}}>
        <Box sx={{ maxWidth: 640, mx: 'auto' }}>
          <Chip
            label="Insights & Guides"
            size="small"
            sx={{ mb: 2.5, fontWeight: 700, bgcolor: 'rgba(92,79,74,0.08)', color: '#5C4F4A', border: '1px solid rgba(92,79,74,0.18)'}}
          />
          <Typography
            variant="h1"
            sx={{fontFamily: '"Playfair Display", Georgia, serif', fontSize: { xs: '2.2rem', sm: '3rem' }, color: '#2E2522', mb: 2}}
          >
            Workflow X Blog
          </Typography>
          <Typography variant="body1" sx={{ color: '#6B5F59', lineHeight: 1.7 }}>
            Expert articles on workflow automation, consumer onboarding, form design, and digital
            transformation. Written by practitioners for practitioners.
          </Typography>
        </Box>
      </Box>

      <Box sx={{ maxWidth: 920, mx: 'auto', px: { xs: 3, sm: 5 }, py: { xs: 6, sm: 8 } }}>
        <Grid container spacing={3}>
          {BLOG_POSTS.map(post => {
            const isOpen = expanded === post.slug;
            const wordCount = post.content.join(' ').split(' ').length;
            const readTime = Math.ceil(wordCount / 200);
            const categoryColor = CATEGORY_COLORS[post.category] ?? '#5C4F4A';

            return (
              <Grid size={{ xs: 12 }} key={post.slug}>
                <Paper
                  id={`blog-${post.slug}`}
                  variant="outlined"
                  sx={{ borderRadius: 3, border: '1.5px solid rgba(92,79,74,0.14)', bgcolor: '#FFFFFF', overflow: 'hidden', transition: 'all 0.2s', '&:hover': { borderColor: '#5C4F4A', boxShadow: '0 4px 20px rgba(92,79,74,0.1)'}}}>
                  <Box sx={{ p: { xs: 3, sm: 3.5 } }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2, flexWrap: 'wrap'}}>
                      <Chip
                        label={post.category}
                        size="small"
                        sx={{ fontWeight: 700, bgcolor: `${categoryColor}14`, color: categoryColor, fontSize: '0.72rem', border: `1px solid ${categoryColor}30`}}
                      />
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <CalendarTodayIcon sx={{ fontSize: '0.72rem', color: '#A89890' }} />
                        <Typography variant="caption" sx={{ color: '#A89890' }}>
                          {post.date}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <PersonOutlineIcon sx={{ fontSize: '0.78rem', color: '#A89890' }} />
                        <Typography variant="caption" sx={{ color: '#A89890' }}>
                          {post.author}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <AccessTimeIcon sx={{ fontSize: '0.72rem', color: '#A89890' }} />
                        <Typography variant="caption" sx={{ color: '#A89890' }}>
                          {readTime} min read
                        </Typography>
                      </Box>
                    </Box>

                    <Typography
                      variant="h2"
                      component="h2"
                      sx={{ fontFamily: '"Playfair Display", Georgia, serif', fontSize: { xs: '1.3rem', sm: '1.6rem' }, color: '#2E2522', mb: 1.5, lineHeight: 1.3}}
                    >
                      {post.title}
                    </Typography>

                    <Typography
                      variant="body2"
                      sx={{ color: '#6B5F59', lineHeight: 1.7, mb: 2.5 }}
                    >
                      {post.excerpt}
                    </Typography>

                    <Button
                      variant={isOpen ? 'contained' : 'outlined'}
                      size="small"
                      onClick={() => setExpanded(isOpen ? null : post.slug)}
                      endIcon={
                        isOpen ? (
                          <ExpandLessIcon sx={{ fontSize: '1rem !important' }} />
                        ) : (
                          <ExpandMoreIcon sx={{ fontSize: '1rem !important' }} />
                        )
                      }
                      sx={{ fontWeight: 600, fontSize: '0.8rem', borderRadius: 2 }}
                    >
                      {isOpen ? 'Close Article' : 'Read Full Article'}
                    </Button>
                  </Box>

                  <Collapse in={isOpen}>
                    <Divider sx={{ borderColor: 'rgba(92,79,74,0.1)' }} />
                    <Box sx={{ p: { xs: 3, sm: 3.5 }, pt: 3 }}>
                      {post.content.map((para, i) => (
                        <Typography key={i} variant="body1" sx={{ color: '#6B5F59', lineHeight: 1.85, mb: 2, fontSize: '0.975rem'}} >
                          {para}
                        </Typography>
                      ))}
                      <Divider sx={{ my: 3, borderColor: 'rgba(92,79,74,0.1)' }} />
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexWrap: 'wrap'}} >
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <PersonOutlineIcon sx={{ fontSize: '0.78rem', color: '#A89890' }} />
                          <Typography variant="caption" sx={{ color: '#A89890' }}>
                            {post.author} · {post.date}
                          </Typography>
                        </Box>
                        <Chip
                          label={post.category}
                          size="small"
                          sx={{ fontWeight: 700, bgcolor: `${categoryColor}14`, color: categoryColor, fontSize: '0.7rem'}}
                        />
                      </Box>
                    </Box>
                  </Collapse>
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </>
  );
};

export default BlogListPage;