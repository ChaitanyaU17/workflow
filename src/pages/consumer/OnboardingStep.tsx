import React, { useEffect } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../app/store';
import { saveNodeValues, advanceNode, completeSession } from '../../features/store/sessionsSlice';
import { getNextNode, getStepNodes, isEndNode } from '../../utils/helpers';
import DynamicForm from '../../components/consumer/DynamicForm';
import StepperNav from '../../components/consumer/StepperNav';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';

const OnboardingStep: React.FC = () => {
  const { workflowId, nodeId } = useParams<{ workflowId: string; nodeId: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const sessionId = searchParams.get('session') ?? '';

  const workflow = useSelector((s: RootState) =>
    s.workflows.workflows.find(w => w.id === workflowId)
  );
  const session = useSelector((s: RootState) =>
    s.sessions.sessions.find(s => s.sessionId === sessionId)
  );
  const forms = useSelector((s: RootState) => s.forms.forms);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [nodeId]);

  if (!workflow || !session) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', gap: 2, p: 3 }}>
        <Typography variant="h2" sx={{ lineHeight: 1 }}>⚠️</Typography>
        <Typography variant="h5" sx={{ fontWeight: 700 }}>Session not found</Typography>
        <Typography variant="body2" color="text.secondary">Please return to the onboarding start link.</Typography>
        <Button variant="contained" onClick={() => navigate(`/onboarding/${workflowId}`)} sx={{ fontWeight: 600 }}>← Back to Start</Button>
      </Box>
    );
  }

  const currentNode = workflow.nodes.find(n => n.id === nodeId);
  if (!currentNode) return <LoadingSpinner message="Loading step…" />;

  const formSchemaId = currentNode.data.formSchemaId as string | undefined;
  const form = forms.find(f => f.id === formSchemaId);
  const stepNodes = getStepNodes(workflow);
  const nextNode = getNextNode(workflow, nodeId!);

  const stepsForStepper = stepNodes.map(n => ({
    id: n.id,
    label: n.data.label as string,
    stepNo: n.data.stepNo as number,
  }));
  const currentStepNo = (currentNode.data.stepNo as number) ?? 1;
  const isLast = !nextNode || isEndNode(workflow, nextNode.id);

  const prevEdge = workflow.edges.find(e => e.target === nodeId);
  const prevNode = prevEdge ? workflow.nodes.find(n => n.id === prevEdge.source) : null;
  const prevStepNode = prevNode?.data.nodeType === 'step' ? prevNode : null;

  const handleBack = () => {
    if (prevStepNode) {
      navigate(`/onboarding/${workflowId}/step/${prevStepNode.id}?session=${sessionId}`);
    } else {
      navigate(`/onboarding/${workflowId}`);
    }
  };

  const handleSubmit = (values: Record<string, unknown>) => {
    dispatch(saveNodeValues({ sessionId, nodeId: nodeId!, values }));
    if (isLast) {
      dispatch(advanceNode({ sessionId, completedNodeId: nodeId!, nextNodeId: nextNode?.id ?? nodeId! }));
      dispatch(completeSession(sessionId));
      navigate(`/onboarding/${workflowId}/review?session=${sessionId}`);
    } else if (nextNode) {
      dispatch(advanceNode({ sessionId, completedNodeId: nodeId!, nextNodeId: nextNode.id }));
      if (nextNode.data.nodeType === 'end') {
        dispatch(completeSession(sessionId));
        navigate(`/onboarding/${workflowId}/review?session=${sessionId}`);
      } else {
        navigate(`/onboarding/${workflowId}/step/${nextNode.id}?session=${sessionId}`);
      }
    }
  };

  if (!form) {
    return (
      <Box sx={{ maxWidth: 560, mx: 'auto', p: 3 }}>
        <Paper variant="outlined" sx={{ borderRadius: 2, p: 3, textAlign: 'center', display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'center' }}>
          <Typography variant="h2" sx={{ lineHeight: 1 }}>📋</Typography>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>No form configured</Typography>
          <Typography variant="body2" color="text.secondary">This step has no form attached. Please contact the administrator.</Typography>
          {!isLast && nextNode && (
            <Button variant="contained" onClick={() => navigate(`/onboarding/${workflowId}/step/${nextNode.id}?session=${sessionId}`)} sx={{ fontWeight: 600 }}>
              Skip to Next →
            </Button>
          )}
        </Paper>
      </Box>
    );
  }

  const savedValues = session.valuesByNodeId[nodeId!] as Record<string, string | number | boolean> | undefined;

  return (
    <Box sx={{ maxWidth: 680, mx: 'auto', display: 'flex', flexDirection: 'column', gap: 0 }}>
      <Box sx={{ px: 2, pt: 2, pb: 0 }}>
        <StepperNav
          steps={stepsForStepper}
          currentStepNo={currentStepNo}
          completedStepIds={session.completedNodeIds}
        />
      </Box>

      <Box sx={{ p: 3 }}>
        <Box sx={{ mb: 2.5, display: 'flex', flexDirection: 'column', gap: 0.5 }}>
          <Chip
            label={`Step ${currentStepNo} of ${stepNodes.length}`}
            size="small"
            color="primary"
            variant="outlined"
            sx={{ alignSelf: 'flex-start', fontWeight: 600 }}
          />
          <Typography variant="h5" sx={{ fontWeight: 800 }}>
            {currentNode.data.label as string}
          </Typography>
        </Box>

        <DynamicForm
          schema={form}
          initialValues={savedValues}
          onSubmit={handleSubmit}
          onBack={handleBack}
          isFirstStep={!prevStepNode}
          isLastStep={isLast}
        />
      </Box>
    </Box>
  );
};

export default OnboardingStep;