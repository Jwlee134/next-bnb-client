export const months = Array.from({ length: 12 }, (_, i) => i + 1).map(
  (month) => `${month}월`
);

export const days = Array.from({ length: 31 }, (_, i) => i + 1).map(
  (day) => `${day}일`
);

export const years = Array.from(Array(122), (_, i) => 2021 - i).map(
  (year) => `${year}년`
);

export const largeBuildingTypeList = [
  {
    label: "아파트",
    description:
      "일반적으로 다세대가 거주하는 건물 또는 여러 사람이 함께 거주하는 단지를 의미합니다.",
  },
  {
    label: "주택",
    description:
      "주로 단독 세대가 사용하는 건물이지만, 듀플렉스 같은 주택의 경우에는 다른 세대와 벽이나 실외 공간을 공유할 수도 있습니다.",
  },
  {
    label: "별채",
    description:
      "게스트용 전용 출입구가 있으며, 보통 다른 구조물과 필지를 공유합니다.",
  },
  {
    label: "독특한 숙소",
    description:
      "일반적인 주택이나 아파트에 비해 건물이 흥미롭거나 특이한 숙소입니다.",
  },
  {
    label: "B&B",
    description:
      "게스트에게 조식을 제공하는 전문 숙박업체로, 호스트가 같은 건물에 사는 경우가 많습니다.",
  },
  {
    label: "부티크 호텔",
    description:
      "브랜드 특색이 담긴 테마와 인테리어로 꾸며진 전문 숙박업체입니다.",
  },
];

export const apartmentBuildingTypeList = [
  {
    label: "아파트",
    description:
      "아파트와 공동주택이란 일반적으로 다세대가 거주하는 건물 또는 여러 사람이 함께 거주하는 단지를 의미합니다.",
  },
  {
    label: "공동주택",
    description:
      "일반적으로 다세대가 거주하는 건물 또는 여러 사람이 함께 거주하는 단지를 의미합니다. 공동주택은 개인이 소유하는 반면 아파트는 임대로 운영되는 것이 일반적입니다.",
  },
  {
    label: "레지던스",
    description:
      "전문 관리업체가 객실 내 모든 물품을 구비하고 서비스를 제공하는 아파트로, 매일 객실 청소, 프런트 데스크 등 호텔 같은 편의시설을 제공합니다.",
  },
  {
    label: "로프트",
    description:
      "보통 아파트나 콘도에 있으며 개방적인 구조입니다. 로프트에는 대부분 내부 공간을 분리하는 벽이 없습니다.",
  },
  {
    label: "카사 파르티쿨라르(쿠바)",
    description: "쿠바의 숙소 형태로, 아파트나 B&B의 형태를 띨 수도 있습니다.",
  },
];

