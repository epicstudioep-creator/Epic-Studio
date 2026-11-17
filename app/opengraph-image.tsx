import { ImageResponse } from "next/og";

export const alt = "EPIC STUDIO — Your Vision. Our Creativity.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#080A08",
          color: "#fff",
        }}
      >
        <div style={{ display: "flex", fontSize: 150, fontWeight: 800, letterSpacing: -4 }}>
          <span style={{ color: "#8BEA45" }}>EPIC</span>
          <span style={{ marginLeft: 28 }}>STUDIO</span>
        </div>
        <div style={{ marginTop: 20, fontSize: 40, color: "#A3A3A3" }}>Your Vision. Our Creativity.</div>
      </div>
    ),
    { ...size },
  );
}
