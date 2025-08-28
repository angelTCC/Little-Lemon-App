import 'react-native-url-polyfill/auto'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://fotoumlziuiypfcgrvtp.supabase.co'//YOUR_REACT_NATIVE_SUPABASE_URL
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZvdG91bWx6aXVpeXBmY2dydnRwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU2OTcxMTMsImV4cCI6MjA3MTI3MzExM30.rtz7eM4TfKnzQjvul-SKTaZd7087-2sBxmq_AFzpsy8'//YOUR_REACT_NATIVE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})