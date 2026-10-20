/**
 * Clasificación Oficial de Roles, Categorías de Actividades y Argumentos Estratégicos
 * para la Decanatura de la Facultad de Minas - CDI
 */

export interface RoleCategoryInfo {
  id: string;
  nombre: string;
  tituloCorto: string;
  descripcion: string;
  misionCritica: string;
  riesgoSinEsteRol: string;
  icono: string;
  colorTag: string;
  badgeBg: string;
  badgeText: string;
  entregablesClave: string[];
  responsabilidades: string[];
}

export const ROLE_CATEGORIES: RoleCategoryInfo[] = [
  {
    id: "proyectos",
    nombre: "Gestión de Proyectos (Gestores Integrales)",
    tituloCorto: "Gestión de Proyectos",
    descripcion: "Profesionales y especialistas dedicados al acompañamiento integral de los docentes y directores de laboratorio en todas las fases del ciclo de vida del proyecto.",
    misionCritica: "Acompañar al docente en formulación, negociación externa, planificación detallada, registro en HERMES/SIAD, monitoreo de hitos, facturación y liquidación, liberando a la planta profesoral de la carga operativa.",
    riesgoSinEsteRol: "Docentes saturados con labores burocráticas (Quipu, compras, viáticos), pérdida de recursos por vencimiento de hitos y disminución de la producción científica y de consultoría en Minas.",
    icono: "Briefcase",
    colorTag: "#007D8C",
    badgeBg: "bg-teal-50",
    badgeText: "text-teal-800 border-teal-200",
    entregablesClave: [
      "Propuestas estructuradas y viabilizadas ante el Consejo de Facultad",
      "Proyectos registrados y actualizados en HERMES y SIAD",
      "Seguimiento técnico-financiero a hitos y solicitudes de desembolsos",
      "Actas de liquidación técnica y financiera a satisfacción con clientes externos"
    ],
    responsabilidades: [
      "Acompañar al docente en procesos de formulación y negociación del perfil del proyecto con el ente externo",
      "Diligenciar las acciones requeridas para la presentación de proyectos al Consejo de Facultad",
      "Ingresar los proyectos de extensión y apoyar a los docentes en el registro de proyectos en HERMES",
      "Monitorear la ejecución y vencimiento de hitos e informar oportunamente al director del proyecto",
      "Solicitar y hacer seguimiento de facturación y desembolsos contractuales",
      "Coordinar canales de comunicación entre directores de proyecto, mesa operativa y clientes"
    ]
  },
  {
    id: "oportunidades",
    nombre: "Gestión de Oportunidades y Convocatorias",
    tituloCorto: "Gestión de Oportunidades",
    descripcion: "Línea estratégica encargada de la prospección del entorno, vigilancia de convocatorias nacionales e internacionales y vinculación del conocimiento con el sector empresarial.",
    misionCritica: "Mapear las capacidades de los grupos de investigación de la Facultad de Minas, identificar convocatorias de Minciencias, SGR y cooperación internacional, y articular alianzas con MiPymes, ESALs y Consultorio CD+I.",
    riesgoSinEsteRol: "Aislamiento de la Facultad de Minas de los grandes fondos de financiación externa, pérdida de convocatorias estratégicas y desaprovechamiento de capacidades de los grupos de investigación.",
    icono: "Target",
    colorTag: "#FA9F1B",
    badgeBg: "bg-amber-50",
    badgeText: "text-amber-800 border-amber-200",
    entregablesClave: [
      "Banco activo de oportunidades y convocatorias nacionales/internacionales",
      "Diagnóstico actualizado de capacidades de los grupos de investigación de Minas",
      "Propuestas estructuradas para captación de fondos y sostenimiento del reconocimiento CDT Minciencias",
      "Servicios de consultoría estudiantil aplicada a MiPymes a través del Consultorio CD+I"
    ],
    responsabilidades: [
      "Coordinar los procesos administrativos requeridos para el correcto funcionamiento del SGO - CDI",
      "Identificar y procesar oportunidades en el entorno a la luz de los lineamientos de investigación y extensión",
      "Apoyar a los docentes en la estructuración y presentación de proyectos a convocatorias externas",
      "Mantener actualizado el diagnóstico de capacidades de los grupos de investigación de la Facultad",
      "Coordinar el Consultorio CD+I con equipos de estudiantes consultores y docentes tutores",
      "Liderar acciones para sostener el reconocimiento como Centro de Desarrollo Tecnológico ante Minciencias"
    ]
  },
  {
    id: "evaluacion",
    nombre: "Gestión de Evaluación e Impacto (SGEI & TI)",
    tituloCorto: "Evaluación e Impacto & TI",
    descripcion: "Equipo especializado en el diseño e implementación del Sistema de Gestión y Evaluación de Resultados e Impacto (SGEI), y el desarrollo de aplicativos en Power Apps y bases de datos que soportan los productos de los proyectos.",
    misionCritica: "La persona contratada en 2026 se ha enfocado en desarrollar el aplicativo que soporta los productos y resultados de los proyectos, automatizando la captura de datos, KPIs para la Decanatura y trazabilidad del portafolio.",
    riesgoSinEsteRol: "Falta de evidencia del impacto real generado por los proyectos de Minas en la sociedad, dispersión de datos en hojas de cálculo aisladas y reprocesos manuales en la elaboración de reportes de gestión.",
    icono: "BarChart3",
    colorTag: "#005A64",
    badgeBg: "bg-emerald-50",
    badgeText: "text-emerald-800 border-emerald-200",
    entregablesClave: [
      "Aplicativo Power Apps para soporte y registro de productos y resultados de proyectos",
      "Sistema de Gestión y Evaluación de Resultados e Impactos (SGEI) consolidado",
      "Tableros de control con KPIs alineados al Plan de Acción de la Decanatura",
      "Bases de datos centralizadas de proyectos, contratistas y estudiantes"
    ],
    responsabilidades: [
      "Construir, diseñar e implementar mejoras y nuevas funcionalidades en el aplicativo Power Apps para proyectos",
      "Definir lineamientos y diseñar herramientas para la captura y evaluación de resultados e impacto (SGEI)",
      "Revisar la información existente de proyectos liquidados para medir impacto total y comparar con objetivos",
      "Brindar soporte técnico y mantenimiento a bases de datos y herramientas de información del sistema",
      "Presentar informes sobre el estado de indicadores globales como apoyo a la toma de decisiones de la Decanatura"
    ]
  },
  {
    id: "mesa_operativa",
    nombre: "Mesa Operativa y Soporte Contractual",
    descripcion: "Célula operativa encargada de la formalización legal, verificación precontractual, publicación en SECOP II, digitación en QUIPU/SIAD, pólizas y nombramientos de estudiantes.",
    misionCritica: "Asegurar que cada contratación cumpla rigurosamente los principios de transparencia, legalidad, régimen de contratación pública y normatividad de la Universidad Nacional de Colombia.",
    riesgoSinEsteRol: "Parálisis en compras y contratación de personal, riesgo de sanciones disciplinarias o fiscales por omisión en SECOP II, problemas de cobertura en ARL y desorden en centros de costo.",
    icono: "FileCheck",
    colorTag: "#3D4043",
    badgeBg: "bg-slate-100",
    badgeText: "text-slate-800 border-slate-300",
    entregablesClave: [
      "Órdenes contractuales OPS/OSE digitadas y formalizadas en QUIPU, SIAD y HERMES",
      "Publicación al 100% en SECOP II de documentos y actos administrativos",
      "Nombramientos y afiliaciones a seguridad social (ARL) de estudiantes auxiliares y becarios",
      "Verificación de inhabilidades y antecedentes en Función Pública y Banco de Proveedores UNAL"
    ],
    responsabilidades: [
      "Verificar documentación requerida (hojas de vida y declaración de bienes) en Función Pública y Banco UNAL",
      "Realizar el registro presupuestal y digitación de órdenes contractuales, RAG y ATI en el sistema QUIPU",
      "Publicar en SECOP II las órdenes y documentos del proceso contractual conforme al principio de publicidad",
      "Efectuar la formalización, notificación, pólizas de garantía y legalización de contratos",
      "Gestionar el nombramiento de estudiantes auxiliares, becarios y control de pagos y paz y salvos",
      "Apoyar la liquidación contractual de proyectos en los sistemas institucionales"
    ]
  },
  {
    id: "archivo",
    nombre: "Archivo y Gestión Documental",
    descripcion: "Custodia, organización, foliación y digitalización del patrimonio documental de los proyectos de la Facultad de Minas bajo la normatividad de TRD y PMA.",
    misionCritica: "Garantizar la conservación de los expedientes contractuales físicos y electrónicos, facilitando auditorías de entes de control y preparando las transferencias primarias al Archivo Central.",
    riesgoSinEsteRol: "Pérdida de soportes contractuales, hallazgos fiscales por falta de evidencia documental y sanciones por incumplimiento de la Ley General de Archivos.",
    icono: "Archive",
    colorTag: "#414546",
    badgeBg: "bg-gray-100",
    badgeText: "text-gray-800 border-gray-300",
    entregablesClave: [
      "Expedientes clasificados y foliados conforme a TRD universitaria",
      "Inventarios documentales, hojas de control e índice electrónico actualizados",
      "Archivo digital de contratos sincronizado para consulta inmediata",
      "Paquetes de expedientes listos para transferencia primaria"
    ],
    responsabilidades: [
      "Clasificar y ordenar expedientes conforme a la TRD vigente en la Universidad Nacional",
      "Ejecutar limpieza, foliación y marcación en unidades de conservación",
      "Diligenciar inventarios documentales y hojas de control para expedientes en soporte papel y digital",
      "Preparar el archivo de gestión para transferencia primaria al Archivo Central",
      "Implementar directrices de gestión documental para cumplimiento del PMA institucional"
    ]
  },
  {
    id: "coordinacion",
    nombre: "Coordinación General y Asesoría Decanatura",
    descripcion: "Liderazgo estratégico, auditoría de portafolio y asesoría directa al Decano y Vicedecano en el direccionamiento de la investigación y extensión de la Facultad.",
    misionCritica: "Integrar las tres líneas operativas del CDI (Oportunidades, Proyectos y Evaluación e Impacto), velar por la calidad del portafolio y representar al sistema ante el Consejo de Facultad.",
    riesgoSinEsteRol: "Desarticulación institucional, falta de dirección estratégica y pérdida de interlocución fluida entre la administración de proyectos y la alta dirección de la Facultad.",
    icono: "Scale",
    colorTag: "#007D8C",
    badgeBg: "bg-teal-50",
    badgeText: "text-teal-900 border-teal-300",
    entregablesClave: [
      "Auditoría continua del portafolio global de proyectos de la Facultad de Minas",
      "Informes ejecutivos e indicadores de gestión presentados a la Decanatura",
      "Estrategias de gestión del cambio y buenas prácticas metodológicas",
      "Acompañamiento a la implementación del sistema en las diferentes instancias académicas"
    ],
    responsabilidades: [
      "Coordinar e integrar acciones de Gestión de Oportunidades, Gestión de Proyectos y Evaluación e Impacto",
      "Auditar el seguimiento y control de la ejecución de proyectos: riesgos, tiempos, recursos y adquisiciones",
      "Presentar informes periódicos sobre el estado de indicadores globales como apoyo a la toma de decisiones",
      "Asesorar a la Decanatura en la implementación de buenas prácticas y mitigación de riesgos"
    ]
  }
];

