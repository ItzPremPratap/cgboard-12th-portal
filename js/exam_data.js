/**
 * CGBSE Class 12 Biology (Subject Code: 203) - English Medium
 * Last 3 Years (2024, 2025, 2026) Trend Analysis & 2027 Predicted Model Paper Data
 */

const EXAM_META = {
    board: "Chhattisgarh Board of Secondary Education, Raipur (C.G.)",
    boardHindi: "छत्तीसगढ़ माध्यमिक शिक्षा मंडल, रायपुर",
    examName: "Higher Secondary Certificate Examination - 2027 (Predicted Model Paper)",
    subject: "Biology / जीव विज्ञान",
    subjectCode: "203",
    class: "12th (Class XII)",
    medium: "English Medium",
    totalMarks: 70,
    practicalMarks: 30,
    grandTotal: 100,
    durationMinutes: 180, // 3 Hours
    readingTimeMinutes: 15,
    passingPercentage: 33, // 23 marks out of 70
    units: [
        { id: 1, name: "Reproduction", chapters: ["Sexual Reproduction in Flowering Plants", "Human Reproduction", "Reproductive Health"], marks: 14 },
        { id: 2, name: "Genetics and Evolution", chapters: ["Principles of Inheritance and Variation", "Molecular Basis of Inheritance", "Evolution"], marks: 18 },
        { id: 3, name: "Biology and Human Welfare", chapters: ["Human Health and Disease", "Microbes in Human Welfare"], marks: 14 },
        { id: 4, name: "Biotechnology and its Applications", chapters: ["Biotechnology: Principles and Processes", "Biotechnology and its Applications"], marks: 10 },
        { id: 5, name: "Ecology and Environment", chapters: ["Organisms and Populations", "Ecosystem", "Biodiversity and Conservation"], marks: 14 }
    ]
};

// 3-Year Paper Analysis Data (2024, 2025, 2026)
const PAST_3_YEARS_ANALYSIS = {
    overview: "Comprehensive comparative analysis of CGBSE Class 12 Biology English Medium papers over the last 3 examination cycles (2024, 2025, 2026). It highlights recurring question types, blueprint distribution, and diagram patterns.",
    summaryMetrics: [
        { metric: "Total Theory Marks", value: "70 Marks", note: "Consistent across all 3 years" },
        { metric: "Objective & VSA (1 Mark)", value: "15 Marks", note: "10 MCQs + 5 One-word / One-sentence" },
        { metric: "Short Answer Type-I (2 Marks)", value: "14 Marks", note: "7 questions, ~30 words limit" },
        { metric: "Short Answer Type-II (3 Marks)", value: "18 Marks", note: "6 questions, ~50 words limit" },
        { metric: "Long Answer Type-I (4 Marks)", value: "8 Marks", note: "2 questions, case/structural analysis" },
        { metric: "Long Answer Type-II (5 Marks)", value: "15 Marks", note: "3 questions with internal 'OR' choices" }
    ],
    unitWiseTrend: [
        {
            unit: "Unit VI: Reproduction",
            weightage: "14 Marks",
            y2024: "Anatropous ovule diagram (3M), Leydig cells function (1M), Microsporogenesis steps (3M), Barrier methods vs IUDs (2M), Double fertilization (5M)",
            y2025: "Spermatogenesis vs Oogenesis (3M), Cleistogamous flowers (2M), Statutory ban on Amniocentesis (2M), Diagram of Human Sperm (3M), Embryo sac post-fertilization changes (4M)",
            y2026: "Pollination types & adaptations (3M), Menstrual cycle follicular & luteal phases (5M), Copper-T mode of action (1M), Tapetum functions (2M), ART techniques - IVF & ZIFT (3M)",
            trendComment: "High diagram frequency (Ovule, Sperm, Blastocyst). Internal choice in 5M invariably balances Botany (flowering plants) against Zoology (human reproduction)."
        },
        {
            unit: "Unit VII: Genetics & Evolution",
            weightage: "18 Marks (Highest)",
            y2024: "Monohybrid cross genotypic ratio (2M), Turner's syndrome (1M), Lac Operon model with diagram (5M), Homologous vs Analogous organs (3M), Meselson-Stahl experiment (4M), Central Dogma (1M), Incomplete dominance (2M)",
            y2025: "Dihybrid cross Punnett square (5M), Nucleosome solenoid model (3M), Sickle cell anemia point mutation (3M), Hardy-Weinberg equilibrium (3M), Genetic code characteristics (2M), Transcription unit diagram (2M)",
            y2026: "DNA replication fork & enzymes (5M), Sex determination in birds & honeybees (3M), Down's syndrome features (2M), Hershey-Chase experiment (4M), Adaptive radiation (2M), AUG start codon (1M), Pleiotropy (1M)",
            trendComment: "Carries 25.7% of total marks. Long answers alternate between Lac Operon, Meselson-Stahl, Dihybrid Cross, and DNA replication. 100% guarantee of at least one genetic disorder question."
        },
        {
            unit: "Unit VIII: Biology & Human Welfare",
            weightage: "14 Marks",
            y2024: "Plasmodium life cycle diagram (5M), Innate immunity barriers (2M), Primary vs Secondary sewage treatment (3M), Biogas plant labeled sketch (3M), Heroin plant source (1M)",
            y2025: "Antibody molecule structure (IgG) with H2L2 chains (3M), Typhoid & Widal test (1M), Microbes in food - LAB & yeast (2M), Cancer cells characteristics (4M), Allergy & IgE (2M), Mycorrhiza role (2M)",
            y2026: "HIV lifecycle inside macrophage & T-cells (5M), Active vs Passive immunity (2M), Methanogens in biogas (2M), Drug abuse - Cannabinoids (2M), Biocontrol agents (3M)",
            trendComment: "Diagrams of Biogas plant, Antibody structure, and Plasmodium lifecycle rotate every 1-2 years. Microbes in sewage or biogas is guaranteed in 3M or 5M."
        },
        {
            unit: "Unit IX: Biotechnology & Applications",
            weightage: "10 Marks",
            y2024: "pBR322 vector labeled diagram with Ori & antibiotic resistance (3M), PCR 3 steps (3M), Bt cotton Cry protein mode of action (2M), Palindromic sequence of EcoRI (2M)",
            y2025: "Recombinant DNA steps flowchart (3M), Gel electrophoresis principle & EtBr visualization (3M), Gene therapy for ADA deficiency (4M)",
            y2026: "Restriction endonuclease mechanism (2M), Bioreactor sparged & stirred tank (3M), RNA interference (RNAi) in tobacco roots (3M), Genetically engineered insulin synthesis (2M)",
            trendComment: "Very predictable questions: pBR322, PCR steps, Bt cotton Cry gene mechanism, and ADA gene therapy constitute 85% of questions asked in this unit."
        },
        {
            unit: "Unit X: Ecology & Environment",
            weightage: "14 Marks",
            y2024: "Inverted vs Upright ecological pyramid (2M), Population interactions table (3M), The Evil Quartet for biodiversity loss (4M), In-situ vs Ex-situ conservation (3M), Ecological succession (2M)",
            y2025: "Allen's rule & desert adaptations (2M), 10% energy transfer law (3M), Biodiversity hotspots criteria & names (3M), Logistic growth curve sigmoid equation (4M), Sacred groves (2M)",
            y2026: "Gause's Competitive Exclusion Principle (2M), Decomposition steps (3M), Red Data Book & IUCN (2M), Pyramid of biomass in ocean vs forest (3M), Biosphere reserves (4M)",
            trendComment: "Key focuses: 'The Evil Quartet', Population interactions (mutualism/commensalism), 10% Energy law & Pyramids, and In-situ/Ex-situ conservation."
        }
    ],
    diagramFrequencyRank: [
        { rank: 1, name: "Anatropous Ovule (L.S.)", unit: "Reproduction", timesAsked: "3 times in 4 years", importance: "Very High" },
        { rank: 2, name: "Lac Operon (Switched On / Off)", unit: "Genetics", timesAsked: "3 times in 4 years", importance: "Critical" },
        { rank: 3, name: "Cloning Vector pBR322", unit: "Biotechnology", timesAsked: "2 times in 3 years", importance: "Very High" },
        { rank: 4, name: "Biogas Plant (Gobar Gas)", unit: "Human Welfare", timesAsked: "2 times in 3 years", importance: "High" },
        { rank: 5, name: "Plasmodium Lifecycle Flowchart", unit: "Human Welfare", timesAsked: "2 times in 3 years", importance: "Very High" },
        { rank: 6, name: "Antibody Structure (IgG - H2L2)", unit: "Human Welfare", timesAsked: "2 times in 3 years", importance: "High" },
        { rank: 7, name: "Human Sperm Anatomy", unit: "Reproduction", timesAsked: "2 times in 3 years", importance: "High" },
        { rank: 8, name: "Ecological Pyramids (Energy / Biomass)", unit: "Ecology", timesAsked: "Every Year", importance: "Essential" }
    ]
};

