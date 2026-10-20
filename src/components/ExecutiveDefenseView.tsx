import React, { useState } from "react";
import {
  ShieldAlert,
  ArrowRight,
  Calculator,
  Building2,
  FileSpreadsheet,
  Coins,
  Scale,
  Award,
  ChevronDown,
  ChevronUp,
  Camera,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { DECANATURA_STRATEGIC_DEFENSE } from "../data/categoriesData";
import { formatCOP, formatMillions } from "../data/collaboratorAnalysis";

interface ExecutiveDefenseProps {
  onNavigateToYoY: () => void;
  totalsByYear: Record<number, { total: number; count: number; monthlyAvg: number }>;
  totalInvestment: number;
  onCaptureScreenshot: () => void;
  isCapturing?: boolean;
}

export const ExecutiveDefenseView: React.FC<ExecutiveDefenseProps> = ({
  onNavigateToYoY,
  totalsByYear,
  totalInvestment,
  onCaptureScreenshot,
  isCapturing = false,
}) => {
  const [activeRiskIndex, setActiveRiskIndex] = useState<number | null>(0);
  const [overheadEstimate, setOverheadEstimate] = useState<number>(35000); // in millions COP managed

  // Estimated ROI calculation
  const calculatedOverhead = overheadEstimate * 0.15; // 15% average overhead
  const cdiAnnualCost = totalsByYear[2026]?.total ? totalsByYear[2026].total / 1000000 : 2400;
  const netContribution = calculatedOverhead - cdiAnnualCost;
  const roiMultiplier = (calculatedOverhead / Math.max(1, cdiAnnualCost)).toFixed(1);

  const risks = [
    {
      titulo: "1. Colapso en el Quehacer de Docentes Investigadores",
      severidad: "CRÍTICO",
      detalle:
        "Sin gestores de proyectos, los profesores tendrían que asumir la formulación de CDP, digitación en Quipu, vinculación a ARL de contratistas, legalización de viáticos y compras. Esto desvía hasta el 60% del tiempo de investigación a trámites operativos, reduciendo drásticamente la producción académica y publicaciones de la Facultad de Minas.",
      impacto: "Pérdida de convocatorias de Minciencias y saturación de la planta profesoral.",
    },
    {
      titulo: "2. Congelamiento de Fondos y Sanciones en SECOP II",
      severidad: "ALTO RIESGO JURÍDICO",
      detalle:
        "La Mesa Operativa del CDI garantiza la publicación oportuna y obligatoria de todos los actos contractuales en SECOP II y Función Pública. La ausencia de este equipo expondría a la Decanatura a investigaciones directas de la Contraloría General y la Procuraduría por omisión del principio de publicidad.",
      impacto: "Investigaciones fiscales y disciplinarias directas a la ordenación del gasto.",
    },
    {
      titulo: "3. Quiebra Financiera de Laboratorios Especializados",
      severidad: "IMPACTO ECONÓMICO",
      detalle:
        "Los laboratorios de la Facultad de Minas (suelos, petróleos, metalurgia, hidráulica, biotecnología) dependen de los gestores del CDI para emitir cotizaciones, cobrar ensayos a la industria privada y liquidar compras de reactivos. Sin soporte, los laboratorios acumularían saldos en rojo y quedarían inoperativos.",
      impacto: "Pérdida de clientes industriales y obsolescencia del parque experimental.",
    },
    {
      titulo: "4. Deserción y Vulnerabilidad de Estudiantes Auxiliares",
      severidad: "MISIONAL Y SOCIAL",
      detalle:
        "El CDI gestiona cientos de nombramientos de estudiantes becarios y auxiliares. Sin la articulación del CDI, los pagos y afiliaciones a seguridad social sufrirían retrasos de meses, vulnerando el bienestar de estudiantes de escasos recursos vinculados a la investigación.",
      impacto: "Afectación directa a la permanencia estudiantil y al semillero científico.",
    },
  ];

  return (
    <div id="section-view-defensa" className="space-y-10 py-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Top Banner with Section Action & Institutional Identity */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#007D8C] tracking-wide uppercase">
            <Building2 className="w-4 h-4 text-[#FA9F1B]" />
            <span>Documento Estratégico para la Decanatura</span>
            <span className="text-slate-400">·</span>
            <span className="text-[#3D4043]">Facultad de Minas · UNAL Medellín</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#3D4043] tracking-tight mt-1">
            Defensa y Justificación Integral del Sistema CDI
          </h1>
        </div>

        {/* Action button to download screenshot of this section */}
        <button
          onClick={onCaptureScreenshot}
          disabled={isCapturing}
          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-[#005A64] bg-white hover:bg-slate-50 border-2 border-[#007D8C] rounded-xl shadow-sm transition-all cursor-pointer whitespace-nowrap self-start sm:self-auto disabled:opacity-50"
        >
          <Camera className="w-4 h-4 text-[#FA9F1B]" />
          <span>{isCapturing ? "Generando imagen..." : "Descargar Pantallazo de esta Sección"}</span>
        </button>
      </div>

      {/* Institutional Hero Banner */}
      <div className="rounded-2xl bg-gradient-to-br from-[#007D8C] via-[#005A64] to-[#3D4043] text-white p-8 sm:p-10 shadow-lg relative overflow-hidden">
        <div className="max-w-3xl space-y-4 relative z-10">
          <span className="inline-block px-3 py-1 rounded-full bg-[#FA9F1B] text-slate-950 text-xs font-black uppercase tracking-wider shadow-sm">
            Sustentación de Continuidad y Permanencia
          </span>

          <h2 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight">
            El CDI es el Motor que Hace Viable la Investigación, Extensión y Laboratorios en Minas
          </h2>

          <p className="text-teal-50 text-sm sm:text-base leading-relaxed">
            Este informe sintetiza las justificaciones cuantitativas y jurídicas que sustentan la
            contratación del equipo del Centro de Desarrollo e Innovación. Cada peso invertido se traduce
            en horas liberadas para los profesores, cero sanciones legales y un retorno financiero
            superior a 10 veces su costo operativo.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={onNavigateToYoY}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#FA9F1B] hover:bg-[#F5A122] text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl transition-all shadow-md cursor-pointer"
            >
              <span>Ver Justificación de Incrementos Persona a Persona</span>
              <ArrowRight className="w-4 h-4 text-slate-950" />
            </button>
          </div>
        </div>
      </div>

      {/* Triennial Financial & Operational Highlights */}
      <section className="space-y-4">
        <div className="border-b border-slate-200 pb-2">
          <h2 className="text-lg font-extrabold text-[#3D4043] tracking-tight">
            Métricas Consolidadas del Sistema CDI (2024 - 2026)
          </h2>
          <p className="text-xs text-slate-500">
            Datos consolidados sobre las 97 órdenes contractuales registradas en los proyectos 3015 y 3065
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2 border-t-4 border-t-[#007D8C]">
            <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
              <span>Inversión Total Trienio</span>
              <Coins className="w-4 h-4 text-[#007D8C]" />
            </div>
            <p className="text-2xl font-black font-mono-num text-[#3D4043]">
              {formatMillions(totalInvestment)}
            </p>
            <p className="text-xs text-slate-500">
              {formatCOP(totalInvestment)} en honorarios regulados
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2 border-t-4 border-t-[#FA9F1B]">
            <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
              <span>Talento Especializado</span>
              <Award className="w-4 h-4 text-[#FA9F1B]" />
            </div>
            <p className="text-2xl font-black font-mono-num text-[#3D4043]">
              38 Colaboradores
            </p>
            <p className="text-xs text-slate-500">
              78% con formación profesional y posgrado
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2 border-t-4 border-t-[#005A64]">
            <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
              <span>Órdenes Contractuales</span>
              <FileSpreadsheet className="w-4 h-4 text-[#005A64]" />
            </div>
            <p className="text-2xl font-black font-mono-num text-[#3D4043]">
              97 Contratos
            </p>
            <p className="text-xs text-slate-500 font-semibold text-emerald-700">
              100% con actividades completamente registradas
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2 border-t-4 border-t-[#414546]">
            <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
              <span>Evolución Anual 2026</span>
              <Scale className="w-4 h-4 text-[#414546]" />
            </div>
            <p className="text-2xl font-black font-mono-num text-[#007D8C]">
              +5.1% IPC
            </p>
            <p className="text-xs text-slate-500">
              Ajuste estrictamente apegado a la inflación oficial
            </p>
          </div>
        </div>
      </section>

      {/* Special Highlight: The 2026 Application Developed for Results and Impact */}
      <section className="p-6 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 shadow-sm space-y-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-[#FA9F1B]" />
          <h3 className="text-sm font-black text-amber-900 uppercase tracking-wider">
            Hito Estratégico 2026: Desarrollo del Aplicativo de Productos y Resultados CDI
          </h3>
        </div>
        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
          En 2026, la contratación del <strong>Gestor SGEI</strong> (Gabriel Alfonso Garzón Henao)
          junto con el área de <strong>TI Aplicaciones</strong> (Jeisson Massery Ayala) se ha enfocado
          directamente en diseñar, construir e implementar el <strong>aplicativo informático (Power Apps y bases de datos integradas)</strong> que
          soporta y monitorea en tiempo real los entregables, productos y resultados de todos los proyectos de
          investigación y extensión de la Facultad de Minas. Esto proporciona a la Decanatura un control
          sin precedentes sobre el impacto social, tecnológico y financiero de la Facultad.
        </p>
      </section>

      {/* The 4 Drivers Explaining Contract Increases (Crucial for the Dean) */}
      <section className="space-y-4">
        <div className="border-b border-slate-200 pb-2">
          <h2 className="text-lg font-extrabold text-[#3D4043] tracking-tight">
            Los 4 Factores Reales que Explican el Incremento Contractual
          </h2>
          <p className="text-xs text-slate-500">
            Desmitificando el aumento nominal: análisis riguroso de plazo en meses, inflación oficial y complejidad
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {DECANATURA_STRATEGIC_DEFENSE.losCuatroMotoresDelIncremento.map((motor, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-[#007D8C] transition-all space-y-2.5"
            >
              <h3 className="text-sm font-extrabold text-[#007D8C] flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#FA9F1B]" />
                <span>{motor.motor}</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {motor.descripcion}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* The 5 Strategic Pillars for the Dean */}
      <section className="space-y-4">
        <div className="border-b border-slate-200 pb-2">
          <h2 className="text-lg font-extrabold text-[#3D4043] tracking-tight">
            Los 5 Pilares de Valor Misional del CDI para la Facultad de Minas
          </h2>
          <p className="text-xs text-slate-500">
            Evidencia cualitativa y cuantitativa para sustentar la permanencia del sistema ante el Consejo de Facultad
          </p>
        </div>

        <div className="space-y-3">
          {DECANATURA_STRATEGIC_DEFENSE.pilares.map((p, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2"
            >
              <h3 className="text-sm font-extrabold text-[#3D4043] flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#007D8C]" />
                <span>{p.pilar}</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pl-6">
                {p.argumento}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Risk Matrix: What happens if CDI is cut? */}
      <section className="space-y-4">
        <div className="border-b border-slate-200 pb-2">
          <h2 className="text-lg font-extrabold text-[#3D4043] tracking-tight flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-rose-600" />
            <span>Matriz de Riesgo: ¿Qué Ocurre si el CDI se Reduce o Desaparece?</span>
          </h2>
          <p className="text-xs text-slate-500">
            Evaluación de contingencias legales, académicas y financieras ante una eventual reducción presupuestal
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {risks.map((r, idx) => {
            const isExpanded = activeRiskIndex === idx;
            return (
              <div
                key={idx}
                onClick={() => setActiveRiskIndex(isExpanded ? null : idx)}
                className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                  isExpanded
                    ? "bg-white border-rose-300 shadow-md ring-1 ring-rose-200"
                    : "bg-white border-slate-200 hover:border-slate-300 shadow-sm"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <span className="inline-block px-2.5 py-0.5 text-[10px] font-black text-rose-700 bg-rose-50 border border-rose-200 rounded-md">
                      {r.severidad}
                    </span>
                    <h3 className="text-sm font-extrabold text-[#3D4043]">{r.titulo}</h3>
                  </div>
                  <button className="text-slate-400 hover:text-slate-700">
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>

                <p className="text-xs text-slate-600 mt-2.5 leading-relaxed">
                  {r.detalle}
                </p>

                <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center gap-1.5 text-xs text-rose-700 font-semibold">
                  <span className="text-slate-400 font-normal">Impacto Directo:</span>
                  <span>{r.impacto}</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Interactive ROI Simulator for the Dean */}
      <section className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <h2 className="text-lg font-extrabold text-[#3D4043] tracking-tight flex items-center gap-2">
              <Calculator className="w-5 h-5 text-[#007D8C]" />
              <span>Simulador de Retorno de la Inversión (ROI del CDI para la Facultad)</span>
            </h2>
            <p className="text-xs text-slate-500">
              Calcule cuánto overhead e ingresos directos genera la operación del CDI frente a su costo anual
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono-num bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200">
            <span className="text-slate-600 font-medium">Multiplicador Estimado:</span>
            <span className="font-black text-[#007D8C] text-sm">~{roiMultiplier}x</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <label className="block text-xs font-bold text-[#3D4043]">
              Volumen Anual de Proyectos Gestionados por Minas (Extensión, Regalías, Convenios):
            </label>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min="10000"
                max="80000"
                step="2500"
                value={overheadEstimate}
                onChange={(e) => setOverheadEstimate(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#007D8C]"
              />
              <span className="font-mono-num text-sm font-black text-[#3D4043] shrink-0 w-32 text-right">
                ${(overheadEstimate / 1000).toFixed(1)} mil millones
              </span>
            </div>

            <p className="text-xs text-slate-500 leading-relaxed">
              La Facultad de Minas retiene en promedio entre un 12% y un 18% por concepto de
              gastos de administración (overhead) en proyectos suscritos con empresas privadas,
              Minciencias y entidades gubernamentales. El equipo del CDI se autofinancia con estos
              fondos y transfiere el excedente neto para infraestructura y docencia.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 bg-slate-50 p-5 rounded-2xl border border-slate-200">
            <div className="space-y-1">
              <span className="text-[11px] text-slate-500 font-semibold">Overhead Estimado (15%):</span>
              <p className="text-xl font-black font-mono-num text-[#007D8C]">
                ${calculatedOverhead.toFixed(0)}M COP
              </p>
            </div>

            <div className="space-y-1">
              <span className="text-[11px] text-slate-500 font-semibold">Costo Operativo CDI (2026):</span>
              <p className="text-xl font-black font-mono-num text-[#3D4043]">
                ~${cdiAnnualCost.toFixed(0)}M COP
              </p>
            </div>

            <div className="col-span-2 pt-3 border-t border-slate-200 flex items-center justify-between">
              <span className="text-xs font-bold text-[#3D4043]">
                Aporte Neto Libre para la Facultad:
              </span>
              <span className="text-base font-black font-mono-num text-emerald-700">
                +${netContribution.toFixed(0)}M COP
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
