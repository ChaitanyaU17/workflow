import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../app/store';
import type { ConsumerSession } from '../../type/type';
import { addToken } from '../../features/store/shareSlice';
import { generateId, buildShareUrl, copyToClipboard, formatDate } from '../../utils/helpers';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Checkbox from '@mui/material/Checkbox';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';

interface SharePanelProps {
  session: ConsumerSession;
  onClose: () => void;
}

const SharePanel: React.FC<SharePanelProps> = ({ session, onClose }) => {
  const dispatch = useDispatch();
  const forms = useSelector((s: RootState) => s.forms.forms);
  const workflow = useSelector((s: RootState) =>
    s.workflows.workflows.find(w => w.id === session.workflowId)
  );
  const tokens = useSelector((s: RootState) =>
    s.share.tokens.filter(t => t.sessionId === session.sessionId)
  );

  const [selectedFields, setSelectedFields] = useState<Record<string, string[]>>({});
  const [copied, setCopied] = useState<string | null>(null);
  const [expiryDays, setExpiryDays] = useState(7);

  if (!workflow) return null;

  const stepNodes = workflow.nodes.filter(n => n.data.nodeType === 'step');

  const toggleField = (nodeId: string, fieldName: string) => {
    setSelectedFields(prev => {
      const current = prev[nodeId] ?? [];
      const updated = current.includes(fieldName)
        ? current.filter(f => f !== fieldName)
        : [...current, fieldName];
      return { ...prev, [nodeId]: updated };
    });
  };

  const selectAllForNode = (nodeId: string, fieldNames: string[]) => {
    setSelectedFields(prev => ({ ...prev, [nodeId]: fieldNames }));
  };

  const clearNode = (nodeId: string) => {
    setSelectedFields(prev => ({ ...prev, [nodeId]: [] }));
  };

  const totalSelected = Object.values(selectedFields).flat().length;

  const handleGenerate = () => {
    if (totalSelected === 0) return;
    const token = generateId('tok');
    const expiresAt = new Date(Date.now() + expiryDays * 86400000).toISOString();
    dispatch(addToken({
      token,
      sessionId: session.sessionId,
      allowedFields: selectedFields,
      expiresAt,
      createdAt: new Date().toISOString(),
      createdBy: 'admin',
    }));
    setSelectedFields({});
  };

  const handleCopy = (token: string) => {
    copyToClipboard(buildShareUrl(token));
    setCopied(token);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', bgcolor: 'background.paper' }}>
      <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', px: 2, py: 1.5, borderBottom: 1, borderColor: 'divider' }}>
        <Box>
          <Typography variant="h6" sx={{fontWeight: 600}}>🔗 Share Consumer Data</Typography>
          <Typography variant="caption" color="text.secondary">Session: {session.sessionId.slice(0, 16)}…</Typography>
        </Box>
        <IconButton size="small" onClick={onClose}>✕</IconButton>
      </Box>

      <Box sx={{ flex: 1, overflowY: 'auto', p: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography variant="subtitle2" color="text.secondary">Select Fields to Share</Typography>

        {stepNodes.map(node => {
          const formId = node.data.formSchemaId as string | undefined;
          const form = forms.find(f => f.id === formId);
          const nodeValues = session.valuesByNodeId[node.id];
          if (!form || !nodeValues) return null;

          const fieldNames = form.fields.map(f => f.name);
          const selectedForNode = selectedFields[node.id] ?? [];

          return (
            <Paper key={node.id} variant="outlined" sx={{ p: 1.5, borderRadius: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="subtitle2" sx={{fontWeight: 600}}>{node.data.label as string}</Typography>
                <Box sx={{ display: 'flex', gap: 0.5 }}>
                  <Button size="small" variant="text" onClick={() => selectAllForNode(node.id, fieldNames)}>All</Button>
                  <Button size="small" variant="text" onClick={() => clearNode(node.id)}>None</Button>
                </Box>
              </Box>
              <Divider sx={{ mb: 1 }} />
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                {form.fields.map(field => (
                  <Box
                    key={field.id}
                    onClick={() => toggleField(node.id, field.name)}
                    sx={{ display: 'flex', alignItems: 'center', gap: 1, p: 0.75, borderRadius: 1, cursor: 'pointer', bgcolor: selectedForNode.includes(field.name) ? 'primary.50' : 'transparent', border: 1, borderColor: selectedForNode.includes(field.name) ? 'primary.main' : 'transparent', '&:hover': { bgcolor: 'action.hover' } }}
                  >
                    <Checkbox size="small" checked={selectedForNode.includes(field.name)} onChange={() => toggleField(node.id, field.name)} onClick={e => e.stopPropagation()} sx={{ p: 0 }} />
                    <Typography variant="body2" sx={{ flex: 1, fontWeight: 500 }}>{field.label}</Typography>
                    <Typography variant="caption" color="text.secondary">{String(nodeValues[field.name] ?? '—')}</Typography>
                  </Box>
                ))}
              </Box>
            </Paper>
          );
        })}

        <Paper variant="outlined" sx={{ p: 1.5, borderRadius: 1, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          <TextField
            label="Link expires in (days)"
            type="number"
            value={expiryDays}
            onChange={e => setExpiryDays(Number(e.target.value))}
              slotProps={{ htmlInput: { min: 1, max: 90}}}
            size="small"
            sx={{ maxWidth: 200 }}
          />
          <Button
            variant="contained"
            onClick={handleGenerate}
            disabled={totalSelected === 0}
            sx={{ alignSelf: 'flex-start' }}
          >
            Generate Share Link ({totalSelected} field{totalSelected !== 1 ? 's' : ''})
          </Button>
        </Paper>

        {tokens.length > 0 && (
          <Box>
            <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>Generated Links</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {tokens.map(t => (
                <Paper key={t.token} variant="outlined" sx={{ p: 1.5, borderRadius: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 1 }}>
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography variant="body2" noWrap sx={{ fontFamily: 'monospace', fontSize: '0.75rem' }}>{buildShareUrl(t.token)}</Typography>
                    <Box sx={{ display: 'flex', gap: 1, mt: 0.5 }}>
                      <Chip label={`${Object.values(t.allowedFields).flat().length} fields`} size="small" variant="outlined" />
                      <Typography variant="caption" color="text.secondary">Expires {formatDate(t.expiresAt)}</Typography>
                    </Box>
                  </Box>
                  <Button
                    variant={copied === t.token ? 'contained' : 'outlined'}
                    color={copied === t.token ? 'success' : 'primary'}
                    size="small"
                    onClick={() => handleCopy(t.token)}
                    sx={{ whiteSpace: 'nowrap', minWidth: 80 }}
                  >
                    {copied === t.token ? '✓ Copied' : 'Copy'}
                  </Button>
                </Paper>
              ))}
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default SharePanel;