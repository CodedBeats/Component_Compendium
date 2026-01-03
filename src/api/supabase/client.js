import { createClient as createSupabaseClient } from "@supabase/supabase-js";

let client

export function createClient() {
    if (!client) {
        client = createSupabaseClient(
            import.meta.env.VITE_SUPABASE_URL,
            import.meta.env.VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY
        )
    }
    return client
}
