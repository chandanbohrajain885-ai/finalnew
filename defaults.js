/* ============================================================
   INERA GROUP — Default content (English + हिन्दी)
   Every field here is editable from /admin. This file is the
   seed / fallback used before (or instead of) cloud data.
   ============================================================ */

/** bilingual string helper */
const t = (en, hi) => ({ en, hi });

/* ── GROUP ──────────────────────────────────────────────────── */

const group = {
  legalParent: t(
    'A Group of InEra Software Private Limited',
    'इनएरा सॉफ़्टवेयर प्राइवेट लिमिटेड का एक समूह'
  ),
  registeredMark: t(
    'InEra Group is a registered brand and trademark owned and administered by InEra Software Private Limited.',
    'इनएरा ग्रुप एक पंजीकृत ब्रांड एवं ट्रेडमार्क है, जिसका स्वामित्व और प्रशासन इनएरा सॉफ़्टवेयर प्राइवेट लिमिटेड द्वारा किया जाता है।'
  ),

  hero: {
    kicker: t('Est. Belagavi, Karnataka', 'स्थापना — बेलगावी, कर्नाटक'),
    scrollCue: t('Scroll', 'नीचे देखें'),
  },

  sectorsIntro: {
    eyebrow: t('The Brand Trusts', 'ब्रांड ट्रस्ट'),
    title: t('Four sectors. One standard.', 'चार क्षेत्र। एक मानक।'),
    body: t(
      'Each brand trust below operates in its own sector with its own leadership, identity and discipline — held to a single governance standard set by the Group.',
      'नीचे दिया गया प्रत्येक ब्रांड ट्रस्ट अपने क्षेत्र में, अपने नेतृत्व, पहचान और अनुशासन के साथ कार्य करता है — और समूह द्वारा निर्धारित एक ही शासन-मानक का पालन करता है।'
    ),
  },

  statement: {
    eyebrow: t('The Group', 'समूह'),
    lead: t(
      'InEra Group is the management and brand umbrella under which the sector entities of InEra Software Private Limited are held, governed and grown.',
      'इनएरा ग्रुप वह प्रबंधन एवं ब्रांड छत्र है जिसके अंतर्गत इनएरा सॉफ़्टवेयर प्राइवेट लिमिटेड की क्षेत्रीय इकाइयाँ रखी, संचालित और विकसित की जाती हैं।'
    ),
    body: [
      t(
        'The Group does not replace its entities — it gives them a common standard of governance, a shared identity, and a single point of accountability.',
        'समूह अपनी इकाइयों का स्थान नहीं लेता — वह उन्हें शासन का एक समान मानक, साझा पहचान और जवाबदेही का एकल बिंदु प्रदान करता है।'
      ),
      t(
        'Every brand trust is constituted deliberately, positioned in a distinct sector, and held to the same expectations of quality, conduct and long-term intent.',
        'प्रत्येक ब्रांड ट्रस्ट सोच-समझकर गठित किया जाता है, एक विशिष्ट क्षेत्र में स्थापित किया जाता है, और गुणवत्ता, आचरण तथा दीर्घकालिक उद्देश्य की समान अपेक्षाओं पर खरा उतरता है।'
      ),
    ],
  },

  vision: t(
    'To build an enduring Indian group whose name is accepted, across every sector it enters, as a guarantee of quality and conduct.',
    'एक स्थायी भारतीय समूह का निर्माण करना, जिसका नाम हर उस क्षेत्र में गुणवत्ता और आचरण की गारंटी के रूप में स्वीकार किया जाए जिसमें वह प्रवेश करता है।'
  ),
  mission: t(
    'To constitute, govern and grow focused sector brand trusts — each led independently, each measured by the same standard, each contributing to one shared reputation.',
    'केंद्रित क्षेत्रीय ब्रांड ट्रस्टों का गठन, संचालन और विकास करना — प्रत्येक स्वतंत्र रूप से नेतृत्व किया गया, प्रत्येक समान मानक से मापा गया, और प्रत्येक एक साझा प्रतिष्ठा में योगदान देता हुआ।'
  ),
  whyCreated: {
    title: t('Why the Group was created', 'समूह की रचना क्यों हुई'),
    body: [
      t(
        'InEra Software Private Limited began as a single technology company. As the work widened beyond software — into education, hospitality and advisory — one company name could no longer carry four different promises without diluting all of them.',
        'इनएरा सॉफ़्टवेयर प्राइवेट लिमिटेड की शुरुआत एक तकनीकी कंपनी के रूप में हुई। जब कार्य सॉफ़्टवेयर से आगे बढ़कर शिक्षा, आतिथ्य और परामर्श तक पहुँचा, तो एक ही कंपनी का नाम चार अलग-अलग वादों को बिना कमज़ोर किए नहीं निभा सकता था।'
      ),
      t(
        'InEra Group was constituted to solve exactly that: to give each sector a name of its own, a leadership of its own and a standard it can be judged by — while keeping ownership, governance and accountability in one place.',
        'इनएरा ग्रुप का गठन ठीक इसी समाधान के लिए हुआ: प्रत्येक क्षेत्र को अपना नाम, अपना नेतृत्व और अपना मानक देना — जबकि स्वामित्व, शासन और जवाबदेही एक ही स्थान पर बनी रहे।'
      ),
    ],
  },
  intent: {
    title: t('The intent we hold ourselves to', 'हमारा उद्देश्य'),
    body: [
      t(
        'Build slowly, document everything, and never make a promise the structure cannot keep. A group is judged over decades, not quarters.',
        'धीरे-धीरे निर्माण करें, हर चीज़ का लेखा रखें, और ऐसा कोई वादा न करें जिसे संरचना निभा न सके। किसी समूह का मूल्यांकन दशकों में होता है, तिमाहियों में नहीं।'
      ),
    ],
  },

  charter: [
    {
      id: 'c1',
      title: t('Single ownership', 'एकल स्वामित्व'),
      body: t(
        'Every brand trust is owned and administered by InEra Software Private Limited. There is one legal body behind every name.',
        'प्रत्येक ब्रांड ट्रस्ट का स्वामित्व एवं प्रशासन इनएरा सॉफ़्टवेयर प्राइवेट लिमिटेड के पास है। हर नाम के पीछे एक ही वैधानिक इकाई है।'
      ),
    },
    {
      id: 'c2',
      title: t('Independent leadership', 'स्वतंत्र नेतृत्व'),
      body: t(
        'Each sector is run by people accountable for that sector alone — not by a committee stretched across four businesses.',
        'प्रत्येक क्षेत्र का संचालन उन लोगों द्वारा होता है जो केवल उसी क्षेत्र के लिए उत्तरदायी हैं — न कि चार व्यवसायों में बँटी किसी समिति द्वारा।'
      ),
    },
    {
      id: 'c3',
      title: t('One standard of conduct', 'आचरण का एक मानक'),
      body: t(
        'Documentation, pricing transparency, response time and client treatment follow the same Group rules in every entity.',
        'लेखा-प्रलेखन, मूल्य पारदर्शिता, प्रतिक्रिया समय और ग्राहक व्यवहार — प्रत्येक इकाई में समूह के समान नियमों का पालन करते हैं।'
      ),
    },
    {
      id: 'c4',
      title: t('Deliberate expansion', 'सुविचारित विस्तार'),
      body: t(
        'A new sector is entered only when a brand trust can be constituted properly and led properly. Nothing is launched to look larger.',
        'किसी नए क्षेत्र में प्रवेश केवल तभी होता है जब ब्रांड ट्रस्ट का उचित गठन और नेतृत्व संभव हो। बड़ा दिखने के लिए कुछ भी आरंभ नहीं किया जाता।'
      ),
    },
  ],

  stats: [
    { id: 's1', value: '04', label: t('Sector brand trusts', 'क्षेत्रीय ब्रांड ट्रस्ट'), active: true },
    { id: 's2', value: '01', label: t('Parent company', 'मूल कंपनी'), active: true },
    { id: 's3', value: '2026', label: t('Group constituted', 'समूह का गठन'), active: true },
    { id: 's4', value: 'KA', label: t('Registered in Karnataka, India', 'कर्नाटक, भारत में पंजीकृत'), active: true },
  ],

  chairperson: {
    name: 'Chandan Bohra Jain',
    designation: t('Chairperson, InEra Group', 'अध्यक्ष, इनएरा ग्रुप'),
    image: TEAM.chandan,
    message: t(
      'A group is not built by adding names to a letterhead. It is built by taking responsibility for every name you add. InEra Group exists so that each sector we enter carries its own identity and its own leadership — and still answers to one standard. That is the whole intent, and we do not intend to compromise it as we grow.',
      'किसी समूह का निर्माण लेटरहेड पर नाम जोड़ने से नहीं होता। वह हर जोड़े गए नाम की ज़िम्मेदारी उठाने से होता है। इनएरा ग्रुप इसलिए है ताकि हम जिस भी क्षेत्र में प्रवेश करें, उसकी अपनी पहचान और अपना नेतृत्व हो — और फिर भी वह एक ही मानक के प्रति उत्तरदायी रहे। यही पूरा उद्देश्य है, और विकास के साथ हम इससे समझौता नहीं करेंगे।'
    ),
    email: 'chandan.inera@gmail.com',
    linkedin: 'https://linkedin.com/in/chandan-bohra-jain',
    active: true,
  },

  leadership: [
    {
      id: 'l1',
      name: 'Yallappa Belavanaki',
      designation: t('Co-Founder, InEra Software Pvt. Ltd.', 'सह-संस्थापक, इनएरा सॉफ़्टवेयर प्रा. लि.'),
      image: '',
      entity: t('Parent Company', 'मूल कंपनी'),
      note: t(
        'Strong systems are built through trust, discipline and purpose.',
        'मज़बूत तंत्र विश्वास, अनुशासन और उद्देश्य से बनते हैं।'
      ),
      email: '',
      linkedin: 'https://linkedin.com/in/yallappa-belavanaki',
      active: true,
    },
    {
      id: 'l2',
      name: 'Shivani Satish Navadgi',
      designation: t('Chief Marketing Officer', 'मुख्य विपणन अधिकारी'),
      image: TEAM.shivani,
      entity: t('Group Brand & Communications', 'समूह ब्रांड एवं संचार'),
      note: t(
        'Brands grow when people genuinely connect with a vision.',
        'ब्रांड तब बढ़ते हैं जब लोग किसी दृष्टि से सच में जुड़ते हैं।'
      ),
      email: 'shivani.inera@gmail.com',
      linkedin: 'https://linkedin.com/in/shivani-navadgi',
      active: true,
    },
    {
      id: 'l3',
      name: 'Kumar Abhinav',
      designation: t('Head — School of Intelligence', 'प्रमुख — स्कूल ऑफ़ इंटेलिजेंस'),
      image: TEAM.kumar,
      entity: t('InEra SOI', 'इनएरा एसओआई'),
      note: t(
        'Learning becomes powerful when ideas turn into real execution.',
        'सीखना तब सशक्त बनता है जब विचार वास्तविक क्रियान्वयन में बदलते हैं।'
      ),
      email: 'kumar.soi@gmail.com',
      linkedin: 'https://linkedin.com/in/kumar-abhinav',
      active: true,
    },
  ],

  milestones: [
    {
      id: 'm1',
      year: '2025',
      title: t('InEra Software Private Limited', 'इनएरा सॉफ़्टवेयर प्राइवेट लिमिटेड'),
      body: t(
        'The parent company is incorporated in Belagavi, Karnataka, as a technology and software services company.',
        'मूल कंपनी बेलगावी, कर्नाटक में एक प्रौद्योगिकी एवं सॉफ़्टवेयर सेवा कंपनी के रूप में निगमित हुई।'
      ),
      active: true,
    },
    {
      id: 'm2',
      year: '2026',
      title: t('School of Intelligence established', 'स्कूल ऑफ़ इंटेलिजेंस की स्थापना'),
      body: t(
        'The education practice is formalised and renamed from School of Internships to School of Intelligence.',
        'शिक्षा प्रभाग औपचारिक रूप से गठित हुआ और "स्कूल ऑफ़ इंटर्नशिप्स" से बदलकर "स्कूल ऑफ़ इंटेलिजेंस" हुआ।'
      ),
      active: true,
    },
    {
      id: 'm3',
      year: '2026',
      title: t('InEra Group constituted', 'इनएरा ग्रुप का गठन'),
      body: t(
        'The Group is formed as the brand and management umbrella; the software practice is transferred to InEra Information Technology.',
        'समूह का गठन ब्रांड एवं प्रबंधन छत्र के रूप में हुआ; सॉफ़्टवेयर प्रभाग इनएरा इन्फ़र्मेशन टेक्नोलॉजी को हस्तांतरित किया गया।'
      ),
      active: true,
    },
    {
      id: 'm4',
      year: '2026',
      title: t('Café and Consultancy chartered', 'कैफ़े एवं कंसल्टेंसी का गठन'),
      body: t(
        'InEra Café and InEra Consultancy Services are constituted as brand trusts and enter their commissioning phase.',
        'इनएरा कैफ़े और इनएरा कंसल्टेंसी सर्विसेज़ ब्रांड ट्रस्ट के रूप में गठित हुए और अपने कमीशनिंग चरण में प्रवेश किया।'
      ),
      active: true,
    },
  ],

  announcements: [
    {
      id: 'a1',
      text: t(
        'InEra Software Private Limited now operates under the InEra Group brand umbrella.',
        'इनएरा सॉफ़्टवेयर प्राइवेट लिमिटेड अब इनएरा ग्रुप ब्रांड छत्र के अंतर्गत कार्यरत है।'
      ),
      active: true,
    },
    {
      id: 'a2',
      text: t(
        'The software and technology practice has been transferred to InEra Information Technology (IIT).',
        'सॉफ़्टवेयर एवं प्रौद्योगिकी प्रभाग इनएरा इन्फ़र्मेशन टेक्नोलॉजी (IIT) को हस्तांतरित कर दिया गया है।'
      ),
      active: true,
    },
    {
      id: 'a3',
      text: t(
        'InEra School of Intelligence — admissions and institutional partnerships open.',
        'इनएरा स्कूल ऑफ़ इंटेलिजेंस — प्रवेश एवं संस्थागत साझेदारियाँ खुली हैं।'
      ),
      active: true,
    },
  ],

  contact: {
    email: 'inerasoftware@gmail.com',
    phone: '+91 70228 66045',
    whatsapp: '917022866045',
    address: t('Belagavi, Karnataka, India', 'बेलगावी, कर्नाटक, भारत'),
    hours: t('Monday – Saturday · 10:00 – 19:00 IST', 'सोमवार – शनिवार · 10:00 – 19:00 IST'),
  },

  social: {
    linkedin: 'https://linkedin.com/company/inera-software',
    instagram: 'https://instagram.com/inerasoftware',
    youtube: 'https://youtube.com/@inerasoftware',
    twitter: '',
    facebook: '',
  },
};

