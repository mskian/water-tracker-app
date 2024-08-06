export default function Footer() {
  return (
    <footer className="w-full bg-gradient-to-r from-rose-600 to-blue-700 text-white p-4 flex flex-col items-center justify-center shadow-md">
      <br />
      <p className="text-center text-sm mb-2">
        © {new Date().getFullYear()} 🥤 Water Tracker. All rights reserved.
      </p>
      <p className="text-center text-xs">
        Developed with Preact.js and Vite.js - designed using Tailwind CSS ⚙️
      </p>
      <br />
    </footer>
  );
}
