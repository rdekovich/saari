import { execFileSync } from "node:child_process";
const ffmpeg = process.env.FFMPEG_BIN || "ffmpeg";
execFileSync(
  ffmpeg,
  [
    "-hide_banner",
    "-loglevel",
    "error",
    "-y",
    "-i",
    "public/motion/tin-reveal.mp4",
    "-vf",
    "trim=start=0.8:end=4.55,setpts=(PTS-STARTPTS)/1.6",
    "-an",
    "-r",
    "24",
    "-c:v",
    "libx264",
    "-preset",
    "slow",
    "-crf",
    "18",
    "-pix_fmt",
    "yuv420p",
    "-movflags",
    "+faststart",
    "public/motion/tin-intro.mp4",
  ],
  { stdio: "inherit" },
);
execFileSync(
  ffmpeg,
  [
    "-hide_banner",
    "-loglevel",
    "error",
    "-y",
    "-i",
    "public/motion/tin-intro.mp4",
    "-frames:v",
    "1",
    "-c:v",
    "libwebp",
    "-lossless",
    "1",
    "public/motion/tin-intro-poster.webp",
  ],
  { stdio: "inherit" },
);
console.log(
  "Built a short intro and its first-frame poster from the approved film.",
);
