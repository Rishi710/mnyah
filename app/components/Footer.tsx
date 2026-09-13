const COLUMNS = {
  "Connect with us": ["Instagram", "WhatsApp", "Email", "YouTube"],
  "Order support": ["Returns & exchanges", "Refund policy", "Track your order", "Shipping policy", "FAQs", "Terms"],
  "We are Mnyah": ["Our story", "Stores", "Careers", "Privacy policy"],
};

export function Footer() {
  return (
    <footer className="overflow-hidden bg-white px-4 pt-10 sm:px-6">
      <div className="grid grid-cols-2 gap-x-6 gap-y-10 border-t border-line pt-10 md:grid-cols-4">
        {Object.entries(COLUMNS).map(([title, links]) => (
          <div key={title}>
            <h4 className="mb-3 text-[13px] font-semibold">{title}</h4>
            <ul className="space-y-1.5">
              {links.map((l) => (
                <li key={l}>
                  <a href="#" className="text-[12px] text-muted hover:text-ink">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div className="col-span-2 md:col-span-1">
          <h4 className="mb-3 text-[13px] font-semibold">Newsletter</h4>
          <form className="flex rounded-full bg-canvas p-1" action="#">
            <label htmlFor="footer-email" className="sr-only">Email address</label>
            <input
              id="footer-email"
              type="email"
              required
              placeholder="Email address"
              className="min-w-0 flex-1 bg-transparent px-3 text-[12px] outline-none placeholder:text-muted"
            />
            <button type="submit" className="rounded-full bg-ink px-4 py-1.5 text-[12px] font-medium text-white hover:opacity-80">
              Join
            </button>
          </form>
        </div>
      </div>

      <p
        aria-hidden
        className="mt-14 select-none text-center text-[clamp(64px,22vw,340px)] font-extrabold uppercase leading-[0.78] tracking-[-0.02em]"
      >
        Mnyah
      </p>
      <div className="flex flex-col items-center justify-between gap-2 py-5 text-[11px] text-muted sm:flex-row">
        <span>© {new Date().getFullYear()} Mnyah. All rights reserved.</span>
        <span>India · INR</span>
      </div>
    </footer>
  );
}
