import { supabase, getServiceSupabase } from './supabase';

// Vacatures
export async function getVacatures() {
  const { data, error } = await supabase
    .from('vacatures')
    .select('*')
    .eq('published', true)
    .order('created_at', { ascending: false });
  return { data, error };
}

export async function getVacature(id: string) {
  const { data, error } = await supabase
    .from('vacatures')
    .select('*')
    .eq('id', id)
    .single();
  return { data, error };
}

export async function createVacature(vacature: any) {
  const { data, error } = await supabase
    .from('vacatures')
    .insert([vacature])
    .select()
    .single();
  return { data, error };
}

export async function updateVacature(id: string, updates: any) {
  const { data, error } = await supabase
    .from('vacatures')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  return { data, error };
}

export async function deleteVacature(id: string) {
  const { error } = await supabase
    .from('vacatures')
    .delete()
    .eq('id', id);
  return { error };
}

// Applicants
export async function submitApplicant(applicant: {
  vacature_id: string;
  name: string;
  email?: string;
  phone: string;
  message?: string;
  type: 'MEELOOP' | 'FORMAL';
}) {
  const { data, error } = await supabase
    .from('applicants')
    .insert([applicant])
    .select()
    .single();
  return { data, error };
}

export async function getApplicants(vacatureId?: string) {
  let query = supabase.from('applicants').select('*');
  if (vacatureId) {
    query = query.eq('vacature_id', vacatureId);
  }
  const { data, error } = await query.order('created_at', { ascending: false });
  return { data, error };
}

export async function updateApplicantStatus(id: string, status: string) {
  const { error } = await supabase
    .from('applicants')
    .update({ status })
    .eq('id', id);
  return { error };
}
