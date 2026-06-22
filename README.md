# 🏫 CampusBridge: Collaborative School Registry & Admissions Portal

CampusBridge is a full-featured, interactive, and highly stylized directory platform designed to bridge the gap between parents seeking verified educational institutions and school administrators coordinating school listings, curriculums, events, transport sectors, and the admission enrollment pipeline. Designed with a hand-drawn "sketchy/chalkboard" aesthetic, it leverages clean typography, vibrant dynamic color themes, and engaging micro-interactions.

---


## 🔁 Complete Platform Workflow Diagram

The system coordinates the actions of two distinct roles: **Parents** looking for schools and **School Admin Registrars** updating directories.

Below is the Mermaid workflow mapping of parent search pipelines, application submissions, and administrator review processing:
mermaid
graph TD
    %% Base Roles & Auth Entry
    Start([🌐 Enter CampusBridge]) --> ChooseRole{Sign Up or Sign In?}
    ChooseRole -- Parent Role --> ParentDash[🔍 Parents Directory Dashboard]
    ChooseRole -- Admin Role --> AdminDash[🏫 Admin My-School Cabin]

    %% Parent Journey
    ParentDash --> SearchEngine[🔍 Apply Dynamic Search & Filters]
    SearchEngine --> |Filter by Location, Board, Fees, Grade| QueryResults[📂 Filtered School Listings]
    
    QueryResults --> SchoolProfile[🏫 Open Detailed School Board]
    SchoolProfile --> ExploreTab{Explore School Modules}
    
    ExploreTab --> |1. Academic Cohorts| CurriculumModal[📚 Dynamic Curriculum & Activities Overlay]
    ExploreTab --> |2. Student Reviews| SubmitReview[⭐ Submit Star Rating & Review Remarks]
    ExploreTab --> |3. Transport Sectors| BusRouteModal[📍 Timed Bus Stop Transit Timetable]
    ExploreTab --> |4. Core Calendar| SubscribeAlerts[🔔 Follow School & Toggle Milestones alerts]
    
    ExploreTab --> |5. CTA: Admissions| EnrollForm[📝 Complete School Admissions Application]
    EnrollForm --> SubmitApp[📥 Submit Application to Central Local Pipeline]
    
    %% Admin Journey
    AdminDash --> CheckListing{Has School Listing Profile?}
    CheckListing -- No listing yet --> CreateProfile[🎨 Complete Multi-Step School Form]
    CheckListing -- Existing listing --> EditProfile[⚙️ Update Fees, Transport coverage, Academics, Calendar]
    
    CreateProfile & EditProfile --> SaveListing[(💾 Local Database Synchronization)]
    SaveListing --> LiveBrowse[👀 Live on Browser Directory]

    %% Intersection: Admitting processing
    SubmitApp --> |Saves App Record| AppPipeline[(📂 Admissions database)]
    AppPipeline --> AdminInbox[📬 Admin Admissions Inbox Portal]
    
    AdminInbox --> EvaluateApp{Review Documents & Details}
    EvaluateApp --> |Update Status| StatusChange[🔄 Set status: Received | Document Verification | Approved | Waitlisted | Rejected]
    StatusChange --> StateSync[(💾 Sync updated state)]
    
    StateSync --> ParentPortal[👨‍👩‍👧 Parent My Applications Tracker]
    ParentPortal --> LiveStatusCheck{View Admission Status Update in Real-time}
    LiveStatusCheck --> |Success Confirmation| Enrolled[🎉 Student Placement Confirmed!]
```

---

## 🛠️ Main App Features & Capabilities

1. **Multi-Board Directory Filter**: Parents can filter schools by major educational boards, annual tuition fees, specific grade availability, and geographic locations (California, Richmond, San Francisco, London, state districts, etc.).
2. **Dynamic Timetabled Transit**: Allows parents to check school bus coverage by sectors and inspect localized timetables with micro-checkpoint stop timings.
3. **Class Cohort Curriculums**: Supports viewing class-by-class mandatory core subjects, electives, and subscription activity blocks.
4. **Dynamic Academic Planners & Event Trackers**: Filter and find exam dates, holidays, orientation days, and open-house dates with instant notifications subscription toggle commands.
5. **Interactive Reviews Interface**: Parents can write reviews with real-time word limits, interactive star selections, and view instantly.
6. **Robust Admin Panel**: Complete multi-tab configuration form to control general guidelines, curricular fees, school routes, and calendar announcements in seconds.

---

## 🚀 Technological Stack

- **Code Framework**: React 18+ with TypeScript
- **Bundler**: Vite
- **Styling**: Tailwind CSS v4 Utility Classes with Sketchy Sketch borders
- **Icon Library**: Lucide React
- **Local Persistence Layer**: Standard client-side state caching using standard `localStorage` wrapper triggers.
