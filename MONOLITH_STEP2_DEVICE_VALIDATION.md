# Monolith Step 2: On-Device Validation Script

Goal: Pass Gate 1 item 2 and item 4 (install/launch + no-crash 3-minute run) with clear evidence.

APK to install:
- `app/android/app/build/outputs/apk/debug/app-debug.apk`

## 1) Install APK on Seeker/Saga
If using ADB:
```bash
adb install -r app/android/app/build/outputs/apk/debug/app-debug.apk
```

If sideloading manually:
- Transfer APK to device.
- Open file on device and install.
- Allow unknown app installs if prompted.

Pass criteria:
- App installs successfully.

Evidence:
- Screenshot of installed app icon and app info screen.

## 2) Launch + 3-minute Stability Run
Start screen recording before launch.

Run this exact sequence without force close:
1. Open Abraxas app.
2. Wait for landing screen animation/audio to settle.
3. Tap Connect Wallet and open wallet chooser.
4. Return to app if wallet flow is deferred.
5. Navigate tabs in order: Dashboard -> Vaults -> Orion -> Circuit -> Sophia -> Dashboard.
6. In Vaults: create one vault (`Demo Vault`, `invoice`).
7. In Circuit: select the new vault, set values (`700`, `650`, `500`), tap `Evaluate Circuit`.
8. Return to Dashboard and verify `Protected` count and activity logs change.
9. Keep app open ~20s on Dashboard.

Pass criteria:
- No crash, freeze, or forced restart.
- Navigation and interactions remain responsive.

Evidence:
- One continuous 90-180s screen recording.

## 3) Wallet UX Validation (MWA baseline)
Perform wallet interaction again from inside app:
1. Tap wallet connect button.
2. Choose Backpack (recommended for MWA validation).
3. Approve session if prompted.

Pass criteria:
- Wallet connect flow opens correctly on mobile.
- Connected state visible in app header.

Evidence:
- Screen recording segment showing connect and connected address.

## 4) Report Template
Use this after the run:

- Device: `Seeker/Saga` (OS version: `___`)
- APK build: `debug` (`app-debug.apk`)
- Install: `PASS/FAIL`
- Launch + 3-min stability: `PASS/FAIL`
- Wallet connect (MWA): `PASS/FAIL`
- Observed issues:
  - `Issue 1 (if any)`
  - `Issue 2 (if any)`

If any fail:
- Capture exact step number where failure occurred.
- Capture screenshot/video timestamp.
- Logcat snippet (if available).

## Troubleshooting: "We can't find a wallet"
If you see this message, verify test context first:

1. Ensure tester is launching the installed APK app icon, not `github.dev` or another browser URL.
2. Ensure Phantom or Backpack mobile app is installed and updated on device.
3. Retry connect from inside the APK.
4. Use Backpack for native MWA validation (Phantom deeplink may route through browser on some setups).

Expected behavior:
- In APK (native): Mobile Wallet Adapter flow should open wallet selection/approval.
- In regular browser: mobile wallet adapter may be unavailable.
