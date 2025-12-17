// Portfolio JavaScript - Samsani Hema Sri Latha © 2025



// Global variables for visitor data
let visitorData = {
  location: null,
  deviceInfo: null
};

// AI Name Validation
function validateRealName(name) {
  // Remove extra spaces
  name = name.trim();
  
  // Check minimum length
  if (name.length < 2) return false;
  
  // Check if name contains at least 50% letters
  const letterCount = (name.match(/[a-zA-Z]/g) || []).length;
  if (letterCount / name.length < 0.5) return false;
  
  // Reject if too many repeated characters (like "aaaa" or "1111")
  const repeatedPattern = /(.)\1{3,}/;
  if (repeatedPattern.test(name)) return false;
  
  // Reject if only numbers
  if (/^[0-9]+$/.test(name)) return false;
  
  // Reject common fake patterns
  const fakePatterns = [
    /^test/i, /^asdf/i, /^qwer/i, /^xyz/i, /^abc/i,
    /^fake/i, /^random/i, /^user/i, /^guest/i,
    /^[a-z]{1,2}$/i, // Single or two letters
    /^\d+[a-z]+$/i, // Numbers followed by letters
  ];
  
  for (let pattern of fakePatterns) {
    if (pattern.test(name)) return false;
  }
  
  // Check for at least one vowel (real names usually have vowels)
  if (!/[aeiouAEIOU]/.test(name)) return false;
  
  return true;
}

// Canvas Fingerprint
function getCanvasFingerprint() {
  try {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 200; canvas.height = 50;
    ctx.textBaseline = 'top';
    ctx.font = '14px Arial';
    ctx.fillStyle = '#f60';
    ctx.fillRect(125, 1, 62, 20);
    ctx.fillStyle = '#069';
    ctx.fillText('Browser Fingerprint', 2, 15);
    return canvas.toDataURL().slice(-50);
  } catch(e) { return 'Unavailable'; }
}

// WebGL Fingerprint
function getWebGLFingerprint() {
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) return 'Unavailable';
    const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
    return {
      vendor: debugInfo ? gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL) : 'Unknown',
      renderer: debugInfo ? gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) : 'Unknown'
    };
  } catch(e) { return { vendor: 'Unavailable', renderer: 'Unavailable' }; }
}

// Audio Fingerprint
function getAudioFingerprint() {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return 'Unavailable';
    const context = new AudioContext();
    const oscillator = context.createOscillator();
    const analyser = context.createAnalyser();
    const gainNode = context.createGain();
    const scriptProcessor = context.createScriptProcessor(4096, 1, 1);
    gainNode.gain.value = 0;
    oscillator.connect(analyser);
    analyser.connect(scriptProcessor);
    scriptProcessor.connect(gainNode);
    gainNode.connect(context.destination);
    oscillator.start(0);
    const hash = analyser.frequencyBinCount + '_' + context.sampleRate;
    oscillator.stop();
    context.close();
    return hash;
  } catch(e) { return 'Unavailable'; }
}

// Font Detection
function getFonts() {
  const baseFonts = ['monospace', 'sans-serif', 'serif'];
  const testFonts = ['Arial', 'Verdana', 'Times New Roman', 'Courier New', 'Georgia', 'Palatino', 'Garamond', 'Comic Sans MS', 'Trebuchet MS', 'Impact'];
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const detected = [];
  
  baseFonts.forEach(baseFont => {
    ctx.font = '72px ' + baseFont;
    const baseWidth = ctx.measureText('mmmmmmmmmmlli').width;
    testFonts.forEach(testFont => {
      ctx.font = '72px ' + testFont + ',' + baseFont;
      if (ctx.measureText('mmmmmmmmmmlli').width !== baseWidth) {
        detected.push(testFont);
      }
    });
  });
  return [...new Set(detected)].join(', ') || 'None detected';
}

// Battery Status
async function getBatteryInfo() {
  try {
    if (navigator.getBattery) {
      const battery = await navigator.getBattery();
      return {
        level: Math.round(battery.level * 100) + '%',
        charging: battery.charging ? 'Yes' : 'No'
      };
    }
    return { level: 'Unavailable', charging: 'Unavailable' };
  } catch(e) { return { level: 'Unavailable', charging: 'Unavailable' }; }
}

