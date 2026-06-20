import React from "react";
import { ArrowRight, PackageCheck } from "lucide-react";
import { Link } from "react-router-dom";

import hero2 from "@/assets/images/hero2.jpg";
import hero3 from "@/assets/images/hero3.jpg";
import deal1 from "@/assets/images/deal1.jpg";
import deal2 from "@/assets/images/deal2.jpg";
import { aboutPromiseSteps, aboutValues } from "@/utils/constants/aboutContent";


const About = () => {
  return (
    <main className="font-sans text-gray-900">
      <section className="w-full px-4 py-10 md:px-8 lg:px-32 md:py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[1.05fr_0.95fr] md:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">
              About Manthetic
            </p>
            <h1 className="mt-3 text-4xl font-bold leading-tight md:text-6xl">
              Menswear for confidence without the noise.
            </h1>
            <p className="mt-5 max-w-xl text-sm leading-relaxed text-gray-600 md:text-base">
              Manthetic brings together everyday comfort, clean fits, and modern staples for men who want to look put together without making style feel complicated.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/products"
                className="inline-flex w-fit items-center gap-2 rounded-full bg-green-500 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-black"
              >
                Shop The Collection
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="mailto:support@manthetic.com"
                className="inline-flex w-fit items-center rounded-full border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-800 transition hover:border-black hover:text-black"
              >
                Contact Us
              </a>
            </div>
          </div>

          <div className="relative min-h-[360px] md:min-h-[470px]">
            <img
              src={hero3}
              alt="Manthetic styled outfit"
              className="absolute left-0 top-6 h-64 w-44 rounded-2xl object-cover shadow-lg ring-1 ring-gray-200 md:h-80 md:w-56"
            />
            <img
              src={hero2}
              alt="Manthetic casual wear"
              className="absolute right-0 top-0 h-72 w-48 rounded-2xl object-cover shadow-lg ring-1 ring-gray-200 md:h-96 md:w-64"
            />
            <div className="absolute bottom-0 left-8 right-8 rounded-2xl bg-gray-950 p-5 text-white shadow-xl md:left-16 md:right-14">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-green-400">
                Built For Daily Wear
              </p>
              <p className="mt-2 text-sm leading-relaxed text-white/75">
                From college days to weekend plans, Manthetic focuses on pieces that move with your routine.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full px-4 py-12 md:px-8 lg:px-32">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">
              What We Stand For
            </p>
            <h2 className="mt-2 text-3xl font-bold md:text-5xl">
              Style that keeps up.
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-gray-600 md:text-base">
            We keep the collection focused so every piece earns its place: useful, wearable, and easy to style.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {aboutValues.map(({ title, description, icon: Icon }) => (
            <div
              key={title}
              className="rounded-xl border border-gray-200 bg-gray-50 p-6 shadow-sm"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-green-500 text-white">
                {React.createElement(Icon, { className: "h-5 w-5" })}
              </span>
              <h3 className="mt-5 text-lg font-semibold text-gray-900">{title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-gray-600">{description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="w-full px-4 py-12 md:px-8 lg:px-32">
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-gray-950 text-white">
          <div className="grid grid-cols-1 gap-8 p-6 md:grid-cols-2 md:p-10">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
                Our Promise
              </p>
              <h2 className="mt-3 text-3xl font-bold leading-tight md:text-5xl">
                No fuss. Just better wardrobe decisions.
              </h2>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-white/70 md:text-base">
                Manthetic is made for men who want dependable fashion choices: clean product discovery, clear pricing, and styles that feel current without chasing every trend.
              </p>
              <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {aboutPromiseSteps.map((step) => (
                  <div key={step} className="flex items-center gap-3 text-sm text-white/80">
                    <PackageCheck className="h-4 w-4 shrink-0 text-green-400" />
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-center gap-3 md:gap-4">
              {[deal1, deal2].map((image, index) => (
                <img
                  key={image}
                  src={image}
                  alt={`Manthetic promise ${index + 1}`}
                  className={`h-64 w-36 rounded-xl object-cover shadow-lg ring-1 ring-white/10 md:h-80 md:w-48 ${
                    index === 1 ? "translate-y-6" : ""
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;

