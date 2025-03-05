import React, { useState } from "react";

interface TooltipProps {
  content: string;
  children: React.ReactNode;
}

export default function CustomTooltip({ content, children }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);

  // Split content into sentences
  const sentences = content
    .split(/(?<=[.!?])\s+/)
    .filter((sentence) => sentence.trim().length > 0);

  return (
    <div className="relative inline-block">
      <div
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
      >
        {children}
      </div>

      {isVisible && (
        <div className="absolute z-10 px-6 py-4 text-sm text-white bg-gray-900 rounded-lg shadow-lg -top-2 right-full transform -translate-y-full mr-3 w-[32rem] max-w-[90vw]">
          <div className="text-right space-y-2">
            {sentences.map((sentence, index) => (
              <p key={index} className="leading-relaxed">
                {sentence}
              </p>
            ))}
          </div>
          <div className="absolute left-full top-1/2 transform -translate-y-1/2 -translate-x-1 border-8 border-transparent border-l-gray-900" />
        </div>
      )}
    </div>
  );
}
