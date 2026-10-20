import React, { useState, useMemo } from "react";
import {
  Search,
  Filter,
  Download,
  Calendar,
  FileText,
  CheckCircle2,
  GraduationCap,
  Eye,
  Camera,
  Award,
  BookOpen,
  Users,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";
import { ContractRecord } from "../data/contractsData";
import { CollaboratorProfile, formatCOP, formatMillions } from "../data/collaboratorAnalysis";

interface ContractsAndProfilesViewProps {
  contracts: ContractRecord[];
  collaborators: CollaboratorProfile[];
  academicStats: { nivel: string; contratos: number; porcentaje: string }[];
  onCaptureScreenshot: () => void;
  isCapturing?: boolean;
}

export const ContractsAndProfilesView: React.FC<ContractsAndProfilesViewProps> = ({
  contracts,
  collaborators,
  academicStats,
  onCaptureScreenshot,
  isCapturing = false,
}) => {
  const [subTab, setSubTab] = useState<"contratos" | "perfiles">("contratos");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedYear, setSelectedYear] = useState<string>("all");
  const [selectedRole, setSelectedRole] = useState<string>("all");
  const [selectedTipo, setSelectedTipo] = useState<string>("all");
  const [activeModalContract, setActiveModalContract] = useState<ContractRecord | null>(null);

  // Extract unique roles
  const roles = useMemo(() => {
    return Array.from(new Set(contracts.map((c) => c.rolCategoria))).sort();
  }, [contracts]);

  // Discipline breakdown
  const disciplineStats = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const c of collaborators) {
      let disc = "Otras Áreas";
      const b = c.profesionBasica.toLowerCase();
      if (b.includes("industrial")) disc = "Ingeniería Industrial";
      else if (b.includes("administrativa")) disc = "Ingeniería Administrativa";
      else if (b.includes("economi") || b.includes("economí")) disc = "Economía";
      else if (b.includes("empresa") || b.includes("administracion")) disc = "Administración de Empresas";
      else if (b.includes("software") || b.includes("sistemas")) disc = "Sistemas & Software";
      else if (b.includes("derecho") || b.includes("abogad")) disc = "Ciencias Jurídicas";
      else if (b.includes("contabil") || b.includes("financier") || b.includes("costos")) disc = "Finanzas & Contabilidad";
      else if (b.includes("archivo") || b.includes("documental")) disc = "Gestión Documental & Archivo";
      else if (b.includes("ambiental")) disc = "Ingeniería Ambiental";

      counts[disc] = (counts[disc] || 0) + 1;
    }

    return Object.keys(counts)
      .map((k) => ({ disciplina: k, count: counts[k], pct: ((counts[k] / collaborators.length) * 100).toFixed(0) }))
      .sort((a, b) => b.count - a.count);
  }, [collaborators]);

  // Filtered contracts
  const filteredContracts = useMemo(() => {
    return contracts.filter((c) => {
      if (selectedYear !== "all" && c.ano !== Number(selectedYear)) return false;
      if (selectedRole !== "all" && c.rolCategoria !== selectedRole) return false;
      if (selectedTipo !== "all" && c.tipo !== selectedTipo) return false;

      if (
        searchQuery &&
        !c.nombre.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !c.objeto.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !c.justificacion.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !c.cargo.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }
      return true;
    });
  }, [contracts, selectedYear, selectedRole, selectedTipo, searchQuery]);

  // CSV export function
  const handleExportCSV = () => {
    const headers = [
      "ID_ORDEN",
      "NOMBRE",
      "GENERO",
      "AÑO",
      "TIPO_ORDEN",
      "EMPRESA",
      "FECHA_INICIO",
      "FECHA_FIN",
      "MESES",
      "VALOR_TOTAL_COP",
      "VALOR_MENSUAL_COP",
      "ROL_CATEGORIA",
      "CARGO",
      "NIVEL_ACADEMICO",
      "PROFESION_BASICA",
      "TOTAL_ACTIVIDADES",
      "OBJETO",
      "JUSTIFICACION",
    ];

    const rows = filteredContracts.map((c) => [
      c.id_orden,
      `"${c.nombre}"`,
      c.genero,
      c.ano,
      c.tipo,
      c.empresa,
      c.fechaInicio,
      c.fechaFin,
      c.mesesDuracion,
      c.valor,
      c.valorMensual,
      `"${c.rolCategoria}"`,
      `"${c.cargo}"`,
      `"${c.nivelAcademico}"`,
      `"${c.profesionBasica}"`,
      c.actividades.length,
      `"${c.objeto.replace(/"/g, '""')}"`,
      `"${c.justificacion.replace(/"/g, '""')}"`,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8,\uFEFF" +
      [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `contratos_cdi_minas_${selectedYear === "all" ? "trienio" : selectedYear}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div id="section-view-contratos" className="space-y-8 py-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header with Screenshot button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#007D8C] uppercase tracking-wide">
            <GraduationCap className="w-4 h-4 text-[#FA9F1B]" />
            <span>Auditoría Contractual & Capital Humano</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#3D4043] tracking-tight mt-1">
            Auditoría de las 97 Órdenes y Perfiles Académicos
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-3xl leading-relaxed mt-1">
            Expediente digital completo con el 100% de las actividades registradas (1,476 obligaciones
            auditadas) y análisis de cualificación del talento humano de la Facultad de Minas.
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

      {/* Subtab navigation */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
        <button
          onClick={() => setSubTab("contratos")}
          className={`px-4 py-2 text-xs font-extrabold rounded-xl transition-all cursor-pointer ${
            subTab === "contratos"
              ? "bg-[#007D8C] text-white shadow-sm"
              : "bg-white text-slate-600 hover:text-[#007D8C] border border-slate-200"
          }`}
        >
          Tabla Auditora de Contratos (97 Órdenes)
        </button>
        <button
          onClick={() => setSubTab("perfiles")}
          className={`px-4 py-2 text-xs font-extrabold rounded-xl transition-all cursor-pointer ${
            subTab === "perfiles"
              ? "bg-[#007D8C] text-white shadow-sm"
              : "bg-white text-slate-600 hover:text-[#007D8C] border border-slate-200"
          }`}
        >
          Perfiles Académicos y Disciplinas (38 Colaboradores)
        </button>
      </div>

      {subTab === "contratos" ? (
        <div className="space-y-5">
          {/* Filter Bar */}
          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Buscar por colaborador, objeto o justificación..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl text-[#3D4043] placeholder-slate-400 focus:outline-none focus:border-[#007D8C] focus:bg-white"
                />
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-[#3D4043] focus:outline-none focus:border-[#007D8C] cursor-pointer"
                >
                  <option value="all">Todas las vigencias</option>
                  <option value="2026">2026 (Actual)</option>
                  <option value="2025">2025</option>
                  <option value="2024">2024</option>
                </select>

                <select
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                  className="text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-[#3D4043] focus:outline-none focus:border-[#007D8C] cursor-pointer"
                >
                  <option value="all">Todos los roles</option>
                  {roles.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>

                <select
                  value={selectedTipo}
                  onChange={(e) => setSelectedTipo(e.target.value)}
                  className="text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-[#3D4043] focus:outline-none focus:border-[#007D8C] cursor-pointer"
                >
                  <option value="all">Tipo de orden</option>
                  <option value="OPS">OPS</option>
                  <option value="OSE">OSE</option>
                </select>

                <button
                  onClick={handleExportCSV}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-[#005A64] bg-teal-50 hover:bg-teal-100 rounded-xl border border-teal-200 transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5 text-[#007D8C]" />
                  <span>Exportar CSV</span>
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
              <span>
                Mostrando <strong className="text-[#3D4043] font-mono-num">{filteredContracts.length}</strong> de{" "}
                <strong className="text-[#3D4043] font-mono-num">{contracts.length}</strong> órdenes contractuales.
              </span>
              <span className="text-emerald-700 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                100% de las órdenes con actividades detalladas
              </span>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-[#3D4043] uppercase tracking-wider text-[11px] font-extrabold">
                  <th className="py-3 px-4">Orden / Colaborador</th>
                  <th className="py-3 px-3">Vigencia</th>
                  <th className="py-3 px-3">Rol / Cargo</th>
                  <th className="py-3 px-3 text-right">Duración</th>
                  <th className="py-3 px-3 text-right">Valor Total</th>
                  <th className="py-3 px-3 text-right">Valor / Mes</th>
                  <th className="py-3 px-3">Actividades</th>
                  <th className="py-3 px-3 text-center">Ver</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {filteredContracts.map((c) => (
                  <tr
                    key={c.id}
                    className="hover:bg-teal-50/40 transition-colors group cursor-pointer"
                    onClick={() => setActiveModalContract(c)}
                  >
                    <td className="py-3 px-4">
                      <div className="space-y-0.5">
                        <span className="font-mono-num text-[10px] text-slate-400 font-bold block">
                          #{c.id_orden} · {c.tipo}
                        </span>
                        <p className="font-extrabold text-[#3D4043] group-hover:text-[#007D8C] transition-colors">
                          {c.nombre}
                        </p>
                      </div>
                    </td>

                    <td className="py-3 px-3">
                      <span className="font-mono-num font-bold text-[#007D8C] bg-teal-50 px-2 py-0.5 rounded-md border border-teal-100 text-[11px]">
                        {c.ano}
                      </span>
                    </td>

                    <td className="py-3 px-3">
                      <div className="space-y-0.5">
                        <span className="font-bold text-[#3D4043] block">{c.cargo}</span>
                        <span className="text-[10px] text-slate-500 block">{c.rolCategoria}</span>
                      </div>
                    </td>

                    <td className="py-3 px-3 text-right font-mono-num tabular-nums text-slate-600">
                      {c.mesesDuracion} meses
                      <span className="text-[10px] text-slate-400 block">
                        {c.fechaInicio.slice(5)} a {c.fechaFin.slice(5)}
                      </span>
                    </td>

                    <td className="py-3 px-3 text-right font-mono-num font-black text-[#007D8C] tabular-nums">
                      {formatMillions(c.valor)}
                    </td>

                    <td className="py-3 px-3 text-right font-mono-num text-slate-600 tabular-nums">
                      {formatCOP(c.valorMensual)}
                    </td>

                    <td className="py-3 px-3">
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>{c.actividades.length} actividades</span>
                      </span>
                    </td>

                    <td className="py-3 px-3 text-center">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveModalContract(c);
                        }}
                        className="p-1.5 rounded-lg bg-slate-100 hover:bg-[#007D8C] hover:text-white text-slate-600 transition-colors cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* Academic Profiles & Capital Humano Subtab */
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4 border-t-4 border-t-[#007D8C]">
              <div className="border-b border-slate-100 pb-2">
                <h3 className="text-xs font-extrabold text-[#3D4043] uppercase tracking-wider flex items-center gap-2">
                  <Award className="w-4 h-4 text-[#007D8C]" />
                  <span>Nivel de Formación del Sistema</span>
                </h3>
              </div>
              <div className="space-y-3">
                {academicStats.map((item) => (
                  <div key={item.nivel} className="space-y-1">
                    <div className="flex items-center justify-between text-xs font-semibold">
                      <span className="text-[#3D4043]">{item.nivel}</span>
                      <span className="font-mono-num text-slate-500">
                        {item.contratos} ({item.porcentaje}%)
                      </span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#007D8C] rounded-full transition-all duration-500"
                        style={{ width: `${item.porcentaje}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4 border-t-4 border-t-[#FA9F1B]">
              <div className="border-b border-slate-100 pb-2">
                <h3 className="text-xs font-extrabold text-[#3D4043] uppercase tracking-wider flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-[#FA9F1B]" />
                  <span>Disciplinas Predominantes</span>
                </h3>
              </div>
              <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                {disciplineStats.map((d) => (
                  <div key={d.disciplina} className="flex items-center justify-between text-xs py-1.5 border-b border-slate-100">
                    <span className="text-[#3D4043] font-medium">{d.disciplina}</span>
                    <span className="font-mono-num font-bold text-[#FA9F1B]">
                      {d.count} ({d.pct}%)
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4 border-t-4 border-t-[#005A64]">
              <div className="border-b border-slate-100 pb-2">
                <h3 className="text-xs font-extrabold text-[#3D4043] uppercase tracking-wider flex items-center gap-2">
                  <Users className="w-4 h-4 text-[#005A64]" />
                  <span>Calificación del Talento</span>
                </h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                El 78% del equipo del CDI ostenta títulos universitarios de profesional, especialista
                y magíster en ramas como <strong>Ingeniería Industrial, Políticas Públicas, Derecho y Finanzas</strong>.
                Esta sólida formación permite una interacción con alta credibilidad ante docentes, directores de departamento y entes financiadores externos.
              </p>
            </div>
          </div>

          {/* Roster of 38 collaborators */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {collaborators.map((c) => (
              <div
                key={c.nombre}
                className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-[#007D8C] transition-all space-y-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-extrabold text-[#007D8C] uppercase tracking-wide block">
                      {c.rolCategoria}
                    </span>
                    <h4 className="text-xs font-black text-[#3D4043]">{c.nombre}</h4>
                    <p className="text-[11px] text-slate-600 font-medium">{c.cargo}</p>
                  </div>
                  <span className="text-[10px] font-mono-num font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md">
                    {c.nivelAcademico}
                  </span>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 text-[11px] text-slate-600 space-y-1">
                  <div>
                    <span className="text-slate-400 block text-[9px] uppercase font-bold">Profesión:</span>
                    <span className="font-semibold text-slate-800">{c.profesionBasica}</span>
                  </div>
                  {c.profesionPosgrado && (
                    <div>
                      <span className="text-[#007D8C] block text-[9px] uppercase font-bold">Posgrado:</span>
                      <span className="font-semibold text-[#007D8C]">{c.profesionPosgrado}</span>
                    </div>
                  )}
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span>Años: {c.anosActivo.join(", ")}</span>
                  <span className="font-mono-num font-extrabold text-[#007D8C]">
                    {formatMillions(c.totalInvertido)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Contract Detail Modal */}
      {activeModalContract && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto no-print">
          <div className="w-full max-w-3xl bg-white border border-slate-300 rounded-3xl shadow-2xl p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between border-b border-slate-200 pb-4">
              <div>
                <span className="text-xs font-mono-num font-bold text-[#007D8C] uppercase">
                  ORDEN #{activeModalContract.id_orden} · {activeModalContract.tipo} · VIGENCIA {activeModalContract.ano}
                </span>
                <h3 className="text-xl font-black text-[#3D4043] mt-1">
                  {activeModalContract.nombre}
                </h3>
                <p className="text-xs text-slate-500">
                  {activeModalContract.cargo} · {activeModalContract.rolCategoria}
                </p>
              </div>

              <button
                onClick={() => setActiveModalContract(null)}
                className="text-slate-400 hover:text-slate-700 px-3 py-1 text-xs font-bold rounded-lg bg-slate-100 hover:bg-slate-200 cursor-pointer"
              >
                Cerrar
              </button>
            </div>

            {/* Financial Info */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs">
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Valor Total:</span>
                <span className="font-mono-num font-extrabold text-[#007D8C] text-sm">
                  {formatCOP(activeModalContract.valor)}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Honorario Mensual:</span>
                <span className="font-mono-num font-bold text-[#3D4043] text-sm">
                  {formatCOP(activeModalContract.valorMensual)}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Plazo:</span>
                <span className="font-mono-num text-slate-700">
                  {activeModalContract.mesesDuracion} meses ({activeModalContract.fechaInicio} a {activeModalContract.fechaFin})
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Empresa:</span>
                <span className="font-mono-num text-slate-700">
                  {activeModalContract.empresa} ({activeModalContract.tipoValor})
                </span>
              </div>
            </div>

            {/* Objeto */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="text-xs font-extrabold text-[#3D4043] flex items-center gap-1.5 uppercase">
                <FileText className="w-3.5 h-3.5 text-[#007D8C]" />
                Objeto Contractual:
              </span>
              <p className="text-xs text-slate-700 leading-relaxed font-medium">
                {activeModalContract.objeto}
              </p>
            </div>

            {/* Justificación */}
            <div className="p-4 rounded-2xl bg-teal-50/50 border border-teal-200 space-y-1">
              <span className="text-xs font-extrabold text-[#005A64] uppercase">
                Justificación de la Contratación:
              </span>
              <p className="text-xs text-slate-700 leading-relaxed font-medium">
                {activeModalContract.justificacion}
              </p>
            </div>

            {/* Actividades */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-black text-[#3D4043] flex items-center gap-1.5 uppercase">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Actividades Registradas ({activeModalContract.actividades.length}):</span>
                </span>
              </div>

              <div className="space-y-1.5 max-h-60 overflow-y-auto pr-2">
                {activeModalContract.actividades.map((act, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-2.5 text-xs text-slate-700 leading-relaxed"
                  >
                    <span className="font-mono-num text-[#007D8C] font-bold shrink-0">{idx + 1}.</span>
                    <span>{act}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setActiveModalContract(null)}
                className="px-5 py-2 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl cursor-pointer"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