// Storage Info
function getStorageInfo() {
  try {
    return {
      localStorage: localStorage.length + ' items',
      sessionStorage: sessionStorage.length + ' items',
      cookiesEnabled: navigator.cookieEnabled ? 'Yes' : 'No'
    };
  } catch(e) { return { localStorage: 'Blocked', sessionStorage: 'Blocked', cookiesEnabled: 'Unknown' }; }
}

// Collect comprehensive device information
function getDeviceInfo() {
  const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  
  return {
    // Basic Browser Info
    browser: navigator.userAgent.split(') ')[0].split('(')[1] || 'Unknown',
    fullUserAgent: navigator.userAgent,
    platform: navigator.platform,
    vendor: navigator.vendor || 'Unknown',
    
    // Language & Locale
    language: navigator.language,
    languages: navigator.languages ? navigator.languages.join(', ') : navigator.language,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    timezoneOffset: new Date().getTimezoneOffset(),
    
    // Screen & Display
    screenResolution: `${screen.width}x${screen.height}`,
    screenAvailSize: `${screen.availWidth}x${screen.availHeight}`,
    colorDepth: `${screen.colorDepth}-bit`,
    pixelDepth: `${screen.pixelDepth}-bit`,
    pixelRatio: window.devicePixelRatio || 1,
    screenOrientation: screen.orientation ? screen.orientation.type : 'Unknown',
    
    // Window Size
    windowInner: `${window.innerWidth}x${window.innerHeight}`,
    windowOuter: `${window.outerWidth}x${window.outerHeight}`,
    
    // Hardware
    hardwareConcurrency: navigator.hardwareConcurrency || 'Unknown',
    deviceMemory: navigator.deviceMemory ? `${navigator.deviceMemory}GB` : 'Unknown',
    maxTouchPoints: navigator.maxTouchPoints || 0,
    touchSupport: 'ontouchstart' in window || navigator.maxTouchPoints > 0,
    
    // Network
    connectionType: connection ? connection.effectiveType : 'Unknown',
    downlink: connection ? `${connection.downlink}Mbps` : 'Unknown',
    rtt: connection ? `${connection.rtt}ms` : 'Unknown',
    saveData: connection ? connection.saveData : 'Unknown',
    onlineStatus: navigator.onLine,
    
    // Privacy & Tracking
    cookieEnabled: navigator.cookieEnabled,
    doNotTrack: navigator.doNotTrack || 'Not set',
    
    // Navigation
    referrer: document.referrer || 'Direct',
    pageUrl: window.location.href,
    protocol: window.location.protocol,
    
    // Plugins & Extensions
    plugins: Array.from(navigator.plugins || []).map(p => p.name).join(', ') || 'None',
    pluginsCount: navigator.plugins ? navigator.plugins.length : 0,
    mimeTypes: navigator.mimeTypes ? navigator.mimeTypes.length : 0,
    
    // Session
    sessionStart: new Date().toISOString(),
    
    // Fingerprints
    canvasFingerprint: getCanvasFingerprint(),
    webglVendor: getWebGLFingerprint().vendor,
    webglRenderer: getWebGLFingerprint().renderer,
    audioFingerprint: getAudioFingerprint(),
    fontsDetected: getFonts()
  };
}

// Get exact GPS location (requires user permission)
function getGPSLocation() {
  return new Promise((resolve) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy
          });
        },
        () => resolve({ latitude: 'Permission denied', longitude: 'Permission denied', accuracy: 'N/A' })
      );
    } else {
      resolve({ latitude: 'Not supported', longitude: 'Not supported', accuracy: 'N/A' });
    }
  });
}

// Get location using IP geolocation (free)
function getLocationInfo() {
  return fetch('https://ipapi.co/json/')
    .then(response => response.json())
    .then(data => ({
      country: data.country_name,
      region: data.region,
      city: data.city,
      ip: data.ip,
      isp: data.org
    }))
    .catch(() => ({ country: 'Unknown', region: 'Unknown', city: 'Unknown', ip: 'Unknown', isp: 'Unknown' }));
}

// Welcome Message Functions
function getTimeBasedGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return { greeting: 'Good Morning', icon: 'fas fa-sun', color: '#f39c12' };
  if (hour < 17) return { greeting: 'Good Afternoon', icon: 'fas fa-sun', color: '#e67e22' };
  if (hour < 21) return { greeting: 'Good Evening', icon: 'fas fa-moon', color: '#8e44ad' };
  return { greeting: 'Good Night', icon: 'fas fa-moon', color: '#2c3e50' };
}

