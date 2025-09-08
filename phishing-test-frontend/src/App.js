import { useEffect } from "react";
import axios from "axios";

function App() {
  useEffect(() => {
    const logVisit = async () => {
      try {
        const API_URL = process.env.REACT_APP_API_URL || "https://phishing-test-96hg.onrender.com";
        await axios.post(`${API_URL}/log-visit`, {
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
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
      backgroundColor: "#f5f7fa",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      padding: "20px"
    }}>
      <div style={{
        maxWidth: "600px",
        backgroundColor: "#fff",
        padding: "40px",
        borderRadius: "12px",
        boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
        textAlign: "center"
      }}>
        <h1 style={{ color: "#e63946" }}>You Have Been Phished!</h1>
        <p style={{ fontSize: "18px", color: "#333", margin: "20px 0" }}>
          Please refer to the training slides to learn about phishing attacks and safe practices.
        </p>
        <a 
          href="https://your-training-slides-link.com" 
          target="_blank" 
          rel="noopener noreferrer"
          style={{
            display: "inline-block",
            padding: "12px 25px",
            backgroundColor: "#457b9d",
            color: "#fff",
            textDecoration: "none",
            borderRadius: "6px",
            fontWeight: "bold",
            marginTop: "10px"
          }}
        >
          View Training Slides
        </a>
      </div>
    </div>
  );
}

export default App;
