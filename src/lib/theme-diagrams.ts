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
      question: "A caries lesion is found: what next?",
      branches: [
        {
          when: "Arrested (inactive)",
          action:
            "No restoration needed to control the disease. Keep prevention going and monitor.",
          criteria: [
            "Not progressing between visits",
            "Some lesions do not progress and may not need restoration",
          ],
          details: [
            "Lesion activity may matter more than the number of lesions",
            "A restoration alone does not stop the disease process",
          ],
          followUp: "Recheck activity at every recall",
        },
        {
          when: "Active, noncavitated",
          action: "Preventive therapy and active surveillance instead of a restoration.",
          children: [
            {
              when: "Smooth surface / white spot",
              action: "Professional fluoride varnish; add home fluoride by risk.",
              details: ["ICDAS 2 enamel lesions can be arrested with semiannual 5% NaFV"],
            },
            {
              when: "Small interproximal",
              action: "Resin infiltration as an adjunct to arrest progression.",
              details: [
                "ADA conditionally recommends enamel infiltration (low–very low certainty)",
                "Also improves the appearance of white-spot lesions",
              ],
            },
            {
              when: "Pit and fissure",
              action: "Sealant, chosen by individual- and tooth-level risk.",
            },
          ],
          followUp: "Restore if it cavitates or enlarges on radiographs",
        },
        {
          when: "Active, cavitated",
          action: "Control the disease, then decide how and when to restore.",
          criteria: ["Visual enamel cavitation or shadowing", "Radiographic enlargement over time"],
          children: [
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
              when: "Restorable now",
              action:
                "Restore; choose the material by tooth, lesion size and surfaces, isolation, cooperation, and risk.",
              details: [
                "See the next map for materials and crowns",
                "Primary teeth: weigh time until exfoliation",
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
            {
              when: "Pulp involved",
              action: "Make the pulp diagnosis before choosing a restoration.",
              criteria: [
                "Spontaneous or lingering pain",
                "Swelling, sinus tract, or periapical/furcal change",
              ],
              details: ["Follow the pulp therapy maps: vital vs. nonvital, primary vs. permanent"],
            },
            {
              when: "Not restorable",
              action: "Extract, and plan space management.",
              criteria: ["Extensive crown destruction or root resorption"],
              details: [
                "Check the successor and the space before choosing a maintainer (see Growth & space)",
              ],
            },
          ],
        },
      ],
      evidence: [
        { source: "risk", pages: "3–5" },
        { source: "restorative", pages: "1–3" },
        { source: "fluoride", pages: "3" },
        { source: "nonvital", pages: "2" },
      ],
      note: "Telling active from arrested lesions at the chair (for example, an arrested lesion looks dark, hard, and shiny) is standard cariology teaching; the PDFs cover why activity matters, not how to judge it.",
    },
    {
      question: "Restoring it: which material or crown?",
      branches: [
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
      evidence: [{ source: "restorative", pages: "4–9" }],
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
    {
      question: "Permanent tooth injured: fracture or luxation?",
      branches: [
        {
          when: "Crown fracture",
          action: "Is the pulp exposed?",
          children: [
            {
              when: "Enamel or enamel-dentin, no exposure",
              action: "Bond the fragment (rehydrate 20 min) or restore; cover deep dentin.",
              details: [
                "Pulp within 0.5 mm (pink, no bleeding): calcium hydroxide liner, then GIC",
              ],
              followUp: "6–8 wk, 1 y",
            },
            {
              when: "Pulp exposed",
              action:
                "Preserve the pulp: partial pulpotomy or pulp cap, especially with an immature root.",
              details: [
                "Partial pulpotomy also preferred in mature teeth",
                "Mature tooth needing a post: root canal treatment",
              ],
              followUp: "6–8 wk, 3 mo, 6 mo, 1 y",
            },
          ],
        },
        {
          when: "Crown-root fracture",
          action: "Stabilize the loose fragment now; plan by extent and root development.",
          details: [
            "Options: fragment removal + restoration, orthodontic or surgical extrusion, root submergence, extraction, autotransplantation",
            "CBCT helps show the fracture path",
          ],
        },
        {
          when: "Root fracture",
          action: "Reposition a displaced coronal segment; flexible splint.",
          details: [
            "Splint 4 wk; cervical-third fractures up to 4 mo",
            "Necrosis usually affects only the coronal segment",
            "Don’t start endodontics at the emergency visit",
          ],
        },
        {
          when: "Luxation",
          action: "Which direction did it move?",
          children: [
            {
              when: "Concussion or subluxation",
              action: "Usually no treatment; splint 2 wk only for comfort if mobile.",
              followUp: "Monitor the pulp for at least 1 year",
            },
            {
              when: "Extrusion",
              action: "Reposition under anesthesia; flexible splint 2 wk.",
            },
            {
              when: "Lateral luxation",
              action: "Disengage from the locked position, reposition, flexible splint 4 wk.",
              details: [
                "Immature root: may revascularize; treat only definite necrosis",
                "Mature root: pulp likely necrotic; evaluate at ~2 wk and start root canal treatment",
              ],
            },
            {
              when: "Intrusion",
              action: "Depends on root development and depth.",
              children: [
                {
                  when: "Immature root",
                  action: "Allow re-eruption; if none in 4 wk, reposition orthodontically.",
                },
                {
                  when: "Mature root",
                  action:
                    "< 3 mm: allow re-eruption; 3–7 mm: reposition surgically or orthodontically; > 7 mm: reposition surgically.",
                  details: ["Pulp almost always necrotic: begin root canal treatment at 2 wk"],
                },
              ],
            },
          ],
        },
        {
          when: "Every injury",
          tone: "always",
          action:
            "Rule out head injury, check tetanus, question a story that doesn’t fit, and take multiple-angle radiographs.",
        },
      ],
      evidence: [{ source: "trauma", pages: "3–12" }],
    },
    {
      question: "Primary tooth injured: keep, reposition, or extract?",
      branches: [
        {
          when: "Crown fracture",
          action: "Smooth or restore; with pulp exposure, partial pulpotomy is preferred.",
          details: [
            "Often no treatment is best at the emergency visit; refer to a child-oriented team",
            "Pulpotomy depends on the child’s maturity and cooperation",
          ],
        },
        {
          when: "Root fracture",
          action: "Coronal fragment displaced and interfering?",
          children: [
            {
              when: "Not displaced, or minor",
              action: "Leave it; the coronal fragment may reposition spontaneously.",
            },
            {
              when: "Excessively mobile, interfering",
              action: "Extract only the coronal fragment; leave the apical part to resorb.",
            },
          ],
        },
        {
          when: "Luxation",
          action: "Does it interfere with the bite, or risk aspiration?",
          children: [
            {
              when: "Lateral, minimal interference",
              action: "Allow spontaneous repositioning, usually within 6 months.",
            },
            {
              when: "Extrusion > 3 mm or excessively mobile",
              action: "Extract under local anesthesia.",
            },
            {
              when: "Lateral, severe displacement",
              action:
                "Extract if it risks ingestion or aspiration; otherwise reposition and splint 4 wk.",
            },
            {
              when: "Intrusion",
              action: "Allow spontaneous re-eruption, whatever the direction.",
            },
          ],
        },
        {
          when: "Avulsion",
          tone: "urgent",
          action: "Never replant a primary tooth.",
        },
        {
          when: "Every primary injury",
          tone: "always",
          action:
            "Protect the successor: parents watch for color change, swelling, or a sinus tract.",
        },
      ],
      evidence: [{ source: "primaryTrauma", pages: "3–11" }],
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
    {
      question: "Does this child need endocarditis prophylaxis?",
      branches: [
        {
          when: "Highest-risk cardiac condition",
          action:
            "Prophylaxis before procedures that manipulate gingiva or the periapical region, or perforate mucosa.",
          criteria: [
            "Prosthetic valve, valve-repair device, or ventricular assist device",
            "Previous, relapsed, or recurrent infective endocarditis",
            "Unrepaired cyanotic CHD, including palliative shunts and conduits",
            "Repaired CHD with prosthetic material (first 6 months) or a residual defect beside it",
            "Pulmonary valve or conduit placement",
            "Heart transplant recipient with valvulopathy",
          ],
          details: [
            "Amoxicillin first; single dose 30–60 min before (up to 2 h after if missed)",
            "Penicillin allergy: cephalexin, azithromycin, or clarithromycin",
            "Clindamycin is no longer recommended",
          ],
        },
        {
          when: "Pacemaker, fully closed septal defect, graft, stent, VA shunt",
          action: "Prophylaxis is not suggested for dental procedures.",
        },
        {
          when: "Prosthetic joint",
          action: "Routine prophylaxis is no longer recommended.",
        },
        {
          when: "Immune compromise, indwelling vascular catheter, other device",
          action: "Consult the child’s physician.",
        },
      ],
      evidence: [
        {
          source: "prophylaxis",
          pages: "2–6",
        },
      ],
    },
    {
      question: "Infection or wound: does this child need an antibiotic?",
      branches: [
        {
          when: "Pulpitis, apical periodontitis, sinus tract, or localized intraoral swelling",
          action: "No antibiotic. Treat the source: pulpotomy, pulpectomy, or extraction.",
          criteria: ["No fever, no facial swelling"],
        },
        {
          when: "Facial swelling or cellulitis",
          action: "Prompt source control and drainage, with an antibiotic as an adjunct.",
          details: [
            "Amoxicillin or amoxicillin-clavulanate first; a cephalosporin if allergic or recently treated",
            "A 3–5 day course of amoxicillin may work as well as 7 days",
            "Stop once cured or clearly ineffective; culture if not responding",
          ],
          children: [
            {
              when: "Fever, trismus, dysphagia, or breathing difficulty",
              tone: "urgent",
              action: "Emergency: immediate surgical care and IV antibiotics in a hospital.",
            },
          ],
        },
        {
          when: "Contaminated wound",
          action:
            "Systemic antibiotic if contaminated by soil or debris, a foreign body, or an open fracture.",
          details: ["Puncture or dirty laceration: confirm tetanus immunity"],
        },
        {
          when: "Avulsed permanent tooth",
          action:
            "Systemic antibiotic as an adjunct: amoxicillin or penicillin; doxycycline as the alternative.",
        },
        {
          when: "Every prescription",
          tone: "always",
          action:
            "Narrowest spectrum, shortest effective course, pediatric dose, and document it. Clindamycin carries C. difficile risk.",
        },
      ],
      evidence: [{ source: "antibiotics", pages: "2–4" }],
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
    {
      question: "A child is in dental pain: which analgesic?",
      sequence: true,
      branches: [
        {
          when: "First line",
          action: "An NSAID such as ibuprofen, dosed by age and weight.",
          details: ["Pair with definitive dental treatment when indicated."],
        },
        {
          when: "NSAID contraindicated or not tolerated",
          action: "Acetaminophen as the first-line alternative.",
        },
        {
          when: "One agent is not enough",
          action: "Combine an NSAID with acetaminophen, scheduled rather than as needed.",
          details: ["Respect each drug’s maximum daily dose."],
        },
        {
          when: "Opioids",
          action: "Limit or avoid; rare cases only, with misuse screening.",
          details: [
            "FDA: no codeine or tramadol under 12, or at 12–17 with high-risk conditions such as obesity or OSA.",
          ],
          tone: "urgent",
        },
      ],
      evidence: [
        {
          source: "pain",
          pages: "6–8",
        },
      ],
    },
    {
      question: "Basic behavior guidance isn’t working: what next?",
      branches: [
        {
          when: "Treatment isn’t urgent",
          action:
            "Consider deferring, with interim care (ITR, fluoride varnish, SDF) and a documented plan.",
        },
        {
          when: "Anxious but can cooperate with support",
          action: "Nitrous oxide/oxygen to reduce anxiety and aid communication.",
          details: ["Add sensory adaptations for anxiety or special health care needs"],
        },
        {
          when: "Urgent, limited care in a child who can’t cooperate",
          action:
            "Protective stabilization, with consent, monitoring, and the least restriction needed.",
          criteria: [
            "Eg, a toddler with acute trauma",
            "Movement would endanger the patient or team",
          ],
          details: [
            "Not for a cooperative patient, non-urgent care, full-mouth rehabilitation, or convenience",
            "Not with a history of abuse or trauma that restraint could worsen",
          ],
        },
        {
          when: "Fearful or unable to cooperate; more treatment",
          action: "Sedation, if the patient is a medically suitable candidate.",
          details: ["Not for a cooperative patient with minimal needs"],
          children: [
            {
              when: "Extensive needs, very young, or LA ineffective",
              action: "General anesthesia.",
              criteria: [
                "Precommunicative or extremely uncooperative",
                "Acute infection or allergy makes local anesthesia ineffective",
                "Can be combined with other surgery to reduce anesthetic exposures",
              ],
              details: [
                "Not for a young child whose minimal needs ITR, varnish, or SDF can address",
                "Weigh age, risk-benefit, deferral, and barriers to care",
              ],
            },
          ],
        },
        {
          when: "Every escalation",
          tone: "always",
          action:
            "Informed consent covering risks, benefits, and alternatives including no treatment, plus documentation.",
        },
      ],
      evidence: [{ source: "behavior", pages: "1, 5, 8–12" }],
    },
  ],
  growth: [
    {
      question: "A primary tooth is lost early: what next?",
      branches: [
        {
          when: "Still restorable",
          action:
            "Restore it to full contour instead; an under-contoured restoration also loses space.",
        },
        {
          when: "Successor present",
          action: "Decide whether space maintenance is needed, then choose the appliance.",
          criteria: [
            "Which tooth, and how long ago it was lost",
            "Dental age; successor’s root development and bone covering it",
            "Occlusion and space analysis",
            "Health, cooperation, habits, oral hygiene",
          ],
          children: [
            {
              when: "Space maintainer indicated",
              action: "Fixed unilateral, fixed bilateral, or removable: see the next map by tooth.",
              details: [
                "Most maintainers last under 2 years; decementation is the usual failure",
                "Keep it until the successor erupts into position",
              ],
              followUp: "Check appliance, cement, and the erupting successor at every recall",
            },
            {
              when: "Space already lost",
              action: "Regain space only after records and a space analysis.",
              details: [
                "Fixed: active lingual arch, pendulum, Halterman, lip bumper",
                "Removable: Hawley with springs or screws; headgear",
                "Hold regained space until adjacent teeth erupt or comprehensive ortho begins",
              ],
            },
          ],
        },
        {
          when: "Successor congenitally missing",
          action: "Plan the long-term space: close it, or hold it for a prosthesis or implant.",
          children: [
            {
              when: "Maxillary lateral incisor",
              action:
                "Move the canine into the lateral position, or open space for a future implant.",
              details: [
                "Weigh age, canine size/shape/position, crowding, bite depth, profile, smile line, bone",
                "Patients generally prefer space closure over implants",
                "An implant space needs an interim prosthesis to hold it",
              ],
            },
            {
              when: "Second premolar",
              action:
                "Keep the primary molar, or extract with space closure, prosthesis, or autotransplantation.",
              details: [
                "Primary E is wider than the premolar; reducing it risks resorption",
                "Crowded arches or mild Class III: extraction can help",
                "An ankylosed, submerging molar risks an alveolar defect before an implant",
              ],
            },
          ],
        },
      ],
      evidence: [{ source: "growth", pages: "5, 9–10" }],
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
      question: "Crowded incisors in the mixed dentition: wait or act?",
      branches: [
        {
          when: "Mild to moderate crowding",
          action: "Monitor; mandibular incisor crowding tends to decrease with time.",
          details: [
            "Greater initial crowding self-corrects more, but results vary",
            "A passive lingual arch can hold leeway space if crowding may worsen",
          ],
        },
        {
          when: "Incisors need room to erupt",
          action:
            "Primary canine extraction, then a passive lingual arch to hold the leeway space.",
          details: [
            "Irregularity improves, but arch length drops by up to 2.7 mm",
            "With a lingual arch saving leeway, ~9 in 10 fit with 2 mm expansion; 60% need none",
            "Interproximal stripping of primary canines can make room for crowded laterals",
          ],
        },
        {
          when: "Premature loss of one primary canine",
          action: "Watch the midline before extracting the other canine.",
          details: [
            "Contralateral extraction is often recommended",
            "Iowa and Toronto growth data: lower midline did not shift significantly",
          ],
        },
        {
          when: "Before extracting to relieve crowding",
          tone: "always",
          action: "Complete a space analysis and a short- and long-term orthodontic plan first.",
        },
      ],
      evidence: [{ source: "growth", pages: "8–9" }],
    },
    {
      question: "A tooth is not erupting where or when it should",
      branches: [
        {
          when: "First permanent molar caught under the E",
          action: "Watch or treat: 71% self-correct by age 9.",
          criteria: [
            "Larger impaction, more resorption of the E, or bilateral → likely irreversible",
          ],
          children: [
            {
              when: "Mild impaction",
              action: "Elastic or metal separators to wedge the molar distally.",
            },
            {
              when: "Severe impaction",
              action:
                "Tip the molar distally: brass wire, spring appliance, sectional wire, or Halterman.",
            },
          ],
        },
        {
          when: "Maxillary canine displaced palatally",
          action:
            "Extract the primary canine when the bulge isn’t palpable and it overlaps the lateral root.",
          criteria: ["No canine bulge, asymmetric eruption, or peg-shaped laterals"],
          details: [
            "Corrects 67–69% vs 39–42% without extraction",
            "Rapid maxillary expansion (± cervical headgear) also helps eruption",
            "Found at 11–16 y and not horizontal: extraction → 75% erupt",
            "Localize with a panoramic film; CBCT localizes better",
          ],
        },
        {
          when: "Incisor delayed or ectopic",
          action: "Find the cause first.",
          children: [
            {
              when: "Supernumerary (eg, mesiodens)",
              action:
                "Remove it at about 6–7 y, when the incisor crown is complete and its root shorter than the crown.",
              details: [
                "Removing an erupted mesiodens lets the incisor erupt in 75%",
                "Primary supernumeraries: usually leave; early surgery can damage the incisor",
                "Localize with CBCT or two films by the parallax rule",
              ],
              followUp: "Recheck at 6 mo; no eruption by 6–12 mo → expose and apply traction",
            },
            {
              when: "Necrotic or pulp-treated primary incisor",
              action: "Extract the over-retained primary incisor in the early mixed dentition.",
            },
          ],
        },
        {
          when: "Primary molar submerging",
          action: "Suspect ankylosis: no mobility, dull percussion note.",
          children: [
            {
              when: "Successor present",
              action:
                "Keep it until it blocks eruption or neighbors tip, then extract and place a lingual arch.",
            },
            {
              when: "No successor",
              action:
                "Extract before a large vertical step develops, or decoronate to preserve bone for an implant.",
            },
          ],
        },
        {
          when: "Posterior open bite, no obstruction",
          action: "Suspect primary failure of eruption: avoid early orthodontic forces.",
          criteria: [
            "Family history in ~85%",
            "Teeth distal to the first affected tooth also fail",
          ],
          details: [
            "Orthodontic force can make PFE teeth ankylose",
            "Maintain space; definitive care after growth (osteotomies, implants)",
          ],
        },
      ],
      evidence: [{ source: "growth", pages: "5–8" }],
    },
    {
      question: "Crossbite: dental, functional, or skeletal?",
      branches: [
        {
          when: "Anterior crossbite",
          action: "Check molar relationship and whether the mandible shifts forward to close.",
          children: [
            {
              when: "Dental: Class I molars, tipped incisors",
              action:
                "Align as soon as noted if space allows: incline plane, retainer with lingual springs, or fixed springs.",
              details: ["Add an expansion appliance if space is needed"],
            },
            {
              when: "Functional: forward shift on closing",
              action: "Eliminate the shift early.",
            },
            {
              when: "Skeletal Class III",
              action: "Treat as a Class III malocclusion (see the Class II / III map).",
            },
          ],
        },
        {
          when: "Posterior crossbite",
          action:
            "Look for a mandibular shift; a unilateral crossbite is usually a bilateral constriction.",
          children: [
            {
              when: "One tooth tipped or rotated",
              action: "Localized dental correction with an appliance.",
            },
            {
              when: "Functional shift",
              action:
                "Correct early: equilibration, fixed or removable appliance, extractions, or a combination.",
              details: [
                "Early correction largely eliminates mandibular asymmetry and reduces TMD risk",
              ],
            },
            {
              when: "Skeletal maxillary constriction",
              action: "Palatal expansion, possible until the midpalatal suture fuses.",
              details: ["With Class III or skeletal asymmetry: comprehensive treatment"],
            },
          ],
        },
      ],
      evidence: [{ source: "growth", pages: "10–11" }],
    },
    {
      question: "Class II or Class III: intercept now or wait?",
      branches: [
        {
          when: "Class II",
          action:
            "One- or two-phase treatment both correct it; decide on trauma risk and psychosocial need.",
          children: [
            {
              when: "Overjet ≥ 5 mm",
              action: "Consider interceptive treatment to reduce incisor trauma risk.",
              details: [
                "Overjet > 3 mm raises injury risk; > 8 mm → trauma in over 40%",
                "May improve self-esteem and facial convexity",
              ],
            },
            {
              when: "No trauma or psychosocial driver",
              action: "Treat in one phase in the permanent dentition.",
              details: [
                "Two-phase treatment takes significantly longer",
                "Growth response to headgear or functional appliances varies and can’t be predicted",
              ],
            },
          ],
          details: [
            "Options: headgear, functional appliance, fixed appliances, extraction + elastics, surgery",
          ],
        },
        {
          when: "Class III",
          action:
            "Separate dental, functional shift, and skeletal causes; start early if skeletal.",
          children: [
            {
              when: "Growing, primary or early mixed dentition",
              action:
                "Interceptive treatment: protraction ± rapid palatal expansion, functional appliance, miniplate elastics, or chin cup.",
            },
            {
              when: "Signs of surgical Class III",
              action: "Warn the family early treatment may not prevent orthognathic surgery.",
              criteria: [
                "Mandible forward to cranial base; long mandible",
                "Short ramus; obtuse gonial angle",
              ],
            },
          ],
        },
        {
          when: "Before deciding",
          tone: "always",
          action: "Weigh growth pattern, AP discrepancy, age, compliance, space, and anchorage.",
        },
      ],
      evidence: [{ source: "growth", pages: "11" }],
    },
    {
      question: "Oral habit: counsel, appliance, or refer?",
      branches: [
        {
          when: "Thumb, finger, or pacifier",
          action:
            "Anticipatory guidance to stop by 36 months; treat if it is shaping the dentition.",
          criteria: [
            "Linked to anterior open bite and posterior crossbite",
            "Weigh frequency, duration, intensity",
          ],
          children: [
            {
              when: "Child wants to stop",
              action: "Counseling and behavior modification.",
            },
            {
              when: "Persisting with dental effects",
              action:
                "Habit appliance or referral (orthodontist, psychologist, myofunctional therapist).",
            },
          ],
        },
        {
          when: "Tongue thrust",
          action: "Matters only if the resting tongue posture is forward.",
          details: ["Brief swallowing contacts don’t move teeth; resting forces do"],
        },
        {
          when: "Bruxism",
          action: "Usually self-limiting; rule out erosion as the cause of wear.",
          details: [
            "Options: education, occlusal splint, behavioral or psychological strategies, medication",
          ],
        },
        {
          when: "Mouth breathing, snoring, apneas",
          action: "Screen for obstructive sleep apnea and refer to the physician or ENT.",
          criteria: [
            "Narrow maxilla, crossbite, open bite, vertical growth",
            "Enlarged tonsils, adenoidal facies, restless sleep, bedwetting",
          ],
        },
        {
          when: "Self-injury (lip or tongue biting)",
          action:
            "Protect: lip bumper, bite-opening appliance, padding, recontouring, or extraction.",
          details: ["Medical options include botulinum toxin"],
        },
      ],
      evidence: [{ source: "growth", pages: "4–5" }],
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
    {
      question: "Who can consent for this child?",
      branches: [
        {
          when: "Parent with legal rights",
          action: "Either parent alone can usually consent, unless a court order says otherwise.",
          details: [
            "Includes adoptive parents, court-appointed guardians, and foster parents placed by the state",
          ],
        },
        {
          when: "Grandparent, stepparent, babysitter, noncustodial parent",
          action: "Not automatically authorized: confirm legal authority, or reach the parent.",
          details: ["A copy of the court order verifies a guardian’s authority"],
        },
        {
          when: "Emancipated minor",
          action: "Consents for their own care; no parental permission needed.",
        },
        {
          when: "Adult with intellectual disability",
          action: "Guardian consents, or supported decision-making where the state allows it.",
        },
        {
          when: "Every patient",
          tone: "always",
          action:
            "Seek the child’s assent, use a qualified interpreter when needed, and document the discussion.",
          details: ["Translation apps aren’t yet accurate enough to rely on"],
        },
      ],
      evidence: [{ source: "consent", pages: "1–3" }],
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
  "access-special-needs": [
    {
      question: "Plan care for a patient with special health care needs",
      sequence: true,
      branches: [
        {
          when: "Ask",
          action:
            "What has worked before: communication, sensory triggers, routines, accommodations.",
        },
        {
          when: "Assess",
          action: "Medical conditions, medications, airway risk, and what the procedure demands.",
        },
        {
          when: "Adapt",
          action: "Scheduling, staff, environment, prevention, and caregiver support.",
        },
        {
          when: "Coordinate",
          action: "Consult, or move to a higher-level setting, when risk or scope requires it.",
        },
        {
          when: "Hand off",
          action: "Confirm a receiving dental home; keep emergency access during transition.",
        },
      ],
      evidence: [
        {
          source: "shcn",
          pages: "5–6",
        },
        {
          source: "home",
          pages: "1–2",
        },
      ],
    },
  ],
  "exam-approach": [
    {
      question: "An examiner asks you a question",
      sequence: true,
      branches: [
        {
          when: "Hear it",
          action: "Pause. Identify exactly what is being asked; ask to clarify if needed.",
        },
        {
          when: "Answer it",
          action: "Give the direct answer first, not everything you know about the topic.",
        },
        {
          when: "Explain why",
          action: "Name the findings and reasoning that support your choice.",
        },
        {
          when: "Close the loop",
          action: "Follow-up, prognosis, or what would change your plan. Then stop.",
        },
      ],
      evidence: [
        {
          source: "oce-guide",
          pages: "20–21",
        },
      ],
      note: "The sequence follows ABPD’s communication-strategies page (listen, clarify, structured and rationale-driven answers). It is a study cue, not an official script.",
    },
  ],
};
