export type PdfSource = Readonly<{
  id: string;
  title: string;
  citationLabel: string;
  href: string;
  landingPage: string;
  revision: string;
  pageCount: number;
  note?: string;
}>;

export type Evidence = Readonly<{ source: string; pages: string }>;
export type ReviewPoint = Readonly<{ text: string; evidence: readonly Evidence[] }>;
export type ThemeDecision = Readonly<{
  question: string;
  answer: string;
  evidence: readonly Evidence[];
}>;
export type DecisionBranch = Readonly<{
  when: string;
  action: string;
  /** Row and column in `axes`, when the map is drawn as a matrix. */
  cell?: readonly [number, number];
  children?: readonly Readonly<{ when: string; action: string }>[];
}>;
export type DecisionMap = Readonly<{
  question: string;
  axes?: Readonly<{ rows: readonly string[]; columns: readonly string[] }>;
  branches: readonly DecisionBranch[];
  evidence: readonly Evidence[];
}>;
export type StudyTheme = Readonly<{
  id: string;
  title: string;
  shortTitle: string;
  domainIds: readonly string[];
  sessionIds: readonly string[];
  sourceIds: readonly string[];
  summary: string;
  memoryCue: string;
  points: readonly ReviewPoint[];
  decisions: readonly ThemeDecision[];
  diagram?: DecisionMap;
  pitfall: ReviewPoint;
}>;

