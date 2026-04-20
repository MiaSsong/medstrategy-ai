/* ─── 카테고리 데이터 ─── */
const CATEGORIES = [
  {
    id: 'ivd', icon: '🧪', label: '체외진단기기 IVD',
    desc: '혈액·조직·체액 등 인체에서 채취한 검체를 체외에서 분석',
    mids: [
      {
        title: '분자진단', kr: '3~4등급', us: 'Class II~III', eu: 'Class C~D', risk: 'high',
        ban: ['허가받은 검출 항목 외 진단 가능 표현', '임상 승인 전 치료 연계 암시', '특정 병원 도입 사례 광고'],
        allow: ['허가된 검출 타깃 명시', '임상 감도·특이도 데이터 인용(출처 표기)', '관련 학술지 데이터 활용'],
        law: '의료기기법 제24조, 시행규칙 별표7 제1호·제4호'
      },
      {
        title: '면역진단 / POCT', kr: '2~3등급', us: 'Class II', eu: 'Class B~C', risk: 'mid',
        ban: ['치료·처방 대체 가능 암시', '허가 외 검체종류 광고', '비교 우위 표현(타사 비방)'],
        allow: ['민감도·특이도 수치 광고(임상자료 보유 시)', 'POCT 편의성·속도 강조', 'CE/FDA 인증 현황 표시'],
        law: '의료기기법 제24조제2항제1호, 시행규칙 별표7 제14호'
      },
      {
        title: '임상화학·혈액학', kr: '1~2등급', us: 'Class I~II', eu: 'Class A~B', risk: 'low',
        ban: ['진단 확정 광고(스크리닝 기기에 진단 표현)', '의사 추천 병기(허가 外)'],
        allow: ['측정 항목·범위 명시', '검사 속도·처리량 강조', '병원 도입 편의성 강조'],
        law: '의료기기법 제24조, 시행규칙 별표7'
      },
      {
        title: '조직·세포진단', kr: '3~4등급', us: 'Class II~III', eu: 'Class C~D', risk: 'high',
        ban: ['AI 단독 진단 확정 표현', '임상 승인 전 정확도 수치 광고', '특정 암 완치 암시'],
        allow: ['보조 도구(CADe/CADx) 기능 명시', '규제 허가 획득 여부 표기', '임상 validation 논문 인용'],
        law: '의료기기법 제24조제2항, SaMD 가이드라인'
      },
    ]
  },
  {
    id: 'img', icon: '🖥', label: '영상진단기기',
    desc: 'X선·MRI·초음파 등 인체 내부를 비침습적으로 시각화',
    mids: [
      {
        title: 'X선 / CT', kr: '3~4등급', us: 'Class II~III', eu: 'Class IIa~IIb', risk: 'high',
        ban: ['방사선 피폭 무해 암시', '허가 외 진단 적응증 광고', '피폭량 허위 표기'],
        allow: ['피폭량 수치 공개(낮을수록 강점)', '화질 해상도 스펙 표기', '병원 워크플로우 효율 강조'],
        law: '의료기기법 제24조, 방사선 관련 특수 규제'
      },
      {
        title: 'MRI', kr: '3등급', us: 'Class II', eu: 'Class IIb', risk: 'high',
        ban: ['MRI로 암 확진 가능 암시', '금기 환자군 무시 광고', '과도한 해상도 과장'],
        allow: ['Tesla 수치·코일 스펙 명시', '검사 시간 단축 강조', 'MRI 적용 분야 열거(허가 내)'],
        law: '의료기기법 제24조제2항제1호'
      },
      {
        title: '초음파', kr: '2~3등급', us: 'Class II', eu: 'Class IIa', risk: 'mid',
        ban: ['태아 성별 감별 광고(국내 금지)', '진단 확정 표현', '비의료인 사용 권유'],
        allow: ['영상 화질·탐촉자 성능 강조', '휴대성·이동성 강조(POCUS)', '적용 진료과 열거'],
        law: '의료기기법 제24조, 의료법 제20조(태아 성별고지 금지)'
      },
      {
        title: '핵의학 / PET', kr: '4등급', us: 'Class III', eu: 'Class IIb', risk: 'high',
        ban: ['치료 병행 암시', '방사성동위원소 안전성 과장', '특정 암 조기발견 확정 광고'],
        allow: ['검출 민감도 데이터 인용', '병원 설치 요건 정보 제공', '임상 연구 데이터 활용'],
        law: '의료기기법 제24조, 원자력안전법 연계'
      },
    ]
  },
  {
    id: 'trt', icon: '💊', label: '치료·수술기기',
    desc: '직접 치료·수술에 사용. 안전성 클레임 규제 가장 엄격. 광고 심의 필수',
    mids: [
      {
        title: '심혈관 중재기기', kr: '3~4등급', us: 'Class III', eu: 'Class III', risk: 'high',
        ban: ['수술 불필요 암시', '완치·재협착 0% 표현', '타사 스텐트 비방'],
        allow: ['임상시험 결과 수치 인용(출처 필수)', '허가된 적응증 내 광고', '수술기법 학술 심포지엄 활용'],
        law: '의료기기법 제24조제2항, 시행규칙 별표7 전 항목'
      },
      {
        title: '에너지 기반 치료기', kr: '2~3등급', us: 'Class II~III', eu: 'Class IIa~III', risk: 'mid',
        ban: ['피부체형관리로 오인 가능한 광고', '통증완화 기기를 미용기기로 광고', '치료 효과 과장'],
        allow: ['허가받은 사용목적 범위 내 효능 광고', '에너지 출력·파장 스펙 표기', '임상 논문 인용'],
        law: '의료기기법 제24조, 시행규칙 별표7 제1호·제10호'
      },
      {
        title: '수술기기·로봇', kr: '2~4등급', us: 'Class II~III', eu: 'Class IIb~III', risk: 'high',
        ban: ['수술 오류율 0% 암시', '무조건 출혈감소·합병증 없음 표현', '타사 로봇 비방'],
        allow: ['수술 시간 단축 임상 데이터', 'FDA/CE 획득 사실 표기', '외과학회 발표 데이터 활용'],
        law: '의료기기법 제24조제2항제1호, 시행규칙 별표7'
      },
      {
        title: '재활·물리치료기기', kr: '1~2등급', us: 'Class I~II', eu: 'Class I~IIa', risk: 'low',
        ban: ['척추교정·교정치료 등 의료기기 오인 표현', '혈액순환·목디스크 등 질환명 광고'],
        allow: ['근육회복 지원 기능 강조', '운동재활 보조 표현', '임상 물리치료사 협력 프로그램 홍보'],
        law: '의료기기법 제26조제7항'
      },
    ]
  },
  {
    id: 'digi', icon: '💻', label: '디지털헬스 / SaMD',
    desc: 'AI·소프트웨어 의료기기. SaMD 규제 신설 영역. 클레임 리스크 매우 높음',
    mids: [
      {
        title: 'AI 진단 소프트웨어', kr: '2~3등급', us: 'Class II', eu: 'Class IIa~IIb', risk: 'high',
        ban: ['AI 단독 진단 확정 표현', '의사 대체 가능 암시', '임상 검증 전 정확도 수치 광고'],
        allow: ['보조(assistive) 도구임을 명시', '허가된 적응증 내 민감도·특이도 인용', 'FDA De Novo/CE MDR 획득 사실 표기'],
        law: '의료기기법 제24조, SaMD 가이드라인(IMDRF 기반 식약처 고시)'
      },
      {
        title: '원격모니터링 RPM', kr: '2등급', us: 'Class II', eu: 'Class IIa', risk: 'mid',
        ban: ['응급 상황 자동 대응 암시', '의료진 없이 처방 가능 표현', '보험급여 확정 전 급여 가능 광고'],
        allow: ['모니터링 지속시간·정확도 스펙 표기', '의료진 연계 플랫폼임을 강조', '환자 순응도 개선 데이터 인용'],
        law: '의료기기법 제24조, 원격의료 관련 의료법 연계'
      },
      {
        title: '수술 계획 소프트웨어', kr: '2~3등급', us: 'Class II', eu: 'Class IIa', risk: 'mid',
        ban: ['시뮬레이션 결과 = 수술 결과 암시', '오류 없는 계획 보장 표현'],
        allow: ['수술 준비 시간 단축 데이터', '3D 시각화 정밀도 스펙', '외과·방사선 학회 발표 자료 활용'],
        law: '의료기기법 제24조제2항제1호'
      },
      {
        title: 'EMR·연계 SW', kr: '1~2등급', us: 'Class I', eu: 'Class I', risk: 'low',
        ban: ['개인정보 보안 무결점 표현', '타사 EMR 대비 비방성 비교'],
        allow: ['HL7 FHIR 호환성 명시', '병원 IT 인프라 연동 편의성 강조', '도입 병원 수·레퍼런스 홍보'],
        law: '의료기기법, 개인정보보호법, 의료법 병행 적용'
      },
    ]
  },
  {
    id: 'imp', icon: '🦷', label: '이식형·매식기기',
    desc: '체내 삽입 기기. 국내 최고 등급군. 광고 심의 + 임상 클레임 규제 가장 강함',
    mids: [
      {
        title: '정형외과 임플란트', kr: '3~4등급', us: 'Class II~III', eu: 'Class IIb~III', risk: 'high',
        ban: ['영구 보증 표현', '재수술 불필요 암시', '타사 임플란트 비방(별표7 제14호)'],
        allow: ['생존율·15년 추적 임상데이터 인용', '소재 스펙 표기', '정형외과학회 발표 데이터 활용'],
        law: '의료기기법 제24조, 시행규칙 별표7 전항목'
      },
      {
        title: '치과용 임플란트', kr: '3등급', us: 'Class II', eu: 'Class IIb', risk: 'mid',
        ban: ['즉시 하중 무조건 가능 표현', '성공률 100% 광고', '치과의사 추천 병기(허가 外)'],
        allow: ['표면처리 기술 스펙 강조', '디지털 워크플로우 효율성 광고', '치과학회 심포지엄'],
        law: '의료기기법 제24조제2항, 시행규칙 별표7 제6호'
      },
      {
        title: '신경자극기', kr: '4등급', us: 'Class III', eu: 'Class III', risk: 'high',
        ban: ['통증 완치 표현', '약물 완전 대체 암시', '수술 불필요 광고'],
        allow: ['허가된 적응증 명시(만성통증·파킨슨 등)', '임상 반응률 데이터 인용', '신경과·신경외과 전문 학회 활용'],
        law: '의료기기법 제24조제2항제1호, 최고 등급 심의 절차'
      },
      {
        title: '혈관 이식물', kr: '3~4등급', us: 'Class III', eu: 'Class III', risk: 'high',
        ban: ['영구 개방성 보증 표현', '시술 단순화 과장', '타사 제품 비방'],
        allow: ['개방율(patency rate) 임상데이터 인용', '내구성·소재 스펙 표기', '혈관외과학회 발표 활용'],
        law: '의료기기법 제24조, 시행규칙 별표7'
      },
    ]
  },
  {
    id: 'cons', icon: '🩹', label: '소모품·일반의료기기',
    desc: '1~2등급 중심. 공산품과 의료기기 경계 주의. 질환명 사용 시 오인 광고 위반 리스크',
    mids: [
      {
        title: '일회용 수술 소모품', kr: '1~2등급', us: 'Class I~II', eu: 'Class I~IIa', risk: 'low',
        ban: ['멸균 보증 기한 허위 표기', '생분해 성능 과장'],
        allow: ['멸균 방식(EO/감마) 스펙 명시', '병원 조달 편의성 강조', '의료비용 절감 데이터 인용'],
        law: '의료기기법 제24조, 의료기기 기술문서 기준'
      },
      {
        title: '상처치료·드레싱', kr: '1~2등급', us: 'Class I~II', eu: 'Class I~IIb', risk: 'low',
        ban: ['염증치료·감염치료 표현(오인 광고)', '세포재생 확정 표현', '상처 완치 보장 광고'],
        allow: ['수분 유지·보호 기능 강조', '삼출물 흡수 성능 스펙', '임상 치유속도 데이터(출처 표기)'],
        law: '의료기기법 제24조제2항제1호, 별표7 제1호'
      },
      {
        title: '개인용 건강기기', kr: '1~2등급', us: 'Class I~II', eu: 'Class I~IIa', risk: 'mid',
        ban: ['혈액순환·목디스크·불면증 등 질환명 광고', '치료·교정 효과 표현', '공산품에 의료기기 오인 표현 전면 금지'],
        allow: ['측정 정확도 스펙(허가된 기기)', '편의성·휴대성 강조', '가정에서 모니터링 개념으로 광고'],
        law: '의료기기법 제26조제7항(공산품 오인광고 핵심 조항)'
      },
      {
        title: '진단 소모품·시약', kr: '1~3등급', us: 'Class I~II', eu: 'Class A~C', risk: 'mid',
        ban: ['허가된 측정 항목 외 진단 가능 표현', '정확도 100% 표현', '비교 광고(타사 시약 비방)'],
        allow: ['측정 범위·CV% 스펙 표기', '기기 호환성 정보 제공', '임상검사의학회 발표 데이터'],
        law: '의료기기법 제24조, IVD 시약 별도 기술문서 기준'
      },
    ]
  },
];

