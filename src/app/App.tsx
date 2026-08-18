import { Routes, Route } from 'react-router';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { WhatsAppFloat } from './components/WhatsAppFloat';
import { ConsentManager } from './components/ConsentManager';
import { HomePage } from './pages/HomePage';
import { FinancePage } from './pages/FinancePage';

export default function App() {
  return (
    <div className="min-h-screen">
      <ConsentManager />
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/finance" element={<FinancePage />} />
      </Routes>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
