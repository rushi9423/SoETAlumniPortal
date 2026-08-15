import { createClient } from '@/utils/supabase/client';

export interface JobItem {
  id: string;
  posted_by: string;
  title: string;
  company: string;
  description: string;
  location: string;
  employment_type: string;
  experience?: string;
  salary?: string;
  skills?: string[];
  application_url?: string;
  deadline?: string;
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
  poster_name?: string;
  poster_avatar?: string;
  poster_email?: string;
}

export interface JobApplicationItem {
  id: string;
  job_id: string;
  student_id: string;
  resume_url?: string;
  cover_letter?: string;
  status: 'applied' | 'under_review' | 'shortlisted' | 'interview' | 'selected' | 'rejected';
  created_at: string;
  job?: JobItem;
  student_name?: string;
  student_email?: string;
  department?: string;
}

export const jobService = {
  async getApprovedJobs(filters?: {
    search?: string;
    employmentType?: string;
    location?: string;
  }): Promise<JobItem[]> {
    const supabase = createClient();

    let query = supabase
      .from('jobs')
      .select(`
        *,
        profiles (
          full_name,
          avatar_url,
          email
        )
      `)
      .eq('status', 'approved')
      .order('created_at', { ascending: false });

    if (filters?.employmentType && filters.employmentType !== 'all') {
      query = query.eq('employment_type', filters.employmentType);
    }
    if (filters?.location) {
      query = query.ilike('location', `%${filters.location}%`);
    }

    const { data, error } = await query;
    if (error) throw new Error(error.message);

    let result = (data || []).map((j: any) => ({
      id: j.id,
      posted_by: j.posted_by,
      title: j.title,
      company: j.company,
      description: j.description,
      location: j.location,
      employment_type: j.employment_type,
      experience: j.experience,
      salary: j.salary,
      skills: j.skills,
      application_url: j.application_url,
      deadline: j.deadline,
      status: j.status,
      created_at: j.created_at,
      poster_name: j.profiles?.full_name,
      poster_avatar: j.profiles?.avatar_url,
      poster_email: j.profiles?.email,
    }));

    if (filters?.search) {
      const s = filters.search.toLowerCase();
      result = result.filter(
        (j) =>
          j.title.toLowerCase().includes(s) ||
          j.company.toLowerCase().includes(s) ||
          j.description.toLowerCase().includes(s) ||
          j.skills?.some((sk: string) => sk.toLowerCase().includes(s))
      );
    }

    return result;
  },

  async getAllJobsForAdmin(): Promise<JobItem[]> {
    const supabase = createClient();

    const { data, error } = await supabase
      .from('jobs')
      .select(`
        *,
        profiles (
          full_name,
          avatar_url,
          email
        )
      `)
      .order('created_at', { ascending: false });

    if (error) throw new Error(error.message);

    return (data || []).map((j: any) => ({
      id: j.id,
      posted_by: j.posted_by,
      title: j.title,
      company: j.company,
      description: j.description,
      location: j.location,
      employment_type: j.employment_type,
      experience: j.experience,
      salary: j.salary,
      skills: j.skills,
      application_url: j.application_url,
      deadline: j.deadline,
      status: j.status,
      created_at: j.created_at,
      poster_name: j.profiles?.full_name,
      poster_avatar: j.profiles?.avatar_url,
      poster_email: j.profiles?.email,
    }));
  },

  async getMyPostedJobs(userId: string): Promise<JobItem[]> {
    const supabase = createClient();

    const { data, error } = await supabase
      .from('jobs')
      .select('*')
      .eq('posted_by', userId)
      .order('created_at', { ascending: false });

    if (error) throw new Error(error.message);
    return data || [];
  },

  async createJob(jobData: {
    posted_by: string;
    title: string;
    company: string;
    description: string;
    location: string;
    employment_type: string;
    experience?: string;
    salary?: string;
    skills?: string[];
    application_url?: string;
    deadline?: string;
  }) {
    const supabase = createClient();

    const { data, error } = await supabase
      .from('jobs')
      .insert({
        ...jobData,
        status: 'pending',
      })
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data;
  },

  async updateJobStatus(jobId: string, status: 'approved' | 'rejected') {
    const supabase = createClient();

    const { data: job, error } = await supabase
      .from('jobs')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', jobId)
      .select('posted_by, title')
      .single();

    if (error) throw new Error(error.message);

    // Notify poster
    if (job) {
      await supabase.from('notifications').insert({
        user_id: job.posted_by,
        title: 'Job Posting Status Updated',
        message: `Your job posting "${job.title}" has been ${status}.`,
        type: 'job',
      });
    }
  },

  async deleteJob(jobId: string) {
    const supabase = createClient();
    const { error } = await supabase.from('jobs').delete().eq('id', jobId);
    if (error) throw new Error(error.message);
  },

  async applyForJob(applicationData: {
    job_id: string;
    student_id: string;
    resume_file?: File;
    cover_letter?: string;
  }) {
    const supabase = createClient();

    // Check duplicate application
    const { data: existing } = await supabase
      .from('job_applications')
      .select('id')
      .eq('job_id', applicationData.job_id)
      .eq('student_id', applicationData.student_id)
      .maybeSingle();

    if (existing) {
      throw new Error('You have already applied for this position.');
    }

    let resumeUrl = '';
    if (applicationData.resume_file) {
      const file = applicationData.resume_file;
      const fileExt = file.name.split('.').pop();
      const filePath = `${applicationData.student_id}/${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('resumes')
        .upload(filePath, file);

      if (uploadError) throw new Error('Resume upload failed: ' + uploadError.message);

      const { data: { publicUrl } } = supabase.storage.from('resumes').getPublicUrl(filePath);
      resumeUrl = publicUrl;
    }

    const { error } = await supabase
      .from('job_applications')
      .insert({
        job_id: applicationData.job_id,
        student_id: applicationData.student_id,
        resume_url: resumeUrl || undefined,
        cover_letter: applicationData.cover_letter,
        status: 'applied',
      });

    if (error) throw new Error(error.message);

    // Notify student
    await supabase.from('notifications').insert({
      user_id: applicationData.student_id,
      title: 'Application Submitted',
      message: 'Your application has been received and is under review.',
      type: 'application',
    });
  },

  async getMyApplications(studentId: string): Promise<JobApplicationItem[]> {
    const supabase = createClient();

    const { data, error } = await supabase
      .from('job_applications')
      .select(`
        *,
        jobs (
          id,
          title,
          company,
          location,
          employment_type,
          status
        )
      `)
      .eq('student_id', studentId)
      .order('created_at', { ascending: false });

    if (error) throw new Error(error.message);

    return (data || []).map((app: any) => ({
      id: app.id,
      job_id: app.job_id,
      student_id: app.student_id,
      resume_url: app.resume_url,
      cover_letter: app.cover_letter,
      status: app.status,
      created_at: app.created_at,
      job: app.jobs,
    }));
  },

  async getJobApplicants(jobId: string): Promise<JobApplicationItem[]> {
    const supabase = createClient();

    const { data, error } = await supabase
      .from('job_applications')
      .select(`
        *,
        profiles:student_id (
          full_name,
          email,
          student_profiles (
            department
          )
        )
      `)
      .eq('job_id', jobId)
      .order('created_at', { ascending: false });

    if (error) throw new Error(error.message);

    return (data || []).map((app: any) => ({
      id: app.id,
      job_id: app.job_id,
      student_id: app.student_id,
      resume_url: app.resume_url,
      cover_letter: app.cover_letter,
      status: app.status,
      created_at: app.created_at,
      student_name: app.profiles?.full_name,
      student_email: app.profiles?.email,
      department: app.profiles?.student_profiles?.[0]?.department || app.profiles?.student_profiles?.department,
    }));
  },

  async updateApplicationStatus(applicationId: string, status: 'applied' | 'under_review' | 'shortlisted' | 'interview' | 'selected' | 'rejected') {
    const supabase = createClient();

    const { data: app, error } = await supabase
      .from('job_applications')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', applicationId)
      .select('student_id, jobs(title)')
      .single();

    if (error) throw new Error(error.message);

    if (app) {
      await supabase.from('notifications').insert({
        user_id: app.student_id,
        title: 'Job Application Status Updated',
        message: `Your application for "${(app.jobs as any)?.title || 'Job'}" status changed to: ${status.replace('_', ' ').toUpperCase()}`,
        type: 'application',
      });
    }
  }
};