/* ─── 선택된 시장 ─── */
let selectedMarkets = [];

/* ─── 시장 칩 초기화 ─── */
document.querySelectorAll('.chip').forEach(chip => {
  chip.addEventListener('click', () => {
    const code = chip.dataset.code;
    if (chip.classList.contains('selected')) {
      selectedMarkets = selectedMarkets.filter(m => m !== code);
      chip.classList.remove('selected');
    } else {
      selectedMarkets.push(code);
      chip.classList.add('selected');
    }
  });
});

/* ─── 탭 전환 ─── */
function switchTab(name, btn) {
  document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(el => el.classList.remove('active'));
  document.getElementById('tab-' + name).classList.add('active');
  btn.classList.add('active');
}

/* ─── 전략 생성 ─── */
async function handleGenerate() {
  const category = document.getElementById('sel-category').value;
  const product  = document.getElementById('inp-product').value.trim();
  const context  = document.getElementById('inp-context').value.trim();
  const errEl    = document.getElementById('err-msg');

  errEl.textContent = '';

  if (!category)               { errEl.textContent = '제품 대분류를 선택하세요.'; return; }
  if (product.length < 5)      { errEl.textContent = '제품 설명을 5자 이상 입력하세요.'; return; }
  if (selectedMarkets.length === 0) { errEl.textContent = '타겟 시장을 하나 이상 선택하세요.'; return; }

  setStatus('loading', '⏳ AI가 전략을 생성 중입니다… (약 15~30초 소요)');
  document.getElementById('btn-generate').disabled = true;
  document.getElementById('empty-state').style.display = 'none';
  document.getElementById('result-area').style.display = 'none';

  try {
    const res = await fetch('/api/medtech/strategy', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ category, product, markets: selectedMarkets, context: context || undefined }),
    });
    const json = await res.json();
    if (!res.ok || !json.success) throw new Error(json.error ?? `HTTP ${res.status}`);

    renderResult(json.data);
    setStatus('done', `✅ 전략 생성 완료 — ${json.meta.model} / ${new Date(json.meta.generatedAt).toLocaleString('ko-KR')}`);
  } catch (err) {
    setStatus('error', `❌ 오류: ${err.message}`);
    document.getElementById('empty-state').style.display = 'flex';
  } finally {
    document.getElementById('btn-generate').disabled = false;
  }
}

