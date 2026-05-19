/* global React */
const { useEffect, useState } = React;
const { Card, Badge, Button, IconBtn, Eyebrow, Avatar } = window.CodisAtoms;

const ROLES = [
  'SYSADMIN','SECURITY_ADMIN','CISO','DATA_OWNER','SYSTEM_OWNER',
  'RISK_MANAGER','AUDITOR','ANALYST','INTEGRATION_ADMIN',
  'LOCATION_ADMIN','DICTIONARY_ADMIN','USER_ADMIN','VIEWER',
];

const SCOPES = ['ORG','LOCATION','OWNER','OT','RISK','DOMAIN','FIELD','EMERGENCY'];

// rough enforcement matrix derived from the requirements doc
const MATRIX = {
  SYSADMIN:        { ORG:'none',     LOCATION:'none', OWNER:'none', OT:'deny',  RISK:'none',  DOMAIN:'none',  FIELD:'masked', EMERGENCY:'break-glass only' },
  SECURITY_ADMIN:  { ORG:'all',      LOCATION:'all',  OWNER:'all',  OT:'grant', RISK:'full',  DOMAIN:'all',   FIELD:'full',   EMERGENCY:'admin' },
  CISO:            { ORG:'all',      LOCATION:'all',  OWNER:'all',  OT:'grant', RISK:'full',  DOMAIN:'all',   FIELD:'full',   EMERGENCY:'approver' },
  DATA_OWNER:      { ORG:'unit',     LOCATION:'unit', OWNER:'self', OT:'opt-in',RISK:'agg',   DOMAIN:'subset',FIELD:'partial',EMERGENCY:'request' },
  SYSTEM_OWNER:    { ORG:'unit',     LOCATION:'unit', OWNER:'self', OT:'opt-in',RISK:'agg',   DOMAIN:'subset',FIELD:'partial',EMERGENCY:'request' },
  RISK_MANAGER:    { ORG:'all',      LOCATION:'all',  OWNER:'all',  OT:'grant', RISK:'full',  DOMAIN:'all',   FIELD:'partial',EMERGENCY:'request' },
  AUDITOR:         { ORG:'all',      LOCATION:'all',  OWNER:'all',  OT:'deny',  RISK:'agg',   DOMAIN:'all',   FIELD:'masked', EMERGENCY:'request' },
  ANALYST:         { ORG:'unit',     LOCATION:'unit', OWNER:'all',  OT:'deny',  RISK:'agg',   DOMAIN:'subset',FIELD:'masked', EMERGENCY:'request' },
  INTEGRATION_ADMIN:{ ORG:'config',  LOCATION:'config',OWNER:'none',OT:'deny',  RISK:'none',  DOMAIN:'config',FIELD:'masked', EMERGENCY:'request' },
  LOCATION_ADMIN:  { ORG:'all',      LOCATION:'all',  OWNER:'none', OT:'config',RISK:'none',  DOMAIN:'none',  FIELD:'masked', EMERGENCY:'request' },
  DICTIONARY_ADMIN:{ ORG:'config',   LOCATION:'config',OWNER:'none',OT:'deny',  RISK:'none',  DOMAIN:'config',FIELD:'masked', EMERGENCY:'request' },
  USER_ADMIN:      { ORG:'all',      LOCATION:'none', OWNER:'all',  OT:'deny',  RISK:'none',  DOMAIN:'none',  FIELD:'masked', EMERGENCY:'request' },
  VIEWER:          { ORG:'unit',     LOCATION:'unit', OWNER:'all',  OT:'deny',  RISK:'none',  DOMAIN:'subset',FIELD:'masked', EMERGENCY:'request' },
};

const TONE = {
  'all':       {bg:'#DCFCE7', fg:'#15803D'},
  'full':      {bg:'#DCFCE7', fg:'#15803D'},
  'grant':     {bg:'#DCFCE7', fg:'#15803D'},
  'unit':      {bg:'#FEF3EE', fg:'#D14E22'},
  'subset':    {bg:'#FEF3EE', fg:'#D14E22'},
  'self':      {bg:'#FEF3EE', fg:'#D14E22'},
  'partial':   {bg:'#FEF3C7', fg:'#92400E'},
  'agg':       {bg:'#FEF3C7', fg:'#92400E'},
  'opt-in':    {bg:'#FEF3C7', fg:'#92400E'},
  'masked':    {bg:'#F4F4F5', fg:'#52525B'},
  'config':    {bg:'#DBEAFE', fg:'#1D4ED8'},
  'admin':     {bg:'#EAD6F9', fg:'#5B1F9C'},
  'approver':  {bg:'#EAD6F9', fg:'#5B1F9C'},
  'request':   {bg:'#F4F4F5', fg:'#52525B'},
  'none':      {bg:'#1A1A1A', fg:'#71717A'},
  'deny':      {bg:'#FEE2E2', fg:'#B91C1C'},
  'break-glass only': {bg:'#FEE2E2', fg:'#B91C1C'},
};

