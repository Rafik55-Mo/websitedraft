# Disaster Law Symposium Website

A multi-page website for the Disaster Law Symposium conference, featuring a modern design and responsive layout.

## Website Structure

The website is divided into 4 main pages:

### 1. Home Page (`index.html`)
- **Hero Section**: Main conference banner with title, subtitle, date, venue, and registration button
- **About Section**: Conference overview with statistics (attendees, speakers, sessions)
- **Navigation**: Links to all other pages
- **Footer**: Contact information and quick links

### 2. Agenda Page (`agenda.html`)
- **Conference Schedule**: Three-day agenda with tabbed navigation
- **Session Details**: Time, title, description, and speaker information for each session
- **Interactive Tabs**: Switch between different days of the conference

### 3. Venue Page (`venue.html`)
- **Venue Information**: Brooklyn Law School details
- **Getting There**: Transportation and accessibility information
- **Accommodations**: Hotel information
- **Interactive Map**: Embedded Google Maps showing the venue location

### 4. Contact & Registration Page (`contact.html`)
- **Registration Section**: Three pricing tiers (Early Bird, Standard, Late Registration)
- **Contact Form**: Contact information and message form
- **Registration Modal**: Popup form for conference registration
- **Contact Details**: Email, phone, and address information

## Features

- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Modern UI**: Clean, professional design with smooth animations
- **Interactive Elements**: 
  - Tabbed agenda navigation
  - Registration modal with form validation
  - Contact form with validation
  - Mobile-friendly navigation menu
- **Accessibility**: Keyboard navigation and screen reader friendly
- **Cross-browser Compatible**: Works on all modern browsers

## Files

- `index.html` - Home page
- `agenda.html` - Agenda page
- `venue.html` - Venue page
- `contact.html` - Contact and registration page
- `style.css` - All styling and responsive design
- `script.js` - JavaScript functionality and interactions
- `Images/` - Directory for website images (NYCEM logo, poster, etc.)

## Setup

1. Ensure all files are in the same directory
2. Create an `Images` folder and add:
   - `NYCEM_LOGO_black.png` - Organization logo
   - `RawPoster.PNG` - Hero background image
3. Open `index.html` in a web browser to view the website

## Customization

- **Colors**: Update the CSS variables in `style.css` to change the color scheme
- **Content**: Edit the HTML files to update conference information
- **Images**: Replace images in the `Images` folder with your own
- **Contact Information**: Update email, phone, and address in the contact sections

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Notes

- The registration and contact forms currently log data to the console - in a real implementation, these would connect to a backend server
- The Google Maps embed uses a placeholder URL - replace with the actual venue coordinates
- Social media links are placeholder URLs - update with actual social media profiles 