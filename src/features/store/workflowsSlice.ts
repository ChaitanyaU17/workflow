import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Workflow, WorkflowNode, WorkflowEdge, WorkflowsState } from '../../type/type';

export const seedWorkflows: Workflow[] = [];

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