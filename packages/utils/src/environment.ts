/**
 * @packageDocumentation
 * @module Utils-Environment
 */

/**
 * This function retrieves an environment variable with the specified name and casts its
 * value to the generic type T.
 *
 * @param name - The name of the environment variable to retrieve.
 * @returns The value of the environment variable as type T.
 * @throws An error if the environment variable is not defined.
 */
export function getEnvironmentVariable<T>(name: string): T {
  const variable = process.env[name];

  if (variable === undefined) {
    throw new Error(`Environment variables is missing definition of ${name}`);
  }

  return variable as T;
}
