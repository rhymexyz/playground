import * as d3 from "d3";
import { useEffect, useRef, useState } from "react";
import Blossom from "./Blossom";

type AtlasExperiment = { id: string; title: string; linkedExperiments: string[] };
type ExperimentTheme = { id: string; name: string; color: string; experiments: AtlasExperiment[] };

type NodeDatum = d3.SimulationNodeDatum & {
  id: string;
  title: string;
  href: string;
  themeId: string;
  themeColor: string;
  radius: number;
  clusterX: number;
  clusterY: number;
};

type SimLink = d3.SimulationLinkDatum<NodeDatum> & {
  source: NodeDatum;
  target: NodeDatum;
};

const WIDTH = 960;
const HEIGHT = 360;
const NODE_RADIUS = 26;

const CLUSTER_POSITIONS = [
  { x: 140, y: 95  },  // Wellness      — top-left
  { x: 820, y: 80  },  // Creativity    — top-right
  { x: 500, y: 175 },  // Learning      — centre
  { x: 170, y: 290 },  // Productivity  — bottom-left
  { x: 820, y: 295 },  // Relationships — bottom-right
];

function wrapText(title: string, maxChars = 11): string[] {
  const words = title.split(" ");
  const lines: string[] = [];
  let current = "";
  for (const word of words) {
    const next = current ? `${current} ${word}` : word;
    if (next.length <= maxChars) {
      current = next;
    } else {
      if (current) lines.push(current);
      current = word;
    }
  }
  if (current) lines.push(current);
  return lines.slice(0, 2);
}

function buildGraphData(themes: ExperimentTheme[]) {
  const nodeMap = new Map<string, NodeDatum>();

  themes.forEach((theme, themeIndex) => {
    const cluster = CLUSTER_POSITIONS[themeIndex % CLUSTER_POSITIONS.length];
    theme.experiments.forEach((exp, expIndex) => {
      nodeMap.set(exp.id, {
        id: exp.id,
        title: exp.title,
        href: `/experiments/${exp.id}`,
        themeId: theme.id,
        themeColor: theme.color,
        radius: NODE_RADIUS,
        clusterX: cluster.x,
        clusterY: cluster.y,
        x: cluster.x + (expIndex % 3 - 1) * 15,
        y: cluster.y + (Math.floor(expIndex / 3) - 0.5) * 15,
      });
    });
  });

  const linkSet = new Set<string>();
  const links: SimLink[] = [];

  themes.forEach((theme) => {
    theme.experiments.forEach((exp) => {
      for (const targetId of exp.linkedExperiments ?? []) {
        const key = [exp.id, targetId].sort().join("--");
        if (!linkSet.has(key)) {
          const src = nodeMap.get(exp.id);
          const tgt = nodeMap.get(targetId);
          if (src && tgt) {
            linkSet.add(key);
            links.push({ source: src, target: tgt } as SimLink);
          }
        }
      }
    });
  });

  return { nodes: Array.from(nodeMap.values()), links };
}

// Re-key blossom on each hover so animation replays
let blossomKey = 0;

