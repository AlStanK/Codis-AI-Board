/* global React */
const { useEffect, useState } = React;
const { Card, Badge, Button, IconBtn, AssetIdMono, Avatar, Eyebrow, ScopeChip, Field, inputStyle } = window.CodisAtoms;
const { FsmStepper } = window;
const { RiskScore } = window;

function AssetPassportScreen({ asset, onBack }) {
  useEffect(() => { window.lucide && window.lucide.createIcons(); });
  const [tab, setTab] = useState('overview');
  const a = asset || { id:'ASSET-20260418-00102', name:'SCADA-PRIMARY · Bar GMS', domain:'CYBER_PHYSICAL', state:'ACTIVE_MAINTENANCE', cia:[5,5,5], prob:0.40, owner:'O. Pavlenko', loc:'Boryspil · L2', dqs:97, ot:true, crit:'Critical' };

  const tabs = [
    { id:'overview', label:'Overview', icon:'layout-grid' },
    { id:'risk',     label:'Risk · M03', icon:'shield-alert' },
    { id:'rels',     label:'Relationships', icon:'git-branch' },
    { id:'audit',    label:'Audit · M04', icon:'list-checks' },
    { id:'evidence', label:'Evidence', icon:'paperclip' },
  ];

  return (
    <div style={{padding:'22px 28px', display:'flex', flexDirection:'column', gap:16}}>
      {/* Header */}
      <Card padding={20}>
        <div style={{display:'flex', alignItems:'center', gap:8, marginBottom:14}}>
          <Button variant="ghost" size="sm" icon="arrow-left" onClick={onBack}>Back to registry</Button>
          <span style={{fontSize:11, color:'var(--fg-subtle)', fontFamily:'var(--font-mono)'}}>/ M01 · Asset registry / passport</span>
        </div>
        <div style={{display:'flex', alignItems:'flex-start', gap:18}}>
          <div style={{
            width:60, height:60, borderRadius:14, background:'#1A1A1A', color:'var(--codis-orange)',
            display:'flex',alignItems:'center',justifyContent:'center', flexShrink:0,
          }}>
            <i data-lucide="cpu" style={{width:28,height:28,strokeWidth:1.5}}></i>
          </div>
          <div style={{flex:1, minWidth:0}}>
            <div style={{display:'flex', alignItems:'center', gap:10, flexWrap:'wrap'}}>
              <AssetIdMono id={a.id} size="lg"/>
              <Badge tone="red" dot={true}>OT/ICS</Badge>
              <Badge tone="green">{a.state.replace(/_/g,' ')}</Badge>
              <Badge tone="dark" dot={false}>immutable</Badge>
            </div>
            <div style={{fontFamily:'var(--font-display)', fontSize:26, fontWeight:600, marginTop:8, letterSpacing:'-0.01em'}}>{a.name}</div>
            <div style={{display:'flex', gap:18, marginTop:10, fontSize:12.5, color:'var(--fg-muted)', flexWrap:'wrap'}}>
              <span><i data-lucide="folder" style={{width:13,height:13,verticalAlign:-2,marginRight:4}}></i>{a.domain}</span>
              <span><i data-lucide="user" style={{width:13,height:13,verticalAlign:-2,marginRight:4}}></i>{a.owner}</span>
              <span><i data-lucide="map-pin" style={{width:13,height:13,verticalAlign:-2,marginRight:4}}></i>{a.loc}</span>
              <span><i data-lucide="calendar" style={{width:13,height:13,verticalAlign:-2,marginRight:4}}></i>created 2026-04-18 · updated today</span>
            </div>
          </div>
          <div style={{display:'flex', gap:8}}>
            <Button variant="secondary" size="sm" icon="git-branch">Transition</Button>
            <Button variant="secondary" size="sm" icon="paperclip">Attach evidence</Button>
            <IconBtn icon="more-horizontal"/>
          </div>
        </div>

        {/* FSM stepper */}
        <div style={{marginTop:22, padding:'18px 12px 6px', background:'var(--bg-muted)', borderRadius:12, border:'1px solid var(--border)'}}>
          <FsmStepper current={a.state}/>
        </div>
      </Card>

      {/* Tabs */}
      <div style={{display:'flex', gap:4, padding:'4px', background:'var(--surface)', borderRadius:10, border:'1px solid var(--border)', alignSelf:'flex-start'}}>
        {tabs.map(t => (
          <button key={t.id} onClick={()=>setTab(t.id)} style={{
            display:'flex', alignItems:'center', gap:6, padding:'7px 12px', border:'none',
            background: tab===t.id ? 'var(--accent-soft)' : 'transparent',
            color: tab===t.id ? 'var(--accent)' : 'var(--fg-muted)',
            fontSize:13, fontFamily:'var(--font-sans)', fontWeight: tab===t.id?600:500,
            borderRadius:7, cursor:'pointer',
          }}>
            <i data-lucide={t.icon} style={{width:15,height:15,strokeWidth:1.6}}></i>
            {t.label}
          </button>
        ))}
      </div>

      {tab==='overview' && <OverviewTab a={a}/>}
      {tab==='risk'     && <RiskTab a={a}/>}
      {tab==='rels'     && <RelationshipsTab a={a}/>}
      {tab==='audit'    && <AuditTab a={a}/>}
      {tab==='evidence' && <EvidenceTab/>}
    </div>
  );
}

