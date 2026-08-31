import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { 
  Heart, User, Calendar, GraduationCap, 
  Briefcase, MapPin, Phone, CheckCircle2, 
  Send, Sparkles, Star, Users, ShieldCheck, 
  ArrowRight, HeartHandshake, CheckCircle
} from "lucide-react";

import shafi1 from "@/assets/shafi1.png.asset.json";
import shafi2 from "@/assets/shafi2.png.asset.json";
import shafi3 from "@/assets/shafi3.png.asset.json";
import logo from "@/assets/logo.png";

// Import happy couple image assets
import img1 from "@/assets/img-1.jpeg";
import img2 from "@/assets/img-2.jpeg";
import img3 from "@/assets/img-3.jpeg";
import img4 from "@/assets/img-4.jpeg";
import img5 from "@/assets/img-5.jpeg";
import img6 from "@/assets/img-6.jpeg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Bismillah Marriage Bureau — Dudekula & Noor Basha, Guntur" },
      {
        name: "description",
        content:
          "Bismillah Marriage Bureau by Adam Shafi, Guntur. Free matrimonial matches for Muslim Dudekula and Noor Basha families. Telugu & English.",
      },
      { property: "og:title", content: "Bismillah Marriage Bureau — Adam Shafi, Guntur" },
      {
        property: "og:description",
        content:
          "ముస్లిం దూదేకుల / నూర్‌బాషా కుటుంబాల కోసం ఉచిత సంబంధాలు. గుంటూరు నగర కమిటీ.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Landing,
});

type Lang = "te" | "en";

const PHONE = "+919849301201";
const PHONE_DISPLAY = "98493 01201";

// Registration form validation schema using Zod
const registerSchema = z.object({
  fullName: z.string().min(3, { message: "Name must be at least 3 characters / పేరు కనీసం 3 అక్షరాలు ఉండాలి" }),
  gender: z.enum(["Male", "Female"], { required_error: "Please select gender / లింగం ఎంచుకోండి" }),
  sect: z.enum(["Dudekula", "Noor Basha"], { required_error: "Please select sect / శాఖ ఎంచుకోండి" }),
  dob: z.string().min(1, { message: "Date of Birth is required / పుట్టిన తేదీ తప్పనిసరి" }),
  education: z.string().min(2, { message: "Education is required / చదువు తప్పనిసరి" }),
  occupation: z.string().min(2, { message: "Occupation is required / ఉద్యోగం/వ్యాపారం తప్పనిసరి" }),
  city: z.string().min(2, { message: "City/District is required / నివాస స్థలం తప్పనిసరి" }),
  phone: z.string().regex(/^[6-9]\d{9}$/, {
    message: "Enter valid 10-digit mobile number / సరైన 10 అంకెల మొబైల్ నెంబర్ ఇవ్వండి",
  }),
});

type RegisterFormValues = z.infer<typeof registerSchema>;

