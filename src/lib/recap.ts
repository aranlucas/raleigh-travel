import { domains } from "./study";
import { studyThemes, type StudyTheme } from "./study-themes";

/** A condensed "if this, then that" line. Each restates a cited point in `studyThemes`. */
export type RecapRule = Readonly<{ when: string; say: string }>;

export type RecapTheme = Readonly<{
  theme: StudyTheme;
  weight: number;
  rules: readonly RecapRule[];
}>;

export const rulesByTheme: Readonly<Record<string, readonly RecapRule[]>> = {
  "caries-prevention": [
    { when: "Noncavitated", say: "prevention + active surveillance" },
    {
      when: "Cavitated / progressing",
      say: "arrest, interim, or definitive care, chosen by pulp status and feasibility",
    },
    {
      when: "Fluoride",
      say: "2×/day toothpaste is the base; add professional F by risk; audit all sources before supplements",
    },
    { when: "SDF", say: "arrests suitable cavitated lesions; discuss black staining; reassess" },
    {
      when: "ITR",
      say: "controls disease when definitive care must wait",
    },
    { when: "Extensive high-risk primary lesions", say: "often favor a stainless-steel crown" },
    {
      when: "Deep caries, normal/reversible pulp",
      say: "selective removal + a durable seal",
    },
  ],
  "trauma-surgery": [
    { when: "Avulsed primary", say: "never replant; monitor the successor" },
    {
      when: "Avulsed permanent",
      say: "replant promptly or store moist; handle the crown; record dry time & storage; splint; antibiotic/tetanus check",
    },
    { when: "Replanted, closed apex", say: "endo generally within 2 weeks" },
    {
      when: "Replanted, open apex",
      say: "may revascularize; treat only definite necrosis/infection",
    },
    { when: "Intruded primary incisor", say: "allow spontaneous repositioning, any direction" },
    { when: "Primary discoloration alone", say: "not an indication for endo" },
    { when: "One negative sensibility test after trauma", say: "does not prove necrosis" },
    { when: "Combined injuries", say: "follow the more frequent (luxation) schedule" },
    {
      when: "Fractured primary root tip",
      say: "remove if easy; a small deep tip near the successor can stay; document & monitor",
    },
    {
      when: "Suspected abuse (2026)",
      say: "document type, character, location; bites → hospital; report",
    },
  ],
  "behavior-sedation": [
    {
      when: "First",
      say: "tailored communication, tell-show-do, praise, distraction, sensory adaptations, pain control",
    },
    {
      when: "Defer treatment?",
      say: "OK for nonurgent disease with a documented plan; pain, infection, trauma need prompt care",
    },
    {
      when: "Protective stabilization",
      say: "indication + consent + monitoring, least restrictive; never for convenience",
    },
    {
      when: "Sedation",
      say: "be able to rescue from a deeper level than intended",
    },
    {
      when: "Deep sedation",
      say: "trained team, independent observer, required monitoring",
    },
    {
      when: "Discharge",
      say: "stable airway/CV, back to baseline; reversal agents → observe longer; written instructions",
    },
    {
      when: "Emergency",
      say: "stop, call for help, airway & breathing, monitor, EMS; anaphylaxis → IM epinephrine + EMS",
    },
    {
      when: "Pain (2026)",
      say: "NSAIDs first; acetaminophen if contraindicated; combine if needed; avoid opioids; no codeine/tramadol < 12",
    },
  ],
  "access-special-needs": [
    {
      when: "Dental home",
      say: "by 12 months; teledentistry supports it but does not replace it",
    },
    {
      when: "Plan the individual",
      say: "ask what has worked; communication impairment ≠ intellectual disability",
    },
    {
      when: "Medical complexity",
      say: "meds, interactions, airway risk; consult or higher-level setting when needed",
    },
    {
      when: "Referral / adult transition",
      say: "confirm a receiving dental home; keep emergency access during handoff",
    },
  ],
  diagnosis: [
    {
      when: "Lesion persists > 2 weeks",
      say: "after removing the suspected cause → biopsy/referral; suspicious → sooner",
    },
    {
      when: "Radiographs",
      say: "from history, exam, risk & question, not age or insurance; review existing images",
    },
    {
      when: "CBCT",
      say: "only if plain films can’t answer a care-changing question; smallest field; read the whole volume",
    },
    {
      when: "Localized pulpal infection, well child",
      say: "treat the source; no routine antibiotic",
    },
    {
      when: "Fever, spreading swelling, dysphagia, dyspnea",
      say: "urgent escalation + source control + antibiotics",
    },
    {
      when: "IE prophylaxis (2026)",
      say: "highest-risk cardiac only; amoxicillin 30–60 min before; no clindamycin; not for prosthetic joints",
    },
  ],
  pulp: [
    {
      when: "Primary, normal/reversible",
      say: "selective removal/IPT or calcium-silicate pulpotomy; direct cap less certain",
    },
    {
      when: "Primary, irreversible (2026)",
      say: "calcium-silicate pulpotomy if no infection signs and bleeding is controlled",
    },
    {
      when: "Primary, nonvital",
      say: "restorable & little resorption → pulpectomy; resorbing → selected LSTR; else extract",
    },
    {
      when: "Permanent, symptomatic",
      say: "spontaneous pain doesn’t exclude vital therapy; full pulpotomy if bleeding controls & PA normal",
    },
    { when: "Immature, necrotic", say: "regenerative endo vs. apexification" },
    { when: "Sensibility tests", say: "limited reliability in primary & immature teeth" },
  ],
  growth: [
    { when: "Early diagnosis", say: "does not automatically mean early treatment" },
    {
      when: "Primary molar lost early",
      say: "no automatic maintainer: site, time since loss, successor, space, occlusion, hygiene",
    },
    { when: "Crossbite", say: "dental vs. functional vs. skeletal" },
    { when: "Functional shift", say: "may favor early correction" },
    { when: "Skeletal / asymmetric", say: "broader planning or referral" },
  ],
  "practice-safety": [
    {
      when: "Consent",
      say: "legal decision maker; diagnosis, care, benefits, risks, alternatives, no treatment; child’s assent",
    },
    {
      when: "Signed form",
      say: "≠ consent; confirm understanding, interpreter, re-consent if the plan changes",
    },
    {
      when: "Record error",
      say: "paper: one line + initials/date; EHR: separate correcting entry; original stays legible",
    },
    {
      when: "Before invasive care",
      say: "two identifiers, time-out, tooth/site, fire risk (ignition, fuel, oxidizer)",
    },
    { when: "Near miss", say: "report, find causes, fair culture, fix the workflow" },
  ],
};

