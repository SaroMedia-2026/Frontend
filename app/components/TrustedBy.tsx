const logos = ["urbansole", "Cloudix", "NEXORA", "fitline", "HORIZON", "ZEPTON"];

export function TrustedBy() {
  return (
    <section className="py-10 md:py-14">
      <div className="rounded-[2rem] border border-slate-200 bg-white px-5 py-6 md:px-8">
        <p className="text-center text-[11px] font-bold uppercase tracking-[0.22em] text-slate-500">
          Trusted by growing brands
        </p>

        <div className="mt-6 grid grid-cols-2 gap-y-4 text-center text-xl font-bold tracking-[-0.05em] text-slate-400 md:grid-cols-6">
          {logos.map((logo) => (
            <div key={logo} className="py-2 text-sm md:text-[1.05rem]">
              {logo}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
