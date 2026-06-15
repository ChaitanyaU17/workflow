import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../app/store';
import { upsertSession } from '../../features/store/sessionsSlice';
import { generateId, getStartNode, getStepNodes } from '../../utils/helpers';
import WorkflowPreview from '../../components/consumer/WorkflowPreview';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Alert from '@mui/material/Alert';
import LinearProgress from '@mui/material/LinearProgress';

const OnboardingEntry: React.FC = () => {
  const { workflowId } = useParams<{ workflowId: string }>();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const workflow = useSelector((s: RootState) =>
    s.workflows.workflows.find(w => w.id === workflowId)
  );
  const existingSession = useSelector((s: RootState) =>
    s.sessions.sessions.find(
      sess => sess.workflowId === workflowId && sess.status === 'in-progress'
    )
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!workflow) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', gap: 2, p: 3, bgcolor: '#F7F4F1' }}>
        <Typography variant="h2" sx={{ lineHeight: 1 }}>⚠️</Typography>
        <Typography variant="h5" sx={{ fontWeight: 700, color: '#2E2522' }}>Workflow not found</Typography>
        <Typography variant="body2" sx={{ color: '#A89890' }}>This onboarding link may be invalid or expired.</Typography>
      </Box>
    );
  }

  if (workflow.status !== 'published') {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', gap: 2, p: 3, bgcolor: '#F7F4F1' }}>
        <Typography variant="h2" sx={{ lineHeight: 1 }}>🔒</Typography>
        <Typography variant="h5" sx={{ fontWeight: 700, color: '#2E2522' }}>Not yet available</Typography>
        <Typography variant="body2" sx={{ color: '#A89890' }}>This onboarding workflow hasn't been published yet.</Typography>
      </Box>
    );
  }

  const stepNodes = getStepNodes(workflow);
  const startNode = getStartNode(workflow);

  const resumeProgress = existingSession
    ? Math.round((existingSession.completedNodeIds.filter(id => stepNodes.some(n => n.id === id)).length / Math.max(stepNodes.length, 1)) * 100)
    : 0;

  const handleBegin = () => {
    if (existingSession) {
      navigate(`/onboarding/${workflowId}/step/${existingSession.currentNodeId}?session=${existingSession.sessionId}`);
      return;
    }

    const firstStepNode = stepNodes[0];
    if (!firstStepNode) {
      console.error('No step nodes found in workflow');
      return;
    }

    const sessionId = generateId('sess');
    const consumerId = generateId('con');
    const now = new Date().toISOString();

    const newSession = {
      sessionId,
      workflowId: workflow.id,
      consumerId,
      currentNodeId: firstStepNode.id,
      completedNodeIds: startNode ? [startNode.id] : [],
      valuesByNodeId: {},
      status: 'in-progress' as const,
      createdAt: now,
      updatedAt: now,
    };

    dispatch(upsertSession(newSession));
    navigate(`/onboarding/${workflowId}/step/${firstStepNode.id}?session=${sessionId}`);
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#F7F4F1' }}>
      <Box sx={{ maxWidth: 680, mx: 'auto', px: { xs: 2, sm: 3 }, py: { xs: 4, sm: 6 }, display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Box sx={{ textAlign: 'center', py: 2 }}>
          <Chip label="Consumer Onboarding" color="primary" size="small" sx={{ fontWeight: 600, mb: 2 }} />
          <Typography variant="h3" sx={{ fontWeight: 800, color: '#2E2522', mb: 1.5, fontSize: { xs: '1.8rem', sm: '2.2rem' } }}>
            {workflow.name}
          </Typography>
          <Typography variant="body1" sx={{ color: '#6B5F59', maxWidth: 480, mx: 'auto' }}>
            Complete your registration in{' '}
            <Box component="strong" sx={{ color: '#5C4F4A' }}>{stepNodes.length} step{stepNodes.length !== 1 ? 's' : ''}</Box>.
            Your progress is automatically saved.
          </Typography>
        </Box>

        {existingSession && (
          <Alert
            severity="warning"
            sx={{ borderRadius: 2, fontWeight: 500 }}
          >
            <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5 }}>Session in progress</Typography>
            <LinearProgress variant="determinate" value={resumeProgress} sx={{ height: 6, borderRadius: 3, mb: 0.5 }} />
            <Typography variant="caption" sx={{ color: '#6B5F59' }}>{resumeProgress}% completed — resume where you left off</Typography>
          </Alert>
        )}

        <Paper variant="outlined" sx={{ borderRadius: 3, overflow: 'hidden', bgcolor: '#FFFFFF' }}>
          <Box sx={{ px: 2.5, py: 2, bgcolor: '#F7F4F1', borderBottom: '1px solid rgba(92,79,74,0.12)' }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#2E2522' }}>What you'll complete</Typography>
          </Box>
          <Box>
            {stepNodes.map((node, idx) => {
              const isCompleted = existingSession?.completedNodeIds.includes(node.id) ?? false;
              const isCurrent = existingSession?.currentNodeId === node.id;
              return (
                <Box key={node.id}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, px: 2.5, py: 1.75 }}>
                    <Box sx={{ width: 36, height: 36, borderRadius: '50%', bgcolor: isCompleted ? '#27AE60' : isCurrent ? '#5C4F4A' : 'rgba(92,79,74,0.1)', border: '2px solid', borderColor: isCompleted ? '#27AE60' : isCurrent ? '#5C4F4A' : 'rgba(92,79,74,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'all 0.2s' }}>
                      {isCompleted ? (
                        <Typography sx={{ color: '#fff', fontSize: '0.85rem', lineHeight: 1, fontWeight: 700 }}>✓</Typography>
                      ) : (
                        <Typography variant="body2" sx={{ fontWeight: 700, color: isCurrent ? '#EDE9E6' : '#5C4F4A', fontSize: '0.85rem' }}>{idx + 1}</Typography>
                      )}
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="body2" sx={{ fontWeight: 600, color: '#2E2522' }}>{node.data.label as string}</Typography>
                      {isCurrent && <Typography variant="caption" sx={{ color: '#C9996B', fontWeight: 600 }}>← Continue here</Typography>}
                      {isCompleted && <Typography variant="caption" sx={{ color: '#27AE60', fontWeight: 600 }}>Completed</Typography>}
                    </Box>
                    {isCompleted && <Typography sx={{ color: '#27AE60', fontSize: '1rem' }}>✓</Typography>}
                    {isCurrent && <Chip label="In Progress" size="small" color="warning" sx={{ fontWeight: 600, height: 20, fontSize: '0.6rem' }} />}
                  </Box>
                  {idx < stepNodes.length - 1 && <Divider />}
                </Box>
              );
            })}
          </Box>
        </Paper>

        {!existingSession && (
          <Box>
            <Typography variant="caption" sx={{ fontWeight: 700, color: '#A89890', textTransform: 'uppercase', letterSpacing: 0.8, display: 'block', mb: 1 }}>Workflow Overview</Typography>
            <Box sx={{ borderRadius: 3, overflow: 'hidden', border: '1.5px solid rgba(92,79,74,0.18)', height: 220, bgcolor: '#F7F4F1' }}>
              <WorkflowPreview workflow={workflow} />
            </Box>
          </Box>
        )}

        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1.5, py: 1 }}>
          <Button
            id={existingSession ? 'resume-onboarding-btn' : 'start-onboarding-btn'}
            variant="contained"
            size="large"
            onClick={handleBegin}
            disabled={stepNodes.length === 0}
            sx={{ fontWeight: 700, px: 6, py: 1.75, fontSize: '1rem', borderRadius: 3, width: { xs: '100%', sm: 'auto' } }}
          >
            {existingSession ? '▶ Resume Onboarding' : 'Begin Onboarding →'}
          </Button>
          {stepNodes.length === 0 && (
            <Typography variant="caption" sx={{ color: '#C0392B' }}>This workflow has no steps configured yet.</Typography>
          )}
          <Typography variant="caption" sx={{ color: '#A89890', textAlign: 'center' }}>
            Your data is encrypted and securely stored
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default OnboardingEntry;