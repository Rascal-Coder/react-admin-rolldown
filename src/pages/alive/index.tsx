import { useState } from "react";
import { Input } from "@/components/base/input";

export default function Alive() {
  const [value, setValue] = useState("");
  return (
    <div>
      测试缓存
      {Array.from({ length: 100 }).map((_, index) => (
        <Input
          // biome-ignore lint/suspicious/noArrayIndexKey: false
          key={index}
          onChange={(e) => setValue(e.target.value)}
          value={value}
        />
      ))}
    </div>
  );
}
