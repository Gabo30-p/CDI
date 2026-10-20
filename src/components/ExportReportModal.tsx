import React, { useState } from "react";
import {
  Printer,
  Copy,
  Check,
  X,
  FileText,
  Building2,
  Award,
  ShieldCheck,
  Coins,
} from "lucide-react";
import { DECANATURA_STRATEGIC_DEFENSE } from "../data/categoriesData";
import { CollaboratorProfile, formatCOP, formatMillions } from "../data/collaboratorAnalysis";

interface ExportReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  collaborators: CollaboratorProfile[];
  totalInvestment: number;
}

export const ExportReportModal: React.FC<ExportReportModalProps> = ({
  isOpen,
  onClose,
  collaborators,
  totalInvestment,
}) => {
  const [copied, setCopied] = useState<boolean>(false);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const generateMarkdownReport = () => {
    let md = `# INFORME ESTRATÉGICO PARA LA DECANATURA - FACULTAD DE MINAS\n`;
    md += `## SUSTENTACIÓN Y DEFENSA DEL CENTRO DE DESARROLLO E INNOVACIÓN (CDI)\n`;
    md += `**Universidad Nacional de Colombia · Sede Medellín**\n\n`;
    md += `*Lema: Trabajo y Rectitud*\n\n`;

    md += `### 1. RESUMEN EJECUTIVO\n`;
    md += `- **Inversión Total Trienal (2024 - 2026):** ${formatCOP(totalInvestment)}\n`;
    md += `- **Equipo de Talento Humano:** 38 colaboradores con órdenes en proyectos 3015 y 3065 (78% profesionales y posgrados)\n`;
    md += `- **Órdenes Contractuales Auditadas:** 97 contratos (100% con actividades completamente registradas)\n`;
    md += `- **Hito Tecnológico 2026:** Desarrollo e implementación del aplicativo de soporte para productos y resultados de proyectos.\n\n`;

    md += `### 2. LOS 5 PILARES DE JUSTIFICACIÓN ANTE LA DECANATURA\n`;
    DECANATURA_STRATEGIC_DEFENSE.pilares.forEach((p) => {
      md += `#### ${p.pilar}\n${p.argumento}\n\n`;
    });

    md += `### 3. SUSTENTACIÓN DE LOS INCREMENTOS CONTRACTUALES (2024 - 2026)\n`;
    DECANATURA_STRATEGIC_DEFENSE.losCuatroMotoresDelIncremento.forEach((m) => {
      md += `#### ${m.motor}\n${m.descripcion}\n\n`;
    });

    md += `### 4. RELACIÓN DEL TALENTO HUMANO Y LÍNEA ESTRATÉGICA\n`;
    md += `| Nombre | Nivel Académico | Rol / Cargo | Años Activo | Inversión 3 Años |\n`;
    md += `| :--- | :--- | :--- | :--- | :--- |\n`;
    collaborators.forEach((c) => {
      md += `| ${c.nombre} | ${c.nivelAcademico} | ${c.cargo} | ${c.anosActivo.join(", ")} | ${formatCOP(c.totalInvertido)} |\n`;
    });

    return md;
  };

  const handleCopyMarkdown = () => {
    const text = generateMarkdownReport();
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div className="w-full max-w-4xl bg-white border border-slate-300 rounded-3xl shadow-2xl p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto print:bg-white print:text-black print:border-none print:shadow-none print:max-w-none print:max-h-none print:p-0">
        {/* Modal Top Bar (hidden in print) */}
        <div className="flex items-start justify-between border-b border-slate-200 pb-4 print:hidden">
          <div className="space-y-1">
            <span className="text-xs font-bold text-[#007D8C] uppercase tracking-wide flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#FA9F1B]" />
              Documento Oficial para Decanatura
            </span>
            <h3 className="text-xl font-black text-[#3D4043]">
              Informe Estratégico de Justificación del Sistema CDI
            </h3>
            <p className="text-xs text-slate-500">
              Formateado para impresión oficial, PDF o memorando ante el Consejo de Facultad
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyMarkdown}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
              <span>{copied ? "Copiado" : "Copiar Texto"}</span>
            </button>

            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-extrabold text-slate-900 bg-[#FA9F1B] hover:bg-[#F5A122] rounded-xl transition-colors cursor-pointer shadow-sm"
            >
              <Printer className="w-3.5 h-3.5 text-slate-900" />
              <span>Imprimir / Guardar PDF</span>
            </button>

            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-700 p-1.5 rounded-lg bg-slate-100 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Printable Document Body */}
        <div className="space-y-8 text-[#3D4043] print:text-black">
          {/* Institutional Letterhead */}
          <div className="border-b-2 border-[#007D8C] print:border-black pb-4 space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono-num font-extrabold text-[#007D8C] print:text-black uppercase">
                UNIVERSIDAD NACIONAL DE COLOMBIA · SEDE MEDELLÍN
              </span>
              <span className="text-xs font-bold text-[#FA9F1B] print:text-black uppercase tracking-wider">
                FACULTAD DE MINAS · TRABAJO Y RECTITUD
              </span>
            </div>
            <h1 className="text-2xl font-black tracking-tight text-[#3D4043] print:text-black">
              INFORME EJECUTIVO DE JUSTIFICACIÓN Y DEFENSA DEL SISTEMA CDI
            </h1>
            <p className="text-xs text-slate-500 print:text-gray-700">
              Dirigido a: Decanatura de la Facultad de Minas · Consejo de Facultad
            </p>
          </div>

          {/* Triennial Summary */}
          <section className="space-y-3">
            <h2 className="text-sm font-black text-[#007D8C] print:text-black uppercase tracking-wider">
              1. Resumen Ejecutivo del Trienio (2024 - 2026)
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 print:bg-gray-100 p-4 rounded-2xl border border-slate-200 text-xs">
              <div>
                <span className="text-slate-500 block text-[10px] uppercase font-bold">Inversión 3 Años:</span>
                <span className="font-mono-num font-black text-[#007D8C] print:text-black text-sm">
                  {formatMillions(totalInvestment)}
                </span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px] uppercase font-bold">Órdenes Contractuales:</span>
                <span className="font-mono-num font-black text-[#3D4043] print:text-black text-sm">
                  97 Contratos OPS/OSE
                </span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px] uppercase font-bold">Equipo de Talento:</span>
                <span className="font-mono-num font-black text-[#3D4043] print:text-black text-sm">
                  38 Colaboradores
                </span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px] uppercase font-bold">Actividades Auditadas:</span>
                <span className="font-mono-num font-black text-[#007D8C] print:text-black text-sm">
                  1,476 Obligaciones
                </span>
              </div>
            </div>
          </section>

          {/* 4 Increase Drivers */}
          <section className="space-y-3">
            <h2 className="text-sm font-black text-[#007D8C] print:text-black uppercase tracking-wider">
              2. Sustentación Técnica de los Incrementos Contractuales
            </h2>
            <div className="space-y-2.5 text-xs text-slate-700">
              {DECANATURA_STRATEGIC_DEFENSE.losCuatroMotoresDelIncremento.map((m, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                  <h4 className="font-black text-[#3D4043] mb-1">{m.motor}</h4>
                  <p className="leading-relaxed text-slate-600">{m.descripcion}</p>
                </div>
              ))}
            </div>
          </section>

          {/* 5 Pillars */}
          <section className="space-y-3">
            <h2 className="text-sm font-black text-[#007D8C] print:text-black uppercase tracking-wider">
              3. ¿Por qué el CDI no puede desaparecer? (Pilares Misionales)
            </h2>
            <div className="space-y-2 text-xs text-slate-700">
              {DECANATURA_STRATEGIC_DEFENSE.pilares.map((p, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                  <h4 className="font-black text-[#3D4043] mb-1">{p.pilar}</h4>
                  <p className="leading-relaxed text-slate-600">{p.argumento}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Collaborator Roster */}
          <section className="space-y-3">
            <h2 className="text-sm font-black text-[#007D8C] print:text-black uppercase tracking-wider">
              4. Relación Oficial del Personal con Órdenes Contractuales
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b-2 border-slate-300 text-slate-600 text-[10px] uppercase font-bold">
                    <th className="py-2 px-2">Colaborador</th>
                    <th className="py-2 px-2">Formación</th>
                    <th className="py-2 px-2">Línea Operativa / Cargo</th>
                    <th className="py-2 px-2">Vigencias</th>
                    <th className="py-2 px-2 text-right">Inversión 3 Años</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-slate-700">
                  {collaborators.map((c) => (
                    <tr key={c.nombre}>
                      <td className="py-2 px-2 font-bold text-[#3D4043]">{c.nombre}</td>
                      <td className="py-2 px-2 text-slate-500">{c.nivelAcademico}</td>
                      <td className="py-2 px-2">
                        <span className="font-semibold text-[#007D8C]">{c.cargo}</span>
                      </td>
                      <td className="py-2 px-2 font-mono-num text-[11px]">{c.anosActivo.join(", ")}</td>
                      <td className="py-2 px-2 text-right font-mono-num font-black text-[#3D4043]">
                        {formatMillions(c.totalInvertido)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Signatures */}
          <div className="pt-8 border-t-2 border-slate-300 grid grid-cols-2 gap-8 text-xs text-slate-500">
            <div>
              <p className="font-extrabold text-[#3D4043]">Coordinación General CDI</p>
              <p>Centro de Desarrollo e Innovación</p>
              <p>Facultad de Minas · UNAL Medellín</p>
            </div>
            <div className="text-right">
              <p className="font-extrabold text-[#3D4043]">Decanatura</p>
              <p>Facultad de Minas · Sede Medellín</p>
              <p>Octubre 2026</p>
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-200 print:hidden">
          <span className="text-xs text-slate-500">
            Generado conforme a los registros de contratación del CDI (Proyectos 3015 y 3065)
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl cursor-pointer"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
