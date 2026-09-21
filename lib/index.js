import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';

export const name = 'video-to-notes-dsh';
export const PACKAGE_NAME = 'dsh-video-to-notes';

/**
 * Resolve the packaged Skill root from the DSH profile's own module resolution.
 * @param profileBaseUrl - Loader baseUrl of the profile that installed this bundle.
 * @returns absolute path of the `skills` directory shipped by this package.
 */
export function resolveSkillRoot(profileBaseUrl) {
  if (!profileBaseUrl) {
    throw new Error('dsh-video-to-notes: missing DSH profile baseUrl for package resolution');
  }
  let manifestPath;
  try {
    manifestPath = createRequire(profileBaseUrl).resolve(`${PACKAGE_NAME}/package.json`);
  } catch (error) {
    throw new Error(
      `dsh-video-to-notes: cannot resolve ${PACKAGE_NAME}/package.json from the DSH profile`,
      { cause: error },
    );
  }
  return join(dirname(manifestPath), 'skills');
}