function setStatus(type, msg) {
  const el = document.getElementById('status-bar');
  el.className = 'status-bar ' + type;
  el.textContent = msg;
}

/* ─── 결과 렌더링 ─── */
function renderResult(data) {
  document.getElementById('tab-reg').innerHTML = renderReg(data);
  document.getElementById('tab-str').innerHTML = renderStr(data);
  document.getElementById('tab-ev').innerHTML  = renderEv(data.events);
  document.getElementById('tab-kol').innerHTML = renderKol(data.kol);
  document.getElementById('tab-rm').innerHTML  = renderRm(data.roadmap);

  // 첫 탭 활성화
  document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(el => el.classList.remove('active'));
  document.getElementById('tab-reg').classList.add('active');
  document.querySelectorAll('.tab-btn')[0].classList.add('active');

  document.getElementById('result-area').style.display = 'block';
}

/* ─── 탭1: 규제 분석 ─── */
function renderReg(data) {
  const riskMap = { high: ['danger', '고위험'], mid: ['warn', '중위험'], low: ['success', '저위험'] };
  const [rc, rl] = riskMap[data.summary?.risk ?? 'mid'];

  let html = `
    <div style="display:flex;align-items:center;gap:10px;margin-bottom:16px">
      <div>
        <div style="font-size:15px;font-weight:600">${esc(data.summary?.name)}</div>
        <div style="font-size:12px;color:var(--color-text-secondary)">${esc(data.summary?.category)}</div>
      </div>
      <span style="margin-left:auto" class="tag tag-${rc}">${rl}</span>
    </div>`;

  (data.regulation ?? []).forEach(r => {
    html += `
      <div style="padding:10px 0;border-bottom:1px solid var(--color-border-tertiary)">
        <div style="font-size:13px;font-weight:600;margin-bottom:6px">${esc(r.market)}</div>
        <div style="display:flex;gap:6px;margin-bottom:6px;flex-wrap:wrap">
          <span class="tag tag-info">${esc(r.grade)}</span>
          <span class="tag tag-warn">${esc(r.path)}</span>
        </div>
        <div style="font-size:12px;color:var(--color-text-secondary)">
          ${(r.rules ?? []).map(rule => `<div style="padding:2px 0">· ${esc(rule)}</div>`).join('')}
        </div>
      </div>`;
  });

  html += `<div style="margin-top:16px">
    <div style="font-size:12px;font-weight:600;margin-bottom:8px;color:var(--color-text-secondary)">금지 클레임</div>
    ${(data.compliance?.banned ?? []).map(b =>
      `<div style="display:flex;gap:8px;padding:4px 0;font-size:12px">
        <span style="color:var(--color-text-danger);flex-shrink:0">✕</span>
        <span style="color:var(--color-text-secondary)">${esc(b)}</span>
      </div>`).join('')}
  </div>`;

  html += `<div style="margin-top:12px">
    <div style="font-size:12px;font-weight:600;margin-bottom:8px;color:var(--color-text-secondary)">허용 마케팅 포인트</div>
    ${(data.compliance?.allowed ?? []).map(a =>
      `<div style="display:flex;gap:8px;padding:4px 0;font-size:12px">
        <span style="color:var(--color-text-success);flex-shrink:0">→</span>
        <span style="color:var(--color-text-secondary)">${esc(a)}</span>
      </div>`).join('')}
  </div>`;

  if (data.compliance?.caution?.length) {
    html += `<div style="margin-top:12px;padding:10px 12px;background:var(--color-background-warning);border-radius:var(--border-radius-md)">
      ${data.compliance.caution.map(c =>
        `<div style="font-size:12px;color:var(--color-text-warning)">⚠ ${esc(c)}</div>`).join('')}
    </div>`;
  }
  return html;
}

