import { renderToString } from "react-dom/server";
import App from "./app/App";
import type { PageName } from "./config/pages";
export function render(page: PageName = "home") {
  return renderToString(<App page={page} />);
}
