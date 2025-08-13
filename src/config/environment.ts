// Environment configuration for different stages
export const config = {
  apiUrl: import.meta.env.VITE_API_URL || "http://localhost:3000/api",
  environment: import.meta.env.VITE_APP_ENV || "development",
  version: import.meta.env.VITE_APP_VERSION || "1.0.0",
} as const

export const isDevelopment = config.environment === "development"
export const isProduction = config.environment === "production"
