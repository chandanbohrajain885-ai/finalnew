/* ============================================================
   InEra Group — presence, gallery, people-facing records
   Everything here is editable from /admin.
   ============================================================ */

const t = (en, hi) => ({ en, hi });

/* ── Offices — plotted on the Atlas globe ───────────────────── */
export const offices = [
  {
    id: 'of1',
    city: 'Belagavi',
    region: t('Karnataka', 'कर्नाटक'),
    country: t('India', 'भारत'),
    lat: 15.8497,
    lng: 74.4977,
    kind: 'hq',
    entities: ['iit', 'soi', 'cafe', 'ics', 'software'],
    address: t('Belagavi, Karnataka 590001, India', 'बेलगावी, कर्नाटक 590001, भारत'),
    note: t('Registered office and group headquarters.', 'पंजीकृत कार्यालय एवं समूह मुख्यालय।'),
    phone: '+91 70228 66045',
    email: 'inerasoftware@gmail.com',
    active: true,
  },
  {
    id: 'of2',
    city: 'Bengaluru',
    region: t('Karnataka', 'कर्नाटक'),
    country: t('India', 'भारत'),
    lat: 12.9716,
    lng: 77.5946,
    kind: 'office',
    entities: ['iit', 'ics'],
    address: t('Bengaluru, Karnataka, India', 'बेंगलुरु, कर्नाटक, भारत'),
    note: t('Technology delivery and client engagement.', 'प्रौद्योगिकी कार्य-निष्पादन एवं ग्राहक संपर्क।'),
    phone: '+91 70228 66045',
    email: 'inerasoftware@gmail.com',
    active: true,
  },
  {
    id: 'of3',
    city: 'Pune',
    region: t('Maharashtra', 'महाराष्ट्र'),
    country: t('India', 'भारत'),
    lat: 18.5204,
    lng: 73.8567,
    kind: 'office',
    entities: ['iit', 'soi'],
    address: t('Pune, Maharashtra, India', 'पुणे, महाराष्ट्र, भारत'),
    note: t('Engineering and programme delivery.', 'इंजीनियरिंग एवं कार्यक्रम संचालन।'),
    phone: '+91 70228 66045',
    email: 'inerasoftware@gmail.com',
    active: true,
  },
];

/* ── Gallery ────────────────────────────────────────────────── */
export const galleryCategories = [
  { id: 'gc1', key: 'activities', name: t('Group Activities', 'समूह गतिविधियाँ') },
  { id: 'gc2', key: 'events', name: t('Events', 'कार्यक्रम') },
  { id: 'gc3', key: 'workshops', name: t('Workshops', 'कार्यशालाएँ') },
  { id: 'gc4', key: 'team', name: t('Team', 'टीम') },
  { id: 'gc5', key: 'workplace', name: t('Workplace', 'कार्यस्थल') },
];

export const gallery = [];

