import { FoodItem, DiningLocation } from "../types/dining";
import Constants from "expo-constants";
import { Platform } from "react-native";

function getApiBaseUrl(): string {
  const configuredUrl = process.env.EXPO_PUBLIC_API_URL?.replace(/\/$/, "");
  if (configuredUrl) {
    return configuredUrl;
  }

  if (Platform.OS === "web") {
    return "http://localhost:4000";
  }

  const hostUri = Constants.expoConfig?.hostUri;
  const host = hostUri?.split(":")[0];

  if (host) {
    return `http://${host}:4000`;
  }

  throw new Error(
    "Unable to determine the API address. Set EXPO_PUBLIC_API_URL."
  );
}

export const API_BASE_URL = getApiBaseUrl();

export interface MenuResponse {
  name: string;
  slug: string;
  foodItems: FoodItem[];
}

export async function fetchMenu(slug: string): Promise<MenuResponse> {
  const res = await fetch(
    `${API_BASE_URL}/api/diningLocations/${encodeURIComponent(slug)}/menu`
  );

  if (!res.ok) {
    throw new Error(`Failed to load menu: ${res.status}`);
  }

  return res.json();
}

export async function fetchDiningLocations(): Promise<DiningLocation[]> {
  const res = await fetch(
    `${API_BASE_URL}/api/diningLocations`
  );

  if (!res.ok) {
    throw new Error(`Failed to load dining locations: ${res.status}`);
  }

  return res.json();
}