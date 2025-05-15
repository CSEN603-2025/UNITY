import React, { useState, useEffect } from 'react';
import { getCompanies } from '../services/companyService';
import SearchBar from '../components/SearchBar';
import IndustryFilter from '../components/IndustryFilter';
import CompanyCard from '../components/CompanyCard';

export default function CompanyApplications() {
  const [companies, setCompanies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [industryFilter, setIndustryFilter] = useState('');

  useEffect(() => {
    setCompanies(getCompanies());
  }, []);

  const filteredCompanies = companies.filter(company => {
    return (
      company.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (!industryFilter || company.industry === industryFilter)
    );
  });

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Company Applications</h1>
      <SearchBar value={searchTerm} onChange={setSearchTerm} />
      <IndustryFilter value={industryFilter} onChange={setIndustryFilter} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {filteredCompanies.map(company => (
          <CompanyCard key={company.id} company={company} />
        ))}
      </div>
    </div>
  );
}
