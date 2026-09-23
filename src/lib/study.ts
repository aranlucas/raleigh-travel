export type StudyResource = { label: string; href: string; note?: string };
const abpd = "https://www.abpd.org/become-certified/";
const aapd = "https://www.aapd.org/research/oral-health-policies--recommendations/";
const reference = (label: string, slug: string): StudyResource => ({
  label,
  href: aapd + slug + "/",
});

export const studySources = {
  blueprint: abpd + "oral-clinical-examination/oce-blueprint",
  tips: abpd + "oral-clinical-examination/Oral-Clinical-Examination-Study-Tips",
  communication: abpd + "oral-clinical-examination/oce-communication-strategies",
  day: abpd + "oral-clinical-examination/examination-day-oce",
  manual: aapd,
};

export const officialResources: StudyResource[] = [
  {
    label: "Blueprint & scoring",
    href: studySources.blueprint,
    note: "Full task statements, cognitive levels, and the examiner rubric.",
  },
  {
    label: "OCE exam guide · PDF",
    href: "https://www.abpd.org/index.php/download_file/view/951/276",
    note: "The complete guide linked from ABPD’s OCE overview.",
  },
  {
    label: "Study tips & recommended reading",
    href: studySources.tips,
    note: "ABPD’s preparation advice and reference categories.",
  },
  {
    label: "Communication strategies",
    href: studySources.communication,
    note: "Answer the question, make your reasoning clear, and stay concise.",
  },
  {
    label: "Candidate mock video 1",
    href: "https://player.vimeo.com/video/1096000138",
    note: "Official illustrative practice video, not actual examination content.",
  },
  {
    label: "Candidate mock video 2",
    href: "https://player.vimeo.com/video/1096000196",
    note: "A second official example to discuss with your study partner.",
  },
  {
    label: "Candidate mock video 3",
    href: "https://player.vimeo.com/video/1096000274",
    note: "A third official example of the oral examination process.",
  },
  {
    label: "Examination day",
    href: studySources.day,
    note: "Registration, ID, belongings, orientation, and session information.",
  },
  {
    label: "What to expect · video",
    href: "https://player.vimeo.com/video/1003365921?h=e3b79dd6ab",
    note: "ABPD’s examination-day walkthrough.",
  },
  {
    label: "Confidentiality · video",
    href: "https://player.vimeo.com/video/1003366137?h=a93854c679",
    note: "ABPD’s guidance on examination confidentiality.",
  },
  {
    label: "Certification policies",
    href: abpd + "certification-policies",
    note: "Candidate agreements, confidentiality, and examination policies.",
  },
  {
    label: "Certification FAQs",
    href: abpd + "certification-faq",
    note: "Official answers to certification questions.",
  },
];

