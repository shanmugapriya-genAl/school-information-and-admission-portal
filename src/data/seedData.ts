/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { School, SchoolReview } from '../types';

export const SEED_SCHOOLS: School[] = [
  {
    id: 'school-1',
    name: 'Maple Valley International School',
    boardOfEducation: 'IB',
    standardsAvailable: ['Kindergarten', 'Primary (Grade 1-5)', 'Middle (Grade 6-8)', 'High School (Grade 9-10)', 'Higher Secondary (Grade 11-12)'],
    locationSummary: 'North Hills, Seattle',
    academicCalendar: [
      { title: 'Term 1 Commences', date: '2026-09-01', type: 'term_start_end', description: 'Academic year kick-off' },
      { title: 'Annual Sports Meet', date: '2026-10-15', type: 'event', description: 'Track & field events for all grades' },
      { title: 'Winter Vacation', date: '2026-12-20', type: 'holiday', description: 'School closed for winter recess' },
      { title: 'Mid-Term Examinations', date: '2027-01-12', type: 'exam', description: 'Evaluation examinations' },
      { title: 'Science Exhibition', date: '2027-02-22', type: 'event', description: 'Students project showcases' }
    ],
    contactInfo: {
      email: 'info@maplevalley.edu',
      phone: '+1 (206) 555-0143',
      website: 'www.maplevalleyschool.edu',
      address: '742 Commerce St, North Hills',
      city: 'Seattle',
      state: 'WA'
    },
    extracurricularActivities: ['Robotics', 'Violin Club', 'Swimming Pool', 'Interactive Theatre', 'Debate Team', 'Chess Squad'],
    feeStructure: [
      { gradeRange: 'Kindergarten', tuitionFee: 65000, admissionFee: 15000, otherFees: 5000 },
      { gradeRange: 'Primary (Grade 1-5)', tuitionFee: 85000, admissionFee: 20000, otherFees: 7000 },
      { gradeRange: 'Middle (Grade 6-8)', tuitionFee: 95000, admissionFee: 20000, otherFees: 8000 },
      { gradeRange: 'High School (Grade 9-12)', tuitionFee: 120000, admissionFee: 25000, otherFees: 10000 }
    ],
    busFacilities: {
      available: true,
      busFee: 180,
      routes: ['Downtown Route', 'Seattle East Terminal', 'Bellevue Link', 'North Hills Circle'],
      safetyFeatures: ['GPS Realtime Tracking', 'First Aid Kit', 'Trained Female Attendant', 'Speed Limit Governor']
    },
    admissionStartDate: '2026-06-01',
    admissionEndDate: '2026-08-15',
    admissionInstructions: 'Please upload the candidate\'s birth certificate, current passport-sized photo, and latest report card. Applications will be followed by an interactive round with parents.',
    imageUrl: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    
    // Physical Facilities & Enrichments for Maple Valley (school-1)
    staffCount: 42,
    classroomCount: 22,
    academicAchievements: {
      overallAnalysis: "Maple Valley has consistently produced excellent academic results in the IB Diploma Program, with a 100% pass rate in the 2025 examinations and an average score of 38 points (well above the global average of 30).",
      tenthToppers: [
        { name: "Aarav Mehta", score: "43/45 IB Points", rank: 1, badge: "Governor's Excellence Scholar" },
        { name: "Sanya Al-Sayed", score: "42/45 IB Points", rank: 2, badge: "Global Perspectives Honors" }
      ],
      twelfthToppers: [
        { name: "Michael Zhang", score: "45/45 Perfect Score", rank: 1, badge: "Ivy League Direct Fellow" },
        { name: "Emily Watson", score: "44/45 IB Points", rank: 2, badge: "Stanford Centennial Prize" }
      ]
    },
    sportsAchievements: [
      { title: "State Inter-School Athletics Championship", event: "Under-17 Track and Field Meet", year: "2025", rankOrStatus: "Winner (Gold Medal)", description: "Maple Valley won the overall trophy, breaking the 4x100m relay district record with a time of 42.1 seconds." },
      { title: "Pacific Northwest Junior Chess Cup", event: "Youth Boys & Girls Open", year: "2026", rankOrStatus: "First Runner-Up", description: "Silver trophy in standard time format against 32 regional schools and academies." }
    ],
    detailedBusRoutes: [
      {
        routeName: 'Downtown Route',
        stops: [
          { name: 'Metropolitan Public Library Main Stop', time: '07:15 AM / 03:45 PM', address: '1000 4th Ave, Seattle' },
          { name: 'Columbia Sky Tower Plaza stop', time: '07:30 AM / 04:00 PM', address: '701 5th Ave, Seattle' },
          { name: 'Pioneer Square Station Exit B', time: '07:45 AM / 04:15 PM', address: 'James St & 3rd Ave, Seattle' }
        ]
      },
      {
        routeName: 'Seattle East Terminal',
        stops: [
          { name: 'Capitol Hill Light Rail Link stop', time: '07:05 AM / 03:30 PM', address: 'Broadway & E Denny Way' },
          { name: 'Washington Park Arboretum Crossing', time: '07:25 AM / 03:50 PM', address: '2300 Arboretum Dr E' }
        ]
      }
    ],
    standardCurriculums: [
      {
        standardName: 'Kindergarten',
        mandatorySubjects: ['Phonics & Basic Literacy', 'Sensory Numeracy & Math Play', 'Interactive Storytelling', 'Drawing & Fine Motor Art', 'Socio-Emotional Play'],
        electiveSubjects: ['Introduction to French Reading', 'Basic Violin String Touch'],
        coCurricularActivities: [
          { name: 'Mini Gymnastics Class', fee: 150 },
          { name: 'Creative Clay Play', fee: 80 }
        ]
      },
      {
        standardName: 'Primary (Grade 1-5)',
        mandatorySubjects: ['English Language Arts', 'Mathematics & Logic Labs', 'Primary Sciences', 'Social Studies & Geography', 'Visual Arts'],
        electiveSubjects: ['Spanish (Beginner)', 'French (Beginner)', 'Classical Violin Performance'],
        coCurricularActivities: [
          { name: 'Robotics Foundation Club', fee: 250 },
          { name: 'Junior Swimming League', fee: 180 }
        ]
      },
      {
        standardName: 'Middle (Grade 6-8)',
        mandatorySubjects: ['Middle Years English', 'Integrated Mathematics', 'Physics & Chemistry Basics', 'Life Sciences (Biology)', 'Global Histories', 'Creative Writing'],
        electiveSubjects: ['Introductory Coding', 'Advanced French', 'Studio Painting & Ceramic Art'],
        coCurricularActivities: [
          { name: 'Interscholastic Debate Prep', fee: 120 },
          { name: 'Theatre & Speech Troupe', fee: 200 }
        ]
      },
      {
        standardName: 'High School (Grade 9-10)',
        mandatorySubjects: ['Analytical Literature', 'Pre-Calculus & Trigonometry', 'Anatomy & Environmental Science', 'World Economics', 'Digital Civics'],
        electiveSubjects: ['Java Programming Essentials', 'German Level 2', 'Advanced Orchestra'],
        coCurricularActivities: [
          { name: 'VEX Competitive Robotics', fee: 350 },
          { name: 'Advanced Swim Club', fee: 220 }
        ]
      },
      {
        standardName: 'Higher Secondary (Grade 11-12)',
        mandatorySubjects: ['IB English A Literature', 'IB Mathematics (Analysis & Approaches)', 'IB Physics (HL)', 'IB Chemistry (HL)', 'Theory of Knowledge'],
        electiveSubjects: ['IB Computer Science', 'IB Business Management', 'IB Visual Arts HL'],
        coCurricularActivities: [
          { name: 'Model United Nations Leadership', fee: 250 },
          { name: 'Competitive Chess Tournament', fee: 100 }
        ]
      }
    ]
  },
  {
    id: 'school-2',
    name: 'St. Mary\'s Convent High School',
    boardOfEducation: 'ICSE',
    standardsAvailable: ['Nursery', 'Kindergarten', 'Primary (Grade 1-5)', 'Middle (Grade 6-8)', 'High School (Grade 9-10)'],
    locationSummary: 'Richmond Road, Bangalore',
    academicCalendar: [
      { title: 'Schools Reopen', date: '2026-06-01', type: 'term_start_end', description: 'Beginning of the session' },
      { title: 'Founder\'s Day Celebration', date: '2026-07-24', type: 'event', description: 'Holy mass and cultural performance' },
      { title: 'Dussera Holidays', date: '2026-10-10', type: 'holiday', description: 'Autumn festive break' },
      { title: 'Half Yearly Exams', date: '2026-11-05', type: 'exam', description: 'Halfway scholastic review' },
      { title: 'Christmas Carnival & Play', date: '2026-12-23', type: 'event', description: 'Charity bake sale and drama play' }
    ],
    contactInfo: {
      email: 'admissions@stmarysrichmond.org',
      phone: '+91 80 2235 4402',
      website: 'www.stmarysrichmond.org',
      address: '12 Convent Lane, Richmond Road',
      city: 'Bangalore',
      state: 'Karnataka'
    },
    extracurricularActivities: ['Classical Dance', 'Elocution Society', 'Girls Guide & Scouts', 'Basketball', 'School Brass Band', 'Gardening'],
    feeStructure: [
      { gradeRange: 'Nursery & Kindergarten', tuitionFee: 32000, admissionFee: 5000, otherFees: 3000 },
      { gradeRange: 'Primary (Grade 1-5)', tuitionFee: 45000, admissionFee: 7500, otherFees: 4500 },
      { gradeRange: 'Middle & High (Grade 6-10)', tuitionFee: 58000, admissionFee: 10000, otherFees: 5000 }
    ],
    busFacilities: {
      available: true,
      busFee: 80,
      routes: ['MG Road/Brigade Rd', 'Indiranagar Main', 'Koramangala Block 3', 'Frazer Town Cross'],
      safetyFeatures: ['RFID Card Attendance Tracking', 'Seat Belts', 'Trained Female Guard']
    },
    admissionStartDate: '2026-03-01',
    admissionEndDate: '2026-06-30',
    admissionInstructions: 'Register online, verify documents at the corporate office within school premises, and collect admission slip after deposit clearance.',
    imageUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    
    // Elements for School 2
    staffCount: 56,
    classroomCount: 30,
    academicAchievements: {
      overallAnalysis: "In the 2025 ICSE Class 10 Board Examinations, St. Mary's Convent achieved an overall average score of 91.2%, with 28 students scoring over 95% total marks.",
      tenthToppers: [
        { name: "Priyanka Deshpande", score: "99.2% Marks", rank: 1, badge: "National Merit Topper" },
        { name: "Meera Subramanian", score: "98.4% Marks", rank: 2, badge: "Distinguished Arts Scholar" }
      ]
    },
    sportsAchievements: [
      { title: "All-India Anglo-Indian Basketball Meet", event: "Under-16 Girls Basketball League", year: "2025", rankOrStatus: "Champions (Gold Medal)", description: "The school team defeated Bangalore United Convent in the finals 48-35." },
      { title: "State Youth Classical Dance Fest", event: "Bharatanatyam Group Category", year: "2026", rankOrStatus: "First Place Trophy", description: "Secured first rank among 40 participating schools for outstanding presentation and coordination." }
    ],
    detailedBusRoutes: [
      {
        routeName: 'MG Road/Brigade Rd',
        stops: [
          { name: 'Kanthi Sweets Circle point', time: '07:30 AM / 02:45 PM', address: 'MG Road Metro Station Area' },
          { name: 'Cauvery Emporium Crossing stop', time: '07:45 AM / 03:00 PM', address: 'Brigade Road Junction' }
        ]
      },
      {
        routeName: 'Indiranagar Main',
        stops: [
          { name: 'Eshwara Temple Junction stop', time: '07:15 AM / 03:15 PM', address: 'Indiranagar 80 Feet Road' },
          { name: 'Domlur Flyover Canopy stop', time: '07:35 AM / 03:30 PM', address: 'Old Airport Road Extension' }
        ]
      }
    ],
    standardCurriculums: [
      {
        standardName: 'Nursery',
        mandatorySubjects: ['Interactive Speech Patterns', 'Motor Activity play', 'Nursery Rhymes & Choir', 'Elementary Clay arts'],
        electiveSubjects: [],
        coCurricularActivities: [
          { name: 'Toddler Yoga sessions', fee: 30 }
        ]
      },
      {
        standardName: 'Primary (Grade 1-5)',
        mandatorySubjects: ['English Literature Phase 1', 'Arithmetic Logic', 'Environmental Science', 'Sanskrit/Kannada Language Grade 1', 'Visual Arts & Drawing'],
        electiveSubjects: ['Classical Vocal Training'],
        coCurricularActivities: [
          { name: 'Gardening & Ecology club', fee: 40 },
          { name: 'Abacus Speed Math Club', fee: 60 }
        ]
      },
      {
        standardName: 'High School (Grade 9-10)',
        mandatorySubjects: ['ICSE English Language & Literature', 'Mathematics (Algebra & Geometry)', 'Physics (Theory & Practical)', 'Chemistry & Biology', 'History, Civics & Geography'],
        electiveSubjects: ['Commercial Applications', 'Computer Applications in Java', 'Environmental Economics'],
        coCurricularActivities: [
          { name: 'Elocution & Oratory Alliance', fee: 50 },
          { name: 'Convent Girls Scouts Track', fee: 70 }
        ]
      }
    ]
  },
  {
    id: 'school-3',
    name: 'Greenwood Public School',
    boardOfEducation: 'CBSE',
    standardsAvailable: ['Kindergarten', 'Primary (Grade 1-5)', 'Middle (Grade 6-8)', 'High School (Grade 9-10)', 'Higher Secondary (Grade 11-12)'],
    locationSummary: 'Sector 56, Gurgaon',
    academicCalendar: [
      { title: 'Academic Session Commences', date: '2026-04-05', type: 'term_start_end', description: 'Curriculum start date' },
      { title: 'Summer Recess Begins', date: '2026-05-15', type: 'holiday', description: 'School closed for heat holidays' },
      { title: 'Inter-School Debate Championship', date: '2026-08-11', type: 'event', description: 'Hosting standard inter-school debate' },
      { title: 'Term 1 Examinations', date: '2026-09-20', type: 'exam', description: 'Summative Assessment 1' },
      { title: 'Annual Day Celebrations', date: '2026-11-14', type: 'event', description: 'Children\'s day cultural extravaganza' }
    ],
    contactInfo: {
      email: 'helpdesk@greenwoodgurgaon.ac.in',
      phone: '+91 124 4920400',
      website: 'www.greenwoodgurgaon.edu.in',
      address: 'Plot No 5, Sector 56 near Golf Course Rd Extension',
      city: 'Delhi NCR',
      state: 'Haryana'
    },
    extracurricularActivities: ['Aero-Modeling', 'Skating Academy', 'Vocal Hindustani Music', 'Table Tennis Team', 'Hindi Debate Club', 'Yoga & Meditation'],
    feeStructure: [
      { gradeRange: 'Kindergarten', tuitionFee: 48000, admissionFee: 12000, otherFees: 4000 },
      { gradeRange: 'Primary (Grade 1-5)', tuitionFee: 62000, admissionFee: 15000, otherFees: 5000 },
      { gradeRange: 'Middle & Senior (Grade 6-12)', tuitionFee: 78000, admissionFee: 18000, otherFees: 6000 }
    ],
    busFacilities: {
      available: true,
      busFee: 110,
      routes: ['Sector 56-57 Loop', 'Sohna Road', 'DLF Phase 1-5 Link', 'Sushant Lok Crossings'],
      safetyFeatures: ['GPS Tracking with Android SMS alert', 'Speed Governor (40km/h max)', 'CCTV Cameras on board']
    },
    admissionStartDate: '2026-05-01',
    admissionEndDate: '2026-07-31',
    admissionInstructions: 'Complete the student application entry profile and submit along with valid Residence Proof, Parents Aadhar Cards, and previous Marksheets.',
    imageUrl: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    
    // Elements for School 3
    staffCount: 82,
    classroomCount: 45,
    academicAchievements: {
      overallAnalysis: "Greenwood won the Outstanding District Scholastic Trophy for high-achieving math teams. Our students secured consecutive ranks in CBSE Class 12 Science with an outstanding 100% pass mark.",
      tenthToppers: [
        { name: "Siddharth Goel", score: "496/500 Marks", rank: 1, badge: "District Rank 1" },
        { name: "Kavita Rathi", score: "492/500 Marks", rank: 2, badge: "National Talent Search Scholar" }
      ],
      twelfthToppers: [
        { name: "Tushar Singhania", score: "99.4% (PCM)", rank: 1, badge: "IIT JEE Advanced Scholar" },
        { name: "Aishwarya Sen", score: "98.8% (Commerce)", rank: 2, badge: "National Commerce Topper" }
      ]
    },
    sportsAchievements: [
      { title: "National CBSE Roller Skating Championship", event: "1000m Rink Speed Relay", year: "2025", rankOrStatus: "Gold Winners", description: "Our academy skaters dominated the race, breaking our own regional timing bracket by 2 seconds." },
      { title: "Haryana Inter-Academy Table Tennis League", event: "Under-19 Single Boys", year: "2026", rankOrStatus: "Champions Trophy", description: "A top-ranked junior national level athlete represented the academy to win the state athletic merit shield." }
    ],
    detailedBusRoutes: [
      {
        routeName: 'Sector 56-57 Loop',
        stops: [
          { name: 'HDFC Bank Sector 56 Corner stop', time: '07:40 AM / 02:40 PM', address: 'Sector 56 Circular Lane' },
          { name: 'Jalvayu Towers Gate 2 stop', time: '07:55 AM / 02:55 PM', address: 'Sector 57 Commercial Complex' }
        ]
      },
      {
        routeName: 'Sohna Road',
        stops: [
          { name: 'Omaxe City Centre Mall Plaza stop', time: '07:20 AM / 03:20 PM', address: 'Sohna Road Service Lane' },
          { name: 'Vatika City Chowk Subway stop', time: '07:35 AM / 03:35 PM', address: 'Badshahpur Xing' }
        ]
      }
    ],
    standardCurriculums: [
      {
        standardName: 'Kindergarten',
        mandatorySubjects: ['Interactive Alphabets', 'Nursery Arithmetic Play', 'Rhyming Chorus', 'Free Activity Coloring Program'],
        electiveSubjects: [],
        coCurricularActivities: [
          { name: 'Eurythmics Rhythm Dance', fee: 35 }
        ]
      },
      {
        standardName: 'Primary (Grade 1-5)',
        mandatorySubjects: ['English Literature/Grammar', 'Core Mathematics Practice', 'Environmental Studies', 'Vocal Music Fundamentals', 'Hindi Devnagari Level 1'],
        electiveSubjects: ['Sanskrit Level 1'],
        coCurricularActivities: [
          { name: 'Skating Academy coaching', fee: 100 },
          { name: 'Yoga & Pranayama Foundations', fee: 50 }
        ]
      },
      {
        standardName: 'Middle (Grade 6-8)',
        mandatorySubjects: ['English Grammar & Literature', 'Mathematics (Algebra/Rational Numbers)', 'General Sciences (Physics/Chem/Bio)', 'Social Science Chronicles', 'Sanskrit/French Level 2'],
        electiveSubjects: ['Introduction to AI Tools', 'Vocal Classical Music'],
        coCurricularActivities: [
          { name: 'Aero-Modeling Model Rocketry', fee: 150 },
          { name: 'Table Tennis Indoor coaching', fee: 80 }
        ]
      }
    ]
  },
  {
    id: 'school-4',
    name: 'Beacon Hill Academy',
    boardOfEducation: 'State Board',
    standardsAvailable: ['Primary (Grade 1-5)', 'Middle (Grade 6-8)', 'High School (Grade 9-10)'],
    locationSummary: 'Capitol District, Sacramento',
    academicCalendar: [
      { title: 'Fall Standard Term Begins', date: '2026-08-25', type: 'term_start_end', description: 'Classes begin' },
      { title: 'Thanksgiving Holiday Break', date: '2026-11-23', type: 'holiday', description: 'Autumn short recess' },
      { title: 'Standard District Level Athletics', date: '2027-01-18', type: 'event', description: 'Participating in state athletic relays' },
      { title: 'Final Exams Evaluation', date: '2027-05-10', type: 'exam', description: 'District curated testing period' }
    ],
    contactInfo: {
      email: 'admissions@beaconacademy.state.ca.us',
      phone: '+1 (916) 555-4033',
      website: 'www.beaconhillsacramento.edu',
      address: '390 Pioneer Dr, Capitol District',
      city: 'Sacramento',
      state: 'CA'
    },
    extracurricularActivities: ['Softball League', 'Eco-Warriors Club', 'Marching Band Corner', 'Woodworking Class'],
    feeStructure: [
      { gradeRange: 'Primary (Grade 1-5)', tuitionFee: 18000, admissionFee: 2000, otherFees: 1500 },
      { gradeRange: 'Middle & Senior (Grade 6-10)', tuitionFee: 25000, admissionFee: 3000, otherFees: 2000 }
    ],
    busFacilities: {
      available: false,
      busFee: 0,
      routes: [],
      safetyFeatures: []
    },
    admissionStartDate: '2026-06-15',
    admissionEndDate: '2026-09-01',
    admissionInstructions: 'Standard Board admissions process of residency proof certificate and prior immunization logs. Direct enrollment slot confirmation upon office visit.',
    imageUrl: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    
    // Elements for School 4
    staffCount: 22,
    classroomCount: 15,
    academicAchievements: {
      overallAnalysis: "Beacon Hill proudly has a 100% High School graduation rate with outstanding records in civic leadership development and public administration research.",
      tenthToppers: [
        { name: "John Miller", score: "GPA 3.96/4.0", rank: 1, badge: "Sacramento Academic Honors" },
        { name: "Sarah Connor", score: "GPA 3.90/4.0", rank: 2, badge: "Civic Youth Envoy Badge" }
      ]
    },
    sportsAchievements: [
      { title: "Sacramento District High School Softball Tournament", event: "County Girls Softball League", year: "2025", rankOrStatus: "Runner-Up Trophy", description: "Our softball defense team reached the state-level finals, securing the regional sportsmanship award." }
    ],
    detailedBusRoutes: [],
    standardCurriculums: [
      {
        standardName: 'Primary (Grade 1-5)',
        mandatorySubjects: ['Grade Reading Comprehension', 'Primary Math Principles', 'American Social Studies', 'Basic Physical Education'],
        electiveSubjects: ['Spanish Immersion', 'Nature Craft'],
        coCurricularActivities: [
          { name: 'Eco-Warriors Gardening Club', fee: 20 },
          { name: 'Intro Woodworking Class', fee: 35 }
        ]
      }
    ]
  },
  {
    id: 'school-5',
    name: 'Pinnacle High Academy',
    boardOfEducation: 'IGCSE',
    standardsAvailable: ['Primary (Grade 1-5)', 'Middle (Grade 6-8)', 'High School (Grade 9-10)', 'Higher Secondary (Grade 11-12)'],
    locationSummary: 'Bandra West, Mumbai',
    academicCalendar: [
      { title: 'Cambridge Autumn Term Starts', date: '2026-09-02', type: 'term_start_end', description: 'Cambridge program inauguration' },
      { title: 'Diwali Festive recess', date: '2026-11-06', type: 'holiday', description: 'School closed' },
      { title: 'Model United Nations Summit', date: '2026-12-14', type: 'event', description: 'Global student delegate assembly' },
      { title: 'IGCSE Mock Board Exams', date: '2027-02-18', type: 'exam', description: 'Rigorous mocks preparation series' }
    ],
    contactInfo: {
      email: 'admin@pinnacleacademy.in',
      phone: '+91 22 49301032',
      website: 'www.pinnacleacademy.in',
      address: '5a Carter Road, Promenade West, Bandra',
      city: 'Mumbai',
      state: 'Maharashtra'
    },
    extracurricularActivities: ['Sailing Club', 'French Theatre Workshop', 'Coding & App Development', 'Jazz Drumming Combo', 'Tennis Court Practice'],
    feeStructure: [
      { gradeRange: 'Primary (Grade 1-5)', tuitionFee: 110000, admissionFee: 30000, otherFees: 12000 },
      { gradeRange: 'Middle (Grade 6-8)', tuitionFee: 140000, admissionFee: 35000, otherFees: 15000 },
      { gradeRange: 'Cambridge IGCSE & A-Levels', tuitionFee: 185000, admissionFee: 40000, otherFees: 20000 }
    ],
    busFacilities: {
      available: true,
      busFee: 220,
      routes: ['Carter Rd Corridor', 'Worli Sea Link Circle', 'Juhu Vile Parle Loop', 'Santa Cruz East Metro Station'],
      safetyFeatures: ['Fully Air-conditioned coaches', 'Dual Attendants with high verification', '3-point passenger buckles']
    },
    admissionStartDate: '2026-04-01',
    admissionEndDate: '2026-07-15',
    admissionInstructions: 'Candidates must take a basic diagnostics assessment in Mathematics and English, followed by an interview evaluation with the head of school.',
    imageUrl: 'https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    
    // Elements for School 5
    staffCount: 65,
    classroomCount: 28,
    academicAchievements: {
      overallAnalysis: "Pinnacle Academy has recorded consecutive 100% A* scores in IGCSE Mathematics and Sciences. Over 80% of our graduates transition seamlessly into overseas Ivy League Universities and Russell Group Colleges.",
      tenthToppers: [
        { name: "Devansh Singhal", score: "7 A* Grades", rank: 1, badge: "Cambridge Top in World Nominee" },
        { name: "Nisha Varma", score: "6 A* Grades", rank: 2, badge: "Outstanding Cambridge Scholar" }
      ],
      twelfthToppers: [
        { name: "Armaan Malhotra", score: "4 A* at A-Levels", rank: 1, badge: "Oxford University Admit" },
        { name: "Rhea Khurana", score: "4 A* at A-Levels", rank: 2, badge: "MIT Physics Fellowship" }
      ]
    },
    sportsAchievements: [
      { title: "Maharashtra State Sailing & Regatta Meet", event: "Youth Laser Radial Class sailing", year: "2025", rankOrStatus: "Gold Medal Trophy", description: "Our sailing crew swept the podium finishes this year, establishing a record cruise speed." },
      { title: "Western India Interschool Tennis Open", event: "Under-19 Boys Singles", year: "2026", rankOrStatus: "Champion Cup", description: "Defeated Cathedral and John Connon School in three straight sets 6-2, 6-4, 6-3." }
    ],
    detailedBusRoutes: [
      {
        routeName: 'Carter Rd Corridor',
        stops: [
          { name: 'Bandra Bandstand Amphitheatre stop', time: '07:10 AM / 03:00 PM', address: 'Bandstand Promenade Rd' },
          { name: 'Otters Club Entrance stop', time: '07:25 AM / 03:15 PM', address: 'Carter Road Sea Side' }
        ]
      },
      {
        routeName: 'Worli Sea Link Circle',
        stops: [
          { name: 'Worli Sea Face Dairy Crossing stop', time: '06:50 AM / 03:40 PM', address: 'Worli Promenade Lane' },
          { name: 'Bandra Reclamation Slipway stop', time: '07:05 AM / 03:30 PM', address: 'Bandra West Reclamation Roundabout' }
        ]
      }
    ],
    standardCurriculums: [
      {
        standardName: 'Primary (Grade 1-5)',
        mandatorySubjects: ['Cambridge Primary English', 'Primary Mathematics Core', 'Primary General Sciences', 'Geography & Social Formations'],
        electiveSubjects: ['Oral French Reading', 'Basic Tabla Ensemble'],
        coCurricularActivities: [
          { name: 'Introductory App Coding Class', fee: 160 },
          { name: 'Bandra Junior Tennis Camp', fee: 200 }
        ]
      },
      {
        standardName: 'Middle (Grade 6-8)',
        mandatorySubjects: ['Cambridge English checkpoint', 'Cambridge Mathematics checkpoint', 'Integrated Physics, Chem, Bio', 'Global Perspectives', 'Second Intensive Foreign Language (French/German)'],
        electiveSubjects: ['Python Graphics Programming', 'Western Jazz Snare Drumming'],
        coCurricularActivities: [
          { name: 'Sea Cadet Sailing Club subscription', fee: 300 },
          { name: 'French Theatre drama play workshop', fee: 180 }
        ]
      }
    ]
  }
];

