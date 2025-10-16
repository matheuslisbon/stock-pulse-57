import { Package, BarChart3, AlertTriangle, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AddProductDialog } from "./AddProductDialog";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-brand-primary-dark bg-brand-primary shadow-md">
      <div className="container flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/20 backdrop-blur-sm">
            <Package className="h-6 w-6 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-semibold text-white">StockFlow</span>
            <span className="text-xs text-white/80">Inventory Intelligence</span>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-1">
          <Button variant="ghost" className="gap-2 text-white hover:bg-white/10 hover:text-white">
            <BarChart3 className="h-4 w-4" />
            Dashboard
          </Button>
          <Button variant="ghost" className="gap-2 text-white hover:bg-white/10 hover:text-white">
            <Package className="h-4 w-4" />
            Produtos
          </Button>
          <Button variant="ghost" className="gap-2 text-white hover:bg-white/10 hover:text-white">
            <AlertTriangle className="h-4 w-4" />
            Alertas
          </Button>
        </nav>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="text-white hover:bg-white/10 hover:text-white">
            <Settings className="h-5 w-5" />
          </Button>
          <AddProductDialog
            trigger={
              <Button size="sm" className="hidden sm:flex bg-white text-brand-primary hover:bg-white/90">
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
