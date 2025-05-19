import React, { useState, useEffect } from 'react';
import './App.css';

// Datos actualizados con mejoras del Mid-Sprint 4
const videos = [
  { 
    id: 1, 
    title: 'Álgebra Básica', 
    subject: 'Matemáticas', 
    url: { '360p': 'https://www.youtube.com/embed/-RDBMu7BreE', '720p': 'https://youtu.be/basic-algebra-720' },
    thumbnail: 'https://img.youtube.com/vi/basic-algebra-360/hqdefault.jpg', // Miniatura del video
    subtitles: true,
    vttUrl: '/subtitles/algebra.vtt',
    duration: '15:30'
  },
  { 
    id: 2, 
    title: 'Fotosíntesis', 
    subject: 'Biología', 
    url: { '360p': 'https://www.youtube.com/embed/X2Z-0e5maKw', '720p': 'https://youtu.be/photosynthesis-720' },
    thumbnail: 'https://img.youtube.com/vi/photosynthesis-360/hqdefault.jpg', // Miniatura del video
    subtitles: false,
    duration: '20:15'
  },
];

const pdfGuides = [
  { 
    id: 1, 
    title: 'Guía de Matemáticas', 
    url: 'https://aws.s3/guia-matematicas-v3.pdf',
    signed: true,
    index: ['Introducción', 'Ejercicios Básicos', 'Problemas Avanzados', 'Soluciones']
  },
  { 
    id: 2, 
    title: 'Guía de Biología', 
    url: 'https://aws.s3/guia-biologia-v3.pdf',
    signed: false,
    index: ['Conceptos Clave', 'Diagramas', 'Cuestionario']
  },
];

function App() {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [selectedPdf, setSelectedPdf] = useState(null);
  const [selectedQuality, setSelectedQuality] = useState('720p');
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [activeView, setActiveView] = useState('videos'); // Estado para controlar la vista activa
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Estado para manejar el login
  const [progress, setProgress] = useState(45); // Progreso del usuario (simulado)

  useEffect(() => {
    // Simular carga inicial
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(!isLoggedIn); // Alternar estado de login
  };

  const QualitySelector = ({ qualities, current, onSelect }) => (
    <div className="quality-selector">
      <span>Calidad:</span>
      {Object.keys(qualities).map((quality) => (
        <button
          key={quality}
          className={current === quality ? 'active' : ''}
          onClick={() => onSelect(quality)}
        >
          {quality}
        </button>
      ))}
    </div>
  );

  const PdfIndex = ({ index }) => (
    <div className="pdf-index">
      <h3>Índice</h3>
      <ul>
        {index.map((item, idx) => (
          <li 
            key={idx} 
            className={activeIndex === idx ? 'active' : ''}
            onClick={() => setActiveIndex(idx)}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );

  const renderContent = () => {
    switch (activeView) {
      case 'videos':
        return (
          <section className="video-section">
            <h2 className="section-title">Últimos Videos Educativos</h2>
            <div className="video-grid">
              {videos.map((video) => (
                <article 
                  key={video.id} 
                  className="video-card"
                  onClick={() => setSelectedVideo(video)}
                >
                  <div className="thumbnail-container">
                    <img 
                      src={`https://img.youtube.com/vi/${video.url['360p'].split('/').pop()}/hqdefault.jpg`} 
                      alt={`Miniatura de ${video.title}`} 
                      className="thumbnail"
                    />
                    <div className="thumbnail-overlay">
                      <span className="duration">{video.duration}</span>
                      {video.subtitles && (
                        <button 
                          className="subtitle-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            console.log(`Descargando subtítulos: ${video.vttUrl}`);
                          }}
                        >
                          🎯 Descargar Subtítulos
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="video-info">
                    <h3>{video.title}</h3>
                    <div className="meta-info">
                      <span className="subject">{video.subject}</span>
                      <div className="quality-tags">
                        {Object.keys(video.url).map((quality) => (
                          <span key={quality} className="quality-tag">{quality}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        );

      case 'guides':
        return (
          <section className="pdf-section">
            <h2 className="section-title">Guías de Estudio</h2>
            <div className="pdf-grid">
              {pdfGuides.map((pdf) => (
                <article 
                  key={pdf.id} 
                  className="pdf-card"
                  onClick={() => setSelectedPdf(pdf)}
                >
                  <div className="pdf-header">
                    <div className="pdf-icon"></div>
                    <div className="pdf-meta">
                      <h3>{pdf.title}</h3>
                      {pdf.signed && <span className="signed-badge">✔️ Certificado</span>}
                    </div>
                  </div>
                  <div className="pdf-index-preview">
                    <ul>
                      {pdf.index.slice(0, 3).map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </article>
              ))}
            </div>
          </section>
        );

      case 'progress':
        return (
          <section className="progress-section">
            <h2 className="section-title">Progreso del Usuario</h2>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${progress}%` }}></div>
            </div>
            <p>{progress}% Completado</p>
          </section>
        );

      default:
        return null;
    }
  };

  return (
    <div className="App">
      <header className="header">
  <h1>Plataforma Educativa <span className="version">v1.4</span></h1>
  
  <div className="header-right">
    <nav>
      <button 
        className={`nav-btn ${activeView === 'videos' ? 'active' : ''}`}
        onClick={() => setActiveView('videos')}
      >
        Videos
      </button>
      <button 
        className={`nav-btn ${activeView === 'guides' ? 'active' : ''}`}
        onClick={() => setActiveView('guides')}
      >
        Guías
      </button>
      <button 
        className={`nav-btn ${activeView === 'progress' ? 'active' : ''}`}
        onClick={() => setActiveView('progress')}
      >
        Progreso
      </button>
      {/* Botón de cuestionarios en la navegación */}
      <button className="nav-btn">Cuestionarios</button>
    </nav>

    <div className="header-tools">
      {/* Barra de búsqueda (placeholder) */}
      <input 
        type="text" 
        placeholder="Buscar..." 
        className="search-bar"
        readOnly
      />
      
      {/* Botón de modo oscuro (placeholder) */}
      <button className="dark-mode-btn">🌙</button>
      
      <button 
        className="login-btn"
        onClick={handleLogin}
      >
        {isLoggedIn ? 'Logout' : 'Login'}
      </button>
    </div>
  </div>
</header>
      <main>
        {loading && (
          <div className="loading-overlay">
            <div className="spinner"></div>
            <p>Optimizando para conexiones lentas...</p>
          </div>
        )}
        {!loading && renderContent()}
      </main>
    </div>
  );
}

export default App;
