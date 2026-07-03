import type { LayoutProps, NavbarProps } from "sanity";

function PixelMark() {
  return (
    <div
      style={{
        width: 28,
        height: 28,
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gridTemplateRows: "repeat(4, 1fr)",
        border: "1px solid rgba(0,255,255,.55)",
        boxShadow: "0 0 18px rgba(0,255,255,.32)",
        background: "#05050c",
      }}
      aria-hidden
    >
      {[0, 1, 4, 5, 6, 9, 10, 11, 14, 15].map((cell) => (
        <span
          key={cell}
          style={{
            gridColumnStart: (cell % 4) + 1,
            gridRowStart: Math.floor(cell / 4) + 1,
            background: cell % 3 === 0 ? "#00ffff" : "#00bfff",
          }}
        />
      ))}
    </div>
  );
}

export function StudioLogo() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        minWidth: 0,
        color: "#dff7ff",
        fontFamily: '"JetBrains Mono", ui-monospace, monospace',
        letterSpacing: ".12em",
      }}
    >
      <PixelMark />
      <div style={{lineHeight: 1.25}}>
        <div style={{fontSize: 13, fontWeight: 800}}>
          CARLXS<span style={{color: "#00bfff"}}>DEV</span>
          <span style={{color: "#00ffff"}}>_</span>
        </div>
        <div style={{fontSize: 9, color: "rgba(223,247,255,.48)"}}>CONTENT CONTROL</div>
      </div>
    </div>
  );
}

export function StudioNavbar(props: NavbarProps) {
  return (
    <div
      style={{
        borderBottom: "1px solid rgba(0,191,255,.28)",
        background:
          "linear-gradient(90deg, rgba(0,71,255,.16), rgba(0,255,255,.05)), #060610",
        boxShadow: "0 0 28px rgba(0,128,255,.16)",
      }}
    >
      {props.renderDefault(props)}
    </div>
  );
}

export function StudioLayout(props: LayoutProps) {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#060610",
        backgroundImage:
          "linear-gradient(rgba(0,128,255,.045) 1px, transparent 1px), linear-gradient(90deg, rgba(0,128,255,.045) 1px, transparent 1px)",
        backgroundSize: "34px 34px",
      }}
    >
      {props.renderDefault(props)}
    </div>
  );
}
