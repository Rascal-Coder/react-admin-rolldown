import { useMount, useUpdateEffect } from "ahooks";
import { useCallback } from "react";
import { useWatermark } from "@/hooks/use-watermark";
import { useAppSettings } from "@/store/setting-store";

export function useLayoutWatermark() {
  const { watermarkEnabled, watermarkContent, watermarkColor } =
    useAppSettings();
  const { destroyWatermark, updateWatermark } = useWatermark();

  const handleWatermark = useCallback(() => {
    if (watermarkEnabled) {
      updateWatermark({
        content: watermarkContent,
        advancedStyle: {
          type: "linear",
          colorStops: [
            { color: watermarkColor, offset: 0 },
            { color: watermarkColor, offset: 1 },
          ],
        },
      });
    } else {
      destroyWatermark();
    }
  }, [
    watermarkEnabled,
    watermarkContent,
    watermarkColor,
    destroyWatermark,
    updateWatermark,
  ]);

  useMount(() => {
    handleWatermark();
  });

  useUpdateEffect(() => {
    handleWatermark();
  }, [watermarkEnabled, watermarkContent, watermarkColor]);
}