/* ── Latest highlights ──────────────────────────────────────── */
export const highlights = [
  {
    id: 'h1',
    tag: t('Structure', 'संरचना'),
    date: '2026',
    title: t('InEra Group constituted', 'इनएरा ग्रुप का गठन'),
    body: t(
      'The four sector brand trusts are brought under one governance standard, with InEra Software Private Limited as the owning company.',
      'चारों क्षेत्रीय ब्रांड ट्रस्ट एक ही शासन-मानक के अंतर्गत लाए गए, जिनकी स्वामी कंपनी इनएरा सॉफ़्टवेयर प्राइवेट लिमिटेड है।'
    ),
    entity: '',
    active: true,
  },
  {
    id: 'h2',
    tag: t('Transfer', 'हस्तांतरण'),
    date: '2026',
    title: t('Technology practice moves to IIT', 'प्रौद्योगिकी प्रभाग IIT को हस्तांतरित'),
    body: t(
      'Engineers, delivery process and live client systems transfer intact to InEra Information Technology.',
      'इंजीनियर, डिलीवरी प्रक्रिया और चालू क्लाइंट सिस्टम यथावत् इनएरा इन्फ़र्मेशन टेक्नोलॉजी को हस्तांतरित।'
    ),
    entity: 'iit',
    active: true,
  },
  {
    id: 'h3',
    tag: t('Education', 'शिक्षा'),
    date: '2026',
    title: t('School of Intelligence — admissions open', 'स्कूल ऑफ़ इंटेलिजेंस — प्रवेश खुले'),
    body: t(
      'Individual and institutional admissions are open for the four-month execution-first programme.',
      'चार माह के क्रियान्वयन-प्रधान कार्यक्रम हेतु व्यक्तिगत एवं संस्थागत प्रवेश खुले हैं।'
    ),
    entity: 'soi',
    active: true,
  },
  {
    id: 'h4',
    tag: t('Charter', 'गठन'),
    date: '2026',
    title: t('Café and Consultancy chartered', 'कैफ़े एवं कंसल्टेंसी गठित'),
    body: t(
      'Two new brand trusts enter their commissioning phase; partnership and supply enquiries are open.',
      'दो नए ब्रांड ट्रस्ट कमीशनिंग चरण में; साझेदारी एवं आपूर्ति पूछताछ खुली।'
    ),
    entity: '',
    active: true,
  },
];

/* ── Careers ────────────────────────────────────────────────── */
export const careers = [
  {
    id: 'cr1',
    title: t('Full-Stack Engineer', 'फ़ुल-स्टैक इंजीनियर'),
    entity: 'iit',
    department: t('Engineering', 'इंजीनियरिंग'),
    type: t('Full-time', 'पूर्णकालिक'),
    location: t('Belagavi / Bengaluru / Remote', 'बेलगावी / बेंगलुरु / रिमोट'),
    description: t(
      'Build and maintain enterprise platforms end to end — schema to deployment — with real ownership of a module.',
      'एंटरप्राइज़ प्लेटफ़ॉर्म का आरंभ से अंत तक निर्माण एवं रखरखाव — स्कीमा से परिनियोजन तक — एक मॉड्यूल की पूर्ण ज़िम्मेदारी के साथ।'
    ),
    active: true,
  },
  {
    id: 'cr2',
    title: t('AI & Automation Engineer', 'एआई एवं ऑटोमेशन इंजीनियर'),
    entity: 'iit',
    department: t('AI & Automation', 'एआई एवं ऑटोमेशन'),
    type: t('Full-time', 'पूर्णकालिक'),
    location: t('Remote / Bengaluru', 'रिमोट / बेंगलुरु'),
    description: t(
      'Design document-processing and workflow automation that removes measurable manual effort for clients.',
      'ऐसा दस्तावेज़-प्रसंस्करण एवं वर्कफ़्लो स्वचालन बनाना जो ग्राहकों का मापनीय मैनुअल श्रम कम करे।'
    ),
    active: true,
  },
  {
    id: 'cr3',
    title: t('Programme Coordinator', 'कार्यक्रम समन्वयक'),
    entity: 'soi',
    department: t('School of Intelligence', 'स्कूल ऑफ़ इंटेलिजेंस'),
    type: t('Full-time', 'पूर्णकालिक'),
    location: t('Belagavi / Remote', 'बेलगावी / रिमोट'),
    description: t(
      'Run cohorts end to end: admissions, scheduling, reviewer allocation and certification.',
      'बैच का पूर्ण संचालन: प्रवेश, समय-सारिणी, समीक्षक आवंटन और प्रमाणन।'
    ),
    active: true,
  },
  {
    id: 'cr4',
    title: t('Business Development Executive', 'व्यवसाय विकास कार्यकारी'),
    entity: 'ics',
    department: t('Growth', 'विकास'),
    type: t('Full-time', 'पूर्णकालिक'),
    location: t('Pan-India', 'सम्पूर्ण भारत'),
    description: t(
      'Open conversations with businesses that need advisory, and qualify them honestly before a mandate is offered.',
      'परामर्श की आवश्यकता वाले व्यवसायों से संवाद आरंभ करना और कार्यादेश प्रस्तावित करने से पूर्व ईमानदारी से मूल्यांकन करना।'
    ),
    active: true,
  },
];

