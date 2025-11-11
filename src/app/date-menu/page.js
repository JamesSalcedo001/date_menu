"use client";

import { useEffect, useState } from "react";
import { dateMenuConfig } from "./dateConfig";

const STORAGE_KEY = "date-menu-checks-v1";

export default function DateMenuPage() {
  const [checks, setChecks] = useState({});

  // Load saved state
  useEffect(() => {
    try {
      if (typeof window === "undefined") return;
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setChecks(JSON.parse(saved));
      }
    } catch (err) {
      console.error("Failed to load date menu state", err);
    }
  }, []);

  // Save on change
  useEffect(() => {
    try {
      if (typeof window === "undefined") return;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(checks));
    } catch (err) {
      console.error("Failed to save date menu state", err);
    }
  }, [checks]);

  const toggle = (key) => {
    setChecks((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const clearAll = () => setChecks({});

  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-8 bg-[var(--dm-bg)]">
      <div className="w-full max-w-lg rounded-3xl border border-[var(--dm-primary-soft)] bg-white/80 shadow-lg backdrop-blur-sm px-5 py-6 sm:px-7 sm:py-8 space-y-5">
        {/* Header */}
        <header className="space-y-2 text-center">
          <p className="inline-flex items-center justify-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-[var(--dm-primary)]">
            ✨ Special Date Menu ✨
          </p>
          <h1 className="text-2xl sm:text-3xl font-semibold text-[var(--dm-ink)]">
            {dateMenuConfig.title}
          </h1>
          {dateMenuConfig.subtitle && (
            <p className="text-sm text-slate-600">
              {dateMenuConfig.subtitle}
            </p>
          )}
        </header>

        {/* Message */}
        {dateMenuConfig.message && (
          <p className="text-sm sm:text-base text-slate-700 text-center leading-relaxed">
            {dateMenuConfig.message}
          </p>
        )}

        {/* Sections */}
        <section className="space-y-4">
          {dateMenuConfig.sections.map((section) => (
            <div
              key={section.id}
              className="rounded-2xl border border-[var(--dm-primary-soft)] bg-[var(--dm-primary-soft)]/40 px-4 py-3 space-y-2"
            >
              <div className="flex items-baseline justify-between gap-3">
                <h2 className="text-sm font-semibold text-[var(--dm-ink)] flex items-center gap-2">
                  <span className="inline-block h-2 w-2 rounded-full bg-[var(--dm-primary)]" />
                  {section.label}
                </h2>
              </div>
              {section.description && (
                <p className="text-xs text-slate-600">
                  {section.description}
                </p>
              )}

              <div className="mt-1 space-y-1.5">
                {section.options.map((opt) => {
                  const key = `${section.id}:${opt.id}`;
                  const checked = !!checks[key];

                  return (
                    <label
                      key={opt.id}
                      className="flex items-center gap-2 rounded-xl bg-white/90 px-3 py-2 text-xs sm:text-sm text-slate-800 shadow-sm cursor-pointer border border-transparent hover:border-[var(--dm-primary-soft)] transition"
                    >
                      <input
                        type="checkbox"
                        className="h-4 w-4 rounded border-slate-300 text-[var(--dm-primary)] focus:ring-[var(--dm-primary)]"
                        checked={checked}
                        onChange={() => toggle(key)}
                      />
                      <span>{opt.label}</span>
                    </label>
                  );
                })}
              </div>
            </div>
          ))}
        </section>

        {/* Footer */}
        <footer className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 text-[10px] sm:text-xs text-slate-500">
          {/* <button
            onClick={clearAll}
            className="px-3 py-1.5 rounded-full border border-[var(--dm-primary-soft)] text-[var(--dm-primary)] text-xs hover:bg-[var(--dm-primary-soft)]/40 transition"
          >
            Clear choices
          </button> */}
          <p className="flex items-center gap-1">
            <span className="text-[var(--dm-accent)]">♥</span>
            Always subject to tum radar changes
          </p>
        </footer>
      </div>
    </main>
  );
}