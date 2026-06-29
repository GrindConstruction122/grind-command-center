"use client";

import { useState, useEffect } from "react";

type ProductId = "recon" | "vector" | "deploy" | "citadel" | "command";

interface DocFile {
  id: number;
  name: string;
  size: string;
}

interface Product {
  id: ProductId;
  num: string;
  name: string;
  tag: string;
  question: string;
  bullets: string[];
  placeholder: string;
  iconBg: string;
  iconLabel: string;
}

const PRODUCTS: Product[] = [
  {
    id: "recon",
    num: "01",
    name: "RECON",
    tag: "Opportunity Intelligence",
    question: "Should we pursue this project?",
    bullets: [
      "Go / No-Go verdict",
      "Contract risk register",
      "Missing-document list",
      "Owner and competitor intel",
      "Estimator brief",
    ],
    placeholder: "Ask about go/no-go, contract risk, owner intel, or missing documents...",
    iconBg: "linear-gradient(135deg, #003B66, #0a4d8c)",
    iconLabel: "R",
  },
  {
    id: "vector",
    num: "02",
    name: "VECTOR",
    tag: "Project Intelligence",
    question: "What is this project?",
    bullets: [
      "Scope Register by CSI",
      "Quantity Database",
      "Trade Matrix",
      "Conflict + RFI log",
      "11 Spec Registers",
    ],
    placeholder: "Ask about scope, quantities, trade matrix, spec registers, or conflicts...",
    iconBg: "linear-gradient(135deg, #1e2a7a, #3D4EAC)",
    iconLabel: "V",
  },
  {
    id: "deploy",
    num: "03",
    name: "DEPLOY",
    tag: "Commercial Intelligence",
    question: "How do we commercially win it?",
    bullets: [
      "Carry Basis Log",
      "Priced line-item estimate",
      "Scope boundary + exclusions",
      "Constructability score",
      "Risk-adjusted bid range",
    ],
    placeholder: "Ask about line items, wage rates, exclusions, or scope gaps...",
    iconBg: "linear-gradient(135deg, #3D4EAC, #5060c8)",
    iconLabel: "D",
  },
  {
    id: "citadel",
    num: "04",
    name: "CITADEL",
    tag: "Governance Intelligence",
    question: "Is the bid defensible and ready?",
    bullets: [
      "M17 release verdict",
      "Priority Red Flag register",
      "Override audit trail",
      "RFI status report",
      "Accountability ledger",
    ],
    placeholder: "Ask about M17 status, Priority Red Flags, overrides, or RFI coverage...",
    iconBg: "linear-gradient(135deg, #1a3a5c, #003B66)",
    iconLabel: "C",
  },
  {
    id: "command",
    num: "05",
    name: "COMMAND",
    tag: "Execution Intelligence",
    question: "How do we execute and maximize profit?",
    bullets: [
      "Live role dashboards",
      "Change-order log",
      "Budget vs. actual",
      "Schedule + earned value",
      "Closeout by object ID",
    ],
    placeholder: "Ask about schedule, change orders, budget vs. actual, or closeout status...",
    iconBg: "linear-gradient(135deg, #36454F, #4a5f6d)",
    iconLabel: "O",
  },
];

const INIT_DOCS: DocFile[] = [
  { id: 1, name: "100pct-CD-Set.pdf", size: "48.2 MB" },
  { id: 2, name: "Project-Manual-Specs.pdf", size: "12.6 MB" },
  { id: 3, name: "Addendum-03.pdf", size: "2.1 MB" },
  { id: 4, name: "Geotech-Report.pdf", size: "8.4 MB" },
];

const PIPELINE = ["RECON", "VECTOR", "DEPLOY", "CITADEL", "BID RELEASE", "COMMAND"];

const C = {
  navy: "#061E45",
  royal: "#3D4EAC",
  sky: "#C3E3EB",
  dusty: "#7F9DB1",
  panel: "#081929",
  bg: "#04111F",
  border: "1px solid rgba(127,157,177,0.18)",
  green: "#2ECC71",
  white: "#ffffff",
};

