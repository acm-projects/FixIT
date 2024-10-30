import dotenv from 'dotenv';
dotenv.config();

import { NextResponse } from "next/server.js";
import { Pinecone } from "@pinecone-database/pinecone";
import fetch from "node-fetch";
import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);
const MODEL = "intfloat/multilingual-e5-large";
const HUGGINGFACE_API_TOKEN = process.env.HUGGINGFACE_API_TOKEN;

const index = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY,
})
  .index("rag-index")
  .namespace("ns1");

const systemPrompt = ``;


async function fetchEmbeddingsWithRetry(text, retries = 5) {
    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        const response = await fetch(
          `https://api-inference.huggingface.co/models/${MODEL}`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${HUGGINGFACE_API_TOKEN}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ inputs: text }),
          }
        );
  
        if (!response.ok) {
          const errorBody = await response.text();
          if (response.status === 503) {
            console.warn(`Model is loading, retrying (${attempt}/${retries})...`);
            await new Promise((resolve) => setTimeout(resolve, 2000));
          } else {
            console.error("Error response body:", errorBody);
            throw new Error(`Failed to fetch embeddings: ${response.statusText}`);
          }
        } else {
          return await response.json();
        }
      } catch (error) {
        if (attempt === retries) {
          throw error;
        }
      }
    }
  }
  
  export async function POST(req) {
    try {
      const messages = await req.json();
      const userMessage = messages[messages.length - 1];
      const userQuery = userMessage.content;
  
      const [queryEmbedding] = await fetchEmbeddingsWithRetry(userQuery);
      const results = await index.query({
        vector: queryEmbedding,
        topK: 3,
      });
  
      const context = results.matches.map((match) => match.metadata.review).join("\n");
      const prompt = `${systemPrompt}\n\n**Query:** ${userQuery}\n\n**Context:** ${context}`;
  
      const response = await genAI.generateText({
        prompt: prompt,
        model: "text-davinci-003",
        maxTokens: 500,
      });
  
      return NextResponse.json({ content: response.choices[0].text });
    } catch (error) {
      console.error("Error processing request:", error);
      return NextResponse.json({ error: "Failed to process request." }, { status: 500 });
    }
  }