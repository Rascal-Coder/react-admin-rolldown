import { RefreshCw } from "lucide-react";
import type { CSSProperties } from "react";
import type { FallbackProps } from "react-error-boundary";
import { Button } from "@/components/base/button";
import { ScrollArea } from "@/components/base/scroll-area";
import { Text, Title } from "@/components/base/typography";
import { themeVars } from "@/theme/theme.css";

const filePathRegex = /\/src\/[^?]+/;
const functionNameRegex = /at (\S+)/;

function parseStackTrace(stack?: string) {
  if (!stack) {
    return { filePath: null, functionName: null };
  }

  const filePathMatch = stack.match(filePathRegex);
  const functionNameMatch = stack.match(functionNameRegex);

  return {
    filePath: filePathMatch ? filePathMatch[0] : null,
    functionName: functionNameMatch ? functionNameMatch[1] : null,
  };
}

export function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  const { filePath, functionName } = parseStackTrace(error.stack);

  return (
    <ScrollArea className="h-screen w-full">
      <div style={rootStyles()}>
        <div style={containerStyles()}>
          <Title as="h2" color="error">
            应用出现错误！
          </Title>
          <Text style={messageStyles()}>
            {error.name}: {error.message}
          </Text>
          <pre style={detailsStyles()}>{error.stack}</pre>
          {(filePath || functionName) && (
            <Text color="info" style={filePathStyles()}>
              {filePath} ({functionName})
            </Text>
          )}
          <Button
            onClick={resetErrorBoundary}
            size="lg"
            style={{ marginTop: 16 }}
            type="button"
            variant="default"
          >
            <RefreshCw />
            重新加载应用
          </Button>
        </div>
      </div>
    </ScrollArea>
  );
}

const rootStyles = (): CSSProperties => ({
  display: "flex",
  height: "100vh",
  flex: "1 1 auto",
  alignItems: "center",
  padding: "10vh 15px",
  flexDirection: "column",
  color: "white",
  backgroundColor: "#2c2c2e",
});

const containerStyles = (): CSSProperties => ({
  gap: 24,
  padding: 20,
  width: "100%",
  maxWidth: 960,
  display: "flex",
  borderRadius: 8,
  flexDirection: "column",
  backgroundColor: "#1c1c1e",
});

const messageStyles = (): CSSProperties => ({
  margin: 0,
  lineHeight: 1.5,
  padding: "12px 16px",
  whiteSpace: "pre-wrap",
  color: themeVars.colors.palette.error.default,
  backgroundColor: "#2a1e1e",
  borderLeft: `2px solid ${themeVars.colors.palette.error.default}`,
  fontWeight: 700,
});

const detailsStyles = (): CSSProperties => ({
  margin: 0,
  padding: 16,
  lineHeight: 1.5,
  overflow: "auto",
  borderRadius: "inherit",
  color: themeVars.colors.palette.warning.default,
  whiteSpace: "pre-wrap",
  backgroundColor: "#111111",
});

const filePathStyles = (): CSSProperties => ({
  marginTop: 16,
});
