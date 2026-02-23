// src/content/Services.ts

export type ServiceItem = {
  title: string;
  desc: string;
  bullets: string[];
  tags?: string[];
};

export type CollaboratorRole = {
  role: string;
  who: string;
  contributions: string[];
  notes?: string;
};

export const services: ServiceItem[] = [
  {
    title: "한의소재·약침 후보 발굴 & 기초 효능 검증",
    desc: "in vitro 기반 선별 → 기전 가설 수립 → 후속 검증까지 연결합니다.",
    bullets: [
      "추출·분획 전략 설계",
      "세포 기반 효능 스크리닝",
      "용량-반응/시간-반응 분석",
      "기전 마커 분석 (WB/qPCR/ELISA 등)"
    ],
    tags: ["Screening", "Mechanism"]
  },
  {
    title: "RNA-seq & bioinformatics 분석(AI 모델링 포함)",
    desc: "전사체 기반 네트워크 해석까지 수행합니다.",
    bullets: [
      "실험 설계 컨설팅",
      "DEG 분석",
      "GSEA/Pathway 분석",
      "논문/과제용 Figure 정리"
    ],
    tags: ["RNA-seq", "GSEA"]
  }
];

export const collaborators: CollaboratorRole[] = [
  {
    role: "임상 자문",
    who: "임상 협력 네트워크",
    contributions: [
      "적응증 정의",
      "임상 엔드포인트 설정",
      "프로토콜 자문"
    ]
  },
  {
    role: "바이오인포 협업",
    who: "통계/분석 collaborator",
    contributions: [
      "RNA-seq 분석 설계",
      "통계 검증",
      "네트워크 시각화"
    ]
  }
];