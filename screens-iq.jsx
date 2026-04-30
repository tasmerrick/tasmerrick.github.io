// IQ tab — Marnie's social feed. Posts: photos, tricks, training, walks,
// playtime, milestones. Endless scroll, filter chips, big "+" add button,
// and a quick-compose sheet (mocked, non-functional but visible).

// ─────────────────────────────────────────────────────────────
// Post-type metadata
// ─────────────────────────────────────────────────────────────
const IQ_TYPES = {
  photo:    { label: 'Photo',       short: 'photos',    glyph: '◳',  color: wfRuby },
  walk:     { label: 'Walk',        short: 'walks',     glyph: '☍',  color: '#7a8a55' },
  play:     { label: 'Playtime',    short: 'play',      glyph: '◉',  color: '#a08236' },
  trick:    { label: 'New trick',   short: 'tricks',    glyph: '✦',  color: '#7a6a8a' },
  train:    { label: 'Training',    short: 'training',  glyph: '◐',  color: '#5b7a8a' },
  milestone:{ label: 'Milestone',   short: 'milestones',glyph: '✱',  color: wfInk },
};
const IQ_TYPE_IDS = Object.keys(IQ_TYPES);

// ─────────────────────────────────────────────────────────────
// Seed posts (most recent first) — Marnie's feed
// ─────────────────────────────────────────────────────────────
const IQ_SEED = [
  { id: 'p01', type: 'trick', date: '2026-04-26', timeAgo: '2h',
    caption: 'finally got "shake" with the LEFT paw 🐾',
    photoLabel: 'Marnie · paw extended',
    stats: { likes: 24, comments: 3 },
    meta: 'first attempt · 11 tries' },
  { id: 'p02', type: 'walk', date: '2026-04-26', timeAgo: '6h',
    caption: 'morning loop · met a corgi named Biscuit',
    photoLabel: 'park trail · golden hour',
    stats: { likes: 12, comments: 1 },
    meta: '2.4 km · 38 min · light pull' },
  { id: 'p03', type: 'photo', date: '2026-04-25', timeAgo: '1d',
    caption: 'sunbeam claimed',
    photoLabel: 'Marnie napping in window',
    stats: { likes: 41, comments: 7 },
    meta: null },
  { id: 'p04', type: 'play', date: '2026-04-24', timeAgo: '2d',
    caption: 'new tennis ball → instantly destroyed',
    photoLabel: 'shredded ball debris',
    stats: { likes: 18, comments: 5 },
    meta: 'lifespan: 14 minutes' },
  { id: 'p05', type: 'milestone', date: '2026-04-22', timeAgo: '4d',
    caption: '🎉 nine months old today',
    photoLabel: 'Marnie with paper "9" sign',
    stats: { likes: 62, comments: 11 },
    meta: '9 months · 7.4 kg' },
  { id: 'p06', type: 'train', date: '2026-04-21', timeAgo: '5d',
    caption: 'recall practice in the field — 6/8 first try',
    photoLabel: 'long-line training shot',
    stats: { likes: 9, comments: 0 },
    meta: '20 min · high-value treats' },
  { id: 'p07', type: 'photo', date: '2026-04-20', timeAgo: '6d',
    caption: 'this face',
    photoLabel: 'close-up · ears perked',
    stats: { likes: 53, comments: 4 },
    meta: null },
  { id: 'p08', type: 'walk', date: '2026-04-19', timeAgo: '1w',
    caption: 'beach trip ~ first time meeting waves',
    photoLabel: 'sandy paws + sea',
    stats: { likes: 38, comments: 6 },
    meta: '1.8 km · 50 min · zero pull!' },
  { id: 'p09', type: 'play', date: '2026-04-17', timeAgo: '1w',
    caption: 'tug rope vs Marnie · rope lost',
    photoLabel: 'tug-of-war action shot',
    stats: { likes: 14, comments: 2 },
    meta: '12 min · backyard' },
  { id: 'p10', type: 'trick', date: '2026-04-15', timeAgo: '2w',
    caption: 'spin in a circle · clockwise only so far',
    photoLabel: 'Marnie mid-spin · blurry',
    stats: { likes: 21, comments: 3 },
    meta: 'cue: finger circle' },
  { id: 'p11', type: 'photo', date: '2026-04-13', timeAgo: '2w',
    caption: 'sleepy mode',
    photoLabel: 'curled up on couch',
    stats: { likes: 29, comments: 2 },
    meta: null },
  { id: 'p12', type: 'walk', date: '2026-04-11', timeAgo: '2w',
    caption: 'forest path · so many smells',
    photoLabel: 'mossy trail',
    stats: { likes: 11, comments: 1 },
    meta: '3.1 km · 1h 5m' },
];

