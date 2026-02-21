import { useState } from 'react';
import { supabase } from '../services/supabase';

type AIResponse = {
  text: string;
};

export function useAI() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AIResponse | null>(null);

  const callAI = async (prompt: string) => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      // Use Supabase Edge Function for AI chat
      // Note: You'll need to create a 'chat-ai' Edge Function similar to 'recommend-ai'
      // For now, this provides a fallback response
      const { data, error: supabaseError } = await supabase.functions.invoke('chat-ai', {
        body: { prompt },
      });

      if (supabaseError) {
        // Fallback to a simple response if the Edge Function doesn't exist yet
        console.warn('Chat AI function not available, using fallback:', supabaseError.message);
        const fallbackResponse: AIResponse = {
          text: `I understand you're asking about: "${prompt}". This is a SNAP benefits assistant. To get personalized meal recommendations, please complete the onboarding process. For general questions about SNAP benefits, visit your local benefits office or check the official SNAP website.`
        };
        setResult(fallbackResponse);
        return;
      }

      if (data && typeof data === 'object' && 'text' in data) {
        setResult(data as AIResponse);
      } else if (typeof data === 'string') {
        // Handle case where Edge Function returns just a string
        setResult({ text: data });
      } else {
        throw new Error('Unexpected response format from AI service');
      }
    } catch (e: any) {
      const errorMessage = e.message ?? 'Unknown error occurred';
      setError(errorMessage);
      console.error('Error calling AI:', e);
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, result, callAI };
}
