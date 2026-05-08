import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const getServiceSupabase = () => {
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
  return createClient(supabaseUrl, serviceKey);
};

// ── Types ──────────────────────────────────────────────

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  years_worked?: number;
  quote: string;
  image_url?: string;
  order_index: number;
  published: boolean;
  created_at: string;
  updated_at: string;
}

export interface QuickFact {
  id: string;
  label: string;
  value: string;
  icon: string;
  order_index: number;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  order_index: number;
  published: boolean;
  created_at: string;
}

export interface SiteContent {
  key: string;
  value: string;
  label: string;
  page: string;
  updated_at: string;
}

export interface MediaItem {
  id: string;
  url: string;
  storage_path: string | null;
  page: string;
  alt_text: string;
  order_index: number;
  created_at: string;
}

// ── Queries ────────────────────────────────────────────

export async function getTestimonials(): Promise<Testimonial[]> {
  const { data, error } = await supabase
    .from('testimonials')
    .select('*')
    .eq('published', true)
    .order('order_index', { ascending: true });
  if (error) throw error;
  return data || [];
}

export async function getQuickFacts(): Promise<QuickFact[]> {
  const { data, error } = await supabase
    .from('quick_facts')
    .select('*')
    .order('order_index', { ascending: true });
  if (error) throw error;
  return data || [];
}

export async function getSetting(key: string): Promise<string | null> {
  const { data, error } = await supabase
    .from('settings')
    .select('value')
    .eq('key', key)
    .single();
  if (error) return null;
  return data?.value || null;
}

export async function getFaqItems(): Promise<FaqItem[]> {
  const { data, error } = await supabase
    .from('faq_items')
    .select('*')
    .eq('published', true)
    .order('order_index', { ascending: true });
  if (error) throw error;
  return data || [];
}

export async function getAllFaqItems(): Promise<FaqItem[]> {
  const { data, error } = await supabase
    .from('faq_items')
    .select('*')
    .order('order_index', { ascending: true });
  if (error) throw error;
  return data || [];
}

export async function getContentByPage(page: string): Promise<Record<string, string>> {
  const { data, error } = await supabase
    .from('site_content')
    .select('key, value')
    .eq('page', page);
  if (error) return {};
  return Object.fromEntries((data || []).map(r => [r.key, r.value]));
}

export async function getAllContent(): Promise<SiteContent[]> {
  const { data, error } = await supabase
    .from('site_content')
    .select('*')
    .order('page', { ascending: true });
  if (error) return [];
  return data || [];
}

export async function getMediaByPage(page: string): Promise<MediaItem[]> {
  const { data, error } = await supabase
    .from('media_items')
    .select('*')
    .eq('page', page)
    .order('order_index', { ascending: true });
  if (error) return [];
  return data || [];
}

// ── Admin mutations ────────────────────────────────────

export async function createTestimonial(testimonial: Omit<Testimonial, 'id' | 'created_at' | 'updated_at'>) {
  const { data, error } = await supabase
    .from('testimonials')
    .insert([testimonial])
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function updateTestimonial(id: string, updates: Partial<Testimonial>) {
  const { data, error } = await supabase
    .from('testimonials')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function deleteTestimonial(id: string) {
  const { error } = await supabase.from('testimonials').delete().eq('id', id);
  if (error) throw error;
}

export async function upsertContent(key: string, value: string) {
  const { error } = await supabase
    .from('site_content')
    .update({ value, updated_at: new Date().toISOString() })
    .eq('key', key);
  if (error) throw error;
}

export async function createFaqItem(item: Omit<FaqItem, 'id' | 'created_at'>) {
  const { data, error } = await supabase
    .from('faq_items')
    .insert([item])
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function updateFaqItem(id: string, updates: Partial<FaqItem>) {
  const { data, error } = await supabase
    .from('faq_items')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function deleteFaqItem(id: string) {
  const { error } = await supabase.from('faq_items').delete().eq('id', id);
  if (error) throw error;
}

export async function createMediaItem(item: Omit<MediaItem, 'id' | 'created_at'>) {
  const { data, error } = await supabase
    .from('media_items')
    .insert([item])
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function deleteMediaItem(id: string, storagePath: string | null) {
  if (storagePath) {
    await supabase.storage.from('media').remove([storagePath]);
  }
  const { error } = await supabase.from('media_items').delete().eq('id', id);
  if (error) throw error;
}

export async function updateMediaOrder(id: string, order_index: number) {
  const { error } = await supabase
    .from('media_items')
    .update({ order_index })
    .eq('id', id);
  if (error) throw error;
}
