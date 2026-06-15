import React, { useCallback, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  ReactFlow, Background, Controls, MiniMap,
  addEdge, applyNodeChanges, applyEdgeChanges,
  type NodeTypes, type OnConnect, type OnNodesChange, type OnEdgesChange,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import type { RootState } from '../../app/store';
import type { WorkflowNode, WorkflowEdge, WorkflowNodeData, NodeType } from '../../type/type';
import { updateNodes, updateEdges, updateWorkflow, publishWorkflow } from '../../features/store/workflowsSlice';
import WorkflowNodeComponent from '../../components/admin/WorkflowNode';
import NodeConfigPanel from '../../components/admin/NodeConfigPanel';
import { generateId, buildOnboardingUrl, copyToClipboard } from '../../utils/helpers';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const nodeTypes: NodeTypes = { default: WorkflowNodeComponent };

const NODE_PALETTE: { type: NodeType; label: string; icon: string; color: string }[] = [
  { type: 'start', label: 'Start', icon: '▶', color: '#27AE60' },
  { type: 'step', label: 'Step', icon: '📋', color: '#5C4F4A' },
  { type: 'decision', label: 'Decision', icon: '⬦', color: '#E67E22' },
  { type: 'end', label: 'End', icon: '⏹', color: '#C0392B' },
];

const WorkflowDesigner: React.FC = () => {
  const { workflowId } = useParams<{ workflowId: string }>();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const workflow = useSelector((s: RootState) =>
    s.workflows.workflows.find(w => w.id === workflowId)
  );

  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [workflowName, setWorkflowName] = useState(workflow?.name ?? '');
  const [copiedLink, setCopiedLink] = useState(false);
  const [saved, setSaved] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [configOpen, setConfigOpen] = useState(false);

  if (!workflow) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', gap: 2, bgcolor: '#F7F4F1' }}>
        <Typography variant="h5" sx={{ fontWeight: 700, color: '#2E2522' }}>Workflow not found</Typography>
        <Button variant="contained" onClick={() => navigate('/admin')} sx={{ fontWeight: 600 }}>← Back to List</Button>
      </Box>
    );
  }

  const nodes = workflow.nodes as WorkflowNode[];
  const edges = workflow.edges as WorkflowEdge[];
  const selectedNode = selectedNodeId ? nodes.find(n => n.id === selectedNodeId) : null;

  const onNodesChange: OnNodesChange = useCallback(
    (changes) => {
      const updated = applyNodeChanges(changes, nodes) as WorkflowNode[];
      dispatch(updateNodes({ workflowId: workflow.id, nodes: updated }));
    },
    [nodes, dispatch, workflow.id]
  );

  const onEdgesChange: OnEdgesChange = useCallback(
    (changes) => {
      const updated = applyEdgeChanges(changes, edges) as WorkflowEdge[];
      dispatch(updateEdges({ workflowId: workflow.id, edges: updated }));
    },
    [edges, dispatch, workflow.id]
  );

  const onConnect: OnConnect = useCallback(
    (connection) => {
      const updated = addEdge({ ...connection, id: generateId('e') }, edges) as WorkflowEdge[];
      dispatch(updateEdges({ workflowId: workflow.id, edges: updated }));
    },
    [edges, dispatch, workflow.id]
  );

  const onNodeClick = useCallback((_: React.MouseEvent, node: WorkflowNode) => {
    setSelectedNodeId(node.id);
    if (isMobile) setConfigOpen(true);
  }, [isMobile]);

  const onPaneClick = useCallback(() => {
    setSelectedNodeId(null);
    if (isMobile) setConfigOpen(false);
  }, [isMobile]);

  const addNode = (type: NodeType, label: string) => {
    const id = generateId('n');
    const stepNodes = nodes.filter(n => n.data.nodeType === 'step');
    const newStepNo = stepNodes.length + 1;
    const newNode: WorkflowNode = {
      id,
      type: 'default',
      position: { x: 100 + Math.random() * 300, y: 100 + Math.random() * 200 },
      data: {
        label,
        nodeType: type,
        stepNo: type === 'step' ? newStepNo : undefined,
      } as WorkflowNodeData,
    };
    dispatch(updateNodes({ workflowId: workflow.id, nodes: [...nodes, newNode] }));
    if (isMobile) setPaletteOpen(false);
  };

  const handleSave = () => {
    dispatch(updateWorkflow({ ...workflow, name: workflowName }));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handlePublish = () => {
    dispatch(updateWorkflow({ ...workflow, name: workflowName }));
    dispatch(publishWorkflow(workflow.id));
  };

  const handleCopyLink = () => {
    copyToClipboard(buildOnboardingUrl(workflow.id));
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const PaletteContent = (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, p: isMobile ? 2 : 0 }}>
      <Typography variant="caption" sx={{ fontWeight: 700, color: '#A89890', textTransform: 'uppercase', letterSpacing: 1, display: 'block', mb: 0.5 }}>Add Nodes</Typography>
      {NODE_PALETTE.map(np => (
        <Tooltip key={np.type} title={`Add ${np.label} node`} placement="right">
          <Button
            id={`add-node-${np.type}`}
            variant="outlined"
            fullWidth
            onClick={() => addNode(np.type, np.label)}
            sx={{ display: 'flex', flexDirection: 'column', gap: 0.25, py: 1, borderColor: np.color, color: np.color, fontWeight: 600, textTransform: 'none', '&:hover': { bgcolor: `${np.color}12`, borderColor: np.color } }}
          >
            <Typography variant="body1" sx={{ lineHeight: 1 }}>{np.icon}</Typography>
            <Typography variant="caption" sx={{ fontWeight: 600 }}>{np.label}</Typography>
          </Button>
        </Tooltip>
      ))}
      <Divider sx={{ my: 0.5 }} />
      <Paper variant="outlined" sx={{ p: 1, borderRadius: 1, display: 'flex', flexDirection: 'column', gap: 0.5, bgcolor: '#F7F4F1' }}>
        <Typography variant="caption" sx={{ color: '#6B5F59' }}>🔵 {nodes.length} nodes</Typography>
        <Typography variant="caption" sx={{ color: '#6B5F59' }}>↔ {edges.length} edges</Typography>
        <Typography variant="caption" sx={{ color: '#6B5F59' }}>📋 {nodes.filter(n => n.data.nodeType === 'step').length} steps</Typography>
      </Paper>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, px: 2, py: 1, borderBottom: '1.5px solid rgba(92,79,74,0.18)', bgcolor: '#FFFFFF', flexWrap: 'wrap', zIndex: 10, boxShadow: '0 1px 3px rgba(92,79,74,0.08)', flexShrink: 0 }}>
        <Button
  variant="outlined"
  size="small"
  onClick={() => navigate('/admin')}
  startIcon={<ArrowBackIcon />}
  sx={{ fontWeight: 600, whiteSpace: 'nowrap', flexShrink: 0 }}
