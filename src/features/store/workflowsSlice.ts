import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Workflow, WorkflowNode, WorkflowEdge, WorkflowsState } from '../../type/type';

const NOW = '2024-01-01T00:00:00.000Z';

export const seedWorkflows: Workflow[] = [
  {
    id: 'wf-demo-001',
    name: 'Customer KYC Onboarding',
    status: 'published',
    createdBy: 'superadmin',
    createdAt: NOW,
    updatedAt: NOW,
    nodes: [
      { id: 'n-start', type: 'default', position: { x: 50,   y: 180 }, data: { label: 'Start',                 nodeType: 'start' } },
      { id: 'n-step1', type: 'default', position: { x: 240,  y: 80  }, data: { label: 'Personal Info',         nodeType: 'step', stepNo: 1, formSchemaId: 'fs-personal'  } },
      { id: 'n-step2', type: 'default', position: { x: 440,  y: 80  }, data: { label: 'Contact Details',       nodeType: 'step', stepNo: 2, formSchemaId: 'fs-contact'   } },
      { id: 'n-step3', type: 'default', position: { x: 640,  y: 80  }, data: { label: 'Identity Verification', nodeType: 'step', stepNo: 3, formSchemaId: 'fs-identity'  } },
      { id: 'n-step4', type: 'default', position: { x: 840,  y: 80  }, data: { label: 'Financial Info',        nodeType: 'step', stepNo: 4, formSchemaId: 'fs-financial' } },
      { id: 'n-end',   type: 'default', position: { x: 1040, y: 180 }, data: { label: 'End',                   nodeType: 'end'  } },
    ],
    edges: [
      { id: 'e-s-1', source: 'n-start', target: 'n-step1' },
      { id: 'e-1-2', source: 'n-step1', target: 'n-step2' },
      { id: 'e-2-3', source: 'n-step2', target: 'n-step3' },
      { id: 'e-3-4', source: 'n-step3', target: 'n-step4' },
      { id: 'e-4-e', source: 'n-step4', target: 'n-end'   },
    ],
  },
];

const initialState: WorkflowsState = { workflows: seedWorkflows };

const workflowsSlice = createSlice({
  name: 'workflows',
  initialState,
  reducers: {
    addWorkflow(state, action: PayloadAction<Workflow>) {
      const exists = state.workflows.some(w => w.id === action.payload.id);
      if (!exists) state.workflows.push(action.payload);
    },
    updateWorkflow(state, action: PayloadAction<Workflow>) {
      const idx = state.workflows.findIndex(w => w.id === action.payload.id);
      if (idx !== -1) {
        state.workflows[idx] = { ...action.payload, updatedAt: new Date().toISOString() };
      }
    },
    deleteWorkflow(state, action: PayloadAction<string>) {
      // seed workflows cannot be deleted
      if (seedWorkflows.some(s => s.id === action.payload)) return;
      state.workflows = state.workflows.filter(w => w.id !== action.payload);
    },
    duplicateWorkflow(
      state,
      action: PayloadAction<{ workflowId: string; createdBy: string }>
    ) {
      const orig = state.workflows.find(w => w.id === action.payload.workflowId);
      if (orig) {
        state.workflows.push({
          ...orig,
          id: `wf-${Date.now()}`,
          name: `${orig.name} (Copy)`,
          status: 'draft',
          createdBy: action.payload.createdBy,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        });
      }
    },
    updateNodes(state, action: PayloadAction<{ workflowId: string; nodes: WorkflowNode[] }>) {
      const wf = state.workflows.find(w => w.id === action.payload.workflowId);
      if (wf) { wf.nodes = action.payload.nodes; wf.updatedAt = new Date().toISOString(); }
    },
    updateEdges(state, action: PayloadAction<{ workflowId: string; edges: WorkflowEdge[] }>) {
      const wf = state.workflows.find(w => w.id === action.payload.workflowId);
      if (wf) { wf.edges = action.payload.edges; wf.updatedAt = new Date().toISOString(); }
    },
    publishWorkflow(state, action: PayloadAction<string>) {
      const wf = state.workflows.find(w => w.id === action.payload);
      if (wf) { wf.status = 'published'; wf.updatedAt = new Date().toISOString(); }
    },
    updateNodeData(
      state,
      action: PayloadAction<{ workflowId: string; nodeId: string; data: Partial<WorkflowNode['data']> }>
    ) {
      const wf = state.workflows.find(w => w.id === action.payload.workflowId);
      if (wf) {
        const node = wf.nodes.find(n => n.id === action.payload.nodeId);
        if (node) {
          node.data = { ...node.data, ...action.payload.data };
          wf.updatedAt = new Date().toISOString();
        }
      }
    },
  },
});

export const {
  addWorkflow, updateWorkflow, deleteWorkflow, duplicateWorkflow,
  updateNodes, updateEdges, publishWorkflow, updateNodeData,
} = workflowsSlice.actions;

export default workflowsSlice.reducer;