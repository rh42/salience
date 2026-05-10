/* global React, ReactDOM */
const { useState, useEffect, useRef, useMemo } = React;

/* ============================================================
   Data
   ============================================================ */
function CharacterBlock({ text }) {
  const parts = text.split(" | ");
  const [line1, line2, line3] = [
    parts[0],
    parts[1] || "",
    parts[2] || ""
  ];

  return (
    <p className="result-character">
      {line1 && <span className="rc-line rc-main">{line1}</span>}
      {line2 && (
        <>
          {" "}
          <span className="rc-line rc-cost">{line2}</span>
        </>
      )}
      {line3 && (
        <>
          {" "}
          <span className="rc-line rc-upside">{line3}</span>
        </>
      )}
    </p>
  );
}

const QUESTIONS = [
{
  id: "q1",
  type: "tap",
  mode: "Question 01",
  prompt: ["Something goes wrong.", "Not a disaster. Just wrong.", "Your first move is…"],
  options: [
  "Figure out what it means",
  "Fix it immediately",
  "Notice how it landed in your body",
  "Trace back to where it started"]

},
{
  id: "q2",
  type: "twopole",
  mode: "Question 02",
  prompt: ["The best part of something", "you're looking forward to is…"],
  poles: [
  { eyebrow: "", text: "The looking forward to it" },
  { eyebrow: "", text: "The actual thing" }]

},
{
  id: "q3",
  type: "rankone",
  mode: "Question 03",
  prompt: ["A friend says something slightly off.", "You can't pin it down exactly.", "You…"],
  options: [
  "Feel it before you think it",
  "Run it against your history with them",
  "Let it sit and see if it matters"]

},
{ id: "q4", type: "passive" },
{
  id: "q5",
  type: "tap",
  mode: "Question 05",
  prompt: ["You learn something that contradicts", "something you've believed for years.", "Your first feeling is…"],
  options: [
  "Curious. What else is wrong?",
  "Resistant. Are you sure this is right?",
  "Deflated. I built something on that.",
  "Relieved. The pieces fit better now."]

},
{
  id: "q6",
  type: "tap",
  mode: "Question 06",
  prompt: ["You finish something you worked hard on.", "Before you can feel proud, you're already…"],
  options: [
  "Looking at what's next",
  "Breathing for a second",
  "Finding what's wrong with it",
  "Wanting to share it"]

},
{
  id: "q7",
  type: "twopole",
  mode: "Question 07",
  prompt: ["When your brain won't shut up,", "it's usually…"],
  poles: [
  { eyebrow: "", text: "Reaching forward" },
  { eyebrow: "", text: "Reaching back" }]

},
{
  id: "q8",
  type: "tap",
  mode: "Question 08",
  prompt: ["Something catches you off guard.", "A sentence, an image, a stranger's expression.", "Before you know what it means, you…"],
  options: [
  "It's in your body before you've named it",
  "You want to go back and stay in it",
  "You immediately want more",
  "You notice yourself noticing"]

}];


// ==== QUIZ REGIONS (BEGIN) ====
// Fact-checked 2026-05-10. Do not change science or citations here without checking the brief.

