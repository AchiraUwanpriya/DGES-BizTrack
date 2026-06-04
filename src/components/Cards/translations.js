import React from "react";
import {
  Box,
  Chip,
  Menu,
  MenuItem,
  IconButton,
  Typography,
} from "@mui/material";
import LanguageIcon from "@mui/icons-material/Language";

export const caregiverTranslations = {
  en: {
    reservationDetails: "Reservation Details",
    reservationNumber: "Reservation Number",
    bungalow: "Bungalow",
    guestName: "Guest Name",
    currentStatus: "Current Status",
    guestCount: "Guest Count",
    adults: "Adults",
    children: "Children",
    total: "Total",
    capacity: "Capacity",
    guestsMaximum: "guests maximum",
    updateStatus: "Update Status",
    selectAction: "Select the appropriate action for this reservation",
    checkInGuest: "Check In Guest",
    checkInDescription: "Guest is arriving and entering the bungalow",
    checkOutGuest: "Check Out Guest",
    checkOutDescription: "Guest is leaving the bungalow",
    bungalowCondition: "Bungalow Condition After Checkout",
    bungalowConditionQuestion: "How is the bungalow condition?",
    checkedOutWithoutIssue: "Checked out without any issue",
    checkedOutWithIssues: "Checked out with some issues",
    contactInstructions: "If You have any issues, Please Contact Mr. Kumara.",
    cancel: "Cancel",
    confirmCheckIn: "Confirm Check-In",
    confirmCheckOut: "Confirm Check-Out",
    updateStatusButton: "Update Status",
    processing: "Processing...",
    na: "N/A",
    mainBungalow: "Main Bungalow",
    lowerGardenSuite: "Lower Garden Suite Bungalow",

    // new
    pageTitle: "Bungalow Caretaker Portal",
    pageSubtitle: "Manage bungalow check-in and checkout operations",
    refresh: "Refresh",
    cardView: "Card View",
    listView: "List View",
    back: "Back",
    history: "History",
    current: "Current",
    checkIn: "Check In",
    checkOut: "Check Out",
    viewFeedback: "View Feedback",
    feedback: "Feedback",
    allBungalows: "All Bungalows",
    mainBungalowShort: "Main",
    lowerGardenSuiteShort: "Lower Garden Suite",
    tableBungalow: "Bungalow",
    tableStatus: "Status",
    tableGuest: "Guest",
    tableGuestCount: "Guest Count",
    tableCheckInOut: "Check-In/Out",
    tableActions: "Actions",
    cardReservation: "Reservation",
    cardGuest: "Guest",
    cardCheckIn: "Check-In",
    cardCheckOut: "Check-Out",
    loadingData: "Loading bungalow data...",
    noResultsFound: "No Results Found",
    noBungalowsMatch:
      "No bungalows match your search criteria. Try adjusting your search terms.",
    noPendingReservations: "No pending reservations found.",
    noBungalowReservations: "No bungalow reservations found.",
    overCapacity: "Over Capacity!",

    confirmed: "Confirmed",
    checkedIn: "Checked In",
    checkedOut: "Checked Out",
    pending: "Pending",
    maintenanceNeeded: "Maintenance Needed",

    // Feedback Dialog Translations
    badCondition: "Bad",
    agreed: "Agreed",
    guestFeedback: "Guest Feedback",
    caregiverResponse: "Caregiver Response",
    noGuestFeedback: "No guest feedback provided",
    noCaregiverResponse: "No caregiver response yet",
    guestFeedbackTitle: "Guest Feedback",
    reservation: "Reservation",
    loadingFeedback: "Loading feedback details...",
    errorLoading: "Error Loading Feedback",
    totalFeedbackEntries: "Total Feedback Entries",
    reviewExperience: "Review guest experience and responses",
    checkOutGuest: "Check Out Guest",
    noFeedbackAvailable: "No Feedback Available",
    noFeedbackDescription:
      "There are currently no feedback entries for this reservation.",
    close: "Close",
    feedback: "Feedback",
    viewfeadback: "View Feedback",
  },
  si: {
    reservationDetails: "වෙන්කිරීම් විස්තර",
    reservationNumber: "වෙන්කිරීම් අංකය",
    bungalow: "බංගලාව",
    guestName: "අමුත්තාගේ නම",
    currentStatus: "වත්මන් තත්වය",
    guestCount: "අමුත්තන්ගේ ගණන",
    adults: "වැඩිහිටියන්",
    children: "ළමයින්",
    total: "මුළු",
    capacity: "මුළු ධාරිතාව",
    guestsMaximum: "අමුත්තන් උපරිමය",
    updateStatus: "තත්වය යාවත්කාලීන කරන්න",
    selectAction: "මෙම වෙන්කිරීම සඳහා සුදුසු ක්‍රියාමාර්ගය තෝරන්න",
    checkInGuest: "අමුත්තා ඇතුළු වීම",
    checkInDescription: "අමුත්තා පැමිණ බංගලාවට ඇතුළු වෙමින් සිටී",
    checkOutGuest: "අමුත්තා පිටවීම",
    checkOutDescription: "අමුත්තා බංගලාවෙන් පිටව යනවා",
    bungalowCondition: "පිටවීමෙන් පසු බංගලාවේ තත්වය",
    bungalowConditionQuestion: "බංගලාවේ තත්වය කෙසේද?",
    checkedOutWithoutIssue: "කිසිදු ගැටළුවකින් තොරව පිටව ගියා",
    checkedOutWithIssues: "සමහර ගැටළු සමඟ පිටව ගියා",
    contactInstructions: "ඔබට කිසියම් ගැටළුවක් ඇත්නම්, කුමාර මහතා අමතන්න.",
    cancel: "අවලංගු කරන්න",
    confirmCheckIn: "ඇතුළු වීම තහවුරු කරන්න",
    confirmCheckOut: "පිටවීම තහවුරු කරන්න",
    updateStatusButton: "තත්වය යාවත්කාලීන කරන්න",
    processing: "සැකසෙමින්...",
    na: "නැත",
    mainBungalow: "ප්‍රධාන බංගලාව",
    lowerGardenSuite: "පහළ ගෙවතු කාමර බංගලාව",

    // new

    pageTitle: "බංගලාවේ රැකවරණ නිලධාරී ද්වාරය",
    pageSubtitle: "බංගලා ඇතුල්වීම් සහ පිටවීම් කටයුතු කළමනාකරණය කරන්න",
    refresh: "යාවත්කාලීන කරන්න",
    cardView: "කාඩ් දර්ශනය",
    listView: "ලැයිස්තු දර්ශනය",
    back: "ආපසු",
    history: "ඉතිහාසය",
    current: "වත්මන්",
    checkIn: "ඇතුල්වීම",
    checkOut: "පිටවීම",
    viewFeedback: "ප්‍රතිපෝෂණ බලන්න",
    feedback: "ප්‍රතිපෝෂණය",
    allBungalows: "සියළු බංගලා",
    mainBungalowShort: "ප්‍රධාන",
    lowerGardenSuiteShort: "පහළ ගෙවතු කාමර",
    tableBungalow: "බංගලාව",
    tableStatus: "තත්වය",
    tableGuest: "අමුත්තා",
    tableGuestCount: "අමුත්තන්ගේ ගණන",
    tableCheckInOut: "ඇතුල්වීම/පිටවීම",
    tableActions: "ක්‍රියා",
    cardReservation: "වෙන්කිරීම",
    cardGuest: "අමුත්තා",
    cardCheckIn: "ඇතුල්වීම",
    cardCheckOut: "පිටවීම",
    loadingData: "බංගලා දත්ත පූරණය වෙමින්...",
    noResultsFound: "ප්‍රතිපල හමු නොවීය",
    noBungalowsMatch:
      "ඔබගේ සෙවුම් නිර්ණායක සමඟ ගැලපෙන බංගලා හමු නොවීය. ඔබගේ සෙවුම් නිර්ණායක සකස් කරන්න.",
    noPendingReservations: "පොරොත්තුවෙන් ඉතිරිව ඇති වෙන්කිරීම් හමු නොවීය.",
    noBungalowReservations: "බංගලා වෙන්කිරීම් හමු නොවීය.",
    overCapacity: "ධාරිතාව ඉක්මවා ඇත!",

    confirmed: "තහවුරු කරන ලදී",
    checkedIn: "ඇතුල් වී ඇත",
    checkedOut: "පිටවී ඇත",
    pending: "පොරොත්තුවෙන්",
    maintenanceNeeded: "නඩත්තුව අවශ්‍යයි",

    badCondition: "නරක",
    agreed: "එකඟ",
    guestFeedback: "අමුත්තාගේ ප්‍රතිපෝෂණය",
    caregiverResponse: "රැකවරණ නිලධාරියාගේ ප්‍රතිචාරය",
    noGuestFeedback: "අමුත්තාගේ ප්‍රතිපෝෂණයක් සපයා නොමැත",
    noCaregiverResponse: "රැකවරණ නිලධාරියාගේ ප්‍රතිචාරයක් තවම නොමැත",
    guestFeedbackTitle: "අමුත්තාගේ ප්‍රතිපෝෂණය",
    reservation: "වෙන්කිරීම",
    loadingFeedback: "ප්‍රතිපෝෂණ විස්තර පූරණය වෙමින්...",
    errorLoading: "ප්‍රතිපෝෂණ පූරණය කිරීමේ දෝෂයකි",
    totalFeedbackEntries: "මුළු ප්‍රතිපෝෂණ ඇතුලත් කිරීම්",
    reviewExperience: "අමුත්තාගේ අත්දැකීම් සහ ප්‍රතිචාර සමාලෝචනය කරන්න",
    checkOutGuest: "අමුත්තා පිටවීම",
    noFeedbackAvailable: "ප්‍රතිපෝෂණ නැත",
    noFeedbackDescription:
      "මෙම වෙන්කිරීම සඳහා දැනට ප්‍රතිපෝෂණ ඇතුලත් කිරීම් නොමැත.",
    close: "වසන්න",
    feedback: "ප්‍රතිපෝෂණය",
    viewfeadback: "ප්‍රතිපෝෂණය බලන්න",
  },
  ta: {
    reservationDetails: "முன்பதிவு விவரங்கள்",
    reservationNumber: "முன்பதிவு எண்",
    bungalow: "பங்களா",
    guestName: "விருந்தினர் பெயர்",
    currentStatus: "தற்போதைய நிலை",
    guestCount: "விருந்தினர்கள் எண்ணிக்கை",
    adults: "வயது வந்தோர்",
    children: "குழந்தைகள்",
    total: "மொத்தம்",
    capacity: "கொள்ளளவு",
    guestsMaximum: "விருந்தினர்கள் அதிகபட்சம்",
    updateStatus: "நிலையை புதுப்பிக்கவும்",
    selectAction:
      "இந்த முன்பதிவுக்கு பொருத்தமான நடவடிக்கையைத் தேர்ந்தெடுக்கவும்",
    checkInGuest: "விருந்தினர் சேர்க்கை",
    checkInDescription: "விருந்தினர் வந்து பங்களாவில் நுழைகிறார்",
    checkOutGuest: "விருந்தினர் வெளியேறுதல்",
    checkOutDescription: "விருந்தினர் பங்களாவை விட்டு வெளியேறுகிறார்",
    bungalowCondition: "வெளியேறிய பின் பங்களா நிலை",
    bungalowConditionQuestion: "பங்களாவின் நிலை எப்படி?",
    checkedOutWithoutIssue: "எந்த சிக்கலும் இல்லாமல் வெளியேறியது",
    checkedOutWithIssues: "சில சிக்கல்களுடன் வெளியேறியது",
    contactInstructions:
      "உங்களுக்கு ஏதேனும் சிக்கல் இருந்தால், திரு. குமாரவை தொடர்பு கொள்ளவும்.",
    cancel: "ரத்து செய்",
    confirmCheckIn: "சேர்க்கை உறுதி செய்",
    confirmCheckOut: "வெளியேறுதல் உறுதி செய்",
    updateStatusButton: "நிலையை புதுப்பிக்கவும்",
    processing: "செயல்படுத்துகிறது...",
    na: "இல்லை",
    mainBungalow: "முக்கிய பங்களா",
    lowerGardenSuite: "கீழ் தோட்டம் சூட் பங்களா",

    //new
    pageTitle: "பங்களா காப்பாளர் நுழைவாயில்",
    pageSubtitle:
      "பங்களா சேர்க்கை மற்றும் வெளியேறல் நடவடிக்கைகளை நிர்வகிக்கவும்",
    refresh: "புதுப்பிக்கவும்",
    cardView: "அட்டை காட்சி",
    listView: "பட்டியல் காட்சி",
    back: "பின் செல்ல",
    history: "வரலாறு",
    current: "தற்போதைய",
    checkIn: "சேர்க்கை",
    checkOut: "வெளியேறுதல்",
    viewFeedback: "கருத்துகளைக் காண்க",
    feedback: "கருத்து",
    allBungalows: "அனைத்து பங்களாக்கள்",
    mainBungalowShort: "முக்கிய",
    lowerGardenSuiteShort: "கீழ் தோட்டம் சூட்",
    tableBungalow: "பங்களா",
    tableStatus: "நிலை",
    tableGuest: "விருந்தினர்",
    tableGuestCount: "விருந்தினர் எண்ணிக்கை",
    tableCheckInOut: "சேர்க்கை/வெளியேறுதல்",
    tableActions: "செயல்கள்",
    cardReservation: "முன்பதிவு",
    cardGuest: "விருந்தினர்",
    cardCheckIn: "சேர்க்கை",
    cardCheckOut: "வெளியேறுதல்",
    loadingData: "பங்களா தரவு ஏற்றப்படுகிறது...",
    noResultsFound: "முடிவுகள் எதுவும் கிடைக்கவில்லை",
    noBungalowsMatch:
      "உங்கள் தேடல் அளவுகோல்களுடன் பொருந்தக்கூடிய பங்களாக்கள் இல்லை. உங்கள் தேடல் விதிமுறைகளை சரிசெய்ய முயற்சிக்கவும்.",
    noPendingReservations:
      "நிலுவையில் உள்ள முன்பதிவுகள் எதுவும் கிடைக்கவில்லை.",
    noBungalowReservations: "பங்களா முன்பதிவுகள் எதுவும் கிடைக்கவில்லை.",
    overCapacity: "திறன் மீறியது!",

    // Status translations
    confirmed: "உறுதிப்படுத்தப்பட்டது",
    checkedIn: "சேர்ந்துவிட்டது",
    checkedOut: "வெளியேறியது",
    pending: "நிலுவையில்",
    maintenanceNeeded: "பராமரிப்பு தேவை",

    badCondition: "மோசமான",
    agreed: "ஏற்றுக்கொள்ளப்பட்டது",
    guestFeedback: "விருந்தினர் கருத்து",
    caregiverResponse: "காப்பாளர் பதில்",
    noGuestFeedback: "விருந்தினர் கருத்து வழங்கப்படவில்லை",
    noCaregiverResponse: "காப்பாளர் பதில் இன்னும் இல்லை",
    guestFeedbackTitle: "விருந்தினர் கருத்து",
    reservation: "முன்பதிவு",
    loadingFeedback: "கருத்து விவரங்கள் ஏற்றப்படுகின்றன...",
    errorLoading: "கருத்தை ஏற்றுவதில் பிழை",
    totalFeedbackEntries: "மொத்த கருத்து உள்ளீடுகள்",
    reviewExperience: "விருந்தினர் அனுபவம் மற்றும் பதில்களை மதிப்பாய்வு செய்க",
    checkOutGuest: "விருந்தினர் வெளியேறுதல்",
    noFeedbackAvailable: "கருத்து இல்லை",
    noFeedbackDescription:
      "இந்த முன்பதிவிற்கு தற்போது கருத்து உள்ளீடுகள் இல்லை.",
    close: "மூடு",
    feedback: "கருத்து",
    viewfeadback: "கருத்துக்களைப் பார்க்கவும்",
  },
  hi: {
    reservationDetails: "आरक्षण विवरण",
    reservationNumber: "आरक्षण संख्या",
    bungalow: "बंगला",
    guestName: "अतिथि का नाम",
    currentStatus: "वर्तमान स्थिति",
    guestCount: "अतिथि गणना",
    adults: "वयस्क",
    children: "बच्चे",
    total: "कुल",
    capacity: "क्षमता",
    guestsMaximum: "अतिथि अधिकतम",
    updateStatus: "स्थिति अपडेट करें",
    selectAction: "इस आरक्षण के लिए उचित कार्रवाई चुनें",
    checkInGuest: "अतिथि चेक-इन",
    checkInDescription: "अतिथि आ रहा है और बंगले में प्रवेश कर रहा है",
    checkOutGuest: "अतिथि चेक-आउट",
    checkOutDescription: "अतिथि बंगला छोड़ रहा है",
    bungalowCondition: "चेक-आउट के बाद बंगले की स्थिति",
    bungalowConditionQuestion: "बंगले की स्थिति कैसी है?",
    checkedOutWithoutIssue: "बिना किसी समस्या के चेक-आउट किया",
    checkedOutWithIssues: "कुछ समस्याओं के साथ चेक-आउट किया",
    contactInstructions:
      "यदि आपको कोई समस्या है, तो कृपया श्री कुमार से संपर्क करें।",
    cancel: "रद्द करें",
    confirmCheckIn: "चेक-इन की पुष्टि करें",
    confirmCheckOut: "चेक-आउट की पुष्टि करें",
    updateStatusButton: "स्थिति अपडेट करें",
    processing: "प्रक्रिया कर रहा है...",
    na: "नहीं",
    mainBungalow: "मुख्य बंगला",
    lowerGardenSuite: "लोअर गार्डन सूट बंगला",

    // new

    pageTitle: "बंगला केयरटेकर पोर्टल",
    pageSubtitle: "बंगला चेक-इन और चेक-आउट संचालन प्रबंधित करें",
    refresh: "ताज़ा करें",
    cardView: "कार्ड दृश्य",
    listView: "सूची दृश्य",
    back: "वापस",
    history: "इतिहास",
    current: "वर्तमान",
    checkIn: "चेक-इन",
    checkOut: "चेक-आउट",
    viewFeedback: "प्रतिक्रिया देखें",
    feedback: "प्रतिक्रिया",
    allBungalows: "सभी बंगले",
    mainBungalowShort: "मुख्य",
    lowerGardenSuiteShort: "लोअर गार्डन सूट",
    tableBungalow: "बंगला",
    tableStatus: "स्थिति",
    tableGuest: "अतिथि",
    tableGuestCount: "अतिथि गणना",
    tableCheckInOut: "चेक-इन/आउट",
    tableActions: "कार्य",
    cardReservation: "आरक्षण",
    cardGuest: "अतिथि",
    cardCheckIn: "चेक-इन",
    cardCheckOut: "चेक-आउट",
    loadingData: "बंगला डेटा लोड हो रहा है...",
    noResultsFound: "कोई परिणाम नहीं मिला",
    noBungalowsMatch:
      "आपकी खोज मापदंडों से मेल खाने वाला कोई बंगला नहीं मिला। अपनी खोज शर्तों को समायोजित करने का प्रयास करें।",
    noPendingReservations: "कोई लंबित आरक्षण नहीं मिला।",
    noBungalowReservations: "कोई बंगला आरक्षण नहीं मिला।",
    overCapacity: "क्षमता से अधिक!",

    // Status translations
    confirmed: "पुष्टि की गई",
    checkedIn: "चेक-इन किया गया",
    checkedOut: "चेक-आउट किया गया",
    pending: "लंबित",
    maintenanceNeeded: "रखरखाव आवश्यक",

    badCondition: "खराब",
    agreed: "सहमत",
    guestFeedback: "अतिथि प्रतिक्रिया",
    caregiverResponse: "कर्ता प्रतिक्रिया",
    noGuestFeedback: "कोई अतिथि प्रतिक्रिया प्रदान नहीं की गई",
    noCaregiverResponse: "अभी तक कोई करता प्रतिक्रिया नहीं",
    guestFeedbackTitle: "अतिथि प्रतिक्रिया",
    reservation: "आरक्षण",
    loadingFeedback: "प्रतिक्रिया विवरण लोड हो रहा है...",
    errorLoading: "प्रतिक्रिया लोड करने में त्रुटि",
    totalFeedbackEntries: "कुल प्रतिक्रिया प्रविष्टियाँ",
    reviewExperience: "अतिथि अनुभव और प्रतिक्रियाओं की समीक्षा करें",
    checkOutGuest: "अतिथि चेक-आउट",
    noFeedbackAvailable: "कोई प्रतिक्रिया उपलब्ध नहीं",
    noFeedbackDescription:
      "इस आरक्षण के लिए वर्तमान में कोई प्रतिक्रिया प्रविष्टियाँ नहीं हैं।",
    close: "बंद करें",
    feedback: "प्रतिक्रिया",
    viewfeadback: "प्रतिक्रिया देखें",
  },
};

