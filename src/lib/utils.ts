import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPKR(amount: number): string {
  return `PKR ${amount.toLocaleString("en-PK")}`;
}

/**
 * Calculates Great-Circle distance between two coordinates using the Haversine formula
 * Returns distance in kilometers (km), rounded to 1 decimal place.
 */
export function calculateDistanceKm(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Earth's radius in kilometers
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c;

  return Math.round(d * 10) / 10;
}

function deg2rad(deg: number): number {
  return deg * (Math.PI / 180);
}

// Preset popular Pakistani residential clusters for instant mock testing & user selection
export const PAKISTAN_LOCATIONS = [
  { city: "Karachi", area: "Gulshan-e-Iqbal, Block 6", lat: 24.9207, lng: 67.0927 },
  { city: "Karachi", area: "DHA Phase 6", lat: 24.7892, lng: 67.0628 },
  { city: "Karachi", area: "PECHS Block 2", lat: 24.8716, lng: 67.0634 },
  { city: "Karachi", area: "North Nazimabad", lat: 24.9392, lng: 67.0345 },
  { city: "Lahore", area: "DHA Phase 5", lat: 31.4705, lng: 74.4095 },
  { city: "Lahore", area: "Gulberg III", lat: 31.5126, lng: 74.3541 },
  { city: "Lahore", area: "Johar Town, Phase 1", lat: 31.4697, lng: 74.2728 },
  { city: "Lahore", area: "Model Town", lat: 31.4883, lng: 74.3218 },
  { city: "Islamabad", area: "Sector F-8/3", lat: 33.7142, lng: 73.0366 },
  { city: "Islamabad", area: "Sector G-11/2", lat: 33.6698, lng: 72.9984 },
  { city: "Islamabad", area: "DHA Phase 2", lat: 33.5284, lng: 73.1558 },
  { city: "Rawalpindi", area: "Bahria Town Phase 4", lat: 33.5358, lng: 73.1072 },
  { city: "Rawalpindi", area: "Saddar / Cantt", lat: 33.5973, lng: 73.0515 },
];
