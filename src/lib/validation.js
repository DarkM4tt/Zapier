import { NODE_TYPES } from "../constants/workflow";

export const validateWorkflow = (nodes, edges) => {
  const errors = [];

  if (nodes.length > 1) {
    const connectedNodeIds = new Set();
    edges.forEach((edge) => {
      connectedNodeIds.add(edge.source);
      connectedNodeIds.add(edge.target);
    });

    nodes.forEach((node) => {
      if (!connectedNodeIds.has(node.id)) {
        errors.push(`Node '${node.data.label}' is not connected.`);
      }
    });
  }

  nodes.forEach((node) => {
    switch (node.type) {
      case NODE_TYPES.ACTION_MESSAGE:
        if (!node.data.username || !node.data.message) {
          errors.push(
            `Node '${node.data.label}': Phone number and Message are required.`
          );
        }
        break;

      case NODE_TYPES.WAIT:
        if (!node.data.hours && !node.data.minutes) {
          errors.push(
            `Node '${node.data.label}': Timer must have at least some duration.`
          );
        }
        break;

      case NODE_TYPES.CONDITION:
        if (!node.data.conditionValue) {
          errors.push(
            `Node '${node.data.label}': Condition value is required.`
          );
        }
        break;

      default:
        break;
    }
  });

  return errors;
};