export const houseBuildingTypeList = [
  {
    label: "펜션(한국)",
    description:
      "한국의 휴가용 별장으로, 주로 시골 지역에 위치해 있습니다. 바비큐 시설이 갖춰져 있는 경우가 많으며, 기타 공용 공간도 마련되어 있습니다.",
  },
  {
    label: "단독 또는 다세대 주택",
    description:
      "주로 단독 세대가 사용하는 건물입니다. 듀플렉스 같은 주택의 경우에는 다른 세대와 벽이나 실외 공간을 공유할 수도 있습니다.",
  },
  {
    label: "저택",
    description:
      "실내 및 실외 공간을 갖추고 큰 마당과 정원 또는 수영장이 있는 고급 주택을 말합니다.",
  },
  {
    label: "타운하우스",
    description:
      "로우 하우스, 테라스 하우스와 같이 옆 세대의 건물과 붙어 있거나 실외 공간을 공유하기도 합니다.",
  },
  {
    label: "전원주택",
    description: "주로 시골이나 호숫가, 해변에 자리합니다.",
  },
  {
    label: "방갈로",
    description:
      "넓은 현관과 박공지붕 등의 특징을 지닌 주택입니다. 단층으로 되어 있는 경우가 많습니다.",
  },
  {
    label: "농장 체험 숙박",
    description:
      "농촌에서 게스트가 동물들과 교감하거나 등산이나 수공예 등의 여러 가지 활동을 즐길 수 있도록 서비스를 제공하며, 일반적으로 전문 숙박업체로 운영됩니다.",
  },
  {
    label: "담무소",
    description:
      "넓은 벽과 돔 지붕을 한 돌로 만든 주택을 말합니다. 이탈리아의 판텔레리아 섬에서 볼 수 있는 독특한 건축 양식입니다.",
  },
  {
    label: "돔하우스",
    description:
      "지붕이 반구 형태로 되어 있거나 전체가 완전히 구 형태로 이루어진 건물을 의미합니다. 지오데식 돔이나 버블 하우스도 돔하우스에 속합니다.",
  },
  {
    label: "등대",
    description:
      "배가 바다에서 길을 잘 찾을 수 있도록 빛을 밝혀주는 탑을 의미합니다. 큰 바다와 이웃한 연안에 주로 자리합니다.",
  },
  {
    label: "땅속의 집",
    description:
      "그 지형에서 나는 원재료를 이용하거나 흙을 다져서 땅속에 지은 집입니다.",
  },
  {
    label: "마차",
    description:
      "양치기가 양을 몰면서 이동할 때 주거용으로 사용한 작은 화차를 의미합니다.",
  },
  {
    label: "샬레",
    description:
      "보통 목조 건물에 박공지붕을 한 주택을 말합니다. 스키 타기에 좋은 지역에 있는 별장이거나 여름용 별장인 경우가 많습니다.",
  },
  {
    label: "오두막",
    description:
      "목재나 진흙과 같은 단순한 자재를 사용하여 지은 집으로 짚을 엮어 지붕에 덮은 경우가 많습니다.",
  },
  {
    label: "초소형 주택",
    description:
      "크기가 매우 작고 내부 공간이 협소한 단독 주택으로, 37제곱미터(400제곱피트) 이하의 주택을 말합니다.",
  },
  {
    label: "카사 파르티쿨라르(쿠바)",
    description: "쿠바의 숙소 형태로, 아파트나 B&B의 형태를 띨 수도 있습니다.",
  },
  {
    label: "키클라데스 주택",
    description:
      "키클라데스 섬의 산중턱에서 볼 수 있는 지붕이 평평하고 흰색 외관의 그리스 전통 가옥입니다.",
  },
  {
    label: "통나무집",
    description:
      "목재 등의 자연 재료로 지은 집입니다. 숲이나 산 같은 자연 속에 있는 경우가 많습니다.",
  },
  {
    label: "트룰로(이탈리아)",
    description:
      "트룰로는 이탈리아의 아풀리아 지방에서 유래된 둥근 형태의 돌로 지어진 집으로 원뿔 모양의 지붕을 하고 있습니다.",
  },
  {
    label: "하우스보트",
    description:
      "주거용으로 집처럼 지은 보트를 말합니다. 수상 가옥의 경우 '하우스보트'를 선택하세요.",
  },
];

export const secondaryUnitBuildingTypeList = [
  {
    label: "게스트 스위트",
    description:
      "가족을 위한 별채라고 불리는 형태로, 주택 등 본채 구조물의 내부에 있거나 나란히 붙어 있는 별도의 공간이며 전용 출입구를 갖추고 있습니다.",
  },
  {
    label: "게스트용 별채",
    description:
      "주택 등 단독 건물과 필지를 공유하지만 단독으로 지어진 건물로, 예전에 마차 보관 용도로 사용했던 탓에 '마차 보관소'라고 불리기도 합니다.",
  },
  {
    label: "농장 체험 숙박",
    description:
      "농촌에서 게스트가 동물들과 교감하거나 등산이나 수공예 등의 여러 가지 활동을 즐길 수 있도록 서비스를 제공하며, 일반적으로 전문 숙박업체로 운영됩니다.",
  },
];

