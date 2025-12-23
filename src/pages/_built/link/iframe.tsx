import { useState } from "react";
import { LineLoading } from "@/components/ui/loading/line-loading";

type Props = {
  src: string;
};
export default function Iframe({ src = "" }: Props) {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setIsLoading(false);
  };

  return (
    <div className="relative flex h-full w-full grow flex-col items-center justify-center">
      {isLoading && <LineLoading />}

      <iframe
        className="h-full w-full grow"
        onError={handleError}
        onLoad={handleLoad}
        role="presentation"
        src={src}
        title="iframe-page"
      />
    </div>
  );
}
