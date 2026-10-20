import React, { useState } from "react";
import {
  Briefcase,
  FileCheck,
  Archive,
  Target,
  BarChart3,
  Scale,
  Users,
  CheckCircle2,
  AlertOctagon,
  Camera,
  Sparkles,
} from "lucide-react";
import { ROLE_CATEGORIES, RoleCategoryInfo } from "../data/categoriesData";
import { CollaboratorProfile, formatMillions } from "../data/collaboratorAnalysis";

interface RolesAndActivitiesViewProps {
  collaborators: CollaboratorProfile[];
  onCaptureScreenshot: () => void;
  isCapturing?: boolean;
}

export const RolesAndActivitiesView: React.FC<RolesAndActivitiesViewProps> = ({
  collaborators,
  onCaptureScreenshot,
  isCapturing = false,
}) => {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("proyectos");

  const iconMap: Record<string, React.ReactNode> = {
    Briefcase: <Briefcase className="w-5 h-5 text-[#007D8C]" />,
    Target: <Target className="w-5 h-5 text-[#FA9F1B]" />,
    BarChart3: <BarChart3 className="w-5 h-5 text-[#005A64]" />,
    FileCheck: <FileCheck className="w-5 h-5 text-slate-700" />,
    Archive: <Archive className="w-5 h-5 text-amber-700" />,
    Scale: <Scale className="w-5 h-5 text-[#007D8C]" />,
  };

  const activeCategory =
    ROLE_CATEGORIES.find((c) => c.id === selectedCategoryId) || ROLE_CATEGORIES[0];

  // Collaborators in this category
  const categoryCollaborators = collaborators.filter((c) => {
    if (activeCategory.id === "proyectos") {
      return c.rolCategoria === "Gestión de Proyectos";
    }
    if (activeCategory.id === "oportunidades") {
      return c.rolCategoria === "Gestión de Oportunidades";
    }
    if (activeCategory.id === "evaluacion") {
      return c.rolCategoria === "Gestión de Evaluación e Impacto";
    }
    if (activeCategory.id === "mesa_operativa") {
      return c.rolCategoria === "Mesa Operativa";
    }
    if (activeCategory.id === "archivo") {
      return c.rolCategoria === "Archivo y Gestión Documental";
    }
    if (activeCategory.id === "coordinacion") {
      return c.rolCategoria === "Coordinación y Asesoría Decanatura";
    }
    return false;
  });

  const totalBudgetForCategory = categoryCollaborators.reduce(
    (acc, curr) => acc + curr.totalInvertido,
    0
  );

  return (
    <div id="section-view-roles" className="space-y-8 py-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header with Screenshot button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#007D8C] uppercase tracking-wide">
            <Briefcase className="w-4 h-4 text-[#FA9F1B]" />
            <span>Taxonomía Operativa de la Facultad de Minas</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#3D4043] tracking-tight mt-1">
            Clasificación de Roles y Catálogo de Actividades CDI
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-3xl leading-relaxed mt-1">
            Estructura funcional del Centro de Desarrollo e Innovación: Gestión de Proyectos, Gestión de
            Oportunidades, Gestión de Evaluación e Impacto (con el aplicativo de resultados), Mesa Operativa,
            Archivo y Coordinación General.
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

      {/* Role Navigation Strip (Segmented control) */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {ROLE_CATEGORIES.map((cat) => {
          const isSelected = cat.id === selectedCategoryId;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategoryId(cat.id)}
              className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between gap-2.5 ${
                isSelected
                  ? "bg-white border-[#007D8C] shadow-md ring-2 ring-[#007D8C]/20"
                  : "bg-white border-slate-200 hover:border-slate-300 shadow-sm"
              }`}
            >
              <div className="flex items-center justify-between w-full">
                {iconMap[cat.icono]}
                <span
                  className={`text-[10px] font-mono-num font-bold px-1.5 py-0.5 rounded ${
                    isSelected ? "bg-[#007D8C] text-white" : "bg-slate-100 text-slate-500"
                  }`}
                >
                  {cat.id.slice(0, 3).toUpperCase()}
                </span>
              </div>
              <div>
                <p
                  className={`text-xs font-black leading-tight ${
                    isSelected ? "text-[#007D8C]" : "text-[#3D4043]"
                  }`}
                >
                  {cat.tituloCorto}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Main Category Feature Panel */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-8">
        {/* Category Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              {iconMap[activeCategory.icono]}
              <span className="text-xs font-bold text-[#007D8C] uppercase tracking-wide">
                Línea Estratégica CDI
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-[#3D4043] tracking-tight">
              {activeCategory.nombre}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
              {activeCategory.descripcion}
            </p>
          </div>

          <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200 shrink-0">
            <div>
              <span className="text-[10px] uppercase text-slate-500 font-bold block">Personal con Órdenes:</span>
              <span className="text-xl font-black font-mono-num text-[#3D4043]">
                {categoryCollaborators.length} integrantes
              </span>
            </div>
            <div className="border-l border-slate-200 pl-4">
              <span className="text-[10px] uppercase text-slate-500 font-bold block">Inversión Trienio:</span>
              <span className="text-xl font-black font-mono-num text-[#007D8C]">
                {formatMillions(totalBudgetForCategory)}
              </span>
            </div>
          </div>
        </div>

        {/* Highlight if Gestión de Evaluación e Impacto */}
        {activeCategory.id === "evaluacion" && (
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-[#FA9F1B] shrink-0 mt-0.5" />
            <div className="text-xs text-amber-950 leading-relaxed space-y-1">
              <p className="font-extrabold uppercase tracking-wide">
                Enfoque Tecnológico 2026: Aplicativo de Productos y Resultados de Proyectos
              </p>
              <p>
                En cumplimiento con la directriz estratégica del CDI, el personal contratado en 2026 en este frente
                se ha enfocado en desarrollar, parametrizar y desplegar el aplicativo informático que
                consolida todos los productos, resultados e impactos de los proyectos de la Facultad de Minas,
                garantizando una base de datos centralizada y automatizada.
              </p>
            </div>
          </div>
        )}

        {/* Mission and Risk Callout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="p-5 rounded-2xl bg-teal-50/50 border border-teal-200 space-y-2">
            <span className="text-xs font-black text-[#005A64] flex items-center gap-1.5 uppercase tracking-wide">
              <CheckCircle2 className="w-4 h-4 text-[#007D8C]" />
              Misión Crítica para la Facultad de Minas:
            </span>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
              {activeCategory.misionCritica}
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-rose-50 border border-rose-200 space-y-2">
            <span className="text-xs font-black text-rose-800 flex items-center gap-1.5 uppercase tracking-wide">
              <AlertOctagon className="w-4 h-4 text-rose-600" />
              Riesgo Directo si se Elimina o Desfinancia:
            </span>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
              {activeCategory.riesgoSinEsteRol}
            </p>
          </div>
        </div>

        {/* Standardized Activities & Deliverables */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-3">
            <h3 className="text-xs font-extrabold text-[#3D4043] uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#007D8C]" />
              <span>Actividades Estandarizadas del Rol ({activeCategory.responsabilidades.length})</span>
            </h3>
            <div className="space-y-2">
              {activeCategory.responsabilidades.map((resp, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-2.5 text-xs text-slate-700 leading-relaxed"
                >
                  <span className="font-mono-num text-[#007D8C] font-black shrink-0">{idx + 1}.</span>
                  <span>{resp}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-xs font-extrabold text-[#3D4043] uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#FA9F1B]" />
              <span>Entregables Clave para Decanatura</span>
            </h3>
            <div className="space-y-2">
              {activeCategory.entregablesClave.map((ent, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-2.5 text-xs text-slate-700 leading-relaxed"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#FA9F1B] shrink-0 mt-0.5" />
                  <span>{ent}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Collaborators currently fulfilling this role */}
        <div className="space-y-4 pt-4 border-t border-slate-200">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-extrabold text-[#3D4043] flex items-center gap-2">
              <Users className="w-4 h-4 text-[#007D8C]" />
              <span>Personal con Órdenes Contractuales en esta Línea ({categoryCollaborators.length})</span>
            </h3>
            <span className="text-xs text-slate-500 font-medium">
              Auditados en los proyectos 3015 y 3065
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categoryCollaborators.map((collab) => (
              <div
                key={collab.nombre}
                className="p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:border-[#007D8C] transition-all space-y-2"
              >
                <div className="flex items-start justify-between gap-2">
                  <h4 className="text-xs font-black text-[#3D4043]">{collab.nombre}</h4>
                  <span className="text-[10px] font-mono-num font-bold text-[#007D8C] bg-white px-2 py-0.5 rounded-md border border-slate-200">
                    {collab.nivelAcademico}
                  </span>
                </div>
                <p className="text-[11px] text-slate-600 leading-snug font-medium">
                  {collab.cargo}
                </p>
                <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-[11px] text-slate-500">
                  <span>Vigencias: {collab.anosActivo.join(", ")}</span>
                  <span className="font-mono-num text-[#007D8C] font-black">
                    {formatMillions(collab.totalInvertido)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