/* ── ENTITIES ───────────────────────────────────────────────── */

const iit = {
  id: 'iit',
  active: true,
  name: t('InEra Information Technology', 'इनएरा इन्फ़र्मेशन टेक्नोलॉजी'),
  shortName: 'InEra IIT',
  sector: t('Information Technology', 'सूचना प्रौद्योगिकी'),
  tagline: t('Innovate · Integrate · Transform', 'नवाचार · एकीकरण · परिवर्तन'),
  stage: 'operating',
  stageNote: t('Operating — the Group’s technology practice', 'संचालनरत — समूह का प्रौद्योगिकी प्रभाग'),
  hero: {
    headline: t('Software that carries the weight of the business.', 'ऐसा सॉफ़्टवेयर जो व्यवसाय का भार उठा सके।'),
    sub: t(
      'The technology practice of InEra Group — enterprise systems, AI automation and digital platforms, built and maintained by the team that originally delivered them under InEra Software Private Limited.',
      'इनएरा ग्रुप का प्रौद्योगिकी प्रभाग — एंटरप्राइज़ सिस्टम, एआई ऑटोमेशन और डिजिटल प्लेटफ़ॉर्म, जिन्हें वही टीम बनाती और संभालती है जिसने इन्हें मूलतः इनएरा सॉफ़्टवेयर प्राइवेट लिमिटेड के अंतर्गत तैयार किया।'
    ),
  },
  about: {
    lead: t(
      'IIT holds every software, AI and infrastructure engagement of the Group.',
      'समूह की प्रत्येक सॉफ़्टवेयर, एआई और अवसंरचना परियोजना IIT के पास है।'
    ),
    body: [
      t(
        'When InEra Group was constituted, the entire technology practice of InEra Software Private Limited — its engineers, its delivery process, its live client systems and its project history — was transferred into InEra Information Technology.',
        'जब इनएरा ग्रुप का गठन हुआ, तब इनएरा सॉफ़्टवेयर प्राइवेट लिमिटेड का सम्पूर्ण प्रौद्योगिकी प्रभाग — उसके इंजीनियर, डिलीवरी प्रक्रिया, चालू क्लाइंट सिस्टम और परियोजना इतिहास — इनएरा इन्फ़र्मेशन टेक्नोलॉजी में स्थानांतरित कर दिया गया।'
      ),
      t(
        'Nothing about the work changed. The same people build the same systems to the same standard; the name on the contract is now the sector entity rather than the parent company.',
        'कार्य में कुछ भी नहीं बदला। वही लोग, वही मानक, वही सिस्टम बनाते हैं; अनुबंध पर अब मूल कंपनी के बजाय क्षेत्रीय इकाई का नाम होता है।'
      ),
      t(
        'IIT works with enterprises, institutions and funded startups — typically where an off-the-shelf product has already failed and a system has to be designed around how the organisation actually runs.',
        'IIT उद्यमों, संस्थानों और वित्त-पोषित स्टार्टअप्स के साथ कार्य करता है — प्रायः वहाँ जहाँ कोई तैयार उत्पाद पहले ही विफल हो चुका हो और संस्था की वास्तविक कार्यप्रणाली के अनुसार तंत्र तैयार करना पड़े।'
      ),
    ],
  },
  offerings: [
    {
      id: 'o1',
      title: t('Enterprise software engineering', 'एंटरप्राइज़ सॉफ़्टवेयर इंजीनियरिंग'),
      desc: t(
        'Custom platforms, internal tools and line-of-business systems — architected, built, documented and handed over with source.',
        'कस्टम प्लेटफ़ॉर्म, आंतरिक टूल और व्यावसायिक प्रणालियाँ — आर्किटेक्चर, निर्माण, प्रलेखन और स्रोत-कोड सहित हस्तांतरण।'
      ),
      active: true,
    },
    {
      id: 'o2',
      title: t('AI & workflow automation', 'एआई एवं वर्कफ़्लो ऑटोमेशन'),
      desc: t(
        'Document processing, decision support and process automation built on top of the systems an organisation already uses.',
        'दस्तावेज़ प्रसंस्करण, निर्णय-सहायता और प्रक्रिया स्वचालन — संस्था के मौजूदा तंत्रों के ऊपर निर्मित।'
      ),
      active: true,
    },
    {
      id: 'o3',
      title: t('Web & product development', 'वेब एवं उत्पाद विकास'),
      desc: t(
        'Public websites, customer portals and SaaS products with real performance budgets and accessibility standards.',
        'सार्वजनिक वेबसाइट, ग्राहक पोर्टल और SaaS उत्पाद — वास्तविक प्रदर्शन-मानकों और सुगम्यता मानकों के साथ।'
      ),
      active: true,
    },
    {
      id: 'o4',
      title: t('Mobile applications', 'मोबाइल एप्लिकेशन'),
      desc: t(
        'Android and iOS applications for field operations, customer engagement and institutional use.',
        'फ़ील्ड संचालन, ग्राहक जुड़ाव और संस्थागत उपयोग हेतु एंड्रॉइड एवं iOS एप्लिकेशन।'
      ),
      active: true,
    },
    {
      id: 'o5',
      title: t('Cloud, DevOps & maintenance', 'क्लाउड, DevOps एवं रखरखाव'),
      desc: t(
        'Deployment pipelines, monitoring, backups and annual maintenance contracts with defined response times.',
        'डिप्लॉयमेंट पाइपलाइन, निगरानी, बैकअप और निर्धारित प्रतिक्रिया-समय के साथ वार्षिक रखरखाव अनुबंध।'
      ),
      active: true,
    },
    {
      id: 'o6',
      title: t('Technology audits', 'प्रौद्योगिकी ऑडिट'),
      desc: t(
        'Independent review of an existing codebase, vendor or architecture before further money is committed to it.',
        'किसी मौजूदा कोडबेस, विक्रेता या आर्किटेक्चर की स्वतंत्र समीक्षा — आगे निवेश करने से पहले।'
      ),
      active: true,
    },
  ],
  process: [
    { id: 'p1', step: '01', title: t('Discovery', 'विवेचना'), desc: t('We map how the work is done today before proposing any software.', 'कोई भी सॉफ़्टवेयर प्रस्तावित करने से पहले हम मौजूदा कार्यप्रणाली का मानचित्रण करते हैं।'), active: true },
    { id: 'p2', step: '02', title: t('Written scope', 'लिखित कार्यक्षेत्र'), desc: t('A fixed document of deliverables, exclusions, timeline and cost. Nothing verbal.', 'डिलीवरेबल्स, अपवर्जन, समयसीमा और लागत का निश्चित दस्तावेज़। कुछ भी मौखिक नहीं।'), active: true },
    { id: 'p3', step: '03', title: t('Build in stages', 'चरणबद्ध निर्माण'), desc: t('Working software at the end of every stage, reviewed with you before the next begins.', 'प्रत्येक चरण के अंत में चालू सॉफ़्टवेयर, अगला चरण आरंभ होने से पूर्व आपके साथ समीक्षित।'), active: true },
    { id: 'p4', step: '04', title: t('Handover with source', 'स्रोत सहित हस्तांतरण'), desc: t('Code, credentials and documentation are yours. No lock-in by design.', 'कोड, क्रेडेंशियल और प्रलेखन आपके हैं। किसी प्रकार का लॉक-इन नहीं।'), active: true },
    { id: 'p5', step: '05', title: t('Maintain', 'रखरखाव'), desc: t('Optional AMC with a named engineer and a defined response window.', 'वैकल्पिक AMC — नामित इंजीनियर और निर्धारित प्रतिक्रिया-अवधि के साथ।'), active: true },
  ],
  stats: [
    { id: 'st1', value: '50+', label: t('Projects delivered', 'परियोजनाएँ पूर्ण'), active: true },
    { id: 'st2', value: '12+', label: t('Enterprise systems', 'एंटरप्राइज़ सिस्टम'), active: true },
    { id: 'st3', value: '8+', label: t('Technology domains', 'प्रौद्योगिकी क्षेत्र'), active: true },
    { id: 'st4', value: '100%', label: t('Source code handed over', 'स्रोत कोड हस्तांतरित'), active: true },
  ],
  team: [
    {
      id: 'tm1',
      name: 'Chandan Bohra Jain',
      designation: t('Chairperson — InEra Group', 'अध्यक्ष — इनएरा ग्रुप'),
      image: TEAM.chandan,
      note: t('Holds overall responsibility for the technology practice.', 'प्रौद्योगिकी प्रभाग की समग्र ज़िम्मेदारी।'),
      email: 'chandan.inera@gmail.com',
      linkedin: 'https://linkedin.com/in/chandan-bohra-jain',
      active: true,
    },
  ],
  faqs: [
    {
      id: 'f1',
      q: t('Is this the same team as InEra Software?', 'क्या यह वही टीम है जो इनएरा सॉफ़्टवेयर थी?'),
      a: t(
        'Yes. The engineering team, delivery process and live projects were transferred intact from InEra Software Private Limited to InEra Information Technology when the Group was constituted.',
        'हाँ। समूह के गठन के समय इंजीनियरिंग टीम, डिलीवरी प्रक्रिया और चालू परियोजनाएँ इनएरा सॉफ़्टवेयर प्राइवेट लिमिटेड से इनएरा इन्फ़र्मेशन टेक्नोलॉजी में यथावत् हस्तांतरित की गईं।'
      ),
      active: true,
    },
    {
      id: 'f2',
      q: t('Who signs the contract?', 'अनुबंध पर हस्ताक्षर कौन करता है?'),
      a: t(
        'InEra Software Private Limited remains the legal contracting entity. IIT is the sector brand under which the engagement is delivered.',
        'इनएरा सॉफ़्टवेयर प्राइवेट लिमिटेड ही वैधानिक अनुबंधकर्ता इकाई है। IIT वह क्षेत्रीय ब्रांड है जिसके अंतर्गत कार्य निष्पादित होता है।'
      ),
      active: true,
    },
    {
      id: 'f3',
      q: t('Do we own the source code?', 'क्या स्रोत कोड का स्वामित्व हमारा होगा?'),
      a: t(
        'Yes. Full source, infrastructure credentials and documentation are handed over on final payment, unless a different arrangement is written into the scope.',
        'हाँ। अंतिम भुगतान पर पूर्ण स्रोत कोड, अवसंरचना क्रेडेंशियल और प्रलेखन सौंप दिए जाते हैं, जब तक कि कार्यक्षेत्र में कोई अन्य व्यवस्था लिखित न हो।'
      ),
      active: true,
    },
  ],
  cta: {
    title: t('Start with a scope conversation.', 'कार्यक्षेत्र पर बातचीत से आरंभ करें।'),
    body: t(
      'Tell us what is breaking or what you are trying to build. If we are not the right fit, we will say so in the first call.',
      'हमें बताइए कि क्या ठीक से नहीं चल रहा या आप क्या बनाना चाहते हैं। यदि हम उपयुक्त नहीं हैं, तो पहली ही बातचीत में स्पष्ट कह देंगे।'
    ),
    action: t('Request a scope call', 'स्कोप कॉल का अनुरोध करें'),
  },
  social: { linkedin: '', instagram: '', youtube: '', twitter: '', facebook: '' },
  announcements: [],
  contact: { email: 'inerasoftware@gmail.com', phone: '+91 70228 66045' },
};