const REGIONS = {
AMYGDALA: {
  name: "AMYGDALA",
  code: "BA-Amy",
  role: "Significance detector",
  char: "You get the \"something just tilted\" ping before anyone else has noticed the floor moved. | Living like that means your body starts the scene before your story has caught up, which is not relaxing for you or the people who love you. | At least you are rarely late to realising when a throwaway moment is about to turn into a plot point.",
 actually: "The amygdala is tuned for significance: threat, awe, novelty, flashes of beauty, anything that might change the state of the world around you. One woman with bilateral amygdala damage (the classic SM case) calmly approached snakes, walked through haunted houses, and later described a real-life knife attack without feeling much fear (Feinstein et al., 2011). Yet when she and two other patients inhaled air enriched with CO₂ in the lab, all three experienced intense panic despite having no functional amygdalae (Feinstein et al., 2013). That finding points to the amygdala as especially important for reading emotionally charged signals from the outside world; internally triggered fear, it turns out, can take other routes.",
  source: "Feinstein, J. S., Buzza, C., Hurlemann, R., Follmer, R. L., Dahdaleh, N. S., Coryell, W. H., Welsh, M. J., Tranel, D., & Wemmie, J. A. (2013). Fear and panic in humans with bilateral amygdala damage. *Nature Neuroscience, 16*(3), 270–272.",
  sourceUrl: "https://doi.org/10.1038/nn.3323",
  peer: "Describing the amygdala as a salience or significance detector fits the data better than the old \"fear centre\" label. Basolateral amygdala ensembles learn which cues predict outcomes worth updating on, across both aversive and appetitive tasks, while central and related nuclei drive autonomic and behavioural responses via hypothalamus and brainstem. Human and animal work show robust amygdala engagement for novelty, social evaluation and positive arousal, not only conditioned threat (Fox & Shackman, 2024). The classic fear-conditioning story is, in part, a historical sampling bias that solidified into a convenient brand rather than a complete description of its function.",
},
  HIPPOCAMPUS: {
  name: "HIPPOCAMPUS",
  code: "BA-HPC",
  role: "Memory reconstructor",
  char: "You automatically shelve every moment next to the ones it rhymes with. | Small events rarely stay small; your brain keeps turning them over to see where they fit and what they might be the start of. | When everyone else feels lost, you can still point to the path that actually led here.",
  actually: "The hippocampus does not keep perfect recordings. It helps reconstruct each memory from fragments of place, time, people and emotion stored across the cortex, which means every act of remembering is also a chance to update the story. In a 2023 fMRI study using the classic misinformation paradigm, hippocampal activity patterns shifted across the original event, a misleading description, and a later memory test. Post-event traces in the hippocampus predicted whether people would form confident false memories (Shao et al., 2023). The same medial temporal circuitry is among the first to deteriorate in Alzheimer’s disease, which is one reason anchoring new experiences in time and place often frays early in the illness.",
  source: "Shao, H., Li, J., Loftus, E. F., & Zhu, B. (2023). Cross-stage neural pattern similarity in the hippocampus predicts false memory derived from post-event inaccurate information. *Nature Communications, 14*(1), 2299.",
  sourceUrl: "https://doi.org/10.1038/s41467-023-38046-y",
  peer: "At the circuit level, the hippocampus supports episodic memory by encoding relations among items, space and time. Dentate gyrus and CA3 work together to balance pattern separation and pattern completion: keeping similar episodes distinct while still allowing a partial cue to retrieve a whole event. Beyond space, hippocampal ensembles also map temporal context—so-called ‘time cells’ fire at specific moments within a sequence, helping order events in memory (Eichenbaum, 2017). This same machinery underlies flexible recombination of past experiences in imagination and planning, not just literal replay of what happened.",
},
  PFC: {
  name: "PREFRONTAL CORTEX",
  code: "BA-PFC",
  role: "Editor / planner",
  char: "You edit yourself before the words have even reached your mouth. | It keeps you ahead of other people’s reactions and also slightly exhausted by your own. | Most of the damage you do stays in draft form.",
  actually: "The prefrontal cortex is one of the last brain regions to fully mature, with structure and connectivity continuing to develop into the mid-twenties for most people (Casey et al., 2008). During adolescence, limbic and reward circuits respond quickly and strongly to incentives, threat and especially peers, while top-down prefrontal control is still stabilising (Casey et al., 2008). Adolescents can recruit those control circuits, but do so less consistently when emotional or social stakes are high (Casey et al., 2008). The result is a system biased toward exploration and risk in exactly the years you are leaving familiar groups and testing new attachments, with the PFC arriving late to tidy up habits it did not fully shape.",
  source: "Casey, B. J., Jones, R. M., & Hare, T. A. (2008). The adolescent brain. Annals of the New York Academy of Sciences, 1124(1), 111–126.",
  sourceUrl: "https://doi.org/10.1196/annals.1440.010",
  peer: "Mechanistically, prefrontal cortex supports cognitive control by actively maintaining task goals and rules that bias processing in other brain regions (Miller & Cohen, 2001). Dorsolateral PFC contributes strongly to working memory, planning and strategic inhibition, while ventromedial and orbitofrontal regions integrate value, affective meaning and outcome feedback from limbic systems. Hierarchical accounts propose rostro–caudal gradients in PFC, with more anterior zones supporting increasingly abstract, multi-step policies for behaviour (Badre & Nee, 2018). This architecture means “control” is not a single switch but a layered system that can be pushed, overloaded or selectively engaged depending on context.",
},
  INSULA: {
  name: "INSULA",
  code: "BA-Ins",
  role: "Body interpreter",
  char: "Your body keeps sending you notes and you’ve learned, mostly, to read them. | It means you feel the weather inside you change before you have language for why, which can be unsettling in company that prefers reasons. | You often step away or lean in at the right moment, long before the spreadsheet would have told you to.",
  actually: "The insula sits buried in the lateral sulcus and acts as a hub for sensing the internal state of the body. Posterior insula receives signals about pain, temperature, visceral stretch, hunger, thirst and even air hunger, while anterior insula builds these into a conscious ‘felt sense’ of how the body is doing (Craig, 2003). That interoceptive map underpins experiences like a racing heart, a tight stomach or a lump in the throat, and it helps give emotions their bodily texture. What we call a gut feeling is often this early internal data arriving before you have a story to explain it.",
  source: "Craig, A. D. (2003). Interoception: The sense of the physiological condition of the body. Current Opinion in Neurobiology, 13(4), 500–505.",
  sourceUrl: "https://doi.org/10.1016/S0959-4388(03)00090-4",
  peer: "Anatomically, the insula forms a posterior-to-anterior gradient from primary interoceptive representation to integrated emotional awareness (Craig, 2003). The anterior insula is reliably engaged when people experience pain or disgust themselves and when they observe these states in others, as well as during decisions under risk and uncertainty (Singer et al., 2009). This pattern fits a unifying view in which the insula tracks current and predicted bodily states, supports subjective feeling, and links them to social and decision contexts, making it a key node in both the salience and empathy networks.",
},
NAC: {
  name: "NUCLEUS ACCUMBENS",
  code: "BA-NAc",
  role: "Wanting circuit",
  char: "For you, the charge lives in wanting, not in having. | That makes it hard to feel finished; the second you reach something, your attention is already leaning toward what might come next. | You are very good at generating momentum in stale rooms and dead projects, even if you rarely get to sit in the glow afterward.",
  actually: "The nucleus accumbens, part of the ventral striatum, is a key hub for translating rewards and cues into motivation. Dopamine here is more closely tied to incentive salience—the urge to pursue a reward—than to the pleasure of consuming it (Berridge & Kringelbach, 2015). In animal studies, depleting or blocking nucleus accumbens dopamine makes animals stop working for food, yet they still show normal ‘liking’ reactions if the food is delivered directly. Liking depends on small opioid-sensitive hedonic hotspots in accumbens shell and ventral pallidum, while wanting relies more on distributed mesolimbic dopamine. That separation helps explain why craving can stay high, or even grow, in addiction long after the actual experience has stopped feeling especially good.",
  source: "Berridge, K. C., & Kringelbach, M. L. (2015). Pleasure systems in the brain. Neuron, 86(3), 646–664.",
  sourceUrl: "https://doi.org/10.1016/j.neuron.2015.02.018",
  peer: "At a circuit level, the nucleus accumbens integrates glutamatergic input from cortex and limbic regions with mesolimbic dopamine signals to energise approach behaviour. Medium spiny neurons in accumbens core and shell are especially important for effort-related choice and behavioural activation. Work reviewed by Salamone and Correa (2012) shows that disrupting accumbens dopamine does not abolish basic appetite, but shifts behaviour away from high-effort, high-payoff options toward low-effort alternatives. In that sense, dopamine here helps decide whether a reward is worth working for, rather than simply encoding how much it will be liked.",
},
HABENULA: {
  name: "HABENULA",
  code: "BA-Hb",
  role: "Discrepancy detector",
  char: "You keep a sharp internal draft of how things were meant to go and you feel it when reality clips the line. | That sensitivity helps you catch the misses other people step over, but it also means disappointment can arrive three steps before anyone else notices a problem. | You are often the first to sense when a plan has quietly stopped making sense.",
  actually: "The lateral habenula is a tiny structure that lights up when things go worse than expected. In primate recordings, many lateral habenula neurons increase their firing when a cue predicts no reward and decrease firing when a cue predicts reward; their activity flips when the contingencies reverse (Matsumoto & Hikosaka, 2007). These neurons also respond when an expected reward is omitted, and they send inhibitory signals to midbrain dopamine cells. Functionally, the habenula sends a kind of ‘disappointment’ signal, dampening reward circuits when outcomes fall short of prediction.",
  source: "Matsumoto, M., & Hikosaka, O. (2007). Lateral habenula as a source of negative reward signals in dopamine neurons. Nature, 447(7148), 1111–1115.",
  sourceUrl: "https://doi.org/10.1038/nature05860",
  peer: "Anatomically, the lateral habenula receives input from basal ganglia and limbic forebrain and projects to the rostromedial tegmental nucleus and midbrain dopamine neurons. Optogenetic work in mice shows that activating lateral habenula projections to ventral midbrain is aversive and promotes active, passive and conditioned avoidance behaviours (Stamatakis & Stuber, 2012). Together with primate physiology, this supports the view that lateral habenula encodes negative reward prediction errors and uses them to downregulate dopamine systems, biasing learning and choice away from cues and actions associated with poor or punishing outcomes.",
},
 LC: {
  name: "LOCUS COERULEUS",
  code: "BA-LC",
  role: "Norepinephrine hub",
  char: "Some part of you is always scanning for the thing that suddenly matters. | When that system runs hot, every new ping feels urgent, and genuine signal gets harder to separate from noise. | When there really is something worth waking up for, you are already half out of your chair.",
  actually: "The locus coeruleus is a tiny nucleus in the brainstem whose name literally means “blue spot,” after the dark bluish pigment its neurons show in stained tissue. Despite its size, it sends norepinephrine widely to cortex, thalamus and spinal cord. It is strongly engaged by unexpected, salient or threatening events and by cues that signal a need to reorient, in parallel with autonomic arousal (Sara & Bouret, 2012). Norepinephrine released from LC terminals increases the gain of sensory and cortical circuits, sharpening signal-to-noise, facilitating attention shifts and helping consolidate memories for significant events. In effect, brief bursts from this small cluster help flip the brain into a state primed to notice and respond when something important happens.",
  source: "Sara, S. J., & Bouret, S. (2012). Orienting and reorienting: The locus coeruleus mediates cognition through arousal. Neuron, 76(1), 130–141.",
  sourceUrl: "https://doi.org/10.1016/j.neuron.2012.09.011",
  peer: "Physiological recordings suggest that locus coeruleus neurons operate in different modes that shape behaviour. Phasic LC bursts time-locked to task-relevant decisions can facilitate exploitation—focused performance on the current task—whereas very low or very high tonic firing is associated with disengagement and exploration of alternatives (Aston-Jones & Cohen, 2005). In this adaptive gain framework, LC–norepinephrine does more than generate “arousal”: it dynamically adjusts cortical responsiveness so that useful signals are amplified and unhelpful actions are more readily abandoned as their utility drops.",
},
 CLAUSTRUM: {
  name: "CLAUSTRUM",
  code: "BA-Cla",
  role: "Awareness substrate",
  char: "You are aware of being aware, and you notice the part of you watching the rest of you. | Some days that meta-layer is a helpful guardrail; other days it feels like having a critic sitting just offstage with a clipboard. | You are unusually good at catching yourself in the act and changing course mid-scene instead of only in hindsight.",
  actually: "The claustrum is a thin, irregular sheet of grey matter tucked between the insula and the putamen, with dense two-way connections to much of the cortex (Crick & Koch, 2005). Its anatomy is unusual: it receives input from almost all cortical areas and projects back to many of them, which led Crick and Koch to propose that it could help integrate distributed activity into a coherent experience. More recent work in mice shows that activating claustrum inputs to prefrontal cortex both increased single-cell response variability and aligned population-level responses during demanding tasks (Atilgan et al., 2025). That pattern suggests a role in tuning prefrontal network dynamics rather than being a simple on–off switch for consciousness.",
  source: "Atilgan, H., Lazarte, I. P., & Packer, A. M. (2025). The claustrum enhances neural variability by modulating the responsiveness of the prefrontal cortex. Nature Communications, 16(1), 10767.",
  sourceUrl: "https://doi.org/10.1038/s41467-025-65809-6",
  peer: "Anatomically, the claustrum is positioned between cortex and basal ganglia and forms widespread reciprocal connections with prefrontal, parietal, sensory and limbic regions (Crick & Koch, 2005). The 2025 prefrontal study used two-photon imaging and optogenetics to show that claustrum input can both enhance variability and increase population-level homogeneity in dorsal PFC across learning, effectively reshaping how ensembles respond to the same stimuli (Atilgan et al., 2025). Theoretical accounts now tend to treat the claustrum as a candidate hub for coordinating cortical states—possibly important for aspects of conscious experience—while emphasising that its precise contribution remains an open, testable question rather than a settled “seat of consciousness.”",
},
};

