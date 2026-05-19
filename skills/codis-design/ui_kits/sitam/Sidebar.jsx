/* global React */
const { useEffect } = React;

function Sidebar({ active, onNav }) {
  useEffect(() => { window.lucide && window.lucide.createIcons(); });
  const groups = [
    { label: 'M01–M06 · Core', items: [
      { id: 'dashboard', icon: 'gauge',           label: 'Dashboard',     mod:'M06' },
      { id: 'assets',    icon: 'package',         label: 'Asset registry',mod:'M01', count: 1284 },
      { id: 'risks',     icon: 'shield-alert',    label: 'Risk register', mod:'M03', count: 47 },
      { id: 'audit',     icon: 'list-checks',     label: 'Audit log',     mod:'M04' },
      { id: 'reports',   icon: 'file-bar-chart',  label: 'Reports',       mod:'M06' },
    ]},
    { label: 'M07–M12 · Governance', items: [
      { id: 'access',    icon: 'key-round',       label: 'Access requests',mod:'M02', count: 3 },
      { id: 'users',     icon: 'users',           label: 'Users & org',    mod:'M07' },
      { id: 'locations', icon: 'map-pin',         label: 'Locations · OT', mod:'M09' },
      { id: 'scope',     icon: 'scan-eye',        label: 'Scope policies', mod:'M10' },
      { id: 'integrate', icon: 'plug',            label: 'Integrations',   mod:'M11' },
      { id: 'dict',      icon: 'book-open',       label: 'Dictionaries',   mod:'M08' },
    ]},
    { label: 'M05 · Platform', items: [
      { id: 'platform',  icon: 'server-cog',      label: 'Platform admin', mod:'M05' },
    ]},
  ];

  return (
    <aside style={{
      width: 268, background: 'var(--surface)', borderRight: '1px solid var(--border)',
      display: 'flex', flexDirection: 'column', height: '100%', flexShrink:0,
    }}>
      <div style={{ padding: '18px 20px 16px', display: 'flex', alignItems: 'center', gap: 10, borderBottom: '1px solid var(--divider)' }}>
        <img src={(window.__resources && window.__resources.faviconBadge) || "../../assets/favicon-180.png"} width="28" height="28" style={{ borderRadius: 7 }} />
        <div style={{lineHeight:1.05}}>
          <div style={{fontFamily:'var(--font-logo, var(--font-display))', fontSize:17, fontWeight:700, letterSpacing:'-0.01em'}}>SITAM</div>
          <div style={{fontSize:10, color:'var(--fg-subtle)', letterSpacing:'.06em', textTransform:'uppercase', marginTop:2}}>ОГТСУ · Asset registry</div>
        </div>
      </div>
      <nav style={{ padding: 10, flex: 1, overflowY: 'auto' }}>
        {groups.map((g, gi) => (
          <div key={gi} style={{ marginBottom: 14 }}>
            <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '.10em', textTransform: 'uppercase', color: 'var(--fg-subtle)', padding: '8px 10px 6px' }}>{g.label}</div>
            {g.items.map(item => {
              const isActive = active === item.id;
              return (
                <button key={item.id} onClick={() => onNav(item.id)} style={{
                  width: '100%', display: 'flex', alignItems: 'center', gap: 10,
                  padding: '8px 10px', borderRadius: 9, border: 'none', cursor: 'pointer',
                  background: isActive ? 'var(--accent-soft)' : 'transparent',
                  color: isActive ? 'var(--accent)' : 'var(--fg)',
                  fontSize: 13.5, fontFamily: 'var(--font-sans)', fontWeight: isActive ? 600 : 500,
                  textAlign: 'left', marginBottom:1,
                }}>
                  <i data-lucide={item.icon} style={{ width: 17, height: 17, strokeWidth: 1.5 }}></i>
                  <span style={{ flex: 1 }}>{item.label}</span>
                  <span style={{fontSize:9.5, fontFamily:'var(--font-mono)', color: isActive ? 'var(--accent)' : 'var(--fg-subtle)', opacity:0.7}}>{item.mod}</span>
                  {item.count != null && (
                    <span style={{ fontSize: 10.5, fontWeight: 600, padding: '1px 6px', borderRadius: 999,
                      background: isActive ? 'var(--accent)' : 'var(--gray-100)',
                      color: isActive ? '#fff' : 'var(--fg-muted)',
                      fontFamily:'var(--font-mono)',
                    }}>{item.count}</span>
                  )}
                </button>
              );
            })}
          </div>
        ))}
      </nav>
      <div style={{ padding: '12px 14px', borderTop: '1px solid var(--divider)', background:'var(--bg-muted)' }}>
        <div style={{display:'flex', alignItems:'center', gap:10}}>
          <div style={{ width: 30, height: 30, borderRadius: '50%', background: 'var(--codis-orange)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 600 }}>VK</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 12.5, fontWeight: 600, color: 'var(--fg)' }}>Vicky Kovalenko</div>
            <div style={{ fontSize: 10.5, color: 'var(--fg-muted)', fontFamily:'var(--font-mono)' }}>CISO · break-glass off</div>
          </div>
          <i data-lucide="chevron-up" style={{width:14,height:14, color:'var(--fg-subtle)', strokeWidth:1.5}}></i>
        </div>
      </div>
    </aside>
  );
}

window.Sidebar = Sidebar;
