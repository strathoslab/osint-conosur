import { IntelItem, StrategicNode, CountryProfile, CommodityItem } from '../types';

export interface SourceDefinition {
  id: string;
  name: string;
  country: 'AR' | 'CL' | 'UY' | 'BR' | 'PY' | 'BO' | 'REGIONAL';
  category: 'GOVERNMENT_DEFENSE' | 'ECONOMIC_CENTRAL_BANK' | 'MEDIA_OSINT' | 'ENERGY_MINING' | 'LOGISTICS_PORTS';
  url: string;
  rssUrl?: string;
  language: 'es' | 'pt';
  reliabilityScore: 'A1' | 'A2' | 'B1' | 'B2';
  description: string;
}

export const REGIONAL_SOURCES: SourceDefinition[] = [
  // ARGENTINA
  {
    id: 'ar-mindef',
    name: 'Ministerio de Defensa (Argentina)',
    country: 'AR',
    category: 'GOVERNMENT_DEFENSE',
    url: 'https://www.argentina.gob.ar/defensa',
    rssUrl: 'https://www.argentina.gob.ar/noticias/feed',
    language: 'es',
    reliabilityScore: 'A1',
    description: 'Comunicaciones oficiales de Defensa, EMCO y Fuerzas Armadas de Argentina.'
  },
  {
    id: 'ar-bcra',
    name: 'Banco Central de la República Argentina (BCRA)',
    country: 'AR',
    category: 'ECONOMIC_CENTRAL_BANK',
    url: 'https://www.bcra.gob.ar',
    language: 'es',
    reliabilityScore: 'A1',
    description: 'Reservas monetarias, política cambiaria y normativa financiera.'
  },
  {
    id: 'ar-infobae',
    name: 'Infobae Política & Defensa',
    country: 'AR',
    category: 'MEDIA_OSINT',
    url: 'https://www.infobae.com',
    rssUrl: 'https://www.infobae.com/arc/outboundfeeds/rss/?outputType=xml',
    language: 'es',
    reliabilityScore: 'B1',
    description: 'Cobertura política, inteligencia regional y análisis estratégico.'
  },
  {
    id: 'ar-clarin',
    name: 'Clarín Política & Economía',
    country: 'AR',
    category: 'MEDIA_OSINT',
    url: 'https://www.clarin.com',
    rssUrl: 'https://www.clarin.com/rss/lo-ultimo/',
    language: 'es',
    reliabilityScore: 'B1',
    description: 'Cobertura macroeconómica, comercio exterior y asuntos de Estado.'
  },
  {
    id: 'ar-lanacion',
    name: 'La Nación Economía & Campo',
    country: 'AR',
    category: 'MEDIA_OSINT',
    url: 'https://www.lanacion.com.ar',
    rssUrl: 'https://www.lanacion.com.ar/arc/outboundfeeds/rss/?outputType=xml',
    language: 'es',
    reliabilityScore: 'B1',
    description: 'Monitoreo de agroindustria, Hidrovía, energía y geopolítica.'
  },
  {
    id: 'ar-zona-militar',
    name: 'Zona Militar Cono Sur',
    country: 'AR',
    category: 'GOVERNMENT_DEFENSE',
    url: 'https://www.zona-militar.com',
    rssUrl: 'https://www.zona-militar.com/feed/',
    language: 'es',
    reliabilityScore: 'A2',
    description: 'OSINT especializado en equipamiento, ejercicios militares y doctrina en el Atlántico Sur.'
  },

  // CHILE
  {
    id: 'cl-emol',
    name: 'EMOL Nacional & Minería',
    country: 'CL',
    category: 'MEDIA_OSINT',
    url: 'https://www.emol.com',
    rssUrl: 'https://www.emol.com/rss/portada.xml',
    language: 'es',
    reliabilityScore: 'B1',
    description: 'Monitoreo de política exterior chilena, puertos del Pacífico y cobre.'
  },
  {
    id: 'cl-latercera',
    name: 'La Tercera Pulso & Internacional',
    country: 'CL',
    category: 'MEDIA_OSINT',
    url: 'https://www.latercera.com',
    rssUrl: 'https://www.latercera.com/arc/outboundfeeds/rss/',
    language: 'es',
    reliabilityScore: 'B1',
    description: 'Análisis geoeconómico, Tratados de Libre Comercio y Corredores Bioceánicos.'
  },
  {
    id: 'cl-biobio',
    name: 'BioBioChile Economía & Defensa',
    country: 'CL',
    category: 'MEDIA_OSINT',
    url: 'https://www.biobiochile.cl',
    rssUrl: 'https://www.biobiochile.cl/feed',
    language: 'es',
    reliabilityScore: 'B1',
    description: 'Noticias inmediatas sobre pasos fronterizos, seguridad marítima y logística.'
  },

  // BRASIL
  {
    id: 'br-folha',
    name: 'Folha de S.Paulo Geopolítica',
    country: 'BR',
    category: 'MEDIA_OSINT',
    url: 'https://www1.folha.uol.com.br',
    rssUrl: 'https://feeds.folha.uol.com.br/mundo/rss091.xml',
    language: 'pt',
    reliabilityScore: 'B1',
    description: 'Política exterior de Itamaraty, BRICS, agroexportación de Santos y Amazonía.'
  },
  {
    id: 'br-estadao',
    name: 'O Estado de S. Paulo Economia',
    country: 'BR',
    category: 'MEDIA_OSINT',
    url: 'https://www.estadao.com.br',
    rssUrl: 'https://www.estadao.com.br/arc/outboundfeeds/rss/',
    language: 'pt',
    reliabilityScore: 'B1',
    description: 'Decisiones macroeconómicas, Banco Central do Brasil y producción de granos/minerales.'
  },
  {
    id: 'br-defesanet',
    name: 'DefesaNet Estratégia e Forças Armadas',
    country: 'BR',
    category: 'GOVERNMENT_DEFENSE',
    url: 'https://www.defesanet.com.br',
    rssUrl: 'https://www.defesanet.com.br/feed/',
    language: 'pt',
    reliabilityScore: 'A2',
    description: 'Monitoreo de ciberdefensa, industria militar brasileña y seguridad en la Triple Frontera.'
  },

  // URUGUAY
  {
    id: 'uy-elpais',
    name: 'El País Uruguay Economía & Puertos',
    country: 'UY',
    category: 'MEDIA_OSINT',
    url: 'https://www.elpais.com.uy',
    rssUrl: 'https://www.elpais.com.uy/rss',
    language: 'es',
    reliabilityScore: 'B1',
    description: 'Monitoreo del Puerto de Montevideo, tratados comerciales extra-Mercosur y celulosa.'
  },
  {
    id: 'uy-observador',
    name: 'El Observador Geopolítica',
    country: 'UY',
    category: 'MEDIA_OSINT',
    url: 'https://www.elobservador.com.uy',
    rssUrl: 'https://www.elobservador.com.uy/rss/home.xml',
    language: 'es',
    reliabilityScore: 'B1',
    description: 'Seguimiento institucional de Uruguay, finanzas y logística regional.'
  },

  // PARAGUAY
  {
    id: 'py-abc',
    name: 'ABC Color Política & Itaipú',
    country: 'PY',
    category: 'MEDIA_OSINT',
    url: 'https://www.abc.com.py',
    rssUrl: 'https://www.abc.com.py/arc/outboundfeeds/rss/',
    language: 'es',
    reliabilityScore: 'B1',
    description: 'Negociaciones del Anexo C de Itaipú, SENAD, lucha contra el crimen organizado e Hidrovía.'
  },
  {
    id: 'py-ultimahora',
    name: 'Última Hora Paraguay',
    country: 'PY',
    category: 'MEDIA_OSINT',
    url: 'https://www.ultimahora.com',
    rssUrl: 'https://www.ultimahora.com/rss/ultimas-noticias.xml',
    language: 'es',
    reliabilityScore: 'B1',
    description: 'Monitoreo de exportaciones de soja/carne, navegabilidad del Río Paraguay y comercio fronterizo.'
  },

  // BOLIVIA
  {
    id: 'bo-eldeber',
    name: 'El Deber Santa Cruz & Hidrocarburos',
    country: 'BO',
    category: 'MEDIA_OSINT',
    url: 'https://eldeber.com.bo',
    rssUrl: 'https://eldeber.com.bo/rss/noticias.xml',
    language: 'es',
    reliabilityScore: 'B1',
    description: 'Agroindustria del Oriente boliviano, exportación de gas y conexión al Mutún.'
  },
  {
    id: 'bo-lostiempos',
    name: 'Los Tiempos Geopolítica & Litio',
    country: 'BO',
    category: 'MEDIA_OSINT',
    url: 'https://www.lostiempos.com',
    rssUrl: 'https://www.lostiempos.com/rss/ultimas-noticias.xml',
    language: 'es',
    reliabilityScore: 'B1',
    description: 'Monitoreo de salares de litio (Uyuni), minería y gobernabilidad institucional.'
  }
];

