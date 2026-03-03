// https://fastapi.tiangolo.com/tutorial/response-model/
// https://axios-http.com/docs/api_intro

// Shared Axios client for FastAPI backend
// Uses environment variable for mobile builds
// Falls back to localhost ONLY for web development

import axios from "axios";
import { Platform } from "react-native";

// Backend URL from environment
const ENV_API = process.env.EXPO_PUBLIC_API_BASE;

// Local development backend (web only)
const LOCAL_API = "http://127.0.0.1:8000";

// Decide API base URL
let API_BASE: string | undefined;

if (ENV_API) {
  API_BASE = ENV_API;
} else if (Platform.OS === "web") {
  API_BASE = LOCAL_API;
}

// If still undefined, this means a mobile build without env var
if (!API_BASE) {
  throw new Error(
    "Missing EXPO_PUBLIC_API_BASE environment variable. Set it in eas.json or EAS environment variables."
  );
}

console.log("API_BASE =", API_BASE);

// Axios instance
export const api = axios.create({
  baseURL: API_BASE,
  timeout: 8000,
});

// Shape of /api/home response
export type HomeStatus = {
  tickets_url: string;
  castle_queue_wait_mins: number;
  car_park_status: string;
  closing_time: string;
  last_admission: string;
};

// Health check
export async function ping() {
  const res = await api.get("/api/ping");
  return res.data as { status: string };
}

// Home data
export async function fetchHomeStatus() {
  const res = await api.get("/api/home");
  return res.data as HomeStatus;
}