import React, { useState } from "react";
import { Loader2, Search, Sparkles, X } from "lucide-react";
import ProductCard from "./ProductCard";
import useAiStyleFinder from "@/hooks/useAiStyleFinder";

const suggestions = [
  "black shirt for wedding",
  "casual outfit under 2000",
  "comfortable everyday t-shirt",
];

export default function AiStyleFinder({ filters }) {
  const [query, setQuery] = useState("");
  const styleFinder = useAiStyleFinder();
  const results = styleFinder.data?.recommendations || [];
  const canClear = query || styleFinder.data || styleFinder.isError;

  const runFinder = (value) => {
    const trimmed = value.trim();
    if (trimmed.length < 3) return;

    styleFinder.mutate({
      query: trimmed,
      categoryId: filters.category || undefined,
      size: filters.size || undefined,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    runFinder(query);
  };

  const handleSuggestion = (value) => {
    setQuery(value);
    runFinder(value);
  };

  const handleClear = () => {
    setQuery("");
    styleFinder.reset();
  };

  return (
    <section className="mb-5 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
      <div className="px-4 py-4 sm:px-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-950 text-white">
              <Sparkles className="h-4 w-4" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <p className="text-sm font-semibold text-gray-950">AI Style Finder</p>
                <span className="rounded-full bg-green-50 px-2 py-0.5 text-[11px] font-medium text-green-700 ring-1 ring-green-100">
                  Catalog aware
                </span>
              </div>
              <p className="mt-1 max-w-2xl text-sm leading-5 text-gray-600">
                Describe the occasion, color, budget, or fit you want. We will match it with real Manthetic products.
              </p>
            </div>
          </div>

          {canClear && (
            <button
              type="button"
              onClick={handleClear}
              className="inline-flex h-9 w-full items-center justify-center gap-1.5 rounded-full border border-gray-200 bg-white px-3 text-xs font-semibold text-gray-600 transition hover:border-gray-300 hover:bg-gray-50 sm:w-auto"
            >
              <X className="h-3.5 w-3.5" />
              Clear
            </button>
          )}
        </div>

        <form onSubmit={handleSubmit} className="mt-4 grid gap-2 sm:grid-cols-[minmax(0,1fr)_auto]">
          <div className="relative min-w-0">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Try: black shirt for wedding"
              className="h-11 w-full rounded-full border border-gray-200 bg-white pl-9 pr-4 text-sm outline-none transition focus:border-gray-400 focus:ring-2 focus:ring-gray-100"
            />
          </div>
          <button
            type="submit"
            disabled={styleFinder.isPending || query.trim().length < 3}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-black px-5 text-sm font-semibold text-white transition hover:bg-gray-900 disabled:cursor-not-allowed disabled:bg-gray-300"
          >
            {styleFinder.isPending && <Loader2 className="h-4 w-4 animate-spin" />}
            Find styles
          </button>
        </form>

        <div className="mt-3 flex flex-wrap gap-2">
          {suggestions.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => handleSuggestion(item)}
              className="rounded-full bg-gray-50 px-3 py-1 text-xs font-medium text-gray-600 ring-1 ring-gray-200 transition hover:bg-white hover:text-gray-950 hover:ring-gray-300"
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {styleFinder.isError && (
        <div className="flex items-start gap-2 border-t border-gray-100 bg-red-50 px-4 py-3 text-sm text-red-700 sm:px-5">
          <X className="mt-0.5 h-4 w-4 shrink-0" />
          AI recommendations are not available right now. Normal browsing still works.
        </div>
      )}

      {styleFinder.data && !styleFinder.isError && (
        <div className="border-t border-gray-100 px-4 py-4 sm:px-5">
          <div className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm leading-6 text-gray-700">
            {styleFinder.data.intro}
          </div>
          {results.length > 0 ? (
            <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {results.map((item) => (
                <div key={item.variantId} className="min-w-0">
                  <div className="mb-2 rounded-lg border border-gray-200 bg-white p-2 text-xs leading-5 text-gray-600">
                    <p className="font-semibold text-gray-900">{item.reason}</p>
                    <p className="mt-1 text-gray-500">{item.styleNote}</p>
                  </div>
                  <ProductCard product={item.product} />
                </div>
              ))}
            </div>
          ) : (
            <p className="mt-3 text-sm text-gray-500">Try a broader request or clear filters.</p>
          )}
        </div>
      )}
    </section>
  );
}
