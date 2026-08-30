import { GoogleGenAI, Type } from '@google/genai';
import { GeneratedReport, IntelItem, CountryCode, StrategicPillar } from '../src/types.js';

let aiClient: GoogleGenAI | null = null;

function getAiClient(): GoogleGenAI | null {
  if (!aiClient && process.env.GEMINI_API_KEY) {
    aiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}

export async function generateStrategicReport(params: {
  reportType: 'SITREP' | 'DOSSIER_COUNTRY' | 'THREAT_MATRIX' | 'GEOECONOMIC' | 'EARLY_WARNING' | 'CUSTOM';
  targetCountries: CountryCode[];
  pillar?: StrategicPillar | 'ALL';
  customPrompt?: string;
  contextItems: IntelItem[];
}): Promise<GeneratedReport> {
  const ai = getAiClient();
  const timestamp = new Date().toISOString();

  // If no Gemini API key or in offline mode, produce structured fallback intelligence report
  if (!ai) {
    return generateFallbackReport(params, timestamp);
  }

  const itemsContext = params.contextItems.slice(0, 15).map(item => (
    `[${item.country}] [${item.pillar}] [${item.level}] ${item.title} (${item.source}): ${item.summary}`
  )).join('\n');

  const systemInstruction = `Eres el Director de Inteligencia y Análisis Estratégico para el Cono Sur (Argentina, Chile, Uruguay, Brasil, Paraguay y Bolivia).
Tu misión es generar informes de inteligencia de fuentes abiertas (OSINT) rigurosos, analíticos, con lenguaje sobrio de doctrina de Estado Mayor y metodología de evaluación de riesgos estratégicos (geopolítica, recursos críticos como litio/cobre/Vaca Muerta, hidrovía Paraná-Paraguay, puertos, seguridad fronteriza, crimen organizado y estabilidad monetaria).

Debes responder estrictamente en formato JSON con la siguiente estructura:
{
  "title": "Título formal del reporte",
  "classification": "UNCLASSIFIED // OSINT" o "CONFIDENCIAL // USO INTERNO" o "FLASH SITREP",
  "summary": "Resumen ejecutivo de 2 a 3 párrafos de alto impacto",
  "keyFindings": ["Hallazgo clave 1", "Hallazgo clave 2", "Hallazgo clave 3", "Hallazgo clave 4"],
  "strategicAssessment": "Evaluación estratégica profunda detallando interconexiones entre países del Cono Sur y escenarios futuros",
  "riskMatrix": [
    {
      "area": "Ej. Hidrovía Paraná-Paraguay / Triángulo del Litio / Frontera Seca",
      "threatLevel": "CRITICAL" | "HIGH" | "MEDIUM" | "ROUTINE",
      "trend": "INCREASING" | "STABLE" | "DECREASING",
      "notes": "Justificación táctica"
    }
  ],
  "recommendations": ["Recomendación de política/seguridad 1", "Recomendación 2", "Recomendación 3"]
}`;

  const prompt = `Tipo de Informe: ${params.reportType}
Países Objetivos: ${params.targetCountries.join(', ')}
Pilar Estratégico: ${params.pillar || 'INTEGRAL / MULTIDISCIPLINARIO'}
${params.customPrompt ? `Instrucción Específica: ${params.customPrompt}` : ''}

Cables e ítems de inteligencia recientes capturados en el Cono Sur:
${itemsContext}

Por favor genera el informe de inteligencia estructurado con evaluación de impacto regional.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3.7-flash',
      contents: prompt,
      config: {
        systemInstruction,
        responseMimeType: 'application/json',
      },
    });

    const responseText = response.text || '';
    const parsedData = JSON.parse(responseText.trim());

    return {
      id: `report-${Date.now()}`,
      title: parsedData.title || `Informe Estratégico Cono Sur - ${params.reportType}`,
      type: params.reportType,
      targetCountries: params.targetCountries,
      pillar: params.pillar,
      createdAt: timestamp,
      summary: parsedData.summary || 'Resumen no disponible.',
      classification: parsedData.classification || 'UNCLASSIFIED // OSINT',
      keyFindings: parsedData.keyFindings || [],
      strategicAssessment: parsedData.strategicAssessment || '',
      riskMatrix: parsedData.riskMatrix || [],
      recommendations: parsedData.recommendations || [],
      sourcesAnalyzedCount: Math.min(params.contextItems.length, 15),
    };
  } catch (error) {
    console.error('Error generating report with Gemini:', error);
    return generateFallbackReport(params, timestamp);
  }
}

export async function askIntelAnalyst(query: string, contextItems: IntelItem[]): Promise<{ answer: string; sourcesUsed: string[] }> {
  const ai = getAiClient();
  if (!ai) {
    return {
      answer: `[MODO LOCAL] Basado en los registros del Cono Sur: La consulta sobre "${query}" se relaciona con los focos de interés prioritarios en la región (Hidrovía, Triángulo del Litio, Corredor Bioceánico y Vaca Muerta). Para análisis con IA generativa en vivo, verifique que la clave de API de Gemini esté activa.`,
      sourcesUsed: contextItems.slice(0, 3).map(i => i.source)
    };
  }

  const itemsContext = contextItems.slice(0, 12).map(item => (
    `• [${item.country}] [${item.pillar}] [${item.level}] ${item.title}: ${item.summary} (Fuente: ${item.source})`
  )).join('\n');

  const systemInstruction = `Eres el Analista Principal del Centro de Inteligencia OSINT Cono Sur (Argentina, Chile, Uruguay, Brasil, Paraguay y Bolivia).
Proporcionas respuestas analíticas directas, altamente informadas y fundamentadas en geopolítica, infraestructura crítica (puertos, represas, pasos cordilleranos, hidrovías), recursos estratégicos (litio, cobre, petróleo/gas, agroindustria) y seguridad regional.
Utiliza viñetas claras, lenguaje técnico de analista de inteligencia y conclusiones accionables.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3.7-flash',
      contents: `Pregunta de Inteligencia: ${query}

Cables e inteligencia disponible:
${itemsContext}`,
      config: {
        systemInstruction,
      }
    });

    const answer = response.text || 'Sin respuesta del modelo.';
    const sourcesUsed = Array.from(new Set(contextItems.slice(0, 5).map(i => i.source)));

    return { answer, sourcesUsed };
  } catch (error: any) {
    console.error('Error in askIntelAnalyst:', error);
    return {
      answer: `Error procesando la consulta con el motor de inteligencia: ${error?.message || 'Error desconocido'}.`,
      sourcesUsed: []
    };
  }
}

