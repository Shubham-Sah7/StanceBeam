"use client"
import { useState } from "react"

import { colors, fonts, spacing, radii } from "../../designTokens";
import GlassCard from "../ui/GlassCard";

const { navy, green, gText, bg, card, t1, t2, t3, t4 } = colors;
const { sans: F, serif: FS } = fonts;
const { xs, sm, md, lg, xl } = spacing;
const { sm: rsm, md: rmd, lg: rlg, xl: rxl } = radii;

// ─── HEADER STATS ─────────────────────────────────────────────────────────────
function HeaderStats() {
  const stats = [
    { v: "15", u: "DAYS", l: "as a Century\nMember" },
    { v: "5", u: "DAYS", l: "since your\nlast Slot" },
    { v: "02", u: "SLOTS", l: "remain in\nthis cycle" },
    { v: "06", u: "SLOTS", l: "Completed\ntill date" }
  ]
  
  return (
    <div style={{ background: `linear-gradient(180deg, ${navy} 0%, #0A2445 100%)`, padding: "16px 16px 14px", display: "flex", alignItems: "center" }}>
      <div style={{ display: "flex", flex: 1, gap: 2 }}>
        {stats.map((s, i) => (
          <div key={i} style={{ flex: 1, textAlign: "center", borderRight: i < 3 ? "1px solid rgba(255,255,255,0.10)" : "none", padding: "0 6px" }}>
            <div style={{ display: "flex", alignItems: "baseline", justifyContent: "center", gap: 2, marginBottom: 6 }}>
              <span style={{ fontFamily: F, fontSize: 22, fontWeight: 700, color: "#FFFFFF", lineHeight: 0.9, letterSpacing: "-0.5px" }}>{s.v}</span>
              <span style={{ fontFamily: F, fontSize: 8, fontWeight: 700, color: "rgba(255,255,255,0.45)", letterSpacing: 0.8 }}>{s.u}</span>
            </div>
            <div style={{ fontFamily: F, fontSize: 9, fontWeight: 500, color: "rgba(255,255,255,0.48)", lineHeight: 1.35, whiteSpace: "pre-line" }}>{s.l}</div>
          </div>
        ))}
      </div>
      <div style={{ width: 36, height: 36, borderRadius: "50%", background: "rgba(255,255,255,0.08)", backdropFilter: "blur(12px)", display: "flex", alignItems: "center", justifyContent: "center", marginLeft: 12, flexShrink: 0, border: "1px solid rgba(255,255,255,0.12)" }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </div>
    </div>
  )
}

// ─── MODE SEGMENT CONTROL ────────────────────────────────────────────────────
function ModeSegment({ active, onChange }: { active: string; onChange(v: string): void }) {
  return (
    <div style={{ margin: "16px 16px 0", background: "#F0F2F5", borderRadius: 14, padding: 4, display: "flex", boxShadow: "inset 0 1px 2px rgba(16,24,40,0.06)" }}>
      {["Learn & Improve", "Play & Entertain"].map(t => (
        <button key={t} onClick={() => onChange(t)} style={{ flex: 1, padding: "11px 12px", borderRadius: 11, border: "none", fontFamily: F, fontSize: 13, fontWeight: 600, cursor: "pointer", transition: "all .2s cubic-bezier(0.4, 0, 0.2, 1)", background: active === t ? card : "transparent", color: active === t ? t1 : t3, boxShadow: active === t ? "0 2px 8px rgba(16,24,40,0.08), 0 0 0 0.5px rgba(16,24,40,0.04)" : "none", whiteSpace: "nowrap" }}>{t}</button>
      ))}
    </div>
  )
}

// ─── CATEGORY FILTER ─────────────────────────────────────────────────────────
function CategoryFilter({ active, onChange }: { active: string; onChange(v: string): void }) {
  return (
    <div style={{ margin: "14px 16px 0", display: "flex", gap: 8 }}>
      {["All Games", "My Playing History"].map(t => (
        <button key={t} onClick={() => onChange(t)} style={{ flex: 1, padding: "10px 12px", borderRadius: 12, border: "none", fontFamily: F, fontSize: 13, fontWeight: 600, cursor: "pointer", background: active === t ? navy : card, color: active === t ? "#FFFFFF" : t2, boxShadow: active === t ? "0 2px 10px rgba(8,28,58,0.15)" : "0 1px 3px rgba(15,23,42,0.06)", outline: active === t ? "none" : "1px solid rgba(15,23,42,0.06)", transition: "all .18s cubic-bezier(0.4, 0, 0.2, 1)", whiteSpace: "nowrap" }}>{t}</button>
      ))}
    </div>
  )
}

// ─── SECTION HEADER ──────────────────────────────────────────────────────────
function SectionHeader({ title, action }: { title: string; action?: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", margin: "32px 16px 16px" }}>
      <span style={{ fontFamily: F, fontSize: 17, fontWeight: 700, color: t1, letterSpacing: "-0.3px" }}>{title}</span>
      {action && (
        <button style={{ fontFamily: F, fontSize: 13, fontWeight: 600, color: navy, background: "transparent", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}>
          {action}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M9 18l6-6-6-6" stroke={navy} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
      )}
    </div>
  )
}

// ─── TRAINING GAME CARD ──────────────────────────────────────────────────────
function GameCard({ game, featured = false }: { game: any; featured?: boolean }) {
  const [pressed, setPressed] = useState(false)
  
  const skillColors: Record<string, string> = {
    "Batting Accuracy": green,
    "Bowling Precision": "#3B82F6",
    "Reaction Speed": "#F59E0B",
    "Shot Placement": "#8B5CF6",
    "Footwork": "#EC4899"
  }
  
  return (
    <button
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onMouseLeave={() => setPressed(false)}
      style={{
        background: card,
        borderRadius: featured ? 18 : 16,
        padding: featured ? "18px" : "16px",
        border: `1px solid ${t4}`,
        boxShadow: "0 2px 8px rgba(15,23,42,0.04)",
        cursor: "pointer",
        transition: "all .2s cubic-bezier(0.4, 0, 0.2, 1)",
        transform: pressed ? "scale(0.98)" : "scale(1)",
        width: "100%",
        textAlign: "left",
        position: "relative",
        overflow: "hidden"
      }}
    >
      {/* Top row: Level & New badge */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: game.level === "Beginner" ? green : game.level === "Intermediate" ? "#F59E0B" : "#EF4444" }}/>
          <span style={{ fontFamily: F, fontSize: 11, fontWeight: 600, color: t2, letterSpacing: "-0.05px" }}>{game.level}</span>
        </div>
        {game.isNew && (
          <div style={{ background: navy, color: "#FFFFFF", fontSize: 9, fontWeight: 700, padding: "3px 8px", borderRadius: 6, letterSpacing: "0.5px" }}>NEW</div>
        )}
      </div>

      {/* Game title */}
      <h3 style={{ fontFamily: F, fontSize: featured ? 18 : 16, fontWeight: 700, color: t1, marginBottom: 8, letterSpacing: "-0.3px", lineHeight: 1.3 }}>{game.title}</h3>

      {/* Skill focus tag */}
      <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: `${skillColors[game.skill] || green}15`, padding: "5px 10px", borderRadius: 8, marginBottom: 12 }}>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M22 11.08V12a10 10 0 11-5.93-9.14" stroke={skillColors[game.skill] || green} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><polyline points="22 4 12 14.01 9 11.01" stroke={skillColors[game.skill] || green} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        <span style={{ fontFamily: F, fontSize: 11, fontWeight: 600, color: skillColors[game.skill] || green }}>{game.skill}</span>
      </div>

      {/* Description */}
      <p style={{ fontFamily: F, fontSize: 13, fontWeight: 500, color: t2, lineHeight: 1.5, marginBottom: 14 }}>{game.description}</p>

      {/* Bottom row: Players & Category */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 12, borderTop: `1px solid ${t4}` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" stroke={t3} strokeWidth="2" strokeLinecap="round"/><circle cx="9" cy="7" r="4" stroke={t3} strokeWidth="2"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" stroke={t3} strokeWidth="2" strokeLinecap="round"/></svg>
          <span style={{ fontFamily: F, fontSize: 11, fontWeight: 600, color: t3 }}>{game.players}</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6, background: "#F8F9FA", padding: "4px 10px", borderRadius: 8 }}>
          {game.category === "Bowling" ? (
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke={t2} strokeWidth="2"/><circle cx="12" cy="12" r="3" fill={t2}/></svg>
          ) : (
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" stroke={t2} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          )}
          <span style={{ fontFamily: F, fontSize: 11, fontWeight: 600, color: t2 }}>{game.category}</span>
        </div>
      </div>
    </button>
  )
}

