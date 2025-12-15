import { Text } from "@/components/base/typography";
import { useSidebar } from "@/components/ui/layout/resizable-sidebar";
import {
  type CollapsibleType,
  useAppSettings,
  useSettingsActions,
} from "@/store/setting-store";
import { RadioGroup } from "../../components/radio-group";
import {
  IconLayoutCompact,
  IconLayoutHorizontal,
  IconLayoutVertical,
} from "./icons";
export default function LayoutSettings() {
  const { collapsibleType } = useAppSettings();
  const { updateAppSettings } = useSettingsActions();
  const { open, setOpen } = useSidebar();
  const radioState = open ? "default" : collapsibleType;
  return (
    <div className="flex flex-col gap-3">
      <Text variant="subTitle1">布局</Text>
      <div className="sr-only" id="layout-description">
        Choose between vertical or horizontal layout mode
      </div>
      <RadioGroup
        ariaDescription="layout-description"
        ariaLabel="Select layout style"
        items={[
          {
            value: "default",
            label: "vertical",
            content: <IconLayoutVertical />,
          },
          {
            value: "icon",
            label: "Compact",
            content: <IconLayoutCompact />,
          },
          {
            value: "offcanvas",
            label: "horizontal",
            content: <IconLayoutHorizontal />,
          },
        ]}
        onValueChange={(v) => {
          if (v === "default") {
            updateAppSettings({ collapsibleType: "icon" as CollapsibleType });
            setOpen(true);
            return;
          }
          setOpen(false);
          updateAppSettings({ collapsibleType: v as CollapsibleType });
        }}
        value={radioState}
      />
    </div>
  );
}
