/* global React */
const { useEffect } = React;
const { Card, Badge, Eyebrow, KPI, ScopeChip, AssetIdMono, Button } = window.CodisAtoms;
const { riskZone } = window;

function DashboardScreen() {
  useEffect(() => { window.lucide && window.lucide.createIcons(); });

  const kpis = [
    { label:'Assets with assigned owner',  value:'98.4%', sub:'≥ 98% target',  accent:'green',  tone:<Badge tone="green">on target</Badge> },
    { label:'DQS · critical assets',        value:'94.1%', sub:'≥ 95% target',  accent:'amber',  tone:<Badge tone="amber">−0.9pp</Badge> },
    { label:'Critical risks · no plan',     value:'0',      sub:'must be 0',     accent:'green',  tone:<Badge tone="green">compliant</Badge> },
    { label:'Annual review · overdue',      value:'2.3%',   sub:'≤ 2% target',   accent:'red',    tone:<Badge tone="red">over SLA</Badge> },
  ];

  const recentAudit = [
    { ts:'14:32:08', code:'RISK_ACCEPTED', actor:'CISO',           target:'ASSET-20260420-00184', tone:'purple' },
    { ts:'14:18:51', code:'ASSET_STATE_CHANGED', actor:'V.Kovalenko', target:'ASSET-20260418-00102 → ACTIVE_MAINTENANCE', tone:'orange' },
    { ts:'13:55:22', code:'SCOPE_BYPASS_ATTEMPT', actor:'AUDITOR_3', target:'OT_SCOPE / DC-2 Boryspil', tone:'red' },
    { ts:'13:41:09', code:'ACCESS_APPROVED', actor:'SECURITY_ADMIN', target:'tmp-OT_SCOPE · 4h', tone:'green' },
    { ts:'12:58:44', code:'IMPORT_COMPLETED', actor:'INTEGRATION_ADMIN', target:'AD/LDAP · 1284 users', tone:'blue' },
  ];

  return (
    <div style={{padding:'24px 28px', display:'flex', flexDirection:'column', gap:20}}>
      {/* Phase + scope banner */}
      <Card padding={16} style={{display:'flex', alignItems:'center', gap:14, background:'linear-gradient(180deg, #FEF3EE, #fff)'}}>
        <div style={{width:38, height:38, borderRadius:10, background:'var(--codis-orange)', color:'#fff', display:'flex', alignItems:'center', justifyContent:'center'}}>
          <i data-lucide="shield-check" style={{width:20,height:20,strokeWidth:1.6}}></i>
        </div>
        <div style={{flex:1}}>
          <div style={{fontSize:13.5, fontWeight:600}}>Phase 1 · промисловий реліз</div>
          <div style={{fontSize:12, color:'var(--fg-muted)', marginTop:1}}>M01–M05, M07–M10 + minimal M06/M12. Integrations: AD/LDAP, CSV/XLSX. ITop sync moves to Phase 2.</div>
        </div>
        <Badge tone="green">7 of 7 gates open</Badge>
      </Card>

      {/* KPI row */}
      <div style={{display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:14}}>
        {kpis.map(k => <KPI key={k.label} {...k} />)}
      </div>

      {/* Two-column body */}
      <div style={{display:'grid', gridTemplateColumns:'1.4fr 1fr', gap:14}}>
        {/* Risk zone heatmap */}
        <Card padding={20}>
          <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:14}}>
            <div>
              <Eyebrow>M03 · Risk register</Eyebrow>
              <div style={{fontFamily:'var(--font-display)', fontSize:18, fontWeight:600, marginTop:4}}>Risk zone distribution</div>
            </div>
            <div style={{fontSize:11, color:'var(--fg-muted)', fontFamily:'var(--font-mono)'}}>
              risk_score = probability × max(C,I,A) × 5
            </div>
          </div>

          {/* Heatmap 5×5 (max(C,I,A) × probability bands) */}
          <div style={{display:'grid', gridTemplateColumns:'auto repeat(5, 1fr)', gap:4, fontFamily:'var(--font-mono)', fontSize:11}}>
            <div></div>
            {[1,2,3,4,5].map(c => <div key={c} style={{textAlign:'center', color:'var(--fg-subtle)', padding:'4px 0'}}>max={c}</div>)}
            {[
              {p:'1.00', vals:[5,10,15,20,25]},
              {p:'0.80', vals:[4, 8,12,16,20]},
              {p:'0.60', vals:[3, 6, 9,12,15]},
              {p:'0.40', vals:[2, 4, 6, 8,10]},
              {p:'0.20', vals:[1, 2, 3, 4, 5]},
            ].map(row => (
              <React.Fragment key={row.p}>
                <div style={{color:'var(--fg-subtle)', alignSelf:'center', textAlign:'right', paddingRight:6}}>p={row.p}</div>
                {row.vals.map((v,i)=>{
                  const z = riskZone(v);
                  const bg = v>=15?'#FEE2E2':v>=10?'#FEF3C7':v>=5?'#FFEDD5':'#DCFCE7';
                  const fg = v>=15?'#B91C1C':v>=10?'#92400E':v>=5?'#9A3412':'#15803D';
                  return (
                    <div key={i} style={{
                      background:bg, color:fg, fontWeight:600, padding:'10px 0',
                      textAlign:'center', borderRadius:6,
                    }}>{v.toFixed(1)}</div>
                  );
                })}
              </React.Fragment>
            ))}
          </div>

          <div style={{display:'flex', gap:14, marginTop:14, fontSize:11, color:'var(--fg-muted)'}}>
            <span style={{display:'flex',alignItems:'center',gap:6}}><span style={{width:9,height:9,borderRadius:2,background:'#16A34A'}}/>Low 0–4 · 31 risks</span>
            <span style={{display:'flex',alignItems:'center',gap:6}}><span style={{width:9,height:9,borderRadius:2,background:'#F59E0B'}}/>Med 5–9 · 12 risks</span>
            <span style={{display:'flex',alignItems:'center',gap:6}}><span style={{width:9,height:9,borderRadius:2,background:'#EA580C'}}/>High 10–14 · 4</span>
            <span style={{display:'flex',alignItems:'center',gap:6}}><span style={{width:9,height:9,borderRadius:2,background:'#DC2626'}}/>Critical 15–25 · <strong style={{color:'#DC2626'}}>0</strong></span>
          </div>
        </Card>

        {/* Audit feed */}
        <Card padding={0} style={{overflow:'hidden'}}>
          <div style={{padding:'18px 20px 12px', borderBottom:'1px solid var(--divider)'}}>
            <Eyebrow>M04 · Audit log</Eyebrow>
            <div style={{display:'flex',alignItems:'center', justifyContent:'space-between', marginTop:4}}>
              <div style={{fontFamily:'var(--font-display)', fontSize:18, fontWeight:600}}>Recent events · today</div>
              <Badge tone="dark" dot={false}>append-only</Badge>
            </div>
          </div>
          <div>
            {recentAudit.map((e,i)=>(
              <div key={i} style={{
                display:'flex', alignItems:'flex-start', gap:11, padding:'12px 20px',
                borderBottom:i<recentAudit.length-1?'1px solid var(--divider)':'none',
              }}>
                <div style={{fontFamily:'var(--font-mono)', fontSize:11, color:'var(--fg-subtle)', width:62, flexShrink:0, paddingTop:2}}>{e.ts}</div>
                <Badge tone={e.tone} dot={true} style={{flexShrink:0}}>{e.code}</Badge>
                <div style={{minWidth:0, flex:1}}>
                  <div style={{fontSize:12.5, color:'var(--fg)'}}>{e.target}</div>
                  <div style={{fontSize:11, color:'var(--fg-muted)', fontFamily:'var(--font-mono)', marginTop:1}}>by {e.actor}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{padding:'10px 16px', borderTop:'1px solid var(--divider)', display:'flex', justifyContent:'flex-end'}}>
            <Button variant="ghost" size="sm" iconRight="arrow-right">Open audit log</Button>
          </div>
        </Card>
      </div>

      {/* Active scope row */}
      <Card padding={18}>
        <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:12}}>
          <div>
            <Eyebrow>M10 · Scope engine — your active scope</Eyebrow>
            <div style={{fontFamily:'var(--font-display)', fontSize:16, fontWeight:600, marginTop:2}}>RBAC = actions · Scope = data · RLS enforces</div>
          </div>
          <Button variant="secondary" size="sm" icon="key-round">Request scope</Button>
        </div>
        <div style={{display:'flex', flexWrap:'wrap', gap:8}}>
          <ScopeChip kind="ORG"      value="ОГТСУ / IB / CISO office"/>
          <ScopeChip kind="LOCATION" value="UA · all sites"/>
          <ScopeChip kind="DOMAIN"   value="all 11 domains"/>
          <ScopeChip kind="OT"       value="all OT zones"/>
          <ScopeChip kind="RISK"     value="full"/>
          <ScopeChip kind="FIELD"    value="full · no masking"/>
          <ScopeChip kind="EMERGENCY" value="break-glass available · 0 active" />
        </div>
      </Card>
    </div>
  );
}

window.DashboardScreen = DashboardScreen;
