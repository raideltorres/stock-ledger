import "./App.css";
import { Button } from "./components/ui/button";

function App() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center">
      <div className="bg-red-500 text-white p-4">Hola Tailwind</div>

      <Button>Click me</Button>
    </div>
  );
}

export default App;
