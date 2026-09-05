export type SourceCategory = 
  | 'GOVERNMENT_DEFENSE' 
  | 'ECONOMIC_CENTRAL_BANK' 
  | 'MEDIA_OSINT' 
  | 'ENERGY_MINING' 
  | 'LOGISTICS_PORTS'
  | 'TECHNICAL_TRACKING'
  | 'THINK_TANK'
  | 'CORPORATE_REGULATORY';

export type SourceSubCategory = 
  | 'OFFICIAL_GOV' 
  | 'HYDROCARBONS' 
  | 'FISHERIES' 
  | 'MEDIA_LOCAL' 
  | 'TECHNICAL_DATA' 
  | 'THINK_TANK' 
  | 'REGULATORY_REGISTRY';

export interface SourceDefinition {
  id: string;
  name: string;
  country: 'AR' | 'CL' | 'UY' | 'BR' | 'PY' | 'BO' | 'REGIONAL';
  category: SourceCategory;
  url: string;
  rssUrl?: string;
  language: 'es' | 'pt' | 'en';
  reliabilityScore: 'A1' | 'A2' | 'B1' | 'B2'; // NATO OSINT Reliability standard
  description: string;
  subCategory?: SourceSubCategory;
  syncStatus?: 'LIVE_SYNC' | 'PORTAL_DIRECT' | 'FILINGS_FEED';
  ticker?: string;
  locationLabel?: string;
  focusArea?: string;
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
  {
    id: 'ar-gaceta-marinera',
    name: 'Gaceta Marinera (Armada Argentina)',
    country: 'AR',
    category: 'GOVERNMENT_DEFENSE',
    url: 'https://gacetamarinera.com.ar',
    rssUrl: 'https://gacetamarinera.com.ar/feed/',
    language: 'es',
    reliabilityScore: 'A1',
    description: 'Órgano oficial de la Armada Argentina: patrullaje naval, Campaña Antártica de Verano (CAV), buques oceanográficos y control del Atlántico Sur.'
  },
  {
    id: 'ar-revista-puerto',
    name: 'Revista Puerto (Mar Argentino & Milla 201)',
    country: 'AR',
    category: 'LOGISTICS_PORTS',
    url: 'https://revistapuerto.com.ar',
    rssUrl: 'https://revistapuerto.com.ar/feed/',
    language: 'es',
    reliabilityScore: 'A2',
    description: 'Referencia líder en monitoreo del calamar Illex, merluza negra, flotas poteras extranjeras en la Milla 201 y patrullas de Prefectura Naval.'
  },
  {
    id: 'ar-agenda-malvinas',
    name: 'Agenda Malvinas (Soberanía & Antártida)',
    country: 'AR',
    category: 'MEDIA_OSINT',
    url: 'https://agendamalvinas.com.ar',
    rssUrl: 'https://agendamalvinas.com.ar/feed/',
    language: 'es',
    reliabilityScore: 'A2',
    description: 'Agencia de noticias especializada en la disputa de soberanía de Malvinas, Georgias, Sandwich del Sur, geopolítica polar y tratados antárticos.'
  },
  {
    id: 'ar-pucara-defensa',
    name: 'Pucará Defensa (Aeroespacial & Vigilancia Austral)',
    country: 'AR',
    category: 'GOVERNMENT_DEFENSE',
    url: 'https://www.pucara.org',
    rssUrl: 'https://www.pucara.org/feed/',
    language: 'es',
    reliabilityScore: 'A2',
    description: 'Análisis de defensa militar regional, cobertura de radares australes INVAP, despliegue de aviones P-3 Orion y vigilancia aeroespacial.'
  },
  {
    id: 'ar-diario-fin-del-mundo',
    name: 'El Diario del Fin del Mundo (Tierra del Fuego & Ushuaia)',
    country: 'AR',
    category: 'MEDIA_OSINT',
    url: 'https://www.eldiariodelfindelmundo.com',
    rssUrl: 'https://www.eldiariodelfindelmundo.com/rss/',
    language: 'es',
    reliabilityScore: 'B1',
    description: 'Monitoreo territorial de Tierra del Fuego, base naval y polo logístico de Ushuaia, y cruces marítimos hacia la Antártida.'
  },
  {
    id: 'reg-mercopress',
    name: 'MercoPress (South Atlantic News Agency)',
    country: 'REGIONAL',
    category: 'MEDIA_OSINT',
    url: 'https://es.mercopress.com',
    rssUrl: 'https://es.mercopress.com/rss/',
    language: 'es',
    reliabilityScore: 'B1',
    description: 'Agencia independiente con cobertura marítima intensiva de las Islas Malvinas/Falklands, pesquerías del Atlántico Sur y diplomacia regional.'
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
  },

