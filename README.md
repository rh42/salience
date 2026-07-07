# Salience

A small web quiz that asks, with more confidence than it has earned:
**Which brain region are you?**

Eight questions, most of which you answer, one of which just watches you.
At the end it names a brain region it thinks you resemble, explains the
real neuroscience behind it, and cites its sources like it's about to be
peer-reviewed.

Live → https://rh42.github.io/salience/

## What's in it

- **8 result types**, each mapped to a real brain region (amygdala,
  hippocampus, insula, and friends)
- **Tied results are allowed.** Sometimes you land *between* two regions,
  and it writes about that instead of rounding you off
- **Real citations.** The science is fact-checked; the personality copy is
  warm, deadpan, and takes itself a little too seriously on purpose
- **A "Nerd corner"** for each result, if you want the mechanism one level down
- One step where nothing is asked of you. Pay attention anyway.

## Accessibility

Built to be fully usable without a mouse or a screen:

- Answers are proper radio groups, labelled by the question, announced with
  their selected state
- Focus moves to each new screen as you go, and a live region announces
  progress ("Question 3 of 8", "Your result is ready")
- The purely visual steps (the drifting dot, the calculating screen) have
  screen-reader descriptions so nobody is stranded on a silent screen
- Respects `prefers-reduced-motion`, so the ambient drift and animations
  calm down if your OS asks them to
- Text colours meet WCAG AA contrast

## Privacy

There is no backend and nothing is stored. It watches how you behave, draws
a conclusion, and forgets everything the moment you close the tab.
