export const NODE_TYPES = {
  TRIGGER: "trigger",
  ACTION_MESSAGE: "action_message",
  ACTION_FOLLOW: "action_follow",
  CONDITION: "condition",
  WAIT: "wait",
};

export const INITIAL_NODES = [
  {
    id: "start-node-1",
    type: NODE_TYPES.TRIGGER,
    position: { x: 250, y: 50 },
    data: { label: "Start Trigger" },
    deletable: false,
  },
];