const DUAL_SUMMARIES = {
  "AMYGDALA+CLAUSTRUM": "Something flags, and you immediately notice yourself noticing. The amygdala catches the signal; the claustrum watches you catch it. This produces unusually fine-grained self-awareness. It also makes it hard to know whether you are responding to the world or to your own response to the world.",
  "AMYGDALA+HABENULA": "You notice what matters and you feel it when it falls short. The amygdala catches significance early; the habenula files the gap between what you sensed could happen and what did. This combination produces very accurate disappointment — not the self-pitying kind, the calibrated kind.",
  "AMYGDALA+HIPPOCAMPUS": "You notice what matters and you know where you have seen it before. The amygdala flags significance; the hippocampus cross-references. This makes you hard to surprise twice and good at recognising when history is rhyming.",
  "AMYGDALA+INSULA": "You read the room and you read your body at the same time. The amygdala flags what matters outside; the insula maps what it means inside. You know things before you know how you know them.",
  "AMYGDALA+LC": "Something new appears and two systems respond simultaneously — one to flag its significance, one to demand full attention. This is an effective combination for noticing things. It is also a tiring one.",
  "AMYGDALA+NAC": "Fast to notice, fast to want. The amygdala flags what matters and the nucleus accumbens immediately asks what to do about it. The gap between noticing and wanting is very short in your case.",
  "AMYGDALA+PFC": "You catch the signal and then you edit it. The amygdala registers what matters; the prefrontal cortex manages the response. This looks like composure from the outside. From the inside it involves a small negotiation you rarely mention.",
  "CLAUSTRUM+HABENULA": "You feel the gap and you watch yourself feel it. The habenula registers the distance between expectation and outcome; the claustrum observes the registration. This is a particular kind of self-awareness: not just knowing when things have gone wrong, but noticing how you know.",
  "CLAUSTRUM+HIPPOCAMPUS": "You contextualise and you watch yourself do it. The hippocampus files each moment next to the ones it rhymes with; the claustrum notices the filing. This gives you unusual access to your own patterns — what you keep reaching for, what you keep avoiding, what you have already been through before.",
  "CLAUSTRUM+INSULA": "You feel what your body is doing and you notice yourself feeling it. The insula reads your internal state; the claustrum watches the reading. This can produce very fine-grained self-knowledge. It can also make it difficult to stop paying attention to yourself, which is not always what you want.",
  "CLAUSTRUM+LC": "Something shifts and you catch yourself catching it. The locus coeruleus orients; the claustrum observes the orientation. You are aware not just of what grabbed your attention, but of the fact that it grabbed it. This is either very useful for understanding your own mind or a mild source of ongoing distraction.",
  "CLAUSTRUM+NAC": "You want things and you watch yourself want them. The nucleus accumbens leans forward; the claustrum notices the lean. You can see the wanting before you have decided whether to act on it, which is either useful or unsettling depending on what you are wanting.",
  "CLAUSTRUM+PFC": "You watch yourself think. The prefrontal cortex edits; the claustrum observes the editing. This is either a superpower or the reason you find it difficult to turn your brain off.",
  "HABENULA+HIPPOCAMPUS": "You reach back and feel the gap between what happened and what you expected. The hippocampus reconstructs; the habenula measures the reconstruction against the original plan. This makes you very good at knowing when a story has quietly changed.",
  "HABENULA+INSULA": "You feel gaps. The habenula measures the distance between expectation and outcome; the insula carries that as a physical sensation. When something goes wrong, your body knows before you finish the thought.",
  "HABENULA+LC": "You notice what is new and you feel it when it does not deliver. The locus coeruleus orients toward what just changed; the habenula registers whether it was worth the attention. This is a reliable way to learn quickly. It is also a reliable way to move through a lot of promising things before finding one that holds.",
  "HABENULA+NAC": "The wanting system and the disappointment system, running in parallel. The nucleus accumbens reaches forward; the habenula files the report when the outcome arrives. You are probably very good at desire and quietly familiar with its aftermath.",
  "HABENULA+PFC": "You measure the gap between expectation and outcome, and then you try to plan around it. The habenula finds the discrepancy; the prefrontal cortex writes a new strategy. You are probably better at this than you think, and more tired than you let on.",
  "HIPPOCAMPUS+INSULA": "You remember how things felt, not just what happened. The hippocampus files the context; the insula supplies the bodily texture. Your memories probably arrive with physical detail — a tension, a particular weight — which makes them vivid and occasionally difficult to set down.",
  "HIPPOCAMPUS+LC": "Something unexpected appears and you are already tracing it back. The locus coeruleus flags the surprise; the hippocampus starts cross-referencing. Being surprised, for you, is quickly followed by a version of: I should have seen this coming.",
  "HIPPOCAMPUS+NAC": "One system reaches back; one leans forward. The hippocampus files each moment in context; the nucleus accumbens is already oriented toward what comes next. You probably move through time faster than most — processing where you are while already pointed toward where you are going.",
  "HIPPOCAMPUS+PFC": "You run on context and you edit it. The hippocampus provides the story; the prefrontal cortex keeps revising the ending. Most people do one or the other. You appear to be doing both simultaneously, which explains a few things.",
  "INSULA+LC": "You register new things in your body first. The locus coeruleus flags the shift; the insula carries it as a physical sensation. When something changes around you, something changes inside you — usually before you have words for it.",
  "INSULA+NAC": "For you, wanting has a texture. The nucleus accumbens generates the pull toward what is next; the insula registers it in the body. Desire is not abstract — it arrives with physical weight, and you notice when that weight shifts.",
  "INSULA+PFC": "Your body and your prefrontal cortex are in ongoing negotiation. The insula sends signals up; the PFC decides what to do with them. You probably pause before acting in ways other people call thoughtful, which is not always what it is.",
  "LC+NAC": "Reaching forward, always. The nucleus accumbens wants what is next; the locus coeruleus fires when something new demands attention. You are probably very good at starting things. Finishing is a separate question.",
  "LC+PFC": "Something new appears and you are already thinking about what to do with it. The locus coeruleus reorients; the prefrontal cortex starts planning. This is a useful combination for fast-moving situations. It can make stillness feel like a problem that needs solving.",
  "NAC+PFC": "The drive and the editor, in the same brain. The nucleus accumbens generates momentum; the prefrontal cortex decides what to do with it. This can produce very directed effort. It can also produce a particular kind of exhaustion that comes from wanting something and simultaneously revising your relationship to wanting it.",
};

