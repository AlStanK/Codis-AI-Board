/* global React */
// Risk score widget — visualises INV-02: risk_score = probability × max(C,I,A) × 5

function riskZone(score) {
  if (score >= 15) return { label:'CRITICAL', tone:'red',    color:'#DC2626' };
  if (score >= 10) return { label:'HIGH',     tone:'amber',  color:'#F59E0B' };
  if (score >= 5)  return { label:'MEDIUM',   tone:'amber',  color:'#F59E0B' };
  return              { label:'LOW',      tone:'green',  color:'#16A34A' };
}

function RiskScore({ probability = 0.6, c = 4, i = 5, a = 3, size = 'md' }) {
  const maxCIA = Math.max(c, i, a);
  const score = Math.round(probability * maxCIA * 5 * 10) / 10;
  const zone = riskZone(score);
  const pct = Math.min(100, (score / 25) * 100);

  const big = size === 'lg';
  return (
    <div style={{display:'flex', flexDirection:'column', gap:10}}>
      <div style={{display:'flex', alignItems:'baseline', gap:10}}>
        <div style={{
          fontFamily:'var(--font-display)', fontSize: big ? 56 : 38, fontWeight:700,
          color:zone.color, letterSpacing:'-0.02em', lineHeight:1,
        }}>{score.toFixed(1)}</div>
        <div style={{fontSize: big ? 14 : 12, color:'var(--fg-muted)', fontFamily:'var(--font-mono)'}}>/ 25.0</div>
        <div style={{marginLeft:'auto', display:'flex', alignItems:'center', gap:6,
          fontSize:11, fontWeight:700, letterSpacing:'.08em',
          color:zone.color,
        }}>
          <span style={{width:7,height:7,borderRadius:'50%', background:zone.color}}/>
          {zone.label}
        </div>
      </div>

      <div style={{height:6, background:'var(--gray-100)', borderRadius:99, overflow:'hidden', position:'relative'}}>
        {/* zone markers */}
        {[5,10,15].map(b=>(
          <div key={b} style={{position:'absolute',left:`${(b/25)*100}%`,top:0,bottom:0,width:1,background:'#fff',zIndex:1}}/>
        ))}
        <div style={{height:'100%', width:`${pct}%`, background:zone.color, borderRadius:99, transition:'width 320ms cubic-bezier(.2,.7,.2,1)'}}/>
      </div>

      <div style={{display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:8, fontFamily:'var(--font-mono)', fontSize:11}}>
        <Atom label="prob"  value={probability.toFixed(2)} />
        <Atom label="C"     value={c} />
        <Atom label="I"     value={i} />
        <Atom label="A"     value={a} />
      </div>

      <div style={{
        fontFamily:'var(--font-mono)', fontSize:11.5, color:'var(--fg-subtle)',
        background:'var(--bg-subtle)', padding:'8px 10px', borderRadius:8,
        border:'1px solid var(--border)',
      }}>
        {probability.toFixed(2)} × max({c},{i},{a}) × 5 = <span style={{color:'var(--fg)', fontWeight:600}}>{score.toFixed(1)}</span>
        <span style={{marginLeft:6, color:'var(--fg-muted)'}}>· INV-02 · DB trigger</span>
      </div>
    </div>
  );
}

function Atom({ label, value }) {
  return (
    <div style={{
      background:'var(--bg-subtle)', borderRadius:7, padding:'6px 8px',
      display:'flex', justifyContent:'space-between', alignItems:'center',
      border:'1px solid var(--border)',
    }}>
      <span style={{color:'var(--fg-subtle)'}}>{label}</span>
      <span style={{color:'var(--fg)', fontWeight:600}}>{value}</span>
    </div>
  );
}

window.RiskScore = RiskScore;
window.riskZone = riskZone;
