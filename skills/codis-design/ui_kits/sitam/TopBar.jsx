/* global React */
const { useEffect } = React;
const { IconBtn, Badge } = window.CodisAtoms;

function TopBar({ title, subtitle, actions, breadcrumbs }) {
  useEffect(() => { window.lucide && window.lucide.createIcons(); });
  return (
    <header style={{
      height: 68, borderBottom: '1px solid var(--border)', background: 'var(--surface)',
      display: 'flex', alignItems: 'center', padding: '0 24px', gap: 14, flexShrink:0,
    }}>
      <div style={{ flex: 1, minWidth:0 }}>
        {breadcrumbs && (
          <div style={{display:'flex', alignItems:'center', gap:6, fontSize:11, color:'var(--fg-subtle)', marginBottom:3, fontFamily:'var(--font-mono)'}}>
            {breadcrumbs.map((b,i)=>(
              <React.Fragment key={i}>
                {i>0 && <span>/</span>}
                <span style={{color: i===breadcrumbs.length-1 ? 'var(--fg-muted)' : 'var(--fg-subtle)'}}>{b}</span>
              </React.Fragment>
            ))}
          </div>
        )}
        <div style={{display:'flex', alignItems:'center', gap:10}}>
          <div style={{ fontSize: 19, fontWeight: 600, color: 'var(--fg)', fontFamily: 'var(--font-display)', letterSpacing:'-0.01em' }}>{title}</div>
          {subtitle && <div style={{ fontSize: 12.5, color: 'var(--fg-muted)' }}>· {subtitle}</div>}
        </div>
      </div>
      <div style={{ position: 'relative', width: 300 }}>
        <i data-lucide="search" style={{ width: 15, height: 15, position: 'absolute', left: 11, top: 10, color: 'var(--fg-subtle)' }}></i>
        <input placeholder="Search assets, IDs, locations…" style={{
          width: '100%', padding: '8px 12px 8px 33px', border: '1px solid var(--border)',
          borderRadius: 9, fontSize: 12.5, background: 'var(--bg-muted)', color: 'var(--fg)',
          fontFamily: 'var(--font-sans)', outline: 'none', boxSizing: 'border-box',
        }} />
        <span style={{position:'absolute', right:10, top:8, fontSize:10.5, color:'var(--fg-subtle)', fontFamily:'var(--font-mono)', padding:'1px 6px', border:'1px solid var(--border)', borderRadius:4, background:'var(--surface)'}}>⌘K</span>
      </div>
      <Badge tone="green" dot={true} style={{fontSize:11}}>on-prem · air-gap ready</Badge>
      <IconBtn icon="bell" />
      <IconBtn icon="help-circle" />
      {actions}
    </header>
  );
}

window.TopBar = TopBar;
