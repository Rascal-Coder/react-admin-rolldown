import type { ReactNode } from "react";
import { Helmet } from "react-helmet-async";
import { NavLink } from "react-router";
import { Button } from "@/components/base/button";
import { Text, Title } from "@/components/base/typography";
import { GLOBAL_CONFIG } from "@/global-config";

interface ErrorLayoutProps {
  title: string;
  desc?: ReactNode;
  svg?: ReactNode;
  homePath?: string;
  buttonText?: string;
  slots?: {
    footer?: ReactNode;
  };
  helmetTitle: string;
}

export default function ErrorLayout({
  title,
  desc,
  svg,
  homePath = GLOBAL_CONFIG.defaultRoute,
  buttonText = "Go to Home",
  slots = {},
  helmetTitle,
}: ErrorLayoutProps) {
  return (
    <>
      {helmetTitle && (
        <Helmet>
          <title>{helmetTitle}</title>
        </Helmet>
      )}
      <div className="m-auto flex h-full max-w-[400px] items-center justify-center">
        <div className="flex w-full flex-col items-center justify-center gap-2 px-2">
          <div>
            <div>
              <Title as="h2" className="text-center">
                {title}
              </Title>
            </div>
            {desc && (
              <div>
                <Text align="center" color="secondary" variant="subTitle1">
                  {desc}
                </Text>
              </div>
            )}
            {svg && <div>{svg}</div>}

            {/* Slots: footer */}
            {slots.footer ? (
              slots.footer
            ) : (
              <NavLink
                className="mt-4 flex w-full justify-center"
                to={homePath}
              >
                <Button size="lg" variant="default">
                  {buttonText}
                </Button>
              </NavLink>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