export const uniqueSpaceBuildingTypeList = [
  {
    label: "펜션(한국)",
    description:
      "한국의 휴가용 별장으로, 주로 시골 지역에 위치해 있습니다. 바비큐 시설이 갖춰져 있는 경우가 많으며, 기타 공용 공간도 마련되어 있습니다.",
  },
  {
    label: "초소형 주택",
    description:
      "크기가 매우 작고 내부 공간이 협소한 단독 주택으로, 37제곱미터(400제곱피트) 이하의 주택을 말합니다.",
  },
  {
    label: "농장 체험 숙박",
    description:
      "농촌에서 게스트가 동물들과 교감하거나 등산이나 수공예 등의 여러 가지 활동을 즐길 수 있도록 서비스를 제공하며, 일반적으로 전문 숙박업체로 운영됩니다.",
  },
  {
    label: "캠핑카",
    description:
      "크기에 상관없이 집과 차량의 중간 형태를 띤 주거용 차량이나 작은 주거 공간을 갖춘 캠핑 트레일러를 지칭합니다.",
  },
  {
    label: "보트",
    description:
      "레저용 요트에서 고급 요트까지 다양한 형태의 배로 게스트가 머무는 동안 정박 상태를 유지합니다. 선상 가옥이나 수상 가옥 등 주거용 보트인 경우에는 '하우스보트'를 선택하세요.",
  },
  {
    label: "캠핑장",
    description:
      "게스트가 자신의 텐트나 유르트, 캠핑용 자동차 또는 RV, 초소형 주택 등을 직접 세울 수 있도록 호스트가 허용할 수 있는 부지를 의미합니다.",
  },
  {
    label: "기차",
    description:
      "주거용으로 개조된 승무원실, 화물 차량 또는 기타 철도 차량을 말합니다.",
  },
  {
    label: "돔하우스",
    description:
      "지붕이 반구 형태로 되어 있거나 전체가 완전히 구 형태로 이루어진 건물을 의미합니다. 지오데식 돔이나 버블 하우스도 돔하우스에 속합니다.",
  },
  {
    label: "동굴",
    description:
      "지하동굴 같은 자연 형상물 또는 산비탈이나 절벽 안으로 파낸 주거지를 의미합니다.",
  },
  {
    label: "등대",
    description:
      "배가 바다에서 길을 잘 찾을 수 있도록 빛을 밝혀주는 탑을 의미합니다. 큰 바다와 이웃한 연안에 주로 자리합니다.",
  },
  {
    label: "땅속의 집",
    description:
      "그 지형에서 나는 원재료를 이용하거나 흙을 다져서 땅속에 지은 집입니다.",
  },
  {
    label: "마차",
    description:
      "양치기가 양을 몰면서 이동할 때 주거용으로 사용한 작은 화차를 의미합니다.",
  },
  {
    label: "버스",
    description: "내부를 독창적으로 개조한 차량입니다.",
  },
  {
    label: "비행기",
    description:
      "비행 목적으로 설계되었으나 지금은 주거용으로 개조된 항공기를 말합니다.",
  },
  {
    label: "섬",
    description:
      "사방이 물로 완전히 둘러싸인 땅으로, 아무도 없는 지상 낙원을 경험하기에 좋습니다.",
  },
  {
    label: "성",
    description:
      "탑이나 첨탑, 해자 등 건축적 요소를 갖추고 있으며, 장엄함과 유서가 깃든 건물을 말합니다.",
  },
  {
    label: "오두막",
    description:
      "목재나 진흙과 같은 단순한 자재를 사용하여 지은 집으로 짚을 엮어 지붕에 덮은 경우가 많습니다.",
  },
  {
    label: "유르트",
    description: "보통 접이식 목재 프레임으로 지어진 둥근 형태의 텐트입니다.",
  },
  {
    label: "이글루",
    description:
      "눈과 얼음으로 만든 돔 형태의 구조물로, 보통 눈이 잘 녹지 않는 추운 곳에 있습니다.",
  },
  {
    label: "텐트",
    description:
      "천과 막대로 세우는 구조물로, 보통 휴대가 가능하고 접었다 펼 수 있습니다. 베두인족 텐트와 같은 종류는 더 영구적입니다.",
  },
  {
    label: "트리하우스",
    description:
      "트리하우스는 나무 몸통이나 가지에 지어진 집으로, 자연을 사랑하는 게스트라면 사다리나 계단을 타고 집으로 올라가 아름다운 경치를 감상할 수 있습니다.",
  },
  {
    label: "티피",
    description:
      "막대기로 세우는 원뿔 모양의 텐트를 의미합니다. 펄럭이는 문을 위로 들어 올려 출입하고 텐트 지붕이 뚫려 있는 경우도 있습니다.",
  },
  {
    label: "풍차",
    description:
      "풍력을 이용하기 위해 날개바퀴가 달린 독특한 건축물이지만 이제는 거주 공간으로도 활용되는 곳으로, 아직 풍차의 기능을 유지하고 있는 경우도 있을 수 있습니다.",
  },
  {
    label: "하우스보트",
    description:
      "주거용으로 집처럼 지은 보트를 말합니다. 수상 가옥의 경우 '하우스보트'를 선택하세요.",
  },
];