// Page citations use the PDF page index (starting at 1), not printed manual pagination.
// Review scope: the 23 AAPD readings linked in study.ts and the ABPD OCE candidate guide.
// Page citations use the PDF page index (starting at 1), not printed manual pagination.
// Review scope: the 23 AAPD readings linked in study.ts and the ABPD OCE candidate guide.
// Page citations use the PDF page index (starting at 1), not printed manual pagination.
// Review scope: the 23 AAPD readings linked in study.ts and the ABPD OCE candidate guide.
// Page citations use the PDF page index (starting at 1), not printed manual pagination.
// Review scope: the 23 AAPD readings linked in study.ts and the ABPD OCE candidate guide.
export const pdfSources: readonly PdfSource[] = [
  {
    id: "risk",
    title: "Caries-risk Assessment and Management for Infants, Children, and Adolescents",
    citationLabel: "Caries risk",
    href: "https://www.aapd.org/globalassets/media/policies_guidelines/bp_cariesriskassessment25.pdf",
    landingPage:
      "https://www.aapd.org/research/oral-health-policies--recommendations/caries-risk-assessment-and-management-for-infants-children-and-adolescents/",
    revision: "Latest revision 2022",
    pageCount: 7,
  },
  {
    id: "fluoride",
    title: "Fluoride Therapy",
    citationLabel: "Fluoride",
    href: "https://www.aapd.org/globalassets/media/policies_guidelines/bp_fluoridetherapy25.pdf",
    landingPage:
      "https://www.aapd.org/research/oral-health-policies--recommendations/fluoride-therapy/",
    revision: "Latest revision 2023",
    pageCount: 7,
  },
  {
    id: "restorative",
    title: "Pediatric Restorative Dentistry",
    citationLabel: "Restorative care",
    href: "https://www.aapd.org/globalassets/media/policies_guidelines/bp_restorativedent25.pdf",
    landingPage:
      "https://www.aapd.org/research/oral-health-policies--recommendations/pediatric-restorative-dentistry/",
    revision: "Latest revision 2022",
    pageCount: 14,
  },
  {
    id: "growth",
    title: "Management of the Developing Dentition and Occlusion in Pediatric Dentistry",
    citationLabel: "Developing dentition",
    href: "https://www.aapd.org/globalassets/media/policies_guidelines/bp_developdentition25.pdf",
    landingPage:
      "https://www.aapd.org/research/oral-health-policies--recommendations/management-of-the-developing-dentition-and-occlusion-in-pediatric-dentistry/",
    revision: "Latest revision 2024",
    pageCount: 19,
  },
  {
    id: "pulp",
    title: "Pulp Therapy for Primary and Immature Permanent Teeth: Indications and Objectives",
    citationLabel: "Pulp best practice · 2026",
    href: "https://www.aapd.org/globalassets/media/policies_guidelines/bp_pulptherapy26.pdf",
    landingPage:
      "https://www.aapd.org/research/oral-health-policies--recommendations/pulp-therapy-for-primary-and-immature-permanent-teeth/",
    revision:
      "Latest revision 2026; official but unformatted; follows the 2025 primary-section partial revision",
    pageCount: 16,
  },
  {
    id: "vital",
    title: "Use of Vital Pulp Therapies in Primary Teeth 2024",
    citationLabel: "Primary vital pulp · 2024",
    href: "https://www.aapd.org/globalassets/media/policies_guidelines/g_vpt-2024.pdf",
    landingPage:
      "https://www.aapd.org/research/oral-health-policies--recommendations/use-of-vital-pulp-therapies-in-primary-teeth-with-deep-caries-lesions/",
    revision: "Published 2024; article last revision September 12, 2023",
    pageCount: 14,
  },
  {
    id: "nonvital",
    title: "Use of Non-Vital Pulp Therapies in Primary Teeth",
    citationLabel: "Primary nonvital pulp",
    href: "https://www.aapd.org/globalassets/media/policies_guidelines/g_non-vpt.pdf",
    landingPage:
      "https://www.aapd.org/research/oral-health-policies--recommendations/use-of-non-vital-pulp-therapies-in-primary-teeth/",
    revision: "Published 2020; article last revision June 13, 2020",
    pageCount: 13,
  },
  {
    id: "permanentVital",
    title: "Guideline for Use of Vital Pulp Therapy in Permanent Teeth",
    citationLabel: "Permanent vital pulp · 2025",
    href: "https://www.aapd.org/globalassets/media/policies_guidelines/g_vpt-permanentteeth.pdf",
    landingPage:
      "https://www.aapd.org/research/oral-health-policies--recommendations/silver-diamine-fluoride-for-dental-caries-management-in-children-and-adolescents-including-those-with-special-health-care-needs2/",
    revision: "Published 2025; article last revision July 20, 2025",
    pageCount: 13,
  },
  {
    id: "trauma",
    title: "IADT Guidelines: Fractures and Luxations of Permanent Teeth",
    citationLabel: "Permanent fractures/luxations",
    href: "https://www.aapd.org/globalassets/media/policies_guidelines/e_iadt-fractures25.pdf",
    landingPage:
      "https://www.aapd.org/research/oral-health-policies--recommendations/guidelines-for-the-management-of-traumatic-dental-injuries-1-fracture-and-luxations-or-permanent-teeth/",
    revision: "2020 (IADT guideline; reprinted in the current AAPD manual)",
    pageCount: 16,
  },
  {
    id: "avulsion",
    title: "IADT Guidelines: Avulsion of Permanent Teeth",
    citationLabel: "Permanent avulsion",
    href: "https://www.aapd.org/globalassets/media/policies_guidelines/e_iadt-avulsion25.pdf",
    landingPage:
      "https://www.aapd.org/research/oral-health-policies--recommendations/guidelines-for-the-management-of-traumatic-dental-injuries-2-avulsion-of-permanent-teeth/",
    revision: "2020 (IADT guideline; reprinted in the current AAPD manual)",
    pageCount: 9,
  },
  {
    id: "primaryTrauma",
    title: "IADT Guidelines: Injuries in the Primary Dentition",
    citationLabel: "Primary trauma",
    href: "https://www.aapd.org/globalassets/media/policies_guidelines/e_iadt-injuries25.pdf",
    landingPage:
      "https://www.aapd.org/research/oral-health-policies--recommendations/guidelines-for-the-management-of-traumatic-dental-injuries-in-the-primary-dentition/",
    revision: "2020 (IADT guideline; reprinted in the current AAPD manual)",
    pageCount: 15,
  },
  {
    id: "surgery",
    title: "Management Considerations for Pediatric Oral Surgery",
    citationLabel: "Oral surgery",
    href: "https://www.aapd.org/globalassets/media/policies_guidelines/bp_oralsurgery25.pdf",
    landingPage:
      "https://www.aapd.org/research/oral-health-policies--recommendations/management-considerations-for-pediatric-oral-surgery-and-oral-pathology/",
    revision: "2025 (AAPD latest revision; manual edition is 2026-2027)",
    pageCount: 8,
  },
  {
    id: "pathology",
    title: "Management Considerations for Pediatric Oral Pathology",
    citationLabel: "Oral pathology",
    href: "https://www.aapd.org/globalassets/media/policies_guidelines/bp_oralpathology25.pdf",
    landingPage:
      "https://www.aapd.org/research/oral-health-policies--recommendations/management-considerations-for-pediatric-oral-surgery-and-oral-pathology2/",
    revision: "2025 (AAPD latest revision; manual edition is 2026-2027)",
    pageCount: 6,
  },
  {
    id: "radiographs",
    title:
      "Prescribing Dental Radiographs for Infants, Children, Adolescents, and Individuals with Special Health Care Needs",
    citationLabel: "Radiographs",
    href: "https://www.aapd.org/globalassets/media/policies_guidelines/bp_radiographs25.pdf",
    landingPage:
      "https://www.aapd.org/research/oral-health-policies--recommendations/prescribing-dental-radiographs-for-infants-children-adolescents-and-individuals-with-special-health-care-needs/",
    revision: "2025 (AAPD latest revision; body notes the prior revision was 2024)",
    pageCount: 5,
  },
  {
    id: "antibiotics",
    title: "Use of Antibiotic Therapy for Pediatric Dental Patients",
    citationLabel: "Antibiotics",
    href: "https://www.aapd.org/globalassets/media/policies_guidelines/bp_antibiotictherapy26.pdf",
    landingPage:
      "https://www.aapd.org/research/oral-health-policies--recommendations/use-of-antibiotic-therapy-for-pediatric-dental-patients/",
    revision: "2026 (AAPD latest revision; manual edition is 2026-2027)",
    pageCount: 8,
  },
  {
    id: "emergencies",
    title: "Management of Medical Emergencies",
    citationLabel: "Medical emergencies",
    href: "https://www.aapd.org/globalassets/media/policies_guidelines/r_medemergencies25.pdf",
    landingPage:
      "https://www.aapd.org/research/oral-health-policies--recommendations/management-of-medical-emergencies/",
    revision:
      "2025 (AAPD landing page Latest Revision; PDF table reference accessed July 20, 2025)",
    pageCount: 2,
  },
  {
    id: "home",
    title: "Policy on the Dental Home",
    citationLabel: "Dental home",
    href: "https://www.aapd.org/globalassets/media/policies_guidelines/p_dentalhome25.pdf",
    landingPage:
      "https://www.aapd.org/research/oral-health-policies--recommendations/Dental-home-2/",
    revision: "2023",
    pageCount: 3,
  },
  {
    id: "behavior",
    title: "Behavior Guidance for the Pediatric Dental Patient",
    citationLabel: "Behavior guidance",
    href: "https://www.aapd.org/globalassets/media/policies_guidelines/bp_behavguide25.pdf",
    landingPage:
      "https://www.aapd.org/research/oral-health-policies--recommendations/behavior-guidance-for-the-pediatric-dental-patient/",
    revision: "2024",
    pageCount: 21,
  },
  {
    id: "shcn",
    title: "Management of Dental Patients with Special Health Care Needs",
    citationLabel: "Special health care needs",
    href: "https://www.aapd.org/globalassets/media/policies_guidelines/bp_shcn26.pdf",
    landingPage:
      "https://www.aapd.org/research/oral-health-policies--recommendations/management-of-dental-patients-with-special-health-care-needs/",
    revision: "2026",
    pageCount: 10,
  },
  {
    id: "sedation",
    title:
      "Guidelines for Monitoring and Management of Pediatric Patients Before, During, and After Sedation for Diagnostic and Therapeutic Procedures",
    citationLabel: "Sedation monitoring",
    href: "https://www.aapd.org/globalassets/media/policies_guidelines/bp_monitoringsedation25.pdf",
    landingPage:
      "https://www.aapd.org/research/oral-health-policies--recommendations/monitoring-and-management-of-pediatric-patients-before-during-and-after-sedation-for-diagnostic-and-therapeutic-procedures/",
    revision: "Reaffirmed June 2025 with reference updates; text/content unchanged",
    pageCount: 29,
  },
  {
    id: "consent",
    title: "Informed Consent",
    citationLabel: "Consent",
    href: "https://www.aapd.org/globalassets/media/policies_guidelines/bp_informedconsent25.pdf",
    landingPage:
      "https://www.aapd.org/research/oral-health-policies--recommendations/informed-consent/",
    revision: "2023",
    pageCount: 5,
  },
  {
    id: "records",
    title: "Recordkeeping",
    citationLabel: "Recordkeeping",
    href: "https://www.aapd.org/globalassets/media/policies_guidelines/bp_recordkeeping26.pdf",
    landingPage:
      "https://www.aapd.org/research/oral-health-policies--recommendations/record-keeping/",
    revision: "2026",
    pageCount: 12,
  },
  {
    id: "safety",
    title: "Policy on Patient Safety",
    citationLabel: "Patient safety",
    href: "https://www.aapd.org/globalassets/media/policies_guidelines/p_patient--safety.pdf",
    landingPage:
      "https://www.aapd.org/research/oral-health-policies--recommendations/patient-safety/",
    revision: "2025",
    pageCount: 6,
  },
  {
    id: "oce-guide",
    title: "A Guide to the Oral Clinical Examination (OCE)",
    citationLabel: "ABPD OCE guide",
    href: "https://www.abpd.org/index.php/download_file/view/951/276",
    landingPage: "https://www.abpd.org/index.php/download_file/view/951/276",
    revision: "Updated February 2026",
    pageCount: 23,
  },
];

