import { useGameContext } from "@/app/context";

const SuccessModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const { username } = useGameContext();
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-[var(--primary)] p-8 rounded-xl shadow-2xl transform transition-all duration-300 scale-100 opacity-100">
        <h2 className="text-2xl font-bold mb-4 text-[var(--text-primary)]">
          ¡Felicitaciones {username}! 🎉
        </h2>
        <p className="text-[var(--text-secondary)] mb-6">
          Has completado el juego exitosamente
        </p>
        <button
          onClick={onClose}
          className="bg-indigo-700 hover:bg-indigo-800 text-white font-bold py-2 px-4 rounded transition-colors"
        >
          Jugar de nuevo
        </button>
      </div>
    </div>
  );
};

export default SuccessModal;