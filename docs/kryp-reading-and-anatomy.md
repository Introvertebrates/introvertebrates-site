# Norwegian reading support and spider guide — 20 October 2026

## Published behavior

- `kryp-edderkoppens-kropp.html` introduces seven external structures through numbered buttons, a simplified dorsal tarantula drawing, short Norwegian explanations, and selected existing photographs. All explanations remain readable without JavaScript. It also includes a pointing/counting activity and introductions to silk use, sensing movements, and molting.
- A **Lær** navigation link and a homepage invitation lead to the guide.
- Norwegian pages and the weekly article template load shared reading support. **Større tekst** increases paragraph, list, caption and summary text with spacious line height; the choice persists on the same browser when storage is available.
- Individual explanations, animal profiles, and weekly article prose have their own **Lytt**, **Pause/Fortsett**, and **Stopp** controls, plus a shared speed choice. Synthetic speech highlights the current text block. Changing body topics, leaving a profile, navigating away, or starting a video stops narration.
- Only an available Norwegian voice is selected. If none exists, listening controls and speed choices are hidden and the toolbar explains the limitation. Text and body exploration still work. Actual voice quality and availability depend on the visitor's device/browser; no audible Norwegian voice was available in the review browser. Playback controls were additionally exercised with an isolated test voice, and the independent playback tests cover recorded audio and synthetic speech.
- Synthetic pause continues from the beginning of the current short sentence/chunk. Recorded audio continues from its paused playback position.
- Print layouts do not include reading controls. No narration starts automatically. This is a first accessibility improvement, not a WCAG conformance claim.

## Adding Erlend's recordings

The first release uses device narration where available. Keeper recordings take precedence and also work on devices without a Norwegian synthetic voice.

1. Record one block per audio file, reading the heading and visible explanatory text in that block. Record only the prose, not the navigation, listening controls, scientific-name line on profiles, or source links. Keep the recording synchronized when the text changes. Synthetic highlighting is not shown during a recorded narration because no timestamps have been supplied.
2. Put the finished file under `assets/kryp/audio/`, using lowercase filenames with hyphens. MP3, M4A, OGG and WAV are supported; MP3 is a practical default.
3. Add the block's ID and its root-relative audio path to `assets/data/kryp-narration.json`. The manifest currently has an empty `recordings` object. A missing/failed recording falls back to available Norwegian device speech, with a readable failure message when neither is usable.

Example:

```json
{
  "recordings": {
    "anatomy-intro": "/assets/kryp/audio/anatomy-intro.mp3",
    "anatomy-forkropp": "/assets/kryp/audio/anatomy-forkropp.mp3",
    "profile-siuzi": "/assets/kryp/audio/profile-siuzi.mp3"
  }
}
```

The new guide's recording IDs are `anatomy-intro`, `anatomy-forkropp`, `anatomy-bakkropp`, `anatomy-bein`, `anatomy-oyne`, `anatomy-munndeler`, `anatomy-pedipalper`, `anatomy-spinnvorter`, `anatomy-oppdrag`, `behavior-silke`, `behavior-sanser`, and `behavior-hamskifte`.

Animal-profile IDs use `profile-` followed by the existing profile section ID, for example `profile-ruby`, `profile-siuzi`, or `profile-huggorm`. Weekly prose uses `weekly-` followed by the last segment of the published article URL. Keep recordings matched to the prose: weekly recordings cover the main article text, not the separate hero/question or navigation sidebar.

## Scientific and accessibility references

- [Australian Museum: spider structure](https://australian.museum/learn/animals/spiders/spider-structure/)
- [Australian Museum: the hairy spider](https://australian.museum/learn/animals/spiders/the-hairy-spider/)
- [Australian Museum: silk](https://australian.museum/learn/animals/spiders/silk-the-spiders-success-story/)
- [W3C: Making Content Usable for People with Cognitive and Learning Disabilities](https://www.w3.org/TR/coga-usable/)
- [MDN: SpeechSynthesis](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis)

The new SVG is a schematic of a tarantula body plan. It shows eight walking legs attached to the prosoma, two shorter pedipalps, paired chelicerae, clustered eyes, a pedicel, and posterior spinnerets. It is not a species identification plate or a segment-by-segment leg diagram. Photos show the actual structures where the archive supports that claim; the spinneret panel explicitly uses a silk-context photograph.

## Validation

Run `node --test tools/kryp-reading.test.mjs tools/colouring-print.test.mjs`, JavaScript syntax checks, `node tools/check-local-references.mjs`, and `git diff --check`. Browser review covers the real no-Norwegian-voice state, single-panel selection by pointer/keyboard, larger text persisting across pages, a phone-width frame without horizontal overflow, and an isolated test-voice fixture for play/pause/highlighting and stopping on topic/profile navigation. Test fixtures and preview settings remain local.
