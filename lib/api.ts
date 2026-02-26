// https://fastapi.tiangolo.com/tutorial/response-model/
// https://axios-http.com/docs/api_intro

// Shared Axios client for FastAPI backend
// Switches between localhost (web) and ngrok (mobile)

import axios from "axios";
import { Platform } from "react-native";

// Render backend (set in .env locally and in Vercel env vars)
const ENV_API = process.env.EXPO_PUBLIC_API_BASE;

// Local dev backend
const LOCAL_API = "http://127.0.0.1:8000";


const API_BASE = ENV_API ?? LOCAL_API;

console.log("API_BASE =", API_BASE);

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
