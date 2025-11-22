// utils/supabaseClient.ts
import { createClient } from "@supabase/supabase-js";

// ❗ CONTOH SAJA — GANTI DENGAN MILIKMU SENDIRI
const supabaseUrl = "https://bsggfepenfbsqbxgarrb.supabase.co";
const supabaseKey = "sb_secret_KXSpW0U9lJmvWyIpwK_0gw_TQ9JUx6P"; 

// Buat client Supabase
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
