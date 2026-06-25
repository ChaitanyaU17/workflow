import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import type { RootState } from '../../app/store';
import type { Workflow } from '../../type/type';
import { addWorkflow, deleteWorkflow, duplicateWorkflow, publishWorkflow } from '../../features/store/workflowsSlice';
import { generateId, buildOnboardingUrl, copyToClipboard, formatDate } from '../../utils/helpers';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import InputAdornment from '@mui/material/InputAdornment';

const WorkflowList: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const currentUser = useSelector((s: RootState) => s.auth.currentUser);
  const allWorkflows = useSelector((s: RootState) => s.workflows.workflows);

  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const workflows = currentUser?.role === 'superadmin'
  ? allWorkflows
  : allWorkflows.filter(w => w.createdBy === currentUser?.adminId);

  const filtered = workflows.filter(w =>
    w.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreate = () => {
    const id = generateId('wf');
    const now = new Date().toISOString();
    const newWf: Workflow = {
      id,
      name: 'Untitled Workflow',
      status: 'draft',
      createdBy: currentUser?.adminId ?? currentUser?.id ?? 'unknown',
      nodes: [
        { id: 'n-start', type: 'default', position: { x: 50, y: 150 }, data: { label: 'Start', nodeType: 'start' } },
        { id: 'n-end',   type: 'default', position: { x: 400, y: 150 }, data: { label: 'End',   nodeType: 'end'   } },
      ],
      edges: [{ id: 'e-start-end', source: 'n-start', target: 'n-end' }],
      createdAt: now,
      updatedAt: now,
    };
    dispatch(addWorkflow(newWf));
    navigate(`/admin/designer/${id}`);
  };

  const handleDuplicate = (wf: Workflow) => {
    dispatch(duplicateWorkflow({
      workflowId: wf.id,
      createdBy: currentUser?.adminId ?? currentUser?.id ?? 'unknown',
    }));
  };

  const handleCopyLink = (wf: Workflow) => {
    copyToClipboard(buildOnboardingUrl(wf.id));
    setCopiedId(wf.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDelete = (id: string) => {
    if (deleteConfirm === id) {
      dispatch(deleteWorkflow(id));
      setDeleteConfirm(null);
    } else {
      setDeleteConfirm(id);
      setTimeout(() => setDeleteConfirm(null), 3000);
    }
  };

  return (
    <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700 }}>Workflows</Typography>
          <Typography variant="body2" color="text.secondary">Design and manage consumer onboarding journeys</Typography>
        </Box>
        <Button id="create-workflow-btn" variant="contained" size="large" onClick={handleCreate} sx={{ fontWeight: 700 }}>
          New Workflow
        </Button>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
        <TextField
          id="workflow-search"
          placeholder="Search workflows…"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          size="small"
          sx={{ minWidth: 240 }}
          slotProps={{ input: { startAdornment: <InputAdornment position="start"></InputAdornment> } }}
        />
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          <Chip label={`${workflows.length} total`} variant="outlined" size="small" />
          <Chip label={`${workflows.filter(w => w.status === 'published').length} published`} color="success" variant="outlined" size="small" />
          <Chip label={`${workflows.filter(w => w.status === 'draft').length} drafts`} color="warning" variant="outlined" size="small" />
        </Box>
      </Box>

      {filtered.length === 0 ? (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', py: 10, gap: 1.5 }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>No workflows found</Typography>
          <Typography variant="body2" color="text.secondary">
            {searchQuery ? 'Try a different search.' : 'Create your first workflow to get started.'}
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={2}>
          {filtered.map(wf => (
            <Grid size={{ xs: 12, sm: 6, lg: 4 }} key={wf.id}>
              <Paper
                id={`wf-card-${wf.id}`}
                variant="outlined"
                sx={{ borderRadius: 2, overflow: 'hidden', display: 'flex', flexDirection: 'column', height: '100%', transition: 'box-shadow 0.2s', '&:hover': { boxShadow: 3 } }}
              >
                <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 1, flex: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 1 }}>
                    <Chip
                      label={wf.status === 'published' ? '● Published' : '○ Draft'}
                      size="small"
                      color={wf.status === 'published' ? 'success' : 'default'}
                      sx={{ fontWeight: 600 }}
                    />
                    <Typography variant="caption" color="text.secondary">{formatDate(wf.updatedAt)}</Typography>
                  </Box>

                  <Typography variant="h6" sx={{ fontWeight: 700, lineHeight: 1.3 }}>{wf.name}</Typography>

                  <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
                    <Typography variant="caption" color="text.secondary">🔵 {wf.nodes.length} nodes</Typography>
                    <Typography variant="caption" color="text.secondary">↔ {wf.edges.length} connections</Typography>
                    <Typography variant="caption" color="text.secondary">steps</Typography>
                  </Box>
                </Box>

                <Divider />

                <Box sx={{ p: 1.5, display: 'flex', gap: 1, flexWrap: 'wrap', alignItems: 'center' }}>
                  <Button
                    id={`edit-wf-${wf.id}`}
                    variant="contained"
                    size="small"
                    onClick={() => navigate(`/admin/designer/${wf.id}`)}
                    sx={{ fontWeight: 600 }}
                  >
                    ✏ Design
                  </Button>

                  <Button
                    id={`dup-wf-${wf.id}`}
                    variant="outlined"
                    size="small"
                    onClick={() => handleDuplicate(wf)}
                    sx={{ fontWeight: 600 }}
                  >
                    ⧉ Duplicate
                  </Button>

                  {wf.status === 'draft' && (
                    <Button
                      id={`pub-wf-${wf.id}`}
                      variant="outlined"
                      color="success"
                      size="small"
                      onClick={() => dispatch(publishWorkflow(wf.id))}
                      sx={{ fontWeight: 600 }}
                    >
                      ▶ Publish
                    </Button>
                  )}

                  {wf.status === 'published' && (
                    <Button
                      id={`copy-link-wf-${wf.id}`}
                      variant={copiedId === wf.id ? 'contained' : 'outlined'}
                      color={copiedId === wf.id ? 'success' : 'primary'}
                      size="small"
                      onClick={() => handleCopyLink(wf)}
                      sx={{ fontWeight: 600 }}
                    >
                      {copiedId === wf.id ? '✓ Copied!' : '🔗 Copy Link'}
                    </Button>
                  )}

                  <Button
                    id={`del-wf-${wf.id}`}
                    variant={deleteConfirm === wf.id ? 'contained' : 'outlined'}
                    color="error"
                    size="small"
                    onClick={() => handleDelete(wf.id)}
                    sx={{ fontWeight: 600, ml: 'auto' }}
                  >
                    {deleteConfirm === wf.id ? '⚠ Confirm?' : '🗑'}
                  </Button>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default WorkflowList;