function makeOlderIqPage(pageIdx) {
  const out = [];
  const captions = [
    { type: 'photo', cap: 'patch of sun', meta: null, photo: 'window light · cozy' },
    { type: 'walk', cap: 'rainy day loop', meta: '1.6 km · 30 min', photo: 'wet paws + leash' },
    { type: 'play', cap: 'fetch session', meta: '15 min · ball #4', photo: 'mid-air catch' },
    { type: 'trick', cap: 'sit-stay · 30 sec hold', meta: 'longest yet', photo: 'good girl pose' },
    { type: 'photo', cap: 'after-bath fluff', meta: null, photo: 'puffy clean Marnie' },
    { type: 'train', cap: 'leash manners drill', meta: '10 min · sidewalk', photo: 'heel position' },
  ];
  for (let i = 0; i < 6; i++) {
    const c = captions[(i + pageIdx) % captions.length];
    out.push({
      id: `iq-g${pageIdx}-${i}`,
      type: c.type,
      date: `2026-0${Math.max(1, 4 - pageIdx)}-${String(20 - i * 2).padStart(2, '0')}`,
      timeAgo: `${pageIdx * 6 + i + 3}w`,
      caption: c.cap,
      photoLabel: c.photo,
      stats: { likes: 5 + ((i * 7 + pageIdx * 3) % 40), comments: (i + pageIdx) % 5 },
      meta: c.meta,
    });
  }
  return out;
}

