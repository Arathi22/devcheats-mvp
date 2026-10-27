'use client';

import { useEffect, useSyncExternalStore } from 'react';
import { Moon, Sun } from 'lucide-react';
import { getStorage } from '@/lib/saved-items';

const themeListeners = new Set<() => void>();

function subscribe(listener: () => void) {
  themeListeners.add(listener);
  return () => themeListeners.delete(listener);
}

function getThemeSnapshot() {
  return document.documentElement.dataset.theme === 'dark';
}

function notifyThemeChange() {
  themeListeners.forEach((listener) => listener());
}

export function ThemeToggle() {
  const dark = useSyncExternalStore(subscribe, getThemeSnapshot, () => false);

  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const syncSystemTheme = (event: MediaQueryListEvent) => {
      let hasSavedTheme = false;
      try { hasSavedTheme = getStorage()?.getItem('devcheats-theme') !== null; } catch { /* Follow the system theme when storage cannot be read. */ }
      if (!hasSavedTheme) {
        document.documentElement.dataset.theme = event.matches ? 'dark' : 'light';
        notifyThemeChange();
      }
    };
    media.addEventListener('change', syncSystemTheme);
    return () => media.removeEventListener('change', syncSystemTheme);
  }, []);

  function toggleTheme() {
    const next = !dark;
    document.documentElement.dataset.theme = next ? 'dark' : 'light';
    try { getStorage()?.setItem('devcheats-theme', next ? 'dark' : 'light'); } catch { /* Keep the theme toggle usable when browser storage is disabled. */ }
    notifyThemeChange();
  }

  return <button className="icon-button" type="button" onClick={toggleTheme} aria-label={`Switch to ${dark ? 'light' : 'dark'} theme`} title="Toggle theme">{dark ? <Sun size={18} /> : <Moon size={18} />}</button>;
}