function getPersonalizedMessages(name, location) {
  const welcomeMessages = [
    `Hello ${name}! Ready to explore my digital world?`,
    `Welcome ${name}! Great to have you here today!`,
    `Hi ${name}! Let's discover amazing projects together!`,
    `Greetings ${name}! Your journey starts now!`,
    `Welcome ${name} from ${location?.city || 'your location'}!`,
    `Hello ${name}! Thanks for visiting my portfolio!`,
    `Hi ${name}! Excited to share my work with you!`,
    `Welcome ${name}! Hope you enjoy your visit!`,
    `Hello ${name}! Let's explore cybersecurity together!`,
    `Greetings ${name}! Ready for an amazing experience?`
  ];
  
  // Use timestamp to ensure different message each visit
  const seed = Date.now() + name.length;
  const index = seed % welcomeMessages.length;
  return welcomeMessages[index];
}

function getWeatherData(lat, lon) {
  const apiKey = '895284fb2d2c50a520ea537456963d9c';
  return fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
    .then(response => response.json())
    .catch(() => ({ 
      main: { temp: '--' }, 
      weather: [{ main: 'Clear', description: 'clear sky' }],
      name: 'Your Location'
    }));
}

function createWeatherEffect(weatherType) {
  const overlay = document.getElementById('weatherOverlay');
  const particles = document.getElementById('weatherParticles');
  const welcomeEffect = document.getElementById('weatherEffect');
  
  // Clear previous effects
  overlay.className = 'weather-overlay';
  particles.innerHTML = '';
  welcomeEffect.innerHTML = '';
  
  switch(weatherType.toLowerCase()) {
    case 'rain':
    case 'drizzle':
    case 'thunderstorm':
      overlay.classList.add('rainy-effect');
      // Create rain in both overlay and welcome popup
      [particles, welcomeEffect].forEach(container => {
        for(let i = 0; i < (container === welcomeEffect ? 20 : 60); i++) {
          const drop = document.createElement('div');
          drop.className = 'rain-drop';
          drop.style.left = Math.random() * 100 + '%';
          drop.style.animationDelay = Math.random() * 2 + 's';
          drop.style.animationDuration = (0.6 + Math.random() * 0.4) + 's';
          container.appendChild(drop);
        }
      });
      if(weatherType.toLowerCase() === 'thunderstorm') {
        overlay.classList.add('thunder-effect');
      }
      break;
      
    case 'snow':
      overlay.classList.add('snow-effect');
      [particles, welcomeEffect].forEach(container => {
        for(let i = 0; i < (container === welcomeEffect ? 15 : 40); i++) {
          const flake = document.createElement('div');
          flake.className = 'snowflake';
          flake.innerHTML = ['❄', '❅', '❆'][Math.floor(Math.random() * 3)];
          flake.style.left = Math.random() * 100 + '%';
          flake.style.animationDelay = Math.random() * 4 + 's';
          flake.style.fontSize = (0.8 + Math.random() * 0.6) + 'em';
          container.appendChild(flake);
        }
      });
      break;
      
    case 'clouds':
    case 'mist':
    case 'fog':
      overlay.classList.add('cloudy-effect');
      // Create moving clouds
      for(let i = 0; i < 3; i++) {
        const cloud = document.createElement('div');
        cloud.className = 'cloud';
        cloud.style.width = (60 + Math.random() * 40) + 'px';
        cloud.style.height = (30 + Math.random() * 20) + 'px';
        cloud.style.top = (10 + Math.random() * 30) + '%';
        cloud.style.animationDelay = Math.random() * 8 + 's';
        cloud.style.animationDuration = (6 + Math.random() * 4) + 's';
        particles.appendChild(cloud);
      }
      break;
      
    case 'clear':
    default:
      overlay.classList.add('sunny-effect');
      // Create sun rays effect in welcome popup
      for(let i = 0; i < 8; i++) {
        const ray = document.createElement('div');
        ray.style.position = 'absolute';
        ray.style.width = '2px';
        ray.style.height = '30px';
        ray.style.background = 'linear-gradient(to bottom, rgba(255,223,0,0.6), transparent)';
        ray.style.top = '20px';
        ray.style.left = '50%';
        ray.style.transformOrigin = '1px 0';
        ray.style.transform = `rotate(${i * 45}deg)`;
        ray.style.animation = 'sunRays 3s ease-in-out infinite';
        ray.style.animationDelay = (i * 0.2) + 's';
        welcomeEffect.appendChild(ray);
      }
      break;
  }
  
  overlay.style.opacity = '1';
  setTimeout(() => {
    overlay.style.opacity = '0';
  }, 10000);
}



