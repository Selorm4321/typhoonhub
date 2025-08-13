
export const dynamic = "force-dynamic";
export const runtime = "nodejs";

import InvestmentProjectCard from "@/components/investment-project-card";
import { getInvestments } from "@/lib/investments"; // Import getInvestments

export default async function InvestPage() {
  // Use getInvestments to fetch project data
  const projects = await getInvestments();

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
            <p className="text-gray-300 mb-6">{active.logline}</p>

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

            <h4 className="text-lg font-semibold text-white mb-3">About</h4>
            <p className="text-gray-300 mb-6">{active.about}</p>

            <div className="flex gap-3">
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
          </div>
        </div>
      </div>
    </div>
  )
}
