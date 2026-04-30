// Wireframe primitives — sketchy boxes, lines, icons, placeholder elements
// Hand-drawn vibe: pen-on-paper feel using SVG filters + inline strokes

const wfInk = '#1f1b18';
const wfMuted = '#7a716a';
const wfPaper = '#fbf8f1';
const wfRuby = '#c2776e'; // Marnie's coat
const wfRubyLight = '#e8c5be';

// Inject sketchy filter once
if (typeof document !== 'undefined' && !document.getElementById('wf-defs')) {
  const svgDefs = document.createElement('div');
  svgDefs.id = 'wf-defs';
  svgDefs.style.cssText = 'position:absolute;width:0;height:0;overflow:hidden;';
  svgDefs.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="wfRough" x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="2" seed="3"/>
          <feDisplacementMap in="SourceGraphic" scale="1.6"/>
        </filter>
        <filter id="wfRoughHi" x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="2" seed="7"/>
          <feDisplacementMap in="SourceGraphic" scale="2.4"/>
        </filter>
        <pattern id="wfHatch" patternUnits="userSpaceOnUse" width="6" height="6" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="6" stroke="${wfMuted}" stroke-width="0.7" opacity="0.4"/>
        </pattern>
        <pattern id="wfDots" patternUnits="userSpaceOnUse" width="8" height="8">
          <circle cx="2" cy="2" r="0.7" fill="${wfMuted}" opacity="0.5"/>
        </pattern>
      </defs>
    </svg>
  `;
  document.body.appendChild(svgDefs);
}

// Sketchy box — rectangular outline with hand-drawn wobble
function WfBox({ children, w, h, fill = 'transparent', stroke = wfInk, strokeWidth = 1.5, radius = 6, dashed = false, style = {}, hatch = false, onClick, rough = true }) {
  const id = React.useId();
  return (
    <div onClick={onClick} style={{ position: 'relative', width: w, height: h, ...style }}>
      <svg width="100%" height="100%" viewBox={`0 0 ${typeof w === 'number' ? w : 100} ${typeof h === 'number' ? h : 100}`} preserveAspectRatio="none" style={{ position: 'absolute', inset: 0, overflow: 'visible' }}>
        <rect x="2" y="2" width={(typeof w === 'number' ? w : 100) - 4} height={(typeof h === 'number' ? h : 100) - 4}
          rx={radius} ry={radius}
          fill={hatch ? 'url(#wfHatch)' : fill}
          stroke={stroke} strokeWidth={strokeWidth}
          strokeDasharray={dashed ? '4 3' : undefined}
          filter={rough ? 'url(#wfRough)' : undefined}
          vectorEffect="non-scaling-stroke" />
      </svg>
      {children && <div style={{ position: 'relative', width: '100%', height: '100%' }}>{children}</div>}
    </div>
  );
}

// Sketchy circle
function WfCircle({ size = 40, fill = 'transparent', stroke = wfInk, strokeWidth = 1.5, hatch = false, style = {}, children }) {
  return (
    <div style={{ position: 'relative', width: size, height: size, ...style }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ position: 'absolute', inset: 0, overflow: 'visible' }}>
        <circle cx={size / 2} cy={size / 2} r={size / 2 - 2}
          fill={hatch ? 'url(#wfHatch)' : fill}
          stroke={stroke} strokeWidth={strokeWidth}
          filter="url(#wfRough)" />
      </svg>
      {children && <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{children}</div>}
    </div>
  );
}

// Hand-drawn line (squiggle-ish using path)
function WfLine({ length = 100, vertical = false, stroke = wfInk, strokeWidth = 1.2, dashed = false, style = {} }) {
  const w = vertical ? 8 : length;
  const h = vertical ? length : 8;
  const path = vertical
    ? `M 4 0 Q 3.5 ${length/4} 4 ${length/2} T 4 ${length}`
    : `M 0 4 Q ${length/4} 3.5 ${length/2} 4 T ${length} 4`;
  return (
    <svg width={w} height={h} style={style}>
      <path d={path} stroke={stroke} strokeWidth={strokeWidth}
        strokeDasharray={dashed ? '4 3' : undefined}
        fill="none" strokeLinecap="round" />
    </svg>
  );
}

// Placeholder image — hatched box with a diagonal X (photographic placeholder)
function WfImage({ w, h, label, style = {}, radius = 8, photo = false }) {
  const id = React.useId();
  return (
    <div style={{ position: 'relative', width: w, height: h, ...style }}>
      <svg width="100%" height="100%" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" style={{ position: 'absolute', inset: 0, overflow: 'visible' }}>
        <rect x="2" y="2" width={w - 4} height={h - 4} rx={radius} ry={radius}
          fill={photo ? '#f1e9e0' : 'url(#wfHatch)'} stroke={wfInk} strokeWidth="1.4"
          filter="url(#wfRough)" />
        {photo && (
          <>
            <line x1="2" y1="2" x2={w - 2} y2={h - 2} stroke={wfMuted} strokeWidth="1" opacity="0.5"/>
            <line x1={w - 2} y1="2" x2="2" y2={h - 2} stroke={wfMuted} strokeWidth="1" opacity="0.5"/>
          </>
        )}
      </svg>
      {label && (
        <div style={{
          position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: '"Caveat", cursive', fontSize: 16, color: wfMuted, fontStyle: 'italic',
          textAlign: 'center', padding: 8,
        }}>{label}</div>
      )}
    </div>
  );
}

// Wavy underline — for emphasized text
function WfUnderline({ width = 80, color = wfRuby, style = {} }) {
  return (
    <svg width={width} height="6" viewBox={`0 0 ${width} 6`} style={style}>
      <path d={`M 2 3 Q ${width/4} 1 ${width/2} 3 T ${width-2} 3`}
        stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" />
    </svg>
  );
}

// Sketchy "X" close icon
function WfX({ size = 14, color = wfInk }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14">
      <path d="M 2 2 Q 7 7 12 12" stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round" filter="url(#wfRough)"/>
      <path d="M 12 2 Q 7 7 2 12" stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round" filter="url(#wfRough)"/>
    </svg>
  );
}

// Hand-drawn arrow
function WfArrow({ from, to, color = wfRuby, strokeWidth = 2, dashed = true, label }) {
  // from/to: {x, y}
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const mid = { x: (from.x + to.x) / 2, y: (from.y + to.y) / 2 };
  // curve
  const cp = { x: mid.x + dy * 0.15, y: mid.y - dx * 0.15 };
  const ang = Math.atan2(to.y - cp.y, to.x - cp.x);
  const ah = 12;
  const a1 = { x: to.x - ah * Math.cos(ang - 0.4), y: to.y - ah * Math.sin(ang - 0.4) };
  const a2 = { x: to.x - ah * Math.cos(ang + 0.4), y: to.y - ah * Math.sin(ang + 0.4) };

  const minX = Math.min(from.x, to.x, cp.x) - 30;
  const minY = Math.min(from.y, to.y, cp.y) - 30;
  const maxX = Math.max(from.x, to.x, cp.x) + 30;
  const maxY = Math.max(from.y, to.y, cp.y) + 30;

  return (
    <svg style={{ position: 'absolute', left: minX, top: minY, pointerEvents: 'none', overflow: 'visible' }}
      width={maxX - minX} height={maxY - minY}>
      <g transform={`translate(${-minX}, ${-minY})`}>
        <path d={`M ${from.x} ${from.y} Q ${cp.x} ${cp.y} ${to.x} ${to.y}`}
          stroke={color} strokeWidth={strokeWidth} fill="none"
          strokeDasharray={dashed ? '6 4' : undefined}
          strokeLinecap="round"
          filter="url(#wfRoughHi)" />
        <path d={`M ${a1.x} ${a1.y} L ${to.x} ${to.y} L ${a2.x} ${a2.y}`}
          stroke={color} strokeWidth={strokeWidth} fill="none" strokeLinecap="round" strokeLinejoin="round"
          filter="url(#wfRoughHi)" />
        {label && (
          <text x={cp.x} y={cp.y - 8}
            fontFamily="Caveat, cursive" fontSize="20" fill={color}
            textAnchor="middle">{label}</text>
        )}
      </g>
    </svg>
  );
}

// Annotation — handwritten note pointing at something
function WfNote({ children, top, left, right, bottom, width = 140, rotate = -2, anchor = 'right' }) {
  return (
    <div style={{
      position: 'absolute', top, left, right, bottom, width,
      fontFamily: '"Caveat", cursive', fontSize: 17, lineHeight: 1.15,
      color: wfRuby, transform: `rotate(${rotate}deg)`,
      pointerEvents: 'none', zIndex: 4,
    }}>
      {children}
    </div>
  );
}

// Status bar mock (sketchy)
function WfStatusBar() {
  return (
    <div style={{
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      padding: '14px 24px 8px', fontFamily: '"Architects Daughter", cursive',
      fontSize: 13, color: wfInk, fontWeight: 700,
    }}>
      <span>9:41</span>
      <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
        <span style={{ fontSize: 11 }}>•••</span>
        <span style={{ fontSize: 11 }}>◐</span>
        <WfBox w={22} h={10} radius={2} strokeWidth={1} rough={false} />
      </div>
    </div>
  );
}

// "Tap target" — handwritten button
function WfButton({ children, w = 240, h = 44, primary = false, dashed = false, style = {}, onClick, icon }) {
  return (
    <div onClick={onClick} style={{ position: 'relative', width: w, height: h, cursor: onClick ? 'pointer' : 'default', ...style }}>
      <svg width="100%" height="100%" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" style={{ position: 'absolute', inset: 0, overflow: 'visible' }}>
        <rect x="2" y="2" width={w - 4} height={h - 4} rx={h / 2} ry={h / 2}
          fill={primary ? wfInk : 'transparent'}
          stroke={wfInk} strokeWidth={primary ? 0 : 1.5}
          strokeDasharray={dashed ? '5 3' : undefined}
          filter="url(#wfRough)" />
      </svg>
      <div style={{
        position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
        fontFamily: '"Architects Daughter", cursive', fontSize: 15,
        color: primary ? wfPaper : wfInk, fontWeight: 700,
      }}>
        {icon}
        {children}
      </div>
    </div>
  );
}

// Tab icon — drawn glyphs (simple)
function WfTabIcon({ kind, active = false, size = 22 }) {
  const c = active ? wfInk : wfMuted;
  const sw = active ? 1.8 : 1.4;
  const common = { stroke: c, strokeWidth: sw, fill: 'none', strokeLinecap: 'round', strokeLinejoin: 'round', filter: 'url(#wfRough)' };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" style={{ overflow: 'visible' }}>
      {kind === 'home' && (
        // house
        <g {...common}>
          <path d="M 3 11 L 12 4 L 21 11" />
          <path d="M 5 10 L 5 20 L 19 20 L 19 10" />
          <path d="M 10 20 L 10 14 L 14 14 L 14 20" />
        </g>
      )}
      {kind === 'food' && (
        // bowl
        <g {...common}>
          <path d="M 3 12 Q 12 11 21 12" />
          <path d="M 4 12 Q 5 19 12 19.5 Q 19 19 20 12" />
          <path d="M 8 8 Q 9 6 10 8" />
          <path d="M 12 7 Q 13 5 14 7" />
        </g>
      )}
      {kind === 'health' && (
        // heart + plus
        <g {...common}>
          <path d="M 12 19 Q 4 14 4 9 Q 4 5 8 5 Q 11 5 12 8 Q 13 5 16 5 Q 20 5 20 9 Q 20 14 12 19 Z" />
          <path d="M 12 8.5 L 12 13" />
          <path d="M 10 10.7 L 14 10.7" />
        </g>
      )}
      {kind === 'iq' && (
        // brain/lightbulb
        <g {...common}>
          <path d="M 9 4 Q 6 4 6 8 Q 6 10 7 11 L 7 14 L 11 14 L 11 11 Q 12 10 12 8 Q 12 4 9 4 Z" />
          <path d="M 14 6 Q 18 6 18 10 Q 18 12 17 13 L 17 16 L 13 16 L 13 13" />
          <path d="M 8 16 L 10 16" />
          <path d="M 14 18 L 16 18" />
        </g>
      )}
      {kind === 'user' && (
        // person
        <g {...common}>
          <circle cx="12" cy="8" r="3.5" />
          <path d="M 5 20 Q 5 14 12 14 Q 19 14 19 20" />
        </g>
      )}
    </svg>
  );
}

// Tab bar — bottom of phone, with text labels (style 2 from question)
function WfTabBar({ active = 'home', onChange }) {
  const tabs = [
    { id: 'home', label: 'Home' },
    { id: 'food', label: 'Food' },
    { id: 'health', label: 'Health' },
    { id: 'iq', label: 'IQ' },
  ];
  return (
    <div style={{
      position: 'absolute', bottom: 0, left: 0, right: 0,
      paddingTop: 10, paddingBottom: 28, paddingInline: 12,
      borderTop: `1px solid ${wfInk}`,
      display: 'flex', justifyContent: 'space-around',
      background: wfPaper,
    }}>
      {tabs.map((t) => (
        <div key={t.id} onClick={() => onChange?.(t.id)}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, cursor: 'pointer', position: 'relative' }}>
          <WfTabIcon kind={t.id} active={t.id === active} />
          <div style={{
            fontFamily: '"Architects Daughter", cursive', fontSize: 11,
            color: t.id === active ? wfInk : wfMuted,
            fontWeight: t.id === active ? 700 : 400,
          }}>{t.label}</div>
          {t.id === active && (
            <WfUnderline width={28} color={wfRuby} style={{ marginTop: -2 }} />
          )}
        </div>
      ))}
    </div>
  );
}

Object.assign(window, {
  WfBox, WfCircle, WfLine, WfImage, WfUnderline, WfX, WfArrow, WfNote,
  WfStatusBar, WfButton, WfTabIcon, WfTabBar,
  wfInk, wfMuted, wfPaper, wfRuby, wfRubyLight,
});
