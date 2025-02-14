import { useEffect, useRef } from "react";
import { EventSourcePolyfill } from "event-source-polyfill";

/**
 * Hook d'écoute des événements SSE.
 * @param {string} matchId
 * @param {string} token
 * @param {Function} onEvent
 * @param {boolean} active
 */
const useSSEListener = (matchId, token, onEvent, active = true) => {
  const eventSourceRef = useRef(null);

  useEffect(() => {
    if (!active) {
      return;
    }
    if (!matchId || !token) return;

    const eventSource = new EventSourcePolyfill(
      `https://chifoumi.kmarques.dev/matches/${matchId}/subscribe`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    eventSourceRef.current = eventSource;

    eventSource.onmessage = (event) => {
      let eventData;
      try {
        eventData = JSON.parse(event.data);
      } catch (error) {
        console.error("Erreur lors du parsing des données SSE :", error);
        return;
      }
      if (onEvent) {
        onEvent(eventData);
      }
      if (Array.isArray(eventData)) {
        if (eventData.some((ev) => ev.type === "MATCH_ENDED")) {
          console.log("Fermeture de la connexion SSE car MATCH_ENDED détecté dans un tableau.");
          eventSource.close();
        }
      } else if (eventData && eventData.type === "MATCH_ENDED") {
        console.log("Fermeture de la connexion SSE car MATCH_ENDED détecté.");
        eventSource.close();
      }
    };

    eventSource.onerror = (error) => {
      console.error("Erreur SSE :", error);
      eventSource.close();
    };

    return () => {
      console.log("Fermeture de la connexion SSE (nettoyage)");
      eventSource.close();
    };
  }, [matchId, token, onEvent, active]);

  return null;
};

export default useSSEListener;