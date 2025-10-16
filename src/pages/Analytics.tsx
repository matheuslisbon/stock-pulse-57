import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { LineChart, Line, BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend } from "recharts";
import { Brain, TrendingUp, TrendingDown, Clock, AlertCircle, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";

const stockPredictionData = [
  { mes: "Jan", real: 450, previsto: 445, minimo: 200 },
  { mes: "Fev", real: 380, previsto: 390, minimo: 200 },
  { mes: "Mar", real: 320, previsto: 310, minimo: 200 },
  { mes: "Abr", real: 280, previsto: 275, minimo: 200 },
  { mes: "Mai", real: null, previsto: 245, minimo: 200 },
  { mes: "Jun", real: null, previsto: 215, minimo: 200 },
  { mes: "Jul", real: null, previsto: 180, minimo: 200 },
];

const consumptionPatternData = [
  { dia: "Seg", consumo: 45, media: 40 },
  { dia: "Ter", consumo: 52, media: 40 },
  { dia: "Qua", consumo: 48, media: 40 },
  { dia: "Qui", consumo: 55, media: 40 },
  { dia: "Sex", consumo: 62, media: 40 },
  { dia: "Sab", consumo: 28, media: 40 },
  { dia: "Dom", consumo: 18, media: 40 },
];

const categoryTrendData = [
  { categoria: "Eletrônicos", Q1: 1200, Q2: 1450, Q3: 1600, Q4: 1850 },
  { categoria: "Alimentos", Q1: 2800, Q2: 2950, Q3: 3100, Q4: 3200 },
  { categoria: "Vestuário", Q1: 950, Q2: 1100, Q3: 1250, Q4: 1400 },
  { categoria: "Móveis", Q1: 650, Q2: 720, Q3: 780, Q4: 850 },
];

const reorderSuggestions = [
  { produto: "Mouse Gamer RGB", diasRestantes: 12, confianca: 94, acao: "Reabastecer em 7 dias" },
  { produto: "Arroz Integral 1kg", diasRestantes: 8, confianca: 97, acao: "Reabastecer em 3 dias" },
  { produto: "Notebook Dell i5", diasRestantes: 15, confianca: 89, acao: "Reabastecer em 10 dias" },
  { produto: "Cadeira Escritório", diasRestantes: 5, confianca: 92, acao: "Reabastecer AGORA" },
];

const chartConfig = {
  real: {
    label: "Estoque Real",
    color: "hsl(var(--brand-primary))",
  },
  previsto: {
    label: "Previsão IA",
    color: "hsl(var(--brand-secondary-dark))",
  },
  minimo: {
    label: "Estoque Mínimo",
    color: "hsl(var(--destructive))",
  },
  consumo: {
    label: "Consumo Diário",
    color: "hsl(var(--brand-primary))",
  },
  media: {
    label: "Média Móvel",
    color: "hsl(var(--brand-secondary-dark))",
  },
};

const Analytics = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Header Section */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
              <Brain className="h-8 w-8 text-brand-primary" />
              Analytics & IA
            </h1>
            <p className="text-muted-foreground mt-2">
              Previsões inteligentes e análise histórica para decisões estratégicas
            </p>
          </div>
          <Badge className="bg-brand-secondary text-brand-primary-dark gap-1">
            <Sparkles className="h-3 w-3" />
            IA Ativa
          </Badge>
        </div>

        {/* KPIs Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Precisão IA</p>
                  <p className="text-2xl font-bold text-brand-primary">94.3%</p>
                  <p className="text-xs text-success flex items-center gap-1 mt-1">
                    <TrendingUp className="h-3 w-3" />
                    +2.1% vs mês anterior
                  </p>
                </div>
                <Brain className="h-8 w-8 text-brand-primary-light" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Alertas Críticos</p>
                  <p className="text-2xl font-bold text-destructive">8</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Requer ação em 48h
                  </p>
                </div>
                <AlertCircle className="h-8 w-8 text-destructive/50" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Economia Prevista</p>
                  <p className="text-2xl font-bold text-success">R$ 18.5k</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Com otimização IA
                  </p>
                </div>
                <TrendingUp className="h-8 w-8 text-success/50" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Tempo Médio Reposição</p>
                  <p className="text-2xl font-bold text-foreground">4.2d</p>
                  <p className="text-xs text-success flex items-center gap-1 mt-1">
                    <TrendingDown className="h-3 w-3" />
                    -0.8d otimizado
                  </p>
                </div>
                <Clock className="h-8 w-8 text-brand-primary-light" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Prediction Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-brand-primary" />
              Previsão de Estoque - Próximos 7 Meses
            </CardTitle>
            <CardDescription>
              Modelo de IA prevê esgotamento em Julho. Linha vermelha indica estoque mínimo.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={stockPredictionData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="mes" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="real"
                    stroke="hsl(var(--brand-primary))"
                    fill="hsl(var(--brand-primary-light))"
                    strokeWidth={2}
                  />
                  <Area
                    type="monotone"
                    dataKey="previsto"
                    stroke="hsl(var(--brand-secondary-dark))"
                    fill="transparent"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                  />
                  <Line
                    type="monotone"
                    dataKey="minimo"
                    stroke="hsl(var(--destructive))"
                    strokeWidth={2}
                    strokeDasharray="3 3"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Consumption Pattern */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart className="h-5 w-5 text-brand-primary" />
                Padrão de Consumo Semanal
              </CardTitle>
              <CardDescription>
                Análise histórica de consumo nos últimos 90 dias
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={consumptionPatternData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="dia" stroke="hsl(var(--muted-foreground))" />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="consumo" fill="hsl(var(--brand-primary))" radius={[8, 8, 0, 0]} />
                    <Line
                      type="monotone"
                      dataKey="media"
                      stroke="hsl(var(--brand-secondary-dark))"
                      strokeWidth={2}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Category Trends */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-brand-primary" />
                Tendências por Categoria
              </CardTitle>
              <CardDescription>
                Evolução trimestral de vendas por categoria
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={categoryTrendData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="categoria" stroke="hsl(var(--muted-foreground))" />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Line type="monotone" dataKey="Q1" stroke="#8884d8" strokeWidth={2} />
                    <Line type="monotone" dataKey="Q2" stroke="#82ca9d" strokeWidth={2} />
                    <Line type="monotone" dataKey="Q3" stroke="#ffc658" strokeWidth={2} />
                    <Line type="monotone" dataKey="Q4" stroke="hsl(var(--brand-primary))" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>

        {/* AI Reorder Suggestions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-brand-secondary-dark" />
              Sugestões Inteligentes de Reposição
            </CardTitle>
            <CardDescription>
              IA analisou padrões de consumo e sugere ações preventivas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {reorderSuggestions.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-accent/50 transition-colors"
                >
                  <div className="flex-1">
                    <p className="font-semibold text-foreground">{item.produto}</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Estoque suficiente para <span className="font-bold text-foreground">{item.diasRestantes} dias</span>
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <Badge variant="outline" className="bg-brand-secondary-light text-brand-primary-dark">
                        {item.confianca}% confiança
                      </Badge>
                      <p className="text-xs text-muted-foreground mt-1">{item.acao}</p>
                    </div>
                    {item.diasRestantes <= 5 ? (
                      <AlertCircle className="h-5 w-5 text-destructive" />
                    ) : item.diasRestantes <= 10 ? (
                      <Clock className="h-5 w-5 text-warning" />
                    ) : (
                      <TrendingUp className="h-5 w-5 text-success" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Analytics;
