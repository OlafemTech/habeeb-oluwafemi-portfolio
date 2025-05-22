# Habeeb Oluwafemi - Developer Portfolio

A cutting-edge, responsive developer portfolio website built with HTML, TailwindCSS, and JavaScript. This portfolio showcases my skills as a frontend developer with full-stack proficiency, featuring modern design elements and interactive components.

## Features

- **Responsive Design**: Fully responsive layout that works on all devices
- **Dark/Light Mode**: Toggle between dark and light themes
- **Interactive UI**: Smooth animations and transitions
- **Filterable Projects**: Filter projects by category (Frontend, Full Stack, Backend)
- **Animated Hero Section**: Dynamic typing effect and floating elements
- **Skill Visualization**: Visual representation of skills with progress bars
- **Contact Form**: Fully functional contact form with validation
- **Accessibility**: Built with accessibility in mind, including proper ARIA attributes

## Technologies Used

- **HTML5**: Semantic markup structure
- **TailwindCSS**: Utility-first CSS framework for styling
- **JavaScript**: Interactive elements and animations
- **Font Awesome**: Icon library
- **Google Fonts**: Typography (Inter font family)

## Project Structure

```
dev-portfolio/
├── index.html          # Main HTML file
├── css/
│   └── style.css       # Custom CSS styles
├── js/
│   └── main.js         # JavaScript functionality
└── README.md           # Project documentation
```

## Getting Started

1. Clone the repository
2. Open `index.html` in your browser
3. Customize the content to make it your own

## Customization

### Changing Colors

The primary color scheme can be modified in the Tailwind configuration at the top of the HTML file:

```javascript
tailwind.config = {
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                primary: '#3B82F6',    // Change this for primary color
                secondary: '#10B981',  // Change this for secondary color
                accent: '#F59E0B',     // Change this for accent color
                dark: '#111827',
                light: '#F9FAFB'
            },
            // ...
        }
    }
}
```

### Adding Projects

To add a new project, copy one of the existing project card structures in the HTML and update the content:

```html
<div class="project-card group" data-category="your-category">
    <!-- Project content here -->
</div>
```

## Browser Support

This portfolio is compatible with all modern browsers including:
- Chrome
- Firefox
- Safari
- Edge

## License

Feel free to use this template for your personal portfolio.

## Contact Information

Feel free to reach out to me through any of the following channels:

- **Email:** 
  - habeeboluwafemi27@gmail.com
  - Najeebhabeeb27@fmail.com
- **Phone:** 
  - +234 813 101 7099
  - +234 906 582 1064
- **Social Media:**
  - GitHub: [OlafemTech](https://github.com/OlafemTech)
  - LinkedIn: [Habeeb Oluwafemi](https://www.linkedin.com/in/habeeb-oluwafemi-0b1999bb/)
  - Twitter: [@femi_ultim8](https://x.com/femi_ultim8)
  - Instagram: [@habeeb_femi_](https://www.instagram.com/habeeb_femi_/)

## Acknowledgements

- Images from [Unsplash](https://unsplash.com/)
- Icons from [Font Awesome](https://fontawesome.com/)
- Fonts from [Google Fonts](https://fonts.google.com/)