// ==== QUIZ REGIONS (END) ====

function dualKey(a, b) {
  return [a, b].sort().join("+");
}
function dualSummary(a, b) {
  return DUAL_SUMMARIES[dualKey(a, b)] ||
  `You landed between ${REGIONS[a].name} and ${REGIONS[b].name}. The quiz could not separate them. That is either a precise result or an honest admission that you contain multitudes. Probably both.`;
}

const CALC_LINES = [
"Arguing with itself.",
"Taking this too seriously.",
"Cross-referencing.",
"Working out what it found.",
"Almost."];

const CALC_STREAM = [
"vector_amy ← weight(0.62)",
"vector_hpc ← weight(0.41)",
"vector_pfc ← weight(0.55)",
"passive_dot_t = 4203ms",
"subliminal flag → ?",
"salience > novelty",
"fold response_q4",
"normalising peer layer",
"writing character line",
"verifying source"];


/* ============================================================
   RegionVisual — small animated abstract motif per region.
   Each captures the region's *function*, not its anatomy.
   ============================================================ */
function RegionVisual({ region, size = 180 }) {
  const W = 200,H = 160;
  const common = { width: size, height: size * (H / W), viewBox: `0 0 ${W} ${H}`, fill: "none", stroke: "currentColor", strokeWidth: 1.4, strokeLinecap: "round" };
  switch (region) {
    case "AMYGDALA":
      // Significance detector — a salient dot among quiet ones, ringed and pulsing
      return (
        <svg {...common} className="rv rv-amygdala">
          <circle cx="50" cy="40" r="3" fill="currentColor" opacity="0.25" />
          <circle cx="160" cy="50" r="3" fill="currentColor" opacity="0.25" />
          <circle cx="40" cy="120" r="3" fill="currentColor" opacity="0.25" />
          <circle cx="170" cy="115" r="3" fill="currentColor" opacity="0.25" />
          <circle cx="120" cy="35" r="3" fill="currentColor" opacity="0.25" />
          <circle cx="80" cy="130" r="3" fill="currentColor" opacity="0.25" />
          <g style={{ transformOrigin: "100px 80px" }} className="rv-pulse">
            <circle cx="100" cy="80" r="22" stroke="var(--accent)" strokeWidth="1" opacity="0.3" />
            <circle cx="100" cy="80" r="14" stroke="var(--accent)" strokeWidth="1" opacity="0.5" />
            <circle cx="100" cy="80" r="7" fill="var(--accent)" stroke="none" />
          </g>
        </svg>);

    case "HIPPOCAMPUS":
      // Reconstruction — a curling, looping memory path that redraws itself
      return (
        <svg {...common} className="rv rv-hpc">
          <path className="rv-trace" d="M30 130 C 50 80, 90 110, 110 70 C 130 30, 170 60, 170 100 C 170 130, 130 140, 100 120" stroke="var(--accent)" strokeWidth="1.6" strokeDasharray="240" />
          <circle cx="30" cy="130" r="3" fill="currentColor" opacity="0.5" />
          <circle cx="170" cy="100" r="3" fill="var(--accent)" />
          <circle cx="100" cy="120" r="2" fill="currentColor" opacity="0.4" />
        </svg>);

    case "PFC":
      // Editor — a tree of branches with one branch being pruned (rewriting)
      return (
        <svg {...common} className="rv rv-pfc">
          <path d="M100 150 L 100 90" />
          <path d="M100 90 L 60 50" />
          <path d="M100 90 L 140 50" />
          <path d="M100 90 L 100 30" />
          <path d="M60 50 L 40 30" opacity="0.6" />
          <path d="M60 50 L 70 25" opacity="0.6" />
          <path d="M140 50 L 160 30" opacity="0.6" className="rv-fade" />
          <path d="M140 50 L 130 25" opacity="0.6" />
          <circle cx="100" cy="30" r="3" fill="var(--accent)" />
          <g className="rv-blink"><circle cx="160" cy="30" r="2.5" fill="currentColor" /></g>
        </svg>);

    case "INSULA":
      // Interoception — concentric ripples spreading from the body outward
      return (
        <svg {...common} className="rv rv-insula">
          <g style={{ transformOrigin: "100px 80px" }}>
            <circle className="rv-ripple r1" cx="100" cy="80" r="14" stroke="var(--accent)" />
            <circle className="rv-ripple r2" cx="100" cy="80" r="14" stroke="var(--accent)" />
            <circle className="rv-ripple r3" cx="100" cy="80" r="14" stroke="var(--accent)" />
          </g>
          <circle cx="100" cy="80" r="6" fill="currentColor" />
        </svg>);

    case "NAC":
      // Wanting — an arrow chasing a moving target it never quite catches
      return (
        <svg {...common} className="rv rv-nac">
          <path d="M20 80 L 180 80" opacity="0.2" strokeDasharray="2 4" />
          <g className="rv-chase">
            <path d="M0 80 L 14 76 L 14 84 Z" fill="currentColor" />
          </g>
          <g className="rv-target">
            <circle cx="0" cy="80" r="6" fill="none" stroke="var(--accent)" />
            <circle cx="0" cy="80" r="2.5" fill="var(--accent)" />
          </g>
        </svg>);

    case "HABENULA":
      // Negative prediction error — a measurement bracket on an absent thing
      return (
        <svg {...common} className="rv rv-hab">
          <path d="M50 60 L 50 100" />
          <path d="M50 60 L 56 60" />
          <path d="M50 100 L 56 100" />
          <path d="M150 60 L 150 100" />
          <path d="M150 60 L 144 60" />
          <path d="M150 100 L 144 100" />
          <path d="M50 80 L 150 80" strokeDasharray="3 5" opacity="0.5" />
          <g className="rv-blink-slow"><text x="100" y="50" textAnchor="middle" fontFamily="var(--mono)" fontSize="11" fill="var(--accent)" stroke="none" letterSpacing="0.1em">Δ</text></g>
          <circle cx="100" cy="80" r="3" fill="none" stroke="currentColor" strokeDasharray="2 2" opacity="0.6" />
        </svg>);

    case "LC":
      // Tiny center, enormous reach — radiating lines from a small dot
      return (
        <svg {...common} className="rv rv-lc">
          <g style={{ transformOrigin: "100px 80px" }} className="rv-spin-slow">
            {Array.from({ length: 16 }).map((_, i) => {
              const a = i * Math.PI * 2 / 16;
              const x2 = 100 + Math.cos(a) * 70;
              const y2 = 80 + Math.sin(a) * 55;
              return <line key={i} x1="100" y1="80" x2={x2} y2={y2} opacity={0.18 + i % 3 * 0.12} />;
            })}
          </g>
          <circle cx="100" cy="80" r="6" fill="var(--accent)" />
          <circle cx="100" cy="80" r="2.5" fill="var(--bg)" />
        </svg>);

    case "CLAUSTRUM":
      // Awareness of awareness — a thin sheet with a watching eye-shape
      return (
        <svg {...common} className="rv rv-cla">
          {Array.from({ length: 9 }).map((_, i) =>
          <line key={i} x1="30" y1={40 + i * 10} x2="170" y2={40 + i * 10} opacity={0.18} />
          )}
          <path d="M50 80 Q 100 40, 150 80 Q 100 120, 50 80 Z" stroke="var(--accent)" strokeWidth="1.2" fill="none" />
          <g className="rv-blink"><circle cx="100" cy="80" r="6" fill="var(--accent)" /></g>
          <circle cx="100" cy="80" r="2" fill="var(--bg)" />
        </svg>);

    default:
      return <svg {...common}><circle cx="100" cy="80" r="20" stroke="var(--accent)" /></svg>;
  }
}

