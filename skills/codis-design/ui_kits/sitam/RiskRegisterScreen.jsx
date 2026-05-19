/* global React */
const { useEffect, useState } = React;
const { Card, Badge, Button, IconBtn, Eyebrow, AssetIdMono, Avatar } = window.CodisAtoms;

const RISKS = [
  { id:'RSK-0421-003', asset:'ASSET-20260418-00102', threat:'Ransomware', vuln:'Legacy SMBv1 on jump host', prob:0.30, cia:[5,5,5], score:7.5,  zone:'Medium',  treatment:'ACCEPT',   status:'CISO approved', owner:'V.Kovalenko' },
  { id:'RSK-0420-009', asset:'ASSET-20260420-00184', threat:'Credential stuffing on AD', vuln:'No MFA on service accounts', prob:0.50, cia:[4,5,5], score:12.5, zone:'High',    treatment:'MITIGATE', status:'In progress',   owner:'V.Lytvyn' },
  { id:'RSK-0418-002', asset:'ASSET-20260418-00098', threat:'Privileged DBA misuse', vuln:'No SoD on DBA roles', prob:0.20, cia:[5,5,4], score:5.0,  zone:'Medium',  treatment:'MITIGATE', status:'Open',          owner:'M.Bondar' },
  { id:'RSK-0415-001', asset:'ASSET-20260415-00077', threat:'PLC firmware tampering', vuln:'No signed firmware', prob:0.40, cia:[3,5,5], score:10.0, zone:'High',    treatment:'MITIGATE', status:'Open',          owner:'I.Hrytsenko' },
  { id:'RSK-0411-005', asset:'ASSET-20260411-00041', threat:'NetFlow data leak', vuln:'Unencrypted exporter', prob:0.30, cia:[3,4,3], score:6.0,  zone:'Medium',  treatment:'AVOID',    status:'Done',          owner:'V.Kovalenko' },
];