function showWelcomeMessage(name, location) {
  const timeGreeting = getTimeBasedGreeting();
  const personalMessage = getPersonalizedMessages(name, location);
  
  // Update welcome content
  $('#welcomeIcon i').removeClass().addClass(timeGreeting.icon).css('color', timeGreeting.color);
  $('#welcomeTitle').text(`${timeGreeting.greeting}, ${name}!`);
  $('#welcomeMessage').text(personalMessage);
  $('#locationName').text(location?.city || 'Your Location');
  
  // Get weather data and update display
  if(location?.latitude && location?.longitude && location?.latitude !== 'Permission denied') {
    getWeatherData(location.latitude, location.longitude).then(weather => {
      $('#temperature').text(Math.round(weather.main.temp) + '°C');
      $('#weatherDesc').text(weather.weather[0].description);
      $('#locationName').text(weather.name);
      
      // Update weather icon based on conditions
      const weatherIcon = getWeatherIcon(weather.weather[0].main);
      $('.weather-icon i').removeClass().addClass(weatherIcon);
      
      createWeatherEffect(weather.weather[0].main);
      
      // Apply climate-based theme
      applyClimateTheme(weather.weather[0].main, weather.main.temp);
    });
  } else {
    $('#temperature').text('--°');
    $('#weatherDesc').text('Weather unavailable');
    $('.weather-icon i').removeClass().addClass('fas fa-cloud');
  }
  
  // Show welcome notification
  $('#specialWelcome').fadeIn(400);
  
  // Auto close after 4 seconds
  setTimeout(() => {
    closeWelcomeMessage();
  }, 4000);
}

function getWeatherIcon(weatherType) {
  switch(weatherType.toLowerCase()) {
    case 'clear': return 'fas fa-sun';
    case 'clouds': return 'fas fa-cloud';
    case 'rain': 
    case 'drizzle': return 'fas fa-cloud-rain';
    case 'thunderstorm': return 'fas fa-bolt';
    case 'snow': return 'fas fa-snowflake';
    case 'mist':
    case 'fog': return 'fas fa-smog';
    default: return 'fas fa-cloud-sun';
  }
}

function closeWelcomeMessage() {
  $('#specialWelcome').fadeOut(300, function() {
    const name = sessionStorage.getItem('visitorName');
    if(name) {
      $('.home-content .text-1').text(`Hello ${name}, My Name is`);
    }
  });
}

