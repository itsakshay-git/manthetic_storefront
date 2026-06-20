import { Link, useLocation } from "react-router-dom";
import { policies } from "@/utils/constants/policyContent";
import { ArrowRight, Clock3, Mail } from "lucide-react";

const PolicyPage = () => {
  const { pathname } = useLocation();
  const policy = policies[pathname] || policies["/shipping"];
  const Icon = policy.icon;

  return (
    <main className="bg-white px-6 py-8 md:px-8 lg:px-32 lg:py-12">
      <div className="mx-auto">
        <section className="grid grid-cols-1 gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">
              {policy.eyebrow}
            </p>
            <h1 className="mt-3 text-4xl font-bold leading-tight text-gray-950 md:text-6xl">
              {policy.title}
            </h1>
            <p className="mt-5 max-w-xl text-sm leading-relaxed text-gray-600 md:text-base">
              {policy.intro}
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                to="/products"
                className="inline-flex min-h-11 items-center gap-2 rounded-full bg-gray-950 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-green-600"
              >
                Continue Shopping
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="mailto:support@manthetic.com"
                className="inline-flex min-h-11 items-center gap-2 rounded-full border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-800 transition hover:border-gray-950"
              >
                <Mail className="h-4 w-4" />
                Contact Support
              </a>
            </div>
          </div>

          <div className="rounded-2xl border border-green-600 bg-green-500 p-5 text-white shadow-sm md:p-7">
            <div className="flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-gray-950">
                <Icon className="h-6 w-6" />
              </span>
              <div>
                <p className="text-sm font-medium text-white/85">Manthetic Care</p>
                <h2 className="text-2xl font-bold">Policy Snapshot</h2>
              </div>
            </div>
            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
              {policy.summary.map((item) => (
                <div key={item.label} className="rounded-xl bg-white p-4 ring-1 ring-green-200">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-gray-950">
                    {item.label}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-gray-700">{item.value}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 flex items-center gap-2 rounded-xl bg-gray-950 px-4 py-3 text-sm text-white">
              <Clock3 className="h-4 w-4 shrink-0 text-green-400" />
              Support replies are usually handled during working business hours.
            </div>
          </div>
        </section>

        <section className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
          {policy.sections.map((section) => (
            <article key={section.heading} className="rounded-2xl border border-gray-200 bg-gray-50 p-5 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-950">{section.heading}</h3>
              <p className="mt-3 text-sm leading-relaxed text-gray-600">{section.body}</p>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
};

export default PolicyPage;

