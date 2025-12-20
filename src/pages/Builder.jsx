import { useCallback, useRef } from "react";
import ReactFlow, {
  Background,
  Controls,
  ReactFlowProvider,
  useReactFlow,
} from "reactflow";
import "reactflow/dist/style.css";

import useFlowStore from "../store/flowStore";
import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";
import { NODE_TYPES } from "../constants/workflow";
import { generateId } from "../lib/utils";
import {
  TriggerNode,
  MessageNode,
  FollowNode,
  ConditionNode,
  WaitNode,
} from "../components/nodes";

const nodeTypes = {
  [NODE_TYPES.TRIGGER]: TriggerNode,
  [NODE_TYPES.ACTION_MESSAGE]: MessageNode,
  [NODE_TYPES.ACTION_FOLLOW]: FollowNode,
  [NODE_TYPES.CONDITION]: ConditionNode,
  [NODE_TYPES.WAIT]: WaitNode,
};

const BuilderContent = () => {
  const reactFlowWrapper = useRef(null);
  const { project } = useReactFlow();

  const nodes = useFlowStore((state) => state.nodes);
  const edges = useFlowStore((state) => state.edges);
  const onNodesChange = useFlowStore((state) => state.onNodesChange);
  const onEdgesChange = useFlowStore((state) => state.onEdgesChange);
  const onConnect = useFlowStore((state) => state.onConnect);
  const addNode = useFlowStore((state) => state.addNode);
  const setSelectedNode = useFlowStore((state) => state.setSelectedNode);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const type = event.dataTransfer.getData("application/reactflow");
      if (typeof type === "undefined" || !type) return;

      const position = project({
        x:
          event.clientX - reactFlowWrapper.current.getBoundingClientRect().left,
        y: event.clientY - reactFlowWrapper.current.getBoundingClientRect().top,
      });

      const newNode = {
        id: generateId(),
        type,
        position,
        data: { label: "New Node" },
      };

      addNode(newNode);
    },
    [project, addNode]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onNodeClick = useCallback(
    (_, node) => {
      setSelectedNode(node.id);
    },
    [setSelectedNode]
  );

  const onPaneClick = useCallback(() => {
    setSelectedNode(null);
  }, [setSelectedNode]);

  return (
    <div className="flex flex-col h-screen w-full">
      <Header onSave={() => console.log("Saving...")} />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar />

        <div
          className="flex-1 h-full bg-gray-50 relative"
          ref={reactFlowWrapper}
        >
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            nodeTypes={nodeTypes}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onNodeClick={onNodeClick}
            onPaneClick={onPaneClick}
            fitView
          >
            <Background gap={12} size={1} />
            <Controls />
          </ReactFlow>
        </div>
      </div>
    </div>
  );
};

const Builder = () => (
  <ReactFlowProvider>
    <BuilderContent />
  </ReactFlowProvider>
);

export default Builder;
