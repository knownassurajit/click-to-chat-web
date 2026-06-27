// Click to Chat Web - Core Application Logic

// Comprehensive Country Code Database
const COUNTRIES = [
  { name: "Afghanistan", code: "AF", dial: "93", flag: "🇦🇫" },
  { name: "Albania", code: "AL", dial: "355", flag: "🇦🇱" },
  { name: "Algeria", code: "DZ", dial: "213", flag: "🇩🇿" },
  { name: "Andorra", code: "AD", dial: "376", flag: "🇦🇩" },
  { name: "Angola", code: "AO", dial: "244", flag: "🇦🇴" },
  { name: "Argentina", code: "AR", dial: "54", flag: "🇦🇷" },
  { name: "Armenia", code: "AM", dial: "374", flag: "🇦🇲" },
  { name: "Australia", code: "AU", dial: "61", flag: "🇦🇺" },
  { name: "Austria", code: "AT", dial: "43", flag: "🇦🇹" },
  { name: "Azerbaijan", code: "AZ", dial: "994", flag: "🇦🇿" },
  { name: "Bahamas", code: "BS", dial: "1", flag: "🇧🇸" },
  { name: "Bahrain", code: "BH", dial: "973", flag: "🇧🇭" },
  { name: "Bangladesh", code: "BD", dial: "880", flag: "🇧🇩" },
  { name: "Barbados", code: "BB", dial: "1", flag: "🇧🇧" },
  { name: "Belarus", code: "BY", dial: "375", flag: "🇧🇾" },
  { name: "Belgium", code: "BE", dial: "32", flag: "🇧🇪" },
  { name: "Belize", code: "BZ", dial: "501", flag: "🇧🇿" },
  { name: "Benin", code: "BJ", dial: "229", flag: "🇧🇯" },
  { name: "Bhutan", code: "BT", dial: "975", flag: "🇧🇹" },
  { name: "Bolivia", code: "BO", dial: "591", flag: "🇧🇴" },
  { name: "Bosnia & Herzegovina", code: "BA", dial: "387", flag: "🇧🇦" },
  { name: "Botswana", code: "BW", dial: "267", flag: "🇧🇼" },
  { name: "Brazil", code: "BR", dial: "55", flag: "🇧🇷" },
  { name: "Brunei", code: "BN", dial: "673", flag: "🇧🇳" },
  { name: "Bulgaria", code: "BG", dial: "359", flag: "🇧🇬" },
  { name: "Burkina Faso", code: "BF", dial: "226", flag: "🇧🇫" },
  { name: "Burundi", code: "BI", dial: "257", flag: "🇧🇮" },
  { name: "Cambodia", code: "KH", dial: "855", flag: "🇰🇭" },
  { name: "Cameroon", code: "CM", dial: "237", flag: "🇨🇲" },
  { name: "Canada", code: "CA", dial: "1", flag: "🇨🇦" },
  { name: "Chile", code: "CL", dial: "56", flag: "🇨🇱" },
  { name: "China", code: "CN", dial: "86", flag: "🇨🇳" },
  { name: "Colombia", code: "CO", dial: "57", flag: "🇨🇴" },
  { name: "Costa Rica", code: "CR", dial: "506", flag: "🇨🇷" },
  { name: "Croatia", code: "HR", dial: "385", flag: "🇭🇷" },
  { name: "Cuba", code: "CU", dial: "53", flag: "🇨🇺" },
  { name: "Cyprus", code: "CY", dial: "357", flag: "🇨🇾" },
  { name: "Czechia", code: "CZ", dial: "420", flag: "🇨🇿" },
  { name: "Denmark", code: "DK", dial: "45", flag: "🇩🇰" },
  { name: "Dominican Republic", code: "DO", dial: "1", flag: "🇩🇴" },
  { name: "Ecuador", code: "EC", dial: "593", flag: "🇪🇨" },
  { name: "Egypt", code: "EG", dial: "20", flag: "🇪🇬" },
  { name: "El Salvador", code: "SV", dial: "503", flag: "🇸🇻" },
  { name: "Estonia", code: "EE", dial: "372", flag: "🇪🇪" },
  { name: "Ethiopia", code: "ET", dial: "251", flag: "🇪🇹" },
  { name: "Fiji", code: "FJ", dial: "679", flag: "🇫🇯" },
  { name: "Finland", code: "FI", dial: "358", flag: "🇫🇮" },
  { name: "France", code: "FR", dial: "33", flag: "🇫🇷" },
  { name: "Georgia", code: "GE", dial: "995", flag: "🇬🇪" },
  { name: "Germany", code: "DE", dial: "49", flag: "🇩🇪" },
  { name: "Ghana", code: "GH", dial: "233", flag: "🇬🇭" },
  { name: "Greece", code: "GR", dial: "30", flag: "🇬🇷" },
  { name: "Guatemala", code: "GT", dial: "502", flag: "🇬🇹" },
  { name: "Haiti", code: "HT", dial: "509", flag: "🇭🇹" },
  { name: "Honduras", code: "HN", dial: "504", flag: "🇭🇳" },
  { name: "Hong Kong", code: "HK", dial: "852", flag: "🇭🇰" },
  { name: "Hungary", code: "HU", dial: "36", flag: "🇭🇺" },
  { name: "Iceland", code: "IS", dial: "354", flag: "🇮🇸" },
  { name: "India", code: "IN", dial: "91", flag: "🇮🇳" },
  { name: "Indonesia", code: "ID", dial: "62", flag: "🇮🇩" },
  { name: "Iran", code: "IR", dial: "98", flag: "🇮🇷" },
  { name: "Iraq", code: "IQ", dial: "964", flag: "🇮🇶" },
  { name: "Ireland", code: "IE", dial: "353", flag: "🇮🇪" },
  { name: "Israel", code: "IL", dial: "972", flag: "🇮🇱" },
  { name: "Italy", code: "IT", dial: "39", flag: "🇮🇹" },
  { name: "Jamaica", code: "JM", dial: "1", flag: "🇯🇲" },
  { name: "Japan", code: "JP", dial: "81", flag: "🇯🇵" },
  { name: "Jordan", code: "JO", dial: "962", flag: "🇯🇴" },
  { name: "Kazakhstan", code: "KZ", dial: "7", flag: "🇰🇿" },
  { name: "Kenya", code: "KE", dial: "254", flag: "🇰🇪" },
  { name: "Kuwait", code: "KW", dial: "965", flag: "🇰🇼" },
  { name: "Kyrgyzstan", code: "KG", dial: "996", flag: "🇰🇬" },
  { name: "Laos", code: "LA", dial: "856", flag: "🇱🇦" },
  { name: "Latvia", code: "LV", dial: "371", flag: "🇱🇻" },
  { name: "Lebanon", code: "LB", dial: "961", flag: "🇱🇧" },
  { name: "Libya", code: "LY", dial: "218", flag: "🇱🇾" },
  { name: "Liechtenstein", code: "LI", dial: "423", flag: "🇱🇮" },
  { name: "Lithuania", code: "LT", dial: "370", flag: "🇱🇹" },
  { name: "Luxembourg", code: "LU", dial: "352", flag: "🇱🇺" },
  { name: "Macau", code: "MO", dial: "853", flag: "🇲🇴" },
  { name: "Madagascar", code: "MG", dial: "261", flag: "🇲🇬" },
  { name: "Malawi", code: "MW", dial: "265", flag: "🇲🇼" },
  { name: "Malaysia", code: "MY", dial: "60", flag: "🇲🇾" },
  { name: "Maldives", code: "MV", dial: "960", flag: "🇲🇻" },
  { name: "Mali", code: "ML", dial: "223", flag: "🇲🇱" },
  { name: "Malta", code: "MT", dial: "356", flag: "🇲🇹" },
  { name: "Mauritius", code: "MU", dial: "230", flag: "🇲🇺" },
  { name: "Mexico", code: "MX", dial: "52", flag: "🇲🇽" },
  { name: "Moldova", code: "MD", dial: "373", flag: "🇲🇩" },
  { name: "Monaco", code: "MC", dial: "377", flag: "🇲🇨" },
  { name: "Mongolia", code: "MN", dial: "976", flag: "🇲🇳" },
  { name: "Montenegro", code: "ME", dial: "382", flag: "🇲🇪" },
  { name: "Morocco", code: "MA", dial: "212", flag: "🇲🇦" },
  { name: "Mozambique", code: "MZ", dial: "258", flag: "🇲🇿" },
  { name: "Myanmar", code: "MM", dial: "95", flag: "🇲🇲" },
  { name: "Namibia", code: "NA", dial: "264", flag: "🇳🇦" },
  { name: "Nepal", code: "NP", dial: "977", flag: "🇳🇵" },
  { name: "Netherlands", code: "NL", dial: "31", flag: "🇳🇱" },
  { name: "New Zealand", code: "NZ", dial: "64", flag: "🇳🇿" },
  { name: "Nicaragua", code: "NI", dial: "505", flag: "🇳🇮" },
  { name: "Niger", code: "NE", dial: "227", flag: "🇳🇪" },
  { name: "Nigeria", code: "NG", dial: "234", flag: "🇳🇬" },
  { name: "North Korea", code: "KP", dial: "850", flag: "🇰🇵" },
  { name: "North Macedonia", code: "MK", dial: "389", flag: "🇲🇰" },
  { name: "Norway", code: "NO", dial: "47", flag: "🇳🇴" },
  { name: "Oman", code: "OM", dial: "968", flag: "🇴🇲" },
  { name: "Pakistan", code: "PK", dial: "92", flag: "🇵🇰" },
  { name: "Palestine", code: "PS", dial: "970", flag: "🇵🇸" },
  { name: "Panama", code: "PA", dial: "507", flag: "🇵🇦" },
  { name: "Paraguay", code: "PY", dial: "595", flag: "🇵🇾" },
  { name: "Peru", code: "PE", dial: "51", flag: "🇵🇪" },
  { name: "Philippines", code: "PH", dial: "63", flag: "🇵🇭" },
  { name: "Poland", code: "PL", dial: "48", flag: "🇵🇱" },
  { name: "Portugal", code: "PT", dial: "351", flag: "🇵🇹" },
  { name: "Puerto Rico", code: "PR", dial: "1", flag: "🇵🇷" },
  { name: "Qatar", code: "QA", dial: "974", flag: "🇶🇦" },
  { name: "Romania", code: "RO", dial: "40", flag: "🇷🇴" },
  { name: "Russia", code: "RU", dial: "7", flag: "🇷🇺" },
  { name: "Rwanda", code: "RW", dial: "250", flag: "🇷🇼" },
  { name: "Samoa", code: "WS", dial: "685", flag: "🇼🇸" },
  { name: "San Marino", code: "SM", dial: "378", flag: "🇸🇲" },
  { name: "Saudi Arabia", code: "SA", dial: "966", flag: "🇸🇦" },
  { name: "Senegal", code: "SN", dial: "221", flag: "🇸🇳" },
  { name: "Serbia", code: "RS", dial: "381", flag: "🇷🇸" },
  { name: "Seychelles", code: "SC", dial: "248", flag: "🇸🇨" },
  { name: "Sierra Leone", code: "SL", dial: "232", flag: "🇸🇱" },
  { name: "Singapore", code: "SG", dial: "65", flag: "🇸🇬" },
  { name: "Slovakia", code: "SK", dial: "421", flag: "🇸🇰" },
  { name: "Slovenia", code: "SI", dial: "386", flag: "🇸🇮" },
  { name: "Somalia", code: "SO", dial: "252", flag: "🇸🇴" },
  { name: "South Africa", code: "ZA", dial: "27", flag: "🇿🇦" },
  { name: "South Korea", code: "KR", dial: "82", flag: "🇰🇷" },
  { name: "Spain", code: "ES", dial: "34", flag: "🇪🇸" },
  { name: "Sri Lanka", code: "LK", dial: "94", flag: "🇱🇰" },
  { name: "Sudan", code: "SD", dial: "249", flag: "🇸🇩" },
  { name: "Sweden", code: "SE", dial: "46", flag: "🇸🇪" },
  { name: "Switzerland", code: "CH", dial: "41", flag: "🇨🇭" },
  { name: "Syria", code: "SY", dial: "963", flag: "🇸🇾" },
  { name: "Taiwan", code: "TW", dial: "886", flag: "🇹🇼" },
  { name: "Tajikistan", code: "TJ", dial: "992", flag: "🇹🇯" },
  { name: "Tanzania", code: "TZ", dial: "255", flag: "🇹🇿" },
  { name: "Thailand", code: "TH", dial: "66", flag: "🇹🇭" },
  { name: "Togo", code: "TG", dial: "228", flag: "🇹🇬" },
  { name: "Trinidad & Tobago", code: "TT", dial: "1", flag: "🇹🇹" },
  { name: "Tunisia", code: "TN", dial: "216", flag: "🇹🇳" },
  { name: "Turkey", code: "TR", dial: "90", flag: "🇹🇷" },
  { name: "Turkmenistan", code: "TM", dial: "993", flag: "🇹🇲" },
  { name: "Uganda", code: "UG", dial: "256", flag: "🇺🇬" },
  { name: "Ukraine", code: "UA", dial: "380", flag: "🇺🇦" },
  { name: "United Arab Emirates", code: "AE", dial: "971", flag: "🇦🇪" },
  { name: "United Kingdom", code: "GB", dial: "44", flag: "🇬🇧" },
  { name: "United States", code: "US", dial: "1", flag: "🇺🇸" },
  { name: "Uruguay", code: "UY", dial: "598", flag: "🇺🇾" },
  { name: "Uzbekistan", code: "UZ", dial: "998", flag: "🇺🇿" },
  { name: "Venezuela", code: "VE", dial: "58", flag: "🇻🇪" },
  { name: "Vietnam", code: "VN", dial: "84", flag: "🇻🇳" },
  { name: "Yemen", code: "YE", dial: "967", flag: "🇾🇪" },
  { name: "Zambia", code: "ZM", dial: "260", flag: "🇿🇲" },
  { name: "Zimbabwe", code: "ZW", dial: "263", flag: "🇿🇼" }
];

