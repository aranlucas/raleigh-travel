import type { DecisionMap } from "./study-themes";

export const themeDiagrams: Readonly<Record<string, readonly DecisionMap[]>> = {
  "caries-prevention": [
    {
      question: "Caries risk level → which care pathway?",
      branches: [
        {
          when: "Low risk",
          action:
            "Surveillance only; recall every 6–12 mo, fluoridated water, twice-daily F toothpaste.",
          criteria: [
            "Protective factors dominate: optimally fluoridated water (0–5 y: or F supplements)",
            "Teeth brushed daily with fluoridated toothpaste",
            "Topical F from a health professional; dental home/regular dental care",
          ],
          details: [
            "Radiographs every 12–24 months",
            "F: drink optimally fluoridated water + brush twice daily with F toothpaste",
            "Dietary counseling: yes; sealants: yes",
            "Surveillance = periodic monitoring for signs of caries progression",
          ],
          followUp: "Recall every 6–12 months",
        },
        {
          when: "Moderate risk",
          action:
            "Active surveillance of white spots, restore cavitated/enlarging lesions, professional F every 6 mo.",
          criteria: [
            "Recent immigrant",
            "Special health care needs (may choose different level by diagnosis)",
            "≥6 y: hyposalivatory medication, intraoral appliance, defective restorations",
          ],
          details: [
            "Radiographs every 6–12 months",
            "Optimally fluoridated water, or F supplements if water supply is F-deficient",
            "Twice-daily brushing with fluoridated toothpaste",
            "Professional topical fluoride treatment every 6 months",
            "Active surveillance = parents + professionals reduce cariogenic environment",
          ],
          followUp: "Recall every 6 months",
        },
        {
          when: "High risk",
          action:
            "Recall every 3 mo, professional F every 3 mo, SDF on cavitated lesions, ITR until definitive care.",
          criteria: [
            "0–5 y: caregiver has active caries; sugary bottle/nonspill cup between meals/bed",
            "Between-meal sugary snacks/drinks >3×/day; poverty, low health literacy",
            "Visible plaque, enamel defects; ≥6 y: low salivary flow",
            "Disease indicators: white spots, visible/cavitated or interproximal lesions",
            "Recent restorations (≥6 y: last 3 y new pt / last 12 mo pt of record)",
          ],
          details: [
            "Radiographs every 6 months",
            "Active surveillance of white spots; restore cavitated or enlarging lesions",
            "38% SDF on cavitated lesions; consent highlighting expected staining",
            "ITR may be used until permanent restorations can be placed",
            "≥6 y: brushing with 0.5% F gel/paste (0–5 y: twice-daily F toothpaste)",
          ],
          followUp: "Recall every 3 months",
        },
        {
          when: "Every risk level",
          tone: "always",
          action:
            "Diet counseling + sealants at every level; assign risk by preponderance of factors + judgment.",
          details: [
            "Toothpaste: smear <3 y; pea-size 3–5 y and at 6 y; parent-supervised",
            "Seal primary/permanent molars based on individual- and tooth-level risk",
            "Low risk: expert opinion favors sealing permanent teeth despite cost/benefit",
            "Clinical judgment may weight one factor (eg, heavy plaque) more than others",
            "CRA = routine part of new and periodic exams (forms: 0–5 y and ≥6 y)",
          ],
        },
      ],
      evidence: [{ source: "risk", pages: "1–5" }],
    },
    {
      question: "Lesion found → arrest, interim, or restore?",
      branches: [
        {
          when: "Noncavitated / white spot lesion",
          action:
            "Active surveillance with preventive therapy; not every caries lesion requires restoration.",
          criteria: [
            "Incipient/white spot lesion without visual enamel cavitation",
            "No enamel shadowing or radiographic enlargement over time",
          ],
          details: [
            "ICDAS 2 enamel lesions can be arrested with semiannual 5% NaFV",
            "Resin infiltration: adjunct for small noncavitated interproximal lesions",
            "ADA conditionally recommends enamel infiltration (low–very low certainty)",
            "Resin infiltration also improves clinical appearance of white-spot lesions",
          ],
          followUp: "Monitor for arrest vs progression; restore if cavitated or enlarging",
        },
        {
          when: "Cavitated; definitive care limited/deferred",
          action:
            "Arrest with 38% SDF and/or control with ITR until definitive restoration is feasible.",
          criteria: [
            "Access to definitive restorative care limited or preferentially postponed",
            "Very young, uncooperative, or special health care needs",
            "Multiple open lesions needing caries control before definitive restoration",
          ],
          details: [
            "38% SDF (5% F, 44,800 ppm F); less than a drop treats several lesions",
            "Arrest 35–80% (conditional recs); biannual SDF beats F varnish in dentin",
            "Consent: lesions stain black; skin/gingiva stain temporarily",
            "SDF cytotoxic to pulp cells if applied directly on pulp tissue",
            "ITR/ART: high-viscosity GIC as single-surface temporary restoration",
          ],
          followUp: "SDF best used within an ongoing caries plan in a dental home",
        },
        {
          when: "Cavitated/enlarging, restorable",
          action:
            "Restore; choose material by tooth, lesion size/surfaces, isolation, cooperation, caries risk.",
          criteria: [
            "Visual enamel cavitation or visual shadowing of enamel",
            "Radiographic enlargement of lesion over time",
            "Primary teeth: weigh time until exfoliation",
          ],
          children: [
            {
              when: "Class I/II primary molar, small–moderate",
              action:
                "Composite, amalgam, compomer, or RMGIC; composite may not suit poor isolation or cooperation.",
              details: [
                "Composite: not ideal for large multisurface or high-risk, poor-OH patients",
                "Amalgam Class II: prep not beyond proximal line angles; review risks",
                "RMGIC: small–moderate Class II (expert opinion); consider if high risk",
                "Conventional GIC: Class I only; not recommended for Class II primary molars",
              ],
            },
            {
              when: "Large/multisurface primary molar, high risk",
              action:
                "SSC, especially when advanced behavior guidance or GA is needed for restorative care.",
              criteria: [
                "Large or multisurface cavitated or noncavitated lesions",
                "Interproximal caries beyond line angles; bruxism",
                "After pulpotomy/pulpectomy; space-maintainer abutment",
              ],
              details: [
                "Full coverage: combats recurrent caries, durable, minimal maintenance",
                "5-y failure, Class II amalgam vs PMC: 26% vs 7% (retrospective)",
                "May be considered for multisurface caries <4 y to avoid retreatment",
                "Zirconia may replace SSC for esthetics; more reduction, ≥2 mm abutment",
              ],
            },
            {
              when: "SSC indicated but prep not feasible",
              action:
                "Hall technique: cement SSC with no local anesthetic, caries removal, or tooth preparation.",
              criteria: ["Poor cooperation or barriers to care"],
              details: [
                "Sealed bacteria denied substrate die; crown gives the marginal seal",
                "May need separator bands; child bites crown into place",
                "Outperformed GDs’ standard restorations interproximally (split-mouth RCT)",
                "More research vs traditionally placed PMC needed",
              ],
            },
            {
              when: "Primary incisors",
              action:
                "Class III/V: resin if isolable, else RMGIC/GIC; full coronal crowns for extensive or high-risk cases.",
              details: [
                "Full coronal if multisurface, incisal edge, extensive cervical decalcification",
                "…or pulp therapy needed, very poor OH, or behavior prevents moisture control",
                "Crowns: strip (80% retained at 3 y), preveneered/open-faced SSC, zirconia",
                "Zirconia: 1.5–2 mm reduction with feather margin; survival 93/85/76% 1/2/3 y",
              ],
            },
            {
              when: "Permanent teeth",
              action:
                "Composite or amalgam for Class I/II; PMC may be semi-permanent for gross caries/severe defects.",
              details: [
                "GIC/RMGIC: insufficient evidence as long-term material in permanent teeth",
                "Class II: amalgam and composite mean annual failure both 2.3%",
                "Composite: more replacement at 7–10 y; secondary caries 3.5× amalgam",
                "Posterior permanent SSCs can be expected to last 10 years",
              ],
            },
          ],
        },
        {
          when: "Deep lesion, normal pulp/reversible pulpitis",
          action:
            "Consider incomplete removal (partial 1-step or stepwise 2-step) when complete removal risks exposure.",
          criteria: [
            "Deep caries with normal pulp or reversible pulpitis",
            "Complete caries removal likely to result in pulp exposure",
          ],
          details: [
            "Fewer pulp exposures and pulpal signs/symptoms than complete excavation",
            "Permanent teeth: restoration failure no higher than complete excavation",
            "Partial > stepwise for pulp vitality (80% vs 56%, 5-y RCT); no reopening",
            "Sealing without excavation can arrest caries if the seal is maintained",
          ],
        },
      ],
      evidence: [
        { source: "risk", pages: "4–5" },
        { source: "fluoride", pages: "3" },
        { source: "restorative", pages: "1–9" },
      ],
    },
    {
      question: "Which fluoride, how much, for whom?",
      branches: [
        {
          when: "Home toothpaste, every child",
          action: "Brush at least twice daily with age-appropriate OTC F toothpaste as first line.",
          details: [
            "<3 y: no more than a smear/rice-size (0.1 mg F); parent dispenses",
            "3–6 y: no more than a pea-size amount (0.25 mg F)",
            "Supervised brushing; spit, and keep rinsing minimal or avoid it",
            "ADA-approved OTC toothpaste: ≥1000 and <1500 ppm F",
          ],
        },
        {
          when: "Professional topical, child at risk",
          action:
            "5% NaFV or 1.23% F gel at least twice yearly; varnish is the only agent under age 6.",
          details: [
            "5% NaFV = 2.26% F, 22,600 ppm; APF = 1.23% F, 12,300 ppm",
            "Varnish appears effective at preventing caries in higher-risk children <5 y",
            "Gels: no trials show efficacy of applications shorter than 4 min",
            "Foams: limited evidence of efficacy in children",
          ],
          followUp: "At least every 6 mo (pathway: moderate every 6 mo, high every 3 mo)",
        },
        {
          when: "High risk, over age 6",
          action: "Add Rx-strength home F: 0.5% F gels/pastes or 0.02–0.09% F mouth rinses.",
          criteria: [
            "Adolescents, including those with special health care needs",
            "Fixed orthodontic appliances",
          ],
          details: [
            "Rx toothpastes may contain 5000 ppm F",
            "Recommended for children 6 y or older only",
            "Pathway ≥6 y high risk: brushing with 0.5% F gel/paste",
          ],
        },
        {
          when: "High risk + F-deficient water",
          action: "Cautiously consider F supplements only after tallying all dietary F sources.",
          criteria: ["High caries risk", "Drinking water <0.6 ppm F"],
          details: [
            "<0.3 ppm F: 0.25 mg (6 mo–3 y), 0.50 mg (3–6 y), 1.00 mg (6–≥16 y)",
            "0.3–0.6 ppm F: 0 (6 mo–3 y), 0.25 mg (3–6 y), 0.50 mg (6–≥16 y)",
            "None from birth–6 mo, or if water >0.6 ppm F",
            "Caution <6 y; over-supplementation can cause fluorosis",
          ],
        },
        {
          when: "Ingestion / toxicity",
          tone: "urgent",
          action: "Probably toxic dose 5 mg/kg; 15 mg/kg likely fatal for a small child.",
          details: [
            "Lower doses: GI upset; higher: CNS effects (seizures, tetany)",
            ">20,000 poison center reports/yr; >80% of cases in children <6 y",
            "Keep Rx supplements/home F products out of reach of young children",
            "Fluorosis: 15–30 mo most susceptible (permanent incisors)",
          ],
        },
      ],
      evidence: [
        { source: "fluoride", pages: "2–4" },
        { source: "risk", pages: "4–5" },
      ],
    },
  ],
  "trauma-surgery": [
    {
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
  ],
  diagnosis: [
    {
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
          tone: "urgent",
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
  ],
  "behavior-sedation": [
    {
      question: "Rehearse the safety sequence",
      sequence: true,
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
  ],
  growth: [
    {
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
    {
      question: "Space & eruption problem → which appliance?",
      branches: [
        {
          when: "Premature primary tooth loss",
          action:
            "Space maintainer matched to the site: fixed unilateral, fixed bilateral, or removable.",
          criteria: [
            "Tooth lost, time elapsed, space analysis, dental age",
            "Successor present, its root development and bone cover",
            "Health, cooperation, active habits, oral hygiene",
          ],
          details: [
            "Fixed unilateral: band and loop, crown and loop, distal shoe",
            "Fixed bilateral: lower lingual holding arch, Nance appliance, transpalatal arch",
            "Removable: partial denture, Hawley-type appliance",
            "Kits/direct-bonded: single visit, but mixed longevity vs custom lab appliances",
            "Mean survival ≤2 y (except crown and loop); decementation is the top failure",
          ],
          followUp:
            "Check band, cement seal, and retention; keep until the successor erupts into position",
        },
        {
          when: "Space already lost",
          action: "Regain only after a records-based space analysis, then hold the space.",
          criteria: [
            "Space loss interferes with eruption of the permanent tooth",
            "Weigh age at loss, tooth lost, space available vs needed, other ortho problems",
          ],
          details: [
            "Fixed: active lingual arch, pendulum, Halterman-type appliance, lip bumper",
            "Removable: Hawley appliance with springs or screws",
            "Extraoral: headgear",
          ],
          followUp:
            "Hold regained space until adjacent permanent teeth erupt or comprehensive ortho starts",
        },
        {
          when: "Leeway space / incisor crowding",
          action: "Passive lower lingual holding arch until premolars and canines erupt.",
          criteria: [
            "Mixed dentition arch length shortage",
            "Crowding often self-corrects; arch holds against worsening",
          ],
          details: [
            "Lingual arch + 2 mm expansion fits all teeth in ~9 of 10; 60% need none",
            "Lower primary canine extraction aligns incisors but costs up to 2.7 mm",
            "If lower primary canines are removed, place a passive lingual arch",
            "Interproximal stripping of primary canines can align crowded laterals",
            "No extractions for crowding without space analysis + ortho plan",
          ],
        },
        {
          when: "Ectopic first permanent molar",
          action: "Mild: separators to wedge the molar distally. Severe: tip it distally.",
          criteria: [
            "71% self-correct by age 9",
            "Bigger impaction, more E resorption, bilateral → likely irreversible",
          ],
          details: [
            "Mild (little of the crown under the E): elastic or metal separators",
            "Severe: brass wire or removable appliance with springs",
            "Fixed: sectional wire + open coil spring, slingshot-type, Halterman appliance",
          ],
        },
        {
          when: "Palatally displaced maxillary canine",
          action:
            "Extract the primary canine; in early mixed dentition consider RME ± cervical headgear.",
          criteria: [
            "Canine bulge not palpable, asymmetric eruption, peg laterals",
            "Canine overlaps the formed lateral incisor root on radiograph",
          ],
          details: [
            "Primary canine extraction: 67–69% corrected vs 39–42% controls",
            "Found at 11–16 y and not horizontal: extraction → 75% erupt",
            "RME alone or with cervical pull headgear raises eruption potential",
            "CBCT localizes better than panoramic; ortho usually still needed",
          ],
        },
        {
          when: "Ankylosis or PFE",
          action:
            "Ankylosed E with successor: keep until it causes problems, then extract + lingual arch. PFE: no ortho force.",
          criteria: [
            "Ankylosis: infraocclusion, no mobility, dull percussion",
            "PFE: posterior open bite, normal vertical growth, family history (85%)",
          ],
          details: [
            "Extract ankylosed E if it blocks eruption or adjacent teeth tip; lingual arch or other fixed",
            "No successor: extract before a large vertical step, or decoronate to keep bone",
            "PFE teeth may ankylose under force; avoid early ortho intervention",
            "PFE: space maintenance, prevent supraeruption, plan prosthetics after growth",
          ],
        },
      ],
      evidence: [
        {
          source: "growth",
          pages: "6–10",
        },
      ],
    },
    {
      question: "Which primary tooth was lost → which space maintainer?",
      branches: [
        {
          when: "Primary incisor",
          action:
            "Space rarely closes once primary canines erupt; replace for esthetics or speech, not space.",
          details: [
            "Fixed: Groper appliance (bands on primary molars, acrylic teeth)",
            "Removable: partial denture with acrylic teeth",
            "Check for successor and cooperation first",
          ],
        },
        {
          when: "First primary molar (D), one side",
          action: "Band and loop on the E; crown and loop if the E needs an SSC anyway.",
          details: [
            "Loop rests against the distal of the canine",
            "Loop wide enough for the premolar to erupt through",
            "Crown and loop is hard to adjust; band and loop is easy to remove",
          ],
          followUp: "Remove once the first premolar erupts",
        },
        {
          when: "Second primary molar (E), 6 erupted",
          action: "Band and loop from the first permanent molar to the D.",
          details: [
            "Band the 6; loop contacts the distal of the D",
            "Lower bilateral losses: switch to a lingual holding arch",
          ],
          followUp: "Remove once the second premolar erupts",
        },
        {
          when: "E lost before the 6 erupts",
          action: "Distal shoe on the D guides the unerupted first permanent molar.",
          criteria: [
            "Contraindicated: bacteremia risk (endocarditis risk, immunosuppressed)",
            "Contraindicated: poor hygiene or cooperation, multiple missing teeth",
          ],
          details: [
            "Blade sits ~1 mm below the 6's mesial marginal ridge",
            "Radiograph at delivery confirms blade position",
            "Removable alternative: partial denture with an acrylic extension",
          ],
          followUp: "Convert to band and loop on the 6 once it erupts",
        },
        {
          when: "Both sides, lower arch",
          action: "Lower lingual holding arch once the permanent incisors have erupted.",
          details: [
            "Before incisors erupt: bilateral band and loops (they erupt lingually)",
            "Bands on 6s or Es; wire rests on incisor cingula",
            "Also holds leeway space for the late mixed dentition",
          ],
        },
        {
          when: "Both sides, upper arch",
          action: "Nance appliance; transpalatal arch when one side's anchorage is intact.",
          details: [
            "Nance: acrylic button on the anterior palate resists mesial drift",
            "Nance button can irritate or embed in the palatal tissue",
            "TPA: wire across the palate; weaker bilateral anchorage (molars tip together)",
          ],
        },
        {
          when: "Every space maintainer",
          tone: "always",
          action:
            "Pick fixed over removable when compliance is doubtful; recheck cement and fit every visit.",
          details: [
            "Removable partial denture: several teeth lost incl. anterior, cooperative child",
            "Removable appliances fail without daily wear",
            "Clean around bands; cement loss and caries under bands are the usual failures",
          ],
        },
      ],
      evidence: [
        {
          source: "growth",
          pages: "9",
        },
      ],
      note: "Tooth-by-tooth choices are standard pediatric board teaching. The AAPD guideline lists these appliances but doesn't assign them to specific teeth.",
    },
    {
      question: "Bite or habit problem → which appliance?",
      branches: [
        {
          when: "Simple anterior crossbite",
          action:
            "Align as soon as noted if space allows: incline plane, springs, or fixed springs.",
          criteria: [
            "Class I molars; abnormal incisor inclination (dental)",
            "Rule out skeletal Class III (basal bone position)",
          ],
          details: [
            "Acrylic incline plane",
            "Acrylic retainer with lingual springs",
            "Fixed appliance with springs",
            "Space needed: add an expansion appliance",
          ],
        },
        {
          when: "Posterior crossbite / functional shift",
          action:
            "Correct early: equilibration, fixed or removable appliance, extractions, or a combination.",
          criteria: [
            "Unilateral crossbite is usually bilateral constriction with a mandibular shift",
            "Eliminate shifts early to avoid TMD and asymmetric growth",
          ],
          details: [
            "Skeletal: fixed or removable palatal expander until midpalatal suture fusion",
            "Pick by movement: tipping vs bodily, dental vs orthopedic",
            "…space, AP/transverse/vertical skeleton, growth status, cooperation",
            "Skeletal Class III or asymmetry: comprehensive treatment",
          ],
        },
        {
          when: "Class II",
          action:
            "Headgear or functional appliance for growth modification; fixed appliances, extraction + elastics, or surgery.",
          criteria: [
            "Overjet >3 mm raises incisor injury risk; >8 mm → trauma in >40%",
            "Overjet ≥5 mm: early treatment may reduce trauma",
          ],
          details: [
            "Single- and 2-phase both correct Class II (RCTs); 2-phase takes longer",
            "Growth response to headgear/functional appliances varies; no reliable predictor",
            "Early treatment may help self-esteem, facial convexity, trauma risk",
            "Weigh growth pattern, AP discrepancy, age, compliance, space, anchorage",
          ],
        },
        {
          when: "Class III",
          action:
            "Start in primary/early mixed: protraction ± RPE, functional appliance, miniplate elastics, or chin cup.",
          criteria: [
            "Dental, skeletal, or anterior functional shift",
            "Hereditary (clefts, syndromes) or environmental (habits, OSA, trauma)",
          ],
          details: [
            "Protraction therapy with or without rapid palatal expansion",
            "Intermaxillary elastics with modified miniplates",
            "Growth is longer and less predictable; surgery may still be needed",
            "Surgery signs: mandible forward, long mandible, short ramus, obtuse gonial angle",
          ],
        },
        {
          when: "Sucking or tongue habit",
          action:
            "Counsel first; add appliance therapy or referral when the habit threatens development.",
          criteria: [
            "Frequency, duration, intensity; resting pressure matters most",
            "Open bite, posterior crossbite, overjet, forward resting tongue",
          ],
          details: [
            "Guide families to stop nonnutritive sucking by 36 mo or younger",
            "Counseling, behavior modification, myofunctional therapy",
            "Appliance therapy: intraoral or extraoral",
            "Refer: orthodontist, psychologist, myofunctional therapist, ENT",
            "Tongue thrust swallow with normal resting posture: no treatment",
          ],
        },
        {
          when: "Bruxism or self-injury",
          action:
            "Bruxism: education, then occlusal splint. Self-injury: lip bumper, bite appliance, or padding.",
          criteria: [
            "Juvenile bruxism is self-limiting; separate attrition from erosion",
            "Self-injury: developmental disability, Lesch-Nyhan, Rett, others",
          ],
          details: [
            "Bruxism: behavioral or psychological strategies, medication",
            "Self-injury: occlusal/bite-opening appliance, protective padding",
            "Also recontouring, extraction; medical: drugs, botulinum toxin",
          ],
        },
        {
          when: "Before any appliance",
          tone: "always",
          action:
            "Name the objective, timing, and exit point; appliances only work with compliance and review.",
          details: [
            "Records: photos, casts, panoramic/intraoral films, ceph as indicated",
            "Treatment must fit the child's development, comprehension, cooperation",
            "Plan for repair, recementation, or replacement as the dentition changes",
          ],
        },
      ],
      evidence: [
        {
          source: "growth",
          pages: "2, 4–5, 9–11",
        },
      ],
    },
  ],
  "practice-safety": [
    {
      question: "Before an invasive procedure",
      sequence: true,
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
  ],
  pulp: [
    {
      question: "Primary tooth: which pulp therapy?",
      branches: [
        {
          when: "Every primary pulp case",
          tone: "always",
          action:
            "Rubber dam (gold standard); irrigate with sterile water, saline, or NaOCl from a single-use syringe.",
          criteria: [
            "Dx: history, pain (location, intensity, duration, stimulus, relief, spontaneity)",
            "Exam: extraoral/intraoral, palpation, percussion, mobility, radiographs if obtainable",
            "Thermal/electric pulp tests have limited reliability in primary teeth",
          ],
          details: [
            "Never use tap or dental unit water for pulp irrigation",
            "Weigh medical history, tooth value, alternatives, restorability, prognosis",
            "Prior SDF may alleviate need for more excavation and/or vital pulp therapy",
          ],
          followUp: "Clinical review generally every 6 months; acute infection may need sooner",
        },
        {
          when: "Normal pulp / reversible pulpitis",
          action:
            "Vital pulp therapy: selective caries removal + IPT first; CS pulpotomy if the pulp is exposed.",
          criteria: [
            "Reversible: provoked pain 5–10 min from eating, no irreversible signs",
            "Pain relieved by OTC analgesics, brushing, or removing the stimulus",
            "No radiographic infection, pathologic resorption, or radicular pathology",
          ],
          details: [
            "IPT or CS pulpotomy preferred over DPC/other pulpotomies (strong, moderate, 24 mo)",
            "With pre-op reversible pain, IPT and CS pulpotomy may be preferred over DPC (conditional)",
          ],
          followUp:
            "Success = no pain/swelling, no pathologic resorption or furcation/apical lesion",
          children: [
            {
              when: "Deep caries, no exposure",
              action:
                "Selective removal leaving deepest caries, liner, and a restoration that seals out microleakage.",
              details: [
                "Selective + IPT over complete/stepwise: strong, moderate (24 mo); fewer exposures",
                "Exposures 4.5% selective/stepwise vs 19.3% complete (NNT 6)",
                "Liner type does not affect IPT success (strong, high); IPT 97% at 24 mo",
                "Hall technique (no removal) may be used when indicated (conditional, moderate)",
                "GIC ITR may control caries with reversible signs; IPT once vitality is confirmed",
              ],
              followUp:
                "If kept sealed, good prognosis; no conclusive need to reenter for residual caries",
            },
            {
              when: "Carious/traumatic exposure",
              action:
                "Amputate coronal pulp, control bleeding with damp pellet, place MTA or Biodentine, base, seal.",
              criteria: [
                "Radicular tissue vital: no suppuration, purulence, or necrosis",
                "Hemorrhage controlled by a cotton pellet after several minutes",
              ],
              details: [
                "CS over FC, FS, ZOE, others (strong, high, 24 mo); MTA 94% vs FC 86%",
                "Against: CH (strong, NNT 2); FS (cond., low); ZOE alone, NaOCl (cond., very low)",
                "24-mo network rank: MTA, Biodentine, FC, then FS",
                "Primary incisor carious exposure: pulpotomy over pulpectomy (strong, moderate)",
                "Same-day final restoration may be preferred; SSC, composite, amalgam, or RMGIC",
              ],
              followUp: "Radiograph at least annually; PA image if BW misses interradicular area",
            },
            {
              when: "Small (<1 mm) exposure, normal pulp",
              action:
                "Direct pulp cap with MTA or calcium hydroxide, then a restoration that seals out microleakage.",
              criteria: [
                "Noncarious, small mechanical, or traumatic exposure",
                "Conditions for a favorable response are optimal",
              ],
              details: [
                "DPC evidence very low certainty; IPT or CS pulpotomy preferred",
                "Capping agent does not affect DPC success (conditional, very low)",
              ],
              followUp:
                "Vitality kept; no resorption or furcation/apical radiolucency; successor unharmed",
            },
          ],
        },
        {
          when: "Irreversible pulpitis / necrosis",
          action:
            "Nonvital therapy: pulpectomy if roots are intact; LSTR if resorbed and kept ≤12 months; else extract.",
          criteria: [
            "Any: unprovoked pain, sinus tract, gingival swelling, abnormal mobility",
            "Radiographic furcation/PA radiolucency or internal/external root resorption",
            "Suppuration or purulence of radicular pulp at planned pulpotomy",
          ],
          details: [
            "Bleeding not controlled in 5 min alone does not diagnose irreversible pulpitis",
            "2026: CS pulpotomy may be recommended if spontaneous pain but no infection signs",
            "2024 guideline disagrees: IPT/pulpotomy not indicated for irreversible pulpitis pain",
          ],
          children: [
            {
              when: "Minimal or no root resorption",
              action:
                "Pulpectomy: hand/rotary files, irrigate, dry, fill with resorbable paste, seal the tooth.",
              details: [
                "Pulpectomy over LSTR if no resorption (conditional, low): 92% vs 65%",
                "Fill: ZO/iodoform/CH ranked 1st, ZOE 2nd, iodoform last at 18 mo (conditional)",
                "Irrigant (1–5% NaOCl, water/saline, CHX) no impact; no NaOCl beyond apex",
                "Rotary ~2 min faster, comparable success; overfilling tended to lower success",
                "SSC vs fillings similar at 12 mo; 24-mo SSC 90% vs composite 77%",
              ],
              followUp:
                "Immediate post-op radiograph; clinical and radiographic check ≥ every 12 mo",
            },
            {
              when: "Significant resorption (>1 mm external)",
              action:
                "LSTR with tetracycline-free antibiotic paste, GIC seal, then SSC to hold the tooth up to 12 months.",
              criteria: [
                "External resorption >1 mm and/or internal; clinician chooses not to extract",
              ],
              details: [
                "LSTR over pulpectomy here (conditional, moderate): 76% vs 47%",
                "Clindamycin + metronidazole + ciprofloxacin; avoid tetracycline (conditional)",
                "Enlarge orifices, clean with 37% phosphoric acid; 10% NaOCl pellet for bleeding",
                "Contraindicated: allergy, excessive resorption, near exfoliation, perforated floor",
                "Contraindicated with infective endocarditis risk; prospective 24-mo success 37%",
              ],
              followUp:
                "Monitor closely in year 1, then clinical exams and radiographs ≥ every 12 mo",
            },
          ],
        },
        {
          when: "Nonrestorable or infection not arrested",
          tone: "urgent",
          action: "Consider extraction; it may be the treatment of choice.",
          criteria: [
            "Infection cannot be arrested or bony support cannot be regained",
            "Inadequate tooth structure for a restoration",
            "Excessive pathologic root resorption",
          ],
          details: [
            "Parent preference or other reasons may make extraction best even if restorable",
            "Exceptions: cooperation, medical conditions, no LA, facial swelling, unclear Dx",
          ],
        },
      ],
      evidence: [
        { source: "pulp", pages: "2–6" },
        { source: "vital", pages: "1–3, 6–7, 9–10" },
        { source: "nonvital", pages: "1–3, 5–7, 9–11" },
      ],
    },
    {
      question: "Permanent tooth: which pulp therapy?",
      branches: [
        {
          when: "Every permanent VPT",
          tone: "always",
          action:
            "Rubber dam, NaOCl for hemostasis, calcium silicate agent, well-sealed restoration at the same visit.",
          criteria: [
            "Cold + electric pulp tests with signs, symptoms, radiographs (conditional, very low)",
          ],
          details: [
            "Nonstaining CS in esthetic areas (strong, high): MTA 83% discolored, Biodentine 0%",
            "Root maturation doesn’t change PP/FP success with CS (conditional, low)",
            "Magnification likely enhances visualization of the pulp’s status",
            "Success factors: diagnosis, apex stage, pain, hemostasis, lavage, agent, time to restore",
          ],
          followUp: "Close clinical/radiographic follow-up; immature roots should keep developing",
        },
        {
          when: "Deep caries, NP/RP",
          action:
            "Selective caries removal + IPT in one visit; if exposed, DPC, partial, or full pulpotomy with CS.",
          criteria: [
            "Deep: inner third/quarter of dentin, distinct radiographic dentin zone over pulp",
            "Sensibility normal: no pain or sharp pain that stops within seconds",
          ],
          details: [
            "IPT, DPC, PP, FP similar at 24 mo, 91–97% (conditional, low)",
            "Selective over nonselective or stepwise (strong, high, 60 mo): 78% vs 64% stepwise",
          ],
          children: [
            {
              when: "No exposure after selective removal",
              action:
                "IPT: leave affected dentin, place liner (GIC, Ca(OH)₂, or CS), restore without reentry.",
              details: [
                "IPT liner choice does not alter 24-mo success (conditional, moderate)",
                "Stepwise (2 visits, 6–12 mo apart) may be considered near ¾ dentin depth",
              ],
              followUp: "No resorption; immature roots show continued development/apexogenesis",
            },
            {
              when: "Carious exposure, bleeding controlled",
              action:
                "DPC with CS, or partial pulpotomy 1–3 mm, or full pulpotomy with CS; NaOCl pellet to stop bleeding.",
              criteria: ["Hemostasis achieved in ≤6 minutes"],
              details: [
                "DPC: CS over Ca(OH)₂ (strong, moderate, 36 mo): 88% vs 70%",
                "NaOCl for DPC hemostasis (strong, moderate): 83% vs 67% with saline",
                "PP preferred over DPC unless DPC uses CS (conditional, low); PP ≈ FP with CS",
                "CS ≥1.5 mm over exposure and dentin, then light-cured RMGI, then restoration",
              ],
              followUp: "Pulp stays vital; no resorption, canal calcification, or PA radiolucency",
            },
            {
              when: "Traumatic exposure (crown fracture)",
              action:
                "Partial (Cvek) or full pulpotomy over DPC; remove 1–3 mm of pulp and cap with CS or Ca(OH)₂.",
              criteria: ["Vital tooth, NP/RP, traumatic exposure ≤4 mm"],
              details: [
                "PP/FP over DPC (conditional, low): PP 93%, FP 89%, DPC 43% at 24 mo",
                "Cvek may be done up to 9 days after exposure; no data on longer waits",
                "Esthetic concern: nonstaining CS (without bismuth)",
              ],
              followUp: "Immature roots should show continued normal root development",
            },
          ],
        },
        {
          when: "Extremely deep caries or SIP, normal PA",
          action:
            "Nonselective removal to expose and assess pulp; full pulpotomy with CS if vital and bleeding stops.",
          criteria: [
            "Extremely deep: full dentin thickness, no discernible radiographic barrier",
            "Spontaneous, nocturnal, or lingering pain",
            "Normal periapical radiographic appearance",
          ],
          details: [
            "Nonselective removal here (strong, moderate, 24–60 mo)",
            "FP may be preferred over PP (conditional, low): 95% vs 88% at 24 mo",
            "PP/FP when hemostasis ≤6 min (conditional, low); NaOCl pellets suggested",
            "CS pulpotomy for carious teeth with SIP and normal PA (strong, moderate)",
            "Immature teeth with irreversible pulpitis: pulpotomy viable, 91% at 24 mo",
          ],
          followUp: "Monitor for further endo; check root growth, resorption, canal calcification",
        },
        {
          when: "Uncontrolled bleeding, PA infection, necrosis",
          tone: "urgent",
          action:
            "No pulpotomy: root canal treatment if apex closed; regenerative endo or apexification if immature.",
          criteria: [
            "IP with bleeding not controlled or periapical involvement from infection",
            "Necrotic pulp",
          ],
          details: [
            "Pulpotomy not indicated here (strong, moderate, 60 mo)",
            "FP 5-yr success 82% without PA involvement vs 66% with it",
          ],
          children: [
            {
              when: "Closed apex, restorable",
              action:
                "Nonsurgical root canal treatment, obturating the entire canal with a semi-solid or solid filling.",
              details: [
                "Indicated for irreversible pulpitis or necrotic pulp with a closed apex",
                "Complete pulpotomy may give emergency relief until definitive RCT",
              ],
              followUp: "No gross over/underfill; pretreatment pathology resolves",
            },
            {
              when: "Immature apex, necrotic",
              action:
                "Regenerative endodontic treatment (may be preferred) or apexification with an MTA/CS apical plug.",
              details: [
                "RET goals: resolve symptoms and apical periodontitis, thicker walls, root maturation",
                "Initial inflammatory root resorption suggests poorer RET prognosis",
                "Apexification with MTA/CS apical plug: success >94%; formerly Ca(OH)₂ 2 wk–1 mo",
                "Thin walls: fill canal with MTA or composite instead of gutta percha",
              ],
              followUp: "Radiographic root wall widening, apical closure; tooth keeps erupting",
            },
          ],
        },
      ],
      evidence: [
        { source: "pulp", pages: "1, 3, 6–10" },
        { source: "permanentVital", pages: "1–3, 5–11" },
      ],
    },
  ],
};