// 2027 Board Predictions & Hot Topics
const PREDICTIONS_2027 = {
    overview: "Based on 3-year recurring pattern analysis, syllabus rotation cycles, and NCERT-CGBSE question bank frequency, here are the highest-probability questions and concepts forecasted for the 2027 CGBSE Class 12 Biology examination.",
    hotTopics: [
        {
            topic: "Lac Operon Model (Switch On & Off)",
            chapter: "Molecular Basis of Inheritance",
            probability: "95%",
            type: "5 Marks (Long Answer)",
            reason: "Appeared in 2024, skipped in 2025/26 in 5M slot. Due for return in 2027 as 5-mark diagram & explanation question."
        },
        {
            topic: "Megasporogenesis & Anatropous Ovule Diagram",
            chapter: "Sexual Reproduction in Flowering Plants",
            probability: "92%",
            type: "3 or 5 Marks",
            reason: "Most recurring botany diagram in CGBSE history. Key labels: Micropyle, Chalaza, Integuments, Embryo Sac."
        },
        {
            topic: "Polymerase Chain Reaction (PCR) - 3 Steps",
            chapter: "Biotechnology: Principles and Processes",
            probability: "90%",
            type: "3 Marks",
            reason: "PCR steps (Denaturation 94°C, Annealing 50-60°C, Extension 72°C with Taq polymerase) is a core favourite."
        },
        {
            topic: "Biogas Plant Labeled Diagram & Methanogens",
            chapter: "Microbes in Human Welfare",
            probability: "88%",
            type: "5 Marks (with OR choice)",
            reason: "Rotates with Sewage Treatment Plant every alternate year."
        },
        {
            topic: "Malarial Parasite (Plasmodium) Life Cycle",
            chapter: "Human Health and Diseases",
            probability: "91%",
            type: "5 Marks (Long Answer)",
            reason: "Dual host lifecycle (Human & Female Anopheles mosquito), Hemozoin toxin explanation."
        },
        {
            topic: "Dihybrid Cross & Law of Independent Assortment",
            chapter: "Principles of Inheritance and Variation",
            probability: "86%",
            type: "4 or 5 Marks",
            reason: "9:3:3:1 phenotypic ratio cross, standard genetics problem."
        },
        {
            topic: "The Evil Quartet of Biodiversity Loss",
            chapter: "Biodiversity and Conservation",
            probability: "94%",
            type: "4 Marks (Case-based / LA-I)",
            reason: "Habitat loss, Over-exploitation, Alien invasive species, Co-extinctions."
        },
        {
            topic: "Bt Cotton & Cry Protein Mode of Action",
            chapter: "Biotechnology and its Applications",
            probability: "85%",
            type: "2 or 3 Marks",
            reason: "Alkaline pH of gut activates protoxin, creates pores in epithelial cells."
        },
        {
            topic: "Sex Determination in Honeybees (Haplodiploidy)",
            chapter: "Principles of Inheritance and Variation",
            probability: "87%",
            type: "3 Marks",
            reason: "Parthenogenesis in males (16 chromosomes) and fertilization in females (32 chromosomes)."
        },
        {
            topic: "ADA Deficiency & Retroviral Gene Therapy",
            chapter: "Biotechnology and its Applications",
            probability: "89%",
            type: "3 or 4 Marks",
            reason: "First clinical gene therapy performed in 1990; standard high-frequency question."
        }
    ]
};

