import type {
  CheckHotkeyMatch,
  Hotkey,
  KeyboardModifiers,
} from "@/types/reliverse/keys";

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

  const reservedKeys = new Set(["alt", "ctrl", "meta", "shift", "mod"]);

  const key = keys.find((key) => !reservedKeys.has(key));

  return {
    ...modifiers,
    key,
  };
}

function isExactHotkey(hotkey: Hotkey, event: KeyboardEvent) {
  const { alt, ctrl, key, meta, mod, shift } = hotkey;

  const { altKey, ctrlKey, key: pressedKey, metaKey, shiftKey } = event;

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

  return !!(
    key &&
    (pressedKey.toLowerCase() === key.toLowerCase() ||
      event.code.replace("Key", "").toLowerCase() === key.toLowerCase())
  );
}

export function getHotkeyMatcher(hotkey: string): CheckHotkeyMatch {
  return (event: KeyboardEvent) => {
    return isExactHotkey(parseHotkey(hotkey), event);
  };
}
