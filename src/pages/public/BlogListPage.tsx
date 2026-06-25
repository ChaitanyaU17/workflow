import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../../app/store';
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

interface NormalizedPost {
  slug: string;
  title: string;
  author: string;
  date: string;
  category: string;
  excerpt: string;
  htmlContent: string;
  isDynamic: boolean;
}

const CATEGORY_COLORS: Record<string, string> = {
  'Workflow Design': '#5C7A5C',
  'Automation': '#5C4F4A',
  'Form Design': '#6B5C7A',
  'Security': '#7A5C5C',
  'Strategy': '#5C6B7A',
  'Enterprise': '#7A6B5C',
  'Digital Transformation': '#5C7A74',
};

function toHtmlString(content: unknown): string {
  if (typeof content === 'string') return content;
  if (Array.isArray(content)) return content.map(item => (typeof item === 'string' ? `<p>${item}</p>` : '')).join('');
  return '';
}

function stripHtml(html: string): string {
  if (typeof html !== 'string') return '';
  return html.replace(/<[^>]*>/g, '').trim();
}

const BlogListPage: React.FC = () => {
  const [expanded, setExpanded] = useState<string | null>(null);
  const dynamicBlogs = useSelector((s: RootState) => s.blogs.blogs);

  const allPosts: NormalizedPost[] = dynamicBlogs.map(b => ({
    slug: b.slug,
    title: b.title,
    author: b.author,
    date: b.date,
    category: b.category,
    excerpt: b.excerpt,
    htmlContent: toHtmlString(b.content),
    isDynamic: true,
  }));

  return (
    <>
      <SEOHead
        title="Blog — Workflow X Insights & Guides"
        description="Read the Workflow X blog for expert guides on workflow automation, consumer onboarding best practices, form design, and digital transformation."
        canonical="/blog"
      />

      <Box sx={{ bgcolor: '#FFFFFF', borderBottom: '1.5px solid rgba(92,79,74,0.12)', py: { xs: 7, sm: 9 }, px: { xs: 3, sm: 5 }, textAlign: 'center' }}>
        <Box sx={{ maxWidth: 640, mx: 'auto' }}>
          <Chip label="Insights & Guides" size="small" sx={{ mb: 2.5, fontWeight: 700, bgcolor: 'rgba(92,79,74,0.08)', color: '#5C4F4A', border: '1px solid rgba(92,79,74,0.18)' }} />
          <Typography variant="h1" sx={{ fontFamily: '"Playfair Display", Georgia, serif', fontSize: { xs: '2.2rem', sm: '3rem' }, color: '#2E2522', mb: 2 }}>
            Workflow X Blog
          </Typography>
          <Typography variant="body1" sx={{ color: '#6B5F59', lineHeight: 1.7 }}>
            Expert articles on workflow automation, consumer onboarding, form design, and digital transformation. Written by practitioners for practitioners.
          </Typography>
          {allPosts.length > 0 && (
            <Chip label={`${allPosts.length} post${allPosts.length !== 1 ? 's' : ''} published`} size="small" color="success" sx={{ mt: 1.5, fontWeight: 600 }} />
          )}
        </Box>
      </Box>

      <Box sx={{ maxWidth: 920, mx: 'auto', px: { xs: 3, sm: 5 }, py: { xs: 6, sm: 8 } }}>
        {allPosts.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 10 }}>
            <Typography sx={{ fontSize: '3rem', mb: 2 }}>📝</Typography>
            <Typography variant="h5" sx={{ fontWeight: 700, color: '#2E2522', mb: 1 }}>No posts yet</Typography>
            <Typography variant="body2" sx={{ color: '#A89890' }}>Check back soon — new articles will be published here.</Typography>
          </Box>
        ) : (
          <Grid container spacing={3}>
            {allPosts.map(post => {
              const isOpen = expanded === post.slug;
              const wordCount = stripHtml(post.htmlContent).split(/\s+/).filter(Boolean).length;
              const readTime = Math.ceil(wordCount / 200) || 1;
              const categoryColor = CATEGORY_COLORS[post.category] ?? '#5C4F4A';

              return (
                <Grid size={{ xs: 12 }} key={post.slug}>
                  <Paper id={`blog-${post.slug}`} variant="outlined" sx={{ borderRadius: 3, border: '1.5px solid rgba(92,79,74,0.14)', bgcolor: '#FFFFFF', overflow: 'hidden', transition: 'all 0.2s', '&:hover': { borderColor: '#5C4F4A', boxShadow: '0 4px 20px rgba(92,79,74,0.1)' } }}>

                    <Box sx={{ p: { xs: 3, sm: 3.5 } }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2, flexWrap: 'wrap' }}>
                        <Chip label={post.category} size="small" sx={{ fontWeight: 700, bgcolor: `${categoryColor}14`, color: categoryColor, fontSize: '0.72rem', border: `1px solid ${categoryColor}30` }} />
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <CalendarTodayIcon sx={{ fontSize: '0.72rem', color: '#A89890' }} />
                          <Typography variant="caption" sx={{ color: '#A89890' }}>{post.date}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <PersonOutlineIcon sx={{ fontSize: '0.78rem', color: '#A89890' }} />
                          <Typography variant="caption" sx={{ color: '#A89890' }}>{post.author}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <AccessTimeIcon sx={{ fontSize: '0.72rem', color: '#A89890' }} />
                          <Typography variant="caption" sx={{ color: '#A89890' }}>{readTime} min read</Typography>
                        </Box>
                      </Box>

                      <Typography variant="h2" component="h2" sx={{ fontFamily: '"Playfair Display", Georgia, serif', fontSize: { xs: '1.3rem', sm: '1.6rem' }, color: '#2E2522', mb: 1.5, lineHeight: 1.3 }}>
                        {post.title}
                      </Typography>

                      <Typography variant="body2" sx={{ color: '#6B5F59', lineHeight: 1.7, mb: 2.5 }}>
                        {post.excerpt}
                      </Typography>

                      <Button
                        variant={isOpen ? 'contained' : 'outlined'}
                        size="small"
                        onClick={() => setExpanded(isOpen ? null : post.slug)}
                        endIcon={isOpen ? <ExpandLessIcon sx={{ fontSize: '1rem !important' }} /> : <ExpandMoreIcon sx={{ fontSize: '1rem !important' }} />}
                        sx={{ fontWeight: 600, fontSize: '0.8rem', borderRadius: 2 }}
                      >
                        {isOpen ? 'Close Article' : 'Read Full Article'}
                      </Button>
                    </Box>

                    <Collapse in={isOpen}>
                      <Divider sx={{ borderColor: 'rgba(92,79,74,0.1)' }} />
                      <Box
                        sx={{
                          p: { xs: 3, sm: 3.5 },
                          pt: 3,
                          overflow: 'hidden',
                          wordBreak: 'break-word',
                          overflowWrap: 'break-word',
                          '& h1': { fontSize: '1.8rem', fontWeight: 700, color: '#2E2522', mt: 0, mb: 1.5, lineHeight: 1.25 },
                          '& h2': { fontSize: '1.35rem', fontWeight: 700, color: '#2E2522', mt: 2.5, mb: 1, lineHeight: 1.3 },
                          '& h3': { fontSize: '1.1rem', fontWeight: 600, color: '#2E2522', mt: 2, mb: 0.75, lineHeight: 1.35 },
                          '& p': { color: '#6B5F59', lineHeight: 1.85, mb: 1.75, fontSize: '0.975rem', maxWidth: '100%' },
                          '& ul, & ol': { color: '#6B5F59', pl: 3, mb: 1.5, maxWidth: '100%', boxSizing: 'border-box' },
                          '& li': { mb: 0.5, lineHeight: 1.7, fontSize: '0.975rem', wordBreak: 'break-word', overflowWrap: 'break-word', whiteSpace: 'normal' },
                          '& strong': { color: '#2E2522', fontWeight: 700 },
                          '& em': { fontStyle: 'italic' },
                          '& u': { textDecoration: 'underline' },
                          '& s': { textDecoration: 'line-through' },
                          '& blockquote': { borderLeft: '3px solid #5C4F4A', pl: 2.5, ml: 0, mr: 0, my: 2, color: '#6B5F59', fontStyle: 'italic', fontSize: '1rem' },
                          '& a': { color: '#5C4F4A', textDecoration: 'underline', wordBreak: 'break-all' },
                          '& pre': { bgcolor: '#F0ECE8', p: 2, borderRadius: 1.5, fontSize: '0.85rem', overflowX: 'auto', maxWidth: '100%', fontFamily: '"JetBrains Mono", monospace', mb: 1.5, boxSizing: 'border-box' },
                          '& code': { bgcolor: '#F0ECE8', px: 0.75, py: 0.25, borderRadius: 0.75, fontSize: '0.85em', fontFamily: '"JetBrains Mono", monospace', color: '#5C4F4A' },
                          '& img': { maxWidth: '100%', height: 'auto', borderRadius: 1 },
                          '& .ql-indent-1': { pl: 4 },
                          '& .ql-indent-2': { pl: 8 },
                          '& .ql-indent-3': { pl: 12 },
                        }}
                        dangerouslySetInnerHTML={{ __html: post.htmlContent }}
                      />
                      <Divider sx={{ mx: { xs: 3, sm: 3.5 }, borderColor: 'rgba(92,79,74,0.1)' }} />
                      <Box sx={{ px: { xs: 3, sm: 3.5 }, py: 2.5, display: 'flex', alignItems: 'center', gap: 1.5, flexWrap: 'wrap' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <PersonOutlineIcon sx={{ fontSize: '0.78rem', color: '#A89890' }} />
                          <Typography variant="caption" sx={{ color: '#A89890' }}>{post.author} · {post.date}</Typography>
                        </Box>
                        <Chip label={post.category} size="small" sx={{ fontWeight: 700, bgcolor: `${categoryColor}14`, color: categoryColor, fontSize: '0.7rem' }} />
                      </Box>
                    </Collapse>

                  </Paper>
                </Grid>
              );
            })}
          </Grid>
        )}
      </Box>
    </>
  );
};

export default BlogListPage;