export const bnbBuildingTypeList = [
  {
    label: "Bed and breakfast",
    description:
      "게스트에게 조식을 제공하는 전문 숙박업체로, 호스트가 같은 건물에 사는 경우가 많습니다.",
  },
  {
    label: "농장 체험 숙박",
    description:
      "농촌에서 게스트가 동물들과 교감하거나 등산이나 수공예 등의 여러 가지 활동을 즐길 수 있도록 서비스를 제공하며, 일반적으로 전문 숙박업체로 운영됩니다.",
  },
  {
    label: "산장",
    description: "숲이나 산 등 자연 속에 지어진 전문 숙박업체를 지칭합니다.",
  },
  {
    label: "료칸(일본)",
    description:
      "료칸이란 적은 수의 객실을 운영하면서 게스트에게 문화적 경험을 제공하는 일본 전통 숙박업소를 말합니다.",
  },
  {
    label: "민수(타이완)",
    description:
      "게스트에게 개인실을 제공하는 대만 특유의 전문 숙박업체입니다.",
  },
  {
    label: "카사 파르티쿨라르(쿠바)",
    description: "쿠바의 숙소 형태로, 아파트나 B&B의 형태를 띨 수도 있습니다.",
  },
];

export const boutiquesHotelBuildingTypeList = [
  {
    label: "호텔",
    description:
      "개인실, 스위트룸 또는 독특한 공간 등의 숙소를 제공하는 전문 숙박업체입니다.",
  },
  {
    label: "부티크 호텔",
    description:
      "브랜드 특색이 담긴 테마와 인테리어로 꾸며진 전문 숙박업체입니다.",
  },
  {
    label: "호스텔",
    description:
      "여러 명이 함께 지내는 다인실이나 개인실을 운영하는 전문 숙박업체입니다.",
  },
  {
    label: "리조트",
    description:
      "호텔 객실은 물론, 호텔보다 더 다양한 서비스와 편의시설을 제공하는 개인 임대 숙소까지 제공하는 전문 숙박업체입니다.",
  },
  {
    label: "레지던스",
    description:
      "전문 관리업체가 객실 내 모든 물품을 구비하고 서비스를 제공하는 아파트로, 매일 객실 청소, 프런트 데스크 등 호텔 같은 편의시설을 제공합니다.",
  },
  {
    label: "아파트 호텔",
    description:
      "프런트 데스크를 포함해 호텔과 비슷한 편의시설 및 아파트와 비슷한 방을 갖춘 호텔 같은 숙박 시설입니다.",
  },
  {
    label: "객잔(중국)",
    description:
      "지역 특색을 반영하고, 고급스러운 편의시설, 욕실용품, 간단한 식사, 사교 공간 및 맞춤형 서비스를 제공하는 중소 규모의 숙소입니다.",
  },
  {
    label: "산장",
    description: "숲이나 산 등 자연 속에 지어진 전문 숙박업체를 지칭합니다.",
  },
  {
    label: "헤리티지 호텔(인도)",
    description:
      "궁전, 인도식 고급 저택, 요새 및 기타 유서 깊은 건물을 개조하여 전문 숙박 시설로 운영하는 인도 특유의 숙박업체입니다.",
  },
];

export const roomTypeRadioOptions = [
  {
    label: "집 전체",
    value: "entire",
    description:
      "게스트가 숙소 전체를 다른 사람과 공유하지 않고 단독으로 이용합니다. 게스트 전용 출입구가 있고 공용 공간이 없습니다. 일반적으로 침실, 욕실, 부엌이 포함됩니다.",
  },
  {
    label: "개인실",
    value: "private",
    description:
      "게스트에게 개인 침실이 제공됩니다. 침실 이외의 공간은 공용일 수 있습니다.",
  },
  {
    label: "다인실",
    value: "public",
    description:
      "게스트는 개인 공간 없이, 다른 사람과 함께 쓰는 침실이나 공용 공간에서 숙박합니다.",
  },
];

export const isForGuestOptions = [
  {
    label: "예. 게스트용으로 따로 마련된 숙소입니다.",
    value: "yes",
  },
  {
    label: "아니요. 제 개인 물건이 숙소에 있습니다.",
    value: "no",
  },
];

export const bedroomCountList = Array.from({ length: 51 }, (_, i) => i).map(
  (bedroom) => `침실 ${bedroom}개`
);

export const bedTypeList = [
  "소파",
  "바닥용 에어매트리스",
  "요와 이불",
  "싱글",
  "슈퍼 싱글",
  "더블",
  "킹",
  "퀸",
  "이층 침대",
  "아기 침대",
  "유아용 침대",
  "해먹",
  "물침대",
];
