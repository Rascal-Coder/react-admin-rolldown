import { AnimatePresence, m } from "motion/react";
import { varFade } from "@/components/ui/animate/variants/fade";
import { varSlide } from "@/components/ui/animate/variants/slide";
import { cn } from "@/utils";
import { FormContainer } from "./components/form-container";
import { LogoHeader } from "./components/logo-header";
import { useSignInContext } from "./providers/sign-in-provider";

function CenterSignIn() {
  const { signInState } = useSignInContext();

  return (
    <m.div
      animate="animate"
      className="container grid h-svh max-w-none items-center justify-center"
      exit="exit"
      initial="initial"
      key="center-layout"
      variants={varFade()}
    >
      <m.div
        className="mx-auto flex w-full flex-col justify-center space-y-2 py-8 sm:w-[480px] sm:p-8"
        variants={varFade().inUp}
      >
        <LogoHeader />
        <FormContainer signInState={signInState} />
      </m.div>
    </m.div>
  );
}

const bgImageClasses = cn(
  "relative h-full overflow-hidden bg-muted max-lg:hidden",
  "[&>img]:absolute [&>img]:top-[15%] [&>img]:left-20 [&>img]:h-full [&>img]:w-full [&>img]:select-none [&>img]:object-cover [&>img]:object-top-left"
);

function SplitSignIn({ layout }: { layout: "left" | "right" }) {
  const { signInState } = useSignInContext();

  return (
    <m.div
      animate="animate"
      className="container relative grid h-svh flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0"
      exit="exit"
      initial="initial"
      key={`split-layout-${layout}`}
      variants={varFade()}
    >
      {layout === "right" && (
        <m.div className={bgImageClasses} variants={varSlide().inLeft}>
          <div className="h-full w-full bg-red-500" />
        </m.div>
      )}

      <m.div
        className="lg:p-8"
        variants={layout === "left" ? varSlide().inLeft : varSlide().inRight}
      >
        <m.div
          className="mx-auto flex w-full flex-col justify-center space-y-2 py-8 sm:w-[480px] sm:p-8"
          variants={varFade().inUp}
        >
          <LogoHeader />
        </m.div>

        <m.div
          className="mx-auto flex w-full max-w-md flex-col justify-center space-y-2"
          variants={varFade().inDown}
        >
          <FormContainer signInState={signInState} />
        </m.div>
      </m.div>

      {layout === "left" && (
        <m.div className={bgImageClasses} variants={varSlide().inRight}>
          <div className="h-full w-full bg-red-500" />
        </m.div>
      )}
    </m.div>
  );
}

interface UnifiedSignInProps {
  layout?: "center" | "right" | "left";
}

export function UnifiedSignIn({ layout = "center" }: UnifiedSignInProps) {
  return (
    <AnimatePresence mode="wait">
      {layout === "right" || layout === "left" ? (
        <SplitSignIn key={layout} layout={layout} />
      ) : (
        <CenterSignIn key="center" />
      )}
    </AnimatePresence>
  );
}
