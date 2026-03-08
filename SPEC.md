# Church Admin Application Specification

## 1. Project Overview

**Project Name:** Church Admin (GerejaKu Admin)
**Project Type:** Web Application (Single Page Application)
**Core Functionality:** A comprehensive church management system for managing members, attendance, donations, and events
**Target Users:** Church administrators, pastors, secretaries, and treasurer

---

## 2. UI/UX Specification

### Layout Structure

**App Shell:**
- Fixed sidebar navigation (280px width) on the left
- Main content area with header and scrollable content
- Mobile: Collapsible sidebar with hamburger menu

**Page Sections:**
- **Sidebar:** Logo, navigation menu, user profile
- **Header:** Page title, search bar, notification icon, user avatar
- **Content Area:** Dynamic content based on selected menu
- **Footer:** Copyright info (inside content area)

### Responsive Breakpoints
- Mobile: < 768px (sidebar collapses to hamburger)
- Tablet: 768px - 1024px (compact sidebar)
- Desktop: > 1024px (full sidebar)

### Visual Design

**Color Palette:**
- Primary: `#1a365d` (Deep Navy Blue - trust, stability)
- Secondary: `#2d3748` (Charcoal Gray)
- Accent: `#38a169` (Church Green - hope, growth)
- Success: `#48bb78`
- Warning: `#ed8936`
- Danger: `#e53e3e`
- Background: `#f7fafc` (Light Gray)
- Card Background: `#ffffff`
- Text Primary: `#1a202c`
- Text Secondary: `#718096`
- Border: `#e2e8f0`

**Typography:**
- Font Family: `'Nunito', sans-serif` (headings), `'Inter', sans-serif` (body)
- Headings: 
  - H1: 32px, weight 700
  - H2: 24px, weight 600
  - H3: 20px, weight 600
  - H4: 16px, weight 600
- Body: 14px, weight 400
- Small: 12px, weight 400

**Spacing System:**
- Base unit: 4px
- xs: 4px, sm: 8px, md: 16px, lg: 24px, xl: 32px, 2xl: 48px

**Visual Effects:**
- Card shadow: `0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.08)`
- Hover shadow: `0 4px 6px rgba(0,0,0,0.1), 0 2px 4px rgba(0,0,0,0.06)`
- Border radius: 8px (cards), 6px (buttons), 4px (inputs)
- Transitions: 0.2s ease-in-out

### Components

**Navigation Sidebar:**
- Logo with church icon at top
- Menu items with icons
- Active state: accent color background with white text
- Hover state: light accent background

**Cards:**
- White background, rounded corners (8px)
- Subtle shadow
- Padding: 24px

**Buttons:**
- Primary: Accent green background, white text
- Secondary: White background, gray border, dark text
- Danger: Red background, white text
- Sizes: sm (32px height), md (40px height), lg (48px height)
- States: hover (darken 10%), active (darken 15%), disabled (opacity 0.5)

**Form Inputs:**
- Height: 40px
- Border: 1px solid #e2e8f0
- Focus: accent color border, subtle glow
- Border radius: 6px
- Padding: 0 12px

**Tables:**
- Striped rows (alternating #f9fafb)
- Hover row highlight
- Sortable column headers
- Pagination controls

**Modals:**
- Centered overlay with dark backdrop (rgba(0,0,0,0.5))
- White card with header, body, footer
- Close button in top right

**Status Badges:**
- Small rounded pills
- Different colors for different statuses (active/inactive, paid/unpaid)

---

## 3. Functionality Specification

### Pages & Features

#### Dashboard (Home)
- Welcome message with current date
- Statistics cards:
  - Total Members (count)
  - New Members This Month
  - Total Attendance This Week
  - Total Donations This Month
- Quick action buttons
- Recent activities list (last 5)
- Upcoming events (next 3)

#### Members Management
- Member list table with columns:
  - Photo (thumbnail)
  - Name
  - Gender
  - Birth Date
  - Phone
  - Email
  - Address
  - Status (Active/Inactive)
  - Actions (View, Edit, Delete)
- Search functionality
- Filter by status, gender
- Add new member button → Opens modal form
- Edit member → Opens modal with pre-filled data
- Delete confirmation modal
- Member detail view (full profile)

**Member Form Fields:**
- Photo upload
- Full Name (required)
- Gender (Male/Female)
- Birth Date
- Birth Place
- Phone (required)
- Email
- Address
- City
- Postal Code
- Join Date
- Status (Active/Inactive)
- Notes

#### Attendance
- Date selector
- Service/Event selector (Sunday Service, Youth, etc.)
- Member check-in list with checkboxes
- Mark all present button
- Attendance summary statistics
- Historical attendance records table
- Attendance percentage per member

#### Finance/Donations
- Donation categories:
  - Tithe (Persepuluhan)
  - Offering (Kolekte)
  - Building Fund
  - Special Donation
  - Other
- Transaction list:
  - Date
  - Donor Name
  - Amount
  - Category
  - Payment Method
  - Notes
  - Actions
- Add donation form
- Monthly/Yearly summary
- Filter by date range, category
- Export to CSV

#### Events
- Event list with:
  - Event Name
  - Date & Time
  - Location
  - Category
  - Status (Upcoming, Ongoing, Completed)
  - Attendees count
  - Actions
- Add/Edit event form
- Event details with attendee management

### Data Handling
- Local storage for data persistence (demo purposes)
- Pre-populated sample data for demonstration
- Form validation on all inputs
- Confirmation dialogs for destructive actions

### Edge Cases
- Empty states with helpful messages and CTAs
- Loading states for async operations
- Error handling with user-friendly messages
- Form validation feedback

---

## 4. Acceptance Criteria

### Visual Checkpoints
- [ ] Sidebar displays correctly with all navigation items
- [ ] Color scheme matches specification (navy, green accent)
- [ ] Typography is consistent throughout
- [ ] Cards have proper shadows and rounded corners
- [ ] Responsive layout works on mobile/tablet/desktop
- [ ] Hover and active states are visible on interactive elements

### Functional Checkpoints
- [ ] Navigation between pages works
- [ ] Dashboard shows statistics and recent items
- [ ] Members can be viewed in table format
- [ ] Add/Edit member forms work with validation
- [ ] Member search and filter works
- [ ] Attendance check-in functionality works
- [ ] Donations can be recorded and listed
- [ ] Events can be managed
- [ ] Data persists in local storage
- [ ] Modals open and close correctly
- [ ] Form validation shows appropriate errors
- [ ] Delete confirmations work

---

## 5. Technical Stack

- **HTML5** - Semantic markup
- **CSS3** - Custom styles with CSS variables
- **JavaScript (ES6+)** - Vanilla JS for interactivity
- **Local Storage** - Data persistence
- **No external frameworks** - Pure implementation for learning
- **Google Fonts** - Nunito, Inter

---

## 6. File Structure

```
church-admin/
├── index.html          # Main HTML file
├── css/
│   └── styles.css      # All styles
├── js/
│   ├── app.js          # Main application logic
│   ├── data.js         # Sample data and storage
│   ├── components.js   # Reusable UI components
│   └── pages/
│       ├── dashboard.js
│       ├── members.js
│       ├── attendance.js
│       ├── finance.js
│       └── events.js
└── assets/
    └── images/         # Placeholder for images
```
