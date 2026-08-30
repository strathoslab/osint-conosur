import { IntelItem, StrategicNode, CountryProfile } from '../src/types.js';

export const STRATEGIC_NODES: StrategicNode[] = [
  {
    id: 'node-hidrovia-rosario',
    name: 'Hub Portuario Gran Rosario (Up-River Paraná)',
    category: 'PORT',
    country: 'AR',
    lat: -32.95,
    lng: -60.65,
    status: 'OPERATIONAL',
    details: 'Principal polo agroexportador del Cono Sur. Concentra el 75% de las exportaciones de granos y harinas de Argentina y tránsito de barcazas de Paraguay y Bolivia.',
    keyCommoditiesOrAssets: ['Soja', 'Harina de soja', 'Maíz', 'Biodiésel']
  },
  {
    id: 'node-vaca-muerta',
    name: 'Cuenca Neuquina - Vaca Muerta (Añelo)',
    category: 'ENERGY_DAM',
    country: 'AR',
    lat: -38.35,
    lng: -68.78,
    status: 'OPERATIONAL',
    details: 'Segunda reserva mundial de gas no convencional y cuarta de petróleo shale. Gasoductos troncales hacia Buenos Aires y reversión del Gasoducto Norte para exportar a Brasil y Bolivia.',
    keyCommoditiesOrAssets: ['Gas Natural', 'Shale Oil', 'GNL Potencial']
  },
  {
    id: 'node-triple-frontera',
    name: 'Nodo Estratégico Triple Frontera (CDE / Foz / Iguazú)',
    category: 'BORDER_CHECKPOINT',
    country: 'PY',
    lat: -25.51,
    lng: -54.61,
    status: 'ALERT',
    details: 'Cruce neurálgico de comercio e inteligencia fronteriza entre Paraguay, Brasil y Argentina. Punto de vigilancia prioritaria contra el contrabando, financiamiento ilícito y lavado de activos.',
    keyCommoditiesOrAssets: ['Comercio fronterizo', 'Monitoreo de ilícitos', 'Paso Puente de la Amistad']
  },
  {
    id: 'node-itaipu',
    name: 'Central Hidroeléctrica Itaipú Binacional',
    category: 'ENERGY_DAM',
    country: 'BR',
    lat: -25.41,
    lng: -54.59,
    status: 'OPERATIONAL',
    details: 'Capacidad instalada de 14.000 MW. Punto clave de la soberanía energética paraguaya y suministro del polo industrial de São Paulo.',
    keyCommoditiesOrAssets: ['14.000 MW Energía Eléctrica', 'Régimen de vertedero del Río Paraná']
  },
  {
    id: 'node-santos',
    name: 'Complejo Portuario de Santos (São Paulo)',
    category: 'PORT',
    country: 'BR',
    lat: -23.96,
    lng: -46.33,
    status: 'OPERATIONAL',
    details: 'Mayor puerto de América Latina. Puerta de salida del 28% de la balanza comercial de Brasil y conexión directa con el Corredor Ferroviario Central.',
    keyCommoditiesOrAssets: ['Contenedores', 'Azúcar', 'Mineral de Hierro', 'Café', 'Automotores']
  },
  {
    id: 'node-salar-atacama',
    name: 'Salar de Atacama (Triángulo del Litio - Chile)',
    category: 'MINING_LITHIUM',
    country: 'CL',
    lat: -23.50,
    lng: -68.30,
    status: 'OPERATIONAL',
    details: 'Mayor yacimiento de salmuera de litio en producción del mundo. Bajo el esquema de la Estrategia Nacional del Litio (Codelco / SQM).',
    keyCommoditiesOrAssets: ['Carbonato de Litio', 'Hidróxido de Litio', 'Potasio']
  },
  {
    id: 'node-salar-uyuni',
    name: 'Salar de Uyuni (Potosí - Bolivia)',
    category: 'MINING_LITHIUM',
    country: 'BO',
    lat: -20.13,
    lng: -67.48,
    status: 'ALERT',
    details: 'Mayor reserva geológica de litio del planeta (21 millones de toneladas). Acuerdos de extracción directa de litio (EDL) con consorcios internacionales y planta industrial de YLB.',
    keyCommoditiesOrAssets: ['Litio en salmueras', 'Cloruro de Potasio', 'Boro']
  },
  {
    id: 'node-salar-hombre-muerto',
    name: 'Salar del Hombre Muerto / Cauchari (Argentina)',
    category: 'MINING_LITHIUM',
    country: 'AR',
    lat: -25.45,
    lng: -67.08,
    status: 'OPERATIONAL',
    details: 'Nodo minero de litio en Catamarca y Jujuy. Múltiples proyectos en fase de ramp-up productivo con exportación vía puertos chilenos (Antofagasta/Mejillones) y Buenos Aires.',
    keyCommoditiesOrAssets: ['Carbonato de Litio Grado Batería']
  },
  {
    id: 'node-puerto-valparaiso-san-antonio',
    name: 'Macrozona Portuaria San Antonio - Valparaíso',
    category: 'PORT',
    country: 'CL',
    lat: -33.58,
    lng: -71.61,
    status: 'OPERATIONAL',
    details: 'Principal nodo de comercio transpacífico para Chile y salida natural para el Corredor Bioceánico central desde Argentina.',
    keyCommoditiesOrAssets: ['Contenedores TEU', 'Cobre refinado', 'Agroindustria Pacífico']
  },
  {
    id: 'node-puerto-montevideo',
    name: 'Puerto de Montevideo & Canal de Acceso a 14m',
    category: 'PORT',
    country: 'UY',
    lat: -34.90,
    lng: -56.21,
    status: 'OPERATIONAL',
    details: 'Hub de transbordo del Río de la Plata y de la celulosa de exportación. Profundización del canal a 14 metros para buques de gran calado.',
    keyCommoditiesOrAssets: ['Celulosa UPM', 'Carnes de exportación', 'Hub de transbordo fluvial']
  },
  {
    id: 'node-estrecho-magallanes',
    name: 'Paso Estratégico Estrecho de Magallanes & Tierra del Fuego',
    category: 'STRATEGIC_PASS',
    country: 'CL',
    lat: -53.48,
    lng: -70.92,
    status: 'OPERATIONAL',
    details: 'Control de tráfico marítimo bioceánico Atlántico-Pacífico y punto de proyección logística antártica (Punta Arenas / Ushuaia). Desarrollo de hidrógeno verde.',
    keyCommoditiesOrAssets: ['Ruta interoceánica alternativa a Panamá', 'Logística Antártica', 'Hidrógeno Verde']
  },
  {
    id: 'node-yacyreta',
    name: 'Central Hidroeléctrica Yacyretá (Río Paraná)',
    category: 'ENERGY_DAM',
    country: 'AR',
    lat: -27.48,
    lng: -56.73,
    status: 'OPERATIONAL',
    details: 'Represa binacional Argentina-Paraguay (3.200 MW). Clave para el caudal navegable del Alto Paraná y suministro eléctrico a la red argentina.',
    keyCommoditiesOrAssets: ['3.200 MW Energía Eléctrica', 'Esclusa de navegación de barcazas']
  }
];

