import { useEffect } from "react";
import { EventSourcePolyfill } from "event-source-polyfill";

const useSSEListener = (matchId, token, onEvent) => {
  useEffect(() => {
    if (!matchId || !token) return;

    const eventSource = new EventSourcePolyfill(`http://localhost:3002/matches/${matchId}/subscribe`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("📩 Événement SSE reçu :", data);
      if (onEvent) onEvent(data);
    };

    eventSource.onerror = (error) => {
      console.error("Erreur SSE :", error);
      eventSource.close();
    };

    return () => {
      console.log("Fermeture de la connexion SSE");
      eventSource.close();
    };
  }, [matchId, token, onEvent]);
};

export default useSSEListener;
