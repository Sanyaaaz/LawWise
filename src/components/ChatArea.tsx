
import { useState } from "react";
import { Send, Scale, BookOpen, X, Upload, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Hero } from "./Hero";
import { DocumentUpload, UploadedFile } from "./DocumentUpload";
import { useChat } from "@/contexts/chatContext";

export function ChatArea() {
  const [inputValue, setInputValue] = useState("");
  const [showUploadInterface, setShowUploadInterface] = useState(false);
  
  const {
    chats,
    currentChat,
    createNewChat,
    addMessage,
    uploadDocument,
    isUploading,
    clearAllChats
  } = useChat();

  const handleSendMessage = () => {
    if (!inputValue.trim() || !currentChat) return;

    // Add user message
    addMessage(inputValue, true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = generateAIResponse(inputValue);
      addMessage(aiResponse, false);
    }, 1000);

    setInputValue("");
  };

  const generateAIResponse = (userInput: string): string => {
    if (userInput.toLowerCase().includes("contract")) {
      return "Based on your contract, I can help you understand the key terms and conditions. The document appears to have standard clauses with specific attention needed on termination and liability sections.";
    }
    if (userInput.toLowerCase().includes("clause")) {
      return "This clause typically means that both parties agree to specific terms. Let me break down the legal language for you in simpler terms.";
    }
    if (userInput.toLowerCase().includes("hello") || userInput.toLowerCase().includes("hi")) {
      return "Hello! I'm LawWise AI. How can I assist you with your legal documents today?";
    }
    return "I understand your question about the legal document. Let me analyze the relevant sections and provide you with a clear explanation of what this means for your specific situation.";
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const handleFileUpload = (file: File) => {
    setShowUploadInterface(false);
    uploadDocument(file);
    // Add user message about the upload
    addMessage(`I've uploaded "${file.name}" for analysis.`, true);
  };

  const handleNewChat = () => {
    setShowUploadInterface(false);
    createNewChat();
  };

  const handleUploadClick = () => {
    setShowUploadInterface(true);
    if (!currentChat) {
      createNewChat();
    }
  };

  const handleCancelUpload = () => {
    setShowUploadInterface(false);
  };

  // Show hero when no active chat
  if (!currentChat && chats.length === 0 && !showUploadInterface) {
    return (
      <main className="flex-1 flex flex-col bg-background">
        <Hero onTryDemo={createNewChat} />
        
        {/* Chat Input */}
        <div className="border-t border-border p-6 bg-card">
          <div className="flex gap-3 max-w-4xl mx-auto">
            <div className="flex-1 flex gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={handleUploadClick}
                disabled={isUploading}
                className="border-border"
              >
                <Upload className="h-4 w-4" />
              </Button>
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Enter your message..."
                className="flex-1 bg-input border-border text-foreground placeholder:text-muted-foreground"
                disabled={isUploading}
              />
            </div>
            <Button 
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isUploading}
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

  // Show upload interface when upload button is clicked
  if (showUploadInterface) {
    return (
      <main className="flex-1 flex flex-col bg-background">
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="w-full max-w-md">
            <DocumentUpload 
              onFileUpload={handleFileUpload}
              isUploading={isUploading}
              onClose={handleCancelUpload} isOpen={false} onUploadComplete={function (file: UploadedFile): void {
                throw new Error("Function not implemented.");
              } }            />
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-1 flex flex-col bg-background">
      {/* Document Summary Card */}
      {currentChat?.documentSummary && (
        <div className="p-6 border-b border-border">
          <Card className="p-6 bg-card border border-border shadow-medium">
            <div className="flex items-start gap-4">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Scale className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg mb-3 text-foreground">
                  Document Summary: {currentChat.documentSummary.title}
                </h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-foreground mb-2 flex items-center gap-2">
                      <BookOpen className="h-4 w-4 text-primary" />
                      Key Highlights
                    </h4>
                    <ul className="space-y-2">
                      {currentChat.documentSummary.highlights.map((highlight, index) => (
                        <li key={index} className="text-sm text-muted-foreground leading-relaxed">
                          • {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {currentChat.documentSummary.actionableInsights && (
                    <div>
                      <h4 className="font-medium text-foreground mb-2">
                        ⚠️ Actionable Insights
                      </h4>
                      <ul className="space-y-2">
                        {currentChat.documentSummary.actionableInsights.map((insight, index) => (
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
        {/* Chat Header */}
        <div className="flex justify-between items-center p-4 border-b border-border">
          <h2 className="text-lg font-semibold text-foreground">
            {currentChat?.title || "New Chat"}
          </h2>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleUploadClick}
              className="text-muted-foreground"
              disabled={isUploading}
            >
              <Upload className="h-4 w-4 mr-2" />
              Upload
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleNewChat}
              className="text-muted-foreground"
            >
              <FileText className="h-4 w-4 mr-2" />
              New Chat
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllChats}
              className="text-muted-foreground hover:text-destructive"
            >
              <X className="h-4 w-4 mr-2" />
              Clear
            </Button>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {currentChat?.messages.length === 0 && !currentChat?.documentSummary && (
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <Scale className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  Start a Conversation
                </h3>
                <p className="text-muted-foreground">
                  Ask me anything about legal documents or upload a file to get started.
                </p>
              </div>
            </div>
          )}

          {currentChat?.messages.map((message) => (
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
                  {new Date(message.timestamp).toLocaleTimeString()}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Input Area */}
        <div className="border-t border-border p-6 bg-card">
          <div className="flex gap-3 max-w-4xl mx-auto">
            <div className="flex-1 flex gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={handleUploadClick}
                disabled={isUploading}
                className="border-border"
              >
                <Upload className="h-4 w-4" />
              </Button>
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Enter your message..."
                className="flex-1 bg-input border-border text-foreground placeholder:text-muted-foreground"
                disabled={isUploading}
              />
            </div>
            <Button 
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isUploading}
              className="bg-gradient-primary hover:shadow-glow transition-all duration-300 text-black"
              size="icon"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}