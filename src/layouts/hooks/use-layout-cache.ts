import { useUpdateEffect } from "ahooks";
import type { useKeepAliveRef } from "keepalive-for-react";
import { useCacheActions, useRemoveCacheKey } from "@/store/cache-store";

export function useLayoutCache(aliveRef: ReturnType<typeof useKeepAliveRef>) {
  const removeCacheKey = useRemoveCacheKey();
  const { setRemoveCacheKey } = useCacheActions();

  useUpdateEffect(() => {
    if (!(aliveRef.current && removeCacheKey)) {
      return;
    }

    aliveRef.current.destroy(removeCacheKey);

    // 有的时候用户打开同一页面输入在关闭 不去切换新的页面 会造成无法二次删除缓存
    setRemoveCacheKey(null);
  }, [removeCacheKey]);
}
