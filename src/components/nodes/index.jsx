import { Play, MessageSquare, UserPlus, GitBranch, Clock } from "lucide-react";
import BaseNode from "./BaseNode";

export const TriggerNode = ({ data, selected }) => (
  <BaseNode
    label={data.label ?? "Start"}
    icon={Play}
    selected={selected}
    isStart={true}
  />
);

export const MessageNode = ({ data, selected }) => (
  <BaseNode
    label={data.label ?? "Send Message"}
    icon={MessageSquare}
    selected={selected}
  />
);

export const FollowNode = ({ data, selected }) => (
  <BaseNode
    label={data.label ?? "Follow User"}
    icon={UserPlus}
    selected={selected}
  />
);

export const ConditionNode = ({ data, selected }) => (
  <BaseNode
    label={data.label ?? "Condition"}
    icon={GitBranch}
    selected={selected}
    isCondition={true}
  />
);

export const WaitNode = ({ data, selected }) => (
  <BaseNode
    label={data.label ?? "Wait Timer"}
    icon={Clock}
    selected={selected}
  />
);