/* ============================================================
   Helpers — derive a fake "result" from answer indices
   ============================================================ */
const REGION_WEIGHTS = [
// q1: figure / fix / body / trace
["PFC", "NAC", "INSULA", "HIPPOCAMPUS"],
// q2: looking forward / actual
["NAC", "INSULA"],
// q3: feel / history / let sit
["AMYGDALA", "HIPPOCAMPUS", "CLAUSTRUM"],
// q4 passive — handled separately
null,
// q5: curious / resistant / deflated / relieved
["LC", "HABENULA", "HABENULA", "PFC"],
// q6: next / breathe / wrong / share
["NAC", "INSULA", "HABENULA", "PFC"],
// q7: forward / back
["NAC", "HIPPOCAMPUS"],
// q8: body / go back / want more / notice noticing
["AMYGDALA", "HIPPOCAMPUS", "LC", "CLAUSTRUM"]];


function computeResult(answers) {
  const tally = {};
  Object.keys(REGIONS).forEach((k) => tally[k] = 0);
  answers.forEach((a, i) => {
    const w = REGION_WEIGHTS[i];
    if (!w || a == null) return;
    const r = w[a];
    if (r) tally[r] = (tally[r] || 0) + 1;
  });
  const sorted = Object.entries(tally).sort((a, b) => b[1] - a[1]);
  if (sorted.length === 0) return { primary: "AMYGDALA" };
  if (sorted[1] && Math.abs(sorted[0][1] - sorted[1][1]) <= 0) {
    return { primary: sorted[0][0], secondary: sorted[1][0] };
  }
  return { primary: sorted[0][0] };
}

/* ============================================================
   Tap card answers
   ============================================================ */
function TapCardAnswers({ options, selected, onSelect, is2x2 = true }) {
  return (
    <div className={`answers-grid ${is2x2 && options.length === 4 ? "is-2x2" : ""}`}>
      {options.map((opt, i) =>
      <button
        key={i}
        className={`answer-card ${selected === i ? "is-selected" : ""}`}
        data-idx={String.fromCharCode(65 + i)}
        onClick={() => onSelect(i)}>
        
          <span className="answer-text">{opt}</span>
        </button>
      )}
    </div>);

}

/* ============================================================
   Two-pole
   ============================================================ */
function PoleShape({ idx, qid = "q2" }) {
  // Q2 — anticipation vs the thing itself
  if (qid === "q2" && idx === 0) {
    // "The looking forward" — fluttering paper streamers reaching toward something offscreen
    return (
      <svg className="pole-shape" viewBox="0 0 130 130" fill="none" stroke="currentColor" strokeWidth="1.4">
        <g className="anim-drift">
          <path d="M-10 110 Q 30 70, 60 80 T 130 30" />
          <path d="M-10 118 Q 32 80, 65 90 T 132 44" opacity="0.6" />
          <path d="M-10 126 Q 36 96, 72 100 T 134 60" opacity="0.35" />
        </g>
        <g className="anim-pulse">
          <circle cx="120" cy="32" r="4" fill="currentColor" />
        </g>
        <circle cx="60" cy="80" r="2.2" fill="currentColor" opacity="0.5" />
        <circle cx="20" cy="100" r="1.5" fill="currentColor" opacity="0.4" />
      </svg>);

  }
  if (qid === "q2" && idx === 1) {
    // "The actual thing" — a single bold dot held in place, with arcs collapsing inward
    return (
      <svg className="pole-shape" viewBox="0 0 130 130" fill="none" stroke="currentColor" strokeWidth="1.4">
        <g className="anim-loop">
          <circle cx="20" cy="65" r="2.2" fill="currentColor" />
          <circle cx="110" cy="65" r="2.2" fill="currentColor" />
          <circle cx="65" cy="20" r="2.2" fill="currentColor" />
          <circle cx="65" cy="110" r="2.2" fill="currentColor" />
        </g>
        <circle cx="65" cy="65" r="40" />
        <circle cx="65" cy="65" r="26" opacity="0.6" />
        <g className="anim-pulse">
          <circle cx="65" cy="65" r="7" fill="currentColor" />
        </g>
      </svg>);

  }
  // Q7 idx 0 — "Reaching forward" — staircase of dashes climbing up-right
  if (qid === "q7" && idx === 0) {
    return (
      <svg className="pole-shape" viewBox="0 0 130 130" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <g className="anim-drift">
          <path d="M10 112 L 32 112" />
          <path d="M32 92 L 54 92" opacity="0.85" />
          <path d="M54 72 L 76 72" opacity="0.7" />
          <path d="M76 52 L 98 52" opacity="0.55" />
          <path d="M98 32 L 120 32" opacity="0.4" />
        </g>
        <g className="anim-pulse">
          <circle cx="120" cy="22" r="4.5" fill="currentColor" />
        </g>
      </svg>);

  }
  // Q7 idx 1 — "Reaching back" — concentric arcs receding behind, anchor in the past
  return (
    <svg className="pole-shape" viewBox="0 0 130 130" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
      <g className="anim-pulse">
        <path d="M115 78 A 50 50 0 0 0 15 78" />
      </g>
      <path d="M105 78 A 40 40 0 0 0 25 78" opacity="0.7" />
      <path d="M95 78 A 30 30 0 0 0 35 78" opacity="0.5" />
      <path d="M85 78 A 20 20 0 0 0 45 78" opacity="0.3" />
      <g className="anim-drift">
        <circle cx="15" cy="78" r="4" fill="currentColor" />
      </g>
      <circle cx="115" cy="78" r="2" fill="currentColor" opacity="0.5" />
    </svg>);

}

function TwoPoleAnswers({ poles, selected, onSelect, qid = "q2" }) {
  return (
    <div className="twopole">
      {poles.map((p, i) =>
      <button key={i} className={`pole ${selected === i ? "is-selected" : ""}`} onClick={() => onSelect(i)}>
          <div className="pole-text">{p.text}</div>
          <PoleShape idx={i} qid={qid} />
        </button>
      )}
    </div>);

}

/* ============================================================
   Rank-one
   ============================================================ */
function RankOneAnswers({ options, selected, onSelect }) {
  return (
    <div className="answers-grid">
      {options.map((opt, i) => {
        const isSel = selected === i;
        const isDim = selected != null && !isSel;
        return (
          <button
            key={i}
            className={`answer-card ${isSel ? "is-selected" : ""} ${isDim ? "is-dimmed" : ""}`}
            data-idx={String.fromCharCode(65 + i)}
            onClick={() => onSelect(i)}>
            
            <span className="answer-text">{opt}</span>
          </button>);

      })}
    </div>);

}

/* ============================================================
   Q4 passive
   ============================================================ */
