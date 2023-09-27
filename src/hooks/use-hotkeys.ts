// https://mantine.dev/hooks/use-hotkeys

import { useEffect } from "react";

type KeyboardModifiers = {
  alt: boolean;
  ctrl: boolean;
  meta: boolean;
  mod: boolean;
  shift: boolean;
};

type Hotkey = KeyboardModifiers & {
  key?: string;
};

type CheckHotkeyMatch = (event: KeyboardEvent) => boolean;

function parseHotkey(hotkey: string): Hotkey {
  const keys = hotkey
    .toLowerCase()
    .split("+")
    .map((part) => part.trim());

  const modifiers: KeyboardModifiers = {
    alt: keys.includes("alt"),
    ctrl: keys.includes("ctrl"),
    meta: keys.includes("meta"),
    mod: keys.includes("mod"),
    shift: keys.includes("shift"),
  };

  const reservedKeys = ["alt", "ctrl", "meta", "shift", "mod"];

  const freeKey = keys.find((key) => !reservedKeys.includes(key));

  return {
    ...modifiers,
    key: freeKey,
  };
}

function isExactHotkey(hotkey: Hotkey, event: KeyboardEvent) {
  const { alt, ctrl, meta, mod, shift, key } = hotkey;
  const { altKey, ctrlKey, metaKey, shiftKey, key: pressedKey } = event;

  if (alt !== altKey) {
    return false;
  }

  if (mod) {
    if (!ctrlKey && !metaKey) {
      return false;
    }
  } else {
    if (ctrl !== ctrlKey) {
      return false;
    }
    if (meta !== metaKey) {
      return false;
    }
  }
  if (shift !== shiftKey) {
    return false;
  }

  if (
    key &&
    (pressedKey.toLowerCase() === key.toLowerCase() ||
      event.code.replace("Key", "").toLowerCase() === key.toLowerCase())
  ) {
    return true;
  }

  return false;
}

function getHotkeyMatcher(hotkey: string): CheckHotkeyMatch {
  return (event) => isExactHotkey(parseHotkey(hotkey), event);
}

type HotkeyItemOptions = {
  preventDefault?: boolean;
};

export type HotkeyItem = [
  string,
  (event: KeyboardEvent) => void,
  HotkeyItemOptions?,
];

export function useHotkeys(hotkeys: HotkeyItem[]) {
  useEffect(() => {
    function keydownListener(event: KeyboardEvent) {
      hotkeys.forEach(
        ([hotkey, handler, options = { preventDefault: true }]) => {
          if (getHotkeyMatcher(hotkey)(event)) {
            if (options.preventDefault) {
              event.preventDefault();
            }

            handler(event);
          }
        },
      );
    }

    document.documentElement.addEventListener("keydown", keydownListener);

    return () => {
      document.documentElement.removeEventListener("keydown", keydownListener);
    };
  }, [hotkeys]);
}