// 3D Splash Screen Functionality
$(document).ready(function() {
  const visited = sessionStorage.getItem('visited');
  const visitorName = sessionStorage.getItem('visitorName');

  if(visited && visitorName) {
    $('.splash-screen').hide();
    $('body').css('overflow', 'visible');
    $('.home-content .text-1').text(`Hello ${visitorName}, My Name is`);
  } else {
    $('body').css('overflow', 'hidden');
    $('html').css('overflow', 'hidden');
    
    visitorData.deviceInfo = getDeviceInfo();
    
    Promise.all([getGPSLocation(), getLocationInfo(), getBatteryInfo()]).then(([gpsData, locationData, batteryData]) => {
      visitorData.location = { ...locationData, ...gpsData };
      visitorData.battery = batteryData;
      visitorData.storage = getStorageInfo();
      $('#locationStatus').html(`<i class="fas fa-check-circle"></i> <span>Ready for ${locationData.city}</span>`);
    }).catch(() => {
      $('#locationStatus').html(`<i class="fas fa-check-circle"></i> <span>Experience ready</span>`);
    });

    $('#enterSite').click(function() {
      const name = $('#visitorName').val().trim();
      
      // AI Name Validation
      if(!validateRealName(name)) {
        showNameError('Please enter a valid real name');
        return;
      }
      
      // Hide error if name is valid
      hideNameError();
      
      if(name) {
        const sessionDuration = Math.round((Date.now() - performance.timing.navigationStart) / 1000);
        
        const emailData = {
          name: name,
          timestamp: new Date().toLocaleString(),
          
          // Location Data (8 fields)
          country: visitorData.location?.country || 'Unknown',
          region: visitorData.location?.region || 'Unknown',
          city: visitorData.location?.city || 'Unknown',
          ip_address: visitorData.location?.ip || 'Unknown',
          isp: visitorData.location?.isp || 'Unknown',
          latitude: visitorData.location?.latitude || 'Not available',
          longitude: visitorData.location?.longitude || 'Not available',
          gps_accuracy: visitorData.location?.accuracy || 'N/A',
          
          // Browser & System (10 fields)
          browser: visitorData.deviceInfo?.browser || 'Unknown',
          full_user_agent: visitorData.deviceInfo?.fullUserAgent || 'Unknown',
          platform: visitorData.deviceInfo?.platform || 'Unknown',
          vendor: visitorData.deviceInfo?.vendor || 'Unknown',
          plugins: visitorData.deviceInfo?.plugins || 'None',
          plugins_count: visitorData.deviceInfo?.pluginsCount || 0,
          mime_types: visitorData.deviceInfo?.mimeTypes || 0,
          protocol: visitorData.deviceInfo?.protocol || 'Unknown',
          do_not_track: visitorData.deviceInfo?.doNotTrack || 'Unknown',
          cookie_enabled: visitorData.deviceInfo?.cookieEnabled || false,
          
          // Language & Locale (4 fields)
          language: visitorData.deviceInfo?.language || 'Unknown',
          all_languages: visitorData.deviceInfo?.languages || 'Unknown',
          timezone: visitorData.deviceInfo?.timezone || 'Unknown',
          timezone_offset: visitorData.deviceInfo?.timezoneOffset || 'Unknown',
          
          // Screen & Display (8 fields)
          screen_resolution: visitorData.deviceInfo?.screenResolution || 'Unknown',
          screen_avail_size: visitorData.deviceInfo?.screenAvailSize || 'Unknown',
          color_depth: visitorData.deviceInfo?.colorDepth || 'Unknown',
          pixel_depth: visitorData.deviceInfo?.pixelDepth || 'Unknown',
          pixel_ratio: visitorData.deviceInfo?.pixelRatio || 'Unknown',
          screen_orientation: visitorData.deviceInfo?.screenOrientation || 'Unknown',
          window_inner: visitorData.deviceInfo?.windowInner || 'Unknown',
          window_outer: visitorData.deviceInfo?.windowOuter || 'Unknown',
          
          // Hardware (4 fields)
          hardware_concurrency: visitorData.deviceInfo?.hardwareConcurrency || 'Unknown',
          device_memory: visitorData.deviceInfo?.deviceMemory || 'Unknown',
          max_touch_points: visitorData.deviceInfo?.maxTouchPoints || 0,
          touch_support: visitorData.deviceInfo?.touchSupport || false,
          
          // Network (5 fields)
          connection_type: visitorData.deviceInfo?.connectionType || 'Unknown',
          connection_speed: visitorData.deviceInfo?.downlink || 'Unknown',
          rtt: visitorData.deviceInfo?.rtt || 'Unknown',
          save_data: visitorData.deviceInfo?.saveData || 'Unknown',
          online_status: visitorData.deviceInfo?.onlineStatus || false,
          
          // Navigation (3 fields)
          referrer: visitorData.deviceInfo?.referrer || 'Direct',
          page_url: visitorData.deviceInfo?.pageUrl || 'Unknown',
          session_start: visitorData.deviceInfo?.sessionStart || 'Unknown',
          session_duration: `${sessionDuration}s`,
          
          // Fingerprints (5 fields)
          canvas_fingerprint: visitorData.deviceInfo?.canvasFingerprint || 'Unknown',
          webgl_vendor: visitorData.deviceInfo?.webglVendor || 'Unknown',
          webgl_renderer: visitorData.deviceInfo?.webglRenderer || 'Unknown',
          audio_fingerprint: visitorData.deviceInfo?.audioFingerprint || 'Unknown',
          fonts_detected: visitorData.deviceInfo?.fontsDetected || 'None',
          
          // Battery (2 fields)
          battery_level: visitorData.battery?.level || 'Unknown',
          battery_charging: visitorData.battery?.charging || 'Unknown',
          
          // Storage (3 fields)
          local_storage: visitorData.storage?.localStorage || 'Unknown',
          session_storage: visitorData.storage?.sessionStorage || 'Unknown',
          cookies_enabled: visitorData.storage?.cookiesEnabled || 'Unknown'
        };



        sessionStorage.setItem('visited', 'true');
        sessionStorage.setItem('visitorName', name);
        $('.splash-screen').fadeOut(500, function() {
          $('body').css('overflow', 'visible');
          $('html').css('overflow', 'visible');
          showWelcomeMessage(name, visitorData.location);
        });
      }
    });

    $('#visitorName').keypress(function(e) {
      if(e.which == 13) {
        $('#enterSite').click();
      }
    });
    
    // Real-time name validation feedback
    $('#visitorName').on('input', function() {
      const name = $(this).val().trim();
      if(name.length >= 2 && validateRealName(name)) {
        hideNameError();
        $(this).css('border-color', 'rgba(0, 255, 0, 0.5)');
      } else if(name.length >= 2) {
        $(this).css('border-color', 'rgba(255, 0, 0, 0.5)');
      }
    });
  }
});

