import { useEffect, useRef } from "react";
import { EventSourcePolyfill } from "event-source-polyfill";
import notyf from "../utils/notyf"; 

const useSSEListener = (matchId, token, onEvent) => {
  const processedEvents = useRef(new Set()); // Stocke les événements déjà reçus

  useEffect(() => {
    if (!matchId || !token) return;

    const eventSource = new EventSourcePolyfill(`http://localhost:3002/matches/${matchId}/subscribe`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    eventSource.onmessage = (event) => {
      const eventData = JSON.parse(event.data);

      const events = Array.isArray(eventData) ? eventData : [eventData];

      events.forEach((data) => {
        // Vérifie si l'événement a déjà été traité
        const eventKey = `${data.type}-${data.matchId}-${data.payload?.user || ""}`;
        if (processedEvents.current.has(eventKey)) return;
        
        processedEvents.current.add(eventKey); // Ajoute l'événement traité

        if (onEvent) onEvent(data);

        if (data.type === "PLAYER1_JOIN" || data.type === "PLAYER2_JOIN") {
          console.log("🎯 Event PLAYER JOIN détecté : ", data.type);
          const currentUser = localStorage.getItem("username");

          console.log("heeeeyyyyyyyy", data.payload.user, ' + ', currentUser)

          if (data.payload.user === currentUser) {
            notyf.success("Vous avez rejoint la partie !");
            console.log("✅ Notification : Vous avez rejoint la partie !");
          } else {
            notyf.success(`${data.payload.user} a rejoint la partie !`);
            console.log(`✅ Notification : ${data.payload.user} a rejoint la partie !`);
          }
        }
      });
    };

    eventSource.onerror = (error) => {
      console.error("❌ Erreur SSE :", error);
      eventSource.close();
    };

    return () => {
      console.log("🔌 Fermeture de la connexion SSE");
      eventSource.close();
    };
  }, [matchId, token, onEvent]);

  return null;
};

export default useSSEListener;