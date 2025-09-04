import { useState } from "react";
import { Plus, FileText, Clock, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";

interface DocumentChat {
  id: string;
  title: string;
  timestamp: string;
  type: 'contract' | 'legal-doc' | 'terms';
}

interface SidebarProps {
  onNewDocument: () => void;
  currentChatId: string | null;
  onSelectChat: (chatId: string) => void;
}

export function Sidebar({ onNewDocument, currentChatId, onSelectChat }: SidebarProps) {
  const [documentChats] = useState<DocumentChat[]>([
    {
      id: "1",
      title: "Employment Contract Review",
      timestamp: "2 hours ago",
      type: "contract"
    },
    {
      id: "2", 
      title: "NDA Agreement Analysis",
      timestamp: "Yesterday",
      type: "legal-doc"
    },
    {
      id: "3",
      title: "Terms of Service Summary",
      timestamp: "3 days ago", 
      type: "terms"
    }
  ]);

  const getDocumentIcon = (type: string) => {
    switch (type) {
      case 'contract':
        return <FileText className="h-4 w-4" />;
      case 'legal-doc':
        return <MessageSquare className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  return (
    <div className="w-80 bg-card border-r border-border h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <Button 
          onClick={onNewDocument}
          className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-medium"
          size="lg"
        >
          <Plus className="mr-2 h-4 w-4" />
          New Document
        </Button>
      </div>

      {/* Document History */}
      <div className="flex-1 overflow-hidden">
        <div className="p-4">
          <h3 className="text-sm font-medium text-muted-foreground mb-3 flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Recent Documents
          </h3>
        </div>
        
        <ScrollArea className="flex-1 px-4">
          <div className="space-y-2">
            {documentChats.map((chat) => (
              <Card 
                key={chat.id}
                className={`p-3 cursor-pointer transition-all hover:shadow-sm border ${
                  currentChatId === chat.id 
                    ? 'border-accent bg-accent/5' 
                    : 'border-border hover:border-accent/50'
                }`}
                onClick={() => onSelectChat(chat.id)}
              >
                <div className="flex items-start gap-3">
                  <div className="mt-1 text-muted-foreground">
                    {getDocumentIcon(chat.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-foreground truncate">
                      {chat.title}
                    </h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      {chat.timestamp}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}