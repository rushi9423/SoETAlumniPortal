'use client';
import DashboardLayout from '@/components/DashboardLayout';

export default function JobsPage() {
  const jobs = [
    { title: 'Software Engineer', company: 'Google', location: 'Hyderabad', type: 'Full-time' },
    { title: 'Frontend Developer', company: 'Razorpay', location: 'Remote', type: 'Full-time' },
    { title: 'Backend Engineer', company: 'Swiggy', location: 'Bengaluru', type: 'Full-time' }
  ];

  return (
    <DashboardLayout>
      <div className="flex items-center text-sm text-gray-500 mb-6">
        <span>Home</span><span className="mx-2">/</span><span className="font-medium text-gray-900">Jobs</span>
      </div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Job Opportunities</h1>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {jobs.map((job, i) => (
          <div key={i} className="p-6 border-b border-gray-50 flex justify-between items-center hover:bg-gray-50">
            <div>
              <h3 className="font-semibold text-lg text-gray-900">{job.title}</h3>
              <p className="text-gray-500">{job.company} • {job.location} • {job.type}</p>
            </div>
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium">Apply</button>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}
