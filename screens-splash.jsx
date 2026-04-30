// Splash screen variations — 3 options
// All wrapped in a 360x720 phone-sized viewport (will be inside iOS frame)

function SplashA() {
  // Photo-forward: big circular photo of Marnie, name below
  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', background: wfPaper, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 28, paddingBottom: 60 }}>
      <WfStatusBarAbsolute />
      <div style={{ position: 'relative' }}>
        <WfCircle size={200} hatch>
          <div style={{ fontFamily: '"Caveat", cursive', fontSize: 22, color: wfMuted, textAlign: 'center', lineHeight: 1.1 }}>
            photo of<br/>Marnie<br/>(ruby cavoodle)
          </div>
        </WfCircle>
      </div>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontFamily: '"Caveat", cursive', fontSize: 56, color: wfInk, fontWeight: 700, lineHeight: 1 }}>MyMarnie</div>
        <WfUnderline width={140} style={{ display: 'block', margin: '4px auto 0' }} />
        <div style={{ fontFamily: '"Architects Daughter", cursive', fontSize: 13, color: wfMuted, marginTop: 14, letterSpacing: 0.5 }}>
          a little life, well-tracked
        </div>
      </div>
      <div style={{ position: 'absolute', bottom: 50, display: 'flex', gap: 6 }}>
        <div style={{ width: 6, height: 6, borderRadius: 3, background: wfInk }} />
        <div style={{ width: 6, height: 6, borderRadius: 3, background: wfInk, opacity: 0.3 }} />
        <div style={{ width: 6, height: 6, borderRadius: 3, background: wfInk, opacity: 0.3 }} />
      </div>
    </div>
  );
}

function SplashB() {
  // Full-bleed photo with overlay name at bottom
  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', background: wfPaper }}>
      <WfStatusBarAbsolute />
      <div style={{ position: 'absolute', inset: 0, padding: 0 }}>
        <WfImage w={360} h={720} label="full-bleed hero photo of Marnie" radius={0} photo />
      </div>
      <div style={{ position: 'absolute', bottom: 90, left: 0, right: 0, padding: '0 32px', textAlign: 'center' }}>
        <WfBox w={296} h={120} radius={14} fill={wfPaper} strokeWidth={1.5} style={{ margin: '0 auto' }}>
          <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ fontFamily: '"Caveat", cursive', fontSize: 48, color: wfInk, fontWeight: 700, lineHeight: 1 }}>MyMarnie</div>
            <WfUnderline width={120} style={{ marginTop: 4 }} />
            <div style={{ fontFamily: '"Architects Daughter", cursive', fontSize: 12, color: wfMuted, marginTop: 12 }}>
              loading the love…
            </div>
          </div>
        </WfBox>
      </div>
    </div>
  );
}

function SplashC() {
  // Polaroid-style: photo with handwritten caption underneath, like a scrapbook
  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', background: wfPaper, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <WfStatusBarAbsolute />
      <div style={{ transform: 'rotate(-3deg)', position: 'relative' }}>
        <WfBox w={240} h={300} radius={4} fill="#fff" strokeWidth={1.4}>
          <div style={{ padding: 14, height: '100%', display: 'flex', flexDirection: 'column' }}>
            <WfImage w={212} h={212} label="Marnie" photo />
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: '"Caveat", cursive', fontSize: 28, color: wfInk, marginTop: 6 }}>
              MyMarnie ♡
            </div>
          </div>
        </WfBox>
      </div>
      <div style={{ marginTop: 36, textAlign: 'center' }}>
        <div style={{ fontFamily: '"Architects Daughter", cursive', fontSize: 12, color: wfMuted, letterSpacing: 1 }}>
          EST. 2026 · ONE GOOD GIRL
        </div>
        <div style={{ marginTop: 14, display: 'inline-flex', gap: 4, alignItems: 'center' }}>
          <WfCircle size={10} fill={wfRuby} stroke={wfRuby} />
          <WfCircle size={10} fill={wfRubyLight} stroke={wfRuby} />
          <WfCircle size={10} fill={wfRubyLight} stroke={wfRuby} />
        </div>
      </div>
    </div>
  );
}

// Helper: status bar pinned to top
function WfStatusBarAbsolute() {
  return (
    <div data-wf-statusbar style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 10 }}>
      <WfStatusBar />
    </div>
  );
}

Object.assign(window, { SplashA, SplashB, SplashC, WfStatusBarAbsolute });