>
  Workflows
</Button>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flex: 1, minWidth: 0, justifyContent: 'center' }}>
          {!isMobile && (
            <TextField
              id="workflow-name-input"
              value={workflowName}
              onChange={e => setWorkflowName(e.target.value)}
              placeholder="Workflow name…"
              size="small"
              sx={{ minWidth: 180, maxWidth: 260 }}
              slotProps={{ htmlInput: { style: { fontWeight: 600 } } }}
            />
          )}
          <Chip
            label={workflow.status}
            size="small"
            color={workflow.status === 'published' ? 'success' : 'default'}
            sx={{ fontWeight: 600, textTransform: 'capitalize' }}
          />
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, flexWrap: 'wrap' }}>
          {isMobile && (
            <Button variant="outlined" size="small" onClick={() => setPaletteOpen(true)} sx={{ fontWeight: 600 }}>+ Nodes</Button>
          )}
          <Button variant={saved ? 'contained' : 'outlined'} color={saved ? 'success' : 'primary'} size="small" onClick={handleSave} sx={{ fontWeight: 600 }}>{saved ? 'Saved' : 'Save'}</Button>
          {workflow.status === 'draft' && (
            <Button id="publish-workflow-btn" variant="contained" color="success" size="small" onClick={handlePublish} sx={{ fontWeight: 600 }}>▶ Publish</Button>
          )}
          {workflow.status === 'published' && (
            <Button variant={copiedLink ? 'contained' : 'outlined'} color={copiedLink ? 'success' : 'primary'} size="small" onClick={handleCopyLink} sx={{ fontWeight: 600 }}>{copiedLink ? 'Copied!' : '🔗 Share'}</Button>
          )}
          {!isMobile && (
            <Button variant="outlined" size="small" onClick={() => navigate('/admin/sessions')} sx={{ fontWeight: 600 }}>Sessions</Button>
          )}
        </Box>
      </Box>

      {isMobile && (
        <Box sx={{ px: 2, py: 1, bgcolor: '#F7F4F1', borderBottom: '1px solid rgba(92,79,74,0.12)' }}>
          <TextField
            value={workflowName}
            onChange={e => setWorkflowName(e.target.value)}
            placeholder="Workflow name…"
            size="small"
            fullWidth
            slotProps={{ htmlInput: { style: { fontWeight: 600 } } }}
          />
        </Box>
      )}

      <Box sx={{ display: 'flex', flex: 1, overflow: 'hidden', position: 'relative' }}>
        {!isMobile && (
          <Box component="aside" sx={{ width: 160, borderRight: '1.5px solid rgba(92,79,74,0.18)', bgcolor: '#FFFFFF', display: 'flex', flexDirection: 'column', p: 1.5, gap: 1, overflowY: 'auto', flexShrink: 0 }}>
            {PaletteContent}
          </Box>
        )}

        <Box ref={reactFlowWrapper} sx={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onNodeClick={onNodeClick}
            onPaneClick={onPaneClick}
            fitView
            fitViewOptions={{ padding: 0.2 }}
            minZoom={0.2}
            maxZoom={2}
            deleteKeyCode="Delete"
            proOptions={{ hideAttribution: true }}
            style={{ width: '100%', height: '100%' }}
          >
            <Background gap={20} size={1} color="rgba(92,79,74,0.08)" />
            <Controls
              position="bottom-right"
              style={{ bottom: 16, right: 16, display: 'flex', flexDirection: 'column', gap: 4 }}
              showZoom
              showFitView
              showInteractive
            />
            <MiniMap
              position="bottom-left"
              nodeColor={n => {
                const t = (n.data as { nodeType?: string }).nodeType;
                if (t === 'start') return '#27AE60';
                if (t === 'end') return '#C0392B';
                if (t === 'decision') return '#E67E22';
                return '#5C4F4A';
              }}
              style={{ background: '#F7F4F1', border: '1px solid rgba(92,79,74,0.18)', borderRadius: 8 }}
              maskColor="rgba(92,79,74,0.06)"
            />
          </ReactFlow>
        </Box>

        {!isMobile && selectedNode && (
          <Box component="aside" sx={{ width: 320, borderLeft: '1.5px solid rgba(92,79,74,0.18)', bgcolor: '#FFFFFF', overflowY: 'auto', flexShrink: 0 }}>
            <NodeConfigPanel
              workflowId={workflow.id}
              nodeId={selectedNode.id}
              nodeData={selectedNode.data as WorkflowNodeData}
              onClose={() => setSelectedNodeId(null)}
            />
          </Box>
        )}
      </Box>

      <Drawer anchor="bottom" open={isMobile && paletteOpen} onClose={() => setPaletteOpen(false)} slotProps={{ paper: {sx: { borderRadius: '16px 16px 0 0', p: 2, maxHeight: '70vh'}}}}>
        <Box sx={{ width: 40, height: 4, bgcolor: 'rgba(92,79,74,0.2)', borderRadius: 2, mx: 'auto', mb: 2 }} />
        <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: '#2E2522' }}>Add Node</Typography>
        {PaletteContent}
      </Drawer>

      <Drawer anchor="bottom" open={isMobile && configOpen && !!selectedNode} onClose={() => { setConfigOpen(false); setSelectedNodeId(null); }} slotProps={{ paper: {sx: {borderRadius: '16px 16px 0 0', maxHeight: '85vh', overflow: 'hidden'}}}}>
        <Box sx={{ width: 40, height: 4, bgcolor: 'rgba(92,79,74,0.2)', borderRadius: 2, mx: 'auto', mt: 1.5, mb: 0.5, flexShrink: 0 }} />
        {selectedNode && (
          <NodeConfigPanel
            workflowId={workflow.id}
            nodeId={selectedNode.id}
            nodeData={selectedNode.data as WorkflowNodeData}
            onClose={() => { setConfigOpen(false); setSelectedNodeId(null); }}
          />
        )}
      </Drawer>
    </Box>
  );
};

export default WorkflowDesigner;