// Major Timezone to ISO Country Code Mapping for fallback region detection
const TZ_MAP = {
  "Asia/Kolkata": "IN",
  "Asia/Calcutta": "IN",
  "Europe/London": "GB",
  "Europe/Dublin": "IE",
  "Asia/Singapore": "SG",
  "Asia/Tokyo": "JP",
  "Australia/Sydney": "AU",
  "Australia/Melbourne": "AU",
  "Europe/Paris": "FR",
  "Europe/Berlin": "DE",
  "Europe/Rome": "IT",
  "Europe/Madrid": "ES",
  "America/New_York": "US",
  "America/Chicago": "US",
  "America/Denver": "US",
  "America/Los_Angeles": "US",
  "America/Toronto": "CA",
  "America/Vancouver": "CA",
  "America/Mexico_City": "MX",
  "America/Sao_Paulo": "BR",
  "Asia/Dubai": "AE",
  "Africa/Cairo": "EG",
  "Africa/Johannesburg": "ZA",
  "Europe/Amsterdam": "NL",
  "Europe/Brussels": "BE",
  "Europe/Stockholm": "SE",
  "Europe/Zurich": "CH"
};

// Global state variables
let selectedCountry = null;
let currentSanitizedNumber = "";
let sessionHistory = [];

// DOM Elements
const elCountryTrigger = document.getElementById("country-trigger");
const elCountryFlag = document.getElementById("selected-flag");
const elCountryCodeText = document.getElementById("selected-code");
const elPhoneInput = document.getElementById("phone-number");
const elPhoneTextField = document.getElementById("phone-textfield");
const elPhoneErrorText = document.getElementById("phone-error-text");
const elOpenChatBtn = document.getElementById("btn-open-chat");
const elCopyLinkBtn = document.getElementById("btn-copy-link");
const elLinkDisplay = document.getElementById("generated-link");
const elPopover = document.getElementById("country-popover");
const elSearchInput = document.getElementById("country-search");
const elCountryList = document.getElementById("country-list");
const elHistoryList = document.getElementById("history-list");
const elHistoryEmpty = document.getElementById("history-empty");
const elClearHistoryBtn = document.getElementById("btn-clear-history");
const elToast = document.getElementById("toast-message");

