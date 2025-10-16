import { Package, BarChart3, AlertTriangle, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AddProductDialog } from "./AddProductDialog";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-brand-primary-dark bg-brand-primary shadow-md">
      <div className="container flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <img src="/canario.svg" alt="Logo" className="h-16 w-16" />

          <div className="flex flex-col">
            <span className="text-lg font-semibold text-white">StockFlow</span>
            <span className="text-xs text-white/80">
              Inventory Intelligence
            </span>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-1">
          <Button
            variant="default"
            className="gap-2 bg-yellow-400 text-blue-500 hover:bg-yellow-500 hover:text-blue-500"
          >
            <BarChart3 className="h-4 w-4" />
            Dashboard
          </Button>
          <Button
            variant="ghost"
            className="gap-2 text-white hover:bg-white/10 hover:text-white"
          >
            <Package className="h-4 w-4" />
            Produtos
          </Button>
          <Button
            variant="ghost"
            className="gap-2 text-white hover:bg-white/10 hover:text-white"
          >
            <AlertTriangle className="h-4 w-4" />
            Alertas
          </Button>
        </nav>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/10 hover:text-white"
          >
            <Settings className="h-5 w-5" />
          </Button>
          <AddProductDialog
            trigger={
              <Button
                size="sm"
                className="hidden sm:flex bg-white text-brand-primary hover:bg-white/90"
              >
                Adicionar Produto
              </Button>
            }
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
