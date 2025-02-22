import React, { useState, useRef } from 'react';

const Analysis = () => {
  const [loading, setLoading] = useState(false);
  const [analysisData, setAnalysisData] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null); // Renombrado a selectedFile
  const [displayCount, setDisplayCount] = useState(10);
  const fileInputRef = useRef(null);

  const DEPARTMENTS = ['Finanzas', 'RRHH', 'Ventas', 'Marketing', 'Legal', 'IT'];
  const EXPOSURES = [
    'Información Financiera',
    'Información de Identificación Personal (PII)',
    'Documentos de Identificación Nacional',
    'Información Médica',
    'Credenciales de Autenticación',
    'Información Corporativa Confidencial',
    'Propiedad Intelectual',
    'Datos de Geolocalización',
    'Información Legal',
    'Datos Educativos',
    'Información de Redes Sociales',
    'Archivos Temporales o Backups'
  ];
  const FILE_TYPES = ['.xlsx', '.pdf', '.doc', '.sql', '.csv', '.json'];
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

  const handleFileSelect = (event) => { // Cambiado a handleFileSelect
    const file = event.target.files[0];
    if (file) {
      setSelectedFile({
        name: file.name,
        size: `${(file.size / 1024 / 1024).toFixed(2)} MB`, // Tamaño del archivo
      });
    }
  };

  const getConfidentialityLevel = (vulnerabilities) => {
    if (vulnerabilities > 15) return { level: 'Confidencial', color: 'red' };
    if (vulnerabilities > 10) return { level: 'Restringido', color: 'orange' };
    if (vulnerabilities > 5) return { level: 'Uso Interno', color: 'yellow' };
    return { level: 'Público', color: 'green' };
  };

  const handleAnalyze = () => {
    if (!selectedFile) {
      alert('Por favor selecciona un archivo primero');
      return;
    }

    setLoading(true);
    setDisplayCount(10); // Reinicia la cantidad de archivos mostrados al analizar nuevos datos
    
    const mockData = generateMockData(1); // Solo generamos un archivo para el análisis

    setTimeout(() => {
      setAnalysisData(mockData);
      setLoading(false);
    }, 5000);
  };

  const generateMockData = (fileCount) => {
    const files = [];
    let totalVulnerabilities = 0;
    const departmentCounts = {};
    const vulnerabilityTypeCounts = {};
    
    const department = DEPARTMENTS[Math.floor(Math.random() * DEPARTMENTS.length)];
    const vulnerabilities = Math.floor(Math.random() * 20) + 1;
    
    const exposureCount = Math.min(
      Math.floor(vulnerabilities / 5) + 1,
      Math.floor(Math.random() * 3) + 1
    );
    
    const exposures = [];
    
    for (let j = 0; j < exposureCount; j++) {
      let exposure;
      switch(department) {
        case 'Finanzas':
          exposure = EXPOSURES[Math.random() > 0.5 ? 0 : 5];
          break;
        case 'RRHH':
          exposure = EXPOSURES[Math.random() > 0.5 ? 1 : 3];
          break;
        case 'Legal':
          exposure = EXPOSURES[Math.random() > 0.5 ? 8 : 6];
          break;
        default:
          exposure = EXPOSURES[Math.floor(Math.random() * EXPOSURES.length)];
      }
      
      if (!exposures.includes(exposure)) {
        exposures.push(exposure);
        vulnerabilityTypeCounts[exposure] = (vulnerabilityTypeCounts[exposure] || 0) + vulnerabilities;
      }
    }

    departmentCounts[department] = (departmentCounts[department] || 0) + vulnerabilities;
    totalVulnerabilities += vulnerabilities;

    files.push({
      name: `/${department.toLowerCase()}/${Math.random().toString(36).substring(7)}${FILE_TYPES[Math.floor(Math.random() * FILE_TYPES.length)]}`,
      vulnerabilities,
      exposures,
      department,
      size: `${(Math.random() * 10).toFixed(1)}MB`
    });

    const vulnerabilityTypes = Object.entries(vulnerabilityTypeCounts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);

    const departmentBreakdown = Object.entries(departmentCounts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);

    return {
      files,
      vulnerabilityTypes,
      summary: {
        totalFiles: 1, // Ahora solo se cuenta un archivo
        totalVulnerabilities,
        departmentBreakdown
      }
    };
  };

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ marginBottom: '20px' }}>
        <h1>Análisis de Vulnerabilidades OpenDLP</h1>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <button 
          onClick={() => fileInputRef.current.click()}
          style={{
            padding: '10px 20px',
            marginRight: '10px',
            backgroundColor: '#f0f0f0',
            border: '1px solid #ddd',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          📁 Seleccionar Archivo
        </button>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileSelect}
          style={{ display: 'none' }}
        />
        
        {selectedFile && (
          <div style={{ 
            padding: '10px', 
            backgroundColor: '#f8f9fa', 
            border: '1px solid #dee2e6',
            borderRadius: '4px',
            marginTop: '10px'
          }}>
            <p>Archivo seleccionado: <strong>{selectedFile.name}</strong></p>
            <p>Tamaño: <strong>{selectedFile.size}</strong></p>
          </div>
        )}
      </div>

      <button 
        onClick={handleAnalyze}
        disabled={loading || !selectedFile}
        style={{
          padding: '10px 20px',
          backgroundColor: loading ? '#ccc' : '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: loading ? 'not-allowed' : 'pointer',
          marginBottom: '20px'
        }}
      >
        {loading ? 'Analizando con OpenDLP...' : 'Analizar Vulnerabilidades'}
      </button>

      {analysisData && !loading && (
        <div>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
            gap: '20px',
            marginBottom: '30px' 
          }}>
            <div style={{ 
              padding: '20px', 
              backgroundColor: '#f8f9fa', 
              borderRadius: '8px',
              textAlign: 'center'
            }}>
              <h3>{analysisData.summary.totalFiles}</h3>
              <p>Archivo Analizado</p>
            </div>
            <div style={{ 
              padding: '20px', 
              backgroundColor: '#f8f9fa', 
              borderRadius: '8px',
              textAlign: 'center'
            }}>
              <h3>{analysisData.summary.totalVulnerabilities}</h3>
              <p>Vulnerabilidades Totales</p>
            </div>
          </div>

          <div style={{ overflowX: 'auto', marginBottom: '30px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ backgroundColor: '#f8f9fa' }}>
                  <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #dee2e6' }}>Archivo</th>
                  <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #dee2e6' }}>Tamaño</th>
                  <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #dee2e6' }}>Vulnerabilidades</th>
                  <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #dee2e6' }}>Nivel</th>
                  <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #dee2e6' }}>Exposiciones</th>
                  <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #dee2e6' }}>Departamento</th>
                </tr>
              </thead>
              <tbody>
                {analysisData.files.map((file, index) => {
                  const { level, color } = getConfidentialityLevel(file.vulnerabilities);
                  return (
                    <tr key={index} style={{ borderBottom: '1px solid #dee2e6' }}>
                      <td style={{ padding: '12px' }}>{file.name}</td>
                      <td style={{ padding: '12px' }}>{file.size}</td>
                      <td style={{ padding: '12px' }}>{file.vulnerabilities}</td>
                      <td style={{ padding: '12px' }}>
                        <span style={{ backgroundColor: color, color: 'black', padding: '5px 10px', borderRadius: '4px' }}>
                          {level}
                        </span>
                      </td>
                      <td style={{ padding: '12px' }}>{file.exposures.join(', ')}</td>
                      <td style={{ padding: '12px' }}>{file.department}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          
        </div>
      )}
    </div>
  );
};

export default Analysis;