/**
 * Initializes the application
 */
function init() {
  setupCountrySelector();
  detectUserRegion();
  loadHistory();
  
  // Attach event listeners
  elPhoneInput.addEventListener("input", handlePhoneInput);
  elPhoneInput.addEventListener("paste", handlePhonePaste);
  elPhoneInput.addEventListener("blur", () => {
    if (elPhoneInput.value === "") {
      elPhoneTextField.classList.remove("is-active");
    }
  });
  elPhoneInput.addEventListener("focus", () => {
    elPhoneTextField.classList.add("is-active");
  });
  elSearchInput.addEventListener("input", handleSearchInput);
  
  // Handle Escape key or outside clicks for Popover
  document.addEventListener("click", handleOutsideClick);
  elPhoneInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !elOpenChatBtn.disabled) {
      openChat();
    }
  });
  
  updateValidation();
  
  // Set body loaded to trigger fade-in transition
  document.body.classList.add("loaded");
}

/**
 * Detects the user's home region and selects the corresponding country
 */
function detectUserRegion() {
  let detectedCode = "";

  // 1. Check browser languages (most reliable local signal)
  const navLang = navigator.language || (navigator.languages && navigator.languages[0]);
  if (navLang && navLang.includes("-")) {
    detectedCode = navLang.split("-")[1].toUpperCase();
  }

  // 2. Check timezone mapping
  if (!detectedCode) {
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      if (tz && TZ_MAP[tz]) {
        detectedCode = TZ_MAP[tz];
      }
    } catch (e) {
      console.warn("Timezone detection failed:", e);
    }
  }

  // Find country in our list
  let detectedCountry = COUNTRIES.find(c => c.code === detectedCode);
  
  // Default fallback to US (+1) or India (+91) if nothing detected
  if (!detectedCountry) {
    detectedCountry = COUNTRIES.find(c => c.code === "IN") || COUNTRIES[0];
  }

  selectCountry(detectedCountry);
}

