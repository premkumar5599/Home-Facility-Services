import type { Service } from './data';
import type { Question } from '@/components/faq';
type Content = { intro: string; suitableFor: string; planning: string[]; faqs: Question[] };
export const serviceContent: Record<Service['slug'], Content> = {
  housekeeping: {
    intro: 'Housekeeping services in Chennai, Vellore and Hosur for offices and commercial premises',
    suitableFor: 'Facility managers planning everyday cleaning support for offices, retail premises, hospitality spaces, multi-storey buildings and shared areas. Healthcare and food-industry requirements should be discussed separately so that site-specific hygiene instructions are clear.',
    planning: ['Identify the areas to be covered: workspaces, common areas, washrooms and visitor-facing spaces.', 'Share your operating hours and when cleaning can take place without interrupting your team.', 'Discuss staffing, cleaning frequency, equipment and consumables before agreeing the scope.', 'Explain access restrictions and any site-specific hygiene procedures.'],
    faqs: [
      { question: 'Can I enquire about ongoing office housekeeping?', answer: 'Yes. HFS offers housekeeping personnel. Share your office location, the areas to be covered and the working schedule so the team can discuss an appropriate arrangement.' },
      { question: 'Are cleaning equipment and consumables included?', answer: 'The website does not specify a standard inclusive package. Ask the team to confirm who supplies equipment, cleaning products and consumables as part of your quotation.' },
      { question: 'What details are useful for a housekeeping quote?', answer: 'Provide the facility type, approximate area, operating hours, cleaning priorities and expected start date. Flag specialist hygiene requirements so they can be assessed before any agreement.' },
    ],
  },
  security: {
    intro: 'Security personnel services for business premises in Chennai, Vellore and Hosur',
    suitableFor: 'Businesses seeking personnel support for offices, commercial buildings and other facilities. Requirements differ by site, so the number of positions, shift pattern and responsibilities need to be agreed with your management team.',
    planning: ['Describe the premises and the locations where personnel are needed.', 'Explain visitor, staff and vehicle movement during operating hours.', 'Discuss shift coverage, site instructions and escalation contacts.', 'Confirm the required checks, documentation and service responsibilities directly with HFS.'],
    faqs: [
      { question: 'Does HFS provide security officers?', answer: 'The company profile lists security officers and security personnel among its services. Contact HFS with your site requirements to confirm availability and the proposed responsibilities.' },
      { question: 'Can I request round-the-clock coverage?', answer: 'You can discuss the shifts and coverage your site needs. The website does not promise 24-hour availability; staffing, shift arrangements and start dates must be confirmed with the team.' },
      { question: 'What should I confirm before appointing a security team?', answer: 'Discuss duties, staffing levels, shift handovers, reporting contacts and the documentation required for your premises. Request any applicable service credentials directly from HFS before finalising an arrangement.' },
    ],
  },
  'water-wash': {
    intro: 'Vehicle water wash support for business locations in Chennai, Vellore and Hosur',
    suitableFor: 'Businesses planning vehicle washing support at their premises, including automotive sites. Describing vehicle volumes and the available working space helps the team understand the assignment.',
    planning: ['Share the vehicle types and approximate number of washes required.', 'Describe the wash area, water access and drainage arrangements.', 'Discuss suitable working times and how vehicles move through the location.', 'Confirm equipment, consumables and the exact cleaning scope before work is agreed.'],
    faqs: [
      { question: 'Is this service for vehicle washing?', answer: 'The HFS profile presents water wash as a vehicle-care service. Discuss the types of vehicles and the cleaning tasks you require with the team.' },
      { question: 'Can washing be arranged at our business premises?', answer: 'Share the proposed location and available facilities with HFS. Suitability, personnel, equipment and timing need to be assessed and confirmed for the specific site.' },
      { question: 'Does water wash include detailing or specialist treatments?', answer: 'Those services are not specified in the company profile. Ask HFS to confirm the exact tasks included rather than assuming detailing, polishing or specialist treatments are part of a water wash arrangement.' },
    ],
  },
  plumbing: {
    intro: 'Plumbing support for facilities and workplaces in Chennai, Vellore and Hosur',
    suitableFor: 'Facility teams looking for plumbing personnel or support for property maintenance needs. A clear description of the affected area and operational impact helps establish the right scope.',
    planning: ['Describe the plumbing requirement and the parts of the facility affected.', 'Explain access restrictions and times when the work can be discussed or scheduled.', 'Share existing maintenance information where available.', 'Confirm materials, replacement parts, personnel and the scope of work in the quotation.'],
    faqs: [
      { question: 'Can I contact HFS about facility plumbing maintenance?', answer: 'Yes. Plumbing is one of the services listed in the HFS profile. Describe the premises and the work needed so the team can assess the request.' },
      { question: 'Are parts and materials included in a plumbing quote?', answer: 'Inclusions depend on the agreed work. Ask for the proposed personnel, parts and materials to be identified clearly when discussing a quotation.' },
      { question: 'Is an emergency response time guaranteed?', answer: 'No emergency response time is published on this website. Call HFS to check current availability and timing for your location.' },
    ],
  },
  'electrical-maintenance': {
    intro: 'Electrical maintenance support for workplaces in Chennai, Vellore and Hosur',
    suitableFor: 'Businesses coordinating electrical maintenance personnel and facility support. Share the systems involved and your site’s access and work-authorisation requirements so the request can be assessed.',
    planning: ['Describe the maintenance requirement and the equipment or area involved.', 'Identify your site contact and any work-permit or access requirements.', 'Discuss acceptable work windows and operational constraints.', 'Confirm the assigned personnel, relevant qualifications, materials and agreed scope before work begins.'],
    faqs: [
      { question: 'What electrical service does HFS offer?', answer: 'The company profile lists electrical maintenance and technician personnel. Contact the team to establish whether your specific requirement falls within the service they can provide.' },
      { question: 'Does the website confirm specialist qualifications?', answer: 'Individual qualifications and specialist authorisations are not listed here. Request the relevant personnel credentials and documentation directly from HFS for your proposed work.' },
      { question: 'Can maintenance fit around business operating hours?', answer: 'Share your preferred work windows and any restrictions. Scheduling and availability need to be agreed with HFS; the website does not promise a fixed response time.' },
    ],
  },
  staffing: {
    intro: 'Facility staffing and outsourcing support in Chennai, Vellore and Hosur',
    suitableFor: 'Businesses seeking housekeeping, security or technical personnel on permanent or temporary arrangements. HFS serves Chennai, Vellore and Hosur; discuss your site requirements with the team.',
    planning: ['List the roles, duties and approximate number of people required.', 'Share the location, working hours and expected duration of the assignment.', 'Explain the skills, training or site induction requirements for each role.', 'Discuss reporting lines, staffing arrangements and the proposed start date.'],
    faqs: [
      { question: 'Can I request temporary as well as permanent staffing?', answer: 'Yes. The HFS company profile describes permanent and temporary staff supply. The available roles, duration and terms should be confirmed for your requirement.' },
      { question: 'Which types of personnel are listed?', answer: 'The profile identifies housekeeping personnel, security officers and technicians. Share the responsibilities you need covered so HFS can assess a suitable staffing arrangement.' },
      { question: 'Can HFS discuss staffing outside Chennai?', answer: 'Yes. HFS provides services in Chennai, Vellore and Hosur. Contact the team to discuss your staffing needs and site arrangements.' },
    ],
  },
};
export const generalFAQs: Question[] = [
  { question: 'Which locations does HFS serve?', answer: 'Home Facility Services provides services in Chennai, Vellore and Hosur. Share your site location and requirements with our team to discuss the service arrangement.' },
  { question: 'Where is Home Facility Services based?', answer: 'HFS is based in Chennai, Tamil Nadu. The registered office is No. 01, Perumal Kovil Street, Koyambedu, Chennai – 600 107.' },
  { question: 'Can I request more than one facility service?', answer: 'Yes. You can discuss housekeeping, security, water wash, plumbing, electrical maintenance and staffing together. The team will need your site requirements to confirm a suitable scope.' },
  { question: 'How do I request pricing?', answer: 'Call 7708241218 or landline 044-46406372, or email hr@homefacilityservices.in with your location, facility type, services, staffing needs and preferred schedule. Pricing is discussed for your requirements; no standard rates are published here.' },
  { question: 'Does submitting the enquiry form confirm a booking?', answer: 'No. The form prepares a message in your email app, which you review and send yourself. A service is only arranged after you discuss and agree the scope, availability and terms with HFS.' },
];
