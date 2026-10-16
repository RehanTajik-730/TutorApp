import { PerformanceDashboard } from "@/components/analytics/PerformanceDashboard";

export const metadata = {
  title: "Academic Improvement Analytics | TutorBridge PK",
  description: "Visual performance graphs, baseline comparisons, and topical mastery tracking.",
};

export default function AnalyticsPage() {
  return <PerformanceDashboard />;
}
