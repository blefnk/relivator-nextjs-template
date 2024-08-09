export type KeyboardModifiers = {
  alt: boolean;
  ctrl: boolean;
  meta: boolean;
  mod: boolean;
  shift: boolean;
};

export type Hotkey = {
  key?: string;
} & KeyboardModifiers;

export type CheckHotkeyMatch = (event: KeyboardEvent) => boolean;

type HotkeyItemOptions = {
  preventDefault: boolean;
};

export type HotkeyItem = [string, () => void, HotkeyItemOptions];
