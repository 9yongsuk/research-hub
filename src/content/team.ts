// src/content/team.ts

export type TimelineItem = {
  period?: string; // "2025.04-2026.01" 등
  text: string;
};

export type PublicationItem = {
  text: string;
};

export type LicenseItem = {
  text: string;
};

export type GrantItem = {
  text: string;
};

export type PresentationItem = {
  text: string;
};

export type AwardItem = {
  text: string;
};

export type ScholarshipItem = {
  text: string;
};

export type InterviewItem = {
  text: string;
};

export type EditorialItem = {
  text: string;
};

export type Person = {
  id: string;
  role: string;
  nameKo: string;
  nameEn: string;
  titleLine: string;

  education?: TimelineItem[];
  experience?: TimelineItem[];
  licenses?: LicenseItem[];
  publications?: PublicationItem[];
  grants?: GrantItem[];
  interests?: string[];

  awards?: AwardItem[];
  scholarships?: ScholarshipItem[];
  interviews?: InterviewItem[];
  editorials?: EditorialItem[];
  presentations?: PresentationItem[];
  professionalEditorialService?: { text: string }[];
  professionalMemberships?: { text: string }[];
  technicalSkills?: { text: string }[];
};

export const teamMembers: Person[] = [
  {
    id: "yongsuk-ku",
    role: "연구소장",
    nameKo: "구용석",
    nameEn: "Yongsuk Ku",
    titleLine: "공학박사",
    education: [
      { period: "2019-2023", text: "KAIST 생명화학공학과 박사 (Yoosik Kim's Lab)" },
      { period: "2017-2019", text: "KAIST 생명화학공학과 석사" },
      { period: "2010-2017", text: "KAIST 생명화학공학과 학사" },
    ],
    experience: [
      { period: "2025.04-2026.01", text: "Samsung Bioepis 과장, Translational Medicine Team" },
      { period: "2023.06-2024.08", text: "FuturePlay 책임심사역, Investment Team" },
    ],
    publications: [
      { text: "Noncanonical immune response to the inhibition of DNA methylation by Staufen1 via stabilization of endogenous retrovirus RNAs (1저자, PNAS)" },
      { text: "Mechanism mediated by a noncoding RNA, nc886, in the cytotoxicity of a DNA-reactive compound (공저, PNAS)" },
      { text: "Multi-targeted therapy resistance via drug-induced secretome fucosylation (공저, eLife)" },
      { text: "Double-stranded RNA induction as a potential dynamic biomarker for DNA-demethylating agents (공저, Molecular Therapy-Nucleic Acids)" },
      { text: "Evidence of Aberrant Immune Response by Endogenous Double-Stranded RNAs: Attack from Within (공저, Bioessays)" },
    ],
    grants: [
      { text: "Development of universal viral therapeutic target through investigation on viral dsRNA regulation, 한국연구재단 (2022)" },
      { text: "Big data-based analysis of anti-cancer drug for precision medicine, KAIST 공과대학 (2019)" },
      { text: "Expression level and cellular localization of LINE-1 transcripts during neuronal differentiation, KAIST VRPGP (2018)" },
      { text: "Development of predictive marker for decitabine in various cancer cells, KAIST 공과대학 (2017)" },
    ],
    interests: [
      "RNA therapeutics",
      "Formulation changing",
      "Bio-better",
      "non-coding RNA",
      "double-stranded RNA",
      "RNA-protein interaction",
    ],
  },

  {
    id: "yongho-ku",
    role: "대표원장",
    nameKo: "구용호",
    nameEn: "Yongho Ku",
    titleLine: "한의학박사 / 침구과전문의",
    education: [
      { period: "2009-2018", text: "대전대학교 한의학과 한의학사" },
      { period: "2018-2020", text: "대전대학교대학원 한의학과(침구학) 한의학석사" },
      { period: "2020-2022", text: "대전대학교대학원 한의학(침구학) 한의학박사" },
    ],
    experience: [
      { period: "2025.04-현재", text: "로안365한의원 대표원장" },
      { period: "2023.04-2025.04", text: "국군대전병원 한의과장" },
      { period: "2022.04-2023.04", text: "제20전투비행단 한의과 군의관" },
      { period: "2019.03-2022.02", text: "대전대학교 천안한방병원 전문수련의, 침구의학과" },
      { period: "2018.03-2019.02", text: "동의대학교부속한방병원 일반수련의" },
    ],
    licenses: [
      { text: "한의사 면허증, 보건복지부 (2018.02.14)" },
      { text: "침구과 전문의 자격증, 보건복지부 (2022.03.11)" },
    ],
    publications: [
      { text: "Efficacy of Phellinus linteus extract on immunity enhancement: A CONSORT-randomized, double-blind, placebo-controlled pilot trial (1저자, Medicine)" },
      { text: "Effects of Phellinus linteus extract on immunity improvement: A CONSORT-randomized, double-blinded, placebo-controlled trial (1저자, Medicine)" },
      { text: "Clinical trial to analyze the effects of oral intake of Phellinus linteus (sanghuang) extract on immune function (1저자, Trials)" },
      { text: "A clinical pilot study to evaluate the efficacy of oral intake of phellinus linteus (sanghuang) extract on knee joint and articular cartilage (1저자, Medicine)" },
      { text: "Effect of Bee Venom on an Experimental Cellular Model of Alzheimer's Disease (1저자, The American Journal of Chinese Medicine)" },
      { text: "Acupotomy Combined with Korean Medicine Treatment for a Patient with Failed Back Surgery Syndrome (1저자, Journal of Acupuncture Research)" },
      { text: "A Systematic Review of Acupuncture for Oculomotor Nerve Palsy (1저자, Journal of Acupuncture Research)" },
      { text: "Efficacy of Liriope platyphylla extract on improving respiratory function (공저, Medicine)" },
      { text: "Complex Korean Medical Treatments for a patient with lumbar disc herniation accompanied by sleep disorders (공저, The Journal of Internal Korean Medicine)" },
      { text: "Leg Amputation due to Buerger's Disease: Management with Combined Korean Medicine (공저, Journal of Acupuncture Research)" },
      { text: "A Case Study of a Patient with Diplopia and Bilateral Facial Palsy Due to Atypical Miller Fisher Syndrome (공저, Journal of Acupuncture Research)" },
      { text: "A Systematic Review of Chuna Manual Therapy for Adolescent Idiopathic Scoliosis (공저, Journal of Acupuncture Research)" },
    ],
  },

  {
    id: "seoyeong-won",
    role: "원장",
    nameKo: "원서영",
    nameEn: "",
    titleLine: "한의학박사 / 한방내과전문의",
    education: [
      { period: "2009-2018", text: "대전대학교 한의학과 한의학사" },
      { period: "2018-2020", text: "대전대학교대학원 한의학과(한방내과학II) 한의학석사" },
      { period: "2020-2022", text: "대전대학교대학원 한의학(한방내과학II) 한의학박사" },
    ],
    experience: [
      { text: "한방내과전문의" },
      { text: "일반수련의: 동의대학교부속한방병원" },
      { text: "전문수련의: 대전대학교 천안한방병원 심계내과" },
      { text: "대한통합암학회 전문가 및 인정의" },
      { text: "前) 대전대학교 대전한방병원 한방내과 진료교수" },
      { text: "前) 대전대학교 대전한방병원 IRB 위원회 위원" },
      { text: "前) 대전대학교 한의대 본과3학년 심계내과학 강의 및 본과4학년 실습강의" },
    ],
    licenses: [
      { text: "대한한방내과학회 정회원" },
      { text: "대한통합암학회 정회원" },
      { text: "대한한의학회 정회원" },
      { text: "대한중풍순환신경학회 정회원" },
    ],
    publications: [
      { text: "Antiviral Effect of Hyunggaeyungyo-tang granule on A549 Cells Infected with Human Coronavirus (1저자, Evid Based Complement Alternat Med. 2021 Oct 6)" },
      { text: "Complex Korean Medical Treatments for a patient with lumbar disc herniation accompanied by sleep disorders: A Case Report (공저, The Journal of Internal Korean Medicine)" },
    ],
  },

  // =========================
  // Added Collaborators
  // =========================

{
  id: "mark-borris-aldonza",
  role: "Collaborator",
  nameKo: "Mark Borris D. Aldonza",
  nameEn: "",
  titleLine: "Ph.D. Candidate / Cancer Genomics & Translational Oncology",

  education: [
    { period: "2020-현재", text: "Seoul National University, Ph.D. Veterinary Biomedical Sciences" },
    { period: "2020", text: "KAIST, B.S. Biological Sciences + S&T Policy" },
  ],

  publications: [
    { text: "Integrative mapping of the dog epigenome: reference annotation for comparative inter-tissue and cross-species studies. Science Advances. 9, eade3399 (2023)." },
    { text: "Multi-targeted therapy resistance via drug-induced secretome fucosylation. eLife. 12, e75191 (2023)." },
    { text: "Chemotherapy confers a conserved secondary tolerance to EGFR inhibition via AXL-mediated signaling bypass. Scientific Reports. 11, 8016 (2021)." },
    { text: "Prior acquired resistance to paclitaxel relays diverse EGFR-targeted therapy persistence mechanisms. Science Advances. 6, eaav7416 (2020)." },
    { text: "Paraoxonase-1 (PON1) induces metastatic potential and apoptosis escape via its antioxidative function in lung cancer cells. Oncotarget. 8, 42817-42835 (2017)." },
    { text: "Paclitaxel-resistant cancer cell-derived secretomes elicit ABCB1-associated docetaxel cross-resistance and escape from apoptosis through FOXO3a-driven glycolytic regulation. Experimental & Molecular Medicine. 49, e286 (2017)." },
    { text: "Multiplicity of acquired cross-resistance in paclitaxel-resistant cancer cells is associated with feedback control of TUBB3 via FOXO3a-mediated ABCB1 regulation. Oncotarget. 7, 34395-34419 (2016)." },
    { text: "Suppression of MAPK signaling and reversal of mTOR-dependent MDR1-associated multidrug resistance by 21α-methylmelianodiol in lung cancer cells. PLoS ONE. 10, e0127841 (2015)." },
    { text: "Dual targeting of EGFR with PLK1 exerts therapeutic synergism in taxane-resistant lung adenocarcinoma by suppressing ABC transporters. Cancers (Basel). 13, 4413 (2021)." },
    { text: "Stanniocalcin-2 (STC2): A potential lung cancer biomarker promotes lung cancer metastasis and progression. BBA - Proteins and Proteomics. 1854, 668-676 (2015)." },
    { text: "GC-FID determination of cocaine and its metabolites in human bile and vitreous humor. Journal of Applied Toxicology. 26, 253-257 (2006)." },
  ],

  awards: [
    { text: "Outstanding Graduate Student Research Award (2024), BK21 FOUR" },
    { text: "Best Thesis Presentation (2023), SNU College of Veterinary Medicine ERD Day" },
    { text: "Young Scientist Award (2022), KSMCB 2022" },
    { text: "Young Scientist Award (2021), 10th AOHUPO Congress" },
    { text: "Best Thesis Presentation (2020), SNU College of Veterinary Medicine ERD Day" },
    { text: "Grand Prix Winner (2019), KAIST Undergraduate Research Participation (URP) Program Workshop" },
    { text: "1st Place (2016), KAIST Biotechnology Research Proposal Contest" },
    { text: "2nd Place (2014), Alltech Young Scientist Competition in the Asia Pacific" },
    { text: "1st Place (2014), Alltech Korea Young Scientist Competition" },
    { text: "Regional Finalist (2012), Google Global Science Fair" },
    { text: "3rd Place (2011), Philippine Biology Majors College Research Contest" },
    { text: "Finalist (2010), Philippine Intel ISEF Team" },
  ],

  professionalEditorialService: [
    { text: "Review Editor, Frontiers in Cell & Developmental Biology (2023–present)" },
    { text: "Guest Editor, BMC Cancer (2022)" },
    { text: "Editorial Board Member, Journal of Health Research and Society (2018–2022)" },
  ],

  professionalMemberships: [
    { text: "Associate Member, American Association for Cancer Research (AACR)" },
    { text: "Regular Member, Human Proteome Organization (HUPO)" },
    { text: "Student Member, Asia Oceania HUPO (AOHUPO)" },
    { text: "Regular Member, Korean Society for Molecular and Cellular Biology (KSMCB)" },
    { text: "Collaborating Member, Human Cell Atlas Initiative" },
  ],

  scholarships: [
    { text: "Hyundai Motor Chung Mong-Koo Foundation Graduate Scholarship (2020–2025)" },
    { text: "KAIST Full Academic Scholarship" },
    { text: "KGSP – Korean Government Scholarship Program" },
  ],

  interviews: [
    { text: "Technology Networks (2023) – Dog Epigenome & Oncology" },
    { text: "Integra Biosciences (2023) – Cancer Genomics Lab Interview" },
    { text: "KAIST Herald (2019) – Life in Science Interview" },
  ],

  editorials: [
    { text: "Review Editor, Frontiers in Cell & Developmental Biology" },
    { text: "Guest Editor, BMC Cancer" },
    { text: "Editorial Board Member (Former), Journal of Health Research and Society" },
    { text: "Member: AACR, HUPO, AOHUPO, KSMCB" },
  ],

  presentations: [
    { text: "AACR Annual Meeting (2024, San Diego)" },
    { text: "KSMCB International Conference (2022, Invited Oral)" },
    { text: "AOHUPO Congress (2021, Invited Oral)" },
    { text: "HUPO World Congress (2016)" },
  ],
},

{
  id: "kyunghoon-hur",
  role: "Collaborator",
  nameKo: "허경훈",
  nameEn: "Kyunghoon Hur",
  titleLine: "Ph.D. / Artificial Intelligence in Healthcare",

  education: [
    { period: "2026", text: "KAIST, Ph.D. in Artificial Intelligence" },
    { period: "2020", text: "KAIST, M.S. Chemical & Biomolecular Engineering" },
  ],

  publications: [
    { text: "Hur, K.; Kwak, H.; Jang, J.; Kim, N.; Choi, E. Multi-lingual multi-institutional predictive framework for Electronic Health Records. Under Review." },
    { text: "Kim, J.; Kim, J.; Hur, K.; Choi, E. Client-Centered Federated Learning for Heterogeneous EHRs: Use Fewer Participants to Achieve the Same Performance. Machine Learning for Health (ML4H), Under Review." },
    { text: "Meyer, F.*; Hur, K.*; Choi, E. MD-ViSCo: A Unified Model for Multi-Directional Vital Sign Waveform Conversion. IEEE Journal of Biomedical and Health Informatics, 2025." },
    { text: "Ku, D.; Kim, H.; Lim, J.; Song, J.; Yoon, J.; Liu, J.; Min, S.-J.; Cho, R.; Lee, N.; Hur, K.; Park, J.-E.; Lee, L. P.; Hong, J.; Kim, Y.; Park, H. G. Self-modulating therapeutic platform using engineered miRNA-responsive oligonucleotides. Nano Convergence, 2025." },
    { text: "Hur, K.; Oh, J.; Kim, J.; Lee, M. J.; Cho, E.; Kim, J.; Moon, S.-E.; Kim, Y.-H.; Choi, E. GenHPF: General Healthcare Predictive Framework with Zero Domain Knowledge. IEEE Journal of Biomedical and Health Informatics, 2023." },
    { text: "Kim, J.; Hur, K.; Yang, S.; Choi, E. Universal EHR Federated Learning Framework. Machine Learning for Health (ML4H), Extended Abstract, 2023." },
    { text: "Cho, E.; Lee, M. J.; Hur, K.; Kim, J.; Yoon, J.; Choi, E. Rediscovery of CNN's Versatility for Text-based Encoding of Raw Electronic Health Records. Conference on Health, Inference, and Learning (CHIL), Proceedings of Machine Learning Research (PMLR), 2023." },
    { text: "Hur, K.*; Lee, J.*; Oh, J.; Price, W.; Kim, Y.; Choi, E. Unifying Heterogeneous Electronic Health Records Systems via Text-Based Code Embedding. Conference on Health, Inference, and Learning (CHIL), Proceedings of Machine Learning Research (PMLR), 2022." },
    { text: "Jee, H.; Park, E.; Hur, K.; Kang, M.; Kim, Y. S. High-Intensity Aerobic Exercise Suppresses Cancer Growth by Regulating Skeletal Muscle-Derived Oncogenes and Tumor Suppressors. Frontiers in Molecular Biosciences, 2022." },
    { text: "Ku, Y. S.; Park, J-H.; Cho, R.; Lee, Y. K.; Park, H.-M.; Kim, M.; Hur, K.; Byun, S. Y.; Liu, J.; Lee, Y.-S.; Shum, D.; Shin, D.-Y.; Koh, Y.; Cho, J.-Y.; Yoon, S.-S.; Hong, J. S.; Kim, Y. S. Non-canonical immune response to the inhibition of DNA methylation by Staufen1 via stabilization of endogenous retrovirus RNAs. Proceedings of the National Academy of Sciences (PNAS), 2021." },
    { text: "Song, J.; Kim, S.; Kim, H. Y.; Hur, K.; Kim, Y.; Park, H. G. A novel method to detect insertion mutation in DNA by utilizing exponential amplification reaction triggered by the CRISPR-Cas9 system. Nanoscale, 2021." },
  ],

  awards: [
    { text: "KAIST Graduate Student Best Paper Award" },
    { text: "Kaggle Silver Medal – PANDA Prostate Cancer Challenge (Top 3%)" },
    { text: "Kaggle Bronze Medal – Bengali AI Challenge (Top 6%)" },
  ],

  scholarships: [
    { text: "KAIST Graduate Scholarship" },
    { text: "KAIST Academic Excellence Scholarship" },
  ],

  interviews: [],

  editorials: [
    { text: "Head TA – Machine Learning for Healthcare (KAIST)" },
    { text: "Head TA – Programming for AI (KAIST)" },
    { text: "Member – ML4H Community" },
    { text: "Member – IEEE Engineering in Medicine & Biology Society" },
  ],

  presentations: [
    { text: "CHIL Conference (2022)" },
    { text: "ML4H Workshop (2023)" },
  ],
  technicalSkills: [
  { text: "Programming: Python, PyTorch, TensorFlow, JAX, Scikit-learn" },
  { text: "Machine Learning: Representation Learning, Multimodal Learning, Federated Learning, Self-supervised Learning" },
  { text: "Healthcare AI: Electronic Health Records (EHR) Modeling, Clinical Prediction, Time-series Modeling" },
  { text: "Data Engineering: Large-scale Data Processing, SQL, Pandas, NumPy" },
  { text: "Model Deployment: Distributed Training, GPU Acceleration, Experiment Tracking" },
  { text: "Statistics & Experimental Design: DOE, Statistical Modeling, Hypothesis Testing" },
  { text: "Bioengineering Experience: RNA engineering, CRISPR-based detection systems, Translational ML-Biology integration" },
  ],
},
];
