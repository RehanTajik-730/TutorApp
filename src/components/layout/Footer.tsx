import React from "react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-ink-200 bg-white mt-24 py-12 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-5 h-5 bg-ink-900 rounded-sm flex items-center justify-center text-white font-mono font-bold text-[10px]">
                TB
              </div>
              <span className="font-bold text-sm tracking-tight text-ink-900">TutorBridge PK</span>
            </div>
            <p className="text-ink-500 leading-relaxed max-w-xs">
              Direct matchmaking and post-hire academic verification for private education across Pakistan.
            </p>
          </div>

          <div>
            <div className="font-mono uppercase font-bold text-[11px] text-ink-900 mb-3 tracking-wider">
              Examination Boards
            </div>
            <ul className="space-y-1.5 text-ink-500">
              <li><Link href="/" className="hover:text-accent-blue transition-colors">CAIE O & A Levels</Link></li>
              <li><Link href="/" className="hover:text-accent-blue transition-colors">FBISE Federal Board</Link></li>
              <li><Link href="/" className="hover:text-accent-blue transition-colors">BISE Punjab (Lahore, Rwp)</Link></li>
              <li><Link href="/" className="hover:text-accent-blue transition-colors">MDCAT & ECAT Entry Tests</Link></li>
              <li><Link href="/" className="hover:text-accent-blue transition-colors">Digital SAT & ACT</Link></li>
            </ul>
          </div>

          <div>
            <div className="font-mono uppercase font-bold text-[11px] text-ink-900 mb-3 tracking-wider">
              Platform Modules
            </div>
            <ul className="space-y-1.5 text-ink-500">
              <li><Link href="/syllabus" className="hover:text-accent-blue transition-colors">Syllabus Coverage Tracking</Link></li>
              <li><Link href="/ai-quiz" className="hover:text-accent-blue transition-colors">Assessment Generation</Link></li>
              <li><Link href="/analytics" className="hover:text-accent-blue transition-colors">Performance Trendlines</Link></li>
              <li><Link href="/past-papers" className="hover:text-accent-blue transition-colors">Categorized Past Papers Archive</Link></li>
            </ul>
          </div>

          <div>
            <div className="font-mono uppercase font-bold text-[11px] text-ink-900 mb-3 tracking-wider">
              Coverage
            </div>
            <p className="text-ink-500 leading-relaxed">
              Karachi • Lahore • Islamabad • Rawalpindi
            </p>
            <div className="mt-4 pt-4 border-t border-ink-100 flex items-center gap-2 text-ink-400 font-mono text-[11px]">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-blue" /> Verified Matching
              <span className="w-1.5 h-1.5 rounded-full bg-accent-red ml-2" /> Direct Oversight
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-ink-100 flex flex-col sm:flex-row items-center justify-between text-ink-400 font-mono text-[11px]">
          <div>© {new Date().getFullYear()} TutorBridge PK. All rights reserved.</div>
          <div className="mt-2 sm:mt-0">System status: Normal</div>
        </div>
      </div>
    </footer>
  );
}
