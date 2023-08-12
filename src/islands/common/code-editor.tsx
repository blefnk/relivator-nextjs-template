"use client";

import { Editor, type EditorProps } from "@monaco-editor/react";
import { Loader } from "lucide-react";
import { useTheme } from "next-themes";

import { TextareaStyles } from "../ui/textarea";

export const EDITOR_OPTIONS: EditorProps["options"] = {
  cursorBlinking: "smooth",
  tabSize: 2,
  minimap: { enabled: false },
};

export function CodeEditor({
  options = EDITOR_OPTIONS,
  className,
  ...props
}: EditorProps) {
  const { theme } = useTheme();

  return (
    <Editor
      className={TextareaStyles({ className })}
      loading={<Loader className="h-6 w-6 animate-spin" />}
      options={options}
      theme={theme === "light" ? "vs-light" : "vs-dark"}
      {...props}
    />
  );
}