/* ── Reviews ────────────────────────────────────────────────── */
export const reviews = [
  {
    id: 'rv1',
    kind: 'client',
    entity: 'iit',
    name: 'Rajesh Malhotra',
    role: t('CTO, FinBridge Technologies', 'सीटीओ, फ़िनब्रिज टेक्नोलॉजीज़'),
    place: t('Bengaluru', 'बेंगलुरु'),
    rating: 5,
    text: t(
      'They delivered our enterprise platform on the date they committed to, and the automation module cut operational overhead by about 40%. What stood out was that they pushed back on two features we asked for and were right both times.',
      'उन्होंने हमारा एंटरप्राइज़ प्लेटफ़ॉर्म वादा की गई तिथि पर सौंपा, और ऑटोमेशन मॉड्यूल ने परिचालन व्यय लगभग 40% घटाया। सबसे उल्लेखनीय यह रहा कि उन्होंने हमारी दो माँगों पर असहमति जताई — और दोनों बार सही थे।'
    ),
    active: true,
  },
  {
    id: 'rv2',
    kind: 'client',
    entity: 'iit',
    name: 'Priya Venkataraman',
    role: t('Director of Operations, EduPulse India', 'संचालन निदेशक, एडुपल्स इंडिया'),
    place: t('Pune', 'पुणे'),
    rating: 5,
    text: t(
      'We needed a student management platform that our non-technical staff would actually adopt. They spent the first fortnight watching how our office ran before writing a line of code, and it shows in the result.',
      'हमें ऐसा विद्यार्थी-प्रबंधन प्लेटफ़ॉर्म चाहिए था जिसे हमारा ग़ैर-तकनीकी स्टाफ़ वास्तव में अपनाए। उन्होंने कोड की एक पंक्ति लिखने से पहले पहले पखवाड़े हमारे कार्यालय की कार्यप्रणाली देखी — और परिणाम में वह दिखता है।'
    ),
    active: true,
  },
  {
    id: 'rv3',
    kind: 'client',
    entity: 'iit',
    name: 'Arjun Shetty',
    role: t('Founder, WorkflowX', 'संस्थापक, वर्कफ़्लोएक्स'),
    place: t('Mumbai', 'मुंबई'),
    rating: 5,
    text: t(
      'Clean codebase, proper CI/CD, real documentation, and the source handed over without being asked twice. That is rarer than it should be.',
      'स्वच्छ कोडबेस, उचित CI/CD, वास्तविक प्रलेखन, और बिना दोबारा माँगे सौंपा गया स्रोत कोड। यह जितना सामान्य होना चाहिए, उतना है नहीं।'
    ),
    active: true,
  },
  {
    id: 'rv4',
    kind: 'student',
    entity: 'soi',
    name: 'Ananya Kulkarni',
    role: t('SOI — Full-stack track', 'SOI — फ़ुल-स्टैक ट्रैक'),
    place: t('KLE Technological University, Belagavi', 'केएलई टेक्नोलॉजिकल यूनिवर्सिटी, बेलगावी'),
    rating: 5,
    text: t(
      'It was not an internship where you watch. I was given a module, a reviewer and a deadline, and I had to deploy it and defend it. I finished with something I could actually show.',
      'यह ऐसी इंटर्नशिप नहीं थी जिसमें केवल देखना हो। मुझे एक मॉड्यूल, एक समीक्षक और एक समयसीमा दी गई; उसे परिनियोजित करना और प्रस्तुत करना पड़ा। अंत में मेरे पास दिखाने योग्य कुछ वास्तविक था।'
    ),
    active: true,
  },
  {
    id: 'rv5',
    kind: 'student',
    entity: 'soi',
    name: 'Mohammed Imran',
    role: t('SOI — AI & Automation track', 'SOI — एआई एवं ऑटोमेशन ट्रैक'),
    place: t('VTU, Karnataka', 'वीटीयू, कर्नाटक'),
    rating: 5,
    text: t(
      'I joined knowing basic Python. I left understanding how an automation actually gets shipped and monitored. The weekly reviews were blunt, which is exactly why they worked.',
      'मैं केवल बुनियादी पायथन जानते हुए जुड़ा था। मैंने यह समझकर विदा ली कि कोई स्वचालन वास्तव में कैसे लॉन्च और निगरानी किया जाता है। साप्ताहिक समीक्षाएँ स्पष्टवादी थीं — इसीलिए कारगर रहीं।'
    ),
    active: true,
  },
  {
    id: 'rv6',
    kind: 'student',
    entity: 'soi',
    name: 'Sneha Patil',
    role: t('SOI — Business Intelligence track', 'SOI — बिज़नेस इंटेलिजेंस ट्रैक'),
    place: t('Symbiosis International University, Pune', 'सिम्बायोसिस इंटरनेशनल यूनिवर्सिटी, पुणे'),
    rating: 5,
    text: t(
      'The certificate lists exactly what I built, which meant I could talk about it in interviews instead of reciting a syllabus.',
      'प्रमाणपत्र में ठीक-ठीक वही दर्ज है जो मैंने बनाया — इसलिए साक्षात्कार में मैं पाठ्यक्रम दोहराने के बजाय अपने कार्य पर बात कर सकी।'
    ),
    active: true,
  },
];

