// Health tab — endless scroll of health-related events for Marnie.
// Categories: vaccinations, vet visits, tick/flea treatments, medications,
// weighings, grooming, dental, allergies, parasites.
// Bottom WfTabBar shows "health" as the active main tab.

// ─────────────────────────────────────────────────────────────
// Category metadata — color tag + short label + glyph
// ─────────────────────────────────────────────────────────────
const HEALTH_CATS = {
  vaccine:   { label: 'Vaccination',   short: 'vaccine',  glyph: '✚', color: wfRuby },
  vet:       { label: 'Vet visit',     short: 'vet',      glyph: '✦', color: wfInk },
  tick:      { label: 'Tick & flea',   short: 'tick',     glyph: '◉', color: '#7a8a55' },
  med:       { label: 'Medication',    short: 'meds',     glyph: '◐', color: '#a08236' },
  weigh:     { label: 'Weigh-in',      short: 'weight',   glyph: '⚖', color: wfMuted },
  groom:     { label: 'Grooming',      short: 'groom',    glyph: '✂', color: '#7a6a8a' },
  dental:    { label: 'Dental',        short: 'dental',   glyph: '◇', color: '#5b7a8a' },
  allergy:   { label: 'Allergy note',  short: 'allergy',  glyph: '~', color: wfRubyLight },
};

const ALL_CAT_IDS = Object.keys(HEALTH_CATS);

// Seed events — most recent first. Realistic spread across the year.
const SEED_EVENTS = [
  { id: 'e01', cat: 'tick',    date: '2026-04-22', title: 'NexGard Spectra · monthly', detail: 'tablet · 7.5kg dose', vet: null,             due: 'next: May 22' },
  { id: 'e02', cat: 'weigh',   date: '2026-04-18', title: 'Weighed in at home',         detail: '7.4 kg · stable',        vet: null,             due: null },
  { id: 'e03', cat: 'vet',     date: '2026-04-09', title: 'Annual wellness check-up',   detail: 'Dr. Patel · Northside Vet', vet: 'Northside Vet', due: null, note: 'all clear · slight tartar build-up' },
  { id: 'e04', cat: 'vaccine', date: '2026-04-09', title: 'C5 booster',                 detail: 'parvo · distemper · hepatitis · parainfluenza · bordetella', vet: 'Northside Vet', due: 'next: Apr 2027' },
  { id: 'e05', cat: 'dental',  date: '2026-03-28', title: 'Dental scrub',               detail: 'home cleaning · enzymatic',   vet: null,             due: null },
  { id: 'e06', cat: 'tick',    date: '2026-03-22', title: 'NexGard Spectra · monthly',  detail: 'tablet · 7.5kg dose',         vet: null,             due: null },
  { id: 'e07', cat: 'med',     date: '2026-03-14', title: 'Apoquel · 7-day course',     detail: 'itchy paws · 5.4mg twice/day', vet: 'Northside Vet',  due: 'ends Mar 21' },
  { id: 'e08', cat: 'allergy', date: '2026-03-12', title: 'Itching flare-up',           detail: 'paws + belly · suspected grass', vet: null,            due: null },
  { id: 'e09', cat: 'groom',   date: '2026-03-05', title: 'Full groom',                 detail: 'wash · trim · nails',         vet: 'Suds & Tails',   due: null },
  { id: 'e10', cat: 'tick',    date: '2026-02-22', title: 'NexGard Spectra · monthly',  detail: 'tablet · 7.5kg dose',         vet: null,             due: null },
  { id: 'e11', cat: 'weigh',   date: '2026-02-15', title: 'Weighed in at home',         detail: '7.5 kg · ↑0.1',                vet: null,             due: null },
  { id: 'e12', cat: 'vet',     date: '2026-02-02', title: 'Limp · left hind',           detail: 'soft-tissue strain · rest 5 days', vet: 'Northside Vet', due: null },
  { id: 'e13', cat: 'tick',    date: '2026-01-22', title: 'NexGard Spectra · monthly',  detail: 'tablet · 7.5kg dose',         vet: null,             due: null },
  { id: 'e14', cat: 'groom',   date: '2026-01-12', title: 'Quick tidy',                 detail: 'face + paws · home',          vet: null,             due: null },
  { id: 'e15', cat: 'med',     date: '2026-01-04', title: 'Joint chew',                 detail: 'glucosamine · daily',         vet: null,             due: 'ongoing' },
  { id: 'e16', cat: 'tick',    date: '2025-12-22', title: 'NexGard Spectra · monthly',  detail: 'tablet · 7.5kg dose',         vet: null,             due: null },
  { id: 'e17', cat: 'vet',     date: '2025-12-08', title: 'Ear infection follow-up',    detail: 'cleared · stop drops',         vet: 'Northside Vet',  due: null },
  { id: 'e18', cat: 'med',     date: '2025-11-28', title: 'Otomax ear drops',           detail: '7-day course · L+R',          vet: 'Northside Vet',  due: 'ends Dec 5' },
  { id: 'e19', cat: 'vet',     date: '2025-11-26', title: 'Ear infection · L',          detail: 'mild · medication started',    vet: 'Northside Vet',  due: null },
  { id: 'e20', cat: 'tick',    date: '2025-11-22', title: 'NexGard Spectra · monthly',  detail: 'tablet · 7.5kg dose',         vet: null,             due: null },
];

