export interface Message {
    id: string;
    content: string;
    isUser: boolean;
    timestamp: Date;
    fileUrl?: string;
  }
  
  export interface Chat {
    id: string;
    title: string;
    messages: Message[];
    createdAt: Date;
  }
  