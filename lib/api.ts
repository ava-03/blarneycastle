import axios from "axios";

const PROD_API = "https://blarneycastle.onrender.com";

const API_BASE = process.env.EXPO_PUBLIC_API_BASE || PROD_API;

console.log("API_BASE =", API_BASE);

export const api = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
});

export type HomeStatus = {
  tickets_url: string;
  castle_queue_wait_mins: number;
  car_park_status: string;
  closing_time: string;
  last_admission: string;
};

export async function pingServer() {
  const res = await api.get("/api/ping");
  return res.data as { ok: boolean };
}

export async function fetchHomeStatus(): Promise<HomeStatus> {
  const res = await api.get("/api/home");
  return res.data;
}