export const readings = {
  risk: reference(
    "Caries risk & care pathways",
    "caries-risk-assessment-and-management-for-infants-children-and-adolescents",
  ),
  fluoride: reference("Fluoride therapy", "fluoride-therapy"),
  restorative: reference("Restorative dentistry", "pediatric-restorative-dentistry"),
  growth: reference(
    "Developing dentition & occlusion",
    "management-of-the-developing-dentition-and-occlusion-in-pediatric-dentistry",
  ),
  home: reference("Dental home policy", "Dental-home-2"),
  pulp: reference(
    "Pulp therapy · revised 2026",
    "pulp-therapy-for-primary-and-immature-permanent-teeth",
  ),
  vital: reference(
    "Primary vital pulp guideline · 2024",
    "vital_pulp_therapies_in_primary_teeth_with_deep_caries_lesions",
  ),
  nonvital: reference(
    "Primary nonvital pulp guideline",
    "use-of-non-vital-pulp-therapies-in-primary-teeth",
  ),
  permanentVital: reference(
    "Permanent vital pulp guideline",
    "silver-diamine-fluoride-for-dental-caries-management-in-children-and-adolescents-including-those-with-special-health-care-needs2",
  ),
  trauma: reference(
    "IADT: permanent fractures & luxations",
    "guidelines-for-the-management-of-traumatic-dental-injuries-1-fracture-and-luxations-or-permanent-teeth",
  ),
  avulsion: reference(
    "IADT: permanent tooth avulsion",
    "guidelines-for-the-management-of-traumatic-dental-injuries-2-avulsion-of-permanent-teeth",
  ),
  primaryTrauma: reference(
    "IADT: primary tooth injuries",
    "guidelines-for-the-management-of-traumatic-dental-injuries-in-the-primary-dentition",
  ),
  surgery: reference(
    "Pediatric oral surgery",
    "management-considerations-for-pediatric-oral-surgery-and-oral-pathology",
  ),
  pathology: reference(
    "Pediatric oral pathology",
    "management-considerations-for-pediatric-oral-surgery-and-oral-pathology2",
  ),
  radiographs: reference(
    "Individualized radiographic prescribing",
    "prescribing-dental-radiographs-for-infants-children-adolescents-and-individuals-with-special-health-care-needs",
  ),
  antibiotics: reference(
    "Antibiotic therapy · revised 2026",
    "use-of-antibiotic-therapy-for-pediatric-dental-patients",
  ),
  behavior: reference("Behavior guidance", "behavior-guidance-for-the-pediatric-dental-patient"),
  shcn: reference(
    "Special health care needs · revised 2026",
    "management-of-dental-patients-with-special-health-care-needs",
  ),
  sedation: reference(
    "AAP/AAPD sedation monitoring · reaffirmed 2025",
    "monitoring-and-management-of-pediatric-patients-before-during-and-after-sedation-for-diagnostic-and-therapeutic-procedures",
  ),
  emergencies: reference("Medical emergencies · revised 2026", "management-of-medical-emergencies"),
  consent: reference("Informed consent", "informed-consent"),
  records: reference("Recordkeeping · revised 2026", "record-keeping"),
  safety: reference("Patient safety", "patient-safety"),
};

