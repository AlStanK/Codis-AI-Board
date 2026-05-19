/* global React */
// FSM stepper for the 8-state asset lifecycle (INV-06)

const FSM_STATES = [
  { code:'IDENTIFICATION',     label:'Identification',  short:'IDENT' },
  { code:'CLASSIFICATION',     label:'Classification',  short:'CLASS' },
  { code:'OWNER_ASSIGNMENT',   label:'Owner assignment',short:'OWNER' },
  { code:'RISK_ASSESSMENT',    label:'Risk assessment', short:'RISK A' },
  { code:'RISK_MANAGEMENT',    label:'Risk management', short:'RISK M' },
  { code:'ACTIVE_MAINTENANCE', label:'Active maintenance', short:'ACTIVE' },
  { code:'ANNUAL_REVIEW',      label:'Annual review',   short:'REVIEW' },
  { code:'ARCHIVED',           label:'Archived',        short:'ARCH' },
];

function FsmStepper({ current = 'ACTIVE_MAINTENANCE', compact }) {
  const idx = FSM_STATES.findIndex(s => s.code === current);
  return (
    <div style={{display:'flex', alignItems:'stretch', gap:0, fontFamily:'var(--font-sans)'}}>
      {FSM_STATES.map((s, i) => {
        const done = i < idx;
        const active = i === idx;
        const future = i > idx;
        const archived = current === 'ARCHIVED' && i === FSM_STATES.length - 1;
        const dotColor = active ? 'var(--codis-orange)' : done ? '#1A1A1A' : 'var(--gray-300)';
        const labelColor = active ? 'var(--codis-orange)' : done ? 'var(--fg)' : 'var(--fg-muted)';
        return (
          <div key={s.code} style={{flex:1, display:'flex', flexDirection:'column', alignItems:'flex-start', minWidth:0}}>
            <div style={{display:'flex', alignItems:'center', width:'100%'}}>
              <div style={{
                width: 14, height:14, borderRadius:'50%',
                background: future ? 'var(--surface)' : dotColor,
                border: `2px solid ${future ? 'var(--gray-300)' : dotColor}`,
                flexShrink:0,
                boxShadow: active ? '0 0 0 4px var(--accent-soft)' : 'none',
              }}/>
              {i < FSM_STATES.length - 1 && (
                <div style={{
                  flex:1, height:2,
                  background: i < idx ? '#1A1A1A' : 'var(--gray-200)',
                  marginLeft: -1, marginRight: -1,
                }}/>
              )}
            </div>
            <div style={{
              fontSize: compact ? 10 : 11, fontWeight: active ? 600 : 500,
              color: labelColor, marginTop: 8,
              letterSpacing: '.02em', textTransform: compact ? 'uppercase' : 'none',
            }}>
              {compact ? s.short : s.label}
            </div>
            {!compact && active && (
              <div style={{fontSize:10.5, color:'var(--fg-subtle)', fontFamily:'var(--font-mono)', marginTop:2}}>
                state {String(i+1).padStart(2,'0')}/08
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

window.FsmStepper = FsmStepper;
window.FSM_STATES = FSM_STATES;