/* ── Certificates (verification register) ───────────────────── */
export const certificates = [];

/* ── Group values ───────────────────────────────────────────── */
export const values = [
  {
    id: 'v1',
    title: t('Say the number', 'आँकड़ा स्पष्ट कहें'),
    body: t(
      'Cost, timeline and scope go in writing before work starts. If we cannot state it, we are not ready to quote it.',
      'लागत, समयसीमा और कार्यक्षेत्र कार्य आरंभ होने से पूर्व लिखित रूप में। यदि हम उसे स्पष्ट नहीं कह सकते, तो उद्धरण देने को तैयार नहीं हैं।'
    ),
    active: true,
  },
  {
    id: 'v2',
    title: t('Ship, then claim', 'पहले पूर्ण करें, फिर कहें'),
    body: t(
      'Nothing is announced, certified or listed until it exists and works. The website never runs ahead of the business.',
      'कुछ भी तब तक घोषित, प्रमाणित या सूचीबद्ध नहीं होता जब तक वह अस्तित्व में आकर कार्य न करने लगे। वेबसाइट व्यवसाय से आगे नहीं चलती।'
    ),
    active: true,
  },
  {
    id: 'v3',
    title: t('Disagree early', 'असहमति पहले जताएँ'),
    body: t(
      'If a request will not serve the client, we say so in the first conversation — not in the retrospective.',
      'यदि कोई माँग ग्राहक के हित में नहीं है, तो हम पहली ही बातचीत में कह देते हैं — समीक्षा-बैठक में नहीं।'
    ),
    active: true,
  },
  {
    id: 'v4',
    title: t('Hand over everything', 'सब कुछ सौंपें'),
    body: t(
      'Source, credentials and documentation belong to the client. We do not build dependence into the architecture.',
      'स्रोत कोड, क्रेडेंशियल और प्रलेखन ग्राहक के हैं। हम आर्किटेक्चर में निर्भरता नहीं गढ़ते।'
    ),
    active: true,
  },
];

