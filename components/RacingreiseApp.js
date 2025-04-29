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

  const [trainingCount, setTrainingCount] = useState(0);
  const [raceCount, setRaceCount] = useState(0);
  const [participants, setParticipants] = useState("");
  const [placement, setPlacement] = useState("");
  const [raceEvaluation, setRaceEvaluation] = useState("");
  const [focusRating, setFocusRating] = useState("");

  const [weeklyGood, setWeeklyGood] = useState("");
  const [weeklyLearned, setWeeklyLearned] = useState("");
  const [weeklyFun, setWeeklyFun] = useState("");
  const [weeklyFocus, setWeeklyFocus] = useState("");

  const [weeklyLogs, setWeeklyLogs] = useState([]);
  const [showPreviousLogs, setShowPreviousLogs] = useState(false);

  const trainingGoal = 4;

  useEffect(() => {
    const day = new Date().toLocaleDateString("en-US", { weekday: "long" });
    setToday(day);

    if (typeof window !== "undefined") {
      setTrainingCount(Number(localStorage.getItem("trainingCount")) || 0);
      setRaceCount(Number(localStorage.getItem("raceCount")) || 0);
      setWeeklyLogs(JSON.parse(localStorage.getItem("weeklyLogs")) || []);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("trainingCount", trainingCount);
      localStorage.setItem("raceCount", raceCount);
    }
  }, [trainingCount, raceCount]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("weeklyLogs", JSON.stringify(weeklyLogs));
    }
  }, [weeklyLogs]);

  function getRandomMessage() {
    const randomIndex = Math.floor(Math.random() * dailyMessages.length);
    setMessage(dailyMessages[randomIndex]);
  }

  function toggleTask(task) {
    setCompletedTasks(prev =>
      prev.includes(task) ? prev.filter(t => t !== task) : [...prev, task]
    );
  }

  function logTraining() {
    setTrainingCount(prev => prev + 1);
  }

  function logRace() {
    setRaceCount(prev => prev + 1);
  }

  function saveWeeklyLog() {
    const now = new Date();
    const week = `Uke ${getWeekNumber(now)} - ${now.toLocaleDateString("no-NO", { month: "long", year: "numeric" })}`;
    const newEntry = {
      week,
      good: weeklyGood,
      learned: weeklyLearned,
      fun: weeklyFun,
      focus: weeklyFocus
    };
    setWeeklyLogs(prev => [newEntry, ...prev]);
    setWeeklyGood("");
    setWeeklyLearned("");
    setWeeklyFun("");
    setWeeklyFocus("");
  }

  function getWeekNumber(date) {
    const firstJan = new Date(date.getFullYear(), 0, 1);
    const days = Math.floor((date - firstJan) / (24 * 60 * 60 * 1000));
    return Math.ceil((days + firstJan.getDay() + 1) / 7);
  }

  const progressPercent = Math.min((trainingCount / trainingGoal) * 100, 100);

  return (
    <div style={{ minHeight: "100vh", backgroundImage: "url('/20250426_131820.jpg')", backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat", padding: "2rem" }}>
      <div style={{ backgroundColor: "rgba(255, 255, 255, 0.9)", borderRadius: "1rem", padding: "2rem", maxWidth: "500px", margin: "auto" }}>
        <h1 style={{ fontSize: "2rem", color: "#b91c1c", marginBottom: "1rem" }}>HTH RacingMind 🚀</h1>
        <p style={{ marginBottom: "1rem", textAlign: "center" }}>{message}</p>
        <button onClick={getRandomMessage} style={{ background: "#dc2626", color: "#fff", padding: "0.5rem 1rem", width: "100%", borderRadius: "0.5rem", marginBottom: "1rem" }}>
          Få Dagens Boost ✨
        </button>

        <h2>📅 Dagens Oppgaver ({today})</h2>
        {tasksByDay[today]?.map((task, index) => (
          <div key={index} style={{ display: "flex", alignItems: "center", marginBottom: "0.5rem" }}>
            <input type="checkbox" checked={completedTasks.includes(task)} onChange={() => toggleTask(task)} style={{ marginRight: "0.5rem" }} />
            <span>{task}</span>
          </div>
        )) || <p>Hviledag 🚗</p>}

        <h3>📈 Statistikk</h3>
        <p>Treninger: {trainingCount} / {trainingGoal}</p>
        <div style={{ background: "#eee", borderRadius: "10px", overflow: "hidden", height: "20px", marginBottom: "0.5rem" }}>
          <div style={{ width: `${progressPercent}%`, background: "#22c55e", height: "100%" }}></div>
        </div>
        {progressPercent >= 100 && <p>🎉 Du nådde treningsmålet ditt for måneden!</p>}

        <button onClick={logTraining} style={{ marginBottom: "1rem" }}>➕ Logg Trening</button>
        <p>Løp: {raceCount}</p>
        <button onClick={logRace}>➕ Logg Løp</button>

        <h3>🏁 Løpsinfo</h3>
        <label>Deltagere i klassen: </label>
        <input type="number" value={participants} onChange={(e) => setParticipants(e.target.value)} style={{ width: "100%" }} />
        <label>Plassering i løpet: </label>
        <input type="number" value={placement} onChange={(e) => setPlacement(e.target.value)} style={{ width: "100%" }} />

        <label>Hvordan fungerte løpet?</label>
        <textarea value={raceEvaluation} onChange={(e) => setRaceEvaluation(e.target.value)} style={{ width: "100%" }} />

        <label>Fokus under løpet (1–10):</label>
        <input type="number" min="1" max="10" value={focusRating} onChange={(e) => setFocusRating(e.target.value)} style={{ width: "100%", marginBottom: "1rem" }} />

        {today === "Sunday" && (
          <div>
            <h3>🧠 Ukens Evaluering</h3>
            <label>Hva gjorde jeg bra?</label>
            <textarea value={weeklyGood} onChange={(e) => setWeeklyGood(e.target.value)} style={{ width: "100%" }} />
            <label>Hva lærte jeg?</label>
            <textarea value={weeklyLearned} onChange={(e) => setWeeklyLearned(e.target.value)} style={{ width: "100%" }} />
            <label>Hva var ekstra gøy?</label>
            <textarea value={weeklyFun} onChange={(e) => setWeeklyFun(e.target.value)} style={{ width: "100%" }} />
            <label>Fokus (1–10):</label>
            <input type="number" min="1" max="10" value={weeklyFocus} onChange={(e) => setWeeklyFocus(e.target.value)} style={{ width: "100%" }} />
            <button onClick={saveWeeklyLog} style={{ marginTop: "1rem", background: "#16a34a", color: "white", padding: "0.5rem 1rem", borderRadius: "0.5rem" }}>✅ Lagre Ukens Evaluering</button>
          </div>
        )}

        <button onClick={() => setShowPreviousLogs(!showPreviousLogs)} style={{ marginTop: "1.5rem", background: "#2563eb", color: "white", padding: "0.5rem 1rem", borderRadius: "0.5rem" }}>
          {showPreviousLogs ? "Skjul Tidligere Loggføringer" : "Vis Mine Tidligere Loggføringer"}
        </button>

        {showPreviousLogs && (
          <div style={{ marginTop: "1rem", padding: "1rem", backgroundColor: "#f3f4f6", borderRadius: "0.75rem" }}>
            <h3>📖 Tidligere Ukeslogg</h3>
            {weeklyLogs.length === 0 && <p>Ingen loggføringer ennå.</p>}
            {weeklyLogs.map((log, idx) => (
              <div key={idx} style={{ marginBottom: "1rem", paddingBottom: "1rem", borderBottom: "1px solid #ccc" }}>
                <h4>{log.week} {Number(log.focus) >= 8 ? "🏆" : ""}</h4>
                <p><strong>Hva gjorde jeg bra:</strong> {log.good}</p>
                <p><strong>Hva lærte jeg:</strong> {log.learned}</p>
                <p><strong>Hva var ekstra gøy:</strong> {log.fun}</p>
                <p><strong>Fokus:</strong> {log.focus}/10</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
