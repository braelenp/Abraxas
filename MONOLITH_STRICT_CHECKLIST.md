# Monolith Strict MVP Checklist

Status key: `PASS` | `FAIL` | `BLOCKED` | `PENDING`

## Gate 0: Mobile Integration Preflight (Code-Level)
- [x] `PASS` MWA wired in app provider (`app/src/providers/SolanaProvider.tsx`)
- [x] `PASS` Android deep link intent filter configured for wallet callback (`app/android/app/src/main/AndroidManifest.xml`)
- [x] `PASS` Android immersive fullscreen enabled (`app/android/app/src/main/java/com/abraxas/mobile/MainActivity.java`)
- [x] `PASS` Global tap haptics enabled for actionable UI targets (`app/src/lib/mobile.ts`, `app/src/main.tsx`)
- [x] `PASS` Dependencies installed and build pipeline verified (`npm run build`, `npm run android:apk`)

Evidence:
- Solana mobile adapter + Phantom fallback configured.
- Wallet callback scheme/host set: `com.abraxas.mobile://wallet-adapter`.
- System bars hidden with immersive behavior restore on focus.
- Light haptic impact triggered on `.ui-action` and button targets.

## Gate 1: Android Native Delivery (Core)
- [x] `PASS` Debug APK builds from repo via `npm run android:apk`
- [ ] `PENDING` APK installs and launches on Seeker/Saga (run `MONOLITH_STEP2_DEVICE_VALIDATION.md`)
- [ ] `PENDING` App is mobile-first UI (not desktop shell squeezed into phone)
- [ ] `PENDING` No critical crashes in 3-minute guided demo run

Evidence to capture:
- Build log + APK path
- Device screen recording of launch + tab navigation

## Gate 2: Solana Mobile + Wallet
- [ ] `PENDING` Wallet connect works through Mobile Wallet Adapter on device
- [ ] `PENDING` Wallet session survives expected app transitions
- [ ] `PENDING` Connect/disconnect states are visible and reliable in UI

Evidence to capture:
- Screen recording: connect wallet, show connected address in header

## Gate 3: Meaningful Solana Interaction
- [ ] `PENDING` At least one real on-chain transaction is triggered from in-app core loop
- [ ] `PENDING` Transaction signature is surfaced to user (or recoverable in logs)
- [ ] `PENDING` Transaction confirms on devnet

Evidence to capture:
- Tx signature + explorer link
- In-app log panel evidence

## Gate 4: Core Loop Demonstration (Playable MVP)
- [ ] `PENDING` Create/select vault in app
- [ ] `PENDING` Assign Sophia agent
- [ ] `PENDING` Run circuit evaluation and show state transition
- [ ] `PENDING` Dashboard metrics visibly reflect changes

Evidence to capture:
- One continuous flow demo clip (90-150s)

## Gate 5: Monolith Submission Packaging
- [ ] `PENDING` Repo README has clear setup + run + APK build steps
- [ ] `PENDING` Demo video script aligns with judging criteria
- [ ] `PENDING` Future enhancements called out (V2 items)
- [ ] `PENDING` Pitch deck includes architecture + why mobile-native matters

---

## Step 1 (Current): Build Readiness + APK Build
Goal: move Gate 1 first checkbox to `PASS`.

Commands:
```bash
cd app
npm run android:apk
```

Expected output artifact:
- `app/android/app/build/outputs/apk/debug/app-debug.apk`

If blocked:
- Validate `app/android/local.properties` (`sdk.dir=...`)
- Validate Android SDK/Build tools installed in container
- Re-run build and capture first failing task

Result:
- `PASS` on 2026-03-07
- Build command succeeded: `npm run android:apk`
- Artifact confirmed: `app/android/app/build/outputs/apk/debug/app-debug.apk`

## Step 2 (Current): Device Install + Stability Validation
Runbook:
- `MONOLITH_STEP2_DEVICE_VALIDATION.md`

Current environment note:
- `adb` is installed in container, but no device is attached yet.
