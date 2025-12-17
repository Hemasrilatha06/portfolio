# 🚀 Running Portfolio Locally

## Quick Start

### Method 1: Using Python Server (Recommended)
1. **Double-click** `start_portfolio.bat`
2. **Or run manually:**
   ```bash
   python server.py
   ```
3. **Browser will open automatically** at `http://localhost:8000`

### Method 2: Using Live Server (VS Code)
1. Install **Live Server** extension in VS Code
2. Right-click `index.html` → **Open with Live Server**

### Method 3: Using XAMPP/WAMP (For PHP features)
1. Copy project to `htdocs` folder
2. Start Apache server
3. Visit `http://localhost/Gooichand.github.io`

## 🌟 Features Available Locally

### ✅ Working Features:
- ✨ 3D Animated Welcome Screen
- 🎨 Interactive UI with neumorphism design
- 📱 Responsive Design
- 🎯 Skills showcase with animations
- 🖼️ Image galleries and carousels
- 🌦️ Weather-based theming (requires internet)
- 📧 Contact form (via EmailJS - requires internet)
- 🤖 AI Name validation
- 📊 Visitor analytics collection

### ⚠️ Requires Internet:
- 🌍 Weather API calls
- 📧 EmailJS contact form
- 🗺️ Location services
- 📡 External CDN resources

### 🔧 PHP Features (Need PHP Server):
- 📧 Alternative email handling
- 🗄️ Server-side processing

## 🛠️ Troubleshooting

### Port Issues:
- If port 8000 is busy, server will try 8001, 8002, etc.
- Or manually specify: `python server.py --port 3000`

### Python Not Found:
- Install Python from https://python.org
- Make sure Python is in your PATH

### Browser Not Opening:
- Manually visit: `http://localhost:8000`

## 📋 Project Structure

```
Gooichand.github.io/
├── index.html          # Main portfolio page
├── style.css           # Comprehensive styling
├── script.js           # Interactive functionality
├── server.py           # Local development server
├── start_portfolio.bat # Windows quick start
├── config.php          # PHP email configuration
├── send_email.php      # PHP email handler
├── images/             # Profile and education images
├── media/              # Photo gallery
├── badges/             # Achievement badges
├── video/              # Background video
└── README.md           # Project documentation
```

## 🎯 Key Technologies

- **Frontend:** HTML5, CSS3, JavaScript (ES6+)
- **Libraries:** jQuery, Typed.js, OwlCarousel
- **APIs:** OpenWeatherMap, EmailJS, IP Geolocation
- **Design:** Font Awesome, Google Fonts
- **Features:** AI validation, Dynamic theming, 3D effects

## 🔒 Security Notice

This portfolio includes copyright protection features:
- Right-click disabled
- Developer tools blocked
- Text selection disabled
- Code obfuscation measures

**© 2025 Samsani Hema Sri Latha. All Rights Reserved.**

---

**Built with ❤️ by Samsani Hema Sri Latha**