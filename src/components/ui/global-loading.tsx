import { cn } from "@/utils";

const LOADING_SQUARE_CLASSES = [
  "left-0 top-0",
  "left-0 bottom-0 animate-delay-500",
  "right-0 top-0 animate-delay-1000",
  "right-0 bottom-0 animate-delay-1500",
] as const;

const GlobalLoading = () => (
  <div className="flex h-screen w-screen flex-col items-center justify-center bg-linear-to-br from-background via-background/80 to-primary/5">
    <output
      aria-busy="true"
      aria-live="polite"
      className="flex flex-col items-center"
    >
      <img
        alt="Bug Admin logo"
        className="size-24 object-contain drop-shadow-sm md:size-32"
        height={128}
        src="/logo.svg"
        width={128}
      />
      <div aria-hidden="true" className="my-9 h-14 w-14">
        <div className="relative h-full animate-spin">
          {LOADING_SQUARE_CLASSES.map((positionClass) => (
            <div
              className={cn(
                "absolute h-3 w-3 animate-pulse rounded-sm bg-primary shadow-sm md:h-4 md:w-4",
                positionClass
              )}
              key={positionClass}
            />
          ))}
        </div>
      </div>
      <h2 className="font-600 text-lg text-primary tracking-wide md:text-xl">
        Bug Admin
      </h2>
      <p className="mt-2 text-muted-foreground text-xs md:text-sm">
        首次加载中，请稍候…
      </p>
      <span className="sr-only">Loading Bug Admin dashboard</span>
    </output>
  </div>
);

export default GlobalLoading;
