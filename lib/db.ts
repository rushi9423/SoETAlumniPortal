import { kv } from '@vercel/kv';

// Keys Structure:
// user:{id} -> { id, email, password, role, status }
// profile:{id} -> { ...specific profile fields }
// jobs:{id} -> { ...job fields }

export async function getUser(email: string) {
  const userId = await kv.get<string>(`email:${email}`);
  if (!userId) return null;
  return await kv.get(`user:${userId}`);
}

export async function createUser(id: string, email: string, role: string, passHash: string, status: string = 'active') {
  await kv.set(`email:${email}`, id);
  const user = { id, email, role, password: passHash, status };
  await kv.set(`user:${id}`, user);
  if (status === 'pending') {
    await kv.sadd('pending_alumni', id);
  }
  return user;
}

export async function getProfile(userId: string) {
  return await kv.get(`profile:${userId}`);
}

export async function createProfile(userId: string, data: any) {
  await kv.set(`profile:${userId}`, data);
  return data;
}

export async function getJobs() {
  // KV doesn't have native "get all by prefix" easily without scan, 
  // so we can maintain a set of job IDs.
  const jobIds = await kv.smembers('all_jobs');
  if (!jobIds || jobIds.length === 0) return [];
  
  const pipeline = kv.pipeline();
  jobIds.forEach(id => pipeline.get(`job:${id}`));
  return await pipeline.exec();
}

export async function getPendingAlumni() {
  // In a real app we'd use a set of pending IDs to avoid scanning all keys,
  // but for simplicity, we mock returning a list. Let's create an index for pending users.
  const pendingIds = await kv.smembers('pending_alumni');
  if (!pendingIds || pendingIds.length === 0) return [];
  
  const pipeline = kv.pipeline();
  pendingIds.forEach(id => pipeline.get(`user:${id}`));
  const users = await pipeline.exec() as any[];
  
  // fetch profiles
  const profilePipeline = kv.pipeline();
  pendingIds.forEach(id => profilePipeline.get(`profile:${id}`));
  const profiles = await profilePipeline.exec() as any[];
  
  return users.map((u, i) => ({ ...u, profile: profiles[i] }));
}

export async function updateUserStatus(id: string, status: 'active' | 'rejected') {
  const user: any = await kv.get(`user:${id}`);
  if (user) {
    user.status = status;
    await kv.set(`user:${id}`, user);
    await kv.srem('pending_alumni', id);
  }
}
