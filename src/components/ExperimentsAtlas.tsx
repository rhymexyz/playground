import * as d3 from "d3";
import { useEffect, useRef, useState } from "react";
import Blossom from "./Blossom";

// ── Types ─────────────────────────────────────────────────────────────────────

type AtlasExperiment = {
  id: string;
  title: string;
  linkedExperiments: string[];
  secondaryCategories: string[];
};
type ExperimentTheme = {
  id: string;
  name: string;
  color: string;
  experiments: AtlasExperiment[];
};

type BaseNode = d3.SimulationNodeDatum & { id: string };

type CategoryNode = BaseNode & {
  kind: "category";
  name: string;
  color: string;
  fx: number;
  fy: number;
};

type ExpNode = BaseNode & {
  kind: "exp";
  title: string;
  href: string;
  primaryCategory: string;
  color: string;
  radius: number;
};

type AnyNode = CategoryNode | ExpNode;

type SimLink = d3.SimulationLinkDatum<AnyNode> & {
  source: AnyNode;
  target: AnyNode;
  isPrimary: boolean;
};

// ── Constants ─────────────────────────────────────────────────────────────────

const WIDTH  = 960;
const HEIGHT = 420;
const EXP_R  = 26;
const CAT_R  = 40;

// Fixed positions for 5 category hub nodes
const CATEGORY_POSITIONS: Record<string, { x: number; y: number }> = {
  wellness:      { x: 155,  y: 120 },
  creativity:    { x: 805,  y: 120 },
  learning:      { x: 480,  y: 210 },
  productivity:  { x: 175,  y: 330 },
  relationships: { x: 785,  y: 330 },
};

// ── Helpers ───────────────────────────────────────────────────────────────────

function wrapText(title: string, maxChars = 12): string[] {
  const words = title.split(" ");
  const lines: string[] = [];
  let current = "";
  for (const word of words) {
    const next = current ? `${current} ${word}` : word;
    if (next.length <= maxChars) { current = next; }
    else { if (current) lines.push(current); current = word; }
  }
  if (current) lines.push(current);
  return lines.slice(0, 2);
}

function buildGraph(themes: ExperimentTheme[]) {
  const themeMap = new Map(themes.map((t) => [t.id, t]));
  const nodes: AnyNode[] = [];
  const links: SimLink[] = [];

  // Category hub nodes (fixed)
  for (const theme of themes) {
    const pos = CATEGORY_POSITIONS[theme.id] ?? { x: WIDTH / 2, y: HEIGHT / 2 };
    nodes.push({
      kind: "category",
      id: `cat:${theme.id}`,
      name: theme.name,
      color: theme.color,
      fx: pos.x,
      fy: pos.y,
    } as CategoryNode);
  }

  // Experiment nodes
  for (const theme of themes) {
    const pos = CATEGORY_POSITIONS[theme.id] ?? { x: WIDTH / 2, y: HEIGHT / 2 };
    for (const exp of theme.experiments) {
      nodes.push({
        kind: "exp",
        id: exp.id,
        title: exp.title,
        href: `/experiments/${exp.id}`,
        primaryCategory: theme.id,
        color: theme.color,
        radius: EXP_R,
        x: pos.x + (Math.random() - 0.5) * 60,
        y: pos.y + (Math.random() - 0.5) * 60,
      } as ExpNode);
    }
  }

  const nodeById = new Map(nodes.map((n) => [n.id, n]));

  // Links: experiment → primary category + secondary categories
  for (const theme of themes) {
    for (const exp of theme.experiments) {
      const expNode = nodeById.get(exp.id);
      const primaryCatNode = nodeById.get(`cat:${theme.id}`);
      if (expNode && primaryCatNode) {
        links.push({ source: expNode, target: primaryCatNode, isPrimary: true } as SimLink);
      }
      for (const secCatId of exp.secondaryCategories ?? []) {
        const secCatNode = nodeById.get(`cat:${secCatId}`);
        if (expNode && secCatNode) {
          links.push({ source: expNode, target: secCatNode, isPrimary: false } as SimLink);
        }
      }
    }
  }

  return { nodes, links, nodeById };
}

// ── Re-key blossom ────────────────────────────────────────────────────────────

let blossomKey = 0;

