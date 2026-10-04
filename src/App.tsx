import React, { useState, useEffect } from 'react';
import { SplashScreen } from './components/common/SplashScreen';
import { OfflineIndicator } from './components/common/OfflineIndicator';
import { Navbar } from './components/navigation/Navbar';
import { BottomNav } from './components/navigation/BottomNav';
import { ModulesDrawer } from './components/navigation/ModulesDrawer';

// Module Views
import { HomeView } from './components/home/HomeView';
import { PeriodicTable } from './components/periodic-table/PeriodicTable';
import { AtomsOrbitalsView } from './components/atoms-orbitals/AtomsOrbitalsView';
import { Molecules3DView } from './components/molecules-3d/Molecules3DView';
import { EquationBalancer } from './components/equation-balancer/EquationBalancer';
import { ReactionSimulationsView } from './components/simulations/ReactionSimulationsView';
import { VirtualLabView } from './components/virtual-lab/VirtualLabView';
import { CalculatorsView } from './components/calculators/CalculatorsView';
import { CoursesView } from './components/courses/CoursesView';
import { QuizView } from './components/quiz/QuizView';
import { ExtraToolsView } from './components/tools/ExtraToolsView';

export default function App() {
  const [showSplash, setShowSplash] = useState<boolean>(true);
  const [currentModule, setCurrentModule] = useState<string>('home');
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  // Android Back Button support using history pushState / popstate
  useEffect(() => {
    // Push an initial state
    window.history.pushState({ module: 'home' }, '');

    const handlePopState = (e: PopStateEvent) => {
      if (isMenuOpen) {
        setIsMenuOpen(false);
        return;
      }

      if (currentModule !== 'home') {
        setCurrentModule('home');
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [currentModule, isMenuOpen]);

  const handleNavigate = (key: string) => {
    setCurrentModule(key);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    window.history.pushState({ module: key }, '');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-white">
      {/* Animated Splash Screen */}
      {showSplash && (
        <SplashScreen onComplete={() => setShowSplash(false)} autoDismissMs={2600} />
      )}

      {/* Offline Status Toast indicator */}
      <OfflineIndicator />

      {/* Top Navbar */}
      <Navbar
        currentModule={currentModule}
        onNavigate={handleNavigate}
        onOpenMenu={() => setIsMenuOpen(true)}
        isMenuOpen={isMenuOpen}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-3 sm:px-6 pt-4 pb-20 sm:pb-12">
        {currentModule === 'home' && <HomeView onNavigate={handleNavigate} />}
        {currentModule === 'periodic-table' && <PeriodicTable onBack={() => handleNavigate('home')} />}
        {currentModule === 'atoms-orbitals' && <AtomsOrbitalsView onBack={() => handleNavigate('home')} />}
        {currentModule === 'molecules-3d' && <Molecules3DView onBack={() => handleNavigate('home')} />}
        {currentModule === 'equation-balancer' && <EquationBalancer onBack={() => handleNavigate('home')} />}
        {currentModule === 'simulations' && <ReactionSimulationsView onBack={() => handleNavigate('home')} />}
        {currentModule === 'virtual-lab' && <VirtualLabView onBack={() => handleNavigate('home')} />}
        {currentModule === 'calculators' && <CalculatorsView onBack={() => handleNavigate('home')} />}
        {currentModule === 'courses' && <CoursesView onBack={() => handleNavigate('home')} />}
        {currentModule === 'quiz' && <QuizView onBack={() => handleNavigate('home')} />}
        {currentModule === 'tools' && <ExtraToolsView onBack={() => handleNavigate('home')} />}
      </main>

      {/* Mobile Bottom Navigation */}
      <BottomNav
        currentModule={currentModule}
        onNavigate={handleNavigate}
        onOpenMenu={() => setIsMenuOpen(true)}
      />

      {/* All Modules Drawer Modal */}
      <ModulesDrawer
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        currentModule={currentModule}
        onNavigate={handleNavigate}
      />
    </div>
  );
}