function ScopeMatrixScreen() {
  useEffect(() => { window.lucide && window.lucide.createIcons(); });
  const [hover, setHover] = useState(null);

  return (
    <div style={{padding:'22px 28px', display:'flex', flexDirection:'column', gap:16}}>
      <Card padding={20} style={{background:'#1A1A1A', color:'#F4F4F5', borderColor:'#1A1A1A'}}>
        <Eyebrow color="var(--codis-orange)">M10 · Scope engine</Eyebrow>
        <div style={{fontFamily:'var(--font-display)', fontSize:24, fontWeight:600, marginTop:4, letterSpacing:'-0.01em'}}>RBAC = actions. Scope = data. RLS enforces it.</div>
        <div style={{fontSize:13, color:'#A1A1AA', marginTop:8, maxWidth:760, lineHeight:1.55}}>
          Eight scope axes are AND-combined per request. Direct SQL bypass is blocked at the PostgreSQL row-security layer, regardless of how the read came in: API, export, scheduled report.
        </div>
      </Card>

      <Card padding={0} style={{overflow:'hidden'}}>
        <div style={{display:'grid', gridTemplateColumns:`200px repeat(${SCOPES.length}, 1fr)`, fontFamily:'var(--font-sans)'}}>
          {/* header row */}
          <div style={{padding:'14px 16px', borderBottom:'1px solid var(--border)', background:'var(--bg-muted)', fontSize:10.5, fontWeight:600, color:'var(--fg-subtle)', letterSpacing:'.08em', textTransform:'uppercase'}}>Role  ·  Scope axis →</div>
          {SCOPES.map(s => (
            <div key={s} style={{padding:'14px 12px', borderBottom:'1px solid var(--border)', borderLeft:'1px solid var(--divider)', background:'var(--bg-muted)', fontFamily:'var(--font-mono)', fontSize:11, fontWeight:600, color:'var(--fg)', textAlign:'center'}}>
              {s}_SCOPE
            </div>
          ))}

          {ROLES.map((role, ri) => (
            <React.Fragment key={role}>
              <div style={{padding:'12px 16px', borderBottom: ri<ROLES.length-1?'1px solid var(--divider)':'none', fontFamily:'var(--font-mono)', fontSize:12, color:'var(--fg)', fontWeight:500, background: hover===role?'var(--bg-muted)':'transparent'}}
                onMouseEnter={()=>setHover(role)} onMouseLeave={()=>setHover(null)}>
                {role}
              </div>
              {SCOPES.map(s => {
                const v = MATRIX[role][s];
                const t = TONE[v] || TONE['none'];
                return (
                  <div key={s} style={{padding:'10px 8px', borderBottom: ri<ROLES.length-1?'1px solid var(--divider)':'none', borderLeft:'1px solid var(--divider)', display:'flex', alignItems:'center', justifyContent:'center', background: hover===role?'var(--bg-muted)':'transparent'}}>
                    <span style={{
                      display:'inline-block', padding:'3px 8px', borderRadius:5,
                      background:t.bg, color:t.fg, fontSize:10.5, fontWeight:600,
                      fontFamily:'var(--font-mono)', textTransform: v.length<10?'uppercase':'none', letterSpacing:'.04em',
                    }}>{v}</span>
                  </div>
                );
              })}
            </React.Fragment>
          ))}
        </div>
      </Card>

      <Card padding={18}>
        <Eyebrow>Critical SoD rules</Eyebrow>
        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:12, marginTop:10}}>
          {[
            'Users cannot self-assign critical roles (USER_ADMIN, SECURITY_ADMIN, IB_ADMIN equivalents).',
            'SYSADMIN has no business-data scope by default — break-glass only, dual-approved, fully audited.',
            'DICTIONARY_ADMIN and INTEGRATION_ADMIN do not gain global asset access automatically.',
            'AUDITOR has no OT_SCOPE by default — must be explicitly granted.',
          ].map((rule,i)=>(
            <div key={i} style={{display:'flex', alignItems:'flex-start', gap:10, padding:12, background:'var(--bg-muted)', borderRadius:9, border:'1px solid var(--border)'}}>
              <div style={{width:22, height:22, borderRadius:5, background:'var(--codis-orange)', color:'#fff', display:'flex', alignItems:'center', justifyContent:'center', fontSize:11, fontFamily:'var(--font-mono)', fontWeight:700, flexShrink:0}}>{i+1}</div>
              <div style={{fontSize:12.5, lineHeight:1.5}}>{rule}</div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

window.ScopeMatrixScreen = ScopeMatrixScreen;
