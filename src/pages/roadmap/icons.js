import {
  Activity, Bot, Boxes, Braces, Brain, Cloud, Code2, Coffee, Cog, Container, Cpu, Database,
  GitBranch, Globe, LayoutGrid, Layers, LineChart, ListOrdered, Network, Radio, RefreshCw,
  Server, ShieldCheck, Sigma, Terminal, TreePine, Workflow,
} from "lucide-react";

// The backend stores icons as plain strings (Roadmap.iconName / topic.iconName).
const ICONS = {
  Activity, Bot, Boxes, Braces, Brain, Cloud, Code2, Coffee, Cog, Container, Cpu, Database,
  GitBranch, Globe, LayoutGrid, Layers, LineChart, ListOrdered, Network, Radio, RefreshCw,
  Server, ShieldCheck, Sigma, Terminal, TreePine, Workflow,
};

export const resolveIcon = (name) => ICONS[name] || Code2;