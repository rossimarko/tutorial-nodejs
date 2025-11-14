/**
 * Greeter module
 * Demonstrates: Default export
 */

/**
 * Generate a greeting message
 * @param {string} name - Name to greet
 * @returns {string} Greeting message
 */
export default function greet(name) {
  const hour = new Date().getHours();
  let timeGreeting;

  if (hour < 12) {
    timeGreeting = 'Good morning';
  } else if (hour < 18) {
    timeGreeting = 'Good afternoon';
  } else {
    timeGreeting = 'Good evening';
  }

  return `${timeGreeting}, ${name}!`;
}
