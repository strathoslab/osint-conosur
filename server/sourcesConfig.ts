export interface SourceDefinition {
  id: string;
  name: string;
  country: 'AR' | 'CL' | 'UY' | 'BR' | 'PY' | 'BO' | 'REGIONAL';
  category: 'GOVERNMENT_DEFENSE' | 'ECONOMIC_CENTRAL_BANK' | 'MEDIA_OSINT' | 'ENERGY_MINING' | 'LOGISTICS_PORTS';
  url: string;
  rssUrl?: string;
  language: 'es' | 'pt';
  reliabilityScore: 'A1' | 'A2' | 'B1' | 'B2'; // NATO OSINT Reliability standard
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
    description: 'Monitoreo de política exterior, seguridad interior y geopolítica en Cono Sur.'
  },
  {
    id: 'ar-ambito',
    name: 'Ámbito Financiero / Energía',
    country: 'AR',
    category: 'ENERGY_MINING',
    url: 'https://www.ambito.com',
    rssUrl: 'https://www.ambito.com/rss/pages/energia.xml',
    language: 'es',
    reliabilityScore: 'B1',
    description: 'Seguimiento de Vaca Muerta, divisas agroexportadoras y puertos de granos.'
  },
  {
    id: 'ar-zona-militar',
    name: 'Zona Militar OSINT & Geopolítica',
    country: 'AR',
    category: 'GOVERNMENT_DEFENSE',
    url: 'https://www.zona-militar.com',
    rssUrl: 'https://www.zona-militar.com/feed/',
    language: 'es',
    reliabilityScore: 'A2',
    description: 'Análisis de compras de defensa, patrullaje en Atlántico Sur y radares INVAP.'
  },

  // CHILE
  {
    id: 'cl-mindef',
    name: 'Ministerio de Defensa Nacional (Chile)',
    country: 'CL',
    category: 'GOVERNMENT_DEFENSE',
    url: 'https://www.defensa.cl',
    rssUrl: 'https://www.defensa.cl/feed/',
    language: 'es',
    reliabilityScore: 'A1',
    description: 'Operaciones en Estrecho de Magallanes, frontera norte y EMCO Chile.'
  },
  {
    id: 'cl-banco-central',
    name: 'Banco Central de Chile',
    country: 'CL',
    category: 'ECONOMIC_CENTRAL_BANK',
    url: 'https://www.bcentral.cl',
    language: 'es',
    reliabilityScore: 'A1',
    description: 'Inflación, tipo de cambio y balanza comercial chilena.'
  },
  {
    id: 'cl-biobio',
    name: 'BioBioChile Geoint & Noticias',
    country: 'CL',
    category: 'MEDIA_OSINT',
    url: 'https://www.biobiochile.cl',
    rssUrl: 'https://www.biobiochile.cl/feed',
    language: 'es',
    reliabilityScore: 'B1',
    description: 'Cobertura inmediata de sismología, puertos del Pacífico y seguridad fronteriza.'
  },
  {
    id: 'cl-cochilco',
    name: 'Cochilco / Codelco (Litio & Cobre)',
    country: 'CL',
    category: 'ENERGY_MINING',
    url: 'https://www.cochilco.cl',
    language: 'es',
    reliabilityScore: 'A1',
    description: 'Estrategia Nacional del Litio, Salar de Atacama y producción de cobre.'
  },
  {
    id: 'cl-emol',
    name: 'Emol Nacional & Economía',
    country: 'CL',
    category: 'MEDIA_OSINT',
    url: 'https://www.emol.com',
    rssUrl: 'https://www.emol.com/rss/rss.asp',
    language: 'es',
    reliabilityScore: 'B1',
    description: 'Noticias estratégicas de macroeconomía, comercio con Asia y política.'
  },

  // BRASIL
  {
    id: 'br-defesa',
    name: 'Ministério da Defesa (Brasil)',
    country: 'BR',
    category: 'GOVERNMENT_DEFENSE',
    url: 'https://www.gov.br/defesa',
    language: 'pt',
    reliabilityScore: 'A1',
    description: 'Operações de fronteira (Ágata), SISFRON e segurança da Amazônia Azul.'
  },
  {
    id: 'br-agencia-brasil',
    name: 'Agência Brasil (EBC)',
    country: 'BR',
    category: 'MEDIA_OSINT',
    url: 'https://agenciabrasil.ebc.com.br',
    rssUrl: 'https://agenciabrasil.ebc.com.br/rss/ultimasnoticias/feed.xml',
    language: 'pt',
    reliabilityScore: 'A2',
    description: 'Agencia estatal de noticias de Brasil con cobertura federal y geopolítica.'
  },
  {
    id: 'br-bcb',
    name: 'Banco Central do Brasil (BCB)',
    country: 'BR',
    category: 'ECONOMIC_CENTRAL_BANK',
    url: 'https://www.bcb.gov.br',
    language: 'pt',
    reliabilityScore: 'A1',
    description: 'Tasas Selic, política monetaria e informes de estabilidad financiera.'
  },
  {
    id: 'br-portos',
    name: 'Autoridade Portuária de Santos & Paranaguá',
    country: 'BR',
    category: 'LOGISTICS_PORTS',
    url: 'https://www.portodesantos.com.br',
    language: 'pt',
    reliabilityScore: 'A2',
    description: 'Movimiento de carga granelera, minerales e infraestructura de exportación.'
  },
  {
    id: 'br-folha',
    name: 'Folha de S.Paulo Internacional',
    country: 'BR',
    category: 'MEDIA_OSINT',
    url: 'https://www1.folha.uol.com.br',
    rssUrl: 'https://feeds.folha.uol.com.br/mundo/rss091.xml',
    language: 'pt',
    reliabilityScore: 'B1',
    description: 'Análisis político, relaciones Mercosur-BRICS y política exterior de Itamaraty.'
  },

  // URUGUAY
  {
    id: 'uy-presidencia',
    name: 'Presidencia de la República Oriental del Uruguay',
    country: 'UY',
    category: 'GOVERNMENT_DEFENSE',
    url: 'https://www.gub.uy/presidencia',
    rssUrl: 'https://www.gub.uy/presidencia/rss',
    language: 'es',
    reliabilityScore: 'A1',
    description: 'Resoluciones del Ejecutivo, acuerdos de libre comercio y acuerdos portuarios.'
  },
  {
    id: 'uy-anp',
    name: 'Administración Nacional de Puertos (Puerto de Montevideo)',
    country: 'UY',
    category: 'LOGISTICS_PORTS',
    url: 'https://www.anp.gub.uy',
    language: 'es',
    reliabilityScore: 'A1',
    description: 'Calado del canal de acceso al Puerto de Montevideo e hidrovía.'
  },
  {
    id: 'uy-el-pais',
    name: 'El País Uruguay / Economía & Política',
    country: 'UY',
    category: 'MEDIA_OSINT',
    url: 'https://www.elpais.com.uy',
    rssUrl: 'https://www.elpais.com.uy/rss',
    language: 'es',
    reliabilityScore: 'B1',
    description: 'Monitoreo de estabilidad institucional, sector financiero y logística fluvial.'
  },
  {
    id: 'uy-montevideo-portal',
    name: 'Montevideo Portal Noticias',
    country: 'UY',
    category: 'MEDIA_OSINT',
    url: 'https://www.montevideo.com.uy',
    rssUrl: 'https://www.montevideo.com.uy/anxml.aspx?58',
    language: 'es',
    reliabilityScore: 'B1',
    description: 'Reportes de seguridad pública, incautaciones y diplomacia en el Río de la Plata.'
  },

  // PARAGUAY
  {
    id: 'py-mindef-senad',
    name: 'SENAD & Ministerio de Defensa Nacional (Paraguay)',
    country: 'PY',
    category: 'GOVERNMENT_DEFENSE',
    url: 'https://www.senad.gov.py',
    language: 'es',
    reliabilityScore: 'A1',
    description: 'Operativos antidrogas en frontera seca (Pedro Juan Caballero) y seguridad fluvial.'
  },
  {
    id: 'py-itaipu',
    name: 'Itaipú Binacional (Margen Derecha)',
    country: 'PY',
    category: 'ENERGY_MINING',
    url: 'https://www.itaipu.gov.py',
    language: 'es',
    reliabilityScore: 'A1',
    description: 'Generación hidroeléctrica, Anexo C y venta de excedentes energéticos.'
  },
  {
    id: 'py-abc',
    name: 'ABC Color Paraguay',
    country: 'PY',
    category: 'MEDIA_OSINT',
    url: 'https://www.abc.com.py',
    rssUrl: 'https://www.abc.com.py/rss/nacionales/',
    language: 'es',
    reliabilityScore: 'B1',
    description: 'Investigaciones de crimen organizado transnacional y situación de la Hidrovía.'
  },
  {
    id: 'py-agencia-ip',
    name: 'Agencia de Información Paraguaya (IP)',
    country: 'PY',
    category: 'MEDIA_OSINT',
    url: 'https://www.ip.gov.py',
    rssUrl: 'https://www.ip.gov.py/ip/feed/',
    language: 'es',
    reliabilityScore: 'A2',
    description: 'Informes del Gobierno paraguayo, obras del Corredor Bioceánico y MOPC.'
  },

  // BOLIVIA
  {
    id: 'bo-abi',
    name: 'Agencia Boliviana de Información (ABI)',
    country: 'BO',
    category: 'MEDIA_OSINT',
    url: 'https://abi.bo',
    rssUrl: 'https://abi.bo/index.php?format=feed&type=rss',
    language: 'es',
    reliabilityScore: 'A2',
    description: 'Comunicados del Estado plurinacional, acuerdos bilaterales y política minera.'
  },
  {
    id: 'bo-ylb-ypfb',
    name: 'YLB (Litio) & YPFB (Hidrocarburos Bolivia)',
    country: 'BO',
    category: 'ENERGY_MINING',
    url: 'https://www.ylb.gob.bo',
    language: 'es',
    reliabilityScore: 'A1',
    description: 'Industrialización del Salar de Uyuni, gasoductos a Brasil y Argentina.'
  },
  {
    id: 'bo-el-deber',
    name: 'El Deber (Santa Cruz / Bolivia)',
    country: 'BO',
    category: 'MEDIA_OSINT',
    url: 'https://eldeber.com.bo',
    rssUrl: 'https://eldeber.com.bo/rss',
    language: 'es',
    reliabilityScore: 'B1',
    description: 'Economía agroindustrial de Santa Cruz, paso fronterizo con Brasil y Paraguay.'
  },
  {
    id: 'bo-los-tiempos',
    name: 'Los Tiempos (Cochabamba / Bolivia)',
    country: 'BO',
    category: 'MEDIA_OSINT',
    url: 'https://www.lostiempos.com',
    rssUrl: 'https://www.lostiempos.com/rss/ultimas-noticias',
    language: 'es',
    reliabilityScore: 'B1',
    description: 'Situación sociopolítica, exportaciones y seguridad en el Altiplano y Chapare.'
  },

  // REGIONAL / MULTILATERAL
  {
    id: 'reg-mercosur',
    name: 'Secretaría del MERCOSUR',
    country: 'REGIONAL',
    category: 'GOVERNMENT_DEFENSE',
    url: 'https://www.mercosur.int',
    language: 'es',
    reliabilityScore: 'A1',
    description: 'Aranceles externos comunes, cumbres presidenciales y acuerdos de libre comercio.'
  },
  {
    id: 'reg-cic-plata',
    name: 'Comité Intergubernamental de la Cuenca del Plata (CIC)',
    country: 'REGIONAL',
    category: 'LOGISTICS_PORTS',
    url: 'https://cuencadelplata-cic.org',
    language: 'es',
    reliabilityScore: 'A1',
    description: 'Monitoreo de caudales de ríos Paraná y Paraguay, dragado y navegación.'
  }
];