export type Domain = {
  id: string;
  title: string;
  weight: number;
  checkpoint: string;
  essentials: string[];
  prompt: string;
  challenge: string;
  resources: StudyResource[];
};
export const domains: Domain[] = [
  {
    id: "caries",
    title: "Caries & restorative care",
    weight: 17,
    checkpoint: "Treat the disease, then defend the restoration.",
    essentials: [
      "Separate lesion detection, activity, and overall patient risk. A restoration alone does not control the caries process; include prevention and reassessment.",
      "Compare nonoperative care, minimally invasive approaches, and definitive restoration. Explain how symptoms, remaining tooth structure, isolation, cooperation, and follow-up affect your choice.",
      "Review indications and limitations of restorative materials and crowns. For deep lesions, connect excavation strategy to the pulpal assessment rather than naming a procedure first.",
    ],
    prompt:
      "A four-year-old has several cavitated lesions and difficulty cooperating. What information would change your staged care plan?",
    challenge:
      "The caregiver can return only twice this year. Explain what changes, what does not, and how you will reassess disease activity.",
    resources: [readings.restorative, readings.risk],
  },
  {
    id: "trauma",
    title: "Trauma, emergencies & surgery",
    weight: 16,
    checkpoint: "Name the injury precisely; plan beyond the first visit.",
    essentials: [
      "Begin with the history, medical stability, associated injuries, examination, and appropriate imaging. Distinguish primary from permanent dentition and describe root development.",
      "For each injury, use the relevant IADT pathway. Rehearse immediate care, treatment alternatives, prognosis, complications, and the injury-specific follow-up schedule from the source tables.",
      "Broaden the review to extractions, soft-tissue injuries, supernumeraries, and referral decisions. Practice how you would document an inconsistent injury history and review applicable safeguarding requirements.",
    ],
    prompt:
      "An eight-year-old arrives after a fall with a displaced permanent incisor. Walk through the information needed before committing to treatment.",
    challenge:
      "Now the injured tooth is primary. Explain why the original plan cannot simply be reused.",
    resources: [
      readings.trauma,
      readings.avulsion,
      readings.primaryTrauma,
      readings.surgery,
      readings.emergencies,
    ],
  },
  {
    id: "behavior",
    title: "Behavior & pain guidance",
    weight: 14,
    checkpoint: "Fit the approach to this child and this treatment need.",
    essentials: [
      "Assess development, temperament, prior experiences, pain, urgency, medical history, and caregiver expectations. Describe a specific communication approach before discussing escalation.",
      "Explain the goals, limitations, alternatives, and consent for the proposed technique. Consider sensory adaptations and whether deferring treatment is an appropriate option.",
      "If considering pharmacologic care, justify the setting and patient selection. Review monitoring, rescue capability, recovery, and discharge requirements in the sedation guideline.",
    ],
    prompt:
      "A frightened preschooler refuses examination and has treatment needs. Explain your first visit to the caregiver without promising an outcome.",
    challenge:
      "The caregiver requests sedation immediately. Explain the assessment and discussion needed before agreeing to a plan.",
    resources: [readings.behavior, readings.sedation, readings.consent],
  },
  {
    id: "diagnosis",
    title: "Diagnosis, pathology & imaging",
    weight: 10,
    checkpoint: "Describe first. Build and test a differential.",
    essentials: [
      "Record a lesion’s location, appearance, symptoms, duration, and change over time. Combine medical and dental histories with a complete tissue examination.",
      "Give a working diagnosis and a focused differential, then say what evidence would distinguish them. Explain when observation, additional investigation, biopsy, or referral is warranted.",
      "Justify imaging for the clinical question. Also revisit antibiotics, periodontal findings, and TMJ complaints using the relevant manual chapters rather than a routine one-size-fits-all plan.",
    ],
    prompt:
      "A child has a persistent oral lesion found incidentally. Present your differential and the next information you need.",
    challenge:
      "The parent wants reassurance without further evaluation. Explain your uncertainty and your follow-up or referral plan clearly.",
    resources: [readings.pathology, readings.radiographs, readings.antibiotics],
  },
  {
    id: "prevention",
    title: "Prevention & health promotion",
    weight: 10,
    checkpoint: "Make prevention specific, practical, and reviewable.",
    essentials: [
      "Bring together disease indicators, social and medical factors, clinical findings, and protective factors. Use the age-appropriate caries-risk pathway.",
      "Tie counseling, home care, fluoride, sealants, diagnostic decisions, and recall to that assessment. Review exact age- and risk-dependent recommendations in the current manual.",
      "Ask the family to choose an achievable change and explain how you will evaluate it. Include the child’s daily routines and barriers to care.",
    ],
    prompt:
      "A toddler has new caries and frequent sweetened drinks. Explain a realistic prevention plan without overwhelming the caregiver.",
    challenge:
      "The family follows only one recommendation. How will you explore the barrier and revise the plan?",
    resources: [readings.risk, readings.fluoride],
  },
  {
    id: "growth",
    title: "Growth & developing dentition",
    weight: 8,
    checkpoint: "Explain timing as carefully as appliance selection.",
    essentials: [
      "Identify the stage of dentition, eruption pattern, occlusal relationships, habits, and any functional shift. Explain the diagnostic records needed to clarify the problem.",
      "Review ectopic eruption, missing or extra teeth, ankylosis, arch-length concerns, and space maintenance or regaining. Distinguish observation from an indication for intervention.",
      "State the objective, timing, alternatives, and review plan for interceptive care. Explain the limits of your management and when interdisciplinary input is needed.",
    ],
    prompt:
      "A child loses a primary molar early. What findings determine whether space management is indicated?",
    challenge:
      "The child also has an eruption disturbance. Explain how that changes the records, sequencing, or referral decision.",
    resources: [readings.growth],
  },
  {
    id: "pulp",
    title: "Pulpal diagnosis & therapy",
    weight: 8,
    checkpoint: "Diagnosis, dentition, restorability—then treatment.",
    essentials: [
      "Integrate symptoms, clinical findings, and radiographs to assess pulp status. Identify whether the tooth is primary or permanent and whether root development is complete.",
      "Compare appropriate vital and nonvital options, extraction, and referral in context. Discuss the tooth’s value, restorability, alternatives, and expected outcome.",
      "Review the 2026 best practice alongside the dedicated guidelines. It includes selected circumstances for complete pulpotomy in teeth with signs of irreversible pulpitis; use the full selection criteria rather than a blanket rule.",
    ],
    prompt:
      "A deeply carious molar has a complex pain history. Explain how you establish the pulpal diagnosis and select an evidence-supported option.",
    challenge:
      "Change the case to an immature permanent tooth. Explain how preserving development or managing an open apex changes your reasoning.",
    resources: [readings.pulp, readings.vital, readings.nonvital, readings.permanentVital],
  },
  {
    id: "shcn",
    title: "Special health care needs",
    weight: 8,
    checkpoint: "Adapt access, communication, and the care setting.",
    essentials: [
      "Identify the patient’s medical, developmental, sensory, behavioral, and communication needs. Ask the patient and caregiver which accommodations have helped before.",
      "Explain any needed consultation and coordination, and how the patient’s condition changes treatment goals, preventive support, or delivery of care.",
      "Plan for barriers to follow-up and continuity into adulthood. The updated guidance emphasizes access, sensory adaptations, and an organized transition to adult care.",
    ],
    prompt:
      "An adolescent with complex medical and sensory needs presents with untreated dental disease. Build a coordinated plan with the family.",
    challenge:
      "The usual clinician is no longer available. Explain how you will maintain continuity and arrange an effective handoff.",
    resources: [readings.shcn, readings.behavior],
  },
  {
    id: "practice",
    title: "Practice, ethics & safety",
    weight: 5,
    checkpoint: "Show the process that makes the plan safe.",
    essentials: [
      "Treat consent as a discussion of diagnosis, proposed care, risks, benefits, alternatives, and declining care. Assess who can consent and include the child appropriately.",
      "Explain what belongs in the record: findings, reasoning, discussion, decisions, and follow-up. Rehearse privacy, safe handoffs, infection prevention, and emergency readiness.",
      "Use the full blueprint as a final sweep for professional standards, research appraisal, teledentistry, and practice protocols. Check jurisdiction-specific requirements in their original sources.",
    ],
    prompt:
      "A caregiver disputes what was discussed before treatment. Explain your immediate response, record review, and next steps.",
    challenge:
      "An unexpected safety event occurs. Describe patient-focused communication and the process for documenting and reviewing the event.",
    resources: [readings.consent, readings.records, readings.safety],
  },
  {
    id: "advocacy",
    title: "Advocacy & family education",
    weight: 4,
    checkpoint: "A workable plan includes access to care.",
    essentials: [
      "Explain the dental home as ongoing, coordinated care, established by the first birthday. Connect prevention, urgent needs, referral, and follow-up.",
      "Explore language, transport, finances, and competing family needs without making assumptions. Identify practical support and a route back to care.",
      "Practice a short explanation the caregiver can repeat in their own words. For broader advocacy and public-health expectations, use the complete blueprint and manual policies.",
    ],
    prompt:
      "A child with substantial treatment needs repeatedly misses visits. How will you understand the barrier and help the family reconnect with care?",
    challenge:
      "The family needs services your practice cannot provide. Explain the referral and how you will confirm that care was connected.",
    resources: [readings.home, readings.shcn],
  },
];