// ── Component ─────────────────────────────────────────────────────────────────

export default function ExperimentsAtlas({ themes }: { themes: ExperimentTheme[] }) {
  const [positions, setPositions] = useState<Map<string, { x: number; y: number }>>(new Map());
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [blossomTick, setBlossomTick] = useState(0);
  const simRef = useRef<d3.Simulation<AnyNode, SimLink> | null>(null);
  const rafRef = useRef<number>(0);

  const { nodes, links } = buildGraph(themes);

  // IDs connected to hovered node
  const connectedIds = hoveredId
    ? new Set(
        links
          .filter((l) => (l.source as AnyNode).id === hoveredId || (l.target as AnyNode).id === hoveredId)
          .flatMap((l) => [(l.source as AnyNode).id, (l.target as AnyNode).id])
      )
    : null;

  useEffect(() => {
    const sim = d3
      .forceSimulation<AnyNode>(nodes)
      .force(
        "link",
        d3.forceLink<AnyNode, SimLink>(links)
          .id((d) => d.id)
          .distance((l) => (l.isPrimary ? 90 : 140))
          .strength((l) => (l.isPrimary ? 0.55 : 0.18))
      )
      .force("charge", d3.forceManyBody<AnyNode>().strength((d) => d.kind === "category" ? -80 : -45))
      .force("collide", d3.forceCollide<AnyNode>((d) => (d.kind === "category" ? CAT_R + 8 : EXP_R + 6)).iterations(3))
      .alphaDecay(0.022)
      .velocityDecay(0.38);

    simRef.current = sim;

    sim.on("tick", () => {
      rafRef.current = requestAnimationFrame(() => {
        const map = new Map<string, { x: number; y: number }>();
        for (const n of nodes) {
          const x = n.kind === "category" ? (n as CategoryNode).fx : n.x;
          const y = n.kind === "category" ? (n as CategoryNode).fy : n.y;
          if (x !== undefined && y !== undefined) map.set(n.id, { x, y });
        }
        setPositions(new Map(map));
      });
    });

    return () => { sim.stop(); cancelAnimationFrame(rafRef.current); };
  }, []);

  function handleEnter(id: string) {
    setHoveredId(id);
    blossomKey += 1;
    setBlossomTick(blossomKey);
  }

  const expNodes  = nodes.filter((n): n is ExpNode      => n.kind === "exp");
  const catNodes  = nodes.filter((n): n is CategoryNode => n.kind === "category");

  return (
    <>
      <style>{`
        .atlas-node-group { transition: opacity 220ms ease; }
        .atlas-node-group.dimmed { opacity: 0.18; }
        .atlas-planet {
          transition: transform 220ms cubic-bezier(0.34,1.56,0.64,1), filter 220ms ease;
          transform-box: fill-box; transform-origin: center;
        }
        .atlas-planet.hovered { transform: scale(1.28); filter: url(#planet-glow); }
        .atlas-planet.linked  { filter: url(#planet-glow-soft); }
        .atlas-link { transition: opacity 220ms ease, stroke-width 220ms ease; }
        .atlas-label { pointer-events: none; user-select: none; transition: opacity 220ms ease; }
      `}</style>

      <div style={{
        width: "100%",
        aspectRatio: `${WIDTH} / ${HEIGHT}`,
        background: "rgba(255,252,247,0.6)",
        borderRadius: "2rem",
        overflow: "hidden",
      }}>
        <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} width="100%" height="100%" style={{ display: "block" }}>
          <defs>
            <filter id="planet-glow" x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="7" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
            <filter id="planet-glow-soft" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="3.5" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
            <filter id="soft-shadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.07" />
            </filter>
          </defs>

          {/* ── Links ── */}
          <g>
            {links.map((link, i) => {
              const src = positions.get((link.source as AnyNode).id);
              const tgt = positions.get((link.target as AnyNode).id);
              if (!src || !tgt) return null;
              const srcId = (link.source as AnyNode).id;
              const tgtId = (link.target as AnyNode).id;
              const isHighlighted = hoveredId && (srcId === hoveredId || tgtId === hoveredId);
              const isDimmed = hoveredId && !isHighlighted;

              // Shorten line so it stops at each node's edge, not its center
              const dx = tgt.x - src.x;
              const dy = tgt.y - src.y;
              const dist = Math.sqrt(dx * dx + dy * dy) || 1;
              const srcNode = (link.source as AnyNode);
              const tgtNode = (link.target as AnyNode);
              const srcR = srcNode.kind === "category" ? CAT_R : EXP_R;
              const tgtR = tgtNode.kind === "category" ? CAT_R : EXP_R;
              const x1 = src.x + (dx / dist) * srcR;
              const y1 = src.y + (dy / dist) * srcR;
              const x2 = tgt.x - (dx / dist) * tgtR;
              const y2 = tgt.y - (dy / dist) * tgtR;

              return (
                <line
                  key={i}
                  className="atlas-link"
                  x1={x1} y1={y1} x2={x2} y2={y2}
                  stroke={isHighlighted ? "#6a6050" : "#b0a89a"}
                  strokeWidth={isHighlighted ? 1.8 : link.isPrimary ? 1.0 : 0.5}
                  strokeDasharray={link.isPrimary ? "none" : "4 3"}
                  opacity={isDimmed ? 0.04 : isHighlighted ? 0.7 : link.isPrimary ? 0.22 : 0.12}
                />
              );
            })}
          </g>

          {/* ── Category hub nodes ── */}
          <g>
            {catNodes.map((cat) => {
              const pos = positions.get(cat.id);
              if (!pos) return null;
              const isActive = hoveredId !== null && connectedIds?.has(cat.id);
              const isDimmed = hoveredId !== null && !isActive;
              return (
                <g
                  key={cat.id}
                  className={`atlas-node-group${isDimmed ? " dimmed" : ""}`}
                  transform={`translate(${pos.x},${pos.y})`}
                >
                  {/* Hub circle */}
                  <circle
                    r={CAT_R}
                    fill={cat.color}
                    fillOpacity={isActive ? 0.55 : 0.3}
                    stroke={cat.color}
                    strokeWidth={isActive ? 2 : 1.2}
                    strokeOpacity={isActive ? 0.8 : 0.45}
                    filter="url(#soft-shadow)"
                  />
                  {/* Category label */}
                  <text
                    className="atlas-label"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize={9}
                    fontFamily="Avenir Next, Segoe UI, Helvetica Neue, sans-serif"
                    fontWeight={700}
                    letterSpacing={1.5}
                    fill={isActive ? "#2a2218" : "#5a5248"}
                    opacity={isDimmed ? 0.3 : isActive ? 1 : 0.75}
                  >
                    {cat.name.toUpperCase()}
                  </text>
                </g>
              );
            })}
          </g>

          {/* ── Experiment nodes ── */}
          <g>
            {expNodes.map((node) => {
              const pos = positions.get(node.id);
              if (!pos) return null;
              const isHovered = hoveredId === node.id;
              const isLinked  = !isHovered && (connectedIds?.has(node.id) ?? false);
              const isDimmed  = hoveredId != null && !isHovered && !isLinked;
              const labelLines = wrapText(node.title);

              return (
                <g
                  key={node.id}
                  className={`atlas-node-group${isDimmed ? " dimmed" : ""}`}
                  transform={`translate(${pos.x},${pos.y})`}
                  style={{ cursor: "pointer" }}
                  onMouseEnter={() => handleEnter(node.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  onClick={() => { window.location.href = node.href; }}
                >
                  {isHovered && <Blossom key={blossomTick} color={node.color} radius={node.radius} />}

                  <circle
                    className={`atlas-planet${isHovered ? " hovered" : isLinked ? " linked" : ""}`}
                    r={node.radius}
                    fill={node.color}
                    stroke={isHovered ? "#6a6050" : isLinked ? "#8a8070" : "#c8c0b5"}
                    strokeWidth={isHovered ? 1.8 : isLinked ? 1.2 : 0.7}
                    filter={isHovered ? undefined : "url(#soft-shadow)"}
                  />

                  {labelLines.map((line, li) => {
                    const oy = labelLines.length === 1 ? 0 : li === 0 ? -5.5 : 5.5;
                    return (
                      <text
                        key={li}
                        className="atlas-label"
                        x={0} y={oy}
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
        </svg>
      </div>
    </>
  );
}
