import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import type { RootState } from '../../app/store';
import { addBlog, updateBlog, deleteBlog, type BlogPost } from '../../features/store/blogSlice';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import Alert from '@mui/material/Alert';
import MenuItem from '@mui/material/MenuItem';

const CATEGORIES = [
  'Workflow Design',
  'Automation',
  'Form Design',
  'Security',
  'Strategy',
  'Enterprise',
  'Digital Transformation',
];

const QUILL_MODULES = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ color: [] }, { background: [] }],
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ indent: '-1' }, { indent: '+1' }],
    ['blockquote', 'code-block'],
    ['link'],
    ['clean'],
  ],
};

const QUILL_FORMATS = [
  'header',
  'bold', 'italic', 'underline', 'strike',
  'color', 'background',
  'list', 'indent',
  'blockquote', 'code-block',
  'link',
];

function generateBlogId(): string {
  return `blog-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

function slugify(title: string): string {
  return title.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-');
}

function stripHtml(html: string): string {
  if (typeof html !== 'string') return '';
  return html.replace(/<[^>]*>/g, '').trim();
}

interface BlogFormState {
  title: string;
  author: string;
  category: string;
  excerpt: string;
  content: string;
}

interface FormErrors {
  title?: string;
  author?: string;
  excerpt?: string;
  content?: string;
}

const emptyForm = (): BlogFormState => ({
  title: '',
  author: 'Workflow X Team',
  category: CATEGORIES[0],
  excerpt: '',
  content: '',
});

const BlogManager: React.FC = () => {
  const dispatch = useDispatch();
  const blogs = useSelector((s: RootState) => s.blogs.blogs);

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<BlogFormState>(emptyForm());
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errors, setErrors] = useState<FormErrors>({});

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!form.title.trim()) newErrors.title = 'Title is required';
    if (!form.author.trim()) newErrors.author = 'Author is required';
    if (!form.excerpt.trim()) newErrors.excerpt = 'Excerpt is required';
    if (!stripHtml(form.content)) newErrors.content = 'Content is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleOpenCreate = () => {
    setEditingId(null);
    setForm(emptyForm());
    setErrors({});
    setShowForm(true);
  };

  const handleOpenEdit = (blog: BlogPost) => {
    setEditingId(blog.id);
    setForm({ title: blog.title, author: blog.author, category: blog.category, excerpt: blog.excerpt, content: blog.content });
    setErrors({});
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingId(null);
    setForm(emptyForm());
    setErrors({});
  };

  const handleSave = () => {
    if (!validate()) return;
    const now = new Date().toISOString();
    const dateStr = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

    if (editingId) {
      const existing = blogs.find(b => b.id === editingId);
      if (!existing) return;
      dispatch(updateBlog({ ...existing, title: form.title.trim(), slug: slugify(form.title.trim()), author: form.author.trim(), category: form.category, excerpt: form.excerpt.trim(), content: form.content, updatedAt: now }));
      setSuccessMsg('Blog post updated successfully.');
    } else {
      dispatch(addBlog({ id: generateBlogId(), slug: slugify(form.title.trim()), title: form.title.trim(), author: form.author.trim(), category: form.category, excerpt: form.excerpt.trim(), content: form.content, date: dateStr, createdAt: now, updatedAt: now, createdBy: 'superadmin' }));
      setSuccessMsg('Blog post created and published to the Blog page.');
    }

    setTimeout(() => setSuccessMsg(null), 3500);
    handleCancel();
  };

  const handleDelete = (id: string) => {
    if (deleteConfirmId === id) {
      dispatch(deleteBlog(id));
      setDeleteConfirmId(null);
    } else {
      setDeleteConfirmId(id);
      setTimeout(() => setDeleteConfirmId(null), 3000);
    }
  };

  const wordCount = stripHtml(form.content).split(/\s+/).filter(Boolean).length;

  const contentSx = {
    overflow: 'hidden',
    wordBreak: 'break-word',
    overflowWrap: 'break-word',
    '& h1': { fontSize: '1.5rem', fontWeight: 700, color: '#2E2522', mt: 0, mb: 1, lineHeight: 1.25 },
    '& h2': { fontSize: '1.2rem', fontWeight: 700, color: '#2E2522', mt: 1.5, mb: 0.75, lineHeight: 1.3 },
    '& h3': { fontSize: '1rem', fontWeight: 600, color: '#2E2522', mt: 1, mb: 0.5, lineHeight: 1.35 },
    '& p': { color: '#6B5F59', lineHeight: 1.75, mb: 1.25, fontSize: '0.875rem', maxWidth: '100%' },
    '& ul, & ol': { color: '#6B5F59', pl: 2.5, mb: 1, maxWidth: '100%', boxSizing: 'border-box' },
    '& li': { mb: 0.4, lineHeight: 1.65, fontSize: '0.875rem', wordBreak: 'break-word', overflowWrap: 'break-word', whiteSpace: 'normal' },
    '& strong': { color: '#2E2522', fontWeight: 700 },
    '& em': { fontStyle: 'italic' },
    '& u': { textDecoration: 'underline' },
    '& s': { textDecoration: 'line-through' },
    '& blockquote': { borderLeft: '3px solid #5C4F4A', pl: 2, ml: 0, mr: 0, my: 1.5, color: '#6B5F59', fontStyle: 'italic', fontSize: '0.875rem' },
    '& a': { color: '#5C4F4A', textDecoration: 'underline', wordBreak: 'break-all' },
    '& pre': { bgcolor: '#F0ECE8', p: 1.5, borderRadius: 1, fontSize: '0.78rem', overflowX: 'auto', maxWidth: '100%', fontFamily: '"JetBrains Mono", monospace', mb: 1, boxSizing: 'border-box' },
    '& code': { bgcolor: '#F0ECE8', px: 0.5, py: 0.2, borderRadius: 0.5, fontSize: '0.8em', fontFamily: '"JetBrains Mono", monospace', color: '#5C4F4A' },
    '& img': { maxWidth: '100%', height: 'auto', borderRadius: 1 },
    '& .ql-indent-1': { pl: 4 },
    '& .ql-indent-2': { pl: 8 },
    '& .ql-indent-3': { pl: 12 },
  };

  return (
    <Box sx={{ p: { xs: 2, sm: 3 }, display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 800, color: '#2E2522' }}>Blog Manager</Typography>
          <Typography variant="body2" sx={{ color: '#A89890', mt: 0.25 }}>Create and manage blog posts published posts appear on the public Blog page.</Typography>
        </Box>
        {!showForm && (
          <Button variant="contained" onClick={handleOpenCreate} sx={{ fontWeight: 700, borderRadius: 2 }}>New Post</Button>
        )}
      </Box>

      {successMsg && (
        <Alert severity="success" onClose={() => setSuccessMsg(null)} sx={{ borderRadius: 2 }}>{successMsg}</Alert>
      )}

      {showForm && (
        <Paper variant="outlined" sx={{ borderRadius: 3, border: '1.5px solid rgba(92,79,74,0.25)', overflow: 'hidden', bgcolor: '#FFFFFF' }}>

          <Box sx={{ px: 2.5, py: 2, bgcolor: '#F7F4F1', borderBottom: '1.5px solid rgba(92,79,74,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#2E2522' }}>{editingId ? 'Edit Blog Post' : 'New Blog Post'}</Typography>
            <IconButton size="small" onClick={handleCancel} sx={{ color: '#A89890' }}>✕</IconButton>
          </Box>

          <Box sx={{ p: { xs: 2, sm: 3 }, display: 'flex', flexDirection: 'column', gap: 2.5 }}>
            <TextField label="Post Title *" value={form.title} onChange={e => setForm(prev => ({ ...prev, title: e.target.value }))} fullWidth size="small" error={Boolean(errors.title)} helperText={errors.title ?? 'A clear, descriptive headline for the blog post'} placeholder="e.g. How to Design Effective Onboarding Workflows" />

            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
              <TextField label="Author *" value={form.author} onChange={e => setForm(prev => ({ ...prev, author: e.target.value }))} fullWidth size="small" error={Boolean(errors.author)} helperText={errors.author ?? 'Display name shown on the post'} placeholder="e.g. Workflow X Team" />
              <TextField select label="Category *" value={form.category} onChange={e => setForm(prev => ({ ...prev, category: e.target.value }))} fullWidth size="small" helperText="Choose the most relevant category">
                {CATEGORIES.map(cat => (<MenuItem key={cat} value={cat}>{cat}</MenuItem>))}
              </TextField>
            </Box>

            <TextField label="Excerpt *" value={form.excerpt} onChange={e => setForm(prev => ({ ...prev, excerpt: e.target.value }))} fullWidth size="small" multiline minRows={2} error={Boolean(errors.excerpt)} helperText={errors.excerpt ?? 'A short summary shown in the blog listing (1–2 sentences)'} placeholder="A brief, compelling description of what this post covers…" />

            <Divider sx={{ borderColor: 'rgba(92,79,74,0.1)' }} />

            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="caption" sx={{ fontWeight: 700, color: errors.content ? '#C0392B' : '#A89890', textTransform: 'uppercase', letterSpacing: 0.8 }}>
                  {errors.content ? `Content — ${errors.content}` : 'Content *'}
                </Typography>
                <Typography variant="caption" sx={{ color: '#A89890' }}>{wordCount} word{wordCount !== 1 ? 's' : ''}</Typography>
              </Box>

              <Box sx={{ border: '1.5px solid', borderColor: errors.content ? '#C0392B' : 'rgba(92,79,74,0.25)', borderRadius: 2, overflow: 'hidden', '& .ql-toolbar': { bgcolor: '#F7F4F1', borderColor: 'rgba(92,79,74,0.18) !important', borderTop: 'none !important', borderLeft: 'none !important', borderRight: 'none !important', borderBottom: '1.5px solid rgba(92,79,74,0.18) !important', fontFamily: '"Inter", sans-serif' }, '& .ql-container': { borderColor: 'transparent !important', fontFamily: '"Inter", sans-serif', fontSize: '0.9rem', minHeight: 280 }, '& .ql-editor': { minHeight: 280, color: '#2E2522', lineHeight: 1.75, '&.ql-blank::before': { color: '#A89890', fontStyle: 'normal' } }, '& .ql-toolbar .ql-stroke': { stroke: '#5C4F4A' }, '& .ql-toolbar .ql-fill': { fill: '#5C4F4A' }, '& .ql-toolbar .ql-picker': { color: '#5C4F4A' }, '& .ql-toolbar button:hover .ql-stroke': { stroke: '#2E2522' }, '& .ql-toolbar button.ql-active .ql-stroke': { stroke: '#5C4F4A' } }}>
                <ReactQuill theme="snow" value={form.content} onChange={val => setForm(prev => ({ ...prev, content: val }))} modules={QUILL_MODULES} formats={QUILL_FORMATS} placeholder="Write your blog content here. Use the toolbar above to format text, add headings, lists, and links…" />
              </Box>
              <Typography variant="caption" sx={{ color: '#A89890', mt: 0.75, display: 'block' }}>Use headings, bullet lists, bold/italic, and links to structure your content.</Typography>
            </Box>

            <Box sx={{ bgcolor: '#F7F4F1', borderRadius: 2, border: '1px solid rgba(92,79,74,0.12)', overflow: 'hidden' }}>
              <Box sx={{ px: 2, py: 1.25, borderBottom: '1px solid rgba(92,79,74,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography variant="caption" sx={{ fontWeight: 700, color: '#A89890', textTransform: 'uppercase', letterSpacing: 0.8 }}>Post Preview</Typography>
                {wordCount > 0 && <Typography variant="caption" sx={{ color: '#A89890' }}>~{Math.ceil(wordCount / 200)} min read</Typography>}
              </Box>

              <Box sx={{ p: 2 }}>
                <Typography variant="body2" sx={{ fontWeight: 700, color: '#2E2522', mb: 0.75 }}>{form.title || 'Post Title'}</Typography>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', alignItems: 'center', mb: 1 }}>
                  <Chip label={form.category} size="small" sx={{ fontWeight: 600, bgcolor: 'rgba(92,79,74,0.1)', color: '#5C4F4A', fontSize: '0.7rem', height: 20 }} />
                  <Typography variant="caption" sx={{ color: '#A89890' }}>{form.author}</Typography>
                </Box>
                <Typography variant="caption" sx={{ color: '#6B5F59', lineHeight: 1.6, display: 'block', mb: 1.25 }}>{form.excerpt || 'Excerpt will appear here…'}</Typography>

                {stripHtml(form.content) && (
                  <>
                    <Divider sx={{ borderColor: 'rgba(92,79,74,0.1)', mb: 1.25 }} />
                    <Box
                      sx={{ ...contentSx, maxHeight: 320, overflowY: 'auto', overflowX: 'hidden' }}
                      dangerouslySetInnerHTML={{ __html: form.content }}
                    />
                  </>
                )}
              </Box>
            </Box>
          </Box>

          <Box sx={{ px: 2.5, py: 2, bgcolor: '#F7F4F1', borderTop: '1.5px solid rgba(92,79,74,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 1, flexWrap: 'wrap' }}>
            <Typography variant="caption" sx={{ color: '#A89890' }}>{wordCount} word{wordCount !== 1 ? 's' : ''} · ~{Math.ceil(wordCount / 200) || 0} min read</Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button variant="outlined" onClick={handleCancel} sx={{ fontWeight: 600 }}>Cancel</Button>
              <Button variant="contained" onClick={handleSave} sx={{ fontWeight: 700 }}>{editingId ? 'Update Post' : 'Publish Post'}</Button>
            </Box>
          </Box>
        </Paper>
      )}

      {blogs.length === 0 && !showForm ? (
        <Paper variant="outlined" sx={{ borderRadius: 2.5, p: 5, textAlign: 'center', bgcolor: '#FFFFFF', border: '1.5px solid rgba(92,79,74,0.14)' }}>
          <Typography variant="h6" sx={{ fontWeight: 600, color: '#2E2522', mb: 0.5 }}>No blog posts yet</Typography>
          <Typography variant="body2" sx={{ color: '#A89890', mb: 2.5 }}>Create your first blog post to have it published on the public Blog page.</Typography>
        </Paper>
      ) : (
        !showForm && (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            {blogs.map(blog => {
              const isExpanded = expandedId === blog.id;
              const blogWordCount = stripHtml(blog.content).split(/\s+/).filter(Boolean).length;
              const readTime = Math.ceil(blogWordCount / 200) || 1;

              return (
                <Paper key={blog.id} variant="outlined" sx={{ borderRadius: 2.5, bgcolor: '#FFFFFF', border: '1.5px solid', borderColor: isExpanded ? '#5C4F4A' : 'rgba(92,79,74,0.18)', overflow: 'hidden', transition: 'border-color 0.15s' }}>

                  <Box onClick={() => setExpandedId(isExpanded ? null : blog.id)} sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 2, cursor: 'pointer', flexWrap: 'wrap', '&:hover': { bgcolor: '#F7F4F1' } }}>
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5, flexWrap: 'wrap' }}>
                        <Chip label={blog.category} size="small" sx={{ fontWeight: 600, bgcolor: 'rgba(92,79,74,0.08)', color: '#5C4F4A', fontSize: '0.65rem', height: 20 }} />
                        <Typography variant="caption" sx={{ color: '#A89890' }}>{blog.date} · {blog.author} · {readTime} min read</Typography>
                      </Box>
                      <Typography variant="body1" sx={{ fontWeight: 700, color: '#2E2522', lineHeight: 1.3 }} noWrap>{blog.title}</Typography>
                      <Typography variant="caption" sx={{ color: '#6B5F59', display: 'block', mt: 0.25 }} noWrap>{blog.excerpt}</Typography>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexShrink: 0 }}>
                      <Chip label={`${blogWordCount} words`} size="small" variant="outlined" sx={{ fontSize: '0.65rem', height: 20 }} />
                      <Button size="small" variant="outlined" onClick={e => { e.stopPropagation(); handleOpenEdit(blog); }} sx={{ fontWeight: 600, fontSize: '0.75rem' }}>Edit</Button>
                      <Button size="small" variant={deleteConfirmId === blog.id ? 'contained' : 'outlined'} color="error" onClick={e => { e.stopPropagation(); handleDelete(blog.id); }} sx={{ fontWeight: 600, fontSize: '0.75rem' }}>
                        {deleteConfirmId === blog.id ? '⚠ Confirm?' : '🗑'}
                      </Button>
                      <Typography sx={{ color: '#A89890', fontSize: '0.75rem' }}>{isExpanded ? '▲' : '▼'}</Typography>
                    </Box>
                  </Box>

                  <Collapse in={isExpanded}>
                    <Divider sx={{ borderColor: 'rgba(92,79,74,0.1)' }} />
                    <Box sx={{ p: 2, bgcolor: '#F7F4F1' }}>
                      <Typography variant="caption" sx={{ fontWeight: 700, color: '#A89890', textTransform: 'uppercase', letterSpacing: 0.8, display: 'block', mb: 1.5 }}>Content Preview</Typography>
                      <Box sx={{ bgcolor: '#FFFFFF', borderRadius: 2, p: 2, border: '1px solid rgba(92,79,74,0.12)', maxHeight: 400, overflowY: 'auto', overflowX: 'hidden', ...contentSx }} dangerouslySetInnerHTML={{ __html: blog.content }} />
                    </Box>
                  </Collapse>

                </Paper>
              );
            })}
          </Box>
        )
      )}
    </Box>
  );
};

export default BlogManager;