/* ─── 탭2: 마케팅 전략 ─── */
function renderStr(data) {
  const priorityColor = { high: 'var(--color-text-success)', mid: 'var(--color-text-warning)', low: 'var(--color-text-secondary)' };

  let html = `
    <div style="background:var(--color-background-secondary);border-radius:var(--border-radius-md);padding:14px;margin-bottom:16px">
      <div style="font-size:11px;color:var(--color-text-secondary);margin-bottom:6px">핵심 가치 제안</div>
      <div style="font-size:14px;font-style:italic">"${esc(data.message?.core)}"</div>
      <div style="margin-top:10px;display:flex;flex-wrap:wrap;gap:4px">
        ${(data.message?.proof ?? []).map(p => `<span class="tag tag-info">${esc(p)}</span>`).join('')}
      </div>
    </div>`;

  (data.channels ?? []).forEach(ch => {
    const color = priorityColor[ch.priority] ?? 'var(--color-text-secondary)';
    html += `
      <div style="border:1px solid var(--color-border-primary);border-radius:var(--border-radius-md);overflow:hidden;margin-bottom:8px">
        <div style="display:flex;align-items:center;gap:8px;padding:10px 14px;background:var(--color-background-secondary)">
          <span style="width:8px;height:8px;border-radius:50%;background:${color};flex-shrink:0"></span>
          <span style="font-size:13px;font-weight:600">${esc(ch.name)}</span>
          <span style="margin-left:auto;font-size:11px;color:${color}">${(ch.priority ?? '').toUpperCase()}</span>
        </div>
        <div style="padding:12px 14px">
          <div style="font-size:12px;color:var(--color-text-secondary);margin-bottom:8px">${esc(ch.rationale)}</div>
          ${(ch.tactics ?? []).map(t =>
            `<div style="font-size:12px;color:var(--color-text-secondary);padding:2px 0">→ ${esc(t)}</div>`).join('')}
        </div>
      </div>`;
  });
  return html;
}