// Generator for "older" pages — synthesizes plausible past events
function makeOlderPage(pageIdx) {
  // pageIdx 1 = first synthesized batch (older than Nov 2025)
  const baseMonth = 10 - pageIdx * 4; // shift backwards
  const out = [];
  for (let m = 0; m < 4; m++) {
    const monthOffset = baseMonth - m;
    let yr = 2025;
    let mo = monthOffset;
    while (mo < 1) { mo += 12; yr -= 1; }
    const mm = String(mo).padStart(2, '0');
    // monthly tick treatment
    out.push({
      id: `g-${pageIdx}-${m}-tick`,
      cat: 'tick',
      date: `${yr}-${mm}-22`,
      title: 'NexGard Spectra · monthly',
      detail: 'tablet · 7.5kg dose',
      vet: null,
      due: null,
    });
    // alternating events
    if (m % 2 === 0) {
      out.push({
        id: `g-${pageIdx}-${m}-weigh`,
        cat: 'weigh',
        date: `${yr}-${mm}-12`,
        title: 'Weighed in at home',
        detail: `${(7.3 + Math.random() * 0.4).toFixed(1)} kg`,
        vet: null,
        due: null,
      });
    } else {
      out.push({
        id: `g-${pageIdx}-${m}-groom`,
        cat: 'groom',
        date: `${yr}-${mm}-08`,
        title: 'Quick tidy',
        detail: 'face + paws · home',
        vet: null,
        due: null,
      });
    }
    // sprinkle a vet visit every other page
    if ((pageIdx + m) % 3 === 0) {
      out.push({
        id: `g-${pageIdx}-${m}-vet`,
        cat: 'vet',
        date: `${yr}-${mm}-04`,
        title: 'Routine check-in',
        detail: 'Dr. Patel · all clear',
        vet: 'Northside Vet',
        due: null,
      });
    }
  }
  return out;
}

// Date helpers
const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
function fmtMonthYear(d) {
  const [y, m] = d.split('-');
  return `${MONTHS[parseInt(m, 10) - 1]} ${y}`;
}
function fmtDay(d) {
  const [, m, day] = d.split('-');
  return `${MONTHS[parseInt(m, 10) - 1]} ${parseInt(day, 10)}`;
}
function dayOfWeek(d) {
  // d "YYYY-MM-DD"
  const dt = new Date(d + 'T12:00:00');
  return ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'][dt.getDay()];
}

