// src/content/about.ts

export type AboutSection = {
  title: string;
  body: string[];
};

export type HistoryItem = {
  date: string;
  text: string;
};

export const aboutContent = {
  heroTitle: "생명과학·임상의학 기반 Translational 연구",

  heroSubtitle: [
    "로안생명공학연구소는 임상 현장에서 관찰되는 미충족 수요를 출발점으로 분자 수준의 기전 규명과 재현성 있는 검증 체계 구축을 수행합니다.",
    "RNA biology, 후성유전체(epigenomics), 염증·면역 신호 및 치료 반응/내성 등 질환 기전 연구를 기반으로, 후보 선별과 평가 지표 설계를 포함한 전주기(기초–전임상–임상 연계) 연구를 지향합니다.",
    "필요 시 biological 데이터 분석과 AI 기반 모델링을 활용하여, 연구 설계·해석·검증 과정에서 근거를 확장하여 생물학적 실험과 AI를 활용한 복합적인 연구를 추구합니다.",
  ],

  stats: [
    { value: "3축", label: "연구 프레임워크" },
    { value: "40+", label: "국제 학술 성과" },
    { value: "2026", label: "설립연도" },
  ],

  sections: [
    {
      title: "미션",
      body: [
        "임상 기반 질문을 분자·세포·오믹스 수준의 검증 가능한 근거로 전환하고, 적용 가능한 평가 지표와 연구 프로토콜로 연결합니다.",
        "표준 SOP와 반복 검증을 통해 재현성 높은 연구 체계를 구축하며, 협력 네트워크(학계·산업·CRO)를 통해 연구 범위를 확장합니다.",
      ],
    },
    {
      title: "핵심 연구축",
      body: [
        "Molecular & Translational Biology: RNA biology/therapeutics, dsRNA-innate immunity, epigenomics, 치료 반응·내성 기전 연구",
        "세포 기반 효능 평가 및 작용 기전 분석(염증·면역·통증 등 병태 신호 포함)",
        "오믹스 기반(전사체 등) 기전 규명과 바이오마커/후보 선별, 평가 지표 설계",
        "데이터 분석 및 AI 모델링 활용 가능",
      ],
    },
    {
      title: "연구 인프라/협력",
      body: [
        "부설 연구소 기반의 표준 SOP 및 실험 재현성 확보 프로세스 운영",
        "산학연 협업 및 CRO 연계를 통한 분석 확장(전사체/다중오믹스, 동물모델 등)",
        "임상 전문가와의 협업을 통한 연구 질문 정교화 및 적용 가능성 검토",
      ],
    },
  ] as AboutSection[],

  history: [
    { date: "2023.8", text: "로안한의원 설립" },
    { date: "2024.10", text: "로안한의원 이종명 원장 합류" },
    { date: "2025.4", text: "로안365한의원 설립(7병상) 및 구용호 원장 합류" },
    { date: "2026.1", text: "로안365한의원 구용석 박사 합류" },
    { date: "2026.2", text: "로안365한의원 부설 로안생명공학연구소 설립인정" },
  ] as HistoryItem[],
};