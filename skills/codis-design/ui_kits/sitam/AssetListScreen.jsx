/* global React */
const { useState, useEffect, useMemo } = React;
const { Card, Badge, Button, IconBtn, AssetIdMono, Avatar, Eyebrow, ScopeChip } = window.CodisAtoms;

const DOMAINS = ['EQUIPMENT','INFRASTRUCTURE','CYBER_PHYSICAL','DATABASE','SOFTWARE','IT_SERVICE','STORAGE','IDENTITY','AI_SYSTEMS'];

const ASSETS = [
  { id:'ASSET-20260418-00102', name:'SCADA-PRIMARY · Bar GMS',    domain:'CYBER_PHYSICAL', state:'ACTIVE_MAINTENANCE', cia:[5,5,5], prob:0.40, owner:'O. Pavlenko',  loc:'Boryspil · L2',    dqs:97, ot:true,  crit:'Critical' },
  { id:'ASSET-20260418-00098', name:'pg-asset-prod (HA cluster)', domain:'DATABASE',       state:'ACTIVE_MAINTENANCE', cia:[5,5,4], prob:0.30, owner:'M. Bondar',    loc:'DC-1 Львів · L4',  dqs:99, ot:false, crit:'Critical' },
  { id:'ASSET-20260420-00184', name:'AD/LDAP Forest',             domain:'IDENTITY',       state:'RISK_MANAGEMENT',    cia:[4,5,5], prob:0.50, owner:'V. Lytvyn',    loc:'DC-1 Львів · L4',  dqs:88, ot:false, crit:'High' },
  { id:'ASSET-20260415-00077', name:'Pump station 14 · PLC',      domain:'CYBER_PHYSICAL', state:'CLASSIFICATION',     cia:[3,5,5], prob:0.20, owner:'I. Hrytsenko', loc:'Bar PS-14 · L1',   dqs:62, ot:true,  crit:'High' },
  { id:'ASSET-20260411-00041', name:'NetFlow collector A',        domain:'INFRASTRUCTURE', state:'ANNUAL_REVIEW',      cia:[3,4,3], prob:0.60, owner:'V. Kovalenko', loc:'DC-2 Бориспіль',   dqs:91, ot:false, crit:'Medium' },
  { id:'ASSET-20260408-00029', name:'GIS-OGTSU map service',      domain:'SOFTWARE',       state:'ACTIVE_MAINTENANCE', cia:[2,4,4], prob:0.30, owner:'D. Levchenko', loc:'DC-1 Львів',       dqs:84, ot:false, crit:'Medium' },
  { id:'ASSET-20260403-00018', name:'AI dispatcher copilot',      domain:'AI_SYSTEMS',     state:'RISK_ASSESSMENT',    cia:[3,4,3], prob:0.55, owner:'A. Sydorenko', loc:'DC-1 Львів',       dqs:71, ot:false, crit:'Medium' },
  { id:'ASSET-20260328-00006', name:'Backup vault MinIO',         domain:'STORAGE',        state:'ACTIVE_MAINTENANCE', cia:[5,5,4], prob:0.20, owner:'M. Bondar',    loc:'DC-1 Львів · L4',  dqs:96, ot:false, crit:'Critical' },
];

function score(a){ return Math.round(a.prob * Math.max(...a.cia) * 5 * 10)/10; }
function zoneColor(s){ return s>=15?'#DC2626':s>=10?'#EA580C':s>=5?'#F59E0B':'#16A34A'; }
function zoneLabel(s){ return s>=15?'Critical':s>=10?'High':s>=5?'Medium':'Low'; }

const STATE_TONE = {
  IDENTIFICATION:'grey', CLASSIFICATION:'blue', OWNER_ASSIGNMENT:'blue',
  RISK_ASSESSMENT:'amber', RISK_MANAGEMENT:'purple',
  ACTIVE_MAINTENANCE:'green', ANNUAL_REVIEW:'amber', ARCHIVED:'grey',
};

