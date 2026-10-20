import React, { useState, useMemo } from "react";
import {
  Search,
  Filter,
  ArrowUpRight,
  TrendingUp,
  FileText,
  UserCheck,
  Calendar,
  CheckCircle2,
  PlusCircle,
  Clock,
  Camera,
  ChevronDown,
  Layers,
  Award,
} from "lucide-react";
import {
  CollaboratorProfile,
  formatCOP,
  formatMillions,
  YearComparison,
} from "../data/collaboratorAnalysis";

interface YoYJustificationViewProps {
  collaborators: CollaboratorProfile[];
  onCaptureScreenshot: () => void;
  isCapturing?: boolean;
}

export const YoYJustificationView: React.FC<YoYJustificationViewProps> = ({
  collaborators,
  onCaptureScreenshot,
  isCapturing = false,
}) => {
  const [selectedPeriod, setSelectedPeriod] = useState<"2024-2025" | "2025-2026" | "all">("2025-2026");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedRole, setSelectedRole] = useState<string>("all");
  const [selectedPersonForModal, setSelectedPersonForModal] = useState<{
    profile: CollaboratorProfile;
    comp: YearComparison;
  } | null>(null);

  // Extract unique roles
  const roles = useMemo(() => {
    return Array.from(new Set(collaborators.map((c) => c.rolCategoria))).sort();
  }, [collaborators]);

  // Filtered comparisons
  const filteredData = useMemo(() => {
    const rows: {
      profile: CollaboratorProfile;
      comp: YearComparison;
    }[] = [];

    for (const c of collaborators) {
      if (selectedRole !== "all" && c.rolCategoria !== selectedRole) {
        continue;
      }
      if (
        searchQuery &&
        !c.nombre.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !c.cargo.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !c.profesionBasica.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        continue;
      }

      for (const comp of c.comparaciones) {
        if (selectedPeriod === "2024-2025" && comp.anoAnterior === 2024 && comp.anoActual === 2025) {
          rows.push({ profile: c, comp });
        } else if (selectedPeriod === "2025-2026" && comp.anoAnterior === 2025 && comp.anoActual === 2026) {
          rows.push({ profile: c, comp });
        } else if (selectedPeriod === "all") {
          rows.push({ profile: c, comp });
        }
      }
    }

    return rows.sort((a, b) => b.comp.deltaValor - a.comp.deltaValor);
  }, [collaborators, selectedPeriod, selectedRole, searchQuery]);

  // Summary statistics for the selected comparison view
  const stats = useMemo(() => {
    const totalDelta = filteredData.reduce((acc, curr) => acc + curr.comp.deltaValor, 0);
    const avgPct = filteredData.length > 0
      ? (filteredData.reduce((acc, curr) => acc + curr.comp.incrementoPct, 0) / filteredData.length).toFixed(1)
      : "0";
    const avgMonthlyPct = filteredData.length > 0
      ? (filteredData.reduce((acc, curr) => acc + curr.comp.incrementoMensualPct, 0) / filteredData.length).toFixed(1)
      : "0";
    const peopleCount = new Set(filteredData.map((d) => d.profile.nombre)).size;

    return { totalDelta, avgPct, avgMonthlyPct, peopleCount };
  }, [filteredData]);

  return (
    <div id="section-view-incrementos" className="space-y-8 py-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header section with screen capture button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#007D8C] uppercase tracking-wide">
            <TrendingUp className="w-4 h-4 text-[#FA9F1B]" />
            <span>Módulo Central de Justificación Interanual (YoY)</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#3D4043] tracking-tight mt-1">
            Justificación de Actividades e Incrementos Contractuales
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-3xl leading-relaxed mt-1">
            Análisis auditado sobre qué actividades tenía cada colaborador el año anterior y qué
            responsabilidades se le incrementaron, justificando el valor de cada orden ante la Decanatura.
          </p>
        </div>

        <button
          onClick={onCaptureScreenshot}
          disabled={isCapturing}
          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-[#005A64] bg-white hover:bg-slate-50 border-2 border-[#007D8C] rounded-xl shadow-sm transition-all cursor-pointer whitespace-nowrap self-start sm:self-auto disabled:opacity-50"
        >
          <Camera className="w-4 h-4 text-[#FA9F1B]" />
          <span>{isCapturing ? "Generando imagen..." : "Descargar Pantallazo"}</span>
        </button>
      </div>

      {/* KPI Cards for the selected period */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-1 border-t-4 border-t-[#007D8C]">
          <span className="text-xs font-semibold text-slate-500">Personas con Continuidad</span>
          <p className="text-2xl font-black font-mono-num text-[#3D4043]">
            {stats.peopleCount} colaboradores
          </p>
          <span className="text-[11px] text-slate-500">Evaluados periodo tras periodo</span>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-1 border-t-4 border-t-[#FA9F1B]">
          <span className="text-xs font-semibold text-slate-500">Variación Nominal Total</span>
          <p className="text-2xl font-black font-mono-num text-[#007D8C]">
            +{formatMillions(stats.totalDelta)}
          </p>
          <span className="text-[11px] text-slate-500">Masa salarial anual incremental</span>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-1 border-t-4 border-t-[#005A64]">
          <span className="text-xs font-semibold text-slate-500">Aumento Nominal Promedio</span>
          <p className="text-2xl font-black font-mono-num text-[#3D4043]">
            +{stats.avgPct}%
          </p>
          <span className="text-[11px] text-slate-500">Impulsado por pasar de 8.5 a 11.5 meses</span>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-1 border-t-4 border-t-[#414546]">
          <span className="text-xs font-semibold text-slate-500">Ajuste Mensual Real (IPC)</span>
          <p className="text-2xl font-black font-mono-num text-[#FA9F1B]">
            +{stats.avgMonthlyPct}%
          </p>
          <span className="text-[11px] text-slate-500">Apegado a escala oficial UNAL</span>
        </div>
      </div>

      {/* Filter and Period Controls */}
      <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Period selector buttons */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl border border-slate-200">
            <button
              onClick={() => setSelectedPeriod("2025-2026")}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                selectedPeriod === "2025-2026"
                  ? "bg-[#007D8C] text-white shadow-sm"
                  : "text-[#3D4043] hover:text-[#007D8C]"
              }`}
            >
              2025 vs 2026 (Vigencia Actual)
            </button>
            <button
              onClick={() => setSelectedPeriod("2024-2025")}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                selectedPeriod === "2024-2025"
                  ? "bg-[#007D8C] text-white shadow-sm"
                  : "text-[#3D4043] hover:text-[#007D8C]"
              }`}
            >
              2024 vs 2025 (Transición)
            </button>
            <button
              onClick={() => setSelectedPeriod("all")}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                selectedPeriod === "all"
                  ? "bg-[#007D8C] text-white shadow-sm"
                  : "text-[#3D4043] hover:text-[#007D8C]"
              }`}
            >
              Todos los Periodos
            </button>
          </div>

          {/* Search box */}
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar colaborador, cargo o profesión..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl text-[#3D4043] placeholder-slate-400 focus:outline-none focus:border-[#007D8C] focus:bg-white transition-colors"
            />
          </div>

          {/* Role selector dropdown */}
          <div className="flex items-center gap-2 shrink-0">
            <Filter className="w-4 h-4 text-slate-500" />
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-[#3D4043] focus:outline-none focus:border-[#007D8C] cursor-pointer"
            >
              <option value="all">Todas las líneas operativas</option>
              {roles.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Comparison Cards & Detailed Audit */}
      <div className="space-y-5">
        {filteredData.map(({ profile, comp }, index) => {
          const hasNewActivities = comp.actividadesNuevas.length > 0;

          return (
            <div
              key={`${profile.nombre}-${comp.anoAnterior}-${comp.anoActual}-${index}`}
              className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md hover:border-[#007D8C] transition-all space-y-5"
            >
              {/* Header row: Collaborator info & Key Metric Badge */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span className="font-extrabold text-[#007D8C] bg-teal-50 px-2.5 py-0.5 rounded-full border border-teal-100">
                      {profile.rolCategoria}
                    </span>
                    <span className="text-slate-400">·</span>
                    <span className="font-bold text-[#3D4043]">{profile.cargo}</span>
                    <span className="text-slate-400">·</span>
                    <span className="text-slate-500">{profile.nivelAcademico} ({profile.profesionBasica})</span>
                  </div>

                  <h2 className="text-lg font-black text-[#3D4043] tracking-tight flex items-center gap-2">
                    <UserCheck className="w-5 h-5 text-[#007D8C] shrink-0" />
                    <span>{profile.nombre}</span>
                  </h2>
                </div>

                {/* Financial Comparison Summary Strip */}
                <div className="flex flex-wrap items-center gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs">
                  <div className="text-right px-2">
                    <span className="text-[10px] text-slate-500 block uppercase font-bold">Año {comp.anoAnterior}</span>
                    <span className="font-mono-num font-bold text-slate-600">
                      {formatMillions(comp.valorAnterior)}
                    </span>
                    <span className="text-[10px] text-slate-500 block">({comp.mesesAnterior} meses)</span>
                  </div>

                  <ArrowUpRight className="w-4 h-4 text-[#007D8C] shrink-0" />

                  <div className="text-right px-2 border-r border-slate-200">
                    <span className="text-[10px] text-slate-500 block uppercase font-bold">Año {comp.anoActual}</span>
                    <span className="font-mono-num font-extrabold text-[#007D8C]">
                      {formatMillions(comp.valorActual)}
                    </span>
                    <span className="text-[10px] text-slate-500 block">({comp.mesesActual} meses)</span>
                  </div>

                  <div className="px-2 space-y-0.5">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] text-slate-500 font-semibold">Var. Nominal:</span>
                      <span className="font-mono-num font-extrabold text-[#005A64]">
                        +{formatMillions(comp.deltaValor)} (+{comp.incrementoPct.toFixed(1)}%)
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] text-slate-500 font-semibold">Var. Mensual Real:</span>
                      <span className="font-mono-num font-black text-[#FA9F1B]">
                        {comp.incrementoMensualPct >= 0 ? "+" : ""}
                        {comp.incrementoMensualPct.toFixed(1)}% / mes
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Justification Narrative for the Dean */}
              <div className="bg-[#007D8C]/5 p-4 rounded-xl border border-[#007D8C]/20 space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-extrabold text-[#005A64] flex items-center gap-1.5 uppercase tracking-wide">
                    <FileText className="w-3.5 h-3.5 text-[#007D8C]" />
                    Sustentación del Incremento ante la Decanatura:
                  </span>
                  <span className="text-slate-500 font-mono-num text-[11px] font-bold">
                    {comp.anoAnterior} ➔ {comp.anoActual}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                  {comp.justificacionDecanatura}
                </p>
              </div>

              {/* Activities Evolution Breakdown */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Previous year activities */}
                <div className="space-y-2 p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-700 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-slate-500" />
                      Actividades en {comp.anoAnterior}:
                    </span>
                    <span className="text-[11px] font-mono-num font-bold text-slate-500">
                      {comp.actividadesAnteriores.length} asignadas
                    </span>
                  </div>

                  <ul className="space-y-1.5 text-xs text-slate-600 max-h-44 overflow-y-auto pr-1">
                    {comp.actividadesAnteriores.slice(0, 4).map((act, aIdx) => (
                      <li key={aIdx} className="flex items-start gap-2">
                        <span className="text-slate-400 font-mono-num text-[10px] shrink-0 mt-0.5">{aIdx + 1}.</span>
                        <span className="line-clamp-2">{act}</span>
                      </li>
                    ))}
                    {comp.actividadesAnteriores.length > 4 && (
                      <li className="text-[11px] text-[#007D8C] font-semibold italic">
                        + {comp.actividadesAnteriores.length - 4} actividades más registradas...
                      </li>
                    )}
                  </ul>
                </div>

                {/* Current year & Newly Added/Expanded Activities */}
                <div className="space-y-2 p-4 rounded-xl bg-amber-50/50 border border-amber-200">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-amber-900 flex items-center gap-1.5">
                      <PlusCircle className="w-3.5 h-3.5 text-[#FA9F1B]" />
                      Actividades Nuevas / Alcance en {comp.anoActual}:
                    </span>
                    <span className="text-[11px] font-mono-num text-amber-800 font-black">
                      {comp.actividadesActuales.length} totales ({comp.actividadesNuevas.length} nuevas)
                    </span>
                  </div>

                  <ul className="space-y-1.5 text-xs text-slate-800 max-h-44 overflow-y-auto pr-1">
                    {(hasNewActivities ? comp.actividadesNuevas : comp.actividadesActuales)
                      .slice(0, 4)
                      .map((act, nIdx) => (
                        <li key={nIdx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span className="line-clamp-2">{act}</span>
                        </li>
                      ))}
                    {(hasNewActivities ? comp.actividadesNuevas : comp.actividadesActuales).length > 4 && (
                      <li className="text-[11px] text-amber-800 font-bold italic">
                        + {(hasNewActivities ? comp.actividadesNuevas : comp.actividadesActuales).length - 4} actividades más...
                      </li>
                    )}
                  </ul>
                </div>
              </div>

              {/* Action button to open full side-by-side modal */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs text-slate-500">
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>
                    Tarifa mensual equivalente {comp.anoActual}: <strong className="text-[#3D4043]">{formatCOP(comp.valorMensualActual)}/mes</strong>
                  </span>
                </div>

                <button
                  onClick={() => setSelectedPersonForModal({ profile, comp })}
                  className="inline-flex items-center gap-1.5 text-[#007D8C] hover:text-[#005A64] font-bold cursor-pointer transition-colors"
                >
                  <span>Ver Ficha Técnica Completa con Todas las Actividades</span>
                  <ChevronDown className="w-3.5 h-3.5 -rotate-90" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Side-by-side Modal for Selected Collaborator */}
      {selectedPersonForModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto no-print">
          <div className="w-full max-w-4xl bg-white border border-slate-300 rounded-3xl shadow-2xl p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between border-b border-slate-200 pb-4">
              <div>
                <span className="text-xs font-bold text-[#007D8C] uppercase tracking-wide">
                  Ficha Técnica para Decanatura · Facultad de Minas
                </span>
                <h3 className="text-xl font-black text-[#3D4043] mt-1">
                  {selectedPersonForModal.profile.nombre}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  {selectedPersonForModal.profile.cargo} · {selectedPersonForModal.profile.rolCategoria}
                </p>
              </div>

              <button
                onClick={() => setSelectedPersonForModal(null)}
                className="text-slate-400 hover:text-slate-700 px-3 py-1.5 text-xs font-bold rounded-lg bg-slate-100 hover:bg-slate-200 cursor-pointer"
              >
                Cerrar
              </button>
            </div>

            {/* Academic Info */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs">
              <div>
                <span className="text-slate-400 block uppercase font-bold text-[10px]">Nivel Académico:</span>
                <span className="font-bold text-[#3D4043] text-sm">{selectedPersonForModal.profile.nivelAcademico}</span>
              </div>
              <div>
                <span className="text-slate-400 block uppercase font-bold text-[10px]">Formación de Pregrado:</span>
                <span className="font-bold text-[#3D4043]">{selectedPersonForModal.profile.profesionBasica}</span>
              </div>
              <div>
                <span className="text-slate-400 block uppercase font-bold text-[10px]">Especialidad / Posgrado:</span>
                <span className="font-bold text-[#007D8C]">
                  {selectedPersonForModal.profile.profesionPosgrado || selectedPersonForModal.profile.estudiosAdicionales || "Perfil Especializado"}
                </span>
              </div>
            </div>

            {/* Why was this person hired in CDI? */}
            <div className="p-4 rounded-2xl bg-teal-50/60 border border-teal-200 space-y-1">
              <span className="text-xs font-black text-[#005A64] uppercase tracking-wider block">
                ¿Por qué se contrató a esta persona dentro del sistema CDI?
              </span>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                {selectedPersonForModal.profile.justificacionGlobal}
              </p>
            </div>

            {/* Financial YoY Comparison Box */}
            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
              <span className="text-xs font-extrabold text-[#3D4043]">
                Desglose Matemático del Incremento ({selectedPersonForModal.comp.anoAnterior} vs {selectedPersonForModal.comp.anoActual}):
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-slate-500 block text-[10px] font-bold">Total {selectedPersonForModal.comp.anoAnterior}:</span>
                  <span className="font-mono-num font-bold text-[#3D4043] text-sm">
                    {formatCOP(selectedPersonForModal.comp.valorAnterior)}
                  </span>
                  <span className="text-[10px] text-slate-500 block">
                    ({selectedPersonForModal.comp.mesesAnterior} meses)
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-slate-500 block text-[10px] font-bold">Total {selectedPersonForModal.comp.anoActual}:</span>
                  <span className="font-mono-num font-black text-[#007D8C] text-sm">
                    {formatCOP(selectedPersonForModal.comp.valorActual)}
                  </span>
                  <span className="text-[10px] text-slate-500 block">
                    ({selectedPersonForModal.comp.mesesActual} meses)
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-amber-50 border border-amber-200">
                  <span className="text-amber-800 block text-[10px] font-bold">Aumento Nominal:</span>
                  <span className="font-mono-num font-black text-amber-900 text-sm">
                    +{formatCOP(selectedPersonForModal.comp.deltaValor)}
                  </span>
                  <span className="text-[10px] text-amber-700 block font-semibold">
                    (+{selectedPersonForModal.comp.incrementoPct.toFixed(1)}%)
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-teal-50 border border-teal-200">
                  <span className="text-teal-800 block text-[10px] font-bold">Ajuste Mensual Real:</span>
                  <span className="font-mono-num font-black text-[#005A64] text-sm">
                    {selectedPersonForModal.comp.incrementoMensualPct >= 0 ? "+" : ""}
                    {selectedPersonForModal.comp.incrementoMensualPct.toFixed(1)}% / mes
                  </span>
                  <span className="text-[10px] text-teal-700 block">
                    {formatCOP(selectedPersonForModal.comp.valorMensualActual)}/mes
                  </span>
                </div>
              </div>
            </div>

            {/* Side by side full activities comparison */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <span className="text-xs font-bold text-slate-700">
                  Actividades en {selectedPersonForModal.comp.anoAnterior} ({selectedPersonForModal.comp.actividadesAnteriores.length}):
                </span>
                <div className="space-y-1.5 max-h-60 overflow-y-auto pr-2 text-xs text-slate-600">
                  {selectedPersonForModal.comp.actividadesAnteriores.map((act, idx) => (
                    <div key={idx} className="flex items-start gap-2 py-1 border-b border-slate-200/60">
                      <span className="text-slate-400 font-mono-num text-[10px] shrink-0">{idx + 1}.</span>
                      <span>{act}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-200 space-y-2">
                <span className="text-xs font-bold text-amber-900">
                  Actividades en {selectedPersonForModal.comp.anoActual} ({selectedPersonForModal.comp.actividadesActuales.length}):
                </span>
                <div className="space-y-1.5 max-h-60 overflow-y-auto pr-2 text-xs text-slate-800">
                  {selectedPersonForModal.comp.actividadesActuales.map((act, idx) => (
                    <div key={idx} className="flex items-start gap-2 py-1 border-b border-amber-200/60">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{act}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSelectedPersonForModal(null)}
                className="px-5 py-2 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl cursor-pointer"
              >
                Cerrar Ficha
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