$(document).ready(function(){
    $(window).scroll(function(){
        if(this.scrollY > 20){
            $('.navbar').addClass("sticky");
        }else{
            $('.navbar').removeClass("sticky");
        }
        
        if(this.scrollY > 500){
            $('.scroll-up-btn').addClass("show");
        }else{
            $('.scroll-up-btn').removeClass("show");
        }
    });

    $('.scroll-up-btn').click(function(){
        $('html').animate({scrollTop: 0});
        $('html').css("scrollBehavior", "auto");
    });

    $('.navbar .menu li a').click(function(){
        $('html').css("scrollBehavior", "smooth");
    });

    $('.menu-btn').click(function(){
        $('.navbar .menu').toggleClass("active");
        $('.menu-btn i').toggleClass("active");
    });

    var typed = new Typed(".typing", {
        strings: ["Student", "Front-End Developer", "Problem Solver", "Tech Enthusiast"],
        typeSpeed: 150,
        backSpeed: 100,
        backDelay: 1000,
        loop: true,
        smartBackspace: true,
        showCursor: true, 
        cursorChar: '/',
        autoInsertCss: true
    });

    var typed2 = new Typed(".typing-2", {
        strings: ["Student", "Front-End Developer", "Problem Solver", "Tech Enthusiast"],
        typeSpeed: 150,
        backSpeed: 100,
        backDelay: 1000,
        loop: true,
        smartBackspace: true,
        showCursor: true,
        cursorChar: '/',
        autoInsertCss: true
    });

    $('.carousel').owlCarousel({
        margin: 20,
        loop: true,
        autoplay: true,
        autoplayTimeout: 2000,
        autoplayHoverPause: true,
        responsive: {
            0:{
                items: 1,
                nav: false
            },
            600:{
                items: 2,
                nav: false
            },
            1000:{
                items: 3,
                nav: false
            }
        }
    });

    $('.primary-skill').on('click keypress', function(e) {
        if(e.type === 'click' || e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            const $subSkills = $(this).find('.sub-skills');
            if($subSkills.hasClass('show')) {
                $subSkills.removeClass('show');
                $(this).attr('aria-expanded', 'false');
            } else {
                $('.sub-skills.show').removeClass('show');
                $('.primary-skill').attr('aria-expanded', 'false');
                $subSkills.addClass('show');
                $(this).attr('aria-expanded', 'true');
            }
        }
    });

    $('.primary-skill').on('mouseenter', function() {
        $('.sub-skills.show').removeClass('show');
        $('.primary-skill').attr('aria-expanded', 'false');

        const $subSkills = $(this).find('.sub-skills');
        $subSkills.addClass('show');
        $(this).attr('aria-expanded', 'true');
    });

    $('.primary-skill').on('mouseleave', function() {
        const $subSkills = $(this).find('.sub-skills');
        $subSkills.removeClass('show');
        $(this).attr('aria-expanded', 'false');
    });

    $('#contactForm').on('submit', function(e) {
        e.preventDefault();
        
        const name = $('#name').val();
        const email = $('#email').val();
        const subject = $('#subject').val();
        const message = $('#message').val();
        
        const btn = $('.send-btn');
        const originalText = btn.html();
        
        btn.html('<i class="fas fa-spinner fa-spin"></i> Sending...');
        btn.prop('disabled', true);
        
        // Simple form submission without EmailJS
        setTimeout(() => {
          btn.html('<i class="fas fa-check"></i> Message Received!');
          btn.css('background', 'linear-gradient(135deg, #28a745, #20c997)');
          $('#contactForm')[0].reset();
          btn.prop('disabled', false);
          setTimeout(() => {
            btn.html(originalText);
            btn.css('background', 'linear-gradient(135deg, crimson, #ff6b6b)');
          }, 3000);
        }, 1000);
    });

    $('.row[data-tooltip="Click to copy"]').on('click', function() {
        const text = $(this).find('.sub-title').text();
        navigator.clipboard.writeText(text).then(() => {
            const tooltip = $(this).attr('data-tooltip');
            $(this).attr('data-tooltip', 'Copied!');
            setTimeout(() => {
                $(this).attr('data-tooltip', tooltip);
            }, 2000);
        });
    });

    $(window).scroll(function() {
        const contactSection = $('#contact');
        const contactTop = contactSection.offset().top;
        const windowBottom = $(window).scrollTop() + $(window).height();
        
        if (windowBottom > contactTop + 100) {
            $('.contact .row').each(function(index) {
                $(this).delay(index * 100).queue(function() {
                    $(this).addClass('animate-in').dequeue();
                });
            });
        }
    });

    $('#specialWelcome').click(function() {
      closeWelcomeMessage();
    });
});