// ─── FEATURED GAMES GRID ─────────────────────────────────────────────────────
function FeaturedGames() {
  const games = [
    { title: "Hit the Zone", level: "Beginner", skill: "Batting Accuracy", description: "Bowl at easy target zones and score points as you build your accuracy.", players: "Up to 3 players", category: "Bowling", isNew: true },
    { title: "Power Strike", level: "Intermediate", skill: "Shot Placement", description: "Hit designated scoring zones with precision timing and power control.", players: "1-4 players", category: "Batting", isNew: true }
  ]
  
  return (
    <>
      <SectionHeader title="Featured Games" action="See All" />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, padding: "0 16px" }}>
        {games.map((game, i) => (
          <GameCard key={i} game={game} featured />
        ))}
      </div>
    </>
  )
}

// ─── COMPETE WITH OTHERS ─────────────────────────────────────────────────────
function CompeteSection() {
  const games = [
    { title: "Accuracy Challenge", level: "Beginner", skill: "Batting Accuracy", description: "Compete with players worldwide in precision batting challenges.", players: "Multiplayer", category: "Batting", isNew: false, rank: 12 },
    { title: "Speed Bowling", level: "Intermediate", skill: "Bowling Precision", description: "Test your bowling speed and accuracy against other players.", players: "Multiplayer", category: "Bowling", isNew: true, rank: 8 }
  ]
  
  return (
    <>
      <SectionHeader title="Compete with Others" action="See All" />
      <div style={{ display: "flex", flexDirection: "column", gap: 12, padding: "0 16px" }}>
        {games.map((game, i) => (
          <div key={i} style={{ position: "relative" }}>
            {/* Rank badge */}
            <div style={{ position: "absolute", top: -6, right: -6, width: 32, height: 32, borderRadius: "50%", background: `linear-gradient(135deg, ${green} 0%, #00C863 100%)`, color: navy, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: F, fontSize: 12, fontWeight: 700, boxShadow: "0 4px 12px rgba(0,230,118,0.3)", zIndex: 1 }}>#{game.rank}</div>
            <GameCard game={game} />
          </div>
        ))}
      </div>
    </>
  )
}

