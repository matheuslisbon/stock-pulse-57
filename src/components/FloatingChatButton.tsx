import { useState } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useNavigate } from "react-router-dom";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const FloatingChatButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Oi! Sou o Canarinho. Como posso ajudar?",
    },
    {
      role: "assistant",
      content: "⚠️ Alerta: Parafuso M8 em nível crítico! Sugiro pedido urgente de 200 unidades. Quer ver a análise completa?",
    },
  ]);
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const handleSend = () => {
    if (!input.trim()) return;

    setMessages((prev) => [
      ...prev,
      { role: "user", content: input },
      {
        role: "assistant",
        content: "Deixe-me verificar isso... Para uma conversa completa, acesse o chat!",
      },
    ]);
    setInput("");
  };

  const handleOpenFullChat = () => {
    navigate("/chatbot");
    setIsOpen(false);
  };

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg bg-brand-primary hover:bg-brand-primary-dark z-50 flex items-center justify-center"
          size="icon"
        >
          <img src="/canario.svg" alt="Chat" className="h-8 w-8" />
        </Button>
      )}

      {/* Mini Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-6 right-6 w-96 h-[500px] shadow-2xl z-50 flex flex-col">
          <CardHeader className="border-b bg-brand-primary text-white p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img src="/canario.svg" alt="Canarinho" className="h-8 w-8" />
                <CardTitle className="text-white">Canarinho</CardTitle>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleOpenFullChat}
                  className="text-white hover:bg-white/20 text-xs"
                >
                  Expandir
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:bg-white/20 h-8 w-8"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>

          <CardContent className="flex-1 p-0 flex flex-col">
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-3">
                {messages.map((message, idx) => (
                  <div
                    key={idx}
                    className={`flex ${
                      message.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm ${
                        message.role === "user"
                          ? "bg-brand-primary text-white"
                          : "bg-accent text-foreground"
                      }`}
                    >
                      {message.role === "assistant" && (
                        <div className="flex items-center gap-1 mb-1">
                          <img
                            src="/canario.svg"
                            alt="Canarinho"
                            className="h-4 w-4"
                          />
                        </div>
                      )}
                      <p>{message.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <div className="p-3 border-t">
              <div className="flex gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Digite sua mensagem..."
                  className="flex-1 text-sm"
                />
                <Button
                  onClick={handleSend}
                  size="icon"
                  className="bg-brand-primary hover:bg-brand-primary-dark"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default FloatingChatButton;
