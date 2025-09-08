import { useEffect } from "react";
import axios from "axios";

function App() {

  const API_URL = process.env.REACT_APP_API_URL || "";
  useEffect(() => {
    const logVisit = async () => {
      try {
        await axios.post(`${process.env.BACKEND}/log-visit`, {
          url: window.location.href,
          referrer: document.referrer,
          userAgent: navigator.userAgent,
          language: navigator.language,
          screenWidth: window.screen.width,
          screenHeight: window.screen.height,
          colorDepth: window.screen.colorDepth,
          timezoneOffset: new Date().getTimezoneOffset(),
          platform: navigator.platform,
          cookiesEnabled: navigator.cookieEnabled,
          online: navigator.onLine,
          timestamp: new Date()
        });
        console.log("Visit logged!");
      } catch (err) {
        console.error("Error logging visit:", err);
      }
    };
    logVisit();
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>You have been Phished. Please refer to the training slides</h1>
    </div>
  );
}

export default App;