export const DECANATURA_STRATEGIC_DEFENSE = {
  titulo: "Defensa Estratégica ante la Decanatura - Facultad de Minas",
  subtitulo: "Evidencia cuantitativa y cualitativa sobre la trascendencia de preservar y fortalecer el CDI",
  pilares: [
    {
      pilar: "1. Blindaje al Tiempo de Investigación y Docencia",
      argumento: "Los docentes investigadores de la Facultad de Minas no deben malgastar su jornada en tareas administrativas (Quipu, compras, pólizas, ARL de contratistas o SECOP II). El equipo del CDI absorbe el 100% de esta carga operativa, permitiendo que la planta docente se concentre en investigación de frontera, formación de ingenieros y consultorías de alto valor."
    },
    {
      pilar: "2. Captación de Recursos y Sostenibilidad Financiera",
      argumento: "El CDI viabiliza la ejecución de convenios de extensión, regalías y convocatorias Minciencias que aportan miles de millones de pesos en costos indirectos (overhead) a la Facultad. Estos recursos financian directamente el mantenimiento de laboratorios, mejoras en campus y proyectos de soporte institucional."
    },
    {
      pilar: "3. Aplicativo de Gestión e Impacto Desarrollado a la Medida",
      argumento: "En 2026 el CDI ha enfocado esfuerzos especializados en el desarrollo del aplicativo que soporta los productos y resultados de los proyectos (Gestor SGEI y TI), permitiendo a la Decanatura tener visibilidad en tiempo real de los entregables y el impacto social y tecnológico generado por la Facultad."
    },
    {
      pilar: "4. Cero Hallazgos y Cumplimiento Legal Riguroso",
      argumento: "Gracias a la Mesa Operativa y al equipo de archivo, el 100% de los contratos se publican oportunamente en SECOP II, se verifican en Función Pública y se archivan bajo TRD de la UNAL, blindando a la Decanatura ante contingencias disciplinarias o fiscales de la Contraloría."
    },
    {
      pilar: "5. Formación de Estudiantes y Vinculación Territorial",
      argumento: "A través del CDI y el Consultorio CD+I, cientos de estudiantes auxiliares y becarios se vinculan a proyectos reales y asesoran a MiPymes y comunidades, cumpliendo con la vocación de servicio social y liderazgo técnico que caracteriza el lema de la Facultad: 'Trabajo y Rectitud'."
    }
  ],
  losCuatroMotoresDelIncremento: [
    {
      motor: "1. Ampliación del Plazo de Cobertura Anual (Efecto Temporal)",
      descripcion: "En 2024 la contratación comenzó de forma tardía (abril/mayo) con duraciones de solo 8.5 a 9 meses. En 2025 y 2026, la Decanatura planificó la contratación desde enero cubriendo los 11.5 meses del año fiscal completo. Más del 30% del incremento nominal obedece a tener al personal disponible desde el día 1 del año para atender a docentes y laboratorios."
    },
    {
      motor: "2. Indexación Legal por Inflación (IPC y Escala Oficial UNAL)",
      descripcion: "Durante el trienio 2024-2026, Colombia experimentó inflaciones anuales significativas. La Universidad Nacional ajusta contractualmente los honorarios para preservar el poder adquisitivo del personal técnico y profesional conforme a las tablas oficiales institucionales."
    },
    {
      motor: "3. Incremento Sustancial en el Alcance y Complejidad de Actividades",
      descripcion: "El equipo no repite tareas pasivas: en 2025 y 2026 se incorporaron 26 a 35 actividades por gestor (proyectos SGR/Regalías, desarrollo del aplicativo de resultados SGEI, convocatorias internacionales y conciliaciones de cuentas exclusivas)."
    },
    {
      motor: "4. Retención del Talento Especializado y Curva de Aprendizaje",
      descripcion: "El 78% del equipo cuenta con formación profesional y de posgrado (Especializaciones y Maestrías en Ingeniería Industrial, Políticas Públicas y Finanzas). Reemplazar a estos profesionales implicaría una curva de aprendizaje costosa que paralizaría los proyectos de la Facultad."
    }
  ]
};
