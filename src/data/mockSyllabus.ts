import { SyllabusRoadmap } from "@/types";

export const MOCK_SYLLABUS_ROADMAPS: SyllabusRoadmap[] = [
  // ==================== SIR KHURRAM HUSSAIN (SKH SOLUTIONS) ====================
  {
    id: "syl-skh-islamiyat",
    tutorId: "skh-khurram",
    tutorName: "Sir Khurram Hussain",
    instituteName: "SKH Solutions",
    courseTitle: "CAIE O Level Islamiyat (2058) — Complete Syllabus & Past Paper Series",
    subject: "Cambridge O Level Islamiyat",
    curriculum: "CAIE O Level",
    batchSchedule: "Mon, Wed, Fri • 4:00 PM – 5:30 PM (SKH Jauhar Campus & Live Online)",
    targetExamDate: "May/June 2025",
    totalTopics: 5,
    completedTopics: 2,
    enrolledStudents: [
      "Mustafa Tariq",
      "Hamza Shah",
      "Ayesha Siddiqui",
      "Zayd Malik",
      "Mariam Farhan",
    ],
    studentName: "Mustafa Tariq (and enrolled batch)",
    topics: [
      {
        id: "top-kh-1",
        chapterNumber: 1,
        chapterName: "Major Themes of the Holy Quran",
        topicName: "Passages 1 to 15: Allah in Himself, Allah's Relationship with Created World & Messengers",
        estimatedHours: 6.0,
        status: "completed",
        completedDate: "2024-09-18",
        tutorNotes: "14-mark question framework memorized. Excellent command on comparative themes between Surah Al-Anaam and Surah Fussilat.",
        homeworkAssigned: "Complete Paper 1 Q1 past exam drills (2020-2023 Series).",
        attachments: [
          {
            id: "att-kh-1a",
            type: "note",
            title: "14-Mark Question Breakdown & Tafseer Model Answers (Passages 1-15)",
            description: "Official SKH Solutions guidance on scoring full 10 marks in part (a) theme analysis and 4 marks in part (b) contemporary application.",
            fileName: "SKH_Islamiyat_14Mark_QuranicPassages_ModelAnswers.pdf",
            fileSize: "320 KB",
            createdAt: "2024-09-05",
            downloadContent: `SKH SOLUTIONS — CAMBRIDGE O-LEVEL ISLAMIYAT (2058/01)
FACULTY: SIR KHURRAM HUSSAIN
MODULE: MAJOR THEMES OF THE HOLY QURAN (PASSAGES 1-15)

1. EXAM CRITERIA FOR QUESTION 1 (14 MARKS):
   - Part (a) [4 marks per 2 passages = 8 marks]: Major theme/teachings of the passage.
   - Part (b) [4 marks]: Importance of these themes in the daily life of a Muslim today.

2. THEME 1: ALLAH IN HIMSELF
   - Passage 1 (Ayat al-Kursi 2:255): Tauheed, supreme sovereignty, neither slumber nor sleep overtakes Him.
   - Passage 2 (Surah Al-An'am 6:101-103): Creator of heavens and earth, no partner or offspring, beyond human comprehension (vision cannot grasp Him).
   - Passage 3 (Surah Fussilat 41:37): Day and night, sun and moon are signs; prostrate to the Creator, not His creations.
   - Passage 4 (Surah Ash-Shura 42:4-5): Heavens almost break apart from His majesty; angels praise Him and seek forgiveness for mortals.
   - Passage 5 (Surah Al-Ikhlas 112): Pure Tauheed; absolute independence (As-Samad); unbegotten; unequalled.

3. MODEL PART (B) ANSWERS FOR TOP MARKS:
   - Muslims must avoid all forms of Shirk (both open and hidden like ostentation/Riya).
   - Humility in front of Allah: knowing He controls sustenance removes arrogance and despair.
   - Muslims should turn only to Allah in times of distress rather than superstitious practices.`,
          },
          {
            id: "att-kh-1b",
            type: "homework",
            title: "Topical Past Paper Drill Worksheet: Passages 1-15 (2019–2024)",
            description: "Practice answering Paper 1 Question 1 under timed conditions (25 minutes). Write full Part (a) and Part (b) responses.",
            fileName: "SKH_Islamiyat_HW_Topical_Passages_Drill.pdf",
            fileSize: "185 KB",
            dueDate: "2024-09-15",
            createdAt: "2024-09-08",
            downloadContent: `SKH SOLUTIONS — HOMEWORK WORKSHEET 01
COURSE: CAIE O LEVEL ISLAMIYAT (2058) | SIR KHURRAM HUSSAIN

TASK: Answer any TWO of the following passages from CAIE Past Papers:

1. Surah 2:255 (Ayat al-Kursi)
   (a) Briefly describe the main theme of this passage. [4]
   (b) How does belief in this passage affect a Muslim's daily routine and mindset? [4]

2. Surah 41:37 (Surah Fussilat)
   (a) Briefly outline the teachings in this passage about Allah's creation. [4]
   (b) How can observing the universe strengthen a Muslim's faith in Allah? [4]

SUBMISSION INSTRUCTIONS:
- Handwrite in Cambridge-ruled margins.
- Ensure cross-references to other Quranic verses or Hadith are highlighted.
- Due by Sunday midnight before the Monday batch review.`,
          },
          {
            id: "att-kh-1c",
            type: "assignment",
            title: "Mid-Term Assessment: Quranic Passages Comparative Essay",
            description: "Formal graded assessment on Allah's Relationship with the Messengers (Adam, Ibrahim, Isa, and Muhammad PBUH).",
            fileName: "SKH_Islamiyat_Assignment_01_ComparativeMessengers.pdf",
            fileSize: "240 KB",
            dueDate: "2024-09-22",
            maxMarks: 25,
            createdAt: "2024-09-12",
            downloadContent: `SKH SOLUTIONS — GRADED MID-MODULE ASSESSMENT
COURSE: CAIE O LEVEL ISLAMIYAT (2058/01)
INSTRUCTOR: SIR KHURRAM HUSSAIN
TOTAL MARKS: 25 | TIME ALLOWED: 45 MINUTES

QUESTION 1:
(a) Using passages from the syllabus, write an account of the main themes regarding Allah's relationship with Prophet Ibrahim (AS) and Prophet Isa (AS). [10]
(b) What lessons can modern believers learn from the trials faced by Prophet Ibrahim when searching for God? [4]

QUESTION 2:
(a) Contrast the divine guidance provided to Prophet Adam (AS) after his forgiveness with the guidance given to Prophet Muhammad (PBUH) in Surah Al-Duha and Al-Kawthar. [8]
(b) In what ways does Surah Al-Kawthar offer comfort to Muslims undergoing mockery today? [3]

MARKING RUBRIC:
Level 4 (9-10 marks): Comprehensive narrative with accurate Quranic citations and sophisticated analytical structure.
Level 3 (7-8 marks): Good descriptive details with sound understanding.
Level 2 (4-6 marks): Basic familiarity with some omissions.`,
          },
        ],
      },
      {
        id: "top-kh-2",
        chapterNumber: 2,
        chapterName: "History and Importance of the Holy Quran",
        topicName: "Compilation under Caliph Abu Bakr (RA) and Caliph Uthman (RA)",
        estimatedHours: 5.5,
        status: "completed",
        completedDate: "2024-10-06",
        tutorNotes: "Zayd ibn Thabit's verification criteria and the Dialect of Quraish thoroughly reviewed. Students prepared for 10-mark Question 2 essays.",
        homeworkAssigned: "Write a 500-word essay on the Battle of Yamama and Umar's advice to Abu Bakr.",
        attachments: [
          {
            id: "att-kh-2a",
            type: "note",
            title: "Standardization of the Mus'haf: Chronology & Academic Commentary",
            description: "Key historical dates, the role of Hafsa (RA), Zayd ibn Thabit's committee, and preservation methodology.",
            fileName: "SKH_Islamiyat_Notes_Compilation_AbuBakr_Uthman.pdf",
            fileSize: "410 KB",
            createdAt: "2024-09-25",
            downloadContent: `SKH SOLUTIONS — CAMBRIDGE O-LEVEL ISLAMIYAT
COMPREHENSIVE NOTES: THE COMPILATION OF THE HOLY QURAN
BY: SIR KHURRAM HUSSAIN

I. COMPILATION UNDER HAZRAT ABU BAKR (RA):
1. Catalyst: The Battle of Yamama (632 AD / 12 AH) against Musaylima the Liar, where ~70 Huffaz were martyred.
2. Hazrat Umar (RA) approached Caliph Abu Bakr urging preservation. Abu Bakr initially hesitated ("How can I do what the Prophet did not?"), but Umar convinced him.
3. Zayd ibn Thabit was commissioned: "You are a wise young man, free from suspicion, and you wrote the revelation for the Messenger of Allah."
4. Rigorous Methodology: Zayd required two upright witnesses for every written verse testifying that it was written in the presence of the Prophet (PBUH).
5. The manuscript was termed 'Suhuf' and kept with Abu Bakr, then Umar, and then Hafsa (RA) (known as Mushaf-e-Hafsa).

II. STANDARDIZATION UNDER HAZRAT UTHMAN (RA):
1. Catalyst: The campaign in Armenia and Azerbaijan. Hudhaifa ibn al-Yaman noticed alarming dialectal disputes among Iraqi and Syrian troops reading different accents.
2. Hazrat Uthman appointed a committee of four: Zayd ibn Thabit, Abdullah ibn Zubayr, Sa'id ibn al-A'as, and Abdur Rahman ibn al-Harith.
3. Rule: In case of disagreement, transcribe in the Quraishi dialect, in which the Quran was revealed.
4. Copies were dispatched to major Islamic capitals (Basra, Kufa, Damascus, Makkah, and one retained in Madinah).
5. Primary copies lacking verified dialect were destroyed to preserve unified unity.`,
          },
          {
            id: "att-kh-2b",
            type: "homework",
            title: "Paper 1 Question 2 Essay Draft: Compilation Timeline",
            description: "Submit written outline covering: 1. Motivation behind compilation 2. Methods employed 3. Role of Zayd ibn Thabit.",
            fileName: "SKH_Islamiyat_HW_Compilation_Essay.pdf",
            fileSize: "150 KB",
            dueDate: "2024-10-04",
            createdAt: "2024-09-28",
            downloadContent: `SKH SOLUTIONS — ESSAY HOMEWORK
TOPIC: THE PRESERVATION OF THE DIVINE TEXT
DUE: OCTOBER 4, 2024

PROMPT:
(a) Trace the steps taken by Caliph Abu Bakr (RA) and Caliph Uthman (RA) to compile and preserve the Holy Quran into a single written book. [10 marks]
(b) Why was it important for the Quran to be standardized in the Quraishi dialect? [4 marks]

FORMAT RULES:
- Minimum 3 quotations or references.
- Use subheadings for Caliph Abu Bakr's era and Caliph Uthman's era.`,
          },
        ],
      },
      {
        id: "top-kh-3",
        chapterNumber: 3,
        chapterName: "The Life and Importance of the Holy Prophet (PBUH) in Makkah",
        topicName: "Persecution of Early Muslims, Boycott at Shib Abi Talib & Journey to Ta'if",
        estimatedHours: 6.0,
        status: "in_progress",
        completedDate: undefined,
        tutorNotes: "Currently covering the social boycott and the Year of Grief (Aam-ul-Huzn). Next session will focus on Isra and Miraj.",
        homeworkAssigned: "Read chapter 4 of syllabus handout and prepare short notes on the Treaty of Aqabah.",
        attachments: [
          {
            id: "att-kh-3a",
            type: "note",
            title: "Persecution of Early Converts & Boycott at Shib Abi Talib — Master Handout",
            description: "Detailed historical account of Bilal ibn Rabah, family of Yasir, Sumayya (RA), Khabab ibn al-Aratt, and the 3-year diplomatic embargo.",
            fileName: "SKH_Islamiyat_Notes_Makkah_Persecutions.pdf",
            fileSize: "450 KB",
            createdAt: "2024-10-10",
            downloadContent: `SKH SOLUTIONS — CAMBRIDGE O-LEVEL ISLAMIYAT (2058)
FACULTY: SIR KHURRAM HUSSAIN
CHAPTER: MAKKAN PERSECUTION & SOCIO-ECONOMIC EMBARGO

1. BACKGROUND OF OPPOSITION:
- When the Prophet (PBUH) climbed Mount Safa to declare the message openly, Abu Lahab shouted: "May you perish! Is this why you assembled us?"
- Motives for Quraish opposition: religious tradition, economic fear (revenue from 360 idols in Kaaba), and socio-political hierarchy.

2. TARGETED PERSECUTION:
- Slaves and underprivileged Muslims faced brutal torture:
  * Hazrat Bilal (RA): dragged over scorching desert sands with heavy rocks on his chest while repeating "Ahad, Ahad" (One, One). Freed by Abu Bakr.
  * Yasir and Sumayya (RA): First martyrs of Islam; Sumayya was martyred by Abu Jahl with a spear.
  * Khabab ibn al-Aratt: forced onto glowing coal embers until his body fat extinguished the fire.

3. THE BOYCOTT AT SHIB ABI TALIB (7th to 10th Year of Nabawi):
- Quraish drew up a pact banning intermarriage, trade, and social contact with Banu Hashim and Banu Muttalib.
- Document hung inside the Kaaba.
- Extreme starvation: Muslims survived on tree leaves and dried leather.
- Ended when termites consumed the parchment except the phrase "Bismika Allahumma" (In Your Name, O Allah).`,
          },
          {
            id: "att-kh-3b",
            type: "homework",
            title: "Topical Questions: Journey to Ta'if & Prayers of the Prophet (PBUH)",
            description: "Analyze the rejection by the leaders of Thaqif (Abd Yalil, Mas'ud, Habib) and the supplication of the Prophet at the orchard.",
            fileName: "SKH_Islamiyat_HW_Taif_Supplication.pdf",
            fileSize: "190 KB",
            dueDate: "2024-10-28",
            createdAt: "2024-10-20",
            downloadContent: `SKH SOLUTIONS — HOMEWORK WORKSHEET
TOPIC: THE MISSION TO TA'IF (619 AD)

1. Outline the events that took place when the Prophet (PBUH) preached in Ta'if. [10]
   - Key points: Accompanied by Zayd ibn Haritha, mocked by tribal chiefs, mob hurled stones causing bloody wounds, refuge in orchard of Utbah and Shaybah.
   - Conversation with Addas the Christian slave.
   - Appearance of Angel Jibreel and Angel of the Mountains, and the Prophet's response of mercy.

2. What example of perseverance does the Prophet's journey to Ta'if set for modern Muslims confronting hardship? [4]`,
          },
          {
            id: "att-kh-3c",
            type: "assignment",
            title: "Graded Term Assignment: Makkan Period Strategic Analysis",
            description: "Comprehensive 25-mark past exam simulation on Makkan persecutions and migration to Abyssinia.",
            fileName: "SKH_Islamiyat_Assignment_02_MakkanPersecution.pdf",
            fileSize: "280 KB",
            dueDate: "2024-10-31",
            maxMarks: 25,
            createdAt: "2024-10-22",
            downloadContent: `SKH SOLUTIONS — GRADED ESSAY ASSIGNMENT
INSTRUCTOR: SIR KHURRAM HUSSAIN
TOTAL MARKS: 25 | SUBMISSION DEADLINE: OCT 31, 2024

QUESTION 1:
(a) Describe the hardships endured by the Prophet (PBUH) and his followers in Makkah between 610 AD and 622 AD. [10]
(b) Explain why the Quraish were so resistant to the teachings of Islam despite recognizing Muhammad's truthfulness. [4]

QUESTION 2:
(a) Detail the reasons for the two migrations to Abyssinia, and the hearing before King Negus (al-Najashi) led by Ja'far ibn Abi Talib. [10]
(b) How did Ja'far's diplomatic conduct serve as an archetype for Muslim engagement in non-Muslim societies today? [4]`,
          },
        ],
      },
      {
        id: "top-kh-4",
        chapterNumber: 4,
        chapterName: "The Life and Importance of the Holy Prophet (PBUH) in Madinah",
        topicName: "Constitution of Madinah, Battle of Badr, Uhud & Treaty of Hudaibiyah",
        estimatedHours: 7.0,
        status: "upcoming",
        completedDate: undefined,
        tutorNotes: "Scheduled to begin in November. Will cover military strategy, tactical treaties, and state governance.",
        attachments: [
          {
            id: "att-kh-4a",
            type: "note",
            title: "Battles of Badr, Uhud & Trench: Strategic Comparisons & Divine Assistance",
            description: "Table of commanders, casualty figures, tactical maneuvers, and Quranic reflections for Paper 1 Question 3.",
            fileName: "SKH_Islamiyat_Handout_Madinah_Battles.pdf",
            fileSize: "390 KB",
            createdAt: "2024-10-24",
            downloadContent: `SKH SOLUTIONS — CAMBRIDGE O-LEVEL ISLAMIYAT
ADVANCE REVISION HANDOUT: BATTLES OF EARLY ISLAM
FACULTY: SIR KHURRAM HUSSAIN

1. BATTLE OF BADR (2 AH / 624 AD):
- Causes: Caravan led by Abu Sufyan; Quraish military expedition led by Abu Jahl (1000 soldiers).
- Muslim force: 313 poorly equipped men, 2 horses, 70 camels.
- Divine Aid: Rain to firm the ground, angels descending (Surah Al-Anfal).
- Outcome: Decisive Muslim victory; Abu Jahl killed; 70 Makkan prisoners treated with unprecedented kindness.

2. BATTLE OF UHUD (3 AH / 625 AD):
- Causes: Quraish vengeance for Badr; 3000 troops led by Abu Sufyan.
- Muslim force: 1000 initially, 300 hypocrites deserted under Abdullah ibn Ubayy.
- Critical Error: 50 archers on Mount Uhud abandoned their post under false assumption of victory; Khalid ibn al-Walid mounted a rear cavalry attack.
- Lessons: Absolute obedience to the Prophet's instructions is paramount.`,
          },
        ],
      },
      {
        id: "top-kh-5",
        chapterNumber: 5,
        chapterName: "The First Islamic Community",
        topicName: "Mothers of the Faithful (Ummahat-ul-Momineen) & Ten Blessed Companions",
        estimatedHours: 5.0,
        status: "upcoming",
        completedDate: undefined,
        tutorNotes: "Biographies of Hazrat Khadija (RA), Hazrat Aisha (RA), and the Ashara Mubashshara.",
        attachments: [
          {
            id: "att-kh-5a",
            type: "note",
            title: "Mothers of the Faithful: Life, Character & Academic Contributions Handout",
            description: "Comparative bios of Hazrat Khadija, Hazrat Aisha, Hazrat Hafsa, and Hazrat Sawdah with relevant hadith citations.",
            fileName: "SKH_Islamiyat_Handout_Mothers_of_Faithful.pdf",
            fileSize: "360 KB",
            createdAt: "2024-10-24",
            downloadContent: `SKH SOLUTIONS — CAMBRIDGE O-LEVEL ISLAMIYAT
REVISION PACK: MOTHERS OF THE FAITHFUL (UMMAHAT-UL-MOMINEEN)
FACULTY: SIR KHURRAM HUSSAIN

1. HAZRAT KHADIJA BINT KHUWAYLID (RA):
- Title: Tahira (The Pure One). First wife of the Prophet (PBUH) for 25 years.
- Supported the Prophet during the first revelation at Cave Hira: "Allah will never disgrace you..."
- Sacrificed her immense wealth in the path of Islam.
- Received greetings of peace from Allah via Angel Jibreel.

2. HAZRAT AISHA BINT ABI BAKR (RA):
- Intellect and Scholarship: Narrated over 2,210 Hadith.
- Expert in Islamic Jurisprudence (Fiqh), medicine, and poetry.
- Incident of Ifk (Slander) and divine vindication in Surah An-Nur.
- Passed away in Madinah in 58 AH and buried in Jannat-ul-Baqi.`,
          },
        ],
      },
    ],
  },

  // ==================== SIR YOUSUF PANWALA (SKH SOLUTIONS) ====================
  {
    id: "syl-skh-math",
    tutorId: "skh-yousuf",
    tutorName: "Sir Yousuf Panwala",
    instituteName: "SKH Solutions",
    courseTitle: "CAIE O Level Mathematics (Syllabus D 4024) — Complete Topical Mastery",
    subject: "Mathematics",
    curriculum: "CAIE O Level",
    batchSchedule: "Tue, Thu, Sat • 5:00 PM – 6:30 PM (SKH Bahadurabad Campus & Online)",
    targetExamDate: "May/June 2025",
    totalTopics: 5,
    completedTopics: 2,
    enrolledStudents: [
      "Faraz Merchant",
      "Bilal Siddiqui",
      "Hamza Shah",
      "Dua Zehra",
    ],
    studentName: "Faraz Merchant (and enrolled batch)",
    topics: [
      {
        id: "top-yp-1",
        chapterNumber: 1,
        chapterName: "Numbers, Standard Form & Bounds",
        topicName: "Upper & Lower Bounds, Error Intervals & Percentage Errors",
        estimatedHours: 4.5,
        status: "completed",
        completedDate: "2024-09-20",
        tutorNotes: "Formula rules for maximum and minimum values in division (UB/LB) and subtraction (UB-LB) fully internalized.",
        homeworkAssigned: "Complete 15 topical past paper questions on bounds.",
        attachments: [
          {
            id: "att-yp-1a",
            type: "note",
            title: "Upper & Lower Bounds: Critical Formulas & Calculation Rules Masterclass",
            description: "Formula summary for bounds in arithmetic operations, geometry perimeters, and vehicle speed conversions.",
            fileName: "SKH_Math_Bounds_Rules_Summary.pdf",
            fileSize: "275 KB",
            createdAt: "2024-09-08",
            downloadContent: `SKH SOLUTIONS — MATHEMATICS (SYLLABUS D 4024)
FACULTY: SIR YOUSUF PANWALA
TOPIC: UPPER & LOWER BOUNDS AND ERROR INTERVALS

1. RULES OF ROUNDING TO BOUNDS:
- Given value x rounded to nearest d:
  Lower Bound (LB) = x - (d / 2)
  Upper Bound (UB) = x + (d / 2)
- Example: 140 m to nearest 10 m -> LB = 135 m, UB = 145 m.

2. ARITHMETIC COMBINATIONS:
- Addition: Maximum (A + B) = UB(A) + UB(B); Minimum (A + B) = LB(A) + LB(B)
- Subtraction: Maximum (A - B) = UB(A) - LB(B); Minimum (A - B) = LB(A) - UB(B)
- Multiplication: Maximum (A * B) = UB(A) * UB(B); Minimum (A * B) = LB(A) * LB(B)
- Division: Maximum (A / B) = UB(A) / LB(B); Minimum (A / B) = LB(A) / UB(B)

3. EXAM PITFALLS:
- When calculating minimum time for a journey: Distance(LB) / Speed(UB).
- Do not round intermediate values; round only at the final step to 3 significant figures.`,
          },
          {
            id: "att-yp-1b",
            type: "homework",
            title: "Worksheet: Upper & Lower Bounds P1 & P2 Past Exam Questions",
            description: "12 multi-step exam questions selected from 2018-2023 Cambridge papers.",
            fileName: "SKH_Math_HW_Bounds_Drill.pdf",
            fileSize: "195 KB",
            dueDate: "2024-09-18",
            createdAt: "2024-09-10",
            downloadContent: `SKH SOLUTIONS — TOPICAL HOMEWORK DRILL
SUBJECT: O-LEVEL MATHEMATICS (4024) | INSTRUCTOR: SIR YOUSUF PANWALA

Q1: The length of a rectangle is 12 cm, correct to the nearest cm. The width is 8 cm, correct to the nearest cm.
    Calculate the lower bound of the perimeter. [2 marks]

Q2: A car travels a distance of 240 km measured to the nearest 10 km in a time of 3 hours measured to the nearest 0.5 hour.
    Calculate the maximum possible average speed in km/h. [3 marks]

Q3: A cylindrical water tank has radius r = 1.4 m (correct to 1 decimal place) and height h = 3.2 m (correct to 1 decimal place).
    Calculate the upper bound for the volume of the tank. [3 marks]`,
          },
        ],
      },
      {
        id: "top-yp-2",
        chapterNumber: 2,
        chapterName: "Algebraic Manipulation & Quadratics",
        topicName: "Completing the Square, Quadratic Formula & Fractional Equations",
        estimatedHours: 5.5,
        status: "completed",
        completedDate: "2024-10-08",
        tutorNotes: "Turning point derivation via completing the square mastered. Strong factorization speed.",
        homeworkAssigned: "Quadratic problem solving worksheet #4.",
        attachments: [
          {
            id: "att-yp-2a",
            type: "note",
            title: "Completing the Square & Vertex Coordinates Formula Guide",
            description: "Techniques for transforming ax^2 + bx + c into a(x - h)^2 + k and reading maximum/minimum coordinates.",
            fileName: "SKH_Math_Notes_Completing_Square.pdf",
            fileSize: "310 KB",
            createdAt: "2024-09-28",
            downloadContent: `SKH SOLUTIONS — O-LEVEL MATHEMATICS (4024)
SPECIALIST HANDOUT: QUADRATICS & COMPLETING THE SQUARE
FACULTY: SIR YOUSUF PANWALA

1. FORMULA:
   x^2 + bx + c = (x + b/2)^2 - (b/2)^2 + c

2. FINDING TURNING POINT:
   For y = (x - p)^2 + q:
   - Minimum value is q, occurring at x = p.
   - Turning point coordinates: (p, q).
   - Axis of symmetry: x = p.

3. COEFFICIENT a != 1:
   2x^2 + 12x + 5 = 2[x^2 + 6x] + 5
   = 2[(x + 3)^2 - 9] + 5
   = 2(x + 3)^2 - 18 + 5
   = 2(x + 3)^2 - 13
   Turning point: (-3, -13) with minimum value -13.`,
          },
          {
            id: "att-yp-2b",
            type: "assignment",
            title: "Graded Assessment: Quadratic Modeling & Algebraic Fractions",
            description: "40-mark Cambridge Paper 2 structured exam simulation. Includes word problems forming quadratic equations.",
            fileName: "SKH_Math_Assignment_Quadratics_Exam.pdf",
            fileSize: "340 KB",
            dueDate: "2024-10-06",
            maxMarks: 40,
            createdAt: "2024-09-30",
            downloadContent: `SKH SOLUTIONS — GRADED MATHEMATICS ASSESSMENT
COURSE: CAIE O LEVEL MATHEMATICS (4024/02)
INSTRUCTOR: SIR YOUSUF PANWALA
TOTAL MARKS: 40 | TIME ALLOWED: 60 MINUTES

QUESTION 1 [6 MARKS]:
Express 3x^2 - 12x + 7 in the form a(x + b)^2 + c.
Hence state the coordinates of the turning point of the curve y = 3x^2 - 12x + 7.

QUESTION 2 [8 MARKS]:
Solve the equation: 4 / (x - 2) - 3 / (x + 1) = 1.
Give your answers correct to 2 decimal places.

QUESTION 3 [12 MARKS]:
A cyclist travels 60 km at an average speed of x km/h.
On the return journey, his average speed is reduced by 3 km/h.
The return journey takes 40 minutes longer.
(a) Write down an expression in terms of x for the time taken for the return journey.
(b) Form an equation in x and show that it reduces to x^2 - 3x - 270 = 0.
(c) Solve the equation and find the time taken for the forward journey.`,
          },
        ],
      },
      {
        id: "top-yp-3",
        chapterNumber: 3,
        chapterName: "Coordinate Geometry & Functions",
        topicName: "Gradient, Midpoint, Perpendicular Bisectors & Inverse Functions",
        estimatedHours: 5.0,
        status: "in_progress",
        completedDate: undefined,
        tutorNotes: "Currently teaching perpendicular bisector equations and composite function domains.",
        homeworkAssigned: "Exercise 7B questions 1-12 from D2 textbook.",
        attachments: [
          {
            id: "att-yp-3a",
            type: "note",
            title: "Coordinate Geometry Master Cheat Sheet: Perpendicular Lines & Bisectors",
            description: "Proof that m1 * m2 = -1 and step-by-step method to formulate the perpendicular bisector between two points.",
            fileName: "SKH_Math_Notes_Coordinate_Geometry.pdf",
            fileSize: "280 KB",
            createdAt: "2024-10-15",
            downloadContent: `SKH SOLUTIONS — MATHEMATICS 4024
COORDINATE GEOMETRY ESSENTIALS
SIR YOUSUF PANWALA

1. LINE PROPERTIES:
- Gradient: m = (y2 - y1) / (x2 - x1)
- Midpoint: M = ((x1 + x2)/2, (y1 + y2)/2)
- Distance: d = sqrt((x2 - x1)^2 + (y2 - y1)^2)
- Parallel lines: m1 = m2
- Perpendicular lines: m1 * m2 = -1  =>  m2 = -1 / m1

2. PERPENDICULAR BISECTOR ALGORITHM:
Step 1: Calculate midpoint M of line segment AB.
Step 2: Calculate gradient m_AB of AB.
Step 3: Calculate perpendicular gradient m_perp = -1 / m_AB.
Step 4: Use point-slope formula y - y1 = m_perp(x - x1) with midpoint coordinates.`,
          },
          {
            id: "att-yp-3b",
            type: "homework",
            title: "Homework Worksheet: Perpendicular Bisectors & Functions Drill",
            description: "Solve 8 past paper questions on perpendicular bisectors and f(g(x)) composite functions.",
            fileName: "SKH_Math_HW_Bisectors_Functions.pdf",
            fileSize: "210 KB",
            dueDate: "2024-10-29",
            createdAt: "2024-10-22",
            downloadContent: `SKH SOLUTIONS — HOMEWORK WORKSHEET
FACULTY: SIR YOUSUF PANWALA

1. The coordinates of A are (-2, 5) and B are (4, -3).
   (a) Find the gradient of line AB. [1]
   (b) Find the equation of the perpendicular bisector of AB. [3]

2. Functions f and g are defined by f(x) = 2x - 3 and g(x) = 5 / (x + 2).
   (a) Find f^-1(7). [2]
   (b) Find the value of x for which gf(x) = 1. [3]`,
          },
        ],
      },
      {
        id: "top-yp-4",
        chapterNumber: 4,
        chapterName: "Trigonometry & Bearings",
        topicName: "Sine & Cosine Rules, Area of Triangle (1/2 ab sin C) & 3D Trigonometry",
        estimatedHours: 6.0,
        status: "upcoming",
        completedDate: undefined,
        tutorNotes: "Scheduled for early November. Will cover 3-figure bearings and angles of elevation in 3D pyramids.",
        attachments: [
          {
            id: "att-yp-4a",
            type: "note",
            title: "Trigonometry & 3D Bearings Illustrated Formula Booklet",
            description: "Complete formula reference for acute/obtuse sine rule ambiguity, cosine rule, and 3-figure bearing angles.",
            fileName: "SKH_Math_Trigonometry_Bearings_Formulae.pdf",
            fileSize: "420 KB",
            createdAt: "2024-10-24",
            downloadContent: `SKH SOLUTIONS — CAMBRIDGE O-LEVEL MATHEMATICS
TOPICAL PACKET: SINE RULE, COSINE RULE & BEARINGS
FACULTY: SIR YOUSUF PANWALA

1. SINE RULE:
   a / sin(A) = b / sin(B) = c / sin(C)
   Use when given: 2 sides and 1 non-included angle, or 2 angles and 1 side.
   *Watch out for ambiguous case when calculating an obtuse angle: sin(180 - theta) = sin(theta).

2. COSINE RULE:
   a^2 = b^2 + c^2 - 2bc*cos(A)
   cos(A) = (b^2 + c^2 - a^2) / (2bc)
   Use when given: 3 sides (SSS) or 2 sides and the included angle (SAS).

3. AREA OF TRIANGLE:
   Area = 1/2 * a * b * sin(C)

4. BEARINGS CONVENTION:
   Always measured:
   1. From the North line.
   2. In a clockwise direction.
   3. Written with 3 figures (e.g., 045 degrees, 280 degrees).`,
          },
        ],
      },
      {
        id: "top-yp-5",
        chapterNumber: 5,
        chapterName: "Matrices & Transformations",
        topicName: "Matrix Multiplication, Determinant, Inverse & Geometric Transformations",
        estimatedHours: 5.0,
        status: "upcoming",
        completedDate: undefined,
        tutorNotes: "Reflection lines, rotations about origin, enlargement with negative scale factor, and shear matrices.",
        attachments: [
          {
            id: "att-yp-5a",
            type: "note",
            title: "2x2 Matrix Transformation Invariants & Standard Transformation Matrices",
            description: "Summary table of matrices for reflection in y = mx, rotation 90/180/270 degrees, and enlargement.",
            fileName: "SKH_Math_Matrix_Transformations_Guide.pdf",
            fileSize: "330 KB",
            createdAt: "2024-10-24",
            downloadContent: `SKH SOLUTIONS — O-LEVEL MATHEMATICS 4024
MATRIX TRANSFORMATIONS GUIDE
SIR YOUSUF PANWALA

1. MATRIX MULTIPLICATION & INVERSE:
   For matrix M = [[a, b], [c, d]]:
   Determinant det(M) = ad - bc.
   If det(M) = 0, matrix is singular (no inverse).
   Inverse M^-1 = 1 / (ad - bc) * [[d, -b], [-c, a]].

2. STANDARD TRANSFORMATION MATRICES:
- Reflection in y-axis: [[-1, 0], [0, 1]]
- Reflection in x-axis: [[1, 0], [0, -1]]
- Reflection in line y = x: [[0, 1], [1, 0]]
- Reflection in line y = -x: [[0, -1], [-1, 0]]
- Rotation 90 degrees anticlockwise about origin: [[0, -1], [1, 0]]
- Rotation 180 degrees about origin: [[-1, 0], [0, -1]]
- Enlargement by scale factor k about origin: [[k, 0], [0, k]]`,
          },
        ],
      },
    ],
  },

  // ==================== SIR BABAR HUSSAIN (SKH SOLUTIONS) ====================
  {
    id: "syl-skh-physics",
    tutorId: "skh-babar",
    tutorName: "Sir Babar Hussain",
    instituteName: "SKH Solutions",
    courseTitle: "CAIE O Level Physics (5054) — Core Mechanics & ATP Masterclass",
    subject: "Physics",
    curriculum: "CAIE O Level",
    batchSchedule: "Mon, Wed, Fri • 6:30 PM – 8:00 PM (SKH Gulshan Campus & Online)",
    targetExamDate: "May/June 2025",
    totalTopics: 5,
    completedTopics: 2,
    enrolledStudents: [
      "Hamza Shah",
      "Rehan Malik",
      "Sana Tariq",
    ],
    studentName: "Hamza Shah (and enrolled batch)",
    topics: [
      {
        id: "top-bh-1",
        chapterNumber: 1,
        chapterName: "Physical Quantities & Measurement Techniques",
        topicName: "Vernier Calipers, Micrometer Screw Gauge & Zero Error Corrections",
        estimatedHours: 3.5,
        status: "completed",
        completedDate: "2024-09-14",
        tutorNotes: "Paper 4 ATP calibration rules practiced. Positive vs negative zero error calculation solid.",
        homeworkAssigned: "Topical ATP worksheet on vernier scales.",
        attachments: [
          {
            id: "att-bh-1a",
            type: "note",
            title: "Vernier & Micrometer Zero Error Corrections Master Sheet",
            description: "Visual diagrams and mathematical formulas for correcting positive/negative zero errors in Paper 4 ATP.",
            fileName: "SKH_Physics_Notes_Zero_Errors.pdf",
            fileSize: "380 KB",
            createdAt: "2024-09-02",
            downloadContent: `SKH SOLUTIONS — CAMBRIDGE O-LEVEL PHYSICS (5054)
HEAD FACULTY: SIR BABAR HUSSAIN
MODULE: MEASUREMENT TECHNIQUES & ATP APPARATUS

1. MICROMETER SCREW GAUGE:
- Precision: 0.01 mm.
- Main scale reading + (Thimble reading * 0.01 mm).
- Zero Error Correction Formula:
  True Reading = Observed Reading - (Zero Error with its sign)
  * Positive zero error (thimble zero is below datum line): Subtract error.
  * Negative zero error (thimble zero is above datum line): Add error.

2. VERNIER CALIPERS:
- Precision: 0.1 mm (or 0.01 cm).
- Main scale + (vernier coincident mark * 0.01 cm).

3. PRECAUTIONS IN EXPERIMENTAL PHYSICS (PAPER 4):
- Avoid parallax error: Look perpendicularly to the scale reading.
- For small diameters (wire): Take readings at different orientations and calculate average.`,
          },
        ],
      },
      {
        id: "top-bh-2",
        chapterNumber: 2,
        chapterName: "Kinematics & Motion Graphs",
        topicName: "Speed-Time Graphs, Acceleration, Terminal Velocity & Freefall",
        estimatedHours: 4.5,
        status: "completed",
        completedDate: "2024-10-02",
        tutorNotes: "Gradient = acceleration; Area under graph = distance travelled. Sky diver drag force equilibrium explained.",
        homeworkAssigned: "Complete 10 past paper velocity-time questions.",
        attachments: [
          {
            id: "att-bh-2a",
            type: "note",
            title: "Kinematics Velocity-Time Graphs & Equations of Motion Summary",
            description: "Derivations for constant acceleration equations and graphical interpretation for Paper 2.",
            fileName: "SKH_Physics_Notes_Kinematics.pdf",
            fileSize: "290 KB",
            createdAt: "2024-09-22",
            downloadContent: `SKH SOLUTIONS — O-LEVEL PHYSICS 5054
FACULTY: SIR BABAR HUSSAIN
KINEMATICS SUMMARY SHEET

1. VELOCITY-TIME (v-t) GRAPHS:
- Gradient = Acceleration (a = dv/dt).
  * Flat horizontal line => a = 0 (constant velocity).
  * Upward linear slope => uniform acceleration.
  * Curve getting steeper => increasing acceleration.
- Area under v-t graph = Total distance travelled.

2. TERMINAL VELOCITY MECHANICS (PARACHUTIST):
- Stage 1: Skydiver steps out: Velocity = 0, Weight >> Air Resistance (R), Acceleration = g (~9.8 m/s^2).
- Stage 2: As speed increases, Air Resistance increases, Resultant Force decreases, Acceleration decreases.
- Stage 3: Air Resistance = Weight => Resultant Force = 0 => Terminal Velocity reached (a = 0).
- Stage 4: Parachute opens: Surface area increases drastically, R >> Weight, rapid deceleration.
- Stage 5: New lower terminal velocity reached for safe landing.`,
          },
          {
            id: "att-bh-2b",
            type: "assignment",
            title: "Mid-Term Examination: Kinematics & Mechanics Structured Paper",
            description: "30-mark past paper examination testing velocity-time graphs, equations of motion, and projectile principles.",
            fileName: "SKH_Physics_Assignment_Kinematics_Exam.pdf",
            fileSize: "310 KB",
            dueDate: "2024-09-30",
            maxMarks: 30,
            createdAt: "2024-09-24",
            downloadContent: `SKH SOLUTIONS — GRADED PHYSICS ASSESSMENT
COURSE: CAIE O LEVEL PHYSICS (5054/02)
INSTRUCTOR: SIR BABAR HUSSAIN
TOTAL MARKS: 30 | TIME ALLOWED: 45 MINUTES

QUESTION 1 [10 MARKS]:
A train accelerates uniformly from rest to 24 m/s in 40 seconds.
It then travels at constant speed for 120 seconds, and finally decelerates uniformly to rest in 30 seconds.
(a) Sketch the speed-time graph for the journey. [3]
(b) Calculate the deceleration of the train during the final 30 seconds. [2]
(c) Calculate the total distance travelled by the train. [3]
(d) Calculate the average speed of the train for the whole journey. [2]

QUESTION 2 [8 MARKS]:
A stone is dropped from a cliff 45 meters high. Air resistance is negligible.
(Take g = 9.8 m/s^2).
(a) Calculate the time taken for the stone to reach the ground. [3]
(b) Calculate the speed with which the stone hits the ground. [3]
(c) State how the presence of significant air resistance would alter your answers. [2]`,
          },
        ],
      },
      {
        id: "top-bh-3",
        chapterNumber: 3,
        chapterName: "Dynamics & Newton's Laws of Motion",
        topicName: "Resultant Force (F = ma), Friction, Momentum & Conservation",
        estimatedHours: 5.0,
        status: "in_progress",
        completedDate: undefined,
        tutorNotes: "Currently teaching impulse and elastic vs inelastic collisions. Students working on momentum conservation problems.",
        homeworkAssigned: "Topical worksheet on momentum collisions.",
        attachments: [
          {
            id: "att-bh-3a",
            type: "note",
            title: "Newton's 3 Laws of Motion & Momentum Conservation Master Guide",
            description: "Vector resolution of forces, F = ma on inclined planes, impulse = change in momentum, and safety features in automobiles.",
            fileName: "SKH_Physics_Notes_Dynamics_Momentum.pdf",
            fileSize: "360 KB",
            createdAt: "2024-10-12",
            downloadContent: `SKH SOLUTIONS — PHYSICS (5054)
HEAD FACULTY: SIR BABAR HUSSAIN
TOPIC: DYNAMICS & MOMENTUM

1. NEWTON'S THREE LAWS OF MOTION:
- First Law: An object remains at rest or continues at constant velocity unless acted upon by a resultant external force.
- Second Law: Resultant Force = mass * acceleration (F = ma) or rate of change of momentum (F = dp/dt).
- Third Law: If body A exerts a force on body B, body B exerts an equal and opposite force on body A (action and reaction are equal in magnitude, opposite in direction, and act on different bodies).

2. MOMENTUM CONSERVATION:
- Linear momentum p = mass * velocity (kg m/s).
- Principle of Conservation of Momentum: In a closed system with no external forces, total momentum before collision = total momentum after collision.
  m1*u1 + m2*u2 = m1*v1 + m2*v2.

3. IMPULSE & SAFETY DESIGN:
- Impulse = Force * time = Change in momentum (m*v - m*u).
- Car safety crumple zones, airbags, and seatbelts increase the collision impact duration (t), thereby reducing the impact force (F = Impulse / t) experienced by passengers.`,
          },
          {
            id: "att-bh-3b",
            type: "homework",
            title: "Homework Worksheet: Momentum Collisions & Car Safety Physics",
            description: "Solve 6 calculation problems on head-on vehicle collisions and calculate impact forces.",
            fileName: "SKH_Physics_HW_Momentum_Collisions.pdf",
            fileSize: "180 KB",
            dueDate: "2024-10-30",
            createdAt: "2024-10-21",
            downloadContent: `SKH SOLUTIONS — HOMEWORK WORKSHEET
FACULTY: SIR BABAR HUSSAIN

Q1: A trolley of mass 2.0 kg travelling at 3.0 m/s collides with a stationary trolley of mass 1.0 kg.
    After collision, the two trolleys stick together.
    (a) Calculate their common velocity after collision. [3]
    (b) Calculate the loss in kinetic energy and explain where this energy went. [3]

Q2: A cricket ball of mass 0.16 kg travelling at 25 m/s is caught by a fielder who brings it to rest in 0.08 s.
    Calculate the average force exerted on the fielder's hands. [3]`,
          },
        ],
      },
      {
        id: "top-bh-4",
        chapterNumber: 4,
        chapterName: "Turning Effect of Forces & Pressure",
        topicName: "Principle of Moments, Centre of Gravity & Hydraulic Pressure Systems",
        estimatedHours: 4.5,
        status: "upcoming",
        completedDate: undefined,
        tutorNotes: "Scheduled for November. Will cover clockwise vs anticlockwise moments and P = rho * g * h.",
        attachments: [
          {
            id: "att-bh-4a",
            type: "note",
            title: "Principle of Moments & Hydraulic Jack Equilibrium Guide",
            description: "Conditions for equilibrium, center of mass stability, and Pascal's principle in hydraulic car lifts.",
            fileName: "SKH_Physics_Handout_Moments_Pressure.pdf",
            fileSize: "320 KB",
            createdAt: "2024-10-24",
            downloadContent: `SKH SOLUTIONS — O-LEVEL PHYSICS 5054
REVISION GUIDE: MOMENTS & LIQUID PRESSURE
SIR BABAR HUSSAIN

1. CONDITIONS FOR COMPLETE EQUILIBRIUM:
Condition 1: Resultant force in any direction must be zero (Sum of upward forces = Sum of downward forces).
Condition 2: Resultant turning effect must be zero (Sum of clockwise moments about any pivot = Sum of anticlockwise moments about that same pivot).

2. MOMENT FORMULA:
Moment = Force * perpendicular distance from the line of action of force to pivot (N m).

3. HYDRAULIC PRESSURE (PASCAL'S LAW):
- Pressure applied to an enclosed incompressible liquid is transmitted equally in all directions.
- P1 = P2  =>  F1 / A1 = F2 / A2.
- Since A2 >> A1, output force F2 is multiplied, enabling small input effort to lift heavy vehicles.`,
          },
        ],
      },
      {
        id: "top-bh-5",
        chapterNumber: 5,
        chapterName: "Thermal Physics & Kinetic Theory",
        topicName: "Kinetic Molecular Model, Gas Laws (Boyle's Law) & Specific Heat Capacity",
        estimatedHours: 5.0,
        status: "upcoming",
        completedDate: undefined,
        tutorNotes: "Brownian motion, microscopic explanation of pressure, and thermal equilibrium.",
        attachments: [
          {
            id: "att-bh-5a",
            type: "note",
            title: "Kinetic Molecular Theory & Gas Laws Formula Summary",
            description: "Derivation of Boyle's Law P1V1 = P2V2 and energy exchange formulas Q = mc(dT) and Q = mL.",
            fileName: "SKH_Physics_Handout_GasLaws_Thermal.pdf",
            fileSize: "340 KB",
            createdAt: "2024-10-24",
            downloadContent: `SKH SOLUTIONS — O-LEVEL PHYSICS
THERMAL PROPERTIES OF MATTER
SIR BABAR HUSSAIN

1. BROWNIAN MOTION:
- Smoke particles suspended in air observe continuous random zigzag movement.
- Evidence for the kinetic model: Fast-moving invisible air molecules bombard smoke particles unevenly from all directions.

2. BOYLE'S LAW:
- For a fixed mass of gas at constant temperature, pressure is inversely proportional to volume:
  P1 * V1 = P2 * V2.
- Microscopic reason: Halving the volume doubles the number of particle collisions with the container walls per second, doubling pressure.

3. SPECIFIC HEAT CAPACITY:
- Thermal energy Q = m * c * delta_T.
- c is specific heat capacity in J / (kg * degrees C).`,
          },
        ],
      },
    ],
  },
];
