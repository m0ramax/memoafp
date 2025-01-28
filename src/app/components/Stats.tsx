import { useGameContext } from "@/app/context";

const Stats = () => {
  const { username, wrong, match } = useGameContext();
  const name = localStorage.getItem("username");
  return (
    <div className="flex flex-col items-center gap-4 mb-10">
      <span className="text-2xl font-bold text-[var(--text-primary)] transition-colors">
        hola, {name ?? username}
      </span>
      <div className="flex gap-8">
        <div className="flex flex-col items-center gap-2">
          <div className="w-16 h-16 rounded-full bg-[var(--error)] flex items-center justify-center text-xl font-bold border-4 border-red-400 text-white transition-all duration-200">
            {wrong}
          </div>
          <span className="text-[var(--text-secondary)]">Errores</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <div className="w-16 h-16 rounded-full bg-[var(--success)] flex items-center justify-center text-xl font-bold border-4 border-green-400 text-white transition-all duration-200">
            {match}
          </div>
          <span className="text-[var(--text-secondary)]">Aciertos</span>
        </div>
      </div>
    </div>
  );
};

export default Stats;