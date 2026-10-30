export const company = {
  name: 'Home Facility Services', phone: '7708241218', telephone: '+917708241218',
  landline: '044-46406372', landlineTelephone: '+914446406372',
  whatsapp: '917708241218', manpower: 400, locations: 120, clientCount: 30,
  email: 'hr@homefacilityservices.in', address: 'No. 01, Perumal Kovil Street, Koyambedu, Chennai, Tamil Nadu – 600 107.',
};
export const serviceCities = ['Chennai', 'Vellore', 'Hosur'] as const;
export const serviceAreaLabel = 'Chennai, Vellore and Hosur';
export const services = [
  { slug: 'housekeeping', title: 'Housekeeping', icon: 'sparkles', image: 'home/cleaning.jpg', label: 'A fresh start, every day.', description: 'Create a clean, comfortable and welcoming environment with professional housekeeping personnel.', details: 'Our housekeeping teams work around the needs of your premises, with an emphasis on hygiene, presentation and consistent service. We support corporate offices, healthcare spaces, hospitality businesses and residential buildings.', features: ['Trained housekeeping personnel', 'Attention to hygiene and presentation', 'Site-specific service requirements', 'Coordination with your operations team'] },
  { slug: 'security', title: 'Security services', icon: 'shield', image: 'services/security.jpg', label: 'Confidence in every corner.', description: 'Dependable security officers and on-site personnel for your everyday operational needs.', details: 'We provide security personnel matched to the needs of your premises. Our team works with your management to understand on-site demands and support a professional, coordinated approach to facility security.', features: ['Security officers and personnel', 'On-site coordination', 'Support for public safety planning', 'Service tailored to your premises'] },
  { slug: 'water-wash', title: 'Water wash', icon: 'droplets', image: 'services/water-wash.jpg', label: 'Care that makes a difference.', description: 'Vehicle water wash services planned around your location and business operations.', details: 'Keep vehicle presentation a priority with water wash support. We discuss the requirements of your location and coordinate the people and services needed to suit your operation.', features: ['Vehicle cleaning support', 'Location-specific planning', 'Personnel matched to your requirements', 'Coordination around your operations'] },
  { slug: 'plumbing', title: 'Plumbing', icon: 'wrench', image: 'services/plumbing.jpg', label: 'Keep the essentials flowing.', description: 'Practical plumbing support for the systems your property depends on.', details: 'Our technical personnel help address the plumbing needs of your facility. We start by understanding your site and its requirements, then coordinate appropriate support with your team.', features: ['Technical personnel', 'Facility plumbing support', 'Assessment of site requirements', 'Flexible service arrangements'] },
  { slug: 'electrical-maintenance', title: 'Electrical maintenance', icon: 'zap', image: 'services/electrical.png', label: 'Support behind your everyday.', description: 'Electrical maintenance personnel and support tailored to your workplace.', details: 'We help businesses coordinate electrical maintenance needs through technical personnel and a practical, site-focused approach. Speak with our team to discuss the scope and requirements of your premises.', features: ['Electrical maintenance support', 'Technical staffing', 'Site-specific coordination', 'Service scope agreed with your team'] },
  { slug: 'staffing', title: 'Staffing & outsourcing', icon: 'users', image: 'home/workplace.jpg', label: 'The right people. In the right place.', description: 'Flexible permanent and temporary personnel to support your facility and operations.', details: 'Our staffing services help businesses meet changing workforce requirements. HFS supplies personnel on permanent and temporary arrangements, with training and coordination to support the demands of each site.', features: ['Permanent and temporary staffing', 'Housekeeping, security and technical teams', 'Staff supply in Chennai, Vellore and Hosur', 'Training and management coordination'] },
] as const;
export type Service = (typeof services)[number];
export const clients = [
  {
    "name": "Mercedes-Benz",
    "image": "clients/automobile-image2.png",
    "category": "Automobile"
  },
  {
    "name": "Volvo",
    "image": "clients/automobile-image8.png",
    "category": "Automobile"
  },
  {
    "name": "Morris Garages service center & showroom",
    "image": "clients/automobile-image3.jpeg",
    "category": "Automobile"
  },
  {
    "name": "Kia",
    "image": "clients/automobile-image10.png",
    "category": "Automobile"
  },
  {
    "name": "NEXA",
    "image": "clients/automobile-image4.jpeg",
    "category": "Automobile"
  },
  {
    "name": "Tata Motors",
    "image": "clients/automobile-image6.png",
    "category": "Automobile"
  },
  {
    "name": "Popular Vehicles & Services",
    "image": "clients/automobile-image1.jpeg",
    "category": "Automobile"
  },
  {
    "name": "FPL Hyundai",
    "image": "clients/automobile-image5.png",
    "category": "Automobile"
  },
  {
    "name": "Renault",
    "image": "clients/automobile-image7.jpeg",
    "category": "Automobile"
  },
  {
    "name": "SVM Cars",
    "image": "clients/automobile-image9.png",
    "category": "Automobile"
  },
  {
    "name": "Cresco",
    "image": "clients/automobile-image11.png",
    "category": "Automobile"
  },
  {
    "name": "PPS TATA",
    "image": "clients/automobile-image12.png",
    "category": "Automobile"
  },
  {
    "name": "Indus Motors",
    "image": "clients/automobile-image13.jpeg",
    "category": "Automobile"
  },
  {
    "name": "TAFE Access Limited — Tata Motors",
    "image": "clients/automobile-image14.jpeg",
    "category": "Automobile"
  },
  {
    "name": "Elektronika",
    "image": "clients/corporate-offices-image1.png",
    "category": "Corporate offices"
  },
  {
    "name": "IBC Tamil",
    "image": "clients/corporate-offices-image2.jpeg",
    "category": "Corporate offices"
  },
  {
    "name": "VST Group",
    "image": "clients/corporate-offices-image3.jpg",
    "category": "Corporate offices"
  },
  {
    "name": "Hyundai Merchant Marine",
    "image": "clients/corporate-offices-image4.png",
    "category": "Corporate offices"
  },
  {
    "name": "KS Academy",
    "image": "clients/corporate-offices-image5.jpeg",
    "category": "Corporate offices"
  },
  {
    "name": "Spark Minda",
    "image": "clients/factory-image1.jpg",
    "category": "Factory"
  },
  {
    "name": "Deco De Trend",
    "image": "clients/factory-image2.png",
    "category": "Factory"
  },
  {
    "name": "BabyScience IVF Clinics",
    "image": "clients/hospitality-image1.jpg",
    "category": "Healthcare"
  },
  {
    "name": "ACS Medical College and Hospital",
    "image": "clients/hospitality-image2.jpeg",
    "category": "Healthcare"
  },
  {
    "name": "GP Homes",
    "image": "clients/residential-image1.png",
    "category": "Residential"
  },
  {
    "name": "Bungalow 8",
    "image": "clients/residential-image2.jpeg",
    "category": "Residential"
  },
  {
    "name": "One Crest Apartments",
    "image": "clients/residential-image3.jpeg",
    "category": "Residential"
  },
  {
    "name": "Kora Food Street",
    "image": "clients/restaurents-image1.jpeg",
    "category": "Restaurants"
  },
  {
    "name": "Junior Kuppanna",
    "image": "clients/restaurents-image2.png",
    "category": "Restaurants"
  },
  {
    "name": "Lyfe by Soul Garden Bistro",
    "image": "clients/restaurents-image3.png",
    "category": "Restaurants"
  },
  {
    "name": "cult.fit",
    "image": "clients/retail-image1.png",
    "category": "Retail"
  },
  {
    "name": "V-Mart Unlimited",
    "image": "clients/retail-image2.jpeg",
    "category": "Retail"
  },
  {
    "name": "TenderCuts",
    "image": "clients/retail-image3.png",
    "category": "Retail"
  }
];
export const steps = [
  { title: 'Tell us about your space', text: 'We start with your premises, your people and the way your business works.' },
  { title: 'Find the right fit', text: 'Together, we define the service scope and staffing requirements for your site.' },
  { title: 'Put care into practice', text: 'Our teams bring coordination, professionalism and attention to everyday details.' },
];
