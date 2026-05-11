-- ============================================================
-- Scholvisor — International Schools Seed Data
-- KL & Selangor (+ Putrajaya / Nilai), 44 schools
--
-- Fees: 2024-2025 annual RM estimates. Verified from school
-- websites where accessible; estimated for others.
-- Run the CREATE UNIQUE INDEX line first if it doesn't exist.
-- ============================================================

CREATE UNIQUE INDEX IF NOT EXISTS schools_slug_unique ON schools (slug);

INSERT INTO schools (
  slug, name, city, curriculum, age_range,
  religious_environment, price_min, price_max,
  summary, website_url, school_level
) VALUES

-- ──────────────────────────────────────────────────────────────
-- KUALA LUMPUR
-- ──────────────────────────────────────────────────────────────

(
  'alice-smith',
  'Alice Smith School',
  'Kuala Lumpur',
  ARRAY['British'],
  '3–18',
  'Not specified',
  53000, 120000,
  'One of KL''s oldest and most prestigious British curriculum schools, with campuses in KLCC and Mont Kiara. Offers Early Years through Sixth Form (GCSE & A-Level). Fees verified from school website.',
  'https://www.alice-smith.edu.my',
  'All-through'
),
(
  'garden-international',
  'Garden International School',
  'Kuala Lumpur',
  ARRAY['British'],
  '3–18',
  'Not specified',
  52000, 127000,
  'A leading British curriculum school in Mont Kiara serving Nursery to Sixth Form. Known for rigorous academics, diverse international community, and strong university placement results.',
  'https://www.gardenschool.edu.my',
  'All-through'
),
(
  'iskl',
  'International School of Kuala Lumpur',
  'Kuala Lumpur',
  ARRAY['American', 'IB'],
  '3–18',
  'Not specified',
  50000, 110000,
  'A premier American curriculum school in Sri Hartamas offering Pre-K through Grade 12, IB Diploma Programme, and one of the broadest extracurricular offerings in KL.',
  'https://www.iskl.edu.my',
  'All-through'
),
(
  'mont-kiara-international',
  'Mont Kiara International School',
  'Kuala Lumpur',
  ARRAY['American'],
  '3–18',
  'Not specified',
  35000, 80000,
  'An American curriculum school in the heart of Mont Kiara''s expat hub, serving PK–Grade 12 with a strong sense of community and well-rounded co-curricular programme.',
  'https://mkis.edu.my',
  'All-through'
),
(
  'spectrum-international',
  'Spectrum International School',
  'Kuala Lumpur',
  ARRAY['British', 'Cambridge'],
  '3–18',
  'Not specified',
  20000, 45000,
  'A Cambridge-aligned international school in KL delivering British-style education from Early Years through Secondary, with an emphasis on holistic development.',
  'https://www.spectrumis.edu.my',
  'All-through'
),
(
  'al-noor-international',
  'Al Noor International School',
  'Kuala Lumpur',
  ARRAY['Islamic', 'Cambridge'],
  '3–18',
  'Available',
  15000, 35000,
  'An Islamic international school integrating Cambridge curriculum with Islamic studies and values, serving Muslim families who want faith-integrated academics in KL.',
  'https://www.alnoor.edu.my',
  'All-through'
),
(
  'igb-international',
  'IGB International School',
  'Kuala Lumpur',
  ARRAY['British', 'IB'],
  '3–18',
  'Not specified',
  45000, 90000,
  'A premium international school in Sungai Besi offering British curriculum through IGCSE and IB Diploma. Purpose-built modern campus with exceptional sports and arts facilities.',
  'https://www.igbis.edu.my',
  'All-through'
),
(
  'fairview-international-kl',
  'Fairview International School Wangsa Maju',
  'Kuala Lumpur',
  ARRAY['British'],
  '3–18',
  'Not specified',
  25000, 50000,
  'One of Malaysia''s pioneering Edexcel international schools. The flagship Wangsa Maju campus offers BTEC, IGCSE, and A-Level programmes with a proven 30-year track record.',
  'https://www.fairviewinternationalschool.com',
  'All-through'
),
(
  'cempaka-cheras',
  'Cempaka International School Cheras',
  'Kuala Lumpur',
  ARRAY['British', 'Cambridge'],
  '5–18',
  'Not specified',
  25000, 55000,
  'A well-established Cambridge school in Cheras combining IGCSE and A-Level with strong co-curricular programmes in a green campus setting. Respected for academic consistency.',
  'https://www.cempaka.edu.my',
  'Primary to Secondary'
),
(
  'oasis-kl',
  'Oasis International School Kuala Lumpur',
  'Kuala Lumpur',
  ARRAY['Cambridge'],
  '4–17',
  'Not specified',
  35000, 70000,
  'A Cambridge curriculum school in Ampang known for nurturing pastoral care and strong community feel, catering to a wide mix of nationalities across primary and secondary.',
  'https://www.oasiskl.com',
  'Primary to Secondary'
),
(
  'park-city-international',
  'The International School @ ParkCity',
  'Kuala Lumpur',
  ARRAY['British'],
  '3–16',
  'Not specified',
  40000, 80000,
  'A British curriculum day school within the upscale Desa ParkCity township. Offers Early Years through Key Stage 4 in a safe, walkable neighbourhood environment.',
  'https://www.isc-parkcity.com',
  'Early years to Secondary'
),
(
  'sayfol-international',
  'Sayfol International School',
  'Kuala Lumpur',
  ARRAY['British', 'American'],
  '4–18',
  'Not specified',
  20000, 45000,
  'A long-established international school in Ampang offering both British and American curriculum tracks, IGCSE, A-Levels, and North American diploma options.',
  'https://www.sayfol.edu.my',
  'All-through'
),
(
  'sri-emas-international',
  'Sri Emas International School',
  'Kuala Lumpur',
  ARRAY['British'],
  '3–18',
  'Not specified',
  15000, 35000,
  'An affordable British curriculum school on Old Klang Road offering full primary and secondary programmes with a warm multicultural atmosphere and accessible fees.',
  'https://www.sriemasintl.edu.my',
  'All-through'
),
(
  'sis-swiss-kl',
  'SIS Swiss International School Kuala Lumpur',
  'Kuala Lumpur',
  ARRAY['IB'],
  '3–18',
  'Not specified',
  45000, 90000,
  'The KL branch of the global Swiss International School network, offering IB Primary Years, Middle Years, and Diploma Programmes in a structured, multilingual environment.',
  'https://www.sis.edu.my',
  'All-through'
),
(
  'giis-malaysia',
  'Global Indian International School Malaysia',
  'Kuala Lumpur',
  ARRAY['CBSE', 'Cambridge'],
  '4–17',
  'Not specified',
  20000, 45000,
  'Part of the worldwide GIIS network in Ampang, offering both CBSE (Indian national curriculum) and Cambridge pathways — ideal for families seeking continuity with the Indian system.',
  'https://www.malaysia.globalindianschool.org',
  'All-through'
),
(
  'pan-pacific-international',
  'Pan Pacific International School',
  'Kuala Lumpur',
  ARRAY['American'],
  '3–18',
  'Not specified',
  15000, 35000,
  'An American curriculum school in Kepong offering Pre-K through Grade 12 education at accessible price points, with a long-standing presence serving KL''s northern communities.',
  'https://www.panpacific.edu.my',
  'All-through'
),
(
  'beacon-international-kl',
  'Beacon International School',
  'Kuala Lumpur',
  ARRAY['British', 'Cambridge'],
  '3–18',
  'Not specified',
  25000, 50000,
  'A British-based international school in Segambut offering Cambridge IGCSE and A-Levels. Known for small class sizes and a nurturing community focused on character development.',
  'https://www.beaconinternational.edu.my',
  'All-through'
),
(
  'ucsi-international',
  'UCSI International School',
  'Kuala Lumpur',
  ARRAY['British'],
  '3–18',
  'Not specified',
  20000, 50000,
  'Affiliated with UCSI University, this international school in Cheras offers British curriculum from Early Years through Sixth Form on a modern, well-connected campus.',
  'https://www.ucsiinternationalschool.edu.my',
  'All-through'
),
(
  'taylors-international-kl',
  'Taylor''s International School Kuala Lumpur',
  'Kuala Lumpur',
  ARRAY['Cambridge'],
  '3–18',
  'Not specified',
  25000, 60000,
  'The KL campus of the Taylor''s International School brand, offering Cambridge curriculum from Early Years through A-Levels with strong university counselling and facilities.',
  'https://www.taylors.edu.my/international-school',
  'All-through'
),
(
  'etonhouse-kl',
  'EtonHouse International School Kuala Lumpur',
  'Kuala Lumpur',
  ARRAY['British', 'IB'],
  '2–12',
  'Not specified',
  25000, 55000,
  'The KL campus of the Singapore-founded EtonHouse network in Bangsar. Offers IB-aligned Early Years and Primary programmes with a strong inquiry-based, child-led approach.',
  'https://www.etonhouse.edu.my',
  'Early years to Secondary'
),
(
  'stella-maris-kl',
  'Stella Maris International School',
  'Kuala Lumpur',
  ARRAY['British', 'Cambridge'],
  '3–18',
  'Not specified',
  20000, 45000,
  'A values-driven Cambridge school in KL with a close-knit community. Offers IGCSE and a full secondary programme, known for its inclusive environment and personal attention.',
  'https://www.stellamariskl.edu.my',
  'All-through'
),
(
  'tariq-international',
  'Tariq International School',
  'Kuala Lumpur',
  ARRAY['Islamic', 'Cambridge'],
  '3–18',
  'Available',
  15000, 30000,
  'An Islamic international school in KL blending Cambridge curriculum with Quran memorisation and Islamic studies, offering a faith-integrated education at accessible fees.',
  'https://www.tariq.edu.my',
  'All-through'
),
(
  'lfm-kl',
  'Lycée Français de Kuala Lumpur',
  'Kuala Lumpur',
  ARRAY['French'],
  '3–18',
  'Not specified',
  25000, 55000,
  'The official French international school of KL, following the French national curriculum through Baccalauréat. Serves the Francophone expat community and bilingual families.',
  'https://www.lfkl.edu.my',
  'All-through'
),
(
  'ciskl',
  'Chinese International School Kuala Lumpur',
  'Kuala Lumpur',
  ARRAY['British', 'Chinese'],
  '3–18',
  'Not specified',
  25000, 55000,
  'A bilingual international school in Bukit Damansara offering a dual-language British curriculum with strong Mandarin instruction, attracting Chinese-heritage and international families.',
  'https://www.cis.edu.my',
  'All-through'
),
(
  'sji-international-malaysia',
  'SJI International School Malaysia',
  'Kuala Lumpur',
  ARRAY['IB'],
  '3–18',
  'Not specified',
  35000, 75000,
  'Affiliated with the globally recognised St. Joseph''s Institution (Singapore), offering IB PYP, MYP, and Diploma with a strong ethos of service, leadership, and academic rigour.',
  'https://www.sji-international.edu.my',
  'All-through'
),
(
  'invictus-kl',
  'Invictus International School Kuala Lumpur',
  'Kuala Lumpur',
  ARRAY['British', 'Cambridge'],
  '3–18',
  'Not specified',
  30000, 65000,
  'The KL branch of the Singapore-based Invictus network, offering Cambridge curriculum with a holistic approach to learning, innovation thinking, and leadership development.',
  'https://www.invictus.edu.my',
  'All-through'
),
(
  'lincoln-school-malaysia',
  'Lincoln School Malaysia',
  'Kuala Lumpur',
  ARRAY['American'],
  '3–18',
  'Not specified',
  35000, 75000,
  'An American curriculum school in KL offering a comprehensive K–12 programme. Serves international families with a community-first culture and a wide range of extracurricular activities.',
  'https://www.lincoln.edu.my',
  'All-through'
),

