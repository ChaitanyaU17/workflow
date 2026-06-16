import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../../app/store';
import type { ConsumerSession } from '../../type/type';
import SharePanel from '../../components/admin/SharePanel';
import { formatDate } from '../../utils/helpers';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import LinearProgress from '@mui/material/LinearProgress';
import Collapse from '@mui/material/Collapse';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';

const SessionManager: React.FC = () => {
  const sessions = useSelector((s: RootState) => s.sessions.sessions);
  const workflows = useSelector((s: RootState) => s.workflows.workflows);
  const forms = useSelector((s: RootState) => s.forms.forms);

  const [shareSession, setShareSession] = useState<ConsumerSession | null>(null);
  const [filterStatus, setFilterStatus] = useState<'all' | 'in-progress' | 'completed'>('all');
  const [filterWorkflow, setFilterWorkflow] = useState<string>('all');
  const [expandedSession, setExpandedSession] = useState<string | null>(null);

  const filtered = sessions.filter(s => {
    if (filterStatus !== 'all' && s.status !== filterStatus) return false;
    if (filterWorkflow !== 'all' && s.workflowId !== filterWorkflow) return false;
    return true;
  });

  const getWorkflowName = (id: string) => workflows.find(w => w.id === id)?.name ?? id;

  const getFieldLabel = (workflowId: string, nodeId: string, fieldName: string) => {
    const wf = workflows.find(w => w.id === workflowId);
    const node = wf?.nodes.find(n => n.id === nodeId);
    const formId = node?.data.formSchemaId as string | undefined;
    const form = forms.find(f => f.id === formId);
    return form?.fields.find(f => f.name === fieldName)?.label ?? fieldName;
  };

  if (shareSession) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <Box sx={{ p: 1.5, borderBottom: 1, borderColor: 'divider' }}>
          <Button variant="outlined" size="small" onClick={() => setShareSession(null)} sx={{ fontWeight: 600 }}>← Back</Button>
        </Box>
        <SharePanel session={shareSession} onClose={() => setShareSession(null)} />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Box>
        <Typography variant="h4" sx={{ fontWeight: 700 }}>Consumer Sessions</Typography>
        <Typography variant="body2" color="text.secondary">View and manage all onboarding sessions</Typography>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
        <TextField
          select
          label="Status"
          value={filterStatus}
          onChange={e => setFilterStatus(e.target.value as typeof filterStatus)}
          size="small"
          sx={{ minWidth: 140 }}
        >
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="in-progress">In Progress</MenuItem>
          <MenuItem value="completed">Completed</MenuItem>
        </TextField>

        <TextField
          select
          label="Workflow"
          value={filterWorkflow}
          onChange={e => setFilterWorkflow(e.target.value)}
          size="small"
          sx={{ minWidth: 180 }}
        >
          <MenuItem value="all">All Workflows</MenuItem>
          {workflows.map(w => <MenuItem key={w.id} value={w.id}>{w.name}</MenuItem>)}
        </TextField>

        <Chip label={`${filtered.length} session${filtered.length !== 1 ? 's' : ''}`} variant="outlined" size="small" />
      </Box>

      {filtered.length === 0 ? (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', py: 8, gap: 1 }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>No sessions found</Typography>
          <Typography variant="body2" color="text.secondary">Consumer sessions will appear here once they start onboarding.</Typography>
        </Box>
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          {filtered.map(session => {
            const isExpanded = expandedSession === session.sessionId;
            const wfName = getWorkflowName(session.workflowId);
            const completedCount = session.completedNodeIds.length;
            const wf = workflows.find(w => w.id === session.workflowId);
            const totalSteps = wf?.nodes.filter(n => n.data.nodeType === 'step').length ?? 0;
            const progress = totalSteps > 0 ? Math.round((completedCount / totalSteps) * 100) : 0;
            const isCompleted = session.status === 'completed';

            return (
              <Paper key={session.sessionId} variant="outlined" id={`session-${session.sessionId}`} sx={{ borderRadius: 2, overflow: 'hidden', borderColor: isExpanded ? 'primary.main' : 'divider' }}>
                <Box
                  onClick={() => setExpandedSession(isExpanded ? null : session.sessionId)}
                  sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 2, cursor: 'pointer', flexWrap: 'wrap', '&:hover': { bgcolor: 'action.hover' } }}
                >
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, flex: 1, minWidth: 200 }}>
                    <Chip
                      label={isCompleted ? '✓ Completed' : '⏳ In Progress'}
                      size="small"
                      color={isCompleted ? 'success' : 'warning'}
                      sx={{ alignSelf: 'flex-start', fontWeight: 600 }}
                    />
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, flexWrap: 'wrap' }}>
                      <Typography variant="body2" sx={{ fontWeight: 700, fontFamily: 'monospace' }}>
                        {session.consumerId.slice(0, 16)}…
                      </Typography>
                      <Typography variant="caption" color="text.secondary">· {wfName} · {formatDate(session.createdAt)}</Typography>
                    </Box>
                  </Box>

                  <Box sx={{ flex: 1, minWidth: 160 }}>
                    <LinearProgress variant="determinate" value={progress} sx={{ height: 6, borderRadius: 3, mb: 0.5 }} />
                    <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500 }}>
                      {progress}% ({completedCount}/{totalSteps})
                    </Typography>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {isCompleted && (
                      <Button
                        variant="contained"
                        size="small"
                        id={`share-session-${session.sessionId}`}
                        onClick={e => { e.stopPropagation(); setShareSession(session); }}
                        sx={{ fontWeight: 600 }}
                      >
                        🔗 Share
                      </Button>
                    )}
                    <IconButton size="small">{isExpanded ? '▲' : '▼'}</IconButton>
                  </Box>
                </Box>

                <Collapse in={isExpanded}>
                  <Divider />
                  <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {Object.entries(session.valuesByNodeId).map(([nodeId, values]) => {
                      const wf2 = workflows.find(w => w.id === session.workflowId);
                      const node = wf2?.nodes.find(n => n.id === nodeId);
                      if (!node) return null;
                      return (
                        <Box key={nodeId}>
                          <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>
                            {node.data.label as string}
                          </Typography>
                          <Grid container spacing={1}>
                            {Object.entries(values).map(([key, val]) => (
                              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={key}>
                                <Paper variant="outlined" sx={{ p: 1, borderRadius: 1 }}>
                                  <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600, display: 'block' }}>
                                    {getFieldLabel(session.workflowId, nodeId, key)}
                                  </Typography>
                                  <Typography variant="body2" sx={{ fontWeight: 500, wordBreak: 'break-word' }}>
                                    {String(val ?? '—')}
                                  </Typography>
                                </Paper>
                              </Grid>
                            ))}
                          </Grid>
                        </Box>
                      );
                    })}
                  </Box>
                </Collapse>
              </Paper>
            );
          })}
        </Box>
      )}
    </Box>
  );
};

export default SessionManager;