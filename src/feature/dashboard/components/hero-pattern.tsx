import { WavyBackground } from "@/src/components/ui/wavy-background";

export function HeroPattern() {
  return (
    <div className="pointer-events-none absolute inset-0 hidden overflow-hidden lg:block">
      <WavyBackground
        colors={["#38bdf8", "#818cf8", "#c084fc", "#e879f9", "#22d3ee"]}
        backgroundFill="hsl(0 0% 100%"
        blur={3}
        speed="slow"
        waveOpacity={0.1}
        waveWidth={60}
        waveYOffset={250}
        containerClassName="h-full"
        className="hidden"
      />
    </div>
  );
}
