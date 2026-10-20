/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from "react";
import { Navbar } from "./components/Navbar";
import { ExecutiveDefenseView } from "./components/ExecutiveDefenseView";
import { YoYJustificationView } from "./components/YoYJustificationView";
import { RolesAndActivitiesView } from "./components/RolesAndActivitiesView";
import { AcademicProfilesView } from "./components/AcademicProfilesView";
import { ContractsTableView } from "./components/ContractsTableView";
import { DataEnrichmentModal } from "./components/DataEnrichmentModal";
import { ExportReportModal } from "./components/ExportReportModal";
import { CONTRACTS_DATA, ContractRecord } from "./data/contractsData";
import {
  getCollaboratorProfiles,
  getSystemGlobalMetrics,
} from "./data/collaboratorAnalysis";

export default function App() {
  const [contracts, setContracts] = useState<ContractRecord[]>(CONTRACTS_DATA);
  const [activeTab, setActiveTab] = useState<string>("defensa");
  const [isEnrichmentOpen, setIsEnrichmentOpen] = useState<boolean>(false);
  const [isExportOpen, setIsExportOpen] = useState<boolean>(false);

  // Update activities for a contract when user completes in modal
  const handleUpdateActivities = (contractId: string, newActivities: string[]) => {
    setContracts((prev) =>
      prev.map((c) =>
        c.id === contractId
          ? {
              ...c,
              actividades: newActivities,
              tieneActividades: newActivities.length > 0,
            }
          : c
      )
    );
  };

  // Recompute profiles and global metrics dynamically
  const collaborators = useMemo(() => {
    return getCollaboratorProfiles();
  }, [contracts]);

  const globalMetrics = useMemo(() => {
    return getSystemGlobalMetrics();
  }, [contracts]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500/20 selection:text-emerald-300">
      {/* Top Bar Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenEnrichment={() => setIsEnrichmentOpen(true)}
        onOpenExport={() => setIsExportOpen(true)}
      />

      {/* Main Tabbed Views */}
      <main className="flex-1 pb-16">
        {activeTab === "defensa" && (
          <ExecutiveDefenseView
            onNavigateToYoY={() => setActiveTab("incrementos")}
            totalsByYear={globalMetrics.totalsByYear}
            totalInvestment={globalMetrics.totalInvestment}
          />
        )}

        {activeTab === "incrementos" && (
          <YoYJustificationView collaborators={collaborators} />
        )}

        {activeTab === "roles" && (
          <RolesAndActivitiesView collaborators={collaborators} />
        )}

        {activeTab === "perfiles" && (
          <AcademicProfilesView
            collaborators={collaborators}
            academicStats={globalMetrics.academicStats}
          />
        )}

        {activeTab === "contratos" && (
          <ContractsTableView
            contracts={contracts}
            onOpenEnrichment={() => setIsEnrichmentOpen(true)}
          />
        )}
      </main>

      {/* Institutional Footer */}
      <footer className="w-full bg-slate-900/60 border-t border-slate-800/80 py-6 px-4 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-400">
              Centro de Desarrollo e Innovación (CDI)
            </span>
            <span>·</span>
            <span>Facultad de Minas</span>
            <span>·</span>
            <span>Universidad Nacional de Colombia · Sede Medellín</span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <span>97 Órdenes Contractuales</span>
            <span>·</span>
            <span>38 Colaboradores</span>
            <span>·</span>
            <button
              onClick={() => setIsExportOpen(true)}
              className="text-emerald-400 hover:text-emerald-300 cursor-pointer transition-colors"
            >
              Exportar Informe Oficial
            </button>
          </div>
        </div>
      </footer>

      {/* Data Enrichment Modal */}
      <DataEnrichmentModal
        isOpen={isEnrichmentOpen}
        onClose={() => setIsEnrichmentOpen(false)}
        contracts={contracts}
        onUpdateActivities={handleUpdateActivities}
      />

      {/* Export & Print Report Modal */}
      <ExportReportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        collaborators={collaborators}
        totalInvestment={globalMetrics.totalInvestment}
      />
    </div>
  );
}
