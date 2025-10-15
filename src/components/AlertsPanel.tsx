import { AlertTriangle, TrendingDown, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Alert {
  id: string;
  type: "stockout" | "low_stock" | "reorder";
  product: string;
  message: string;
  severity: "critical" | "warning" | "info";
  timestamp: string;
}

const mockAlerts: Alert[] = [
  {
    id: "1",
    type: "stockout",
    product: "Monitor LG UltraWide 34\"",
    message: "Esgotamento previsto em 5 dias com demanda atual",
    severity: "critical",
    timestamp: "Há 2 horas",
  },
  {
    id: "2",
    type: "low_stock",
    product: "Notebook Dell Inspiron 15",
    message: "Estoque abaixo do mínimo (8 de 15 unidades)",
    severity: "critical",
    timestamp: "Há 4 horas",
  },
  {
    id: "3",
    type: "reorder",
    product: "Teclado Mecânico Keychron K2",
    message: "Janela ideal para reposição: 18-22 unidades",
    severity: "warning",
    timestamp: "Há 6 horas",
  },
];

const AlertsPanel = () => {
  const getAlertIcon = (type: Alert["type"]) => {
    switch (type) {
      case "stockout":
        return <AlertTriangle className="h-5 w-5" />;
      case "low_stock":
        return <TrendingDown className="h-5 w-5" />;
      case "reorder":
        return <Clock className="h-5 w-5" />;
    }
  };

  const getSeverityColor = (severity: Alert["severity"]) => {
    switch (severity) {
      case "critical":
        return "bg-destructive/10 border-destructive/20 text-destructive";
      case "warning":
        return "bg-warning/10 border-warning/20 text-warning-foreground";
      case "info":
        return "bg-primary/10 border-primary/20 text-primary";
    }
  };

  return (
    <Card>
      <CardHeader className="border-b border-border">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">Alertas Ativos</CardTitle>
          <Badge variant="destructive" className="font-semibold">
            {mockAlerts.length} alertas
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y divide-border">
          {mockAlerts.map((alert) => (
            <div
              key={alert.id}
              className={`p-4 transition-colors hover:bg-muted/50 ${getSeverityColor(
                alert.severity
              )} border-l-4`}
            >
              <div className="flex items-start gap-3">
                <div className="mt-0.5">{getAlertIcon(alert.type)}</div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-foreground">{alert.product}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{alert.message}</p>
                  <p className="mt-2 text-xs text-muted-foreground">{alert.timestamp}</p>
                </div>
                <Button size="sm" variant="outline">
                  Revisar
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AlertsPanel;
