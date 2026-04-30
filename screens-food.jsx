// Food tab — sub-tabs: Diary, Menu, Analytics (top of page)
// Bottom WfTabBar shows "food" as the active main tab.

// ─────────────────────────────────────────────────────────────
// Top sub-tab bar (Diary · Menu · Analytics)
// ─────────────────────────────────────────────────────────────
function FoodTopTabs({ active = 'diary', onChange }) {
  const tabs = [
    { id: 'diary', label: 'Diary' },
    { id: 'menu', label: 'Menu' },
    { id: 'analytics', label: 'Analytics' },
  ];
  return (
    <div style={{
      display: 'flex', alignItems: 'flex-end', justifyContent: 'space-around',
      padding: '0 18px',
      borderBottom: `1px dashed ${wfMuted}`,
      marginTop: 6,
    }}>
      {tabs.map((t) => {
        const isActive = t.id === active;
        return (
          <div key={t.id} onClick={() => onChange?.(t.id)}
            style={{
              flex: 1, textAlign: 'center', cursor: 'pointer',
              padding: '10px 0 8px', position: 'relative',
            }}>
            <div style={{
              fontFamily: '"Architects Daughter", cursive',
              fontSize: 13,
              color: isActive ? wfInk : wfMuted,
              fontWeight: isActive ? 700 : 400,
              letterSpacing: 0.3,
            }}>{t.label}</div>
            {isActive && (
              <div style={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
                <WfUnderline width={42} color={wfRuby} />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// Page header — "Food" title + small date and a search/add affordance
function FoodHeader({ subtitle }) {
  return (
    <div style={{ padding: '50px 22px 6px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
      <div>
        <div style={{ fontFamily: '"Architects Daughter", cursive', fontSize: 11, color: wfMuted, letterSpacing: 0.5 }}>
          MARNIE'S
        </div>
        <div style={{ fontFamily: '"Caveat", cursive', fontSize: 34, color: wfInk, fontWeight: 700, lineHeight: 1, marginTop: 2 }}>
          Food
        </div>
        {subtitle && (
          <div style={{ fontFamily: '"Architects Daughter", cursive', fontSize: 11, color: wfMuted, marginTop: 4 }}>
            {subtitle}
          </div>
        )}
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        <WfCircle size={32}>
          <div style={{ fontFamily: '"Architects Daughter", cursive', fontSize: 13, color: wfInk }}>⌕</div>
        </WfCircle>
        <WfCircle size={32}>
          <div style={{ fontFamily: '"Architects Daughter", cursive', fontSize: 16, color: wfInk, fontWeight: 700 }}>+</div>
        </WfCircle>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// 1. DIARY — chronological log of meals/treats for today, with quick add
// ─────────────────────────────────────────────────────────────
function FoodDiary() {
  const meals = [
    { time: '7:30a',  name: 'Breakfast', detail: 'Lyka · beef bowl', qty: '120g', kcal: 168, done: true,  icon: 'food' },
    { time: '10:15a', name: 'Treat',     detail: 'Carrot stick',      qty: '1 pc',  kcal: 12,  done: true,  icon: 'food' },
    { time: '12:30p', name: 'Lunch',     detail: 'Pupcake (homemade)', qty: '½',    kcal: 95,  done: true,  icon: 'food' },
    { time: '3:00p',  name: 'Treat',     detail: 'Training reward',    qty: '4 pc',  kcal: 24,  done: false, icon: 'iq' },
    { time: '6:00p',  name: 'Dinner',    detail: 'Lyka · chicken',     qty: '120g', kcal: 175, done: false, icon: 'food' },
  ];
  const totalKcal = 312;
  const goalKcal = 480;
  const pct = Math.round((totalKcal / goalKcal) * 100);

  return (
    <div style={{ padding: '12px 18px 100px', overflow: 'auto', height: 'calc(100% - 142px)' }}>
      {/* Today summary card */}
      <WfBox w={324} h={92} radius={14} fill="#fff">
        <div style={{ position: 'absolute', inset: 0, padding: 12, display: 'flex', alignItems: 'center', gap: 14 }}>
          <WfCircle size={64} hatch>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: '"Caveat", cursive', fontSize: 22, color: wfInk, fontWeight: 700, lineHeight: 1 }}>{pct}%</div>
              <div style={{ fontFamily: '"Architects Daughter", cursive', fontSize: 8, color: wfMuted }}>of goal</div>
            </div>
          </WfCircle>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: '"Architects Daughter", cursive', fontSize: 11, color: wfMuted, letterSpacing: 0.5 }}>TODAY</div>
            <div style={{ fontFamily: '"Caveat", cursive', fontSize: 24, color: wfInk, fontWeight: 700, lineHeight: 1, marginTop: 2 }}>
              {totalKcal}<span style={{ fontSize: 14, color: wfMuted }}> / {goalKcal} kcal</span>
            </div>
            {/* progress bar */}
            <div style={{ marginTop: 8, position: 'relative', width: '100%', height: 8 }}>
              <WfBox w="100%" h={8} radius={4} strokeWidth={1.2} rough={false} />
              <div style={{
                position: 'absolute', top: 1, left: 1, height: 6,
                width: `calc(${pct}% - 2px)`, background: wfRuby, borderRadius: 3,
              }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4, fontFamily: '"Architects Daughter", cursive', fontSize: 9, color: wfMuted }}>
              <span>3 of 5 logged</span>
              <span>168 kcal left</span>
            </div>
          </div>
        </div>
      </WfBox>

      {/* Date strip */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 16, padding: '0 4px' }}>
        <div style={{ fontFamily: '"Architects Daughter", cursive', fontSize: 16, color: wfMuted }}>‹</div>
        <div style={{ fontFamily: '"Caveat", cursive', fontSize: 22, color: wfInk, fontWeight: 700, lineHeight: 1 }}>
          Tuesday, Apr 26
        </div>
        <div style={{ fontFamily: '"Architects Daughter", cursive', fontSize: 16, color: wfMuted }}>›</div>
      </div>

      {/* Day timeline */}
      <div style={{ marginTop: 12, position: 'relative', paddingLeft: 18 }}>
        <div style={{ position: 'absolute', left: 4, top: 8, bottom: 8, borderLeft: `1px dashed ${wfMuted}` }} />
        {meals.map((m, i) => (
          <div key={i} style={{ position: 'relative', marginBottom: 10 }}>
            <div style={{
              position: 'absolute', left: -18, top: 14,
              width: 11, height: 11, borderRadius: 6,
              background: m.done ? wfRuby : 'transparent',
              border: `1.4px solid ${wfInk}`,
            }} />
            <WfBox w="100%" h={56} radius={10} fill={m.done ? '#fff' : 'transparent'} dashed={!m.done}>
              <div style={{ position: 'absolute', inset: 0, padding: '0 12px', display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 44, fontFamily: '"Architects Daughter", cursive', fontSize: 11, color: wfMuted, fontWeight: 700 }}>{m.time}</div>
                <WfTabIcon kind={m.icon} active={m.done} size={18} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: '"Architects Daughter", cursive', fontSize: 13, color: wfInk, fontWeight: 700 }}>{m.name}</div>
                  <div style={{ fontFamily: '"Architects Daughter", cursive', fontSize: 10, color: wfMuted, marginTop: 1 }}>{m.detail} · {m.qty}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontFamily: '"Caveat", cursive', fontSize: 18, color: wfInk, fontWeight: 700, lineHeight: 1 }}>{m.kcal}</div>
                  <div style={{ fontFamily: '"Architects Daughter", cursive', fontSize: 8, color: wfMuted }}>kcal</div>
                </div>
              </div>
            </WfBox>
          </div>
        ))}

        {/* + log meal */}
        <div style={{ position: 'relative', marginTop: 4 }}>
          <div style={{
            position: 'absolute', left: -18, top: 14,
            width: 11, height: 11, borderRadius: 6,
            background: 'transparent', border: `1.4px dashed ${wfMuted}`,
          }} />
          <WfBox w="100%" h={42} radius={10} dashed>
            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, fontFamily: '"Architects Daughter", cursive', fontSize: 12, color: wfRuby, fontWeight: 700 }}>
              + log meal or treat
            </div>
          </WfBox>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// 2. MENU — saved meals, recipes, scheduled feed plan
// ─────────────────────────────────────────────────────────────
function FoodMenu() {
  const plan = [
    { meal: 'Breakfast', time: '7:30a', src: 'Lyka · beef',     qty: '120g' },
    { meal: 'Lunch',     time: '12:30p', src: 'Pupcake',         qty: '½' },
    { meal: 'Dinner',    time: '6:00p',  src: 'Lyka · chicken',  qty: '120g' },
  ];
  const saved = [
    { name: 'Lyka · beef',     tag: 'fresh food', kcal: 140, fav: true },
    { name: 'Lyka · chicken',  tag: 'fresh food', kcal: 146, fav: true },
    { name: 'Pupcake',         tag: 'recipe',     kcal: 190, fav: false },
    { name: 'Frozen blueberry',tag: 'treat',      kcal: 6,   fav: false },
    { name: 'Carrot stick',    tag: 'treat',      kcal: 12,  fav: false },
    { name: 'Training reward', tag: 'treat',      kcal: 6,   fav: true },
  ];

  return (
    <div style={{ padding: '12px 18px 100px', overflow: 'auto', height: 'calc(100% - 142px)' }}>
      {/* Daily plan card */}
      <div style={{ fontFamily: '"Architects Daughter", cursive', fontSize: 11, color: wfMuted, letterSpacing: 0.5, marginBottom: 6 }}>
        DAILY PLAN
      </div>
      <WfBox w={324} h={156} radius={14} fill="#fff">
        <div style={{ position: 'absolute', inset: 0, padding: '10px 14px' }}>
          {plan.map((p, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '8px 0',
              borderBottom: i < plan.length - 1 ? `1px dashed ${wfMuted}` : 'none',
            }}>
              <div style={{ width: 50, fontFamily: '"Architects Daughter", cursive', fontSize: 10, color: wfMuted, fontWeight: 700 }}>{p.time}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: '"Architects Daughter", cursive', fontSize: 12, color: wfInk, fontWeight: 700 }}>{p.meal}</div>
                <div style={{ fontFamily: '"Architects Daughter", cursive', fontSize: 10, color: wfMuted, marginTop: 1 }}>{p.src} · {p.qty}</div>
              </div>
              <div style={{ fontFamily: '"Caveat", cursive', fontSize: 18, color: wfMuted }}>›</div>
            </div>
          ))}
        </div>
      </WfBox>

      {/* tag filter row */}
      <div style={{ display: 'flex', gap: 6, marginTop: 18, marginBottom: 8, flexWrap: 'wrap' }}>
        {[
          { l: 'all', active: true },
          { l: 'fresh food' },
          { l: 'kibble' },
          { l: 'treats' },
          { l: 'recipes' },
        ].map((c, i) => (
          <WfBox key={i} w="auto" h={26} radius={13} fill={c.active ? wfInk : 'transparent'} strokeWidth={c.active ? 0 : 1.2} style={{ paddingInline: 12 }}>
            <div style={{
              padding: '0 12px', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: '"Architects Daughter", cursive', fontSize: 10,
              color: c.active ? wfPaper : wfInk, fontWeight: 700, letterSpacing: 0.3,
            }}>{c.l}</div>
          </WfBox>
        ))}
      </div>

      {/* Saved foods grid */}
      <div style={{ fontFamily: '"Architects Daughter", cursive', fontSize: 11, color: wfMuted, letterSpacing: 0.5, marginTop: 4, marginBottom: 6 }}>
        SAVED · {saved.length} ITEMS
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        {saved.map((s, i) => (
          <WfBox key={i} w="100%" h={102} radius={12} fill="#fff">
            <div style={{ position: 'absolute', inset: 0, padding: 10, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <WfBox w={44} h={44} radius={8} hatch strokeWidth={1.2} />
                <div style={{ fontFamily: '"Architects Daughter", cursive', fontSize: 14, color: s.fav ? wfRuby : wfMuted }}>
                  {s.fav ? '♥' : '♡'}
                </div>
              </div>
              <div>
                <div style={{ fontFamily: '"Architects Daughter", cursive', fontSize: 11, color: wfInk, fontWeight: 700, lineHeight: 1.1 }}>{s.name}</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginTop: 3 }}>
                  <div style={{ fontFamily: '"Architects Daughter", cursive', fontSize: 9, color: wfMuted }}>{s.tag}</div>
                  <div style={{ fontFamily: '"Caveat", cursive', fontSize: 14, color: wfInk, fontWeight: 700 }}>{s.kcal}<span style={{ fontSize: 9, color: wfMuted }}>kcal</span></div>
                </div>
              </div>
            </div>
          </WfBox>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// 3. ANALYTICS — trends, splits, weekly snapshot
// ─────────────────────────────────────────────────────────────
function FoodAnalytics() {
  // 7-day kcal column chart data
  const days = [
    { d: 'W', v: 460 },
    { d: 'T', v: 478 },
    { d: 'F', v: 510 },
    { d: 'S', v: 445 },
    { d: 'S', v: 502 },
    { d: 'M', v: 470 },
    { d: 'T', v: 312, today: true },
  ];
  const max = 540;
  const goal = 480;

  return (
    <div style={{ padding: '12px 18px 100px', overflow: 'auto', height: 'calc(100% - 142px)' }}>
      {/* Range pill row */}
      <div style={{ display: 'flex', gap: 6, marginBottom: 12 }}>
        {['Week', 'Month', 'Year'].map((r, i) => (
          <WfBox key={i} w={62} h={26} radius={13} fill={i === 0 ? wfInk : 'transparent'} strokeWidth={i === 0 ? 0 : 1.2}>
            <div style={{
              position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: '"Architects Daughter", cursive', fontSize: 11,
              color: i === 0 ? wfPaper : wfInk, fontWeight: 700,
            }}>{r}</div>
          </WfBox>
        ))}
        <div style={{ flex: 1 }} />
        <div style={{ fontFamily: '"Architects Daughter", cursive', fontSize: 11, color: wfMuted, alignSelf: 'center' }}>
          Apr 20–26
        </div>
      </div>

      {/* avg kcal headline */}
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 4 }}>
        <div style={{ fontFamily: '"Caveat", cursive', fontSize: 36, color: wfInk, fontWeight: 700, lineHeight: 1 }}>454</div>
        <div style={{ fontFamily: '"Architects Daughter", cursive', fontSize: 11, color: wfMuted }}>avg kcal/day</div>
        <div style={{ flex: 1 }} />
        <div style={{ fontFamily: '"Architects Daughter", cursive', fontSize: 11, color: wfRuby, fontWeight: 700 }}>↓ 5% vs last wk</div>
      </div>

      {/* bar chart */}
      <WfBox w={324} h={148} radius={14} fill="#fff">
        <div style={{ position: 'absolute', inset: 0, padding: '14px 14px 8px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ flex: 1, position: 'relative', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 4 }}>
            {/* goal line */}
            <div style={{
              position: 'absolute', left: 0, right: 0,
              bottom: `${(goal / max) * 100}%`,
              borderTop: `1px dashed ${wfRuby}`,
              pointerEvents: 'none',
            }}>
              <div style={{
                position: 'absolute', right: 0, top: -16,
                fontFamily: '"Architects Daughter", cursive', fontSize: 9, color: wfRuby,
              }}>goal · {goal}</div>
            </div>
            {days.map((d, i) => {
              const h = (d.v / max) * 100;
              return (
                <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                  <div style={{
                    fontFamily: '"Architects Daughter", cursive', fontSize: 8,
                    color: d.today ? wfInk : wfMuted, fontWeight: d.today ? 700 : 400,
                  }}>{d.v}</div>
                  <WfBox
                    w="100%" h={`${h}%`} radius={4}
                    fill={d.today ? wfRuby : 'transparent'}
                    hatch={!d.today}
                    strokeWidth={1.2}
                  />
                </div>
              );
            })}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6, paddingInline: 2 }}>
            {days.map((d, i) => (
              <div key={i} style={{
                flex: 1, textAlign: 'center',
                fontFamily: '"Architects Daughter", cursive', fontSize: 10,
                color: d.today ? wfInk : wfMuted, fontWeight: d.today ? 700 : 400,
              }}>{d.d}</div>
            ))}
          </div>
        </div>
      </WfBox>

      {/* split donut + legend */}
      <div style={{ fontFamily: '"Architects Daughter", cursive', fontSize: 11, color: wfMuted, letterSpacing: 0.5, marginTop: 16, marginBottom: 6 }}>
        DIET SPLIT · LAST 7 DAYS
      </div>
      <WfBox w={324} h={120} radius={14} fill="#fff">
        <div style={{ position: 'absolute', inset: 0, padding: 14, display: 'flex', alignItems: 'center', gap: 14 }}>
          {/* sketchy donut */}
          <svg width={88} height={88} viewBox="0 0 88 88" style={{ overflow: 'visible' }}>
            <circle cx="44" cy="44" r="34" fill="none" stroke={wfMuted} strokeWidth="1" filter="url(#wfRough)" />
            {/* arcs — using stroke-dasharray on circle */}
            <circle cx="44" cy="44" r="34" fill="none" stroke={wfRuby} strokeWidth="14"
              strokeDasharray="128 213" strokeDashoffset="0" transform="rotate(-90 44 44)" filter="url(#wfRough)" />
            <circle cx="44" cy="44" r="34" fill="none" stroke={wfInk} strokeWidth="14"
              strokeDasharray="64 213" strokeDashoffset="-128" transform="rotate(-90 44 44)" filter="url(#wfRough)" />
            <circle cx="44" cy="44" r="34" fill="none" stroke={wfRubyLight} strokeWidth="14"
              strokeDasharray="21 213" strokeDashoffset="-192" transform="rotate(-90 44 44)" filter="url(#wfRough)" />
            <text x="44" y="42" textAnchor="middle" fontFamily="Caveat, cursive" fontSize="20" fontWeight="700" fill={wfInk}>3.2k</text>
            <text x="44" y="56" textAnchor="middle" fontFamily="Architects Daughter, cursive" fontSize="8" fill={wfMuted}>kcal/wk</text>
          </svg>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
            {[
              { c: wfRuby,      l: 'Fresh food', v: '60%', sub: '1,920 kcal' },
              { c: wfInk,       l: 'Kibble',      v: '30%', sub: '960 kcal' },
              { c: wfRubyLight, l: 'Treats',      v: '10%', sub: '320 kcal' },
            ].map((r, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 12, height: 12, background: r.c, borderRadius: 3 }} />
                <div style={{ flex: 1, fontFamily: '"Architects Daughter", cursive', fontSize: 11, color: wfInk, fontWeight: 700 }}>{r.l}</div>
                <div style={{ fontFamily: '"Architects Daughter", cursive', fontSize: 10, color: wfMuted }}>{r.sub}</div>
                <div style={{ width: 32, textAlign: 'right', fontFamily: '"Caveat", cursive', fontSize: 16, color: wfInk, fontWeight: 700 }}>{r.v}</div>
              </div>
            ))}
          </div>
        </div>
      </WfBox>

      {/* insights */}
      <div style={{ fontFamily: '"Architects Daughter", cursive', fontSize: 11, color: wfMuted, letterSpacing: 0.5, marginTop: 16, marginBottom: 6 }}>
        INSIGHTS
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {[
          { i: '✦', txt: 'Treat intake up 18% — try carrot or blueberry instead of training rewards.' },
          { i: '✦', txt: 'Best stretch yet: 5 days hitting daily kcal goal. Keep going!' },
          { i: '✦', txt: 'Dinner is logged latest at 6:42p on average. Aim for 6:00p.' },
        ].map((n, i) => (
          <WfBox key={i} w={324} h="auto" radius={10}>
            <div style={{ padding: '10px 12px', display: 'flex', gap: 10, alignItems: 'flex-start' }}>
              <div style={{ fontFamily: '"Caveat", cursive', fontSize: 16, color: wfRuby, lineHeight: 1 }}>{n.i}</div>
              <div style={{ flex: 1, fontFamily: '"Architects Daughter", cursive', fontSize: 11, color: wfInk, lineHeight: 1.4 }}>{n.txt}</div>
            </div>
          </WfBox>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// FoodScreen — wraps the three sub-tabs
// ─────────────────────────────────────────────────────────────
function FoodScreen({ subTab = 'diary', onSubTabChange }) {
  const [internal, setInternal] = React.useState(subTab);
  React.useEffect(() => { setInternal(subTab); }, [subTab]);
  const active = subTab;
  const set = onSubTabChange || setInternal;

  const subtitle = active === 'diary' ? 'Tue · Apr 26' :
                   active === 'menu'  ? 'plan · saved foods · recipes' :
                                        'last 7 days';

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', background: wfPaper, overflow: 'hidden' }}>
      <WfStatusBarAbsolute />
      <FoodHeader subtitle={subtitle} />
      <FoodTopTabs active={active} onChange={set} />
      {active === 'diary'     && <FoodDiary />}
      {active === 'menu'      && <FoodMenu />}
      {active === 'analytics' && <FoodAnalytics />}
      <WfTabBar active="food" />
    </div>
  );
}

Object.assign(window, { FoodScreen, FoodTopTabs, FoodDiary, FoodMenu, FoodAnalytics });