/* ─── 탭3: 학회·행사 ─── */
function renderEv(events) {
  const typeColor = { '학회': 'var(--color-text-info)', '전시회': 'var(--color-text-warning)', '심포지엄': 'var(--color-text-success)' };
  const cards = (events ?? []).map(ev => `
    <div style="background:var(--color-background-secondary);border:1px solid var(--color-border-primary);border-radius:var(--border-radius-md);padding:14px">
      <div style="font-size:11px;font-weight:600;color:${typeColor[ev.type] ?? 'var(--color-text-info)'};margin-bottom:4px">
        ${esc(ev.month)} · ${esc(ev.type)}
      </div>
      <div style="font-size:13px;font-weight:600;margin-bottom:3px">${esc(ev.name)}</div>
      <div style="font-size:11px;color:var(--color-text-secondary)">${esc(ev.location)}</div>
      <div style="font-size:11px;color:var(--color-text-secondary);margin-top:6px;line-height:1.6">${esc(ev.opportunity)}</div>
    </div>`).join('');

  return `
    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:10px">${cards}</div>
    <div style="margin-top:12px;font-size:11px;color:var(--color-text-tertiary)">
      ※ 일정은 매년 변경될 수 있습니다. 공식 홈페이지에서 최신 일정을 확인하세요.
    </div>`;
}

