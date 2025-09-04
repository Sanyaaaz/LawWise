import { Plus, FileText, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface Chat {
  id: string;
  title: string;
  timestamp: string;
}

interface SidebarProps {
  onNewDocument: () => void;
  currentChatId: string | null;
  onSelectChat: (chatId: string) => void;
  onClearChat: () => void;
}

export function Sidebar({ onNewDocument, currentChatId, onSelectChat, onClearChat }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  // Mock previous chats data
  const previousChats: Chat[] = [
    {
      id: "1",
      title: "Employment Contract Review",
      timestamp: "2 hours ago"
    },
    {
      id: "2", 
      title: "NDA Analysis",
      timestamp: "1 day ago"
    },
    {
      id: "3",
      title: "Lease Agreement Summary", 
      timestamp: "3 days ago"
    }
  ];

  return (
    <>
      {/* Mobile Menu Button */}
      <Button
        className="md:hidden fixed top-20 left-4 z-50 bg-card border border-border"
        size="icon"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <Menu className="h-4 w-4" />
      </Button>

      {/* Sidebar */}
      <aside className={cn(
        "bg-sidebar border-r border-sidebar-border flex flex-col transition-all duration-300",
        "fixed md:relative z-40 h-full md:h-auto",
        isCollapsed ? "-translate-x-full md:translate-x-0 md:w-16" : "w-80",
        "md:translate-x-0"
      )}>
        {/* Mobile Close Button */}
        <Button
          className="md:hidden absolute top-4 right-4"
          variant="ghost"
          size="icon"
          onClick={() => setIsCollapsed(true)}
        >
          <X className="h-4 w-4" />
        </Button>

        {/* Header */}
        {!isCollapsed && (
          <div className="p-4 border-b border-sidebar-border">
            <Button 
              onClick={onNewDocument}
              className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300 text-black font-medium"
            >
              <Plus className="mr-2 h-4 w-4" />
              New Document
            </Button>
          </div>
        )}

        {/* Collapsed State */}
        {isCollapsed && (
          <div className="p-2 border-b border-sidebar-border hidden md:block">
            <Button 
              onClick={onNewDocument}
              size="icon"
              className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        )}

        {/* Chat History */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-4">
            {!isCollapsed && (
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-medium text-sidebar-foreground">
                  Previous Chats
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClearChat}
                  className="text-xs text-muted-foreground hover:text-destructive"
                >
                  Clear Chat
                </Button>
              </div>
            )}
            <div className="space-y-2">
              {previousChats.map((chat) => (
                <button
                  key={chat.id}
                  onClick={() => onSelectChat(chat.id)}
                  className={cn(
                    "w-full text-left rounded-lg border transition-colors",
                    "hover:bg-sidebar-accent hover:border-primary/50",
                    currentChatId === chat.id 
                      ? "bg-sidebar-accent border-primary text-sidebar-foreground" 
                      : "border-sidebar-border text-sidebar-foreground/70",
                    isCollapsed ? "p-2" : "p-3"
                  )}
                >
                  <div className="flex items-start gap-3">
                    <FileText className="h-4 w-4 mt-0.5 text-primary" />
                    {!isCollapsed && (
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">
                          {chat.title}
                        </p>
                        <p className="text-xs text-sidebar-foreground/50 mt-1">
                          {chat.timestamp}
                        </p>
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Collapse Toggle for Desktop */}
        <div className="hidden md:block p-2 border-t border-sidebar-border">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="w-full text-muted-foreground"
          >
            {isCollapsed ? ">" : "<"}
          </Button>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {!isCollapsed && (
        <div 
          className="md:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setIsCollapsed(true)}
        />
      )}
    </>
  );
}