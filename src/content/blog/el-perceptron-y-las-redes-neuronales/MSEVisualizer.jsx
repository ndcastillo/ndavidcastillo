import { useState, useEffect, useRef } from 'react'

const DATA = [
  { x1: 1, x2: 1, y: 0 },
  { x1: 2, x2: 2, y: 0 },
  { x1: 4, x2: 4, y: 1 },
  { x1: 5, x2: 4, y: 1 },
]

function z(x1, x2, w1, w2, b) {
  return w1 * x1 + w2 * x2 + b
}

function step(v) {
  return v > 0 ? 1 : 0
}

function computeMetrics(w1, w2, b) {
  const rows = DATA.map(d => {
    const zi = z(d.x1, d.x2, w1, w2, b)
    const yp = step(zi)
    const err = (d.y - yp) ** 2
    return { ...d, z: zi, yp, err }
  })
  const mse = rows.reduce((a, r) => a + r.err, 0) / DATA.length
  const misclassified = rows.filter(r => r.err > 0).length
  return { rows, mse, misclassified }
}

export default function MSEVisualizer() {
  const [w1, setW1] = useState(1.0)
  const [w2, setW2] = useState(1.0)
  const [b, setB] = useState(-3.0)
  const canvasRef = useRef(null)
  const chartRef = useRef(null)

  const { rows, mse, misclassified } = computeMetrics(w1, w2, b)

  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.js'
    script.onload = () => renderChart(window.Chart)

    if (window.Chart) {
      renderChart(window.Chart)
    } else {
      document.head.appendChild(script)
    }

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy()
        chartRef.current = null
      }
    }
  }, [])

  useEffect(() => {
    if (window.Chart) renderChart(window.Chart)
  }, [w1, w2, b])

  function renderChart(ChartJS) {
    if (!canvasRef.current) return
    if (chartRef.current) {
      chartRef.current.destroy()
      chartRef.current = null
    }

    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const textColor = isDark ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.5)'
    const gridColor = isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.06)'

    // Frontera de decisión: w1*x1 + w2*x2 + b = 0  →  x2 = -(w1*x1 + b)/w2
    const xMin = 0, xMax = 6
    const boundary =
      Math.abs(w2) < 1e-6
        ? []
        : [xMin, xMax].map(x1 => ({ x: x1, y: -(w1 * x1 + b) / w2 }))

    const class0 = rows.filter(r => r.y === 0)
    const class1 = rows.filter(r => r.y === 1)

    chartRef.current = new ChartJS(canvasRef.current.getContext('2d'), {
      type: 'scatter',
      data: {
        datasets: [
          {
            label: 'clase 0',
            data: class0.map(d => ({ x: d.x1, y: d.x2, _row: d })),
            backgroundColor: '#378ADD',
            borderColor: class0.map(d => (d.err > 0 ? '#D85A30' : 'transparent')),
            borderWidth: 3,
            pointRadius: 8,
            pointHoverRadius: 10,
            showLine: false,
          },
          {
            label: 'clase 1',
            data: class1.map(d => ({ x: d.x1, y: d.x2, _row: d })),
            backgroundColor: '#1D9E75',
            borderColor: class1.map(d => (d.err > 0 ? '#D85A30' : 'transparent')),
            borderWidth: 3,
            pointRadius: 8,
            pointHoverRadius: 10,
            showLine: false,
          },
          {
            label: 'frontera w·x + b = 0',
            data: boundary,
            borderColor: '#888',
            borderDash: [6, 4],
            backgroundColor: 'transparent',
            showLine: true,
            pointRadius: 0,
            borderWidth: 2,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: { duration: 120 },
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: ctx => {
                const r = ctx.raw?._row
                if (!r) return `(${ctx.parsed.x.toFixed(2)}, ${ctx.parsed.y.toFixed(2)})`
                return `x=(${r.x1}, ${r.x2}) y=${r.y} ŷ=${r.yp}`
              },
            },
          },
        },
        scales: {
          x: {
            min: xMin,
            max: xMax,
            ticks: { color: textColor, stepSize: 1 },
            grid: { color: gridColor },
            title: { display: true, text: 'x₁', color: textColor, font: { size: 12 } },
          },
          y: {
            min: 0,
            max: 6,
            ticks: { color: textColor, stepSize: 1 },
            grid: { color: gridColor },
            title: { display: true, text: 'x₂', color: textColor, font: { size: 12 } },
          },
        },
      },
    })
  }

  return (
    <div style={styles.wrapper}>

      {/* Sliders */}
      <div style={styles.controls}>
        <div style={styles.row}>
          <label style={styles.label}>Peso <strong>w₁</strong></label>
          <input
            type="range" min="-3" max="3" step="0.05"
            value={w1}
            onChange={e => setW1(parseFloat(e.target.value))}
            style={styles.slider}
          />
          <span style={styles.sliderVal}>{w1.toFixed(2)}</span>
        </div>
        <div style={styles.row}>
          <label style={styles.label}>Peso <strong>w₂</strong></label>
          <input
            type="range" min="-3" max="3" step="0.05"
            value={w2}
            onChange={e => setW2(parseFloat(e.target.value))}
            style={styles.slider}
          />
          <span style={styles.sliderVal}>{w2.toFixed(2)}</span>
        </div>
        <div style={styles.row}>
          <label style={styles.label}>Bias <strong>b</strong></label>
          <input
            type="range" min="-8" max="8" step="0.05"
            value={b}
            onChange={e => setB(parseFloat(e.target.value))}
            style={styles.slider}
          />
          <span style={styles.sliderVal}>{b.toFixed(2)}</span>
        </div>
      </div>

      {/* Métricas */}
      <div style={styles.metrics}>
        <div style={styles.metricCard}>
          <div style={styles.metricVal}>{mse.toFixed(3)}</div>
          <div style={styles.metricLbl}>MSE</div>
        </div>
        <div style={styles.metricCard}>
          <div style={styles.metricVal}>{misclassified}</div>
          <div style={styles.metricLbl}>mal clasificados</div>
        </div>
        <div style={styles.metricCard}>
          <div style={styles.metricVal}>{DATA.length}</div>
          <div style={styles.metricLbl}>N ejemplos</div>
        </div>
      </div>

      {/* Fórmula expandida */}
      <div style={styles.formula}>
        E(w) = ({rows.map(r => r.err.toFixed(0)).join(' + ')}) / {DATA.length} ={' '}
        <strong>{mse.toFixed(3)}</strong>
      </div>

      {/* Gráfica */}
      <div style={styles.chartWrap}>
        <canvas ref={canvasRef} aria-label="Frontera de decisión del perceptrón" />
      </div>

      {/* Leyenda */}
      <div style={styles.legend}>
        <span style={styles.legendItem}>
          <span style={{ ...styles.dot, background: '#378ADD' }} />
          clase 0
        </span>
        <span style={styles.legendItem}>
          <span style={{ ...styles.dot, background: '#1D9E75' }} />
          clase 1
        </span>
        <span style={styles.legendItem}>
          <span style={{ ...styles.dot, background: 'transparent', border: '2px dashed #888' }} />
          frontera w·x + b = 0
        </span>
        <span style={styles.legendItem}>
          <span style={{ ...styles.dot, background: 'transparent', border: '3px solid #D85A30' }} />
          mal clasificado
        </span>
      </div>

      {/* Tabla */}
      <div style={styles.tableWrap}>
        <table style={styles.table}>
          <thead>
            <tr>
              {['i', 'x₁', 'x₂', 'y real', 'z = w·x + b', 'ŷ = step(z)', '(y−ŷ)²'].map(h => (
                <th key={h} style={styles.th}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i}>
                <td style={styles.td}>{i + 1}</td>
                <td style={{ ...styles.td, textAlign: 'right' }}>{r.x1}</td>
                <td style={{ ...styles.td, textAlign: 'right' }}>{r.x2}</td>
                <td style={{ ...styles.td, textAlign: 'right' }}>{r.y}</td>
                <td style={{ ...styles.td, textAlign: 'right', color: '#888' }}>{r.z.toFixed(2)}</td>
                <td style={{ ...styles.td, textAlign: 'right', color: r.yp === r.y ? '#1D9E75' : '#D85A30' }}>
                  {r.yp}
                </td>
                <td style={{ ...styles.td, textAlign: 'right', color: r.err > 0 ? 'rgba(216,90,48,0.9)' : '#888' }}>
                  {r.err}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={6} style={{ ...styles.td, textAlign: 'right', fontWeight: 500, borderTop: '1px solid #ccc' }}>
                MSE =
              </td>
              <td style={{ ...styles.td, textAlign: 'right', fontWeight: 500, borderTop: '1px solid #ccc' }}>
                {mse.toFixed(3)}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

    </div>
  )
}

const styles = {
  wrapper: {
    fontFamily: 'system-ui, sans-serif',
    padding: '1.5rem 0',
  },
  controls: {
    marginBottom: '1.5rem',
  },
  row: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '0.75rem',
  },
  label: {
    fontSize: '13px',
    minWidth: '72px',
    color: '#666',
  },
  slider: {
    flex: 1,
  },
  sliderVal: {
    fontSize: '13px',
    fontWeight: 500,
    minWidth: '38px',
    textAlign: 'right',
  },
  metrics: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '12px',
    marginBottom: '1rem',
  },
  metricCard: {
    background: '#f5f5f5',
    borderRadius: '8px',
    padding: '12px',
    textAlign: 'center',
  },
  metricVal: {
    fontSize: '22px',
    fontWeight: 500,
  },
  metricLbl: {
    fontSize: '12px',
    color: '#888',
    marginTop: '4px',
  },
  formula: {
    fontSize: '13px',
    color: '#666',
    textAlign: 'center',
    marginBottom: '1.5rem',
  },
  chartWrap: {
    position: 'relative',
    width: '100%',
    height: '320px',
    marginBottom: '0.75rem',
  },
  legend: {
    display: 'flex',
    gap: '16px',
    fontSize: '12px',
    color: '#666',
    marginBottom: '1.5rem',
    flexWrap: 'wrap',
  },
  legendItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
  },
  dot: {
    width: '10px',
    height: '10px',
    borderRadius: '2px',
    display: 'inline-block',
  },
  tableWrap: {
    overflowX: 'auto',
  },
  table: {
    width: '100%',
    fontSize: '13px',
    borderCollapse: 'collapse',
  },
  th: {
    textAlign: 'right',
    padding: '6px 8px',
    color: '#888',
    fontWeight: 500,
    borderBottom: '1px solid #eee',
  },
  td: {
    padding: '5px 8px',
  },
}