const soi = {
  id: 'soi',
  active: true,
  name: t('InEra School of Intelligence', 'इनएरा स्कूल ऑफ़ इंटेलिजेंस'),
  shortName: 'InEra SOI',
  sector: t('Education & Skilling', 'शिक्षा एवं कौशल'),
  tagline: t('Learn · Build · Deploy', 'सीखें · बनाएँ · लागू करें'),
  stage: 'operating',
  stageNote: t('Operating — admissions open', 'संचालनरत — प्रवेश खुले'),
  hero: {
    headline: t('Skill is what survives the demonstration.', 'कौशल वही है जो प्रदर्शन के बाद भी टिका रहे।'),
    sub: t(
      'The education practice of InEra Group. An execution-first programme where students build and deploy real systems under the supervision of working engineers.',
      'इनएरा ग्रुप का शिक्षा प्रभाग। क्रियान्वयन-प्रधान कार्यक्रम, जिसमें विद्यार्थी कार्यरत इंजीनियरों की देखरेख में वास्तविक तंत्र बनाते और लागू करते हैं।'
    ),
  },
  about: {
    lead: t(
      'SOI was formed because internships were teaching observation, not capability.',
      'SOI का गठन इसलिए हुआ क्योंकि इंटर्नशिप अवलोकन सिखा रही थीं, क्षमता नहीं।'
    ),
    body: [
      t(
        'The programme began inside InEra Software Private Limited as the School of Internships. It was renamed the School of Intelligence in July 2026 and moved into the Group as an education brand trust in its own right.',
        'यह कार्यक्रम इनएरा सॉफ़्टवेयर प्राइवेट लिमिटेड के भीतर "स्कूल ऑफ़ इंटर्नशिप्स" के रूप में आरंभ हुआ। जुलाई 2026 में इसका नाम "स्कूल ऑफ़ इंटेलिजेंस" रखा गया और इसे समूह में एक स्वतंत्र शिक्षा ब्रांड ट्रस्ट के रूप में स्थानांतरित किया गया।'
      ),
      t(
        'Every participant is assigned to real work with a real reviewer. Nothing is simulated, and nothing is certified that was not actually built.',
        'प्रत्येक प्रतिभागी को वास्तविक कार्य और वास्तविक समीक्षक सौंपा जाता है। कुछ भी काल्पनिक नहीं होता, और जो वास्तव में बनाया नहीं गया उसका प्रमाणपत्र नहीं दिया जाता।'
      ),
      t(
        'SOI runs with institutions as well as with individual learners, and issues verifiable certificates on completion.',
        'SOI संस्थानों के साथ-साथ व्यक्तिगत शिक्षार्थियों के साथ भी कार्य करता है, और पूर्णता पर सत्यापन-योग्य प्रमाणपत्र जारी करता है।'
      ),
    ],
  },
  offerings: [
    { id: 'o1', title: t('Artificial Intelligence track', 'आर्टिफ़िशियल इंटेलिजेंस ट्रैक'), desc: t('Applied AI: data handling, model use, evaluation and deployment into working products.', 'व्यावहारिक एआई: डेटा प्रबंधन, मॉडल उपयोग, मूल्यांकन और चालू उत्पादों में परिनियोजन।'), active: true },
    { id: 'o2', title: t('Full-stack development track', 'फ़ुल-स्टैक डेवलपमेंट ट्रैक'), desc: t('Frontend, backend, databases and deployment — one full system, shipped.', 'फ़्रंटएंड, बैकएंड, डेटाबेस और परिनियोजन — एक पूर्ण तंत्र, वास्तव में लॉन्च किया हुआ।'), active: true },
    { id: 'o3', title: t('Data & business intelligence track', 'डेटा एवं बिज़नेस इंटेलिजेंस ट्रैक'), desc: t('Cleaning, modelling, dashboards and the judgement to read them correctly.', 'डेटा सफ़ाई, मॉडलिंग, डैशबोर्ड और उन्हें सही ढंग से पढ़ने का विवेक।'), active: true },
    { id: 'o4', title: t('Automation & workflow track', 'ऑटोमेशन एवं वर्कफ़्लो ट्रैक'), desc: t('Process mapping and building automations that actually remove manual work.', 'प्रक्रिया मानचित्रण और ऐसे स्वचालन जो वास्तव में मैनुअल कार्य कम करें।'), active: true },
    { id: 'o5', title: t('Institutional programmes', 'संस्थागत कार्यक्रम'), desc: t('Cohort programmes delivered with colleges and universities, minimum 100 students.', 'महाविद्यालयों एवं विश्वविद्यालयों के साथ संचालित सामूहिक कार्यक्रम, न्यूनतम 100 विद्यार्थी।'), active: true },
    { id: 'o6', title: t('Verifiable certification', 'सत्यापन-योग्य प्रमाणन'), desc: t('Every certificate carries an ID that can be checked against the SOI register.', 'प्रत्येक प्रमाणपत्र पर एक ID होती है जिसे SOI रजिस्टर से जाँचा जा सकता है।'), active: true },
  ],
  process: [
    { id: 'p1', step: '01', title: t('Apply', 'आवेदन'), desc: t('Register with your track preference. No entrance test, but places are limited.', 'अपनी पसंद के ट्रैक के साथ पंजीकरण करें। कोई प्रवेश परीक्षा नहीं, परंतु स्थान सीमित हैं।'), active: true },
    { id: 'p2', step: '02', title: t('Foundation', 'आधार'), desc: t('Two weeks of tooling and fundamentals so everyone starts from the same floor.', 'दो सप्ताह के उपकरण एवं मूल सिद्धांत, ताकि सभी एक ही स्तर से आरंभ करें।'), active: true },
    { id: 'p3', step: '03', title: t('Build', 'निर्माण'), desc: t('Assigned to a real module with a named reviewer and weekly review.', 'नामित समीक्षक और साप्ताहिक समीक्षा के साथ वास्तविक मॉड्यूल सौंपा जाता है।'), active: true },
    { id: 'p4', step: '04', title: t('Deploy', 'परिनियोजन'), desc: t('The work is deployed and defended. Unshipped work does not complete the programme.', 'कार्य को परिनियोजित और प्रस्तुत करना होता है। बिना लॉन्च हुआ कार्य कार्यक्रम पूर्ण नहीं करता।'), active: true },
    { id: 'p5', step: '05', title: t('Certify', 'प्रमाणन'), desc: t('A verifiable certificate is issued, listing exactly what was built.', 'सत्यापन-योग्य प्रमाणपत्र जारी होता है, जिसमें ठीक-ठीक निर्मित कार्य दर्ज होता है।'), active: true },
  ],
  stats: [
    { id: 'st1', value: '200+', label: t('Participants trained', 'प्रशिक्षित प्रतिभागी'), active: true },
    { id: 'st2', value: '04', label: t('Specialisation tracks', 'विशेषज्ञता ट्रैक'), active: true },
    { id: 'st3', value: '₹2,500', label: t('Fee per student', 'प्रति विद्यार्थी शुल्क'), active: true },
    { id: 'st4', value: '100', label: t('Minimum institutional batch', 'न्यूनतम संस्थागत बैच'), active: true },
  ],
  programme: {
    fee: '₹2,500',
    minStudents: '100',
    mode: t('Online', 'ऑनलाइन'),
    duration: t('4 months', '4 माह'),
    openForRegistration: true,
  },
  team: [
    {
      id: 'tm1',
      name: 'Kumar Abhinav',
      designation: t('Head — School of Intelligence', 'प्रमुख — स्कूल ऑफ़ इंटेलिजेंस'),
      image: TEAM.kumar,
      note: t('Leads curriculum, cohorts and institutional partnerships.', 'पाठ्यक्रम, बैच और संस्थागत साझेदारियों का नेतृत्व।'),
      email: 'kumar.soi@gmail.com',
      linkedin: 'https://linkedin.com/in/kumar-abhinav',
      active: true,
    },
  ],
  faqs: [
    {
      id: 'f1',
      q: t('Is SOI the same as the School of Internships?', 'क्या SOI वही है जो "स्कूल ऑफ़ इंटर्नशिप्स" था?'),
      a: t(
        'Yes. The School of Internships was renamed the School of Intelligence with effect from 24 July 2026, and now sits inside InEra Group as its education brand trust.',
        'हाँ। "स्कूल ऑफ़ इंटर्नशिप्स" का नाम 24 जुलाई 2026 से "स्कूल ऑफ़ इंटेलिजेंस" कर दिया गया, और यह अब इनएरा ग्रुप के शिक्षा ब्रांड ट्रस्ट के रूप में है।'
      ),
      active: true,
    },
    {
      id: 'f2',
      q: t('Is the certificate verifiable?', 'क्या प्रमाणपत्र सत्यापन-योग्य है?'),
      a: t(
        'Yes. Each certificate carries a unique ID which can be checked on the certificate verification page of this site.',
        'हाँ। प्रत्येक प्रमाणपत्र पर एक विशिष्ट ID होती है जिसे इस साइट के प्रमाणपत्र सत्यापन पृष्ठ पर जाँचा जा सकता है।'
      ),
      active: true,
    },
    {
      id: 'f3',
      q: t('Can a college run SOI for its students?', 'क्या कोई महाविद्यालय अपने विद्यार्थियों के लिए SOI चला सकता है?'),
      a: t(
        'Yes. Institutional partnerships are available from a minimum batch of 100 students. Write to us for the partnership document.',
        'हाँ। न्यूनतम 100 विद्यार्थियों के बैच से संस्थागत साझेदारी उपलब्ध है। साझेदारी दस्तावेज़ हेतु हमें लिखें।'
      ),
      active: true,
    },
  ],
  cta: {
    title: t('Admissions are open.', 'प्रवेश खुले हैं।'),
    body: t('Register your interest and we will send the current batch schedule and syllabus.', 'अपनी रुचि दर्ज करें; हम वर्तमान बैच की समय-सारिणी और पाठ्यक्रम भेजेंगे।'),
    action: t('Register interest', 'रुचि दर्ज करें'),
  },
  social: { linkedin: '', instagram: '', youtube: '', twitter: '', facebook: '' },
  announcements: [],
  contact: { email: 'kumar.soi@gmail.com', phone: '+91 70228 66045' },
};

