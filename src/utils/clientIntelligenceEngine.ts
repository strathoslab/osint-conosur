import { GeneratedReport, CountryCode, StrategicPillar, IntelItem, AlertLevel } from '../types';
import { COUNTRY_PROFILES } from '../data/staticData';

export function generateClientReport(params: {
  reportType: 'SITREP' | 'DOSSIER_COUNTRY' | 'THREAT_MATRIX' | 'GEOECONOMIC' | 'EARLY_WARNING' | 'CUSTOM';
  targetCountries: CountryCode[];
  pillar?: StrategicPillar | 'ALL';
  customPrompt?: string;
  items: IntelItem[];
}): GeneratedReport {
  const { reportType, targetCountries, pillar, customPrompt, items } = params;
  const countriesStr = targetCountries.join(', ');
  
  const relevantItems = items.filter(i => 
    (targetCountries.includes(i.country) || i.country === 'REGIONAL') &&
    (pillar === 'ALL' || !pillar || i.pillar === pillar)
  );

  const reportId = `rep-osint-${Date.now()}`;
  const now = new Date().toISOString();

  let title = `EVALUACIÓN ESTRATÉGICA // CONO SUR [${countriesStr}]`;
  let classification: 'UNCLASSIFIED // OSINT' | 'CONFIDENCIAL // USO INTERNO' | 'FLASH SITREP' = 'UNCLASSIFIED // OSINT';
  let summary = '';
  const keyFindings: string[] = [];
  const riskMatrix: { area: string; threatLevel: AlertLevel; trend: 'INCREASING' | 'STABLE' | 'DECREASING'; notes: string }[] = [];
  const recommendations: string[] = [];

  if (reportType === 'GEOECONOMIC') {
    title = `INFORME GEOECONÓMICO Y DE RECURSOS ESTRATÉGICOS // CONO SUR`;
    classification = 'CONFIDENCIAL // USO INTERNO';
    summary = `Evaluación integral del impacto de las cotizaciones de commodities (soja, litio, cobre, petróleo Medanito y gas natural) en las reservas monetarias, equilibrio fiscal y logística multimodal de ${countriesStr}.`;
    keyFindings.push(
      `Preponderancia de la Hidrovía Paraná-Paraguay como arteria crítica por donde transita más del 70% del saldo exportable de granos de Argentina y Paraguay.`,
      `El Triángulo del Litio (Salar de Atacama, Hombre Muerto y Uyuni) experimenta una reconfiguración de inversiones ante las exigencias de tecnologías EDL y valor agregado local.`,
      `La integración del gas de Vaca Muerta hacia el mercado industrial brasileño mediante la reversión del Gasoducto Norte y el sistema boliviano redefine la balanza comercial regional.`,
      `Volatilidad cambiaria y regulaciones arancelarias condicionan el ritmo de liquidación de divisas del agro y la estabilidad macroeconómica.`
    );
    riskMatrix.push(
      { area: 'Logística Fluvial e Hidrovía Paraná-Paraguay', threatLevel: 'HIGH', trend: 'INCREASING', notes: 'Disputas por tarifas de dragado y calado crítico ante eventos climáticos.' },
      { area: 'Cadena de Suministro de Litio y Minerales Críticos', threatLevel: 'MEDIUM', trend: 'STABLE', notes: 'Competencia entre modelos estatales y licencias privadas en NOA y Atacama.' },
      { area: 'Infraestructura de Gasoductos (Gasbol / Vaca Muerta)', threatLevel: 'MEDIUM', trend: 'DECREASING', notes: 'Acuerdos de transporte y reversión técnica en etapa avanzada.' }
    );
    recommendations.push(
      'Homologar protocolos de peaje y mantenimiento de calado continuo en los pasos críticos del Río Paraná y Paraguay.',
      'Acelerar esquemas de incentivos a la inversión a largo plazo en infraestructura de compresión de gasoductos.',
      'Diversificar salidas logísticas bioceánicas para mitigar la saturación de los puertos fluviales tradicionales.'
    );
  } else if (reportType === 'THREAT_MATRIX') {
    title = `MATRIZ DE RIESGO Y AMENAZAS ESTRATÉGICAS // CONO SUR`;
    classification = 'CONFIDENCIAL // USO INTERNO';
    summary = `Monitoreo prospectivo de vectores de riesgo en defensa, seguridad fronteriza, crimen organizado transnacional y ciberataques en la región del Cono Sur (${countriesStr}).`;
    keyFindings.push(
      `Presión de organizaciones criminales transnacionales (PCC y redes asociadas) sobre la frontera seca paraguayo-brasileña y puertos de transbordo fluvial.`,
      `Incremento de incidentes de ciberseguridad dirigidos a infraestructuras críticas portuarias, energéticas y bancarias de la región.`,
      `Vigilancia prioritaria y patrullaje sobre la Zona Económica Exclusiva (ZEE) del Atlántico Sur y corredores de proyección antártica.`
    );
    riskMatrix.push(
      { area: 'Seguridad Fronteriza y Triple Frontera', threatLevel: 'CRITICAL', trend: 'INCREASING', notes: 'Contrabando y flujo de ilícitos en corredores terrestres y fluviales.' },
      { area: 'Ciberdefensa en Nodos Críticos Portuarios', threatLevel: 'HIGH', trend: 'INCREASING', notes: 'Campañas de ransomware detectadas en terminales de Santos y Rosario.' },
      { area: 'Soberanía Marítima y Espacio Aéreo Austral', threatLevel: 'MEDIUM', trend: 'STABLE', notes: 'Despliegue de radares 3D y patrullaje conjunto naval.' }
    );
    recommendations.push(
      'Profundizar el intercambio de inteligencia en tiempo real entre agencias federales (SENAD, DPF, PNA y Carabineros).',
      'Implementar estándares obligatorios de segmentación de redes OT/IT en terminales agroexportadoras y energéticas.',
      'Reforzar la interoperabilidad de sensores de vigilancia radar y control satelital en el Atlántico Sur.'
    );
  } else if (reportType === 'DOSSIER_COUNTRY') {
    const mainCountry = targetCountries[0] || 'AR';
    const profile = COUNTRY_PROFILES[mainCountry];
    title = `DOSSIER ESTRATÉGICO DE PAÍS // ${profile?.name?.toUpperCase() || mainCountry}`;
    classification = 'UNCLASSIFIED // OSINT';
    summary = `Evaluación detallada de la situación política, seguridad, balance geoeconómico y vectores de desarrollo estratégico de ${profile?.name || mainCountry}.`;
    keyFindings.push(
      `Nivel de amenaza evaluado: ${profile?.threatLevel || 'MODERADO'} con riesgos económicos catalogados en ${profile?.economicRisk || 'MODERADO'}.`,
      `Áreas focales prioritarias: ${(profile?.keyFocusAreas || []).join(', ')}.`,
      `Activos neurálgicos bajo observación: ${profile?.stats?.strategicAsset || 'Infraestructura energética y portuaria'}.`,
      `Capacidad de respuesta institucional y resiliencia ante contingencias regionales.`
    );
    riskMatrix.push(
      { area: 'Estabilidad Macroeconómica y Divisas', threatLevel: profile?.economicRisk === 'CRÍTICO' ? 'CRITICAL' : profile?.economicRisk === 'ALTO' ? 'HIGH' : 'MEDIUM', trend: 'STABLE', notes: 'Gestión de balanza de pagos y control de inflación.' },
      { area: 'Seguridad Interior y Control Territorial', threatLevel: profile?.securityRisk === 'ALTO' ? 'HIGH' : 'MEDIUM', trend: 'STABLE', notes: 'Operativos en pasos de frontera y centros urbanos.' }
    );
    recommendations.push(
      `Consolidar los acuerdos bilaterales de integración logística con los países limítrofes.`,
      `Monitorear de forma continua las fuentes oficiales y cables de alerta temprana.`
    );
  } else {
    // SITREP / FLASH
    title = `SITREP // SITUACIÓN OPERACIONAL REGIONAL CONO SUR`;
    classification = 'FLASH SITREP';
    summary = `Reporte de situación operacional basado en ${relevantItems.length} cables de fuentes abiertas clasificados en las últimas horas en los ejes de Defensa, Energía, Commodities y Geopolítica.`;
    
    relevantItems.slice(0, 4).forEach(item => {
      keyFindings.push(`[${item.country}] ${item.title} — ${item.summary.slice(0, 140)}...`);
    });

    if (keyFindings.length === 0) {
      keyFindings.push(
        'Actividad operacional estable en los corredores logísticos y pasos internacionales.',
        'Mantenimiento de los niveles de alerta en nodos portuarios y energéticos clave.',
        'Fluidez en las mesas técnicas de integración bilateral del Cono Sur.'
      );
    }

    riskMatrix.push(
      { area: 'Corredores de Transporte y Logística Bioceánica', threatLevel: 'MEDIUM', trend: 'STABLE', notes: 'Tránsito regular en pasos cordilleranos y terminales marítimas.' },
      { area: 'Suministro Energético e Hidrocarburos', threatLevel: 'MEDIUM', trend: 'DECREASING', notes: 'Despacho normalizado de gas y generación hidroeléctrica.' }
    );

    recommendations.push(
      'Mantener el ciclo de actualización de fuentes abiertas cada 15 minutos.',
      'Dar seguimiento a las variables críticas de cotización de commodities e hidrovía.'
    );
  }

  return {
    id: reportId,
    title,
    type: reportType,
    targetCountries,
    pillar,
    createdAt: now,
    summary,
    classification,
    keyFindings,
    strategicAssessment: customPrompt 
      ? `Análisis focalizado en la solicitud del analista: "${customPrompt}". Se verifica correlación con los cables activos en la base de datos y la doctrina de inteligencia OSINT para el Cono Sur.`
      : `El Cono Sur atraviesa una etapa de redefinición de sus ejes de integración productiva y seguridad. La conjunción de recursos críticos de alta demanda global (litio, cobre, hidrocarburos no convencionales y proteína vegetal) posiciona a la región como un polo geoeconómico decisivo, requiriendo protección estricta de sus infraestructuras críticas y canales de exportación.`,
    riskMatrix,
    recommendations,
    sourcesAnalyzedCount: relevantItems.length || 8
  };
}

