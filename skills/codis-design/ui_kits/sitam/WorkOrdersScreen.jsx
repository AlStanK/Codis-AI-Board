/* global React */
const { useEffect } = React;
const { Card, Badge, Button, Eyebrow } = window.CodisAtoms;

const COLS = [
  { id: 'open',     label: 'Open',         tone: 'grey' },
  { id: 'progress', label: 'In progress',  tone: 'blue' },
  { id: 'review',   label: 'On review',    tone: 'amber' },
  { id: 'done',     label: 'Done',         tone: 'green' },
];
const WOS = [
  { id: 'WO-2128', col: 'open',     title: 'Replace antenna mast bolts', asset: 'Tower 7B',             due: 'Today',   prio: 'high',   assignee: 'OP' },
  { id: 'WO-2129', col: 'open',     title: 'Repaint guard rail',         asset: 'Будівля Ратуша',       due: 'May 12',  prio: 'low',    assignee: 'MS' },
  { id: 'WO-2127', col: 'open',     title: 'Inspect grounding',          asset: 'Substation E-12',      due: 'May 7',   prio: 'high',   assignee: 'AB' },
  { id: 'WO-2123', col: 'progress', title: 'Quarterly inspection',       asset: 'Базова станція №142',  due: 'May 9',   prio: 'medium', assignee: 'VK' },
  { id: 'WO-2120', col: 'progress', title: 'Replace pump bearings',      asset: 'Pump station #4',      due: 'May 8',   prio: 'medium', assignee: 'VK' },
  { id: 'WO-2118', col: 'review',   title: 'Door hinge repair',          asset: 'Будівля Ратуша',       due: 'May 4',   prio: 'low',    assignee: 'MS' },
  { id: 'WO-2117', col: 'review',   title: 'Generator load test',        asset: 'Substation E-12',      due: 'May 4',   prio: 'medium', assignee: 'AB' },
  { id: 'WO-2110', col: 'done',     title: 'Antenna alignment',          asset: 'Базова станція №142',  due: 'Mar 17',  prio: 'medium', assignee: 'OP' },
  { id: 'WO-2104', col: 'done',     title: 'Annual safety audit',        asset: 'Substation E-12',      due: 'Feb 8',   prio: 'high',   assignee: 'AB' },
];
const PRIO = { high: 'red', medium: 'amber', low: 'grey' };
const PRIO_LABEL = { high: 'High', medium: 'Med', low: 'Low' };

function WOCard({ wo }) {
  return (
    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: 12, boxShadow: 'var(--shadow-xs)', display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--fg-subtle)' }}>{wo.id}</span>
        <Badge tone={PRIO[wo.prio]} dot={false}>{PRIO_LABEL[wo.prio]}</Badge>
      </div>
      <div style={{ fontSize: 14, fontWeight: 500, color: 'var(--fg)', lineHeight: 1.35 }}>{wo.title}</div>
      <div style={{ fontSize: 12, color: 'var(--fg-muted)' }}>{wo.asset}</div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 2 }}>
        <span style={{ fontSize: 11, color: wo.due === 'Today' ? 'var(--danger)' : 'var(--fg-muted)', fontWeight: wo.due === 'Today' ? 600 : 400 }}>
          <i data-lucide="calendar" style={{ width: 11, height: 11, strokeWidth: 2, marginRight: 4, verticalAlign: '-1px' }}></i>{wo.due}
        </span>
        <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'var(--bg-subtle)', color: 'var(--fg)', fontSize: 10, fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{wo.assignee}</div>
      </div>
    </div>
  );
}

function WorkOrdersScreen() {
  useEffect(() => { window.lucide && window.lucide.createIcons(); });
  return (
    <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 20, height: '100%', boxSizing: 'border-box' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <Eyebrow>Service desk</Eyebrow>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 600, marginTop: 2 }}>Work orders</div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <Button variant="secondary" icon="filter">Filter</Button>
          <Button icon="plus">New work order</Button>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14, flex: 1, minHeight: 0 }}>
        {COLS.map(col => {
          const items = WOS.filter(w => w.col === col.id);
          return (
            <div key={col.id} style={{ background: 'var(--bg-muted)', border: '1px solid var(--border)', borderRadius: 12, padding: 12, display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '2px 4px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Badge tone={col.tone}>{col.label}</Badge>
                  <span style={{ fontSize: 12, color: 'var(--fg-muted)' }}>{items.length}</span>
                </div>
                <i data-lucide="more-horizontal" style={{ width: 16, height: 16, color: 'var(--fg-subtle)' }}></i>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {items.map(w => <WOCard key={w.id} wo={w} />)}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

window.WorkOrdersScreen = WorkOrdersScreen;
