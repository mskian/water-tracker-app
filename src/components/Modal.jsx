import { h } from 'preact';

export default function Modal({ isOpen, onClose, message }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
      <div className="fixed inset-0 bg-black opacity-60" onClick={onClose}></div>
      <div className="relative bg-gradient-to-r from-green-400 to-blue-500 p-6 rounded-lg shadow-lg w-full max-w-md mx-4 sm:mx-6 md:mx-8 lg:mx-12 text-white z-10">
        <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-4 text-center">{message}</h3>
        <button
          className="bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
}
