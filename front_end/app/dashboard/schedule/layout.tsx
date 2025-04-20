import { ScheduleProvider } from "./components/context/schedule-context";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ScheduleProvider>
      {children}
    </ScheduleProvider>
  );
}