const t = {
  te: {
    brand: "బిస్మిల్లాహ్ మ్యారేజ్ బ్యూరో",
    sub: "ముస్లిం దూదేకుల / నూర్‌బాషా సంబంధాలు",
    heroTitle: "మంచి సంబంధం — మన సమాజం కోసం",
    heroText:
      "మేము ముస్లిం దూదేకుల మరియు నూర్‌బాషా కుటుంబాల కోసం మాత్రమే సంబంధాలు చూస్తాము. సంబంధం చూడబడి, మీకు నచ్చిన తర్వాత కూడా మేము డబ్బు అడగము — పూర్తిగా ఉచితం. మీ ఇష్టం అయితే, మీ మనసుతో ఏమైనా ఇవ్వాలనుకుంటే ఇవ్వచ్చు. అది మీ ఇష్టం, ఎలాంటి ఫీజు లేదు.",
    call: "ఫోన్ చేయండి",
    whatsapp: "వాట్సాప్",
    freeBadge: "ముస్లిం దూదేకుల / నూర్‌బాషా సంబంధాలు మాత్రమే",
    aboutTitle: "షేక్ ఆదం షాఫీ గారు",
    aboutRole: "గుంటూరు నగర అధ్యక్షులు",
    aboutText:
      "ఆంధ్రప్రదేశ్ నూర్‌బాషా / దూదేకుల వెనుకబడిన ముస్లిం సంక్షేమ సంఘం — గుంటూరు నగర కమిటీ. రిజిస్టర్ నెం. 157/2015. సమాజ సేవలో ఎన్నో సంవత్సరాల అనుభవం. కుటుంబాల మధ్య నమ్మకంతో సంబంధాలు కుదిర్చడమే మా లక్ష్యం.",
    howTitle: "ఎలా పని చేస్తుంది",
    steps: [
      ["1. రిజిస్టర్ చేసుకోండి", "క్రింది ఫామ్ ద్వారా మీ వివరాలు నమోదు చేయండి."],
      ["2. ఫోన్ / వాట్సాప్ చేయండి", "మీ వివరాలు మరియు ఫోటోలను మాకు పంపించండి."],
      ["3. సంబంధాలు చూపిస్తాము", "మన దూదేకుల / నూర్‌బాషా సంబంధాలు మాత్రమే చూపిస్తాము."],
      ["4. పెళ్లి కుదురుతుంది", "పెద్దలు మాట్లాడుకొని పెళ్లి నిశ్చయించుకుంటారు. ఎలాంటి ఫీజు లేదు."],
    ],
    whyTitle: "మా ప్రత్యేకత & నమ్మకం",
    why: [
      ["మన సమాజం మాత్రమే", "ముస్లిం దూదేకుల మరియు నూర్‌బాషా కుటుంబాల సంబంధాలు మాత్రమే ప్రత్యేకంగా చూస్తాము."],
      ["పూర్తి గోప్యత", "మీ వ్యక్తిగత వివరాలు మరియు ఫోటోలను చాలా సురక్షితంగా ఉంచుతాము."],
      ["100% ఉచితం", "డబ్బుతో పనిలేకుండా కేవలం సేవా దృక్పథంతో ఉచితంగా పనిచేస్తాము."],
    ],
    contactTitle: "సంప్రదించండి",
    address:
      "డోర్ నెం. 8-10-97, యస్.వి. రంగారావు బొమ్మ ఎదురు రోడ్, మోతిలాల్ నగర్, నెహ్రూనగర్ 1వ లైన్, గుంటూరు.",
    reg: "రిజిస్టర్ నెం. 157/2015",
    photos: "ఫోటో గ్యాలరీ",
    footer: "గుంటూరు నగర కమిటీ",
    navRegister: "రిజిస్ట్రేషన్",
    navHome: "హోమ్",
    navSuccess: "విజయాలు",
    navAbout: "మా గురించి",
    statsFree: "100% ఉచిత సేవ",
    statsProfiles: "నమ్మకమైన ప్రొఫైల్స్",
    statsCommunity: "మన దూదేకుల / నూర్‌బాషా",
    formTitle: "ఉచిత వివాహ ప్రొఫైల్ నమోదు",
    formSub: "మీ వివరాలను క్రింది ఫామ్‌లో పూరించండి. నమోదు చేసిన వివరాలు వాట్సాప్ ద్వారా పంపి మీ సంబంధాన్ని యాక్టివేట్ చేసుకోండి.",
    formName: "పూర్తి పేరు (వరుడు/వధువు)",
    formGender: "లింగం",
    genderSelect: "లింగం ఎంచుకోండి",
    genderMale: "వరుడు (పురుషుడు)",
    genderFemale: "వధువు (స్త్రీ)",
    formSect: "శాఖ / ఉప-కులం",
    sectSelect: "శాఖ ఎంచుకోండి",
    sectDudekula: "దూదేకుల (Dudekula)",
    sectNoorbasha: "నూర్‌బాషా (Noor Basha)",
    formDob: "పుట్టిన తేదీ",
    formEdu: "విద్యార్హత (ఉదా: B.Tech, Degree, Tenth)",
    formOcc: "ఉద్యోగం / వ్యాపారం (ఉదా: Software Employee, Business)",
    formCity: "నివాస స్థలం (ఊరు & జిల్లా)",
    formPhone: "వాట్సాప్ మొబైల్ నెంబర్",
    formSubmit: "వివరాలను సబ్మిట్ చేయండి",
    formSuccessTitle: "రిజిస్ట్రేషన్ విజయవంతమైంది! 🎉",
    formSuccessMsg: "మీ ప్రొఫైల్ వివరాలు సేవ్ అయ్యాయి. ప్రొఫైల్‌ను వెంటనే యాక్టివేట్ చేయడానికి క్రింది బటన్ నొక్కి వివరాలను ఆదం షాఫీ గారికి వాట్సాప్‌లో పంపండి.",
    sendWhatsapp: "వాట్సాప్‌లో ఆదం షాఫీ గారికి పంపండి",
    storiesTitle: "కుదిరిన సంబంధాలు (Success Stories)",
    storiesSub: "మన బిస్మిల్లాహ్ మ్యారేజ్ బ్యూరో ద్వారా పెళ్ళి కుదిరిన కొన్ని సంతోషకరమైన జంటలు",
    coupleDetails: "వివాహం కుదిరింది",
    requiredFieldError: "ఈ ఫీల్డ్ తప్పనిసరి",
  },
  en: {
    brand: "Bismillah Marriage Bureau",
    sub: "Muslim Dudekula / Noor Basha matches only",
    heroTitle: "Find the perfect match for your family",
    heroText:
      "We arrange matches only for Muslim Dudekula and Noor Basha families. Even after we show you a match and you like it, we do not ask for money — the service is completely free. If you wish, you may give something from your heart. That is entirely your choice; there is no fee.",
    call: "Call now",
    whatsapp: "WhatsApp",
    freeBadge: "Muslim Dudekula / Noor Basha proposals only",
    aboutTitle: "Shaik Adam Shafi",
    aboutRole: "President, Guntur City Committee",
    aboutText:
      "Andhra Pradesh Noor Basha / Dudekula Backward Muslim Welfare Association — Guntur City Committee. Reg. No. 157/2015. Years of service to the community, bringing families together with trust and care.",
    howTitle: "How it works",
    steps: [
      ["1. Register Profile", "Fill in your details in the registration form below."],
      ["2. Call / WhatsApp", "Share your details and photos to verify and activate."],
      ["3. Matchmaking", "We share matches matching Dudekula / Noor Basha criteria."],
      ["4. Alliance Fixed", "Families meet and finalize marriage. No service fee at all."],
    ],
    whyTitle: "Why families trust us",
    why: [
      ["Strictly Our Community", "We only cater to Muslim Dudekula and Noor Basha families."],
      ["Trust & Confidentiality", "Your profile details are kept safe and highly confidential."],
      ["100% Free Service", "We do not charge any fee before or after the marriage is fixed."],
    ],
    contactTitle: "Contact us",
    address:
      "D.No. 8-10-97, Opposite S.V. Ranga Rao Statue Road, Motilal Nagar, Nehru Nagar 1st Line, Guntur.",
    reg: "Reg. No. 157/2015",
    photos: "Photo Gallery",
    footer: "Guntur City Committee",
    navRegister: "Register",
    navHome: "Home",
    navSuccess: "Success",
    navAbout: "About Us",
    statsFree: "100% Free Service",
    statsProfiles: "Verified Profiles",
    statsCommunity: "Dudekula & Noor Basha",
    formTitle: "Free Profile Registration",
    formSub: "Submit your basic details. Once submitted, click the WhatsApp button to share and activate your profile.",
    formName: "Full Name (Groom/Bride)",
    formGender: "Gender",
    genderSelect: "Select Gender",
    genderMale: "Groom (Male)",
    genderFemale: "Bride (Female)",
    formSect: "Sect / Sub-community",
    sectSelect: "Select Sect",
    sectDudekula: "Dudekula",
    sectNoorbasha: "Noor Basha",
    formDob: "Date of Birth",
    formEdu: "Education (e.g., B.Tech, MBA, High School)",
    formOcc: "Occupation (e.g., Software Engineer, Business Owner)",
    formCity: "Resident City & District",
    formPhone: "WhatsApp Mobile Number",
    formSubmit: "Submit Profile",
    formSuccessTitle: "Registration Successful! 🎉",
    formSuccessMsg: "Your details are submitted. To activate your profile, click the button below to send your details directly to Adam Shafi on WhatsApp.",
    sendWhatsapp: "Send Details to Shaik Adam Shafi",
    storiesTitle: "Happy Success Stories",
    storiesSub: "A few happy couples who found their perfect match through Bismillah Marriage Bureau Guntur",
    coupleDetails: "Perfect Match",
    requiredFieldError: "This field is required",
  },
} as const;

