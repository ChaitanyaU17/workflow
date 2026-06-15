import React, { memo } from 'react';
import { Handle, Position, type NodeProps } from '@xyflow/react';
import type { WorkflowNodeData } from '../../type/type';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';

const nodeTypeColors: Record<string, string> = {
  start: '#27AE60',
  step: '#5C4F4A',
  decision: '#E67E22',
  end: '#C0392B',
};

const nodeTypeIcons: Record<string, string> = {
  start: '▶',
  step: '📋',
  decision: '⬦',
  end: '⏹',
};

const WorkflowNode: React.FC<NodeProps> = ({ data, selected }) => {
  const nodeData = data as WorkflowNodeData;
  const color = nodeTypeColors[nodeData.nodeType] ?? '#5C4F4A';
  const icon = nodeTypeIcons[nodeData.nodeType] ?? '●';

  return (
    <Box
      sx={{ minWidth: 140, maxWidth: 180, borderRadius: 2, border: 2, borderColor: selected ? color : 'rgba(92,79,74,0.2)', overflow: 'visible', position: 'relative', bgcolor: '#FFFFFF', boxShadow: selected ? `0 0 0 3px ${color}40, 0 4px 16px rgba(92,79,74,0.15)` : '0 2px 8px rgba(92,79,74,0.12)', transition: 'all 0.2s ease' }}
    >
      <Handle type="target" position={Position.Left} style={{ background: color, width: 10, height: 10, border: '2px solid #fff' }} />

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, px: 1.25, py: 0.75, borderBottom: '1px solid rgba(92,79,74,0.1)', bgcolor: `${color}15`, borderRadius: '6px 6px 0 0' }}>
        <Typography sx={{ fontSize: '0.85rem', lineHeight: 1, flexShrink: 0 }}>{icon}</Typography>
        <Typography variant="caption" sx={{ fontWeight: 700, color: color, letterSpacing: 0.8, textTransform: 'uppercase', fontSize: '0.6rem' }}>{nodeData.nodeType}</Typography>
      </Box>

      <Box sx={{ px: 1.25, py: 0.75, display: 'flex', flexDirection: 'column', gap: 0.25 }}>
        <Typography variant="body2" sx={{ fontWeight: 700, color: '#2E2522', fontSize: '0.8rem', lineHeight: 1.3 }} noWrap>{nodeData.label}</Typography>
        {nodeData.stepNo !== undefined && (
          <Typography variant="caption" sx={{ color: '#A89890', fontSize: '0.65rem' }}>Step {nodeData.stepNo}</Typography>
        )}
        {nodeData.formSchemaId && (
          <Chip label="📝 Form" size="small" sx={{ alignSelf: 'flex-start', fontSize: '0.55rem', height: 16, color: '#27AE60', borderColor: '#27AE60', mt: 0.25 }} variant="outlined" />
        )}
      </Box>

      <Handle type="source" position={Position.Right} style={{ background: color, width: 10, height: 10, border: '2px solid #fff' }} />
    </Box>
  );
};

export default memo(WorkflowNode);