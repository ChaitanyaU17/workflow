import React from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '../../app/store';
import { getStepNodes } from '../../utils/helpers';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';

const OnboardingReview: React.FC = () => {
  const { workflowId } = useParams<{ workflowId: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const sessionId = searchParams.get('session') ?? '';

  const workflow = useSelector((s: RootState) =>
    s.workflows.workflows.find(w => w.id === workflowId)
  );
  const session = useSelector((s: RootState) =>
    s.sessions.sessions.find(s => s.sessionId === sessionId)
  );
  const forms = useSelector((s: RootState) => s.forms.forms);

  if (!workflow || !session) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', gap: 2, p: 3 }}>
        <Typography variant="h2" sx={{ lineHeight: 1 }}>⚠️</Typography>
        <Typography variant="h5" sx={{ fontWeight: 700 }}>Session not found</Typography>
        <Button variant="contained" onClick={() => navigate(`/onboarding/${workflowId}`)} sx={{ fontWeight: 600 }}>← Restart</Button>
      </Box>
    );
  }

  const stepNodes = getStepNodes(workflow);

  return (
    <Box sx={{ maxWidth: 720, mx: 'auto', p: 3, display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Box sx={{ textAlign: 'center', py: 2 }}>
        <Typography variant="h2" sx={{ lineHeight: 1, mb: 1 }}>📋</Typography>
        <Typography variant="h4" sx={{ fontWeight: 800, mb: 0.5 }}>Review Your Information</Typography>
        <Typography variant="body1" color="text.secondary">
          Please review all the information you've provided before submitting.
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {stepNodes.map((node, idx) => {
          const formId = node.data.formSchemaId as string | undefined;
          const form = forms.find(f => f.id === formId);
          const nodeValues = session.valuesByNodeId[node.id];
          const isCompleted = session.completedNodeIds.includes(node.id);

          return (
            <Paper key={node.id} variant="outlined" sx={{ borderRadius: 2, overflow: 'hidden' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, px: 2, py: 1.5, bgcolor: 'action.hover', flexWrap: 'wrap' }}>
                <Chip label={`Step ${idx + 1}`} size="small" color="primary" variant="outlined" sx={{ fontWeight: 600 }} />
                <Typography variant="subtitle1" sx={{ fontWeight: 700, flex: 1 }}>{node.data.label as string}</Typography>
                {isCompleted && <Chip label="✓ Completed" size="small" color="success" sx={{ fontWeight: 600 }} />}
              </Box>

              <Divider />

              {form && nodeValues ? (
                <Box sx={{ p: 2 }}>
                  <Grid container spacing={1.5}>
                    {form.fields.map(field => {
                      const rawVal = nodeValues[field.name];
                      const displayVal = field.type === 'checkbox'
                        ? rawVal === true ? 'Yes' : 'No'
                        : String(rawVal ?? '—');
                      return (
                        <Grid size={{ xs: 12, sm: 6 }} key={field.id}>
                          <Paper variant="outlined" sx={{ p: 1.5, borderRadius: 1, height: '100%' }}>
                            <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 1, mb: 0.5 }}>
                              <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>{field.label}</Typography>
                              <Chip label={field.type} size="small" variant="outlined" sx={{ fontSize: '0.6rem', height: 18 }} />
                            </Box>
                            <Typography variant="body2" sx={{ fontWeight: 600, wordBreak: 'break-word' }}>{displayVal}</Typography>
                          </Paper>
                        </Grid>
                      );
                    })}
                  </Grid>
                </Box>
              ) : (
                <Box sx={{ p: 2 }}>
                  <Typography variant="body2" color="text.disabled" sx={{ fontStyle: 'italic' }}>
                    {!nodeValues ? 'Not yet completed' : 'No form data'}
                  </Typography>
                </Box>
              )}
            </Paper>
          );
        })}
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2, pt: 1, flexWrap: 'wrap' }}>
        <Button
          variant="outlined"
          size="large"
          onClick={() => {
            const firstStep = stepNodes[0];
            if (firstStep) navigate(`/onboarding/${workflowId}/step/${firstStep.id}?session=${sessionId}`);
          }}
          sx={{ fontWeight: 600 }}
        >
          ← Edit Responses
        </Button>
        <Button
          id="confirm-submit-btn"
          variant="contained"
          size="large"
          onClick={() => navigate(`/onboarding/${workflowId}/done?session=${sessionId}`)}
          sx={{ fontWeight: 700 }}
        >
          Confirm & Submit
        </Button>
      </Box>
    </Box>
  );
};

export default OnboardingReview;