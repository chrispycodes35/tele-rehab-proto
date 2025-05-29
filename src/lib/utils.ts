import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const calculateAge = (isoDate: string) => {
  const diff = Date.now() - new Date(isoDate).getTime()
  return Math.floor(diff / (365.25 * 24 * 60 * 60 * 1000))
}

export const daysAgo = (isoDate: string) => {
  const diff = Date.now() - new Date(isoDate).getTime()
  return Math.floor(diff / (24 * 60 * 60 * 1000))
}