export type PracticeBlock = {
  id: string;
  day: string;
  time: string;
  minutes: number;
  title: string;
  purpose: string;
  steps: { minutes: number; task: string }[];
  domains: string[];
  resources: StudyResource[];
  finish: string;
};
export const practiceBlocks: PracticeBlock[] = [
  {
    id: "flight-study",
    day: "Friday · optional",
    time: "During the flight",
    minutes: 30,
    title: "Get oriented, then rest",
    purpose: "Bookmark familiar materials. No new clinical topics on a travel day.",
    steps: [
      {
        minutes: 10,
        task: "Skim the exam guide and mark your latest candidate instructions.",
      },
      {
        minutes: 10,
        task: "Review the communication page or sample a candidate mock video.",
      },
      {
        minutes: 10,
        task: "Outline two familiar cases without notes, then close the laptop.",
      },
    ],
    domains: [],
    resources: [officialResources[1], officialResources[3], officialResources[4]],
    finish: "Skip this block if you are tired. Friday preparation is optional.",
  },
  {
    id: "sat-cases",
    day: "Saturday",
    time: "9:00–10:30 AM",
    minutes: 90,
    title: "Build a complete care plan",
    purpose: "Connect caries decisions to prevention, development, and a plan the family can use.",
    steps: [
      {
        minutes: 15,
        task: "Refresh risk-based prevention using familiar notes and the care pathway.",
      },
      {
        minutes: 30,
        task: "Rehearse a caries case; defend options and your chosen restoration.",
      },
      { minutes: 20, task: "Run a mixed-dentition or early-tooth-loss case." },
      {
        minutes: 15,
        task: "Explain prevention and access to care to a study partner acting as the caregiver.",
      },
      {
        minutes: 10,
        task: "Write down two gaps to resolve. Take the scheduled break.",
      },
    ],
    domains: ["caries", "prevention", "growth", "advocacy"],
    resources: [],
    finish: "Deliver one organized care plan and one family-friendly explanation without notes.",
  },
  {
    id: "sat-review",
    day: "Saturday",
    time: "10:45 AM–12:15 PM",
    minutes: 90,
    title: "Make the clinical forks clear",
    purpose: "Work through trauma, pulpal decisions, and a diagnostic differential out loud.",
    steps: [
      {
        minutes: 30,
        task: "Run a trauma case, then change the dentition or injury and explain the different pathway.",
      },
      {
        minutes: 25,
        task: "Contrast primary and immature permanent pulp cases using the current guidelines.",
      },
      {
        minutes: 20,
        task: "Describe an oral lesion, build a differential, and justify investigations or referral.",
      },
      {
        minutes: 15,
        task: "Check one uncertain point in a source and repeat the answer concisely.",
      },
    ],
    domains: ["trauma", "pulp", "diagnosis"],
    resources: [],
    finish: "Stop at 12:15 PM. Lunch and the museum are part of the plan.",
  },
  {
    id: "sun-mock",
    day: "Sunday",
    time: "9:00–10:30 AM",
    minutes: 90,
    title: "Rehearse the conversation",
    purpose:
      "Use original practice prompts to connect behavior guidance and complex patient needs.",
    steps: [
      {
        minutes: 10,
        task: "Review the communication tips or sample a mock video. Choose two familiar cases.",
      },
      {
        minutes: 30,
        task: "Run a behavior-guidance case without looking up answers.",
      },
      {
        minutes: 30,
        task: "Run a special-health-care-needs case with a change in circumstances.",
      },
      {
        minutes: 20,
        task: "Debrief clarity, reasoning, safety, and follow-up. Re-answer the weakest question.",
      },
    ],
    domains: ["behavior", "shcn"],
    resources: [
      officialResources[3],
      officialResources[4],
      officialResources[5],
      officialResources[6],
    ],
    finish: "This is a short rehearsal, not a simulation of the official exam length.",
  },
  {
    id: "sun-review",
    day: "Sunday",
    time: "10:45–11:30 AM",
    minutes: 45,
    title: "Check the safety framework",
    purpose: "Close familiar gaps in sedation, emergencies, and professional practice.",
    steps: [
      {
        minutes: 20,
        task: "Talk through selection, airway and medical assessment, staffing, monitoring, rescue, recovery, and discharge for a familiar sedation scenario.",
      },
      {
        minutes: 15,
        task: "Rehearse a familiar emergency using current AAPD resources and your BLS/PALS training; verify exact protocols in the source.",
      },
      {
        minutes: 10,
        task: "Review consent, documentation, and one practice-safety scenario.",
      },
    ],
    domains: ["practice"],
    resources: [readings.sedation, readings.emergencies, readings.safety],
    finish:
      "Write down any exact thresholds or calculations you need to verify. Do not rely on recalled medication doses.",
  },
  {
    id: "sun-recap",
    day: "Sunday",
    time: "4:30–5:00 PM",
    minutes: 30,
    title: "Make the one-page recap yours",
    purpose: "Consolidate what you already know and then finish studying for the evening.",
    steps: [
      {
        minutes: 10,
        task: "Resolve your two highest-priority gaps using the linked guideline or your established reference.",
      },
      {
        minutes: 10,
        task: "Add personal cues to the printable recap sheet. Keep them short.",
      },
      {
        minutes: 10,
        task: "Read your candidate instructions, check your ID and outfit, and put the materials away.",
      },
    ],
    domains: [],
    resources: [
      officialResources[7],
      officialResources[8],
      officialResources[9],
      officialResources[10],
    ],
    finish: "Finish by 5 PM. Save or print the recap before dinner.",
  },
  {
    id: "mon-review",
    day: "Monday",
    time: "9:00–9:45 AM",
    minutes: 45,
    title: "A confidence warm-up",
    purpose: "Stay with familiar material and protect the rest of the morning.",
    steps: [
      { minutes: 10, task: "Read your recap sheet once." },
      {
        minutes: 15,
        task: "Explain one comfortable case and answer a single follow-up.",
      },
      {
        minutes: 15,
        task: "Repeat with a second familiar case, keeping your answer focused.",
      },
      {
        minutes: 5,
        task: "Review your calm opening and then close the notes.",
      },
    ],
    domains: [],
    resources: [officialResources[3]],
    finish:
      "Stop at 9:45 AM. Lunch is at 11:30; leave the hotel around 2:25 PM for registration at 2:45 PM.",
  },
];