/* ─── 탭4: KOL 전략 ─── */
function renderKol(kol) {
  const rows = (kol ?? []).map((k, i) => `
    <div style="display:flex;gap:12px;padding:12px 0;border-bottom:1px solid var(--color-border-tertiary)">
      <div style="width:28px;height:28px;border-radius:var(--border-radius-md);background:var(--color-background-secondary);display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:600;color:var(--color-text-secondary);flex-shrink:0">
        ${String(i + 1).padStart(2, '0')}
      </div>
      <div>
        <div style="font-size:13px;font-weight:600;margin-bottom:3px">${esc(k.type)}</div>
        <div style="font-size:12px;color:var(--color-text-secondary);margin-bottom:4px">${esc(k.profile)}</div>
        <div style="font-size:12px;color:var(--color-text-success)">→ ${esc(k.engagement)}</div>
        <div style="margin-top:4px;display:flex;gap:4px;flex-wrap:wrap">
          ${(k.markets ?? []).map(m => `<span class="tag tag-info">${esc(m)}</span>`).join('')}
        </div>
      </div>
    </div>`).join('');

  return `<div>${rows}</div>
    <div style="margin-top:14px;padding:12px;background:var(--color-background-danger);border-radius:var(--border-radius-md);font-size:12px;color:var(--color-text-danger);line-height:1.7">
      ⚠ <strong>의료기기법 시행규칙 별표7 제6호:</strong> 의사·병원이 의료기기를 추천하거나 사용 중임을 광고하는 행위는 금지됩니다.
      KOL 협력 시 반드시 광고 심의를 선행하세요.
    </div>`;
}

