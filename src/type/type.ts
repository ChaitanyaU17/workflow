import type { Node, Edge } from '@xyflow/react';

export type FieldType =
  | 'text'
  | 'number'
  | 'email'
  | 'phone'
  | 'date'
  | 'select'
  | 'checkbox'
  | 'textarea';

export interface FieldValidation {
  required?: boolean;
  min?: number;
  max?: number;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  patternMessage?: string;
  options?: string[]; //to select fields
}

export interface FormField {
  id: string;
  name: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  validation: FieldValidation;
}


export interface FormSchema {
  id: string;
  title: string;
  fields: FormField[];
}

export type NodeType = 'start' | 'step' | 'decision' | 'end';

export interface WorkflowNodeData extends Record<string, unknown> {
  label: string;
  nodeType: NodeType;
  stepNo?: number;
  formSchemaId?: string;
}

export type WorkflowNode = Node<WorkflowNodeData>;
export type WorkflowEdge = Edge;

export type WorkflowStatus = 'draft' | 'published';

export interface Workflow {
  id: string;
  name: string;
  status: WorkflowStatus;
  nodes: WorkflowNode[];
  edges: WorkflowEdge[];
  createdAt: string;
  updatedAt: string;
}

export interface ConsumerSession {
  sessionId: string;
  workflowId: string;
  consumerId: string;
  currentNodeId: string;
  completedNodeIds: string[];
  valuesByNodeId: Record<string, Record<string, unknown>>;
  status: 'in-progress' | 'completed';
  createdAt: string;
  updatedAt: string;
}

export interface ShareToken {
  token: string;
  sessionId: string;
  allowedFields: Record<string, string[]>; // nodeId - field names[]
  expiresAt: string;
  createdAt: string;
  createdBy: string;
}

export interface WorkflowsState {
  workflows: Workflow[];
}

export interface FormsState {
  forms: FormSchema[];
}

export interface SessionsState {
  sessions: ConsumerSession[];
}

export interface ShareState {
  tokens: ShareToken[];
}