function OverviewTab({ a }) {
  return (
    <div style={{display:'grid', gridTemplateColumns:'1fr 380px', gap:14}}>
      <Card padding={22}>
        <Eyebrow>Global dimensions · A.2</Eyebrow>
        <div style={{fontFamily:'var(--font-display)', fontSize:18, fontWeight:600, margin:'4px 0 16px'}}>Identity & ownership</div>

        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:16}}>
          <KV label="asset_id"  value={<AssetIdMono id={a.id} size="sm"/>}     hint="UNIQUE · immutable · regex ^ASSET-\d{8}-\d{5}$" />
          <KV label="id (PK)"   value={<span style={{fontFamily:'var(--font-mono)',fontSize:12, color:'var(--fg-muted)'}}>e6f4a217-9a2c-4d8b-b3e0-0c11f44d1c08</span>} hint="UUID · internal FKs only"/>
          <KV label="organization_id" value="ОГТСУ"/>
          <KV label="department_id"   value="IB / SOC"/>
          <KV label="owner_id"   value={<span style={{display:'inline-flex',alignItems:'center',gap:6}}><Avatar name={a.owner} size={20}/>{a.owner}</span>}/>
          <KV label="owner_department_id" value="OT operations"/>
          <KV label="location_id" value={a.loc} hint="one asset = one primary location · INV-08"/>
          <KV label="state"      value={<Badge tone="green">{a.state}</Badge>}/>
        </div>

        <div style={{height:1, background:'var(--divider)', margin:'22px 0 18px'}}/>

        <Eyebrow>specific_attributes JSONB</Eyebrow>
        <div style={{fontFamily:'var(--font-display)', fontSize:18, fontWeight:600, margin:'4px 0 14px'}}>Domain-specific (CYBER_PHYSICAL)</div>
        <pre style={{
          margin:0, padding:14, background:'#1A1A1A', color:'#F4F4F5', borderRadius:10,
          fontFamily:'var(--font-mono)', fontSize:12, lineHeight:1.6, overflowX:'auto',
        }}>
{`{
  "purdue_zone":      "L2",
  "ot_dmz":           false,
  "vendor":           "Siemens · SIMATIC PCS 7",
  "firmware":         "9.1 SP2 UC04",
  "ip":               "•••.•••.•••.•••",        // FIELD masked
  "vlan":             "••••",                    // FIELD masked
  "serial_number":    "S7-414H · S/N ••••",      // FIELD masked
  "primary_protocol": "Profinet",
  "redundancy":       "hot-standby",
  "patch_window":     "Sun 02:00–04:00 EET"
}`}
        </pre>
      </Card>

      <div style={{display:'flex', flexDirection:'column', gap:14}}>
        <Card padding={20}>
          <Eyebrow>CIA & Risk score</Eyebrow>
          <div style={{height:8}}/>
          <RiskScore probability={a.prob} c={a.cia[0]} i={a.cia[1]} a={a.cia[2]} size="lg"/>
        </Card>

        <Card padding={20}>
          <Eyebrow>DQS · M08</Eyebrow>
          <div style={{display:'flex',alignItems:'baseline',gap:10, marginTop:8, marginBottom:10}}>
            <div style={{fontFamily:'var(--font-display)',fontSize:34,fontWeight:600,color:'#16A34A',lineHeight:1,letterSpacing:'-0.02em'}}>{a.dqs}%</div>
            <div style={{fontSize:12, color:'var(--fg-muted)'}}>≥ 95% required for Critical/OT</div>
          </div>
          <div style={{height:6, background:'var(--gray-100)', borderRadius:99, overflow:'hidden'}}>
            <div style={{height:'100%', width:`${a.dqs}%`, background:'#16A34A'}}/>
          </div>
          <div style={{fontSize:11.5,color:'var(--fg-muted)',marginTop:8, fontFamily:'var(--font-mono)'}}>filled_mandatory / total_mandatory · 32 / 33 fields</div>
        </Card>

        <Card padding={20}>
          <Eyebrow>Field masking · M10.7</Eyebrow>
          <div style={{fontSize:12.5, color:'var(--fg-muted)', marginTop:6, marginBottom:10}}>Your role exposes:</div>
          <div style={{display:'flex',flexDirection:'column',gap:6}}>
            <ScopeChip kind="OT" value="L0–L5 + OT-DMZ"/>
            <ScopeChip kind="RISK" value="full · threat/vuln visible"/>
            <ScopeChip kind="FIELD" value="ip / vlan / serial" masked={true}/>
          </div>
          <div style={{fontSize:11, color:'var(--fg-subtle)', marginTop:10, fontFamily:'var(--font-mono)', lineHeight:1.45}}>
            Owner contacts are never masked when the asset is visible.
          </div>
        </Card>
      </div>
    </div>
  );
}