// Image Modal Functions
function openImageModal(src, alt) {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const caption = document.getElementById('caption');
    
    modal.style.display = 'block';
    modalImg.src = src;
    caption.innerHTML = alt;
    document.body.style.overflow = 'hidden';
}

function closeImageModal() {
    const modal = document.getElementById('imageModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

document.getElementById('imageModal').onclick = function(event) {
    if (event.target === this) {
        closeImageModal();
    }
}

document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeImageModal();
        closeWelcomeMessage();
    }
});



// Name validation functions
function showNameError(message = 'Please enter a valid real name') {
  $('#nameError span').text(message);
  $('#nameError').show();
  $('#visitorName').addClass('error');
  
  // Remove error styling after animation
  setTimeout(() => {
    $('#visitorName').removeClass('error');
  }, 500);
}

function hideNameError() {
  $('#nameError').hide();
  $('#visitorName').removeClass('error');
  $('#visitorName').css('border-color', '');
}

// Climate-Based Dynamic Theming
function applyClimateTheme(weatherType, temp) {
  const body = document.body;
  const root = document.documentElement;
  
  // Remove all theme classes
  body.classList.remove('theme-hot', 'theme-cold', 'theme-rainy', 'theme-snowy', 'theme-cloudy');
  
  // Apply theme based on weather
  if (weatherType.toLowerCase().includes('rain') || weatherType.toLowerCase().includes('drizzle')) {
    body.classList.add('theme-rainy');
    root.style.setProperty('--primary-color', '#4a90e2');
    root.style.setProperty('--secondary-color', '#5dade2');
    root.style.setProperty('--accent-color', '#3498db');
  } else if (weatherType.toLowerCase().includes('snow')) {
    body.classList.add('theme-snowy');
    root.style.setProperty('--primary-color', '#ecf0f1');
    root.style.setProperty('--secondary-color', '#bdc3c7');
    root.style.setProperty('--accent-color', '#95a5a6');
  } else if (weatherType.toLowerCase().includes('cloud')) {
    body.classList.add('theme-cloudy');
    root.style.setProperty('--primary-color', '#7f8c8d');
    root.style.setProperty('--secondary-color', '#95a5a6');
    root.style.setProperty('--accent-color', '#34495e');
  } else if (temp > 30) {
    body.classList.add('theme-hot');
    root.style.setProperty('--primary-color', '#e74c3c');
    root.style.setProperty('--secondary-color', '#ff6b6b');
    root.style.setProperty('--accent-color', '#c0392b');
  } else if (temp < 10) {
    body.classList.add('theme-cold');
    root.style.setProperty('--primary-color', '#3498db');
    root.style.setProperty('--secondary-color', '#5dade2');
    root.style.setProperty('--accent-color', '#2980b9');
  }
  
  // Add 3D effects and animations
  document.querySelectorAll('.card, .project-card, .timeline-content').forEach(el => {
    el.style.transform = 'translateZ(20px)';
    el.style.transition = 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
  });
}