function AssetListScreen({ onOpenAsset }) {
  useEffect(() => { window.lucide && window.lucide.createIcons(); });
  const [domain, setDomain] = useState('all');
  const [showOT, setShowOT] = useState(true);

  const rows = useMemo(()=>{
    return ASSETS.filter(a => (domain==='all'||a.domain===domain) && (showOT || !a.ot));
  }, [domain, showOT]);

  return (
    <div style={{padding:'22px 28px', display:'flex', flexDirection:'column', gap:16}}>
      {/* Filter strip */}
      <Card padding={14}>
        <div style={{display:'flex', alignItems:'center', gap:10, flexWrap:'wrap'}}>
          <Eyebrow>Filter</Eyebrow>
          <select value={domain} onChange={e=>setDomain(e.target.value)} style={{
            fontFamily:'var(--font-mono)', fontSize:12, padding:'6px 10px',
            border:'1px solid var(--border)', borderRadius:8, background:'var(--surface)', color:'var(--fg)',
          }}>
            <option value="all">all 11 domains</option>
            {DOMAINS.map(d => <option key={d} value={d}>{d}</option>)}
          </select>
          <select style={{fontFamily:'var(--font-mono)', fontSize:12, padding:'6px 10px', border:'1px solid var(--border)', borderRadius:8, background:'var(--surface)', color:'var(--fg)'}}>
            <option>any state</option>
            {['IDENTIFICATION','CLASSIFICATION','OWNER_ASSIGNMENT','RISK_ASSESSMENT','RISK_MANAGEMENT','ACTIVE_MAINTENANCE','ANNUAL_REVIEW','ARCHIVED'].map(s=><option key={s}>{s}</option>)}
          </select>
          <select style={{fontFamily:'var(--font-mono)', fontSize:12, padding:'6px 10px', border:'1px solid var(--border)', borderRadius:8, background:'var(--surface)', color:'var(--fg)'}}>
            <option>any criticality</option><option>Critical</option><option>High</option><option>Medium</option><option>Low</option>
          </select>
          <label style={{display:'inline-flex',alignItems:'center', gap:6, fontSize:12, color:'var(--fg)', cursor:'pointer', padding:'6px 10px', background:showOT?'var(--accent-soft)':'transparent', borderRadius:8, border:'1px solid', borderColor:showOT?'#FCD9C9':'var(--border)'}}>
            <input type="checkbox" checked={showOT} onChange={e=>setShowOT(e.target.checked)} style={{margin:0}}/>
            <span style={{color: showOT?'var(--accent)':'var(--fg)'}}>OT_SCOPE assets</span>
          </label>
          <div style={{flex:1}}/>
          <Button variant="secondary" size="sm" icon="upload">Import CSV</Button>
          <Button variant="secondary" size="sm" icon="download">Export</Button>
          <Button variant="primary" size="sm" icon="plus">New asset</Button>
        </div>
      </Card>

      {/* Table */}
      <Card padding={0} style={{overflow:'hidden'}}>
        <div style={{
          display:'grid',
          gridTemplateColumns:'200px 1fr 150px 170px 180px 100px 90px 36px',
          padding:'12px 18px', gap:14, fontSize:11, fontWeight:600, color:'var(--fg-subtle)',
          letterSpacing:'.06em', textTransform:'uppercase', background:'var(--bg-muted)',
          borderBottom:'1px solid var(--border)',
        }}>
          <div>Asset ID</div>
          <div>Name · Domain</div>
          <div>FSM state</div>
          <div>Owner · Location</div>
          <div>Risk · CIA</div>
          <div>DQS</div>
          <div>Crit.</div>
          <div></div>
        </div>
        {rows.map((a,i)=>{
          const s = score(a);
          return (
            <div key={a.id}
              onClick={()=>onOpenAsset(a)}
              style={{
                display:'grid',
                gridTemplateColumns:'200px 1fr 150px 170px 180px 100px 90px 36px',
                padding:'14px 18px', gap:14, alignItems:'center',
                borderBottom: i<rows.length-1 ? '1px solid var(--divider)' : 'none',
                cursor:'pointer', transition:'background 120ms',
              }}
              onMouseEnter={e=>e.currentTarget.style.background='var(--bg-muted)'}
              onMouseLeave={e=>e.currentTarget.style.background='var(--surface)'}
            >
              <div style={{display:'flex',flexDirection:'column',gap:3}}>
                <AssetIdMono id={a.id} size="sm"/>
                {a.ot && <Badge tone="red" style={{fontSize:9.5,padding:'1px 6px'}}>OT/ICS · Purdue</Badge>}
              </div>
              <div style={{minWidth:0}}>
                <div style={{fontSize:13.5, fontWeight:600, color:'var(--fg)', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis'}}>{a.name}</div>
                <div style={{fontSize:11, color:'var(--fg-muted)', fontFamily:'var(--font-mono)', marginTop:2}}>{a.domain}</div>
              </div>
              <Badge tone={STATE_TONE[a.state]} style={{fontSize:11}}>{a.state.replace(/_/g,' ')}</Badge>
              <div>
                <div style={{fontSize:12.5, color:'var(--fg)'}}>{a.owner}</div>
                <div style={{fontSize:11, color:'var(--fg-muted)'}}>{a.loc}</div>
              </div>
              <div style={{display:'flex',alignItems:'center',gap:8}}>
                <div style={{
                  fontFamily:'var(--font-display)', fontWeight:700, fontSize:18,
                  color:zoneColor(s), lineHeight:1, minWidth:40,
                }}>{s.toFixed(1)}</div>
                <div style={{fontFamily:'var(--font-mono)', fontSize:10.5, color:'var(--fg-muted)', lineHeight:1.4}}>
                  {a.cia.join('·')}<br/>p={a.prob.toFixed(2)}
                </div>
              </div>
              <div style={{display:'flex',alignItems:'center',gap:8}}>
                <div style={{width:42, height:6, background:'var(--gray-100)', borderRadius:99, overflow:'hidden'}}>
                  <div style={{width:`${a.dqs}%`, height:'100%', background: a.dqs>=95?'#16A34A':a.dqs>=85?'#F59E0B':'#DC2626'}}/>
                </div>
                <span style={{fontFamily:'var(--font-mono)',fontSize:11,color:'var(--fg-muted)'}}>{a.dqs}</span>
              </div>
              <Badge tone={a.crit==='Critical'?'red':a.crit==='High'?'amber':'grey'} style={{fontSize:10.5}}>{a.crit}</Badge>
              <i data-lucide="chevron-right" style={{width:16,height:16,color:'var(--fg-subtle)'}}></i>
            </div>
          );
        })}
        <div style={{padding:'12px 18px', display:'flex', justifyContent:'space-between', alignItems:'center', background:'var(--bg-muted)', borderTop:'1px solid var(--border)', fontSize:12, color:'var(--fg-muted)'}}>
          <div>Showing <strong style={{color:'var(--fg)'}}>{rows.length}</strong> of 1,284 — scope-filtered via RLS</div>
          <div style={{display:'flex', gap:6, alignItems:'center'}}>
            <IconBtn icon="chevron-left"/>
            <span style={{padding:'0 8px'}}>1 / 161</span>
            <IconBtn icon="chevron-right"/>
          </div>
        </div>
      </Card>
    </div>
  );
}

window.AssetListScreen = AssetListScreen;
window.SAMPLE_ASSETS = ASSETS;
