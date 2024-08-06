export default function Header() {
  return (
    <header className="relative w-full bg-gradient-to-r from-rose-600 to-teal-600 text-white p-4 flex items-center justify-center shadow-md">
      <div className="flex items-center">
        <div className="relative mr-3">
          <div className="relative w-8 h-12 border-2 border-white rounded-b-full overflow-hidden">
            <div className="absolute bottom-0 left-0 right-0 h-3/4 bg-gradient-to-b from-blue-400 to-blue-600"></div>
            <div className="absolute bottom-0 left-0 right-0 h-full bg-white opacity-20"></div>
          </div>
        </div>
        <h1 className="text-3xl font-bold tracking-wide">Water Tracker</h1>
      </div>
    </header>
  );
}
