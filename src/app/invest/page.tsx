
"use client"
import type React from "react"
import { useEffect, useMemo, useRef, useState } from "react"
import RoiCalculator, { type RoiConfig } from "@/components/roi-calculator"

// Brand tokens updated to match typhoonhub.ca
const tokens = {
  bg: "#0b0b0b", // darker background to match real site
  panel: "#1a1a1a", // simplified panel color
  text: "#ffffff", // pure white text like real site
  muted: "#9ca3af",
  brand: "#ef4444", // bright red accent color from real site
  accent: "#ef4444", // using red for accent too
  good: "#10b981",
  warn: "#f59e0b",
  danger: "#ef4444",
}

type ItemType = "film" | "series"
type Status = "open" | "closed"

type Investment = {
  id: string
  title: string
  type: ItemType
  status: Status
  goal: number
  raised: number
  min: number
  close: string // YYYY-MM-DD
  img: string
  logline: string
  about: string
  perks: string[]
  budgetCents?: number
  otherCostsCents?: number
  platformFeePct?: number
  distributorFeePct?: number
  targetMultiple?: number
  investorSharePreRecoup?: number
  investorSharePostRecoup?: number
}

const CAD = new Intl.NumberFormat("en-CA", {
  style: "currency",
  currency: "CAD",
  maximumFractionDigits: 0,
})

const seed: Investment[] = [
  {
    id: "mary-rose",
    title: "Cleaning House: Mary & Rose",
    type: "film",
    status: "open",
    goal: 15000,
    raised: 0,
    min: 50,
    close: "2025-09-15",
    img: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Offcail%20image%20%20Mary%20and%20Rose-L2DxI3sXUT5d2hxHxJi8VoFpoRiEBo.png",
    logline: "Mary and Rose” is a gritty, low-budget crime drama about two sisters posing as house cleaners who con wealthy homeowners across the suburbs — but when they start stealing to help struggling families, the line between justice and crime begins to blur.",
    about: "Format: Low-budget web series<br/>Genre: Crime Drama / Heist / Thriller<br/>Episode Length: ~20 minutes<br/>Status: In development",
    perks: [
      "Thank-you credit on site",
      "Private screener link on completion",
      "Set visit in Vancouver (if local)",
      "Name in end credits (top 100 backers)",
    ],
  },
]

const Badge: React.FC<{ state: Status }> = ({ state }) => (
  <span
    className={`absolute left-3 top-3 rounded-md px-2.5 py-1 text-xs font-bold ${
      state === "open" ? "bg-green-500 text-white" : "bg-gray-500 text-white"
    }`}
  >
    {state === "open" ? "Open" : "Closed"}
  </span>
)

function clampPct(p: number) {
  return Math.max(0, Math.min(100, Math.round(p)))
}

function useHash() {
  const [hash, setHash] = useState<string>(typeof window !== "undefined" ? window.location.hash : "")
  useEffect(() => {
    const onHash = () => setHash(window.location.hash)
    window.addEventListener("hashchange", onHash)
    return () => window.removeEventListener("hashchange", onHash)
  }, [])
  return [
    hash,
    (id: string) => {
      if (typeof window === "undefined") return
      const url = new URL(window.location.href)
      url.hash = id ? `#${id}` : ""
      window.history.replaceState(null, "", url)
      setHash(url.hash)
    },
  ] as const
}

