import { ref, watchEffect } from 'vue';

/**
 *
 * @param query This is the equivalent of writing a CSS media query. query should be a string
 * @returns boolean - The boolean returned here is used to check if the browser screen matches the media query query passed in.
 */
export function useMediaQuery(query: string) {
  const matches = ref<boolean>(window.matchMedia(query).matches);

  const updateMatches = () => {
    matches.value = window.matchMedia(query).matches;
  };

  watchEffect(() => {
    window.addEventListener('resize', updateMatches);
    updateMatches();

    return () => {
      window.removeEventListener('resize', updateMatches);
    };
  });

  return {
    matches,
  };
}
