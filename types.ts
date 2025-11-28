export interface NavItem {
  label: string;
  href: string;
}

export interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export interface ChatState {
  isOpen: boolean;
  messages: Message[];
  isLoading: boolean;
}

export interface VoiceState {
  isOpen: boolean;
  isConnected: boolean;
  isSpeaking: boolean;
}