"use client"

import { useState, useEffect, useRef } from "react"
import { Bell, Info, X, Lock, Check, ChevronRight, Grid3x3 } from "lucide-react"
import GlassCard from "../ui/GlassCard"
import * as designTokens from "@/designTokens"

const { navy, green, gText, bg, card, t1, t2, t3, t4, bd: BD } = designTokens.colors
const { sans: F, serif: FS } = designTokens.fonts
const { xs, sm, md, lg, xl } = designTokens.spacing
const { sm: rsm, md: rmd, lg: rlg, xl: rxl } = designTokens.radii
const SH1 = "0 1px 2px rgba(16,24,40,0.05)"
const SH2 = "0 2px 8px rgba(16,24,40,0.08), 0 0 0 0.5px rgba(16,24,40,0.04)"
const SH3 = "0 8px 24px rgba(16,24,40,0.14)"
const CARD: React.CSSProperties = {
  background: card, borderRadius: 16,
  border: `1px solid ${BD}`, boxShadow: SH1
}

// ─── COUNT-UP HOOK ────────────────────────────────────────────────────────────
function useCountUp(target: number, duration = 900) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    let current = 0
    const steps = Math.ceil(duration / 16)
    const increment = target / steps
    const timer = setInterval(() => {
      current += increment
      if (current >= target) { setVal(target); clearInterval(timer) }
      else setVal(Math.round(current))
    }, 16)
    return () => clearInterval(timer)
  }, [target, duration])
  return val
}

// ─── HELPERS ─────────────────────────────────────────────────────────────────
function polar(cx: number, cy: number, r: number, deg: number) {
  const a = ((deg - 90) * Math.PI) / 180
  return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) }
}
function wedge(cx: number, cy: number, r: number, a1: number, a2: number) {
  const s = polar(cx, cy, r, a1), e = polar(cx, cy, r, a2)
  return `M${cx},${cy}L${s.x.toFixed(1)},${s.y.toFixed(1)}A${r},${r},0,0,1,${e.x.toFixed(1)},${e.y.toFixed(1)}Z`
}
function curve(pts: [number, number][]) {
  return pts.reduce((d, [x, y], i) => {
    if (i === 0) return `M${x},${y}`
    const [px, py] = pts[i - 1]
    const dx = (x - px) * 0.45
    return `${d} C${px + dx},${py} ${x - dx},${y} ${x},${y}`
  }, "")
}

function CricketBallIcon({ size = 16, style = {} }: { size?: number; style?: React.CSSProperties }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0, ...style }}>
      <circle cx="12" cy="12" r="9" fill="#D32F2F" stroke="#B71C1C" strokeWidth="1" />
      <path d="M12 3 C10 8 10 16 12 21" stroke="#fff" strokeWidth="1.2" strokeDasharray="1.5 1.5" strokeLinecap="round" />
    </svg>
  )
}
function CricketBatIcon({ size = 16, style = {} }: { size?: number; style?: React.CSSProperties }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0, transform: "rotate(45deg)", ...style }}>
      <rect x="11" y="2" width="2" height="7" rx="0.5" fill="#E53935" stroke="#B71C1C" strokeWidth="0.5" />
      <path d="M10 9 C10 9 10.5 8.5 12 8.5 C13.5 8.5 14 9 14 9 L14 20 C14 21 13 22 12 22 C11 22 10 21 10 20 Z" fill="#E6C280" stroke="#C69E58" strokeWidth="0.8" />
    </svg>
  )
}

// ─── HEADER ──────────────────────────────────────────────────────────────────
const STREAK_GOAL = 20

