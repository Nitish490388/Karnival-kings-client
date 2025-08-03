import { useEffect, useState } from "react";

const WsPage = () => {
  const [messages] = useState<string[]>([]);
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [input, setInput] = useState<string>("");

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8000");
    setSocket(ws);

    ws.onopen = () => console.log("✅ WebSocket connected");
    ws.onmessage = (e) => console.log("📥 Message from server:", e.data);
    ws.onclose = () => console.log("❌ WebSocket disconnected");
    ws.onerror = (e) => console.error("🔥 WebSocket error", e);

    return () => ws.close();
  }, []);

  const sendMessage = () => {
  if (socket && socket.readyState === WebSocket.OPEN && input.trim()) {
    console.log("📨 Sending:", input);
    socket.send(input);
    setInput("");
  } else {
    console.warn("⚠️ Cannot send - Socket not open or input empty");
  }
};

  return (
    <div className="mt-20">
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type a message"
      />
      <button
        onClick={() => {
          sendMessage();
        }}
      >
        Send
      </button>

      <ul>
        {messages.map((msg, i) => (
          <li key={i}>📨 {msg}</li>
        ))}
      </ul>
    </div>
  );
};

export default WsPage;
