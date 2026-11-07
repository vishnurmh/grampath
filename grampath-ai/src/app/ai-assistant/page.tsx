"use client";

import * as React from "react";
import { Navbar } from "@/components/Navbar";
import AIAssistantChat from "@/app/dashboard/ai-assistant/page";

export default function PublicAIAssistant() {
  return (
    <div className="min-h-screen flex flex-col bg-navy">
      <Navbar />
      <main className="flex-1 px-4 pt-16 pb-20 md:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-8">AI Assistant</h1>
          <AIAssistantChat />
        </div>
      </main>
    </div>
  );
}
