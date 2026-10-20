import React, { useState, useMemo } from "react";
import {
  Search,
  Filter,
  Download,
  Calendar,
  FileText,
  CheckCircle2,
  AlertCircle,
  ChevronRight,
  Eye,
  Building2,
  Clock,
  Layers,
  Edit3,
} from "lucide-react";
import { ContractRecord } from "../data/contractsData";
import { formatCOP, formatMillions } from "../data/collaboratorAnalysis";

interface ContractsTableViewProps {
  contracts: ContractRecord[];
  onOpenEnrichment: () => void;
}

export const ContractsTableView: React.FC<ContractsTableViewProps> = ({
  contracts,
  onOpenEnrichment,
}) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedYear, setSelectedYear] = useState<string>("all");
  const [selectedRole, setSelectedRole] = useState<string>("all");
  const [selectedTipo, setSelectedTipo] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<"all" | "with" | "without">("all");
  const [activeModalContract, setActiveModalContract] = useState<ContractRecord | null>(null);

  // Extract unique roles
  const roles = useMemo(() => {
    return Array.from(new Set(contracts.map((c) => c.rolCategoria))).sort();
  }, [contracts]);

  // Filtered contracts
  const filteredContracts = useMemo(() => {
    return contracts.filter((c) => {
      if (selectedYear !== "all" && c.ano !== Number(selectedYear)) return false;
      if (selectedRole !== "all" && c.rolCategoria !== selectedRole) return false;
      if (selectedTipo !== "all" && c.tipo !== selectedTipo) return false;
      if (selectedStatus === "with" && !c.tieneActividades) return false;
      if (selectedStatus === "without" && c.tieneActividades) return false;

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
  }, [contracts, selectedYear, selectedRole, selectedTipo, selectedStatus, searchQuery]);

  // CSV export function
  const handleExportCSV = () => {
    const headers = [
      "ID",
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
      "TIENE_ACTIVIDADES",
      "CANTIDAD_ACTIVIDADES",
      "OBJETO",
      "JUSTIFICACION",
    ];

    const rows = filteredContracts.map((c) => [
      c.id,
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
      c.tieneActividades ? "SI" : "NO",
      c.actividades ? c.actividades.length : 0,
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
    <div className="space-y-6 py-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="border-b border-slate-800 pb-5 space-y-2">
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-wide">
          <Layers className="w-4 h-4" />
          <span>Libro Mayor Contractual</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Auditoría de las 97 Órdenes Contractuales (2024 - 2026)
        </h1>
        <p className="text-sm text-slate-300 max-w-3xl leading-relaxed">
          Registro detallado de cada orden OPS y OSE suscrita en los proyectos 3015 y 3065 de la Facultad
          de Minas. Incluye el seguimiento transparente de las 20 órdenes en fase de consolidación técnica
          para el Entregable 1.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
            <input
              type="text"
              placeholder="Buscar por colaborador, objeto o justificación..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-1.5 text-xs bg-slate-950 border border-slate-800 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {/* Year selector */}
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="text-xs bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-slate-200 focus:outline-none focus:border-emerald-500 cursor-pointer"
            >
              <option value="all">Todos los años</option>
              <option value="2026">2026 (Actual)</option>
              <option value="2025">2025</option>
              <option value="2024">2024</option>
            </select>

            {/* Role selector */}
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="text-xs bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-slate-200 focus:outline-none focus:border-emerald-500 cursor-pointer"
            >
              <option value="all">Todos los roles</option>
              {roles.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>

            {/* Contract type */}
            <select
              value={selectedTipo}
              onChange={(e) => setSelectedTipo(e.target.value)}
              className="text-xs bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-slate-200 focus:outline-none focus:border-emerald-500 cursor-pointer"
            >
              <option value="all">Tipo de orden</option>
              <option value="OPS">OPS (Prestación de Servicios)</option>
              <option value="OSE">OSE (Servicios Especiales)</option>
            </select>

            {/* Activities status filter */}
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value as any)}
              className="text-xs bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-slate-200 focus:outline-none focus:border-emerald-500 cursor-pointer"
            >
              <option value="all">Estado actividades: Todos</option>
              <option value="with">Con actividades detalladas</option>
              <option value="without">En consolidación (20 órdenes)</option>
            </select>

            {/* CSV export button */}
            <button
              onClick={handleExportCSV}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-lg border border-slate-700 transition-colors whitespace-nowrap cursor-pointer"
              title="Descargar datos en CSV"
            >
              <Download className="w-3.5 h-3.5 text-slate-400" />
              <span>Exportar CSV</span>
            </button>
          </div>
        </div>

        {/* Informative banner on the 20 orders without activities */}
        <div className="flex items-center justify-between gap-3 p-3 rounded-lg bg-slate-950/80 border border-slate-800 text-xs">
          <div className="flex items-center gap-2 text-slate-400">
            <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
            <span>
              Mostrando <strong className="text-white font-mono">{filteredContracts.length}</strong> de{" "}
              <strong className="text-white font-mono">{contracts.length}</strong> contratos.
              Las 20 órdenes sin actividades están registradas con su objeto, valor y justificación completa.
            </span>
          </div>

          <button
            onClick={onOpenEnrichment}
            className="text-emerald-400 hover:text-emerald-300 font-semibold inline-flex items-center gap-1 whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Completar en 2º Entregable</span>
          </button>
        </div>
      </div>

      {/* Main Table */}
      <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-900 shadow-sm">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-slate-800 bg-slate-950/60 text-slate-400 uppercase tracking-wider text-[11px] font-semibold">
              <th className="py-3 px-4">Colaborador / Perfil</th>
              <th className="py-3 px-3">Vigencia</th>
              <th className="py-3 px-3">Tipo / Proyecto</th>
              <th className="py-3 px-3 text-right">Duración</th>
              <th className="py-3 px-3 text-right">Valor Total</th>
              <th className="py-3 px-3 text-right">Valor / Mes</th>
              <th className="py-3 px-3">Actividades</th>
              <th className="py-3 px-3 text-center">Detalle</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 text-slate-300">
            {filteredContracts.map((c) => (
              <tr
                key={c.id}
                className="hover:bg-slate-800/40 transition-colors group cursor-pointer"
                onClick={() => setActiveModalContract(c)}
              >
                <td className="py-3 px-4">
                  <div className="space-y-0.5">
                    <p className="font-bold text-white group-hover:text-emerald-400 transition-colors">
                      {c.nombre}
                    </p>
                    <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                      <span>{c.cargo}</span>
                      <span>·</span>
                      <span className="text-slate-500">{c.nivelAcademico}</span>
                    </div>
                  </div>
                </td>

                <td className="py-3 px-3">
                  <span className="font-mono font-bold text-slate-200 bg-slate-950 px-2 py-0.5 rounded border border-slate-800 text-[11px]">
                    {c.ano}
                  </span>
                </td>

                <td className="py-3 px-3">
                  <div className="space-y-0.5">
                    <span className="font-mono text-slate-300 font-semibold">{c.tipo}</span>
                    <span className="text-[10px] text-slate-500 block font-mono">
                      Empresa {c.empresa}
                    </span>
                  </div>
                </td>

                <td className="py-3 px-3 text-right font-mono tabular-nums text-slate-300">
                  {c.mesesDuracion} meses
                  <span className="text-[10px] text-slate-500 block">
                    {c.fechaInicio.slice(0, 5)} - {c.fechaFin.slice(0, 5)}
                  </span>
                </td>

                <td className="py-3 px-3 text-right font-mono font-bold text-white tabular-nums">
                  {formatMillions(c.valor)}
                </td>

                <td className="py-3 px-3 text-right font-mono text-slate-400 tabular-nums">
                  {formatCOP(c.valorMensual)}
                </td>

                <td className="py-3 px-3">
                  {c.tieneActividades ? (
                    <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-400">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{c.actividades.length} actividades</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[11px] font-medium text-amber-400/90">
                      <Clock className="w-3.5 h-3.5" />
                      <span>En consolidación (E1)</span>
                    </span>
                  )}
                </td>

                <td className="py-3 px-3 text-center">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveModalContract(c);
                    }}
                    className="p-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition-colors cursor-pointer"
                    title="Ver expediente completo"
                  >
                    <Eye className="w-3.5 h-3.5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Contract Detail Drawer / Modal */}
      {activeModalContract && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="w-full max-w-3xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-start justify-between border-b border-slate-800 pb-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
                  <span>EXPEDIENTE {activeModalContract.id}</span>
                  <span>·</span>
                  <span>ORDEN {activeModalContract.tipo}</span>
                  <span>·</span>
                  <span>VIGENCIA {activeModalContract.ano}</span>
                </div>
                <h3 className="text-xl font-bold text-white">
                  {activeModalContract.nombre}
                </h3>
                <p className="text-xs text-slate-400">
                  {activeModalContract.cargo} · {activeModalContract.rolCategoria}
                </p>
              </div>

              <button
                onClick={() => setActiveModalContract(null)}
                className="text-slate-400 hover:text-white px-2.5 py-1 text-xs rounded-lg bg-slate-800 hover:bg-slate-700 cursor-pointer"
              >
                Cerrar
              </button>
            </div>

            {/* Financial & Time Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs">
              <div>
                <span className="text-slate-500 block text-[10px] uppercase">Valor Total:</span>
                <span className="font-mono font-bold text-emerald-400 text-sm">
                  {formatCOP(activeModalContract.valor)}
                </span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px] uppercase">Honorario Mensual:</span>
                <span className="font-mono font-bold text-white text-sm">
                  {formatCOP(activeModalContract.valorMensual)}
                </span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px] uppercase">Plazo de Ejecución:</span>
                <span className="font-mono text-slate-300">
                  {activeModalContract.mesesDuracion} meses ({activeModalContract.fechaInicio} a {activeModalContract.fechaFin})
                </span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px] uppercase">Empresa / Fondo:</span>
                <span className="font-mono text-slate-300">
                  {activeModalContract.empresa} ({activeModalContract.tipoValor})
                </span>
              </div>
            </div>

            {/* Objeto Contractual */}
            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1.5">
              <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-blue-400" />
                Objeto Contractual:
              </span>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {activeModalContract.objeto}
              </p>
            </div>

            {/* Justificación Registrada */}
            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1.5">
              <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-emerald-400" />
                Justificación de la Contratación:
              </span>
              <p className="text-xs text-slate-300 leading-relaxed">
                {activeModalContract.justificacion}
              </p>
            </div>

            {/* Actividades del Contrato */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-white flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>
                    Obligaciones y Actividades Específicas ({activeModalContract.actividades.length}):
                  </span>
                </span>
                {!activeModalContract.tieneActividades && (
                  <span className="text-[11px] text-amber-400 font-medium bg-amber-500/10 px-2 py-0.5 rounded">
                    En fase de consolidación técnica (Entregable 1)
                  </span>
                )}
              </div>

              {activeModalContract.tieneActividades ? (
                <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
                  {activeModalContract.actividades.map((act, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-lg bg-slate-950 border border-slate-800/80 flex items-start gap-2.5 text-xs text-slate-300 leading-relaxed"
                    >
                      <span className="font-mono text-emerald-400 font-bold shrink-0">{idx + 1}.</span>
                      <span>{act}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-6 rounded-xl bg-slate-950 border border-slate-800 text-center space-y-2">
                  <p className="text-xs text-slate-400">
                    Esta orden contractual hace parte de las 20 órdenes que se completarán en el segundo
                    entregable cuando cargue el archivo final. El objeto y justificación están completamente
                    registrados.
                  </p>
                  <button
                    onClick={() => {
                      setActiveModalContract(null);
                      onOpenEnrichment();
                    }}
                    className="inline-flex items-center gap-1.5 text-xs text-emerald-400 hover:text-emerald-300 font-semibold cursor-pointer"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Agregar actividades a esta orden ahora</span>
                  </button>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between pt-3 border-t border-slate-800">
              <span className="text-xs text-slate-500">
                Página {activeModalContract.page} del expediente original depurado
              </span>
              <button
                onClick={() => setActiveModalContract(null)}
                className="px-4 py-2 text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 rounded-lg cursor-pointer transition-colors"
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
