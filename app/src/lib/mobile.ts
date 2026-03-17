import { Capacitor } from '@capacitor/core';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { StatusBar } from '@capacitor/status-bar';

function isActionTarget(target: EventTarget | null): boolean {
  if (!(target instanceof Element)) {
    return false;
  }

  return Boolean(target.closest('.ui-action,button,[role="button"],a[role="button"]'));
}

export async function initializeMobileUi(): Promise<void> {
  if (!Capacitor.isNativePlatform()) {
    return;
  }

  await StatusBar.setOverlaysWebView({ overlay: true });
  await StatusBar.hide();
}

export function setupTapHaptics(): () => void {
  if (!Capacitor.isNativePlatform()) {
    return () => {};
  }

  let lastImpactAt = 0;

  const onPointerUp = (event: PointerEvent) => {
    if (!isActionTarget(event.target)) {
      return;
    }

    const now = Date.now();
    if (now - lastImpactAt < 45) {
      return;
    }

    lastImpactAt = now;
    void Haptics.impact({ style: ImpactStyle.Light });
  };

  document.addEventListener('pointerup', onPointerUp, true);

  return () => {
    document.removeEventListener('pointerup', onPointerUp, true);
  };
}
