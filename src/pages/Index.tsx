import { useState } from "react";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { ChatArea } from "@/components/ChatArea";
import { DocumentUpload } from "@/components/DocumentUpload";

interface DocumentSummary {
  title: string;
  highlights: string[];
  actionableInsights?: string[];
}

interface UploadedFile {
  name: string;
  size: number;
  type: string;
}

const Index = () => {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [currentChatId, setCurrentChatId] = useState<string | null>(null);
  const [documentSummary, setDocumentSummary] = useState<DocumentSummary | undefined>();

  const handleNewDocument = () => {
    setIsUploadModalOpen(true);
  };

  const handleUploadComplete = (file: UploadedFile) => {
    // Simulate document processing and summary generation
    const summary: DocumentSummary = {
      title: file.name,
      highlights: [
        "Contract terms clearly defined with 30-day notice period",
        "Liability limitations specified in Section 8.2",
        "Intellectual property rights retained by original owner",
        "Termination clauses include standard industry protections",
        "Payment terms require 15-day processing window"
      ],
      actionableInsights: [
        "Review the termination clause - it may affect your future employment options",
        "The liability limitation could impact your ability to claim damages",
        "Consider negotiating the 30-day notice period if it affects your transition plans"
      ]
    };

    setDocumentSummary(summary);
    setCurrentChatId(Date.now().toString());
    setIsUploadModalOpen(false);
  };

  const handleSelectChat = (chatId: string) => {
    setCurrentChatId(chatId);
    // In a real app, you would load the chat history for this ID
    if (chatId === "1") {
      setDocumentSummary({
        title: "Employment Contract Review",
        highlights: [
          "Non-compete clause active for 12 months",
          "Stock options vest over 4 years",
          "Benefits include health, dental, and 401k matching",
          "Termination requires 2 weeks notice from employee",
          "Salary review scheduled annually in Q1"
        ],
        actionableInsights: [
          "The non-compete clause may limit your job opportunities after leaving",
          "Stock option vesting schedule favors long-term employment"
        ]
      });
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-['Inter',sans-serif]">
      {/* Header */}
      <Header onUploadClick={handleNewDocument} />
      
      {/* Main Layout */}
      <div className="flex h-[calc(100vh-4rem)]">
        {/* Sidebar */}
        <Sidebar 
          onNewDocument={handleNewDocument}
          currentChatId={currentChatId}
          onSelectChat={handleSelectChat}
        />
        
        {/* Main Chat Area */}
        <ChatArea 
          documentSummary={documentSummary}
          currentChatId={currentChatId}
        />
        
        {/* Upload Modal */}
        <DocumentUpload 
          isOpen={isUploadModalOpen}
          onClose={() => setIsUploadModalOpen(false)}
          onUploadComplete={handleUploadComplete}
        />
      </div>
    </div>
  );
};

export default Index;
