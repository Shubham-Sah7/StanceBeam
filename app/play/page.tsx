import PlayScreen from "@/components/sb/PlayScreen"

export default function PlayPage() {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh", background: "#D1D5DB", padding: "32px 0" }}>
      {/* iPhone 17 frame */}
      <div style={{ position: "relative", width: 375, height: 812, background: "#1A1A1A", borderRadius: 44, boxShadow: "0 0 0 1px #4A4A4A, 0 28px 70px rgba(0,0,0,0.38)", flexShrink: 0 }}>
        {/* Buttons */}
        <div style={{ position: "absolute", left: -2, top: 144, width: 2, height: 30, background: "#3A3A3A", borderRadius: "2px 0 0 2px" }}/>
        <div style={{ position: "absolute", left: -2, top: 184, width: 2, height: 30, background: "#3A3A3A", borderRadius: "2px 0 0 2px" }}/>
        <div style={{ position: "absolute", right: -2, top: 170, width: 2, height: 56, background: "#3A3A3A", borderRadius: "0 2px 2px 0" }}/>

        {/* Screen */}
        <div style={{ position: "absolute", inset: 4, borderRadius: 40, overflow: "hidden", background: "#fff", display: "flex", flexDirection: "column" }}>
          {/* Status bar */}
          <div style={{ height: 48, background: "#081C3A", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 22px", position: "relative", zIndex: 10 }}>
            <span style={{ fontSize: 13.5, fontWeight: 600, color: "#fff", fontFamily: '-apple-system,sans-serif' }}>9:41</span>
            {/* Dynamic Island */}
            <div style={{ position: "absolute", top: 9, left: "50%", transform: "translateX(-50%)", width: 108, height: 30, background: "#000", borderRadius: 18 }}/>
            <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
              <svg width="15" height="11" viewBox="0 0 15 11" fill="white"><rect x="0" y="3.5" width="2.2" height="7.5" rx="0.7"/><rect x="3.5" y="2" width="2.2" height="9" rx="0.7"/><rect x="7" y="0.5" width="2.2" height="10.5" rx="0.7"/><rect x="10.5" y="0" width="2.2" height="11" rx="0.7" opacity="0.3"/></svg>
              <svg width="14" height="11" viewBox="0 0 14 11" fill="white"><path d="M7 1.8C9 1.8 10.8 2.6 12.1 4L13.2 2.8C11.6 1 9.4 0 7 0S2.4 1 0.8 2.8L1.9 4C3.2 2.6 5 1.8 7 1.8Z"/><path d="M7 5C8.5 5 9.8 5.6 10.8 6.5L11.9 5.3C10.6 4.1 8.9 3.3 7 3.3S3.4 4.1 2.1 5.3L3.2 6.5C4.2 5.6 5.5 5 7 5Z"/><circle cx="7" cy="9" r="1.4"/></svg>
              <svg width="22" height="11" viewBox="0 0 22 11" fill="none"><rect x="0.5" y="0.5" width="18" height="10" rx="2.5" stroke="white" strokeOpacity="0.35"/><rect x="1.5" y="1.5" width="13" height="8" rx="1.5" fill="white"/><path d="M20 3.5v4a1.5 1.5 0 000-4z" fill="white" fillOpacity="0.4"/></svg>
            </div>
          </div>

          {/* Content */}
          <div style={{ flex: 1, overflowY: "auto", overflowX: "hidden", position: "relative" }}>
            <PlayScreen />
          </div>
        </div>
      </div>
    </div>
  )
}
