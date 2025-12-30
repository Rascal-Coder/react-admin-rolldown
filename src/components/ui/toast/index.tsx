import { Toaster } from "sonner";
import styled from "styled-components";
import Icon from "@/components/ui/icon/icon";
import { useAppSettings } from "@/store/setting-store";
import { themeVars } from "@/theme/theme.css";
import { rgbAlpha } from "@/utils/theme";

/**
 * https://sonner.emilkowal.ski/getting-started
 */
export default function Toast() {
  const { themeMode } = useAppSettings();

  return (
    <ToasterStyleWrapper>
      <Toaster
        // expand
        icons={{
          success: (
            <div className="rounded-lg bg-success/10 p-2">
              <Icon
                color={themeVars.colors.palette.success.default}
                icon="carbon:checkmark-filled"
                size={24}
              />
            </div>
          ),
          error: (
            <div className="rounded-lg bg-error/10 p-2">
              <Icon
                color={themeVars.colors.palette.error.default}
                icon="carbon:warning-hex-filled"
                size={24}
              />
            </div>
          ),
          warning: (
            <div className="rounded-lg bg-warning/10 p-2">
              <Icon
                color={themeVars.colors.palette.warning.default}
                icon="carbon:warning-alt-filled"
                size={24}
              />
            </div>
          ),
          info: (
            <div className="rounded-lg bg-info/10 p-2">
              <Icon
                color={themeVars.colors.palette.info.default}
                icon="carbon:information-filled"
                size={24}
              />
            </div>
          ),
          loading: (
            <div className="rounded-lg bg-gray-400/10 p-2 text-gray-400">
              <Icon
                icon="svg-spinners:6-dots-scale-middle"
                size={24}
                speed={3}
              />
            </div>
          ),
        }}
        position="top-right"
        theme={themeMode}
        toastOptions={{
          duration: 3000,
          style: {
            backgroundColor: themeVars.colors.background.paper,
          },
          classNames: {
            toast: "rounded-lg border-0",
            description: "text-xs text-current/45",
            content: "flex-1 ml-6",
            icon: "flex items-center justify-center rounded-lg",
            success: "bg-success/10",
            error: "bg-error/10",
            warning: "bg-warning/10",
            info: "bg-info/10",
          },
        }}
      />
    </ToasterStyleWrapper>
  );
}

const TOAST_TYPES = ["info", "error", "success", "warning"] as const;

const ToasterStyleWrapper = styled.div`
  [data-sonner-toast] {
    font-weight: 600;
    font-size: 14px;

    [data-cancel] {
      color: ${themeVars.colors.text.primary};
      background-color: transparent;
      &:hover {
        background-color: ${rgbAlpha(themeVars.colors.text.primaryChannel, 0.08)};
      }
    }

    [data-action] {
      color: ${themeVars.colors.palette.primary.default};
      background-color: transparent;
      &:hover {
        background-color: ${rgbAlpha(themeVars.colors.palette.primary.defaultChannel, 0.08)};
      }
    }

    ${TOAST_TYPES.map(
      (type) => `
      &[data-type="${type}"] [data-action] {
        color: ${themeVars.colors.palette[type].default};
        &:hover {
          background-color: ${rgbAlpha(themeVars.colors.palette[type].defaultChannel, 0.08)};
        }
      }
    `
    ).join("")}

    &[data-type="loading"] [data-icon] .sonner-loader[data-visible="true"] {
      margin-left: 12px;
    }

    [data-close-button] {
      top: 0;
      right: 0;
      left: auto;
      border-width: 1px;
      border-style: dashed;
      background-color: ${themeVars.colors.background.paper};
      border: 1px solid ${rgbAlpha(themeVars.colors.palette.gray[200], 0.2)};
    }
  }
`;