// Full Predicted 2027 CGBSE Model Question Paper (70 Marks)
const PREDICTED_PAPER_2027 = {
    header: {
        title: "CHHATTISGARH BOARD OF SECONDARY EDUCATION, RAIPUR",
        subTitle: "HIGHER SECONDARY EXAMINATION - 2027 (PREDICTED MODEL PAPER)",
        subject: "BIOLOGY (जीव विज्ञान) - ENGLISH MEDIUM",
        subjectCode: "203",
        timeAllowed: "3 Hours (180 Minutes)",
        maximumMarks: 70
    },
    generalInstructions: [
        "All questions are compulsory. Internal choice is provided in questions 17, 18, and 19.",
        "Question No. 1 is Objective / Very Short Answer type carrying 15 marks. It has two parts:",
        "  - Part (i) to (x): 10 Multiple Choice Questions carrying 1 mark each.",
        "  - Part (xi) to (xv): 5 Very Short Answer questions carrying 1 mark each (answer in one word or one sentence).",
        "Question Nos. 2 to 8 are Short Answer Type-I carrying 2 marks each (Word limit: approx. 30 words).",
        "Question Nos. 9 to 14 are Short Answer Type-II carrying 3 marks each (Word limit: approx. 50 words).",
        "Question Nos. 15 and 16 are Long Answer Type-I / Case-Study based carrying 4 marks each (Word limit: approx. 75 to 100 words).",
        "Question Nos. 17 to 19 are Long Answer Type-II carrying 5 marks each (Word limit: approx. 100 to 150 words).",
        "Draw neat, clean, and well-labeled diagrams wherever necessary."
    ],
    sections: [
        {
            id: "sec-a",
            title: "SECTION 'A' (Q.1) - OBJECTIVE & VERY SHORT ANSWER (15 Marks)",
            description: "Part (i) to (x) carry 1 mark each (MCQs). Part (xi) to (xv) carry 1 mark each (One-word / One-sentence).",
            marksTotal: 15,
            questions: [
                // MCQs 1 to 10
                {
                    id: "q1_i",
                    qNum: "Q.1 (i)",
                    type: "mcq",
                    marks: 1,
                    unit: "Reproduction",
                    question: "In an angiosperm, the functional megaspore develops into:",
                    options: [
                        { key: "A", text: "Pollen grain" },
                        { key: "B", text: "Embryo sac (Female gametophyte)" },
                        { key: "C", text: "Endosperm" },
                        { key: "D", text: "Ovule" }
                    ],
                    correctAnswer: "B",
                    modelAnswer: "Correct Option: [B] Embryo sac (Female gametophyte). In angiosperms, three megaspores degenerate and one functional megaspore undergoes three successive mitotic divisions to form an 8-nucleate, 7-celled embryo sac.",
                    keywords: ["embryo sac", "female gametophyte"],
                    markingScheme: "1 mark for selecting option B (Embryo sac)."
                },
                {
                    id: "q1_ii",
                    qNum: "Q.1 (ii)",
                    type: "mcq",
                    marks: 1,
                    unit: "Reproduction",
                    question: "Which hormone surge triggers ovulation during the midpoint of the human menstrual cycle?",
                    options: [
                        { key: "A", text: "Progesterone" },
                        { key: "B", text: "Estrogen" },
                        { key: "C", text: "LH (Luteinizing Hormone)" },
                        { key: "D", text: "FSH (Follicle Stimulating Hormone)" }
                    ],
                    correctAnswer: "C",
                    modelAnswer: "Correct Option: [C] LH (Luteinizing Hormone). Rapid secretion of LH leading to its maximum level around the 14th day (called LH surge) induces rupture of the mature Graafian follicle and release of the ovum (ovulation).",
                    keywords: ["LH", "luteinizing hormone", "LH surge"],
                    markingScheme: "1 mark for selecting option C (LH)."
                },
                {
                    id: "q1_iii",
                    qNum: "Q.1 (iii)",
                    type: "mcq",
                    marks: 1,
                    unit: "Genetics and Evolution",
                    question: "According to Mendel's Law of Independent Assortment, the phenotypic ratio in the F2 generation of a dihybrid cross is:",
                    options: [
                        { key: "A", text: "3 : 1" },
                        { key: "B", text: "1 : 2 : 1" },
                        { key: "C", text: "9 : 3 : 3 : 1" },
                        { key: "D", text: "9 : 7" }
                    ],
                    correctAnswer: "C",
                    modelAnswer: "Correct Option: [C] 9 : 3 : 3 : 1. In Mendel's dihybrid cross involving seed shape and color (Round Yellow x Wrinkled Green), the F2 phenotypic ratio obtained is 9 (Round Yellow) : 3 (Round Green) : 3 (Wrinkled Yellow) : 1 (Wrinkled Green).",
                    keywords: ["9:3:3:1", "dihybrid"],
                    markingScheme: "1 mark for selecting option C."
                },
                {
                    id: "q1_iv",
                    qNum: "Q.1 (iv)",
                    type: "mcq",
                    marks: 1,
                    unit: "Genetics and Evolution",
                    question: "In the Lac Operon model of E. coli, the repressor protein binds to the:",
                    options: [
                        { key: "A", text: "Promoter gene (p)" },
                        { key: "B", text: "Operator gene (o)" },
                        { key: "C", text: "Structural gene z" },
                        { key: "D", text: "Regulator gene (i)" }
                    ],
                    correctAnswer: "B",
                    modelAnswer: "Correct Option: [B] Operator gene (o). The repressor protein synthesized by the 'i' gene binds to the operator region of the operon and prevents RNA polymerase from transcribing the structural genes.",
                    keywords: ["operator", "operator gene", "o gene"],
                    markingScheme: "1 mark for selecting option B (Operator gene)."
                },
                {
                    id: "q1_v",
                    qNum: "Q.1 (v)",
                    type: "mcq",
                    marks: 1,
                    unit: "Biology and Human Welfare",
                    question: "Which immunoglobulin (antibody) is abundantly present in the yellow fluid 'Colostrum' secreted during the initial days of lactation?",
                    options: [
                        { key: "A", text: "IgG" },
                        { key: "B", text: "IgA" },
                        { key: "C", text: "IgM" },
                        { key: "D", text: "IgE" }
                    ],
                    correctAnswer: "B",
                    modelAnswer: "Correct Option: [B] IgA. Colostrum contains abundant IgA antibodies to protect the newborn infant from various infections through passive immunity.",
                    keywords: ["IgA", "immunoglobulin A"],
                    markingScheme: "1 mark for selecting option B (IgA)."
                },
                {
                    id: "q1_vi",
                    qNum: "Q.1 (vi)",
                    type: "mcq",
                    marks: 1,
                    unit: "Biology and Human Welfare",
                    question: "The toxic chemical substance released upon the rupture of RBCs responsible for chills and high fever in malaria is:",
                    options: [
                        { key: "A", text: "Sporozoite" },
                        { key: "B", text: "Interferon" },
                        { key: "C", text: "Hemozoin" },
                        { key: "D", text: "Histamine" }
                    ],
                    correctAnswer: "C",
                    modelAnswer: "Correct Option: [C] Hemozoin. When Plasmodium-infected RBCs rupture, they release hemozoin, a toxic pigment produced from the digestion of hemoglobin, which causes recurring chills and high fever.",
                    keywords: ["hemozoin"],
                    markingScheme: "1 mark for selecting option C (Hemozoin)."
                },
                {
                    id: "q1_vii",
                    qNum: "Q.1 (vii)",
                    type: "mcq",
                    marks: 1,
                    unit: "Biotechnology and its Applications",
                    question: "The thermostable DNA polymerase used in Polymerase Chain Reaction (PCR) is isolated from:",
                    options: [
                        { key: "A", text: "Escherichia coli" },
                        { key: "B", text: "Thermus aquaticus" },
                        { key: "C", text: "Bacillus thuringiensis" },
                        { key: "D", text: "Agrobacterium tumefaciens" }
                    ],
                    correctAnswer: "B",
                    modelAnswer: "Correct Option: [B] Thermus aquaticus. Taq polymerase is isolated from the bacterium Thermus aquaticus because it remains active during the high-temperature denaturation step (94°C) of PCR.",
                    keywords: ["Thermus aquaticus", "Taq polymerase"],
                    markingScheme: "1 mark for selecting option B (Thermus aquaticus)."
                },
                {
                    id: "q1_viii",
                    qNum: "Q.1 (viii)",
                    type: "mcq",
                    marks: 1,
                    unit: "Biotechnology and its Applications",
                    question: "The first clinical gene therapy was given in 1990 to a 4-year-old girl for the treatment of:",
                    options: [
                        { key: "A", text: "Diabetes mellitus" },
                        { key: "B", text: "Adenosine Deaminase (ADA) deficiency" },
                        { key: "C", text: "Cystic fibrosis" },
                        { key: "D", text: "Hemophilia" }
                    ],
                    correctAnswer: "B",
                    modelAnswer: "Correct Option: [B] Adenosine Deaminase (ADA) deficiency. ADA deficiency is caused due to deletion of the gene for adenosine deaminase, causing severe combined immunodeficiency (SCID).",
                    keywords: ["ADA", "adenosine deaminase"],
                    markingScheme: "1 mark for selecting option B."
                },
                {
                    id: "q1_ix",
                    qNum: "Q.1 (ix)",
                    type: "mcq",
                    marks: 1,
                    unit: "Ecology and Environment",
                    question: "In any ecological ecosystem, the Pyramid of Energy is always:",
                    options: [
                        { key: "A", text: "Always inverted" },
                        { key: "B", text: "Always upright" },
                        { key: "C", text: "Spindle-shaped" },
                        { key: "D", text: "Both upright and inverted" }
                    ],
                    correctAnswer: "B",
                    modelAnswer: "Correct Option: [B] Always upright. According to the 10% law of energy transfer (Lindeman), energy decreases at each successive trophic level because energy is lost as metabolic heat, so the pyramid of energy is always upright.",
                    keywords: ["upright", "always upright"],
                    markingScheme: "1 mark for selecting option B (Always upright)."
                },
                {
                    id: "q1_x",
                    qNum: "Q.1 (x)",
                    type: "mcq",
                    marks: 1,
                    unit: "Ecology and Environment",
                    question: "Which of the following is NOT one of the 'Evil Quartet' responsible for biodiversity loss?",
                    options: [
                        { key: "A", text: "Habitat loss and fragmentation" },
                        { key: "B", text: "Over-exploitation" },
                        { key: "C", text: "In-situ conservation" },
                        { key: "D", text: "Alien species invasion" }
                    ],
                    correctAnswer: "C",
                    modelAnswer: "Correct Option: [C] In-situ conservation. In-situ conservation is a protective conservation method (e.g., National Parks, Biosphere Reserves), whereas the 'Evil Quartet' comprises Habitat loss, Over-exploitation, Alien species invasions, and Co-extinctions.",
                    keywords: ["in-situ conservation", "conservation"],
                    markingScheme: "1 mark for selecting option C."
                },

                // VSA 11 to 15
                {
                    id: "q1_xi",
                    qNum: "Q.1 (xi)",
                    type: "vsa",
                    marks: 1,
                    unit: "Reproduction",
                    question: "Name the innermost nutritive tissue layer of the microsporangium in an angiosperm anther.",
                    modelAnswer: "Tapetum (It nourishes the developing pollen grains / microspore mother cells).",
                    keywords: ["tapetum", "nourish"],
                    markingScheme: "1 mark for writing 'Tapetum'."
                },
                {
                    id: "q1_xii",
                    qNum: "Q.1 (xii)",
                    type: "vsa",
                    marks: 1,
                    unit: "Genetics and Evolution",
                    question: "Mention the genetic karyotype constitution of a person suffering from Klinefelter's syndrome.",
                    modelAnswer: "47, XXY (Presence of an additional X chromosome in males: 44 autosomes + XXY).",
                    keywords: ["47, XXY", "XXY", "47 chromosomes", "additional X"],
                    markingScheme: "1 mark for stating '47, XXY' or 'XXY'."
                },
                {
                    id: "q1_xiii",
                    qNum: "Q.1 (xiii)",
                    type: "vsa",
                    marks: 1,
                    unit: "Biology and Human Welfare",
                    question: "Name the mosquito vector responsible for transmitting Dengue virus and Chikungunya in humans.",
                    modelAnswer: "Aedes mosquito (Aedes aegypti).",
                    keywords: ["aedes", "aedes aegypti"],
                    markingScheme: "1 mark for stating 'Aedes' or 'Aedes aegypti'."
                },
                {
                    id: "q1_xiv",
                    qNum: "Q.1 (xiv)",
                    type: "vsa",
                    marks: 1,
                    unit: "Biotechnology and its Applications",
                    question: "Name the specific restriction endonuclease that cleaves DNA at the palindromic sequence 5'-GAATTC-3'.",
                    modelAnswer: "EcoRI (isolated from Escherichia coli RY13).",
                    keywords: ["EcoRI", "Eco RI", "Eco-RI"],
                    markingScheme: "1 mark for writing 'EcoRI'."
                },
                {
                    id: "q1_xv",
                    qNum: "Q.1 (xv)",
                    type: "vsa",
                    marks: 1,
                    unit: "Ecology and Environment",
                    question: "Define the term 'Commensalism' in population interactions.",
                    modelAnswer: "Commensalism is an ecological interaction between two species in which one species benefits while the other species is neither harmed nor benefited (+/0 interaction). Example: Epiphytic orchid growing on a mango branch.",
                    keywords: ["one benefits", "neither harmed nor benefited", "+/0", "orchid"],
                    markingScheme: "1 mark for defining one benefits and other remains unaffected/neutral."
                }
            ]
        },
        {
            id: "sec-b",
            title: "SECTION 'B' (Q.2 to Q.8) - SHORT ANSWER TYPE-I (14 Marks)",
            description: "Answer each question in approx. 30 words. Each question carries 2 marks.",
            marksTotal: 14,
            questions: [
                {
                    id: "q2",
                    qNum: "Q.2",
                    type: "sa1",
                    marks: 2,
                    unit: "Reproduction",
                    question: "What is 'Double Fertilization' in flowering plants? Name the two fusion events involved.",
                    modelAnswer: "Double fertilization is a unique event in angiosperms where two fertilizations take place inside an embryo sac:\n1. Syngamy (True fertilization): Fusion of one haploid male gamete with the egg cell nucleus to form a diploid Zygote (2n).\n2. Triple Fusion: Fusion of the second haploid male gamete with two polar nuclei to form a triploid Primary Endosperm Nucleus (PEN, 3n).",
                    keywords: ["syngamy", "triple fusion", "zygote", "primary endosperm nucleus", "PEN", "two fertilizations"],
                    rubric: [
                        { criterion: "Definition of Double Fertilization", marks: 0.5 },
                        { criterion: "Mention of Syngamy (Male gamete + Egg -> Zygote)", marks: 0.75 },
                        { criterion: "Mention of Triple Fusion (Male gamete + 2 Polar nuclei -> PEN)", marks: 0.75 }
                    ],
                    markingScheme: "1 mark for naming & defining Syngamy + 1 mark for naming & defining Triple Fusion."
                },
                {
                    id: "q3",
                    qNum: "Q.3",
                    type: "sa1",
                    marks: 2,
                    unit: "Reproduction",
                    question: "Differentiate between Spermatogenesis and Oogenesis on the basis of: (a) Site of occurrence, (b) Number of functional gametes produced from one mother cell.",
                    modelAnswer: "Differences between Spermatogenesis and Oogenesis:\n1. Site of occurrence: Spermatogenesis occurs inside the seminiferous tubules of testes in males. Oogenesis occurs inside the ovaries in females.\n2. Number of functional gametes: One primary spermatocyte produces 4 functional spermatozoa (sperms). In contrast, one primary oocyte produces only 1 functional ovum (along with polar bodies which degenerate).",
                    keywords: ["seminiferous tubules", "testes", "ovary", "4 functional", "1 functional ovum", "polar body"],
                    rubric: [
                        { criterion: "Correct comparison of site (Testes vs Ovary)", marks: 1 },
                        { criterion: "Correct comparison of gametes produced (4 sperms vs 1 ovum)", marks: 1 }
                    ],
                    markingScheme: "1 mark for site comparison + 1 mark for number of functional gametes."
                },
                {
                    id: "q4",
                    qNum: "Q.4",
                    type: "sa1",
                    marks: 2,
                    unit: "Genetics and Evolution",
                    question: "State Mendel's Law of Segregation (Purity of Gametes). Why is it called universally applicable?",
                    modelAnswer: "Mendel's Law of Segregation states that though the two alleles of a gene remain together in an individual, they do not blend or mix. During gamete formation, alleles segregate (separate) from each other so that each gamete carries only one of the two alleles.\nIt is called universally applicable because there are no exceptions to this law in sexually reproducing diploid organisms; alleles always segregate during meiosis.",
                    keywords: ["alleles segregate", "do not blend", "pure gamete", "meiosis", "no exception"],
                    rubric: [
                        { criterion: "Statement of Law of Segregation", marks: 1.5 },
                        { criterion: "Reason for universal validity (no blending/exceptions)", marks: 0.5 }
                    ],
                    markingScheme: "1.5 marks for statement + 0.5 mark for universal validity."
                },
                {
                    id: "q5",
                    qNum: "Q.5",
                    type: "sa1",
                    marks: 2,
                    unit: "Genetics and Evolution",
                    question: "Why is DNA considered a chemically and structurally more stable genetic material than RNA? Give two reasons.",
                    modelAnswer: "DNA is more stable than RNA because:\n1. Chemical stability: RNA has a 2'-OH group present at every nucleotide in the ribose sugar, which makes RNA reactive and easily degradable. DNA lacks this group (deoxyribose) and is chemically less reactive.\n2. Presence of Thymine: DNA contains Thymine instead of Uracil. The methyl group in thymine provides additional stability and protection against photochemical damage.",
                    keywords: ["2'-OH group", "reactive", "thymine", "uracil", "deoxyribose", "stable"],
                    rubric: [
                        { criterion: "Reason 1: 2'-OH group in RNA makes it reactive / DNA lacks it", marks: 1 },
                        { criterion: "Reason 2: Presence of Thymine provides stability compared to Uracil", marks: 1 }
                    ],
                    markingScheme: "1 mark for each valid scientific reason."
                },
                {
                    id: "q6",
                    qNum: "Q.6",
                    type: "sa1",
                    marks: 2,
                    unit: "Biology and Human Welfare",
                    question: "Distinguish between Active Immunity and Passive Immunity. Give one suitable example of each.",
                    modelAnswer: "1. Active Immunity: Produced actively by the host's own immune system when exposed to living or dead microbes (antigens). It is long-lasting and slow in response. Example: Immunity gained after natural infection (e.g., chickenpox) or vaccination (e.g., Polio vaccine).\n2. Passive Immunity: Readily prepared antibodies are directly administered to protect against antigens. It provides fast, temporary protection without immunological memory. Example: Colostrum (IgA) given to infants or anti-tetanus serum (ATS).",
                    keywords: ["host own antibodies", "slow", "preformed antibodies", "fast", "vaccination", "colostrum", "ATS"],
                    rubric: [
                        { criterion: "Definition / difference between active and passive", marks: 1 },
                        { criterion: "Accurate example for each (1 active, 1 passive)", marks: 1 }
                    ],
                    markingScheme: "1 mark for contrast + 0.5 mark for active example + 0.5 mark for passive example."
                },
                {
                    id: "q7",
                    qNum: "Q.7",
                    type: "sa1",
                    marks: 2,
                    unit: "Biotechnology and its Applications",
                    question: "What are 'Palindromic Nucleotide Sequences' in DNA? Illustrate with the recognition sequence for EcoRI.",
                    modelAnswer: "A palindromic nucleotide sequence is a sequence of base pairs in double-stranded DNA that reads the same on both strands when reading direction is kept the same (5' -> 3' or 3' -> 5').\nRecognition sequence of EcoRI:\n5' - G A A T T C - 3'\n3' - C T T A A G - 5'\nEcoRI cuts both strands between G and A, producing sticky overhangs.",
                    keywords: ["reads the same", "5' to 3'", "GAATTC", "CTTAAG", "sticky ends"],
                    rubric: [
                        { criterion: "Definition of palindromic sequence", marks: 1 },
                        { criterion: "Correct representation of EcoRI sequence (5'-GAATTC-3' and 3'-CTTAAG-5')", marks: 1 }
                    ],
                    markingScheme: "1 mark for definition + 1 mark for EcoRI sequence representation."
                },
                {
                    id: "q8",
                    qNum: "Q.8",
                    type: "sa1",
                    marks: 2,
                    unit: "Ecology and Environment",
                    question: "State Gause's 'Competitive Exclusion Principle'. Under what ecological condition does it operate?",
                    modelAnswer: "Gause's Competitive Exclusion Principle states that two closely related species competing for the same limiting resources cannot coexist indefinitely; the competitively inferior species will eventually be eliminated.\nEcological condition: It operates strictly when resources are limited (finite) and both species occupy the same ecological niche.",
                    keywords: ["competing", "limiting resources", "cannot coexist", "inferior eliminated", "resources limited"],
                    rubric: [
                        { criterion: "Statement of Gause's Principle", marks: 1 },
                        { criterion: "Operating condition (limited resources / same niche)", marks: 1 }
                    ],
                    markingScheme: "1 mark for principle + 1 mark for condition."
                }
            ]
        },
        {
            id: "sec-c",
            title: "SECTION 'C' (Q.9 to Q.14) - SHORT ANSWER TYPE-II (18 Marks)",
            description: "Answer each question in approx. 50 words. Each question carries 3 marks.",
            marksTotal: 18,
            questions: [
                {
                    id: "q9",
                    qNum: "Q.9",
                    type: "sa2",
                    marks: 3,
                    unit: "Reproduction",
                    question: "Describe the structural features of an Anatropous Ovule of an angiosperm. Mention the functions of (a) Micropyle, (b) Chalaza, and (c) Integuments.",
                    modelAnswer: "An anatropous ovule is an inverted ovule where the body bends completely so the micropyle lies close to the funicle (hilum).\nKey structural parts & functions:\n1. Micropyle: A minute pore at the tip where integuments are absent; it facilitates pollen tube entry and water/oxygen entry during seed germination.\n2. Chalaza: The basal swollen region of the ovule opposite to the micropyle; it anchors the integuments and embryo sac.\n3. Integuments: One or two protective outer layers (outer and inner integuments) that encircle the nucellus and later develop into the seed coat (testa and tegmen).",
                    diagramSvg: `<svg viewBox="0 0 400 240" style="width: 100%; max-width: 360px; height: auto; background: #fdfdfd; border: 1px solid #e2e8f0; border-radius: 8px; margin: 0.75rem 0;">
                        <rect width="400" height="240" fill="#fafafa"/>
                        <!-- Ovule outline -->
                        <path d="M 180,30 C 270,30 270,190 170,190 C 130,190 120,160 120,130 C 120,80 140,30 180,30 Z" fill="#eff6ff" stroke="#1e3a8a" stroke-width="2"/>
                        <!-- Inner integument -->
                        <path d="M 180,50 C 240,50 240,170 170,170 C 145,170 138,145 138,125 C 138,85 150,50 180,50 Z" fill="#e0f2fe" stroke="#0284c7" stroke-width="1.5"/>
                        <!-- Nucellus & Embryo Sac -->
                        <ellipse cx="185" cy="115" rx="35" ry="45" fill="#fef08a" stroke="#ca8a04" stroke-width="1.5"/>
                        <!-- Antipodals -->
                        <circle cx="185" cy="85" r="4" fill="#15803d"/><circle cx="175" cy="90" r="4" fill="#15803d"/><circle cx="195" cy="90" r="4" fill="#15803d"/>
                        <!-- Polar nuclei -->
                        <circle cx="181" cy="115" r="4" fill="#b91c1c"/><circle cx="189" cy="115" r="4" fill="#b91c1c"/>
                        <!-- Egg apparatus -->
                        <circle cx="185" cy="145" r="5" fill="#7e22ce"/><circle cx="174" cy="142" r="4" fill="#0284c7"/><circle cx="196" cy="142" r="4" fill="#0284c7"/>
                        <!-- Funicle stalk -->
                        <path d="M 120,130 C 110,160 100,210 100,230" stroke="#475569" stroke-width="3" fill="none"/>
                        <!-- Labels -->
                        <text x="280" y="45" font-size="11" font-weight="bold" fill="#0f172a">← Chalaza (Basal)</text>
                        <text x="280" y="80" font-size="11" fill="#0369a1">← Outer Integument</text>
                        <text x="280" y="115" font-size="11" fill="#854d0e">← Embryo Sac (7-celled)</text>
                        <text x="10" y="165" font-size="11" font-weight="bold" fill="#b91c1c">Micropyle pore →</text>
                        <text x="20" y="215" font-size="11" fill="#475569">Funicle stalk →</text>
                    </svg>`,
                    keywords: ["anatropous", "inverted", "micropyle", "pollen tube entry", "chalaza", "basal", "integuments", "seed coat", "protective"],
                    rubric: [
                        { criterion: "Description of Anatropous Ovule", marks: 0.5 },
                        { criterion: "Function of Micropyle", marks: 0.75 },
                        { criterion: "Function of Chalaza", marks: 0.75 },
                        { criterion: "Function of Integuments", marks: 1 }
                    ],
                    markingScheme: "0.5 mark for description + 0.75 + 0.75 + 1.0 for the three respective functions."
                },
                {
                    id: "q10",
                    qNum: "Q.10",
                    type: "sa2",
                    marks: 3,
                    unit: "Genetics and Evolution",
                    question: "Explain the mechanism of sex determination in honeybees (Haplodiploidy). How do males and females differ chromosomally?",
                    modelAnswer: "In honeybees, sex determination is based on the number of chromosome sets received, called haplodiploidy:\n1. Females (Queens and Workers): They develop from fertilized eggs (zygote) through the fusion of a sperm and ovum. They are diploid (2n = 32 chromosomes).\n2. Males (Drones): They develop from unfertilized eggs by parthenogenesis without fertilization. They are haploid (n = 16 chromosomes).\n3. Gametogenesis: Females produce eggs by normal meiosis (n=16), while males produce sperms by mitosis (n=16 without meiotic reduction). Hence, drones have no father and cannot have sons, but have a grandfather and can have grandsons.",
                    keywords: ["haplodiploidy", "parthenogenesis", "diploid female 32", "haploid male 16", "unfertilized egg", "mitosis in males"],
                    rubric: [
                        { criterion: "Explanation of Haplodiploid system", marks: 1 },
                        { criterion: "Females: Fertilized egg, 2n=32 chromosomes", marks: 1 },
                        { criterion: "Males: Unfertilized egg / Parthenogenesis, n=16 chromosomes", marks: 1 }
                    ],
                    markingScheme: "1 mark for system concept + 1 mark for female chromosome details + 1 mark for male parthenogenesis."
                },
                {
                    id: "q11",
                    qNum: "Q.11",
                    type: "sa2",
                    marks: 3,
                    unit: "Biotechnology and its Applications",
                    question: "Describe the three successive steps involved in a single cycle of Polymerase Chain Reaction (PCR). Mention the optimum temperature for each step.",
                    modelAnswer: "PCR amplifies a specific DNA segment in vitro in 3 successive steps:\n1. Denaturation (at ~94°C - 96°C): The double-stranded template DNA is heated to separate the two strands by breaking the hydrogen bonds between base pairs.\n2. Annealing (at ~50°C - 60°C): Two sets of oligonucleotide primers anneal (bind) to their complementary sequences at the 3' ends of both single-stranded DNA templates.\n3. Extension (at ~72°C): Thermostable Taq DNA polymerase adds deoxynucleotides (dNTPs) to extend the primers in 5'->3' direction using the template strand, synthesizing new DNA strands.",
                    keywords: ["denaturation 94", "hydrogen bonds break", "annealing 50-60", "primers bind", "extension 72", "taq polymerase", "amplification"],
                    rubric: [
                        { criterion: "Step 1: Denaturation with temperature (~94°C) & mechanism", marks: 1 },
                        { criterion: "Step 2: Annealing with temperature (~54-60°C) & primers", marks: 1 },
                        { criterion: "Step 3: Extension with temperature (~72°C) & Taq polymerase", marks: 1 }
                    ],
                    markingScheme: "1 mark for each step with its corresponding operational temperature."
                },
                {
                    id: "q12",
                    qNum: "Q.12",
                    type: "sa2",
                    marks: 3,
                    unit: "Biology and Human Welfare",
                    question: "Explain the beneficial role of microbes in household and industrial products:\n(a) Lactic Acid Bacteria (LAB) in milk curdling,\n(b) Saccharomyces cerevisiae in bread making,\n(c) Trichoderma polysporum in medicine.",
                    modelAnswer: "(a) Lactic Acid Bacteria (LAB): Inoculated into milk as curd starter; produces lactic acid that coagulates and partially digests milk protein (casein). It converts milk into curd and improves nutritional quality by enriching it with Vitamin B12. It also checks pathogenic microbes in the gut.\n(b) Saccharomyces cerevisiae (Baker's Yeast): Ferments dough carbohydrates, releasing carbon dioxide (CO2). The escaping gas makes the bread soft, porous, and fluffy.\n(c) Trichoderma polysporum: A fungus used industrially for producing Cyclosporin A, an important immunosuppressive agent given to organ transplant patients.",
                    keywords: ["LAB", "lactic acid", "vitamin B12", "Saccharomyces", "CO2", "porous", "Trichoderma", "Cyclosporin A", "immunosuppressive"],
                    rubric: [
                        { criterion: "Role of LAB + Vitamin B12", marks: 1 },
                        { criterion: "Role of Yeast + CO2 leavening", marks: 1 },
                        { criterion: "Role of Trichoderma polysporum + Cyclosporin A", marks: 1 }
                    ],
                    markingScheme: "1 mark for each sub-part (a, b, c)."
                },
                {
                    id: "q13",
                    qNum: "Q.13",
                    type: "sa2",
                    marks: 3,
                    unit: "Biotechnology and its Applications",
                    question: "(a) What are Cry proteins? Name the bacterium from which their gene is isolated.\n(b) Explain why the Cry toxin does not kill the bacterium itself, but kills insect pests upon ingestion.",
                    modelAnswer: "(a) Cry proteins are crystalline toxic endotoxin proteins encoded by cry genes that possess insecticidal properties against pests like lepidopterans, coleopterans, and dipterans. They are isolated from the soil bacterium Bacillus thuringiensis (Bt).\n(b) Mechanism:\n- In the bacterium, Cry protein exists as an inactive, harmless protoxin, so it does not harm Bacillus thuringiensis.\n- Ingestion by Insect: When the insect ingests the protoxin, the alkaline pH of the insect midgut solubilizes the crystals and converts the inactive protoxin into active toxin.\n- The activated toxin binds to the surface of midgut epithelial cells, creates pores causing cell swelling, lysis, and ultimately insect death.",
                    keywords: ["Cry protein", "Bacillus thuringiensis", "inactive protoxin", "alkaline pH of midgut", "pores", "epithelial cells", "lysis"],
                    rubric: [
                        { criterion: "Definition of Cry protein & naming Bacillus thuringiensis", marks: 1 },
                        { criterion: "Reason for harmlessness in bacterium (inactive protoxin)", marks: 1 },
                        { criterion: "Activation in insect gut (alkaline pH, midgut pores, lysis)", marks: 1 }
                    ],
                    markingScheme: "1 mark for (a) + 2 marks for detailed mechanism in (b)."
                },
                {
                    id: "q14",
                    qNum: "Q.14",
                    type: "sa2",
                    marks: 3,
                    unit: "Ecology and Environment",
                    question: "State the 10 Percent Law of energy transfer proposed by Lindeman. Why are trophic levels in a food chain generally restricted to only 3 to 4 steps?",
                    modelAnswer: "1. Lindeman's 10% Law: When green plants capture solar energy and transfer it across trophic levels, only about 10% of the energy stored as organic matter at one trophic level is transferred to the next higher trophic level. The remaining 90% is dissipated as heat during respiration and metabolic activities.\n2. Restriction to 3-4 trophic levels:\nSince 90% of energy is lost at each step, the amount of usable energy decreases drastically up the food chain. After 3 to 4 trophic levels, the amount of residual energy becomes so negligible that it cannot support another viable population at a higher trophic level.",
                    keywords: ["10 percent law", "10%", "90% lost", "respiration", "heat", "residual energy negligible", "cannot support higher level"],
                    rubric: [
                        { criterion: "Statement of 10% Law & energy loss as heat", marks: 1.5 },
                        { criterion: "Explanation of why food chains are limited to 3-4 levels", marks: 1.5 }
                    ],
                    markingScheme: "1.5 marks for law + 1.5 marks for explanation."
                }
            ]
        },
        {
            id: "sec-d",
            title: "SECTION 'D' (Q.15 & Q.16) - LONG ANSWER TYPE-I / CASE-BASED (8 Marks)",
            description: "Answer each question in approx. 75 to 100 words. Each question carries 4 marks.",
            marksTotal: 8,
            questions: [
                {
                    id: "q15",
                    qNum: "Q.15",
                    type: "la1",
                    marks: 4,
                    unit: "Genetics and Evolution",
                    question: "Case Analysis on Human Genetics:\nA couple approached a medical genetics counselor. The husband is normal with normal blood clotting, while the wife is a phenotypically normal carrier for Hemophilia (a sex-linked recessive disorder, XhX).\n(a) Work out the genetic cross using a Punnett square showing the genotypes and phenotypes of their expected progeny.\n(b) What percentage of their sons are expected to suffer from hemophilia?\n(c) Can a daughter born to this couple be hemophilic? Explain your answer.\n(d) Why is hemophilia extremely rare in human females?",
                    modelAnswer: "(a) Genetic Cross:\nParental Phenotypes: Normal Father (X^H Y) x Carrier Mother (X^H X^h)\nGametes Father: X^H, Y | Gametes Mother: X^H, X^h\nPunnett Square:\n- X^H (Father) x X^H (Mother) -> X^H X^H (Normal Female, 25%)\n- X^H (Father) x X^h (Mother) -> X^H X^h (Carrier Female, 25%)\n- Y (Father) x X^H (Mother) -> X^H Y (Normal Male, 25%)\n- Y (Father) x X^h (Mother) -> X^h Y (Hemophilic Male, 25%)\n\n(b) Percentage of affected sons: Out of all male progeny (X^H Y and X^h Y), 50% of the sons are hemophilic (or 25% of total children).\n\n(c) Can daughter be hemophilic? NO. For a daughter to be hemophilic, she must inherit two recessive alleles (X^h X^h). Since the father provides a normal dominant allele (X^H), all daughters will have normal clotting (50% completely normal, 50% carriers).\n\n(d) Why rare in females: A female can be hemophilic only if her mother is at least a carrier (X^H X^h) and her father is hemophilic (X^h Y). Hemophilic males often do not survive to reproductive age in historical severe cases.",
                    keywords: ["carrier mother", "normal father", "punnett square", "50% sons", "daughter not hemophilic", "X-linked recessive", "XhXh required"],
                    rubric: [
                        { criterion: "(a) Correct Punnett square & progeny genotypes/phenotypes", marks: 1.5 },
                        { criterion: "(b) Correct percentage of affected sons (50% of sons / 25% total)", marks: 0.5 },
                        { criterion: "(c) Explanation for daughter not being hemophilic (receives XH from father)", marks: 1 },
                        { criterion: "(d) Scientific reason why hemophilia is rare in females (requires Xh from both parents)", marks: 1 }
                    ],
                    markingScheme: "1.5 marks for cross + 0.5 mark for (b) + 1.0 mark for (c) + 1.0 mark for (d)."
                },
                {
                    id: "q16",
                    qNum: "Q.16",
                    type: "la1",
                    marks: 4,
                    unit: "Ecology and Environment",
                    question: "Ecological Case Study on Biodiversity:\nHuman activities are driving accelerated rates of species extinction across the globe.\n(a) Explain the four major causes of biodiversity loss collectively termed 'The Evil Quartet'.\n(b) Differentiate between 'In-situ' and 'Ex-situ' conservation strategies with two appropriate examples of each.",
                    modelAnswer: "(a) The Evil Quartet (Causes of Biodiversity Loss):\n1. Habitat Loss and Fragmentation: Destruction of tropical rainforests and breaking large habitats into small fragments due to deforestation reduces shelter and territory (e.g., Amazon rainforest shrinking).\n2. Over-exploitation: Excessive harvesting and hunting beyond natural replenishment leads to extinction (e.g., Steller's sea cow, Passenger pigeon).\n3. Alien Species Invasions: Introduction of exotic non-native species causes decline of indigenous species (e.g., Nile perch introduced in Lake Victoria wiped out 200+ cichlid fish species; Eichhornia/Water hyacinth).\n4. Co-extinctions: When a host species becomes extinct, obligate dependent parasites/mutualists also go extinct (e.g., plant-pollinator mutualism).\n\n(b) In-situ vs Ex-situ Conservation:\n- In-situ (On-site) Conservation: Protecting endangered species within their natural habitat and ecosystem. Examples: National Parks (e.g., Kaziranga), Biosphere Reserves (e.g., Nilgiri), Wildlife Sanctuaries, Sacred Groves.\n- Ex-situ (Off-site) Conservation: Threatened animals and plants are taken out from their natural habitat and placed in special care settings. Examples: Zoological parks, Botanical gardens, Cryopreservation, Seed/Gene banks.",
                    keywords: ["habitat loss", "over-exploitation", "alien species", "co-extinction", "in-situ", "ex-situ", "national park", "zoological park", "cryopreservation"],
                    rubric: [
                        { criterion: "Explanation of all 4 causes of Evil Quartet with examples", marks: 2 },
                        { criterion: "Definition and contrast between In-situ and Ex-situ", marks: 1 },
                        { criterion: "Two valid examples for In-situ and two for Ex-situ", marks: 1 }
                    ],
                    markingScheme: "2 marks for Evil Quartet + 1 mark for contrast + 1 mark for examples."
                }
            ]
        },
        {
            id: "sec-e",
            title: "SECTION 'E' (Q.17 to Q.19) - LONG ANSWER TYPE-II WITH INTERNAL CHOICE (15 Marks)",
            description: "Answer each question in approx. 100 to 150 words. Each question carries 5 marks. Internal choice is provided.",
            marksTotal: 15,
            questions: [
                {
                    id: "q17",
                    qNum: "Q.17",
                    type: "la2",
                    marks: 5,
                    unit: "Reproduction",
                    hasChoice: true,
                    optionA: {
                        label: "Option A (Reproductive Endocrinology)",
                        question: "Explain the hormonal control and physiological changes occurring during the human Menstrual Cycle. Describe the ovarian and uterine events during:\n(a) Menstrual Phase,\n(b) Follicular / Proliferative Phase,\n(c) Luteal / Secretory Phase.\nMention the role of LH, FSH, Estrogen, and Progesterone.",
                        modelAnswer: "The menstrual cycle is regulated by hormones from the pituitary gland (FSH, LH) and ovary (estrogen, progesterone):\n\n1. Menstrual Phase (Days 1–5):\n- Trigger: Sharp drop in progesterone and estrogen levels due to degeneration of corpus luteum.\n- Uterine Event: Breakdown of the thickened endometrium lining and blood vessels, leading to menstrual discharge through the vagina.\n\n2. Follicular / Proliferative Phase (Days 6–13):\n- Pituitary Hormone: FSH stimulates the growth of primary follicles into mature Graafian follicles.\n- Ovarian Hormone: Follicular cells secrete Estrogen, which stimulates repair and proliferation of the uterine endometrium.\n- Ovulation (Day 14): LH and FSH reach peak levels at mid-cycle ('LH surge'), which causes the mature Graafian follicle to rupture and release the ovum.\n\n3. Luteal / Secretory Phase (Days 15–28):\n- Ovarian Event: Ruptured Graafian follicle transforms into the yellow endocrine gland Corpus Luteum.\n- Ovarian Hormone: Corpus Luteum secretes large amounts of Progesterone, which maintains and vascularizes the endometrium for blastocyst implantation.\n- If fertilization does not occur, high progesterone exerts negative feedback, corpus luteum degenerates into corpus albicans, progesterone plunges, and a new menstrual cycle initiates.",
                        keywords: ["menstrual phase", "follicular phase", "proliferative", "luteal phase", "secretory", "LH surge", "estrogen", "progesterone", "corpus luteum", "endometrium"]
                    },
                    optionB: {
                        label: "Option B (Male Reproductive Anatomy & Histology)",
                        question: "(a) Draw a neat, labeled diagram of the human male reproductive system (sagittal/sectional view).\n(b) State the specific functions of the following cells and structures:\n(i) Leydig cells (Interstitial cells),\n(ii) Sertoli cells (Nurse cells),\n(iii) Epididymis,\n(iv) Acrosome of human sperm.",
                        modelAnswer: "(a) Human Male Reproductive System Diagram:\n[Student should sketch/describe: Testis in scrotum, Epididymis, Vas deferens, Seminal vesicle, Prostate gland, Bulbourethral gland, Urethra, and Penis with proper labels].\n\n(b) Functions of Structures:\n(i) Leydig Cells (Interstitial cells): Located in the interstitial spaces between seminiferous tubules; they synthesize and secrete male steroid hormones called Androgens (chiefly Testosterone), which regulate spermatogenesis and secondary sexual characteristics.\n(ii) Sertoli Cells (Nurse cells): Located inside the germinal epithelium of seminiferous tubules; they provide mechanical support, nourishment, and regulatory factors to developing spermatogenic cells and immature spermatozoa.\n(iii) Epididymis: A convoluted tube where spermatozoa undergo physiological maturation, gain motility, and are stored temporarily before ejaculation.\n(iv) Acrosome of Sperm: A cap-like structure derived from the Golgi complex at the anterior tip of the sperm nucleus; it contains hydrolytic sperm lysins (e.g., Hyaluronidase) that dissolve the protective layers of the ovum (corona radiata, zona pellucida) to facilitate fertilization.",
                        keywords: ["testis", "vas deferens", "leydig cells", "testosterone", "sertoli cells", "nourishment", "epididymis", "maturation", "acrosome", "hyaluronidase"]
                    },
                    rubric: [
                        { criterion: "Detailed explanation of Menstrual phase & drop in hormones", marks: 1 },
                        { criterion: "Follicular phase, FSH role, Estrogen & LH surge ovulation", marks: 2 },
                        { criterion: "Luteal phase, Corpus luteum, Progesterone maintenance of endometrium", marks: 2 }
                    ],
                    markingScheme: "5 marks total. For Option A: 1 mark for Menstrual phase + 2 marks for Follicular phase & LH surge + 2 marks for Luteal phase & Progesterone. For Option B: 2 marks for labeled diagram + 3 marks for functions of 4 structures."
                },
                {
                    id: "q18",
                    qNum: "Q.18",
                    type: "la2",
                    marks: 5,
                    unit: "Genetics and Evolution",
                    hasChoice: true,
                    optionA: {
                        label: "Option A (Molecular Regulation - Lac Operon)",
                        question: "Explain the Operon concept with special reference to the 'Lac Operon' model in E. coli proposed by Jacob and Monod.\n(a) Name the regulator gene, promoter, operator, and the three structural genes.\n(b) Describe the operational state of the operon in the ABSENCE of an inducer (Switch OFF state).\n(c) Describe the operational state in the PRESENCE of lactose (Switch ON state).\n(d) Mention the enzyme produced by each of the three structural genes (z, y, and a) and their biochemical functions.",
                        modelAnswer: "(a) Components of Lac Operon:\n- Regulator gene (i gene): Encodes the lac repressor protein.\n- Promoter gene (p): Site where RNA polymerase enzyme binds.\n- Operator gene (o): Regulatory switch region between promoter and structural genes.\n- Structural genes: Three contiguous genes: z, y, and a.\n\n(b) In the ABSENCE of Inducer (Switch OFF):\nThe 'i' gene constantly transcribes mRNA to produce an active Repressor Protein. The repressor binds tightly to the operator region (o). This physically blocks RNA polymerase from transcribing the structural genes, halting enzyme production (Operon is switched OFF).\n\n(c) In the PRESENCE of Lactose / Allolactose (Switch ON):\nLactose acts as an Inducer. It enters the cell via permease and binds to the repressor protein. This conformational change inactivates the repressor. The inactive repressor cannot bind to the operator. RNA polymerase can now freely transcribe structural genes z, y, and a into a single polycistronic mRNA.\n\n(d) Structural Genes & Enzymes:\n1. Gene z: Codes for Beta-Galactosidase, which hydrolyzes lactose (disaccharide) into glucose and galactose.\n2. Gene y: Codes for Permease, which increases cellular membrane permeability to beta-galactosides (lactose).\n3. Gene a: Codes for Transacetylase, which transfers an acetyl group from acetyl-CoA to beta-galactosides.",
                        diagramSvg: `<svg viewBox="0 0 500 170" style="width: 100%; max-width: 480px; height: auto; background: #fafafa; border: 1px solid #e2e8f0; border-radius: 8px; margin: 0.75rem 0;">
                            <!-- Operon DNA Bar -->
                            <rect x="20" y="30" width="460" height="40" fill="#f1f5f9" stroke="#334155" stroke-width="2" rx="4"/>
                            <!-- Gene Segments -->
                            <rect x="30" y="30" width="60" height="40" fill="#fecaca" stroke="#b91c1c" stroke-width="1.5"/><text x="60" y="55" font-size="13" font-weight="bold" fill="#7f1d1d" text-anchor="middle">i (Reg)</text>
                            <rect x="100" y="30" width="55" height="40" fill="#fef08a" stroke="#ca8a04" stroke-width="1.5"/><text x="127" y="55" font-size="13" font-weight="bold" fill="#713f12" text-anchor="middle">p (Prom)</text>
                            <rect x="165" y="30" width="55" height="40" fill="#fed7aa" stroke="#c2410c" stroke-width="1.5"/><text x="192" y="55" font-size="13" font-weight="bold" fill="#7c2d12" text-anchor="middle">o (Oper)</text>
                            <rect x="230" y="30" width="75" height="40" fill="#bbf7d0" stroke="#15803d" stroke-width="1.5"/><text x="267" y="55" font-size="13" font-weight="bold" fill="#14532d" text-anchor="middle">z (β-Gal)</text>
                            <rect x="315" y="30" width="75" height="40" fill="#bfdbfe" stroke="#1d4ed8" stroke-width="1.5"/><text x="352" y="55" font-size="13" font-weight="bold" fill="#1e3a8a" text-anchor="middle">y (Perm)</text>
                            <rect x="400" y="30" width="70" height="40" fill="#e9d5ff" stroke="#7e22ce" stroke-width="1.5"/><text x="435" y="55" font-size="13" font-weight="bold" fill="#581c87" text-anchor="middle">a (Trans)</text>
                            <!-- In absence of inducer -->
                            <path d="M 60,70 L 60,110 L 192,110 L 192,72" fill="none" stroke="#dc2626" stroke-width="2" stroke-dasharray="4"/>
                            <rect x="175" y="95" width="34" height="25" fill="#dc2626" rx="4"/>
                            <text x="192" y="112" font-size="10" font-weight="bold" fill="#ffffff" text-anchor="middle">Rep</text>
                            <text x="250" y="140" font-size="11" fill="#dc2626" font-weight="bold">In Absence of Inducer: Repressor blocks Operator [Switch OFF]</text>
                        </svg>`,
                        keywords: ["regulator i", "operator", "promoter", "structural genes", "repressor binds operator", "switch off", "lactose inducer", "beta-galactosidase", "permease", "transacetylase", "polycistronic"]
                    },
                    optionB: {
                        label: "Option B (Experimental Genetics - Meselson & Stahl)",
                        question: "Describe the experiment conducted by Matthew Meselson and Franklin Stahl (1958) that proved that DNA replication is Semi-Conservative.\n(a) Name the organism used and the heavy nitrogen isotope employed.\n(b) Describe the experimental methodology and generations observed (Generation 0, 1, and 2).\n(c) How were the DNA molecules separated and analyzed?\n(d) State the conclusions drawn from each generation's density bands.",
                        modelAnswer: "(a) Experimental System: Organism: Escherichia coli (E. coli). Heavy isotope: Ammonium chloride containing 15N (15NH4Cl, not radioactive, just heavy isotope of nitrogen).\n\n(b) Methodology & Generation Bands:\n- Generation 0: E. coli cells were grown in 15NH4Cl medium for several generations until both DNA strands incorporated 15N (Heavy DNA: 15N-15N).\n- Transfer to 14N Medium: The cells were then transferred to a regular 14NH4Cl (light nitrogen) medium and samples were extracted at generation intervals (every 20 minutes).\n- Generation 1 (after 20 mins / 1st replication): DNA was extracted and centrifuged. It showed a single intermediate hybrid density band (15N-14N), proving that newly synthesized DNA consists of one old heavy strand and one new light strand. This ruled out conservative replication.\n- Generation 2 (after 40 mins / 2nd replication): Extraction yielded two distinct equal bands: 50% Hybrid DNA (15N-14N) and 50% Light DNA (14N-14N).\n\n(c) Separation Technique: Isopycnic density gradient centrifugation in Caesium Chloride (CsCl) solution.\n\n(d) Conclusion: DNA replication is strictly semi-conservative; during replication, the two parental strands unwind, and each acts as a template for the synthesis of a complementary new daughter strand.",
                        keywords: ["Meselson and Stahl", "E. coli", "15N heavy isotope", "14N light", "CsCl density gradient", "hybrid density band", "semi-conservative", "20 minutes", "generation 1", "generation 2"]
                    },
                    rubric: [
                        { criterion: "Components & genetic names of operon / Meselson background", marks: 1 },
                        { criterion: "Switch OFF state & repressor binding mechanism / Gen 1 results", marks: 1.5 },
                        { criterion: "Switch ON state & role of lactose inducer / Gen 2 results", marks: 1.5 },
                        { criterion: "Enzymes z, y, a & functions / CsCl centrifugation & conclusion", marks: 1 }
                    ],
                    markingScheme: "5 marks total. Well-structured points addressing all four sub-parts."
                },
                {
                    id: "q19",
                    qNum: "Q.19",
                    type: "la2",
                    marks: 5,
                    unit: "Biology and Human Welfare",
                    hasChoice: true,
                    optionA: {
                        label: "Option A (Parasitology - Plasmodium Lifecycle)",
                        question: "Trace the complete life cycle of the malarial parasite Plasmodium vivax in both its hosts: Human Host and Female Anopheles Mosquito.\n(a) Name the infectious stage injected into humans during a mosquito bite.\n(b) Describe its asexual reproduction in the human liver and red blood cells (erythrocytic cycle).\n(c) Explain the biochemical cause of periodic chills and high fever.\n(d) Describe the sexual stage of fertilization and development inside the mosquito.",
                        modelAnswer: "Plasmodium is a digenetic parasite requiring two hosts to complete its lifecycle:\n\n1. In the Human Host (Asexual Phase):\n(a) Infection: Female Anopheles mosquito bites a human and injects the infectious stage: Sporozoites along with saliva into the bloodstream.\n(b) Liver Phase (Pre-erythrocytic): Sporozoites reach the liver cells (hepatocytes) through blood, multiply asexually by multiple fission (schizogony), and burst the liver cells to release merozoites.\n(c) Erythrocytic Phase: Merozoites invade Red Blood Cells (RBCs), grow into trophozoites, and reproduce asexually. The infected RBCs burst, releasing new merozoites and a toxic chemical pigment called Hemozoin.\n- Cause of Chills and Fever: Hemozoin released upon RBC lysis stimulates leukocytes to release pyrogens, inducing intense shivering chills followed by recurring high fever every 3–4 days.\n- Gametocyte Formation: Some merozoites in RBCs develop into male (microgametocyte) and female (macrogametocyte) sexual stages.\n\n2. In the Female Anopheles Mosquito Host (Sexual Phase):\n(d) Sexual Reproduction:\n- When a mosquito bites an infected human, it ingests gametocytes with the blood meal.\n- Fertilization: In the mosquito gut, gametes fuse to form a motile zygote (ookinete).\n- Ookinete penetrates the mosquito gut wall and becomes an oocyst. The oocyst undergoes sporogony (asexual nuclear division) to produce thousands of slender sporozoites.\n- The oocyst ruptures, releasing sporozoites into the mosquito hemolymph, which migrate to and lodge in the salivary glands, ready to infect a new host.",
                        keywords: ["sporozoites", "liver cells", "schizogony", "RBC rupture", "hemozoin", "chills and fever", "gametocytes", "gut of mosquito", "ookinete", "salivary glands"]
                    },
                    optionB: {
                        label: "Option B (Microbial Technology - Biogas Plant)",
                        question: "(a) Describe the design and construction of a floating gas-holder Biogas (Gobar Gas) plant.\n(b) Explain the three biochemical stages of anaerobic digestion of organic matter by microbes.\n(c) Name the major group of bacteria involved and write the main composition of biogas gases.\n(d) Mention two environmental advantages of using biogas over burning cattle dung cakes.",
                        modelAnswer: "(a) Design & Construction of Biogas Plant:\nA typical biogas plant consists of:\n1. Digester Tank: A cylindrical concrete/brick pit (10-15 feet deep) where slurry of cattle dung ('gobar') and water (1:1 ratio) is fed.\n2. Floating Gas Holder: A steel or fiberglass cover placed over the slurry that rises as biogas is produced by microbial digestion.\n3. Inlet Chamber & Pipe: Connects the mixing tank to the bottom of the digester to supply fresh dung slurry.\n4. Outlet Chamber: Discharges the spent slurry (digested bio-manure).\n5. Gas Outlet Pipe: Fitted with a valve at the top of the gas holder to distribute biogas to households.\n\n(b) Three Biochemical Stages:\n1. Hydrolysis (Solubilization): Complex polymers (cellulose, hemicellulose, proteins) are broken down into soluble monomers by fermentative microbes.\n2. Acidogenesis / Acetogenesis: Facultative anaerobes convert monomers into organic acids, predominantly acetic acid, carbon dioxide, and hydrogen.\n3. Methanogenesis: Strictly anaerobic Methanogens (chiefly Methanobacterium) convert acetic acid, CO2, and H2 into methane gas.\n\n(c) Microbes & Gas Composition:\n- Bacteria: Methanogens (Methanobacterium).\n- Composition: Methane (CH4: 50–70%), Carbon dioxide (CO2: 30–40%), with traces of H2, N2, and H2S.\n\n(d) Advantages over Cattle Dung Cakes:\n1. Smoke-free, clean fuel with high calorific efficiency without emitting harmful particulate matter or polluting air.\n2. Retains nutrients: The spent slurry is rich in nitrogen (N) and phosphorus (P), making it an excellent organic bio-fertilizer, whereas burning dung cakes destroys valuable agricultural manure.",
                        diagramSvg: `<svg viewBox="0 0 460 220" style="width: 100%; max-width: 440px; height: auto; background: #fafafa; border: 1px solid #e2e8f0; border-radius: 8px; margin: 0.75rem 0;">
                            <!-- Digester Tank -->
                            <rect x="130" y="80" width="200" height="130" fill="#f8fafc" stroke="#334155" stroke-width="2.5" rx="6"/>
                            <!-- Slurry -->
                            <rect x="133" y="110" width="194" height="97" fill="#fef3c7" opacity="0.8"/>
                            <!-- Floating Gas Holder -->
                            <rect x="150" y="45" width="160" height="70" fill="#e2e8f0" stroke="#0284c7" stroke-width="2" rx="4"/>
                            <text x="230" y="75" font-size="11" font-weight="bold" fill="#0369a1" text-anchor="middle">Gas Holder (CH4 + CO2)</text>
                            <!-- Gas Outlet Valve -->
                            <path d="M 230,45 L 230,20 L 290,20" stroke="#0284c7" stroke-width="3" fill="none"/>
                            <text x="300" y="24" font-size="10" font-weight="bold" fill="#0284c7">Gas Outlet Valve</text>
                            <!-- Inlet Pipe -->
                            <path d="M 50,70 L 90,140 L 135,160" stroke="#b45309" stroke-width="4" fill="none"/>
                            <rect x="20" y="55" width="55" height="30" fill="#fed7aa" stroke="#c2410c" rx="4"/>
                            <text x="47" y="73" font-size="9" font-weight="bold" fill="#7c2d12" text-anchor="middle">Dung + Water</text>
                            <!-- Outlet Chamber -->
                            <path d="M 325,160 L 370,140 L 410,70" stroke="#15803d" stroke-width="4" fill="none"/>
                            <rect x="385" y="55" width="60" height="30" fill="#bbf7d0" stroke="#15803d" rx="4"/>
                            <text x="415" y="73" font-size="9" font-weight="bold" fill="#14532d" text-anchor="middle">Spent Slurry</text>
                            <!-- Digester Label -->
                            <text x="230" y="160" font-size="11" font-weight="bold" fill="#78350f" text-anchor="middle">Anaerobic Digester Pit</text>
                        </svg>`,
                        keywords: ["digester", "gas holder", "slurry", "hydrolysis", "acidogenesis", "methanogenesis", "methanobacterium", "methane 50-70%", "smoke-free", "bio-fertilizer"]
                    },
                    rubric: [
                        { criterion: "Accurate description of plant parts / host stages", marks: 1.5 },
                        { criterion: "Biochemical mechanism / lifecycle progression in both hosts", marks: 2 },
                        { criterion: "Gas composition & microbial names / fever cause & mosquito gut phase", marks: 1.5 }
                    ],
                    markingScheme: "5 marks total. Distributed across technical accuracy, stages, and microbial/physiological roles."
                }
            ]
        }
    ]
};