// ─── MOST PLAYED AT CENTER ───────────────────────────────────────────────────
function MostPlayedSection() {
  const games = [
    { title: "Quick Reflexes", level: "Beginner", skill: "Reaction Speed", description: "Improve your reaction time with rapid-fire batting challenges.", players: "1-2 players", category: "Batting", isNew: false, popularity: 87 },
    { title: "Spin Master", level: "Intermediate", skill: "Footwork", description: "Master spin bowling with advanced footwork training.", players: "Solo", category: "Bowling", isNew: false, popularity: 94 }
  ]
  
  return (
    <>
      <SectionHeader title="Most Played at Your Center" action="See All" />
      <div style={{ display: "flex", flexDirection: "column", gap: 12, padding: "0 16px" }}>
        {games.map((game, i) => (
          <div key={i} style={{ position: "relative" }}>
            {/* Popularity indicator */}
            <div style={{ position: "absolute", top: 12, right: 12, display: "flex", alignItems: "center", gap: 4, background: "rgba(255,255,255,0.95)", padding: "4px 8px", borderRadius: 8, boxShadow: "0 2px 6px rgba(0,0,0,0.08)", zIndex: 1 }}>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" fill={green}/></svg>
              <span style={{ fontFamily: F, fontSize: 10, fontWeight: 700, color: t1 }}>{game.popularity}%</span>
            </div>
            <GameCard game={game} />
          </div>
        ))}
      </div>
    </>
  )
}

