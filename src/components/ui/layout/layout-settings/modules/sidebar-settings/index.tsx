import { Text } from "@/components/base/typography";
import {
  type SidebarVariant,
  useAppSettings,
  useSettingsActions,
} from "@/store/setting-store";
import { RadioGroup } from "../../components/radio-group";
import {
  IconSidebarFloating,
  IconSidebarInset,
  IconSidebarSidebar,
} from "./icons";

export default function SidebarSettings() {
  const settings = useAppSettings();
  const { updateAppSettings } = useSettingsActions();
  const { sidebarVariant } = settings;
  return (
    <div className="flex flex-col gap-3">
      <Text variant="subTitle1">侧边栏</Text>
      <RadioGroup
        ariaDescription="sidebar-description"
        ariaLabel="Select sidebar style"
        items={[
          {
            value: "inset",
            label: "Inset",
            content: <IconSidebarInset />,
          },
          {
            value: "floating",
            label: "Floating",
            content: <IconSidebarFloating />,
          },
          {
            value: "sidebar",
            label: "Sidebar",
            content: <IconSidebarSidebar />,
          },
        ]}
        onValueChange={(value) =>
          updateAppSettings({ sidebarVariant: value as SidebarVariant })
        }
        value={sidebarVariant}
      />
      <div className="sr-only" id="sidebar-description">
        Choose between inset, floating, or standard sidebar layout
      </div>
    </div>
  );
}
