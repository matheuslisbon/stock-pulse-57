import { Package, BarChart3, AlertTriangle, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="container flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
            <Package className="h-6 w-6 text-primary-foreground" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-semibold text-foreground">StockFlow</span>
            <span className="text-xs text-muted-foreground">Inventory Intelligence</span>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-1">
          <Button variant="ghost" className="gap-2">
            <BarChart3 className="h-4 w-4" />
            Dashboard
          </Button>
          <Button variant="ghost" className="gap-2">
            <Package className="h-4 w-4" />
            Produtos
          </Button>
          <Button variant="ghost" className="gap-2">
            <AlertTriangle className="h-4 w-4" />
            Alertas
          </Button>
        </nav>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <Settings className="h-5 w-5" />
          </Button>
          <Button size="sm" className="hidden sm:flex">
            Adicionar Produto
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