// ─── RECENTLY COMPLETED ──────────────────────────────────────────────────────
function RecentlyCompleted() {
  const games = [
    { title: "Target Practice", level: "Beginner", skill: "Batting Accuracy", description: "Hit designated target zones with consistency and precision.", players: "Solo", category: "Batting", isNew: false, score: 850, improvement: "+12%" }
  ]
  
  return (
    <>
      <SectionHeader title="Recently Completed by You" action="See All" />
      <div style={{ display: "flex", flexDirection: "column", gap: 12, padding: "0 16px 24px" }}>
        {games.map((game, i) => (
          <div key={i} style={{ position: "relative" }}>
            {/* Completion badge */}
            <div style={{ position: "absolute", top: 12, right: 12, background: `linear-gradient(135deg, ${green} 0%, #00C863 100%)`, padding: "6px 12px", borderRadius: 10, boxShadow: "0 4px 12px rgba(0,230,118,0.25)", zIndex: 1 }}>
              <div style={{ fontFamily: F, fontSize: 16, fontWeight: 700, color: navy, lineHeight: 1 }}>{game.score}</div>
              <div style={{ fontFamily: F, fontSize: 9, fontWeight: 600, color: "rgba(0,87,42,0.8)", marginTop: 2 }}>{game.improvement}</div>
            </div>
            <GameCard game={game} />
          </div>
        ))}
      </div>
    </>
  )
}

// ─── BOTTOM NAV ──────────────────────────────────────────────────────────────
function BottomNav() {
  const items = [
    { lbl: "Games", active: true, icon: (a: boolean) => 
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="5" width="18" height="14" rx="2" fill={a ? navy : "none"} stroke={a ? navy : t3} strokeWidth="1.8"/>
        <circle cx="8" cy="12" r="1.5" fill={a ? "#FFFFFF" : t3}/>
        <path d="M14 10h4M16 8v4" stroke={a ? "#FFFFFF" : t3} strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    },
    { lbl: "Matches", active: false, icon: (a: boolean) =>
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" stroke={a ? navy : t3} strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    },
    { lbl: "Tournaments", active: false, icon: (a: boolean) =>
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
        <path d="M6 9H4.5a2.5 2.5 0 010-5H6M18 9h1.5a2.5 2.5 0 000-5H18M4 22h16M6 9v13M18 9v13M12 3v19" stroke={a ? navy : t3} strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    },
    { lbl: "Challenges", active: false, icon: (a: boolean) =>
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" stroke={a ? navy : t3} fill={a ? navy : "none"} strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    },
    { lbl: "Profile", active: false, icon: (a: boolean) =>
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="8" r="4" stroke={a ? navy : t3} fill={a ? navy : "none"} strokeWidth="1.8"/>
        <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke={a ? navy : t3} strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    }
  ]
  
  return (
    <div style={{ background: bg, borderTop: "0.5px solid rgba(15,23,42,0.08)", display: "flex", padding: "6px 0 22px" }}>
      {items.map(it => (
        <button key={it.lbl} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 3, cursor: "pointer", border: "none", background: "transparent", padding: "6px 8px", minHeight: 60, justifyContent: "center" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: 28, transition: "transform 0.15s cubic-bezier(0.4, 0, 0.2, 1)" }}>
            {it.icon(it.active)}
          </div>
          <span style={{ fontFamily: F, fontSize: 10.5, fontWeight: it.active ? 600 : 500, color: it.active ? t1 : t3, letterSpacing: "-0.08px", transition: "color 0.15s ease" }}>{it.lbl}</span>
        </button>
      ))}
    </div>
  )
}

// ─── MAIN ────────────────────────────────────────────────────────────────────
export default function PlayScreen() {
  const [mode, setMode] = useState("Play & Entertain")
  const [category, setCategory] = useState("All Games")

  return (
    <div style={{ background: bg, fontFamily: F, minHeight: "100%", display: "flex", flexDirection: "column" }}>
      <HeaderStats />
      <ModeSegment active={mode} onChange={setMode} />
      <CategoryFilter active={category} onChange={setCategory} />
      
      <div style={{ flex: 1, overflowY: "auto" }}>
        <FeaturedGames />
        <CompeteSection />
        <MostPlayedSection />
        <RecentlyCompleted />
      </div>
      
      <BottomNav />
    </div>
  )
}
