import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#060610",
        }}
      >
        <div style={{ width: 42, height: 42, background: "#00FFFF", boxShadow: "0 0 10px #00FFFF" }} />
        <div
          style={{
            position: "absolute",
            width: 18,
            height: 18,
            background: "#0047FF",
            transform: "translate(10px, 10px)",
          }}
        />
      </div>
    ),
    size
  );
}
