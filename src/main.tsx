import React from "react";
import { createRoot } from "react-dom/client";
import { Puck, Render, type Config, type Data } from "@measured/puck";
import "@measured/puck/puck.css";
import "./style.css";

const config: Config = {
  components: {
    Heading: { fields: { title: { type: "text" }, level: { type: "select", options: [{ label: "H1", value: "h1" }, { label: "H2", value: "h2" }] } }, defaultProps: { title: "Welcome to Frontear", level: "h1" }, render: ({ title, level }) => level === "h2" ? <h2>{title}</h2> : <h1>{title}</h1> },
    Paragraph: { fields: { text: { type: "textarea" } }, defaultProps: { text: "Edit this text in the sidebar." }, render: ({ text }) => <p>{text}</p> },
    Action: { fields: { label: { type: "text" }, href: { type: "text" } }, defaultProps: { label: "Learn more", href: "/" }, render: ({ label, href }) => <a className="action" href={safeHref(href)}>{label}</a> },
    Panel: { fields: { title: { type: "text" }, description: { type: "textarea" } }, defaultProps: { title: "Reusable panel", description: "A component for any project." }, render: ({ title, description }) => <section className="panel"><h2>{title}</h2><p>{description}</p></section> },
  },
};
export function safeHref(value: unknown): string { if (typeof value !== "string") return "#"; const s = value.trim(); if (s.startsWith("/") && !s.startsWith("//")) return s; try { const url = new URL(s); return ["https:", "http:", "mailto:"].includes(url.protocol) ? s : "#"; } catch { return "#"; } }
const initial: Data = { content: [{ type: "Heading", props: { id: "welcome", title: "Frontear UI Builder", level: "h1" } }, { type: "Paragraph", props: { id: "intro", text: "Drag components onto the page, edit their properties and publish." } }], root: { props: {} } };
const storageKey = "frontear:document:v1";
function load(): Data { try { const value = localStorage.getItem(storageKey); if (!value) return initial; const parsed: unknown = JSON.parse(value); if (typeof parsed === "object" && parsed !== null && "content" in parsed && Array.isArray(parsed.content) && "root" in parsed) return parsed as Data; } catch { /* invalid saved data */ } return initial; }
function App() { const [data, setData] = React.useState<Data>(load); const [preview, setPreview] = React.useState(false); const download = () => { const url = URL.createObjectURL(new Blob([JSON.stringify(data, null, 2)], { type: "application/json" })); const a = document.createElement("a"); a.href = url; a.download = "frontear-page.json"; a.click(); URL.revokeObjectURL(url); }; return <><header className="topbar"><strong>Frontear</strong><div><button onClick={() => setPreview(!preview)}>{preview ? "Editor" : "Preview"}</button><button onClick={download}>Export JSON</button></div></header>{preview ? <main className="preview"><Render config={config} data={data}/></main> : <Puck config={config} data={data} onPublish={(next) => { setData(next); localStorage.setItem(storageKey, JSON.stringify(next)); }} />}</>; }

createRoot(document.getElementById("root")!).render(<React.StrictMode><App/></React.StrictMode>);
