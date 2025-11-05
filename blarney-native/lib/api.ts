/**
 * lib/api.ts
 * --------------------------------------------
 * This file creates a small "Axios client".
 * Axios is a library that helps our app make
 * HTTP requests (GET, POST, etc.) to the FastAPI backend.
 * --------------------------------------------
 */

import axios from "axios";

/**
 * EXPO_PUBLIC_API_BASE comes from your .env file.
 * Expo automatically makes any variable that starts
 * with EXPO_PUBLIC_ available inside the app.
 */
import { Platform } from "react-native";

// 
const LOCAL_API = "http://127.0.0.1:8000"; // used when running on web
const NGROK_API = "https://ned-plankless-nancie.ngrok-free.dev"; //  public tunnel

// 
const API_BASE =
  process.env.EXPO_PUBLIC_API_BASE ||
  (Platform.OS === "web" ? LOCAL_API : NGROK_API);


/**
 * Create a reusable Axios instance with the base URL of our backend.
 * We also add a timeout (8 seconds) so the app doesn’t hang forever
 * if the server isn’t responding.
 */
export const api = axios.create({
  baseURL: API_BASE,
  timeout: 8000,
});

/**
 * TypeScript interface that describes what data
 * the /api/home endpoint sends back.
 */
export type HomeStatus = {
  tickets_url: string;
  castle_queue_wait_mins: number;
  car_park_status: string;
  closing_time: string;
  last_admission: string;
};

/**
 * Simple function that checks if the backend is online.
 * It calls /api/ping and expects {"status": "ok"}.
 */
export async function ping() {
  const res = await api.get("/api/ping");
  return res.data as { status: string };
}

/**
 * Function that gets the information for the Home page.
 * It calls /api/home on the backend and returns the data.
 */
export async function fetchHomeStatus() {
  const res = await api.get("/api/home");
  return res.data as HomeStatus;
}
