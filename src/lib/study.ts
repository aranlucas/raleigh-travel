export type StudyResource = Readonly<{ label: string; href: string; note?: string }>;
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
  {
    label: "Historical outcomes · PDF",
    href: "https://www.abpd.org/index.php/download_file/view/1029/276",
    note: "ABPD’s published examination outcomes, linked from the OCE overview.",
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
  emergencies: reference("Medical emergencies · revised 2025", "management-of-medical-emergencies"),
  pain: reference(
    "Acute pain management · revised 2026",
    "pain-management-in-infants-children-adolescents-and-individuals-with-special-health-care-needs",
  ),
  abuse: reference(
    "Child abuse & neglect policy · new 2026",
    "emergency-oral-care-for-infants-children-adolescents-and-individuals-with-special-health-care-needs2",
  ),
  prophylaxis: reference(
    "Antibiotic prophylaxis · revised 2026",
    "antibiotic-prophylaxis-for-dental-patients-at-risk-for-infection",
  ),
  consent: reference("Informed consent", "informed-consent"),
  records: reference("Recordkeeping · revised 2026", "record-keeping"),
  safety: reference("Patient safety", "patient-safety"),
};

export type TaskLevel = "Understand/Apply" | "Analyze/Evaluate";
export type BlueprintTask = Readonly<{ text: string; level: TaskLevel }>;
const apply = (text: string): BlueprintTask => ({ text, level: "Understand/Apply" });
const analyze = (text: string): BlueprintTask => ({ text, level: "Analyze/Evaluate" });

