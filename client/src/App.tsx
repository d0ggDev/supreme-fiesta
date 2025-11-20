import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { SectionProvider } from "./contexts/SectionContext";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import Navigation from "./components/Navigation";

function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/admin"} component={Admin} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <SectionProvider>
          <TooltipProvider>
            <Toaster />
            <div className="h-screen bg-background text-foreground flex flex-col overflow-hidden">
              <Navigation />
              <main className="flex-1 overflow-hidden">
                <Router />
              </main>
            </div>
          </TooltipProvider>
        </SectionProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
