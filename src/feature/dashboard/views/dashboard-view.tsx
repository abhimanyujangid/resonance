import { PageHeader } from "@/src/components/page-header";
import { HeroPattern } from "@/src/feature/dashboard/components/hero-pattern";
import { DashboardHeader } from "@/src/feature/dashboard/components/dashboard-header";
import { TextInputPanel } from "@/src/feature/dashboard/components/text-input-panel";
import { QuickActionsPanel } from "../components/quick-actions-panel";

export function DashboardView() {
  return (
    <div className="relative">
      <PageHeader title="Dashboard" className="lg:hidden" />
      <div className="bg-popover relative overflow-hidden rounded-lg">
        <HeroPattern />
        <div className="relative space-y-6 p-6 lg:p-8">
          <DashboardHeader />
          <TextInputPanel />
          <QuickActionsPanel />
        </div>
      </div>
    </div>
  );
}
