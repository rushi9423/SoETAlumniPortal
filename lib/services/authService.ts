import { createClient } from '@/utils/supabase/client';

export interface UserProfile {
  id: string;
  email: string;
  role: 'student' | 'alumni' | 'admin';
  full_name: string;
  avatar_url?: string;
  is_active?: boolean;
  student_profile?: {
    student_id?: string;
    department: string;
    course?: string;
    academic_year?: string;
    graduation_year?: string;
    phone?: string;
  };
  alumni_profile?: {
    alumni_id?: string;
    department: string;
    degree?: string;
    graduation_year: string;
    company?: string;
    designation?: string;
    industry?: string;
    location?: string;
    skills?: string[];
    linkedin?: string;
    github?: string;
    website?: string;
    bio?: string;
    verification_status: 'pending' | 'approved' | 'rejected' | 'suspended';
  };
}

export const authService = {
  async signIn(email: string, password: string, selectedRole: 'student' | 'alumni' | 'admin') {
    const supabase = createClient();

    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      throw new Error(authError.message);
    }

    if (!authData.user) {
      throw new Error('Authentication failed.');
    }

    // Step 4: Strict Security Rule - Read actual role from database
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*, alumni_profiles(verification_status)')
      .eq('id', authData.user.id)
      .single();

    if (profileError || !profile) {
      await supabase.auth.signOut();
      throw new Error('User profile record not found.');
    }

    if (profile.role !== selectedRole) {
      await supabase.auth.signOut();
      throw new Error(`Access denied. Your account is registered as "${profile.role.toUpperCase()}", not "${selectedRole.toUpperCase()}". Please select the correct role.`);
    }

    if (profile.is_active === false) {
      await supabase.auth.signOut();
      throw new Error('Your account has been suspended. Please contact administration.');
    }

    // Check alumni verification status
    if (profile.role === 'alumni') {
      const alumniStatus = profile.alumni_profiles?.[0]?.verification_status || profile.alumni_profiles?.verification_status;
      if (alumniStatus === 'rejected') {
        await supabase.auth.signOut();
        throw new Error('Your alumni verification request was rejected.');
      }
      if (alumniStatus === 'suspended') {
        await supabase.auth.signOut();
        throw new Error('Your alumni account is currently suspended.');
      }
    }

    return { user: authData.user, profile };
  },

  async registerStudent(data: {
    fullName: string;
    email: string;
    password: string;
    studentId?: string;
    department: string;
    course?: string;
    academicYear?: string;
    graduationYear?: string;
    phone?: string;
  }) {
    const supabase = createClient();

    // 1. Sign up user
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          full_name: data.fullName,
          role: 'student',
        }
      }
    });

    if (authError) throw new Error(authError.message);
    if (!authData.user) throw new Error('Failed to create account.');

    const userId = authData.user.id;

    // 2. Insert into profiles
    const { error: profileError } = await supabase
      .from('profiles')
      .insert({
        id: userId,
        email: data.email,
        role: 'student',
        full_name: data.fullName,
      });

    if (profileError) throw new Error(profileError.message);

    // 3. Insert into student_profiles
    const { error: studentError } = await supabase
      .from('student_profiles')
      .insert({
        id: userId,
        student_id: data.studentId,
        department: data.department,
        course: data.course,
        academic_year: data.academicYear,
        graduation_year: data.graduationYear,
        phone: data.phone,
      });

    if (studentError) throw new Error(studentError.message);

    return authData;
  },

  async registerAlumni(data: {
    fullName: string;
    email: string;
    password: string;
    alumniId?: string;
    department: string;
    degree?: string;
    graduationYear: string;
    company?: string;
    designation?: string;
    industry?: string;
    location?: string;
    skills?: string[];
    linkedin?: string;
    github?: string;
    bio?: string;
  }) {
    const supabase = createClient();

    // 1. Sign up user
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          full_name: data.fullName,
          role: 'alumni',
        }
      }
    });

    if (authError) throw new Error(authError.message);
    if (!authData.user) throw new Error('Failed to create account.');

    const userId = authData.user.id;

    // 2. Insert into profiles
    const { error: profileError } = await supabase
      .from('profiles')
      .insert({
        id: userId,
        email: data.email,
        role: 'alumni',
        full_name: data.fullName,
      });

    if (profileError) throw new Error(profileError.message);

    // 3. Insert into alumni_profiles (verification_status = pending)
    const { error: alumniError } = await supabase
      .from('alumni_profiles')
      .insert({
        id: userId,
        alumni_id: data.alumniId,
        department: data.department,
        degree: data.degree,
        graduation_year: data.graduationYear,
        company: data.company,
        designation: data.designation,
        industry: data.industry,
        location: data.location,
        skills: data.skills || [],
        linkedin: data.linkedin,
        github: data.github,
        bio: data.bio,
        verification_status: 'pending',
      });

    if (alumniError) throw new Error(alumniError.message);

    return authData;
  },

  async signOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
  },

  async getCurrentUserProfile(): Promise<UserProfile | null> {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return null;

    const { data: profile, error } = await supabase
      .from('profiles')
      .select(`
        *,
        student_profiles (*),
        alumni_profiles (*)
      `)
      .eq('id', user.id)
      .single();

    if (error || !profile) return null;

    return {
      id: profile.id,
      email: profile.email,
      role: profile.role,
      full_name: profile.full_name,
      avatar_url: profile.avatar_url,
      is_active: profile.is_active,
      student_profile: profile.student_profiles?.[0] || profile.student_profiles || undefined,
      alumni_profile: profile.alumni_profiles?.[0] || profile.alumni_profiles || undefined,
    };
  }
};