/**
 * Sets up the Custom Country Selector Popover
 */
function setupCountrySelector() {
  renderCountryItems(COUNTRIES);
  
  // Custom Dropdown toggle
  elCountryTrigger.addEventListener("click", (e) => {
    e.stopPropagation();
    const isHidden = elPopover.style.display === "none";
    if (isHidden) {
      elPopover.style.display = "flex";
      elSearchInput.value = "";
      renderCountryItems(COUNTRIES); // Reset list to full
      setTimeout(() => elSearchInput.focus(), 50);
    } else {
      elPopover.style.display = "none";
    }
  });
}

/**
 * Renders country buttons in the selector popover list
 */
function renderCountryItems(list) {
  elCountryList.innerHTML = "";
  
  if (list.length === 0) {
    const emptyMsg = document.createElement("div");
    emptyMsg.className = "history-empty";
    emptyMsg.textContent = "No countries found";
    elCountryList.appendChild(emptyMsg);
    return;
  }
  
  list.forEach(country => {
    const btn = document.createElement("button");
    btn.className = "country-item";
    btn.type = "button";
    btn.innerHTML = `
      <span class="country-flag">${country.flag}</span>
      <span class="country-item-name">${country.name}</span>
      <span class="country-item-dial">+${country.dial}</span>
    `;
    btn.addEventListener("click", () => {
      selectCountry(country);
      closePopover();
      elPhoneInput.focus();
    });
    elCountryList.appendChild(btn);
  });
}