function Header() {
  const [showDetails, setShowDetails] = useState(false)
  const streak    = useCountUp(15)
  const lastSlot  = useCountUp(5, 700)
  const remaining = useCountUp(2, 700)
  const completed = useCountUp(6, 800)
  const w = (v: number) => String(v).padStart(2, "0")

  return (
    <div style={{ background: navy, paddingBottom: 24, position: "relative" }}>
      {/* Top bar - starts from top edge with safe area padding */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "48px 16px 24px" }}>
        <div style={{ animation: "fadeSlideUp 0.4s cubic-bezier(0.16,1,0.3,1) both" }}>
          <p style={{ fontFamily: F, fontSize: 10.5, fontWeight: 500, letterSpacing: 0.8, color: "rgba(255,255,255,0.50)", textTransform: "uppercase", marginBottom: 4 }}>My Journey</p>
          <p style={{ fontFamily: FS, fontSize: 18, fontWeight: 400, color: "#fff", letterSpacing: "-0.4px", lineHeight: 1.25 }}>Performance Dashboard</p>
        </div>
        <div style={{ position: "relative", animation: "fadeSlideUp 0.4s 0.08s cubic-bezier(0.16,1,0.3,1) both" }}>
          <button
            style={{ width: 40, height: 40, borderRadius: "50%", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "background 0.15s ease" }}
            onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.12)")}
            onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,0.06)")}
          >
            <Bell size={16} color="#fff" strokeWidth={1.6} />
          </button>
          <div style={{ position: "absolute", top: 2, right: 2, width: 8, height: 8, background: "#FF6B4A", borderRadius: "50%", border: `2px solid ${navy}` }} />
        </div>
      </div>

      {/* Hero streak */}
      <div
        onClick={() => setShowDetails(!showDetails)}
        style={{ padding: "0 16px 16px", cursor: "pointer", animation: "fadeSlideUp 0.4s 0.1s cubic-bezier(0.16,1,0.3,1) both" }}
      >
        <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 4 }}>
          <span style={{ fontFamily: F, fontSize: 56, fontWeight: 600, letterSpacing: "-2.5px", lineHeight: 1, color: "#fff" }}>{streak}</span>
          <span style={{ fontFamily: F, fontSize: 16, fontWeight: 400, color: "rgba(255,255,255,0.42)" }}>days</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <p style={{ fontFamily: F, fontSize: 13, color: "rgba(255,255,255,0.65)" }}>on a streak</p>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 6, padding: "4px 8px" }}>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
              <path d="M6 9H4.5a2.5 2.5 0 010-5H6M18 9h1.5a2.5 2.5 0 000-5H18M4 22h16M6 9v13M18 9v13M12 3v19" stroke="rgba(255,255,255,0.55)" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
            <span style={{ fontFamily: F, fontSize: 10.5, fontWeight: 500, color: "rgba(255,255,255,0.65)", lineHeight: 1 }}>Century Member</span>
          </div>
        </div>
      </div>

      {/* Progress track */}
      <div
        onClick={() => setShowDetails(!showDetails)}
        style={{ padding: "0 16px 16px", cursor: "pointer", animation: "fadeSlideUp 0.4s 0.16s cubic-bezier(0.16,1,0.3,1) both" }}
      >
        <div style={{ display: "flex", gap: 3.5, marginBottom: 8 }}>
          {Array.from({ length: STREAK_GOAL }).map((_, i) => (
            <div key={i} style={{
              flex: 1, height: 5, borderRadius: 2.5,
              background: i < 15 ? "linear-gradient(90deg, #00E676, #00C863)" : "rgba(255,255,255,0.15)",
              boxShadow: i < 15 ? "0 0 6px rgba(0,230,118,0.5)" : "none",
            }} />
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontFamily: F, fontSize: 10, color: "rgba(255,255,255,0.32)" }}>Day 1</span>
          <span style={{ fontFamily: F, fontSize: 11, fontWeight: 500, color: "rgba(255,255,255,0.5)" }}>15 of {STREAK_GOAL} days</span>
          <span style={{ fontFamily: F, fontSize: 10, color: "rgba(255,255,255,0.32)" }}>Day {STREAK_GOAL}</span>
        </div>
      </div>

      {/* Stats row */}
      <div style={{ display: "flex", gap: 8, padding: "0 16px", animation: "fadeSlideUp 0.4s 0.22s cubic-bezier(0.16,1,0.3,1) both" }}>
        {[
          { label: "Last Slot",  val: lastSlot,  suffix: "days ago" },
          { label: "Remaining", val: remaining, suffix: "slots" },
          { label: "Completed", val: completed, suffix: "slots", dot: true },
        ].map(s => (
          <div key={s.label} style={{ flex: 1, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 12, padding: "12px", position: "relative" }}>
            {s.dot && <div style={{ position: "absolute", top: 8, right: 8, width: 6, height: 6, borderRadius: "50%", background: green }} />}
            <p style={{ fontFamily: F, fontSize: 10, fontWeight: 500, letterSpacing: 0.5, textTransform: "uppercase", color: "rgba(255,255,255,0.52)", marginBottom: 8 }}>{s.label}</p>
            <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
              <span style={{ fontFamily: F, fontSize: 24, fontWeight: 500, letterSpacing: "-1px", lineHeight: 1, color: "#fff" }}>{w(s.val)}</span>
              <span style={{ fontFamily: F, fontSize: 11, color: "rgba(255,255,255,0.4)" }}>{s.suffix}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Details popover */}
      {showDetails && (
        <div style={{ position: "absolute", top: "100%", left: 16, right: 16, background: "rgba(8,28,58,0.96)", backdropFilter: "blur(20px)", border: "1.5px solid rgba(255,255,255,0.12)", borderRadius: 16, padding: 18, boxShadow: "0 12px 28px rgba(8,28,58,0.25)", zIndex: 100, animation: "scaleIn 0.22s cubic-bezier(0.16,1,0.3,1) both" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <span style={{ fontFamily: F, fontSize: 13, fontWeight: 600, color: "#fff" }}>Streak Analysis</span>
            <button onClick={e => { e.stopPropagation(); setShowDetails(false) }} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.45)", fontSize: 12, cursor: "pointer", fontFamily: F, fontWeight: 500 }}>Dismiss</button>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <div style={{ flex: 1, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10, padding: "10px 8px", textAlign: "center" }}>
              <p style={{ fontFamily: F, fontSize: 9, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", margin: "0 0 4px", letterSpacing: 0.5 }}>Current Streak</p>
              <p style={{ fontFamily: F, fontSize: 20, fontWeight: 700, color: green, margin: 0 }}>15 Days</p>
            </div>
            <div style={{ flex: 1, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10, padding: "10px 8px", textAlign: "center" }}>
              <p style={{ fontFamily: F, fontSize: 9, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", margin: "0 0 4px", letterSpacing: 0.5 }}>Personal Best</p>
              <p style={{ fontFamily: F, fontSize: 20, fontWeight: 700, color: "#fff", margin: 0 }}>24 Days</p>
            </div>
          </div>
          <p style={{ fontFamily: F, fontSize: 11, color: "rgba(255,255,255,0.65)", marginTop: 12, lineHeight: 1.4, textAlign: "center", marginBottom: 0 }}>
            <strong>5 more days</strong> to reach your Century Goal!
          </p>
        </div>
      )}
    </div>
  )
}

// ─── SEGMENT CONTROL ─────────────────────────────────────────────────────────
function SegControl({ active, onChange }: { active: string; onChange(v: string): void }) {
  const tabs = ["Learn & Improve", "Play & Entertain"]
  return (
    <div style={{
      margin: "16px 16px 16px",
      background: "#F0F2F5",
      borderRadius: 10,
      padding: 3,
      display: "flex",
      gap: 3,
      overflow: "hidden",
    }}>
      {tabs.map(t => {
        const on = active === t
        return (
          <button
            key={t}
            onClick={() => onChange(t)}
            style={{
              flex: "1 1 0",
              minWidth: 0,
              minHeight: 32,
              padding: "8px 6px",
              borderRadius: 7.5,
              border: "none",
              outline: "none",
              fontFamily: F,
              fontSize: 13,
              fontWeight: 600,
              color: on ? t1 : t3,
              lineHeight: 1,
              cursor: "pointer",
              background: on ? card : "transparent",
              boxShadow: on
                ? "0 1px 3px rgba(16,24,40,0.08), 0 0 0 0.5px rgba(16,24,40,0.03)"
                : "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              whiteSpace: "nowrap",
              transition: "background 0.22s cubic-bezier(0.4,0,0.2,1), color 0.18s ease, box-shadow 0.22s ease",
            }}
          >
            {t}
          </button>
        )
      })}
    </div>
  )
}

// ─── TIME TABS ───────────────────────────────────────────────────────────────
function TimeTabs({ active, onChange }: { active: string; onChange(v: string): void }) {
  const [pressed, setPressed] = useState<string | null>(null)
  const tabs = [["Last Week","Wk"], ["Last Month","Mo"], ["Last Year","Yr"], ["Lifetime","All"]]
  return (
    <div style={{ display: "flex", gap: 8, margin: "0 16px 16px" }}>
      {tabs.map(([full, short]) => {
        const on = active === full
        const isPressed = pressed === full
        return (
          <button key={full} onClick={() => onChange(full)}
            onMouseDown={() => setPressed(full)} onMouseUp={() => setPressed(null)}
            onMouseLeave={() => setPressed(null)} onTouchStart={() => setPressed(full)} onTouchEnd={() => setPressed(null)}
            style={{
              flex: 1, minHeight: 36, borderRadius: 8, fontFamily: F, fontSize: 12, lineHeight: 1,
              fontWeight: 600, color: on ? "#fff" : t2, cursor: "pointer",
              background: on ? navy : card, boxShadow: on ? "0 1px 4px rgba(8,28,58,0.12)" : "0 1px 2px rgba(15,23,42,0.05)", 
              display: "flex", alignItems: "center", justifyContent: "center",
              outline: on ? "none" : `0.5px solid rgba(15,23,42,0.06)`, border: "none",
              transform: isPressed && !on ? "scale(0.96)" : "scale(1)",
              transition: "transform 0.12s cubic-bezier(0.4,0,0.2,1), background 0.18s ease, color 0.18s ease",
              padding: "9px 8px"
            }}>{short}</button>
        )
      })}
    </div>
  )
}

// ─── SECTION TITLE ───────────────────────────────────────────────────────────
function SectionTitle({ label }: { label: string }) {
  return (
    <div style={{ margin: "24px 16px 12px", display: "flex", alignItems: "center" }}>
      {label === "Batting" && <CricketBatIcon size={20} style={{ marginRight: 10, transform: "rotate(45deg) translateY(-2px)" }} />}
      {label === "Bowling" && <CricketBallIcon size={18} style={{ marginRight: 10 }} />}
      <span style={{ fontFamily: FS, fontSize: 18, fontWeight: 400, letterSpacing: "-0.4px", color: t1, lineHeight: 1.25 }}>{label}</span>
    </div>
  )
}

function Row({ dot, label, value, bold }: { dot: string; label: string; value: string; bold?: boolean }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
      <span style={{ width: 5, height: 5, borderRadius: "50%", background: dot, flexShrink: 0, display: "inline-block" }} />
      <span style={{ fontFamily: F, fontSize: 10, color: bold ? t2 : t3, fontWeight: bold ? 600 : 400, flex: 1 }}>{label}</span>
      <span style={{ fontFamily: F, fontSize: 10, color: bold ? t1 : t3, fontWeight: bold ? 700 : 500 }}>{value}</span>
    </div>
  )
}

// ─── PERFORMANCE CARD ────────────────────────────────────────────────────────
function PerformanceCard({ stats }: { stats: { v: string; l: string }[] }) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [hoveredRunIdx, setHoveredRunIdx] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 150);
    return () => clearTimeout(t);
  }, []);

  const srPts: [number, number][] = [[6, 50], [30, 64], [58, 14], [86, 34], [112, 18]];
  const srLine = curve(srPts);
  const srArea = `${srLine} L112,78 L6,78Z`;
  const runsRaw = [42, 55, 38, 68, 52, 74, 100];
  const runsMax = Math.max(...runsRaw);
  const srData = [112.4, 110.1, 125.6, 118.2, 120.5];
  const srSessions = ["Mon", "Tue", "Wed", "Thu", "Fri"];

  const displayedSR = hoveredIdx !== null ? srData[hoveredIdx] : 120.5;
  const displayedSRLabel = hoveredIdx !== null ? `${srSessions[hoveredIdx]} Session` : "Strike Rate";
  const displayedRuns = hoveredRunIdx !== null ? runsRaw[hoveredRunIdx] : 398;
  const displayedRunsLabel = hoveredRunIdx !== null ? `Day ${hoveredRunIdx + 1} Session` : "Runs Scored";

  return (
    <GlassCard style={{ margin: "0 16px" }}>
      <p style={{ fontFamily: F, fontSize: 10, fontWeight: 600, letterSpacing: 0.8, textTransform: "uppercase", color: t3, padding: "16px 18px 14px", margin: 0 }}>
        Performance Stats
      </p>
      <div style={{ display: "flex" }}>
        {/* Left column: Strike Rate */}
        <div style={{ flex: 1, padding: "0 18px 16px" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 3 }}>
            <span style={{ fontFamily: F, fontSize: 32, fontWeight: 600, letterSpacing: "-1.2px", lineHeight: 1, color: t1 }}>{displayedSR.toFixed(1)}</span>
            <span style={{ fontFamily: F, fontSize: 10, color: t3 }}>SR</span>
            {hoveredIdx === null && (
              <span style={{ fontFamily: F, fontSize: 10, fontWeight: 600, color: green, marginLeft: 4 }}>+3.4%</span>
            )}
          </div>
          <p style={{ fontFamily: F, fontSize: 10, color: hoveredIdx !== null ? navy : t3, fontWeight: hoveredIdx !== null ? 600 : 400, marginBottom: 10, transition: "color 0.15s" }}>
            {displayedSRLabel}
          </p>
          <svg width="100%" height="44" viewBox="0 0 118 78" preserveAspectRatio="none"
            onMouseMove={e => {
              const rect = e.currentTarget.getBoundingClientRect();
              const svgX = ((e.clientX - rect.left) / rect.width) * 118;
              let ci = 0, md = Infinity;
              srPts.forEach((pt, idx) => {
                const d = Math.abs(pt[0] - svgX);
                if (d < md) { md = d; ci = idx; }
              });
              setHoveredIdx(ci);
            }}
            onMouseLeave={() => setHoveredIdx(null)}
            style={{ cursor: "crosshair", overflow: "visible" }}
          >
            <defs>
              <linearGradient id="srg" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={green} stopOpacity="0.12" />
                <stop offset="100%" stopColor={green} stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d={srArea} fill="url(#srg)" />
            <path d={srLine} fill="none" stroke={green} strokeWidth="2.5" strokeLinecap="round"
              style={{ strokeDasharray: 300, strokeDashoffset: mounted ? 0 : 300, transition: "stroke-dashoffset 0.85s cubic-bezier(0.4,0,0.2,1) 0.2s" }}
            />
            {hoveredIdx !== null && (
              <>
                <line x1={srPts[hoveredIdx][0]} y1={0} x2={srPts[hoveredIdx][0]} y2={78} stroke="rgba(15,23,42,0.12)" strokeWidth="1" strokeDasharray="2 2" />
                <circle cx={srPts[hoveredIdx][0]} cy={srPts[hoveredIdx][1]} r="4.5" fill={green} stroke="#fff" strokeWidth="1.5" />
              </>
            )}
            {hoveredIdx === null && (
              <circle cx={srPts[4][0]} cy={srPts[4][1]} r="3.5" fill={green} stroke="#fff" strokeWidth="1.5" />
            )}
          </svg>
          <div style={{ marginTop: 10, display: "flex", flexDirection: "column", gap: 4 }}>
            <Row dot={t4} label="Prev Week" value="116.5" />
            <Row dot={green} label="This Week" value="120.5" bold />
          </div>
        </div>
        {/* Divider */}
        <div style={{ width: 1, background: "rgba(15,23,42,0.05)", margin: "0 0 16px" }} />
        {/* Right column: Runs */}
        <div style={{ flex: 1, padding: "0 18px 16px" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 3 }}>
            <span style={{ fontFamily: F, fontSize: 32, fontWeight: 600, letterSpacing: "-1.2px", lineHeight: 1, color: t1 }}>{displayedRuns}</span>
            <span style={{ fontFamily: F, fontSize: 10, color: t3 }}>runs</span>
          </div>
          <p style={{ fontFamily: F, fontSize: 10, color: hoveredRunIdx !== null ? navy : t3, fontWeight: hoveredRunIdx !== null ? 600 : 400, marginBottom: 10, transition: "color 0.15s" }}>
            {displayedRunsLabel}
          </p>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 3, height: 44, position: "relative" }}>
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 1, background: "rgba(15,23,42,0.06)" }} />
            {runsRaw.map((v, i) => {
              const isHov = hoveredRunIdx === i;
              const isCurrent = i === runsRaw.length - 1;
              return (
                <div key={i}
                  onMouseEnter={() => setHoveredRunIdx(i)}
                  onMouseLeave={() => setHoveredRunIdx(null)}
                  style={{
                    flex: 1,
                    borderRadius: "4px 4px 0 0",
                    height: `${(v / runsMax) * 100}%`,
                    background: isHov ? green : isCurrent ? navy : t4,
                    transformOrigin: "bottom",
                    cursor: "pointer",
                    transform: mounted ? "scaleY(1)" : "scaleY(0)",
                    transition: `transform 0.55s cubic-bezier(0.16,1,0.3,1) ${0.15 + i * 0.055}s, background 0.14s ease`
                  }}
                />
              );
            })}
          </div>
          <div style={{ marginTop: 10, display: "flex", flexDirection: "column", gap: 4 }}>
            <Row dot={t4} label="Prev Week" value="218" />
            <Row dot={navy} label="This Week" value="398" bold />
          </div>
        </div>
      </div>
      <div style={{ display: "flex", borderTop: "1px solid rgba(15,23,42,0.05)" }}>
        {stats.map((s, i) => (
          <div key={i} style={{ flex: 1, padding: "16px 8px", textAlign: "center" }}>
            <div style={{ fontFamily: F, fontSize: 14, fontWeight: 600, letterSpacing: "-0.3px", color: t1, lineHeight: 1, marginBottom: 6 }}>{s.v}</div>
            <div style={{ fontFamily: F, fontSize: 10, fontWeight: 500, color: t3, letterSpacing: 0.3 }}>{s.l}</div>
          </div>
        ))}
      </div>
    </GlassCard>
  )
}

