import { kv } from '@vercel/kv';

// Keys Structure:
// user:{id} -> { id, email, password, role, status }
// profile:{id} -> { ...specific profile fields }
// jobs:{id} -> { ...job fields }

export async function getUser(email: string) {
  // To look up a user by email, we can maintain an index
  // email:{email} -> userId
  const userId = await kv.get<string>(`email:${email}`);
  if (!userId) return null;
  return await kv.get(`user:${userId}`);
}

export async function createUser(id: string, email: string, role: string, passHash: string, status: string = 'active') {
  await kv.set(`email:${email}`, id);
  const user = { id, email, role, password: passHash, status };
  await kv.set(`user:${id}`, user);
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
