import Header from './components/Header';
import Footer from './components/Footer';
import WaterTracker from './components/WaterTracker';

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-green-100 to-blue-100 flex flex-col">
      <Header />
      <main className="flex-grow p-6 flex justify-center items-center">
        <WaterTracker />
      </main>
      <Footer />
    </div>
  );
}
