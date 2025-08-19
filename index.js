import express from "express";
import bodyParser from "body-parser";
import admin from "firebase-admin";

const app = express();
app.use(bodyParser.json());

// Firebase Admin Init
const serviceAccount = JSON.parse(process.env.FIREBASE_CONFIG);
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}
const db = admin.firestore();

// Register
app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ error: "Missing fields" });

  const userRef = db.collection("users").doc(username);
  const doc = await userRef.get();

  if (doc.exists) return res.status(400).json({ error: "Username already exists" });

  await userRef.set({
    username,
    password,
    score: 0,
    banned: false,
    createdAt: Date.now(),
  });

  return res.json({ message: "Registered successfully" });
});

// Login
app.post("/login", async (req, res) => {
  const { username, password, key } = req.body;
  if (!username || !password || !key) return res.status(400).json({ error: "Missing fields" });

  const userRef = db.collection("users").doc(username);
  const doc = await userRef.get();
  if (!doc.exists) return res.status(400).json({ error: "User not found" });

  const user = doc.data();
  if (user.password !== password) return res.status(400).json({ error: "Wrong password" });
  if (user.banned) return res.status(403).json({ error: "User banned" });

  const keyRef = db.collection("keys").doc(key);
  const keyDoc = await keyRef.get();
  if (!keyDoc.exists) return res.status(400).json({ error: "Invalid key" });

  const keyData = keyDoc.data();
  if (Date.now() > keyData.expiresAt) return res.status(400).json({ error: "Key expired" });

  const sessionExpires = Date.now() + 24 * 60 * 60 * 1000;

  return res.json({ message: "Login success", sessionExpires });
});

// Admin Generate Key
app.post("/admin/generateKey", async (req, res) => {
  const { key, validityHours } = req.body;
  if (!key || !validityHours) return res.status(400).json({ error: "Missing fields" });

  const expiresAt = Date.now() + validityHours * 60 * 60 * 1000;

  await db.collection("keys").doc(key).set({ key, expiresAt });

  return res.json({ message: "Key generated", expiresAt });
});

// Leaderboard
app.get("/leaderboard", async (req, res) => {
  const snapshot = await db.collection("users").orderBy("score", "desc").limit(20).get();
  const leaderboard = [];
  snapshot.forEach(doc => leaderboard.push(doc.data()));
  return res.json({ leaderboard });
});

// Daily Challenge
app.get("/challenge/daily", (req, res) => {
  return res.json({
    challenge: "Solve 20 math problems today",
    reward: 10,
  });
});

// Ban User
app.post("/admin/ban", async (req, res) => {
  const { username } = req.body;
  if (!username) return res.status(400).json({ error: "Missing username" });

  await db.collection("users").doc(username).update({ banned: true });
  return res.json({ message: "User banned" });
});

// Unban User
app.post("/admin/unban", async (req, res) => {
  const { username } = req.body;
  if (!username) return res.status(400).json({ error: "Missing username" });

  await db.collection("users").doc(username).update({ banned: false });
  return res.json({ message: "User unbanned" });
});

// Root
app.get("/", (req, res) => {
  res.send("🔥 StudyLove Backend Running on Vercel!");
});

export default app;
