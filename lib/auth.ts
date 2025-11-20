// Simple authentication system
// In production, use a proper authentication library like NextAuth.js

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123' // Change this in production!

export function verifyPassword(password: string): boolean {
  return password === ADMIN_PASSWORD
}

export function setSession(password: string): boolean {
  if (verifyPassword(password)) {
    // In a real app, use secure cookies or JWT tokens
    if (typeof window !== 'undefined') {
      localStorage.setItem('admin_authenticated', 'true')
      return true
    }
  }
  return false
}

export function isAuthenticated(): boolean {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('admin_authenticated') === 'true'
  }
  return false
}

export function clearSession(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('admin_authenticated')
  }
}

