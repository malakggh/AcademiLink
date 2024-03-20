# AcademiLink

**Malak Ghrayeb**\
**Haya Abu Hamed**

## Background

The tutoring program at your college is designed to enhance academic support through peer tutoring, a valuable resource for students seeking assistance in various subjects. Historically, this program has operated on a manual system, primarily reliant on email communications for coordinating tutoring sessions between students and tutors. While this approach has enabled the program to function, it has introduced several operational challenges:

- **Inefficiencies and Delays:** The manual matching of tutors with students and the coordination of schedules require significant time and effort from both the program coordinators and the participants. This process often leads to delays in setting up tutoring sessions.
- **Lack of Transparency:** The current system offers limited visibility into tutor availability and student requests, making it difficult for students to find suitable tutors and for tutors to manage their schedules effectively.
- **Error-Prone Tracking:** Manual record-keeping and email-based communication are susceptible to errors, omissions, and miscommunications, complicating the tracking of tutoring hours and session completion.

These challenges compromise the effectiveness, accessibility, and overall quality of the tutoring program, affecting both the academic support provided to students and the operational efficiency from the perspective of the program management.

## Motivation

The motivation behind developing AcademiLink stems from a critical need to address the aforementioned challenges by leveraging technology to streamline and automate the tutoring program's operations. The key drivers for AcademiLink include:

- **Enhancing Efficiency:** By automating the matching process, scheduling, and hour tracking, AcademiLink significantly reduces the time and effort required to manage the tutoring program, leading to quicker setup of tutoring sessions and accurate tracking of activities.
- **Improving Accessibility and Transparency:** A dedicated platform enables students and tutors to have real-time visibility into availability, preferences, and session requirements, facilitating easier and more effective matching based on mutual needs.
- **Strengthening Management and Oversight:** For program coordinators, AcademiLink offers tools to oversee the entire tutoring process more effectively, from tutor approvals to monitoring session completions and generating insightful reports, thus improving program quality and accountability.

## Problem Statement

The tutoring program at our college, aimed at facilitating academic support through peer tutoring, currently faces significant challenges due to its reliance on manual processes and email-based coordination. This outdated approach results in inefficiencies, delays, and a notable lack of transparency, adversely affecting tutors, students, and program administrators alike. Specifically, the program struggles with:

- **Time-Consuming Coordination:** The manual process of matching tutors with students based on availability and subject needs is cumbersome and slow, leading to delays in arranging necessary academic support.
- **Limited Transparency:** Students and tutors experience difficulty in accessing real-time information about availability, preferences, and session statuses, making it challenging to efficiently manage and adjust tutoring sessions.
- **Inefficient Tracking and Reporting:** The current reliance on manual record-keeping for tutoring sessions and hours is prone to errors and inconsistencies, complicating accurate tracking and evaluation of the program's effectiveness.
- **Administrative Overhead:** The manual administration of the tutoring process, from tutor approvals to scheduling and feedback collection, places a substantial burden on program coordinators. This inefficiency limits the program's scalability and ability to respond dynamically to the needs of the college community.

In summary, the existing manual system for managing the tutoring program significantly hinders its operational efficiency, scalability, and overall effectiveness. There is a pressing need for a streamlined, automated solution that can address these challenges head-on, enhancing the quality of academic support offered and enabling the program to adapt to evolving educational needs. The proposed AcademiLink web app aims to solve these issues by providing a comprehensive, integrated platform for managing all aspects of the tutoring program, thereby significantly improving the experience for tutors, students, and administrators.

## Literature Research