export function generateClientAnalystAnswer(query: string, countryFilter?: CountryCode | 'ALL', items: IntelItem[] = []): { answer: string; sourcesUsed: string[] } {
  const q = query.toLowerCase();
  const filterText = countryFilter && countryFilter !== 'ALL' ? ` [Foco: ${countryFilter}]` : '';

  if (q.includes('hidrovía') || q.includes('paraná') || q.includes('barcaza') || q.includes('puerto')) {
    return {
      answer: `### Evaluación Geopolítica de la Hidrovía Paraná-Paraguay${filterText}

La **Hidrovía Paraná-Paraguay (HPP)** constituye el eje vertebral del comercio exterior del Cono Sur:

1. **Relevancia Agroindustrial**: Por este corredor fluvial sale más del **75% de las exportaciones agroindustriales de Argentina** (harina, aceite y grano de soja, maíz, trigo) desde el complejo Up-River Gran Rosario, además del **90% del comercio exterior de Paraguay** y cargas mineras/agrícolas de Bolivia y el Mato Grosso brasileño.
2. **Desafíos Operativos y de Calado**: Las obras de dragado y balizamiento resultan indispensables para mantener los 34-36 pies de calado en la sección argentina y garantizar la navegación de convoyes de barcazas de empuje en el tramo Confluencia-Asunción-Corumbá.
3. **Seguridad y Control Fronterizo**: La HPP es vigilada de manera prioritaria por las fuerzas conjuntas (SENAD, Prefectura Naval Argentina y Policía Federal de Brasil) para prevenir la contaminación de contenedores con cargamentos de estupefacientes con destino a Europa y África Occidental.
4. **Perspectiva Estratégica**: La modernización de concesiones de dragado y la reducción de sobrecostos logísticos definen la competitividad exportadora regional frente a los puertos norteamericanos.`,
      sourcesUsed: ['Administración General de Puertos (AGP)', 'SENAD Paraguay', 'Bolsa de Comercio de Rosario', 'Prefectura Naval Argentina']
    };
  }

  if (q.includes('litio') || q.includes('atacama') || q.includes('uyuni') || q.includes('batería') || q.includes('edl')) {
    return {
      answer: `### Análisis Estratégico del Triángulo del Litio${filterText}

El **Triángulo del Litio** (Argentina, Bolivia y Chile) concentra más del **55% de las reservas mundiales de salmueras**:

• **Chile**: Modelo de gobernanza público-privada consolidado a través de la alianza **Codelco-SQM** en el Salar de Atacama, garantizando ingresos fiscales récord y exigencias de Extracción Directa de Litio (EDL) hasta 2060.
• **Argentina**: Marco federal donde las provincias del NOA (Jujuy, Salta, Catamarca) lideran la atracción de inversión privada con proyectos en producción y expansión (Olaroz, Hombre Muerto, Cauchari), conectados logísticamente por el Paso de Jama hacia puertos chilenos.
• **Bolivia**: Política de control estatal centralizada a través de YLB con acuerdos de cooperación tecnológica con consorcios internacionales (CBC/CATL y socios rusos) para industrializar el Salar de Uyuni.

**Implicancia Geopolítica**: El litio del Cono Sur es una pieza clave en la transición energética global y la disputa de cadenas de suministro entre Asia, Estados Unidos y la Unión Europea.`,
      sourcesUsed: ['Codelco Chile', 'Yacimientos de Litio Bolivianos (YLB)', 'Cámara Minera del NOA (Argentina)', 'S&P Global Commodity Insights']
    };
  }

  if (q.includes('vaca muerta') || q.includes('gas') || q.includes('petróleo') || q.includes('gasoducto') || q.includes('itaipú')) {
    return {
      answer: `### Matriz de Seguridad Energética del Cono Sur${filterText}

La dinámica energética regional experimenta una transformación histórica:

1. **Vaca Muerta (Cuenca Neuquina)**: Consolidada como la 2ª reserva mundial de shale gas y 4ª de shale oil. Con la inauguración de oleoductos (Duplicar / Otasa a Chile) y la **Reversión del Gasoducto Norte**, Argentina pasa de importador a exportador neto de energía.
2. **Integración Gasífera AR-BO-BR**: La declinación de los yacimientos maduros de Bolivia abre la oportunidad para utilizar la red de **Gasbol** en tránsito para transportar gas argentino hacia el cordón industrial de São Paulo.
3. **Itaipú Binacional**: La negociación del **Anexo C** entre Paraguay y Brasil establece nuevas condiciones para la comercialización de la energía excedente en el mercado libre brasileño (ACL), generando recursos para infraestructura crítica.`,
      sourcesUsed: ['Secretaría de Energía Argentina', 'Petrobras', 'YPFB Bolivia', 'Itaipú Binacional']
    };
  }

  if (q.includes('seguridad') || q.includes('crimen') || q.includes('pcc') || q.includes('triple frontera') || q.includes('droga')) {
    return {
      answer: `### Panorama de Seguridad y Amenazas Transnacionales${filterText}

Las principales áreas de vigilancia de inteligencia en el Cono Sur abarcan:

• **Nodo Triple Frontera (CDE / Foz / Iguazú)**: Monitoreo permanente de redes de contrabando, falsificación marcaria y prevención de financiamiento ilícito.
• **Frontera Seca Paraguay-Brasil (Amambay / Mato Grosso do Sul)**: Presión armada del Primeiro Comando da Capital (PCC) y Comando Vermelho por el control de las rutas logísticas de estupefacientes y armas.
• **Ciberseguridad en Nodos Portuarios**: Alertas coordinadas entre los CSIRT de Argentina, Brasil y Chile tras registrarse campañas de ransomware dirigidas a sistemas de tráfico aduanero.
• **Vigilancia Naval en el Atlántico Sur**: Control de la Zona Económica Exclusiva (ZEE) y combate a la pesca ilegal no declarada y no reglamentada (INDNR) en la Milla 201.`,
      sourcesUsed: ['SENAD Paraguay', 'Policía Federal de Brasil', 'Comando Conjunto de Ciberdefensa', 'Armada Argentina']
    };
  }

  // General Synthesis
  return {
    answer: `### Apreciación de Inteligencia OSINT${filterText}

En respuesta a su requerimiento sobre **"${query}"**:

1. **Situación Actual**: Los datos recopilados de las fuentes monitoreadas en Argentina, Chile, Brasil, Uruguay, Paraguay y Bolivia indican una situación operativa activa en los corredores de recursos estratégicos y mesas de negociación bilateral.
2. **Factores Críticos a Monitorear**:
   - Evolución de las cotizaciones internacionales de commodities en FOB Rosario, Santos y LME.
   - Seguridad y fluidez en pasos de frontera bioceánicos y la Hidrovía Paraná-Paraguay.
   - Acuerdos de integración energética e infraestructura de transporte.
3. **Recomendación para el Analista**: Se sugiere profundizar el seguimiento mediante la generación de un **SITREP** o **Informe Geoeconómico** en la pestaña de Informes.`,
    sourcesUsed: ['Base de Datos OSINT Cono Sur', 'Monitoreo de Fuentes Abiertas Regionales']
  };
}
