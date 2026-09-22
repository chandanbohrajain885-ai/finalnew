import { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import { Plus, Minus, RotateCw } from 'lucide-react';

/* ============================================================
   The InEra Atlas
   An orthographic globe drawn as plain SVG — graticule, office
   markers at real coordinates, great-circle arcs from the
   headquarters outward. Drag to turn it, scroll or use the
   buttons to zoom, click a marker to open it.

   Cities that sit close together (Belagavi, Bengaluru and Pune
   are only a few degrees apart) would otherwise print their
   labels on top of one another, so labels are laid out with a
   collision pass and joined to their marker by a leader line.
   Zooming in separates the markers themselves.
   ============================================================ */

const BASE_R = 140; // sphere radius at zoom 1
const VIEW = 440;
const C = VIEW / 2;
const RAD = Math.PI / 180;

const MIN_ZOOM = 1;
const MAX_ZOOM = 4;

/** Orthographic projection. Returns null when the point is on the far side. */
function project(lat, lng, lam0, phi0, r) {
  const phi = lat * RAD;
  const lam = lng * RAD + lam0;
  const cosPhi = Math.cos(phi);
  const sinPhi = Math.sin(phi);
  const cosLam = Math.cos(lam);
  const cosC = Math.sin(phi0) * sinPhi + Math.cos(phi0) * cosPhi * cosLam;
  if (cosC <= 0.001) return null;
  return {
    x: C + r * cosPhi * Math.sin(lam),
    y: C - r * (Math.cos(phi0) * sinPhi - Math.sin(phi0) * cosPhi * cosLam),
    depth: cosC,
  };
}

/** SVG path from lat/lng points, broken wherever the line crosses the limb. */
function pathFrom(points, lam0, phi0, r) {
  let d = '';
  let drawing = false;
  for (const [lat, lng] of points) {
    const p = project(lat, lng, lam0, phi0, r);
    if (!p) {
      drawing = false;
      continue;
    }
    d += `${drawing ? 'L' : 'M'}${p.x.toFixed(1)} ${p.y.toFixed(1)} `;
    drawing = true;
  }
  return d.trim();
}

function buildGraticule() {
  const lines = [];
  for (let lng = -180; lng < 180; lng += 30) {
    const pts = [];
    for (let lat = -80; lat <= 80; lat += 4) pts.push([lat, lng]);
    lines.push(pts);
  }
  for (let lat = -60; lat <= 60; lat += 30) {
    const pts = [];
    for (let lng = -180; lng <= 180; lng += 4) pts.push([lat, lng]);
    lines.push(pts);
  }
  return lines;
}

function greatCircle(a, b, steps = 48) {
  const [lat1, lon1] = [a.lat * RAD, a.lng * RAD];
  const [lat2, lon2] = [b.lat * RAD, b.lng * RAD];
  const d =
    2 *
    Math.asin(
      Math.sqrt(
        Math.sin((lat2 - lat1) / 2) ** 2 +
          Math.cos(lat1) * Math.cos(lat2) * Math.sin((lon2 - lon1) / 2) ** 2
      )
    );
  if (!d || Number.isNaN(d)) return [[a.lat, a.lng]];
  const out = [];
  for (let i = 0; i <= steps; i++) {
    const f = i / steps;
    const A = Math.sin((1 - f) * d) / Math.sin(d);
    const B = Math.sin(f * d) / Math.sin(d);
    const x = A * Math.cos(lat1) * Math.cos(lon1) + B * Math.cos(lat2) * Math.cos(lon2);
    const y = A * Math.cos(lat1) * Math.sin(lon1) + B * Math.cos(lat2) * Math.sin(lon2);
    const z = A * Math.sin(lat1) + B * Math.sin(lat2);
    out.push([Math.atan2(z, Math.sqrt(x * x + y * y)) / RAD, Math.atan2(y, x) / RAD]);
  }
  return out;
}

/**
 * Lay labels out so none of them overlap.
 * Front-most markers are placed first and keep the spot nearest their marker;
 * anything that would collide is nudged along until it finds clear air, and a
 * leader line is drawn back to the marker it belongs to.
 */
function layoutLabels(markers) {
  const LINE_H = 15;
  const placed = [];
  const out = [];

  const ordered = [...markers].sort((a, b) => b.p.depth - a.p.depth);

  for (const m of ordered) {
    const side = m.p.x > C ? -1 : 1; // push outward, away from the centre
    const width = Math.max(44, m.o.city.length * 6.1) + 12;
    let best = null;

    for (let step = 0; step < 16 && !best; step++) {
      // alternate: same line, then below, then above, widening each round
      const dy = Math.ceil(step / 2) * LINE_H * (step % 2 === 0 ? 1 : -1);
      const dx = side * (11 + Math.floor(step / 6) * 16);
      const x = m.p.x + dx;
      const y = m.p.y + dy;
      const box = {
        x1: side > 0 ? x : x - width,
        x2: side > 0 ? x + width : x,
        y1: y - LINE_H / 2,
        y2: y + LINE_H / 2,
      };
      const clash = placed.some(
        (b) => !(box.x2 < b.x1 || box.x1 > b.x2 || box.y2 < b.y1 || box.y1 > b.y2)
      );
      if (!clash) best = { x, y, box, side };
    }

    if (!best) {
      const x = m.p.x + side * 11;
      const y = m.p.y;
      best = {
        x,
        y,
        box: { x1: x - width, x2: x + width, y1: y - 7, y2: y + 7 },
        side,
      };
    }

    placed.push(best.box);
    out.push({ ...m, label: best });
  }

  // draw back-to-front so the nearest markers sit on top
  return out.reverse();
}

const GRATICULE = buildGraticule();

export default function Globe({
  offices = [],
  selectedId,
  onSelect,
  accent = '#C09B3A',
  fg = '#0A0A0C',
  showControls = true,
}) {
  const live = useMemo(() => offices.filter((o) => o.active !== false), [offices]);
  const hq = useMemo(() => live.find((o) => o.kind === 'hq') || live[0], [live]);

  const [rot, setRot] = useState({ lam: -78 * RAD, phi: 16 * RAD });
  const [zoom, setZoom] = useState(1);
  const [dragging, setDragging] = useState(false);
  const [hover, setHover] = useState(null);
  const spin = useRef(true);
  const drag = useRef(null);
  const target = useRef(null);

  const reduced =
    typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* idle rotation + eased travel to a selected office */
  useEffect(() => {
    if (reduced) return undefined;
    let raf;
    let last = performance.now();
    const step = (now) => {
      const dt = Math.min(64, now - last);
      last = now;
      setRot((r) => {
        if (target.current) {
          const { lam, phi } = target.current;
          const dl = lam - r.lam;
          const dp = phi - r.phi;
          if (Math.abs(dl) < 0.002 && Math.abs(dp) < 0.002) {
            target.current = null;
            return { lam, phi };
          }
          return { lam: r.lam + dl * 0.09, phi: r.phi + dp * 0.09 };
        }
        if (!spin.current) return r;
        return { ...r, lam: r.lam + 0.00012 * dt };
      });
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [reduced]);

  const focus = useCallback((o) => {
    if (!o) return;
    spin.current = false;
    target.current = {
      lam: -o.lng * RAD,
      phi: Math.max(-1.2, Math.min(1.2, o.lat * RAD)),
    };
  }, []);

  useEffect(() => {
    const o = live.find((x) => x.id === selectedId);
    if (o) focus(o);
  }, [selectedId, live, focus]);

  /* pointer drag */
  const onPointerDown = (e) => {
    spin.current = false;
    target.current = null;
    setDragging(true);
    drag.current = { x: e.clientX, y: e.clientY, lam: rot.lam, phi: rot.phi };
    e.currentTarget.setPointerCapture?.(e.pointerId);
  };
  const onPointerMove = (e) => {
    if (!drag.current) return;
    const dx = e.clientX - drag.current.x;
    const dy = e.clientY - drag.current.y;
    const k = 0.006 / zoom; // finer control the further you are zoomed in
    setRot({
      lam: drag.current.lam + dx * k,
      phi: Math.max(-1.2, Math.min(1.2, drag.current.phi + dy * k)),
    });
  };
  const endDrag = () => {
    drag.current = null;
    setDragging(false);
  };

  const onWheel = (e) => {
    if (!e.ctrlKey && Math.abs(e.deltaY) < 2) return;
    e.preventDefault();
    setZoom((z) => Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, z - e.deltaY * 0.002)));
  };

  const resume = () => {
    spin.current = true;
    target.current = null;
  };

  const { lam, phi } = rot;
  const r = BASE_R * zoom;

  const arcs = useMemo(() => {
    if (!hq) return [];
    return live.filter((o) => o.id !== hq.id).map((o) => ({ id: o.id, pts: greatCircle(hq, o) }));
  }, [live, hq]);

  const markers = useMemo(() => {
    const projected = live
      .map((o) => ({ o, p: project(o.lat, o.lng, lam, phi, r) }))
      .filter((m) => m.p);
    return layoutLabels(projected);
  }, [live, lam, phi, r]);

  return (
    <div className="relative select-none">
      <svg
        viewBox={`0 0 ${VIEW} ${VIEW}`}
        className={`w-full touch-none ${dragging ? 'cursor-grabbing' : 'cursor-grab'}`}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
        onWheel={onWheel}
        role="img"
        aria-label="Globe showing InEra Group office locations"
      >
        <defs>
          <radialGradient id="atlas-shade" cx="35%" cy="30%" r="75%">
            <stop offset="0%" stopColor={accent} stopOpacity="0.10" />
            <stop offset="65%" stopColor={accent} stopOpacity="0.03" />
            <stop offset="100%" stopColor={fg} stopOpacity="0.10" />
          </radialGradient>
          <clipPath id="atlas-clip">
            <circle cx={C} cy={C} r={r} />
          </clipPath>
        </defs>

        <circle cx={C} cy={C} r={r} fill="url(#atlas-shade)" />
        <circle cx={C} cy={C} r={r} fill="none" stroke={fg} strokeOpacity="0.2" strokeWidth="0.8" />
        <circle
          cx={C}
          cy={C}
          r={r + 12}
          fill="none"
          stroke={accent}
          strokeOpacity="0.16"
          strokeWidth="0.6"
        />

        <g clipPath="url(#atlas-clip)">
          <g fill="none" stroke={fg} strokeOpacity="0.16" strokeWidth="0.55">
            {GRATICULE.map((pts, i) => {
              const d = pathFrom(pts, lam, phi, r);
              return d ? <path key={i} d={d} /> : null;
            })}
          </g>

          <g fill="none" stroke={accent} strokeWidth="1.1" strokeLinecap="round">
            {arcs.map((a) => {
              const d = pathFrom(a.pts, lam, phi, r);
              if (!d) return null;
              const on = selectedId === a.id || hover === a.id;
              return <path key={a.id} d={d} strokeOpacity={on ? 0.95 : 0.38} />;
            })}
          </g>
        </g>

        {/* leader lines, drawn under the markers */}
        <g stroke={fg} strokeOpacity="0.28" strokeWidth="0.7">
          {markers.map(({ o, p, label }) => {
            const needsLeader = Math.abs(label.y - p.y) > 2;
            if (!needsLeader) return null;
            const anchorX = p.x + label.side * 5;
            return (
              <polyline
                key={`l-${o.id}`}
                fill="none"
                points={`${anchorX},${p.y} ${label.x - label.side * 4},${label.y} ${label.x},${label.y}`}
              />
            );
          })}
        </g>

        {markers.map(({ o, p, label }) => {
          const on = selectedId === o.id || hover === o.id;
          const dot = o.kind === 'hq' ? 5 : 3.6;
          return (
            <g
              key={o.id}
              onClick={(e) => {
                e.stopPropagation();
                onSelect?.(o);
              }}
              onPointerEnter={() => setHover(o.id)}
              onPointerLeave={() => setHover(null)}
              className="cursor-pointer"
            >
              {(on || o.kind === 'hq') && (
                <circle cx={p.x} cy={p.y} r={dot + 6} fill={accent} fillOpacity={on ? 0.2 : 0.1}>
                  <animate
                    attributeName="r"
                    values={`${dot + 3};${dot + 11};${dot + 3}`}
                    dur="2.8s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="fill-opacity"
                    values="0.26;0.02;0.26"
                    dur="2.8s"
                    repeatCount="indefinite"
                  />
                </circle>
              )}
              <circle
                cx={p.x}
                cy={p.y}
                r={dot}
                fill={accent}
                stroke="#fff"
                strokeWidth="1"
                strokeOpacity="0.85"
              />
              <text
                x={label.x}
                y={label.y + 3.4}
                textAnchor={label.side > 0 ? 'start' : 'end'}
                fontSize="10.5"
                fill={fg}
                fillOpacity={on ? 0.95 : 0.66}
                style={{ pointerEvents: 'none', fontWeight: on ? 600 : 400 }}
              >
                {o.city}
              </text>
            </g>
          );
        })}
      </svg>

      {showControls && (
        <div className="absolute bottom-1 right-1 flex flex-col gap-1">
          <GlobeBtn onClick={() => setZoom((z) => Math.min(MAX_ZOOM, z + 0.5))} label="Zoom in" fg={fg}>
            <Plus size={13} />
          </GlobeBtn>
          <GlobeBtn onClick={() => setZoom((z) => Math.max(MIN_ZOOM, z - 0.5))} label="Zoom out" fg={fg}>
            <Minus size={13} />
          </GlobeBtn>
          <GlobeBtn onClick={resume} label="Resume rotation" fg={fg}>
            <RotateCw size={12} />
          </GlobeBtn>
        </div>
      )}
    </div>
  );
}

function GlobeBtn({ onClick, label, children, fg }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      className="grid h-7 w-7 place-items-center rounded-sm border transition-opacity hover:opacity-70"
      style={{ borderColor: 'var(--rule)', color: fg, background: 'var(--bg)' }}
    >
      {children}
    </button>
  );
}
