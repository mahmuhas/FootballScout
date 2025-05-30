import adapter from '@sveltejs/adapter-netlify';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter({
      edge: false,
      split: false
    })
  },
  compilerOptions: {
    runes: true
  },
  preprocess: preprocess()
};

export default config;