// ─────────────────────────────────────────────────────────────
// Header
// ─────────────────────────────────────────────────────────────
function IqHeader({ view, onView }) {
  return (
    <div style={{ padding: '50px 22px 6px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
      <div>
        <div style={{ fontFamily: '"Architects Daughter", cursive', fontSize: 11, color: wfMuted, letterSpacing: 0.5 }}>
          MARNIE'S
        </div>
        <div style={{ fontFamily: '"Caveat", cursive', fontSize: 34, color: wfInk, fontWeight: 700, lineHeight: 1, marginTop: 2 }}>
          IQ
        </div>
        <div style={{ fontFamily: '"Architects Daughter", cursive', fontSize: 11, color: wfMuted, marginTop: 4 }}>
          her diary · photos, tricks, walks &amp; wins
        </div>
      </div>
      {/* feed/grid view toggle */}
      <div style={{ display: 'flex', gap: 4 }}>
        <div onClick={() => onView('feed')} style={{ cursor: 'pointer' }}>
          <WfBox w={32} h={32} radius={8} fill={view === 'feed' ? wfInk : 'transparent'} strokeWidth={view === 'feed' ? 0 : 1.2}>
            <div style={{
              position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: '"Architects Daughter", cursive', fontSize: 14, fontWeight: 700,
              color: view === 'feed' ? wfPaper : wfInk,
            }}>≡</div>
          </WfBox>
        </div>
        <div onClick={() => onView('grid')} style={{ cursor: 'pointer' }}>
          <WfBox w={32} h={32} radius={8} fill={view === 'grid' ? wfInk : 'transparent'} strokeWidth={view === 'grid' ? 0 : 1.2}>
            <div style={{
              position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: '"Architects Daughter", cursive', fontSize: 14, fontWeight: 700,
              color: view === 'grid' ? wfPaper : wfInk,
            }}>⌗</div>
          </WfBox>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Filter chips strip
// ─────────────────────────────────────────────────────────────
function IqFilters({ activeTypes, onToggle, onClear, onAdd }) {
  const allActive = activeTypes.length === 0;
  return (
    <div style={{
      padding: '8px 18px 10px',
      borderBottom: `1px dashed ${wfMuted}`,
      background: wfPaper,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
        <div style={{ flex: 1, fontFamily: '"Architects Daughter", cursive', fontSize: 11, color: wfMuted, fontWeight: 700, letterSpacing: 0.5 }}>
          FILTER · {allActive ? 'all posts' : `${activeTypes.length} type${activeTypes.length === 1 ? '' : 's'}`}
        </div>
        <div onClick={onAdd} style={{ cursor: 'pointer' }}>
          <WfBox w={86} h={32} radius={16} fill={wfInk} strokeWidth={0}>
            <div style={{
              position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5,
              fontFamily: '"Architects Daughter", cursive', fontSize: 12, color: wfPaper, fontWeight: 700,
            }}>
              <span style={{ fontSize: 15 }}>＋</span>
              <span>new post</span>
            </div>
          </WfBox>
        </div>
      </div>

      <div style={{
        display: 'flex', gap: 6, overflowX: 'auto', paddingBottom: 2,
        scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch',
      }}>
        <div onClick={onClear} style={{ flexShrink: 0, cursor: 'pointer' }}>
          <WfBox w={42} h={26} radius={13} fill={allActive ? wfInk : 'transparent'} strokeWidth={allActive ? 0 : 1.2}>
            <div style={{
              position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: '"Architects Daughter", cursive', fontSize: 10,
              color: allActive ? wfPaper : wfInk, fontWeight: 700, letterSpacing: 0.3,
            }}>all</div>
          </WfBox>
        </div>
        {IQ_TYPE_IDS.map((id) => {
          const t = IQ_TYPES[id];
          const on = activeTypes.includes(id);
          return (
            <div key={id} onClick={() => onToggle(id)} style={{ flexShrink: 0, cursor: 'pointer' }}>
              <WfBox w="auto" h={26} radius={13} fill={on ? t.color : 'transparent'} strokeWidth={on ? 0 : 1.2}>
                <div style={{
                  padding: '0 12px', height: '100%', display: 'flex', alignItems: 'center', gap: 5,
                  fontFamily: '"Architects Daughter", cursive', fontSize: 10,
                  color: on ? wfPaper : wfInk, fontWeight: 700, letterSpacing: 0.3, whiteSpace: 'nowrap',
                }}>
                  <span style={{ fontSize: 11 }}>{t.glyph}</span>
                  <span>{t.short}</span>
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
// Single post — Instagram-ish card
// ─────────────────────────────────────────────────────────────
function IqPost({ post }) {
  const t = IQ_TYPES[post.type];
  const liked = (parseInt(post.id.replace(/\D/g, ''), 10) || 0) % 3 === 0;
  return (
    <div style={{ marginBottom: 16 }}>
      {/* avatar + type + time */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
        <WfCircle size={28} hatch />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontFamily: '"Architects Daughter", cursive', fontSize: 12, color: wfInk, fontWeight: 700, lineHeight: 1.1 }}>
            marnie
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginTop: 1 }}>
            <span style={{ fontSize: 9, color: t.color }}>{t.glyph}</span>
            <span style={{
              fontFamily: '"Architects Daughter", cursive', fontSize: 9,
              color: t.color, fontWeight: 700, letterSpacing: 0.4, textTransform: 'uppercase',
            }}>{t.short}</span>
            <span style={{ color: wfMuted, fontSize: 8 }}>·</span>
            <span style={{ fontFamily: '"Architects Daughter", cursive', fontSize: 9, color: wfMuted }}>
              {post.timeAgo}
            </span>
          </div>
        </div>
        <div style={{ fontFamily: '"Caveat", cursive', fontSize: 18, color: wfMuted }}>⋯</div>
      </div>

      {/* image */}
      <WfImage w="100%" h={260} radius={10} photo label={post.photoLabel} />

      {/* meta strip if present (e.g. walk distance, training reps) */}
      {post.meta && (
        <div style={{
          marginTop: 6,
          padding: '4px 10px',
          background: '#fff',
          border: `1px dashed ${wfMuted}`,
          borderRadius: 12,
          display: 'inline-block',
          fontFamily: '"Architects Daughter", cursive', fontSize: 10, color: wfMuted,
        }}>
          {post.meta}
        </div>
      )}

      {/* action row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginTop: 8 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <span style={{ fontSize: 16, color: liked ? wfRuby : wfInk }}>{liked ? '♥' : '♡'}</span>
          <span style={{ fontFamily: '"Architects Daughter", cursive', fontSize: 11, color: wfInk, fontWeight: 700 }}>
            {post.stats.likes}
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <span style={{ fontSize: 14, color: wfInk }}>◌</span>
          <span style={{ fontFamily: '"Architects Daughter", cursive', fontSize: 11, color: wfInk, fontWeight: 700 }}>
            {post.stats.comments}
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <span style={{ fontSize: 14, color: wfInk }}>↗</span>
        </div>
        <div style={{ flex: 1 }} />
        <span style={{ fontSize: 14, color: wfInk }}>⛉</span>
      </div>

      {/* caption */}
      <div style={{
        marginTop: 6,
        fontFamily: '"Architects Daughter", cursive', fontSize: 12, color: wfInk, lineHeight: 1.35,
      }}>
        <span style={{ fontWeight: 700 }}>marnie</span> {post.caption}
      </div>
      {post.stats.comments > 0 && (
        <div style={{
          marginTop: 4,
          fontFamily: '"Architects Daughter", cursive', fontSize: 10, color: wfMuted,
        }}>
          view all {post.stats.comments} {post.stats.comments === 1 ? 'comment' : 'comments'}
        </div>
      )}
      <div style={{
        marginTop: 4,
        fontFamily: '"Architects Daughter", cursive', fontSize: 9, color: wfMuted, letterSpacing: 0.5, textTransform: 'uppercase',
      }}>
        {post.date}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Grid tile (for grid view)
// ─────────────────────────────────────────────────────────────
function IqGridTile({ post }) {
  const t = IQ_TYPES[post.type];
  return (
    <div style={{ position: 'relative', aspectRatio: '1 / 1' }}>
      <WfImage w="100%" h="100%" radius={4} photo label={post.photoLabel} />
      <div style={{
        position: 'absolute', top: 5, left: 5,
        padding: '2px 6px',
        background: t.color,
        borderRadius: 8,
        fontFamily: '"Architects Daughter", cursive', fontSize: 8,
        color: wfPaper, fontWeight: 700, letterSpacing: 0.3,
        textTransform: 'uppercase',
        display: 'flex', alignItems: 'center', gap: 3,
      }}>
        <span style={{ fontSize: 9 }}>{t.glyph}</span>
        {t.short}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Compose sheet — modal-ish overlay for new post
// ─────────────────────────────────────────────────────────────
function IqComposeSheet({ onClose }) {
  const [type, setType] = React.useState('photo');
  return (
    <div style={{
      position: 'absolute', inset: 0,
      background: 'rgba(31, 27, 24, 0.45)',
      zIndex: 50,
      display: 'flex', alignItems: 'flex-end',
    }} onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} style={{
        width: '100%',
        background: wfPaper,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderTop: `1.5px solid ${wfInk}`,
        padding: '12px 18px 22px',
        maxHeight: '78%',
        overflowY: 'auto',
      }}>
        {/* drag handle */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 8 }}>
          <div style={{ width: 36, height: 4, borderRadius: 2, background: wfMuted, opacity: 0.5 }} />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
          <div>
            <div style={{ fontFamily: '"Architects Daughter", cursive', fontSize: 10, color: wfMuted, letterSpacing: 0.5 }}>
              NEW
            </div>
            <div style={{ fontFamily: '"Caveat", cursive', fontSize: 28, color: wfInk, fontWeight: 700, lineHeight: 1 }}>
              Add to Marnie's diary
            </div>
          </div>
          <div onClick={onClose} style={{ cursor: 'pointer', padding: 4 }}>
            <WfX size={16} />
          </div>
        </div>

        {/* type chooser */}
        <div style={{ fontFamily: '"Architects Daughter", cursive', fontSize: 10, color: wfMuted, letterSpacing: 0.5, marginBottom: 6 }}>
          WHAT ARE YOU LOGGING?
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 6, marginBottom: 14 }}>
          {IQ_TYPE_IDS.map((id) => {
            const o = IQ_TYPES[id];
            const on = type === id;
            return (
              <div key={id} onClick={() => setType(id)} style={{ cursor: 'pointer' }}>
                <WfBox w="100%" h={56} radius={10} fill={on ? o.color : '#fff'} strokeWidth={on ? 0 : 1.2}>
                  <div style={{
                    position: 'absolute', inset: 0,
                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 2,
                    fontFamily: '"Architects Daughter", cursive', fontSize: 11,
                    color: on ? wfPaper : wfInk, fontWeight: 700,
                  }}>
                    <span style={{ fontSize: 16 }}>{o.glyph}</span>
                    <span>{o.label}</span>
                  </div>
                </WfBox>
              </div>
            );
          })}
        </div>

        {/* photo picker */}
        <div style={{ fontFamily: '"Architects Daughter", cursive', fontSize: 10, color: wfMuted, letterSpacing: 0.5, marginBottom: 6 }}>
          PHOTO
        </div>
        <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
          <WfBox w={88} h={88} radius={10} dashed>
            <div style={{
              position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              fontFamily: '"Architects Daughter", cursive', fontSize: 11, color: wfMuted, fontWeight: 700, gap: 2,
            }}>
              <span style={{ fontSize: 22 }}>＋</span>
              <span>camera</span>
            </div>
          </WfBox>
          <WfBox w={88} h={88} radius={10} dashed>
            <div style={{
              position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              fontFamily: '"Architects Daughter", cursive', fontSize: 11, color: wfMuted, fontWeight: 700, gap: 2,
            }}>
              <span style={{ fontSize: 22 }}>▦</span>
              <span>library</span>
            </div>
          </WfBox>
          <div style={{ flex: 1, fontFamily: '"Caveat", cursive', fontSize: 14, color: wfMuted, alignSelf: 'flex-end', paddingBottom: 6, fontStyle: 'italic' }}>
            optional · skip for text-only
          </div>
        </div>

        {/* caption field */}
        <div style={{ fontFamily: '"Architects Daughter", cursive', fontSize: 10, color: wfMuted, letterSpacing: 0.5, marginBottom: 6 }}>
          CAPTION
        </div>
        <WfBox w="100%" h={70} radius={10} fill="#fff">
          <div style={{
            position: 'absolute', inset: 0, padding: 10,
            fontFamily: '"Architects Daughter", cursive', fontSize: 12, color: wfMuted, fontStyle: 'italic',
          }}>
            what'd Marnie do today?
          </div>
        </WfBox>

        {/* extra fields contextual to type */}
        <div style={{ marginTop: 12, fontFamily: '"Architects Daughter", cursive', fontSize: 10, color: wfMuted, letterSpacing: 0.5, marginBottom: 6 }}>
          DETAILS · {IQ_TYPES[type].label.toUpperCase()}
        </div>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 14 }}>
          {(type === 'walk' ? ['distance', 'duration', 'route'] :
            type === 'play' ? ['toy', 'duration', 'where'] :
            type === 'trick' ? ['cue', 'attempts', 'video'] :
            type === 'train' ? ['session', 'duration', 'rating'] :
            type === 'milestone' ? ['date', 'weight', 'tags'] :
            ['location', 'tags']
          ).map((f) => (
            <WfBox key={f} w="auto" h={28} radius={14} fill="#fff" strokeWidth={1.2}>
              <div style={{
                padding: '0 10px', height: '100%', display: 'flex', alignItems: 'center', gap: 4,
                fontFamily: '"Architects Daughter", cursive', fontSize: 10, color: wfInk, fontWeight: 700,
              }}>
                <span style={{ fontSize: 12, color: wfMuted }}>＋</span> {f}
              </div>
            </WfBox>
          ))}
        </div>

        <div style={{ display: 'flex', gap: 8 }}>
          <div onClick={onClose} style={{ flex: 1, cursor: 'pointer' }}>
            <WfBox w="100%" h={42} radius={21} strokeWidth={1.4}>
              <div style={{
                position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: '"Architects Daughter", cursive', fontSize: 13, color: wfInk, fontWeight: 700,
              }}>cancel</div>
            </WfBox>
          </div>
          <div onClick={onClose} style={{ flex: 1.4, cursor: 'pointer' }}>
            <WfBox w="100%" h={42} radius={21} fill={wfInk} strokeWidth={0}>
              <div style={{
                position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                fontFamily: '"Architects Daughter", cursive', fontSize: 13, color: wfPaper, fontWeight: 700,
              }}>
                <span style={{ fontSize: 14 }}>✓</span>
                <span>post to diary</span>
              </div>
            </WfBox>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Feed (endless scroll)
// ─────────────────────────────────────────────────────────────
function IqFeed({ activeTypes, view }) {
  const [posts, setPosts] = React.useState(IQ_SEED);
  const [pages, setPages] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const [exhausted, setExhausted] = React.useState(false);
  const sentinelRef = React.useRef(null);
  const scrollRef = React.useRef(null);

  const loadMore = React.useCallback(() => {
    if (loading || exhausted) return;
    setLoading(true);
    setTimeout(() => {
      const next = pages + 1;
      if (next > 5) {
        setExhausted(true);
        setLoading(false);
        return;
      }
      setPosts((prev) => [...prev, ...makeOlderIqPage(next)]);
      setPages(next);
      setLoading(false);
    }, 320);
  }, [loading, exhausted, pages]);

  React.useEffect(() => {
    const sentinel = sentinelRef.current;
    const root = scrollRef.current;
    if (!sentinel || !root) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) loadMore(); });
    }, { root, rootMargin: '160px 0px' });
    obs.observe(sentinel);
    return () => obs.disconnect();
  }, [loadMore]);

  const filtered = React.useMemo(() => {
    if (activeTypes.length === 0) return posts;
    return posts.filter((p) => activeTypes.includes(p.type));
  }, [posts, activeTypes]);

  return (
    <div ref={scrollRef} style={{
      padding: '12px 18px 100px',
      overflowY: 'auto',
      overflowX: 'hidden',
      height: 'calc(100% - 196px)',
      position: 'relative',
    }}>
      {filtered.length === 0 && (
        <div style={{ textAlign: 'center', padding: '40px 0' }}>
          <div style={{ fontFamily: '"Caveat", cursive', fontSize: 22, color: wfMuted, fontWeight: 700 }}>
            no posts match
          </div>
          <div style={{ fontFamily: '"Architects Daughter", cursive', fontSize: 11, color: wfMuted, marginTop: 4 }}>
            try clearing a filter
          </div>
        </div>
      )}

      {view === 'feed' && filtered.map((p) => (
        <IqPost key={p.id} post={p} />
      ))}

      {view === 'grid' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 4 }}>
          {filtered.map((p) => <IqGridTile key={p.id} post={p} />)}
        </div>
      )}

      <div ref={sentinelRef} style={{ height: 1 }} />
      {!exhausted && (
        <div style={{
          textAlign: 'center', padding: '14px 0 4px',
          fontFamily: '"Architects Daughter", cursive', fontSize: 11,
          color: wfMuted, fontStyle: 'italic',
        }}>
          {loading ? '…loading older posts' : 'scroll for more'}
        </div>
      )}
      {exhausted && (
        <div style={{ textAlign: 'center', padding: '20px 0 4px' }}>
          <div style={{ display: 'inline-block', fontFamily: '"Caveat", cursive', fontSize: 18, color: wfMuted, fontWeight: 700 }}>
            ✦ caught up ✦
          </div>
          <div style={{ fontFamily: '"Architects Daughter", cursive', fontSize: 10, color: wfMuted, marginTop: 2 }}>
            {filtered.length} posts since day one
          </div>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// IqScreen — assembled page
// ─────────────────────────────────────────────────────────────
function IqScreen({ initialCompose = false, initialView = 'feed', initialFilters = [] }) {
  const [activeTypes, setActiveTypes] = React.useState(initialFilters);
  const [view, setView] = React.useState(initialView);
  const [composing, setComposing] = React.useState(initialCompose);

  const toggle = (id) => {
    setActiveTypes((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', background: wfPaper, overflow: 'hidden' }}>
      <WfStatusBarAbsolute />
      <IqHeader view={view} onView={setView} />
      <IqFilters
        activeTypes={activeTypes}
        onToggle={toggle}
        onClear={() => setActiveTypes([])}
        onAdd={() => setComposing(true)}
      />
      <IqFeed activeTypes={activeTypes} view={view} />

      {/* floating add (FAB) — sits above tab bar, redundant w/ "new post" but iconic */}
      <div onClick={() => setComposing(true)} style={{
        position: 'absolute', right: 18, bottom: 92, cursor: 'pointer', zIndex: 5,
      }}>
        <WfCircle size={52} fill={wfRuby} stroke={wfInk} strokeWidth={1.6}>
          <div style={{
            fontFamily: '"Architects Daughter", cursive', fontSize: 28,
            color: wfPaper, fontWeight: 700, lineHeight: 1,
          }}>＋</div>
        </WfCircle>
      </div>

      <WfTabBar active="iq" />

      {composing && <IqComposeSheet onClose={() => setComposing(false)} />}
    </div>
  );
}

function IqScreenForced({ view = 'feed', presetFilters = [] }) {
  return <IqScreen initialView={view} initialFilters={presetFilters} />;
}

Object.assign(window, { IqScreen, IqScreenForced });