/**
 * Handles typing in the country search input
 */
function handleSearchInput() {
  const query = elSearchInput.value.toLowerCase().trim();
  
  const filtered = COUNTRIES.filter(country => 
    country.name.toLowerCase().includes(query) || 
    country.dial.includes(query) || 
    country.code.toLowerCase().includes(query)
  );
  
  renderCountryItems(filtered);
}

/**
 * Selects a country and updates UI
 */
function selectCountry(country) {
  selectedCountry = country;
  elCountryFlag.textContent = country.flag;
  elCountryCodeText.textContent = `+${country.dial}`;
  updateValidation();
}

/**
 * Closes the country selector popover
 */
function closePopover() {
  elPopover.style.display = "none";
}

/**
 * Handles clicks outside the popover to close it (for compatibility/robustness)
 */
function handleOutsideClick(e) {
  const container = document.getElementById("country-textfield");
  if (container && !container.contains(e.target)) {
    closePopover();
  }
}

/**
 * Automatically sanitizes characters that are not digits
 */
function sanitizeInput(text) {
  // Remove spaces, dashes, parentheses, dots, non-digit chars
  return text.replace(/[^\d]/g, "");
}

/**
 * Handles pasting numbers into the field.
 * Detects if a full country-code number was pasted, parses it and sets the country selector automatically.
 */
