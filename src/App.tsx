import { useState, useEffect } from 'react'
import { PieChart, Pie, Cell, BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts'

interface ChartData {
  title: string
  description: string
  type: 'pie' | 'bar' | 'line'
  data: Array<{name: string, value: number}>
}

interface Analysis {
  summary: string
  insights: string[]
  alerts: string[]
}

function App() {
  const [files, setFiles] = useState<File[]>([])
  const [charts, setCharts] = useState<ChartData[]>([])
  const [analysis, setAnalysis] = useState<Analysis | null>(null)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [showConfig, setShowConfig] = useState(false)
  const [webhookUrl, setWebhookUrl] = useState('/api')
  const [elapsedTime, setElapsedTime] = useState(0)

  useEffect(() => {
    const saved = localStorage.getItem('webhookUrl')
    if (saved) setWebhookUrl(saved)
  }, [])

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files
    if (!selectedFiles) return

    const validFiles: File[] = []
    for (const file of Array.from(selectedFiles)) {
      if (file.name.endsWith('.json')) {
        validFiles.push(file)
      }
    }

    setFiles(prev => [...prev, ...validFiles])
    setMessage(`✅ ${validFiles.length} arquivo(s) carregado(s)`)
  }

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index))
    setMessage(`🗑️ Arquivo removido`)
  }

  const handleAnalyze = async () => {
    if (files.length === 0) {
      setMessage('❌ Carregue arquivos JSON primeiro')
      return
    }

    setLoading(true)
    setElapsedTime(0)
    setMessage('⏳ Processando com IA...')

    // Timer para mostrar tempo decorrido
    const startTime = Date.now()
    const timer = setInterval(() => {
      setElapsedTime(Math.floor((Date.now() - startTime) / 1000))
    }, 1000)

    try {
      const filesData = await Promise.all(
        files.map(async f => ({
          filename: f.name,
          content: JSON.parse(await f.text())
        }))
      )

      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          timestamp: new Date().toISOString(),
          files_count: filesData.length,
          data: filesData
        })
      })

      if (!response.ok) throw new Error(`Erro ${response.status}`)

      const result = await response.json()
      
      if (result.charts) {
        setCharts(result.charts)
        setAnalysis(result.analysis || null)
        setMessage(`✅ ${result.charts.length} gráfico(s) + análise gerados em ${elapsedTime}s!`)
        
        // Tocar som de sucesso (beep agradável)
        try {
          const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
          const oscillator = audioContext.createOscillator()
          const gainNode = audioContext.createGain()
          
          oscillator.connect(gainNode)
          gainNode.connect(audioContext.destination)
          
          oscillator.frequency.setValueAtTime(800, audioContext.currentTime) // Frequência alta
          oscillator.frequency.setValueAtTime(600, audioContext.currentTime + 0.1) // Desce um pouco
          
          gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
          gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5)
          
          oscillator.start(audioContext.currentTime)
          oscillator.stop(audioContext.currentTime + 0.5)
        } catch (e) {
          console.log('Som não suportado')
        }
      } else {
        throw new Error('Resposta inválida')
      }
    } catch (error: any) {
      setMessage(`❌ Erro: ${error.message}`)
    } finally {
      clearInterval(timer)
      setLoading(false)
    }
  }

  const COLORS = ['#667eea', '#764ba2', '#ed64a6', '#ff9f40', '#36a2eb', '#4bc0c0', '#ff6384']

  return (
    <div className="container">
      <div style={{ marginBottom: '30px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
          <div>
            <h1>📊 Dashboard Inteligente</h1>
            <p className="subtitle">Upload → N8N + IA → Gráficos Nativos</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ 
              fontSize: '11px', 
              color: '#8b95a5', 
              marginBottom: '6px',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>
              Webhook N8N
            </div>
            <button 
              onClick={() => setShowConfig(!showConfig)} 
              style={{ 
                width: 'auto', 
                marginTop: 0, 
                padding: '12px 24px',
                fontSize: '18px'
              }}
              title="Configurar Webhook do N8N"
            >
              ⚙️
            </button>
          </div>
        </div>
        
        <div style={{ display: 'grid', gap: '12px' }}>
          <div style={{ 
            background: '#1a2332', 
            border: '1px solid #2d3548', 
            borderLeft: '4px solid #4a9eff',
            padding: '16px', 
            borderRadius: '8px',
            fontSize: '13px',
            color: '#8b95a5'
          }}>
            <div style={{ color: '#4a9eff', fontWeight: 600, marginBottom: '8px' }}>
              💡 Nota sobre Segurança e Escalabilidade:
            </div>
            <p style={{ lineHeight: '1.6', margin: 0 }}>
              Este é um <strong style={{ color: '#e1e8f0' }}>MVP para validação</strong>. 
              Em produção, pode ser integrado com <strong style={{ color: '#e1e8f0' }}>Supabase</strong> para 
              armazenamento persistente de dados e autenticação de usuários, garantindo segurança empresarial 
              e histórico de análises.
            </p>
          </div>

        </div>
      </div>

      {showConfig && (
        <div style={{ background: '#232a38', padding: '20px', borderRadius: '12px', marginBottom: '20px', border: '1px solid #2d3548' }}>
          <h3 style={{ color: '#e1e8f0' }}>⚙️ Configuração</h3>
          <input
            type="text"
            value={webhookUrl}
            onChange={(e) => setWebhookUrl(e.target.value)}
            placeholder="/api"
            style={{ width: '100%', padding: '12px', marginTop: '10px', marginBottom: '10px', borderRadius: '8px', border: '2px solid #ddd' }}
          />
          <button onClick={() => { localStorage.setItem('webhookUrl', webhookUrl); setShowConfig(false); setMessage('✅ Salvo!') }} style={{ marginTop: 0 }}>
            💾 Salvar
          </button>
        </div>
      )}

      <div className="upload-area" onClick={() => document.getElementById('fileInput')?.click()}>
        <div style={{ fontSize: '48px' }}>📁</div>
        <div style={{ fontSize: '18px', fontWeight: 600, margin: '16px 0' }}>
          Clique para selecionar JSONs
        </div>
        <input
          id="fileInput"
          type="file"
          accept=".json"
          multiple
          onChange={handleFileUpload}
          style={{ display: 'none' }}
        />
      </div>

      {files.length > 0 && (
        <div className="files-list">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <h3 style={{ color: '#e1e8f0' }}>{files.length} arquivo(s):</h3>
            <button 
              onClick={() => setFiles([])}
              style={{ 
                width: 'auto', 
                padding: '6px 12px', 
                fontSize: '12px',
                marginTop: 0,
                background: '#3a4556'
              }}
            >
              🗑️ Limpar Todos
            </button>
          </div>
          {files.map((f, i) => (
            <div key={i} className="file-item" style={{ position: 'relative' }}>
              <div style={{ flex: 1 }}>
                <span>{f.name}</span>
                <span style={{ color: '#6b7280', fontSize: '12px', marginLeft: '10px' }}>
                  {(f.size / 1024).toFixed(1)} KB
                </span>
              </div>
              <button
                onClick={() => removeFile(i)}
                style={{
                  width: '30px',
                  height: '30px',
                  padding: 0,
                  marginTop: 0,
                  marginLeft: '10px',
                  background: '#ff6b6b',
                  fontSize: '16px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                title="Remover arquivo"
              >
                ✕
              </button>
            </div>
          ))}
          <button onClick={handleAnalyze} disabled={loading}>
            {loading ? '🤖 IA Analisando Dados...' : '🚀 Gerar Dashboard'}
          </button>
        </div>
      )}

      {loading && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(15, 20, 25, 0.95)',
          backdropFilter: 'blur(8px)',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          animation: 'fadeIn 0.3s ease-in'
        }}>
          <div style={{ 
            textAlign: 'center', 
            padding: '60px 40px', 
            background: '#1a1f2e', 
            borderRadius: '20px', 
            boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
            border: '2px solid #2d3548',
            maxWidth: '600px',
            width: '90%'
          }}>
          <div style={{ position: 'relative', display: 'inline-block' }}>
            <img 
              src="/cute-robot.gif" 
              alt="Robô pensando" 
              style={{ 
                width: '200px', 
                height: '200px', 
                marginBottom: '20px',
                filter: 'drop-shadow(0 4px 8px rgba(74, 158, 255, 0.4))',
                animation: 'float 3s ease-in-out infinite'
              }}
              onError={(e) => {
                // Fallback se GIF não carregar
                e.currentTarget.style.display = 'none'
                const next = e.currentTarget.nextElementSibling as HTMLElement
                if (next) next.style.display = 'block'
              }}
            />
            <div style={{ 
              display: 'none', 
              fontSize: '80px', 
              animation: 'pulse 2s ease-in-out infinite' 
            }}>
              🤖
            </div>
          </div>
          <h3 style={{ color: '#4a9eff', marginBottom: '10px', animation: 'pulse 2s ease-in-out infinite' }}>
            🤖 IA Analisando Seus Dados...
          </h3>
          <div style={{ 
            fontSize: '32px', 
            fontWeight: 'bold', 
            color: '#4a9eff', 
            marginBottom: '10px',
            fontFamily: 'monospace'
          }}>
            ⏱️ {Math.floor(elapsedTime / 60)}:{(elapsedTime % 60).toString().padStart(2, '0')}
          </div>
          <p style={{ color: '#8b95a5', marginBottom: '10px' }}>
            Processando {files.length} arquivo(s) • Gerando insights inteligentes
          </p>
          <p style={{ color: '#4a9eff', fontSize: '14px', fontStyle: 'italic', marginBottom: '4px' }}>
            ✨ Google Gemini está trabalhando para você...
          </p>
          <p style={{ 
            color: '#6b7280', 
            fontSize: '11px', 
            marginBottom: '20px',
            opacity: 0.8
          }}>
            ⏰ ~10 arquivos = 1-2 min • Tenha paciência 😊
          </p>
          <div style={{ 
            width: '100%', 
            height: '4px', 
            background: '#2d3548', 
            borderRadius: '2px', 
            marginTop: '20px',
            overflow: 'hidden'
          }}>
            <div style={{ 
              width: '100%', 
              height: '100%', 
              background: 'linear-gradient(90deg, #4a9eff, #0066cc)', 
              animation: 'loading 2s ease-in-out infinite'
            }}/>
          </div>
          <style>{`
            @keyframes fadeIn {
              from { opacity: 0; }
              to { opacity: 1; }
            }
            @keyframes loading {
              0% { transform: translateX(-100%); }
              50% { transform: translateX(0%); }
              100% { transform: translateX(100%); }
            }
            @keyframes float {
              0%, 100% { transform: translateY(0px); }
              50% { transform: translateY(-20px); }
            }
            @keyframes pulse {
              0%, 100% { opacity: 1; }
              50% { opacity: 0.6; }
            }
          `}</style>
          </div>
        </div>
      )}

      {message && !loading && (
        <div style={{ 
          padding: '16px', 
          borderRadius: '8px', 
          marginTop: '20px',
          background: message.includes('✅') ? '#efe' : message.includes('❌') ? '#fee' : '#fef',
          color: message.includes('✅') ? '#3c3' : message.includes('❌') ? '#c33' : '#333'
        }}>
          {message}
        </div>
      )}

      {charts.length > 0 && (
        <div className="dashboard">
          {analysis && (
            <div style={{ background: '#1a1f2e', padding: '30px', borderRadius: '15px', marginBottom: '30px', boxShadow: '0 4px 15px rgba(0,0,0,0.3)', border: '1px solid #2d3548' }}>
              <h2 style={{ color: '#e1e8f0', marginBottom: '20px' }}>🤖 Análise Executiva da IA</h2>
              
              <div style={{ marginBottom: '20px' }}>
                <h3 style={{ color: '#4a9eff', fontSize: '16px', marginBottom: '10px' }}>📋 Resumo:</h3>
                <p style={{ color: '#c1c9d2', lineHeight: '1.6' }}>{analysis.summary}</p>
              </div>

              {analysis.insights && analysis.insights.length > 0 && (
                <div style={{ marginBottom: '20px' }}>
                  <h3 style={{ color: '#4a9eff', fontSize: '16px', marginBottom: '10px' }}>💡 Insights:</h3>
                  <ul style={{ color: '#c1c9d2', lineHeight: '1.8' }}>
                    {analysis.insights.map((insight, i) => (
                      <li key={i}>{insight}</li>
                    ))}
                  </ul>
                </div>
              )}

              {analysis.alerts && analysis.alerts.length > 0 && (
                <div>
                  <h3 style={{ color: '#ff6b6b', fontSize: '16px', marginBottom: '10px' }}>⚠️ Pontos de Atenção:</h3>
                  <ul style={{ color: '#c1c9d2', lineHeight: '1.8' }}>
                    {analysis.alerts.map((alert, i) => (
                      <li key={i}>{alert}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          <h2 style={{ marginBottom: '30px', color: '#e1e8f0' }}>📊 Dashboards Gerados ({charts.length}):</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))', gap: '30px' }}>
            {charts.map((chart, idx) => (
              <div key={idx} style={{ background: '#1a1f2e', padding: '25px', borderRadius: '15px', boxShadow: '0 4px 15px rgba(0,0,0,0.3)', border: '1px solid #2d3548' }}>
                <h3 style={{ color: '#e1e8f0', marginBottom: '10px' }}>{chart.title}</h3>
                <p style={{ color: '#8b95a5', fontSize: '14px', marginBottom: '20px' }}>{chart.description}</p>
                
                <ResponsiveContainer width="100%" height={350}>
                  {chart.type === 'pie' ? (
                    <PieChart>
                      <Pie 
                        data={chart.data} 
                        dataKey="value" 
                        nameKey="name" 
                        cx="50%" 
                        cy="50%" 
                        outerRadius={120} 
                        label={({name, value, percent}: any) => `${name}: ${value.toLocaleString()} (${(percent * 100).toFixed(1)}%)`}
                        labelLine
                      >
                        {chart.data.map((_, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value: any) => value.toLocaleString()} />
                      <Legend />
                    </PieChart>
                  ) : chart.type === 'bar' ? (
                    <BarChart data={chart.data}>
                      <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
                      <YAxis tickFormatter={(value) => value.toLocaleString()} />
                      <Tooltip formatter={(value: any) => value.toLocaleString()} />
                      <Legend />
                      <Bar dataKey="value" fill="#4a9eff" label={{ position: 'top', formatter: (v: any) => v.toLocaleString() }} />
                    </BarChart>
                  ) : (
                    <LineChart data={chart.data}>
                      <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
                      <YAxis tickFormatter={(value) => value.toLocaleString()} />
                      <Tooltip formatter={(value: any) => value.toLocaleString()} />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="value" 
                        stroke="#4a9eff" 
                        strokeWidth={3}
                        dot={{ fill: '#4a9eff', r: 4 }}
                        activeDot={{ r: 6 }}
                      />
                    </LineChart>
                  )}
                </ResponsiveContainer>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default App
