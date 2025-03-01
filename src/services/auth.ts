import { NavigateFunction } from "react-router";

const TOKEN_KEY = "auth_tokens";

export function getStoredTokens(): string | null {
  try {
    const tokens = localStorage.getItem(TOKEN_KEY);
    return tokens ? JSON.parse(tokens) : null;
  } catch {
    return null;
  }
}

export function storeTokens(
  tokens: string,
  navigate?: NavigateFunction,
  setIsAuthenticated?: () => void
): void {
  localStorage.setItem(TOKEN_KEY, JSON.stringify(tokens));

  if (setIsAuthenticated) {
    setIsAuthenticated();
  }

  if (navigate) {
    navigate("/", { replace: true });
  }
}

export function removeTokens(
  navigate?: NavigateFunction,
  setIsAuthenticated?: () => void
): void {
  localStorage.removeItem(TOKEN_KEY);

  if (setIsAuthenticated) {
    setIsAuthenticated();
  }

  if (navigate) {
    navigate("/login", { replace: true });
  }
}

export function isAuthenticated(): boolean {
  return !!getStoredTokens();
}