  // ==========================================
  // ATLÁNTICO SUR, MALVINAS & ESPACIO AUSTRAL
  // ==========================================
  // GOBIERNOS Y AUTORIDADES OFICIALES
  {
    id: 'ar-cancilleria',
    name: 'Cancillería Argentina (MRECIC)',
    country: 'AR',
    category: 'GOVERNMENT_DEFENSE',
    subCategory: 'OFFICIAL_GOV',
    syncStatus: 'LIVE_SYNC',
    url: 'https://www.cancilleria.gob.ar',
    rssUrl: 'https://www.cancilleria.gob.ar/es/actualidad/noticias/feed',
    language: 'es',
    reliabilityScore: 'A1',
    description: 'Comunicados oficiales sobre soberanía de Malvinas, sanciones a hidrocarburos ilegales, Tratado Antártico y límites de la plataforma continental (COPLA).',
    focusArea: 'Soberanía, Sanciones & Diplomacia'
  },
  {
    id: 'ar-presidencia',
    name: 'Oficina del Presidente / Casa Rosada',
    country: 'AR',
    category: 'GOVERNMENT_DEFENSE',
    subCategory: 'OFFICIAL_GOV',
    syncStatus: 'LIVE_SYNC',
    url: 'https://www.casarosada.gob.ar',
    language: 'es',
    reliabilityScore: 'A1',
    description: 'Decretos del Poder Ejecutivo, anuncios presidenciales de Javier Milei, política exterior y directivas de seguridad nacional.',
    focusArea: 'Decretos del PEN & Política Exterior'
  },
  {
    id: 'fig-mineral-resources',
    name: 'FIG Department of Mineral Resources',
    country: 'REGIONAL',
    category: 'ENERGY_MINING',
    subCategory: 'OFFICIAL_GOV',
    syncStatus: 'PORTAL_DIRECT',
    url: 'https://falklands.gov.fk/mineralresources/',
    language: 'en',
    reliabilityScore: 'A1',
    description: 'Autoridad hidrocarburífera de las islas: licencias de exploración/producción offshore, mapas batimétricos, estado de Sea Lion (PL032) e informes de impacto ambiental.',
    focusArea: 'Licencias Offshore & Sea Lion Status'
  },
  {
    id: 'fig-fisheries',
    name: 'FIG Directorate of Fisheries',
    country: 'REGIONAL',
    category: 'LOGISTICS_PORTS',
    subCategory: 'OFFICIAL_GOV',
    syncStatus: 'PORTAL_DIRECT',
    url: 'https://www.fig.gov.fk',
    language: 'en',
    reliabilityScore: 'A1',
    description: 'Regulación pesquera del Atlántico Sur: cuotas ITQ, biomasa de calamar Loligo/Illex, estadísticas de capturas y patrullajes en la FICZ/FOCZ.',
    focusArea: 'Cuotas ITQ & Estadísticas de Captura'
  },
  {
    id: 'uk-fcdo',
    name: 'UK Foreign, Commonwealth & Development Office (FCDO)',
    country: 'REGIONAL',
    category: 'GOVERNMENT_DEFENSE',
    subCategory: 'OFFICIAL_GOV',
    syncStatus: 'LIVE_SYNC',
    url: 'https://www.gov.uk/government/organisations/foreign-commonwealth-development-office',
    language: 'en',
    reliabilityScore: 'A1',
    description: 'Posición diplomática oficial del Reino Unido sobre soberanía, autodeterminación de las islas, Territorios Británicos de Ultramar y Atlántico Sur.',
    focusArea: 'Posición Diplomática Oficial UK'
  },
  {
    id: 'uk-mod',
    name: 'UK Ministry of Defence (MoD / BFSAI)',
    country: 'REGIONAL',
    category: 'GOVERNMENT_DEFENSE',
    subCategory: 'OFFICIAL_GOV',
    syncStatus: 'LIVE_SYNC',
    url: 'https://www.gov.uk/government/organisations/ministry-of-defence',
    language: 'en',
    reliabilityScore: 'A1',
    description: 'Fuerzas Británicas del Atlántico Sur (BFSAI), base aérea y complejo militar Mount Pleasant (MPA), patrullas del HMS Forth y ejercicios navales.',
    focusArea: 'Seguridad Militar & Base Mount Pleasant'
  },

