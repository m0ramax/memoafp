import { useGameContext } from "@/app/context";

const Login = ({
  onUserNameSet,
}: {
  onUserNameSet: (username: string) => void;
}) => {
  const { username, setUserName } = useGameContext();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("username", username);
    onUserNameSet(username);
  };
  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center">
      <label htmlFor="username" className="mb-2 text-lg">
        Ingresa tu nombre
      </label>
      <input
        type="text"
        id="username"
        value={username}
        onChange={(e) => setUserName(e.target.value)}
        className="mb-4 p-2 border rounded text-black"
        required
      />
      <button type="submit" className="p-2 bg-blue-500 text-white rounded">
        Enviar
      </button>
    </form>
  );
};

export default Login;