// ─── BATTING CIRCLE ──────────────────────────────────────────────────────────
type BType = "all" | "4s" | "6s"

const BC = [
  { name: "Fine Leg",  short: "FL",   angle: 20,  runs: 23, fours: 3, sixes: 1, balls: 18, sr: 127, side: "on"  },
  { name: "Sq. Leg",   short: "SL",   angle: 65,  runs: 54, fours: 7, sixes: 2, balls: 34, sr: 158, side: "on"  },
  { name: "Midwicket", short: "MW",   angle: 110, runs: 38, fours: 4, sixes: 2, balls: 26, sr: 146, side: "on"  },
  { name: "Long On",   short: "LOn",  angle: 155, runs: 19, fours: 2, sixes: 1, balls: 14, sr: 135, side: "on"  },
  { name: "Long Off",  short: "LOff", angle: 205, runs: 14, fours: 1, sixes: 0, balls: 12, sr: 116, side: "off" },
  { name: "Cover",     short: "COV",  angle: 250, runs: 48, fours: 6, sixes: 1, balls: 30, sr: 160, side: "off" },
  { name: "Point",     short: "PT",   angle: 295, runs: 28, fours: 3, sixes: 0, balls: 20, sr: 140, side: "off" },
  { name: "3rd Man",   short: "3M",   angle: 340, runs: 17, fours: 2, sixes: 0, balls: 15, sr: 113, side: "off" },
]
const BC_TOTAL = BC.reduce((s, z) => s + z.runs, 0)
const BC_4S    = BC.reduce((s, z) => s + z.fours, 0)
const BC_6S    = BC.reduce((s, z) => s + z.sixes, 0)

function scatterPts(cx: number, cy: number, r: number, center: number, count: number) {
  if (count === 0) return [] as { x: number; y: number }[]
  const spread = 36, step = count === 1 ? 0 : spread / (count - 1)
  return Array.from({ length: count }, (_, i) => {
    const a = count === 1 ? center : center - spread / 2 + step * i
    return polar(cx, cy, r, a)
  })
}

function zoneFill(ratio: number, isSel: boolean, mode: "overview" | "heatmap") {
  if (mode === "heatmap") {
    if (isSel)       return { fill: "#FF3B30", op: 0.85 }
    if (ratio > .88) return { fill: "#FF3B30", op: 0.75 }
    if (ratio > .65) return { fill: "#FF9500", op: 0.65 }
    if (ratio > .44) return { fill: "#FFCC00", op: 0.55 }
    if (ratio > .28) return { fill: "#FFCC00", op: 0.35 }
                     return { fill: "#FFCC00", op: 0.15 }
  } else {
    if (isSel)       return { fill: green, op: 0.72 }
    if (ratio > .88) return { fill: green, op: 0.55 }
    if (ratio > .65) return { fill: navy,  op: 0.18 }
    if (ratio > .44) return { fill: navy,  op: 0.12 }
    if (ratio > .28) return { fill: navy,  op: 0.08 }
                     return { fill: navy,  op: 0.04 }
  }
}

