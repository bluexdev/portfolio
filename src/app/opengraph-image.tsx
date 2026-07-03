import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "72px",
          backgroundColor: "#060610",
          color: "white",
          fontFamily: "monospace",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ color: "#0080FF", fontSize: 24, letterSpacing: 8 }}>
            CARLOS ALVAREZ PONCE
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 84,
              fontWeight: 900,
              letterSpacing: 2,
            }}
          >
            CARLXS<span style={{ color: "#00BFFF" }}>DEV</span>
            <span style={{ color: "#00FFFF" }}>_</span>
          </div>
          <div style={{ color: "rgba(255,255,255,.68)", fontSize: 28, letterSpacing: 4 }}>
            FULL STACK DEVELOPER · AI / AUTOMATION · LIMA, PE
          </div>
          <div style={{ display: "flex", gap: 18, marginTop: 18 }}>
            {["Next.js", "TypeScript", "FastAPI", "PostgreSQL"].map((item) => (
              <div
                key={item}
                style={{
                  border: "2px solid rgba(0,255,255,.55)",
                  color: "#9FEFFF",
                  padding: "12px 16px",
                  fontSize: 20,
                }}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
        <div
          style={{
            width: 260,
            height: 260,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "4px solid #00BFFF",
            borderRadius: "50%",
            boxShadow: "0 0 46px rgba(0,191,255,.5)",
            background: "#0A0A16",
          }}
        >
          <div
            style={{
              width: 140,
              height: 170,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div style={{ width: 96, height: 96, background: "#7CF6FF" }} />
            <div style={{ width: 150, height: 34, marginTop: 10, background: "#0047FF" }} />
            <div style={{ width: 106, height: 48, background: "#00BFFF" }} />
          </div>
        </div>
      </div>
    ),
    size
  );
}
