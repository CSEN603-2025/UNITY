export function getCompanies() {
  return [
    {
    id: 1,
    company: 'Vodafone',
    position: 'Software Intern',
    duration: '8 weeks',
    paid: true, // <--- paid
    stipend: 'EGP 3,000/month',
  },
  {
    id: 2,
    company: 'IBM',
    position: 'Cloud Intern',
    duration: '10 weeks',
    paid: false, // <--- unpaid
    stipend: null,
  },
  {
    id: 3,
    company: 'Valeo',
    position: 'Embedded Intern',
    duration: '6 weeks',
    paid: true, // <--- paid
    stipend: 'EGP 2,500/month',
  },
  ];
}