  // EMPRESAS DE HIDROCARBUROS (OPERADORES Y RELACIONADAS)
  {
    id: 'corp-navitas-petroleum',
    name: 'Navitas Petroleum (Operador 65% Sea Lion)',
    country: 'REGIONAL',
    category: 'ENERGY_MINING',
    subCategory: 'HYDROCARBONS',
    syncStatus: 'FILINGS_FEED',
    ticker: 'TASE: NVPT',
    url: 'https://www.navitaspet.com/',
    language: 'en',
    reliabilityScore: 'A2',
    description: 'Operadora principal del megadesarrollo Sea Lion (Cuenca Malvinas Norte, ~1.700M barriles in situ). Actualizaciones de FID, adquisición/charter de FPSO y reportes a inversores.',
    focusArea: 'Sea Lion FID, FPSO & Reservas'
  },
  {
    id: 'corp-rockhopper-exploration',
    name: 'Rockhopper Exploration plc (Socio 35% Sea Lion)',
    country: 'REGIONAL',
    category: 'ENERGY_MINING',
    subCategory: 'HYDROCARBONS',
    syncStatus: 'FILINGS_FEED',
    ticker: 'AIM: RKH',
    url: 'https://rockhopperexploration.co.uk/',
    language: 'en',
    reliabilityScore: 'A2',
    description: 'Compañía británica cotizante en Londres (AIM). Titular del 35% de interés en Sea Lion y licencias offshore PL004a/b. Emisiones de RNS y presentaciones anuales.',
    focusArea: 'Licencias PL032 / PL004 & Anuncios RNS'
  },
  {
    id: 'corp-borders-southern',
    name: 'Borders & Southern Petroleum plc (Darwin)',
    country: 'REGIONAL',
    category: 'ENERGY_MINING',
    subCategory: 'HYDROCARBONS',
    syncStatus: 'FILINGS_FEED',
    ticker: 'AIM: BOR',
    url: 'https://bordersandsouthern.com/',
    language: 'en',
    reliabilityScore: 'A2',
    description: 'Exploradora de la Cuenca Malvinas Sur. Descubrimiento de condensado de gas y crudo liviano Darwin (aprox. 500M bbl). Búsqueda de socios de farm-out y RNS.',
    focusArea: 'Cuenca Sur / Descubrimiento Darwin'
  },
  {
    id: 'corp-eco-atlantic',
    name: 'Eco (Atlantic) Oil & Gas / JHI Falklands',
    country: 'REGIONAL',
    category: 'ENERGY_MINING',
    subCategory: 'HYDROCARBONS',
    syncStatus: 'FILINGS_FEED',
    ticker: 'TSX-V / AIM: ECO',
    url: 'https://ecooilandgas.com/',
    language: 'en',
    reliabilityScore: 'A2',
    description: 'Compañía de exploración cotizante en Toronto y Londres con participaciones indirectas y acuerdos de prospección en bloques adyacentes del Atlántico Sur.',
    focusArea: 'Prospección Offshore & Filings Toronto'
  },

