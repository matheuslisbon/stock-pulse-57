import { useState } from "react";
import { AlertCircle, TrendingDown, TrendingUp, Clock, Search } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";

interface Product {
  id: string;
  name: string;
  sku: string;
  stock: number;
  minStock: number;
  category: string;
  daysUntilOut: number;
  reorderSuggestion: number;
  trend: "up" | "down" | "stable";
  priority: "critical" | "medium" | "low";
}

const mockProducts: Product[] = [
  {
    id: "1",
    name: "Notebook Dell Inspiron 15",
    sku: "NB-DELL-001",
    stock: 8,
    minStock: 15,
    category: "Eletrônicos",
    daysUntilOut: 12,
    reorderSuggestion: 25,
    trend: "down",
    priority: "critical",
  },
  {
    id: "2",
    name: "Mouse Logitech MX Master 3",
    sku: "MS-LOG-003",
    stock: 45,
    minStock: 20,
    category: "Periféricos",
    daysUntilOut: 35,
    reorderSuggestion: 30,
    trend: "stable",
    priority: "low",
  },
  {
    id: "3",
    name: "Teclado Mecânico Keychron K2",
    sku: "KB-KEY-007",
    stock: 12,
    minStock: 18,
    category: "Periféricos",
    daysUntilOut: 18,
    reorderSuggestion: 22,
    trend: "down",
    priority: "medium",
  },
  {
    id: "4",
    name: "Monitor LG UltraWide 34\"",
    sku: "MN-LG-021",
    stock: 3,
    minStock: 10,
    category: "Eletrônicos",
    daysUntilOut: 5,
    reorderSuggestion: 15,
    trend: "down",
    priority: "critical",
  },
  {
    id: "5",
    name: "Webcam Logitech C920",
    sku: "WC-LOG-012",
    stock: 28,
    minStock: 15,
    category: "Periféricos",
    daysUntilOut: 42,
    reorderSuggestion: 20,
    trend: "up",
    priority: "low",
  },
];

const ProductsTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Filtrar produtos baseado na pesquisa
  const filteredProducts = mockProducts.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calcular paginação
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  // Reset para primeira página quando pesquisa muda
  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const getPriorityBadge = (priority: Product["priority"]) => {
    const variants = {
      critical: "bg-destructive text-destructive-foreground",
      medium: "bg-warning text-warning-foreground",
      low: "bg-success text-success-foreground",
    };
    
    const labels = {
      critical: "Crítico",
      medium: "Médio",
      low: "Normal",
    };

    return (
      <Badge className={cn("font-medium", variants[priority])}>
        {labels[priority]}
      </Badge>
    );
  };

  const getTrendIcon = (trend: Product["trend"]) => {
    if (trend === "down") return <TrendingDown className="h-4 w-4 text-destructive" />;
    if (trend === "up") return <TrendingUp className="h-4 w-4 text-success" />;
    return <div className="h-4 w-4" />;
  };

  return (
    <div className="space-y-4">
      {/* Campo de Pesquisa */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Pesquisar por nome, SKU ou categoria..."
          value={searchTerm}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Tabela de Produtos */}
      <div className="rounded-lg border border-border bg-card">
        <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead className="font-semibold">Produto</TableHead>
            <TableHead className="font-semibold">SKU</TableHead>
            <TableHead className="font-semibold text-center">Estoque</TableHead>
            <TableHead className="font-semibold text-center">Status</TableHead>
            <TableHead className="font-semibold text-center">Previsão</TableHead>
            <TableHead className="font-semibold text-center">Reorder</TableHead>
            <TableHead className="font-semibold text-right">Ação</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentProducts.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                Nenhum produto encontrado
              </TableCell>
            </TableRow>
          ) : (
            currentProducts.map((product) => (
            <TableRow
              key={product.id}
              className={cn(
                "transition-colors hover:bg-muted/50",
                product.priority === "critical" && "bg-destructive/5"
              )}
            >
              <TableCell>
                <div className="flex items-center gap-3">
                  {product.priority === "critical" && (
                    <AlertCircle className="h-4 w-4 text-destructive flex-shrink-0" />
                  )}
                  <div>
                    <div className="font-medium text-foreground">{product.name}</div>
                    <div className="text-sm text-muted-foreground">{product.category}</div>
                  </div>
                </div>
              </TableCell>
              <TableCell className="font-mono text-sm text-muted-foreground">
                {product.sku}
              </TableCell>
              <TableCell className="text-center">
                <div className="flex items-center justify-center gap-1">
                  {getTrendIcon(product.trend)}
                  <span
                    className={cn(
                      "font-semibold",
                      product.stock < product.minStock
                        ? "text-destructive"
                        : "text-foreground"
                    )}
                  >
                    {product.stock}
                  </span>
                  <span className="text-muted-foreground text-sm">/ {product.minStock}</span>
                </div>
              </TableCell>
              <TableCell className="text-center">
                {getPriorityBadge(product.priority)}
              </TableCell>
              <TableCell className="text-center">
                <div className="flex items-center justify-center gap-1">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span
                    className={cn(
                      "font-medium",
                      product.daysUntilOut < 10 && "text-destructive",
                      product.daysUntilOut >= 10 && product.daysUntilOut < 20 && "text-warning",
                      product.daysUntilOut >= 20 && "text-success"
                    )}
                  >
                    {product.daysUntilOut}d
                  </span>
                </div>
              </TableCell>
              <TableCell className="text-center">
                <span className="font-semibold text-primary">
                  {product.reorderSuggestion} un.
                </span>
              </TableCell>
              <TableCell className="text-right">
                <Button
                  size="sm"
                  className={cn(
                    product.priority === "critical" &&
                      "bg-destructive hover:bg-destructive/90"
                  )}
                >
                  Pedir Agora
                </Button>
              </TableCell>
            </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      </div>

      {/* Paginação */}
      {filteredProducts.length > 0 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Mostrando {startIndex + 1} a {Math.min(endIndex, filteredProducts.length)} de{" "}
            {filteredProducts.length} produtos
          </p>
          
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                  className={cn(
                    "cursor-pointer",
                    currentPage === 1 && "pointer-events-none opacity-50"
                  )}
                />
              </PaginationItem>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <PaginationItem key={page}>
                  <PaginationLink
                    onClick={() => setCurrentPage(page)}
                    isActive={currentPage === page}
                    className="cursor-pointer"
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))}
              
              <PaginationItem>
                <PaginationNext
                  onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                  className={cn(
                    "cursor-pointer",
                    currentPage === totalPages && "pointer-events-none opacity-50"
                  )}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
};

export default ProductsTable;
