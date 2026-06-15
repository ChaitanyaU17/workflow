import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '../../app/store';
import { formatDate } from '../../utils/helpers';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';

const OnboardingDone: React.FC = () => {
  const { workflowId } = useParams<{ workflowId: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const sessionId = searchParams.get('session') ?? '';
  const [animIn, setAnimIn] = useState(false);

  const workflow = useSelector((s: RootState) =>
    s.workflows.workflows.find(w => w.id === workflowId)
  );
  const session = useSelector((s: RootState) =>
    s.sessions.sessions.find(s => s.sessionId === sessionId)
  );

  useEffect(() => {
    const t = setTimeout(() => setAnimIn(true), 100);
    return () => clearTimeout(t);
  }, []);

  if (!session || !workflow) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', gap: 2, p: 3 }}>
        <Typography variant="h2" sx={{ lineHeight: 1 }}>⚠️</Typography>
        <Typography variant="h5" sx={{ fontWeight: 700 }}>Session not found</Typography>
        <Button variant="contained" onClick={() => navigate(`/onboarding/${workflowId}`)} sx={{ fontWeight: 600 }}>← Restart</Button>
      </Box>
    );
  }

  const completedSteps = session.completedNodeIds.length;
  const totalFields = Object.values(session.valuesByNodeId).reduce(
    (acc, vals) => acc + Object.keys(vals).length, 0
  );

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', p: 3, position: 'relative', overflow: 'hidden', opacity: animIn ? 1 : 0, transform: animIn ? 'translateY(0)' : 'translateY(24px)', transition: 'opacity 0.5s ease, transform 0.5s ease' }}>
      <Box aria-hidden="true" sx={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        {Array.from({ length: 12 }).map((_, i) => (
          <Box key={i} sx={{ position: 'absolute', width: 12, height: 12, borderRadius: '50%', bgcolor: ['#10b981', '#6366f1', '#f59e0b', '#ef4444'][i % 4], top: `${10 + (i * 7) % 80}%`, left: `${5 + (i * 8) % 90}%`, opacity: 0.6, animation: `float${i % 3} 3s ease-in-out infinite`, animationDelay: `${i * 0.2}s` }} />
        ))}
      </Box>

      <Paper elevation={4} sx={{ maxWidth: 560, width: '100%', borderRadius: 3, overflow: 'hidden', position: 'relative', zIndex: 1 }}>
        <Box sx={{ bgcolor: 'success.main', py: 4, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Box sx={{ width: 72, height: 72, borderRadius: '50%', border: 3, borderColor: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }} >
            <svg viewBox="0 0 52 52" width="52" height="52" aria-hidden="true">
              <circle cx="26" cy="26" r="25" fill="none" stroke="white" strokeWidth="2" />
              <path fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" d="M14 27 l8 8 l16-16" />
            </svg>
          </Box>
        </Box>

        <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', gap: 2.5 }}>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h4" sx={{ fontWeight: 800 }}>You're all set! 🎉</Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mt: 0.5 }}>
              Your onboarding for <Box component="strong" sx={{ color: 'text.primary', fontWeight: 700 }}>{workflow.name}</Box> has been completed successfully.
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center', flexWrap: 'wrap' }}>
            {[
              { value: completedSteps, label: 'Steps Completed' },
              { value: totalFields, label: 'Fields Submitted' },
              { value: formatDate(session.updatedAt), label: 'Completed On' },
            ].map(stat => (
              <Paper key={stat.label} variant="outlined" sx={{ flex: 1, minWidth: 120, p: 1.5, textAlign: 'center', borderRadius: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 700, color: 'success.main' }}>{stat.value}</Typography>
                <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500 }}>{stat.label}</Typography>
              </Paper>
            ))}
          </Box>

          <Divider />

          <Box sx={{ bgcolor: 'action.hover', borderRadius: 2, p: 2, textAlign: 'center' }}>
            <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600, display: 'block', mb: 0.5 }}>Your Reference ID</Typography>
            <Typography variant="body2" sx={{ fontFamily: 'monospace', fontWeight: 700, wordBreak: 'break-all', color: 'primary.main' }}>
              {session.sessionId}
            </Typography>
          </Box>

          <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
            Our team will review your submission and get back to you shortly. Please keep your reference ID safe.
          </Typography>

          <Box sx={{ display: 'flex', gap: 1.5, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button
              variant="outlined"
              onClick={() => navigate(`/onboarding/${workflowId}/review?session=${sessionId}`)}
              sx={{ fontWeight: 600 }}
            >
              View Summary
            </Button>
            <Button
              id="done-home-btn"
              variant="contained"
              onClick={() => navigate('/')}
              sx={{ fontWeight: 600 }}
            >
              Back to Home
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default OnboardingDone;