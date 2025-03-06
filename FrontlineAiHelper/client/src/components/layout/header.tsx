import { SiSchooology } from "react-icons/si";

export default function Header() {
  return (
    <header className="border-b bg-white">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <SiSchooology className="w-8 h-8 text-primary" />
          <h1 className="text-xl font-semibold">Frontline Education Assistant</h1>
        </div>
      </div>
    </header>
  );
}
