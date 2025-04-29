import { useState, useEffect } from "react";

const dailyMessages = [
  "Ny uke, nye muligheter! Små steg hver dag = store drømmer oppfylt. 🚀",
  "Pust dypt – du har trent for dette. Du er klar, sterk og fokusert! 💪",
  "Kjør smart, pust med magen, og husk: Ditt løp, din fart, din ro. 🏎️🔥",
  "Tenk: 'Jeg er rask. Jeg er rolig. Jeg er fokusert.' 🎯",
  "STOPP-planen husker du? Pust – Observer – Planlegg. Du styrer løpet! 🧠🏁",
  "Hva var din beste læring i dag? Små seire bygger store mestere! 🏆",
  "Se for deg en perfekt start. Se for deg en perfekt runde. Du kan dette! 🎥✨",
  "Kjør med glede! Smil under hjelmen. 😄🏎️",
  "Du vinner eller du lærer. Alt bygger deg sterkere! 💥",
  "Forbered deg i hodet: Du er rask, rolig og KLAR! 🏁🔥",
  "Takk deg selv for innsatsen denne uka. Du er på vei mot drømmen din! 🙌"
];

const tasksByDay = {
  Monday: ["Sett ukas mål", "Visualiseringstrening"],
  Tuesday: ["Gokart-trening"],
  Wednesday: ["Reaksjonstrening", "Kjernestyrke"],
  Thursday: ["STOPP-plan øvelse", "Lett kondisjonstrening"],
  Friday: ["Visualisering før helg", "Selvprat boost"],
  Saturday: ["Gokart-trening eller løp"],
  Sunday: ["Race Journal evaluering", "Lett restitusjon"]
};

export default function RacingreiseApp() {
  const [message, setMessage] = useState("Klikk for å få dagens boost!");
  const [completedTasks, setCompletedTasks] = useState([]);
  const [notes, setNotes] = useState("");
  const [today, setToday] = useState("");

  useEffect(() => {
    const day = new Date().toLocaleDateString('en-US', { weekday: 'long' });
    setToday(day);
  }, []);

  function getRandomMessage() {
    const randomIndex = Math.floor(Math.random() * dailyMessages.length);
    setMessage(dailyMessages[randomIndex]);
  }

  function toggleTask(task) {
    setCompletedTasks(prev =>
      prev.includes(task) ? prev.filter(t => t !== task) : [...prev, task]
    );
  }

  return (
    <div style={{ minHeight: "100vh", padding: "2rem", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      <h1 style={{ fontSize: "2rem", color: "#b91c1c", marginBottom: "1rem" }}>
        HTH RacingMind 🚀
      </h1>
      <div style={{ background: "#fff", padding: "1.5rem", borderRadius: "0.75rem", boxShadow: "0 2px 10px rgba(0,0,0,0.1)", maxWidth: "400px", width: "100%" }}>
        <p style={{ marginBottom: "1rem", textAlign: "center" }}>{message}</p>
        <button onClick={getRandomMessage} style={{ background: "#dc2626", color: "#fff", padding: "0.5rem 1rem", width: "100%", borderRadius: "0.5rem", marginBottom: "1rem" }}>
          Få Dagens Boost ✨
        </button>
        <h2 style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>📅 Dagens Oppgaver ({today})</h2>
        <div style={{ marginBottom: "1rem" }}>
          {tasksByDay[today]?.map((task, index) => (
            <div key={index} style={{ display: "flex", alignItems: "center", marginBottom: "0.5rem" }}>
              <input type="checkbox" checked={completedTasks.includes(task)} onChange={() => toggleTask(task)} style={{ marginRight: "0.5rem" }} />
              <span>{task}</span>
            </div>
          )) || <p>Hviledag 🚗</p>}
        </div>
        {(tasksByDay[today]?.includes("Visualiseringstrening") ||
          tasksByDay[today]?.includes("STOPP-plan øvelse") ||
          tasksByDay[today]?.includes("Race Journal evaluering")) && (
          <div style={{ marginBottom: "1rem" }}>
            <h2 style={{ fontSize: "1.2rem", marginBottom: "0.5rem" }}>📝 Mental Logg</h2>
            <textarea placeholder="Hva lærte du i dag? Hvordan følte du deg?" value={notes} onChange={(e) => setNotes(e.target.value)} style={{ width: "100%", padding: "0.5rem", borderRadius: "0.5rem" }} />
          </div>
        )}
      </div>
    </div>
  );
}