const cafe = {
  id: 'cafe',
  active: true,
  name: t('InEra Café', 'इनएरा कैफ़े'),
  shortName: 'InEra Café',
  sector: t('Food & Beverages', 'खाद्य एवं पेय'),
  tagline: t('A room worth staying in.', 'एक ऐसा कक्ष जहाँ रुकना अच्छा लगे।'),
  stage: 'commissioning',
  stageNote: t('Chartered 2026 · First location in commissioning', 'गठन 2026 · पहला स्थल कमीशनिंग चरण में'),
  hero: {
    headline: t('Hospitality is a discipline, not a decoration.', 'आतिथ्य एक अनुशासन है, सजावट नहीं।'),
    sub: t(
      'The food and beverages brand trust of InEra Group. Constituted in 2026 and currently in commissioning — site, supply chain and service standards are being set before the first cup is served.',
      'इनएरा ग्रुप का खाद्य एवं पेय ब्रांड ट्रस्ट। 2026 में गठित और वर्तमान में कमीशनिंग चरण में — पहला कप परोसे जाने से पहले स्थल, आपूर्ति शृंखला और सेवा-मानक निर्धारित किए जा रहे हैं।'
    ),
  },
  about: {
    lead: t(
      'InEra Café is being built backwards — from the standard we want to hold, to the room that can hold it.',
      'इनएरा कैफ़े को उल्टे क्रम में बनाया जा रहा है — पहले वह मानक जो हमें रखना है, फिर वह स्थान जो उसे धारण कर सके।'
    ),
    body: [
      t(
        'The Group constituted InEra Café as a brand trust in 2026. It is deliberately not open yet. A café is judged on its hundredth day, not its first, and the work happening now — sourcing, recipe standardisation, staffing and service training — is what decides that.',
        'समूह ने 2026 में इनएरा कैफ़े को ब्रांड ट्रस्ट के रूप में गठित किया। यह जानबूझकर अभी खुला नहीं है। किसी कैफ़े का मूल्यांकन उसके सौवें दिन होता है, पहले दिन नहीं — और अभी जो कार्य चल रहा है (स्रोत-चयन, व्यंजन मानकीकरण, स्टाफ़िंग और सेवा प्रशिक्षण) वही उसे तय करता है।'
      ),
      t(
        'What is fixed already: single-origin Indian coffee, a short menu executed precisely rather than a long one executed loosely, honest pricing, and a room designed for people who intend to sit down and stay.',
        'जो अभी तय है: सिंगल-ओरिजिन भारतीय कॉफ़ी, एक छोटा मेन्यू जिसे सटीकता से बनाया जाए — न कि लंबा मेन्यू जो ढीले ढंग से बने, ईमानदार मूल्य निर्धारण, और ऐसा कक्ष जो बैठने और ठहरने के इच्छुक लोगों के लिए बना हो।'
      ),
      t(
        'Partnership, supply and location enquiries are open now, and are handled directly by the Group.',
        'साझेदारी, आपूर्ति और स्थल संबंधी पूछताछ अभी खुली है और इसे सीधे समूह द्वारा देखा जाता है।'
      ),
    ],
  },
  offerings: [
    { id: 'o1', title: t('Specialty coffee programme', 'स्पेशलिटी कॉफ़ी कार्यक्रम'), desc: t('Single-origin Indian beans, a fixed extraction standard, and baristas trained to it.', 'सिंगल-ओरिजिन भारतीय कॉफ़ी बीन्स, निश्चित एक्सट्रैक्शन मानक, और उसी पर प्रशिक्षित बरिस्ता।'), active: true },
    { id: 'o2', title: t('A short, precise kitchen', 'छोटा, सटीक रसोईघर'), desc: t('A deliberately limited all-day menu, standardised so the tenth plate matches the first.', 'जानबूझकर सीमित दिनभर का मेन्यू, मानकीकृत — ताकि दसवीं प्लेट पहली जैसी ही हो।'), active: true },
    { id: 'o3', title: t('Work-friendly room', 'कार्य-अनुकूल परिवेश'), desc: t('Proper seating, power at the table, reliable connectivity and no rush to turn the table.', 'उचित बैठक, मेज़ पर पावर पॉइंट, भरोसेमंद कनेक्टिविटी और मेज़ खाली कराने की जल्दबाज़ी नहीं।'), active: true },
    { id: 'o4', title: t('Community evenings', 'सामुदायिक संध्याएँ'), desc: t('Reading, music and student sessions hosted with SOI and local groups.', 'SOI और स्थानीय समूहों के साथ पठन, संगीत और विद्यार्थी सत्र।'), active: true },
    { id: 'o5', title: t('Supply & sourcing partnerships', 'आपूर्ति एवं स्रोत साझेदारी'), desc: t('Open conversations with roasters, bakers and farm suppliers ahead of opening.', 'उद्घाटन से पूर्व रोस्टर, बेकर और कृषि-आपूर्तिकर्ताओं के साथ खुली बातचीत।'), active: true },
    { id: 'o6', title: t('Location & franchise enquiries', 'स्थल एवं फ़्रैंचाइज़ी पूछताछ'), desc: t('Property owners and prospective partners may register interest with the Group now.', 'संपत्ति स्वामी और संभावित साझेदार अभी समूह के पास अपनी रुचि दर्ज कर सकते हैं।'), active: true },
  ],
  process: [
    { id: 'p1', step: '01', title: t('Charter', 'गठन'), desc: t('Brand trust constituted under InEra Group. Completed 2026.', 'इनएरा ग्रुप के अंतर्गत ब्रांड ट्रस्ट गठित। 2026 में पूर्ण।'), active: true },
    { id: 'p2', step: '02', title: t('Standards', 'मानक'), desc: t('Menu, sourcing and service standards documented before any site is signed.', 'कोई स्थल तय करने से पूर्व मेन्यू, स्रोत और सेवा-मानकों का प्रलेखन।'), active: true },
    { id: 'p3', step: '03', title: t('Site & fit-out', 'स्थल एवं निर्माण'), desc: t('Location selection and build-out for the first InEra Café.', 'पहले इनएरा कैफ़े हेतु स्थल चयन एवं निर्माण।'), active: true },
    { id: 'p4', step: '04', title: t('Training', 'प्रशिक्षण'), desc: t('Staff trained and the full service run rehearsed before opening.', 'उद्घाटन से पूर्व स्टाफ़ प्रशिक्षण और पूर्ण सेवा-प्रवाह का अभ्यास।'), active: true },
    { id: 'p5', step: '05', title: t('Open', 'उद्घाटन'), desc: t('Doors open only when the standard can be held every single day.', 'द्वार तभी खुलेंगे जब मानक प्रतिदिन बनाए रखा जा सके।'), active: true },
  ],
  stats: [
    { id: 'st1', value: '2026', label: t('Brand trust chartered', 'ब्रांड ट्रस्ट गठित'), active: true },
    { id: 'st2', value: '01', label: t('First location in planning', 'पहला स्थल नियोजन में'), active: true },
    { id: 'st3', value: 'KA', label: t('Karnataka, India', 'कर्नाटक, भारत'), active: true },
    { id: 'st4', value: 'OPEN', label: t('Partnership enquiries', 'साझेदारी पूछताछ'), active: true },
  ],
  team: [],
  faqs: [
    {
      id: 'f1',
      q: t('Is InEra Café open?', 'क्या इनएरा कैफ़े खुल चुका है?'),
      a: t(
        'Not yet. The brand trust was constituted in 2026 and is in its commissioning phase — standards, sourcing and location are being finalised. The opening date will be announced on this page.',
        'अभी नहीं। ब्रांड ट्रस्ट 2026 में गठित हुआ और अभी कमीशनिंग चरण में है — मानक, स्रोत और स्थल अंतिम रूप ले रहे हैं। उद्घाटन तिथि इसी पृष्ठ पर घोषित होगी।'
      ),
      active: true,
    },
    {
      id: 'f2',
      q: t('Can I partner or supply?', 'क्या मैं साझेदारी या आपूर्ति कर सकता/सकती हूँ?'),
      a: t(
        'Yes — roasters, bakers, farm suppliers and property owners can register interest now. Enquiries are handled directly by the Group office.',
        'हाँ — रोस्टर, बेकर, कृषि-आपूर्तिकर्ता और संपत्ति स्वामी अभी रुचि दर्ज कर सकते हैं। पूछताछ सीधे समूह कार्यालय द्वारा देखी जाती है।'
      ),
      active: true,
    },
  ],
  cta: {
    title: t('Register interest before we open.', 'उद्घाटन से पूर्व रुचि दर्ज करें।'),
    body: t(
      'Partnership, supply, location or simply an invitation to the opening — leave your details with the Group office.',
      'साझेदारी, आपूर्ति, स्थल — या केवल उद्घाटन का निमंत्रण; समूह कार्यालय में अपना विवरण दर्ज करें।'
    ),
    action: t('Register interest', 'रुचि दर्ज करें'),
  },
  social: { linkedin: '', instagram: '', youtube: '', twitter: '', facebook: '' },
  announcements: [],
  contact: { email: 'inerasoftware@gmail.com', phone: '+91 70228 66045' },
};

