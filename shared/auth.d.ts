// auth.d.ts
declare module '#auth-utils' {
  // Define the structure of your user object
  interface User {
    id: string;
    email: string;
    name: string;
    roles: string[];
  }

  // Define any additional data you want to store in the session
  interface UserSession {
    loggedInAt: Date;
    // Add other session-specific data here if needed
  }

  // Define secure session data if you have any server-side only data
  interface SecureSessionData {
    // Add your own fields for server-side only data
  }
}

export {};