export const INITIAL_REVIEWS: SchoolReview[] = [
  {
    id: 'rev-1',
    schoolId: 'school-1',
    userId: 'parent-1',
    userName: 'Jessica Martinez',
    rating: 5,
    comment: 'Maple Valley is absolutely spectacular. Our son enrolled in the primary grade last year and has thrived, especially in the Violin Club and swimming program.',
    experienceType: 'enrolled',
    createdDate: '2026-05-10'
  },
  {
    id: 'rev-2',
    schoolId: 'school-1',
    userId: 'parent-2',
    userName: 'Daniel Kim',
    rating: 4,
    comment: 'We visited the campus during their science exhibition open house. The teachers were extremely warm and the infrastructure is top-notch.',
    experienceType: 'visited',
    createdDate: '2026-06-02'
  },
  {
    id: 'rev-3',
    schoolId: 'school-2',
    userId: 'parent-3',
    userName: 'Anjali Sharma',
    rating: 4,
    comment: 'St. Mary\'s Convent holds traditional values dear while balancing great results. The discipline and music classes are exceptional.',
    experienceType: 'enrolled',
    createdDate: '2026-04-12'
  },
  {
    id: 'rev-4',
    schoolId: 'school-3',
    userId: 'parent shadow-sm',
    userName: 'Rajesh Patel',
    rating: 5,
    comment: 'High standards of CBSE education. The skating academy is world class, and they have excellent speed limit governors on safety buses which makes us feel safe.',
    experienceType: 'enrolled',
    createdDate: '2026-05-20'
  },
  {
    id: 'rev-5',
    schoolId: 'school-4',
    userId: 'parent-5',
    userName: 'Emily Cooper',
    rating: 3,
    comment: 'Reasonable fee structure and broad athletic options. However, they do not offer school bus facilities which is difficult for working parents.',
    experienceType: 'visited',
    createdDate: '2026-06-08'
  },
  {
    id: 'rev-6',
    schoolId: 'school-5',
    userId: 'parent-6',
    userName: 'Sophia Laurent',
    rating: 5,
    comment: 'Fantastic international atmosphere. The school is right next to the sea, and sailing and coding classes have been absolute game-changers for our daughter.',
    experienceType: 'enrolled',
    createdDate: '2026-05-30'
  }
];

