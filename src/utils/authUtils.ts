export function getValidToken(): string | null {
    const token = getToken();
    if (!token) return null; // No token found
    if (isTokenExpired(token)) {
        //Token expired, remove it
        removeToken()
        return null; // Token expired
    }
    return token;
}

export function isTokenExpired(token: string): boolean {
    const payload = decodeToken(token);
    if (!payload) return true;
    return Date.now() >= payload.exp * 1000;
}

export function saveToken(token: string) {
    localStorage.setItem("token", token);
}

function getToken(): string | null {
    return localStorage.getItem("token");
}

export function removeToken() {
    localStorage.removeItem("token");
}

export function decodeToken(token: string): { id: string; role: string; exp: number } | null {
    try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        return payload;
    } catch (error) {
        console.error("Invalid token format", error);
        return null;
    }
}

