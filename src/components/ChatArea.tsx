import { useState } from "react";
import { Send, Scale, BookOpen, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Hero } from "./Hero";

interface DocumentSummary {
  title: string;
  highlights: string[];
  actionableInsights?: string[];
}

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

interface ChatAreaProps {
  documentSummary?: DocumentSummary;
  currentChatId: string | null;
  onTryDemo: () => void;
  onClearChat: () => void;
}

export function ChatArea({ documentSummary, currentChatId, onTryDemo, onClearChat }: ChatAreaProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [showChat, setShowChat] = useState(false);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    // Show chat interface on first message
    if (!showChat) setShowChat(true);

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: generateAIResponse(inputValue),
        isUser: false,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiMessage]);
    }, 1000);

    setInputValue("");
  };

  const generateAIResponse = (userInput: string): string => {
    // Simple response simulation
    if (userInput.toLowerCase().includes("contract")) {
      return "Based on your contract, I can help you understand the key terms and conditions. The document appears to have standard clauses with specific attention needed on termination and liability sections.";
    }
    if (userInput.toLowerCase().includes("clause")) {
      return "This clause typically means that both parties agree to specific terms. Let me break down the legal language for you in simpler terms.";
    }
    return "I understand your question about the legal document. Let me analyze the relevant sections and provide you with a clear explanation of what this means for your specific situation.";
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const handleClearChat = () => {
    setMessages([]);
    setShowChat(false);
    onClearChat();
  };

  const handleTryDemo = () => {
    setShowChat(true);
    onTryDemo();
  };

  // Show hero when no active chat or document
  if (!showChat && !documentSummary && !currentChatId) {
    return (
      <main className="flex-1 flex flex-col bg-background">
        <Hero onTryDemo={handleTryDemo} />
        
        {/* Chat Input */}
        <div className="border-t border-border p-6 bg-card">
          <div className="flex gap-3 max-w-4xl mx-auto">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Enter your message..."
              className="flex-1 bg-input border-border text-foreground placeholder:text-muted-foreground"
            />
            <Button 
              onClick={handleSendMessage}
              disabled={!inputValue.trim()}
              className="bg-gradient-primary hover:shadow-glow transition-all duration-300 text-black"
              size="icon"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-1 flex flex-col bg-background">
      {/* Document Summary Card */}
      {documentSummary && (
        <div className="p-6 border-b border-border">
          <Card className="p-6 bg-card border border-border shadow-medium">
            <div className="flex items-start gap-4">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Scale className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg mb-3 text-foreground">
                  Document Summary: {documentSummary.title}
                </h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Key Highlights */}
                  <div>
                    <h4 className="font-medium text-foreground mb-2 flex items-center gap-2">
                      <BookOpen className="h-4 w-4 text-primary" />
                      Key Highlights
                    </h4>
                    <ul className="space-y-2">
                      {documentSummary.highlights.map((highlight, index) => (
                        <li key={index} className="text-sm text-muted-foreground leading-relaxed">
                          • {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Actionable Insights */}
                  {documentSummary.actionableInsights && (
                    <div>
                      <h4 className="font-medium text-foreground mb-2">
                        ⚠️ Actionable Insights
                      </h4>
                      <ul className="space-y-2">
                        {documentSummary.actionableInsights.map((insight, index) => (
                          <li key={index} className="text-sm text-orange-400 leading-relaxed bg-orange-900/20 p-2 rounded border border-orange-900/30">
                            • {insight}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Chat Container */}
      <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full">
        {/* Chat Header with Clear Button */}
        {(messages.length > 0 || documentSummary) && (
          <div className="flex justify-between items-center p-4 border-b border-border">
            <h2 className="text-lg font-semibold text-foreground">Chat with LawWise</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClearChat}
              className="text-muted-foreground hover:text-destructive"
            >
              <X className="h-4 w-4 mr-2" />
              Clear Chat
            </Button>
          </div>
        )}

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.length === 0 && documentSummary && (
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <Scale className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  Document Analyzed
                </h3>
                <p className="text-muted-foreground">
                  Ask me any questions about your document above.
                </p>
              </div>
            </div>
          )}

          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-4 ${
                  message.isUser
                    ? 'bg-chat-user text-foreground'
                    : 'bg-chat-ai text-chat-ai-foreground'
                }`}
              >
                {!message.isUser && (
                  <div className="flex items-center gap-2 mb-2">
                    <Scale className="h-4 w-4 text-current" />
                    <span className="text-xs font-medium">LawWise AI</span>
                  </div>
                )}
                <p className="text-sm leading-relaxed">{message.content}</p>
                <span className="text-xs opacity-70 mt-2 block">
                  {message.timestamp.toLocaleTimeString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Input Area */}
      <div className="border-t border-border p-6 bg-card">
        <div className="flex gap-3 max-w-4xl mx-auto">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Enter your message..."
            className="flex-1 bg-input border-border text-foreground placeholder:text-muted-foreground"
          />
          <Button 
            onClick={handleSendMessage}
            disabled={!inputValue.trim()}
            className="bg-gradient-primary hover:shadow-glow transition-all duration-300 text-black"
            size="icon"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </main>
  );
}