/* ─── 탭5: 실행 로드맵 ─── */
function renderRm(roadmap) {
  const phases = (roadmap ?? []).map(p => `
    <div style="display:flex;gap:16px;padding:12px 0;border-bottom:1px solid var(--color-border-tertiary)">
      <div style="min-width:76px;flex-shrink:0">
        <div style="font-size:12px;font-weight:600;color:var(--color-text-info)">${esc(p.phase)}</div>
        <div style="font-size:11px;color:var(--color-text-tertiary)">${esc(p.period)}</div>
      </div>
      <div style="flex:1">
        <div style="font-size:13px;font-weight:600;margin-bottom:4px">${esc(p.title)}</div>
        <div style="font-size:12px;color:var(--color-text-secondary);line-height:1.9">
          ${(p.actions ?? []).map(a => `→ ${esc(a)}`).join('<br>')}
        </div>
      </div>
    </div>`).join('');
  return `<div>${phases}</div>`;
}

/* ─── XSS 방지 ─── */
function esc(str) {
  if (!str) return '';
  return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

/* ─── 카테고리 브라우저 초기화 ─── */
(function initCatBrowser() {
  const tabsEl = document.getElementById('cat-tabs');
  const gridEl = document.getElementById('cat-grid');
  let activeCatId = CATEGORIES[0].id;

  function renderCatTabs() {
    tabsEl.innerHTML = CATEGORIES.map(cat =>
      `<button class="cat-tab-btn ${cat.id === activeCatId ? 'active' : ''}"
         onclick="selectCat('${cat.id}')">${cat.icon} ${cat.label}</button>`
    ).join('');
  }

  function renderCatGrid(catId) {
    const cat = CATEGORIES.find(c => c.id === catId);
    if (!cat) return;
    const riskLabel = { high: ['danger', '고위험'], mid: ['warn', '중위험'], low: ['success', '저위험'] };
    gridEl.innerHTML = cat.mids.map((mid, i) => {
      const [rc, rl] = riskLabel[mid.risk];
      return `
        <div class="cat-card" id="cat-card-${catId}-${i}">
          <div class="cat-card-header" onclick="toggleCatCard('${catId}', ${i})">
            <span class="title">${esc(mid.title)}</span>
            <span class="tag tag-${rc}">${rl}</span>
            <span style="margin-left:4px;color:var(--color-text-tertiary);font-size:12px">▾</span>
          </div>
          <div class="cat-card-body">
            <div class="grade-row">
              <span class="tag tag-info">🇰🇷 ${esc(mid.kr)}</span>
              <span class="tag tag-info">🇺🇸 ${esc(mid.us)}</span>
              <span class="tag tag-info">🇪🇺 ${esc(mid.eu)}</span>
            </div>
            <div class="ban-list">
              ${mid.ban.map(b => `<div class="ban-item">✕ ${esc(b)}</div>`).join('')}
            </div>
            <div class="allow-list" style="margin-top:6px">
              ${mid.allow.map(a => `<div class="allow-item">→ ${esc(a)}</div>`).join('')}
            </div>
            <div class="law-note">${esc(mid.law)}</div>
          </div>
        </div>`;
    }).join('');
  }

  window.selectCat = function(catId) {
    activeCatId = catId;
    renderCatTabs();
    renderCatGrid(catId);
  };

  window.toggleCatCard = function(catId, i) {
    document.getElementById(`cat-card-${catId}-${i}`).classList.toggle('open');
  };

  renderCatTabs();
  renderCatGrid(activeCatId);
})();
