/**
 * lib/api.ts
 * --------------------------------------------
 * Small Axios client for the FastAPI backend.
 * We hard-select the base URL by platform:
 *  - Web (browser): talk to local FastAPI on 127.0.0.1:8000
 *  - Mobile (Expo Go): talk to public ngrok tunnel
 *
 * This avoids env confusion during dev and guarantees
 * the web build never hits ngrok’s HTML warning page.
 * --------------------------------------------
 */

import axios from "axios";
import { Platform } from "react-native";

/** Local FastAPI for web builds */
const WEB_API = "http://127.0.0.1:8000";

/** Public tunnel for phones running Expo Go */
const MOBILE_API = "https://ned-plankless-nancie.ngrok-free.dev";

/**
 * Pick base URL strictly by platform.
 * NOTE: We intentionally ignore process.env here to remove ambiguity.
 */
const API_BASE = Platform.OS === "web" ? WEB_API : MOBILE_API;

// Helpful during debugging: confirms which URL the app is using
console.log("API_BASE =", API_BASE);

/** Shared Axios instance */
export const api = axios.create({
  baseURL: API_BASE,
  timeout: 8000,
});

/** Shape of /api/home response */
export type HomeStatus = {
  tickets_url: string;
  castle_queue_wait_mins: number;
  car_park_status: string;
  closing_time: string;
  last_admission: string;
};

/** Health check */
export async function ping() {
  const res = await api.get("/api/ping");
  return res.data as { status: string };
}

/** Home data */
export async function fetchHomeStatus() {
  const res = await api.get("/api/home");
  return res.data as HomeStatus;
}
