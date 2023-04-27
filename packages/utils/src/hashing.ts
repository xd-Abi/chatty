/**
 * @packageDocumentation
 * @module Utils-Hashing
 */

import { compare, hash } from 'bcrypt';

/**
 * Hashes a given password using bcrypt hash function.
 *
 * @param {string} password - The plain text password to be hashed.
 * @returns {Promise<string>} - A promise that resolves to the hashed password string.
 */
export async function hashPassword(password: string) {
  return hash(password, 12);
}

/**
 * Compares a plain text password with a hashed password to check if they match.
 *
 * @param {string} plain - The plain text password to be compared.
 * @param {string} hashed - The hashed password to be compared.
 * @returns {Promise<boolean>} - A promise that resolves to a boolean value indicating whether the passwords match.
 */
export async function comparePasswords(plain: string, hashed: string) {
  return compare(plain, hashed);
}