export const studyThemes: readonly StudyTheme[] = [
  {
    id: "caries-prevention",
    title: "Caries, prevention & the durable restoration",
    shortTitle: "Caries & prevention",
    domainIds: ["caries", "prevention"],
    sessionIds: ["sat-cases"],
    sourceIds: ["risk", "fluoride", "restorative"],
    summary:
      "Start with the child’s disease risk. Control the process, choose care the family can sustain, and match the restoration to the tooth’s future.",
    memoryCue: "Risk → control → restore → reassess.",
    points: [
      {
        text: "Combine disease indicators, risk factors, and protective factors. Reassess risk at each periodic visit; a checklist total is not a validated prediction.",
        evidence: [
          {
            source: "risk",
            pages: "1–3",
          },
        ],
      },
      {
        text: "Twice-daily age-appropriate fluoride toothpaste is the foundation. Add professional fluoride by risk; audit drinking water and all fluoride sources before supplements.",
        evidence: [
          {
            source: "fluoride",
            pages: "2–4",
          },
        ],
      },
      {
        text: "Restoration choice depends on pulp status, lesion extent, remaining structure, isolation, cooperation, and time to exfoliation. Extensive high-risk primary lesions often favor a stainless-steel crown.",
        evidence: [
          {
            source: "restorative",
            pages: "4–8",
          },
        ],
      },
    ],
    decisions: [
      {
        question: "Noncavitated lesion, cavitation, or progression: what changes?",
        answer:
          "Noncavitated lesions can receive preventive care and active surveillance. Cavitation or progression prompts an arrest/restorative plan; explain how you will control disease and verify success.",
        evidence: [
          {
            source: "risk",
            pages: "3–5",
          },
          {
            source: "restorative",
            pages: "1–2",
          },
        ],
      },
      {
        question: "When might SDF or an interim restoration fit?",
        answer:
          "SDF can arrest suitable cavitated lesions within a comprehensive plan; discuss black staining. An interim therapeutic restoration can control disease when definitive care must wait. Both need reassessment.",
        evidence: [
          {
            source: "fluoride",
            pages: "3–4",
          },
          {
            source: "restorative",
            pages: "5",
          },
        ],
      },
      {
        question: "Deep caries: remove everything?",
        answer:
          "First establish pulp status. With normal or reversible pulp, selective removal can reduce exposure risk; a durable seal is essential. Use the pulp theme for tooth-specific treatment choices.",
        evidence: [
          {
            source: "restorative",
            pages: "2–3",
          },
        ],
      },
    ],
    pitfall: {
      text: "A technically successful filling does not control ongoing caries. Keep prevention, family support, and reassessment in the answer.",
      evidence: [
        {
          source: "restorative",
          pages: "1–2",
        },
      ],
    },
    diagram: {
      question: "What is the disease doing?",
      branches: [
        {
          when: "Noncavitated, controllable",
          action: "Prevent and monitor activity or progression.",
        },
        {
          when: "Cavitated or progressing",
          action:
            "Choose arrest, interim, or definitive treatment from pulp status and feasibility.",
        },
        {
          when: "At every risk level",
          action: "Address causes, support home care, and set reassessment.",
        },
      ],
      evidence: [
        {
          source: "risk",
          pages: "4–5",
        },
        {
          source: "restorative",
          pages: "1–3",
        },
      ],
    },
  },
  {
    id: "pulp",
    title: "Pulp therapy: choose the right tooth pathway",
    shortTitle: "Pulp therapy",
    domainIds: ["pulp"],
    sessionIds: ["sat-review"],
    sourceIds: ["pulp", "vital", "nonvital", "permanentVital"],
    summary:
      "Keep the pulp guidelines together, but separate primary from permanent teeth. Diagnose before naming a procedure; then explain restorability, root maturity, the seal, and follow-up.",
    memoryCue: "Tooth → pulp → roots → restore → review.",
    points: [
      {
        text: "Use the pain history, examination, and radiographs together. Sensibility tests have limited reliability in primary and immature permanent teeth.",
        evidence: [
          {
            source: "pulp",
            pages: "2",
          },
        ],
      },
      {
        text: "For deeply carious primary teeth with normal or reversible pulp, selective removal with indirect pulp treatment or calcium-silicate pulpotomy is favored; direct pulp capping has less certain evidence.",
        evidence: [
          {
            source: "vital",
            pages: "1–2, 6",
          },
        ],
      },
      {
        text: "A restorable nonvital primary tooth without significant resorption favors pulpectomy. LSTR is a conditional short-term option for selected resorbing teeth, with close monitoring.",
        evidence: [
          {
            source: "nonvital",
            pages: "5–7",
          },
        ],
      },
      {
        text: "The 2026 best practice adds calcium-silicate pulpotomy for selected primary teeth with irreversible pulpitis: no clinical/radiographic infection and controllable bleeding. Pain alone does not choose the procedure.",
        evidence: [
          {
            source: "pulp",
            pages: "4–5",
          },
        ],
      },
      {
        text: "In permanent teeth, spontaneous pain does not automatically exclude vital therapy. Selected vital teeth with normal periapical tissues and controlled bleeding may receive full pulpotomy.",
        evidence: [
          {
            source: "permanentVital",
            pages: "5–7, 9–10",
          },
        ],
      },
    ],
    decisions: [
      {
        question: "Primary tooth: deep caries without an exposure?",
        answer:
          "With normal or reversible pulp, selective removal and indirect pulp treatment preserve vitality. If exposed and the radicular pulp is suitable, calcium-silicate pulpotomy is preferred over older agents. Finish with a durable seal.",
        evidence: [
          {
            source: "vital",
            pages: "1–2, 6, 8–9",
          },
        ],
      },
      {
        question: "Primary tooth: nonvital and resorbing?",
        answer:
          "Decide whether predictable retention is useful and feasible. Pulpectomy performs better with intact roots; selected short-horizon cases may use LSTR. Extract when restorability, support, or infection control is inadequate.",
        evidence: [
          {
            source: "nonvital",
            pages: "5–7",
          },
        ],
      },
      {
        question: "Permanent tooth: deep versus extremely deep caries?",
        answer:
          "Normal/reversible pulp with a dentin barrier favors selective removal. No barrier or spontaneous, nocturnal, or lingering pain calls for exposure and pulp assessment. Full pulpotomy requires vital tissue, controlled bleeding, and no periapical infection; several recommendations are conditional.",
        evidence: [
          {
            source: "permanentVital",
            pages: "5–7, 9–10",
          },
        ],
      },
      {
        question: "Immature permanent tooth: why does vitality matter?",
        answer:
          "Vital pulp supports continued root development. For necrosis with an open apex, compare regenerative endodontics and apexification, prognosis, and referral; plan clinical and radiographic follow-up.",
        evidence: [
          {
            source: "pulp",
            pages: "2–3, 9–10",
          },
        ],
      },
    ],
    pitfall: {
      text: "Do not transfer a primary-vital guideline to permanent teeth, trauma, or necrotic teeth. Tooth type and diagnosis change the evidence and treatment choices.",
      evidence: [
        {
          source: "vital",
          pages: "1, 7, 13",
        },
        {
          source: "permanentVital",
          pages: "5–7",
        },
      ],
    },
    diagram: {
      question: "Which pulp pathway are you defending?",
      axes: { rows: ["Primary", "Permanent"], columns: ["Potentially vital", "Nonvital"] },
      branches: [
        {
          when: "Primary · potentially vital",
          cell: [0, 0],
          action:
            "Selective removal/IPT or calcium-silicate pulpotomy when selection criteria fit.",
        },
        {
          when: "Primary · nonvital",
          cell: [0, 1],
          action: "Pulpectomy, selected short-term LSTR, or extraction.",
        },
        {
          when: "Permanent · potentially vital",
          cell: [1, 0],
          action: "Depth, symptoms, periapical tissues, and bleeding guide vital therapy.",
        },
        {
          when: "Immature permanent · necrotic",
          cell: [1, 1],
          action: "Assess regeneration or apexification and long-term prognosis.",
        },
      ],
      evidence: [
        {
          source: "vital",
          pages: "6",
        },
        {
          source: "nonvital",
          pages: "5–7",
        },
        {
          source: "permanentVital",
          pages: "5–7",
        },
        {
          source: "pulp",
          pages: "9–10",
        },
      ],
    },
  },
  {
    id: "trauma-surgery",
    title: "Trauma & surgery: protect the tooth’s future",
    shortTitle: "Trauma & surgery",
    domainIds: ["trauma"],
    sessionIds: ["sat-review"],
    sourceIds: ["trauma", "avulsion", "primaryTrauma", "surgery"],
    summary:
      "First establish medical stability and the injury. Then split primary from permanent teeth: the successor, root maturity, and time outside the socket change the plan.",
    memoryCue: "Child first. Tooth type. Injury. Apex. Follow-up.",
    points: [
      {
        text: "Record injury timing, mechanism, associated injuries, soft tissues, imaging, and baseline findings. In permanent teeth, one negative sensibility test after trauma does not prove necrosis.",
        evidence: [
          {
            source: "trauma",
            pages: "1–2, 13",
          },
        ],
      },
      {
        text: "For permanent fractures/luxations, use the injury-specific repositioning, flexible-splint, and follow-up table. Combined injuries follow the more frequent luxation schedule.",
        evidence: [
          {
            source: "trauma",
            pages: "7–13",
          },
        ],
      },
      {
        text: "In primary trauma, prioritize comfort and the developing successor. Discoloration alone is not an indication for endodontic treatment.",
        evidence: [
          {
            source: "primaryTrauma",
            pages: "2, 13",
          },
        ],
      },
      {
        text: "Before surgery, map roots and successors, assess medical and behavior needs, choose a suitable setting, and explain alternatives and aftercare.",
        evidence: [
          {
            source: "surgery",
            pages: "1–3",
          },
        ],
      },
    ],
    decisions: [
      {
        question: "An avulsed tooth: what is the first distinction?",
        answer:
          "Primary: never replant. Permanent: prompt replantation when appropriate, or a suitable moist storage medium and urgent care. Handle the crown, avoid root damage, and record dry time and storage.",
        evidence: [
          {
            source: "primaryTrauma",
            pages: "12",
          },
          {
            source: "avulsion",
            pages: "2–4",
          },
        ],
      },
      {
        question: "Replanted permanent tooth: open or closed apex?",
        answer:
          "Closed apex generally needs endodontic treatment within two weeks. Open apex may revascularize; intervene for definite necrosis/infection. Add the splint, antibiotics/tetanus assessment, and long-term follow-up to the plan.",
        evidence: [
          {
            source: "avulsion",
            pages: "3–6",
          },
        ],
      },
      {
        question: "Intruded primary incisor: extract because of its direction?",
        answer:
          "Allow spontaneous repositioning irrespective of direction, arrange rapid referral to a child-oriented team, and monitor. The direction of displacement alone is not a routine extraction indication.",
        evidence: [
          {
            source: "primaryTrauma",
            pages: "2, 11, 13",
          },
        ],
      },
      {
        question: "A primary root tip fractures during extraction: keep searching?",
        answer:
          "Remove an easily accessible fragment. A small, deep fragment near the successor may be safer to leave than pursue traumatically; document, explain, and monitor infection and eruption.",
        evidence: [
          {
            source: "surgery",
            pages: "3",
          },
        ],
      },
    ],
    pitfall: {
      text: "Long dry time worsens the prognosis of permanent avulsion but does not automatically make replantation pointless. Discuss ankylosis, future tooth loss, and effects on growth.",
      evidence: [
        {
          source: "avulsion",
          pages: "3–6",
        },
      ],
    },
    diagram: {
      question: "Avulsion: primary or permanent?",
      branches: [
        {
          when: "Primary tooth",
          action: "Do not replant. Account for the missing tooth and monitor the successor.",
        },
        {
          when: "Permanent tooth",
          action:
            "Urgent replantation when appropriate; dry time, storage, and apex guide prognosis and follow-up.",
          children: [
            {
              when: "Closed apex",
              action: "Endodontic treatment generally within two weeks.",
            },
            {
              when: "Open apex",
              action: "May revascularize; intervene for definite necrosis or infection.",
            },
          ],
        },
      ],
      evidence: [
        {
          source: "primaryTrauma",
          pages: "12–13",
        },
        {
          source: "avulsion",
          pages: "2–6",
        },
      ],
    },
  },
  {
    id: "diagnosis",
    title: "Diagnosis, imaging & infection",
    shortTitle: "Diagnosis & infection",
    domainIds: ["diagnosis"],
    sessionIds: ["sat-review"],
    sourceIds: ["pathology", "radiographs", "antibiotics"],
    summary:
      "Describe the problem before labeling it. Choose the next investigation because it can change care, and separate localized dental disease from a spreading infection.",
    memoryCue: "Describe → differentiate → investigate → act → review.",
    points: [
      {
        text: "Describe location, size, appearance, symptoms, duration, and change. Give a focused differential and a defined review or referral plan.",
        evidence: [
          {
            source: "pathology",
            pages: "1–2",
          },
        ],
      },
      {
        text: "Radiographs follow the history, examination, caries risk, dentition, and diagnostic question. Age or insurance alone is not an indication; review existing images first.",
        evidence: [
          {
            source: "radiographs",
            pages: "2–3",
          },
        ],
      },
      {
        text: "Antibiotics are adjuncts when indicated. In an otherwise appropriate patient, localized pulpal infection without systemic signs needs dental source treatment, not a routine antibiotic prescription.",
        evidence: [
          {
            source: "antibiotics",
            pages: "3–4",
          },
        ],
      },
    ],
    decisions: [
      {
        question: "Observe a lesion or obtain a biopsy?",
        answer:
          "A likely self-limited lesion can be observed with a review date. Persistence beyond two weeks after removing a suspected cause or empiric care generally warrants biopsy/referral. Suspicious lesions merit earlier evaluation.",
        evidence: [
          {
            source: "pathology",
            pages: "2",
          },
        ],
      },
      {
        question: "When is CBCT justified?",
        answer:
          "When conventional views cannot answer a question that matters for diagnosis or treatment and benefit outweighs added radiation. Minimize the field/dose and arrange interpretation of the whole volume.",
        evidence: [
          {
            source: "radiographs",
            pages: "2, 4",
          },
        ],
      },
      {
        question: "Dental pain versus spreading facial infection?",
        answer:
          "Localized disease: provide definitive source care. Progressive swelling, fever, dysphagia, dyspnea, or other systemic/airway signs require urgent escalation, source control, and adjunctive antibiotics; severe cases need hospital-level care.",
        evidence: [
          {
            source: "antibiotics",
            pages: "3–4",
          },
        ],
      },
    ],
    pitfall: {
      text: "An antibiotic cannot replace drainage, pulp treatment, or extraction. Do not let a prescription delay airway assessment or definitive care.",
      evidence: [
        {
          source: "antibiotics",
          pages: "3–4",
        },
      ],
    },
    diagram: {
      question: "What finding changes the next step?",
      branches: [
        {
          when: "Typical self-limited lesion",
          action: "Supportive care and a defined review interval.",
        },
        {
          when: "Persistent or suspicious lesion",
          action: "Biopsy or specialist assessment.",
        },
        {
          when: "Systemic illness or airway concern",
          action: "Urgent medical/surgical escalation and source control.",
        },
      ],
      evidence: [
        {
          source: "pathology",
          pages: "2–4",
        },
        {
          source: "antibiotics",
          pages: "3–4",
        },
      ],
    },
  },
  {
    id: "behavior-sedation",
    title: "Behavior, sedation & emergency readiness",
    shortTitle: "Behavior & sedation",
    domainIds: ["behavior"],
    sessionIds: ["sun-mock", "sun-review"],
    sourceIds: ["behavior", "sedation", "emergencies"],
    summary:
      "Build cooperation through communication and pain control. When advanced support is needed, justify the technique, setting, consent, monitoring, and rescue plan.",
    memoryCue: "Connect → relieve pain → choose support → prepare to rescue.",
    points: [
      {
        text: "Assess development, communication, anxiety, pain, urgency, prior experience, and family goals. Use tailored communication, tell-show-do, praise, distraction, and sensory adaptations.",
        evidence: [
          {
            source: "behavior",
            pages: "1–9",
          },
        ],
      },
      {
        text: "Protective stabilization needs a defined indication, consent, monitoring, and the least restrictive safe method. It is never for convenience.",
        evidence: [
          {
            source: "behavior",
            pages: "10–11",
          },
        ],
      },
      {
        text: "Sedation can deepen unexpectedly. Evaluate health, airway, medications, fasting, and personnel; be able to rescue from a deeper level than intended.",
        evidence: [
          {
            source: "sedation",
            pages: "4–9",
          },
        ],
      },
      {
        text: "For an emergency, stop treatment, summon help/equipment, support airway and breathing, monitor, and activate EMS when indicated. Suspected anaphylaxis requires prompt IM epinephrine and EMS.",
        evidence: [
          {
            source: "emergencies",
            pages: "1–2",
          },
        ],
      },
    ],
    decisions: [
      {
        question: "Can treatment wait while the child builds coping skills?",
        answer:
          "Sometimes, for nonurgent disease with a documented risk-benefit plan and reassessment. Pain, infection, trauma, or progressing disease may require prompt care using another appropriate approach.",
        evidence: [
          {
            source: "behavior",
            pages: "5",
          },
        ],
      },
      {
        question: "Elective sedation: what are the minimum fasting intervals?",
        answer:
          "Clear liquids: 2 hours; human milk: 4; infant formula, nonhuman milk, and light meals: 6. Fatty meals may need longer. Urgent care requires individualized aspiration-risk and urgency assessment.",
        evidence: [
          {
            source: "sedation",
            pages: "4–5",
          },
        ],
      },
      {
        question: "How does deep sedation change the safety plan?",
        answer:
          "Use appropriately trained personnel with an independent observer, immediate rescue capability, and required physiologic/ventilation monitoring. The guideline’s personnel and monitoring table is the reference for the intended setting.",
        evidence: [
          {
            source: "sedation",
            pages: "8–9",
          },
        ],
      },
      {
        question: "When is the child ready for discharge?",
        answer:
          "Stable airway/cardiovascular status, age-appropriate responsiveness and function, and recovery to a safe baseline. Reversal agents and long-acting drugs can require longer observation; give written caregiver instructions.",
        evidence: [
          {
            source: "sedation",
            pages: "4, 7–8, 27",
          },
        ],
      },
    ],
    pitfall: {
      text: "Calling EMS does not replace immediate rescue skills. Reversal medication does not replace ventilation or continued recovery observation.",
      evidence: [
        {
          source: "sedation",
          pages: "2, 7–9",
        },
        {
          source: "emergencies",
          pages: "2",
        },
      ],
    },
    diagram: {
      question: "Rehearse the safety sequence",
      branches: [
        {
          when: "Before sedation",
          action: "Assess health/airway, fasting or urgent risk, consent, team, and equipment.",
        },
        {
          when: "During sedation",
          action: "Observe continuously, monitor to depth, and be ready to rescue.",
        },
        {
          when: "Recovery",
          action: "Monitor until discharge criteria are met; anticipate resedation.",
        },
      ],
      evidence: [
        {
          source: "sedation",
          pages: "4–9, 27",
        },
      ],
    },
  },
  {
    id: "growth",
    title: "Growth, eruption & space",
    shortTitle: "Growth & space",
    domainIds: ["growth"],
    sessionIds: ["sat-cases"],
    sourceIds: ["growth"],
    summary:
      "Timing is part of the treatment. Diagnose the developmental problem, explain whether intervention now helps, and plan review through growth.",
    memoryCue: "Stage → space → shift → sequence.",
    points: [
      {
        text: "Assess dentition stage, eruption, occlusion, habits, function, and targeted records.",
        evidence: [
          {
            source: "growth",
            pages: "1–3",
          },
        ],
      },
      {
        text: "Early diagnosis does not automatically require early treatment; consider self-correction, progression, cooperation, and expected benefit.",
        evidence: [
          {
            source: "growth",
            pages: "1–4",
          },
        ],
      },
    ],
    decisions: [
      {
        question: "A primary molar is lost early: automatic space maintainer?",
        answer:
          "No. Consider tooth/site, elapsed time, successor development, available space, occlusion, hygiene, cooperation, and follow-up.",
        evidence: [
          {
            source: "growth",
            pages: "8–10",
          },
        ],
      },
      {
        question: "What changes the crossbite plan?",
        answer:
          "Distinguish dental, functional, and skeletal causes. A functional shift may favor early correction; skeletal or asymmetric patterns need broader planning/referral.",
        evidence: [
          {
            source: "growth",
            pages: "10–11",
          },
        ],
      },
    ],
    pitfall: {
      text: "Name the objective and timing before the appliance. Include surveillance and referral criteria.",
      evidence: [
        {
          source: "growth",
          pages: "1–4, 10–11",
        },
      ],
    },
    diagram: {
      question: "Observe or intercept?",
      branches: [
        {
          when: "Likely self-correction; low consequence",
          action: "Monitor with a planned developmental reassessment.",
        },
        {
          when: "Functional shift, eruption interference, or space loss",
          action: "Assess stage-appropriate intervention and coordination.",
        },
      ],
      evidence: [
        {
          source: "growth",
          pages: "3–11",
        },
      ],
    },
  },
  {
    id: "access-special-needs",
    title: "The dental home & individualized access",
    shortTitle: "Access & special needs",
    domainIds: ["shcn", "advocacy"],
    sessionIds: ["sat-cases", "sun-mock"],
    sourceIds: ["home", "shcn"],
    summary:
      "Make the plan fit the patient’s abilities, medical needs, and access to care. Build continuity from the first dental home through the transition to adult services.",
    memoryCue: "Home by one. Adapt. Coordinate. Keep the handoff connected.",
    points: [
      {
        text: "Establish a dental home by 12 months: ongoing, individualized prevention, urgent care, and coordinated referral. Teledentistry supports access but does not replace that relationship.",
        evidence: [
          {
            source: "home",
            pages: "1–2",
          },
        ],
      },
      {
        text: "Ask about function, communication, sensory triggers, routines, and helpful accommodations. Adapt scheduling, staff, environment, prevention, and caregiver support.",
        evidence: [
          {
            source: "shcn",
            pages: "5–6",
          },
        ],
      },
      {
        text: "Review medical conditions, medications, interactions, airway risk, and procedural demands. Coordinate consultation or a higher-level setting when needed.",
        evidence: [
          {
            source: "shcn",
            pages: "5–6",
          },
        ],
      },
    ],
    decisions: [
      {
        question: "How do you avoid a diagnosis-label treatment plan?",
        answer:
          "Ask the patient and caregiver what works; assess actual capabilities and risks. Communication impairment does not establish intellectual disability. Tailor goals and assistance to the individual.",
        evidence: [
          {
            source: "shcn",
            pages: "5",
          },
        ],
      },
      {
        question: "Care exceeds your scope—or the patient needs adult care. What next?",
        answer:
          "Arrange a coordinated referral and confirm a receiving dental home. Maintain continuity and emergency access during transition; identify practical barriers to completing the handoff.",
        evidence: [
          {
            source: "home",
            pages: "2",
          },
          {
            source: "shcn",
            pages: "6",
          },
        ],
      },
    ],
    pitfall: {
      text: "A referral alone does not establish continuity. Plan how the patient will actually reach and receive the next service.",
      evidence: [
        {
          source: "home",
          pages: "2",
        },
        {
          source: "shcn",
          pages: "6",
        },
      ],
    },
  },
  {
    id: "practice-safety",
    title: "Consent, records & a safe practice",
    shortTitle: "Consent & safety",
    domainIds: ["practice"],
    sessionIds: ["sun-review"],
    sourceIds: ["consent", "records", "safety"],
    summary:
      "Make reasoning visible to the family, the record, and the team. Consent is a conversation, documentation preserves that conversation, and safety is a repeatable process.",
    memoryCue: "Discuss → check understanding → document → verify → learn.",
    points: [
      {
        text: "Verify the legally authorized decision maker. Explain diagnosis, proposed care, benefits, material risks, alternatives, and no treatment; seek the child’s assent when appropriate.",
        evidence: [
          {
            source: "consent",
            pages: "1–3",
          },
        ],
      },
      {
        text: "Update health information at each visit. Record findings, diagnosis, reasoning, consent/refusal, care, medications, complications, instructions, and follow-up; protect access and transfer.",
        evidence: [
          {
            source: "records",
            pages: "4, 6–9",
          },
        ],
      },
      {
        text: "Use two patient identifiers and a team time-out before invasive care. Confirm procedure and tooth/site, and assess fire risk from ignition, fuel, and oxidizer.",
        evidence: [
          {
            source: "safety",
            pages: "2–3",
          },
        ],
      },
    ],
    decisions: [
      {
        question: "The consent form is signed. Is that enough?",
        answer:
          "No. Confirm understanding and voluntary permission through discussion; use a qualified interpreter when needed. Revisit consent when the proposed procedure or risks change.",
        evidence: [
          {
            source: "consent",
            pages: "2–4",
          },
        ],
      },
      {
        question: "You discover an error in a clinical note. What do you do?",
        answer:
          "Keep the original legible. On paper, draw one line through the error and add initials/signature and date. In electronic records, add a separate correcting entry. Follow applicable access and retention requirements.",
        evidence: [
          {
            source: "records",
            pages: "9",
          },
        ],
      },
      {
        question: "A near miss occurs. How does the team respond?",
        answer:
          "Report and examine contributing causes in a fair, learning-focused culture, then improve the workflow. Include equipment, medication, communication, and emergency-readiness checks.",
        evidence: [
          {
            source: "safety",
            pages: "2–4",
          },
        ],
      },
    ],
    pitfall: {
      text: "A signature, template, or completed checklist cannot substitute for the discussion or safety action it is meant to record.",
      evidence: [
        {
          source: "consent",
          pages: "2–4",
        },
        {
          source: "records",
          pages: "6–8",
        },
        {
          source: "safety",
          pages: "3–4",
        },
      ],
    },
    diagram: {
      question: "Before an invasive procedure",
      branches: [
        {
          when: "Family & clinician",
          action: "Discuss options, understanding, permission, and appropriate assent.",
        },
        {
          when: "Whole team",
          action: "Verify two identifiers, procedure, tooth/site, and fire risk.",
        },
        {
          when: "Record & follow-up",
          action: "Document the decision, care, instructions, and next steps.",
        },
      ],
      evidence: [
        {
          source: "consent",
          pages: "2–3",
        },
        {
          source: "safety",
          pages: "3",
        },
        {
          source: "records",
          pages: "8",
        },
      ],
    },
  },
  {
    id: "exam-approach",
    title: "Turn knowledge into an oral answer",
    shortTitle: "OCE approach",
    domainIds: [],
    sessionIds: ["flight-study", "sun-recap", "mon-review"],
    sourceIds: ["oce-guide"],
    summary:
      "Practice retrieving a decision and explaining why it fits the case. Keep answers direct and organized so the examiner can follow your reasoning.",
    memoryCue: "Hear the question. Answer it. Explain why. Close the loop.",
    points: [
      {
        text: "The OCE uses two successive one-hour oral sessions with clinical vignettes and two examiners. Check-in and orientation extend the overall process.",
        evidence: [
          {
            source: "oce-guide",
            pages: "7",
          },
        ],
      },
      {
        text: "Role-play with colleagues and review across the blueprint. Independent scoring considers knowledge, reasoning, communication, and professionalism.",
        evidence: [
          {
            source: "oce-guide",
            pages: "8–16, 19, 21",
          },
        ],
      },
    ],
    decisions: [
      {
        question: "How should you rehearse a full care-plan answer?",
        answer:
          "Use this original cue: findings → diagnosis → options → recommendation → follow-up. For a focused question, answer that part first; the cue is not an official required script.",
        evidence: [
          {
            source: "oce-guide",
            pages: "8–16, 21",
          },
        ],
      },
      {
        question: "What should you remember for exam day?",
        answer:
          "Bring government photo ID and follow current candidate instructions for arrival, orientation, prohibited items, and exam conduct.",
        evidence: [
          {
            source: "oce-guide",
            pages: "7, 18, 20",
          },
        ],
      },
    ],
    pitfall: {
      text: "Avoid stalling or listing facts without reasoning. Practice moving through every skillset within the available time.",
      evidence: [
        {
          source: "oce-guide",
          pages: "21",
        },
      ],
    },
  },
];