const ics = {
  id: 'ics',
  active: true,
  name: t('InEra Consultancy Services', 'इनएरा कंसल्टेंसी सर्विसेज़'),
  shortName: 'InEra ICS',
  sector: t('Consultancy & Advisory', 'परामर्श एवं सलाहकार'),
  tagline: t('Strategy · Solutions · Success', 'रणनीति · समाधान · सफलता'),
  stage: 'commissioning',
  stageNote: t('Chartered 2026 · Practice in formation, mandates open', 'गठन 2026 · प्रैक्टिस निर्माणाधीन, कार्यादेश खुले'),
  hero: {
    headline: t('Advice you can act on the same week.', 'ऐसी सलाह जिस पर उसी सप्ताह अमल हो सके।'),
    sub: t(
      'The consultancy brand trust of InEra Group. Constituted in 2026 and now building its practice — taking selected mandates while the full service lines are being established.',
      'इनएरा ग्रुप का परामर्श ब्रांड ट्रस्ट। 2026 में गठित और अब अपनी प्रैक्टिस का निर्माण कर रहा है — पूर्ण सेवा-प्रभागों की स्थापना के दौरान चुनिंदा कार्यादेश स्वीकार करते हुए।'
    ),
  },
  about: {
    lead: t(
      'ICS exists because most advisory output ends its life as a document nobody implements.',
      'ICS इसलिए है क्योंकि अधिकांश सलाहकार कार्य का अंत ऐसे दस्तावेज़ में होता है जिसे कोई लागू नहीं करता।'
    ),
    body: [
      t(
        'InEra Consultancy Services was constituted as a brand trust of InEra Group in 2026. The practice is being built deliberately: a defined set of service lines, named advisors for each, and written engagement terms before any mandate is accepted.',
        'इनएरा कंसल्टेंसी सर्विसेज़ का गठन 2026 में इनएरा ग्रुप के ब्रांड ट्रस्ट के रूप में हुआ। प्रैक्टिस सोच-समझकर बनाई जा रही है: निर्धारित सेवा-प्रभाग, प्रत्येक के लिए नामित सलाहकार, और कोई भी कार्यादेश स्वीकार करने से पूर्व लिखित शर्तें।'
      ),
      t(
        'While that structure is completed, ICS accepts a limited number of mandates — principally with businesses already known to the Group — so that the method is tested on real work rather than described in a brochure.',
        'इस संरचना के पूर्ण होने तक ICS सीमित संख्या में कार्यादेश स्वीकार करता है — मुख्यतः उन व्यवसायों के साथ जो समूह से पहले से परिचित हैं — ताकि पद्धति को विवरणिका में वर्णित करने के बजाय वास्तविक कार्य पर परखा जा सके।'
      ),
      t(
        'Every engagement ends with a decision, an owner and a date — not a deck.',
        'प्रत्येक कार्यादेश का अंत एक निर्णय, एक उत्तरदायी व्यक्ति और एक तिथि के साथ होता है — किसी प्रस्तुति से नहीं।'
      ),
    ],
  },
  offerings: [
    { id: 'o1', title: t('Business strategy & growth', 'व्यवसाय रणनीति एवं विकास'), desc: t('Positioning, pricing and growth planning grounded in your actual numbers.', 'आपके वास्तविक आँकड़ों पर आधारित स्थिति-निर्धारण, मूल्य निर्धारण और विकास योजना।'), active: true },
    { id: 'o2', title: t('Operations & process design', 'संचालन एवं प्रक्रिया अभिकल्पना'), desc: t('Mapping how work actually flows, then removing the steps that add no value.', 'कार्य के वास्तविक प्रवाह का मानचित्रण, फिर उन चरणों को हटाना जो कोई मूल्य नहीं जोड़ते।'), active: true },
    { id: 'o3', title: t('Digital transformation advisory', 'डिजिटल रूपांतरण सलाह'), desc: t('Independent advice on what to automate, what to buy and what to leave alone.', 'क्या स्वचालित करें, क्या खरीदें और क्या छोड़ दें — इस पर स्वतंत्र सलाह।'), active: true },
    { id: 'o4', title: t('Startup & MSME advisory', 'स्टार्टअप एवं एमएसएमई सलाह'), desc: t('Structure, registrations, financial hygiene and readiness for the next stage.', 'संरचना, पंजीकरण, वित्तीय अनुशासन और अगले चरण की तैयारी।'), active: true },
    { id: 'o5', title: t('Compliance & documentation', 'अनुपालन एवं प्रलेखन'), desc: t('Getting policies, contracts and statutory records into a defensible state.', 'नीतियों, अनुबंधों और वैधानिक अभिलेखों को व्यवस्थित एवं प्रमाण-योग्य स्थिति में लाना।'), active: true },
    { id: 'o6', title: t('People & organisation', 'मानव संसाधन एवं संगठन'), desc: t('Roles, reporting lines, hiring plans and performance structures that fit the size you are.', 'आपके वर्तमान आकार के अनुरूप भूमिकाएँ, रिपोर्टिंग, नियुक्ति योजना और प्रदर्शन ढाँचे।'), active: true },
  ],
  process: [
    { id: 'p1', step: '01', title: t('Enquiry', 'पूछताछ'), desc: t('A short call to establish whether an engagement is warranted at all.', 'यह तय करने हेतु संक्षिप्त बातचीत कि कार्यादेश आवश्यक है भी या नहीं।'), active: true },
    { id: 'p2', step: '02', title: t('Diagnostic', 'निदान'), desc: t('A fixed-fee review of the specific area in question, with findings in writing.', 'संबंधित क्षेत्र की निश्चित-शुल्क समीक्षा, निष्कर्ष लिखित रूप में।'), active: true },
    { id: 'p3', step: '03', title: t('Recommendation', 'अनुशंसा'), desc: t('Options with cost, effort and risk stated plainly — not a single forced answer.', 'लागत, प्रयास और जोखिम स्पष्ट रूप से बताते विकल्प — न कि कोई एक थोपा हुआ उत्तर।'), active: true },
    { id: 'p4', step: '04', title: t('Implementation support', 'क्रियान्वयन सहयोग'), desc: t('Optional hands-on support until the change is actually in place.', 'परिवर्तन के वास्तव में लागू होने तक वैकल्पिक व्यावहारिक सहयोग।'), active: true },
    { id: 'p5', step: '05', title: t('Review', 'समीक्षा'), desc: t('A scheduled review after implementation to confirm the result held.', 'क्रियान्वयन के बाद निर्धारित समीक्षा, यह पुष्टि करने हेतु कि परिणाम स्थिर रहा।'), active: true },
  ],
  stats: [
    { id: 'st1', value: '2026', label: t('Brand trust chartered', 'ब्रांड ट्रस्ट गठित'), active: true },
    { id: 'st2', value: '06', label: t('Service lines defined', 'निर्धारित सेवा-प्रभाग'), active: true },
    { id: 'st3', value: 'LTD', label: t('Mandates accepted per quarter', 'प्रति तिमाही स्वीकृत कार्यादेश'), active: true },
    { id: 'st4', value: 'OPEN', label: t('Enquiries', 'पूछताछ'), active: true },
  ],
  team: [],
  faqs: [
    {
      id: 'f1',
      q: t('Is ICS taking clients yet?', 'क्या ICS अभी ग्राहक स्वीकार कर रहा है?'),
      a: t(
        'Selectively. The practice is in formation, so a limited number of mandates are accepted each quarter — mainly diagnostics and advisory engagements that can be completed properly at the current size.',
        'चुनिंदा रूप से। प्रैक्टिस निर्माणाधीन है, इसलिए प्रत्येक तिमाही सीमित कार्यादेश स्वीकार किए जाते हैं — मुख्यतः निदान एवं सलाह कार्य जो वर्तमान क्षमता में भली-भाँति पूर्ण हो सकें।'
      ),
      active: true,
    },
    {
      id: 'f2',
      q: t('How is ICS different from a technology vendor?', 'ICS किसी प्रौद्योगिकी विक्रेता से कैसे भिन्न है?'),
      a: t(
        'ICS advises; it does not sell you software. Where technology is genuinely the answer, the recommendation says so — and you remain free to take it to any vendor, including one outside the Group.',
        'ICS सलाह देता है; वह आपको सॉफ़्टवेयर नहीं बेचता। जहाँ वास्तव में प्रौद्योगिकी ही उत्तर है, अनुशंसा यही कहेगी — और आप उसे समूह के बाहर के विक्रेता सहित किसी के भी पास ले जाने को स्वतंत्र हैं।'
      ),
      active: true,
    },
    {
      id: 'f3',
      q: t('How is fee decided?', 'शुल्क कैसे तय होता है?'),
      a: t(
        'Diagnostics are fixed-fee and quoted in writing before work begins. Longer engagements are quoted per phase, never open-ended.',
        'निदान कार्य निश्चित-शुल्क पर होते हैं और कार्य आरंभ होने से पूर्व लिखित रूप में उद्धृत किए जाते हैं। लंबे कार्यादेश चरणबद्ध रूप से उद्धृत होते हैं, कभी भी असीमित नहीं।'
      ),
      active: true,
    },
  ],
  cta: {
    title: t('Bring one specific problem.', 'एक विशिष्ट समस्या लेकर आइए।'),
    body: t(
      'The first conversation is free and narrow. If a mandate is not warranted, we will tell you that instead of selling one.',
      'पहली बातचीत निःशुल्क और केंद्रित होती है। यदि कार्यादेश आवश्यक नहीं है, तो हम वही कहेंगे — कुछ बेचेंगे नहीं।'
    ),
    action: t('Request a consultation', 'परामर्श का अनुरोध करें'),
  },
  social: { linkedin: '', instagram: '', youtube: '', twitter: '', facebook: '' },
  announcements: [],
  contact: { email: 'inerasoftware@gmail.com', phone: '+91 70228 66045' },
};

