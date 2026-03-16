import type { Member } from ".";

/**
 * Placeholder auth implementation.
 * Currently there is no backend, so we always return null (logged-out).
 * You can later replace this with a real API call to your own auth service.
 */
export const getCurrentMember = async (): Promise<Member | null> => {
  return null;
};