export default function InvestPage() {
  const [filter, setFilter] = useState<"all" | Status | ItemType>("all")
  const [active, setActive] = useState<Investment | null>(null)
  const [hash, setHash] = useHash()

  const items = useMemo(() => {
    if (filter === "all") return seed
    if (filter === "open" || filter === "closed") return seed.filter((x) => x.status === filter)
    return seed.filter((x) => x.type === filter)
  }, [filter])

  // Open modal when hash is #id
  useEffect(() => {
    const id = (hash || "").replace("#", "")
    const found = seed.find((x) => x.id === id) || null
    setActive(found)
  }, [hash])

  return (
    <div className="min-h-screen bg-black text-white">
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <section className="py-16 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">INVEST IN INDEPENDENT CINEMA</h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Where independent filmmakers create, collaborate, and connect with audiences globally.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-12" role="group" aria-label="Filters">
            {(
              [
                { k: "all", label: "All Projects" },
                { k: "open", label: "Open" },
                { k: "closed", label: "Closed" },
                { k: "film", label: "Films" },
                { k: "series", label: "Series" },
              ] as const
            ).map((f) => (
              <button
                key={f.k}
                onClick={() => setFilter(f.k)}
                aria-pressed={filter === f.k}
                className={`px-6 py-2 rounded font-medium transition ${
                  filter === f.k ? "bg-red-600 text-white" : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </section>

        <section aria-labelledby="list-heading" className="pb-16">
          <h2 id="list-heading" className="sr-only">
            Investment opportunities
          </h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((p) => {
              const pct = clampPct((p.raised / p.goal) * 100)
              return (
                <article key={p.id} className="bg-gray-900 rounded-lg overflow-hidden border border-gray-800">
                  <div className="relative">
                    <img
                      src={p.img || "/placeholder.svg"}
                      alt={`${p.title} poster`}
                      className="w-full h-auto object-contain"
                      loading="lazy"
                    />
                    <Badge state={p.status} />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-2">{p.title}</h3>
                    <p className="text-gray-400 mb-4 line-clamp-3">{p.logline}</p>

                    <div className="mb-4">
                      <div className="flex justify-between text-sm text-gray-400 mb-2">
                        <span>{CAD.format(p.raised)} raised</span>
                        <span>{CAD.format(p.goal)} goal</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div className="bg-red-600 h-2 rounded-full" style={{ width: `${pct}%` }} />
                      </div>
                      <div className="text-sm text-gray-400 mt-2">
                        {pct}% funded • Min {CAD.format(p.min)} • {p.type === "film" ? "Film" : "Series"}
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <button
                        onClick={() => setHash(p.id)}
                        className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded font-medium"
                      >
                        View Details
                      </button>
                      <button
                        onClick={() => shareProject(p)}
                        className="px-4 py-2 border border-gray-600 text-gray-300 hover:text-white hover:border-gray-500 rounded font-medium"
                      >
                        Share
                      </button>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        </section>

        <section className="py-16 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-6">Share Your Vision</h2>
            <p className="text-gray-300 mb-8">
              Are you an independent filmmaker with a story to tell? We want to see it. Submit your film for a chance to
              be featured on Typhoonhub.
            </p>
            <a
              href="https://typhoonhub.ca/submit"
              className="inline-block bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded font-medium"
            >
              Submit Your Film
            </a>
          </div>
        </section>
      </main>

      {/* Modal */}
      <Modal active={active} onClose={() => setHash("")} />
    </div>
  )
}

function shareProject(p: Investment) {
  const url = `${window.location.origin}${window.location.pathname}#${p.id}`
  if (navigator.share) {
    navigator.share({ title: p.title, text: p.logline, url }).catch(() => {})
  } else {
    navigator.clipboard.writeText(url).then(() => alert("Link copied to clipboard!"))
  }
}

const Modal: React.FC<{
  active: Investment | null
  onClose: () => void
}> = ({ active, onClose }) => {
  const ref = useRef<HTMLDivElement>(null)
  const [investmentAmount, setInvestmentAmount] = useState(1000);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [onClose])

  useEffect(() => {
    if (!active) return
    ref.current?.focus()
    setInvestmentAmount(active.min || 1000);
  }, [active])

  if (!active) return null
  const pct = clampPct((active.raised / active.goal) * 100)

  const mail = encodeURIComponent(`Invest in ${active.title}`)
  const body = encodeURIComponent(
    `Hi Typhoon team,\n\nI'm interested in investing in "${active.title}". Please send me the details.\n\nName:\nAmount: ${investmentAmount}\nLocation:\n\nThanks!`,
  )

  const roiConfig: RoiConfig = {
    platformFeePct: active.platformFeePct,
    distributorFeePct: active.distributorFeePct,
    otherCostsCents: active.otherCostsCents,
    targetMultiple: active.targetMultiple,
    investorSharePreRecoup: active.investorSharePreRecoup,
    investorSharePostRecoup: active.investorSharePostRecoup,
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modalTitle"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div ref={ref} tabIndex={-1} className="bg-gray-900 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 text-gray-400 hover:text-white text-2xl z-10"
        >
          ×
        </button>

        <div className="grid md:grid-cols-2">
          <div className="relative aspect-video md:aspect-auto">
            <img src={active.img || "/placeholder.svg"} alt="Project image" className="w-full h-full object-cover" />
          </div>

          <div className="p-8">
            <span
              className={`inline-block rounded px-3 py-1 text-sm font-bold mb-4 ${
                active.status === "open" ? "bg-green-500 text-white" : "bg-gray-500 text-white"
              }`}
            >
              {active.status === "open" ? "Open" : "Closed"}
            </span>

            <h3 id="modalTitle" className="text-2xl font-bold text-white mb-2">
              {active.title}
            </h3>
            <p className="text-gray-300 mb-6" dangerouslySetInnerHTML={{ __html: active.about }}></p>

            <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
              <div className="bg-gray-800 p-3 rounded">
                <div className="text-gray-400">Goal</div>
                <div className="text-white font-semibold">{CAD.format(active.goal)}</div>
              </div>
              <div className="bg-gray-800 p-3 rounded">
                <div className="text-gray-400">Raised</div>
                <div className="text-white font-semibold">{CAD.format(active.raised)}</div>
              </div>
              <div className="bg-gray-800 p-3 rounded">
                <div className="text-gray-400">Minimum</div>
                <div className="text-white font-semibold">{CAD.format(active.min)}</div>
              </div>
              <div className="bg-gray-800 p-3 rounded">
                <div className="text-gray-400">Closes</div>
                <div className="text-white font-semibold">{new Date(active.close).toLocaleDateString()}</div>
              </div>
            </div>

            <div className="mb-6">
              <div className="w-full bg-gray-700 rounded-full h-3 mb-2">
                <div className="bg-red-600 h-3 rounded-full" style={{ width: `${pct}%` }} />
              </div>
              <p className="text-sm text-gray-400">{pct}% funded</p>
            </div>

            <h4 className="text-lg font-semibold text-white mb-3">Perks</h4>
            <div className="mb-6 space-y-2">
              {active.perks.map((perk, i) => (
                <div key={i} className="flex items-start gap-2 text-gray-300">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>{perk}</span>
                </div>
              ))}
            </div>
            
            <div className="flex flex-col gap-3">
              <div>
                <label className="text-sm font-medium text-white">Your Investment (CAD)</label>
                <input
                  type="number"
                  value={investmentAmount}
                  onChange={(e) => setInvestmentAmount(Number(e.target.value))}
                  className="w-full bg-gray-800 border-gray-700 rounded p-2 text-white mt-1"
                  min={active.min}
                  placeholder={String(active.min)}
                />
              </div>
              <a
                href={`mailto:selormtyphoon@gmail.com?subject=${mail}&body=${body}`}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded font-medium text-center"
              >
                Invest Now
              </a>
              <button
                onClick={() => shareProject(active)}
                className="px-6 py-3 border border-gray-600 text-gray-300 hover:text-white hover:border-gray-500 rounded font-medium"
              >
                Share
              </button>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold text-white mt-6 mb-2">ROI Projection</h4>
              <RoiCalculator investmentCents={investmentAmount * 100} config={roiConfig} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
