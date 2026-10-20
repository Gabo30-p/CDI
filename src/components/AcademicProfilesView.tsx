import React, { useState, useMemo } from "react";
import {
  GraduationCap,
  Award,
  Search,
  Filter,
  Users,
  BookOpen,
  Briefcase,
  ChevronRight,
  TrendingUp,
} from "lucide-react";
import { CollaboratorProfile, formatCOP, formatMillions } from "../data/collaboratorAnalysis";

interface AcademicProfilesViewProps {
  collaborators: CollaboratorProfile[];
  academicStats: { nivel: string; contratos: number; porcentaje: string }[];
}

export const AcademicProfilesView: React.FC<AcademicProfilesViewProps> = ({
  collaborators,
  academicStats,
}) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedLevel, setSelectedLevel] = useState<string>("all");
  const [selectedYear, setSelectedYear] = useState<string>("all");

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

  // Gender breakdown
  const genderStats = useMemo(() => {
    const f = collaborators.filter((c) => c.genero === "F").length;
    const m = collaborators.filter((c) => c.genero === "M").length;
    return {
      f,
      m,
      fPct: ((f / collaborators.length) * 100).toFixed(1),
      mPct: ((m / collaborators.length) * 100).toFixed(1),
    };
  }, [collaborators]);

  // Filtered collaborators
  const filteredList = useMemo(() => {
    return collaborators.filter((c) => {
      if (selectedLevel !== "all" && c.nivelAcademico !== selectedLevel) return false;
      if (selectedYear !== "all" && !c.anosActivo.includes(Number(selectedYear))) return false;
      if (
        searchQuery &&
        !c.nombre.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !c.profesionBasica.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !c.cargo.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !c.profesionPosgrado.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }
      return true;
    });
  }, [collaborators, selectedLevel, selectedYear, searchQuery]);

  return (
    <div className="space-y-8 py-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="border-b border-slate-800 pb-5 space-y-2">
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-wide">
          <GraduationCap className="w-4 h-4" />
          <span>Capital Intelectual de la Facultad de Minas</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Perfiles Académicos y Calificación del Talento CDI
        </h1>
        <p className="text-sm text-slate-300 max-w-3xl leading-relaxed">
          Análisis del nivel de formación, disciplinas profesionales y capacidades técnicas del equipo
          humano del Centro de Desarrollo e Innovación. Un equipo altamente calificado para dialogar de
          igual a igual con docentes investigadores, directores de laboratorio y entidades financiadoras.
        </p>
      </div>

      {/* Overview Analytics Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Academic Level Card */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Award className="w-4 h-4 text-emerald-400" />
              <span>Nivel Académico del Sistema</span>
            </h3>
            <span className="text-[11px] font-mono text-slate-500">97 Contratos</span>
          </div>

          <div className="space-y-3">
            {academicStats.map((item) => (
              <div key={item.nivel} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium text-slate-300">{item.nivel}</span>
                  <span className="font-mono text-slate-400 tabular-nums">
                    {item.contratos} ({item.porcentaje}%)
                  </span>
                </div>
                <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-400 rounded-full transition-all duration-500"
                    style={{ width: `${item.porcentaje}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Disciplines Card */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-blue-400" />
              <span>Disciplinas Predominantes</span>
            </h3>
            <span className="text-[11px] font-mono text-slate-500">38 Colaboradores</span>
          </div>

          <div className="space-y-2.5 max-h-64 overflow-y-auto pr-1">
            {disciplineStats.map((d) => (
              <div key={d.disciplina} className="flex items-center justify-between text-xs py-1 border-b border-slate-800/60">
                <span className="text-slate-300">{d.disciplina}</span>
                <span className="font-mono font-bold text-blue-400 tabular-nums">
                  {d.count} ({d.pct}%)
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Gender and Team Composition */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 flex flex-col justify-between">
          <div className="border-b border-slate-800 pb-3">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Users className="w-4 h-4 text-purple-400" />
              <span>Diversidad e Inclusión en Minas</span>
            </h3>
            <span className="text-[11px] text-slate-500">Distribución por Género del Equipo</span>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-[10px] uppercase text-purple-400 font-bold block">Mujeres (F)</span>
                <span className="text-2xl font-bold font-mono text-white tabular-nums">{genderStats.f}</span>
                <span className="text-xs text-slate-400 block">{genderStats.fPct}%</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-[10px] uppercase text-slate-400 font-bold block">Hombres (M)</span>
                <span className="text-2xl font-bold font-mono text-white tabular-nums">{genderStats.m}</span>
                <span className="text-xs text-slate-400 block">{genderStats.mPct}%</span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              El 70%+ del equipo operativo y de gestión del CDI está liderado por profesionales y tecnólogas
              mujeres en áreas de ingeniería, economía y administración, fortaleciendo el liderazgo femenino
              en la Facultad de Minas.
            </p>
          </div>
        </div>
      </div>

      {/* Directory Filter Bar */}
      <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
            <input
              type="text"
              placeholder="Buscar por nombre, disciplina o posgrado..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-1.5 text-xs bg-slate-950 border border-slate-800 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2">
              <Filter className="w-3.5 h-3.5 text-slate-500" />
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="text-xs bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-slate-200 focus:outline-none focus:border-emerald-500 cursor-pointer"
              >
                <option value="all">Todos los niveles académicos</option>
                <option value="Maestría">Maestría</option>
                <option value="Especialización">Especialización</option>
                <option value="Profesional">Profesional Universitario</option>
                <option value="Tecnólogo">Tecnólogo</option>
                <option value="Técnico">Técnico</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="text-xs bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-slate-200 focus:outline-none focus:border-emerald-500 cursor-pointer"
              >
                <option value="all">Todas las vigencias</option>
                <option value="2026">Activos en 2026</option>
                <option value="2025">Activos en 2025</option>
                <option value="2024">Activos en 2024</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Directory Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredList.map((collab) => (
          <div
            key={collab.nombre}
            className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between gap-4"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div className="space-y-0.5">
                  <span className="text-[10px] font-semibold text-emerald-400 uppercase tracking-wide block">
                    {collab.rolCategoria}
                  </span>
                  <h3 className="text-sm font-bold text-white tracking-tight">{collab.nombre}</h3>
                  <p className="text-xs text-slate-400">{collab.cargo}</p>
                </div>
                <span className="text-[10px] font-mono font-bold text-slate-300 bg-slate-950 px-2 py-1 rounded border border-slate-800">
                  {collab.nivelAcademico}
                </span>
              </div>

              <div className="space-y-1.5 text-xs text-slate-300 bg-slate-950/60 p-3 rounded-lg border border-slate-800/80">
                <div>
                  <span className="text-slate-500 text-[10px] block uppercase">Pregrado / Formación:</span>
                  <span className="font-medium text-slate-200">{collab.profesionBasica}</span>
                </div>
                {collab.profesionPosgrado && (
                  <div className="pt-1 border-t border-slate-900">
                    <span className="text-emerald-500 text-[10px] block uppercase font-bold">Posgrado:</span>
                    <span className="font-semibold text-emerald-300">{collab.profesionPosgrado}</span>
                  </div>
                )}
                {collab.estudiosAdicionales && (
                  <div className="pt-1 border-t border-slate-900">
                    <span className="text-slate-500 text-[10px] block uppercase">Énfasis Técnico:</span>
                    <span className="text-slate-400 text-[11px] line-clamp-2">{collab.estudiosAdicionales}</span>
                  </div>
                )}
              </div>

              <p className="text-[11px] text-slate-400 leading-relaxed italic line-clamp-2">
                "{collab.misionEstrategica}"
              </p>
            </div>

            <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
              <span className="text-slate-500">
                Años: <span className="text-slate-300 font-mono">{collab.anosActivo.join(", ")}</span>
              </span>
              <span className="font-mono font-bold text-emerald-400">
                {formatMillions(collab.totalInvertido)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