export const CONO_SUR_COMMODITIES: CommodityItem[] = [
  {
    id: 'commodity-soja',
    symbol: 'SOYB / ZS',
    name: 'Soja Grano (FOB Rosario / CBOT)',
    category: 'AGRO_GRAINS',
    price: 442.80,
    unit: 'USD / Tonelada',
    change24h: 1.35,
    changeWeek: 2.80,
    high52w: 495.00,
    low52w: 390.00,
    lastUpdated: new Date().toISOString(),
    benchmark: 'CBOT / FOB Up-River Paraná & Paranaguá',
    keyCountries: ['AR', 'BR', 'PY', 'UY', 'BO'],
    strategicRelevance: 'Brasil y Argentina concentran >50% de la oferta exportable global de soja. Motor principal de ingreso de divisas y recaudación fiscal en el Cono Sur.',
    geopoliticalDrivers: [
      'Calado y tarifas de dragado en la Hidrovía Paraná-Paraguay',
      'Esquema de retenciones y liquidación de divisas en Argentina',
      'Ritmo de compras de la molienda estatal y privada en China',
      'Riesgos climáticos (La Niña) en la cuenca del Río de la Plata'
    ],
    logisticsAxis: 'Ruta Fluvial Hidrovía Paraná-Paraguay (Puertos de Rosario, San Lorenzo, Paranaguá y Nueva Palmira)',
    sparkline: [430.5, 432.0, 436.8, 434.2, 438.0, 440.5, 442.8]
  },
  {
    id: 'commodity-harina-soja',
    symbol: 'ZM / SOYMEAL',
    name: 'Harina de Soja (FOB Gran Rosario)',
    category: 'AGRO_GRAINS',
    price: 368.50,
    unit: 'USD / Tonelada',
    change24h: 0.85,
    changeWeek: 1.95,
    high52w: 420.00,
    low52w: 325.00,
    lastUpdated: new Date().toISOString(),
    benchmark: 'FOB Gran Rosario / Up-River',
    keyCountries: ['AR', 'BR', 'PY'],
    strategicRelevance: 'Argentina es el exportador #1 mundial indiscutido de harina de soja (clave para la alimentación pecuaria en Europa y Sudeste Asiático).',
    geopoliticalDrivers: [
      'Regulación ambiental europea contra la deforestación (EUDR)',
      'Capacidad ociosa del polo de crushing en el Gran Rosario',
      'Diferenciales arancelarios entre grano sin procesar y subproductos'
    ],
    logisticsAxis: 'Terminales Portuarias de San Lorenzo, Puerto San Martín y Timbúes (Río Paraná)',
    sparkline: [359.0, 361.5, 364.0, 362.5, 365.0, 367.2, 368.5]
  },
  {
    id: 'commodity-cobre',
    symbol: 'HG / CU-LME',
    name: 'Cobre Refinado Grado A (LME / COMEX)',
    category: 'METALS_MINING',
    price: 4.42,
    unit: 'USD / Libra (lb)',
    change24h: 2.15,
    changeWeek: 4.60,
    high52w: 5.12,
    low52w: 3.75,
    lastUpdated: new Date().toISOString(),
    benchmark: 'London Metal Exchange (LME) / COMEX',
    keyCountries: ['CL', 'AR'],
    strategicRelevance: 'Chile aporta el 24% de la producción mundial de cobre (Codelco / Escondida). Argentina reactiva megaproyectos en la cordillera (Josemaría, Taca Taca, Los Azules).',
    geopoliticalDrivers: [
      'Aceleración de la transición energética y redes de electromovilidad global',
      'Leyes de mineral decrecientes y disponibilidad hídrica en el Desierto de Atacama',
      'Sanciones y aranceles comerciales entre Estados Unidos y China',
      'Negociaciones laborales y convenios colectivos en minas chilenas'
    ],
    logisticsAxis: 'Puertos del Pacífico Norte de Chile (Antofagasta, Mejillones, San Antonio) y pasos cordilleranos',
    sparkline: [4.22, 4.25, 4.31, 4.29, 4.35, 4.38, 4.42]
  },
  {
    id: 'commodity-litio',
    symbol: 'Li2CO3 / LITH',
    name: 'Carbonato de Litio 99.5% Grado Batería',
    category: 'METALS_MINING',
    price: 11950.00,
    unit: 'USD / Tonelada',
    change24h: 3.40,
    changeWeek: 7.20,
    high52w: 18500.00,
    low52w: 9200.00,
    lastUpdated: new Date().toISOString(),
    benchmark: 'S&P Global Platts / Fastmarkets Battery Grade CIF Asia',
    keyCountries: ['CL', 'AR', 'BO'],
    strategicRelevance: 'El Triángulo del Litio (Salar de Atacama, Hombre Muerto, Olaroz, Uyuni) alberga más del 55% de las reservas mundiales del metal crítico para baterías EV.',
    geopoliticalDrivers: [
      'Alianzas estratégicas Estado-Privados (Codelco-SQM en Chile, YLB en Bolivia)',
      'Tecnologías de Extracción Directa de Litio (EDL) frente a piscinas de evaporación',
      'Geopolítica de cadenas de valor entre fabricantes de baterías asiáticos, EE.UU. y Europa',
      'Régimen de regalías mineras provinciales en el Noroeste Argentino (NOA)'
    ],
    logisticsAxis: 'Paso de Jama / Paso de Sico hacia puertos de Antofagasta/Mejillones y Corredor Bioceánico',
    sparkline: [11100, 11250, 11400, 11350, 11600, 11800, 11950]
  },
  {
    id: 'commodity-trigo',
    symbol: 'WHEAT / ZW',
    name: 'Trigo Pan (FOB Cono Sur / CBOT)',
    category: 'AGRO_GRAINS',
    price: 224.50,
    unit: 'USD / Tonelada',
    change24h: -0.75,
    changeWeek: 1.10,
    high52w: 265.00,
    low52w: 198.00,
    lastUpdated: new Date().toISOString(),
    benchmark: 'FOB Puertos Argentinos & CBOT',
    keyCountries: ['AR', 'BR', 'UY'],
    strategicRelevance: 'Garante de la seguridad alimentaria regional. Argentina abastece más del 80% de la importación triguera de los molinos de Brasil.',
    geopoliticalDrivers: [
      'Disrupciones navales en el Mar Negro y corredores de granos de Europa del Este',
      'Rendimientos de la cosecha de invierno en la Pampa Húmeda y Río Grande do Sul',
      'Acuerdos de cupos y compensaciones arancelarias intra-Mercosur'
    ],
    logisticsAxis: 'Puertos de aguas profundas de Bahía Blanca, Quequén y Terminales del Río de la Plata',
    sparkline: [222.0, 225.0, 226.5, 224.0, 226.0, 225.2, 224.5]
  },
  {
    id: 'commodity-maiz',
    symbol: 'CORN / ZC',
    name: 'Maíz Amarillo (FOB Santos-Rosario)',
    category: 'AGRO_GRAINS',
    price: 178.20,
    unit: 'USD / Tonelada',
    change24h: 1.10,
    changeWeek: 3.15,
    high52w: 215.00,
    low52w: 155.00,
    lastUpdated: new Date().toISOString(),
    benchmark: 'CBOT / FOB Santos & Rosario',
    keyCountries: ['BR', 'AR', 'PY'],
    strategicRelevance: 'Brasil (segunda zafra / safrinha) y Argentina son los mayores competidores de exportación de maíz frente a EE.UU., alimentando a Medio Oriente y Asia.',
    geopoliticalDrivers: [
      'Demanda récord de maíz para producción de etanol en el Centro-Oeste brasileño',
      'Monitoreo biológico contra plagas (chicharrita del maíz / Spiroplasma)',
      'Costos de flete en trenes de Rumo hacia Santos e Hidrovía Paraná'
    ],
    logisticsAxis: 'Puertos de Santos, Paranaguá, Rosario y Barcazas desde Alto Paraná',
    sparkline: [172.5, 174.0, 175.5, 174.8, 176.5, 177.0, 178.2]
  },
  {
    id: 'commodity-petroleo-wti',
    symbol: 'CL / WTI',
    name: 'Petróleo Crudo WTI / Medanito',
    category: 'ENERGY_HYDROCARBONS',
    price: 79.15,
    unit: 'USD / Barril (bbl)',
    change24h: -1.20,
    changeWeek: -2.40,
    high52w: 88.50,
    low52w: 67.00,
    lastUpdated: new Date().toISOString(),
    benchmark: 'NYMEX WTI / FOB Puerto Rosales (Medanito Shale)',
    keyCountries: ['AR', 'BR'],
    strategicRelevance: 'Vaca Muerta (Argentina) incrementa su saldo exportable de crudo liviano Medanito, mientras Brasil expande su extracción récord en el Pre-Sal oceánico.',
    geopoliticalDrivers: [
      'Capacidad de evacuación de oleoductos (Duplicar de Oldelval y Oleoducto Trasandino Otasa a Chile)',
      'Decisiones de cuotas de producción de la OPEP+ y tensión en el Estrecho de Ormuz',
      'Desarrollo de terminales offshore en el litoral bonaerense y Bahía Blanca'
    ],
    logisticsAxis: 'Oleoducto Otasa (Concepción, Chile), Terminal Puerto Rosales (Bahía Blanca) y São Sebastião',
    sparkline: [81.2, 80.5, 79.8, 80.4, 79.5, 80.1, 79.15]
  },
  {
    id: 'commodity-gas-natural',
    symbol: 'NG / GAS',
    name: 'Gas Natural (Henry Hub / Cono Sur Spot)',
    category: 'ENERGY_HYDROCARBONS',
    price: 2.88,
    unit: 'USD / MMBtu',
    change24h: 2.85,
    changeWeek: 6.40,
    high52w: 3.45,
    low52w: 1.65,
    lastUpdated: new Date().toISOString(),
    benchmark: 'Henry Hub NYMEX / Gasoductos Cono Sur',
    keyCountries: ['AR', 'BO', 'BR', 'CL'],
    strategicRelevance: 'Eje de la integración energética regional: Reversión del Gasoducto Norte para llevar gas de Vaca Muerta a Brasil a través de la infraestructura de Bolivia.',
    geopoliticalDrivers: [
      'Declinación de la producción en megacampos gasíferos bolivianos (San Alberto / Margarita)',
      'Tarifas de peaje y habilitación técnica del sistema Gasbol para exportación tripartita',
      'Demanda del parque industrial pesada de São Paulo y plantas térmicas del Cono Sur',
      'Proyectos de plantas flotantes de GNL (FLNG) para exportación a ultramar'
    ],
    logisticsAxis: 'Gasoducto Néstor Kirchner, Gasoducto Norte / Yacuiba, Red Gasbol Bolivia-Brasil',
    sparkline: [2.68, 2.72, 2.75, 2.79, 2.81, 2.84, 2.88]
  },
  {
    id: 'commodity-mineral-hierro',
    symbol: 'FE62 / IODEX',
    name: 'Mineral de Hierro 62% Fe (CFR China)',
    category: 'METALS_MINING',
    price: 105.80,
    unit: 'USD / Tonelada',
    change24h: 0.65,
    changeWeek: -1.20,
    high52w: 142.00,
    low52w: 91.00,
    lastUpdated: new Date().toISOString(),
    benchmark: 'S&P Global Platts IODEX 62% Fe CFR Qingdao',
    keyCountries: ['BR', 'BO'],
    strategicRelevance: 'Brasil es el #2 productor mundial de mineral de hierro (Vale). Bolivia desarrolla el megayacimiento del Mutún en la frontera con el Río Paraguay.',
    geopoliticalDrivers: [
      'Estímulos a la construcción e industria siderúrgica pesada en China',
      'Logística fluvial de barcazas de mineral desde Corumbá por el Río Paraguay hacia el Atlántico',
      'Descarbonización de la siderurgia global mediante pellets de hierro de alta pureza'
    ],
    logisticsAxis: 'Terminal Marítima de Ponta da Madeira, Puerto de Tubarão y Barcazas desde Corumbá / Mutún',
    sparkline: [106.5, 107.0, 105.0, 104.2, 105.1, 105.2, 105.8]
  },
  {
    id: 'commodity-carne-vacuna',
    symbol: 'BEEF / NOV',
    name: 'Novillo Mercosur (Exportación)',
    category: 'AGRO_GRAINS',
    price: 3.82,
    unit: 'USD / Kg Carcasa (Gancho)',
    change24h: 0.50,
    changeWeek: 1.85,
    high52w: 4.15,
    low52w: 3.30,
    lastUpdated: new Date().toISOString(),
    benchmark: 'Índice Novillo Mercosur (Promedio Ponderado AR-BR-UY-PY)',
    keyCountries: ['BR', 'AR', 'UY', 'PY'],
    strategicRelevance: 'El bloque Mercosur es el principal polo exportador de proteína bovina del mundo, abasteciendo a China, EE.UU., Israel y la Unión Europea.',
    geopoliticalDrivers: [
      'Apertura de nuevos mercados sanitarios libres de aftosa sin vacunación',
      'Cumplimiento de trazabilidad satelital individual y certificaciones de huella de carbono',
      'Diferenciales de costos de faena e impuestos entre Argentina, Brasil y Uruguay'
    ],
    logisticsAxis: 'Frigoríficos de exportación con salida por puertos de Santos, Buenos Aires, Montevideo y Asunción',
    sparkline: [3.72, 3.75, 3.78, 3.76, 3.80, 3.81, 3.82]
  },
  {
    id: 'commodity-celulosa',
    symbol: 'PULP / BHKP',
    name: 'Celulosa Kraft BHKP (Eucalipto CIF Asia)',
    category: 'FORESTRY_PULP',
    price: 685.00,
    unit: 'USD / Tonelada',
    change24h: 0.40,
    changeWeek: 0.90,
    high52w: 780.00,
    low52w: 590.00,
    lastUpdated: new Date().toISOString(),
    benchmark: 'Bleached Hardwood Kraft Pulp CIF China / Europa',
    keyCountries: ['UY', 'BR', 'CL'],
    strategicRelevance: 'La celulosa es el primer producto de exportación de Uruguay (UPM y Montes del Plata) y un rubro estratégico en Brasil (Suzano) y Chile (Arauco, CMPC).',
    geopoliticalDrivers: [
      'Demanda global de embalajes sostenibles para sustitución de plásticos de un solo uso',
      'Operatividad y capacidad del Ferrocarril Central y dragado en el Puerto de Montevideo',
      'Desarrollo de nuevas cuencas forestales y proyectos de biorrefinerías en el Cono Sur'
    ],
    logisticsAxis: 'Terminal especializada UPM en el Puerto de Montevideo, Terminales Portuarias de Santos y Coronel',
    sparkline: [678.0, 679.5, 681.0, 680.0, 682.5, 684.0, 685.0]
  }
];

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
    country: 'PY',
    lat: -25.40,
    lng: -54.58,
    status: 'OPERATIONAL',
    details: 'Mayor generadora hidroeléctrica del hemisferio occidental (14.000 MW). Clave en las negociaciones de tarifa y soberanía energética entre Paraguay y Brasil.',
    keyCommoditiesOrAssets: ['Energía eléctrica 14 GW', 'Tratado Anexo C', 'Represa Binacional']
  },
  {
    id: 'node-salar-atacama',
    name: 'Salar de Atacama (Distrito de Litio y Cobre)',
    category: 'MINING_LITHIUM',
    country: 'CL',
    lat: -23.50,
    lng: -68.25,
    status: 'OPERATIONAL',
    details: 'Mayor reserva operativa de salmueras de litio del mundo (SQM / Albemarle) y epicentro de extracción de cobre de alta ley en el Desierto de Atacama.',
    keyCommoditiesOrAssets: ['Carbonato de Litio Grado Batería', 'Hidróxido de Litio', 'Cobre Concentrado']
  },
  {
    id: 'node-salar-hombre-muerto',
    name: 'Salar del Hombre Muerto & Olaroz (Triángulo del Litio)',
    category: 'MINING_LITHIUM',
    country: 'AR',
    lat: -25.45,
    lng: -66.95,
    status: 'OPERATIONAL',
    details: 'Núcleo minero del NOA argentino (Catamarca, Jujuy y Salta). Inversiones multinacionales con conexión logística por el Paso de Jama hacia puertos del Pacífico.',
    keyCommoditiesOrAssets: ['Litio grado batería', 'Salmueras de alta pureza']
  },
  {
    id: 'node-santos',
    name: 'Complejo Portuario de Santos (São Paulo)',
    category: 'PORT',
    country: 'BR',
    lat: -23.96,
    lng: -46.30,
    status: 'OPERATIONAL',
    details: 'Mayor puerto de América Latina. Salida principal del agro brasileño (soja, maíz, azúcar) y mercancías industriales del Cono Sur.',
    keyCommoditiesOrAssets: ['Granos', 'Contenedores', 'Azúcar', 'Minerales']
  },
  {
    id: 'node-montevideo-puerto',
    name: 'Puerto de Montevideo y Terminal de Celulosa UPM',
    category: 'PORT',
    country: 'UY',
    lat: -34.90,
    lng: -56.21,
    status: 'OPERATIONAL',
    details: 'Hub de aguas profundas del Río de la Plata dragado a 14 metros. Salida ultramarina de celulosa, transbordo de cargas paraguayas y pesca del Atlántico Sur.',
    keyCommoditiesOrAssets: ['Celulosa Kraft', 'Transbordo Hidrovía', 'Contenedores']
  },
  {
    id: 'node-ushuaia-antartida',
    name: 'Base Naval Ushuaia y Polo Logístico Antártico',
    category: 'MILITARY_BASE',
    country: 'AR',
    lat: -54.81,
    lng: -68.30,
    status: 'OPERATIONAL',
    details: 'Punto de proyección estratégica hacia el Pasaje de Drake, Estrecho de Magallanes y la Antártida. Base de patrullaje de la Zona Económica Exclusiva (ZEE).',
    keyCommoditiesOrAssets: ['Proyección Antártica', 'Control Pasaje Drake', 'Patrulla ZEE']
  },
  {
    id: 'node-paso-cristo-redentor',
    name: 'Paso Internacional Cristo Redentor / Los Libertadores',
    category: 'STRATEGIC_PASS',
    country: 'CL',
    lat: -32.82,
    lng: -70.07,
    status: 'OPERATIONAL',
    details: 'Principal arteria de transporte terrestre bioceánico entre Argentina y Chile. Conecta el Atlántico con el Pacífico para el comercio Mercosur-Asia.',
    keyCommoditiesOrAssets: ['Cargas viales bioceánicas', 'Comercio Chile-Mercosur']
  },
  {
    id: 'node-el-mutun',
    name: 'Megayacimiento Siderúrgico El Mutún (Puerto Suárez)',
    category: 'MINING_LITHIUM',
    country: 'BO',
    lat: -19.18,
    lng: -57.88,
    status: 'ALERT',
    details: 'Uno de los mayores yacimientos de mineral de hierro y manganeso del mundo, con salida directa por barcazas al Canal Tamengo y Río Paraguay.',
    keyCommoditiesOrAssets: ['Mineral de Hierro 62%', 'Manganeso', 'Acero laminado']
  }
];