-- ──────────────────────────────────────────────────────────────
-- SELANGOR
-- ──────────────────────────────────────────────────────────────

(
  'taylors-international-subang',
  'Taylor''s International School Subang Jaya',
  'Subang Jaya',
  ARRAY['Cambridge'],
  '3–18',
  'Not specified',
  25000, 60000,
  'The flagship Taylor''s International School campus in Subang Jaya, offering Cambridge curriculum from Early Years through A-Levels with excellent sports, arts, and university placement support.',
  'https://www.taylors.edu.my/international-school',
  'All-through'
),
(
  'help-international',
  'HELP International School',
  'Subang Jaya',
  ARRAY['Cambridge'],
  '3–18',
  'Not specified',
  20000, 45000,
  'Part of the HELP Education Group in Subang Jaya. Offers Cambridge IGCSE and A-Levels with strong pastoral care, a broad extracurricular programme, and close university links.',
  'https://his.edu.my',
  'All-through'
),
(
  'imaas',
  'IMAAS International School',
  'Shah Alam',
  ARRAY['Islamic', 'British'],
  '3–18',
  'Available',
  15000, 35000,
  'An Islamic international school in Shah Alam integrating British curriculum with Islamic studies and character development rooted in Muslim values and a halal environment.',
  'https://www.imaas.edu.my',
  'All-through'
),
(
  'elc-international',
  'ELC International School',
  'Sungai Buloh',
  ARRAY['British'],
  '3–18',
  'Not specified',
  20000, 45000,
  'A long-established British (Edexcel) curriculum school in Sungai Buloh. Known for deliberately keeping fees below the 40th percentile among international schools while maintaining quality.',
  'https://www.elc.edu.my',
  'All-through'
),
(
  'sri-kdu-kota-damansara',
  'Sri KDU International School',
  'Kota Damansara',
  ARRAY['British', 'Cambridge'],
  '3–18',
  'Not specified',
  25000, 55000,
  'A modern Cambridge international school in Kota Damansara with state-of-the-art facilities, a vibrant co-curricular programme, and strong IGCSE and A-Level results.',
  'https://www.srikdu.edu.my',
  'All-through'
),
(
  'sunway-international',
  'Sunway International School',
  'Subang Jaya',
  ARRAY['Cambridge', 'IB'],
  '3–18',
  'Not specified',
  30000, 65000,
  'Located within Sunway''s integrated township in Bandar Sunway. Offers both Cambridge and IB programmes with exceptional sporting facilities, a large student body, and vibrant school life.',
  'https://www.sunwayinternationalschool.com',
  'All-through'
),
(
  'tenby-setia-alam',
  'Tenby International School Setia Alam',
  'Shah Alam',
  ARRAY['British'],
  '3–18',
  'Not specified',
  25000, 55000,
  'The Setia Alam campus of the Tenby International Schools group. Delivers a full British curriculum experience in a spacious, well-resourced suburban environment west of KL.',
  'https://www.tenby.edu.my',
  'All-through'
),
(
  'chempaka-pj',
  'Chempaka International School Petaling Jaya',
  'Petaling Jaya',
  ARRAY['British', 'Cambridge'],
  '3–18',
  'Not specified',
  20000, 40000,
  'The PJ campus of Cempaka International Schools, offering Cambridge IGCSE and a full primary programme with a holistic approach in a safe, community-oriented suburban setting.',
  'https://www.cempaka.edu.my',
  'All-through'
),
(
  'elms-international',
  'Elms International School',
  'Petaling Jaya',
  ARRAY['British', 'Cambridge'],
  '3–18',
  'Not specified',
  20000, 45000,
  'A British-based international school in PJ offering Cambridge qualifications from Early Years through Secondary, with emphasis on structured academics and individual progress.',
  'https://www.elms.edu.my',
  'All-through'
),
(
  'rafflesia-international',
  'Rafflesia International & Private School',
  'Petaling Jaya',
  ARRAY['British'],
  '3–18',
  'Not specified',
  20000, 45000,
  'An international school in Damansara Perdana offering British curriculum from pre-school through secondary at approachable price points, known for its welcoming atmosphere.',
  'https://www.rafflesia.edu.my',
  'All-through'
),
(
  'regent-international-subang',
  'Regent International School',
  'Subang Jaya',
  ARRAY['British'],
  '3–18',
  'Not specified',
  20000, 45000,
  'A British curriculum international school in Subang Jaya offering Early Years through secondary education with a focus on academic achievement and personal character development.',
  'https://www.regent.edu.my',
  'All-through'
),
(
  'real-international',
  'REAL International School',
  'Shah Alam',
  ARRAY['British'],
  '3–18',
  'Not specified',
  15000, 35000,
  'Part of the REAL Education Group in Shah Alam, offering British curriculum with Quran literacy integrated alongside core academics at value-conscious price points.',
  'https://www.real.edu.my',
  'All-through'
),
(
  'australian-international-malaysia',
  'Australian International School Malaysia',
  'Kuala Lumpur',
  ARRAY['Australian'],
  '3–18',
  'Not specified',
  30000, 65000,
  'Following the Australian ACARA curriculum, this school provides a familiar education pathway for Australian families in Malaysia and recognition for entry to Australian universities.',
  'https://www.aism.edu.my',
  'All-through'
),
(
  'fairview-international-pj',
  'Fairview International School Petaling Jaya',
  'Petaling Jaya',
  ARRAY['British'],
  '3–18',
  'Not specified',
  25000, 50000,
  'The Petaling Jaya campus of Fairview International School, offering Edexcel IGCSE and A-Level with the same proven British curriculum as the flagship campus.',
  'https://www.fairviewinternationalschool.com',
  'All-through'
),

