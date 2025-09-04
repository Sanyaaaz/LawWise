import { useState, useRef, useEffect } from "react";
import { Send, BookOpen, Scale } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

interface DocumentSummary {
  title: string;
  highlights: string[];
  actionableInsights?: string[];
}

interface ChatAreaProps {
  documentSummary?: DocumentSummary;
  currentChatId: string | null;
}

export function ChatArea({ documentSummary, currentChatId }: ChatAreaProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "ai",
      content: "Hello! I'm your legal AI assistant. Upload a document to get started, or ask me any questions about legal matters.",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // Sample messages for demonstration
  useEffect(() => {
    if (documentSummary && currentChatId) {
      setMessages([
        {
          id: "summary",
          type: "ai", 
          content: `I've analyzed your document "${documentSummary.title}". Here's what I found: This is a comprehensive legal document with several key provisions. The main areas of focus include contractual obligations, termination clauses, and liability limitations. Would you like me to explain any specific section in more detail?`,
          timestamp: new Date()
        }
      ]);
    }
  }, [documentSummary, currentChatId]);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: "I understand your question. Based on the document analysis, here's what you need to know: [This would be a detailed AI response about the specific legal question asked.]",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full">
      {/* Document Summary Card */}
      {documentSummary && (
        <div className="p-4 border-b border-border bg-muted/30">
          <Card className="p-4">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-accent/10 rounded-lg">
                <BookOpen className="h-5 w-5 text-accent" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground mb-2">{documentSummary.title}</h3>
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-muted-foreground">Key Highlights:</h4>
                  <ul className="space-y-1">
                    {documentSummary.highlights.map((highlight, index) => (
                      <li key={index} className="text-sm text-foreground flex items-start gap-2">
                        <span className="w-1.5 h-1.5 bg-accent rounded-full mt-2 flex-shrink-0" />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
                {documentSummary.actionableInsights && (
                  <div className="mt-3 p-3 bg-accent/5 rounded-lg border border-accent/20">
                    <div className="flex items-center gap-2 mb-2">
                      <Scale className="h-4 w-4 text-accent" />
                      <span className="text-sm font-medium text-accent">Actionable Insights</span>
                    </div>
                    <ul className="space-y-1">
                      {documentSummary.actionableInsights.map((insight, index) => (
                        <li key={index} className="text-sm text-foreground">
                          {insight}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Chat Messages */}
      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
        <div className="space-y-4 max-w-4xl mx-auto">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex max-w-[80%] gap-3 ${message.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                {/* Avatar */}
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  message.type === 'user' 
                    ? 'bg-accent text-accent-foreground' 
                    : 'bg-primary text-primary-foreground'
                }`}>
                  {message.type === 'user' ? (
                    <span className="text-sm font-medium">U</span>
                  ) : (
                    <Scale className="h-4 w-4" />
                  )}
                </div>

                {/* Message Bubble */}
                <div className={`rounded-2xl px-4 py-3 ${
                  message.type === 'user'
                    ? 'bg-chat-user text-primary rounded-br-md'
                    : 'bg-chat-ai text-foreground rounded-bl-md border border-border'
                }`}>
                  <p className="text-sm leading-relaxed">{message.content}</p>
                  <p className="text-xs opacity-70 mt-2">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Input Area */}
      <div className="p-4 border-t border-border bg-card">
        <div className="max-w-4xl mx-auto">
          <div className="flex gap-3">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about your document or request a summary..."
              className="flex-1 bg-background"
            />
            <Button 
              onClick={handleSendMessage}
              disabled={!inputValue.trim()}
              className="bg-accent hover:bg-accent/90 text-accent-foreground px-6"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}