export const LanguageSelector = ({ currentLanguage, onLanguageChange }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const languages = [
    { code: "en", name: "English", flag: "🇺🇸", nativeName: "English" },
    { code: "si", name: "සිංහල", flag: "🇱🇰", nativeName: "සිංහල" },
    { code: "ta", name: "தமிழ்", flag: "🇱🇰", nativeName: "தமிழ்" },
    { code: "hi", name: "हिन्दी", flag: "🇮🇳", nativeName: "हिन्दी" },
  ];

  const currentLang =
    languages.find((lang) => lang.code === currentLanguage) || languages[0];

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLanguageSelect = (langCode) => {
    onLanguageChange(langCode);
    handleClose();
  };

  return (
    <Box sx={{ mb: 2 }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 1,
        }}
      >
        <Typography variant="subtitle2" color="text.secondary">
          Select Language
        </Typography>
        <IconButton
          onClick={handleClick}
          sx={{
            border: "1px solid",
            borderColor: "divider",
            borderRadius: 1,
            p: 1,
            minWidth: 120,
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <LanguageIcon fontSize="small" />
            <Typography variant="body2" sx={{ ml: 1 }}>
              {currentLang.flag} {currentLang.name}
            </Typography>
          </Box>
        </IconButton>
      </Box>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            mt: 1,
            minWidth: 150,
            maxHeight: 300,
          },
        }}
      >
        {languages.map((lang) => (
          <MenuItem
            key={lang.code}
            onClick={() => handleLanguageSelect(lang.code)}
            selected={currentLanguage === lang.code}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              py: 1.5,
              backgroundColor:
                currentLanguage === lang.code
                  ? "action.selected"
                  : "transparent",
              "&:hover": {
                backgroundColor: "action.hover",
              },
            }}
          >
            <Box sx={{ fontSize: "1.2rem" }}>{lang.flag}</Box>
            <Box sx={{ flexGrow: 1 }}>
              <Typography
                variant="body2"
                fontWeight={currentLanguage === lang.code ? 600 : 400}
              >
                {lang.name}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {lang.nativeName}
              </Typography>
            </Box>
            {currentLanguage === lang.code && (
              <Box sx={{ color: "primary.main", ml: 1 }}>✓</Box>
            )}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

// Alternative: Simple Select Dropdown Version
export const SimpleLanguageSelector = ({
  currentLanguage,
  onLanguageChange,
}) => {
  const languages = [
    { code: "en", name: "English", flag: "🇺🇸" },
    { code: "si", name: "සිංහල", flag: "🇱🇰" },
    { code: "ta", name: "தமிழ்", flag: "🇱🇰" },
    { code: "hi", name: "हिन्दी", flag: "🇮🇳" },
  ];

  const currentLang =
    languages.find((lang) => lang.code === currentLanguage) || languages[0];

  return (
    <Box sx={{ mb: 2 }}>
      <Typography variant="subtitle2" color="text.secondary" gutterBottom>
        Select Language
      </Typography>
      <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
        {languages.map((lang) => (
          <Chip
            key={lang.code}
            label={`${lang.flag} ${lang.name}`}
            onClick={() => onLanguageChange(lang.code)}
            color={currentLanguage === lang.code ? "primary" : "default"}
            variant={currentLanguage === lang.code ? "filled" : "outlined"}
            size="medium"
            sx={{
              cursor: "pointer",
              minWidth: 100,
              justifyContent: "center",
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

export const ButtonLanguageSelector = ({
  currentLanguage,
  onLanguageChange,
}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const languages = [
    { code: "en", name: "English", flag: "🇺🇸" },
    { code: "si", name: "සිංහල", flag: "🇱🇰" },
    { code: "ta", name: "தமிழ்", flag: "🇱🇰" },
    { code: "hi", name: "हिन्दी", flag: "🇮🇳" },
  ];

  const currentLang =
    languages.find((lang) => lang.code === currentLanguage) || languages[0];

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLanguageSelect = (langCode) => {
    onLanguageChange(langCode);
    handleClose();
  };

  return (
    <Box>
      <Chip
        icon={<LanguageIcon />}
        label={`${currentLang.flag} ${currentLang.name}`}
        onClick={handleClick}
        variant="outlined"
        sx={{ cursor: "pointer", mb: 2 }}
      />

      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        {languages.map((lang) => (
          <MenuItem
            key={lang.code}
            onClick={() => handleLanguageSelect(lang.code)}
            selected={currentLanguage === lang.code}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Box sx={{ fontSize: "1.2rem" }}>{lang.flag}</Box>
              <Typography>{lang.name}</Typography>
              {currentLanguage === lang.code && (
                <Box sx={{ color: "primary.main", ml: 1 }}>✓</Box>
              )}
            </Box>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};
