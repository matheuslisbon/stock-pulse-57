import { useState, useRef, useEffect } from "react";
import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const Chatbot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Olá! Sou o Canarinho, seu assistente de inventário. Como posso ajudar você hoje?",
      timestamp: new Date(),
    },
    {
      role: "assistant",
      content: "📊 **Análise Rápida do Estoque:**\n\n![Parafuso M8](https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=400&h=300&fit=crop)\n\n**Parafuso M8** está em nível crítico!\n\n• Estoque atual: 12 unidades\n• Consumo médio: 45 unidades/semana\n• Tendência: +15% de aumento nas últimas 4 semanas\n\n🎯 **Recomendação Urgente:**\nSugiro reabastecer com pedido de 200 unidades. Com base no histórico, você ficará sem estoque em aproximadamente 2 dias se não agir agora!\n\n💡 Posso fazer a análise de algum produto específico ou deseja ver mais recomendações?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Simulação de resposta do bot
    setTimeout(() => {
      const responses = [
        "Deixe-me verificar isso para você...",
        "Analisando os dados do inventário...",
        "Baseado nos padrões de consumo, posso sugerir...",
        "Vejo que você está interessado em otimizar o estoque. Vou buscar as melhores recomendações!",
        "Excelente pergunta! Aqui está o que encontrei nos dados...",
      ];

      const assistantMessage: Message = {
        role: "assistant",
        content: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <img src="/canario.svg" alt="Canarinho" className="h-12 w-12" />
            <div>
              <h1 className="text-3xl font-bold text-foreground">Canarinho AI</h1>
              <p className="text-muted-foreground">Seu assistente inteligente de inventário</p>
            </div>
          </div>

          <Card className="h-[calc(100vh-280px)] flex flex-col">
            <CardHeader className="border-b">
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-brand-secondary-dark" />
                Conversa com IA
              </CardTitle>
            </CardHeader>

            <CardContent className="flex-1 p-0 flex flex-col">
              <ScrollArea className="flex-1 p-6" ref={scrollRef}>
                <div className="space-y-4">
                  {messages.map((message, idx) => (
                    <div
                      key={idx}
                      className={`flex ${
                        message.role === "user" ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                          message.role === "user"
                            ? "bg-brand-primary text-white"
                            : "bg-accent text-foreground border border-border"
                        }`}
                      >
                        {message.role === "assistant" && (
                          <div className="flex items-center gap-2 mb-2">
                            <img
                              src="/canario.svg"
                              alt="Canarinho"
                              className="h-5 w-5"
                            />
                            <span className="text-xs font-semibold text-brand-primary">
                              Canarinho
                            </span>
                          </div>
                        )}
                        <div className="text-sm whitespace-pre-wrap prose prose-sm max-w-none">
                          {message.content.split('\n').map((line, i) => {
                            // Check if line contains markdown image
                            const imgMatch = line.match(/!\[([^\]]*)\]\(([^)]+)\)/);
                            if (imgMatch) {
                              return (
                                <img
                                  key={i}
                                  src={imgMatch[2]}
                                  alt={imgMatch[1]}
                                  className="rounded-lg my-2 max-w-full h-auto"
                                />
                              );
                            }
                            return line ? <p key={i}>{line}</p> : <br key={i} />;
                          })}
                        </div>
                        <span
                          className={`text-xs mt-2 block ${
                            message.role === "user"
                              ? "text-white/70"
                              : "text-muted-foreground"
                          }`}
                        >
                          {message.timestamp.toLocaleTimeString("pt-BR", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                    </div>
                  ))}

                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="bg-accent text-foreground border border-border rounded-2xl px-4 py-3">
                        <div className="flex items-center gap-2">
                          <img
                            src="/canario.svg"
                            alt="Canarinho"
                            className="h-5 w-5 animate-bounce"
                          />
                          <span className="text-sm text-muted-foreground">
                            Digitando...
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>

              <div className="p-4 border-t">
                <div className="flex gap-2">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Pergunte sobre estoque, previsões, sugestões..."
                    className="flex-1"
                    disabled={isLoading}
                  />
                  <Button
                    onClick={handleSend}
                    disabled={isLoading || !input.trim()}
                    className="bg-brand-primary hover:bg-brand-primary-dark"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-2 text-center">
                  Conecte ao Lovable Cloud para habilitar IA real
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Chatbot;