function handlePhonePaste(e) {
  e.preventDefault();
  const pastedText = (e.clipboardData || window.clipboardData).getData("text");
  
  // Clean string
  let cleaned = pastedText.trim();
  
  // 1. Detect if it has a leading plus or starts with 00 (e.g. +91 9876543210 or 00447911123456)
  let isFullNumber = false;
  if (cleaned.startsWith("+")) {
    isFullNumber = true;
    cleaned = cleaned.substring(1);
  } else if (cleaned.startsWith("00")) {
    isFullNumber = true;
    cleaned = cleaned.substring(2);
  }
  
  // Remove dashes, spaces, brackets
  cleaned = sanitizeInput(cleaned);
  
  if (isFullNumber) {
    // Try to match dial code by sorting COUNTRIES by dial code length descending (longest dial prefix matches first)
    const sortedCountries = [...COUNTRIES].sort((a, b) => b.dial.length - a.dial.length);
    const matched = sortedCountries.find(c => cleaned.startsWith(c.dial));
    
    if (matched) {
      selectCountry(matched);
      const remainingNumber = cleaned.substring(matched.dial.length);
      // Remove leading zeroes if any from remaining number
      elPhoneInput.value = remainingNumber.replace(/^0+/, "");
      triggerInputActive();
      return;
    }
  }
  
  // Default behavior: just strip non-digits and insert
  elPhoneInput.value = sanitizeInput(cleaned).replace(/^0+/, "");
  triggerInputActive();
}

/**
 * Handles standard inputs (stripping non-digits)
 */
function handlePhoneInput() {
  const originalVal = elPhoneInput.value;
  const sanitized = sanitizeInput(originalVal);
  
  // Remove leading zeros
  const withoutLeadingZeros = sanitized.replace(/^0+/, "");
  
  if (originalVal !== withoutLeadingZeros) {
    elPhoneInput.value = withoutLeadingZeros;
  }
  
  triggerInputActive();
}

/**
 * Manages floating label active class
 */
function triggerInputActive() {
  if (elPhoneInput.value !== "") {
    elPhoneTextField.classList.add("is-active");
  } else {
    elPhoneTextField.classList.remove("is-active");
  }
  updateValidation();
}