export const COUNTRY_PROFILES: Record<string, CountryProfile> = {
  AR: {
    code: 'AR',
    name: 'Argentina',
    flag: '🇦🇷',
    capital: 'Buenos Aires',
    threatLevel: 'MEDIUM',
    economicRisk: 'ALTO',
    securityRisk: 'MODERADO',
    keyFocusAreas: [
      'Seguridad y dragado de la Hidrovía Paraná-Paraguay',
      'Desarrollo y exportación de Vaca Muerta hacia Brasil/Chile',
      'Explotación de litio en el Noroeste (NOA)',
      'Vigilancia de la Zona Económica Exclusiva (ZEE) y Atlántico Sur'
    ],
    activeAlertsCount: 6,
    lastUpdated: new Date().toISOString(),
    stats: {
      criticalItems: 2,
      monitoredSources: 5,
      hydroviaShare: '55% del volumen fluvial de exportación',
      strategicAsset: 'Vaca Muerta & Triángulo del Litio'
    }
  },
  CL: {
    code: 'CL',
    name: 'Chile',
    flag: '🇨🇱',
    capital: 'Santiago',
    threatLevel: 'MEDIUM',
    economicRisk: 'BAJO',
    securityRisk: 'MODERADO',
    keyFocusAreas: [
      'Estrategia Nacional del Litio y acuerdos con Codelco/SQM',
      'Seguridad fronteriza en el Norte Grande (Paso Colchane)',
      'Infraestructura portuaria del Pacífico y puertos de aguas profundas',
      'Paso estratégico en el Estrecho de Magallanes y proyección antártica'
    ],
    activeAlertsCount: 4,
    lastUpdated: new Date().toISOString(),
    stats: {
      criticalItems: 1,
      monitoredSources: 5,
      hydroviaShare: 'Salida del Corredor Bioceánico al Pacífico',
      strategicAsset: 'Mayor exportador mundial de Cobre y Litio'
    }
  },
  BR: {
    code: 'BR',
    name: 'Brasil',
    flag: '🇧🇷',
    capital: 'Brasília',
    threatLevel: 'MEDIUM',
    economicRisk: 'MODERADO',
    securityRisk: 'MODERADO',
    keyFocusAreas: [
      'Integración del Corredor Bioceánico Porto Murtinho - Antofagasta',
      'Seguridad en fronteras terrestres (Operación Ágata / SISFRON)',
      'Recepción de gas natural argentino vía gasoductos de Bolivia/Uruguaiana',
      'Liderazgo en el Mercosur y alianzas BRICS'
    ],
    activeAlertsCount: 7,
    lastUpdated: new Date().toISOString(),
    stats: {
      criticalItems: 2,
      monitoredSources: 5,
      hydroviaShare: 'Tránsito de mineral de Corumbá por el Río Paraguay',
      strategicAsset: 'Poder industrial, Agroexportador y Petróleo Pre-Sal'
    }
  },
  UY: {
    code: 'UY',
    name: 'Uruguay',
    flag: '🇺🇾',
    capital: 'Montevideo',
    threatLevel: 'ROUTINE',
    economicRisk: 'BAJO',
    securityRisk: 'BAJO',
    keyFocusAreas: [
      'Profundización a 14 metros del canal de acceso al Puerto de Montevideo',
      'Políticas de flexibilización arancelaria dentro del Mercosur',
      'Control aduanero en terminales de contenedores para evitar narcotráfico europeo',
      'Hub logístico y tecnológico regional'
    ],
    activeAlertsCount: 2,
    lastUpdated: new Date().toISOString(),
    stats: {
      criticalItems: 0,
      monitoredSources: 4,
      hydroviaShare: 'Cabecera de aguas profundas de la Hidrovía',
      strategicAsset: 'Puerto de Montevideo y Hub Financiero/Logístico'
    }
  },
  PY: {
    code: 'PY',
    name: 'Paraguay',
    flag: '🇵🇾',
    capital: 'Asunción',
    threatLevel: 'HIGH',
    economicRisk: 'MODERADO',
    securityRisk: 'ALTO',
    keyFocusAreas: [
      'Vigilancia antidrogas y crimen organizado en frontera con Brasil (PCC)',
      'Negociación de la tarifa y libre disponibilidad de energía en Itaipú (Anexo C)',
      'Tercera mayor flota mundial de barcazas en la Hidrovía Paraná-Paraguay',
      'Pavimentación del tramo central del Corredor Bioceánico en el Chaco'
    ],
    activeAlertsCount: 5,
    lastUpdated: new Date().toISOString(),
    stats: {
      criticalItems: 2,
      monitoredSources: 4,
      hydroviaShare: '3ª mayor flota de barcazas del mundo (3.000+ unidades)',
      strategicAsset: 'Excedente hidroeléctrico Itaipú/Yacyretá y Agro'
    }
  },
  BO: {
    code: 'BO',
    name: 'Bolivia',
    flag: '🇧🇴',
    capital: 'La Paz / Sucre',
    threatLevel: 'HIGH',
    economicRisk: 'CRÍTICO',
    securityRisk: 'ALTO',
    keyFocusAreas: [
      'Disponibilidad de divisas y estabilidad de reservas del Banco Central',
      'Contratos de explotación de litio con tecnología EDL en Salar de Uyuni',
      'Venta de capacidad de transporte en la red de gasoductos Bolivia-Brasil/Argentina',
      'Paso fronterizo y contrabando de combustible en zonas limítrofes'
    ],
    activeAlertsCount: 5,
    lastUpdated: new Date().toISOString(),
    stats: {
      criticalItems: 3,
      monitoredSources: 4,
      hydroviaShare: 'Acceso soberano al Atlántico vía Puerto Busch / Canal Tamengo',
      strategicAsset: 'Mayor reserva geológica de litio del mundo (Uyuni)'
    }
  },
  REGIONAL: {
    code: 'REGIONAL',
    name: 'Cono Sur & Cuenca del Plata',
    flag: '🌎',
    capital: 'Coordinación Regional',
    threatLevel: 'MEDIUM',
    economicRisk: 'MODERADO',
    securityRisk: 'MODERADO',
    keyFocusAreas: [
      'Mecanismos de interoperabilidad en la Hidrovía Paraná-Paraguay',
      'Corredor Bioceánico Capricórnio (Brasil - Paraguay - Argentina - Chile)',
      'Monitoreo conjunto de la cuenca hídrica y bajantes extraordinarias',
      'Cooperación en ciberdefensa e inteligencia contra el crimen transnacional'
    ],
    activeAlertsCount: 3,
    lastUpdated: new Date().toISOString(),
    stats: {
      criticalItems: 1,
      monitoredSources: 2,
      hydroviaShare: '3.442 km de vía navegable troncal compartida',
      strategicAsset: 'Granero y despensa mineral/energética global'
    }
  }
};