  // PESCA Y EMPRESAS LOCALES
  {
    id: 'fifca-falklands',
    name: 'FIFCA (Falkland Islands Fishing Companies Association)',
    country: 'REGIONAL',
    category: 'LOGISTICS_PORTS',
    subCategory: 'FISHERIES',
    syncStatus: 'PORTAL_DIRECT',
    url: 'http://www.fifca.co.fk/',
    language: 'en',
    reliabilityScore: 'A2',
    description: 'Cámara patronal pesquera de las islas: agrupa a Fortuna Ltd, Argos Group, Beauchene Fishing, Consolidated Fisheries (CFL), Seafish, Dragon Fishing y Pioneer Seafoods.',
    focusArea: 'Membresía Pesquera, Sostenibilidad & Capturas'
  },
  {
    id: 'fortuna-limited',
    name: 'Fortuna Limited & Consorcios Pesqueros',
    country: 'REGIONAL',
    category: 'LOGISTICS_PORTS',
    subCategory: 'FISHERIES',
    syncStatus: 'PORTAL_DIRECT',
    url: 'http://www.fifca.co.fk/membership',
    language: 'en',
    reliabilityScore: 'B1',
    description: 'Mayor grupo armador y operador de buques poteros y arrastreros con base en Stanley; alianzas mixtas hispano-británicas para exportación de calamar a Vigo y Europa.',
    focusArea: 'Operaciones de Flota Potera & Cuotas'
  },

  // MEDIOS LOCALES Y ESPECIALIZADOS
  {
    id: 'media-penguin-news',
    name: 'Penguin News (Periódico Semanal de las Islas)',
    country: 'REGIONAL',
    category: 'MEDIA_OSINT',
    subCategory: 'MEDIA_LOCAL',
    syncStatus: 'LIVE_SYNC',
    url: 'https://www.penguin-news.com',
    language: 'en',
    reliabilityScore: 'B1',
    description: 'Único periódico semanal impreso y digital de Stanley: política local, debates legislativos, pesca, hidrocarburos y opinión comunitaria.',
    focusArea: 'Cobertura Diaria / Política Local Stanley'
  },
  {
    id: 'media-offshore-energy',
    name: 'Offshore Energy / Upstream / Energy Voice',
    country: 'REGIONAL',
    category: 'ENERGY_MINING',
    subCategory: 'MEDIA_LOCAL',
    syncStatus: 'LIVE_SYNC',
    url: 'https://www.offshore-energy.biz',
    rssUrl: 'https://www.offshore-energy.biz/feed/',
    language: 'en',
    reliabilityScore: 'B1',
    description: 'Inteligencia técnica y de mercado especializada en FPSOs, plataformas de perforación marina, contratistas EPCI y avances de Sea Lion.',
    focusArea: 'Tecnología FPSO & Rig Intelligence'
  },

  // FUENTES DE MONITOREO TÉCNICO Y DATOS
  {
    id: 'tech-global-fishing-watch',
    name: 'Global Fishing Watch (AIS Satelital Pesquero)',
    country: 'REGIONAL',
    category: 'TECHNICAL_TRACKING',
    subCategory: 'TECHNICAL_DATA',
    syncStatus: 'PORTAL_DIRECT',
    url: 'https://globalfishingwatch.org',
    language: 'en',
    reliabilityScore: 'A1',
    description: 'Plataforma líder en telemetría satelital: rastreo en tiempo casi real de flotas pesqueras, esfuerzo de pesca en la Milla 201 y eventos de apagado de AIS.',
    focusArea: 'Telemetría Satelital AIS & Milla 201'
  },
  {
    id: 'tech-marinetraffic',
    name: 'MarineTraffic / VesselFinder (Tráfico Naval AIS)',
    country: 'REGIONAL',
    category: 'TECHNICAL_TRACKING',
    subCategory: 'TECHNICAL_DATA',
    syncStatus: 'PORTAL_DIRECT',
    url: 'https://www.marinetraffic.com',
    language: 'en',
    reliabilityScore: 'A1',
    description: 'Seguimiento de tráfico marítimo en vivo: petroleros, buques sísmicos, remolcadores de apoyo offshore (OSV/AHTS) y patrulleros de Prefectura/Armada.',
    focusArea: 'Tracking en Vivo Buques Offshore & Soporte'
  },
  {
    id: 'market-lse-rns',
    name: 'London Stock Exchange / AIM RNS (Rockhopper & Borders)',
    country: 'REGIONAL',
    category: 'CORPORATE_REGULATORY',
    subCategory: 'TECHNICAL_DATA',
    syncStatus: 'FILINGS_FEED',
    url: 'https://www.londonstockexchange.com',
    language: 'en',
    reliabilityScore: 'A1',
    description: 'Servicio de Noticias Regulatorias (RNS) de la Bolsa de Londres: comunicados obligatorios de precio, financiamiento, farm-outs y litigios de RKH y BOR.',
    focusArea: 'Anuncios Regulatorios Oficiales LSE/AIM'
  },
  {
    id: 'market-tase',
    name: 'Tel Aviv Stock Exchange (TASE - Navitas NVPT)',
    country: 'REGIONAL',
    category: 'CORPORATE_REGULATORY',
    subCategory: 'TECHNICAL_DATA',
    syncStatus: 'FILINGS_FEED',
    ticker: 'NVPT.TA',
    url: 'https://www.tase.co.il',
    language: 'en',
    reliabilityScore: 'A1',
    description: 'Filings bursátiles oficiales de Navitas Petroleum: reportes de reservas 2P/3P auditadas por DeGolyer & MacNaughton, covenants bancarios y deuda.',
    focusArea: 'Filings Financieros & Auditorías de Reservas'
  },

