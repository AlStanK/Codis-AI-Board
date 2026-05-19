/* global React */
const { useState } = React;

// ---------- Button ----------
function Button({ variant = 'primary', size = 'md', icon, iconRight, children, onClick, style, disabled }) {
  const base = {
    fontFamily: 'var(--font-sans)', fontWeight: 500, border: '1px solid transparent',
    borderRadius: 10, cursor: disabled ? 'not-allowed' : 'pointer',
    display: 'inline-flex', alignItems: 'center', gap: 8,
    transition: 'all 200ms cubic-bezier(.2,.7,.2,1)', whiteSpace: 'nowrap',
    opacity: disabled ? 0.55 : 1,
  };
  const sizes = {
    sm: { fontSize: 13, padding: '6px 12px' },
    md: { fontSize: 14, padding: '9px 16px' },
    lg: { fontSize: 15, padding: '12px 22px' },
  };
  const variants = {
    primary:   { background: 'var(--codis-orange)', color: '#fff' },
    secondary: { background: 'var(--surface)', color: 'var(--fg)', borderColor: 'var(--border)' },
    ghost:     { background: 'transparent', color: 'var(--fg)' },
    dark:      { background: 'var(--codis-black)', color: '#fff' },
    danger:    { background: 'var(--surface)', color: '#B91C1C', borderColor: '#FCA5A5' },
  };
  return (
    <button onClick={disabled ? undefined : onClick} disabled={disabled} style={{ ...base, ...sizes[size], ...variants[variant], ...style }}>
      {icon && <i data-lucide={icon} style={{ width: 16, height: 16, strokeWidth: 1.75 }}></i>}
      {children}
      {iconRight && <i data-lucide={iconRight} style={{ width: 16, height: 16, strokeWidth: 1.75 }}></i>}
    </button>
  );
}

// ---------- IconBtn ----------
function IconBtn({ icon, onClick, active, title }) {
  return (
    <button onClick={onClick} title={title} style={{
      width: 34, height: 34, border: '1px solid var(--border)', borderRadius: 9,
      background: active ? 'var(--accent-soft)' : 'var(--surface)',
      color: active ? 'var(--accent)' : 'var(--fg)',
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
    }}>
      <i data-lucide={icon} style={{ width: 17, height: 17, strokeWidth: 1.6 }}></i>
    </button>
  );
}

// ---------- Badge ----------
function Badge({ tone = 'grey', children, dot = true, style }) {
  const tones = {
    grey:   { bg: '#F4F4F5', fg: '#52525B', dot: '#71717A' },
    orange: { bg: '#FEF3EE', fg: '#D14E22', dot: '#E76033' },
    green:  { bg: '#DCFCE7', fg: '#15803D', dot: '#16A34A' },
    amber:  { bg: '#FEF3C7', fg: '#92400E', dot: '#F59E0B' },
    red:    { bg: '#FEE2E2', fg: '#B91C1C', dot: '#DC2626' },
    blue:   { bg: '#DBEAFE', fg: '#1D4ED8', dot: '#2563EB' },
    purple: { bg: '#EAD6F9', fg: '#5B1F9C', dot: '#7828C8' },
    dark:   { bg: '#1A1A1A', fg: '#fff', dot: '#E76033' },
  }[tone];
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 12, fontWeight: 600,
      padding: '3px 9px', borderRadius: 999, background: tones.bg, color: tones.fg,
      lineHeight: 1.4, ...style,
    }}>
      {dot && <span style={{ width: 5, height: 5, borderRadius: '50%', background: tones.dot, flexShrink: 0 }}></span>}
      {children}
    </span>
  );
}

// ---------- ScopeChip — visualises a Scope axis (M10) ----------
function ScopeChip({ kind, value, masked }) {
  // ORG | LOCATION | OWNER | OT | RISK | DOMAIN | FIELD | EMERGENCY
  const tones = {
    ORG:'blue', LOCATION:'blue', OWNER:'grey', OT:'red', RISK:'purple',
    DOMAIN:'grey', FIELD:'amber', EMERGENCY:'red',
  };
  return (
    <span style={{
      display:'inline-flex', alignItems:'center', gap:6, fontFamily:'var(--font-mono)',
      fontSize:11.5, padding:'3px 8px', borderRadius:6,
      background: masked ? '#1A1A1A' : 'var(--bg-subtle)',
      color: masked ? '#71717A' : 'var(--fg)',
      border: '1px solid var(--border)',
    }}>
      <Badge tone={tones[kind]||'grey'} dot={true} style={{padding:'1px 6px',fontSize:10}}>{kind}</Badge>
      <span>{masked ? '••••••' : value}</span>
    </span>
  );
}