export const INITIAL_INTEL_ITEMS: IntelItem[] = [
  {
    id: 'intel-ar-001',
    title: 'Argentina refuerza vigilancia radarizada en el Atlántico Sur y modernización de bases australes',
    summary: 'El Comando Conjunto Antártico y el Estado Mayor Conjunto desplegaron nuevos radares móviles de tres dimensiones de INVAP en Tierra del Fuego para control de tráfico marítimo y aéreo en el Pasaje de Drake.',
    content: 'En el marco de la estrategia de preservación de la soberanía sobre el Atlántico Sur y el control de la Zona Económica Exclusiva, el Ministerio de Defensa confirmó la integración de sistemas de alerta temprana RPA-170M de INVAP en Río Grande y la reactivación del puente logístico Ushuaia-Antártida.',
    source: 'Zona Militar / MinDef AR',
    sourceUrl: 'https://www.zona-militar.com',
    country: 'AR',
    pillar: 'DEFENSE_SECURITY',
    level: 'HIGH',
    timestamp: new Date(Date.now() - 1000 * 60 * 35).toISOString(),
    location: { name: 'Río Grande, Tierra del Fuego', lat: -53.78, lng: -67.70 },
    tags: ['Defensa', 'Radares INVAP', 'Atlántico Sur', 'Magallanes'],
    entities: ['Ministerio de Defensa', 'INVAP', 'EMCO', 'Armada Argentina'],
    threatAssessment: 'Monitoreo de movimientos navales en el estrecho y preservación de recursos pesqueros ante flotas de pesca ilegal.',
    verified: true
  },
  {
    id: 'intel-py-001',
    title: 'Operación conjunta SENAD y Policía Federal de Brasil desarticula célula logística del PCC en Pedro Juan Caballero',
    summary: 'Incautación de cargamentos de armamento pesado y rutas de tráfico que utilizaban el tramo norte de la Hidrovía Paraguay-Paraná hacia puertos marítimos de salida.',
    content: 'Agentes especiales de la Secretaría Nacional Antidrogas (SENAD) de Paraguay con apoyo de inteligencia de la Policía Federal de Brasil ejecutaron allanamientos simultáneos en Amambay. Se descubrió un esquema de contaminación de contenedores de carbón vegetal y granos con destino a Europa.',
    source: 'SENAD / Agência Brasil',
    country: 'PY',
    pillar: 'DEFENSE_SECURITY',
    level: 'CRITICAL',
    timestamp: new Date(Date.now() - 1000 * 60 * 75).toISOString(),
    location: { name: 'Pedro Juan Caballero / Ponta Porã', lat: -22.54, lng: -55.73 },
    tags: ['Crimen Organizado', 'PCC', 'Frontera Seca', 'SENAD', 'Narcotráfico'],
    entities: ['SENAD Paraguay', 'Polícia Federal Brasil', 'Primeiro Comando da Capital'],
    threatAssessment: 'Riesgo elevado de represalias en la línea fronteriza e intento de migración de rutas fluviales hacia puertos de menor calado.',
    verified: true
  },
  {
    id: 'intel-cl-001',
    title: 'Chile avanza en asociación público-privada para producción de litio en Atacama y nuevos proyectos en Maricunga',
    summary: 'Codelco y SQM concluyen etapas regulatorias para la operación conjunta hasta 2060, mientras Cochilco proyecta un incremento del 35% en la oferta de carbonato de litio de alta pureza.',
    content: 'La Corporación Nacional del Cobre (Codelco) reportó el avance en la Consulta Indígena y autorizaciones ambientales requeridas por la Comisión Nacional de Energía y el Banco Central para asegurar la cuota de extracción en el Salar de Atacama con nuevas tecnologías de evaporación optimizada.',
    source: 'Codelco / Cochilco',
    country: 'CL',
    pillar: 'ECONOMY_COMMODITIES',
    level: 'MEDIUM',
    timestamp: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
    location: { name: 'Salar de Atacama, Antofagasta', lat: -23.50, lng: -68.30 },
    tags: ['Litio', 'Codelco', 'SQM', 'Energías Limpias', 'Minería'],
    entities: ['Codelco', 'SQM', 'Ministerio de Minería Chile'],
    threatAssessment: 'Impacto directo en la cotización internacional del litio y fijación de regalías fiscales estratégicas.',
    verified: true
  },
  {
    id: 'intel-br-001',
    title: 'Brasil culmina tramo vial clave del Corredor Bioceánico y habilita puente Porto Murtinho - Carmelo Peralta',
    summary: 'La conexión sobre el Río Paraguay reducirá en 14 días el tiempo de tránsito de las exportaciones de granos y carnes del Centro-Oeste brasileño hacia los puertos del Pacífico chileno.',
    content: 'El Ministerio de Transportes de Brasil y el MOPC de Paraguay certificaron el 90% de avance en las obras complementarias del puente internacional. Este corredor estratégico evitará el paso por el Canal de Panamá para los envíos a China y Japón.',
    source: 'Agência Brasil / MOPC Paraguay',
    country: 'BR',
    pillar: 'ENERGY_INFRASTRUCTURE',
    level: 'HIGH',
    timestamp: new Date(Date.now() - 1000 * 60 * 180).toISOString(),
    location: { name: 'Porto Murtinho / Carmelo Peralta', lat: -21.70, lng: -57.88 },
    tags: ['Corredor Bioceánico', 'Logística', 'Pacífico', 'Infraestructura'],
    entities: ['MOPC Paraguay', 'Ministério dos Transportes Brasil', 'IIRSA / COSIPLAN'],
    threatAssessment: 'Reconfiguración geopolítica del transporte sudamericano, desplazando parte del flujo logístico tradicional del Atlántico al Pacífico.',
    verified: true
  },
  {
    id: 'intel-bo-001',
    title: 'Bolivia y Brasil firman acuerdo para integración de gasoductos y tránsito de gas argentino de Vaca Muerta',
    summary: 'YPFB y Petrobras sellaron el esquema de transporte que utilizará la red de gasoductos bolivianos (Gasbol) para canalizar gas desde Neuquén hasta el parque industrial de São Paulo.',
    content: 'Ante la declinación de la producción en los campos tradicionales de San Alberto y Margarita, Bolivia asume un rol estratégico de operador de tránsito de gas (toll system), monetizando su infraestructura troncal de compresión hacia Corumbá y Rio Grande do Sul.',
    source: 'YPFB / Petrobras / Ámbito',
    country: 'BO',
    pillar: 'ENERGY_INFRASTRUCTURE',
    level: 'CRITICAL',
    timestamp: new Date(Date.now() - 1000 * 60 * 220).toISOString(),
    location: { name: 'Gasoducto Gasbol / Yacuiba', lat: -22.01, lng: -63.68 },
    tags: ['Gas Natural', 'YPFB', 'Vaca Muerta', 'Petrobras', 'Gasbol'],
    entities: ['YPFB', 'Petrobras', 'Secretaría de Energía AR', 'ANP'],
    threatAssessment: 'Garantiza suministro a la industria pesada paulista y alivia la restricción externa de divisas de Bolivia.',
    verified: true
  },
  {
    id: 'intel-uy-001',
    title: 'Uruguay oficializa licitación para el dragado a 14 metros del canal de acceso al Puerto de Montevideo',
    summary: 'La Administración Nacional de Puertos (ANP) prevé posicionar a Montevideo como el puerto de mayor calado de la Cuenca del Plata, captando transbordos de buques portacontenedores New Panamax.',
    content: 'Tras la aprobación de la Comisión Administradora del Río de la Plata (CARP), Uruguay avanza con el proyecto de profundización a 14 metros (46 pies), permitiendo a buques de hasta 400 metros de eslora zarpar a carga completa sin restricciones de marea.',
    source: 'ANP Uruguay / Presidencia',
    country: 'UY',
    pillar: 'ENERGY_INFRASTRUCTURE',
    level: 'MEDIUM',
    timestamp: new Date(Date.now() - 1000 * 60 * 290).toISOString(),
    location: { name: 'Puerto de Montevideo', lat: -34.90, lng: -56.21 },
    tags: ['Puertos', 'Montevideo', 'CARP', 'Logística Fluvial', 'Comercio Exterior'],
    entities: ['ANP Uruguay', 'CARP', 'Katoen Natie'],
    threatAssessment: 'Acrecienta la competencia portuaria con las terminales de Buenos Aires y Dock Sud por el tráfico de transbordo de la Hidrovía.',
    verified: true
  },
  {
    id: 'intel-reg-001',
    title: 'Comité Intergubernamental de la Cuenca del Plata alerta por nuevo ciclo hidrológico y acuerda protocolo de calado mínimo',
    summary: 'Delegaciones de Argentina, Brasil, Bolivia, Paraguay y Uruguay sesionaron en Asunción para armonizar peajes, batimetrías satelitales y balizamiento en pasos críticos.',
    content: 'El informe técnico del CIC Plata advirtió sobre la variabilidad en los afluentes de los ríos Iguazú y Alto Paraná. Se fijó un sistema de información hidrométrica unificado para prevenir varaduras de convoyes de barcazas entre Corumbá y Confluencia.',
    source: 'CIC Cuenca del Plata / Prefectura Naval',
    country: 'REGIONAL',
    pillar: 'CLIMATE_CRISIS',
    level: 'HIGH',
    timestamp: new Date(Date.now() - 1000 * 60 * 340).toISOString(),
    location: { name: 'Confluencia Ríos Paraná y Paraguay', lat: -27.45, lng: -58.85 },
    tags: ['Hidrovía', 'Cuenca del Plata', 'Caudales', 'Navegación', 'CIC Plata'],
    entities: ['CIC Cuenca del Plata', 'Prefectura Naval Argentina', 'Armada Paraguaya'],
    threatAssessment: 'Riesgo de sobrecostos logísticos de hasta un 20% en fletes si se reduce la carga máxima por barcaza.',
    verified: true
  },
  {
    id: 'intel-ar-002',
    title: 'Argentina activa nuevo esquema de licitación internacional privada para la Vía Navegable Troncal',
    summary: 'La Subsecretaría de Puertos y Vías Navegables publicó los pliegos preliminares para la concesión a riesgo empresario de los 1.200 km del tramo Confluencia-Océano.',
    content: 'El pliego incluye exigencias de dragado a 40 pies en pasos clave del Río de la Plata, monitoreo satelital AIS obligatorio, y modernización de balizamiento con sensores oceanográficos en tiempo real.',
    source: 'Boletín Oficial / Ámbito',
    country: 'AR',
    pillar: 'ENERGY_INFRASTRUCTURE',
    level: 'HIGH',
    timestamp: new Date(Date.now() - 1000 * 60 * 420).toISOString(),
    location: { name: 'Canal Punta Indio / Rosario', lat: -34.50, lng: -57.90 },
    tags: ['Hidrovía', 'Vía Navegable Troncal', 'Dragado', 'Comercio Exterior'],
    entities: ['Subsecretaría de Puertos', 'CIARA-CEC', 'Bolsa de Comercio de Rosario'],
    threatAssessment: 'Definición de tarifas de peaje fluvial que impactarán en la competitividad de las cosechas argentinas y paraguayas.',
    verified: true
  },
  {
    id: 'intel-cl-002',
    title: 'Armada de Chile intercepta flota pesquera extranjera no regulada en el límite exterior de la ZEE de Isla de Pascua y Biobío',
    summary: 'Patrullero oceánico OPV y aeronaves P-3C Orión registraron maniobras de apagado de transpondedores AIS en caladeros de jibia y pez espada.',
    content: 'La Dirección General del Territorio Marítimo y de Marina Mercante (DIRECTEMAR) coordinó con la cancillería el reporte diplomático ante organismos multilaterales de conservación marina.',
    source: 'Armada de Chile / DIRECTEMAR',
    country: 'CL',
    pillar: 'DEFENSE_SECURITY',
    level: 'HIGH',
    timestamp: new Date(Date.now() - 1000 * 60 * 520).toISOString(),
    location: { name: 'Límite ZEE Chile Pacífico Sur', lat: -36.50, lng: -75.00 },
    tags: ['Pesca Ilegal', 'DIRECTEMAR', 'Armada de Chile', 'Soberanía Marítima'],
    entities: ['Armada de Chile', 'DIRECTEMAR', 'Ministerio de Relaciones Exteriores Chile'],
    threatAssessment: 'Depredación biológica y riesgo de incidentes navales en aguas adyacentes a la jurisdicción nacional.',
    verified: true
  },
  {
    id: 'intel-br-002',
    title: 'Banco Central do Brasil emite alerta de ciberseguridad por intentos coordinados de intrusión en APIs del sistema PIX',
    summary: 'El Departamento de Seguridad de la Información del BCB reforzó las llaves criptográficas y ordenó a las fintechs medidas biométricas adicionales.',
    content: 'Se detectaron ataques de denegación de servicio distribuido (DDoS) e intentos de suplantación de credenciales bancarias originados por redes criminales regionales con infraestructura en la nube.',
    source: 'Banco Central do Brasil (BCB)',
    country: 'BR',
    pillar: 'CYBER_CRIME',
    level: 'CRITICAL',
    timestamp: new Date(Date.now() - 1000 * 60 * 610).toISOString(),
    location: { name: 'Brasília / Red Financiera Nacional', lat: -15.79, lng: -47.88 },
    tags: ['Ciberseguridad', 'PIX', 'BCB', 'Fintech', 'Infraestructura Crítica'],
    entities: ['Banco Central do Brasil', 'Polícia Federal', 'Febraban'],
    threatAssessment: 'Riesgo sistémico para la infraestructura de pagos electrónicos que moviliza el 80% de las transacciones diarias en Brasil.',
    verified: true
  },
  {
    id: 'intel-bo-002',
    title: 'YLB suscribe contrato de transferencia tecnológica para planta piloto de baterías de litio en Potosí',
    summary: 'El Gobierno boliviano busca acelerar la cadena de valor agregado local antes del inicio de la exportación a gran escala de carbonato de litio.',
    content: 'El Ministerio de Hidrocarburos y Energías ratificó que las plantas de extracción directa deberán cumplir estándares ambientales estrictos en cuanto a reinyección de salmueras y consumo de agua dulce en la cuenca de Uyuni.',
    source: 'ABI / YLB',
    country: 'BO',
    pillar: 'ECONOMY_COMMODITIES',
    level: 'MEDIUM',
    timestamp: new Date(Date.now() - 1000 * 60 * 730).toISOString(),
    location: { name: 'Salar de Uyuni / Llipi', lat: -20.50, lng: -67.60 },
    tags: ['Litio', 'YLB', 'Baterías', 'Industrialización', 'Uyuni'],
    entities: ['Yacimientos de Litio Bolivianos', 'Ministerio de Energías'],
    threatAssessment: 'Tensión entre exigencias de plazos comerciales y demandas de regalías de los comités cívicos de Potosí.',
    verified: true
  },
  {
    id: 'intel-py-002',
    title: 'Paraguay y Brasil retoman diálogo técnico por la tarifa de energía de Itaipú para el periodo 2026-2030',
    summary: 'La delegación paraguaya insiste en fijar un precio remunerativo que financie obras de infraestructura en el Chaco y la red de transmisión de 500 kV.',
    content: 'Altos representantes de la Cancillería de Asunción y del Ministerio de Minas y Energía de Brasil se reunieron en Foz do Iguaçu para avanzar en la revisión del Anexo C del Tratado de Itaipú.',
    source: 'ABC Color / Agencia IP',
    country: 'PY',
    pillar: 'ENERGY_INFRASTRUCTURE',
    level: 'HIGH',
    timestamp: new Date(Date.now() - 1000 * 60 * 850).toISOString(),
    location: { name: 'Itaipú Binacional / Hernandarias', lat: -25.41, lng: -54.59 },
    tags: ['Itaipú', 'Anexo C', 'Energía', 'Relaciones Bilaterales', 'Brasil-Paraguay'],
    entities: ['Itaipú Binacional', 'Cancillería Paraguay', 'Itamaraty'],
    threatAssessment: 'Impacto en los ingresos fiscales del Estado paraguayo y en las tarifas eléctricas residenciales de ambos países.',
    verified: true
  }
];