function KV({ label, value, hint }) {
  return (
    <div>
      <div style={{fontSize:10.5, fontWeight:600, color:'var(--fg-subtle)', letterSpacing:'.06em', textTransform:'uppercase', marginBottom:4, fontFamily:'var(--font-mono)'}}>{label}</div>
      <div style={{fontSize:13.5, color:'var(--fg)', fontWeight:500}}>{value}</div>
      {hint && <div style={{fontSize:10.5,color:'var(--fg-subtle)',marginTop:2, fontFamily:'var(--font-mono)'}}>{hint}</div>}
    </div>
  );
}

function RiskTab({ a }) {
  return (
    <Card padding={22}>
      <Eyebrow>M03 · Risk scenarios on this asset</Eyebrow>
      <div style={{fontFamily:'var(--font-display)', fontSize:18, fontWeight:600, margin:'4px 0 14px'}}>3 scenarios · 1 accepted</div>
      {[
        { id:'RSK-0421-001', threat:'Targeted ICS malware', vuln:'CVE-2024-39872 · TIA Portal', prob:0.40, treatment:'MITIGATE', status:'In progress' },
        { id:'RSK-0421-002', threat:'Insider data exfil',    vuln:'Loose RBAC on engineer station', prob:0.20, treatment:'MITIGATE', status:'In progress' },
        { id:'RSK-0421-003', threat:'Ransomware',            vuln:'Legacy SMBv1 on jump host',     prob:0.30, treatment:'ACCEPT',   status:'CISO approved' },
      ].map(r => {
        const s = Math.round(r.prob * Math.max(...a.cia) * 5 * 10)/10;
        return (
          <div key={r.id} style={{display:'grid', gridTemplateColumns:'auto 1fr auto auto auto', gap:16, alignItems:'center', padding:'14px 0', borderTop:'1px solid var(--divider)'}}>
            <div style={{fontFamily:'var(--font-mono)', fontSize:12, color:'var(--fg-muted)'}}>{r.id}</div>
            <div>
              <div style={{fontSize:13.5, fontWeight:600}}>{r.threat}</div>
              <div style={{fontSize:11.5, color:'var(--fg-muted)', fontFamily:'var(--font-mono)', marginTop:2}}>vuln · {r.vuln}</div>
            </div>
            <div style={{textAlign:'right', minWidth:72}}>
              <div style={{fontFamily:'var(--font-display)', fontSize:20, fontWeight:700, color: s>=15?'#DC2626':s>=10?'#EA580C':'#F59E0B', lineHeight:1}}>{s.toFixed(1)}</div>
              <div style={{fontFamily:'var(--font-mono)', fontSize:10.5, color:'var(--fg-subtle)'}}>p={r.prob.toFixed(2)}</div>
            </div>
            <Badge tone={r.treatment==='ACCEPT'?'purple':'orange'}>{r.treatment}</Badge>
            <Badge tone="grey" dot={false}>{r.status}</Badge>
          </div>
        );
      })}
    </Card>
  );
}

