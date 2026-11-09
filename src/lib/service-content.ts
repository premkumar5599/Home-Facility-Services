import type { Service } from "./data";
import { company } from "./data";
import type { Question } from "@/components/faq";
type Content = {
  intro: string;
  suitableFor: string;
  planning: string[];
  faqs: Question[];
};
export const serviceContent: Record<Service["slug"], Content> = {
  housekeeping: {
    intro:
      "Housekeeping services in Chennai, Vellore and Hosur for offices and commercial premises",
    suitableFor:
      "Facility managers planning everyday cleaning support for offices, retail premises, hospitality spaces, multi-storey buildings and shared areas. Healthcare and food-industry requirements should be discussed separately so that site-specific hygiene instructions are clear.",
    planning: [
      "Identify the areas to be covered: workspaces, common areas, washrooms and visitor-facing spaces.",
      "Share your operating hours and when cleaning can take place without interrupting your team.",
      "Discuss staffing, cleaning frequency, equipment and consumables before agreeing the scope.",
      "Explain access restrictions and any site-specific hygiene procedures.",
    ],
    faqs: [
      {
        question: "Can I enquire about ongoing office housekeeping?",
        answer:
          "Yes. HFS offers housekeeping personnel. Share your office location, the areas to be covered and the working schedule so the team can discuss an appropriate arrangement.",
      },
      {
        question: "Are cleaning equipment and consumables included?",
        answer:
          "Equipment, cleaning products and consumables need to be identified in your quotation. Confirm which items HFS will supply and which your site will provide before agreeing the service.",
      },
      {
        question: "What details are useful for a housekeeping quote?",
        answer:
          "Provide the facility type, approximate area, operating hours, cleaning priorities and expected start date. Flag specialist hygiene requirements so they can be assessed before any agreement.",
      },
    ],
  },
  security: {
    intro:
      "Security personnel services for business premises in Chennai, Vellore and Hosur",
    suitableFor:
      "Businesses seeking personnel support for offices, commercial buildings and other facilities. Requirements differ by site, so the number of positions, shift pattern and responsibilities need to be agreed with your management team.",
    planning: [
      "Describe the premises and the locations where personnel are needed.",
      "Explain visitor, staff and vehicle movement during operating hours.",
      "Discuss shift coverage, site instructions and escalation contacts.",
      "Confirm the required checks, documentation and service responsibilities directly with HFS.",
    ],
    faqs: [
      {
        question: "Does HFS provide security officers?",
        answer:
          "Yes. HFS provides security officers and personnel for business premises. Include your site location, positions to cover and proposed duties so availability and responsibilities can be confirmed.",
      },
      {
        question: "Can I request round-the-clock coverage?",
        answer:
          "Include the shifts and coverage you need in your enquiry. Round-the-clock coverage is subject to confirmation of staffing, shift arrangements and the proposed start date.",
      },
      {
        question: "What should I confirm before appointing a security team?",
        answer:
          "Discuss duties, staffing levels, shift handovers, reporting contacts and the documentation required for your premises. Request any applicable service credentials directly from HFS before finalising an arrangement.",
      },
    ],
  },
  "water-wash": {
    intro:
      "Vehicle water wash support for business locations in Chennai, Vellore and Hosur",
    suitableFor:
      "Businesses planning vehicle washing support at their premises, including automotive sites. Describing vehicle volumes and the available working space helps the team understand the assignment.",
    planning: [
      "Share the vehicle types and approximate number of washes required.",
      "Describe the wash area, water access and drainage arrangements.",
      "Discuss suitable working times and how vehicles move through the location.",
      "Confirm equipment, consumables and the exact cleaning scope before work is agreed.",
    ],
    faqs: [
      {
        question: "Is this service for vehicle washing?",
        answer:
          "Yes. This service concerns vehicle washing support for business locations. Include vehicle types, approximate wash volumes and the cleaning tasks you need in your enquiry.",
      },
      {
        question: "Can washing be arranged at our business premises?",
        answer:
          "Share the proposed location and available facilities with HFS. Suitability, personnel, equipment and timing need to be assessed and confirmed for the specific site.",
      },
      {
        question: "Does water wash include detailing or specialist treatments?",
        answer:
          "Detailing, polishing and specialist treatments should not be assumed to be included. Ask for the exact washing tasks and any exclusions to be recorded in your proposed scope.",
      },
    ],
  },
  plumbing: {
    intro:
      "Plumbing support for facilities and workplaces in Chennai, Vellore and Hosur",
    suitableFor:
      "Facility teams looking for plumbing personnel or support for property maintenance needs. A clear description of the affected area and operational impact helps establish the right scope.",
    planning: [
      "Describe the plumbing requirement and the parts of the facility affected.",
      "Explain access restrictions and times when the work can be discussed or scheduled.",
      "Share existing maintenance information where available.",
      "Confirm materials, replacement parts, personnel and the scope of work in the quotation.",
    ],
    faqs: [
      {
        question: "Can I contact HFS about facility plumbing maintenance?",
        answer:
          "Yes. HFS offers plumbing support for facilities. Describe the premises, affected area and work needed so the team can assess whether the assignment fits the service.",
      },
      {
        question: "Are parts and materials included in a plumbing quote?",
        answer:
          "Inclusions depend on the agreed work. Ask for the proposed personnel, parts and materials to be identified clearly when discussing a quotation.",
      },
      {
        question: "Is an emergency response time guaranteed?",
        answer:
          "No emergency response time is published on this website. Call HFS to check current availability and timing for your location.",
      },
    ],
  },
  "electrical-maintenance": {
    intro:
      "Electrical maintenance support for workplaces in Chennai, Vellore and Hosur",
    suitableFor:
      "Businesses coordinating electrical maintenance personnel and facility support. Share the systems involved and your site’s access and work-authorisation requirements so the request can be assessed.",
    planning: [
      "Describe the maintenance requirement and the equipment or area involved.",
      "Identify your site contact and any work-permit or access requirements.",
      "Discuss acceptable work windows and operational constraints.",
      "Confirm the assigned personnel, relevant qualifications, materials and agreed scope before work begins.",
    ],
    faqs: [
      {
        question: "What electrical service does HFS offer?",
        answer:
          "HFS offers electrical maintenance support and technician personnel for workplaces. Describe the systems, task and site requirements so the team can confirm whether it can support your assignment.",
      },
      {
        question: "What credentials should I confirm for electrical work?",
        answer:
          "Ask HFS for the assigned personnel's relevant qualifications and any specialist authorisations needed for your proposed work. Confirm these alongside your site's work-permit and supervision requirements before an assignment is agreed.",
      },
      {
        question: "Can maintenance fit around business operating hours?",
        answer:
          "Share your preferred work windows and any restrictions. Scheduling and availability need to be agreed with HFS; the website does not promise a fixed response time.",
      },
    ],
  },
  staffing: {
    intro:
      "Facility staffing and outsourcing support in Chennai, Vellore and Hosur",
    suitableFor:
      "Businesses seeking housekeeping, security or technical personnel on permanent or temporary arrangements. HFS serves Chennai, Vellore and Hosur; discuss your site requirements with the team.",
    planning: [
      "List the roles, duties and approximate number of people required.",
      "Share the location, working hours and expected duration of the assignment.",
      "Explain the skills, training or site induction requirements for each role.",
      "Discuss reporting lines, staffing arrangements and the proposed start date.",
    ],
    faqs: [
      {
        question: "Can I request temporary as well as permanent staffing?",
        answer:
          "Yes. HFS offers permanent and temporary staff supply. Include the roles, headcount, location and expected duration so availability and the proposed terms can be confirmed.",
      },
      {
        question: "Which types of personnel can I enquire about?",
        answer:
          "You can enquire about housekeeping personnel, security officers and technicians. This page is for businesses sourcing personnel; include the duties, skills and reporting arrangements your site needs.",
      },
      {
        question: "Can HFS discuss staffing outside Chennai?",
        answer:
          "Yes. HFS provides services in Chennai, Vellore and Hosur. Contact the team to discuss your staffing needs and site arrangements.",
      },
    ],
  },
};
export const generalFAQs: Question[] = [
  {
    question: "Which locations does HFS serve?",
    answer:
      "Home Facility Services provides services in Chennai, Vellore and Hosur. Share your site location and requirements with our team to discuss the service arrangement.",
  },
  {
    question: "Where is Home Facility Services based?",
    answer: `HFS is based in Chennai, Tamil Nadu. The registered office is ${company.address}`,
  },
  {
    question: "Can I request more than one facility service?",
    answer:
      "Yes. You can discuss housekeeping, security, water wash, plumbing, electrical maintenance and staffing together. The team will need your site requirements to confirm a suitable scope.",
  },
  {
    question: "How do I request pricing?",
    answer: `Call ${company.phone} or landline ${company.landline}, or email ${company.email} with your location, facility type, services, staffing needs and preferred schedule. Pricing is discussed for your requirements; no standard rates are published here.`,
  },
  {
    question: "Does submitting the enquiry form confirm a booking?",
    answer:
      "No. Submitting an enquiry does not confirm a booking. The form sends your details to HFS through its email service when configured. A service is arranged only after you agree the scope, availability and terms with HFS.",
  },
];