// Auto-scrolling success stories array
const successCouples = [
  { name: "Shaik Salim & Reshma", location: "Guntur", regNo: "124/2024", year: "Married 2024", img: img1 },
  { name: "Noorbasha Ghouse & Yasmin", location: "Vijayawada", regNo: "89/2024", year: "Married 2024", img: img2 },
  { name: "Shaik Subhani & Farzana", location: "Narasaraopet", regNo: "215/2023", year: "Married 2023", img: img3 },
  { name: "Dudekula Mowla & Mumtaz", location: "Tenali", regNo: "142/2024", year: "Married 2024", img: img4 },
  { name: "Noorbasha Rabbani & Sameera", location: "Chilakaluripet", regNo: "304/2023", year: "Married 2023", img: img5 },
  { name: "Shaik Mastan & Shabana", location: "Guntur", regNo: "76/2025", year: "Married 2025", img: img6 },
];

function Landing() {
  const [lang, setLang] = useState<Lang>("te");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [registeredData, setRegisteredData] = useState<RegisterFormValues | null>(null);
  
  const c = t[lang];
  const formRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  // Initialize react-hook-form with Zod validation resolver
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data: RegisterFormValues) => {
    setRegisteredData(data);
    setIsSubmitted(true);
    toast.success(lang === "te" ? "వివరాలు విజయవంతంగా నమోదయ్యాయి!" : "Details registered successfully!");
    
    // Auto scroll to success message
    setTimeout(() => {
      successRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 100);
  };

  const getWhatsAppLink = () => {
    if (!registeredData) return "";
    const msg = 
      `*Bismillah Marriage Bureau Registration*\n` +
      `==============================\n` +
      `*Name / పేరు:* ${registeredData.fullName}\n` +
      `*Gender / లింగం:* ${registeredData.gender === "Male" ? (lang === "te" ? "వరుడు (Male)" : "Groom (Male)") : (lang === "te" ? "వధువు (Female)" : "Bride (Female)")}\n` +
      `*Sect / శాఖ:* ${registeredData.sect}\n` +
      `*DOB / పుట్టిన తేదీ:* ${registeredData.dob}\n` +
      `*Education / చదువు:* ${registeredData.education}\n` +
      `*Occupation / ఉద్యోగం:* ${registeredData.occupation}\n` +
      `*City / నివాస స్థలం:* ${registeredData.city}\n` +
      `*WhatsApp Mobile:* ${registeredData.phone}\n` +
      `==============================\n` +
      `దయచేసి నా ప్రొఫైల్ ను యాక్టివేట్ చేయండి. Please activate my profile.`;
    return `https://wa.me/${PHONE.replace("+", "")}?text=${encodeURIComponent(msg)}`;
  };

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground font-sans">
      {/* Sticky Premium Glassmorphic Header */}
      <header className="sticky top-0 z-40 border-b border-border/40 bg-background/80 backdrop-blur-md transition-all">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
          <div className="flex min-w-0 items-center gap-3">
            <div className="relative shrink-0 p-0.5 rounded-xl bg-gradient-to-tr from-primary to-accent">
              <img
                src={logo}
                alt="Bismillah Logo"
                className="h-10 w-10 rounded-lg bg-card object-contain"
              />
            </div>
            <div className="min-w-0">
              <p className="truncate font-display text-lg font-extrabold tracking-tight text-primary sm:text-xl md:text-2xl">
                {c.brand}
              </p>
              <p className="truncate text-xs font-semibold text-secondary">{c.sub}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            {/* Language Switcher */}
            <div className="flex rounded-full border border-border/80 bg-background/50 p-1">
              {(["te", "en"] as Lang[]).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`rounded-full px-3 py-1 text-xs font-bold transition-all duration-300 ${
                    lang === l
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {l === "te" ? "తెలుగు" : "EN"}
                </button>
              ))}
            </div>
            
            {/* Register CTA Button */}
            <button
              onClick={scrollToForm}
              className="hidden md:inline-flex items-center gap-1.5 rounded-full bg-secondary px-5 py-2 text-xs font-bold text-secondary-foreground shadow-soft transition-all duration-300 hover:scale-105 hover:bg-secondary/90 active:scale-95"
            >
              <Sparkles className="h-3.5 w-3.5" />
              {c.navRegister}
            </button>
            
            <a
              href={`tel:${PHONE}`}
              className="rounded-full border border-primary/20 bg-primary/5 hover:bg-primary/10 px-4 py-2 text-xs font-bold text-primary shadow-soft transition-transform hover:scale-105 inline-block"
            >
              {PHONE_DISPLAY}
            </a>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-hero-gradient pb-20 pt-16 md:py-28">
          <div
            aria-hidden="true"
            className="animate-glow pointer-events-none absolute -left-24 -top-24 h-96 w-96 rounded-full bg-primary-glow/30 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="animate-glow pointer-events-none absolute -bottom-32 right-0 h-96 w-96 rounded-full bg-accent/20 blur-3xl"
          />
          
          <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 md:grid-cols-[1.1fr_0.9fr]">
            <div className="text-primary-foreground space-y-6">
              <span className="animate-rise inline-flex items-center gap-2 rounded-full bg-accent/90 px-4.5 py-2 text-xs font-bold text-accent-foreground shadow-card-soft">
                <HeartHandshake className="h-4 w-4 animate-heart text-rose-600" />
                {c.freeBadge}
              </span>
              <h1
                className="animate-rise text-3xl font-extrabold leading-tight tracking-tight drop-shadow-sm sm:text-5xl md:text-6xl"
                style={{ animationDelay: "0.1s" }}
              >
                {c.heroTitle}
              </h1>
              <p
                className="animate-rise max-w-xl text-base leading-relaxed opacity-90 sm:text-lg"
                style={{ animationDelay: "0.2s" }}
              >
                {c.heroText}
              </p>
              
              {/* Premium CTA Buttons */}
              <div
                className="animate-rise flex flex-wrap gap-4 pt-2"
                style={{ animationDelay: "0.3s" }}
              >
                <button
                  onClick={scrollToForm}
                  className="inline-flex items-center gap-2 rounded-full bg-secondary hover:bg-secondary/90 px-7 py-4 text-sm font-bold text-secondary-foreground shadow-card-soft transition-all duration-300 hover:-translate-y-1 hover:scale-105 active:translate-y-0"
                >
                  {c.navRegister} <ArrowRight className="h-4 w-4" />
                </button>
                <a
                  href={`tel:${PHONE}`}
                  className="inline-flex items-center gap-2 rounded-full border-2 border-primary-foreground/75 px-7 py-4 text-sm font-bold text-primary-foreground transition-all duration-300 hover:-translate-y-1 hover:bg-primary-foreground/10"
                >
                  <Phone className="h-4 w-4" /> {c.call}
                </a>
              </div>
            </div>

            {/* Float Premium Card image */}
            <div className="animate-rise relative mx-auto w-full max-w-sm" style={{ animationDelay: "0.15s" }}>
              <div
                aria-hidden="true"
                className="animate-slow-spin absolute -inset-6 rounded-full border-2 border-dashed border-primary-foreground/20"
              />
              <div className="animate-float relative">
                <div className="overflow-hidden rounded-3xl border-4 border-primary-foreground/45 shadow-card bg-card p-1">
                  <img
                    src={shafi3.url}
                    alt={c.aboutTitle}
                    className="w-full rounded-2xl object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 bg-card border border-border/60 p-3 rounded-2xl shadow-card-soft flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-600">
                    <ShieldCheck className="h-6 w-6" />
                  </div>
                  <div>
                    <h5 className="font-bold text-sm text-foreground">{c.reg}</h5>
                    <p className="text-xs text-muted-foreground">{c.footer}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Band Section */}
        <section className="bg-band-gradient py-6 text-secondary-foreground shadow-soft">
          <div className="mx-auto max-w-6xl px-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="space-y-1">
              <p className="text-2xl md:text-3xl font-extrabold text-accent">0/-</p>
              <p className="text-xs md:text-sm font-semibold opacity-90">{c.statsFree}</p>
            </div>
            <div className="space-y-1">
              <p className="text-2xl md:text-3xl font-extrabold text-accent">1000+</p>
              <p className="text-xs md:text-sm font-semibold opacity-90">{c.statsProfiles}</p>
            </div>
            <div className="space-y-1">
              <p className="text-2xl md:text-3xl font-extrabold text-accent">Dudekula</p>
              <p className="text-xs md:text-sm font-semibold opacity-90">{c.statsCommunity}</p>
            </div>
            <div className="space-y-1">
              <p className="text-2xl md:text-3xl font-extrabold text-accent">Noor Basha</p>
              <p className="text-xs md:text-sm font-semibold opacity-90">{c.statsCommunity}</p>
            </div>
          </div>
        </section>

        {/* Auto-scrolling Testimonials Section */}
        <section className="py-16 bg-muted/30 overflow-hidden border-b border-border/30">
          <div className="mx-auto max-w-6xl px-4 text-center mb-10">
            <span className="inline-flex items-center gap-1 text-primary text-xs font-bold tracking-wider uppercase bg-primary/10 px-3.5 py-1.5 rounded-full mb-3">
              <Heart className="h-3 w-3 fill-primary" /> {c.navSuccess}
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight text-primary sm:text-4xl">{c.storiesTitle}</h2>
            <p className="mt-2 text-sm text-muted-foreground max-w-xl mx-auto">{c.storiesSub}</p>
          </div>

          {/* Scrolling Marquee Container */}
          <div className="relative w-full overflow-hidden marquee-paused py-2 select-none">
            {/* Gradient Overlay left */}
            <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
            {/* Gradient Overlay right */}
            <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

            <div className="flex gap-6 w-max animate-marquee">
              {/* Render items twice to allow infinite loop scrolling */}
              {[...successCouples, ...successCouples].map((couple, i) => (
                <div 
                  key={i} 
                  className="match-card relative overflow-hidden flex flex-col shrink-0 w-72 bg-card border border-border/80 rounded-2xl p-4 shadow-card-soft text-left hover:border-primary/40 transition-all duration-300"
                >
                  <div className="relative h-44 w-full rounded-xl overflow-hidden mb-3.5">
                    <img 
                      src={couple.img} 
                      alt={couple.name} 
                      className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500" 
                    />
                    <span className="absolute top-2 right-2 bg-emerald-600/90 backdrop-blur-sm text-white text-[10px] px-2.5 py-1 rounded-full font-bold shadow flex items-center gap-1">
                      <Heart className="h-2.5 w-2.5 fill-white animate-heart" /> {c.coupleDetails}
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-foreground">{couple.name}</h4>
                  <p className="text-xs text-primary font-semibold flex items-center gap-1.5 mt-1">
                    <MapPin className="h-3 w-3" /> {couple.location}
                  </p>
                  <div className="mt-4 flex justify-between items-center text-[10px] text-muted-foreground border-t border-border/60 pt-3">
                    <span>Reg No. {couple.regNo}</span>
                    <span className="text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full">{couple.year}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Shaik Adam Shafi President Section */}
        <section className="mx-auto max-w-6xl px-4 py-16">
          <div className="grid items-center gap-10 md:grid-cols-[0.8fr_1.2fr] bg-card border border-border/60 p-8 rounded-3xl shadow-card-soft">
            <div className="relative group overflow-hidden rounded-2xl shadow-soft">
              <img
                src={shafi1.url}
                alt={c.aboutTitle}
                className="mx-auto w-full max-w-xs object-cover rounded-2xl group-hover:scale-102 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent pointer-events-none" />
            </div>
            <div className="space-y-5">
              <div className="space-y-1">
                <span className="inline-block text-xs font-bold text-primary bg-primary/10 px-3 py-1 rounded-full">{c.reg}</span>
                <h2 className="text-3xl font-extrabold text-primary sm:text-4xl">{c.aboutTitle}</h2>
                <p className="text-sm font-bold text-secondary">{c.aboutRole}</p>
              </div>
              <p className="leading-relaxed text-muted-foreground text-base">{c.aboutText}</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-sm text-foreground/80">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4.5 w-4.5 text-emerald-500 shrink-0" />
                  <span>శ్రీ ఆదం షాఫీ గారి ఆధ్వర్యంలో సేవ</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4.5 w-4.5 text-emerald-500 shrink-0" />
                  <span>100% ఉచిత సంప్రదింపులు</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4.5 w-4.5 text-emerald-500 shrink-0" />
                  <span>నమ్మకమైన సమాజ సేవ</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4.5 w-4.5 text-emerald-500 shrink-0" />
                  <span>వందలాది విజయవంతమైన వివాహాలు</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Profile Registration Form Section */}
        <section ref={formRef} className="bg-muted/40 py-16 border-y border-border/30">
          <div className="mx-auto max-w-xl px-4">
            <div className="text-center mb-8">
              <span className="inline-flex items-center gap-1.5 text-primary text-xs font-bold tracking-wider uppercase bg-primary/10 px-3.5 py-1.5 rounded-full mb-3">
                <Sparkles className="h-3 w-3 text-primary" /> {c.navRegister}
              </span>
              <h2 className="text-3xl font-extrabold tracking-tight text-primary sm:text-4xl">{c.formTitle}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{c.formSub}</p>
            </div>

            {/* Bilingual Form Card */}
            <div className="bg-card border border-border/75 rounded-3xl p-6 sm:p-8 shadow-card">
              {!isSubmitted ? (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  {/* Full Name */}
                  <div className="space-y-1.5">
                    <label htmlFor="fullName" className="text-sm font-bold text-foreground">
                      {c.formName} <span className="text-destructive">*</span>
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      placeholder={lang === "te" ? "పూర్తి పేరు వ్రాయండి" : "Enter full name"}
                      className={`w-full rounded-xl border px-4 py-3 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-primary/20 ${
                        errors.fullName ? "border-destructive focus:border-destructive" : "border-border focus:border-primary"
                      }`}
                      {...register("fullName")}
                    />
                    {errors.fullName && (
                      <p className="text-xs font-semibold text-destructive">{errors.fullName.message}</p>
                    )}
                  </div>

                  {/* Gender and Sub-community in a grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Gender */}
                    <div className="space-y-1.5">
                      <label htmlFor="gender" className="text-sm font-bold text-foreground">
                        {c.formGender} <span className="text-destructive">*</span>
                      </label>
                      <select
                        id="gender"
                        className={`w-full rounded-xl border bg-card px-4 py-3 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-primary/20 ${
                          errors.gender ? "border-destructive focus:border-destructive" : "border-border focus:border-primary"
                        }`}
                        defaultValue=""
                        {...register("gender")}
                      >
                        <option value="" disabled>{c.genderSelect}</option>
                        <option value="Male">{c.genderMale}</option>
                        <option value="Female">{c.genderFemale}</option>
                      </select>
                      {errors.gender && (
                        <p className="text-xs font-semibold text-destructive">{errors.gender.message}</p>
                      )}
                    </div>

                    {/* Sect */}
                    <div className="space-y-1.5">
                      <label htmlFor="sect" className="text-sm font-bold text-foreground">
                        {c.formSect} <span className="text-destructive">*</span>
                      </label>
                      <select
                        id="sect"
                        className={`w-full rounded-xl border bg-card px-4 py-3 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-primary/20 ${
                          errors.sect ? "border-destructive focus:border-destructive" : "border-border focus:border-primary"
                        }`}
                        defaultValue=""
                        {...register("sect")}
                      >
                        <option value="" disabled>{c.sectSelect}</option>
                        <option value="Dudekula">{c.sectDudekula}</option>
                        <option value="Noor Basha">{c.sectNoorbasha}</option>
                      </select>
                      {errors.sect && (
                        <p className="text-xs font-semibold text-destructive">{errors.sect.message}</p>
                      )}
                    </div>
                  </div>

                  {/* Date of Birth */}
                  <div className="space-y-1.5">
                    <label htmlFor="dob" className="text-sm font-bold text-foreground">
                      {c.formDob} <span className="text-destructive">*</span>
                    </label>
                    <input
                      type="date"
                      id="dob"
                      className={`w-full rounded-xl border bg-card px-4 py-3 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-primary/20 ${
                        errors.dob ? "border-destructive focus:border-destructive" : "border-border focus:border-primary"
                      }`}
                      {...register("dob")}
                    />
                    {errors.dob && (
                      <p className="text-xs font-semibold text-destructive">{errors.dob.message}</p>
                    )}
                  </div>

                  {/* Education */}
                  <div className="space-y-1.5">
                    <label htmlFor="education" className="text-sm font-bold text-foreground">
                      {c.formEdu} <span className="text-destructive">*</span>
                    </label>
                    <input
                      type="text"
                      id="education"
                      placeholder={lang === "te" ? "డిగ్రీ లేదా ఇతర చదువు" : "e.g., B.Tech, M.A."}
                      className={`w-full rounded-xl border px-4 py-3 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-primary/20 ${
                        errors.education ? "border-destructive focus:border-destructive" : "border-border focus:border-primary"
                      }`}
                      {...register("education")}
                    />
                    {errors.education && (
                      <p className="text-xs font-semibold text-destructive">{errors.education.message}</p>
                    )}
                  </div>

                  {/* Occupation */}
                  <div className="space-y-1.5">
                    <label htmlFor="occupation" className="text-sm font-bold text-foreground">
                      {c.formOcc} <span className="text-destructive">*</span>
                    </label>
                    <input
                      type="text"
                      id="occupation"
                      placeholder={lang === "te" ? "ఉద్యోగం లేదా వ్యాపారం" : "e.g., Business, Software"}
                      className={`w-full rounded-xl border px-4 py-3 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-primary/20 ${
                        errors.occupation ? "border-destructive focus:border-destructive" : "border-border focus:border-primary"
                      }`}
                      {...register("occupation")}
                    />
                    {errors.occupation && (
                      <p className="text-xs font-semibold text-destructive">{errors.occupation.message}</p>
                    )}
                  </div>

                  {/* City/District */}
                  <div className="space-y-1.5">
                    <label htmlFor="city" className="text-sm font-bold text-foreground">
                      {c.formCity} <span className="text-destructive">*</span>
                    </label>
                    <input
                      type="text"
                      id="city"
                      placeholder={lang === "te" ? "నివాసం ఉంటున్న ఊరు, జిల్లా" : "e.g., Guntur, AP"}
                      className={`w-full rounded-xl border px-4 py-3 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-primary/20 ${
                        errors.city ? "border-destructive focus:border-destructive" : "border-border focus:border-primary"
                      }`}
                      {...register("city")}
                    />
                    {errors.city && (
                      <p className="text-xs font-semibold text-destructive">{errors.city.message}</p>
                    )}
                  </div>

                  {/* WhatsApp Mobile Number */}
                  <div className="space-y-1.5">
                    <label htmlFor="phone" className="text-sm font-bold text-foreground">
                      {c.formPhone} <span className="text-destructive">*</span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-muted-foreground font-semibold">+91</span>
                      <input
                        type="tel"
                        id="phone"
                        placeholder="9876543210"
                        className={`w-full rounded-xl border pl-14 pr-4 py-3 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-primary/20 ${
                          errors.phone ? "border-destructive focus:border-destructive" : "border-border focus:border-primary"
                        }`}
                        {...register("phone")}
                      />
                    </div>
                    {errors.phone && (
                      <p className="text-xs font-semibold text-destructive">{errors.phone.message}</p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-primary hover:bg-primary/95 disabled:bg-primary/70 text-primary-foreground font-bold px-6 py-4.5 text-sm shadow-soft transition-all duration-300 active:scale-99 hover:-translate-y-0.5 cursor-pointer"
                  >
                    {isSubmitting ? c.formValidating : c.formSubmit}
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </form>
              ) : (
                /* Glowing Premium Success Panel */
                <div ref={successRef} className="text-center py-6 space-y-6 animate-rise">
                  <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-emerald-100 text-emerald-600 mb-2">
                    <CheckCircle className="h-10 w-10" />
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-2xl font-extrabold text-emerald-600">{c.formSuccessTitle}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed max-w-sm mx-auto">
                      {c.formSuccessMsg}
                    </p>
                  </div>

                  {/* Registered Data Preview Box */}
                  <div className="border border-border/80 bg-muted/40 rounded-2xl p-4 text-left text-xs space-y-2.5 max-w-sm mx-auto">
                    <div className="flex justify-between border-b border-border/50 pb-1.5">
                      <span className="font-semibold text-muted-foreground">Name:</span>
                      <span className="font-bold text-foreground">{registeredData?.fullName}</span>
                    </div>
                    <div className="flex justify-between border-b border-border/50 pb-1.5">
                      <span className="font-semibold text-muted-foreground">Gender:</span>
                      <span className="font-bold text-foreground">{registeredData?.gender}</span>
                    </div>
                    <div className="flex justify-between border-b border-border/50 pb-1.5">
                      <span className="font-semibold text-muted-foreground">Sect / శాఖ:</span>
                      <span className="font-bold text-foreground">{registeredData?.sect}</span>
                    </div>
                    <div className="flex justify-between border-b border-border/50 pb-1.5">
                      <span className="font-semibold text-muted-foreground">Phone:</span>
                      <span className="font-bold text-foreground">+91 {registeredData?.phone}</span>
                    </div>
                  </div>

                  {/* WhatsApp Action Button */}
                  <div className="pt-2">
                    <a
                      href={getWhatsAppLink()}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold px-6 py-4 text-sm shadow transition-all duration-300 hover:-translate-y-0.5"
                    >
                      <Send className="h-4.5 w-4.5 fill-white" />
                      {c.sendWhatsapp}
                    </a>
                  </div>

                  {/* Back to Form Link */}
                  <div>
                    <button
                      onClick={() => {
                        setIsSubmitted(false);
                        setRegisteredData(null);
                        reset();
                      }}
                      className="text-xs text-muted-foreground underline hover:text-primary transition-colors"
                    >
                      {lang === "te" ? "మరొక ప్రొఫైల్ నమోదు చేయండి" : "Register another profile"}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="bg-background py-16 border-b border-border/30">
          <div className="mx-auto max-w-6xl px-4">
            <div className="text-center mb-12">
              <span className="inline-flex items-center gap-1.5 text-primary text-xs font-bold tracking-wider uppercase bg-primary/10 px-3.5 py-1.5 rounded-full mb-3">
                <Users className="h-3 w-3 text-primary" /> {c.howTitle}
              </span>
              <h2 className="text-3xl font-extrabold tracking-tight text-primary sm:text-4xl">{c.howTitle}</h2>
            </div>
            
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {c.steps.map(([title, body], i) => (
                <div key={title} className="group relative rounded-2xl bg-card border border-border/60 hover:border-primary/30 p-6 shadow-card-soft hover:shadow-soft transition-all duration-300">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground text-sm font-extrabold transition-all duration-300">
                    {i + 1}
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-foreground">{title}</h3>
                  <p className="mt-2 text-xs md:text-sm text-muted-foreground leading-relaxed">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Trust Us Section */}
        <section className="mx-auto max-w-6xl px-4 py-16">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-1.5 text-primary text-xs font-bold tracking-wider uppercase bg-primary/10 px-3.5 py-1.5 rounded-full mb-3">
              <Star className="h-3 w-3 fill-primary text-primary" /> {c.whyTitle}
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight text-primary sm:text-4xl">{c.whyTitle}</h2>
          </div>
          
          <div className="grid gap-6 md:grid-cols-3">
            {c.why.map(([title, body]) => (
              <div
                key={title}
                className="relative overflow-hidden rounded-2xl border border-border/80 bg-card hover:border-secondary/40 p-7 shadow-card-soft hover:shadow-soft transition-all duration-300 group"
              >
                <div className="absolute top-0 left-0 w-2.5 h-full bg-secondary" />
                <h3 className="text-lg font-extrabold text-secondary pl-2 group-hover:translate-x-1 transition-transform duration-300">{title}</h3>
                <p className="mt-3 text-xs md:text-sm text-muted-foreground leading-relaxed pl-2">{body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Photo Gallery Section */}
        <section className="bg-muted/30 py-16 border-y border-border/30">
          <div className="mx-auto max-w-6xl px-4">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-extrabold tracking-tight text-primary sm:text-4xl">{c.photos}</h2>
            </div>
            
            <div className="grid gap-6 sm:grid-cols-3">
              {[shafi1, shafi2, shafi3].map((img, i) => (
                <div key={i} className="group relative overflow-hidden rounded-2xl shadow-card-soft">
                  <img
                    src={img.url}
                    alt={`${c.aboutTitle} ${i + 1}`}
                    loading="lazy"
                    className="h-76 w-full rounded-2xl object-cover object-top hover:scale-103 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Info Section */}
        <section className="mx-auto max-w-6xl px-4 py-16">
          <div className="rounded-3xl bg-hero-gradient p-8 text-primary-foreground shadow-card sm:p-12 relative overflow-hidden">
            <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-accent/20 blur-2xl pointer-events-none" />
            <h2 className="text-2xl font-extrabold sm:text-4xl tracking-tight">{c.contactTitle}</h2>
            <p className="mt-4 max-w-xl leading-relaxed text-sm md:text-base opacity-90">{c.address}</p>
            
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href={`tel:${PHONE}`}
                className="inline-flex items-center gap-2 rounded-full bg-secondary hover:bg-secondary/95 px-7 py-3.5 text-sm font-bold text-secondary-foreground shadow-card-soft transition-transform hover:scale-105 active:scale-98"
              >
                <Phone className="h-4.5 w-4.5" />
                {c.call} · {PHONE_DISPLAY}
              </a>
              <a
                href={`https://wa.me/${PHONE.replace("+", "")}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border-2 border-primary-foreground/70 hover:bg-primary-foreground/15 px-7 py-3.5 text-sm font-bold transition-all"
              >
                <Send className="h-4.5 w-4.5" />
                {c.whatsapp}
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/80 bg-card py-10 text-center text-xs md:text-sm text-muted-foreground space-y-2">
        <p className="font-bold text-primary">{c.brand} · {c.footer}</p>
        <p className="opacity-75">{c.reg} · All Rights Reserved</p>
      </footer>
    </div>
  );
}