function RelationshipsTab({ a }) {
  return (
    <Card padding={22}>
      <Eyebrow>FR-M01-06 · AssetRelationship</Eyebrow>
      <div style={{fontFamily:'var(--font-display)', fontSize:18, fontWeight:600, margin:'4px 0 16px'}}>Dependency graph</div>
      <div style={{display:'flex',gap:14,alignItems:'center'}}>
        {[
          {kind:'RUNS_ON', label:'Hyper-V cluster bar-hv01'},
          {kind:'DEPENDS_ON', label:'AD/LDAP Forest'},
          {kind:'CONNECTS_TO', label:'Pump station 14 · PLC'},
        ].map((d,i)=>(
          <div key={i} style={{flex:1, padding:14, border:'1px solid var(--border)', borderRadius:10, background:'var(--bg-muted)'}}>
            <Badge tone="blue" style={{fontFamily:'var(--font-mono)', fontSize:10.5}}>{d.kind}</Badge>
            <div style={{fontSize:13, fontWeight:600, marginTop:8}}>{d.label}</div>
          </div>
        ))}
      </div>
      <div style={{marginTop:22, padding:14, background:'var(--bg-muted)', border:'1px dashed var(--border)', borderRadius:10, color:'var(--fg-muted)', fontSize:12.5, textAlign:'center'}}>
        Full graph view (BPMN-Annex L3) · placeholder
      </div>
    </Card>
  );
}

const AUDIT_EVENTS = [
  { ts:'14:18:51', code:'ASSET_STATE_CHANGED',     actor:'V.Kovalenko (CISO)',  diff:'RISK_MANAGEMENT → ACTIVE_MAINTENANCE', tone:'orange' },
  { ts:'14:01:02', code:'RISK_SCORE_CALCULATED',   actor:'system (DB trigger)', diff:'risk_score: 12.0 → 10.0 · INV-02',     tone:'blue' },
  { ts:'13:55:22', code:'EVIDENCE_ATTACHED',       actor:'O.Pavlenko',          diff:'patch-evidence-2026Q2.pdf',            tone:'grey' },
  { ts:'13:41:09', code:'ASSET_OWNER_ASSIGNED',    actor:'V.Kovalenko (CISO)',  diff:'M.Bondar → O.Pavlenko',                tone:'orange' },
  { ts:'12:58:44', code:'ASSET_UPDATED',           actor:'system (LDAP sync)',  diff:'owner_department_id changed',          tone:'grey' },
  { ts:'09:12:33', code:'ASSET_STATE_CHANGE_DENIED',actor:'tester_2',           diff:'RISK_ASSESSMENT → ACTIVE_MAINTENANCE blocked · DQS<95%', tone:'red' },
];

