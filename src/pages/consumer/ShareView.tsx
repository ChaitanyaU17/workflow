import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '../../app/store';
import { formatDate } from '../../utils/helpers';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Alert from '@mui/material/Alert';

const ShareView: React.FC = () => {
  const { token } = useParams<{ token: string }>();

  const shareToken = useSelector((s: RootState) =>
    s.share.tokens.find(t => t.token === token)
  );
  const session = useSelector((s: RootState) =>
    shareToken ? s.sessions.sessions.find(s => s.sessionId === shareToken.sessionId) : undefined
  );
  const workflow = useSelector((s: RootState) =>
    session ? s.workflows.workflows.find(w => w.id === session.workflowId) : undefined
  );
  const forms = useSelector((s: RootState) => s.forms.forms);

  const isExpired = useMemo(() => {
    if (!shareToken) return false;
    return new Date(shareToken.expiresAt) < new Date();
  }, [shareToken]);

  if (!shareToken) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', gap: 2, p: 3, textAlign: 'center' }}>
        <Typography variant="h2" sx={{ lineHeight: 1 }}>🔗</Typography>
        <Typography variant="h5" sx={{ fontWeight: 700 }}>Invalid Link</Typography>
        <Typography variant="body2" color="text.secondary">This share link is invalid or has been revoked.</Typography>
      </Box>
    );
  }

  if (isExpired) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', gap: 2, p: 3, textAlign: 'center' }}>
        <Typography variant="h2" sx={{ lineHeight: 1 }}>⏰</Typography>
        <Typography variant="h5" sx={{ fontWeight: 700 }}>Link Expired</Typography>
        <Typography variant="body2" color="text.secondary">This share link expired on {formatDate(shareToken.expiresAt)}.</Typography>
      </Box>
    );
  }

  if (!session || !workflow) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', gap: 2, p: 3, textAlign: 'center' }}>
        <Typography variant="h2" sx={{ lineHeight: 1 }}>📭</Typography>
        <Typography variant="h5" sx={{ fontWeight: 700 }}>Data not available</Typography>
        <Typography variant="body2" color="text.secondary">The session data could not be found.</Typography>
      </Box>
    );
  }

  const stepNodes = workflow.nodes.filter(n => n.data.nodeType === 'step');
  const allowedFields = shareToken.allowedFields;

  const sections = stepNodes
    .map(node => {
      const formId = node.data.formSchemaId as string | undefined;
      const form = forms.find(f => f.id === formId);
      const nodeValues = session.valuesByNodeId[node.id];
      const allowed = allowedFields[node.id] ?? [];
      if (!form || !nodeValues || allowed.length === 0) return null;
      const fields = form.fields.filter(f => allowed.includes(f.name));
      if (fields.length === 0) return null;
      return { node, form, fields, nodeValues };
    })
    .filter(Boolean);

  const totalFields = sections.reduce((acc, s) => acc + (s?.fields.length ?? 0), 0);

  return (
    <Box sx={{ maxWidth: 760, mx: 'auto', p: 3, display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Paper variant="outlined" sx={{ borderRadius: 2, p: 2.5, display: 'flex', alignItems: 'flex-start', gap: 2 }}>
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 800, mb: 0.5 }}>Shared Onboarding Data</Typography>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', alignItems: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              From workflow: <Box component="strong" sx={{ color: 'text.primary', fontWeight: 700 }}>{workflow.name}</Box>
            </Typography>
            <Chip label={`${totalFields} field${totalFields !== 1 ? 's' : ''} shared`} size="small" color="primary" variant="outlined" sx={{ fontWeight: 600 }} />
            <Typography variant="caption" color="text.secondary">Expires {formatDate(shareToken.expiresAt)}</Typography>
          </Box>
        </Box>
      </Paper>

      <Alert severity="info" sx={{ fontWeight: 500 }}>
        This data was selectively shared by the workflow administrator. Only approved fields are visible.
      </Alert>

      {sections.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 6 }}>
          <Typography variant="body1" color="text.secondary">No shared fields available.</Typography>
        </Box>
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {sections.map(sec => {
            if (!sec) return null;
            const { node, fields, nodeValues } = sec;
            return (
              <Paper key={node.id} variant="outlined" sx={{ borderRadius: 2, overflow: 'hidden' }}>
                <Box sx={{ px: 2, py: 1.5, bgcolor: 'action.hover' }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>{node.data.label as string}</Typography>
                </Box>
                <Divider />
                <Box sx={{ p: 2 }}>
                  <Grid container spacing={1.5}>
                    {fields.map(field => {
                      const rawVal = nodeValues[field.name];
                      const displayVal = field.type === 'checkbox'
                        ? rawVal === true ? '✓ Yes' : '✗ No'
                        : String(rawVal ?? '—');
                      return (
                        <Grid size={{ xs: 12, sm: 6 }} key={field.id}>
                          <Paper variant="outlined" sx={{ p: 1.5, borderRadius: 1 }}>
                            <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600, display: 'block', mb: 0.5 }}>{field.label}</Typography>
                            <Typography variant="body2" sx={{ fontWeight: 600, wordBreak: 'break-word' }}>{displayVal}</Typography>
                          </Paper>
                        </Grid>
                      );
                    })}
                  </Grid>
                </Box>
              </Paper>
            );
          })}
        </Box>
      )}
    </Box>
  );
};

export default ShareView;