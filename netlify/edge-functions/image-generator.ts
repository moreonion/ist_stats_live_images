import React from "https://esm.sh/react";
import { renderToReadableStream } from "https://esm.sh/react-dom/server";
import type { Config, Context } from "@netlify/edge-functions";

export default async (request, context) => {
    // Get the visitor's country from the context
    const country = context.geo?.country?.name || "Unknown Country";

    // Create a response with country-specific greeting
    const response = new Response(`image Hello from ${country}!
    Processed at edge location: ${context.geo?.city || "Unknown City"}
    Your IP: ${context.ip}
    Timestamp: ${new Date().toISOString()}
  `);

    // Add custom headers
    response.headers.set("X-Custom-Header", "Processed by Netlify Edge");
    response.headers.set("Content-Type", "text/plain");

    return response;
};