const software = {
  id: 'software',
  active: true,
  name: t('InEra Software Private Limited', 'इनएरा सॉफ़्टवेयर प्राइवेट लिमिटेड'),
  shortName: 'InEra Software Pvt. Ltd.',
  sector: t('Parent Company', 'मूल कंपनी'),
  tagline: t('The incorporated body behind every InEra name.', 'प्रत्येक इनएरा नाम के पीछे की निगमित इकाई।'),
  stage: 'operating',
  stageNote: t('Incorporated entity · Owner of the InEra Group trademark', 'निगमित इकाई · इनएरा ग्रुप ट्रेडमार्क की स्वामी'),
  hero: {
    headline: t('One legal body. Four brand trusts.', 'एक वैधानिक इकाई। चार ब्रांड ट्रस्ट।'),
    sub: t(
      'InEra Software Private Limited is the incorporated company that owns the InEra Group trademark and administers every sector brand trust operating under it.',
      'इनएरा सॉफ़्टवेयर प्राइवेट लिमिटेड वह निगमित कंपनी है जो इनएरा ग्रुप ट्रेडमार्क की स्वामी है और उसके अंतर्गत कार्यरत प्रत्येक क्षेत्रीय ब्रांड ट्रस्ट का प्रशासन करती है।'
    ),
  },
  about: {
    lead: t(
      'Every contract, invoice and statutory filing across the Group sits with this company.',
      'समूह भर का प्रत्येक अनुबंध, चालान और वैधानिक विवरणी इसी कंपनी के अधीन है।'
    ),
    body: [
      t(
        'InEra Software Private Limited was incorporated in Belagavi, Karnataka, as a technology and software services company. It is the legal entity behind InEra Group and behind each of the four sector brand trusts.',
        'इनएरा सॉफ़्टवेयर प्राइवेट लिमिटेड बेलगावी, कर्नाटक में एक प्रौद्योगिकी एवं सॉफ़्टवेयर सेवा कंपनी के रूप में निगमित हुई। यह इनएरा ग्रुप और चारों क्षेत्रीय ब्रांड ट्रस्टों के पीछे की वैधानिक इकाई है।'
      ),
      t(
        'On formation of the Group, the company’s own software and technology delivery was transferred to InEra Information Technology, and its education programme to InEra School of Intelligence. The company itself now functions as the holding and governance body.',
        'समूह के गठन पर कंपनी की अपनी सॉफ़्टवेयर एवं प्रौद्योगिकी डिलीवरी इनएरा इन्फ़र्मेशन टेक्नोलॉजी को और शिक्षा कार्यक्रम इनएरा स्कूल ऑफ़ इंटेलिजेंस को हस्तांतरित किया गया। कंपनी स्वयं अब धारक एवं शासन इकाई के रूप में कार्य करती है।'
      ),
      t(
        'Contracting, compliance, intellectual property and group-level finance remain with the company. Sector delivery remains with the brand trusts.',
        'अनुबंध, अनुपालन, बौद्धिक संपदा और समूह-स्तरीय वित्त कंपनी के पास रहते हैं। क्षेत्रीय कार्य-निष्पादन ब्रांड ट्रस्टों के पास रहता है।'
      ),
    ],
  },
  offerings: [
    { id: 'o1', title: t('Holding & ownership', 'धारण एवं स्वामित्व'), desc: t('Owns the InEra Group trademark and every sector brand trust constituted under it.', 'इनएरा ग्रुप ट्रेडमार्क तथा उसके अंतर्गत गठित प्रत्येक ब्रांड ट्रस्ट का स्वामित्व।'), active: true },
    { id: 'o2', title: t('Contracting entity', 'अनुबंधकर्ता इकाई'), desc: t('All client agreements and invoices across the Group are issued by this company.', 'समूह भर के सभी ग्राहक अनुबंध एवं चालान इसी कंपनी द्वारा जारी होते हैं।'), active: true },
    { id: 'o3', title: t('Governance & compliance', 'शासन एवं अनुपालन'), desc: t('Statutory filings, policy and the conduct standard applied to every entity.', 'वैधानिक विवरणियाँ, नीति और प्रत्येक इकाई पर लागू आचरण-मानक।'), active: true },
    { id: 'o4', title: t('Group finance', 'समूह वित्त'), desc: t('Capital allocation between sectors and consolidated financial oversight.', 'क्षेत्रों के बीच पूँजी आवंटन और समेकित वित्तीय पर्यवेक्षण।'), active: true },
  ],
  process: [],
  stats: [
    { id: 'st1', value: 'PVT LTD', label: t('Company type', 'कंपनी प्रकार'), active: true },
    { id: 'st2', value: 'BGM', label: t('Registered — Belagavi', 'पंजीकृत — बेलगावी'), active: true },
    { id: 'st3', value: '04', label: t('Brand trusts administered', 'प्रशासित ब्रांड ट्रस्ट'), active: true },
    { id: 'st4', value: '™', label: t('Owner of the InEra Group mark', 'इनएरा ग्रुप चिह्न की स्वामी'), active: true },
  ],
  team: [
    {
      id: 'tm1',
      name: 'Chandan Bohra Jain',
      designation: t('Founder & Director', 'संस्थापक एवं निदेशक'),
      image: TEAM.chandan,
      note: t('Founder of InEra Software Private Limited; Chairperson of InEra Group.', 'इनएरा सॉफ़्टवेयर प्राइवेट लिमिटेड के संस्थापक; इनएरा ग्रुप के अध्यक्ष।'),
      email: 'chandan.inera@gmail.com',
      linkedin: 'https://linkedin.com/in/chandan-bohra-jain',
      active: true,
    },
    {
      id: 'tm2',
      name: 'Yallappa Belavanaki',
      designation: t('Co-Founder', 'सह-संस्थापक'),
      image: '',
      note: t('Co-founder of the parent company.', 'मूल कंपनी के सह-संस्थापक।'),
      email: '',
      linkedin: 'https://linkedin.com/in/yallappa-belavanaki',
      active: true,
    },
  ],
  faqs: [
    {
      id: 'f1',
      q: t('What is the relationship between InEra Group and InEra Software Private Limited?', 'इनएरा ग्रुप और इनएरा सॉफ़्टवेयर प्राइवेट लिमिटेड का क्या संबंध है?'),
      a: t(
        'InEra Group is a brand and trademark owned by InEra Software Private Limited. The Group is the umbrella under which the sector brand trusts operate; the company is the incorporated legal body that owns and administers them.',
        'इनएरा ग्रुप एक ब्रांड एवं ट्रेडमार्क है जिसका स्वामित्व इनएरा सॉफ़्टवेयर प्राइवेट लिमिटेड के पास है। समूह वह छत्र है जिसके अंतर्गत क्षेत्रीय ब्रांड ट्रस्ट कार्य करते हैं; कंपनी वह निगमित वैधानिक इकाई है जो उनका स्वामित्व एवं प्रशासन रखती है।'
      ),
      active: true,
    },
    {
      id: 'f2',
      q: t('Does InEra Software still deliver software directly?', 'क्या इनएरा सॉफ़्टवेयर अब भी सीधे सॉफ़्टवेयर सेवाएँ देती है?'),
      a: t(
        'Delivery now sits with InEra Information Technology. The company remains the contracting entity, so agreements are still signed with InEra Software Private Limited.',
        'कार्य-निष्पादन अब इनएरा इन्फ़र्मेशन टेक्नोलॉजी के पास है। कंपनी अनुबंधकर्ता इकाई बनी रहती है, इसलिए अनुबंध अब भी इनएरा सॉफ़्टवेयर प्राइवेट लिमिटेड के साथ हस्ताक्षरित होते हैं।'
      ),
      active: true,
    },
  ],
  cta: {
    title: t('Corporate and legal correspondence.', 'कॉर्पोरेट एवं वैधानिक पत्राचार।'),
    body: t('Contracts, compliance, partnership and trademark matters are handled by the company office.', 'अनुबंध, अनुपालन, साझेदारी और ट्रेडमार्क संबंधी विषय कंपनी कार्यालय द्वारा देखे जाते हैं।'),
    action: t('Contact the company office', 'कंपनी कार्यालय से संपर्क करें'),
  },
  social: { linkedin: '', instagram: '', youtube: '', twitter: '', facebook: '' },
  announcements: [],
  contact: { email: 'inerasoftware@gmail.com', phone: '+91 70228 66045' },
};

/* ── EXPORT ─────────────────────────────────────────────────── */

import extras from './extras';
import { TEAM } from './assets';

export const defaultSiteData = {
  version: 2,
  updatedAt: null,
  group,
  entities: { iit, soi, cafe, ics, software },

  // presence, media and public records — all editable from /admin
  offices: extras.offices,
  gallery: extras.gallery,
  galleryCategories: extras.galleryCategories,
  highlights: extras.highlights,
  careers: extras.careers,
  reviews: extras.reviews,
  certificates: extras.certificates,
  values: extras.values,
  legal: extras.legal,
  admissions: extras.admissions,

  // submissions
  enquiries: [],
  applications: [],
};

export default defaultSiteData;
