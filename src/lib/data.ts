export const company = {
  name: 'Home Facility Services', phone: '+91 80720 07850', telephone: '+918072007850',
  email: 'hr@homefacilityservices.in', address: 'No. 01, Perumal Kovil Street, Koyambedu, Chennai, Tamil Nadu – 600 107.',
};
export const services = [
  { slug: 'housekeeping', title: 'Housekeeping', icon: 'sparkles', image: 'profile-image2.jpeg', label: 'A fresh start, every day.', description: 'Create a clean, comfortable and welcoming environment with professional housekeeping personnel.', details: 'Our housekeeping teams work around the needs of your premises, with an emphasis on hygiene, presentation and consistent service. We support corporate offices, healthcare spaces, hospitality businesses and residential buildings.', features: ['Trained housekeeping personnel', 'Attention to hygiene and presentation', 'Site-specific service requirements', 'Coordination with your operations team'] },
  { slug: 'security', title: 'Security services', icon: 'shield', image: 'profile-image3.jpeg', label: 'Confidence in every corner.', description: 'Dependable security officers and on-site personnel for your everyday operational needs.', details: 'We provide security personnel matched to the needs of your premises. Our team works with your management to understand on-site demands and support a professional, coordinated approach to facility security.', features: ['Security officers and personnel', 'On-site coordination', 'Support for public safety planning', 'Service tailored to your premises'] },
  { slug: 'water-wash', title: 'Water wash', icon: 'droplets', image: 'profile-image4.jpeg', label: 'Care that makes a difference.', description: 'Vehicle water wash services planned around your location and business operations.', details: 'Keep vehicle presentation a priority with water wash support. We discuss the requirements of your location and coordinate the people and services needed to suit your operation.', features: ['Vehicle cleaning support', 'Location-specific planning', 'Personnel matched to your requirements', 'Coordination around your operations'] },
  { slug: 'plumbing', title: 'Plumbing', icon: 'wrench', image: 'profile-image5.jpeg', label: 'Keep the essentials flowing.', description: 'Practical plumbing support for the systems your property depends on.', details: 'Our technical personnel help address the plumbing needs of your facility. We start by understanding your site and its requirements, then coordinate appropriate support with your team.', features: ['Technical personnel', 'Facility plumbing support', 'Assessment of site requirements', 'Flexible service arrangements'] },
  { slug: 'electrical-maintenance', title: 'Electrical maintenance', icon: 'zap', image: 'profile-image6.jpeg', label: 'Support behind your everyday.', description: 'Electrical maintenance personnel and support tailored to your workplace.', details: 'We help businesses coordinate electrical maintenance needs through technical personnel and a practical, site-focused approach. Speak with our team to discuss the scope and requirements of your premises.', features: ['Electrical maintenance support', 'Technical staffing', 'Site-specific coordination', 'Service scope agreed with your team'] },
  { slug: 'staffing', title: 'Staffing & outsourcing', icon: 'users', image: 'profile-image2.jpeg', label: 'The right people. In the right place.', description: 'Flexible permanent and temporary personnel to support your facility and operations.', details: 'Our staffing services help businesses meet changing workforce requirements. HFS supplies personnel on permanent and temporary arrangements, with training and coordination to support the demands of each site.', features: ['Permanent and temporary staffing', 'Housekeeping, security and technical teams', 'Nationwide staff supply capabilities', 'Training and management coordination'] },
] as const;
export type Service = (typeof services)[number];
export const clients = [
  { name: 'Morris Garages service center & showroom', image: 'client-image1.jpeg', category: 'Automotive' },
  { name: 'Popular Vehicles & Services', image: 'client-image2.jpeg', category: 'Automotive' },
  { name: 'FPL Hyundai', image: 'client-image5.png', category: 'Automotive' },
  { name: 'PPS TATA', image: 'client-image10.png', category: 'Automotive' },
  { name: 'Spark Minda', image: 'client-image16.jpg', category: 'Industry' },
  { name: 'Indus Motors', image: 'client-image17.jpeg', category: 'Automotive' },
  { name: 'BabyScience IVF Clinics', image: 'client-image23.jpg', category: 'Healthcare' },
  { name: 'GP Homes', image: 'client-image27.png', category: 'Residential' },
  { name: 'Junior Kuppanna', image: 'client-image21.png', category: 'Hospitality' },
  { name: 'ACS Medical College and Hospital', image: 'client-image22.jpeg', category: 'Healthcare' },
  { name: 'One Crest Apartments', image: 'client-image29.jpeg', category: 'Residential' },
  { name: 'Lyfe by Soul Garden Bistro', image: 'client-image32.png', category: 'Hospitality' },
];
export const steps = [
  { title: 'Tell us about your space', text: 'We start with your premises, your people and the way your business works.' },
  { title: 'Find the right fit', text: 'Together, we define the service scope and staffing requirements for your site.' },
  { title: 'Put care into practice', text: 'Our teams bring coordination, professionalism and attention to everyday details.' },
];