export default function ExperimentsAtlas({ themes }: { themes: ExperimentTheme[] }) {
  const experiments = themes;
  const [positions, setPositions] = useState<Map<string, { x: number; y: number }>>(new Map());
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [currentBlossomKey, setCurrentBlossomKey] = useState(0);
  const simRef = useRef<d3.Simulation<NodeDatum, SimLink> | null>(null);
  const rafRef = useRef<number>(0);

  const { nodes, links } = buildGraphData(themes);

  const linkedIds = hoveredId
    ? new Set(
        links
          .filter((l) => l.source.id === hoveredId || l.target.id === hoveredId)
          .flatMap((l) => [l.source.id, l.target.id])
      )
    : null;

  useEffect(() => {
    const sim = d3
      .forceSimulation<NodeDatum>(nodes)
      .force("link", d3.forceLink<NodeDatum, SimLink>(links).id((d) => d.id).distance(70).strength(0.08))
      .force("charge", d3.forceManyBody<NodeDatum>().strength(-55))
      .force("collide", d3.forceCollide<NodeDatum>((d) => d.radius + 5).iterations(3))
      .force("clusterX", d3.forceX<NodeDatum>((d) => d.clusterX).strength(0.22))
      .force("clusterY", d3.forceY<NodeDatum>((d) => d.clusterY).strength(0.22))
      .alphaDecay(0.025)
      .velocityDecay(0.4);

    simRef.current = sim;

    sim.on("tick", () => {
      rafRef.current = requestAnimationFrame(() => {
        const map = new Map<string, { x: number; y: number }>();
        for (const node of nodes) {
          if (node.x !== undefined && node.y !== undefined) {
            map.set(node.id, { x: node.x, y: node.y });
          }
        }
        setPositions(new Map(map));
      });
    });

    return () => { sim.stop(); cancelAnimationFrame(rafRef.current); };
  }, []);

  function handleEnter(id: string) {
    setHoveredId(id);
    blossomKey += 1;
    setCurrentBlossomKey(blossomKey);
  }

  function handleLeave() {
    setHoveredId(null);
  }

  return (
    <>
      <style>{`
        .atlas-node-group {
          transition: opacity 220ms ease;
        }
        .atlas-node-group.dimmed {
          opacity: 0.22;
        }
        .atlas-planet {
          transition: transform 220ms cubic-bezier(0.34, 1.56, 0.64, 1), filter 220ms ease;
          transform-box: fill-box;
          transform-origin: center;
        }
        .atlas-planet.hovered {
          transform: scale(1.28);
          filter: url(#planet-glow);
        }
        .atlas-planet.linked {
          filter: url(#planet-glow-soft);
        }
        .atlas-link {
          transition: opacity 220ms ease, stroke-width 220ms ease, stroke 220ms ease;
        }
        .atlas-label {
          transition: opacity 220ms ease, font-size 220ms ease;
          pointer-events: none;
          user-select: none;
        }
        .atlas-label.hovered {
          font-size: 10px !important;
          font-weight: 700 !important;
          fill: #1a1512 !important;
          opacity: 1 !important;
        }
      `}</style>

      <div
        style={{
          width: "100%",
          aspectRatio: `${WIDTH} / ${HEIGHT}`,
          background: "rgba(255,252,247,0.6)",
          borderRadius: "2rem",
          overflow: "hidden",
        }}
      >
        <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} width="100%" height="100%" style={{ display: "block" }}>
          <defs>
            {/* Strong glow for hovered planet */}
            <filter id="planet-glow" x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="7" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            {/* Softer glow for linked planets */}
            <filter id="planet-glow-soft" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="3.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            {/* Subtle drop shadow for resting state */}
            <filter id="soft-shadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.07" />
            </filter>
          </defs>

          {/* ── Links ── */}
          <g>
            {links.map((link, i) => {
              const src = positions.get(link.source.id);
              const tgt = positions.get(link.target.id);
              if (!src || !tgt) return null;

              const isHighlighted = hoveredId && (link.source.id === hoveredId || link.target.id === hoveredId);
              const isDimmed = hoveredId && !isHighlighted;
              // Use the hovered node's color for highlighted links
              const hoveredNode = hoveredId ? nodes.find((n) => n.id === hoveredId) : null;
              const linkColor = isHighlighted && hoveredNode ? hoveredNode.themeColor : "#b0a89a";
              const darkerLink = isHighlighted && hoveredNode
                ? hoveredNode.themeColor.replace(/^#/, "")
                : null;

              return (
                <line
                  key={i}
                  className="atlas-link"
                  x1={src.x} y1={src.y}
                  x2={tgt.x} y2={tgt.y}
                  stroke={isHighlighted ? "#7a7060" : "#b0a89a"}
                  strokeWidth={isHighlighted ? 1.8 : 0.7}
                  opacity={isDimmed ? 0.05 : isHighlighted ? 0.65 : 0.16}
                  strokeDasharray={isHighlighted ? "none" : "none"}
                />
              );
            })}
          </g>

          {/* ── Nodes ── */}
          <g>
            {nodes.map((node) => {
              const pos = positions.get(node.id);
              if (!pos) return null;

              const isHovered = hoveredId === node.id;
              const isLinked = !isHovered && (linkedIds?.has(node.id) ?? false);
              const isDimmed = hoveredId != null && !isHovered && !isLinked;

              const labelLines = wrapText(node.title);

              return (
                <g
                  key={node.id}
                  className={`atlas-node-group${isDimmed ? " dimmed" : ""}`}
                  transform={`translate(${pos.x},${pos.y})`}
                  style={{ cursor: "pointer" }}
                  onMouseEnter={() => handleEnter(node.id)}
                  onMouseLeave={handleLeave}
                  onClick={() => { window.location.href = node.href; }}
                >
                  {/* Blossom effect on hover */}
                  {isHovered && (
                    <Blossom key={currentBlossomKey} color={node.themeColor} radius={node.radius} />
                  )}

                  {/* Planet circle */}
                  <circle
                    className={`atlas-planet${isHovered ? " hovered" : isLinked ? " linked" : ""}`}
                    r={node.radius}
                    fill={node.themeColor}
                    stroke={isHovered ? "#6a6050" : isLinked ? "#8a8070" : "#c8c0b5"}
                    strokeWidth={isHovered ? 1.8 : isLinked ? 1.2 : 0.7}
                    filter={isHovered ? undefined : "url(#soft-shadow)"}
                  />

                  {/* Label lines */}
                  {labelLines.map((line, li) => {
                    const offsetY = labelLines.length === 1 ? 0 : li === 0 ? -5.5 : 5.5;
                    return (
                      <text
                        key={li}
                        className={`atlas-label${isHovered ? " hovered" : ""}`}
                        x={0} y={offsetY}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fontSize={isHovered ? 9.5 : 8.5}
                        fontFamily="Avenir Next, Segoe UI, Helvetica Neue, sans-serif"
                        fontWeight={isHovered ? 700 : 500}
                        fill={isHovered ? "#1a1512" : "#2a2520"}
                        opacity={isHovered ? 1 : isLinked ? 0.9 : 0.85}
                      >
                        {line}
                      </text>
                    );
                  })}

                </g>
              );
            })}
          </g>

          {/* ── Theme cluster labels ── */}
          {themes.map((theme, themeIndex) => {
            const themeNodes = nodes.filter((n) => n.themeId === theme.id);
            const visiblePos = themeNodes
              .map((n) => positions.get(n.id))
              .filter(Boolean) as { x: number; y: number }[];
            if (visiblePos.length === 0) return null;
            const avgX = visiblePos.reduce((s, p) => s + p.x, 0) / visiblePos.length;
            const minY = Math.min(...visiblePos.map((p) => p.y)) - NODE_RADIUS - 14;
            const isActive = hoveredId != null && themeNodes.some((n) => n.id === hoveredId);
            return (
              <text
                key={theme.id}
                x={avgX} y={minY}
                textAnchor="middle"
                fontSize={9}
                fontFamily="Avenir Next, Segoe UI, Helvetica Neue, sans-serif"
                fontWeight={700}
                letterSpacing={2}
                fill={isActive ? "#3a3228" : "#7a7268"}
                opacity={isActive ? 1 : hoveredId ? 0.35 : 0.7}
                style={{ pointerEvents: "none", userSelect: "none", transition: "opacity 220ms, fill 220ms" }}
              >
                {theme.name.toUpperCase()}
              </text>
            );
          })}
        </svg>
      </div>
    </>
  );
}
