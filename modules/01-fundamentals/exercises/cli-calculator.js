/**
 * Exercise: CLI Calculator
 * Difficulty: Easy
 *
 * Build a command-line calculator that performs basic arithmetic operations.
 *
 * Usage:
 *   node cli-calculator.js add 10 5      -> 15
 *   node cli-calculator.js subtract 10 5 -> 5
 *   node cli-calculator.js multiply 10 5 -> 50
 *   node cli-calculator.js divide 10 5   -> 2
 *
 * TODO:
 * 1. Parse command-line arguments using process.argv
 * 2. Extract operation and numbers
 * 3. Validate inputs (operation exists, numbers are valid)
 * 4. Perform the calculation
 * 5. Handle errors (division by zero, invalid inputs)
 * 6. Display the result
 *
 * Expected output:
 *   Success: "Result: 15"
 *   Error: "Error: Invalid operation" or "Error: Invalid numbers"
 */

// TODO: Parse command-line arguments
// Hint: process.argv[0] is node, process.argv[1] is script name
// Your arguments start at process.argv[2]
const args = null; // Replace with actual parsing

// TODO: Extract operation and numbers
const operation = null;
const num1 = null;
const num2 = null;

// TODO: Validate inputs
function validateInputs(operation, num1, num2) {
  // Check if operation is valid
  // Check if numbers are valid numbers
  // Return error message if invalid, null if valid
}

// TODO: Perform calculation
function calculate(operation, num1, num2) {
  // Implement add, subtract, multiply, divide
  // Handle division by zero
  // Return result or throw error
}

// TODO: Main execution
// Parse inputs, validate, calculate, and display result
// Handle any errors and exit with appropriate code

console.log('CLI Calculator - TODO: Implement me!');
