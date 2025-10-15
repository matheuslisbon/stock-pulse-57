import { Package, AlertTriangle, TrendingUp, Clock } from "lucide-react";
import Header from "@/components/Header";
import MetricCard from "@/components/MetricCard";
import ProductsTable from "@/components/ProductsTable";
import AlertsPanel from "@/components/AlertsPanel";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container px-4 sm:px-6 lg:px-8 py-8">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Total de Produtos"
            value="247"
            change="+12 este mês"
            changeType="positive"
            icon={Package}
            iconBg="bg-primary"
          />
          <MetricCard
            title="Alertas Críticos"
            value="3"
            change="Requer ação imediata"
            changeType="negative"
            icon={AlertTriangle}
            iconBg="bg-destructive"
          />
          <MetricCard
            title="Pedidos Sugeridos"
            value="8"
            change="Previsão IA ativa"
            changeType="neutral"
            icon={TrendingUp}
            iconBg="bg-warning"
          />
          <MetricCard
            title="Tempo Médio de Reposição"
            value="14d"
            change="-2 dias vs. mês anterior"
            changeType="positive"
            icon={Clock}
            iconBg="bg-success"
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2">
            <div className="mb-4">
              <h2 className="text-2xl font-bold text-foreground">Inventário de Produtos</h2>
              <p className="text-muted-foreground mt-1">
                Monitoramento em tempo real com previsões de IA
              </p>
            </div>
            <ProductsTable />
          </div>
          
          <div className="lg:col-span-1">
            <div className="mb-4">
              <h2 className="text-2xl font-bold text-foreground">Alertas</h2>
              <p className="text-muted-foreground mt-1">
                Notificações prioritárias
              </p>
            </div>
            <AlertsPanel />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