export const COUNTRY_PROFILES: Record<string, CountryProfile> = {
  AR: {
    code: 'AR',
    name: 'Argentina',
    flag: '🇦🇷',
    capital: 'Buenos Aires',
    threatLevel: 'HIGH',
    economicRisk: 'ALTO',
    securityRisk: 'MODERADO',
    keyFocusAreas: ['Hidrovía Paraná-Paraguay', 'Vaca Muerta & GNL', 'Triángulo del Litio NOA', 'Atlántico Sur & Antártida', 'Estabilidad cambiaria y reservas'],
    activeAlertsCount: 8,
    lastUpdated: new Date().toISOString(),
    stats: {
      criticalItems: 3,
      monitoredSources: 12,
      hydroviaShare: '75% export agro',
      strategicAsset: 'Vaca Muerta & Cuenca Agroexportadora'
    }
  },
  CL: {
    code: 'CL',
    name: 'Chile',
    flag: '🇨🇱',
    capital: 'Santiago',
    threatLevel: 'MEDIUM',
    economicRisk: 'MODERADO',
    securityRisk: 'MODERADO',
    keyFocusAreas: ['Minería de Cobre & Estrategia Nacional del Litio', 'Seguridad en la Macrozona Sur', 'Puertos del Pacífico', 'Corredor Bioceánico'],
    activeAlertsCount: 4,
    lastUpdated: new Date().toISOString(),
    stats: {
      criticalItems: 1,
      monitoredSources: 9,
      strategicAsset: 'Codelco & Salares de Atacama'
    }
  },
  BR: {
    code: 'BR',
    name: 'Brasil (Frontera Sur & Mercosur)',
    flag: '🇧🇷',
    capital: 'Brasília',
    threatLevel: 'MEDIUM',
    economicRisk: 'MODERADO',
    securityRisk: 'ALTO',
    keyFocusAreas: ['Triple Frontera & Lucha contra PCC/CV', 'Integración Energética Gasbol', 'Complejo Portuario de Santos', 'Geopolítica BRICS & Mercosur'],
    activeAlertsCount: 6,
    lastUpdated: new Date().toISOString(),
    stats: {
      criticalItems: 2,
      monitoredSources: 14,
      strategicAsset: 'Pre-Sal, Itaipú y Agroindustria Cerrado'
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
    keyFocusAreas: ['Dragado a 14m Puerto de Montevideo', 'Industria de Celulosa (UPM/Montes del Plata)', 'Seguridad marítima y pesca Atlántico', 'Tratados comerciales'],
    activeAlertsCount: 2,
    lastUpdated: new Date().toISOString(),
    stats: {
      criticalItems: 0,
      monitoredSources: 7,
      strategicAsset: 'Puerto de Montevideo & Hub Logístico'
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
    keyFocusAreas: ['Negociación Anexo C de Itaipú', 'Navegabilidad del Río Paraguay', 'Operativos SENAD vs Narcotráfico', 'Corredor Bioceánico del Chaco'],
    activeAlertsCount: 5,
    lastUpdated: new Date().toISOString(),
    stats: {
      criticalItems: 2,
      monitoredSources: 8,
      hydroviaShare: 'Tercera flota barcazas mundial',
      strategicAsset: 'Itaipú, Yacyretá y Flota Fluvial'
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
    keyFocusAreas: ['Declinación gasífera & Reversión Gasbol', 'Industrialización del Litio (Uyuni)', 'Siderurgia El Mutún', 'Suministro de combustibles y divisas'],
    activeAlertsCount: 7,
    lastUpdated: new Date().toISOString(),
    stats: {
      criticalItems: 3,
      monitoredSources: 6,
      strategicAsset: 'Salar de Uyuni y Yacimiento El Mutún'
    }
  }
};

export const INITIAL_INTEL_ITEMS: IntelItem[] = [
  {
    id: 'intel-001',
    title: 'Acuerdo Tripartito para la Reversión del Gasoducto Norte: Gas de Vaca Muerta hacia Brasil vía Bolivia',
    summary: 'Argentina, Brasil y Bolivia avanzan en los términos de peaje para habilitar el uso de los gasoductos bolivianos (Gasbol) y enviar hasta 15 MMm3/d de gas no convencional argentino al parque industrial de São Paulo, mitigando la declinación de campos en Tarija.',
    content: 'El Ente Nacional Regulador del Gas y las secretarías de energía de los tres países concluyeron la fase técnica del protocolo de transporte. YPFB cobrará un peaje de tránsito que le otorgará ingresos de divisas vitales, mientras Petrobras asegura suministro continuo para el complejo petroquímico paulista.',
    source: 'Secretaría de Energía / YPFB',
    sourceUrl: 'https://www.argentina.gob.ar/energia',
    country: 'AR',
    pillar: 'ENERGY_INFRASTRUCTURE',
    level: 'HIGH',
    timestamp: new Date(Date.now() - 1000 * 60 * 35).toISOString(),
    location: {
      name: 'Yacuiba - Campo Durán (Frontera AR-BO)',
      lat: -22.01,
      lng: -63.68
    },
    tags: ['Vaca Muerta', 'Gasoducto Norte', 'Gasbol', 'Bolivia', 'Brasil', 'Energía'],
    entities: ['YPFB', 'Petrobras', 'Enarsa', 'TGN'],
    threatAssessment: 'Riesgo bajo de interrupción técnica; riesgo político moderado sujeto a la volatilidad institucional en Bolivia y esquema de garantías de pago.',
    verified: true,
    bookmarked: true
  },
  {
    id: 'intel-002',
    title: 'Operación Frontera Blindada: Incautación de 4.2 Toneladas de Cocaína en el Eje Hidrovía Paraná-Paraguay',
    summary: 'Fuerzas conjuntas de la SENAD de Paraguay, Prefectura Naval Argentina y Policía Federal de Brasil desarticularon una red de contaminación de contenedores que utilizaba barcazas con destino a puertos europeos vía transbordo en el Río de la Plata.',
    content: 'El cargamento de clorhidrato de alta pureza fue interceptado oculto en bolsas de harina de soja en una terminal privada de Villeta. La investigación confirma conexiones directas con células del Primeiro Comando da Capital (PCC) que buscan sortear los escáneres portuarios de Santos.',
    source: 'SENAD Paraguay / DPF Brasil',
    country: 'PY',
    pillar: 'DEFENSE_SECURITY',
    level: 'CRITICAL',
    timestamp: new Date(Date.now() - 1000 * 60 * 75).toISOString(),
    location: {
      name: 'Puerto Villeta (Río Paraguay)',
      lat: -25.50,
      lng: -57.56
    },
    tags: ['Hidrovía', 'Narcotráfico', 'PCC', 'SENAD', 'Seguridad Fronteriza'],
    entities: ['SENAD', 'Policía Federal Brasil', 'Prefectura Naval Argentina', 'PCC'],
    threatAssessment: 'Riesgo alto de represalias armadas en pasos secos entre Pedro Juan Caballero y Ponta Porã. Refuerzo de patrullajes en el tramo Confluencia-Rosario.',
    verified: true,
    bookmarked: false
  },
  {
    id: 'intel-003',
    title: 'Chile Consolida la Alianza Codelco-SQM para la Explotación de Litio en el Salar de Atacama hasta 2060',
    summary: 'La Fiscalía Nacional Económica y organismos regulatorios dieron luz verde definitiva a la sociedad público-privada que garantiza la participación mayoritaria del Estado chileno en el salar de litio con mayores reservas del planeta, proyectando 300.000 t/año de LCE.',
    content: 'El acuerdo asegura regalías e inversión en tecnologías de Extracción Directa de Litio (EDL) para reducir la evaporación de agua en la cuenca atacameña. Se contemplan compromisos con comunidades originarias y exportación prioritaria por los puertos de Antofagasta y Mejillones.',
    source: 'Codelco / FNE Chile',
    country: 'CL',
    pillar: 'ECONOMY_COMMODITIES',
    level: 'MEDIUM',
    timestamp: new Date(Date.now() - 1000 * 60 * 130).toISOString(),
    location: {
      name: 'Salar de Atacama (Región de Antofagasta)',
      lat: -23.50,
      lng: -68.25
    },
    tags: ['Litio', 'Codelco', 'SQM', 'Transición Energética', 'Minería'],
    entities: ['Codelco', 'SQM', 'Corfo', 'Albemarle'],
    threatAssessment: 'Estabilidad jurídica garantizada a largo plazo; monitoreo de litigios residuales de accionistas minoritarios y disponibilidad de energía solar para plantas EDL.',
    verified: true,
    bookmarked: false
  },
  {
    id: 'intel-004',
    title: 'Puerto de Montevideo Inicia Obras Finales de Dragado a 14 Metros de Profundidad',
    summary: 'La Administración Nacional de Puertos (ANP) de Uruguay inició la etapa de profundización del canal de acceso al Puerto de Montevideo a 14 metros (46 pies), consolidando su ventaja competitiva sobre Buenos Aires para buques portacontenedores New Panamax y cargueros de celulosa.',
    content: 'Las dragas comenzaron las maniobras tras la homologación en la Comisión Administradora del Río de la Plata (CARP). La obra reducirá los costos de flete marítimo para las exportaciones uruguayas de celulosa de UPM y posiciona a la bahía como hub receptor de cargas fluviales paraguayas y bolivianas.',
    source: 'Administración Nacional de Puertos (Uruguay)',
    country: 'UY',
    pillar: 'ENERGY_INFRASTRUCTURE',
    level: 'MEDIUM',
    timestamp: new Date(Date.now() - 1000 * 60 * 210).toISOString(),
    location: {
      name: 'Canal de Acceso al Puerto de Montevideo',
      lat: -34.93,
      lng: -56.23
    },
    tags: ['Puertos', 'Montevideo', 'Dragado', 'Río de la Plata', 'Celulosa', 'CARP'],
    entities: ['ANP Uruguay', 'CARP', 'UPM', 'Terminal Cuenca del Plata'],
    threatAssessment: 'Tensión diplomática moderada con los gremios portuarios del Gran Buenos Aires; impacto económico altamente positivo en la logística fluvial del Mercosur.',
    verified: true,
    bookmarked: true
  },
  {
    id: 'intel-005',
    title: 'Argentina Despliega Nuevos Radares RPA-240T en Río Grande y Ushuaia para Control del Pasaje de Drake',
    summary: 'El Comando Conjunto Antártico y la Fuerza Aérea Argentina pusieron en operación un radar 3D de vigilancia aeroespacial fabricado por INVAP en Tierra del Fuego, cerrando la brecha de control radar en la aproximación al Estrecho de Magallanes y las Islas Malvinas.',
    content: 'El sensor móvil 3D de largo alcance permite la detección de trazas no identificadas en el espacio aéreo soberano y coordina con los buques de la Armada Argentina para el control de la pesca ilegal en la Milla 201 y los corredores antárticos internacionales.',
    source: 'Ministerio de Defensa / EMCO Argentina',
    country: 'AR',
    pillar: 'DEFENSE_SECURITY',
    level: 'HIGH',
    timestamp: new Date(Date.now() - 1000 * 60 * 320).toISOString(),
    location: {
      name: 'Río Grande / Cabo San Sebastián (Tierra del Fuego)',
      lat: -53.78,
      lng: -67.70
    },
    tags: ['Defensa', 'INVAP', 'Radares', 'Atlántico Sur', 'Antártida', 'Soberanía'],
    entities: ['INVAP', 'Fuerza Aérea Argentina', 'EMCO', 'Comando Conjunto Antártico'],
    threatAssessment: 'Refuerzo sustantivo de las capacidades C4ISR de vigilancia estratégica en el Atlántico Sur sin generar fricciones armadas directas.',
    verified: true,
    bookmarked: false
  },
  {
    id: 'intel-006',
    title: 'Brasil y Paraguay Intensifican la Revisión del Anexo C del Tratado de Itaipú: Definición de Tarifa Energética 2026-2030',
    summary: 'Equipos técnicos de Itaipú Binacional sesionan en Brasilia para fijar las bases de comercialización del excedente de energía eléctrica paraguaya en el mercado libre de energía brasileño (ACL), un hito que inyectará más de USD 1.200 millones anuales en infraestructura.',
    content: 'El presidente paraguayo y el mandatario brasileño acordaron la libre disponibilidad gradual de la cuota paraguaya para licitar a industrias electro-intensivas y centros de datos en territorio paraguayo, mientras Brasil mantiene la estabilidad de costos para el Sudeste industrial.',
    source: 'Itaipú Binacional / Itamaraty',
    country: 'PY',
    pillar: 'GEOPOLITICS_DIPLOMACY',
    level: 'HIGH',
    timestamp: new Date(Date.now() - 1000 * 60 * 410).toISOString(),
    location: {
      name: 'Hernandarias / Foz do Iguaçu (Itaipú)',
      lat: -25.40,
      lng: -54.58
    },
    tags: ['Itaipú', 'Anexo C', 'Energía', 'Brasil', 'Paraguay', 'Mercado Eléctrico'],
    entities: ['Itaipú Binacional', 'ANDE', 'Eletrobras', 'Itamaraty'],
    threatAssessment: 'Negociación en fase decisiva. La consolidación del acuerdo desactivará focos de tensión bilateral y asegurará fondos para la interconexión regional.',
    verified: true,
    bookmarked: false
  },
  {
    id: 'intel-007',
    title: 'Bolivia y China Ponen en Marcha la Primera Planta de Extracción Directa de Litio en el Salar de Uyuni',
    summary: 'Yacimientos de Litio Bolivianos (YLB) y el consorcio CBC (CATL, BRUNP, CMOC) iniciaron la fase de pruebas de la planta piloto con tecnología EDL de 25.000 t/año en el departamento de Potosí, buscando sortear la alta concentración de magnesio en la salmuera boliviana.',
    content: 'El proyecto demanda una inversión superior a USD 1.400 millones y contempla el suministro de carbonato de litio grado batería para la cadena automotriz eléctrica china. El gobierno boliviano busca revertir el retraso industrial y generar divisas en medio de la crisis de reservas.',
    source: 'Ministerio de Hidrocarburos y Energías (Bolivia)',
    country: 'BO',
    pillar: 'ECONOMY_COMMODITIES',
    level: 'HIGH',
    timestamp: new Date(Date.now() - 1000 * 60 * 520).toISOString(),
    location: {
      name: 'Llipi / Salar de Uyuni (Potosí)',
      lat: -20.45,
      lng: -66.82
    },
    tags: ['Litio', 'Bolivia', 'China', 'CATL', 'Uyuni', 'EDL'],
    entities: ['YLB', 'CATL', 'CBC Consortium', 'Ministerio de Minería'],
    threatAssessment: 'Riesgo operativo alto debido a desafíos hídricos y exigencias de aprobación en la Asamblea Legislativa Plurinacional de Bolivia.',
    verified: true,
    bookmarked: false
  },
  {
    id: 'intel-008',
    title: 'Ciberdefensa del Cono Sur Detecta Campaña de Ransomware Dirigida a Terminales Portuarias de Santos y Rosario',
    summary: 'Equipos de respuesta a incidentes de seguridad informática (CSIRT) de Argentina y Brasil emitieron un boletín de alerta roja tras detectarse intentos de intrusión y exfiltración de manifiestos aduaneros en sistemas de gestión de contenedores portuarios.',
    content: 'El vector de ataque utilizó vulnerabilidades de día cero en servidores de autenticación VPN heredados. La rápida contención de los SOC evitó la parálisis del atraque de buques, pero se instruyó el refuerzo obligatorio de autenticación multifactor y segmentación de redes OT/IT.',
    source: 'CSIRT Nacional Brasil / CERT.ar',
    country: 'REGIONAL',
    pillar: 'CYBER_CRIME',
    level: 'CRITICAL',
    timestamp: new Date(Date.now() - 1000 * 60 * 600).toISOString(),
    location: {
      name: 'Infraestructura Crítica Portuaria Cono Sur',
      lat: -23.96,
      lng: -46.30
    },
    tags: ['Ciberseguridad', 'Ransomware', 'Puertos', 'Santos', 'Rosario', 'CSIRT'],
    entities: ['CERT.ar', 'CTIR Gov Brasil', 'Autoridad Portuaria de Santos'],
    threatAssessment: 'Alerta persistente de escaneos automáticos de redes. Cooperación técnica activa entre agencias de ciberdefensa de Argentina, Brasil y Chile.',
    verified: true,
    bookmarked: true
  }
];
