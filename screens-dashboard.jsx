// Main dashboard variations — overview above tabs
// All include WfTabBar at bottom

// Settings cog icon — clickable, top-right
function WfSettingsIcon({ size = 36, onClick }) {
  return (
    <div onClick={onClick} style={{
      width: size, height: size, position: 'relative',
      cursor: onClick ? 'pointer' : 'default',
    }}>
      <svg width={size} height={size} viewBox="0 0 36 36" style={{ overflow: 'visible' }}>
        <circle cx="18" cy="18" r="16" fill="transparent" stroke={wfInk} strokeWidth="1.4"
          strokeDasharray="3 2" filter="url(#wfRough)" />
        <g stroke={wfInk} strokeWidth="1.5" fill="none" strokeLinecap="round" filter="url(#wfRough)">
          <circle cx="18" cy="18" r="4" />
          <path d="M 18 8 L 18 11" />
          <path d="M 18 25 L 18 28" />
          <path d="M 8 18 L 11 18" />
          <path d="M 25 18 L 28 18" />
          <path d="M 11 11 L 13 13" />
          <path d="M 23 23 L 25 25" />
          <path d="M 25 11 L 23 13" />
          <path d="M 13 23 L 11 25" />
        </g>
      </svg>
    </div>
  );
}

function DashA() {
  // Hero card + quick actions grid + today summary
  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', background: wfPaper, overflow: 'hidden' }}>
      <WfStatusBarAbsolute />
      {/* greeting + settings */}
      <div style={{ padding: '52px 22px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div style={{ fontFamily: '"Architects Daughter", cursive', fontSize: 12, color: wfMuted, letterSpacing: 0.5 }}>
            GOOD MORNING
          </div>
          <div style={{ fontFamily: '"Caveat", cursive', fontSize: 34, color: wfInk, fontWeight: 700, lineHeight: 1, marginTop: 2 }}>
            Hi, Marnie!
          </div>
        </div>
        <WfSettingsIcon />
      </div>

      {/* Hero card */}
      <div style={{ padding: '8px 18px 0' }}>
        <WfBox w={324} h={120} radius={16} fill="#fff">
          <div style={{ position: 'absolute', inset: 0, padding: 14, display: 'flex', gap: 14, alignItems: 'center' }}>
            <WfCircle size={84} hatch>
              <div style={{ fontFamily: '"Caveat", cursive', fontSize: 12, color: wfMuted }}>photo</div>
            </WfCircle>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: '"Caveat", cursive', fontSize: 24, color: wfInk, fontWeight: 700, lineHeight: 1 }}>Marnie</div>
              <div style={{ fontFamily: '"Architects Daughter", cursive', fontSize: 11, color: wfMuted, marginTop: 4 }}>
                cavoodle · 2yo · 6.4kg
              </div>
              <div style={{ display: 'flex', gap: 6, marginTop: 8 }}>
                <WfBox w={64} h={22} radius={11} hatch><div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: '"Architects Daughter", cursive', fontSize: 10, color: wfInk }}>★ healthy</div></WfBox>
                <WfBox w={50} h={22} radius={11}><div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: '"Architects Daughter", cursive', fontSize: 10, color: wfInk }}>day 14</div></WfBox>
              </div>
            </div>
          </div>
        </WfBox>
      </div>

      {/* Quick actions grid */}
      <div style={{ padding: '14px 18px 0' }}>
        <div style={{ fontFamily: '"Architects Daughter", cursive', fontSize: 12, color: wfMuted, letterSpacing: 0.5, marginBottom: 8 }}>
          QUICK ADD
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          {[
            { i: 'food', l: 'Log meal' },
            { i: 'health', l: 'Treatment' },
            { i: 'iq', l: 'New trick' },
            { i: 'food', l: 'Treat / toy' },
          ].map((q, i) => (
            <WfBox key={i} w="100%" h={62} radius={12}>
              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', gap: 10, paddingLeft: 14 }}>
                <WfTabIcon kind={q.i} active size={20} />
                <div style={{ fontFamily: '"Architects Daughter", cursive', fontSize: 13, color: wfInk, fontWeight: 700 }}>+ {q.l}</div>
              </div>
            </WfBox>
          ))}
        </div>
      </div>

      {/* Today list */}
      <div style={{ padding: '16px 18px 0' }}>
        <div style={{ fontFamily: '"Architects Daughter", cursive', fontSize: 12, color: wfMuted, letterSpacing: 0.5, marginBottom: 6 }}>
          TODAY
        </div>
        <WfBox w={324} h={104} radius={12} fill="#fff">
          <div style={{ position: 'absolute', inset: 0, padding: '8px 14px', display: 'flex', flexDirection: 'column', justifyContent: 'space-around' }}>
            {['7:30am  · breakfast (Lyka beef)', '12:00pm · midday treat — pupcake', '6:00pm  · dinner — pending'].map((t, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 14, height: 14, border: `1.4px solid ${wfInk}`, borderRadius: 7, background: i < 2 ? wfRuby : 'transparent' }} />
                <div style={{ fontFamily: '"Architects Daughter", cursive', fontSize: 12, color: wfInk }}>{t}</div>
              </div>
            ))}
          </div>
        </WfBox>
      </div>

      <WfTabBar active="home" />
    </div>
  );
}