/**
 * Validates the inputs and updates UI actions/link
 */
function updateValidation() {
  currentSanitizedNumber = elPhoneInput.value.trim();
  
  const fullNumber = selectedCountry ? `${selectedCountry.dial}${currentSanitizedNumber}` : currentSanitizedNumber;
  
  // Update generated link output
  if (currentSanitizedNumber) {
    elLinkDisplay.textContent = `wa.me/${fullNumber}`;
  } else {
    elLinkDisplay.textContent = "wa.me/...";
  }
  
  // Validation Rules: Must have a number, must be between 4 and 15 digits (ITU-T E.164 rule for phone numbers)
  const isValidLength = currentSanitizedNumber.length >= 4 && currentSanitizedNumber.length <= 15;
  const isNotEmpty = currentSanitizedNumber.length > 0;
  
  if (!isNotEmpty) {
    elPhoneTextField.classList.remove("has-error");
    elPhoneErrorText.textContent = "";
    elOpenChatBtn.disabled = true;
    elCopyLinkBtn.disabled = true;
  } else if (!isValidLength) {
    elPhoneTextField.classList.add("has-error");
    elPhoneErrorText.textContent = "Number must be between 4 and 15 digits";
    elOpenChatBtn.disabled = true;
    elCopyLinkBtn.disabled = true;
  } else {
    elPhoneTextField.classList.remove("has-error");
    elPhoneErrorText.textContent = "";
    elOpenChatBtn.disabled = false;
    elCopyLinkBtn.disabled = false;
  }
}

/**
 * Opens WhatsApp chat redirecting the user immediately
 */
function openChat() {
  if (elOpenChatBtn.disabled) return;
  
  const fullNumber = `${selectedCountry.dial}${currentSanitizedNumber}`;
  const url = `https://wa.me/${fullNumber}`;
  
  // Save to history before opening
  saveToHistory(selectedCountry.dial, currentSanitizedNumber, selectedCountry.flag);
  
  window.open(url, "_blank");
}

/**
 * Generates and copies the wa.me link to the clipboard
 */
function copyLink() {
  if (elCopyLinkBtn.disabled) return;
  
  const fullNumber = `${selectedCountry.dial}${currentSanitizedNumber}`;
  const url = `https://wa.me/${fullNumber}`;
  
  navigator.clipboard.writeText(url)
    .then(() => {
      showToast("Link copied to clipboard!");
    })
    .catch((err) => {
      // Fallback
      const textArea = document.createElement("textarea");
      textArea.value = url;
      textArea.style.position = "fixed";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        document.execCommand('copy');
        showToast("Link copied to clipboard!");
      } catch (err2) {
        showToast("Failed to copy link.");
      }
      document.body.removeChild(textArea);
    });
}

/**
 * Displays an Material 3 Style Toast message
 */
function showToast(message) {
  elToast.querySelector(".toast-text").textContent = message;
  elToast.classList.add("show");
  
  // Hide toast after 3 seconds
  setTimeout(() => {
    elToast.classList.remove("show");
  }, 3000);
}

// ---------- LOCAL STORAGE HISTORY persistence ----------

const HISTORY_KEY = "click_to_chat_history";

/**
 * Loads the dialing history from localStorage
 */
function loadHistory() {
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    sessionHistory = raw ? JSON.parse(raw) : [];
  } catch (e) {
    sessionHistory = [];
  }
  
  renderHistory();
}

/**
 * Saves a dialing record to localStorage, maintaining a maximum of 5 entries
 */
function saveToHistory(dial, number, flag) {
  const timestamp = Date.now();
  
  // Deduplicate: remove existing entry of the same number
  sessionHistory = sessionHistory.filter(item => !(item.dial === dial && item.number === number));
  
  // Add new item to front of the array
  sessionHistory.unshift({ dial, number, flag, timestamp });
  
  // Slice to keep only last 5 numbers
  sessionHistory = sessionHistory.slice(0, 5);
  
  localStorage.setItem(HISTORY_KEY, JSON.stringify(sessionHistory));
  renderHistory();
}

