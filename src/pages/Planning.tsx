import { useState } from "react";
import { Store, Package, Send, History } from "lucide-react";
import Header from "@/components/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface Product {
  id: string;
  name: string;
  sku: string;
  stock: number;
  reserved: number;
  available: number;
}

interface Branch {
  id: string;
  name: string;
  city: string;
}

interface Distribution {
  id: string;
  product: string;
  branch: string;
  quantity: number;
  date: string;
  status: "pending" | "completed" | "cancelled";
}

const Planning = () => {
  const { toast } = useToast();
  const [selectedProduct, setSelectedProduct] = useState<string>("");
  const [selectedBranch, setSelectedBranch] = useState<string>("");
  const [quantity, setQuantity] = useState<string>("");

  // Mock data - produtos disponíveis no estoque central
  const products: Product[] = [
    { id: "1", name: "Parafuso M8", sku: "PAR-M8-001", stock: 500, reserved: 120, available: 380 },
    { id: "2", name: "Porca M8", sku: "POR-M8-001", stock: 450, reserved: 80, available: 370 },
    { id: "3", name: "Arruela Lisa", sku: "ARR-LIS-001", stock: 800, reserved: 200, available: 600 },
    { id: "4", name: "Parafuso M10", sku: "PAR-M10-001", stock: 350, reserved: 50, available: 300 },
    { id: "5", name: "Bucha S8", sku: "BUC-S8-001", stock: 600, reserved: 150, available: 450 },
  ];

  // Mock data - filiais
  const branches: Branch[] = [
    { id: "1", name: "Filial São Paulo", city: "São Paulo" },
    { id: "2", name: "Filial Rio de Janeiro", city: "Rio de Janeiro" },
    { id: "3", name: "Filial Belo Horizonte", city: "Belo Horizonte" },
    { id: "4", name: "Filial Curitiba", city: "Curitiba" },
    { id: "5", name: "Filial Porto Alegre", city: "Porto Alegre" },
  ];

  // Mock data - histórico de distribuições
  const distributions: Distribution[] = [
    { id: "1", product: "Parafuso M8", branch: "Filial São Paulo", quantity: 100, date: "2025-10-15", status: "completed" },
    { id: "2", product: "Porca M8", branch: "Filial Rio de Janeiro", quantity: 50, date: "2025-10-14", status: "completed" },
    { id: "3", product: "Arruela Lisa", branch: "Filial Curitiba", quantity: 150, date: "2025-10-16", status: "pending" },
    { id: "4", product: "Bucha S8", branch: "Filial Belo Horizonte", quantity: 80, date: "2025-10-13", status: "completed" },
  ];

  const handleDistribute = () => {
    if (!selectedProduct || !selectedBranch || !quantity) {
      toast({
        title: "Campos obrigatórios",
        description: "Preencha todos os campos para liberar o produto.",
        variant: "destructive",
      });
      return;
    }

    const product = products.find(p => p.id === selectedProduct);
    const quantityNum = parseInt(quantity);

    if (product && quantityNum > product.available) {
      toast({
        title: "Quantidade indisponível",
        description: `Apenas ${product.available} unidades disponíveis.`,
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Produto liberado!",
      description: `${quantity} unidades enviadas para ${branches.find(b => b.id === selectedBranch)?.name}`,
    });

    // Reset form
    setSelectedProduct("");
    setSelectedBranch("");
    setQuantity("");
  };

  const getStatusBadge = (status: Distribution["status"]) => {
    const variants: Record<Distribution["status"], "default" | "secondary" | "destructive"> = {
      completed: "default",
      pending: "secondary",
      cancelled: "destructive",
    };
    const labels: Record<Distribution["status"], string> = {
      completed: "Concluído",
      pending: "Pendente",
      cancelled: "Cancelado",
    };
    return <Badge variant={variants[status]}>{labels[status]}</Badge>;
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
            <Store className="h-8 w-8 text-primary" />
            Planejamento de Distribuição
          </h1>
          <p className="text-muted-foreground mt-2">
            Gerencie a distribuição de produtos da central para as filiais
          </p>
        </div>

        <Tabs defaultValue="distribute" className="space-y-6">
          <TabsList>
            <TabsTrigger value="distribute">
              <Send className="h-4 w-4 mr-2" />
              Liberar Produtos
            </TabsTrigger>
            <TabsTrigger value="inventory">
              <Package className="h-4 w-4 mr-2" />
              Estoque Central
            </TabsTrigger>
            <TabsTrigger value="history">
              <History className="h-4 w-4 mr-2" />
              Histórico
            </TabsTrigger>
          </TabsList>

          {/* Aba de Distribuição */}
          <TabsContent value="distribute">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Liberar Produto para Filial</CardTitle>
                  <CardDescription>
                    Selecione o produto, filial e quantidade para distribuir
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="product">Produto</Label>
                    <Select value={selectedProduct} onValueChange={setSelectedProduct}>
                      <SelectTrigger id="product">
                        <SelectValue placeholder="Selecione um produto" />
                      </SelectTrigger>
                      <SelectContent>
                        {products.map((product) => (
                          <SelectItem key={product.id} value={product.id}>
                            {product.name} - {product.sku} (Disponível: {product.available})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="branch">Filial Destino</Label>
                    <Select value={selectedBranch} onValueChange={setSelectedBranch}>
                      <SelectTrigger id="branch">
                        <SelectValue placeholder="Selecione uma filial" />
                      </SelectTrigger>
                      <SelectContent>
                        {branches.map((branch) => (
                          <SelectItem key={branch.id} value={branch.id}>
                            {branch.name} - {branch.city}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="quantity">Quantidade</Label>
                    <Input
                      id="quantity"
                      type="number"
                      placeholder="Digite a quantidade"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      min="1"
                    />
                  </div>

                  <Button onClick={handleDistribute} className="w-full">
                    <Send className="h-4 w-4 mr-2" />
                    Liberar Produto
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Filiais Disponíveis</CardTitle>
                  <CardDescription>
                    {branches.length} filiais cadastradas
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {branches.map((branch) => (
                      <div
                        key={branch.id}
                        className="flex items-center justify-between p-3 border rounded-lg hover:bg-accent transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <Store className="h-5 w-5 text-primary" />
                          <div>
                            <p className="font-medium">{branch.name}</p>
                            <p className="text-sm text-muted-foreground">{branch.city}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Aba de Estoque Central */}
          <TabsContent value="inventory">
            <Card>
              <CardHeader>
                <CardTitle>Estoque Central</CardTitle>
                <CardDescription>
                  Produtos disponíveis para distribuição
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Produto</TableHead>
                      <TableHead>SKU</TableHead>
                      <TableHead className="text-right">Estoque Total</TableHead>
                      <TableHead className="text-right">Reservado</TableHead>
                      <TableHead className="text-right">Disponível</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {products.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell className="font-medium">{product.name}</TableCell>
                        <TableCell>{product.sku}</TableCell>
                        <TableCell className="text-right">{product.stock}</TableCell>
                        <TableCell className="text-right">{product.reserved}</TableCell>
                        <TableCell className="text-right font-semibold text-primary">
                          {product.available}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Aba de Histórico */}
          <TabsContent value="history">
            <Card>
              <CardHeader>
                <CardTitle>Histórico de Distribuições</CardTitle>
                <CardDescription>
                  Últimas movimentações de produtos
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Data</TableHead>
                      <TableHead>Produto</TableHead>
                      <TableHead>Filial</TableHead>
                      <TableHead className="text-right">Quantidade</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {distributions.map((dist) => (
                      <TableRow key={dist.id}>
                        <TableCell>{new Date(dist.date).toLocaleDateString('pt-BR')}</TableCell>
                        <TableCell className="font-medium">{dist.product}</TableCell>
                        <TableCell>{dist.branch}</TableCell>
                        <TableCell className="text-right">{dist.quantity}</TableCell>
                        <TableCell>{getStatusBadge(dist.status)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Planning;