[AcademiLink](https://malakggh.github.io/AcademiLink/)

## Existing Solutions

### Jet Admin

- **Purpose**: Jet Admin is a no-code platform that allows you to build custom web applications for various business needs without writing any code. It is particularly useful for creating admin panels, internal tools, or CRM systems using your existing data sources like databases, APIs, or third-party apps. Jet Admin offers a drag-and-drop interface, making it accessible for non-developers to create functional applications for data management and operations.

- **Use Case**: Tutors use the platform to register their teaching preferences and log teaching hours. Students browse and request tutoring sessions, while the program manager oversees assignments and monitors submissions.

- **Cons**: Requires additional customization or integration for full functionality, such as automated matching and scheduling.

- **Advantage of AcademiLink**: Provides a seamless, tutoring-specific solution with automatic matching based on preferences and availability, reducing manual work and potential errors.

### Salesforce

- **Purpose**: Salesforce is a powerful cloud-based CRM platform that supports a wide range of business processes, from sales and customer service to marketing automation. It is highly customizable, allowing businesses to tailor the platform to their specific needs through extensive configuration options and a robust development environment. Salesforce also offers a rich ecosystem of apps through its AppExchange for extending functionality.

- **Use Case**: The platform is adapted to manage tutor and student interactions, track tutor availability, and manage hours worked, catering to tutors, students, and the program manager.

- **Cons**: Complex and potentially expensive to customize for specific needs, possibly offering more features than necessary.

- **Advantage of AcademiLink**: Offers a streamlined, cost-effective solution specifically designed for tutoring management, enhancing user experience with focused features.

### Microsoft Teams

- **Purpose**: Microsoft Teams is a collaboration platform that integrates with Microsoft 365. It offers features like chat, video calls, meetings, file storage, and collaboration on Office documents. Teams is designed to facilitate communication and collaboration within organizations, making it a versatile tool for both educational and corporate environments.

- **Use Case**: Tutors and students use Teams for direct communication, session scheduling, and resource sharing, with the program manager overseeing the tutoring program through channel monitoring.

- **Cons**: Lacks specific features for tutor-student pairing, hour tracking, and payment processing.

- **Advantage of AcademiLink**: Provides a dedicated platform for managing all aspects of tutoring services, including features for automatic session requests and hour submissions.

### Google Workspace

- **Purpose**: Google Workspace offers a suite of productivity and collaboration tools that enable real-time document editing, file sharing, and communication.

- **Use Case**: Google Forms is used for registration, Sheets for tracking and scheduling, and Calendar for session management by tutors, students, and the program manager.

- **Cons**: Manual effort is required to cohesively link these tools, and it lacks automatic notification and matching features.

- **Advantage of AcademiLink**: Automates and integrates registration, scheduling, and tracking within a single platform, providing a tailored solution for tutoring management.

### Asana

- **Purpose**: Asana is a project management tool designed to help teams organize, track, and manage their work. With features like tasks, projects, deadlines, and progress tracking, Asana helps teams stay aligned and focused on their goals. It supports various workflows, from simple to-do lists to complex project plans, making it adaptable to different team sizes and project types.

- **Use Case**: The tutoring program is managed as a project, with tutoring requests as tasks assigned to tutors based on availability and expertise. The program manager tracks completion and manages task assignments.

- **Cons**: Not specifically designed for educational tutoring management, requiring significant setup and customization.

- **Advantage of AcademiLink**: Directly addresses tutoring management needs with automated features for session requests, approvals, and hour tracking, offering a more tailored and efficient solution.

## System Requirements (Tasks)

### For Tutor:

- Enable tutors to request permission from the manager to teach new courses.
- Allow tutors to manage course availability (on/off for willingness to teach).
- Develop a preferences setup for available days and teaching methods.
- Create a dashboard for tutors to view, accept, or reject session requests.
- Integrate a system for tutors to mark sessions as completed.
- Provide tutors with a tool to submit monthly hours automatically.

### For Student:

- Allow students to search for tutors by course.
- Enable students to filter tutors by teaching method (Zoom/frontal).
- Enable students to filter tutors on their available days.
- Permit students to send session requests to tutors based on their preferences.
- Enable students to view all requested sessions for the current semester, including pending, rejected, and completed sessions.

### For Manager:

- Develop an interface for managing tutor course requests (approve/reject).
- Implement monitoring capabilities for session completions and feedback.
- Create reporting tools for analyzing tutoring activities and performance.
- Set up a system for the manager to broadcast updates or announcements.
- Integrate tools for generating and exporting comprehensive reports.

### For All Users:

- Implement secure login/register functionality.
- Develop a responsive user interface adaptable to various devices.
- Establish a notification system for updates and communications.
- Integrate a feedback mechanism for continuous improvement.
- Create a comprehensive help and tutorial section.
- Ensure data privacy and security measures are in place.

## A Work Plan Based on the Analysis of the Critical Tasks

### Phase 1: Planning and Design

**Tasks:**

- Conduct detailed sessions with potential tutors, students, and managers to refine and validate the system requirements.
- Develop a blueprint of the system's architecture, focusing on scalability, security, and integration capabilities.
- Create wireframes and prototypes for the user interfaces of tutors, students, and the manager, ensuring usability and accessibility.

**Milestones:**

- Completion of requirements document.
- Approval of system architecture and user interface designs.

### Phase 2: Core Development

**For Tutor:**

- Develop functionalities for tutors to request teaching permissions and manage course offerings.
- Enable tutors to set their availability and teaching preferences.
- Implement the dashboard for session management and hour submissions.

**For Student:**

- Build capabilities for students to search and filter tutors by course, teaching method, and availability.
- Develop a system for students to request sessions and view the status of their requests.

**For Manager:**

- Create tools for managing tutor course requests and broadcasting announcements.
- Implement functionalities for session tracking, feedback collection, and report generation.

**Milestones:**

- Tutor, student, and manager modules developed and internally tested.

### Phase 3: Integration and Testing

**Tasks:**

- Test the integrated functionalities of the system to ensure seamless interaction between tutor, student, and manager modules.
- Conduct thorough testing to identify and mitigate security vulnerabilities and performance bottlenecks.
- Involve a select group of tutors, students, and managers to test the system in real-world scenarios.

### Phase 4: Deployment and Training

**Tasks:**

- Deploy AcademiLink on the college's infrastructure or cloud services, ensuring readiness for live use.
- Conduct training workshops for tutors, students, and managers to familiarize them with the system's functionalities.
- Provide comprehensive user manuals and online help resources.

### Phase 5: Maintenance and Enhancement

**Tasks:**

- Establish mechanisms for ongoing feedback collection from all user types.
- Implement tools for monitoring system performance and user activity.
- Schedule regular updates to introduce new features and address any identified issues.

## Risk Management Table

| Risk Category | Risk Description                                                  | Likelihood | Impact    | Mitigation Strategy                                                            |
| ------------- | ----------------------------------------------------------------- | ---------- | --------- | ------------------------------------------------------------------------------ |
| General       | Technical issues with login/register                              | Medium     | High      | Implement robust testing and validation. Use reliable authentication services. |
| General       | Insufficient data security and privacy                            | Low        | Very High | Apply industry-standard security practices. Regular security audits.           |
| Student       | Difficulty in finding suitable tutors                             | Low        | Medium    | Enhance search and filtering capabilities.                                     |
| Student       | Miscommunication between students and tutors                      | Medium     | Medium    | Implement clear communication channels and guidelines.                         |
| Student       | Students not finding available tutors due to scheduling conflicts | High       | High      | Offer a dynamic scheduling system that updates in real-time.                   |
| Tutor         | Difficulty in managing course availability                        | Low        | Low       | Provide an intuitive interface for managing course statuses.                   |
| Tutor         | Inaccurate tracking of tutoring hours                             | Medium     | High      | Automate hour tracking with confirmation systems for both tutors and students. |
| Manager       | Challenges in monitoring tutor-student sessions                   | Medium     | Medium    | Implement dashboard analytics and reporting tools.                             |
| Manager       | Inefficiency in managing tutor requests to teach new courses      | Low        | Medium    | Streamline approval processes with automated notifications and guidelines.     |

## Development Environment

- **Operating System:** Linux Ubuntu.
- **Development and Maintenance Tool:** Visual Studio Code (VSCode).
- **Version Management:** GitHub.
- **Developed Languages:**
  - JavaScript (for Next.js and React).
  - TypeScript (for type-safe development).
- **Database:** PostgreSQL (with Prisma for ORM).

## Development Progress

As part of our commitment to enhancing the tutoring program at our college through AcademiLink, we are pleased to report substantial progress in the development of the platform. The functionalities that have been successfully implemented include:

- **General Features (All Users):**

  - Secure Login/Register Functionality: A robust system for user authentication has been implemented, ensuring secure access for tutors, students, and managers.
  - Responsive User Interface: The platform boasts a user-friendly, responsive interface designed to adapt seamlessly across various devices, enhancing accessibility and user experience.

- **Student-Specific Features:**

  - Tutor Search and Filtering: Students can now easily search for tutors by course and filter results based on teaching method (Zoom/frontal) and available days, streamlining the process of finding suitable tutoring support.
  - Session Requests: The platform allows students to send session requests to tutors, tailored to their preferences, and view all requested sessions for the current semester, including their status (pending, rejected, and completed).

- **Tutor-Specific Features:**

  - Course Request and Management: Tutors are equipped to request permission from the manager to teach new courses and manage their course availability, enabling flexibility and autonomy in their teaching engagements.
  - Preferences and Dashboard: A preferences setup for available days and teaching methods has been developed, along with a dashboard for viewing, accepting, or rejecting session requests, thus simplifying the coordination of tutoring sessions.
  - Session Completion: Tutors have the ability to mark sessions as completed, facilitating accurate tracking of tutoring activities and contributions.

- **Manager-Specific Feature:**
  - Tutor Course Request Management: An interface for managing tutor course requests, including the ability to approve or reject these requests, has been developed. This functionality empowers the program manager to oversee tutor participation effectively.

The achievements outlined above represent critical steps towards realizing the vision of AcademiLink as a comprehensive, efficient platform for managing the college's tutoring program. These developments not only improve the operational aspects of the tutoring program but also significantly enhance the experience for tutors, students, and administrators alike. We remain committed to continuous improvement and eagerly anticipate the completion of additional features to further support our college's academic mission.
