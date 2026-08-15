'use client';
import DashboardLayout from '@/components/DashboardLayout';
import { useAuth } from '@/components/AuthProvider';

export default function StudentDashboard() {
  const { user } = useAuth();
  
  const getFirstName = (name?: string) => {
    if (!name) return 'Student';
    return name.split(' ')[0];
  };

  const firstName = getFirstName(user?.profile?.fullName);
  const department = user?.profile?.department || 'Department Unknown';
  const batch = user?.profile?.batch || 'Batch Unknown';

  return (
    <DashboardLayout>
      {/* Breadcrumbs */}
      <div className="flex items-center text-sm text-gray-500 mb-6">
        <span>Home</span>
        <span className="mx-2">/</span>
        <span className="font-medium text-gray-900">Student dashboard</span>
      </div>

      {/* Hero Section */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, {firstName}</h1>
          <p className="text-gray-500 text-sm">B.Tech {department} • Student • Batch {batch}</p>
        </div>

      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Card 1 */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between h-32">
          <h3 className="text-xs font-semibold text-gray-500 tracking-wider">ALUMNI MATCHES</h3>
          <div>
            <p className="text-3xl font-bold text-gray-900">24</p>
            <p className="text-xs text-gray-400 mt-1">Based on branch & skills • demo</p>
          </div>
        </div>
        {/* Card 2 */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between h-32">
          <h3 className="text-xs font-semibold text-gray-500 tracking-wider">OPEN JOBS</h3>
          <div>
            <p className="text-3xl font-bold text-gray-900">6</p>
            <p className="text-xs text-gray-400 mt-1">Updated this week • demo</p>
          </div>
        </div>
        {/* Card 3 */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between h-32">
          <h3 className="text-xs font-semibold text-gray-500 tracking-wider">INTERNSHIPS</h3>
          <div>
            <p className="text-3xl font-bold text-gray-900">5</p>
            <p className="text-xs text-gray-400 mt-1">Active listings • demo</p>
          </div>
        </div>
        {/* Card 4 */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between h-32">
          <h3 className="text-xs font-semibold text-gray-500 tracking-wider">UNREAD</h3>
          <div>
            <p className="text-3xl font-bold text-gray-900">2</p>
            <p className="text-xs text-gray-400 mt-1">Notifications</p>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Row 1, Col 1-2: Job Opportunities */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center">
            <h2 className="text-lg font-bold text-gray-900">Job opportunities</h2>
            <button className="text-sm font-medium text-gray-500 hover:text-gray-900">View all</button>
          </div>
          <div className="flex-1">
            {/* Job 1 */}
            <div className="p-6 border-b border-gray-50 flex justify-between items-center hover:bg-gray-50 transition-colors">
              <div>
                <h3 className="font-semibold text-gray-900">Graduate Software Engineer</h3>
                <div className="flex items-center text-sm text-gray-500 mt-1 space-x-2">
                  <span className="flex items-center"><span className="w-3 h-3 mr-1 bg-gray-200 rounded-sm inline-block"></span> Microsoft</span>
                  <span>•</span>
                  <span>Hyderabad</span>
                </div>
              </div>
              <button className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 text-gray-700 transition-colors">Apply</button>
            </div>
            {/* Job 2 */}
            <div className="p-6 border-b border-gray-50 flex justify-between items-center hover:bg-gray-50 transition-colors">
              <div>
                <h3 className="font-semibold text-gray-900">SDE Intern → Full-time</h3>
                <div className="flex items-center text-sm text-gray-500 mt-1 space-x-2">
                  <span className="flex items-center"><span className="w-3 h-3 mr-1 bg-gray-200 rounded-sm inline-block"></span> Amazon</span>
                  <span>•</span>
                  <span>Bengaluru</span>
                </div>
              </div>
              <button className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 text-gray-700 transition-colors">Apply</button>
            </div>
            {/* Job 3 */}
            <div className="p-6 flex justify-between items-center hover:bg-gray-50 transition-colors">
              <div>
                <h3 className="font-semibold text-gray-900">Frontend Developer</h3>
                <div className="flex items-center text-sm text-gray-500 mt-1 space-x-2">
                  <span className="flex items-center"><span className="w-3 h-3 mr-1 bg-gray-200 rounded-sm inline-block"></span> Razorpay</span>
                  <span>•</span>
                  <span>Remote</span>
                </div>
              </div>
              <button className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 text-gray-700 transition-colors">Apply</button>
            </div>
          </div>
        </div>

        {/* Row 1, Col 3: Upcoming Events */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center">
            <h2 className="text-lg font-bold text-gray-900">Upcoming events</h2>
            <button className="text-sm font-medium text-gray-500 hover:text-gray-900">All</button>
          </div>
          <div className="p-6 space-y-6">
            <div>
              <h3 className="font-semibold text-gray-900">SOET Alumni Meetup 2026</h3>
              <p className="text-sm text-gray-500 mt-1">2026-08-12 • SOET Main Auditorium</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Resume & Interview Workshop</h3>
              <p className="text-sm text-gray-500 mt-1">2026-07-28 • Online - Teams</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Women in Tech Panel</h3>
              <p className="text-sm text-gray-500 mt-1">2026-08-05 • Seminar Hall B</p>
            </div>
          </div>
        </div>

        {/* Row 2, Col 1: Internships */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col h-64">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center">
            <h2 className="text-lg font-bold text-gray-900">Internships</h2>
            <button className="text-sm font-medium text-gray-500 hover:text-gray-900">Browse</button>
          </div>
          <div className="p-6 space-y-6 overflow-y-auto">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold text-gray-900 text-sm">Software Engineering Intern</h3>
                <p className="text-xs text-gray-500 mt-1">Google • ₹80k/mo</p>
              </div>
              <span className="text-[10px] font-bold bg-gray-100 text-gray-500 px-2 py-1 rounded">ON-SITE</span>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold text-gray-900 text-sm">React Intern</h3>
                <p className="text-xs text-gray-500 mt-1">Razorpay • ₹40k/mo</p>
              </div>
              <span className="text-[10px] font-bold bg-gray-100 text-gray-500 px-2 py-1 rounded">HYBRID</span>
            </div>
          </div>
        </div>

        {/* Row 2, Col 2: Chat preview */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col h-64">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center">
            <h2 className="text-lg font-bold text-gray-900">Chat preview</h2>
            <button className="text-sm font-medium text-gray-500 hover:text-gray-900">Open</button>
          </div>
          <div className="p-6 space-y-6 overflow-y-auto">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold shrink-0 mt-1">PS</div>
              <div>
                <h3 className="font-semibold text-gray-900 text-sm">Priya Sharma</h3>
                <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">Happy to hop on a call Thursday.</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold shrink-0 mt-1">RD</div>
              <div>
                <h3 className="font-semibold text-gray-900 text-sm">Rohan Desai</h3>
                <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">Send over your resume PDF.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Row 2, Col 3: Notifications */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col h-64">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center">
            <h2 className="text-lg font-bold text-gray-900">Notifications</h2>
            <button className="text-sm font-medium text-gray-500 hover:text-gray-900">All</button>
          </div>
          <div className="p-6 space-y-6 overflow-y-auto">
            <div>
              <h3 className="font-semibold text-gray-900 text-sm">Application status updated</h3>
              <p className="text-xs text-gray-400 mt-1">12 min ago</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 text-sm">New job match</h3>
              <p className="text-xs text-gray-400 mt-1">1 hr ago</p>
            </div>
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}