function RiskRegisterScreen() {
  useEffect(() => { window.lucide && window.lucide.createIcons(); });
  const [accepting, setAccepting] = useState(null);

  return (
    <div style={{padding:'22px 28px', display:'flex', flexDirection:'column', gap:16}}>
      {/* Treatment summary */}
      <div style={{display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:12}}>
        {[
          {label:'MITIGATE', count:28, color:'#E76033'},
          {label:'AVOID',    count:6,  color:'#16A34A'},
          {label:'TRANSFER', count:3,  color:'#2563EB'},
          {label:'ACCEPT',   count:10, color:'#7828C8'},
        ].map(t => (
          <Card key={t.label} padding={16}>
            <div style={{fontFamily:'var(--font-mono)', fontSize:11, color:'var(--fg-subtle)', letterSpacing:'.08em'}}>{t.label}</div>
            <div style={{display:'flex', alignItems:'baseline', gap:8, marginTop:6}}>
              <div style={{fontFamily:'var(--font-display)', fontSize:30, fontWeight:700, color:t.color, lineHeight:1, letterSpacing:'-0.02em'}}>{t.count}</div>
              <div style={{fontSize:12, color:'var(--fg-muted)'}}>scenarios</div>
            </div>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <Card padding={14}>
        <div style={{display:'flex', gap:10, alignItems:'center'}}>
          <Eyebrow>Filter</Eyebrow>
          {['All','Critical','High','Medium','Low'].map(f => (
            <button key={f} style={{
              fontFamily:'var(--font-sans)', fontSize:12.5, padding:'6px 12px', borderRadius:8,
              border:'1px solid var(--border)', background: f==='All' ? 'var(--accent-soft)' : 'var(--surface)',
              color: f==='All' ? 'var(--accent)' : 'var(--fg)',
              fontWeight: f==='All' ? 600 : 500, cursor:'pointer',
            }}>{f}</button>
          ))}
          <div style={{flex:1}}/>
          <Button variant="secondary" size="sm" icon="download">Export risk register</Button>
          <Button variant="primary" size="sm" icon="plus">New scenario</Button>
        </div>
      </Card>

      {/* Risk table */}
      <Card padding={0} style={{overflow:'hidden'}}>
        <div style={{
          display:'grid',
          gridTemplateColumns:'140px 1fr 220px 90px 110px 130px 36px',
          padding:'12px 18px', gap:14, fontSize:10.5, fontWeight:600, color:'var(--fg-subtle)',
          letterSpacing:'.08em', textTransform:'uppercase', background:'var(--bg-muted)',
          borderBottom:'1px solid var(--border)',
        }}>
          <div>Risk ID</div>
          <div>Threat × Vulnerability</div>
          <div>Asset</div>
          <div>Score</div>
          <div>Treatment</div>
          <div>Status</div>
          <div></div>
        </div>
        {RISKS.map((r,i)=>(
          <div key={r.id} style={{
            display:'grid',
            gridTemplateColumns:'140px 1fr 220px 90px 110px 130px 36px',
            padding:'14px 18px', gap:14, alignItems:'center',
            borderBottom:i<RISKS.length-1?'1px solid var(--divider)':'none',
          }}>
            <div style={{fontFamily:'var(--font-mono)', fontSize:12, color:'var(--fg)', fontWeight:500}}>{r.id}</div>
            <div>
              <div style={{fontSize:13.5, fontWeight:600}}>{r.threat}</div>
              <div style={{fontSize:11.5, color:'var(--fg-muted)', fontFamily:'var(--font-mono)', marginTop:2}}>{r.vuln}</div>
            </div>
            <AssetIdMono id={r.asset} size="sm"/>
            <div style={{display:'flex', alignItems:'center', gap:6}}>
              <div style={{
                fontFamily:'var(--font-display)', fontWeight:700, fontSize:18, lineHeight:1,
                color: r.score>=15?'#DC2626':r.score>=10?'#EA580C':r.score>=5?'#F59E0B':'#16A34A',
              }}>{r.score.toFixed(1)}</div>
              <Badge tone={r.score>=15?'red':r.score>=10?'amber':r.score>=5?'amber':'green'} dot={false} style={{fontSize:9.5,padding:'1px 5px'}}>{r.zone}</Badge>
            </div>
            <Badge tone={r.treatment==='ACCEPT'?'purple':r.treatment==='AVOID'?'green':r.treatment==='TRANSFER'?'blue':'orange'}>{r.treatment}</Badge>
            <div style={{fontSize:12, color:'var(--fg-muted)'}}>{r.status}</div>
            <i data-lucide="chevron-right" style={{width:16,height:16,color:'var(--fg-subtle)'}}></i>
          </div>
        ))}
      </Card>

      {/* Acceptance call-out */}
      <Card padding={18} style={{background:'#FEF3EE', borderColor:'#FCD9C9'}}>
        <div style={{display:'flex', alignItems:'flex-start', gap:14}}>
          <div style={{width:36, height:36, borderRadius:9, background:'var(--codis-orange)', color:'#fff', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0}}>
            <i data-lucide="alert-triangle" style={{width:18,height:18,strokeWidth:1.7}}></i>
          </div>
          <div style={{flex:1}}>
            <div style={{fontSize:13, fontWeight:600}}>Risk acceptance for HIGH / CRITICAL / OT</div>
            <div style={{fontSize:12, color:'var(--fg-muted)', marginTop:3, lineHeight:1.5}}>
              Per FR-M03-03-002, ACCEPT is unavailable without CISO or SECURITY_ADMIN approval. Phase 1 uses 2-person digital signature; Phase 2 attaches КЕП/EDS for legal weight.
            </div>
          </div>
          <Button variant="dark" size="sm" icon="signature">Phase 2 · КЕП/EDS</Button>
        </div>
      </Card>
    </div>
  );
}

window.RiskRegisterScreen = RiskRegisterScreen;