function generateFallbackReport(params: {
  reportType: string;
  targetCountries: CountryCode[];
  pillar?: StrategicPillar | 'ALL';
  contextItems: IntelItem[];
}, timestamp: string): GeneratedReport {
  const countryList = params.targetCountries.join(', ');
  return {
    id: `report-${Date.now()}`,
    title: `Informe Estratégico de Situación Cono Sur: ${params.reportType} (${countryList})`,
    type: params.reportType as any,
    targetCountries: params.targetCountries,
    pillar: params.pillar,
    createdAt: timestamp,
    summary: `Este informe consolida los eventos e indicadores de fuentes abiertas monitoreados en tiempo real para ${countryList}. Se observa un incremento en la interdependencia logística fluvial y energética, destacándose el papel del Corredor Bioceánico y la articulación del Triángulo del Litio entre Argentina, Chile y Bolivia.`,
    classification: 'UNCLASSIFIED // OSINT',
    keyFindings: [
      'Monitoreo activo sobre el calado y peajes en la Vía Navegable Troncal de la Hidrovía Paraná-Paraguay.',
      'Aceleración de acuerdos de provisión de gas de Vaca Muerta hacia el mercado industrial de Brasil utilizando infraestructura de transporte boliviana.',
      'Coordinación de fuerzas de seguridad en la frontera seca Brasil-Paraguay frente al crimen organizado trasnacional.',
      'Demanda sostenida y avances regulatorios en el Salar de Atacama (Chile), Hombre Muerto (Argentina) y Uyuni (Bolivia).'
    ],
    strategicAssessment: 'La región del Cono Sur atraviesa una reconfiguración de sus ejes de exportación física. Mientras los puertos del Atlántico (Santos, Gran Rosario, Buenos Aires, Montevideo) mantienen su peso histórico, la presión por conectar la producción con los mercados asiáticos a través de los puertos chilenos (Antofagasta, San Antonio) está dinamizando corredores terrestres y acuerdos aduaneros.',
    riskMatrix: [
      {
        area: 'Hidrovía Paraná-Paraguay',
        threatLevel: 'HIGH',
        trend: 'INCREASING',
        notes: 'Variabilidad hidrológica y controversias tarifarias de navegación.'
      },
      {
        area: 'Frontera Seca Pedro Juan Caballero / Ponta Porã',
        threatLevel: 'CRITICAL',
        trend: 'INCREASING',
        notes: 'Presencia de facciones criminales y tráfico ilícito.'
      },
      {
        area: 'Suministro Energético Regional (Gasbol / Vaca Muerta)',
        threatLevel: 'MEDIUM',
        trend: 'STABLE',
        notes: 'Dependencia de acuerdos trilaterales entre Argentina, Bolivia y Brasil.'
      }
    ],
    recommendations: [
      'Establecer una mesa permanente de interoperabilidad hidrométrica y aduanera en la Cuenca del Plata.',
      'Reforzar los sistemas de vigilancia radarizada y control de transpondedores marítimos en la ZEE.',
      'Promover un marco regulatorio armónico para la industrialización del litio en el cono andino.'
    ],
    sourcesAnalyzedCount: params.contextItems.length,
  };
}