export const recapSections = [
  {
    title: "Caries + prevention · 27%",
    cue: "Lesion and patient risk → disease control → options and restoration → reassessment. Make the home-care plan achievable.",
    source: readings.risk,
  },
  {
    title: "Trauma + surgery · 16%",
    cue: "Medical stability, injury history, dentition, root development, examination and imaging. Injury-specific treatment, prognosis, and follow-up.",
    source: readings.trauma,
  },
  {
    title: "Behavior · 14%",
    cue: "Development, pain, urgency, cooperation, and family goals. Explain your approach, alternatives, consent, and criteria for escalation.",
    source: readings.behavior,
  },
  {
    title: "Diagnosis + imaging · 10%",
    cue: "Describe the finding → focused differential → evidence needed → management or referral. Explain uncertainty and follow-up.",
    source: readings.pathology,
  },
  {
    title: "Pulp · 8%",
    cue: "Pulp status, primary/permanent, root maturity, restorability, and tooth value. Defend the selected therapy with current guidance.",
    source: readings.pulp,
  },
  {
    title: "Growth · 8%",
    cue: "Dentition stage, eruption, occlusion, space, habits, and records. Define the objective, timing, alternatives, and referral threshold.",
    source: readings.growth,
  },
  {
    title: "Special needs · 8%",
    cue: "Patient-specific accommodations, medical coordination, communication, prevention, care setting, and continuity into adulthood.",
    source: readings.shcn,
  },
  {
    title: "Practice + advocacy · 9%",
    cue: "Consent is a discussion. Document reasoning, maintain privacy and safety, address access barriers, and connect the family to care.",
    source: readings.consent,
  },
];
