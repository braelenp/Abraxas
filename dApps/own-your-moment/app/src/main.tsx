import { Buffer } from "buffer";
import process from "process";
import ReactDOM from "react-dom/client";
import "@solana/wallet-adapter-react-ui/styles.css";
import App from "./App";
import "./index.css";

window.Buffer = window.Buffer ?? Buffer;
window.process = window.process ?? process;

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);
