/**
 * Solution: CLI Calculator
 *
 * A complete command-line calculator with error handling and validation.
 *
 * Usage:
 *   node cli-calculator.js add 10 5      -> Result: 15
 *   node cli-calculator.js subtract 10 5 -> Result: 5
 *   node cli-calculator.js multiply 10 5 -> Result: 50
 *   node cli-calculator.js divide 10 5   -> Result: 2
 */

/**
 * Validate user inputs
 * @param {string} operation - The operation to perform
 * @param {number} num1 - First number
 * @param {number} num2 - Second number
 * @returns {string|null} Error message or null if valid
 */
function validateInputs(operation, num1, num2) {
  const validOperations = ['add', 'subtract', 'multiply', 'divide'];

  if (!validOperations.includes(operation)) {
    return `Invalid operation. Use: ${validOperations.join(', ')}`;
  }

  if (isNaN(num1) || isNaN(num2)) {
    return 'Invalid numbers. Please provide valid numbers.';
  }

  return null;
}

/**
 * Perform the calculation
 * @param {string} operation - The operation to perform
 * @param {number} num1 - First number
 * @param {number} num2 - Second number
 * @returns {number} The result
 * @throws {Error} If division by zero
 */
function calculate(operation, num1, num2) {
  switch (operation) {
    case 'add':
      return num1 + num2;
    case 'subtract':
      return num1 - num2;
    case 'multiply':
      return num1 * num2;
    case 'divide':
      if (num2 === 0) {
        throw new Error('Cannot divide by zero');
      }
      return num1 / num2;
    default:
      throw new Error('Unknown operation');
  }
}

/**
 * Main execution
 */
function main() {
  // Parse command-line arguments
  // argv[0] = node, argv[1] = script path, argv[2+] = our arguments
  const args = process.argv.slice(2);

  // Check if we have enough arguments
  if (args.length < 3) {
    console.error('Error: Not enough arguments');
    console.error('Usage: node cli-calculator.js <operation> <num1> <num2>');
    console.error('Example: node cli-calculator.js add 10 5');
    process.exit(1);
  }

  // Extract operation and numbers
  const [operation, num1Str, num2Str] = args;
  const num1 = parseFloat(num1Str);
  const num2 = parseFloat(num2Str);

  // Validate inputs
  const validationError = validateInputs(operation, num1, num2);
  if (validationError) {
    console.error(`Error: ${validationError}`);
    process.exit(1);
  }

  // Perform calculation
  try {
    const result = calculate(operation, num1, num2);
    console.log(`Result: ${result}`);
    process.exit(0);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
}

// Run the calculator
main();
