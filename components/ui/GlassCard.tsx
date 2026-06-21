import React, { ReactNode } from "react";

// Design tokens (import if needed)
import { colors, radii } from "../../designTokens";

const { card } = colors;
const { xl: rxl } = radii;

interface GlassCardProps {
  children: ReactNode;
  style?: React.CSSProperties;
}

export default function GlassCard({ children, style }: GlassCardProps) {
  const baseStyle: React.CSSProperties = {
    background: `rgba(255,255,255,0.12)`,
    backdropFilter: "blur(12px)",
    borderRadius: rxl,
    border: `1px solid ${card}`,
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
    padding: 16,
    ...style,
  };
  return <div style={baseStyle}>{children}</div>;
}