export const recapThemes: readonly RecapTheme[] = studyThemes
  .filter((theme) => theme.domainIds.length > 0)
  .map((theme) => {
    const rules = rulesByTheme[theme.id];
    if (rules === undefined) {
      throw new Error(`No recap rules for theme: ${theme.id}`);
    }
    const weight = theme.domainIds.reduce((total, id) => {
      const domain = domains.find((item) => item.id === id);
      if (domain === undefined) {
        throw new Error(`Unknown study domain: ${id}`);
      }
      return total + domain.weight;
    }, 0);
    return { theme, weight, rules };
  })
  .toSorted((a, b) => b.weight - a.weight);

export const recapNumbers: readonly Readonly<{ value: string; label: string }>[] = [
  { value: "2 · 4 · 6 h", label: "Fasting: clears · human milk · formula, milk, light meal" },
  { value: "12 mo", label: "Dental home established" },
  { value: "2 wk", label: "Endo after replanting a closed-apex tooth" },
  { value: "2 wk", label: "Persistent lesion → biopsy or referral" },
  { value: "2×/day", label: "Age-appropriate fluoride toothpaste" },
  { value: "30–60 min", label: "Single prophylaxis dose before the procedure" },
  { value: "< 12 y", label: "No codeine or tramadol (FDA warning)" },
  { value: "2 × 1 h", label: "OCE sessions, two examiners each" },
];
