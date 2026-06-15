import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../app/store';
import type { WorkflowNodeData, NodeType, FormSchema } from '../../type/type';
import { updateNodeData } from '../../features/store/workflowsSlice';
import { addForm, updateForm } from '../../features/store/formsSlice';
import FormBuilder from './FormBuilder';
import { generateId } from '../../utils/helpers';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Alert from '@mui/material/Alert';

interface NodeConfigPanelProps {
  workflowId: string;
  nodeId: string;
  nodeData: WorkflowNodeData;
  onClose: () => void;
}

const NODE_TYPES: NodeType[] = ['start', 'step', 'decision', 'end'];

const NODE_TYPE_INFO: Record<NodeType, { icon: string; desc: string; color: string }> = {
  start: { icon: '▶', desc: 'Entry point of the workflow', color: '#27AE60' },
  step: { icon: '📋', desc: 'A form step for the consumer', color: '#5C4F4A' },
  decision: { icon: '⬦', desc: 'Branching logic node', color: '#E67E22' },
  end: { icon: '⏹', desc: 'End of the workflow', color: '#C0392B' },
};

const NodeConfigPanel: React.FC<NodeConfigPanelProps> = ({ workflowId, nodeId, nodeData, onClose }) => {
  const dispatch = useDispatch();
  const forms = useSelector((s: RootState) => s.forms.forms);

  const [label, setLabel] = useState(nodeData.label);
  const [nodeType, setNodeType] = useState<NodeType>(nodeData.nodeType);
  const [stepNo, setStepNo] = useState<number>(nodeData.stepNo ?? 1);
  const [formSchemaId, setFormSchemaId] = useState<string>(nodeData.formSchemaId ?? '');
  const [showFormBuilder, setShowFormBuilder] = useState(false);
  const [editingForm, setEditingForm] = useState<FormSchema | null>(null);

  useEffect(() => {
    setLabel(nodeData.label);
    setNodeType(nodeData.nodeType);
    setStepNo(nodeData.stepNo ?? 1);
    setFormSchemaId(nodeData.formSchemaId ?? '');
  }, [nodeId, nodeData]);

  const handleSave = () => {
    dispatch(updateNodeData({
      workflowId,
      nodeId,
      data: {
        label,
        nodeType,
        stepNo: nodeType === 'step' ? stepNo : undefined,
        formSchemaId: nodeType === 'step' ? formSchemaId : undefined,
      },
    }));
    onClose();
  };

  const handleCreateForm = () => {
    const newForm: FormSchema = { id: generateId('fs'), title: `${label} Form`, fields: [] };
    dispatch(addForm(newForm));
    setFormSchemaId(newForm.id);
    setEditingForm(newForm);
    setShowFormBuilder(true);
  };

  const handleEditForm = () => {
    const form = forms.find(f => f.id === formSchemaId);
    if (form) { setEditingForm(form); setShowFormBuilder(true); }
  };

  const handleFormSave = (form: FormSchema) => {
    dispatch(updateForm(form));
    setEditingForm(form);
    setShowFormBuilder(false);
  };

  if (showFormBuilder && editingForm) {
    return <FormBuilder form={editingForm} onSave={handleFormSave} onCancel={() => setShowFormBuilder(false)} />;
  }

  const assignedForm = forms.find(f => f.id === formSchemaId);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', bgcolor: '#FFFFFF' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 2, py: 1.5, borderBottom: '1.5px solid rgba(92,79,74,0.18)', bgcolor: '#F7F4F1', flexShrink: 0 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography sx={{ fontSize: '1.1rem' }}>{NODE_TYPE_INFO[nodeType]?.icon}</Typography>
          <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#2E2522' }}>Configure Node</Typography>
        </Box>
        <IconButton size="small" onClick={onClose} sx={{ color: '#A89890' }}>✕</IconButton>
      </Box>

      <Box sx={{ flex: 1, overflowY: 'auto', p: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>

        <TextField
          label="Node Label"
          value={label}
          onChange={e => setLabel(e.target.value)}
          placeholder="Enter label…"
          fullWidth
          size="small"
          helperText="Display name shown on the canvas"
        />

        <Box>
          <Typography variant="caption" sx={{ fontWeight: 700, color: '#A89890', textTransform: 'uppercase', letterSpacing: 0.8, display: 'block', mb: 1 }}>Node Type</Typography>
          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1 }}>
            {NODE_TYPES.map(t => {
              const info = NODE_TYPE_INFO[t];
              const isActive = nodeType === t;
              return (
                <Paper
                  key={t}
                  variant="outlined"
                  onClick={() => setNodeType(t)}
                  sx={{ p: 1.25, cursor: 'pointer', borderRadius: 2, border: '1.5px solid', borderColor: isActive ? info.color : 'rgba(92,79,74,0.18)', bgcolor: isActive ? `${info.color}10` : '#FFFFFF', transition: 'all 0.15s ease', '&:hover': { borderColor: info.color, bgcolor: `${info.color}08` } }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, mb: 0.25 }}>
                    <Typography sx={{ fontSize: '0.9rem', lineHeight: 1 }}>{info.icon}</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 700, color: isActive ? info.color : '#2E2522', fontSize: '0.8rem', textTransform: 'capitalize' }}>{t}</Typography>
                  </Box>
                  <Typography variant="caption" sx={{ color: '#A89890', fontSize: '0.65rem', display: 'block', lineHeight: 1.3 }}>{info.desc}</Typography>
                </Paper>
              );
            })}
          </Box>
        </Box>

        {nodeType === 'step' && (
          <>
            <Divider />

            <TextField
              label="Step Number"
              type="number"
              value={stepNo}
              onChange={e => setStepNo(Number(e.target.value))}
              slotProps={{htmlInput: {min: 1, max: 20}}}
              fullWidth
              size="small"
              helperText="Order in the onboarding flow"
            />

            <Box>
              <Typography variant="caption" sx={{ fontWeight: 700, color: '#A89890', textTransform: 'uppercase', letterSpacing: 0.8, display: 'block', mb: 1 }}>Form Schema</Typography>

              {forms.length === 0 ? (
                <Alert severity="info" sx={{ mb: 1, fontSize: '0.8rem' }}>No forms yet. Create one below.</Alert>
              ) : (
                <TextField
                  select
                  value={formSchemaId}
                  onChange={e => setFormSchemaId(e.target.value)}
                  fullWidth
                  size="small"
                  slotProps={{select: {native: true}}}
                  helperText="Assign a form for consumers to fill"
                >
                  <option value="">— None selected —</option>
                  {forms.map(f => (
                    <option key={f.id} value={f.id}>{f.title} ({f.fields.length} fields)</option>
                  ))}
                </TextField>
              )}

              <Box sx={{ display: 'flex', gap: 1, mt: 1.5 }}>
                <Button variant="contained" size="small" onClick={handleCreateForm} sx={{ fontWeight: 600, flex: 1 }}>Create Form</Button>
                {formSchemaId && (
                  <Button variant="outlined" size="small" onClick={handleEditForm} sx={{ fontWeight: 600, flex: 1 }}>Edit Form</Button>
                )}
              </Box>
            </Box>

            {assignedForm && (
              <Paper variant="outlined" sx={{ borderRadius: 2, overflow: 'hidden', bgcolor: '#F7F4F1' }}>
                <Box sx={{ px: 1.5, py: 1, bgcolor: 'rgba(92,79,74,0.06)', borderBottom: '1px solid rgba(92,79,74,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Typography variant="caption" sx={{ fontWeight: 700, color: '#2E2522' }}>📝 {assignedForm.title}</Typography>
                  <Chip label={`${assignedForm.fields.length} fields`} size="small" variant="outlined" sx={{ height: 18, fontSize: '0.6rem' }} />
                </Box>
                {assignedForm.fields.length === 0 ? (
                  <Box sx={{ px: 1.5, py: 1 }}>
                    <Typography variant="caption" sx={{ color: '#A89890', fontStyle: 'italic' }}>No fields yet. Click Edit Form to add fields.</Typography>
                  </Box>
                ) : (
                  <List dense disablePadding>
                    {assignedForm.fields.map((f, idx) => (
                      <ListItem key={f.id} disablePadding sx={{ px: 1.5, py: 0.5, borderBottom: idx < assignedForm.fields.length - 1 ? '1px solid rgba(92,79,74,0.08)' : 'none' }}>
                        <Chip label={f.type} size="small" variant="outlined" sx={{ height: 18, fontSize: '0.6rem', mr: 1, flexShrink: 0 }} />
                        <Typography variant="caption" sx={{ color: '#2E2522', fontWeight: 500 }}>{f.label}</Typography>
                        {f.validation.required && <Typography variant="caption" sx={{ color: '#C0392B', ml: 0.5 }}>*</Typography>}
                      </ListItem>
                    ))}
                  </List>
                )}
              </Paper>
            )}
          </>
        )}
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, px: 2, py: 1.5, borderTop: '1.5px solid rgba(92,79,74,0.18)', bgcolor: '#F7F4F1', flexShrink: 0 }}>
        <Button variant="outlined" onClick={onClose} sx={{ fontWeight: 600 }}>Cancel</Button>
        <Button variant="contained" onClick={handleSave} sx={{ fontWeight: 600 }}>Save Node</Button>
      </Box>
    </Box>
  );
};

export default NodeConfigPanel;