function PassiveScreen({ onDone, autoAdvance = true }) {
  const [flashing, setFlashing] = useState(false);
  const [pinging, setPinging] = useState(false);
  useEffect(() => {
    // dot crosses ~50% near 3250ms; fire the flash there so any flicker reads as the dot.
    const t1 = setTimeout(() => setFlashing(true), 4750);
    const t2 = setTimeout(() => setFlashing(false), 4870); // ~120ms exposure, no fade in CSS
    const t3 = autoAdvance ? setTimeout(() => onDone(), 6700) : null;
    return () => {clearTimeout(t1);clearTimeout(t2);if (t3) clearTimeout(t3);};
  }, [onDone, autoAdvance]);

  const handleDotClick = (e) => {
    e.stopPropagation();
    setPinging(true);
    setTimeout(() => setPinging(false), 280);
  };

  return (
    <div className="question-card">
      <div className="q-meta-row">
        <div className="q-mode" style={{ color: "var(--meta)" }}>·</div>
        <div className="q-mode" style={{ color: "var(--meta)" }}>04 / 08</div>
      </div>
      <div className="passive">
        <div className="horizon"></div>
        <div className="grid-bg"></div>
        <div
          className={`moving-dot ${pinging ? "is-pinging" : ""}`}
          key="dot"
          onClick={handleDotClick}>
        </div>
        <div className={`subliminal ${flashing ? "is-flashing" : ""}`}>noticed</div>
      </div>
    </div>);

}

/* ============================================================
   Calculating
   ============================================================ */
function CalculatingScreen({ onDone }) {
  const [streamIdx, setStreamIdx] = useState(0);
  const [lineIdx, setLineIdx] = useState(0);
  const [pct, setPct] = useState(8);
  const totalMs = 3600;

  useEffect(() => {
    const t = setTimeout(() => onDone(), totalMs);
    const i1 = setInterval(() => setStreamIdx((s) => (s + 1) % CALC_STREAM.length), 280);
    const i2 = setInterval(() => setLineIdx((s) => Math.min(s + 1, CALC_LINES.length - 1)), 720);
    // Glitchy progress: climb to 93, drop to 47, then complete.
    const beats = [
    { at: 100, v: 14 },
    { at: 500, v: 38 },
    { at: 900, v: 64 },
    { at: 1300, v: 81 },
    { at: 1700, v: 93 },
    { at: 2050, v: 47 }, // <- the drop
    { at: 2400, v: 58 },
    { at: 2800, v: 79 },
    { at: 3150, v: 91 },
    { at: 3450, v: 100 }];

    const tids = beats.map((b) => setTimeout(() => setPct(b.v), b.at));
    return () => {clearTimeout(t);clearInterval(i1);clearInterval(i2);tids.forEach(clearTimeout);};
  }, [onDone]);

  return (
    <div className="calculating">
      <div className="calc-bar-wrap">
        <div className="calc-bar">
          <div className="calc-bar-fill" style={{ width: pct + "%" }}></div>
          <div className="calc-bar-ticks">
            {[0, 25, 50, 75, 100].map((n) => <span key={n} style={{ left: n + "%" }}></span>)}
          </div>
        </div>
        <div className="calc-bar-meta">
          <span>0%</span>
          <span className="calc-bar-pct">{pct}%</span>
          <span>100%</span>
        </div>
      </div>
      <div className="calc-line">{CALC_LINES[lineIdx]}</div>
      <div className="calc-stream">› {CALC_STREAM[streamIdx]}</div>
    </div>);

}

/* ============================================================
   Result
   ============================================================ */
function useStaggeredReveal(count, baseDelay = 220, startDelay = 100) {
  const [visible, setVisible] = useState(0);
  useEffect(() => {
    setVisible(0);
    const timers = [];
    for (let i = 0; i < count; i++) {
      timers.push(setTimeout(() => setVisible((v) => Math.max(v, i + 1)), startDelay + i * baseDelay));
    }
    return () => timers.forEach(clearTimeout);
  }, [count, baseDelay, startDelay]);
  return visible;
}

function ObservedReport({ answers, sawFlash }) {
  // compose dynamic-feeling lines from answers
  const a1 = answers[0],a3 = answers[2],a6 = answers[5],a8 = answers[7];
  const lines = [
  { k: "first move", v: a1 != null ? QUESTIONS[0].options[a1].toLowerCase() : "—" },
  { k: "friction", v: a3 != null ? QUESTIONS[2].options[a3].toLowerCase() : "—" },
  { k: "after-task", v: a6 != null ? QUESTIONS[5].options[a6].toLowerCase() : "—" },
  { k: "self-report", v: a8 != null ? QUESTIONS[7].options[a8].toLowerCase() : "—" },
  { k: "passive dot", v: "tracked · gaze locked at t=2.1s" },
  { k: "subliminal", v: sawFlash ? "flagged (faint, sub-threshold)" : "not flagged" }];

  return (
    <div className="result-observed">
      {lines.map((l, i) =>
      <div className="obs-line" key={i}>
          <div className="k">{l.k}</div>
          <div className="v">{l.v}</div>
        </div>
      )}
    </div>);

}

