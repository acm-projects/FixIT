import { NextResponse } from "next/server";
import { Pinecone } from "@pinecone-database/pinecone";
import fs from "fs";

const index = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY,
  })
    .index("rag-index")
    .namespace("ns1");
  
  export async function POST() {
    try {
      const data = fs.readFileSync("data/reviews.json", "utf-8");
      const reviews = JSON.parse(data);
  
      const upserts = reviews.map((review) => ({
        id: review.id,
        values: review.embedding,
        metadata: { review: review.text },
      }));
  
      await index.upsert({ upserts });
  
      return NextResponse.json({ message: "Reviews uploaded successfully" });
    } catch (error) {
      console.error("Error uploading reviews:", error);
      return NextResponse.json({ error: "Failed to upload reviews." }, { status: 500 });
    }
  }