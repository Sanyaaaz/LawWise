import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import legalScaleIcon from "@/assets/legal-scale-icon.png";

interface HeaderProps {
  onUploadClick: () => void;
}

export function Header({ onUploadClick }: HeaderProps) {
  return (
    <header className="h-16 bg-card border-b border-border flex items-center justify-between px-6">
      {/* Logo and Title */}
      <div className="flex items-center gap-3">
        <img 
          src={legalScaleIcon} 
          alt="LexiSimplify Logo" 
          className="w-8 h-8"
        />
        <div>
          <h1 className="text-xl font-bold text-foreground">LexiSimplify</h1>
          <p className="text-sm text-muted-foreground">Your Legal AI Assistant</p>
        </div>
      </div>

      {/* Upload Button */}
      <Button 
        onClick={onUploadClick}
        className="bg-accent hover:bg-accent/90 text-accent-foreground font-medium"
        size="sm"
      >
        <Upload className="mr-2 h-4 w-4" />
        Upload Document
      </Button>
    </header>
  );
}