function BattingCircle() {
  const [sel,       setSel]       = useState<number | null>(null)
  const [btype,     setBtype]     = useState<BType>("all")
  const [viewMode,  setViewMode]  = useState<"overview" | "heatmap">("overview")
  const [modeIdx,   setModeIdx]   = useState(0)
  const [filterIdx, setFilterIdx] = useState(0)
  const [barWidth,  setBarWidth]  = useState(0)
  const CX = 160, CY = 160, R = 104, Ri = 62, LR = 148, D4R = 83, D6R = 95

  const getVal = (z: typeof BC[0]) =>
    btype === "4s" ? z.fours * 8 : btype === "6s" ? z.sixes * 16 : z.runs
  const mxVal = Math.max(...BC.map(getVal))

  const onRuns  = BC.filter(z => z.side === "on").reduce((s, z) => s + z.runs, 0)
  const offRuns = BC.filter(z => z.side === "off").reduce((s, z) => s + z.runs, 0)
  const onPct   = Math.round(onRuns / BC_TOTAL * 100)
  const Z = sel !== null ? BC[sel] : null

  useEffect(() => { const t = setTimeout(() => setBarWidth(onPct), 400); return () => clearTimeout(t) }, [onPct])

  return (
    <div style={{ margin: "0 16px" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <p style={{ fontFamily: FS, fontSize: 18, fontWeight: 400, letterSpacing: "-0.4px", color: t1, marginBottom: 4, lineHeight: 1.25 }}>Batting Circle</p>
            <p style={{ fontFamily: F, fontSize: 12, color: t2 }}>Tap any zone to explore</p>
          </div>
          <div style={{ display: "flex", background: "#F0F2F5", borderRadius: 8, padding: 3, gap: 0, position: "relative" }}>
            <div style={{ position: "absolute", top: 3, left: 3, width: "calc(50% - 3px)", height: "calc(100% - 6px)", background: card, borderRadius: 6, boxShadow: "0 1px 3px rgba(16,24,40,0.08), 0 0 0 0.5px rgba(16,24,40,0.03)", transform: `translateX(${modeIdx * 100}%)`, transition: "transform 0.22s cubic-bezier(0.4,0,0.2,1)", pointerEvents: "none" }} />
            {(["overview", "heatmap"] as const).map((m, idx) => (
              <button key={m} onClick={() => { setViewMode(m); setModeIdx(idx) }}
                style={{ width: 80, minHeight: 28, borderRadius: 6, border: "none", cursor: "pointer", fontFamily: F, fontSize: 11, fontWeight: 600, color: viewMode === m ? t1 : t3, background: "transparent", position: "relative", zIndex: 1, textTransform: "capitalize", transition: "color 0.16s", display: "flex", alignItems: "center", justifyContent: "center", lineHeight: 1, padding: "6px 8px" }}
              >{m}</button>
            ))}
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end", borderTop: "1px solid rgba(15,23,42,0.05)", paddingTop: 12 }}>
          <div style={{ display: "flex", background: "#F0F2F5", borderRadius: 8, padding: 3, gap: 0, position: "relative" }}>
            <div style={{ position: "absolute", top: 3, left: 3, width: "calc(33.33% - 2px)", height: "calc(100% - 6px)", background: card, borderRadius: 6, boxShadow: "0 1px 3px rgba(16,24,40,0.08), 0 0 0 0.5px rgba(16,24,40,0.03)", transform: `translateX(${filterIdx * 100}%)`, transition: "transform 0.22s cubic-bezier(0.4,0,0.2,1)", pointerEvents: "none" }} />
            {(["all", "4s", "6s"] as BType[]).map((bt, idx) => (
              <button key={bt} onClick={() => { setBtype(bt); setFilterIdx(idx) }}
                style={{ flex: 1, minWidth: 60, minHeight: 28, borderRadius: 6, border: "none", cursor: "pointer", fontFamily: F, fontSize: 11, fontWeight: 600, color: btype === bt ? t1 : t3, background: "transparent", position: "relative", zIndex: 1, transition: "color 0.16s", display: "flex", alignItems: "center", justifyContent: "center", lineHeight: 1, padding: "6px 8px" }}
              >{bt === "all" ? "All" : bt === "4s" ? "Fours" : "Sixes"}</button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ display: "flex", marginBottom: 16 }}>
        {[{ l: "Total Runs", v: BC_TOTAL }, { l: "Fours", v: BC_4S }, { l: "Sixes", v: BC_6S }].map((s, i) => (
          <div key={s.l} style={{ flex: 1, textAlign: i === 0 ? "left" : i === 2 ? "right" : "center" }}>
            <p style={{ fontFamily: F, fontSize: 24, fontWeight: 600, letterSpacing: "-0.6px", color: t1, lineHeight: 1, marginBottom: 4 }}>{s.v}</p>
            <p style={{ fontFamily: F, fontSize: 10, fontWeight: 500, letterSpacing: 0.4, color: t3, textTransform: "uppercase" }}>{s.l}</p>
          </div>
        ))}
      </div>

      <div style={{ ...CARD, padding: "4px 4px 0", overflow: "hidden" }}>
        <svg width="100%" viewBox="0 0 320 320" style={{ display: "block" }}>
          <defs>
            <pattern id="grass" width="24" height="24" patternUnits="userSpaceOnUse" patternTransform="rotate(25)">
              <rect width="12" height="24" fill="#0D351E" /><rect x="12" width="12" height="24" fill="#0A2C18" />
            </pattern>
            <radialGradient id="bc-fg" cx="50%" cy="50%" r="50%">
              <stop offset="60%" stopColor="transparent" stopOpacity="0"/>
              <stop offset="100%" stopColor="#05150C" stopOpacity="0.85"/>
            </radialGradient>
          </defs>
          <circle cx={CX} cy={CY} r={R + 16} fill="url(#grass)"/>
          <circle cx={CX} cy={CY} r={R + 16} fill="url(#bc-fg)" pointerEvents="none"/>
          <circle cx={CX} cy={CY} r={Ri} fill="none" stroke="rgba(15,23,42,0.08)" strokeWidth="0.8" strokeDasharray="4 3"/>
          {BC.map((z, i) => {
            const ratio = getVal(z) / (mxVal || 1)
            const { fill, op } = zoneFill(ratio, sel === i, viewMode)
            return (
              <path key={`w${i}`} d={wedge(CX, CY, R, z.angle - 22.5, z.angle + 22.5)}
                fill={fill} fillOpacity={op} stroke={card} strokeWidth="1.5"
                style={{ cursor: "pointer", transition: "fill 0.25s ease, fill-opacity 0.25s ease" }}
                onClick={() => setSel(sel === i ? null : i)}
              />
            )
          })}
          {btype !== "6s" && BC.flatMap((z, zi) =>
            scatterPts(CX, CY, D4R, z.angle, z.fours).map((pt, di) => (
              <circle key={`f${zi}-${di}`} cx={pt.x} cy={pt.y} r={3} fill={navy} fillOpacity="0.65"
                style={{ animation: `dotReveal 0.3s cubic-bezier(0.16,1,0.3,1) ${(zi * 4 + di) * 0.035 + 0.4}s both` }}
              />
            ))
          )}
          {btype !== "4s" && BC.flatMap((z, zi) =>
            scatterPts(CX, CY, D6R, z.angle, z.sixes).map((pt, di) => (
              <circle key={`s${zi}-${di}`} cx={pt.x} cy={pt.y} r={4.5} fill={viewMode === "heatmap" ? "#FF9500" : green} fillOpacity="0.88"
                style={{ animation: `dotReveal 0.3s cubic-bezier(0.16,1,0.3,1) ${(zi * 2 + di) * 0.05 + 0.6}s both` }}
              />
            ))
          )}
          {BC.map((z, i) => {
            const lp = polar(CX, CY, LR, z.angle)
            const isBest = getVal(z) === mxVal, isSel = sel === i
            const displayVal = btype === "4s" ? z.fours : btype === "6s" ? z.sixes : z.runs
            let valueColor = "#ffffff"
            if (isSel)       valueColor = viewMode === "heatmap" ? "#FF8C8C" : "#5FD9A7"
            else if (isBest) valueColor = viewMode === "heatmap" ? "#FFB347" : "#00E676"
            const chipFill = isSel ? (viewMode === "heatmap" ? "rgba(120,20,20,0.88)" : "rgba(8,28,90,0.88)") : "rgba(6,14,32,0.80)"
            return (
              <g key={`L${i}`} style={{ pointerEvents: "none" }}>
                <rect x={lp.x - 20} y={lp.y - 17} width={40} height={30} rx={5} fill={chipFill} stroke={isSel ? "rgba(0,120,255,0.35)" : "none"} strokeWidth="1"/>
                <text x={lp.x} y={lp.y - 4} textAnchor="middle" fontSize="8" fontWeight="500" fill="rgba(255,255,255,0.75)" fontFamily={F}>{z.short}</text>
                <text x={lp.x} y={lp.y + 11} textAnchor="middle" fontSize="13" fontWeight="700" fill={valueColor} fontFamily={F}>{displayVal}</text>
              </g>
            )
          })}
          <rect x={CX - 8} y={CY - 18} width={16} height={36} rx={2} fill="rgba(245,230,211,0.9)" stroke="rgba(15,23,42,0.12)" strokeWidth="1"/>
          <line x1={CX - 8} y1={CY - 12} x2={CX + 8} y2={CY - 12} stroke="rgba(15,23,42,0.3)" strokeWidth="0.8"/>
          <line x1={CX - 8} y1={CY + 12} x2={CX + 8} y2={CY + 12} stroke="rgba(15,23,42,0.3)" strokeWidth="0.8"/>
          {[-3, 0, 3].map(dx => <circle key={`t${dx}`} cx={CX + dx} cy={CY - 13.5} r={0.7} fill={navy}/>)}
          {[-3, 0, 3].map(dx => <circle key={`b${dx}`} cx={CX + dx} cy={CY + 13.5} r={0.7} fill={navy}/>)}
        </svg>
        <div style={{ padding: "0 18px 18px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 7 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <div style={{ width: 7, height: 7, borderRadius: "50%", background: navy }}/><span style={{ fontFamily: F, fontSize: 10, fontWeight: 600, color: t2 }}>On-side</span><span style={{ fontFamily: F, fontSize: 10, fontWeight: 600, color: t1 }}>{onPct}%</span>
            </div>
            <span style={{ fontFamily: F, fontSize: 10, fontWeight: 500, color: t2 }}>Leg-side dominant</span>
            <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <span style={{ fontFamily: F, fontSize: 10, fontWeight: 600, color: t1 }}>{100 - onPct}%</span><span style={{ fontFamily: F, fontSize: 10, fontWeight: 600, color: t2 }}>Off-side</span><div style={{ width: 7, height: 7, borderRadius: "50%", background: t4 }}/>
            </div>
          </div>
          <div style={{ height: 5, borderRadius: 3, overflow: "hidden", background: t4 }}>
            <div style={{ height: "100%", background: navy, borderRadius: 3, width: `${barWidth}%`, transition: "width 0.65s cubic-bezier(0.16,1,0.3,1)" }} />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
            <span style={{ fontFamily: F, fontSize: 10, color: t3 }}>{onRuns} runs</span>
            <span style={{ fontFamily: F, fontSize: 10, color: t3 }}>{offRuns} runs</span>
          </div>
        </div>
      </div>

      <div style={{ marginTop: 16, padding: "12px 14px", background: "rgba(8,28,58,0.06)", borderRadius: 10, display: "flex", gap: 10, alignItems: "flex-start", border: "1px solid rgba(8,28,58,0.07)" }}>
        <Info size={14} color={navy} strokeWidth={2} style={{ flexShrink: 0, marginTop: 1 }}/>
        <p style={{ fontFamily: F, fontSize: 12, color: t2, lineHeight: 1.55, margin: 0 }}><strong>Sq. Leg + Cover</strong> account for <strong>42%</strong> of all runs — classic leg-side dominant batter.</p>
      </div>

      {Z && (
        <GlassCard style={{ marginTop: 10, padding: "20px", animation: "scaleIn 0.2s cubic-bezier(0.16,1,0.3,1) both" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: viewMode === "heatmap" ? "#FF3B30" : navy }}/>
                <span style={{ fontFamily: F, fontSize: 15, fontWeight: 600, color: t1 }}>{Z.name}</span>
                <span style={{ fontFamily: F, fontSize: 9.5, padding: "3px 8px", borderRadius: 5, background: "rgba(8,28,58,0.06)", color: t2, fontWeight: 600 }}>{Z.side === "on" ? "On-side" : "Off-side"}</span>
              </div>
              <span style={{ fontFamily: F, fontSize: 11, color: t3 }}>{Math.round(Z.runs / BC_TOTAL * 100)}% of total runs</span>
            </div>
            <button onClick={() => setSel(null)} style={{ width: 28, height: 28, borderRadius: "50%", background: bg, border: `1px solid rgba(15,23,42,0.08)`, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
              <X size={10} color={t3} strokeWidth={2}/>
            </button>
          </div>
          <div style={{ display: "flex", gap: 8, marginBottom: 16, paddingBottom: 16, borderBottom: "1px solid rgba(15,23,42,0.05)" }}>
            {[{ l: "Runs", v: String(Z.runs) }, { l: "Balls", v: String(Z.balls) }, { l: "SR", v: String(Z.sr) }, { l: "4s / 6s", v: `${Z.fours}/${Z.sixes}` }].map((m, i) => (
              <div key={m.l} style={{ flex: 1, background: "rgba(8,28,58,0.02)", borderRadius: 8, padding: "12px 8px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 6 }}>
                <p style={{ fontFamily: F, fontSize: 20, fontWeight: 600, letterSpacing: "-0.4px", color: t1, lineHeight: 1 }}>{m.v}</p>
                <p style={{ fontFamily: F, fontSize: 9, color: t3, textTransform: "uppercase", letterSpacing: 0.5, fontWeight: 500 }}>{m.l}</p>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
            <span style={{ fontFamily: F, fontSize: 10, color: t3 }}>Zone contribution</span>
            <span style={{ fontFamily: F, fontSize: 10, fontWeight: 600, color: t1 }}>{Math.round(Z.runs / BC_TOTAL * 100)}%</span>
          </div>
          <div style={{ height: 4, background: t4, borderRadius: 2, overflow: "hidden" }}>
            <div style={{ height: "100%", background: viewMode === "heatmap" ? "#FF9500" : green, borderRadius: 2, width: `${Z.runs / BC_TOTAL * 100}%`, transition: "width 0.5s cubic-bezier(0.16,1,0.3,1) 0.1s" }} />
          </div>
        </GlassCard>
      )}
    </div>
  )
}

// ─── SENSOR ──────────────────────────────────────────────────────────────────
function Sensor({ state, onChange }: { state: "disconnected" | "connecting" | "connected"; onChange: (s: "disconnected" | "connecting" | "connected") => void }) {
  const metrics = [
    { name: "Bat Speed",      val: "104 km/h", valColor: t1 },
    { name: "Impact Speed",   val: "96 km/h",  valColor: t1 },
    { name: "Bat Face Angle", val: "2.1° Open",valColor: "#EF4444" },
    { name: "Time to Impact", val: "118 ms",   valColor: green },
  ]
  const handleConnect = () => {
    if (state === "disconnected") { onChange("connecting"); setTimeout(() => onChange("connected"), 2000) }
    else if (state === "connected") onChange("disconnected")
  }
  return (
    <GlassCard style={{ margin: "0 16px", overflow: "hidden", position: "relative" }}>
      {state === "connected" && <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: green, animation: "pulseGlow 2s infinite" }} />}
      <div style={{ padding: "18px 18px 14px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ flex: 1 }}>
          <p style={{ fontFamily: F, fontSize: 15, fontWeight: 600, color: t1, margin: "0 0 4px", letterSpacing: "-0.2px", display: "flex", alignItems: "center", gap: 6 }}>
            {state === "disconnected" && "Connect StanceBeam Sensor"}
            {state === "connecting"   && "Pairing Sensor..."}
            {state === "connected"    && <>Sensor Connected <span style={{ width: 6, height: 6, borderRadius: "50%", background: green, boxShadow: "0 0 8px #00E676", display: "inline-block" }}/></>}
          </p>
          <p style={{ fontFamily: F, fontSize: 12, color: t2, lineHeight: 1.4, margin: 0 }}>
            {state === "disconnected" && "Unlock real-time 3D swing analytics"}
            {state === "connecting"   && "Keep sensor close to your phone..."}
            {state === "connected"    && "Stancebeam Strike iOS v4.2 · Active"}
          </p>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          {state === "disconnected" && <div style={{ width: 36, height: 36, borderRadius: "50%", background: "rgba(8,28,58,0.04)", display: "flex", alignItems: "center", justifyContent: "center" }}><Lock size={18} color={t3} strokeWidth={2}/></div>}
          {state === "connecting"   && <div style={{ width: 24, height: 24, border: `2.5px solid ${t4}`, borderTopColor: navy, borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />}
          {state === "connected"    && (
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ position: "absolute", width: 28, height: 28, borderRadius: "50%", border: `1.5px solid ${green}`, animation: "pulseRing 2s cubic-bezier(0.215,0.61,0.355,1) 0.5s infinite" }} />
                <Check size={14} color={green} strokeWidth={2.5}/>
              </div>
              <span style={{ fontFamily: F, fontSize: 10, color: t3, fontWeight: 600 }}>92%</span>
            </div>
          )}
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 8, padding: "0 16px 16px" }}>
        {metrics.map(m => {
          const isLocked = state !== "connected"
          return (
            <div key={m.name} style={{ background: bg, borderRadius: 12, padding: "14px 8px 16px", display: "flex", flexDirection: "column", alignItems: "center", gap: 8, opacity: state === "connecting" ? 0.5 : 1, transition: "opacity 0.3s ease" }}>
              {isLocked
                ? <div style={{ height: 24, display: "flex", alignItems: "center", justifyContent: "center" }}><Lock size={12} color={t3} strokeWidth={2.5}/></div>
                : <div style={{ fontFamily: F, fontSize: 14, fontWeight: 600, color: m.valColor, height: 24, display: "flex", alignItems: "center", justifyContent: "center", lineHeight: 1 }}>{m.val}</div>
              }
              <span style={{ fontFamily: F, fontSize: 9, fontWeight: 600, color: isLocked ? t3 : t2, textAlign: "center", lineHeight: 1.3, minHeight: 24, display: "flex", alignItems: "center", justifyContent: "center" }}>{m.name}</span>
            </div>
          )
        })}
      </div>
      <button onClick={handleConnect} disabled={state === "connecting"}
        style={{ display: "block", width: "100%", padding: 14, border: "none", fontFamily: F, fontSize: 13, fontWeight: 600, color: "#fff", letterSpacing: 0.3, cursor: state === "connecting" ? "not-allowed" : "pointer", background: state === "connected" ? "#EF4444" : navy, opacity: state === "connecting" ? 0.8 : 1, transition: "background 0.3s ease" }}
      >
        {state === "disconnected" && "Connect Sensor"}
        {state === "connecting"   && "Searching for StanceBeam..."}
        {state === "connected"    && "Disconnect Sensor"}
      </button>
    </GlassCard>
  )
}

// ─── AI COACH ────────────────────────────────────────────────────────────────
function AICoach({ text, insight, category }: { text: string; insight: string; category: string }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{ margin: "0 16px", background: card, borderRadius: 14, border: "1px solid rgba(15,23,42,0.06)", overflow: "hidden", transform: hovered ? "translateY(-2px)" : "translateY(0)", boxShadow: hovered ? SH3 : "0 1px 4px rgba(15,23,42,0.04)", transition: "transform 0.2s cubic-bezier(0.4,0,0.2,1), box-shadow 0.2s cubic-bezier(0.4,0,0.2,1)" }}
    >
      <div style={{ padding: "15px 16px 13px", display: "flex", alignItems: "center", gap: 12, borderBottom: "1px solid rgba(15,23,42,0.05)" }}>
        <div style={{ position: "relative", flexShrink: 0 }}>
          <div style={{ width: 46, height: 46, borderRadius: "50%", overflow: "hidden", border: `2px solid ${navy}`, background: "#f0f0f0" }}>
            <img src="/coach-avatar.jpg" alt="Ray Kapoor" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 20%" }}/>
          </div>
          <div style={{ position: "absolute", bottom: 1, right: 1, width: 11, height: 11, background: "#10B981", borderRadius: "50%", border: "2.5px solid white" }}/>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 4 }}>
            <span style={{ fontFamily: F, fontSize: 13, fontWeight: 600, color: t1 }}>Ray Kapoor</span>
            <span style={{ fontFamily: F, fontSize: 8, fontWeight: 600, color: navy, background: "rgba(8,28,58,0.08)", padding: "2px 7px", borderRadius: 4, letterSpacing: "0.3px", textTransform: "uppercase" }}>AI Coach</span>
          </div>
          <span style={{ fontFamily: F, fontSize: 10, color: t3 }}>Performance Analyst · StanceBeam</span>
        </div>
      </div>
      <div style={{ padding: "13px 16px 15px" }}>
        <p style={{ fontFamily: F, fontSize: 10, fontWeight: 600, letterSpacing: 0.7, textTransform: "uppercase", color: t3, marginBottom: 7 }}>{category}</p>
        <p style={{ fontFamily: F, fontSize: 13.5, fontWeight: 500, color: t1, marginBottom: 10, lineHeight: 1.5 }}>{insight}</p>
        <p style={{ fontFamily: F, fontSize: 13, fontWeight: 400, lineHeight: 1.65, color: t2 }}>{text}</p>
        <div style={{ marginTop: 14, display: "flex", justifyContent: "flex-end" }}>
          <button style={{ fontFamily: F, fontSize: 11.5, fontWeight: 600, color: navy, background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 4, padding: 0, opacity: 0.85 }}>
            View full analysis <ChevronRight size={11} color={navy} strokeWidth={1.8}/>
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── RECORDS ─────────────────────────────────────────────────────────────────
const BATTING_REC = [
  { label: "Longest Innings",  sub: "No. of Balls Faced in a slot", mine: 140, cent: 280 },
  { label: "Most Boundaries",  sub: "In a slot",                    mine: 32,  cent: 56  },
  { label: "Most Sixers",      sub: "In a slot",                    mine: 23,  cent: 54  },
]
const BOWLING_REC = [
  { label: "Longest Spell",    sub: "Balls Bowled in a slot",       mine: 10,  cent: 40  },
  { label: "Middle Stump!",    sub: "Hitting the middle stump",      mine: 2,   cent: 5   },
  { label: "Fastest Ball",     sub: "km/h",                         mine: 123, cent: 155 },
]

function Records({ type }: { type: "batting" | "bowling" }) {
  const [mounted, setMounted] = useState(false)
  const [hoveredRow, setHoveredRow] = useState<number | null>(null)
  useEffect(() => { const t = setTimeout(() => setMounted(true), 200); return () => clearTimeout(t) }, [])
  const rows = type === "batting" ? BATTING_REC : BOWLING_REC

  return (
    <div style={{ margin: "0 16px" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
        <span style={{ fontFamily: FS, fontSize: 18, fontWeight: 400, letterSpacing: "-0.4px", color: t1, lineHeight: 1.25 }}>{type === "batting" ? "Batting" : "Bowling"} Records</span>
        <div style={{ display: "flex", gap: 12, fontFamily: F, fontSize: 10.5 }}>
          <span style={{ display: "flex", alignItems: "center", gap: 5, color: t2, fontWeight: 500 }}><span style={{ width: 10, height: 3, borderRadius: 2, background: navy, display: "inline-block" }}/>Mine</span>
          <span style={{ display: "flex", alignItems: "center", gap: 5, color: t3, fontWeight: 500 }}><span style={{ width: 10, height: 3, borderRadius: 2, background: t4, display: "inline-block" }}/>Center</span>
        </div>
      </div>
      <GlassCard style={{ overflow: "hidden" }}>
        {rows.map((r, i) => (
          <div key={r.label}
            onMouseEnter={() => setHoveredRow(i)} onMouseLeave={() => setHoveredRow(null)}
            style={{ padding: "16px 18px", borderBottom: i < rows.length - 1 ? "1px solid rgba(15,23,42,0.06)" : "none", background: hoveredRow === i ? "rgba(8,28,58,0.018)" : "transparent", transition: "background 0.14s ease" }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
              <div>
                <p style={{ fontFamily: F, fontSize: 13, fontWeight: 500, color: t1, marginBottom: 2 }}>{r.label}</p>
                <p style={{ fontFamily: F, fontSize: 11, color: t2 }}>{r.sub}</p>
              </div>
              <span style={{ fontFamily: F, fontSize: 18, fontWeight: 600, letterSpacing: "-0.4px", color: t1 }}>{r.cent}</span>
            </div>
            <div style={{ height: 6, background: t4, borderRadius: 3, marginBottom: 5, position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", left: 0, top: 0, height: "100%", width: `${(r.mine / r.cent) * 100}%`, background: navy, borderRadius: 3, transform: mounted ? "scaleX(1)" : "scaleX(0)", transformOrigin: "left", transition: `transform 0.7s cubic-bezier(0.16,1,0.3,1) ${0.2 + i * 0.12}s` }} />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontFamily: F, fontSize: 10 }}>
              <span style={{ color: t2, fontWeight: 600 }}>{r.mine} my best</span>
              <span style={{ color: t3, fontWeight: 500 }}>{r.cent} center best</span>
            </div>
          </div>
        ))}
      </GlassCard>
    </div>
  )
}

// ─── BOWLING PERFORMANCE CARD ─────────────────────────────────────────────────
function BowlingPerformanceCard({ stats }: { stats: { v: string; l: string }[] }) {
  const [hoveredSpeedIdx, setHoveredSpeedIdx] = useState<number | null>(null)
  const [hoveredBallsIdx, setHoveredBallsIdx] = useState<number | null>(null)
  const [mounted, setMounted] = useState(false)
  useEffect(() => { const t = setTimeout(() => setMounted(true), 150); return () => clearTimeout(t) }, [])

  const speed = [135, 142, 147, 148, 146, 139, 138]
  const balls = [90, 110, 75, 130, 88, 118, 124]
  const sMax = Math.max(...speed), bMax = Math.max(...balls)
  const labels = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"]

  return (
    <GlassCard style={{ margin: "0 16px" }}>
      <p style={{ fontFamily: F, fontSize: 10, fontWeight: 600, letterSpacing: 0.8, textTransform: "uppercase", color: t3, padding: "16px 18px 14px", margin: 0 }}>Bowling Stats</p>
      <div style={{ display: "flex" }}>
        <div style={{ flex: 1, padding: "0 18px 16px" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 3 }}>
            <span style={{ fontFamily: F, fontSize: 32, fontWeight: 600, letterSpacing: "-1.2px", lineHeight: 1, color: t1 }}>{hoveredSpeedIdx !== null ? speed[hoveredSpeedIdx] : 138}</span>
            <span style={{ fontFamily: F, fontSize: 10, color: t3 }}>km/h</span>
          </div>
          <p style={{ fontFamily: F, fontSize: 10, color: hoveredSpeedIdx !== null ? navy : t3, fontWeight: hoveredSpeedIdx !== null ? 600 : 400, marginBottom: 10, transition: "color 0.15s" }}>{hoveredSpeedIdx !== null ? `${labels[hoveredSpeedIdx]} Session` : "Ball Speed"}</p>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 3, height: 44, position: "relative" }}>
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 1, background: "rgba(15,23,42,0.06)" }}/>
            {speed.map((v, i) => (
              <div key={i} onMouseEnter={() => setHoveredSpeedIdx(i)} onMouseLeave={() => setHoveredSpeedIdx(null)}
                style={{ flex: 1, borderRadius: "4px 4px 0 0", height: `${(v / sMax) * 100}%`, background: hoveredSpeedIdx === i ? green : i === speed.length - 1 ? navy : t4, transformOrigin: "bottom", cursor: "pointer", transform: mounted ? "scaleY(1)" : "scaleY(0)", transition: `transform 0.55s cubic-bezier(0.16,1,0.3,1) ${0.15 + i * 0.055}s, background 0.14s ease` }}
              />
            ))}
          </div>
          <div style={{ marginTop: 10, display: "flex", flexDirection: "column", gap: 4 }}>
            <Row dot={t4} label="Prev Week" value="136" />
            <Row dot={navy} label="This Week" value="138" bold />
          </div>
        </div>
        <div style={{ width: 1, background: "rgba(15,23,42,0.05)", margin: "0 0 16px" }}/>
        <div style={{ flex: 1, padding: "0 18px 16px" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 3 }}>
            <span style={{ fontFamily: F, fontSize: 32, fontWeight: 600, letterSpacing: "-1.2px", lineHeight: 1, color: t1 }}>{hoveredBallsIdx !== null ? balls[hoveredBallsIdx] : 124}</span>
            <span style={{ fontFamily: F, fontSize: 10, color: t3 }}>balls</span>
          </div>
          <p style={{ fontFamily: F, fontSize: 10, color: hoveredBallsIdx !== null ? navy : t3, fontWeight: hoveredBallsIdx !== null ? 600 : 400, marginBottom: 10, transition: "color 0.15s" }}>{hoveredBallsIdx !== null ? `Day ${hoveredBallsIdx + 1} Session` : "Balls Bowled"}</p>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 3, height: 44, position: "relative" }}>
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 1, background: "rgba(15,23,42,0.06)" }}/>
            {balls.map((v, i) => (
              <div key={i} onMouseEnter={() => setHoveredBallsIdx(i)} onMouseLeave={() => setHoveredBallsIdx(null)}
                style={{ flex: 1, borderRadius: "4px 4px 0 0", height: `${(v / bMax) * 100}%`, background: hoveredBallsIdx === i ? green : i === balls.length - 1 ? navy : t4, transformOrigin: "bottom", cursor: "pointer", transform: mounted ? "scaleY(1)" : "scaleY(0)", transition: `transform 0.55s cubic-bezier(0.16,1,0.3,1) ${0.15 + i * 0.055}s, background 0.14s ease` }}
              />
            ))}
          </div>
          <div style={{ marginTop: 10, display: "flex", flexDirection: "column", gap: 4 }}>
            <Row dot={t4} label="Prev Week" value="110" />
            <Row dot={navy} label="This Week" value="124" bold />
          </div>
        </div>
      </div>
      <div style={{ display: "flex", borderTop: "1px solid rgba(15,23,42,0.05)" }}>
        {stats.map((s, i) => (
          <div key={i} style={{ flex: 1, padding: "16px 8px", textAlign: "center" }}>
            <div style={{ fontFamily: F, fontSize: 14, fontWeight: 600, letterSpacing: "-0.3px", color: t1, lineHeight: 1, marginBottom: 6 }}>{s.v}</div>
            <div style={{ fontFamily: F, fontSize: 10, fontWeight: 500, color: t3, letterSpacing: 0.3 }}>{s.l}</div>
          </div>
        ))}
      </div>
    </GlassCard>
  )
}

// ─── LOAD MANAGEMENT ─────────────────────────────────────────────────────────
function LoadMgmt() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => { const t = setTimeout(() => setMounted(true), 200); return () => clearTimeout(t) }, [])
  const days = [68, 82, 55, 90, 72, 80]
  const max = Math.max(...days)
  const avg = Math.round(days.reduce((a, b) => a + b, 0) / days.length)

  return (
    <GlassCard style={{ margin: "0 16px", padding: "16px 18px 18px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
        <div>
          <p style={{ fontFamily: F, fontSize: 14, fontWeight: 600, color: t1, marginBottom: 3 }}>Workload Timeline</p>
          <p style={{ fontFamily: F, fontSize: 11, color: t2 }}>Daily bowling volume</p>
        </div>
        <div style={{ textAlign: "right" }}>
          <span style={{ fontFamily: F, fontSize: 18, fontWeight: 600, letterSpacing: "-0.4px", color: t1 }}>80</span>
          <p style={{ fontFamily: F, fontSize: 9, fontWeight: 600, color: green, marginTop: 2 }}>Optimal Load</p>
        </div>
      </div>
      <div style={{ position: "relative", height: 62 }}>
        <div style={{ position: "absolute", left: 0, right: 0, bottom: `${(65 / max) * 100}%`, height: `${((85 - 65) / max) * 100}%`, background: "rgba(100,116,139,0.04)", border: "1px solid rgba(100,116,139,0.08)", borderRadius: 4 }} />
        <div style={{ display: "flex", gap: 5, alignItems: "flex-end", height: "100%", position: "relative" }}>
          {days.map((v, i) => (
            <div key={i} style={{ flex: 1, borderRadius: "5px 5px 0 0", background: i === days.length - 1 ? navy : "#CBD5E1", height: `${(v / max) * 100}%`, transformOrigin: "bottom", opacity: i === days.length - 1 ? 1 : 0.6, transform: mounted ? "scaleY(1)" : "scaleY(0)", transition: `transform 0.6s cubic-bezier(0.16,1,0.3,1) ${0.2 + i * 0.08}s` }} />
          ))}
        </div>
      </div>
      <div style={{ display: "flex", gap: 5, marginTop: 8 }}>
        {["Mon","Tue","Wed","Thu","Fri","Sat"].map((d, i) => (
          <span key={d} style={{ flex: 1, textAlign: "center", fontFamily: F, fontSize: 10, color: i === days.length - 1 ? t1 : t3, fontWeight: i === days.length - 1 ? 600 : 500 }}>{d}</span>
        ))}
      </div>
      <div style={{ marginTop: 12, paddingTop: 12, borderTop: "1px solid rgba(15,23,42,0.05)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontFamily: F, fontSize: 11, color: t2 }}>Weekly average</span>
        <span style={{ fontFamily: F, fontSize: 12, fontWeight: 600, color: t1 }}>{avg} balls/day</span>
      </div>
    </GlassCard>
  )
}

// ─── PITCH MAP ───────────────────────────────────────────────────────────────
function PitchMap() {
  const [hoveredZone, setHoveredZone] = useState<number | null>(null)
  const zones = [
    { l: "Short Zone",  p: 50, c: 40, y: 20, h: 32, color: "#FF3B30", bg: "rgba(255,59,48,0.14)"  },
    { l: "Good Length", p: 30, c: 30, y: 52, h: 36, color: "#FF9500", bg: "rgba(255,149,0,0.16)"  },
    { l: "Full Zone",   p: 20, c: 10, y: 88, h: 32, color: green,     bg: "rgba(0,230,118,0.14)"  },
  ]
  return (
    <GlassCard style={{ margin: "0 16px", padding: "16px 18px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
        <Grid3x3 size={15} color={navy} strokeWidth={2.2}/>
        <p style={{ fontFamily: F, fontSize: 14, fontWeight: 600, color: t1, margin: 0 }}>Pitch Landing Map</p>
      </div>
      <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
        <div style={{ position: "relative", width: 90, height: 140, flexShrink: 0 }}>
          <svg width="90" height="140" viewBox="0 0 90 140">
            <rect x="20" y="5" width="50" height="130" rx="3" fill="#EADFCD" stroke="rgba(15,23,42,0.12)" strokeWidth="0.8"/>
            <line x1="20" y1="20" x2="70" y2="20" stroke="rgba(15,23,42,0.25)" strokeWidth="0.8"/>
            <line x1="20" y1="120" x2="70" y2="120" stroke="rgba(15,23,42,0.25)" strokeWidth="0.8"/>
            {zones.map((z, idx) => (
              <rect key={z.l} x="20" y={z.y} width="50" height={z.h} fill={z.bg} stroke={z.color}
                strokeWidth={hoveredZone === idx ? 1.8 : 0.8}
                style={{ cursor: "pointer", opacity: hoveredZone !== null ? (hoveredZone === idx ? 1 : 0.35) : 0.85, transition: "opacity 0.2s, stroke-width 0.15s" }}
                onMouseEnter={() => setHoveredZone(idx)} onMouseLeave={() => setHoveredZone(null)}
              />
            ))}
          </svg>
        </div>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 7 }}>
          {zones.map((z, idx) => (
            <div key={z.l}
              onMouseEnter={() => setHoveredZone(idx)} onMouseLeave={() => setHoveredZone(null)}
              style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "6px 8px", borderRadius: 10, border: `1px solid ${hoveredZone === idx ? z.color : "transparent"}`, background: hoveredZone === idx ? "rgba(8,28,58,0.04)" : "transparent", cursor: "pointer", transition: "background 0.18s, border-color 0.18s" }}
            >
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: z.color }}/>
                  <span style={{ fontFamily: F, fontSize: 12, fontWeight: 600, color: t1 }}>{z.l}</span>
                </div>
                <span style={{ fontFamily: F, fontSize: 10.5, color: t3 }}>{z.c} balls</span>
              </div>
              <span style={{ fontFamily: F, fontSize: 15, fontWeight: 700, color: t1 }}>{z.p}%</span>
            </div>
          ))}
        </div>
      </div>
      {hoveredZone !== null && (
        <div style={{ marginTop: 12, padding: "8px 10px", background: zones[hoveredZone].bg, borderRadius: 8, borderLeft: `3px solid ${zones[hoveredZone].color}`, animation: "scaleIn 0.2s cubic-bezier(0.16,1,0.3,1) both" }}>
          <p style={{ fontFamily: F, fontSize: 12, color: t1, margin: 0, lineHeight: 1.45 }}>
            <strong>{zones[hoveredZone].l}</strong> Zone — <strong>{zones[hoveredZone].p}%</strong> of deliveries ({zones[hoveredZone].c} balls).
          </p>
        </div>
      )}
    </GlassCard>
  )
}

// ─── PLAY CONTENT ────────────────────────────────────────────────────────────
function CategoryFilter({ active, onChange }: { active: string; onChange(v: string): void }) {
  const [idx, setIdx] = useState(0)
  const tabs = [["All Games","All Games"],["My Playing History","My History"]]
  return (
    <div style={{ display: "flex", gap: 6, margin: "10px 16px 0", position: "relative" }}>
      <div style={{ position: "absolute", top: 0, left: 0, bottom: 0, width: "calc(50% - 3px)", background: navy, borderRadius: 8, transform: idx === 0 ? "translateX(0)" : "translateX(calc(100% + 6px))", transition: "transform 0.22s cubic-bezier(0.4,0,0.2,1)", pointerEvents: "none" }} />
      {tabs.map(([full, short], i) => {
        const on = active === full
        return (
          <button key={full} onClick={() => { onChange(full); setIdx(i) }}
            style={{ flex: 1, padding: "8px 6px", borderRadius: 8, fontFamily: F, fontSize: 12, fontWeight: on ? 600 : 500, color: on ? "#fff" : t2, cursor: "pointer", background: "transparent", border: on ? "none" : `1px solid rgba(15,23,42,0.08)`, position: "relative", zIndex: 1, transition: "color 0.18s ease" }}
          >{short}</button>
        )
      })}
    </div>
  )
}

function GameCard({ game, badge }: { game: any; badge?: React.ReactNode }) {
  const [hovered, setHovered] = useState(false)
  const [pressed, setPressed] = useState(false)
  const diffColors: Record<string, string> = { "Beginner": green, "Intermediate": "#FF9500", "Advanced": "#FF3B30" }
  const isBowling = game.category === "Bowling"
  return (
    <div
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => { setHovered(false); setPressed(false) }}
      onMouseDown={() => setPressed(true)} onMouseUp={() => setPressed(false)}
      onTouchStart={() => setPressed(true)} onTouchEnd={() => setPressed(false)}
      style={{ ...CARD, padding: 16, cursor: "pointer", position: "relative", overflow: "visible", display: "flex", flexDirection: "column", gap: 12, transform: pressed ? "scale(0.96) translateY(1px)" : hovered ? "translateY(-2px)" : "scale(1)", boxShadow: pressed ? SH1 : hovered ? SH3 : SH2, transition: "transform 0.18s cubic-bezier(0.4,0,0.2,1), box-shadow 0.18s cubic-bezier(0.4,0,0.2,1)" }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 38, height: 38, borderRadius: 10, background: isBowling ? "linear-gradient(135deg,#E8F5E9,#C8E6C9)" : "linear-gradient(135deg,#E1F5FE,#B3E5FC)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            {isBowling ? <CricketBallIcon size={20}/> : <CricketBatIcon size={20}/>}
          </div>
          <div style={{ flex: 1 }}>
            <h3 style={{ fontFamily: F, fontSize: 14.5, fontWeight: 700, color: t1, letterSpacing: "-0.2px", lineHeight: 1.25, margin: 0 }}>{game.title}</h3>
            <span style={{ fontFamily: F, fontSize: 10, fontWeight: 600, color: t3, textTransform: "uppercase", letterSpacing: 0.4 }}>{game.category}</span>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <span style={{ fontFamily: F, fontSize: 10, fontWeight: 600, color: t2 }}>{game.level}</span>
          <div style={{ width: 7, height: 7, borderRadius: "50%", background: diffColors[game.level] || t4 }}/>
        </div>
      </div>
      <div>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 4, background: "rgba(8,28,58,0.05)", padding: "3px 8px", borderRadius: 6, marginBottom: 8 }}>
          <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke={navy} strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
          <span style={{ fontFamily: F, fontSize: 10, fontWeight: 600, color: navy }}>{game.skill}</span>
        </div>
        <p style={{ fontFamily: F, fontSize: 12, color: t2, lineHeight: 1.45, margin: 0 }}>{game.description}</p>
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 10, borderTop: `1px solid ${BD}` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={t3} strokeWidth="2" strokeLinecap="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>
          <span style={{ fontFamily: F, fontSize: 10, fontWeight: 500, color: t3 }}>{game.players}</span>
        </div>
        {badge}
      </div>
      {game.isNew && <div style={{ position: "absolute", top: -8, left: 16, background: green, color: gText, fontSize: 9, fontWeight: 800, padding: "3px 8px", borderRadius: 6, letterSpacing: "0.5px", textTransform: "uppercase" }}>NEW</div>}
    </div>
  )
}

function PlayContent() {
  const [category, setCategory] = useState("All Games")
  const featured   = [
    { title: "Hit the Zone",  level: "Beginner",    skill: "Batting Accuracy", description: "Bowl at easy target zones and score points as you build your accuracy.", players: "Up to 3", category: "Bowling", isNew: true },
    { title: "Power Strike",  level: "Intermediate", skill: "Shot Placement",  description: "Hit designated scoring zones with precision timing and power control.",  players: "1-4",     category: "Batting", isNew: true },
  ]
  const compete    = [
    { title: "Accuracy Challenge", level: "Beginner",    skill: "Batting Accuracy",  description: "Compete with players worldwide in precision batting challenges.", players: "Multiplayer", category: "Batting", isNew: false, rank: 12 },
    { title: "Speed Bowling",      level: "Intermediate", skill: "Bowling Precision", description: "Test your bowling speed and accuracy against other players.",     players: "Multiplayer", category: "Bowling", isNew: true,  rank: 8  },
  ]
  const mostPlayed = [
    { title: "Quick Reflexes", level: "Beginner",    skill: "Reaction Speed", description: "Improve your reaction time with rapid-fire batting challenges.", players: "1-2",  category: "Batting", isNew: false, popularity: 87 },
    { title: "Spin Master",    level: "Intermediate", skill: "Footwork",       description: "Master spin bowling with advanced footwork training.",           players: "Solo", category: "Bowling", isNew: false, popularity: 94 },
  ]
  const completed  = [
    { title: "Target Practice", level: "Beginner", skill: "Batting Accuracy", description: "Hit designated target zones with consistency and precision.", players: "Solo", category: "Batting", isNew: false, score: 850, improvement: "+12%" },
  ]
  return (
    <>
      <CategoryFilter active={category} onChange={setCategory}/>
      <SectionTitle label="Featured Games"/>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, padding: "0 16px" }}>
        {featured.map((g, i) => <GameCard key={i} game={g}/>)}
      </div>
      <SectionTitle label="Compete with Others"/>
      <div style={{ display: "flex", flexDirection: "column", gap: 8, padding: "0 16px" }}>
        {compete.map((g, i) => <GameCard key={i} game={g} badge={<div style={{ width: 30, height: 30, borderRadius: "50%", background: navy, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: F, fontSize: 11, fontWeight: 700 }}>#{g.rank}</div>}/>)}
      </div>
      <SectionTitle label="Most Played at Your Center"/>
      <div style={{ display: "flex", flexDirection: "column", gap: 8, padding: "0 16px" }}>
        {mostPlayed.map((g, i) => <GameCard key={i} game={g} badge={<div style={{ display: "flex", alignItems: "center", gap: 3, background: "rgba(255,255,255,0.97)", padding: "4px 7px", borderRadius: 7, boxShadow: SH2, border: `1px solid ${t4}` }}><svg width="9" height="9" viewBox="0 0 24 24" fill="none"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" fill={navy}/></svg><span style={{ fontFamily: F, fontSize: 10, fontWeight: 700, color: t1 }}>{g.popularity}%</span></div>}/>)}
      </div>
      <SectionTitle label="Recently Completed by You"/>
      <div style={{ display: "flex", flexDirection: "column", gap: 8, padding: "0 16px" }}>
        {completed.map((g, i) => <GameCard key={i} game={g} badge={<div style={{ background: `linear-gradient(135deg,${green},#00C863)`, padding: "5px 10px", borderRadius: 9 }}><div style={{ fontFamily: F, fontSize: 15, fontWeight: 700, color: navy, lineHeight: 1 }}>{g.score}</div><div style={{ fontFamily: F, fontSize: 9.5, fontWeight: 600, color: "rgba(0,87,42,0.85)", marginTop: 2 }}>{g.improvement}</div></div>}/>)}
      </div>
      <div style={{ height: 12 }}/>
    </>
  )
}

// ─── BOTTOM NAV ──────────────────────────────────────────────────────────────
// ─── MAIN ────────────────────────────────────────────────────────────────────
export default function JourneyScreen() {
  const [seg, setSeg] = useState("Learn & Improve")
  const [tab, setTab] = useState("Last Week")
  const [btab, setBtab] = useState("Last Week")
  const [sensorState, setSensorState] = useState<"disconnected" | "connecting" | "connected">("disconnected")

  const bStats = [{ v: "2/10", l: "Sessions" }, { v: "124", l: "Balls" }, { v: "20/5", l: "4s / 6s" }, { v: "4h 23m", l: "Time" }]
  const wStats = [{ v: "2/10", l: "Sessions" }, { v: "124", l: "Balls" }, { v: "3", l: "Wickets" }, { v: "4h 23m", l: "Time" }]

  return (
    <div style={{ background: bg, fontFamily: F }}>
      <Header/>
      <SegControl active={seg} onChange={setSeg}/>

      {seg === "Learn & Improve" ? (
        <div key="learn">
          <div style={{ animation: "fadeSlideUp 0.32s cubic-bezier(0.16,1,0.3,1) both" }}>
            <TimeTabs active={tab} onChange={setTab}/>
          </div>
          <div style={{ animation: "fadeSlideUp 0.32s 0.06s cubic-bezier(0.16,1,0.3,1) both" }}>
            <SectionTitle label="Batting"/>
            <PerformanceCard stats={bStats}/>
          </div>
          <div style={{ animation: "fadeSlideUp 0.32s 0.12s cubic-bezier(0.16,1,0.3,1) both" }}>
            <div style={{ height: 24 }}/>
            <BattingCircle/>
          </div>
          <div style={{ animation: "fadeSlideUp 0.32s 0.18s cubic-bezier(0.16,1,0.3,1) both" }}>
            <div style={{ height: 24 }}/>
            <Sensor state={sensorState} onChange={setSensorState}/>
            <div style={{ height: 16 }}/>
            <AICoach insight="Front Foot Placement" category="Batting Insight" text="Your front foot is landing slightly open, which is restricting your downswing. Try pointing it a touch more toward mid-on."/>
          </div>
          <div style={{ animation: "fadeSlideUp 0.32s 0.24s cubic-bezier(0.16,1,0.3,1) both" }}>
            <div style={{ height: 24 }}/>
            <Records type="batting"/>
          </div>
          <div style={{ animation: "fadeSlideUp 0.32s 0.30s cubic-bezier(0.16,1,0.3,1) both" }}>
            <SectionTitle label="Bowling"/>
            <TimeTabs active={btab} onChange={setBtab}/>
            <div style={{ height: 12 }}/>
            <BowlingPerformanceCard stats={wStats}/>
            <div style={{ height: 12 }}/>
            <LoadMgmt/>
            <div style={{ height: 12 }}/>
            <PitchMap/>
            <div style={{ height: 12 }}/>
            <AICoach insight="Front Arm Mechanics" category="Bowling Insight" text="Your front arm is collapsing early in the delivery stride. Keep it strong and high through release to generate more pace."/>
            <div style={{ height: 24 }}/>
            <Records type="bowling"/>
            <div style={{ height: 16 }}/>
          </div>
        </div>
      ) : (
        <div key="play" style={{ animation: "fadeSlideUp 0.28s cubic-bezier(0.16,1,0.3,1) both" }}>
          <PlayContent/>
        </div>
      )}

    </div>
  )
}
