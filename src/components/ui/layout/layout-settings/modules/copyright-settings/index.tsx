import { AnimatePresence, motion } from "motion/react";
import { Text } from "@/components/base/typography";
import { useAppSettings, useSettingsActions } from "@/store/setting-store";
import { InputItem } from "../../components/input-item";

export default function CopyrightSettings() {
  const {
    icp,
    icpLink,
    companyName,
    companySiteLink,
    copyrightDate,
    showFooter,
  } = useAppSettings();
  const { updateAppSettings } = useSettingsActions();

  return (
    <AnimatePresence mode="wait">
      {showFooter && (
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          initial={{ opacity: 0, y: -10 }}
          key="copyright-settings"
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <div className="flex items-center">
            <Text variant="subTitle1">版权</Text>
          </div>
          <InputItem
            onChange={(inputVal) =>
              updateAppSettings({
                companyName: inputVal,
              })
            }
            value={companyName}
          >
            公司名
          </InputItem>
          <InputItem
            onChange={(inputVal) =>
              updateAppSettings({
                companySiteLink: inputVal,
              })
            }
            value={companySiteLink}
          >
            公司主页
          </InputItem>
          <InputItem
            onChange={(inputVal) =>
              updateAppSettings({
                copyrightDate: inputVal,
              })
            }
            value={copyrightDate}
          >
            日期
          </InputItem>
          <InputItem
            onChange={(inputVal) =>
              updateAppSettings({
                icp: inputVal,
              })
            }
            value={icp}
          >
            ICP备案号
          </InputItem>
          <InputItem
            onChange={(inputVal) =>
              updateAppSettings({
                icpLink: inputVal,
              })
            }
            value={icpLink}
          >
            ICP网站链接
          </InputItem>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