/**
 * Renders the session history list
 */
function renderHistory() {
  elHistoryList.innerHTML = "";
  
  if (sessionHistory.length === 0) {
    elHistoryEmpty.style.display = "block";
    elClearHistoryBtn.style.display = "none";
    return;
  }
  
  elHistoryEmpty.style.display = "none";
  elClearHistoryBtn.style.display = "block";
  
  sessionHistory.forEach((item, index) => {
    const row = document.createElement("div");
    row.className = "history-item-row";
    row.style.animationDelay = `${index * 0.05}s`;
    
    // Formatting display
    const readableNumber = `+${item.dial} ${item.number.replace(/(\d{3,4})(?=\d)/g, "$1 ")}`;
    const relativeTime = getRelativeTime(item.timestamp);
    
    row.innerHTML = `
      <button class="history-click-area" type="button">
        <span class="country-flag">${item.flag}</span>
        <div class="history-number-info">
          <span class="history-number">${readableNumber}</span>
          <span class="history-time">${relativeTime}</span>
        </div>
      </button>
      <button class="btn-delete-history" type="button" title="Delete record">
        <span class="material-symbols-outlined" style="font-size:18px">delete</span>
      </button>
    `;
    
    // Clicking history item restores prefix/number
    row.querySelector(".history-click-area").addEventListener("click", () => {
      // Find country matching dial code
      const matched = COUNTRIES.find(c => c.dial === item.dial && c.flag === item.flag) || 
                      COUNTRIES.find(c => c.dial === item.dial);
      if (matched) {
        selectCountry(matched);
      } else {
        // Safe fallback
        selectedCountry = { dial: item.dial, flag: item.flag || "🌐" };
        elCountryFlag.textContent = selectedCountry.flag;
        elCountryCodeText.textContent = `+${selectedCountry.dial}`;
      }
      
      elPhoneInput.value = item.number;
      triggerInputActive();
      elPhoneInput.focus();
    });
    
    // Delete action
    row.querySelector(".btn-delete-history").addEventListener("click", (e) => {
      e.stopPropagation();
      deleteHistoryItem(item.dial, item.number, row);
    });
    
    elHistoryList.appendChild(row);
  });
}

/**
 * Deletes a single history item with animations
 */
function deleteHistoryItem(dial, number, element) {
  // Slide out animation
  element.style.transform = "translateX(50px)";
  element.style.opacity = "0";
  element.style.transition = "transform 0.25s, opacity 0.25s";
  
  setTimeout(() => {
    sessionHistory = sessionHistory.filter(item => !(item.dial === dial && item.number === number));
    localStorage.setItem(HISTORY_KEY, JSON.stringify(sessionHistory));
    renderHistory();
  }, 250);
}

/**
 * Clears all history items
 */
function clearAllHistory() {
  if (confirm("Are you sure you want to clear your local session history? This action cannot be undone.")) {
    sessionHistory = [];
    localStorage.removeItem(HISTORY_KEY);
    renderHistory();
    showToast("Session history cleared");
  }
}

/**
 * Formats timestamps into a relative friendly text (e.g. "Just now", "2 min ago")
 */
function getRelativeTime(timestamp) {
  const diff = Date.now() - timestamp;
  const mins = Math.floor(diff / 60000);
  const hrs = Math.floor(mins / 60);
  const days = Math.floor(hrs / 24);
  
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins} min${mins > 1 ? "s" : ""} ago`;
  if (hrs < 24) return `${hrs} hr${hrs > 1 ? "s" : ""} ago`;
  return `${days} day${days > 1 ? "s" : ""} ago`;
}

// Clear all history trigger setup
elClearHistoryBtn.addEventListener("click", clearAllHistory);

// Initialize on page load or immediately if already loaded
if (document.readyState === "loading") {
  window.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
