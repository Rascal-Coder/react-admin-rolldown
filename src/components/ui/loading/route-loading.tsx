import { useEffect, useState } from "react";
import { useNavigation } from "react-router";
import { Progress } from "@/components/base/progress";

export function RouteLoadingProgress() {
  const navigation = useNavigation();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    let interval: NodeJS.Timeout;

    if (navigation.state === "loading") {
      // 开始加载时，启动进度条
      setProgress(0);
      let currentProgress = 0;

      interval = setInterval(() => {
        // 进度条缓慢增长，但不会到达 100%
        currentProgress += Math.max(1, (90 - currentProgress) * 0.1);
        setProgress(Math.min(currentProgress, 90));
      }, 50);
    } else if (navigation.state === "idle") {
      // 加载完成时，快速完成进度条
      setProgress(100);
      timer = setTimeout(() => setProgress(0), 200);
    }

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [navigation.state]);

  return progress > 0 ? (
    <div className="fixed top-0 right-0 left-0 z-tooltip w-screen">
      <Progress className="h-[3px] shadow-2xl" value={progress} />
    </div>
  ) : null;
}
