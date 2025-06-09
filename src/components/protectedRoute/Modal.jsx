const Modal = ({ children, onClose }) => (
  <div className="fixed inset-0 bg-transparent flex items-center justify-center z-50 pointer-events-none">

    <div className="bg-gray-400 rounded-lg p-6 max-w-lg w-full relative shadow-xl pointer-events-auto">

      <button
        onClick={onClose}
        className="absolute top-2 right-2 text-gray-600 hover:text-black"
      >
        ✕
      </button>
      {children}
    </div>
  </div>
);

export default Modal;
