// Login screen variations — Apple + Google SSO

function LoginA() {
  // Stacked: small avatar, welcome text, two big SSO buttons
  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', background: wfPaper, display: 'flex', flexDirection: 'column', padding: '60px 28px 40px' }}>
      <WfStatusBarAbsolute />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 18 }}>
        <WfCircle size={80} hatch>
          <div style={{ fontFamily: '"Caveat", cursive', fontSize: 13, color: wfMuted, textAlign: 'center' }}>logo</div>
        </WfCircle>
        <div style={{ textAlign: 'center', marginTop: 4 }}>
          <div style={{ fontFamily: '"Caveat", cursive', fontSize: 36, color: wfInk, fontWeight: 700, lineHeight: 1 }}>Welcome back!</div>
          <div style={{ fontFamily: '"Architects Daughter", cursive', fontSize: 14, color: wfMuted, marginTop: 8, lineHeight: 1.4 }}>
            sign in to keep tabs<br/>on your good girl
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <WfButton w={304} h={50} primary icon={<span style={{ fontSize: 16 }}></span>}>Continue with Apple</WfButton>
        <WfButton w={304} h={50} icon={<span style={{ fontSize: 14, fontWeight: 700 }}>G</span>}>Continue with Google</WfButton>
        <div style={{ textAlign: 'center', marginTop: 12, fontFamily: '"Architects Daughter", cursive', fontSize: 11, color: wfMuted, lineHeight: 1.4 }}>
          by signing in you agree to our<br/>
          <span style={{ borderBottom: `1px dashed ${wfMuted}` }}>terms</span> & <span style={{ borderBottom: `1px dashed ${wfMuted}` }}>privacy</span>
        </div>
      </div>
    </div>
  );
}

function LoginB() {
  // Card-based: a centered card with photo on top, SSO inside
  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', background: wfPaper, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '60px 22px' }}>
      <WfStatusBarAbsolute />
      <div style={{ marginBottom: 20, fontFamily: '"Caveat", cursive', fontSize: 32, color: wfInk, fontWeight: 700 }}>MyMarnie</div>
      <WfBox w={316} h={420} radius={16} fill="#fff">
        <div style={{ position: 'absolute', inset: 0, padding: '28px 22px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <WfCircle size={88} hatch />
          <div style={{ fontFamily: '"Architects Daughter", cursive', fontSize: 16, color: wfInk, fontWeight: 700, marginTop: 18, textAlign: 'center' }}>
            Hi! Who's tracking?
          </div>
          <div style={{ fontFamily: '"Architects Daughter", cursive', fontSize: 12, color: wfMuted, marginTop: 6, textAlign: 'center', lineHeight: 1.3 }}>
            we'll keep your dog data<br/>private &amp; pawsome
          </div>
          <div style={{ flex: 1 }} />
          <WfButton w={272} h={46} primary>Continue with Apple</WfButton>
          <div style={{ height: 10 }} />
          <WfButton w={272} h={46}>Continue with Google</WfButton>
          <div style={{ marginTop: 14, fontFamily: '"Architects Daughter", cursive', fontSize: 10, color: wfMuted }}>
            no email, no password, no fuss
          </div>
        </div>
      </WfBox>
    </div>
  );
}

function LoginC() {
  // Minimal: photo background, large SSO buttons at bottom, "or" divider
  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', background: wfPaper, display: 'flex', flexDirection: 'column' }}>
      <WfStatusBarAbsolute />
      <div style={{ flex: 1.4, padding: '60px 28px 0' }}>
        <WfImage w={304} h={300} label="Marnie portrait" photo radius={20} style={{ margin: '0 auto' }} />
      </div>
      <div style={{ flex: 1, padding: '24px 28px 40px', display: 'flex', flexDirection: 'column' }}>
        <div style={{ fontFamily: '"Caveat", cursive', fontSize: 32, color: wfInk, fontWeight: 700, lineHeight: 1 }}>
          Let's get started
        </div>
        <div style={{ fontFamily: '"Architects Daughter", cursive', fontSize: 13, color: wfMuted, marginTop: 8 }}>
          pick how you'd like to sign in
        </div>
        <div style={{ flex: 1 }} />
        <WfButton w={304} h={48} primary>  Apple</WfButton>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, margin: '14px 0' }}>
          <div style={{ flex: 1, height: 1, borderTop: `1px dashed ${wfMuted}` }} />
          <span style={{ fontFamily: '"Caveat", cursive', fontSize: 16, color: wfMuted }}>or</span>
          <div style={{ flex: 1, height: 1, borderTop: `1px dashed ${wfMuted}` }} />
        </div>
        <WfButton w={304} h={48}>G  Google</WfButton>
      </div>
    </div>
  );
}

Object.assign(window, { LoginA, LoginB, LoginC });