function AuditTab({ a }) {
  return (
    <Card padding={0} style={{overflow:'hidden'}}>
      <div style={{padding:'18px 22px', borderBottom:'1px solid var(--divider)', display:'flex', alignItems:'center', justifyContent:'space-between'}}>
        <div>
          <Eyebrow>M04 · AuditLog · append-only</Eyebrow>
          <div style={{fontFamily:'var(--font-display)', fontSize:18, fontWeight:600, marginTop:4}}>Events on this asset · last 30 days</div>
        </div>
        <div style={{display:'flex',gap:8}}>
          <Button variant="secondary" size="sm" icon="filter">Filter</Button>
          <Button variant="secondary" size="sm" icon="download">Export · scope-aware</Button>
        </div>
      </div>
      <div style={{
        display:'grid',
        gridTemplateColumns:'90px 220px 200px 1fr',
        padding:'10px 22px', gap:14, fontSize:10.5, fontWeight:600, color:'var(--fg-subtle)',
        letterSpacing:'.08em', textTransform:'uppercase', background:'var(--bg-muted)', borderBottom:'1px solid var(--border)',
      }}>
        <div>Time</div><div>Action code</div><div>Actor</div><div>Before/After · diff_json</div>
      </div>
      {AUDIT_EVENTS.map((e,i)=>(
        <div key={i} style={{
          display:'grid',
          gridTemplateColumns:'90px 220px 200px 1fr',
          padding:'14px 22px', gap:14, alignItems:'flex-start',
          borderBottom: i<AUDIT_EVENTS.length-1?'1px solid var(--divider)':'none',
        }}>
          <div style={{fontFamily:'var(--font-mono)', fontSize:11.5, color:'var(--fg-muted)'}}>{e.ts}</div>
          <Badge tone={e.tone} style={{alignSelf:'flex-start'}}>{e.code}</Badge>
          <div style={{fontSize:12.5}}>{e.actor}</div>
          <div style={{fontFamily:'var(--font-mono)', fontSize:12, color:'var(--fg)'}}>{e.diff}</div>
        </div>
      ))}
      <div style={{padding:'10px 22px', background:'var(--bg-muted)', borderTop:'1px solid var(--border)', fontSize:11, color:'var(--fg-subtle)', fontFamily:'var(--font-mono)', display:'flex', justifyContent:'space-between'}}>
        <span>UPDATE/DELETE forbidden · INV-05 · enforced at DB level</span>
        <span>hash-chain integrity ✓</span>
      </div>
    </Card>
  );
}

function EvidenceTab() {
  const docs = [
    { name:'patch-evidence-2026Q2.pdf',  size:'4.2 MB', by:'O.Pavlenko',  date:'today' },
    { name:'risk-acceptance-RSK-0421-003.pdf', size:'820 KB', by:'V.Kovalenko (CISO)', date:'2026-04-22' },
    { name:'penetration-test-2026.zip',  size:'18 MB', by:'AUDITOR',     date:'2026-03-10' },
  ];
  return (
    <Card padding={22}>
      <Eyebrow>FR-M01-07 · Evidence (local object storage)</Eyebrow>
      <div style={{fontFamily:'var(--font-display)', fontSize:18, fontWeight:600, margin:'4px 0 14px'}}>3 attachments · retention per M08 policy</div>
      <div style={{display:'flex',flexDirection:'column',gap:8}}>
        {docs.map(d => (
          <div key={d.name} style={{display:'flex',alignItems:'center',gap:12, padding:'12px 14px', border:'1px solid var(--border)', borderRadius:10}}>
            <div style={{width:36,height:36,borderRadius:8,background:'var(--bg-muted)', display:'flex',alignItems:'center',justifyContent:'center', color:'var(--fg-muted)'}}>
              <i data-lucide="file-text" style={{width:18,height:18,strokeWidth:1.5}}></i>
            </div>
            <div style={{flex:1}}>
              <div style={{fontSize:13, fontWeight:600}}>{d.name}</div>
              <div style={{fontSize:11.5, color:'var(--fg-muted)', fontFamily:'var(--font-mono)'}}>{d.size} · uploaded {d.date} by {d.by}</div>
            </div>
            <IconBtn icon="download"/>
          </div>
        ))}
      </div>
    </Card>
  );
}

window.AssetPassportScreen = AssetPassportScreen;
