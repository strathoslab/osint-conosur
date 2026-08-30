import React, { useState } from 'react';
import { 
  FileText, 
  Sparkles, 
  Download, 
  Copy, 
  Check, 
  RefreshCw
} from 'lucide-react';
import { CountryCode, StrategicPillar, GeneratedReport } from '../types';
import { COUNTRY_NAMES, ALERT_LEVEL_INFO } from '../utils/formatters';

interface ReportGeneratorProps {
  onGenerateReport: (params: {
    reportType: 'SITREP' | 'DOSSIER_COUNTRY' | 'THREAT_MATRIX' | 'GEOECONOMIC' | 'EARLY_WARNING' | 'CUSTOM';
    targetCountries: CountryCode[];
    pillar?: StrategicPillar | 'ALL';
    customPrompt?: string;
  }) => Promise<GeneratedReport>;
  isGenerating: boolean;
  historyReports: GeneratedReport[];
}

export const ReportGenerator: React.FC<ReportGeneratorProps> = ({
  onGenerateReport,
  isGenerating,
  historyReports,
}) => {
  const [reportType, setReportType] = useState<'SITREP' | 'DOSSIER_COUNTRY' | 'THREAT_MATRIX' | 'GEOECONOMIC' | 'EARLY_WARNING' | 'CUSTOM'>('SITREP');
  const [selectedCountries, setSelectedCountries] = useState<CountryCode[]>(['AR', 'CL', 'BR', 'UY', 'PY', 'BO']);
  const [pillar, setPillar] = useState<StrategicPillar | 'ALL'>('ALL');
  const [customPrompt, setCustomPrompt] = useState<string>('');
  const [activeReport, setActiveReport] = useState<GeneratedReport | null>(historyReports[0] || null);
  const [copied, setCopied] = useState<boolean>(false);

  const countryOptions: CountryCode[] = ['AR', 'CL', 'BR', 'UY', 'PY', 'BO'];

  const toggleCountry = (code: CountryCode) => {
    if (selectedCountries.includes(code)) {
      if (selectedCountries.length > 1) {
        setSelectedCountries(selectedCountries.filter((c) => c !== code));
      }
    } else {
      setSelectedCountries([...selectedCountries, code]);
    }
  };

  const handleGenerate = async () => {
    try {
      const report = await onGenerateReport({
        reportType,
        targetCountries: selectedCountries,
        pillar,
        customPrompt: reportType === 'CUSTOM' ? customPrompt : undefined,
      });
      setActiveReport(report);
    } catch (err) {
      console.error('Error generating report:', err);
    }
  };

  const copyToClipboard = () => {
    if (!activeReport) return;
    const text = `
=====================================================
INFORME DE INTELIGENCIA ESTRATÉGICA // OSINT CONO SUR
CLASIFICACIÓN: ${activeReport.classification}
FECHA: ${new Date(activeReport.createdAt).toLocaleString('es-AR')}
PAÍSES: ${activeReport.targetCountries.join(', ')}
=====================================================

TÍTULO: ${activeReport.title}

1. RESUMEN EJECUTIVO:
${activeReport.summary}

2. HALLAZGOS CLAVE:
${activeReport.keyFindings.map((f, i) => `${i + 1}. ${f}`).join('\n')}

3. EVALUACIÓN ESTRATÉGICA:
${activeReport.strategicAssessment}

4. MATRIZ DE RIESGO:
${activeReport.riskMatrix.map((r) => `• [${r.threatLevel}] ${r.area} (Tendencia: ${r.trend}): ${r.notes}`).join('\n')}

5. RECOMENDACIONES ESTRATÉGICAS:
${activeReport.recommendations.map((rec, i) => `${i + 1}. ${rec}`).join('\n')}
    `.trim();

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const downloadMarkdown = () => {
    if (!activeReport) return;
    const md = `# ${activeReport.title}
**Clasificación:** \`${activeReport.classification}\`  
**Fecha de Emisión:** ${new Date(activeReport.createdAt).toISOString()}  
**Países Objetivo:** ${activeReport.targetCountries.map((c) => COUNTRY_NAMES[c]?.name || c).join(', ')}  
**Fuentes Analizadas:** ${activeReport.sourcesAnalyzedCount}

---

## 1. Resumen Ejecutivo (Executive Summary)
${activeReport.summary}

---

## 2. Principales Hallazgos (Key Findings)
${activeReport.keyFindings.map((f) => `- ${f}`).join('\n')}

---

## 3. Evaluación Estratégica Regional
${activeReport.strategicAssessment}

---

## 4. Matriz de Riesgo y Alerta
| Área / Eje Crítico | Nivel de Amenaza | Tendencia | Observaciones Tácticas |
| :--- | :--- | :--- | :--- |
${activeReport.riskMatrix.map((r) => `| **${r.area}** | \`${r.threatLevel}\` | ${r.trend} | ${r.notes} |`).join('\n')}

---

## 5. Recomendaciones de Inteligencia & Acción
${activeReport.recommendations.map((rec, i) => `${i + 1}. ${rec}`).join('\n')}

---
*Generado automáticamente por el Sistema de Inteligencia OSINT Cono Sur con Gemini 3.7 Flash.*
`;

    const blob = new Blob([md], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `OSINT_REPORT_${activeReport.type}_${Date.now()}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Generator Control Panel */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4 backdrop-blur-sm">
        <div className="flex items-center justify-between pb-3.5 border-b border-slate-800 flex-wrap gap-2">
          <div className="flex items-center space-x-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 shadow-[0_0_15px_rgba(37,99,235,0.4)] text-white">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">
                Generador Automatizado de Informes de Inteligencia
              </h2>
              <p className="text-xs text-slate-400">
                Síntesis analítica con motor Gemini 3.7 Flash a partir de los cables y fuentes abiertas del Cono Sur
              </p>
            </div>
          </div>

          <div className="text-xs font-mono text-blue-400 bg-slate-950 px-3 py-1 rounded-md border border-slate-800">
            MOTOR: GEMINI 3.7 FLASH // SÍNTESIS C4ISR
          </div>
        </div>

        {/* Form Options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          {/* Report Type */}
          <div>
            <label className="block text-slate-300 font-medium mb-1.5 font-mono uppercase text-[11px]">
              Tipo de Informe:
            </label>
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value as any)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-200 focus:border-blue-500 focus:outline-none cursor-pointer"
            >
              <option value="SITREP">SITREP Flash (Situación Operativa 24-48h)</option>
              <option value="DOSSIER_COUNTRY">Dossier Estratégico País (Riesgo & FODA)</option>
              <option value="THREAT_MATRIX">Matriz de Amenazas Transfronterizas (Crimen / Narcotráfico / Pesca)</option>
              <option value="GEOECONOMIC">Informe Geo-Económico (Litio, Granos, Energía, Hidrovía)</option>
              <option value="EARLY_WARNING">Alerta Temprana (Disrupciones Portuarias & Hídricas)</option>
              <option value="CUSTOM">Informe a Medida (Prompt Personalizado)</option>
            </select>
          </div>

          {/* Strategic Pillar */}
          <div>
            <label className="block text-slate-300 font-medium mb-1.5 font-mono uppercase text-[11px]">
              Pilar Estratégico:
            </label>
            <select
              value={pillar}
              onChange={(e) => setPillar(e.target.value as any)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-200 focus:border-blue-500 focus:outline-none cursor-pointer"
            >
              <option value="ALL">Multidisciplinario / Todos los Pilares</option>
              <option value="DEFENSE_SECURITY">Defensa & Seguridad Fronteriza</option>
              <option value="GEOPOLITICS_DIPLOMACY">Geopolítica & Diplomacia Regional</option>
              <option value="ECONOMY_COMMODITIES">Economía & Commodities (Litio/Soja/Cobre)</option>
              <option value="ENERGY_INFRASTRUCTURE">Energía, Hidrovía & Puertos</option>
              <option value="CLIMATE_CRISIS">Cuencas Hídricas & Clima</option>
              <option value="CYBER_CRIME">Ciberseguridad</option>
            </select>
          </div>

          {/* Target Countries Selector */}
          <div>
            <label className="block text-slate-300 font-medium mb-1.5 font-mono uppercase text-[11px]">
              Países Objetivo ({selectedCountries.length}):
            </label>
            <div className="flex flex-wrap gap-1.5">
              {countryOptions.map((code) => {
                const isSelected = selectedCountries.includes(code);
                return (
                  <button
                    key={code}
                    type="button"
                    onClick={() => toggleCountry(code)}
                    className={`px-2.5 py-1.5 rounded-md text-xs font-mono font-medium transition cursor-pointer ${
                      isSelected
                        ? 'bg-blue-950 border border-blue-500 text-blue-300 shadow-[0_0_10px_rgba(37,99,235,0.2)]'
                        : 'bg-slate-950 border border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                    }`}
                  >
                    {COUNTRY_NAMES[code]?.flag} {code}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Custom Prompt Text Area if CUSTOM is selected */}
        {reportType === 'CUSTOM' && (
          <div>
            <label className="block text-slate-300 font-medium mb-1.5 font-mono uppercase text-[11px]">
              Instrucciones / Directivas para el Analista de IA:
            </label>
            <textarea
              rows={3}
              value={customPrompt}
              onChange={(e) => setCustomPrompt(e.target.value)}
              placeholder="Ej: Evaluar el impacto de la licitación de la Hidrovía Paraná-Paraguay sobre los puertos de Santa Fe y Montevideo, considerando el flujo de barcazas de Bolivia y Paraguay..."
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-xs text-slate-200 placeholder-slate-500 focus:border-blue-500 focus:outline-none"
            />
          </div>
        )}

        {/* Action Button */}
        <div className="pt-2 flex justify-end">
          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            id="btn-execute-generate-report"
            className="flex items-center space-x-2 px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition shadow-[0_0_15px_rgba(37,99,235,0.3)] disabled:opacity-50 cursor-pointer"
          >
            <RefreshCw className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} />
            <span>{isGenerating ? 'Compilando Inteligencia Estratégica...' : 'Generar Informe Automatizado'}</span>
          </button>
        </div>
      </div>

      {/* Active Generated Report View */}
      {activeReport ? (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-6">
          {/* Report Top Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2 flex-wrap mb-1.5">
                <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-blue-950 border border-blue-500/40 text-blue-300">
                  {activeReport.classification}
                </span>
                <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-slate-950 border border-slate-800 text-slate-300">
                  TIPO: {activeReport.type}
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  EMITIDO: {new Date(activeReport.createdAt).toLocaleString('es-AR')}
                </span>
              </div>
              <h2 className="text-lg sm:text-2xl font-bold text-white leading-tight">
                {activeReport.title}
              </h2>
              <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mt-1">
                <span>PAÍSES ANALIZADOS:</span>
                <span className="text-slate-200 font-semibold">
                  {activeReport.targetCountries.map((c) => `${COUNTRY_NAMES[c]?.flag} ${c}`).join(' • ')}
                </span>
              </div>
            </div>

            {/* Actions: Copy & Download */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={copyToClipboard}
                className="flex items-center space-x-1.5 px-3.5 py-2 rounded-lg bg-slate-850 hover:bg-slate-800 text-slate-200 border border-slate-700 text-xs transition cursor-pointer"
                title="Copiar texto estructurado"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copiado' : 'Copiar'}</span>
              </button>

              <button
                onClick={downloadMarkdown}
                className="flex items-center space-x-1.5 px-3.5 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium transition shadow-[0_0_15px_rgba(37,99,235,0.3)] cursor-pointer"
                title="Descargar en formato Markdown"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Exportar MD</span>
              </button>
            </div>
          </div>

          {/* Section 1: Resumen Ejecutivo */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-wider text-blue-400 font-bold mb-2 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
              1. Resumen Ejecutivo (Executive Summary)
            </h3>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/90 text-sm text-slate-200 leading-relaxed font-medium">
              {activeReport.summary}
            </div>
          </div>

          {/* Section 2: Principales Hallazgos */}
          {activeReport.keyFindings && activeReport.keyFindings.length > 0 && (
            <div>
              <h3 className="text-xs font-mono uppercase tracking-wider text-blue-400 font-bold mb-2 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                2. Hallazgos Clave de Inteligencia
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {activeReport.keyFindings.map((finding, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 text-xs text-slate-300 flex items-start gap-2.5"
                  >
                    <span className="font-mono text-blue-400 font-bold text-xs bg-slate-900 px-1.5 py-0.5 rounded border border-slate-800">
                      0{idx + 1}
                    </span>
                    <span className="leading-snug">{finding}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section 3: Evaluación Estratégica Regional */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-wider text-blue-400 font-bold mb-2 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
              3. Evaluación Estratégica & Escenarios Futuros
            </h3>
            <div className="p-4 rounded-xl bg-slate-950/50 border border-slate-800 text-xs sm:text-sm text-slate-300 leading-relaxed space-y-2">
              {activeReport.strategicAssessment}
            </div>
          </div>

          {/* Section 4: Matriz de Riesgo y Alerta */}
          {activeReport.riskMatrix && activeReport.riskMatrix.length > 0 && (
            <div>
              <h3 className="text-xs font-mono uppercase tracking-wider text-blue-400 font-bold mb-2 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                4. Matriz de Riesgo & Vectores Críticos
              </h3>
              <div className="overflow-x-auto border border-slate-800 rounded-xl">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-950 text-slate-400 font-mono border-b border-slate-800">
                    <tr>
                      <th className="p-3">Área / Eje Crítico</th>
                      <th className="p-3">Nivel de Amenaza</th>
                      <th className="p-3">Tendencia</th>
                      <th className="p-3">Observaciones Tácticas</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 font-mono">
                    {activeReport.riskMatrix.map((row, idx) => {
                      const alertMeta = ALERT_LEVEL_INFO[row.threatLevel] || ALERT_LEVEL_INFO.MEDIUM;
                      return (
                        <tr key={idx} className="hover:bg-slate-950/40">
                          <td className="p-3 font-semibold text-slate-200">{row.area}</td>
                          <td className="p-3">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${alertMeta.bg} ${alertMeta.text} ${alertMeta.border}`}>
                              {row.threatLevel}
                            </span>
                          </td>
                          <td className="p-3 text-slate-300">
                            <span className={row.trend === 'INCREASING' ? 'text-red-400' : row.trend === 'DECREASING' ? 'text-emerald-400' : 'text-slate-400'}>
                              {row.trend === 'INCREASING' ? '▲ EN AUMENTO' : row.trend === 'DECREASING' ? '▼ EN DESCENSO' : '■ ESTABLE'}
                            </span>
                          </td>
                          <td className="p-3 text-slate-400 font-sans text-xs">{row.notes}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Section 5: Recomendaciones */}
          {activeReport.recommendations && activeReport.recommendations.length > 0 && (
            <div>
              <h3 className="text-xs font-mono uppercase tracking-wider text-blue-400 font-bold mb-2 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                5. Recomendaciones Estratégicas & Medidas Mitigantes
              </h3>
              <div className="space-y-2">
                {activeReport.recommendations.map((rec, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 text-xs text-slate-200 flex items-start gap-2.5"
                  >
                    <span className="text-emerald-400 font-bold font-mono">✓</span>
                    <span className="leading-relaxed">{rec}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Report Footer */}
          <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] font-mono text-slate-500">
            <span>SISTEMA DE INTELIGENCIA DE FUENTES ABIERTAS // CONO SUR</span>
            <span>FUENTES ANALIZADAS: {activeReport.sourcesAnalyzedCount}</span>
          </div>
        </div>
      ) : (
        <div className="p-12 text-center bg-slate-900 border border-slate-800 rounded-2xl space-y-3">
          <FileText className="w-8 h-8 text-blue-400 mx-auto opacity-70" />
          <h4 className="text-sm font-semibold text-slate-200">No hay ningún informe seleccionado</h4>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Configura los parámetros arriba y haz clic en "Generar Informe Automatizado" para compilar un análisis estratégico completo con IA.
          </p>
        </div>
      )}
    </div>
  );
};
