import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import AppShell from "./components/AppShell";
import Home from "./pages/Home";
import CandidateOnboarding from "./pages/CandidateOnboarding";
import CandidateDashboard from "./pages/CandidateDashboard";
import CandidateRanking from "./pages/CandidateRanking";
import CandidateGaps from "./pages/CandidateGaps";
import CandidateRoadmap from "./pages/CandidateRoadmap";
import CandidateInterview from "./pages/CandidateInterview";
import RecruiterDashboard from "./pages/RecruiterDashboard";
import RecruiterRanking from "./pages/RecruiterRanking";
import RecruiterFairness from "./pages/RecruiterFairness";
import { Redirect, Route, Switch, useLocation } from "wouter";
import { useEffect, useState } from "react";

type Role = "candidate" | "recruiter";

function ProtectedWorkspace({ children }: { children: React.ReactNode }) {
  const [location, navigate] = useLocation();
  const [role, setRole] = useState<Role>(() => location.startsWith("/recruiter") ? "recruiter" : "candidate");
  useEffect(() => { localStorage.setItem("cc-role", role); }, [role]);
  const handleRoleChange = (nextRole: Role) => { setRole(nextRole); navigate(nextRole === "candidate" ? "/candidate/dashboard" : "/recruiter/dashboard"); };
  return <AppShell role={role} onRoleChange={handleRoleChange}>{children}</AppShell>;
}

function WorkspaceRoute({ path, component: Component }: { path: string; component: React.ComponentType }) {
  return <Route path={path}>{() => <ProtectedWorkspace><Component /></ProtectedWorkspace>}</Route>;
}

function App() {
  return <ErrorBoundary><ThemeProvider defaultTheme="dark"><TooltipProvider><Toaster /><Switch>
    <Route path="/" component={Home} />
    <Route path="/candidate/onboarding" component={CandidateOnboarding} />
    <WorkspaceRoute path="/candidate/dashboard" component={CandidateDashboard} />
    <WorkspaceRoute path="/candidate/ranking" component={CandidateRanking} />
    <WorkspaceRoute path="/candidate/gaps" component={CandidateGaps} />
    <WorkspaceRoute path="/candidate/roadmap" component={CandidateRoadmap} />
    <WorkspaceRoute path="/candidate/interview" component={CandidateInterview} />
    <WorkspaceRoute path="/recruiter/dashboard" component={RecruiterDashboard} />
    <WorkspaceRoute path="/recruiter/ranking" component={RecruiterRanking} />
    <WorkspaceRoute path="/recruiter/fairness" component={RecruiterFairness} />
    <Route><Redirect to="/" /></Route>
  </Switch></TooltipProvider></ThemeProvider></ErrorBoundary>;
}

export default App;