// ─────────────────────────────────────────────────────────────
// Page header — "Health" title
// ─────────────────────────────────────────────────────────────
function HealthHeader({ count }) {
  return (
    <div style={{ padding: '50px 22px 6px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
      <div>
        <div style={{ fontFamily: '"Architects Daughter", cursive', fontSize: 11, color: wfMuted, letterSpacing: 0.5 }}>
          MARNIE'S
        </div>
        <div style={{ fontFamily: '"Caveat", cursive', fontSize: 34, color: wfInk, fontWeight: 700, lineHeight: 1, marginTop: 2 }}>
          Health
        </div>
        <div style={{ fontFamily: '"Architects Daughter", cursive', fontSize: 11, color: wfMuted, marginTop: 4 }}>
          {count} events · all-time log
        </div>
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        <WfCircle size={32}>
          <div style={{ fontFamily: '"Architects Daughter", cursive', fontSize: 13, color: wfInk }}>⌕</div>
        </WfCircle>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Filter / control strip — date pill + filter chips + add event
// ─────────────────────────────────────────────────────────────
function HealthControls({ dateRange, onDateClick, activeCats, onToggleCat, onClearCats, onAdd }) {
  const allActive = activeCats.length === 0;
  return (
    <div style={{
      padding: '8px 18px 10px',
      borderBottom: `1px dashed ${wfMuted}`,
      background: wfPaper,
    }}>
      {/* Row 1: date filter + add event */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
        <div onClick={onDateClick} style={{ flex: 1, cursor: 'pointer' }}>
          <WfBox w="100%" h={34} radius={17} fill="#fff" strokeWidth={1.2}>
            <div style={{
              position: 'absolute', inset: 0, padding: '0 14px', display: 'flex', alignItems: 'center', gap: 8,
              fontFamily: '"Architects Daughter", cursive', fontSize: 11, color: wfInk, fontWeight: 700,
            }}>
              <span style={{ fontSize: 13 }}>▦</span>
              <span style={{ flex: 1 }}>{dateRange}</span>
              <span style={{ color: wfMuted }}>›</span>
            </div>
          </WfBox>
        </div>
        <div onClick={onAdd} style={{ cursor: 'pointer' }}>
          <WfBox w={104} h={34} radius={17} fill={wfInk} strokeWidth={0}>
            <div style={{
              position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
              fontFamily: '"Architects Daughter", cursive', fontSize: 12, color: wfPaper, fontWeight: 700,
            }}>
              <span style={{ fontSize: 14 }}>＋</span>
              <span>add event</span>
            </div>
          </WfBox>
        </div>
      </div>

      {/* Row 2: scrollable filter chips */}
      <div style={{
        display: 'flex', gap: 6, overflowX: 'auto', paddingBottom: 2,
        scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch',
      }}>
        <div onClick={onClearCats} style={{ flexShrink: 0, cursor: 'pointer' }}>
          <WfBox w={42} h={26} radius={13} fill={allActive ? wfInk : 'transparent'} strokeWidth={allActive ? 0 : 1.2}>
            <div style={{
              position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: '"Architects Daughter", cursive', fontSize: 10,
              color: allActive ? wfPaper : wfInk, fontWeight: 700, letterSpacing: 0.3,
            }}>all</div>
          </WfBox>
        </div>
        {ALL_CAT_IDS.map((id) => {
          const cat = HEALTH_CATS[id];
          const on = activeCats.includes(id);
          return (
            <div key={id} onClick={() => onToggleCat(id)} style={{ flexShrink: 0, cursor: 'pointer' }}>
              <WfBox w="auto" h={26} radius={13} fill={on ? cat.color : 'transparent'} strokeWidth={on ? 0 : 1.2}>
                <div style={{
                  padding: '0 12px', height: '100%', display: 'flex', alignItems: 'center', gap: 5,
                  fontFamily: '"Architects Daughter", cursive', fontSize: 10,
                  color: on ? wfPaper : wfInk, fontWeight: 700, letterSpacing: 0.3, whiteSpace: 'nowrap',
                }}>
                  <span style={{ fontSize: 11 }}>{cat.glyph}</span>
                  <span>{cat.short}</span>
                </div>
              </WfBox>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// One event card — timeline node + content
// ─────────────────────────────────────────────────────────────
function HealthEventCard({ ev, isLastInGroup }) {
  const cat = HEALTH_CATS[ev.cat];
  return (
    <div style={{ position: 'relative', marginBottom: 10 }}>
      {/* timeline node */}
      <div style={{
        position: 'absolute', left: -22, top: 14,
        width: 12, height: 12, borderRadius: 7,
        background: cat.color,
        border: `1.4px solid ${wfInk}`,
      }} />
      <WfBox w="100%" h="auto" radius={10} fill="#fff">
        <div style={{ padding: '10px 12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {/* date column */}
            <div style={{ width: 44, textAlign: 'center', flexShrink: 0 }}>
              <div style={{ fontFamily: '"Architects Daughter", cursive', fontSize: 9, color: wfMuted, letterSpacing: 0.5 }}>
                {dayOfWeek(ev.date)}
              </div>
              <div style={{ fontFamily: '"Caveat", cursive', fontSize: 22, color: wfInk, fontWeight: 700, lineHeight: 1 }}>
                {ev.date.slice(8)}
              </div>
            </div>
            {/* divider */}
            <div style={{ width: 1, alignSelf: 'stretch', borderLeft: `1px dashed ${wfMuted}`, margin: '2px 0' }} />
            {/* main content */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2 }}>
                <span style={{
                  fontFamily: '"Architects Daughter", cursive', fontSize: 9,
                  color: cat.color, fontWeight: 700, letterSpacing: 0.6, textTransform: 'uppercase',
                }}>{cat.short}</span>
                {ev.due && (
                  <>
                    <span style={{ color: wfMuted, fontSize: 8 }}>·</span>
                    <span style={{
                      fontFamily: '"Architects Daughter", cursive', fontSize: 9,
                      color: wfMuted, fontStyle: 'italic',
                    }}>{ev.due}</span>
                  </>
                )}
              </div>
              <div style={{
                fontFamily: '"Architects Daughter", cursive', fontSize: 13,
                color: wfInk, fontWeight: 700, lineHeight: 1.15,
              }}>{ev.title}</div>
              <div style={{
                fontFamily: '"Architects Daughter", cursive', fontSize: 10,
                color: wfMuted, marginTop: 2, lineHeight: 1.3,
              }}>
                {ev.detail}
                {ev.vet && <span> · {ev.vet}</span>}
              </div>
              {ev.note && (
                <div style={{
                  marginTop: 6,
                  padding: '4px 8px',
                  borderLeft: `2px solid ${wfRubyLight}`,
                  fontFamily: '"Caveat", cursive', fontSize: 14,
                  color: wfInk, lineHeight: 1.1, fontStyle: 'italic',
                }}>"{ev.note}"</div>
              )}
            </div>
            {/* chevron */}
            <div style={{ fontFamily: '"Caveat", cursive', fontSize: 18, color: wfMuted }}>›</div>
          </div>
        </div>
      </WfBox>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Month group header — sticky-ish label inside scroll
// ─────────────────────────────────────────────────────────────
function HealthMonthHeader({ label, count }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'baseline', gap: 8,
      marginTop: 14, marginBottom: 8,
      paddingLeft: 0,
    }}>
      <div style={{ fontFamily: '"Caveat", cursive', fontSize: 22, color: wfInk, fontWeight: 700, lineHeight: 1 }}>
        {label}
      </div>
      <WfUnderline width={36} color={wfRuby} />
      <div style={{ flex: 1 }} />
      <div style={{ fontFamily: '"Architects Daughter", cursive', fontSize: 10, color: wfMuted }}>
        {count} {count === 1 ? 'event' : 'events'}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Main HealthLog — endless scroll list
// ─────────────────────────────────────────────────────────────
function HealthLog({ activeCats, dateRange }) {
  const [events, setEvents] = React.useState(SEED_EVENTS);
  const [pagesLoaded, setPagesLoaded] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const [exhausted, setExhausted] = React.useState(false);
  const sentinelRef = React.useRef(null);
  const scrollRef = React.useRef(null);

  // Reset list when filters change — same seed but re-evaluated
  // (no actual fetch, but keeps the mental model honest)

  // Load more handler
  const loadMore = React.useCallback(() => {
    if (loading || exhausted) return;
    setLoading(true);
    // simulate fetch
    setTimeout(() => {
      const nextPage = pagesLoaded + 1;
      if (nextPage > 6) {
        setExhausted(true);
        setLoading(false);
        return;
      }
      const more = makeOlderPage(nextPage);
      setEvents((prev) => [...prev, ...more]);
      setPagesLoaded(nextPage);
      setLoading(false);
    }, 320);
  }, [loading, exhausted, pagesLoaded]);

  // IntersectionObserver to trigger loadMore
  React.useEffect(() => {
    const sentinel = sentinelRef.current;
    const root = scrollRef.current;
    if (!sentinel || !root) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) loadMore();
      });
    }, { root, rootMargin: '160px 0px' });
    obs.observe(sentinel);
    return () => obs.disconnect();
  }, [loadMore]);

  // Filter events by active categories
  const filtered = React.useMemo(() => {
    if (activeCats.length === 0) return events;
    return events.filter((e) => activeCats.includes(e.cat));
  }, [events, activeCats]);

  // Group by month
  const groups = React.useMemo(() => {
    const out = [];
    let current = null;
    filtered.forEach((e) => {
      const m = e.date.slice(0, 7); // YYYY-MM
      if (!current || current.key !== m) {
        current = { key: m, label: fmtMonthYear(e.date), events: [] };
        out.push(current);
      }
      current.events.push(e);
    });
    return out;
  }, [filtered]);

  return (
    <div ref={scrollRef} style={{
      padding: '12px 18px 100px',
      paddingLeft: 38, // leave room for the timeline rail
      overflowY: 'auto',
      overflowX: 'hidden',
      height: 'calc(100% - 196px)', // header(~74) + controls(~92) + tabbar handled below
      position: 'relative',
    }}>
      {/* timeline rail */}
      <div style={{
        position: 'absolute', left: 32, top: 14, bottom: 80,
        borderLeft: `1px dashed ${wfMuted}`,
      }} />

      {/* Active range banner */}
      <div style={{
        marginBottom: 4,
        fontFamily: '"Architects Daughter", cursive', fontSize: 10,
        color: wfMuted, letterSpacing: 0.5,
      }}>
        SHOWING · {dateRange.toUpperCase()}
        {activeCats.length > 0 && (
          <span> · {activeCats.length} {activeCats.length === 1 ? 'filter' : 'filters'}</span>
        )}
      </div>

      {groups.length === 0 && (
        <div style={{ textAlign: 'center', padding: '40px 0' }}>
          <div style={{ fontFamily: '"Caveat", cursive', fontSize: 22, color: wfMuted, fontWeight: 700 }}>
            no events match
          </div>
          <div style={{ fontFamily: '"Architects Daughter", cursive', fontSize: 11, color: wfMuted, marginTop: 4 }}>
            try clearing a filter
          </div>
        </div>
      )}

      {groups.map((g) => (
        <div key={g.key}>
          <HealthMonthHeader label={g.label} count={g.events.length} />
          {g.events.map((ev, i) => (
            <HealthEventCard key={ev.id} ev={ev} isLastInGroup={i === g.events.length - 1} />
          ))}
        </div>
      ))}

      {/* Sentinel + loading indicator */}
      <div ref={sentinelRef} style={{ height: 1 }} />
      {!exhausted && (
        <div style={{
          textAlign: 'center', padding: '14px 0 4px',
          fontFamily: '"Architects Daughter", cursive', fontSize: 11,
          color: wfMuted, fontStyle: 'italic',
        }}>
          {loading ? '…loading older events' : 'scroll for more'}
        </div>
      )}
      {exhausted && (
        <div style={{ textAlign: 'center', padding: '20px 0 4px' }}>
          <div style={{
            display: 'inline-block',
            fontFamily: '"Caveat", cursive', fontSize: 18, color: wfMuted, fontWeight: 700,
          }}>
            ✦ that's everything ✦
          </div>
          <div style={{
            fontFamily: '"Architects Daughter", cursive', fontSize: 10, color: wfMuted, marginTop: 2,
          }}>
            since adopting Marnie · {filtered.length} events
          </div>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// HealthScreen — the assembled page
// ─────────────────────────────────────────────────────────────
function HealthScreen() {
  const [activeCats, setActiveCats] = React.useState([]);
  const [dateRange, setDateRange] = React.useState('All time');

  const toggleCat = (id) => {
    setActiveCats((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };
  const clearCats = () => setActiveCats([]);

  const cycleDateRange = () => {
    const opts = ['All time', 'Last 30 days', 'Last 90 days', 'This year', '2025'];
    const i = opts.indexOf(dateRange);
    setDateRange(opts[(i + 1) % opts.length]);
  };

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', background: wfPaper, overflow: 'hidden' }}>
      <WfStatusBarAbsolute />
      <HealthHeader count={'24+'} />
      <HealthControls
        dateRange={dateRange}
        onDateClick={cycleDateRange}
        activeCats={activeCats}
        onToggleCat={toggleCat}
        onClearCats={clearCats}
        onAdd={() => {}}
      />
      <HealthLog activeCats={activeCats} dateRange={dateRange} />
      <WfTabBar active="health" />
    </div>
  );
}

Object.assign(window, { HealthScreen });