function SingleResult({ regionKey, answers, sawFlash }) {
  const r = REGIONS[regionKey];
  const beats = 6; // region, char, actually, observed, peer, flash
  const v = useStaggeredReveal(beats, 280, 80);

  return (
    <div className="result">
      {/* Region + meta */}
      <div className={`reveal ${v >= 1 ? "is-visible" : ""}`}>
        <div className="result-head">
          <div className="result-region-meta">
            <RegionVisual region={regionKey} size={200} />
            <div className="meta-stack">
              <div className="meta-row">
                <span className="k">id</span>
                <span className="v">{r.code}</span>
              </div>
              <div className="meta-row">
                <span className="k">role</span>
                <span className="v">{r.role}</span>
              </div>
            </div>
          </div>
          <h1 className="result-region">
            <span className="nb">· You are the ·</span>
            <span className="pop" style={{ fontFamily: "Newsreader" }}>
              {r.name.split(" ")[0]}
            </span>
            {r.name.includes(" ") ? (
              <>
                <br />
                {r.name.split(" ").slice(1).join(" ")}
              </>
            ) : null}
          </h1>
        </div>
      </div>

      {/* Character line */}
      <div className={`reveal ${v >= 2 ? "is-visible" : ""}`}>
        <CharacterBlock text={r.char} />
      </div>

      {/* Actually */}
      <div className={`reveal ${v >= 3 ? "is-visible" : ""}`}>
        <div className="result-section result-actually">
          <div className="section-tag">
            <span className="badge" />
            Actually
          </div>
          <div>
            <p>{r.actually}</p>
            <a
              className="source-link"
              href={r.sourceUrl}
              target="_blank"
              rel="noreferrer"
            >
              ↗ {r.source}
            </a>
          </div>
        </div>
      </div>

      {/* What we noticed (no visible title)
      <div className={`reveal ${v >= 4 ? "is-visible" : ""}`}>
        <div className="result-section">
           
          <div className="section-tag tag-observed" aria-hidden="true">
            <span className="badge" />
          </div>
          <ObservedReport answers={answers} sawFlash={sawFlash} />
        </div>
      </div> */}

      {/* Peer details SINGLE*/}
<div className={`reveal ${v >= 5 ? "is-visible" : ""}`}>
  <div className="result-section result-peer">
    <div className="result-peer-head">
      <span className="result-peer-label-main">Nerd corner</span>
    </div>
    <div>
      <p className="result-peer-body">{r.peer}</p>
    </div>
  </div>
</div>

      {/* Fine print */}
      <div className={`reveal ${v >= 6 ? "is-visible" : ""}`}>
        <div className="result-section">
          <div className="section-tag tag-flash">
            <span className="badge" />
            Fine print
          </div>
          <div className="result-flash">
            <div className="flash-icon" />
            <div>
              <p>
                The word “noticed” appeared on screen for 200&thinsp;ms during the moving dot. That timing comes from real amygdala work on signals your eyes miss but your limbic system doesn’t.
                Here it was mostly a party trick. Q8 is a vibe check, not a measure of subliminal threat detection.
              </p>
            
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DualResult({ aKey, bKey, answers, sawFlash }) {
  const a = REGIONS[aKey], b = REGIONS[bKey];
  const beats = 6;
  const v = useStaggeredReveal(beats, 280, 80);

  return (
    <div className="result">
      {/* Region + meta */}
      <div className={`reveal ${v >= 1 ? "is-visible" : ""}`}>
        <div className="result-head">
          <div className="result-region-meta">
            <div className="dual-visual-pair">
              <RegionVisual region={aKey} size={150} />
              <span className="dual-amp">&amp;</span>
              <RegionVisual region={bKey} size={150} />
            </div>
            <div className="meta-stack">
              <div className="meta-row">
                <span className="k">match</span>
                <span className="v">tied</span>
              </div>
              <div className="meta-row">
                <span className="k">a</span>
                <span className="v">
                  {a.code} · {a.role}
                </span>
              </div>
              <div className="meta-row">
                <span className="k">b</span>
                <span className="v">
                  {b.code} · {b.role}
                </span>
              </div>
            </div>
          </div>
          <h1 className="result-region result-region-dual">
            <span className="nb">· You are between ·</span>
            <span className="pop" style={{ fontFamily: "Newsreader" }}>
              {a.name.split(" ")[0]}
            </span>
            <span className="dual-and">&amp;</span>
            <span className="pop" style={{ fontFamily: "Newsreader" }}>
              {b.name.split(" ")[0]}
            </span>
          </h1>
        </div>
      </div>

      {/* Dual summary line */}
      <div className={`reveal ${v >= 2 ? "is-visible" : ""}`}>
        <p className="dual-summary">{dualSummary(aKey, bKey)}</p>
      </div>

      {/* Actually (two regions) */}
      <div className={`reveal ${v >= 3 ? "is-visible" : ""}`}>
        <div className="result-section result-actually">
          <div className="section-tag">
            <span className="badge" />
            Actually
          </div>
          <div>
            <p>
              <strong
                style={{
                  fontFamily: "var(--mono)",
                  fontSize: "0.78em",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "var(--meta)",
                  fontWeight: 500
                }}
              >
                {a.name} —
              </strong>{" "}
              {a.actually}
            </p>
            <a
              className="source-link"
              href={a.sourceUrl}
              target="_blank"
              rel="noreferrer"
            >
              ↗ {a.source}
            </a>
            <p style={{ marginTop: 18 }}>
              <strong
                style={{
                  fontFamily: "var(--mono)",
                  fontSize: "0.78em",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "var(--meta)",
                  fontWeight: 500
                }}
              >
                {b.name} —
              </strong>{" "}
              {b.actually}
            </p>
            <a
              className="source-link"
              href={b.sourceUrl}
              target="_blank"
              rel="noreferrer"
            >
              ↗ {b.source}
            </a>
          </div>
        </div>
      </div>

      {/* What we noticed (no visible title) 
      <div className={`reveal ${v >= 4 ? "is-visible" : ""}`}>
        <div className="result-section">
          <div className="section-tag tag-observed" aria-hidden="true">
            <span className="badge" />
          </div>
          <ObservedReport answers={answers} sawFlash={sawFlash} />
        </div>
      </div> */}

    {/* Peer details DUAL */}
<div className={`reveal ${v >= 5 ? "is-visible" : ""}`}>
  <div className="result-section result-peer">
    <div className="result-peer-head">
      <span className="result-peer-label-main">Nerd corner</span>
    </div>

    <div className="result-peer-lines">
      <p className="result-peer-body">
        <span className="result-peer-label">{a.name} —</span> {a.peer}
      </p>
      <p className="result-peer-body">
        <span className="result-peer-label">{b.name} —</span> {b.peer}
      </p>
    </div>
  </div>
</div>

      {/* Fine print DUAL */}
      <div className={`reveal ${v >= 6 ? "is-visible" : ""}`}>
        <div className="result-section">
          <div className="section-tag tag-flash">
            <span className="badge" />
            Fine print
          </div>
          <div className="result-flash">
            <div className="flash-icon" />
            <div>
              <p>
                The word “noticed” appeared on screen for 200&thinsp;ms during the moving dot. That timing comes from real amygdala work on signals your eyes miss but your limbic system doesn’t.
                Here it was mostly a party trick. Q8 is a vibe check, not a measure of subliminal threat detection.
              </p>
             
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
/* ============================================================
   Landing
   ============================================================ */
function LandingDeco() {
  // abstract corner mark — interconnected nodes (rough nervous-system hint)
  return (
    <svg className="landing-deco" viewBox="0 0 280 280" fill="none" stroke="currentColor" strokeWidth="0.8" style={{ color: "var(--ink)" }}>
      <g className="ld-rings">
        <circle className="ld-ring ld-ring-1" cx="140" cy="140" r="120" opacity="0.18" />
        <circle className="ld-ring ld-ring-2" cx="140" cy="140" r="92" opacity="0.25" />
        <circle className="ld-ring ld-ring-3" cx="140" cy="140" r="60" opacity="0.35" />
      </g>
      <g className="ld-net" opacity="0.7">
        <path className="ld-line" d="M60 80 L 160 140 L 220 60" pathLength="100" />
        <path className="ld-line" d="M160 140 L 240 180" pathLength="100" />
        <path className="ld-line" d="M160 140 L 80 220" pathLength="100" />
        <path className="ld-line ld-line-faint" d="M60 80 L 80 220" opacity="0.4" pathLength="100" />
        <circle className="ld-node ld-node-1" cx="60" cy="80" r="3" fill="currentColor" />
        <circle className="ld-node ld-node-2" cx="220" cy="60" r="3" fill="currentColor" />
        <circle className="ld-node ld-node-3" cx="240" cy="180" r="3" fill="currentColor" />
        <circle className="ld-node ld-node-4" cx="80" cy="220" r="3" fill="currentColor" />
        <circle className="ld-core" cx="160" cy="140" r="4" fill="oklch(0.38 0.09 250)" />
      </g>
    </svg>);

}

function LandingScreen({ onStart }) {
  return (
    <div className="landing" data-screen-label="00 Landing">
      <LandingDeco />
      <div className="landing-hero-tag">
        <span>Cognitive observation №&nbsp;01</span>
        <span style={{ flex: "none" }}>v 1.0 · light</span>
      </div>
      <h1 className="landing-title">
        Which <span className="em" style={{ fontFamily: "Newsreader" }}>brain region</span><br />
        are <span className="qmark">you?</span>
      </h1>
      {/*<p className="landing-tagline">
        This quiz is an experiment you consented to by clicking.
      </p>*/}
      <div className="landing-cta-row">
        <button className="btn" onClick={onStart}>
          Begin observation
          <span className="arrow">→</span>
        </button>
        <span style={{ fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--meta)" }}>
          ~ 90&thinsp;sec · 8 prompts
        </span>
      </div>
      <div className="landing-consent">
        {/*<div className="consent-tag">Consent</div>*/}
        <div className="consent-body">
          <p>This quiz watches how you behave, draws a conclusion, and forgets everything when you close the tab.</p>
        </div>
      </div>

      <div className="landing-credit">
        Made by @jelliwolf, for better or worse.
      </div>
    </div>);

}

/* ============================================================
   Question screen wrapper
   ============================================================ */
function QuestionScreen({ q, qIndex, total, answer, setAnswer, onNext, autoAdvance }) {
  const hasSel = answer != null;
  const handleSelect = (i) => {
    const wasUnanswered = answer == null;
    setAnswer(i);
    if (autoAdvance && wasUnanswered && (q.type === "tap" || q.type === "twopole")) {
      setTimeout(() => onNext(), 460);
    }
  };
  return (
    <div className="question-card" data-screen-label={`0${qIndex + 1} ${q.id.toUpperCase()}`}>
      <div className="q-meta-row">
        <div className="q-mode">{q.mode}</div>
        <div className="q-mode" style={{ color: "var(--meta)" }}>{q.id.toUpperCase()} / 8</div>
      </div>
      <div className="q-text">
        {q.prompt.map((line, i) => <span key={i}>{line}{i < q.prompt.length - 1 ? <br /> : null}</span>)}
      </div>
      {q.type === "tap" &&
      <TapCardAnswers options={q.options} selected={answer} onSelect={handleSelect} />
      }
      {q.type === "twopole" &&
      <TwoPoleAnswers poles={q.poles} selected={answer} onSelect={handleSelect} qid={q.id} />
      }
      {q.type === "rankone" &&
      <RankOneAnswers options={q.options} selected={answer} onSelect={handleSelect} />
      }
      <div className={`q-next-row ${hasSel ? "has-selection" : ""}`}>
        <span className="reselect-hint">tap another to change</span>
        <button className="btn" disabled={!hasSel} onClick={onNext}>
          Continue <span className="arrow">→</span>
        </button>
      </div>
    </div>);

}

/* ============================================================
   App
   ============================================================ */
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "autoAdvance": false,
  "previewRegion": "AUTO",
  "previewMode": "single",
  "ambient": true
} /*EDITMODE-END*/;

function App() {

  // step indices: 0 = landing, 1..8 = q1..q8, 9 = calculating, 10 = result
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState(Array(8).fill(null));
  const [sawFlash, setSawFlash] = useState(false);
  const [t, setTweak] = window.useTweaks ?
  window.useTweaks(TWEAK_DEFAULTS) :
  [TWEAK_DEFAULTS, () => {}];

  // make 50/50 whether the quiz "saw" the flash, recompute when entering result
  useEffect(() => {
    if (step === 10) setSawFlash(Math.random() < 0.45);
  }, [step]);

  const setAnswer = (qIdx, val) => {
    setAnswers((prev) => {
      const next = [...prev];
      next[qIdx] = val;
      return next;
    });
  };

  const goTo = (s) => setStep(s);
  const next = () => setStep((s) => s + 1);
  const restart = () => {
    setAnswers(Array(8).fill(null));
    setStep(0);
  };

  const result = useMemo(() => computeResult(answers), [answers]);

  // override result if previewRegion is set in tweaks
  const renderResult = () => {
    if (t.previewRegion && t.previewRegion !== "AUTO") {
      if (t.previewMode === "dual") {
        // pick a paired region for demo — second-place from data, fallback to PFC
        const second = result.secondary || (t.previewRegion === "PFC" ? "HIPPOCAMPUS" : "PFC");
        return <DualResult aKey={t.previewRegion} bKey={second === t.previewRegion ? "AMYGDALA" : second} answers={answers} sawFlash={sawFlash} />;
      }
      return <SingleResult regionKey={t.previewRegion} answers={answers} sawFlash={sawFlash} />;
    }
    if (result.secondary) {
      return <DualResult aKey={result.primary} bKey={result.secondary} answers={answers} sawFlash={sawFlash} />;
    }
    return <SingleResult regionKey={result.primary} answers={answers} sawFlash={sawFlash} />;
  };

  // step counter ticks (8 questions)
  const stepTicks = [];
  for (let i = 0; i < 8; i++) {
    let cls = "tick";
    const qStep = i + 1; // step index for q(i+1)
    if (step > qStep) cls += " is-done";
    if (step === qStep) cls += " is-active";
    stepTicks.push(<span key={i} className={cls}></span>);
  }

  const stepLabel = (() => {
    if (step === 0) return "00 — Landing";
    if (step >= 1 && step <= 8) return `0${step} — Question ${step}`;
    if (step === 9) return "09 — Processing";
    if (step === 10) return "10 — Result";
    return "";
  })();

  return (
    <div className="app">
      {t.ambient && <div className="ambient"></div>}
      {t.ambient && <div className="grid-veil"></div>}

      <div className="top-meta">
        <div>
          <span className="dot-live"></span>
          BRAIN-OBS / which-region-are-you
        </div>
        <div className="step-counter" aria-hidden="true">
          {stepTicks}
        </div>
        <div>{stepLabel}</div>
      </div>

      <div className="stage">
        {/* Render only the active screen so the float-up animation runs cleanly each transition */}
        <div className={`screen is-active-screen ${step === 10 ? "screen-wide" : ""}`} key={`step-${step}`}>
          {step === 0 && <LandingScreen onStart={() => goTo(1)} />}
          {step >= 1 && step <= 8 && (() => {
            const i = step - 1;
            const q = QUESTIONS[i];
            return q.type === "passive" ?
            <PassiveScreen onDone={() => {setSawFlash(Math.random() < 0.5);next();}} autoAdvance={true} /> :

            <QuestionScreen
              q={q}
              qIndex={i}
              total={8}
              answer={answers[i]}
              setAnswer={(v) => setAnswer(i, v)}
              onNext={next}
              autoAdvance={t.autoAdvance} />;


          })()}
          {step === 9 && <CalculatingScreen onDone={() => goTo(10)} />}
          {step === 10 &&
          <div data-screen-label="10 Result">
              {renderResult()}
              <div className="result-foot">
                <div className="meta">end of observation · session not stored · made by @jelliwolf, whose own brain declined to comment</div>
                <div style={{ display: "flex", gap: 10 }}>
                  <button className="btn btn-ghost" onClick={restart}>← Run again</button>
                </div>
              </div>
            </div>
          }
        </div>
      </div>

      {/* Tweaks panel */}
      {window.TweaksPanel &&
      <window.TweaksPanel title="Tweaks">
          <window.TweakSection title="Flow">
            <window.TweakToggle
            label="Auto-advance"
            value={!!t.autoAdvance}
            onChange={(v) => setTweak("autoAdvance", v)} />
          
            <window.TweakToggle
            label="Ambient backdrop"
            value={!!t.ambient}
            onChange={(v) => setTweak("ambient", v)} />
          
          </window.TweakSection>

          <window.TweakSection title="Jump to screen">
            <div className="tweaks-jump-row">
              <button onClick={() => goTo(0)}>Landing</button>
              <button onClick={() => goTo(1)}>Q1 · tap</button>
              <button onClick={() => goTo(2)}>Q2 · pole</button>
              <button onClick={() => goTo(3)}>Q3 · rank</button>
              <button onClick={() => goTo(4)}>Q4 · passive</button>
              <button onClick={() => goTo(5)}>Q5 · tap</button>
              <button onClick={() => goTo(6)}>Q6 · tap</button>
              <button onClick={() => goTo(7)}>Q7 · pole</button>
              <button onClick={() => goTo(8)}>Q8 · tap</button>
              <button onClick={() => goTo(9)}>Calc</button>
              <button onClick={() => goTo(10)}>Result</button>
            </div>
          </window.TweakSection>

          <window.TweakSection title="Result preview">
            <window.TweakSelect
            label="Region"
            value={t.previewRegion}
            onChange={(v) => setTweak("previewRegion", v)}
            options={[
            { value: "AUTO", label: "Auto (from answers)" },
            { value: "AMYGDALA", label: "Amygdala" },
            { value: "HIPPOCAMPUS", label: "Hippocampus" },
            { value: "PFC", label: "Prefrontal Cortex" },
            { value: "INSULA", label: "Insula" },
            { value: "NAC", label: "Nucleus Accumbens" },
            { value: "HABENULA", label: "Habenula" },
            { value: "LC", label: "Locus Coeruleus" },
            { value: "CLAUSTRUM", label: "Claustrum" }]
            } />
          
            <window.TweakRadio
            label="Mode"
            value={t.previewMode}
            onChange={(v) => setTweak("previewMode", v)}
            options={["single", "dual"]} />
          
          </window.TweakSection>
        </window.TweaksPanel>
      }
    </div>);

}

/* ============================================================
   Mount
   ============================================================ */
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);