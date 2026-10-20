import React from "react";
import { Camera, Printer, ShieldCheck, ChevronRight } from "lucide-react";

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onCaptureScreenshot: () => void;
  onOpenExport: () => void;
  isCapturing?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onCaptureScreenshot,
  onOpenExport,
  isCapturing = false,
}) => {
  const tabs = [
    {
      id: "defensa",
      number: "01",
      label: "Defensa Decanatura",
      subtitle: "Valor y Sostenibilidad CDI",
    },
    {
      id: "incrementos",
      number: "02",
      label: "Justificación de Incrementos",
      subtitle: "Evolución Actividades",
    },
    {
      id: "roles",
      number: "03",
      label: "Clasificación de Roles",
      subtitle: "Taxonomía Operativa CDI",
    },
    {
      id: "contratos",
      number: "04",
      label: "Auditoría Contractual & Perfiles",
      subtitle: "97 Órdenes con Actividades",
    },
  ];

  return (
    <header className="sticky top-0 z-40 w-full shadow-md transition-colors no-print">
      {/* Top Header Strip - Facultad de Minas Teal (#007D8C) */}
      <div className="bg-[#007D8C] text-white border-b border-[#00606B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between gap-4">
          {/* Brand lockup */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center text-[#FA9F1B] font-bold shadow-inner">
              <ShieldCheck className="w-5 h-5 text-[#FA9F1B]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-extrabold tracking-tight text-white uppercase">
                  Facultad de Minas
                </span>
                <span className="text-white/40">|</span>
                <span className="text-xs font-semibold text-[#FA9F1B] uppercase tracking-wider">
                  Sede Medellín
                </span>
              </div>
              <p className="text-[11px] text-teal-100 font-medium">
                Centro de Desarrollo e Innovación (CDI) · Trabajo y Rectitud
              </p>
            </div>
          </div>

          {/* Action buttons (Screenshot capture & Dean report) */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={onCaptureScreenshot}
              disabled={isCapturing}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-[#005A64] bg-white hover:bg-slate-100 active:bg-slate-200 rounded-lg shadow-sm transition-all cursor-pointer border border-white/80 disabled:opacity-50"
              title="Descargar una imagen PNG del pantallazo actual que estás visualizando"
            >
              <Camera className="w-3.5 h-3.5 text-[#FA9F1B]" />
              <span>{isCapturing ? "Capturando..." : "Descargar Pantallazo"}</span>
            </button>

            <button
              onClick={onOpenExport}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-slate-900 bg-[#FA9F1B] hover:bg-[#F5A122] active:bg-amber-600 rounded-lg shadow-sm transition-all cursor-pointer border border-amber-400"
              title="Abrir informe oficial imprimible para la Decanatura"
            >
              <Printer className="w-3.5 h-3.5 text-slate-900" />
              <span className="hidden sm:inline">Informe Decanatura</span>
            </button>
          </div>
        </div>
      </div>

      {/* Primary Navigation Bar with 4 Prominent Sections - Facultad de Minas White & Orange styling */}
      <nav className="bg-white border-b-2 border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 py-2.5">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`group relative text-left px-4 py-3 rounded-xl transition-all duration-200 cursor-pointer border flex flex-col justify-between ${
                    isActive
                      ? "bg-gradient-to-r from-[#007D8C] to-[#005A64] text-white border-[#005A64] shadow-md ring-2 ring-[#FA9F1B]/60"
                      : "bg-slate-50 hover:bg-slate-100 text-[#3D4043] border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <div className="flex items-center justify-between w-full mb-1">
                    <span
                      className={`font-mono text-xs font-bold px-1.5 py-0.5 rounded ${
                        isActive
                          ? "bg-[#FA9F1B] text-slate-950 font-extrabold"
                          : "bg-slate-200 text-slate-600 group-hover:bg-slate-300"
                      }`}
                    >
                      {tab.number}
                    </span>
                    <ChevronRight
                      className={`w-4 h-4 transition-transform ${
                        isActive
                          ? "text-[#FA9F1B] translate-x-0.5"
                          : "text-slate-400 group-hover:translate-x-0.5"
                      }`}
                    />
                  </div>

                  <div>
                    <h3
                      className={`text-sm font-extrabold tracking-tight leading-tight ${
                        isActive ? "text-white" : "text-[#3D4043] group-hover:text-[#007D8C]"
                      }`}
                    >
                      {tab.label}
                    </h3>
                    <p
                      className={`text-[11px] font-medium leading-snug mt-0.5 ${
                        isActive ? "text-teal-100" : "text-slate-500"
                      }`}
                    >
                      {tab.subtitle}
                    </p>
                  </div>

                  {isActive && (
                    <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 w-8 h-1 bg-[#FA9F1B] rounded-full" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </nav>
    </header>
  );
};
