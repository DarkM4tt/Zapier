import { create } from "zustand";
import {
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  MarkerType,
} from "reactflow";
import { INITIAL_NODES } from "../constants/workflow";

const useFlowStore = create((set, get) => ({
  nodes: INITIAL_NODES,
  edges: [],
  selectedNode: null,

  onNodesChange: (changes) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },

  onEdgesChange: (changes) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },

  onConnect: (connection) => {
    const edges = get().edges;
    const sourceHasOutgoing = edges.some(
      (edge) => edge.source === connection.source
    );

    if (sourceHasOutgoing) {
      alert(
        "Validation Error: A node can only have one outgoing connection (Linear Workflow)."
      );
      return;
    }

    if (connection.source === connection.target) {
      alert("Validation Error: Loops are not allowed.");
      return;
    }

    set({
      edges: addEdge(
        { ...connection, markerEnd: { type: MarkerType.ArrowClosed } },
        get().edges
      ),
    });
  },

  addNode: (node) => {
    set({ nodes: [...get().nodes, node] });
  },

  setSelectedNode: (nodeId) => {
    if (!nodeId) {
      set({ selectedNode: null });
      return;
    }
    const node = get().nodes.find((n) => n.id === nodeId);
    set({ selectedNode: node });
  },

  updateNodeData: (nodeId, newData) => {
    set({
      nodes: get().nodes.map((node) =>
        node.id === nodeId
          ? { ...node, data: { ...node.data, ...newData } }
          : node
      ),
    });
    if (get().selectedNode?.id === nodeId) {
      set((state) => ({
        selectedNode: {
          ...state.selectedNode,
          data: { ...state.selectedNode.data, ...newData },
        },
      }));
    }
  },
}));

export default useFlowStore;