  // THINK TANKS / ANÁLISIS GEOPOLÍTICO
  {
    id: 'thinktank-rusi',
    name: 'Royal United Services Institute (RUSI)',
    country: 'REGIONAL',
    category: 'THINK_TANK',
    subCategory: 'THINK_TANK',
    syncStatus: 'PORTAL_DIRECT',
    url: 'https://rusi.org',
    language: 'en',
    reliabilityScore: 'B1',
    description: 'Instituto decano británico de defensa y seguridad: doctrina de proyección naval, seguridad de pasos bioceánicos y presencia en el Atlántico Sur.',
    focusArea: 'Defensa Marítima & Doctrina Polar'
  },
  {
    id: 'thinktank-chatham-house',
    name: 'Chatham House (The Royal Institute of International Affairs)',
    country: 'REGIONAL',
    category: 'THINK_TANK',
    subCategory: 'THINK_TANK',
    syncStatus: 'PORTAL_DIRECT',
    url: 'https://www.chathamhouse.org',
    language: 'en',
    reliabilityScore: 'B1',
    description: 'Análisis geopolítico y normativo: soberanía de recursos naturales, derecho del mar (UNCLOS) y relaciones del Reino Unido con el Cono Sur.',
    focusArea: 'Derecho del Mar (UNCLOS) & Gobernanza'
  },
  {
    id: 'thinktank-observatorio-malvinas',
    name: 'Observatorio Malvinas & South Atlantic Council',
    country: 'AR',
    category: 'THINK_TANK',
    subCategory: 'THINK_TANK',
    syncStatus: 'PORTAL_DIRECT',
    url: 'https://agendamalvinas.com.ar',
    language: 'es',
    reliabilityScore: 'B1',
    description: 'Centros académicos y comités de expertos sobre el Atlántico Sur: monitoreo de recursos hidrocarburíferos y pesqueros no autorizados por Argentina.',
    focusArea: 'Soberanía Jurídica & Impacto Económico'
  },

  // REGISTROS CORPORATIVOS & BURSÁTILES
  {
    id: 'reg-companies-house',
    name: 'Companies House (UK Government)',
    country: 'REGIONAL',
    category: 'CORPORATE_REGULATORY',
    subCategory: 'REGULATORY_REGISTRY',
    syncStatus: 'PORTAL_DIRECT',
    url: 'https://www.gov.uk/government/organisations/companies-house',
    language: 'en',
    reliabilityScore: 'A1',
    description: 'Registro mercantil del Reino Unido: actas constitutivas, directores, personas con control significativo (PSC) y balances de operadores británicos.',
    focusArea: 'Estructuras Societarias & Accionariado'
  },
  {
    id: 'reg-sec-sedar',
    name: 'SEDAR+ / SEC EDGAR (Filings Corporativos)',
    country: 'REGIONAL',
    category: 'CORPORATE_REGULATORY',
    subCategory: 'REGULATORY_REGISTRY',
    syncStatus: 'FILINGS_FEED',
    url: 'https://www.sedarplus.ca',
    language: 'en',
    reliabilityScore: 'A1',
    description: 'Sistemas oficiales de divulgación de valores de Canadá y EE.UU.: seguimiento de propiedad accionaria de Eco Atlantic, Navitas y asociadas.',
    focusArea: 'Ownership & Filings Bursátiles'
  }
];
