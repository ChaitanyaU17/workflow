import React, { useMemo } from 'react';
import { ReactFlow, Background, Controls, MiniMap, type NodeTypes } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import type { Workflow } from '../../type/type';
import WorkflowNode from '../admin/WorkflowNode';
import Box from '@mui/material/Box';

const nodeTypes: NodeTypes = { default: WorkflowNode };

interface WorkflowPreviewProps {
  workflow: Workflow;
  highlightNodeId?: string;
}

const WorkflowPreview: React.FC<WorkflowPreviewProps> = ({ workflow, highlightNodeId }) => {
  const nodes = useMemo(
    () =>
      workflow.nodes.map(n => ({
        ...n,
        selected: n.id === highlightNodeId,
      })),
    [workflow.nodes, highlightNodeId]
  );

  return (
    <Box sx={{ width: '100%', height: '100%', minHeight: 400, borderRadius: 2, overflow: 'hidden', border: 1, borderColor: 'divider' }}>
      <ReactFlow
        nodes={nodes}
        edges={workflow.edges}
        nodeTypes={nodeTypes}
        fitView
        panOnDrag={false}
        zoomOnScroll={false}
        zoomOnDoubleClick={false}
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={false}
        proOptions={{ hideAttribution: true }}
      >
        <Background gap={16} size={1} color="rgba(255,255,255,0.05)" />
        <Controls showInteractive={false} />
        <MiniMap
          nodeStrokeWidth={3}
          nodeColor={n => {
            const t = (n.data as { nodeType?: string }).nodeType;
            if (t === 'start') return '#10b981';
            if (t === 'end') return '#ef4444';
            if (t === 'decision') return '#f59e0b';
            return '#6366f1';
          }}
          style={{ background: 'rgba(15,15,30,0.6)' }}
        />
      </ReactFlow>
    </Box>
  );
};

export default WorkflowPreview;