// ---------- AssetIdMono — formats ASSET-YYYYMMDD-NNNNN ----------
function AssetIdMono({ id, size = 'md' }) {
  const sizes = { sm: 11.5, md: 13, lg: 15 };
  return (
    <span style={{
      fontFamily:'var(--font-mono)', fontSize: sizes[size], color:'var(--fg)',
      letterSpacing:'-0.01em', fontWeight: 500,
    }}>{id}</span>
  );
}

// ---------- Card ----------
function Card({ children, style, padding = 20 }) {
  return (
    <div style={{
      background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14,
      padding, boxShadow: 'var(--shadow-sm)', ...style,
    }}>{children}</div>
  );
}

// ---------- Field ----------
function Field({ label, hint, required, children, style }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, ...style }}>
      {label && (
        <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--fg)', display:'flex', alignItems:'center', gap:5 }}>
          {label}
          {required && <span style={{color:'var(--codis-orange)'}}>*</span>}
        </label>
      )}
      {children}
      {hint && <div style={{ fontSize: 11.5, color: 'var(--fg-muted)' }}>{hint}</div>}
    </div>
  );
}

const inputStyle = {
  width: '100%', fontFamily: 'var(--font-sans)', fontSize: 13.5, padding: '9px 11px',
  border: '1px solid var(--border)', borderRadius: 9, background: 'var(--surface)',
  color: 'var(--fg)', boxSizing: 'border-box', outline: 'none',
};

// ---------- Eyebrow ----------
function Eyebrow({ children, color }) {
  return <div style={{ fontSize: 10.5, fontWeight: 600, letterSpacing: '.10em', textTransform: 'uppercase', color: color || 'var(--fg-subtle)' }}>{children}</div>;
}

// ---------- Avatar (initials) ----------
function Avatar({ name, size = 28, tone = 'orange' }) {
  const initials = (name || '?').split(' ').map(s=>s[0]).slice(0,2).join('').toUpperCase();
  const tones = { orange:'#E76033', purple:'#7828C8', dark:'#1A1A1A', grey:'#52525B' };
  return (
    <div style={{
      width:size, height:size, borderRadius:'50%', background:tones[tone], color:'#fff',
      display:'inline-flex', alignItems:'center', justifyContent:'center',
      fontSize: size*0.40, fontWeight:600, flexShrink:0, fontFamily:'var(--font-sans)',
    }}>{initials}</div>
  );
}

// ---------- KPI tile ----------
function KPI({ label, value, sub, tone, accent }) {
  const accentColor = {
    orange:'var(--codis-orange)', red:'#DC2626', green:'#16A34A', amber:'#F59E0B', blue:'#2563EB', purple:'#7828C8',
  }[accent] || 'var(--fg)';
  return (
    <Card padding={18} style={{minHeight:110, display:'flex', flexDirection:'column', justifyContent:'space-between'}}>
      <div style={{fontSize:12, color:'var(--fg-muted)', fontWeight:500}}>{label}</div>
      <div style={{display:'flex', alignItems:'baseline', gap:10}}>
        <div style={{fontFamily:'var(--font-display)', fontSize:34, fontWeight:600, color:accentColor, letterSpacing:'-0.02em', lineHeight:1}}>{value}</div>
        {sub && <div style={{fontSize:12, color:'var(--fg-muted)'}}>{sub}</div>}
      </div>
      {tone && <div style={{marginTop:6}}>{tone}</div>}
    </Card>
  );
}

window.CodisAtoms = { Button, IconBtn, Badge, ScopeChip, AssetIdMono, Card, Field, Eyebrow, Avatar, KPI, inputStyle };
