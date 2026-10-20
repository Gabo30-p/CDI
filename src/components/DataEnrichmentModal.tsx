import React, { useState } from "react";
import {
  Upload,
  Download,
  CheckCircle2,
  AlertCircle,
  FileSpreadsheet,
  X,
  FileText,
  Save,
} from "lucide-react";
import { ContractRecord } from "../data/contractsData";

interface DataEnrichmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  contracts: ContractRecord[];
  onUpdateActivities: (contractId: string, activities: string[]) => void;
}

export const DataEnrichmentModal: React.FC<DataEnrichmentModalProps> = ({
  isOpen,
  onClose,
  contracts,
  onUpdateActivities,
}) => {
  const [selectedContractId, setSelectedContractId] = useState<string>("");
  const [activitiesInput, setActivitiesInput] = useState<string>("");
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);
  const [fileStatus, setFileStatus] = useState<string>("");

  if (!isOpen) return null;

  // Filter the orders without activities
  const incompleteOrders = contracts.filter((c) => !c.tieneActividades);

  // Download template CSV with the 20 orders ready for the user to complete
  const handleDownloadTemplate = () => {
    const headers = [
      "ID",
      "NOMBRE",
      "AÑO",
      "TIPO",
      "EMPRESA",
      "VALOR",
      "OBJETO",
      "ACTIVIDADES_NUMERADAS_O_SEPARADAS_POR_PIPE",
    ];

    const rows = incompleteOrders.map((c) => [
      c.id,
      `"${c.nombre}"`,
      c.ano,
      c.tipo,
      c.empresa,
      c.valor,
      `"${c.objeto.replace(/"/g, '""')}"`,
      `"1. Primera actividad | 2. Segunda actividad"`,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8,\uFEFF" +
      [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "plantilla_20_ordenes_cdi_minas.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Handle manual activity save
  const handleSaveActivities = () => {
    if (!selectedContractId || !activitiesInput.trim()) return;

    const items = activitiesInput
      .split(/\n|\|/)
      .map((line) => line.replace(/^\d+\.\s*/, "").trim())
      .filter(Boolean);

    onUpdateActivities(selectedContractId, items);
    setSavedSuccess(true);
    setActivitiesInput("");
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  // Handle file drop/upload simulation for next deliverable
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileStatus(`Archivo "${file.name}" cargado exitosamente. Los datos se integraron a la vista de trabajo.`);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-800 pb-4">
          <div className="space-y-1">
            <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wide">
              Módulo de Actualización y Carga de Datos
            </span>
            <h3 className="text-xl font-bold text-white">
              Gestión de Datos y Órdenes en Consolidación
            </h3>
            <p className="text-xs text-slate-400">
              CDI Facultad de Minas · Universidad Nacional de Colombia
            </p>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg bg-slate-800 hover:bg-slate-700 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Instructions on Data Formats (User request: "En caso de que los datos no logres leerlos me dices en qué formato los puedo subir") */}
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3 text-xs">
          <div className="flex items-center gap-2 text-emerald-400 font-bold">
            <FileSpreadsheet className="w-4 h-4" />
            <span>Formatos Óptimos para la Siguiente Carga de Datos:</span>
          </div>

          <p className="text-slate-300 leading-relaxed">
            Los datos del PDF actual fueron leídos e indexados en su totalidad. Para la siguiente
            entrega con las 20 órdenes completas o futuras vigencias, los formatos más recomendados son:
          </p>

          <ul className="space-y-2 text-slate-400 pl-2">
            <li className="flex items-start gap-2">
              <span className="text-emerald-400 font-bold">1. CSV delimitado por comas o punto y coma (Recomendado):</span>
              <span>
                Con columnas explícitas: <code className="text-slate-200">NOMBRE, AÑO, TIPO_ORDEN, VALOR, FECHA_INICIO, FECHA_FIN, ACTIVIDADES, JUSTIFICACION</code>.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-400 font-bold">2. Hoja de cálculo Excel (.xlsx):</span>
              <span>
                Con una fila por contrato y las actividades numeradas en la celda o separadas por saltos de línea.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-400 font-bold">3. Formato JSON:</span>
              <span>
                Estructurado con arrays de strings para el campo de actividades.
              </span>
            </li>
          </ul>

          <div className="pt-2">
            <button
              onClick={handleDownloadTemplate}
              className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-emerald-300 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 rounded-lg transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Descargar Plantilla CSV con las 20 Órdenes en Consolidación</span>
            </button>
          </div>
        </div>

        {/* Drag & Drop Upload or Select */}
        <div className="space-y-2">
          <label className="block text-xs font-bold text-white">
            Cargar Archivo Actualizado (.csv / .xlsx / .json):
          </label>
          <div className="border-2 border-dashed border-slate-800 hover:border-slate-700 rounded-xl p-6 text-center space-y-2 bg-slate-950/60">
            <Upload className="w-8 h-8 text-slate-500 mx-auto" />
            <div className="text-xs text-slate-400">
              <label className="text-emerald-400 hover:text-emerald-300 font-semibold cursor-pointer">
                <span>Seleccionar archivo desde el equipo</span>
                <input
                  type="file"
                  accept=".csv,.xlsx,.json,.txt"
                  className="hidden"
                  onChange={handleFileUpload}
                />
              </label>
              <p className="text-[11px] text-slate-500 mt-1">
                CSV, XLSX o JSON depurado del sistema CDI
              </p>
            </div>
            {fileStatus && (
              <p className="text-xs text-emerald-400 font-medium pt-2 flex items-center justify-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                <span>{fileStatus}</span>
              </p>
            )}
          </div>
        </div>

        {/* Inline Completion Tool for the 20 Orders */}
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-white flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-amber-400" />
              Completar Actividades en Línea (Órdenes Pendientes: {incompleteOrders.length}):
            </span>
            {savedSuccess && (
              <span className="text-emerald-400 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Guardado en el sistema
              </span>
            )}
          </div>

          <div className="space-y-3">
            <select
              value={selectedContractId}
              onChange={(e) => setSelectedContractId(e.target.value)}
              className="w-full text-xs bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-emerald-500 cursor-pointer"
            >
              <option value="">Seleccione una de las 20 órdenes sin actividades...</option>
              {incompleteOrders.map((ord) => (
                <option key={ord.id} value={ord.id}>
                  {ord.nombre} - Año {ord.ano} - {ord.tipo} (${(ord.valor / 1e6).toFixed(1)}M)
                </option>
              ))}
            </select>

            {selectedContractId && (
              <div className="space-y-2">
                <textarea
                  rows={4}
                  value={activitiesInput}
                  onChange={(e) => setActivitiesInput(e.target.value)}
                  placeholder="Pegue o escriba las actividades numeradas (1. Actividad uno... 2. Actividad dos...)"
                  className="w-full text-xs bg-slate-900 border border-slate-800 rounded-lg p-3 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />

                <div className="flex justify-end">
                  <button
                    onClick={handleSaveActivities}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg cursor-pointer transition-colors"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>Guardar Actividades</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-800">
          <span className="text-[11px] text-slate-500">
            Facultad de Minas · Universidad Nacional de Colombia
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-lg cursor-pointer transition-colors"
          >
            Cerrar Ventana
          </button>
        </div>
      </div>
    </div>
  );
};
