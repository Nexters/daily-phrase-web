interface ClarityAPI {
  (action: "consent"): void;
  (
    action: "identify",
    userId: string,
    sessionId?: string,
    pageId?: string,
    friendlyName?: string,
  ): void;
  (action: "set", key: string, value: string | string[]): void;
  (action: "event", eventName: string): void;
}

interface Window {
  clarity?: ClarityAPI;
}