export type Domain = {
  id: string;
  title: string;
  /** The domain name as ABPD's blueprint prints it. */
  blueprintTitle: string;
  /** Every task statement in the ABPD blueprint (checked September 23, 2026). */
  tasks: readonly BlueprintTask[];
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
    blueprintTitle:
      "Dental Caries Diagnosis, Non-Restorative Caries Management & Restorative Treatment",
    tasks: [
      analyze("Detect caries lesions and determine diagnostic techniques"),
      analyze("Diagnose caries through visual, tactile, and radiographic techniques"),
      analyze(
        "Develop and implement a systematic approach to assess caries progression, arrest, or remineralization for primary or permanent teeth",
      ),
      apply("Perform non-operative caries management/treatment in primary and permanent dentition"),
      apply("Recognize indications for and apply sealants for primary and permanent teeth"),
      apply(
        "Manage minimally invasive restorative treatment for primary and permanent teeth and prescribe a follow-up reassessment plan",
      ),
      apply(
        "Excavate deep caries (partial or complete removal) in primary and permanent teeth (indirect pulp treatment)",
      ),
      apply(
        "Manage enamel erosion with preventive and restorative techniques for primary and permanent teeth",
      ),
      apply("Manage esthetic concerns in the primary and permanent dentition"),
      apply("Manage hypoplastic and hypomineralized teeth in primary and permanent dentition"),
      apply("Restore primary and permanent teeth with amalgam"),
      apply("Restore primary and permanent teeth with composite"),
      apply("Restore primary and permanent teeth with glass ionomer"),
      apply("Restore primary and permanent teeth with stainless steel crowns"),
      apply("Restore primary and permanent incisors with composite crowns"),
      apply("Restore primary incisors, canines, and molars with zirconia crowns"),
      analyze(
        "Identify the indications for prosthetic therapy in the primary and permanent dentition",
      ),
    ],
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
    blueprintTitle: "Oral Facial Injury, Emergency Care & Oral Surgery",
    tasks: [
      analyze("Assess and evaluate oral facial injuries, dental pain, and infections"),
      analyze(
        "Evaluate, diagnose, and manage/treat dentoalveolar trauma, including maxillary and mandibular jaw fractures",
      ),
      analyze(
        "Evaluate, diagnose, and manage/treat the pulpal, periodontal, and associated soft and hard tissues following traumatic injury",
      ),
      apply("Evaluate and manage non-accidental trauma due to child abuse or neglect"),
      apply("Explain prognosis, potential sequelae, and the importance of continued care"),
      apply("Recognize and manage a soft tissue lesion"),
      apply("Extract teeth"),
      apply("Suture soft tissue following extraction or intraoral laceration"),
      apply("Manage a supernumerary tooth"),
      apply("Manage missing teeth in mixed and immature permanent dentition"),
      apply("Recognize indications for and discuss autotransplantation"),
      apply("Recognize indications for and manage decoronation of a tooth"),
      apply("Recognize indications for and discuss implant therapy"),
      apply("Management of third molars"),
      analyze("Manage adverse events and medical emergencies"),
    ],
    weight: 16,
    checkpoint: "Name the injury precisely; plan beyond the first visit.",
    essentials: [
      "Begin with the history, medical stability, associated injuries, examination, and appropriate imaging. Distinguish primary from permanent dentition and describe root development.",
      "For each injury, use the relevant IADT pathway. Rehearse immediate care, treatment alternatives, prognosis, complications, and the injury-specific follow-up schedule from the source tables.",
      "Broaden the review to extractions, soft-tissue injuries, supernumeraries, and referral decisions. Practice how you would document an inconsistent injury history.",
      "The new 2026 child abuse and neglect policy: document the type, character, and location of injuries and lesions; refer bite injuries to a hospital for prompt evaluation; know your consulting child abuse team; dentists are mandated reporters.",
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
      readings.abuse,
      readings.emergencies,
    ],
  },
  {
    id: "behavior",
    title: "Behavior & pain guidance",
    blueprintTitle: "Behavior Guidance",
    tasks: [
      analyze("Assess a patient’s physical, psychological, and social development"),
      analyze("Assess a patient’s temperament and cooperation potential"),
      apply("Recommend a behavior guidance approach based on patient assessment"),
      apply(
        "Communicate with the patient and guardian about development assessment and behavior guidance recommendations",
      ),
      analyze("Evaluate pharmacologic options based on indications and contraindications"),
      apply(
        "Communicate risks and benefits of pharmacologic behavior guidance, including pre- and post-instructions",
      ),
      apply("Provide non-pharmacologic behavior guidance"),
      apply("Administer nitrous oxide analgesia, monitor, and manage adverse events"),
      apply(
        "Provide care for patients under moderate or deep sedation (general anesthesia), monitor, and manage/follow protocol for adverse events",
      ),
      analyze("Prevent, assess, and manage patient pain"),
    ],
    weight: 14,
    checkpoint: "Fit the approach to this child and this treatment need.",
    essentials: [
      "Assess development, temperament, prior experiences, pain, urgency, medical history, and caregiver expectations. Describe a specific communication approach before discussing escalation.",
      "Explain the goals, limitations, alternatives, and consent for the proposed technique. Consider sensory adaptations and whether deferring treatment is an appropriate option.",
      "If considering pharmacologic care, justify the setting and patient selection. Review monitoring, rescue capability, recovery, and discharge requirements in the sedation guideline.",
      "Pain is its own blueprint task. The 2026 pain guideline makes NSAIDs first-line (acetaminophen when NSAIDs are contraindicated), supports combining them when one is not enough, and says to limit or avoid opioids; the FDA warns against codeine and tramadol under 12.",
    ],
    prompt:
      "A frightened preschooler refuses examination and has treatment needs. Explain your first visit to the caregiver without promising an outcome.",
    challenge:
      "The caregiver requests sedation immediately. Explain the assessment and discussion needed before agreeing to a plan.",
    resources: [readings.behavior, readings.sedation, readings.pain, readings.consent],
  },
  {
    id: "diagnosis",
    title: "Diagnosis, pathology & imaging",
    blueprintTitle: "Diagnosis, Oral Pathology, Oral Radiology & Oral Medicine",
    tasks: [
      analyze(
        "Recognize the normal appearance of the oral cavity (predentate, primary, mixed, and permanent dentition)",
      ),
      analyze("Diagnose, manage, and explain common pediatric oral/facial anomalies"),
      analyze("Diagnose, manage, and explain common pediatric oral/facial pathological conditions"),
      apply("Evaluate, diagnose, and manage dental attrition"),
      apply("Develop a radiographic survey plan based upon patient assessment"),
      apply("Interpret radiographic images and correct errors"),
      apply("Identify the need for antibiotic therapy and prescribe antibiotics"),
      apply(
        "Identify indications and options for referral to medical and dental specialists; communicate reasons and risks to the family",
      ),
      apply("Identify risk factors for, diagnose, and classify gingival and periodontal disease"),
      apply("Manage gingival and periodontal disease non-surgically"),
      apply(
        "Identify the need for surgical treatment of gingival and periodontal disease and refer",
      ),
      apply("Evaluate and diagnose TMJ disorders, treat, and refer cases beyond scope"),
    ],
    weight: 10,
    checkpoint: "Describe first. Build and test a differential.",
    essentials: [
      "Record a lesion’s location, appearance, symptoms, duration, and change over time. Combine medical and dental histories with a complete tissue examination.",
      "Give a working diagnosis and a focused differential, then say what evidence would distinguish them. Explain when observation, additional investigation, biopsy, or referral is warranted.",
      "Justify imaging for the clinical question. Also revisit antibiotics, periodontal findings, and TMJ complaints using the relevant manual chapters rather than a routine one-size-fits-all plan.",
      "Separate treatment from prophylaxis. The 2026 prophylaxis guideline limits endocarditis prophylaxis to the highest-risk cardiac conditions, given as a single dose 30–60 minutes before the procedure; it no longer recommends clindamycin or routine prophylaxis for prosthetic joints.",
    ],
    prompt:
      "A child has a persistent oral lesion found incidentally. Present your differential and the next information you need.",
    challenge:
      "The parent wants reassurance without further evaluation. Explain your uncertainty and your follow-up or referral plan clearly.",
    resources: [
      readings.pathology,
      readings.radiographs,
      readings.antibiotics,
      readings.prophylaxis,
    ],
  },
  {
    id: "prevention",
    title: "Prevention & health promotion",
    blueprintTitle: "Prevention & Health Promotion",
    tasks: [
      apply("Evaluate patient medical history"),
      apply("Conduct a comprehensive oral examination"),
      analyze("Evaluate risk for caries, periodontal disease, and trauma"),
      analyze(
        "Formulate an individual prevention plan based on medical and dental history, radiographs, and assessments",
      ),
      analyze("Explain exam findings, risks, and recommendations to patients and guardians"),
      apply("Use behavior change and communication strategies to motivate change"),
      apply("Provide oral hygiene instructions and recommendations"),
      apply("Provide diet counseling"),
      apply("Complete oral prophylaxis/scaling/removal of plaque and calculus"),
      analyze("Recommend fluoride type and treatment modality"),
      apply("Establish recall/recare visits based on patient needs"),
      apply("Identify and classify enamel erosion and determine the etiology"),
    ],
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
    blueprintTitle: "Growth & Development",
    tasks: [
      apply("Identify dentofacial growth patterns"),
      apply("Determine the presence of a dental, skeletal, or functional abnormality"),
      analyze(
        "Recognize abnormal child development and refer to medical specialists as needed (speech therapy, ENT)",
      ),
      apply(
        "Determine the need for, and interpret, a panoramic radiograph to assess growth and development",
      ),
      apply(
        "Diagnose and manage the developing dentition (dental, skeletal, and functional abnormalities)",
      ),
      apply("Determine the need for and provide a space maintenance appliance"),
      apply("Identify the indications and mechanisms of interceptive appliances"),
      apply("Provide early or interceptive orthodontic treatment (Phase 1)"),
      apply("Perform a facial analysis"),
      apply("Perform an occlusal analysis"),
      analyze("Determine the need for, and interpret, a cephalometric analysis"),
      analyze("Evaluate orthodontic records, including occlusal and model analysis"),
    ],
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
    blueprintTitle: "Pulp Therapy",
    tasks: [
      analyze(
        "Recognize, assess, diagnose, and explain pulpal pathology of primary and permanent teeth",
      ),
      apply("Vital pulp therapy in primary anterior teeth and molars: indications and technique"),
      apply(
        "Non-vital pulp therapy in primary anterior teeth and molars: indications and technique",
      ),
      apply(
        "Vital pulp therapy in permanent anterior and posterior teeth: indications and technique",
      ),
      apply("Non-vital pulp therapy in permanent anterior teeth: indications and technique"),
      apply("Non-vital pulp therapy in permanent posterior teeth: indications and techniques"),
      apply("Apexogenesis: indications and technique"),
      apply("Apexification: indications and techniques"),
      apply("Regenerative endodontics: indications and techniques"),
    ],
    weight: 8,
    checkpoint: "Diagnosis, dentition, restorability—then treatment.",
    essentials: [
      "Integrate symptoms, clinical findings, and radiographs to assess pulp status. Identify whether the tooth is primary or permanent and whether root development is complete.",
      "Compare appropriate vital and nonvital options, extraction, and referral in context. Discuss the tooth’s value, restorability, alternatives, and expected outcome.",
      "Read the 2026 best practice alongside the dedicated 2024 primary and 2025 permanent vital-pulp guidelines. Selected primary and permanent teeth with signs of irreversible pulpitis may receive pulpotomy without clinical or radiographic infection; use the full selection criteria, including bleeding control.",
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
    blueprintTitle: "Special Health Care Needs",
    tasks: [
      analyze(
        "Recognize congenital or acquired special health care needs and the challenges they create for dental care",
      ),
      apply(
        "Identify and manage common oral manifestations associated with special health care needs",
      ),
      apply(
        "Explain the relationship between oral and general health to patients, guardians, or medical providers",
      ),
      analyze("Modify the treatment modality based on special health care needs"),
      apply("Discuss the impact on oral health and growth, including alternative treatment goals"),
      apply(
        "Guide families on preventing oral disease and minimizing the oral impact of the condition",
      ),
      analyze("Identify patients who need an interdisciplinary team and coordinate their care"),
    ],
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
    blueprintTitle: "Elements of Pediatric Dental Practice",
    tasks: [
      apply("Practice in a professional and ethical manner"),
      apply(
        "Employ infection control and safety practices that follow professional guidelines and regulations",
      ),
      apply(
        "Develop and follow clinical practice protocols: safety, technology, privacy, licensing, malpractice, billing, security",
      ),
      apply("Develop and follow teledentistry protocols covering the same areas"),
      apply("Maintain privacy of protected health information according to HIPAA"),
      analyze("Continually evaluate the practice for adherence to professional standards"),
      analyze("Evaluate research articles for application to clinical practice"),
    ],
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
    blueprintTitle: "Advocacy & Education",
    tasks: [
      apply("Maintain social and cultural awareness during patient care"),
      apply("Explain the importance of the dental home and early pediatric care"),
      apply(
        "Advocate for needed care and refer families to social support and community oral health programs",
      ),
      apply(
        "Participate in organized dentistry’s advocacy for children’s oral health policy, legislation, and regulation",
      ),
    ],
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

/**
 * An original practice vignette for a step. The checklist restates points from the
 * theme notes; it is a self-check, not an ABPD answer key.
 */
export type PracticeCase = Readonly<{
  scenario: string;
  cover: readonly string[];
  twist?: string;
  themeId: string;
}>;
export type PracticeStep = Readonly<{ minutes: number; task: string; case?: PracticeCase }>;

export type PracticeBlock = Readonly<{
  id: string;
  day: string;
  time: string;
  minutes: number;
  title: string;
  purpose: string;
  steps: readonly PracticeStep[];
  domains: readonly string[];
  resources: readonly StudyResource[];
  finish: string;
}>;
export const practiceBlocks: PracticeBlock[] = [
  {
    id: "flight-study",
    day: "Friday · optional",
    time: "During the flight",
    minutes: 30,
    title: "Flight review (optional)",
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
        task: "Outline answers to Saturday’s caries and trauma cases, no notes, then close the laptop.",
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
    title: "Caries, prevention, and growth cases",
    purpose: "Connect caries decisions to prevention, development, and a plan the family can use.",
    steps: [
      {
        minutes: 15,
        task: "Refresh risk-based prevention using familiar notes and the care pathway.",
      },
      {
        minutes: 30,
        task: "Caries case: defend your options and the restoration you choose.",
        case: {
          scenario:
            "A 4-year-old has cavitated lesions on four primary molars. Two are deep and close to the pulp but symptom-free. Juice several times a day; cooperation is limited.",
          cover: [
            "Caries risk: disease indicators, risk factors (diet, hygiene), and protective factors",
            "Pulp status of the deep lesions from history, exam, and radiographs before choosing a restoration",
            "Options: arrest (SDF), interim restorations, or definitive care, and why",
            "Extensive multisurface lesions in a high-risk child often favor stainless steel crowns",
            "Setting: in the chair versus general anesthesia, justified by extent and cooperation",
            "Prevention the family can keep up: fluoride toothpaste twice daily, varnish, fewer sugary drinks, risk-based recall",
          ],
          twist:
            "The parent can only return twice this year. What changes, and what stays the same?",
          themeId: "caries-prevention",
        },
      },
      {
        minutes: 20,
        task: "Early tooth loss case.",
        case: {
          scenario:
            "A 7-year-old had a lower primary first molar extracted for caries two months ago. The permanent first molars have erupted.",
          cover: [
            "Records: time since loss, whether the successor is present, its root development and bone cover, space available",
            "Occlusion and arch-length context; is space already being lost?",
            "Whether a space maintainer is indicated, and which design, versus monitoring",
            "Caries risk and hygiene, since an appliance adds plaque traps",
            "Follow-up plan and when to remove the appliance",
          ],
          twist:
            "The radiograph shows the successor is congenitally missing. How do the records, plan, and referral change?",
          themeId: "growth",
        },
      },
      {
        minutes: 15,
        task: "Explain prevention and access to care to a study partner acting as the caregiver.",
        case: {
          scenario:
            "The parent of the 4-year-old asks why diet changes and varnish matter if the cavities are being filled anyway.",
          cover: [
            "Plain language: fillings fix holes, but not the process causing them",
            "Agree on one or two changes the family can actually make",
            "Ask the parent to say the plan back in their own words",
            "The dental home: when the next visit is and who to call with a problem",
          ],
          twist: "The parent says, “Baby teeth fall out anyway.” How do you respond?",
          themeId: "access-special-needs",
        },
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
    title: "Trauma, pulp, and diagnosis decisions",
    purpose: "Work through trauma, pulpal decisions, and a diagnostic differential out loud.",
    steps: [
      {
        minutes: 30,
        task: "Trauma case, then the primary-tooth version.",
        case: {
          scenario:
            "An 8-year-old fell off a bike an hour ago. The upper right permanent central incisor is displaced palatally and locked firm. No loss of consciousness.",
          cover: [
            "Screen first: head injury, other injuries, tetanus status, whether the story fits the injury",
            "Exam and radiographs from more than one angle; note root development",
            "Diagnosis: lateral luxation. Reposition, then a flexible splint for the IADT duration",
            "Immature apex: the pulp may revascularize, so monitor rather than treat right away",
            "Follow-up schedule, and the signs of necrosis or resorption to watch for",
          ],
          twist:
            "Now it is a 3-year-old with an intruded primary incisor. Why can’t you reuse the plan?",
          themeId: "trauma-surgery",
        },
      },
      {
        minutes: 25,
        task: "Two pulp cases side by side: primary versus permanent.",
        case: {
          scenario:
            "Two deep carious molars: (a) a 6-year-old’s lower primary second molar with brief pain to cold, no swelling; (b) a 9-year-old’s lower permanent first molar with spontaneous pain and a normal periapex.",
          cover: [
            "Pulp diagnosis for each from symptoms, exam, and radiographs",
            "(a) Reversible pulpitis: selective removal or indirect pulp treatment, or a calcium-silicate pulpotomy",
            "(b) Spontaneous pain does not rule out vital pulp therapy; full pulpotomy if bleeding is controlled",
            "A sealed final restoration (often a crown on the primary molar)",
            "Radiographic follow-up and what failure looks like",
          ],
          twist:
            "(a) now has a draining sinus tract and a furcation radiolucency. What are your options?",
          themeId: "pulp",
        },
      },
      {
        minutes: 20,
        task: "Oral lesion: describe it, build a differential, decide next steps.",
        case: {
          scenario:
            "A 10-year-old has a painless, bluish, fluctuant swelling on the lower lip that has come and gone for three weeks. They bite their lip.",
          cover: [
            "Describe it: site, size, color, consistency, duration, changes over time",
            "Differential: mucocele first; vascular lesion; less likely a salivary gland tumor",
            "Management: excise with the associated minor salivary glands and send for histopathology",
            "When to refer, and the follow-up interval",
          ],
          twist:
            "The same kind of swelling is in the floor of the mouth. What is it likely to be, and who manages it?",
          themeId: "diagnosis",
        },
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
    title: "Mock cases: behavior and special needs",
    purpose:
      "Use original practice prompts to connect behavior guidance and complex patient needs.",
    steps: [
      {
        minutes: 10,
        task: "Reread the communication tips or watch part of a mock video.",
      },
      {
        minutes: 30,
        task: "Behavior-guidance case. No notes.",
        case: {
          scenario:
            "A 3-year-old at a first visit cries and refuses the exam. The mother is anxious. Early childhood caries on the upper incisors; no pain or swelling.",
          cover: [
            "Assess development, temperament, past experiences, and the parent’s expectations",
            "Start with communication: tell-show-do, positive reinforcement, distraction; knee-to-knee exam",
            "Urgency sets the timing: no pain or infection, so prevention and arrest can come first",
            "If treatment is needed without cooperation: protective stabilization, nitrous oxide, sedation, or general anesthesia, with the risks, benefits, and alternatives of each",
            "Informed consent and documentation of what was discussed",
          ],
          twist:
            "The mother asks for sedation right away. What do you assess and discuss before agreeing?",
          themeId: "behavior-sedation",
        },
      },
      {
        minutes: 30,
        task: "Special health care needs case, then the change in circumstances.",
        case: {
          scenario:
            "A 14-year-old with autism and epilepsy (on phenytoin) is minimally verbal and sensitive to light and noise. Poor hygiene, gingival overgrowth, and several carious lesions.",
          cover: [
            "Ask the caregiver what has worked: communication, triggers, routines",
            "Adapt the visit: first appointment of the day, a quiet room, dim lights, desensitization visits",
            "Medical review: seizure control and medications; phenytoin-related gingival overgrowth; consult the neurologist",
            "Setting: in-office care versus comprehensive care under general anesthesia",
            "Prevention the caregiver can deliver at home",
          ],
          twist:
            "The family moves next year, and the patient turns 18 soon after. How do you plan the transition to adult care?",
          themeId: "access-special-needs",
        },
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
    title: "Sedation, emergencies, and 2026 updates",
    purpose:
      "Close familiar gaps in sedation, emergencies, and professional practice, and catch the 2026 manual updates.",
    steps: [
      {
        minutes: 15,
        task: "Sedation case: selection through discharge.",
        case: {
          scenario:
            "A healthy 4-year-old needs four restorations, and the parent asks for oral sedation.",
          cover: [
            "Selection: health status, airway, snoring or sleep apnea, and whether sedation fits the treatment",
            "Fasting (2 h clear liquids, 4 h breast milk, 6 h formula, milk, or a light meal), consent, and written instructions",
            "Staffing and monitoring for the intended depth; be able to rescue from a deeper level",
            "Recovery and discharge criteria",
          ],
          twist: "The child starts snoring, then desaturates. What do you do, in order?",
          themeId: "behavior-sedation",
        },
      },
      {
        minutes: 10,
        task: "Emergency case. Verify exact protocols against the AAPD resource and your BLS/PALS training.",
        case: {
          scenario:
            "During a local anesthetic injection, a 10-year-old becomes pale, sweaty, and lightheaded.",
          cover: [
            "Stop treatment, call for help, check airway, breathing, and circulation",
            "Differential: vasovagal syncope, hypoglycemia, a drug reaction",
            "Position the patient, give oxygen, take vital signs, call EMS if the patient does not recover",
          ],
          twist: "Hives and wheezing appear. What changes?",
          themeId: "behavior-sedation",
        },
      },
      {
        minutes: 10,
        task: "Skim what changed in 2026: acute pain, antibiotic prophylaxis, and the new child abuse policy.",
      },
      {
        minutes: 10,
        task: "Consent and documentation case.",
        case: {
          scenario: "After extractions, a parent says they never agreed to them.",
          cover: [
            "Respond calmly and listen; do not argue",
            "Review the record: the discussion, alternatives offered, and who gave consent",
            "Document the conversation; any correction is a new, dated entry",
            "Next steps: offer a follow-up conversation and review your consent process",
          ],
          themeId: "practice-safety",
        },
      },
    ],
    domains: ["practice"],
    resources: [
      readings.sedation,
      readings.emergencies,
      readings.pain,
      readings.prophylaxis,
      readings.abuse,
    ],
    finish:
      "Write down any exact thresholds or calculations you need to verify. Do not rely on recalled medication doses.",
  },
  {
    id: "sun-recap",
    day: "Sunday",
    time: "4:30–5:00 PM",
    minutes: 30,
    title: "Final recap",
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
    title: "Exam-morning warm-up",
    purpose: "Stay with familiar material and protect the rest of the morning.",
    steps: [
      { minutes: 10, task: "Read your recap sheet once." },
      {
        minutes: 15,
        task: "Answer Saturday’s caries case aloud, then its “change one thing” follow-up.",
      },
      {
        minutes: 15,
        task: "Answer Sunday’s behavior case the same way. Keep it focused.",
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

export const answerFramework = "Findings → diagnosis → options → recommendation → follow-up";

/** Facts from ABPD's OCE pages and candidate guide (updated February 2026), checked September 23, 2026. */
export const examFacts: readonly Readonly<{ label: string; value: string }>[] = [
  {
    label: "Format",
    value: "Two successive one-hour segments, two examiners each, clinical vignettes",
  },
  {
    label: "Segment length",
    value: "At least 1 hour and up to 1 hour 15 minutes, with a short restroom break between",
  },
  {
    label: "Total time",
    value: "About four hours with registration (~20 min), orientation, and a restroom break",
  },
  { label: "Questions", value: "Open-ended, in English; examiners do not give feedback" },
  { label: "Scoring", value: "Each examiner scores independently, 1–3 per task" },
  { label: "Results", value: "Pass/fail, on the ABPD website within 8 weeks" },
];

export const examDayRules: readonly string[] = [
  "Bring a valid government-issued photo ID to registration.",
  "Small items (phone, keys, wallet, watch, small purse) go in a locker and cannot be accessed during breaks.",
  "No phones, smartwatches, notes, or bags in the exam room. Larger items are not permitted at registration; leave them at the hotel.",
  "A light snack, such as a granola bar, is available in the exam room.",
  "Examinations may be monitored for examiner training; they are not recorded.",
];
