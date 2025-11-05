
import { GoogleGenAI, Type } from '@google/genai';
import { TestType, Question } from '../types';

if (!process.env.API_KEY) {
    console.warn("Gemini API key not found. Please set the API_KEY environment variable.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

export const generateCareerRecommendations = async (
  testType: TestType,
  questions: Question[],
  answers: Record<string, string>
): Promise<string[]> => {
  const formattedAnswers = questions
    .map((q, index) => `Question ${index + 1}: "${q.text}"\nAnswer: "${answers[q.id] || 'Not answered'}"`)
    .join('\n');

  const prompt = `
    You are an expert career counselor AI. A student has completed a '${testType}' assessment. 
    Based on their answers below, provide a list of 3 to 5 highly relevant career recommendations.
    For each recommendation, provide a brief, one-sentence explanation of why it's a good fit.

    Assessment Answers:
    ${formattedAnswers}

    Your response must be a valid JSON object.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            recommendations: {
              type: Type.ARRAY,
              description: 'A list of career recommendations.',
              items: {
                type: Type.OBJECT,
                properties: {
                    career: { 
                        type: Type.STRING,
                        description: 'The name of the recommended career.'
                    },
                    reason: {
                        type: Type.STRING,
                        description: 'A brief, one-sentence explanation for the recommendation.'
                    }
                },
              },
            },
          },
          required: ['recommendations'],
        },
      },
    });

    const jsonString = response.text.trim();
    const result = JSON.parse(jsonString);
    
    if (result.recommendations && Array.isArray(result.recommendations)) {
        return result.recommendations.map((rec: {career: string, reason: string}) => `${rec.career}: ${rec.reason}`);
    } else {
        throw new Error("Invalid response format from AI.");
    }
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    throw new Error('Failed to get career recommendations. Please check your API key and try again.');
  }
};