-- ──────────────────────────────────────────────────────────────
-- PUTRAJAYA / NEARBY
-- ──────────────────────────────────────────────────────────────

(
  'nexus-putrajaya',
  'Nexus International School Putrajaya',
  'Putrajaya',
  ARRAY['IB'],
  '3–18',
  'Not specified',
  30000, 70000,
  'An IB World School in Putrajaya offering the full IB continuum — PYP, MYP, and Diploma. Known for inquiry-based learning, strong pastoral care, and international-mindedness.',
  'https://www.nexusis.com',
  'All-through'
),
(
  'cyberview-international',
  'Cyberview International School',
  'Cyberjaya',
  ARRAY['IB', 'Cambridge'],
  '3–18',
  'Not specified',
  25000, 55000,
  'Set in Cyberjaya''s technology hub, offering IB and Cambridge pathways with a modern STEM-focused campus and a globally diverse student body drawn from the tech industry community.',
  'https://www.cyberviewschool.edu.my',
  'All-through'
),
(
  'epsom-college-malaysia',
  'Epsom College Malaysia',
  'Nilai',
  ARRAY['British'],
  '3–18',
  'Not specified',
  40000, 90000,
  'The Malaysian campus of the prestigious UK independent school Epsom College, offering a full British boarding and day school experience just 45 minutes from KL city centre.',
  'https://www.epsomcollege.edu.my',
  'All-through'
)

ON CONFLICT (slug) DO NOTHING;

-- ─── Verify ────────────────────────────────────────────────────────────────────
-- Run after insert to confirm counts and spot any nulls:
-- SELECT city, count(*) FROM schools GROUP BY city ORDER BY count DESC;
-- SELECT name, price_min, price_max FROM schools WHERE price_min IS NULL;
