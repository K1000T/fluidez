// scripts/create-supabase-bucket.js
import { getSupabaseServerClient } from '../util/supabase.js';
import '../util/env.js'; // To load environment variables

const BUCKET_NAME = 'audios';

async function createBucket() {
  try {
    const supabase = getSupabaseServerClient();
    console.log(`Checking if bucket "${BUCKET_NAME}" exists...`);

    const { data: buckets, error: listError } = await supabase.storage.listBuckets();

    if (listError) {
      throw new Error(`Failed to list buckets: ${listError.message}`);
    }

    const bucketExists = buckets.some(bucket => bucket.name === BUCKET_NAME);

    if (bucketExists) {
      console.log(`Bucket "${BUCKET_NAME}" already exists. Skipping creation.`);
      const { error } = await supabase.storage.updateBucket(BUCKET_NAME, {
        public: true,
      });
      if (error) {
        console.warn(`Warning: Failed to update bucket policy to public: ${error.message}`);
      } else {
        console.log(`Bucket "${BUCKET_NAME}" is set to public.`);
      }
    } else {
      console.log(`Bucket "${BUCKET_NAME}" not found. Creating it now...`);
      const { error } = await supabase.storage.createBucket(BUCKET_NAME, {
        public: true, // Make it public as the code expects public URLs
      });

      if (error) {
        throw new Error(`Failed to create bucket: ${error.message}`);
      }
      console.log(`Successfully created bucket "${BUCKET_NAME}".`);
    }

    console.log('\nConfiguration complete. You should now be able to upload audio files.');

  } catch (err) {
    console.error('\nError during bucket creation:', err.message);
    console.error('Please check your Supabase credentials in your environment variables file.');
    process.exit(1);
  }
}

createBucket();
