const motionQuery = "(prefers-reduced-motion: reduce)";
let activeDispose: (() => void) | undefined;
export function startArrival(replay = false) {
  activeDispose?.();
  const html = document.documentElement;
  const root = document.getElementById("root");
  const shell = document.getElementById("arrival");
  const video = document.getElementById(
    "arrival-video",
  ) as HTMLVideoElement | null;
  const source = video?.querySelector("source");
  const skip = document.getElementById("arrival-skip");
  const media = matchMedia(motionQuery);
  clearTimeout(window.__saariBootDeadline);
  let finished = false;
  let dead = false;
  let deadline: ReturnType<typeof setTimeout>;
  const animations: Animation[] = [];
  const release = () => {
    if (dead) return;
    html.dataset.arrival = "complete";
    if (root) root.inert = false;
    if (shell?.contains(document.activeElement))
      document.getElementById("main")?.focus({ preventScroll: true });
    window.dispatchEvent(new Event("saari:arrived"));
  };
  const finish = (immediate = false) => {
    if (finished) return;
    finished = true;
    clearTimeout(deadline);
    video?.pause();
    if (video) video.hidden = true;
    if (immediate || media.matches || !shell) {
      release();
      return;
    }
    html.dataset.arrival = "leaving";
    animations.push(
      shell.animate([{ opacity: 1 }, { opacity: 0 }], {
        duration: 180,
        easing: "ease-out",
        fill: "forwards",
      }),
    );
    void Promise.allSettled(
      animations.map((animation) => animation.finished),
    ).then(release);
  };
  const onEnd = () => finish();
  const onFailure = () => finish(true);
  const onSkip = () => finish(true);
  const onPreference = () => {
    if (media.matches) finish(true);
  };
  const dispose = () => {
    dead = true;
    clearTimeout(deadline);
    video?.pause();
    video?.removeEventListener("ended", onEnd);
    video?.removeEventListener("error", onFailure);
    source?.removeEventListener("error", onFailure);
    skip?.removeEventListener("click", onSkip);
    media.removeEventListener("change", onPreference);
    animations.forEach((animation) => animation.cancel());
    if (root) root.inert = false;
  };
  activeDispose = dispose;
  if (
    !video ||
    !shell ||
    !root ||
    media.matches ||
    document.body.dataset.page !== "home"
  ) {
    finish(true);
    return dispose;
  }
  root.inert = true;
  html.dataset.arrival = "running";
  video.hidden = false;
  if (replay) video.currentTime = 0;
  video.muted = true;
  video.addEventListener("ended", onEnd);
  video.addEventListener("error", onFailure);
  source?.addEventListener("error", onFailure);
  skip?.addEventListener("click", onSkip);
  media.addEventListener("change", onPreference);
  deadline = setTimeout(onFailure, 4000);
  if (video.error) {
    onFailure();
    return dispose;
  }
  if (video.ended) finish();
  else void video.play().catch(onFailure);
  return dispose;
}

export function replayArrival() {
  if (matchMedia(motionQuery).matches) return;
  window.scrollTo({ top: 0, behavior: "instant" });
  startArrival(true);
}