function DashB() {
  // Stat cards focused: 4 big stats at top, recent activity below
  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', background: wfPaper, overflow: 'hidden' }}>
      <WfStatusBarAbsolute />
      <div style={{ padding: '50px 22px 8px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <div style={{ fontFamily: '"Caveat", cursive', fontSize: 30, color: wfInk, fontWeight: 700, lineHeight: 1 }}>Marnie's day</div>
          <div style={{ fontFamily: '"Architects Daughter", cursive', fontSize: 11, color: wfMuted, marginTop: 4 }}>Tue · Apr 26</div>
        </div>
        <WfSettingsIcon />
      </div>

      <div style={{ padding: '12px 18px 0', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        {[
          { l: 'Meals', v: '2 / 3', sub: 'today' },
          { l: 'Treatments', v: '12d', sub: 'til next flea' },
          { l: 'Tricks', v: '11', sub: 'learned' },
          { l: 'Spend', v: '$148', sub: 'this month' },
        ].map((s, i) => (
          <WfBox key={i} w="100%" h={86} radius={12} fill="#fff">
            <div style={{ position: 'absolute', inset: 0, padding: '10px 12px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div style={{ fontFamily: '"Architects Daughter", cursive', fontSize: 10, color: wfMuted, letterSpacing: 0.5 }}>{s.l.toUpperCase()}</div>
              <div>
                <div style={{ fontFamily: '"Caveat", cursive', fontSize: 28, color: wfInk, fontWeight: 700, lineHeight: 1 }}>{s.v}</div>
                <div style={{ fontFamily: '"Architects Daughter", cursive', fontSize: 10, color: wfMuted, marginTop: 2 }}>{s.sub}</div>
              </div>
            </div>
          </WfBox>
        ))}
      </div>

      {/* upcoming */}
      <div style={{ padding: '16px 18px 0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 6 }}>
          <div style={{ fontFamily: '"Architects Daughter", cursive', fontSize: 12, color: wfMuted, letterSpacing: 0.5 }}>UPCOMING</div>
          <div style={{ fontFamily: '"Architects Daughter", cursive', fontSize: 11, color: wfRuby }}>see all →</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {[
            { d: 'May 8', t: 'Bravecto · flea + tick', tag: 'health' },
            { d: 'May 22', t: 'Vet checkup · annual', tag: 'health' },
            { d: 'Jun 3', t: 'Worming dose', tag: 'health' },
          ].map((u, i) => (
            <WfBox key={i} w={324} h={48} radius={10}>
              <div style={{ position: 'absolute', inset: 0, padding: '0 12px', display: 'flex', alignItems: 'center', gap: 10 }}>
                <WfBox w={48} h={28} radius={6} fill={wfRubyLight} strokeWidth={0}>
                  <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: '"Architects Daughter", cursive', fontSize: 10, color: wfInk, fontWeight: 700 }}>{u.d}</div>
                </WfBox>
                <div style={{ flex: 1, fontFamily: '"Architects Daughter", cursive', fontSize: 12, color: wfInk }}>{u.t}</div>
                <WfTabIcon kind={u.tag} size={18} />
              </div>
            </WfBox>
          ))}
        </div>
      </div>

      <WfTabBar active="home" />
    </div>
  );
}

function DashC() {
  // Scrapbook/journal feel: single big "today" card, timeline-style entries
  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', background: wfPaper, overflow: 'hidden' }}>
      <WfStatusBarAbsolute />
      <div style={{ padding: '50px 22px 6px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ fontFamily: '"Caveat", cursive', fontSize: 32, color: wfInk, fontWeight: 700, lineHeight: 1 }}>Marnie</div>
        <WfSettingsIcon />
      </div>
      <div style={{ padding: '0 22px', fontFamily: '"Architects Daughter", cursive', fontSize: 11, color: wfMuted }}>
        ✦ Tuesday, April 26
      </div>

      {/* big photo card */}
      <div style={{ padding: '12px 18px 0' }}>
        <WfBox w={324} h={148} radius={14} fill="#fff">
          <div style={{ position: 'absolute', inset: 0, padding: 10, display: 'flex', gap: 12 }}>
            <WfImage w={128} h={128} label="today's pic" photo radius={10} />
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              <div style={{ fontFamily: '"Caveat", cursive', fontSize: 22, color: wfInk, lineHeight: 1, marginTop: 4 }}>Today</div>
              <div style={{ fontFamily: '"Architects Daughter", cursive', fontSize: 11, color: wfMuted, marginTop: 6, lineHeight: 1.4 }}>
                fed twice · walked 1.4km · 1 new trick attempted
              </div>
              <div style={{ flex: 1 }} />
              <WfButton w={140} h={28}>+ add note</WfButton>
            </div>
          </div>
        </WfBox>
      </div>

      {/* timeline */}
      <div style={{ padding: '14px 22px 0' }}>
        <div style={{ fontFamily: '"Architects Daughter", cursive', fontSize: 12, color: wfMuted, letterSpacing: 0.5, marginBottom: 8 }}>
          RECENT
        </div>
        <div style={{ position: 'relative', paddingLeft: 18 }}>
          <div style={{ position: 'absolute', left: 4, top: 6, bottom: 6, borderLeft: `1px dashed ${wfMuted}` }} />
          {[
            { t: '7:30a', txt: 'Breakfast — Lyka · beef', icon: 'food' },
            { t: 'yest',  txt: 'Trick: roll over (3/5)',     icon: 'iq' },
            { t: 'Mon',   txt: 'Bathed · vanilla shampoo',  icon: 'health' },
            { t: 'Sun',   txt: 'New toy: ropey',            icon: 'iq' },
          ].map((e, i) => (
            <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 10, position: 'relative' }}>
              <div style={{ position: 'absolute', left: -18, top: 6, width: 10, height: 10, borderRadius: 5, background: wfRuby }} />
              <div style={{ width: 36, fontFamily: '"Architects Daughter", cursive', fontSize: 10, color: wfMuted }}>{e.t}</div>
              <WfTabIcon kind={e.icon} size={16} />
              <div style={{ flex: 1, fontFamily: '"Architects Daughter", cursive', fontSize: 12, color: wfInk }}>{e.txt}</div>
            </div>
          ))}
        </div>
      </div>

      <WfTabBar active="home" />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// SETTINGS SCREEN — accessed via cog icon on Home
// ─────────────────────────────────────────────────────────────
function SettingsScreen() {
  const Row = ({ icon, label, detail, danger = false, last = false }) => (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px',
      borderBottom: last ? 'none' : `1px dashed ${wfMuted}`,
    }}>
      <div style={{ width: 22, fontFamily: '"Architects Daughter", cursive', fontSize: 14, color: danger ? wfRuby : wfInk, textAlign: 'center' }}>{icon}</div>
      <div style={{ flex: 1, fontFamily: '"Architects Daughter", cursive', fontSize: 13, color: danger ? wfRuby : wfInk, fontWeight: danger ? 700 : 400 }}>{label}</div>
      {detail && <div style={{ fontFamily: '"Architects Daughter", cursive', fontSize: 11, color: wfMuted }}>{detail}</div>}
      {!danger && <div style={{ fontFamily: '"Caveat", cursive', fontSize: 18, color: wfMuted, marginLeft: 4 }}>›</div>}
    </div>
  );
  const Section = ({ title, children }) => (
    <div style={{ marginBottom: 16 }}>
      <div style={{ fontFamily: '"Architects Daughter", cursive', fontSize: 11, color: wfMuted, letterSpacing: 0.6, padding: '0 22px 6px' }}>
        {title.toUpperCase()}
      </div>
      <div style={{ margin: '0 18px' }}>
        <WfBox w={324} h="auto" radius={12} fill="#fff" style={{ minHeight: 0 }}>
          <div style={{ position: 'relative' }}>{children}</div>
        </WfBox>
      </div>
    </div>
  );
  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', background: wfPaper, overflow: 'hidden' }}>
      <WfStatusBarAbsolute />
      {/* header w/ back */}
      <div style={{ padding: '50px 22px 8px', display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ fontFamily: '"Caveat", cursive', fontSize: 24, color: wfInk, lineHeight: 1 }}>‹</div>
        <div style={{ fontFamily: '"Caveat", cursive', fontSize: 32, color: wfInk, fontWeight: 700, lineHeight: 1 }}>Settings</div>
      </div>

      {/* profile card */}
      <div style={{ padding: '8px 18px 14px' }}>
        <WfBox w={324} h={88} radius={14} fill="#fff">
          <div style={{ position: 'absolute', inset: 0, padding: 12, display: 'flex', gap: 12, alignItems: 'center' }}>
            <WfCircle size={56} hatch />
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: '"Caveat", cursive', fontSize: 22, color: wfInk, fontWeight: 700, lineHeight: 1 }}>Sarah Doe</div>
              <div style={{ fontFamily: '"Architects Daughter", cursive', fontSize: 11, color: wfMuted, marginTop: 4 }}>sarah@example.com · Apple ID</div>
              <div style={{ fontFamily: '"Architects Daughter", cursive', fontSize: 11, color: wfRuby, marginTop: 4, borderBottom: `1px dashed ${wfRuby}`, display: 'inline-block' }}>edit profile</div>
            </div>
          </div>
        </WfBox>
      </div>

      <div style={{ overflow: 'auto', height: 'calc(100% - 240px)', paddingBottom: 90 }}>
        <Section title="Marnie">
          <Row icon="🐾" label="Pet profile" detail="cavoodle, 2yo" />
          <Row icon="⚖" label="Weight & measurements" />
          <Row icon="🩺" label="Vet details" detail="Northside Vet" last />
        </Section>

        <Section title="App">
          <Row icon="🔔" label="Notifications" detail="on" />
          <Row icon="$" label="Currency & units" detail="AUD · kg" />
          <Row icon="☾" label="Appearance" detail="system" />
          <Row icon="⌘" label="Reminders schedule" last />
        </Section>

        <Section title="Data">
          <Row icon="☁" label="Backup & sync" detail="iCloud" />
          <Row icon="↗" label="Export data" />
          <Row icon="⌫" label="Clear history" last />
        </Section>

        <Section title="Account">
          <Row icon="?" label="Help & support" />
          <Row icon="§" label="Privacy policy" />
          <Row icon="→" label="Log out" danger />
          <Row icon="✕" label="Delete account" danger last />
        </Section>

        <div style={{ textAlign: 'center', fontFamily: '"Architects Daughter", cursive', fontSize: 10, color: wfMuted, padding: '8px 0 16px' }}>
          MyMarnie · v1.0.0
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { DashA, DashB, DashC, SettingsScreen, WfSettingsIcon });
