import HeroBackground from "./HeroBackground";
import HeroCopy from "./HeroCopy";
import HeroVisual from "./HeroVisual";

export default function HeroSection() {
  return (
    <section className="relative isolate overflow-hidden bg-[#FFFDF5] px-4 pb-8 pt-[6.6rem] sm:px-6 lg:px-8">
      <HeroBackground />

      <div className="relative z-10 mx-auto max-w-[1440px] overflow-hidden rounded-[2rem] border border-emerald-100/80 bg-white/30 px-7 py-10 backdrop-blur-sm lg:px-10 xl:px-12">
        <div className="grid min-h-[560px] items-center gap-8 lg:grid-cols-[minmax(0,0.46fr)_minmax(0,0.54fr)] xl:gap-10">
          <div className="relative z-20 max-w-[600px]">
            <HeroCopy />
          </div>

          <div className="relative z-10 hidden min-w-0 overflow-visible lg:block">
            <HeroVisual />
          </div>
        </div>
      </div>
    </section>
  );
}