export default function Home() {
  const [active, setActive] = useState<ProductId>("deploy");
  const [docs, setDocs] = useState<DocFile[]>(INIT_DOCS);
  const [chatVal, setChatVal] = useState("");
  const [clock, setClock] = useState("00:00:00");

  useEffect(() => {
    const tick = () => {
      const n = new Date();
      const p = (x: number) => String(x).padStart(2, "0");
      setClock(`${p(n.getHours())}:${p(n.getMinutes())}:${p(n.getSeconds())}`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const ap = PRODUCTS.find((p) => p.id === active)!;
  const ai = PRODUCTS.findIndex((p) => p.id === active);
  const totalMB = docs.reduce((a, d) => a + parseFloat(d.size), 0).toFixed(1);

  const removeDoc = (id: number) => setDocs((prev) => prev.filter((d) => d.id !== id));
  const handleSend = () => { if (chatVal.trim()) setChatVal(""); };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh", overflow: "hidden", background: C.bg, color: C.sky, fontFamily: "Arial, sans-serif", fontSize: "13px" }}>

      {/* TOPBAR */}
      <nav style={{ background: C.navy, borderBottom: C.border, padding: "0 20px", height: "52px", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
          <div style={{ background: C.royal, color: C.white, fontWeight: 700, fontSize: "11px", padding: "4px 8px", borderRadius: "2px", letterSpacing: "0.5px", lineHeight: 1.2 }}>
            GRIND
            <div style={{ fontSize: "7px", fontWeight: 400, opacity: 0.8, letterSpacing: "1px" }}>CONSTRUCTION SERVICES</div>
          </div>
          <div style={{ borderLeft: C.border, paddingLeft: "14px", fontSize: "10px", letterSpacing: "3px", color: C.dusty, fontWeight: 600 }}>AECS PLATFORM</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "20px", fontSize: "11px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "7px", color: C.sky, fontWeight: 600 }}>
            <div style={{ width: "7px", height: "7px", borderRadius: "50%", background: C.green, boxShadow: `0 0 6px ${C.green}` }} />
            GRIND CORE LINKED
          </div>
          <span style={{ fontFamily: "monospace", fontSize: "12px", color: C.dusty }}>{clock}</span>
          <span style={{ fontSize: "11px", color: C.dusty, opacity: 0.6 }}>ops.grindconstructionservices.com</span>
        </div>
      </nav>

      {/* SHEET BAR */}
      <div style={{ background: "rgba(6,30,69,0.6)", borderBottom: C.border, padding: "6px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
        <div style={{ display: "flex", gap: "8px" }}>
          {["SHEET OPS-01", "REV 05"].map((t) => (
            <span key={t} style={{ fontSize: "10px", fontFamily: "monospace", color: C.dusty, background: "rgba(127,157,177,0.08)", border: "1px solid rgba(127,157,177,0.18)", padding: "3px 8px", borderRadius: "2px" }}>{t}</span>
          ))}
          <span style={{ fontSize: "10px", fontFamily: "monospace", color: C.sky, background: "rgba(61,78,172,0.12)", border: "1px solid rgba(61,78,172,0.5)", padding: "3px 8px", borderRadius: "2px" }}>SET AECS v1.2 LOCKED</span>
        </div>
        <span style={{ fontSize: "10px", letterSpacing: "1px", color: C.dusty, opacity: 0.7 }}>GRIND CONSTRUCTION SERVICES LLC -- NEWBURGH, NY</span>
      </div>

      {/* BODY */}
      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>

        {/* SIDEBAR */}
        <aside style={{ width: "232px", background: C.panel, borderRight: C.border, display: "flex", flexDirection: "column", flexShrink: 0, overflowY: "auto" }}>

          {/* Docs */}
          <div style={{ padding: "16px 16px 12px", borderBottom: C.border }}>
            <div style={{ fontSize: "9px", letterSpacing: "2.5px", color: C.dusty, opacity: 0.7, fontWeight: 600, marginBottom: "10px", textTransform: "uppercase" }}>Mission Documents</div>
            <div style={{ border: "1.5px dashed rgba(127,157,177,0.3)", borderRadius: "4px", padding: "12px 10px", textAlign: "center", marginBottom: "10px" }}>
              <div style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "1px", color: C.sky, marginBottom: "3px" }}>DROP PLANS - SPECS - ADDENDA</div>
              <div style={{ fontSize: "9px", color: C.dusty, opacity: 0.7 }}>READ ONCE - INDEXED TO GRIND CORE</div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "10px", color: C.dusty, margin: "6px 0" }}>
              <span>LOADED - <strong style={{ color: C.sky }}>{docs.length} FILES</strong></span>
              <span style={{ opacity: 0.7 }}>{totalMB} MB</span>
            </div>
            {docs.map((doc) => (
              <div key={doc.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "rgba(61,78,172,0.08)", border: C.border, borderRadius: "3px", padding: "6px 8px", marginBottom: "4px" }}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <div style={{ background: C.royal, color: C.white, fontSize: "7px", fontWeight: 700, padding: "2px 4px", borderRadius: "2px", marginRight: "7px", flexShrink: 0 }}>PDF</div>
                  <div>
                    <div style={{ fontSize: "10px", color: C.sky }}>{doc.name}</div>
                    <div style={{ fontSize: "9px", color: C.dusty, opacity: 0.6 }}>{doc.size}</div>
                  </div>
                </div>
                <button onClick={() => removeDoc(doc.id)} style={{ background: "none", border: "none", color: C.dusty, cursor: "pointer", fontSize: "16px", opacity: 0.45, lineHeight: 1 }}>x</button>
              </div>
            ))}
          </div>

          {/* Product Nav */}
          <div style={{ padding: "12px 0 4px 16px" }}>
            <div style={{ fontSize: "9px", letterSpacing: "2.5px", color: C.dusty, opacity: 0.7, fontWeight: 600, textTransform: "uppercase" }}>Select Product</div>
          </div>
          <nav>
            {PRODUCTS.map((p) => (
              <div key={p.id} onClick={() => setActive(p.id)} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "9px 16px", cursor: "pointer", borderLeft: `2px solid ${active === p.id ? C.royal : "transparent"}`, background: active === p.id ? "rgba(61,78,172,0.14)" : "transparent" }}>
                <div style={{ width: "32px", height: "32px", borderRadius: "4px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "10px", fontWeight: 800, color: C.white, background: p.iconBg, flexShrink: 0 }}>{p.iconLabel}</div>
                <div>
                  <div style={{ fontSize: "12px", fontWeight: 700, color: active === p.id ? C.white : C.sky }}>{p.name}</div>
                  <div style={{ fontSize: "9px", color: C.dusty, opacity: 0.7, marginTop: "1px" }}>{p.tag.toLowerCase()}</div>
                </div>
              </div>
            ))}
          </nav>

          {/* Run Button */}
          <div style={{ padding: "10px 14px" }}>
            <button style={{ width: "100%", background: C.royal, color: C.white, border: "none", padding: "11px 0", fontSize: "12px", fontWeight: 700, letterSpacing: "2px", cursor: "pointer", borderRadius: "3px" }}>
              RUN {ap.name}
            </button>
          </div>

          {/* Pipeline dots */}
          <div style={{ padding: "10px 14px 14px", borderTop: C.border, marginTop: "auto" }}>
            <div style={{ fontSize: "9px", letterSpacing: "2px", color: C.dusty, opacity: 0.6, marginBottom: "8px" }}>PIPELINE</div>
            <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
              {PRODUCTS.map((_, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                  <div style={{ width: "28px", height: "4px", borderRadius: "2px", background: i < ai ? C.royal : i === ai ? C.sky : "rgba(127,157,177,0.2)" }} />
                  {i < PRODUCTS.length - 1 && <div style={{ width: "8px", height: "1px", background: "rgba(127,157,177,0.18)" }} />}
                </div>
              ))}
            </div>
          </div>

        </aside>

        {/* MAIN */}
        <main style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>

          {/* HERO */}
          <div style={{ padding: "32px 40px 28px", background: "linear-gradient(180deg, rgba(6,30,69,0.5) 0%, transparent 100%)", borderBottom: C.border }}>
            <div style={{ fontSize: "10px", letterSpacing: "3px", color: C.dusty, marginBottom: "12px", fontFamily: "monospace" }}>
              // AECS PLATFORM -- PURSUIT TO CLOSEOUT
            </div>
            <div style={{ fontSize: "38px", fontWeight: 800, lineHeight: 1.1, letterSpacing: "-0.5px", marginBottom: "6px", color: C.white }}>
              FIVE PRODUCTS. ONE PIPELINE.
              <br />
              <span style={{ color: C.sky }}>ONE VAULT THAT NEVER FORGETS.</span>
            </div>
            <div style={{ fontSize: "13px", color: C.dusty, maxWidth: "700px", lineHeight: 1.6, marginBottom: "16px" }}>
              Upload the plans, specs, and addenda once. RECON decides whether to pursue, VECTOR reads it into the source of truth, DEPLOY prices it, CITADEL certifies it for release, and COMMAND executes it while GRIND CORE remembers every project so the next estimate starts smarter. Information is created once and never regenerated downstream.
            </div>
            <div style={{ display: "flex", alignItems: "center", fontSize: "10px", color: C.dusty, gap: "0" }}>
              <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: C.green, boxShadow: `0 0 5px ${C.green}`, marginRight: "7px" }} />
              <span>5 PRODUCTS ONLINE</span>
              <span style={{ margin: "0 14px", opacity: 0.4 }}>/</span>
              <span>GRIND CORE LINKED</span>
              <span style={{ margin: "0 14px", opacity: 0.4 }}>/</span>
              <span>{docs.length} DOCS - {totalMB} MB INDEXED</span>
              <span style={{ margin: "0 14px", opacity: 0.4 }}>/</span>
              <span>SESSION #4471</span>
            </div>
          </div>

          {/* CARDS */}
          <div style={{ flex: 1, overflowY: "auto", padding: "24px 40px 20px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "14px", marginBottom: "8px" }}>
              {PRODUCTS.map((p, i) => (
                <div key={p.id} onClick={() => setActive(p.id)} style={{ background: C.panel, border: `1px solid ${active === p.id ? C.royal : "rgba(127,157,177,0.18)"}`, borderRadius: "6px", padding: "18px 14px 14px", cursor: "pointer", position: "relative" }}>
                  <div style={{ position: "absolute", top: "12px", right: "14px", fontSize: "11px", fontWeight: 700, color: C.dusty, opacity: 0.4, fontFamily: "monospace" }}>{p.num}</div>
                  <div style={{ width: "40px", height: "40px", borderRadius: "6px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: 800, color: C.white, background: p.iconBg, marginBottom: "12px" }}>{p.iconLabel}</div>
                  <div style={{ fontSize: "16px", fontWeight: 800, color: C.white, marginBottom: "2px" }}>{p.name}</div>
                  <div style={{ fontSize: "9px", letterSpacing: "2px", color: C.dusty, textTransform: "uppercase", marginBottom: "8px" }}>{p.tag}</div>
                  <div style={{ fontSize: "11px", color: C.sky, marginBottom: "12px", lineHeight: 1.4 }}>{p.question}</div>
                  <div style={{ height: "1px", background: "rgba(127,157,177,0.18)", marginBottom: "10px" }} />
                  <ul style={{ listStyle: "none" }}>
                    {p.bullets.map((b, bi) => (
                      <li key={bi} style={{ fontSize: "10px", color: C.dusty, padding: "2px 0", display: "flex", gap: "6px" }}>
                        <span style={{ color: C.royal, fontSize: "14px", lineHeight: 1, flexShrink: 0 }}>.</span>{b}
                      </li>
                    ))}
                  </ul>
                  {i < PRODUCTS.length - 1 && (
                    <div style={{ position: "absolute", right: "-1px", top: "50%", transform: "translateY(-50%)", width: "16px", height: "28px", background: "rgba(61,78,172,0.25)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "10px", color: C.royal }}>
                      {">"}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Pipeline flow */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", padding: "6px 0", fontSize: "9px", letterSpacing: "1.5px", color: C.dusty, opacity: 0.5 }}>
              {PIPELINE.map((label, i) => (
                <span key={i} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span>{label}</span>
                  {i < PIPELINE.length - 1 && <span style={{ color: C.royal, opacity: 1 }}>{">"}</span>}
                </span>
              ))}
            </div>

            {/* GRIND CORE */}
            <div style={{ background: "rgba(6,30,69,0.5)", border: C.border, borderRadius: "6px", padding: "13px 18px", display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "10px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <div style={{ width: "9px", height: "9px", borderRadius: "50%", background: C.green, boxShadow: `0 0 6px ${C.green}` }} />
                  <div style={{ fontSize: "15px", fontWeight: 800, color: C.sky, letterSpacing: "1px" }}>GRIND CORE</div>
                </div>
                <div style={{ fontSize: "11px", color: C.dusty, maxWidth: "640px", lineHeight: 1.4 }}>
                  Every product reads from it and writes to it. Nothing is regenerated downstream and every project the platform runs makes the next estimate smarter.
                </div>
              </div>
              <button style={{ background: "rgba(61,78,172,0.2)", border: "1px solid rgba(61,78,172,0.4)", color: C.sky, padding: "7px 14px", fontSize: "10px", fontWeight: 700, letterSpacing: "1.5px", cursor: "pointer", borderRadius: "3px", whiteSpace: "nowrap" }}>
                OPEN VAULT
              </button>
            </div>
          </div>

          {/* CHAT BAR */}
          <div style={{ background: C.panel, borderTop: C.border, padding: "10px 14px", display: "flex", alignItems: "center", gap: "10px", flexShrink: 0 }}>
            <div style={{ background: C.royal, color: C.white, fontSize: "10px", fontWeight: 700, padding: "5px 10px", borderRadius: "3px", whiteSpace: "nowrap" }}>
              {ap.name}
            </div>
            <input
              style={{ flex: 1, background: "rgba(6,30,69,0.6)", border: C.border, borderRadius: "4px", color: C.sky, padding: "9px 14px", fontSize: "12px", fontFamily: "Arial, sans-serif", outline: "none" }}
              type="text"
              value={chatVal}
              onChange={(e) => setChatVal(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder={ap.placeholder}
            />
            <button onClick={handleSend} style={{ background: C.royal, color: C.white, border: "none", padding: "9px 18px", fontSize: "11px", fontWeight: 700, letterSpacing: "1.5px", cursor: "pointer", borderRadius: "3px" }}>
              SEND
            </button>
          </div>

        </main>
      </div>
    </div>
  );
}