/* ── Legal ──────────────────────────────────────────────────── */
export const legal = {
  privacyTitle: t('Privacy Policy', 'गोपनीयता नीति'),
  privacyUpdated: t('Last updated: September 2026', 'अंतिम अद्यतन: सितम्बर 2026'),
  privacy: [
    {
      id: 'p1',
      heading: t('What we collect', 'हम क्या एकत्र करते हैं'),
      body: t(
        'Only what you type into a form on this site: your name, email, phone, organisation and message. We do not run advertising trackers and we do not buy or sell contact data.',
        'केवल वही जो आप इस साइट के किसी फ़ॉर्म में भरते हैं: नाम, ईमेल, दूरभाष, संस्था और संदेश। हम विज्ञापन ट्रैकर नहीं चलाते और न ही संपर्क-डेटा ख़रीदते या बेचते हैं।'
      ),
    },
    {
      id: 'p2',
      heading: t('Why we hold it', 'हम इसे क्यों रखते हैं'),
      body: t(
        'To reply to you, and to keep a record of the enquiry. Nothing else.',
        'आपको उत्तर देने और पूछताछ का अभिलेख रखने हेतु। इसके अतिरिक्त कुछ नहीं।'
      ),
    },
    {
      id: 'p3',
      heading: t('Where it is stored', 'यह कहाँ संग्रहीत है'),
      body: t(
        'In our own database, hosted on managed infrastructure. Your language preference is stored in your own browser and never leaves it.',
        'हमारे अपने डेटाबेस में, प्रबंधित अवसंरचना पर। आपकी भाषा-वरीयता आपके ही ब्राउज़र में रहती है और उसे कभी नहीं छोड़ती।'
      ),
    },
    {
      id: 'p4',
      heading: t('Your rights', 'आपके अधिकार'),
      body: t(
        'Write to us and we will tell you what we hold about you, correct it, or delete it. No form, no fee.',
        'हमें लिखिए; हम बताएँगे कि आपके विषय में हमारे पास क्या है, उसे सुधारेंगे या मिटा देंगे। कोई फ़ॉर्म नहीं, कोई शुल्क नहीं।'
      ),
    },
    {
      id: 'p5',
      heading: t('The assistant on this site', 'इस साइट का सहायक'),
      body: t(
        'The InEra assistant runs entirely inside your browser and answers only from this website’s published content. Your questions are not sent to any external service and are not stored.',
        'इनएरा सहायक पूर्णतः आपके ब्राउज़र में चलता है और केवल इस वेबसाइट की प्रकाशित सामग्री से उत्तर देता है। आपके प्रश्न किसी बाहरी सेवा को नहीं भेजे जाते और न ही संग्रहीत होते हैं।'
      ),
    },
    {
      id: 'p6',
      heading: t('Contact', 'संपर्क'),
      body: t(
        'InEra Software Private Limited, Belagavi, Karnataka, India — inerasoftware@gmail.com',
        'इनएरा सॉफ़्टवेयर प्राइवेट लिमिटेड, बेलगावी, कर्नाटक, भारत — inerasoftware@gmail.com'
      ),
    },
  ],
};

/* ── SOI admissions form configuration ──────────────────────── */
export const admissions = {
  open: true,
  heading: t('Apply to the School of Intelligence', 'स्कूल ऑफ़ इंटेलिजेंस में आवेदन'),
  intro: t(
    'One form for individual applicants and one for institutions. Both are read by a person; you will get a reply to the email you give us.',
    'एक फ़ॉर्म व्यक्तिगत आवेदकों हेतु, एक संस्थाओं हेतु। दोनों को एक व्यक्ति पढ़ता है; आपके दिए ईमेल पर उत्तर मिलेगा।'
  ),
  tracks: [
    { id: 'tr1', name: t('Artificial Intelligence', 'आर्टिफ़िशियल इंटेलिजेंस'), active: true },
    { id: 'tr2', name: t('Full-stack Development', 'फ़ुल-स्टैक डेवलपमेंट'), active: true },
    { id: 'tr3', name: t('Data & Business Intelligence', 'डेटा एवं बिज़नेस इंटेलिजेंस'), active: true },
    { id: 'tr4', name: t('Automation & Workflow', 'ऑटोमेशन एवं वर्कफ़्लो'), active: true },
  ],
  note: t(
    'Applicants must be 18 or above and currently studying at, or employed by, a recognised institution.',
    'आवेदक की आयु 18 वर्ष या अधिक हो और वह किसी मान्यता-प्राप्त संस्था में अध्ययनरत अथवा कार्यरत हो।'
  ),
};

export default {
  offices,
  gallery,
  galleryCategories,
  highlights,
  careers,
  reviews,
  certificates,
  values,
  legal,
  admissions,
};
