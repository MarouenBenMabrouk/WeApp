'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Send, X, Bot, User, Code, FileText, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  type?: 'text' | 'code' | 'suggestion';
}

interface AiChatProps {
  onClose: () => void;
}

export function AiChat({ onClose }: AiChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hello! I'm here to help you with your project. I can help you modify code, add features, fix bugs, or answer questions about your project. What would you like to work on?",
      timestamp: new Date(),
      type: 'text'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
      type: 'text'
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `I understand you want to ${input.toLowerCase()}. Let me help you with that. I can generate the necessary code changes and explain the implementation.`,
        timestamp: new Date(),
        type: 'text'
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1000);
  };

  const suggestions = [
    { text: "Add a dark mode toggle", icon: <Sparkles className="w-4 h-4" /> },
    { text: "Improve mobile responsiveness", icon: <Code className="w-4 h-4" /> },
    { text: "Add form validation", icon: <FileText className="w-4 h-4" /> },
  ];

  return (
    <div className="h-full bg-slate-800 border-l border-slate-700 flex flex-col">
      {/* Chat Header */}
      <div className="flex items-center justify-between p-4 border-b border-slate-700">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-white">AI Assistant</h3>
            <p className="text-xs text-slate-400">Ready to help</p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="text-slate-400 hover:text-white"
        >
          <X className="w-4 h-4" />
        </Button>
      </div>

      {/* Suggestions */}
      <div className="p-4 border-b border-slate-700">
        <p className="text-sm text-slate-400 mb-3">Quick suggestions:</p>
        <div className="space-y-2">
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => setInput(suggestion.text)}
              className="w-full text-left p-2 rounded-md bg-slate-700/50 hover:bg-slate-700 transition-colors text-sm text-slate-300 flex items-center space-x-2"
            >
              {suggestion.icon}
              <span>{suggestion.text}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex max-w-[80%] ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className={message.role === 'user' ? 'bg-blue-600' : 'bg-purple-600'}>
                      {message.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                    </AvatarFallback>
                  </Avatar>
                  <div className={`mx-2 p-3 rounded-lg ${
                    message.role === 'user' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-slate-700 text-slate-100'
                  }`}>
                    <p className="text-sm">{message.content}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          {isLoading && (
            <div className="flex justify-start">
              <div className="flex">
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="bg-purple-600">
                    <Bot className="w-4 h-4" />
                  </AvatarFallback>
                </Avatar>
                <div className="mx-2 p-3 rounded-lg bg-slate-700">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Input */}
      <div className="p-4 border-t border-slate-700">
        <div className="flex space-x-2">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me anything about your project..."
            className="bg-slate-700 border-slate-600 text-white placeholder-slate-400 resize-none"
            rows={2}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
          />
          <Button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}