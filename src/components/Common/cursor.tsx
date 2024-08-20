import { useTranslations } from "next-intl";

export function Cursor({
  color,
  x,
  y,
}: {
  color: string;
  x: number;
  y: number;
}) {
  const t = useTranslations();

  return (
    <svg
      fill="none"
      height="36"
      style={{
        left: 0,
        pointerEvents: "none",
        position: "absolute",
        top: 0,
        transform: `translateX(${x}px) translateY(${y}px)`,
        zIndex: 1000,
      }}
      viewBox="0 0 24 36"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>{t("cursor.cursor")}</title>
      <path
        d={`M5.65376 12.3673H5.46026L5.31717 12.4976L0.500002 16.8829L0.500002
           1.19841L11.7841 12.3673H5.65376Z`}
        fill={color}
      />
    </svg>
  );
}
