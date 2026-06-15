import type { Workflow, WorkflowNode } from '../type/type';

export function generateId(prefix = 'id'): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

export function getStepNodes(workflow: Workflow): WorkflowNode[] {
  return workflow.nodes
    .filter(n => n.data.nodeType === 'step')
    .sort((a, b) => (a.data.stepNo ?? 0) - (b.data.stepNo ?? 0));
}

export function getStartNode(workflow: Workflow): WorkflowNode | undefined {
  return workflow.nodes.find(n => n.data.nodeType === 'start');
}

export function getNextNode(workflow: Workflow, currentNodeId: string): WorkflowNode | undefined {
  const edge = workflow.edges.find(e => e.source === currentNodeId);
  if (!edge) return undefined;
  return workflow.nodes.find(n => n.id === edge.target);
}

export function isEndNode(workflow: Workflow, nodeId: string): boolean {
  const node = workflow.nodes.find(n => n.id === nodeId);
  return node?.data.nodeType === 'end';
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

export function copyToClipboard(text: string): void {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text);
  } else {
    const ta = document.createElement('textarea');
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
  }
}

export function buildOnboardingUrl(workflowId: string): string {
  return `${window.location.origin}/onboarding/${workflowId}`;
}

export function buildShareUrl(token: string): string {
  return `${window.location.origin}/share/${token}`;
}
