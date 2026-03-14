// Run with: npx tsx scripts/seed-quizzes.ts
// Seeds quiz questions into Supabase for all 71 GCSE topics (5 per topic = 355 questions)
// All content accurate to UK AQA GCSE curriculum

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://wmncmoauedmlzbfxajtj.supabase.co";
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

if (!supabaseKey) {
  console.error("Missing SUPABASE_SERVICE_ROLE_KEY environment variable");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

interface QuizQuestion {
  question: string;
  options: string[];
  correct_answer: number;
  explanation: string;
  difficulty: number;
}

// ============================================
// QUIZ QUESTION DATA BY TOPIC SLUG
// All content accurate to UK AQA GCSE curriculum
// 5 questions per topic, 71 topics = 355 questions
// difficulty: 1 (foundation), 2 (crossover), 3 (higher)
// correct_answer: 0-based index into options array
// ============================================

const questionsByTopicSlug: Record<string, QuizQuestion[]> = {

  // ========== MATHS (24 topics) ==========

  "integers-decimals": [
    {
      question: "What is the highest common factor (HCF) of 24 and 36?",
      options: ["6", "12", "8", "4"],
      correct_answer: 1,
      explanation: "Factors of 24: 1, 2, 3, 4, 6, 8, 12, 24. Factors of 36: 1, 2, 3, 4, 6, 9, 12, 18, 36. The highest common factor is 12.",
      difficulty: 1
    },
    {
      question: "Express 180 as a product of its prime factors.",
      options: ["2² × 3² × 5", "2 × 3³ × 5", "2³ × 3 × 5", "2 × 3 × 5²"],
      correct_answer: 0,
      explanation: "180 = 2 × 90 = 2 × 2 × 45 = 2 × 2 × 9 × 5 = 2² × 3² × 5.",
      difficulty: 2
    },
    {
      question: "What is the lowest common multiple (LCM) of 8 and 12?",
      options: ["24", "48", "96", "4"],
      correct_answer: 0,
      explanation: "Multiples of 8: 8, 16, 24, 32... Multiples of 12: 12, 24, 36... The lowest common multiple is 24.",
      difficulty: 1
    },
    {
      question: "Work out 4 + 3 × 5 − 2 using the correct order of operations.",
      options: ["33", "17", "15", "21"],
      correct_answer: 1,
      explanation: "Using BIDMAS: multiplication first, 3 × 5 = 15. Then 4 + 15 − 2 = 17.",
      difficulty: 1
    },
    {
      question: "Which of the following is a prime number?",
      options: ["27", "33", "51", "53"],
      correct_answer: 3,
      explanation: "53 has exactly two factors: 1 and 53. 27 = 3³, 33 = 3 × 11, 51 = 3 × 17.",
      difficulty: 1
    },
  ],

  "fractions-decimals-percentages": [
    {
      question: "Convert 0.375 to a fraction in its simplest form.",
      options: ["3/8", "3/5", "375/1000", "37/100"],
      correct_answer: 0,
      explanation: "0.375 = 375/1000. Dividing numerator and denominator by 125 gives 3/8.",
      difficulty: 1
    },
    {
      question: "A coat costs £80 and is reduced by 15%. What is the sale price?",
      options: ["£65", "£68", "£70", "£12"],
      correct_answer: 1,
      explanation: "15% of £80 = 0.15 × 80 = £12. Sale price = £80 − £12 = £68. Or multiply by 0.85: 80 × 0.85 = £68.",
      difficulty: 2
    },
    {
      question: "Express 7/20 as a decimal.",
      options: ["0.35", "0.7", "0.37", "3.5"],
      correct_answer: 0,
      explanation: "7 ÷ 20 = 0.35. Alternatively, 7/20 = 35/100 = 0.35.",
      difficulty: 1
    },
    {
      question: "After a 20% increase, a value is £360. What was the original value?",
      options: ["£280", "£288", "£300", "£320"],
      correct_answer: 2,
      explanation: "If the value increased by 20%, the new value is 120% of the original. So original = 360 ÷ 1.2 = £300.",
      difficulty: 2
    },
    {
      question: "A house bought for £200,000 increases in value by 5% each year for 3 years. What is it worth to the nearest pound?",
      options: ["£230,000", "£231,525", "£215,000", "£210,000"],
      correct_answer: 1,
      explanation: "Using compound interest: 200,000 × 1.05³ = 200,000 × 1.157625 = £231,525.",
      difficulty: 3
    },
  ],

  "indices-standard-form": [
    {
      question: "Simplify 2³ × 2⁴.",
      options: ["2⁷", "2¹²", "4⁷", "2¹"],
      correct_answer: 0,
      explanation: "When multiplying with the same base, add the powers: 2³ × 2⁴ = 2³⁺⁴ = 2⁷.",
      difficulty: 1
    },
    {
      question: "Write 0.00045 in standard form.",
      options: ["4.5 × 10⁻⁴", "4.5 × 10⁻³", "45 × 10⁻⁵", "0.45 × 10⁻³"],
      correct_answer: 0,
      explanation: "Move the decimal point 4 places to the right to get 4.5. So 0.00045 = 4.5 × 10⁻⁴.",
      difficulty: 2
    },
    {
      question: "What is the value of 5⁰?",
      options: ["0", "1", "5", "Undefined"],
      correct_answer: 1,
      explanation: "Any non-zero number raised to the power of 0 equals 1. So 5⁰ = 1.",
      difficulty: 1
    },
    {
      question: "Simplify (3²)⁴.",
      options: ["3⁸", "3⁶", "9⁸", "3²"],
      correct_answer: 0,
      explanation: "When raising a power to a power, multiply the indices: (3²)⁴ = 3²ˣ⁴ = 3⁸.",
      difficulty: 2
    },
    {
      question: "Evaluate 27^(2/3).",
      options: ["9", "3", "18", "6"],
      correct_answer: 0,
      explanation: "27^(2/3) = (∛27)² = 3² = 9. The denominator gives the root, the numerator gives the power.",
      difficulty: 3
    },
  ],

  "surds": [
    {
      question: "Simplify √50.",
      options: ["5√2", "25√2", "2√5", "10√5"],
      correct_answer: 0,
      explanation: "√50 = √(25 × 2) = √25 × √2 = 5√2.",
      difficulty: 2
    },
    {
      question: "Rationalise the denominator of 1/√3.",
      options: ["√3/3", "3/√3", "1/3", "√3"],
      correct_answer: 0,
      explanation: "Multiply numerator and denominator by √3: (1 × √3)/(√3 × √3) = √3/3.",
      difficulty: 2
    },
    {
      question: "Expand and simplify (2 + √3)(2 − √3).",
      options: ["1", "4 − √3", "7", "4 + 2√3"],
      correct_answer: 0,
      explanation: "Using difference of two squares: (2 + √3)(2 − √3) = 2² − (√3)² = 4 − 3 = 1.",
      difficulty: 3
    },
    {
      question: "Simplify √12 + √27.",
      options: ["5√3", "√39", "3√12", "6√3"],
      correct_answer: 0,
      explanation: "√12 = √(4 × 3) = 2√3. √27 = √(9 × 3) = 3√3. So 2√3 + 3√3 = 5√3.",
      difficulty: 2
    },
    {
      question: "Simplify √72.",
      options: ["6√2", "8√9", "36√2", "3√8"],
      correct_answer: 0,
      explanation: "√72 = √(36 × 2) = √36 × √2 = 6√2.",
      difficulty: 2
    },
  ],

  "algebraic-expressions": [
    {
      question: "Expand and simplify 3(2x + 1) − 2(x − 4).",
      options: ["4x + 11", "4x − 7", "8x + 11", "4x + 3"],
      correct_answer: 0,
      explanation: "3(2x + 1) = 6x + 3. −2(x − 4) = −2x + 8. Combined: 6x + 3 − 2x + 8 = 4x + 11.",
      difficulty: 2
    },
    {
      question: "Factorise x² − 9.",
      options: ["(x + 3)(x − 3)", "(x − 3)²", "(x + 9)(x − 1)", "x(x − 9)"],
      correct_answer: 0,
      explanation: "This is the difference of two squares: x² − 9 = x² − 3² = (x + 3)(x − 3).",
      difficulty: 2
    },
    {
      question: "Factorise 6x² + 9x.",
      options: ["3x(2x + 3)", "6x(x + 9)", "3(2x² + 3x)", "x(6x + 9)"],
      correct_answer: 0,
      explanation: "The HCF of 6x² and 9x is 3x. So 6x² + 9x = 3x(2x + 3).",
      difficulty: 1
    },
    {
      question: "Expand (x + 5)(x − 2).",
      options: ["x² + 3x − 10", "x² − 3x − 10", "x² + 7x − 10", "x² + 3x + 10"],
      correct_answer: 0,
      explanation: "Using FOIL: x² − 2x + 5x − 10 = x² + 3x − 10.",
      difficulty: 2
    },
    {
      question: "Simplify (2x³y²) × (3xy⁴).",
      options: ["6x⁴y⁶", "5x⁴y⁶", "6x³y⁸", "5x³y⁸"],
      correct_answer: 0,
      explanation: "Multiply coefficients: 2 × 3 = 6. Add powers of x: 3 + 1 = 4. Add powers of y: 2 + 4 = 6. Result: 6x⁴y⁶.",
      difficulty: 2
    },
  ],

  "linear-equations": [
    {
      question: "Solve 3x + 7 = 22.",
      options: ["x = 5", "x = 3", "x = 7", "x = 29/3"],
      correct_answer: 0,
      explanation: "3x + 7 = 22. Subtract 7: 3x = 15. Divide by 3: x = 5.",
      difficulty: 1
    },
    {
      question: "Solve 4(2x − 1) = 20.",
      options: ["x = 3", "x = 2.5", "x = 5", "x = 2"],
      correct_answer: 0,
      explanation: "Expand: 8x − 4 = 20. Add 4: 8x = 24. Divide by 8: x = 3.",
      difficulty: 2
    },
    {
      question: "Solve (x + 3)/5 = 4.",
      options: ["x = 17", "x = 7", "x = 23", "x = 1"],
      correct_answer: 0,
      explanation: "Multiply both sides by 5: x + 3 = 20. Subtract 3: x = 17.",
      difficulty: 2
    },
    {
      question: "Solve 5x − 3 = 2x + 12.",
      options: ["x = 5", "x = 3", "x = 9", "x = 15"],
      correct_answer: 0,
      explanation: "Subtract 2x from both sides: 3x − 3 = 12. Add 3: 3x = 15. Divide by 3: x = 5.",
      difficulty: 1
    },
    {
      question: "Solve 3(x − 2) = 2(x + 1).",
      options: ["x = 8", "x = 4", "x = −4", "x = 1"],
      correct_answer: 0,
      explanation: "Expand: 3x − 6 = 2x + 2. Subtract 2x: x − 6 = 2. Add 6: x = 8.",
      difficulty: 2
    },
  ],

  "quadratic-equations": [
    {
      question: "Solve x² − 5x + 6 = 0.",
      options: ["x = 2 or x = 3", "x = −2 or x = −3", "x = 1 or x = 6", "x = 2 or x = −3"],
      correct_answer: 0,
      explanation: "Factorise: (x − 2)(x − 3) = 0. So x = 2 or x = 3.",
      difficulty: 2
    },
    {
      question: "Solve x² − 16 = 0.",
      options: ["x = 4 or x = −4", "x = 4 only", "x = 8 or x = −8", "x = 16"],
      correct_answer: 0,
      explanation: "x² = 16, so x = ±√16 = ±4. Both positive and negative roots are solutions.",
      difficulty: 1
    },
    {
      question: "Solve 2x² + 5x − 3 = 0.",
      options: ["x = 0.5 or x = −3", "x = 3 or x = −0.5", "x = 1.5 or x = −1", "x = −1.5 or x = 1"],
      correct_answer: 0,
      explanation: "Factorise: (2x − 1)(x + 3) = 0. So 2x − 1 = 0 gives x = 0.5, and x + 3 = 0 gives x = −3.",
      difficulty: 3
    },
    {
      question: "What does the discriminant b² − 4ac tell you about a quadratic equation?",
      options: ["The number and type of roots", "The y-intercept", "The vertex coordinates", "The axis of symmetry"],
      correct_answer: 0,
      explanation: "If b² − 4ac > 0, there are two real roots. If = 0, one repeated root. If < 0, no real roots.",
      difficulty: 2
    },
    {
      question: "Complete the square for x² + 6x + 1.",
      options: ["(x + 3)² − 8", "(x + 6)² − 35", "(x + 3)² + 1", "(x − 3)² − 8"],
      correct_answer: 0,
      explanation: "x² + 6x + 1 = (x + 3)² − 9 + 1 = (x + 3)² − 8. Halve the coefficient of x to get 3, then subtract 3².",
      difficulty: 3
    },
  ],

  "simultaneous-equations": [
    {
      question: "Solve the simultaneous equations: 2x + y = 7 and x − y = 2.",
      options: ["x = 3, y = 1", "x = 2, y = 3", "x = 4, y = −1", "x = 1, y = 5"],
      correct_answer: 0,
      explanation: "Add both equations: 3x = 9, so x = 3. Substitute into x − y = 2: 3 − y = 2, so y = 1.",
      difficulty: 2
    },
    {
      question: "Solve: 3x + 2y = 12 and x + 2y = 8.",
      options: ["x = 2, y = 3", "x = 4, y = 0", "x = 3, y = 2.5", "x = 1, y = 4.5"],
      correct_answer: 0,
      explanation: "Subtract the second from the first: 2x = 4, so x = 2. Substitute: 2 + 2y = 8, 2y = 6, y = 3.",
      difficulty: 2
    },
    {
      question: "Solve: y = x² and y = 3x + 4. What are the x-values?",
      options: ["x = 4 or x = −1", "x = 2 or x = −2", "x = 1 or x = 4", "x = −4 or x = 1"],
      correct_answer: 0,
      explanation: "Substitute: x² = 3x + 4, so x² − 3x − 4 = 0. Factorise: (x − 4)(x + 1) = 0. x = 4 or x = −1.",
      difficulty: 3
    },
    {
      question: "Solve: 5x + 3y = 21 and 2x + 3y = 12.",
      options: ["x = 3, y = 2", "x = 2, y = 3", "x = 4, y = 1", "x = 1, y = 4"],
      correct_answer: 0,
      explanation: "Subtract: 3x = 9, so x = 3. Substitute: 15 + 3y = 21, 3y = 6, y = 2.",
      difficulty: 2
    },
    {
      question: "Which method is best when one equation is linear and the other is quadratic?",
      options: ["Substitution", "Elimination", "Trial and improvement", "Graphical only"],
      correct_answer: 0,
      explanation: "When one equation is quadratic, rearrange the linear equation for one variable and substitute into the quadratic.",
      difficulty: 1
    },
  ],

  "sequences": [
    {
      question: "What is the nth term of the arithmetic sequence 3, 7, 11, 15, ...?",
      options: ["4n − 1", "4n + 3", "3n + 4", "4n + 1"],
      correct_answer: 0,
      explanation: "Common difference = 4, so the nth term starts with 4n. When n = 1: 4(1) = 4, but we need 3, so subtract 1. nth term = 4n − 1.",
      difficulty: 2
    },
    {
      question: "Find the 10th term of the sequence 5, 8, 11, 14, ...",
      options: ["32", "35", "30", "38"],
      correct_answer: 0,
      explanation: "Common difference = 3. nth term = 3n + 2. When n = 10: 3(10) + 2 = 32.",
      difficulty: 1
    },
    {
      question: "What type of sequence is 2, 6, 18, 54, ...?",
      options: ["Geometric", "Arithmetic", "Quadratic", "Fibonacci"],
      correct_answer: 0,
      explanation: "Each term is multiplied by 3 to get the next term (common ratio = 3). This is a geometric sequence.",
      difficulty: 1
    },
    {
      question: "The nth term of a sequence is n². What are the first four terms?",
      options: ["1, 4, 9, 16", "1, 2, 3, 4", "2, 4, 8, 16", "1, 3, 6, 10"],
      correct_answer: 0,
      explanation: "Substitute n = 1, 2, 3, 4: 1² = 1, 2² = 4, 3² = 9, 4² = 16.",
      difficulty: 1
    },
    {
      question: "A sequence has nth term 3n + 2. What is the 20th term?",
      options: ["62", "60", "66", "58"],
      correct_answer: 0,
      explanation: "Substitute n = 20: 3(20) + 2 = 60 + 2 = 62.",
      difficulty: 1
    },
  ],

  "straight-line-graphs": [
    {
      question: "What is the gradient of the line y = 3x − 5?",
      options: ["3", "−5", "5", "−3"],
      correct_answer: 0,
      explanation: "In y = mx + c form, the gradient m is the coefficient of x. Here m = 3.",
      difficulty: 1
    },
    {
      question: "Find the equation of a line with gradient 2 passing through (0, 3).",
      options: ["y = 2x + 3", "y = 3x + 2", "y = 2x − 3", "y = 3x − 2"],
      correct_answer: 0,
      explanation: "Using y = mx + c: gradient m = 2 and y-intercept c = 3 (since the line passes through (0, 3)). So y = 2x + 3.",
      difficulty: 1
    },
    {
      question: "Find the gradient of the line passing through (1, 3) and (3, 7).",
      options: ["2", "4", "1/2", "5"],
      correct_answer: 0,
      explanation: "Gradient = (y₂ − y₁)/(x₂ − x₁) = (7 − 3)/(3 − 1) = 4/2 = 2.",
      difficulty: 2
    },
    {
      question: "The lines y = 2x + 1 and y = −½x + 3 are:",
      options: ["Perpendicular", "Parallel", "The same line", "Neither parallel nor perpendicular"],
      correct_answer: 0,
      explanation: "Two lines are perpendicular if the product of their gradients is −1. Here: 2 × (−½) = −1, so they are perpendicular.",
      difficulty: 3
    },
    {
      question: "What is the y-intercept of the line 2y = 6x + 10?",
      options: ["5", "10", "3", "6"],
      correct_answer: 0,
      explanation: "Rearrange to y = mx + c: y = 3x + 5. The y-intercept is c = 5.",
      difficulty: 2
    },
  ],

  "quadratic-graphs": [
    {
      question: "What is the shape of a quadratic graph called?",
      options: ["Parabola", "Hyperbola", "Ellipse", "Straight line"],
      correct_answer: 0,
      explanation: "A quadratic function y = ax² + bx + c produces a U-shaped curve called a parabola.",
      difficulty: 1
    },
    {
      question: "Where does y = x² − 4 cross the x-axis?",
      options: ["x = 2 and x = −2", "x = 4 and x = −4", "x = 2 only", "It doesn't cross the x-axis"],
      correct_answer: 0,
      explanation: "Set y = 0: x² − 4 = 0, x² = 4, x = ±2. The graph crosses the x-axis at (2, 0) and (−2, 0).",
      difficulty: 2
    },
    {
      question: "What is the turning point of y = (x − 3)² + 1?",
      options: ["(3, 1)", "(−3, 1)", "(3, −1)", "(−3, −1)"],
      correct_answer: 0,
      explanation: "In the form y = (x − a)² + b, the turning point is (a, b). Here it is (3, 1).",
      difficulty: 2
    },
    {
      question: "For y = −x² + 4x − 3, does the parabola open upwards or downwards?",
      options: ["Downwards", "Upwards", "Neither — it's a straight line", "It depends on the x-value"],
      correct_answer: 0,
      explanation: "The coefficient of x² is negative (−1), so the parabola opens downwards (∩ shape).",
      difficulty: 1
    },
    {
      question: "Where does y = x² − 6x + 8 cross the y-axis?",
      options: ["(0, 8)", "(0, −6)", "(0, 0)", "(0, 2)"],
      correct_answer: 0,
      explanation: "The y-intercept is found by setting x = 0: y = 0 − 0 + 8 = 8. So it crosses at (0, 8).",
      difficulty: 1
    },
  ],

  "inequalities": [
    {
      question: "Solve 3x + 5 > 14.",
      options: ["x > 3", "x > 19/3", "x < 3", "x > 6"],
      correct_answer: 0,
      explanation: "3x + 5 > 14. Subtract 5: 3x > 9. Divide by 3: x > 3.",
      difficulty: 1
    },
    {
      question: "Solve −2x ≤ 6.",
      options: ["x ≥ −3", "x ≤ −3", "x ≥ 3", "x ≤ 3"],
      correct_answer: 0,
      explanation: "Divide both sides by −2 and reverse the inequality sign: x ≥ −3.",
      difficulty: 2
    },
    {
      question: "On a number line, what does a filled (solid) circle represent?",
      options: ["The value is included (≤ or ≥)", "The value is excluded (< or >)", "The endpoint is zero", "The inequality has no solution"],
      correct_answer: 0,
      explanation: "A filled circle means the value is included in the solution set, corresponding to ≤ or ≥.",
      difficulty: 1
    },
    {
      question: "Solve 4 < 2x + 1 ≤ 11.",
      options: ["1.5 < x ≤ 5", "2.5 < x ≤ 6", "1 < x ≤ 5", "3 < x ≤ 10"],
      correct_answer: 0,
      explanation: "Subtract 1 from all parts: 3 < 2x ≤ 10. Divide by 2: 1.5 < x ≤ 5.",
      difficulty: 2
    },
    {
      question: "On a graph, which type of inequality is shown by a dashed line?",
      options: ["< or > (strict inequality)", "≤ or ≥ (inclusive)", "= (equality only)", "≠ (not equal)"],
      correct_answer: 0,
      explanation: "A dashed line shows that points on the line are NOT included, representing strict inequalities < or >.",
      difficulty: 2
    },
  ],

  "ratio-proportion": [
    {
      question: "Share £120 in the ratio 3 : 5. How much is the larger share?",
      options: ["£75", "£45", "£80", "£60"],
      correct_answer: 0,
      explanation: "Total parts = 3 + 5 = 8. One part = £120 ÷ 8 = £15. Larger share = 5 × £15 = £75.",
      difficulty: 1
    },
    {
      question: "A recipe for 4 people uses 200 g of flour. How much flour is needed for 6 people?",
      options: ["300 g", "250 g", "400 g", "150 g"],
      correct_answer: 0,
      explanation: "For 1 person: 200 ÷ 4 = 50 g. For 6 people: 50 × 6 = 300 g.",
      difficulty: 1
    },
    {
      question: "Write the ratio 8 : 12 in its simplest form.",
      options: ["2 : 3", "4 : 6", "1 : 1.5", "3 : 2"],
      correct_answer: 0,
      explanation: "Divide both parts by the HCF (4): 8 ÷ 4 = 2, 12 ÷ 4 = 3. Simplest form is 2 : 3.",
      difficulty: 1
    },
    {
      question: "y is directly proportional to x. When x = 4, y = 12. Find y when x = 7.",
      options: ["21", "28", "19", "16"],
      correct_answer: 0,
      explanation: "y = kx. Using y = 12 when x = 4: k = 12/4 = 3. When x = 7: y = 3 × 7 = 21.",
      difficulty: 2
    },
    {
      question: "y is inversely proportional to x. When x = 3, y = 6. Find y when x = 9.",
      options: ["2", "18", "3", "6"],
      correct_answer: 0,
      explanation: "y = k/x. Using y = 6 when x = 3: k = 6 × 3 = 18. When x = 9: y = 18/9 = 2.",
      difficulty: 3
    },
  ],

  "rates-of-change": [
    {
      question: "A car travels 150 miles in 3 hours. What is its average speed?",
      options: ["50 mph", "45 mph", "60 mph", "53 mph"],
      correct_answer: 0,
      explanation: "Average speed = distance ÷ time = 150 ÷ 3 = 50 mph.",
      difficulty: 1
    },
    {
      question: "Convert 5 m/s to km/h.",
      options: ["18 km/h", "1.39 km/h", "50 km/h", "12 km/h"],
      correct_answer: 0,
      explanation: "Multiply by 3.6 (or multiply by 3600/1000): 5 × 3.6 = 18 km/h.",
      difficulty: 2
    },
    {
      question: "On a distance–time graph, what does a steeper line represent?",
      options: ["A faster speed", "A slower speed", "Deceleration", "No movement"],
      correct_answer: 0,
      explanation: "The gradient of a distance–time graph represents speed. A steeper gradient means a faster speed.",
      difficulty: 1
    },
    {
      question: "What does the gradient of a velocity–time graph represent?",
      options: ["Acceleration", "Distance", "Speed", "Time"],
      correct_answer: 0,
      explanation: "The gradient (rate of change) of a velocity–time graph gives the acceleration.",
      difficulty: 2
    },
    {
      question: "What does the area under a velocity–time graph represent?",
      options: ["Distance travelled", "Acceleration", "Average speed", "Time taken"],
      correct_answer: 0,
      explanation: "The area under a velocity–time graph gives the total distance (or displacement) travelled.",
      difficulty: 2
    },
  ],

  "angles-polygons": [
    {
      question: "What is the sum of interior angles of a pentagon?",
      options: ["540°", "360°", "720°", "180°"],
      correct_answer: 0,
      explanation: "Sum of interior angles = (n − 2) × 180° = (5 − 2) × 180° = 3 × 180° = 540°.",
      difficulty: 1
    },
    {
      question: "What is each exterior angle of a regular hexagon?",
      options: ["60°", "120°", "90°", "45°"],
      correct_answer: 0,
      explanation: "Exterior angles of any polygon sum to 360°. For a regular hexagon: 360° ÷ 6 = 60°.",
      difficulty: 2
    },
    {
      question: "Angles on a straight line sum to:",
      options: ["180°", "360°", "90°", "270°"],
      correct_answer: 0,
      explanation: "A straight line forms a half turn, which is 180°. Angles on a straight line always sum to 180°.",
      difficulty: 1
    },
    {
      question: "What is the name of a 7-sided polygon?",
      options: ["Heptagon", "Hexagon", "Octagon", "Nonagon"],
      correct_answer: 0,
      explanation: "A 7-sided polygon is called a heptagon. Hexagon = 6, Octagon = 8, Nonagon = 9.",
      difficulty: 1
    },
    {
      question: "Two parallel lines are cut by a transversal. Alternate angles are:",
      options: ["Equal", "Supplementary (sum to 180°)", "Right angles", "Complementary (sum to 90°)"],
      correct_answer: 0,
      explanation: "Alternate angles (Z-angles) formed between parallel lines and a transversal are equal.",
      difficulty: 2
    },
  ],

  "area-perimeter": [
    {
      question: "Find the area of a triangle with base 8 cm and height 5 cm.",
      options: ["20 cm²", "40 cm²", "13 cm²", "26 cm²"],
      correct_answer: 0,
      explanation: "Area of a triangle = ½ × base × height = ½ × 8 × 5 = 20 cm².",
      difficulty: 1
    },
    {
      question: "Find the circumference of a circle with radius 7 cm. Give your answer to 1 decimal place.",
      options: ["44.0 cm", "22.0 cm", "153.9 cm", "21.9 cm"],
      correct_answer: 0,
      explanation: "Circumference = 2πr = 2 × π × 7 = 14π ≈ 44.0 cm.",
      difficulty: 2
    },
    {
      question: "Find the area of a trapezium with parallel sides 6 cm and 10 cm, and height 4 cm.",
      options: ["32 cm²", "40 cm²", "24 cm²", "60 cm²"],
      correct_answer: 0,
      explanation: "Area = ½(a + b) × h = ½(6 + 10) × 4 = ½ × 16 × 4 = 32 cm².",
      difficulty: 2
    },
    {
      question: "A rectangle has a perimeter of 30 cm and a length of 10 cm. What is its width?",
      options: ["5 cm", "10 cm", "15 cm", "20 cm"],
      correct_answer: 0,
      explanation: "Perimeter = 2(length + width). 30 = 2(10 + w). 15 = 10 + w. w = 5 cm.",
      difficulty: 1
    },
    {
      question: "Find the area of a circle with diameter 12 cm. Give your answer to 1 decimal place.",
      options: ["113.1 cm²", "452.4 cm²", "37.7 cm²", "226.2 cm²"],
      correct_answer: 0,
      explanation: "Radius = 12 ÷ 2 = 6 cm. Area = πr² = π × 6² = 36π ≈ 113.1 cm².",
      difficulty: 2
    },
  ],

  "volume-surface-area": [
    {
      question: "Find the volume of a cuboid with dimensions 4 cm × 5 cm × 3 cm.",
      options: ["60 cm³", "12 cm³", "94 cm³", "24 cm³"],
      correct_answer: 0,
      explanation: "Volume = length × width × height = 4 × 5 × 3 = 60 cm³.",
      difficulty: 1
    },
    {
      question: "Find the volume of a cylinder with radius 3 cm and height 10 cm. Give your answer to 1 d.p.",
      options: ["282.7 cm³", "90.0 cm³", "188.5 cm³", "94.2 cm³"],
      correct_answer: 0,
      explanation: "Volume = πr²h = π × 3² × 10 = 90π ≈ 282.7 cm³.",
      difficulty: 2
    },
    {
      question: "What is the surface area of a cube with side length 5 cm?",
      options: ["150 cm²", "125 cm²", "25 cm²", "100 cm²"],
      correct_answer: 0,
      explanation: "A cube has 6 faces, each with area 5² = 25 cm². Total surface area = 6 × 25 = 150 cm².",
      difficulty: 1
    },
    {
      question: "Find the volume of a sphere with radius 6 cm. Give your answer to 1 d.p.",
      options: ["904.8 cm³", "452.4 cm³", "288.0 cm³", "113.1 cm³"],
      correct_answer: 0,
      explanation: "Volume = (4/3)πr³ = (4/3) × π × 6³ = (4/3) × π × 216 = 288π ≈ 904.8 cm³.",
      difficulty: 3
    },
    {
      question: "Find the volume of a cone with radius 4 cm and height 9 cm. Give your answer to 1 d.p.",
      options: ["150.8 cm³", "452.4 cm³", "48.0 cm³", "301.6 cm³"],
      correct_answer: 0,
      explanation: "Volume = (1/3)πr²h = (1/3) × π × 16 × 9 = 48π ≈ 150.8 cm³.",
      difficulty: 3
    },
  ],

  "transformations": [
    {
      question: "What are the four types of transformation at GCSE?",
      options: [
        "Reflection, rotation, translation, enlargement",
        "Reflection, rotation, translation, shearing",
        "Rotation, enlargement, reduction, reflection",
        "Translation, stretching, rotation, projection"
      ],
      correct_answer: 0,
      explanation: "The four transformations studied at GCSE are reflection, rotation, translation, and enlargement.",
      difficulty: 1
    },
    {
      question: "A shape is translated by the vector (3, −2). What does this mean?",
      options: [
        "3 units right and 2 units down",
        "3 units left and 2 units up",
        "3 units up and 2 units right",
        "2 units right and 3 units down"
      ],
      correct_answer: 0,
      explanation: "The top number in the column vector gives horizontal movement (positive = right). The bottom number gives vertical (negative = down).",
      difficulty: 1
    },
    {
      question: "What three pieces of information are needed to fully describe a rotation?",
      options: [
        "Centre, angle, and direction",
        "Scale factor, centre, and angle",
        "Mirror line, angle, and direction",
        "Vector, angle, and centre"
      ],
      correct_answer: 0,
      explanation: "A rotation is fully described by its centre of rotation, angle of rotation, and direction (clockwise or anticlockwise).",
      difficulty: 2
    },
    {
      question: "An enlargement with scale factor 2 from centre (0, 0) maps point (3, 1) to:",
      options: ["(6, 2)", "(5, 3)", "(1.5, 0.5)", "(3, 2)"],
      correct_answer: 0,
      explanation: "Multiply each coordinate by the scale factor: (3 × 2, 1 × 2) = (6, 2).",
      difficulty: 2
    },
    {
      question: "Which transformation changes the size of a shape?",
      options: ["Enlargement", "Rotation", "Reflection", "Translation"],
      correct_answer: 0,
      explanation: "Enlargement is the only GCSE transformation that changes the size of a shape (the others preserve shape and size).",
      difficulty: 1
    },
  ],

  "pythagoras-trigonometry": [
    {
      question: "A right-angled triangle has legs of 3 cm and 4 cm. What is the hypotenuse?",
      options: ["5 cm", "7 cm", "6 cm", "√7 cm"],
      correct_answer: 0,
      explanation: "Using Pythagoras: c² = 3² + 4² = 9 + 16 = 25. c = √25 = 5 cm.",
      difficulty: 1
    },
    {
      question: "What is the value of sin 30°?",
      options: ["0.5", "√3/2", "1/√2", "1"],
      correct_answer: 0,
      explanation: "sin 30° = 0.5. This is one of the exact trigonometric values you should memorise.",
      difficulty: 2
    },
    {
      question: "If tan θ = 1, what is the angle θ?",
      options: ["45°", "30°", "60°", "90°"],
      correct_answer: 0,
      explanation: "tan 45° = 1. This is because in a 45° right triangle, the opposite and adjacent sides are equal.",
      difficulty: 2
    },
    {
      question: "In a right-angled triangle, which trigonometric ratio is opposite/hypotenuse?",
      options: ["Sine (sin)", "Cosine (cos)", "Tangent (tan)", "None of these"],
      correct_answer: 0,
      explanation: "SOH-CAH-TOA: Sin = Opposite/Hypotenuse. Cos = Adjacent/Hypotenuse. Tan = Opposite/Adjacent.",
      difficulty: 1
    },
    {
      question: "A ladder 5 m long leans against a wall with its base 3 m from the wall. How high up the wall does it reach?",
      options: ["4 m", "√34 m", "2 m", "8 m"],
      correct_answer: 0,
      explanation: "Using Pythagoras: height² = 5² − 3² = 25 − 9 = 16. Height = √16 = 4 m.",
      difficulty: 2
    },
  ],

  "vectors": [
    {
      question: "If a = (3, 2) and b = (1, −4), find a + b.",
      options: ["(4, −2)", "(2, 6)", "(4, 2)", "(3, −8)"],
      correct_answer: 0,
      explanation: "Add corresponding components: (3 + 1, 2 + (−4)) = (4, −2).",
      difficulty: 1
    },
    {
      question: "If a = (3, 1), what is 2a?",
      options: ["(6, 2)", "(5, 3)", "(3, 2)", "(6, 1)"],
      correct_answer: 0,
      explanation: "Multiply each component by the scalar: 2 × (3, 1) = (6, 2).",
      difficulty: 1
    },
    {
      question: "If the position vectors of A and B are a and b respectively, what is the vector AB?",
      options: ["b − a", "a − b", "a + b", "b + a"],
      correct_answer: 0,
      explanation: "To go from A to B, we calculate AB = b − a (end point minus start point).",
      difficulty: 2
    },
    {
      question: "If p = (−2, 5), what is −p?",
      options: ["(2, −5)", "(−2, −5)", "(2, 5)", "(5, −2)"],
      correct_answer: 0,
      explanation: "The negative of a vector reverses its direction: −(−2, 5) = (2, −5).",
      difficulty: 1
    },
    {
      question: "What is the magnitude of the vector (3, 4)?",
      options: ["5", "7", "√7", "25"],
      correct_answer: 0,
      explanation: "Magnitude = √(3² + 4²) = √(9 + 16) = √25 = 5.",
      difficulty: 2
    },
  ],

  "circle-theorems": [
    {
      question: "The angle in a semicircle is always:",
      options: ["90°", "180°", "45°", "60°"],
      correct_answer: 0,
      explanation: "Any angle inscribed in a semicircle (subtended by a diameter) is always a right angle (90°).",
      difficulty: 2
    },
    {
      question: "The angle at the centre of a circle is ___ the angle at the circumference subtended by the same arc.",
      options: ["Twice", "Half", "Equal to", "Three times"],
      correct_answer: 0,
      explanation: "The angle at the centre is always twice the angle at the circumference when both are subtended by the same arc.",
      difficulty: 2
    },
    {
      question: "Opposite angles in a cyclic quadrilateral sum to:",
      options: ["180°", "360°", "90°", "270°"],
      correct_answer: 0,
      explanation: "In a cyclic quadrilateral (all four vertices on the circle), opposite angles are supplementary (sum to 180°).",
      difficulty: 2
    },
    {
      question: "A tangent to a circle is ___ to the radius at the point of contact.",
      options: ["Perpendicular", "Parallel", "Equal in length", "At 45°"],
      correct_answer: 0,
      explanation: "A tangent always meets the radius at right angles (90°) at the point where it touches the circle.",
      difficulty: 2
    },
    {
      question: "Angles in the same segment of a circle are:",
      options: ["Equal", "Supplementary", "Complementary", "Double"],
      correct_answer: 0,
      explanation: "Angles subtended by the same arc in the same segment are always equal.",
      difficulty: 3
    },
  ],

  "data-representation": [
    {
      question: "Which type of chart is best for showing proportions of a whole?",
      options: ["Pie chart", "Bar chart", "Line graph", "Scatter graph"],
      correct_answer: 0,
      explanation: "Pie charts show how a total is divided into parts, making them ideal for displaying proportions.",
      difficulty: 1
    },
    {
      question: "In a histogram, what is represented by the area of each bar?",
      options: ["Frequency", "Frequency density", "Class width", "Cumulative frequency"],
      correct_answer: 0,
      explanation: "In a histogram, the area of each bar represents the frequency. The y-axis shows frequency density.",
      difficulty: 2
    },
    {
      question: "What type of correlation does a scatter graph show when points go from bottom-left to top-right?",
      options: ["Positive correlation", "Negative correlation", "No correlation", "Perfect correlation"],
      correct_answer: 0,
      explanation: "When points trend upward from left to right, this shows a positive correlation (as one variable increases, so does the other).",
      difficulty: 1
    },
    {
      question: "What is a frequency polygon?",
      options: [
        "A line graph joining midpoints of class intervals",
        "A bar chart with no gaps",
        "A pie chart divided into equal parts",
        "A table of tally marks"
      ],
      correct_answer: 0,
      explanation: "A frequency polygon is drawn by plotting frequency against the midpoint of each class interval and joining with straight lines.",
      difficulty: 2
    },
    {
      question: "In a grouped frequency table, which value is used to estimate the mean?",
      options: ["Midpoint of each class", "Lower bound of each class", "Upper bound of each class", "Class width"],
      correct_answer: 0,
      explanation: "The midpoint of each class interval is used as a representative value to estimate the mean from grouped data.",
      difficulty: 2
    },
  ],

  "averages-spread": [
    {
      question: "Find the median of: 3, 7, 1, 9, 5.",
      options: ["5", "3", "7", "25"],
      correct_answer: 0,
      explanation: "First order the data: 1, 3, 5, 7, 9. The middle value (3rd of 5) is 5.",
      difficulty: 1
    },
    {
      question: "Find the range of: 12, 3, 7, 15, 4.",
      options: ["12", "7", "15", "3"],
      correct_answer: 0,
      explanation: "Range = highest − lowest = 15 − 3 = 12.",
      difficulty: 1
    },
    {
      question: "The mean of 5 numbers is 8. What is the total of all 5 numbers?",
      options: ["40", "1.6", "13", "35"],
      correct_answer: 0,
      explanation: "Mean = total ÷ number of values. So total = mean × number of values = 8 × 5 = 40.",
      difficulty: 1
    },
    {
      question: "What is the interquartile range (IQR)?",
      options: ["Q3 − Q1", "Max − Min", "Q2 − Q1", "Mean − Median"],
      correct_answer: 0,
      explanation: "The interquartile range is Q3 (upper quartile) minus Q1 (lower quartile). It measures the spread of the middle 50% of data.",
      difficulty: 2
    },
    {
      question: "Which average is least affected by extreme values (outliers)?",
      options: ["Median", "Mean", "Range", "All are equally affected"],
      correct_answer: 0,
      explanation: "The median is not affected by outliers because it only considers the middle value, not the actual values of extreme data points.",
      difficulty: 2
    },
  ],

  "probability": [
    {
      question: "A fair six-sided dice is rolled. What is the probability of getting an even number?",
      options: ["1/2", "1/3", "1/6", "2/3"],
      correct_answer: 0,
      explanation: "Even numbers on a dice: 2, 4, 6 — that's 3 out of 6 outcomes. P(even) = 3/6 = 1/2.",
      difficulty: 1
    },
    {
      question: "P(A) = 0.3 and P(B) = 0.5. If A and B are independent events, what is P(A and B)?",
      options: ["0.15", "0.8", "0.2", "0.35"],
      correct_answer: 0,
      explanation: "For independent events: P(A and B) = P(A) × P(B) = 0.3 × 0.5 = 0.15.",
      difficulty: 2
    },
    {
      question: "Two events are mutually exclusive. What is P(A or B)?",
      options: ["P(A) + P(B)", "P(A) × P(B)", "P(A) − P(B)", "P(A) + P(B) − P(A and B)"],
      correct_answer: 0,
      explanation: "For mutually exclusive events (cannot happen at the same time), P(A or B) = P(A) + P(B).",
      difficulty: 2
    },
    {
      question: "A bag contains 3 red balls and 5 blue balls. One ball is picked at random. What is the probability of picking a red ball?",
      options: ["3/8", "3/5", "5/8", "1/3"],
      correct_answer: 0,
      explanation: "Total balls = 3 + 5 = 8. P(red) = number of red ÷ total = 3/8.",
      difficulty: 1
    },
    {
      question: "All probabilities in a sample space must sum to:",
      options: ["1", "0", "100", "It depends on the experiment"],
      correct_answer: 0,
      explanation: "The sum of all probabilities in a complete sample space is always 1 (certainty).",
      difficulty: 1
    },
  ],

  // ========== BIOLOGY (14 topics) ==========

  "cell-structure": [
    {
      question: "What is the function of the mitochondria?",
      options: [
        "Site of aerobic respiration",
        "Site of photosynthesis",
        "Stores genetic information",
        "Controls what enters and leaves the cell"
      ],
      correct_answer: 0,
      explanation: "Mitochondria are the organelles where aerobic respiration takes place, releasing energy for cell processes.",
      difficulty: 1
    },
    {
      question: "Which organelle contains the genetic material in a eukaryotic cell?",
      options: ["Nucleus", "Ribosome", "Cell membrane", "Cytoplasm"],
      correct_answer: 0,
      explanation: "The nucleus contains DNA (chromosomes), which carries the genetic instructions for the cell.",
      difficulty: 1
    },
    {
      question: "Which structures are found in plant cells but NOT in animal cells?",
      options: [
        "Cell wall, chloroplasts, and permanent vacuole",
        "Nucleus, ribosomes, and mitochondria",
        "Cell membrane, cytoplasm, and nucleus",
        "Ribosomes, cell wall, and mitochondria"
      ],
      correct_answer: 0,
      explanation: "Plant cells have a cellulose cell wall, chloroplasts (for photosynthesis), and a large permanent vacuole that animal cells do not have.",
      difficulty: 1
    },
    {
      question: "What is the role of ribosomes?",
      options: [
        "Protein synthesis",
        "Energy release",
        "Lipid storage",
        "Cell division"
      ],
      correct_answer: 0,
      explanation: "Ribosomes are the site of protein synthesis, where amino acids are assembled into proteins following mRNA instructions.",
      difficulty: 2
    },
    {
      question: "What advantage does an electron microscope have over a light microscope?",
      options: [
        "Much higher magnification and resolution",
        "It can view living specimens",
        "It is cheaper and more portable",
        "It only magnifies to ×1500"
      ],
      correct_answer: 0,
      explanation: "Electron microscopes have much higher magnification and resolution, allowing sub-cellular structures like ribosomes to be seen.",
      difficulty: 2
    },
  ],

  "cell-division": [
    {
      question: "How many chromosomes do human body cells have?",
      options: ["46", "23", "48", "92"],
      correct_answer: 0,
      explanation: "Human body (somatic) cells have 46 chromosomes, arranged in 23 pairs.",
      difficulty: 1
    },
    {
      question: "Mitosis produces daughter cells that are:",
      options: [
        "Genetically identical to the parent cell",
        "Genetically different from the parent cell",
        "Haploid (half the chromosome number)",
        "Only found in sex organs"
      ],
      correct_answer: 0,
      explanation: "Mitosis produces two genetically identical diploid daughter cells, used for growth and repair.",
      difficulty: 1
    },
    {
      question: "How many daughter cells does meiosis produce?",
      options: ["4", "2", "1", "8"],
      correct_answer: 0,
      explanation: "Meiosis produces 4 genetically different haploid daughter cells (gametes) from one parent cell.",
      difficulty: 2
    },
    {
      question: "Where in the human body does meiosis occur?",
      options: [
        "Ovaries and testes",
        "Brain and spinal cord",
        "Liver and kidneys",
        "Skin and bone marrow"
      ],
      correct_answer: 0,
      explanation: "Meiosis only occurs in the reproductive organs (ovaries produce eggs, testes produce sperm).",
      difficulty: 2
    },
    {
      question: "What are the three main stages of the cell cycle?",
      options: [
        "Interphase, mitosis, cytokinesis",
        "Prophase, metaphase, anaphase",
        "Growth, division, death",
        "DNA replication, protein synthesis, cell division"
      ],
      correct_answer: 0,
      explanation: "The cell cycle consists of interphase (cell grows and DNA replicates), mitosis (nucleus divides), and cytokinesis (cytoplasm divides).",
      difficulty: 2
    },
  ],

  "transport-in-cells": [
    {
      question: "What is osmosis?",
      options: [
        "Net movement of water from a dilute to a more concentrated solution through a partially permeable membrane",
        "Movement of any substance from high to low concentration",
        "Movement of water requiring energy",
        "Transport of glucose into cells"
      ],
      correct_answer: 0,
      explanation: "Osmosis is specifically the net movement of water molecules across a partially permeable membrane from a dilute to a more concentrated solution.",
      difficulty: 2
    },
    {
      question: "Active transport requires:",
      options: [
        "Energy from respiration (ATP)",
        "No energy at all",
        "Only a concentration gradient",
        "A partially permeable membrane only"
      ],
      correct_answer: 0,
      explanation: "Active transport moves substances against the concentration gradient (low to high), so it requires energy from cellular respiration.",
      difficulty: 1
    },
    {
      question: "In which direction does diffusion occur?",
      options: [
        "From high concentration to low concentration",
        "From low concentration to high concentration",
        "Only across cell membranes",
        "In any random direction"
      ],
      correct_answer: 0,
      explanation: "Diffusion is the net movement of particles from an area of high concentration to an area of low concentration (down the concentration gradient).",
      difficulty: 1
    },
    {
      question: "What happens to a plant cell placed in a concentrated sugar solution?",
      options: [
        "It becomes plasmolysed (cell membrane pulls away from cell wall)",
        "It bursts",
        "It becomes turgid",
        "Nothing happens"
      ],
      correct_answer: 0,
      explanation: "Water leaves the cell by osmosis, causing the cell to lose turgor. The cell membrane pulls away from the cell wall (plasmolysis).",
      difficulty: 3
    },
    {
      question: "Where in the human body is active transport used to absorb glucose?",
      options: [
        "Small intestine (gut lining) and kidney tubules",
        "Lungs only",
        "Large intestine only",
        "Stomach only"
      ],
      correct_answer: 0,
      explanation: "Active transport is used in the small intestine to absorb glucose and minerals against the concentration gradient, and in kidney tubules to reabsorb glucose.",
      difficulty: 2
    },
  ],

  "organisation-animals": [
    {
      question: "What is the correct order of biological organisation?",
      options: [
        "Cell → Tissue → Organ → Organ system → Organism",
        "Tissue → Cell → Organ → Organism → Organ system",
        "Organism → Organ system → Organ → Tissue → Cell",
        "Cell → Organ → Tissue → Organ system → Organism"
      ],
      correct_answer: 0,
      explanation: "Cells group into tissues, tissues form organs, organs form organ systems, and organ systems make up an organism.",
      difficulty: 1
    },
    {
      question: "What do red blood cells transport?",
      options: [
        "Oxygen (bound to haemoglobin)",
        "Carbon dioxide only",
        "White blood cells",
        "Nutrients and hormones"
      ],
      correct_answer: 0,
      explanation: "Red blood cells contain haemoglobin, which binds to oxygen to form oxyhaemoglobin, transporting oxygen around the body.",
      difficulty: 1
    },
    {
      question: "Which enzyme breaks down proteins in the stomach?",
      options: ["Pepsin", "Amylase", "Lipase", "Bile"],
      correct_answer: 0,
      explanation: "Pepsin is a protease enzyme produced in the stomach that breaks down proteins into amino acids. It works best in acidic conditions (pH 2).",
      difficulty: 2
    },
    {
      question: "What is the function of bile?",
      options: [
        "Emulsifies fats and neutralises stomach acid",
        "Digests proteins into amino acids",
        "Absorbs water in the large intestine",
        "Produces insulin"
      ],
      correct_answer: 0,
      explanation: "Bile is produced by the liver and stored in the gall bladder. It emulsifies fats (breaks them into small droplets) and neutralises stomach acid.",
      difficulty: 2
    },
    {
      question: "Name the four chambers of the heart in order of blood flow from the body.",
      options: [
        "Right atrium, right ventricle, left atrium, left ventricle",
        "Left atrium, left ventricle, right atrium, right ventricle",
        "Right ventricle, right atrium, left ventricle, left atrium",
        "Left ventricle, right ventricle, left atrium, right atrium"
      ],
      correct_answer: 0,
      explanation: "Deoxygenated blood enters the right atrium, passes to the right ventricle, goes to the lungs, returns to the left atrium, then the left ventricle pumps it around the body.",
      difficulty: 2
    },
  ],

  "organisation-plants": [
    {
      question: "What is the function of xylem tissue?",
      options: [
        "Transports water and dissolved minerals from roots to leaves",
        "Transports dissolved sugars around the plant",
        "Carries out photosynthesis",
        "Stores starch in the roots"
      ],
      correct_answer: 0,
      explanation: "Xylem vessels transport water and dissolved mineral ions upward from the roots to the rest of the plant in a one-way flow.",
      difficulty: 1
    },
    {
      question: "What does phloem tissue transport?",
      options: [
        "Dissolved sugars (sucrose) by translocation",
        "Water and minerals from roots",
        "Oxygen for respiration",
        "Carbon dioxide for photosynthesis"
      ],
      correct_answer: 0,
      explanation: "Phloem transports dissolved sugars (mainly sucrose) from the leaves to the rest of the plant. This process is called translocation.",
      difficulty: 2
    },
    {
      question: "What is transpiration?",
      options: [
        "The loss of water vapour from the surface of leaves through stomata",
        "The absorption of water by root hair cells",
        "The transport of sugars through phloem",
        "The process of photosynthesis"
      ],
      correct_answer: 0,
      explanation: "Transpiration is the evaporation and diffusion of water from inside the leaves out through the stomata.",
      difficulty: 1
    },
    {
      question: "What do guard cells control?",
      options: [
        "The opening and closing of stomata",
        "The rate of photosynthesis",
        "Water absorption in roots",
        "Sugar transport in phloem"
      ],
      correct_answer: 0,
      explanation: "Guard cells surround each stoma (pore) and can change shape to open or close the stomata, controlling gas exchange and water loss.",
      difficulty: 2
    },
    {
      question: "Which tissue layer in a leaf is the main site of photosynthesis?",
      options: [
        "Palisade mesophyll",
        "Spongy mesophyll",
        "Upper epidermis",
        "Lower epidermis"
      ],
      correct_answer: 0,
      explanation: "The palisade mesophyll is packed with chloroplasts and is near the top of the leaf, making it the main site of photosynthesis.",
      difficulty: 2
    },
  ],

  "communicable-diseases": [
    {
      question: "What type of pathogen causes measles?",
      options: ["Virus", "Bacterium", "Fungus", "Protist"],
      correct_answer: 0,
      explanation: "Measles is caused by a virus. It is highly contagious and spreads through droplets in the air.",
      difficulty: 1
    },
    {
      question: "Gonorrhoea is a sexually transmitted disease caused by:",
      options: ["Bacteria", "A virus", "A fungus", "A protist"],
      correct_answer: 0,
      explanation: "Gonorrhoea is caused by a bacterium. It can be treated with antibiotics, though some strains are becoming antibiotic-resistant.",
      difficulty: 2
    },
    {
      question: "What is the role of white blood cells called phagocytes?",
      options: [
        "They engulf and digest pathogens (phagocytosis)",
        "They produce antibodies",
        "They produce antitoxins",
        "They carry oxygen"
      ],
      correct_answer: 0,
      explanation: "Phagocytes surround, engulf, and digest pathogens. This is a non-specific immune response called phagocytosis.",
      difficulty: 2
    },
    {
      question: "Which type of pathogen causes athlete's foot?",
      options: ["Fungus", "Virus", "Bacterium", "Protist"],
      correct_answer: 0,
      explanation: "Athlete's foot is caused by a fungus. It spreads through direct contact or contaminated surfaces.",
      difficulty: 1
    },
    {
      question: "Which disease is caused by a protist and spread by mosquito bites?",
      options: ["Malaria", "Measles", "HIV", "Gonorrhoea"],
      correct_answer: 0,
      explanation: "Malaria is caused by a Plasmodium protist and is spread by the bite of infected female Anopheles mosquitoes.",
      difficulty: 2
    },
  ],

  "non-communicable-diseases": [
    {
      question: "Name two risk factors for cardiovascular disease.",
      options: [
        "Smoking and a high-fat diet",
        "Vaccination and exercise",
        "Drinking water and sleeping",
        "Cold weather and viral infection"
      ],
      correct_answer: 0,
      explanation: "Smoking damages blood vessels and a high-fat diet leads to fatty deposits in arteries, both increasing the risk of cardiovascular disease.",
      difficulty: 1
    },
    {
      question: "What is a benign tumour?",
      options: [
        "A tumour that does not invade other tissues or spread",
        "A tumour that spreads to other parts of the body",
        "A type of bacterial infection",
        "A tumour that always requires surgery"
      ],
      correct_answer: 0,
      explanation: "Benign tumours are growths of abnormal cells contained in one area. Unlike malignant tumours, they do not invade other tissues or metastasise.",
      difficulty: 2
    },
    {
      question: "What is a risk factor for disease?",
      options: [
        "Something that increases the likelihood of developing a disease",
        "A type of pathogen",
        "A treatment for disease",
        "A symptom of illness"
      ],
      correct_answer: 0,
      explanation: "Risk factors are aspects of a person's lifestyle or environment that increase the chance of developing a particular disease.",
      difficulty: 1
    },
    {
      question: "Which of these is a major risk factor for type 2 diabetes?",
      options: ["Obesity", "Cold weather", "Vaccination", "Eating fruit"],
      correct_answer: 0,
      explanation: "Obesity is a major risk factor for type 2 diabetes because excess body fat can lead to insulin resistance.",
      difficulty: 1
    },
    {
      question: "What is the difference between a malignant and benign tumour?",
      options: [
        "Malignant tumours can spread (metastasise); benign tumours cannot",
        "Benign tumours are always larger",
        "Malignant tumours are not dangerous",
        "There is no difference"
      ],
      correct_answer: 0,
      explanation: "Malignant tumours are cancerous and can invade neighbouring tissues and spread to other parts of the body (metastasis). Benign tumours stay in one place.",
      difficulty: 2
    },
  ],

  "photosynthesis": [
    {
      question: "What is the word equation for photosynthesis?",
      options: [
        "Carbon dioxide + water → glucose + oxygen",
        "Glucose + oxygen → carbon dioxide + water",
        "Carbon dioxide + glucose → water + oxygen",
        "Oxygen + water → carbon dioxide + glucose"
      ],
      correct_answer: 0,
      explanation: "Photosynthesis uses carbon dioxide and water (with light energy) to produce glucose and oxygen.",
      difficulty: 1
    },
    {
      question: "In which organelle does photosynthesis take place?",
      options: ["Chloroplast", "Mitochondria", "Nucleus", "Ribosome"],
      correct_answer: 0,
      explanation: "Photosynthesis occurs in the chloroplasts, which contain the green pigment chlorophyll.",
      difficulty: 1
    },
    {
      question: "What are the three limiting factors of photosynthesis?",
      options: [
        "Light intensity, CO₂ concentration, and temperature",
        "Oxygen, water, and glucose",
        "Chlorophyll, stomata, and xylem",
        "Wind speed, soil pH, and humidity"
      ],
      correct_answer: 0,
      explanation: "The rate of photosynthesis is limited by light intensity, carbon dioxide concentration, and temperature.",
      difficulty: 2
    },
    {
      question: "What is the role of chlorophyll in photosynthesis?",
      options: [
        "Absorbs light energy needed for photosynthesis",
        "Releases oxygen into the atmosphere",
        "Transports water to the leaves",
        "Breaks down glucose"
      ],
      correct_answer: 0,
      explanation: "Chlorophyll is the green pigment in chloroplasts that absorbs light energy (mainly red and blue wavelengths) for photosynthesis.",
      difficulty: 1
    },
    {
      question: "Name two uses of glucose produced by photosynthesis in plants.",
      options: [
        "Respiration and making cellulose for cell walls",
        "Excretion and locomotion",
        "Digestion and absorption",
        "Transpiration and osmosis"
      ],
      correct_answer: 0,
      explanation: "Plants use glucose for respiration (energy release), and to make cellulose, starch (storage), amino acids, and lipids.",
      difficulty: 2
    },
  ],

  "respiration": [
    {
      question: "What is the word equation for aerobic respiration?",
      options: [
        "Glucose + oxygen → carbon dioxide + water",
        "Carbon dioxide + water → glucose + oxygen",
        "Glucose → lactic acid",
        "Glucose → ethanol + carbon dioxide"
      ],
      correct_answer: 0,
      explanation: "Aerobic respiration uses glucose and oxygen to produce carbon dioxide and water, releasing energy.",
      difficulty: 1
    },
    {
      question: "What is the product of anaerobic respiration in human muscle cells?",
      options: ["Lactic acid", "Ethanol", "Carbon dioxide only", "Oxygen"],
      correct_answer: 0,
      explanation: "In human muscles, anaerobic respiration produces lactic acid: glucose → lactic acid. This causes muscle fatigue.",
      difficulty: 1
    },
    {
      question: "What are the products of anaerobic respiration in yeast?",
      options: [
        "Ethanol and carbon dioxide",
        "Lactic acid only",
        "Water and carbon dioxide",
        "Glucose and oxygen"
      ],
      correct_answer: 0,
      explanation: "In yeast, anaerobic respiration (fermentation) produces ethanol and carbon dioxide: glucose → ethanol + CO₂.",
      difficulty: 2
    },
    {
      question: "Which type of respiration releases more energy per glucose molecule?",
      options: ["Aerobic", "Anaerobic", "Both release equal energy", "Neither releases energy"],
      correct_answer: 0,
      explanation: "Aerobic respiration releases much more energy than anaerobic because glucose is fully broken down with oxygen.",
      difficulty: 1
    },
    {
      question: "Where in the cell does aerobic respiration mainly take place?",
      options: ["Mitochondria", "Nucleus", "Ribosome", "Cell membrane"],
      correct_answer: 0,
      explanation: "The mitochondria are the main site of aerobic respiration, where glucose is broken down using oxygen to release energy.",
      difficulty: 1
    },
  ],

  "homeostasis": [
    {
      question: "What is homeostasis?",
      options: [
        "The regulation of the internal conditions of a cell or organism to maintain optimum conditions",
        "The process of cell division",
        "The movement of water across a membrane",
        "The breakdown of food in the digestive system"
      ],
      correct_answer: 0,
      explanation: "Homeostasis is maintaining a stable internal environment despite changes in external conditions, including temperature, pH, water, and glucose levels.",
      difficulty: 1
    },
    {
      question: "Which organ produces insulin to control blood glucose levels?",
      options: ["Pancreas", "Liver", "Kidneys", "Brain"],
      correct_answer: 0,
      explanation: "The pancreas monitors blood glucose and releases insulin when levels are too high, or glucagon when they are too low.",
      difficulty: 1
    },
    {
      question: "What does insulin do?",
      options: [
        "Causes cells to take in glucose, lowering blood glucose levels",
        "Raises blood glucose levels",
        "Breaks down glycogen in the liver",
        "Increases body temperature"
      ],
      correct_answer: 0,
      explanation: "Insulin causes glucose to move from the blood into cells (especially liver and muscle cells), where it is stored as glycogen.",
      difficulty: 2
    },
    {
      question: "What part of the brain monitors body temperature?",
      options: ["Hypothalamus", "Cerebrum", "Cerebellum", "Medulla"],
      correct_answer: 0,
      explanation: "The hypothalamus in the brain acts as the body's thermostat, detecting changes in blood temperature and triggering appropriate responses.",
      difficulty: 2
    },
    {
      question: "In which organ is urea produced?",
      options: ["Liver", "Kidneys", "Lungs", "Pancreas"],
      correct_answer: 0,
      explanation: "Urea is produced in the liver from the breakdown of excess amino acids (deamination). It is then filtered out by the kidneys.",
      difficulty: 2
    },
  ],

  "hormones-reproduction": [
    {
      question: "Which hormone stimulates the maturation of eggs in the ovaries?",
      options: [
        "FSH (Follicle Stimulating Hormone)",
        "LH (Luteinising Hormone)",
        "Testosterone",
        "Adrenaline"
      ],
      correct_answer: 0,
      explanation: "FSH is released by the pituitary gland and causes eggs to mature in the ovaries. It also stimulates oestrogen production.",
      difficulty: 2
    },
    {
      question: "Which hormone triggers ovulation?",
      options: ["LH (Luteinising Hormone)", "FSH", "Progesterone", "Insulin"],
      correct_answer: 0,
      explanation: "A surge of LH from the pituitary gland triggers ovulation — the release of a mature egg from the ovary on approximately day 14.",
      difficulty: 2
    },
    {
      question: "What is the role of oestrogen in the menstrual cycle?",
      options: [
        "Thickens the uterus lining and inhibits FSH",
        "Triggers ovulation directly",
        "Breaks down the uterus lining",
        "Produces sperm in the testes"
      ],
      correct_answer: 0,
      explanation: "Oestrogen causes the uterus lining to thicken and rebuild after menstruation. It also inhibits further FSH production.",
      difficulty: 2
    },
    {
      question: "Hormonal contraceptives (such as the pill) work by:",
      options: [
        "Inhibiting FSH so no eggs mature",
        "Killing sperm directly",
        "Thickening the uterus lining",
        "Increasing LH production"
      ],
      correct_answer: 0,
      explanation: "Oral contraceptives contain hormones (oestrogen and/or progesterone) that inhibit FSH release, preventing egg maturation and ovulation.",
      difficulty: 3
    },
    {
      question: "IVF (In Vitro Fertilisation) involves:",
      options: [
        "Fertilising eggs with sperm in a laboratory then implanting embryos",
        "Taking hormone pills to prevent pregnancy",
        "Using a barrier method of contraception",
        "Natural conception with no medical intervention"
      ],
      correct_answer: 0,
      explanation: "In IVF, FSH and LH are given to stimulate egg production. Eggs are collected and fertilised with sperm in the lab, then embryos are transferred to the uterus.",
      difficulty: 2
    },
  ],

  "inheritance-variation": [
    {
      question: "What is a genotype?",
      options: [
        "The combination of alleles an organism has for a particular gene",
        "The observable physical characteristics of an organism",
        "The total number of chromosomes",
        "A type of genetic mutation"
      ],
      correct_answer: 0,
      explanation: "Genotype refers to the genetic makeup — the specific alleles carried for a gene (e.g., Bb, BB, bb).",
      difficulty: 2
    },
    {
      question: "What does homozygous mean?",
      options: [
        "Having two identical alleles for a gene (e.g., BB or bb)",
        "Having two different alleles for a gene",
        "Having only one allele",
        "Having no alleles for a gene"
      ],
      correct_answer: 0,
      explanation: "Homozygous means both alleles for a gene are the same — either both dominant (BB) or both recessive (bb).",
      difficulty: 2
    },
    {
      question: "In a genetic cross between two Bb parents, what fraction of offspring would you expect to show the recessive phenotype?",
      options: ["1/4 (25%)", "1/2 (50%)", "3/4 (75%)", "All of them"],
      correct_answer: 0,
      explanation: "Using a Punnett square: BB, Bb, Bb, bb. Only bb (1 out of 4) shows the recessive phenotype = 25%.",
      difficulty: 2
    },
    {
      question: "How many alleles does a person carry for each gene?",
      options: ["2 (one from each parent)", "1", "4", "23"],
      correct_answer: 0,
      explanation: "Humans are diploid, meaning they inherit one allele from each parent, giving two alleles per gene.",
      difficulty: 1
    },
    {
      question: "What is the difference between genetic and environmental variation?",
      options: [
        "Genetic variation is caused by genes; environmental variation is caused by external conditions",
        "There is no difference",
        "Genetic variation only applies to plants",
        "Environmental variation is inherited"
      ],
      correct_answer: 0,
      explanation: "Genetic variation is inherited (e.g., blood group). Environmental variation is caused by the conditions an organism lives in (e.g., scars). Most features are influenced by both.",
      difficulty: 1
    },
  ],

  "evolution-classification": [
    {
      question: "Who proposed the theory of evolution by natural selection?",
      options: ["Charles Darwin", "Gregor Mendel", "Carl Linnaeus", "Louis Pasteur"],
      correct_answer: 0,
      explanation: "Charles Darwin published 'On the Origin of Species' in 1859, proposing that organisms evolve through natural selection.",
      difficulty: 1
    },
    {
      question: "What is the correct order of classification from largest group to smallest?",
      options: [
        "Kingdom, Phylum, Class, Order, Family, Genus, Species",
        "Species, Genus, Family, Order, Class, Phylum, Kingdom",
        "Kingdom, Class, Phylum, Order, Genus, Family, Species",
        "Domain, Species, Genus, Family, Order, Class, Phylum"
      ],
      correct_answer: 0,
      explanation: "The hierarchy goes from the broadest group (Kingdom) to the most specific (Species). Remember: King Philip Came Over For Good Spaghetti.",
      difficulty: 2
    },
    {
      question: "What is speciation?",
      options: [
        "The formation of a new species through evolution",
        "The extinction of a species",
        "The cloning of organisms",
        "The classification of organisms into groups"
      ],
      correct_answer: 0,
      explanation: "Speciation occurs when populations of the same species become so different (through isolation and natural selection) that they can no longer interbreed.",
      difficulty: 2
    },
    {
      question: "What evidence supports the theory of evolution?",
      options: [
        "Fossils, antibiotic-resistant bacteria, and DNA analysis",
        "Only written historical records",
        "Laboratory experiments only",
        "Mathematical predictions only"
      ],
      correct_answer: 0,
      explanation: "Fossils show how organisms changed over time, resistant bacteria show evolution in action, and DNA analysis shows evolutionary relationships.",
      difficulty: 2
    },
    {
      question: "What does natural selection mean?",
      options: [
        "Organisms with advantageous traits are more likely to survive and reproduce",
        "Humans choose which organisms to breed",
        "All organisms have equal chances of survival",
        "Evolution happens by random chance only"
      ],
      correct_answer: 0,
      explanation: "Natural selection is the process where organisms with traits better suited to their environment are more likely to survive, reproduce, and pass on their alleles.",
      difficulty: 1
    },
  ],

  "ecology": [
    {
      question: "What is an ecosystem?",
      options: [
        "The interaction of a community of living organisms with the non-living parts of their environment",
        "A group of organisms of the same species",
        "Only the physical environment of an area",
        "A single food chain"
      ],
      correct_answer: 0,
      explanation: "An ecosystem includes all the living organisms (biotic) and their physical environment (abiotic factors) interacting together.",
      difficulty: 1
    },
    {
      question: "What is biodiversity?",
      options: [
        "The variety of all the different species of organisms on Earth or within an ecosystem",
        "The total number of organisms in an area",
        "The size of a habitat",
        "The number of food chains in an ecosystem"
      ],
      correct_answer: 0,
      explanation: "Biodiversity refers to the variety and abundance of different species in an area. High biodiversity makes ecosystems more stable.",
      difficulty: 1
    },
    {
      question: "What do decomposers do?",
      options: [
        "Break down dead organic matter, recycling nutrients back into the soil",
        "Produce food through photosynthesis",
        "Hunt and eat other organisms",
        "Compete with plants for sunlight"
      ],
      correct_answer: 0,
      explanation: "Decomposers (bacteria and fungi) break down dead plants and animals, returning nutrients to the soil for use by plants.",
      difficulty: 1
    },
    {
      question: "What is a trophic level?",
      options: [
        "A feeding level in a food chain",
        "A type of ecosystem",
        "A classification group",
        "A method of sampling organisms"
      ],
      correct_answer: 0,
      explanation: "Trophic levels represent feeding positions: producers are level 1, primary consumers level 2, secondary consumers level 3, and so on.",
      difficulty: 2
    },
    {
      question: "Why is only about 10% of energy transferred between trophic levels?",
      options: [
        "Energy is lost through respiration, excretion, and as heat at each level",
        "Organisms at higher levels eat less food",
        "Photosynthesis is very efficient",
        "All energy is stored in biomass"
      ],
      correct_answer: 0,
      explanation: "At each trophic level, organisms use energy for life processes (respiration) and lose heat. Not all biomass is eaten or digested.",
      difficulty: 3
    },
  ],

  // ========== CHEMISTRY (10 topics) ==========

  "atomic-structure": [
    {
      question: "What are the three subatomic particles found in an atom?",
      options: [
        "Protons, neutrons, and electrons",
        "Protons, electrons, and photons",
        "Neutrons, electrons, and positrons",
        "Atoms, molecules, and ions"
      ],
      correct_answer: 0,
      explanation: "Atoms consist of protons (positive, in nucleus), neutrons (no charge, in nucleus), and electrons (negative, in shells).",
      difficulty: 1
    },
    {
      question: "What does the atomic number of an element represent?",
      options: [
        "The number of protons in the nucleus",
        "The total number of protons and neutrons",
        "The number of electron shells",
        "The mass of the atom"
      ],
      correct_answer: 0,
      explanation: "The atomic number equals the number of protons. In a neutral atom, this also equals the number of electrons.",
      difficulty: 1
    },
    {
      question: "What is an isotope?",
      options: [
        "Atoms of the same element with different numbers of neutrons",
        "Atoms of different elements with the same mass",
        "Atoms with different numbers of protons",
        "Atoms that have gained or lost electrons"
      ],
      correct_answer: 0,
      explanation: "Isotopes have the same number of protons (same element) but different numbers of neutrons, giving them different mass numbers.",
      difficulty: 2
    },
    {
      question: "How are elements arranged in the modern periodic table?",
      options: [
        "In order of increasing atomic number",
        "In order of increasing mass number",
        "Alphabetically by name",
        "By colour and physical state"
      ],
      correct_answer: 0,
      explanation: "Elements are arranged in order of increasing atomic number (number of protons). This was corrected from Mendeleev's original ordering by mass.",
      difficulty: 2
    },
    {
      question: "What do elements in the same group of the periodic table have in common?",
      options: [
        "The same number of electrons in their outer shell",
        "The same number of electron shells",
        "The same atomic mass",
        "The same number of neutrons"
      ],
      correct_answer: 0,
      explanation: "Elements in the same group have the same number of outer shell electrons, which gives them similar chemical properties.",
      difficulty: 2
    },
  ],

  "bonding-structure": [
    {
      question: "What type of bonding occurs between a metal and a non-metal?",
      options: ["Ionic bonding", "Covalent bonding", "Metallic bonding", "Hydrogen bonding"],
      correct_answer: 0,
      explanation: "Metals transfer electrons to non-metals, forming positive and negative ions that are held together by strong electrostatic attraction (ionic bonding).",
      difficulty: 1
    },
    {
      question: "In covalent bonding, atoms:",
      options: [
        "Share pairs of electrons",
        "Transfer electrons completely",
        "Lose electrons to form positive ions",
        "Have delocalised electrons"
      ],
      correct_answer: 0,
      explanation: "In covalent bonding, non-metal atoms share pairs of electrons to achieve a full outer shell.",
      difficulty: 1
    },
    {
      question: "Why do metals conduct electricity?",
      options: [
        "Delocalised electrons can move freely through the structure",
        "They contain ions that can move",
        "They have covalent bonds",
        "They are always solid"
      ],
      correct_answer: 0,
      explanation: "In metallic bonding, outer shell electrons are delocalised (free to move) through the structure, allowing them to carry electrical charge.",
      difficulty: 2
    },
    {
      question: "What type of structure does diamond have?",
      options: [
        "Giant covalent structure",
        "Simple molecular structure",
        "Ionic lattice",
        "Metallic structure"
      ],
      correct_answer: 0,
      explanation: "Diamond has a giant covalent structure where each carbon atom is covalently bonded to four others in a rigid 3D lattice, making it very hard.",
      difficulty: 2
    },
    {
      question: "Why do simple molecular substances have low melting points?",
      options: [
        "The intermolecular forces between molecules are weak",
        "The covalent bonds within molecules are weak",
        "They contain ions",
        "They have delocalised electrons"
      ],
      correct_answer: 0,
      explanation: "Simple molecular substances have strong covalent bonds within molecules but weak intermolecular forces between molecules. Little energy is needed to overcome these weak forces.",
      difficulty: 3
    },
  ],

  "quantitative-chemistry": [
    {
      question: "What is the relative formula mass (Mr) of water, H₂O? (H = 1, O = 16)",
      options: ["18", "10", "20", "34"],
      correct_answer: 0,
      explanation: "Mr of H₂O = (2 × 1) + 16 = 18.",
      difficulty: 1
    },
    {
      question: "How many moles are in 44 g of CO₂? (C = 12, O = 16)",
      options: ["1 mole", "2 moles", "0.5 moles", "44 moles"],
      correct_answer: 0,
      explanation: "Mr of CO₂ = 12 + (2 × 16) = 44. Moles = mass ÷ Mr = 44 ÷ 44 = 1 mole.",
      difficulty: 2
    },
    {
      question: "What is Avogadro's constant?",
      options: ["6.02 × 10²³", "6.02 × 10²⁴", "3.14 × 10²³", "9.81 × 10²³"],
      correct_answer: 0,
      explanation: "Avogadro's constant is 6.02 × 10²³ — the number of particles (atoms, molecules, or ions) in one mole of a substance.",
      difficulty: 2
    },
    {
      question: "What is the formula for calculating the number of moles from mass?",
      options: [
        "Moles = mass ÷ relative formula mass",
        "Moles = mass × relative formula mass",
        "Moles = relative formula mass ÷ mass",
        "Moles = mass + relative formula mass"
      ],
      correct_answer: 0,
      explanation: "Number of moles = mass (in grams) ÷ Mr (relative formula mass). This is one of the most important formulas in chemistry.",
      difficulty: 1
    },
    {
      question: "In the equation 2Mg + O₂ → 2MgO, what is the mole ratio of Mg to O₂?",
      options: ["2 : 1", "1 : 1", "1 : 2", "2 : 2"],
      correct_answer: 0,
      explanation: "The balanced equation shows 2 moles of Mg react with 1 mole of O₂, giving a mole ratio of 2 : 1.",
      difficulty: 2
    },
  ],

  "chemical-changes": [
    {
      question: "In terms of electrons, what is reduction?",
      options: [
        "Gain of electrons",
        "Loss of electrons",
        "Sharing of electrons",
        "Transfer of protons"
      ],
      correct_answer: 0,
      explanation: "Reduction is the gain of electrons (OIL RIG: Oxidation Is Loss, Reduction Is Gain). In terms of oxygen, it is loss of oxygen.",
      difficulty: 2
    },
    {
      question: "In the reactivity series, which metal is most reactive?",
      options: ["Potassium", "Sodium", "Iron", "Gold"],
      correct_answer: 0,
      explanation: "The reactivity series from most to least reactive: potassium, sodium, lithium, calcium, magnesium, aluminium, zinc, iron, copper, silver, gold.",
      difficulty: 1
    },
    {
      question: "What happens when zinc is added to copper sulfate solution?",
      options: [
        "Zinc displaces copper because zinc is more reactive",
        "Nothing happens",
        "Copper displaces zinc",
        "Both metals dissolve"
      ],
      correct_answer: 0,
      explanation: "Zinc is more reactive than copper, so it displaces copper: Zn + CuSO₄ → ZnSO₄ + Cu. The blue solution turns colourless.",
      difficulty: 2
    },
    {
      question: "What is electrolysis?",
      options: [
        "The decomposition of an ionic compound using electrical current",
        "The burning of a substance in oxygen",
        "A type of chemical test",
        "The formation of ionic bonds"
      ],
      correct_answer: 0,
      explanation: "Electrolysis uses direct current (DC) to decompose ionic compounds that are molten or dissolved in water into their elements.",
      difficulty: 2
    },
    {
      question: "During electrolysis, what is produced at the cathode (negative electrode)?",
      options: [
        "The metal (or hydrogen if the metal is more reactive than hydrogen)",
        "Oxygen gas always",
        "Chlorine gas",
        "The non-metal always"
      ],
      correct_answer: 0,
      explanation: "Positive ions (cations) are attracted to the cathode and gain electrons. If the metal is less reactive than hydrogen, the metal is deposited; otherwise hydrogen gas is produced.",
      difficulty: 3
    },
  ],

  "energy-changes": [
    {
      question: "What is an exothermic reaction?",
      options: [
        "A reaction that releases energy to the surroundings, increasing temperature",
        "A reaction that absorbs energy, decreasing temperature",
        "A reaction with no energy change",
        "A reaction that only occurs at high temperatures"
      ],
      correct_answer: 0,
      explanation: "Exothermic reactions transfer energy to the surroundings. Examples include combustion, neutralisation, and oxidation reactions.",
      difficulty: 1
    },
    {
      question: "Is breaking chemical bonds endothermic or exothermic?",
      options: [
        "Endothermic (energy is absorbed)",
        "Exothermic (energy is released)",
        "Neither — no energy change",
        "It depends on the bond type"
      ],
      correct_answer: 0,
      explanation: "Breaking bonds always requires energy (endothermic). Making bonds always releases energy (exothermic).",
      difficulty: 2
    },
    {
      question: "In an exothermic reaction, is the overall energy change positive or negative?",
      options: [
        "Negative (energy is released)",
        "Positive (energy is absorbed)",
        "Zero",
        "Cannot be determined"
      ],
      correct_answer: 0,
      explanation: "In exothermic reactions, more energy is released making bonds than is absorbed breaking them, so the overall energy change is negative.",
      difficulty: 2
    },
    {
      question: "Which of these is an example of an endothermic reaction?",
      options: [
        "Thermal decomposition of calcium carbonate",
        "Combustion of methane",
        "Neutralisation of acid and alkali",
        "Rusting of iron"
      ],
      correct_answer: 0,
      explanation: "Thermal decomposition requires continuous heating (energy input), making it endothermic. The other examples are all exothermic.",
      difficulty: 2
    },
    {
      question: "What happens to temperature during an endothermic reaction?",
      options: [
        "The temperature decreases (surroundings cool down)",
        "The temperature increases",
        "The temperature stays the same",
        "The temperature fluctuates randomly"
      ],
      correct_answer: 0,
      explanation: "Endothermic reactions absorb energy from the surroundings, causing the temperature of the surroundings to decrease.",
      difficulty: 1
    },
  ],

  "rate-of-reaction": [
    {
      question: "Name four factors that affect the rate of a chemical reaction.",
      options: [
        "Temperature, concentration, surface area, and catalyst",
        "Colour, smell, mass, and volume",
        "Pressure, density, pH, and humidity",
        "Light, gravity, sound, and magnetism"
      ],
      correct_answer: 0,
      explanation: "Rate of reaction is affected by temperature, concentration (or pressure for gases), surface area of solids, and the presence of a catalyst.",
      difficulty: 1
    },
    {
      question: "What does a catalyst do?",
      options: [
        "Increases the rate of reaction without being chemically changed or used up",
        "Increases the amount of product formed",
        "Is always used up in the reaction",
        "Decreases the rate of reaction"
      ],
      correct_answer: 0,
      explanation: "A catalyst provides an alternative reaction pathway with a lower activation energy, speeding up the reaction without being consumed.",
      difficulty: 1
    },
    {
      question: "Why does increasing temperature increase the rate of reaction?",
      options: [
        "Particles have more kinetic energy, collide more often, and more collisions exceed the activation energy",
        "It creates more particles",
        "It changes the products formed",
        "It reduces the activation energy"
      ],
      correct_answer: 0,
      explanation: "Higher temperature gives particles more kinetic energy. They move faster (more frequent collisions) and a greater proportion of collisions have enough energy to react.",
      difficulty: 2
    },
    {
      question: "What is the collision theory?",
      options: [
        "Reactions only occur when particles collide with sufficient energy (activation energy) and correct orientation",
        "All particle collisions result in a reaction",
        "Particles must be stationary to react",
        "Only gas particles can collide"
      ],
      correct_answer: 0,
      explanation: "Collision theory states that particles must collide with at least the activation energy and in the correct orientation for a reaction to occur.",
      difficulty: 2
    },
    {
      question: "On a graph of volume of gas produced vs time, what does a steeper initial curve indicate?",
      options: [
        "A faster rate of reaction",
        "A slower rate of reaction",
        "More product is formed overall",
        "The reaction is endothermic"
      ],
      correct_answer: 0,
      explanation: "The gradient of the curve represents the rate. A steeper curve means more gas is produced per unit time, indicating a faster reaction.",
      difficulty: 2
    },
  ],

  "organic-chemistry": [
    {
      question: "What is the general formula for alkanes?",
      options: ["CₙH₂ₙ₊₂", "CₙH₂ₙ", "CₙH₂ₙ₋₂", "CₙHₙ"],
      correct_answer: 0,
      explanation: "Alkanes are saturated hydrocarbons with single bonds only. Their general formula is CₙH₂ₙ₊₂ (e.g., methane CH₄, ethane C₂H₆).",
      difficulty: 1
    },
    {
      question: "What is the simplest alkene?",
      options: ["Ethene (C₂H₄)", "Methene (CH₂)", "Propene (C₃H₆)", "Butene (C₄H₈)"],
      correct_answer: 0,
      explanation: "Ethene (C₂H₄) is the simplest alkene. There is no 'methene' because you need at least 2 carbons to form a C=C double bond.",
      difficulty: 2
    },
    {
      question: "How do you test for the presence of a C=C double bond (alkene)?",
      options: [
        "Add bromine water — it decolourises from orange to colourless",
        "Add litmus paper — it turns blue",
        "Burn it — it produces a green flame",
        "Add universal indicator — it turns red"
      ],
      correct_answer: 0,
      explanation: "Bromine water turns from orange to colourless when an alkene is present, as bromine adds across the double bond (addition reaction).",
      difficulty: 2
    },
    {
      question: "What is cracking?",
      options: [
        "Breaking down long-chain hydrocarbons into shorter, more useful molecules",
        "Combining small molecules into large ones",
        "Burning hydrocarbons in excess oxygen",
        "Dissolving hydrocarbons in water"
      ],
      correct_answer: 0,
      explanation: "Cracking is the thermal decomposition of long-chain alkanes to produce shorter alkanes and alkenes, which are more useful as fuels and chemical feedstocks.",
      difficulty: 2
    },
    {
      question: "What is the functional group in alcohols?",
      options: ["−OH (hydroxyl group)", "C=C (double bond)", "−COOH (carboxyl group)", "−CHO (aldehyde group)"],
      correct_answer: 0,
      explanation: "Alcohols contain the −OH (hydroxyl) functional group. The simplest alcohol is methanol (CH₃OH).",
      difficulty: 2
    },
  ],

  "chemical-analysis": [
    {
      question: "What colour does litmus paper turn in an acidic solution?",
      options: ["Red", "Blue", "Green", "Yellow"],
      correct_answer: 0,
      explanation: "Blue litmus paper turns red in acid. Red litmus stays red in acid. In alkali, red litmus turns blue.",
      difficulty: 1
    },
    {
      question: "What is the test for hydrogen gas?",
      options: [
        "A lit splint produces a squeaky pop",
        "A glowing splint relights",
        "It turns limewater milky",
        "It bleaches litmus paper"
      ],
      correct_answer: 0,
      explanation: "Hydrogen gas burns with a squeaky pop when a lit splint is held near it. This is because hydrogen is flammable.",
      difficulty: 1
    },
    {
      question: "What is the test for carbon dioxide gas?",
      options: [
        "It turns limewater milky (cloudy)",
        "A lit splint produces a squeaky pop",
        "A glowing splint relights",
        "It turns litmus paper red"
      ],
      correct_answer: 0,
      explanation: "Carbon dioxide turns limewater (calcium hydroxide solution) milky because it forms insoluble calcium carbonate.",
      difficulty: 1
    },
    {
      question: "In paper chromatography, what is the Rf value?",
      options: [
        "Distance moved by substance ÷ distance moved by solvent",
        "Distance moved by solvent ÷ distance moved by substance",
        "Mass of substance ÷ volume of solvent",
        "Number of spots × distance"
      ],
      correct_answer: 0,
      explanation: "Rf = distance moved by substance ÷ distance moved by solvent front. Each substance has a characteristic Rf value in a given solvent.",
      difficulty: 2
    },
    {
      question: "In chemistry, what defines a pure substance?",
      options: [
        "A single element or compound, not mixed with any other substance",
        "Any substance that is safe to consume",
        "A substance dissolved in water",
        "Any clear, colourless liquid"
      ],
      correct_answer: 0,
      explanation: "In chemistry, a pure substance contains only one type of element or compound. It melts and boils at specific sharp temperatures.",
      difficulty: 2
    },
  ],

  "atmosphere": [
    {
      question: "What is the approximate percentage of nitrogen in Earth's atmosphere today?",
      options: ["78%", "21%", "50%", "1%"],
      correct_answer: 0,
      explanation: "Earth's atmosphere is approximately 78% nitrogen, 21% oxygen, and about 1% argon and other gases.",
      difficulty: 1
    },
    {
      question: "Which of these is a greenhouse gas?",
      options: [
        "Carbon dioxide",
        "Nitrogen",
        "Oxygen",
        "Argon"
      ],
      correct_answer: 0,
      explanation: "Carbon dioxide, methane, and water vapour are greenhouse gases. They absorb and re-emit infrared radiation, contributing to the greenhouse effect.",
      difficulty: 1
    },
    {
      question: "What human activity has most significantly increased atmospheric CO₂ levels?",
      options: [
        "Burning fossil fuels",
        "Planting trees",
        "Recycling materials",
        "Using wind turbines"
      ],
      correct_answer: 0,
      explanation: "Burning fossil fuels (coal, oil, gas) for energy and transport releases large amounts of CO₂ that was previously locked underground.",
      difficulty: 1
    },
    {
      question: "What is the greenhouse effect?",
      options: [
        "Greenhouse gases in the atmosphere absorb and re-emit infrared radiation, warming the Earth",
        "The Sun's rays are reflected by greenhouse gases",
        "Plants in greenhouses produce extra CO₂",
        "The ozone layer absorbs ultraviolet radiation"
      ],
      correct_answer: 0,
      explanation: "The greenhouse effect is a natural process where greenhouse gases trap heat (infrared radiation) in the atmosphere, keeping Earth warm enough to support life.",
      difficulty: 2
    },
    {
      question: "What gas was abundant in Earth's early atmosphere?",
      options: [
        "Carbon dioxide",
        "Oxygen",
        "Nitrogen",
        "Ozone"
      ],
      correct_answer: 0,
      explanation: "Earth's early atmosphere (billions of years ago) was mainly carbon dioxide, with little or no oxygen. Oxygen was later produced by photosynthetic organisms.",
      difficulty: 2
    },
  ],

  "using-resources": [
    {
      question: "What does sustainable development mean?",
      options: [
        "Meeting the needs of the current generation without compromising future generations",
        "Using as many resources as possible now",
        "Only using renewable energy",
        "Stopping all industrial production"
      ],
      correct_answer: 0,
      explanation: "Sustainable development means using resources in a way that meets our needs today without preventing future generations from meeting their own needs.",
      difficulty: 1
    },
    {
      question: "What is the purpose of a life cycle assessment (LCA)?",
      options: [
        "To assess the environmental impact of a product at every stage of its life",
        "To measure the lifespan of organisms",
        "To calculate the cost of manufacturing",
        "To test product safety"
      ],
      correct_answer: 0,
      explanation: "An LCA considers raw material extraction, manufacturing, use, and disposal to evaluate the total environmental impact of a product.",
      difficulty: 2
    },
    {
      question: "What are finite resources?",
      options: [
        "Resources that will eventually run out and cannot be renewed",
        "Resources that can be replaced naturally",
        "Resources found in infinite supply",
        "Resources only found in one country"
      ],
      correct_answer: 0,
      explanation: "Finite (non-renewable) resources exist in limited quantities and are being used faster than they can be replaced, such as fossil fuels and metal ores.",
      difficulty: 1
    },
    {
      question: "What is potable water?",
      options: [
        "Water that is safe to drink, with sufficiently low levels of dissolved salts and microbes",
        "Chemically pure water (H₂O only)",
        "Water from the sea",
        "Distilled water"
      ],
      correct_answer: 0,
      explanation: "Potable water is safe to drink but is not pure in the chemical sense — it still contains dissolved substances at safe, low levels.",
      difficulty: 2
    },
    {
      question: "In the UK, how is potable water typically produced from fresh water?",
      options: [
        "Filtration to remove solids, then sterilisation with chlorine or UV or ozone",
        "Distillation only",
        "Reverse osmosis only",
        "Adding minerals from rocks"
      ],
      correct_answer: 0,
      explanation: "In the UK, fresh water is treated by sedimentation, filtration (through sand beds), and then sterilised using chlorine, ozone, or UV light.",
      difficulty: 2
    },
  ],

  // ========== PHYSICS (8 topics) ==========

  "energy": [
    {
      question: "What is the formula for kinetic energy?",
      options: ["KE = ½mv²", "KE = mgh", "KE = Fd", "KE = mv"],
      correct_answer: 0,
      explanation: "Kinetic energy = ½ × mass × velocity². The energy depends on both the mass and the square of the speed.",
      difficulty: 1
    },
    {
      question: "What type of energy store is associated with a stretched spring?",
      options: [
        "Elastic potential energy",
        "Gravitational potential energy",
        "Kinetic energy",
        "Thermal energy"
      ],
      correct_answer: 0,
      explanation: "A stretched or compressed spring stores elastic potential energy, which is released when the spring returns to its natural length.",
      difficulty: 1
    },
    {
      question: "What is the formula for gravitational potential energy?",
      options: ["GPE = mgh", "GPE = ½mv²", "GPE = Fd", "GPE = Pt"],
      correct_answer: 0,
      explanation: "Gravitational potential energy = mass × gravitational field strength × height. On Earth, g ≈ 9.8 N/kg.",
      difficulty: 1
    },
    {
      question: "What does the law of conservation of energy state?",
      options: [
        "Energy cannot be created or destroyed, only transferred between stores",
        "Energy is always lost in any transfer",
        "Energy can be created from nothing",
        "Energy only exists in one form"
      ],
      correct_answer: 0,
      explanation: "The conservation of energy principle states that the total energy in a closed system is always conserved — it can be transferred but not created or destroyed.",
      difficulty: 2
    },
    {
      question: "What is specific heat capacity?",
      options: [
        "The energy required to raise the temperature of 1 kg of a substance by 1°C",
        "The energy needed to melt 1 kg of a substance",
        "The temperature at which a substance boils",
        "The total energy stored in an object"
      ],
      correct_answer: 0,
      explanation: "Specific heat capacity (c) is the energy needed to raise 1 kg by 1°C. Formula: E = mcΔθ, where Δθ is the temperature change.",
      difficulty: 2
    },
  ],

  "electricity": [
    {
      question: "What is the formula linking potential difference (V), current (I), and resistance (R)?",
      options: ["V = IR", "V = I/R", "V = I + R", "V = R/I"],
      correct_answer: 0,
      explanation: "Ohm's law: V = IR. Potential difference (V) = current (I) × resistance (R).",
      difficulty: 1
    },
    {
      question: "What is the unit of electrical resistance?",
      options: ["Ohm (Ω)", "Volt (V)", "Ampere (A)", "Watt (W)"],
      correct_answer: 0,
      explanation: "Resistance is measured in ohms (Ω). 1 ohm means a potential difference of 1V drives a current of 1A.",
      difficulty: 1
    },
    {
      question: "In a series circuit, what happens to the current at different points?",
      options: [
        "The current is the same at all points",
        "The current decreases along the circuit",
        "The current splits at each component",
        "The current doubles at each component"
      ],
      correct_answer: 0,
      explanation: "In a series circuit, there is only one path for current to flow, so the current is the same throughout the entire circuit.",
      difficulty: 1
    },
    {
      question: "What happens to the total resistance when more resistors are added in parallel?",
      options: [
        "Total resistance decreases",
        "Total resistance increases",
        "Total resistance stays the same",
        "Total resistance doubles"
      ],
      correct_answer: 0,
      explanation: "Adding resistors in parallel provides more paths for current to flow, reducing the overall resistance of the circuit.",
      difficulty: 2
    },
    {
      question: "What is the formula for electrical power?",
      options: ["P = IV", "P = IR", "P = V/I", "P = I²/R"],
      correct_answer: 0,
      explanation: "Electrical power (P) = current (I) × potential difference (V). Power is measured in watts (W).",
      difficulty: 2
    },
  ],

  "particle-model": [
    {
      question: "What happens to particles when a substance is heated?",
      options: [
        "They gain kinetic energy and move faster or vibrate more",
        "They lose kinetic energy and slow down",
        "They become smaller",
        "They disappear and reappear"
      ],
      correct_answer: 0,
      explanation: "Heating increases the kinetic energy of particles. In solids they vibrate more, in liquids and gases they move faster.",
      difficulty: 1
    },
    {
      question: "What is specific latent heat?",
      options: [
        "The energy required to change the state of 1 kg of a substance with no temperature change",
        "The temperature at which a substance changes state",
        "The energy needed to raise temperature by 1°C",
        "The total heat energy in a substance"
      ],
      correct_answer: 0,
      explanation: "Specific latent heat (L) is the energy needed to change the state of 1 kg without changing temperature. E = mL.",
      difficulty: 2
    },
    {
      question: "In which state of matter are particles most closely packed together?",
      options: ["Solid", "Liquid", "Gas", "They are equally spaced in all states"],
      correct_answer: 0,
      explanation: "In solids, particles are held in fixed positions by strong forces, packed closely in a regular arrangement.",
      difficulty: 1
    },
    {
      question: "What is the formula for density?",
      options: ["ρ = m/V", "ρ = V/m", "ρ = m × V", "ρ = F/A"],
      correct_answer: 0,
      explanation: "Density (ρ) = mass (m) ÷ volume (V). Units are typically kg/m³ or g/cm³.",
      difficulty: 1
    },
    {
      question: "What happens to gas pressure when temperature increases at constant volume?",
      options: [
        "Pressure increases",
        "Pressure decreases",
        "Pressure stays the same",
        "The gas condenses"
      ],
      correct_answer: 0,
      explanation: "At constant volume, increasing temperature gives gas particles more kinetic energy. They collide with the container walls more frequently and forcefully, increasing pressure.",
      difficulty: 2
    },
  ],

  "atomic-radiation": [
    {
      question: "What are the three main types of nuclear radiation?",
      options: [
        "Alpha (α), beta (β), and gamma (γ)",
        "Protons, neutrons, and electrons",
        "X-rays, UV, and infrared",
        "Radio, micro, and visible"
      ],
      correct_answer: 0,
      explanation: "The three types of nuclear radiation are alpha particles (helium nuclei), beta particles (high-speed electrons), and gamma rays (electromagnetic waves).",
      difficulty: 1
    },
    {
      question: "Which type of nuclear radiation is the most ionising?",
      options: ["Alpha (α)", "Beta (β)", "Gamma (γ)", "All are equally ionising"],
      correct_answer: 0,
      explanation: "Alpha particles are the most ionising because they are large, heavy, and have a +2 charge, so they interact strongly with atoms they pass.",
      difficulty: 2
    },
    {
      question: "What is the half-life of a radioactive isotope?",
      options: [
        "The time taken for the number of radioactive nuclei to halve",
        "Half the lifetime of the isotope",
        "The time for all nuclei to decay",
        "The time for the isotope to lose half its mass"
      ],
      correct_answer: 0,
      explanation: "Half-life is the time taken for half the unstable nuclei in a sample to decay, or for the count rate to fall to half its original value.",
      difficulty: 2
    },
    {
      question: "Which type of radiation can pass through paper but is stopped by a few millimetres of aluminium?",
      options: ["Beta (β)", "Alpha (α)", "Gamma (γ)", "All are stopped by paper"],
      correct_answer: 0,
      explanation: "Beta particles are stopped by a few mm of aluminium. Alpha is stopped by paper/skin. Gamma is only reduced by thick lead or concrete.",
      difficulty: 2
    },
    {
      question: "What happens during beta (β) decay?",
      options: [
        "A neutron turns into a proton and a high-speed electron is emitted",
        "A proton turns into a neutron and a positron is emitted",
        "A helium nucleus is emitted",
        "An electromagnetic wave is emitted"
      ],
      correct_answer: 0,
      explanation: "In beta-minus decay, a neutron changes into a proton (staying in the nucleus) and a high-speed electron (beta particle) is emitted. The atomic number increases by 1.",
      difficulty: 3
    },
  ],

  "forces": [
    {
      question: "What is Newton's second law of motion?",
      options: [
        "Force = mass × acceleration (F = ma)",
        "Every action has an equal and opposite reaction",
        "An object at rest stays at rest unless acted on by a force",
        "Force = mass × velocity"
      ],
      correct_answer: 0,
      explanation: "Newton's second law: the resultant force on an object is equal to the mass of the object multiplied by its acceleration. F = ma.",
      difficulty: 1
    },
    {
      question: "What is terminal velocity?",
      options: [
        "The constant velocity reached when the drag force equals the driving force or weight",
        "The fastest speed any object can reach",
        "The speed of light",
        "The velocity at which an object stops"
      ],
      correct_answer: 0,
      explanation: "Terminal velocity occurs when air resistance (drag) equals the weight of a falling object. The resultant force is zero, so acceleration is zero.",
      difficulty: 2
    },
    {
      question: "What is the formula for weight?",
      options: ["W = mg", "W = mv", "W = ma", "W = Fd"],
      correct_answer: 0,
      explanation: "Weight = mass × gravitational field strength. On Earth, g ≈ 9.8 N/kg (often rounded to 10 N/kg).",
      difficulty: 1
    },
    {
      question: "What is the unit of force?",
      options: ["Newton (N)", "Joule (J)", "Watt (W)", "Pascal (Pa)"],
      correct_answer: 0,
      explanation: "Force is measured in newtons (N). 1 N is the force needed to give a 1 kg mass an acceleration of 1 m/s².",
      difficulty: 1
    },
    {
      question: "What is the formula for pressure?",
      options: ["P = F/A", "P = FA", "P = F − A", "P = A/F"],
      correct_answer: 0,
      explanation: "Pressure = force ÷ area. A smaller area with the same force creates greater pressure. Units are pascals (Pa).",
      difficulty: 2
    },
  ],

  "waves": [
    {
      question: "What is the formula linking wave speed, frequency, and wavelength?",
      options: ["v = fλ", "v = f/λ", "v = λ/f", "v = f + λ"],
      correct_answer: 0,
      explanation: "Wave speed (v) = frequency (f) × wavelength (λ). This applies to all types of waves.",
      difficulty: 1
    },
    {
      question: "What type of wave is sound?",
      options: ["Longitudinal", "Transverse", "Electromagnetic", "Surface"],
      correct_answer: 0,
      explanation: "Sound is a longitudinal wave — the vibrations of particles are parallel to the direction of energy transfer (compressions and rarefactions).",
      difficulty: 1
    },
    {
      question: "What type of wave is light?",
      options: ["Transverse", "Longitudinal", "Mechanical", "Sound"],
      correct_answer: 0,
      explanation: "Light is a transverse electromagnetic wave — the oscillations are perpendicular to the direction of energy transfer. It does not need a medium.",
      difficulty: 1
    },
    {
      question: "What is the correct order of the electromagnetic spectrum from lowest to highest frequency?",
      options: [
        "Radio, microwave, infrared, visible, ultraviolet, X-ray, gamma",
        "Gamma, X-ray, ultraviolet, visible, infrared, microwave, radio",
        "Radio, infrared, microwave, visible, X-ray, ultraviolet, gamma",
        "Visible, infrared, radio, microwave, ultraviolet, X-ray, gamma"
      ],
      correct_answer: 0,
      explanation: "From lowest to highest frequency (and longest to shortest wavelength): radio, microwave, infrared, visible light, ultraviolet, X-rays, gamma rays.",
      difficulty: 2
    },
    {
      question: "What is the normal line in wave diagrams?",
      options: [
        "A line perpendicular to the surface at the point of incidence",
        "A line along the surface",
        "The reflected ray",
        "The incident ray"
      ],
      correct_answer: 0,
      explanation: "The normal is an imaginary line drawn at right angles (90°) to the reflecting or refracting surface at the point where the ray hits.",
      difficulty: 2
    },
  ],

  "magnetism": [
    {
      question: "What is a magnetic field?",
      options: [
        "A region around a magnet where a magnetic material experiences a force",
        "The inside of a magnet",
        "A type of electric current",
        "A force that only acts on electrons"
      ],
      correct_answer: 0,
      explanation: "A magnetic field is the region around a magnet (or current-carrying wire) where magnetic forces act on magnetic materials or moving charges.",
      difficulty: 1
    },
    {
      question: "What does a solenoid produce when current flows through it?",
      options: [
        "A magnetic field similar to a bar magnet",
        "An electric field only",
        "Heat energy only",
        "Light energy"
      ],
      correct_answer: 0,
      explanation: "A solenoid (coil of wire) carrying current creates a magnetic field pattern identical to a bar magnet, with north and south poles at each end.",
      difficulty: 2
    },
    {
      question: "What is the motor effect?",
      options: [
        "A current-carrying conductor in a magnetic field experiences a force",
        "A magnet always spins",
        "Electricity is generated by turning a coil",
        "A compass always points north"
      ],
      correct_answer: 0,
      explanation: "When a wire carrying a current is placed in a magnetic field, it experiences a force perpendicular to both the current direction and the field. This is used in electric motors.",
      difficulty: 2
    },
    {
      question: "What determines the direction of the force on a current-carrying conductor in a magnetic field?",
      options: [
        "Fleming's left-hand rule",
        "Fleming's right-hand rule",
        "Newton's third law",
        "Ohm's law"
      ],
      correct_answer: 0,
      explanation: "Fleming's left-hand rule: thumb = force (motion), first finger = field direction, second finger = current direction.",
      difficulty: 2
    },
    {
      question: "What is electromagnetic induction?",
      options: [
        "Generating a potential difference by moving a conductor through a magnetic field or changing the magnetic field through a coil",
        "Creating a magnet using electricity",
        "The motor effect",
        "Charging a battery"
      ],
      correct_answer: 0,
      explanation: "Electromagnetic induction occurs when a conductor moves through a magnetic field (or the field changes), inducing a potential difference (voltage). This is how generators work.",
      difficulty: 3
    },
  ],

  "space-physics": [
    {
      question: "What force keeps planets in orbit around the Sun?",
      options: ["Gravity", "Magnetism", "Friction", "Electrostatic force"],
      correct_answer: 0,
      explanation: "Gravitational attraction between the Sun and planets provides the centripetal force that keeps planets in their orbits.",
      difficulty: 1
    },
    {
      question: "What is a light-year?",
      options: [
        "The distance light travels in one year",
        "The time it takes light to reach Earth from the Sun",
        "The brightness of a star",
        "A unit of time"
      ],
      correct_answer: 0,
      explanation: "A light-year is a unit of distance — approximately 9.46 × 10¹² km. It is the distance light travels in vacuum in one year.",
      difficulty: 1
    },
    {
      question: "What is red shift?",
      options: [
        "The observed increase in wavelength of light from galaxies moving away from us",
        "Stars turning red as they cool down",
        "Light bending around planets",
        "The colour of the Sun at sunset"
      ],
      correct_answer: 0,
      explanation: "Red shift is the stretching of light wavelengths from distant galaxies. The further away a galaxy is, the greater its red shift, showing it is moving away faster.",
      difficulty: 2
    },
    {
      question: "What does red shift provide evidence for?",
      options: [
        "The universe is expanding",
        "The universe is contracting",
        "Stars are getting hotter",
        "Planets are moving closer to Earth"
      ],
      correct_answer: 0,
      explanation: "Red shift shows that galaxies are moving away from us (and from each other), providing key evidence that the universe is expanding — supporting the Big Bang theory.",
      difficulty: 2
    },
    {
      question: "Our solar system is part of which galaxy?",
      options: ["The Milky Way", "Andromeda", "The Magellanic Cloud", "Centaurus A"],
      correct_answer: 0,
      explanation: "Our solar system is located in the Milky Way galaxy, a barred spiral galaxy containing billions of stars.",
      difficulty: 1
    },
  ],

  // ========== ENGLISH LANGUAGE (8 topics) ==========

  "paper1-reading-comprehension": [
    {
      question: "How many marks is AQA English Language Paper 1, Question 1 worth?",
      options: ["4 marks", "8 marks", "12 marks", "20 marks"],
      correct_answer: 0,
      explanation: "Question 1 is worth 4 marks and requires you to list 4 things from a specified part of the text.",
      difficulty: 1
    },
    {
      question: "What type of text is used in AQA English Language Paper 1?",
      options: [
        "A fiction text (literary prose, 20th or 21st century)",
        "Two non-fiction texts",
        "A poem and a prose extract",
        "A newspaper article"
      ],
      correct_answer: 0,
      explanation: "Paper 1 is titled 'Explorations in Creative Reading and Writing' and uses one fiction (literary prose) text.",
      difficulty: 1
    },
    {
      question: "What does Question 1 on Paper 1 ask you to do?",
      options: [
        "List 4 things you learn from a specified part of the text",
        "Analyse the writer's use of language",
        "Write a creative story",
        "Compare two texts"
      ],
      correct_answer: 0,
      explanation: "Q1 is a retrieval question: you simply identify and list 4 things from a given section of the text. No analysis is needed.",
      difficulty: 1
    },
    {
      question: "How many sources are used in Paper 1?",
      options: ["One", "Two", "Three", "Four"],
      correct_answer: 0,
      explanation: "Paper 1 uses a single fiction source (literary prose). Paper 2 uses two non-fiction sources.",
      difficulty: 1
    },
    {
      question: "What should you avoid doing in Question 1?",
      options: [
        "Giving opinions or analysing language — just state facts from the text",
        "Quoting from the text",
        "Reading the text carefully",
        "Writing in full sentences"
      ],
      correct_answer: 0,
      explanation: "Q1 only requires factual retrieval. Spending time on analysis or opinions wastes time and gains no extra marks.",
      difficulty: 2
    },
  ],

  "paper1-language-analysis": [
    {
      question: "AQA Paper 1, Question 2 asks you to analyse how the writer uses:",
      options: ["Language", "Structure", "Both language and structure", "Rhetorical devices only"],
      correct_answer: 0,
      explanation: "Q2 focuses specifically on language analysis — how the writer's word choices and language techniques create meaning and effects.",
      difficulty: 1
    },
    {
      question: "What is a metaphor?",
      options: [
        "A comparison that says one thing IS another (without 'like' or 'as')",
        "A comparison using 'like' or 'as'",
        "Giving human qualities to non-human things",
        "Exaggeration for effect"
      ],
      correct_answer: 0,
      explanation: "A metaphor directly states that something is something else (e.g., 'The classroom was a zoo'). It differs from a simile, which uses 'like' or 'as'.",
      difficulty: 1
    },
    {
      question: "What effect do short sentences typically create?",
      options: [
        "Tension, pace, drama, or impact",
        "A calm, relaxed atmosphere",
        "Detailed description",
        "Confusion for the reader"
      ],
      correct_answer: 0,
      explanation: "Short sentences create tension, quicken the pace, and add impact. They are often used at dramatic moments or to emphasise key points.",
      difficulty: 2
    },
    {
      question: "What does 'semantic field' mean?",
      options: [
        "A group of words within a text that relate to the same topic or theme",
        "A field of study in linguistics",
        "The meaning of a single word",
        "A type of sentence structure"
      ],
      correct_answer: 0,
      explanation: "A semantic field is a set of words that are related in meaning (e.g., 'darkness', 'shadows', 'night' form a semantic field of darkness).",
      difficulty: 2
    },
    {
      question: "What is sibilance?",
      options: [
        "The repetition of 's' and 'sh' sounds",
        "The repetition of vowel sounds",
        "The repetition of the first letter of consecutive words",
        "The use of onomatopoeia"
      ],
      correct_answer: 0,
      explanation: "Sibilance is the repetition of soft 's' and 'sh' sounds. It can create a sinister, soothing, or secretive atmosphere.",
      difficulty: 3
    },
  ],

  "paper1-structure-analysis": [
    {
      question: "AQA Paper 1, Question 3 asks you to analyse how the writer uses:",
      options: ["Structure", "Language", "Rhetoric", "Grammar"],
      correct_answer: 0,
      explanation: "Q3 specifically focuses on structural features — how the writer organises and sequences the text for effect.",
      difficulty: 1
    },
    {
      question: "What is a structural feature?",
      options: [
        "How the text is organised, e.g., focus shifts, perspective changes, beginning/ending",
        "A language technique like simile or metaphor",
        "The grammar of a sentence",
        "The spelling and punctuation used"
      ],
      correct_answer: 0,
      explanation: "Structural features include how the text opens and closes, shifts in focus or perspective, flashbacks, foreshadowing, and paragraph organisation.",
      difficulty: 2
    },
    {
      question: "What does a cyclical structure mean?",
      options: [
        "The text ends where it began, creating a sense of completion",
        "The text goes through the seasons",
        "The text is written in a circle shape",
        "The text has no clear ending"
      ],
      correct_answer: 0,
      explanation: "A cyclical structure is when the end of the text mirrors or returns to its beginning, creating a sense of closure or inevitability.",
      difficulty: 2
    },
    {
      question: "What is a narrative perspective shift?",
      options: [
        "When the focus, viewpoint, or narrator changes within the text",
        "When the text changes from prose to poetry",
        "When the language becomes more formal",
        "When the text includes dialogue"
      ],
      correct_answer: 0,
      explanation: "A perspective shift is when the writer changes the narrative focus — for example, from one character to another, or from past to present.",
      difficulty: 2
    },
    {
      question: "When analysing structure, what should you comment on about the opening and ending?",
      options: [
        "How the writer engages the reader at the start and the effect of the ending",
        "Only the language techniques used",
        "The number of paragraphs",
        "The word count of each section"
      ],
      correct_answer: 0,
      explanation: "Comment on how the opening hooks the reader (e.g., in medias res, description) and how the ending resolves or leaves the reader (e.g., cliffhanger, resolution).",
      difficulty: 2
    },
  ],

  "paper1-evaluation": [
    {
      question: "How many marks is AQA Paper 1, Question 4 worth?",
      options: ["20 marks", "8 marks", "12 marks", "40 marks"],
      correct_answer: 0,
      explanation: "Q4 is worth 20 marks and is the highest-mark reading question on Paper 1.",
      difficulty: 1
    },
    {
      question: "What does Question 4 require you to do?",
      options: [
        "Evaluate critically how far you agree with a given statement, using evidence",
        "List facts from the text",
        "Write a creative piece",
        "Summarise the whole text"
      ],
      correct_answer: 0,
      explanation: "Q4 gives a statement about the text and asks you to evaluate how far you agree, using textual evidence and analysis of the writer's methods.",
      difficulty: 2
    },
    {
      question: "What does 'critically evaluate' mean?",
      options: [
        "Make judgements about how effectively the writer achieves their purpose",
        "Simply agree with everything the writer says",
        "Find spelling mistakes in the text",
        "Summarise the plot"
      ],
      correct_answer: 0,
      explanation: "Critical evaluation means assessing the effectiveness of the writer's choices (language, structure, techniques) and forming your own supported opinion.",
      difficulty: 2
    },
    {
      question: "A strong evaluation response should include:",
      options: [
        "A clear opinion, textual evidence (quotations), and analysis of writer's methods",
        "Only your personal experience",
        "A retelling of the story",
        "Just a list of language techniques"
      ],
      correct_answer: 0,
      explanation: "Top-band responses state a clear argument, embed short quotations, and analyse how specific methods create effects that relate to the given statement.",
      difficulty: 2
    },
    {
      question: "What is the recommended time allocation for Q4 on Paper 1?",
      options: [
        "About 20–25 minutes",
        "About 5 minutes",
        "About 45 minutes",
        "About 10 minutes"
      ],
      correct_answer: 0,
      explanation: "Q4 is worth 20 marks out of 80 for the whole paper (1 hour 45 minutes), so spending about 20–25 minutes is a sensible allocation.",
      difficulty: 1
    },
  ],

  "paper1-creative-writing": [
    {
      question: "How many marks is AQA Paper 1, Question 5 worth?",
      options: ["40 marks", "20 marks", "24 marks", "16 marks"],
      correct_answer: 0,
      explanation: "Q5 is worth 40 marks in total: 24 for content and organisation, and 16 for technical accuracy (SPaG).",
      difficulty: 1
    },
    {
      question: "What choices does Question 5 give you?",
      options: [
        "A choice between a picture stimulus and a written prompt for creative writing",
        "A choice between two non-fiction texts",
        "A choice between writing an essay or a letter",
        "No choice — there is only one task"
      ],
      correct_answer: 0,
      explanation: "Q5 offers either a picture-based prompt or a written scenario/title to inspire your creative writing (descriptive or narrative).",
      difficulty: 1
    },
    {
      question: "What does SPaG stand for?",
      options: [
        "Spelling, Punctuation, and Grammar",
        "Structure, Paragraphs, and Genre",
        "Style, Presentation, and Grammar",
        "Sentences, Punctuation, and Adjectives"
      ],
      correct_answer: 0,
      explanation: "SPaG stands for Spelling, Punctuation, and Grammar. On Paper 1 Q5, 16 marks are allocated for technical accuracy.",
      difficulty: 1
    },
    {
      question: "Why should you vary your sentence structures in creative writing?",
      options: [
        "To engage the reader and create different effects (tension, pace, atmosphere)",
        "To make the writing longer",
        "To show you know lots of grammar rules",
        "To confuse the examiner"
      ],
      correct_answer: 0,
      explanation: "Varying sentence lengths and types (simple, compound, complex) creates rhythm, controls pace, and keeps the reader engaged.",
      difficulty: 2
    },
    {
      question: "What is a discourse marker?",
      options: [
        "A word or phrase that connects and organises ideas (e.g., However, Furthermore, Meanwhile)",
        "A punctuation mark",
        "A type of metaphor",
        "The title of a piece of writing"
      ],
      correct_answer: 0,
      explanation: "Discourse markers (cohesive devices) link paragraphs and ideas, guiding the reader through the text (e.g., 'However', 'In contrast', 'Subsequently').",
      difficulty: 2
    },
  ],

  "paper2-reading-comprehension": [
    {
      question: "AQA English Language Paper 2 uses what type of texts?",
      options: [
        "Two non-fiction texts",
        "One fiction text",
        "One poem and one prose text",
        "Three non-fiction texts"
      ],
      correct_answer: 0,
      explanation: "Paper 2 ('Writers' Viewpoints and Perspectives') uses two non-fiction texts: one from the 21st century and one from the 19th century.",
      difficulty: 1
    },
    {
      question: "How many marks is Paper 2, Question 1 worth?",
      options: ["4 marks", "8 marks", "12 marks", "20 marks"],
      correct_answer: 0,
      explanation: "Q1 on Paper 2 is worth 4 marks and tests your ability to identify true statements about one of the sources.",
      difficulty: 1
    },
    {
      question: "Source A on Paper 2 is typically from which century?",
      options: ["21st century", "19th century", "18th century", "17th century"],
      correct_answer: 0,
      explanation: "Source A is a 21st-century non-fiction text. Source B is a 19th-century non-fiction text, allowing comparison across time periods.",
      difficulty: 1
    },
    {
      question: "What does Paper 2, Question 2 ask you to do?",
      options: [
        "Summarise the differences or similarities between two sources on a given topic",
        "Analyse language in one source only",
        "Write your own non-fiction text",
        "Compare the writers' use of structure"
      ],
      correct_answer: 0,
      explanation: "Q2 asks you to use details from both sources to write a summary of the differences (or similarities) on a specified aspect.",
      difficulty: 2
    },
    {
      question: "What is important to include in your answer to Q2?",
      options: [
        "Evidence from BOTH sources, with clear inferences",
        "Only your personal opinions",
        "Evidence from one source only",
        "A comparison of language techniques"
      ],
      correct_answer: 0,
      explanation: "Q2 requires you to synthesise information from both sources, using evidence (quotations) and making clear inferences about the differences or similarities.",
      difficulty: 2
    },
  ],

  "paper2-comparison": [
    {
      question: "What does Paper 2, Question 4 ask you to do?",
      options: [
        "Compare how two writers convey their different perspectives and viewpoints",
        "List facts from both sources",
        "Write a creative story",
        "Analyse the structure of one text"
      ],
      correct_answer: 0,
      explanation: "Q4 is the comparison question: you must compare how the two writers convey their different attitudes, perspectives, and viewpoints on a topic.",
      difficulty: 1
    },
    {
      question: "How many marks is Paper 2, Question 4 worth?",
      options: ["16 marks", "8 marks", "20 marks", "4 marks"],
      correct_answer: 0,
      explanation: "Q4 is worth 16 marks and requires a detailed comparison of both writers' methods and viewpoints.",
      difficulty: 1
    },
    {
      question: "How should you structure your comparison for Q4?",
      options: [
        "Compare point by point, using evidence and analysis from both texts",
        "Write about Source A completely, then Source B completely",
        "Only focus on one source",
        "List all the techniques used without any analysis"
      ],
      correct_answer: 0,
      explanation: "The best approach is to compare the writers' methods and perspectives point by point, integrating evidence and analysis from both texts throughout.",
      difficulty: 2
    },
    {
      question: "Which connectives are useful for comparison writing?",
      options: [
        "Similarly, However, In contrast, Whereas, Likewise",
        "Firstly, Secondly, Thirdly, Finally",
        "Because, Therefore, So, Thus",
        "And, But, Or, Yet"
      ],
      correct_answer: 0,
      explanation: "Comparison connectives like 'Similarly', 'However', 'In contrast', and 'Whereas' help signal similarities and differences between the two texts.",
      difficulty: 2
    },
    {
      question: "What must you analyse when comparing the two texts in Q4?",
      options: [
        "Writers' methods (language, structure, tone) and how they convey their viewpoints",
        "Only the factual content",
        "Only the dates the texts were written",
        "Only structural features"
      ],
      correct_answer: 0,
      explanation: "You must analyse HOW writers convey their perspectives — their language choices, techniques, tone, and structural decisions — not just what they say.",
      difficulty: 2
    },
  ],

  "paper2-viewpoint-writing": [
    {
      question: "Paper 2, Question 5 asks you to write a text that:",
      options: [
        "Presents a clear viewpoint (e.g., an article, letter, or speech)",
        "Describes a picture",
        "Tells a creative story",
        "Summarises a non-fiction text"
      ],
      correct_answer: 0,
      explanation: "Q5 requires transactional writing: producing a non-fiction text (article, letter, speech, or leaflet) that presents a clear and persuasive viewpoint.",
      difficulty: 1
    },
    {
      question: "What is a rhetorical question?",
      options: [
        "A question asked for effect, not expecting an answer",
        "A question with a definite answer",
        "A question asked in a quiz",
        "A question about rhetoric"
      ],
      correct_answer: 0,
      explanation: "Rhetorical questions are used to make the reader think and engage with the argument, e.g., 'How can we stand by and do nothing?'",
      difficulty: 1
    },
    {
      question: "What persuasive techniques does the acronym DAFOREST represent?",
      options: [
        "Direct address, Alliteration, Facts, Opinions, Rhetorical questions, Emotive language, Statistics, Triples (rule of three)",
        "Description, Adjectives, Fiction, Order, Rhetoric, Examples, Similes, Tone",
        "Dialogue, Action, Flashback, Opinion, Repetition, Endings, Structure, Themes",
        "Direct speech, Anecdotes, Foreshadowing, Onomatopoeia, Rhyme, Empathy, Symbolism, Tense"
      ],
      correct_answer: 0,
      explanation: "DAFOREST is a useful acronym for remembering persuasive writing techniques: Direct address, Alliteration, Facts, Opinions, Rhetorical questions, Emotive language, Statistics, Triples.",
      difficulty: 2
    },
    {
      question: "How many marks is Paper 2, Question 5 worth?",
      options: ["40 marks", "20 marks", "24 marks", "16 marks"],
      correct_answer: 0,
      explanation: "Q5 is worth 40 marks: 24 for content and organisation, and 16 for technical accuracy (SPaG).",
      difficulty: 1
    },
    {
      question: "What is the 'rule of three'?",
      options: [
        "Using a list of three words or phrases for persuasive emphasis",
        "Writing exactly three paragraphs",
        "Using three quotations per paragraph",
        "Repeating every point three times"
      ],
      correct_answer: 0,
      explanation: "The rule of three is a rhetorical technique where three related words/phrases are grouped together for impact, e.g., 'education, education, education'.",
      difficulty: 2
    },
  ],

  // ========== ENGLISH LITERATURE (7 topics) ==========

  "macbeth": [
    {
      question: "Who wrote Macbeth?",
      options: ["William Shakespeare", "Charles Dickens", "J.B. Priestley", "Robert Louis Stevenson"],
      correct_answer: 0,
      explanation: "Macbeth was written by William Shakespeare, probably around 1606, during the reign of King James I.",
      difficulty: 1
    },
    {
      question: "What do the three witches predict for Macbeth?",
      options: [
        "He will become Thane of Cawdor and then King of Scotland",
        "He will become rich and famous",
        "He will die in battle",
        "He will have many children who become kings"
      ],
      correct_answer: 0,
      explanation: "The witches hail Macbeth as Thane of Glamis (his current title), Thane of Cawdor, and 'King hereafter'. This sparks his ambition.",
      difficulty: 1
    },
    {
      question: "Who persuades Macbeth to murder King Duncan?",
      options: ["Lady Macbeth", "Banquo", "Macduff", "The witches alone"],
      correct_answer: 0,
      explanation: "While the witches plant the idea, it is Lady Macbeth who directly persuades and manipulates Macbeth into killing Duncan, questioning his manhood.",
      difficulty: 1
    },
    {
      question: "Which theme is central to Macbeth?",
      options: [
        "Ambition and the corrupting nature of unchecked power",
        "Romantic love and devotion",
        "The importance of education",
        "Friendship and loyalty"
      ],
      correct_answer: 0,
      explanation: "Ambition is the driving force of the play. Macbeth's 'vaulting ambition' leads to murder, tyranny, guilt, and ultimately his downfall.",
      difficulty: 2
    },
    {
      question: "What happens to Macbeth at the end of the play?",
      options: [
        "He is killed by Macduff and Malcolm becomes king",
        "He defeats all his enemies and rules peacefully",
        "He escapes to England",
        "He surrenders and is imprisoned"
      ],
      correct_answer: 0,
      explanation: "Macduff, who was 'from his mother's womb untimely ripped' (born by Caesarean), kills Macbeth, fulfilling the witches' prophecy. Malcolm is crowned king.",
      difficulty: 2
    },
  ],

  "romeo-and-juliet": [
    {
      question: "Which two families are feuding in Romeo and Juliet?",
      options: [
        "The Montagues and the Capulets",
        "The Birlings and the Crofts",
        "The Macbeths and the Macduffs",
        "The Benvolio and the Tybalt families"
      ],
      correct_answer: 0,
      explanation: "The ancient feud between the Montagues (Romeo's family) and Capulets (Juliet's family) is the central conflict of the play.",
      difficulty: 1
    },
    {
      question: "Who is Romeo's friend who delivers the famous 'Queen Mab' speech?",
      options: ["Mercutio", "Benvolio", "Tybalt", "Friar Lawrence"],
      correct_answer: 0,
      explanation: "Mercutio, Romeo's witty and imaginative friend, delivers the Queen Mab speech about the fairy who brings dreams.",
      difficulty: 2
    },
    {
      question: "Who secretly marries Romeo and Juliet?",
      options: ["Friar Lawrence", "The Nurse", "The Prince", "Mercutio"],
      correct_answer: 0,
      explanation: "Friar Lawrence agrees to marry them in secret, hoping the union will end the feud between the Montagues and Capulets.",
      difficulty: 1
    },
    {
      question: "What is a central theme of Romeo and Juliet?",
      options: [
        "Love versus hate, and the destructive power of feuds",
        "The importance of wealth and status",
        "The benefits of arranged marriage",
        "The power of science"
      ],
      correct_answer: 0,
      explanation: "The play explores how love and hate coexist, and how the families' irrational hatred ultimately destroys their children — 'star-cross'd lovers'.",
      difficulty: 2
    },
    {
      question: "How does the play end?",
      options: [
        "Both Romeo and Juliet die, and the families agree to end their feud",
        "Romeo and Juliet escape to Mantua",
        "Only Romeo dies; Juliet marries Paris",
        "The Prince banishes both families"
      ],
      correct_answer: 0,
      explanation: "Romeo poisons himself believing Juliet is dead. Juliet wakes, sees Romeo dead, and stabs herself. The families, grief-stricken, finally reconcile.",
      difficulty: 1
    },
  ],

  "inspector-calls": [
    {
      question: "Who wrote An Inspector Calls?",
      options: ["J.B. Priestley", "William Shakespeare", "Charles Dickens", "Arthur Miller"],
      correct_answer: 0,
      explanation: "J.B. Priestley wrote An Inspector Calls in 1945, though it is set in 1912, before both World Wars.",
      difficulty: 1
    },
    {
      question: "In what year is An Inspector Calls set?",
      options: ["1912", "1945", "1918", "1939"],
      correct_answer: 0,
      explanation: "The play is set in 1912 (before WWI and the Titanic sinking) but was written in 1945. This allows dramatic irony about Mr Birling's confident predictions.",
      difficulty: 1
    },
    {
      question: "Who is Eva Smith/Daisy Renton?",
      options: [
        "A working-class woman who committed suicide after being mistreated by each family member",
        "The Inspector's wife",
        "Mr Birling's secretary",
        "A wealthy socialite"
      ],
      correct_answer: 0,
      explanation: "Eva Smith is the young working-class woman whose death the Inspector investigates. Each Birling family member contributed to her downfall.",
      difficulty: 1
    },
    {
      question: "What is Priestley's central message in the play?",
      options: [
        "We are all responsible for each other — social responsibility matters",
        "The upper classes should be left alone",
        "Individual success is all that matters",
        "The police should not investigate personal matters"
      ],
      correct_answer: 0,
      explanation: "Priestley uses the Inspector to argue that society should care for all its members. The Inspector's final speech warns: 'We are members of one body.'",
      difficulty: 2
    },
    {
      question: "Which character shows the most change and accepts responsibility?",
      options: ["Sheila Birling", "Mr Birling", "Mrs Birling", "Gerald Croft"],
      correct_answer: 0,
      explanation: "Sheila is the character who learns most from the Inspector's visit. She accepts her guilt, shows genuine remorse, and represents the hope for change.",
      difficulty: 2
    },
  ],

  "christmas-carol": [
    {
      question: "Who wrote A Christmas Carol?",
      options: ["Charles Dickens", "William Shakespeare", "J.B. Priestley", "Charlotte Brontë"],
      correct_answer: 0,
      explanation: "Charles Dickens published A Christmas Carol in 1843, at a time of great poverty and inequality in Victorian England.",
      difficulty: 1
    },
    {
      question: "Name the three spirits that visit Scrooge.",
      options: [
        "Ghost of Christmas Past, Ghost of Christmas Present, Ghost of Christmas Yet to Come",
        "Ghost of Jacob Marley, Ghost of Tiny Tim, Ghost of Fred",
        "Spirit of Giving, Spirit of Joy, Spirit of Redemption",
        "Ghost of Fezziwig, Ghost of Belle, Ghost of Bob Cratchit"
      ],
      correct_answer: 0,
      explanation: "Scrooge is visited by three spirits on Christmas Eve: the Ghost of Christmas Past, Present, and Yet to Come, each showing him different visions.",
      difficulty: 1
    },
    {
      question: "What is Scrooge's famous catchphrase?",
      options: ["'Bah! Humbug!'", "'God bless us, everyone!'", "'Merry Christmas!'", "'Are there no prisons?'"],
      correct_answer: 0,
      explanation: "'Bah! Humbug!' expresses Scrooge's contempt for Christmas and generosity at the start of the novella, showing his miserly nature.",
      difficulty: 1
    },
    {
      question: "What social issue does Dickens primarily highlight in A Christmas Carol?",
      options: [
        "Poverty and the mistreatment of the poor by the wealthy",
        "The education system",
        "Women's rights",
        "Scientific progress"
      ],
      correct_answer: 0,
      explanation: "Dickens wrote to highlight the suffering of the poor in Victorian England and to criticise the selfishness of the wealthy upper classes.",
      difficulty: 2
    },
    {
      question: "How does Scrooge change by the end of the novella?",
      options: [
        "He transforms from a cold, miserly man to a generous, kind, and joyful person",
        "He becomes even meaner",
        "He dies alone",
        "He moves to another country"
      ],
      correct_answer: 0,
      explanation: "Scrooge's redemption is the central arc: he goes from 'squeezing, wrenching, grasping' to raising Bob Cratchit's salary and becoming 'as good a man as the city knew'.",
      difficulty: 1
    },
  ],

  "jekyll-hyde": [
    {
      question: "Who wrote The Strange Case of Dr Jekyll and Mr Hyde?",
      options: ["Robert Louis Stevenson", "Charles Dickens", "Mary Shelley", "Oscar Wilde"],
      correct_answer: 0,
      explanation: "Robert Louis Stevenson published the novella in 1886, during the Victorian era.",
      difficulty: 1
    },
    {
      question: "What is the relationship between Jekyll and Hyde?",
      options: [
        "They are the same person — Jekyll transforms into Hyde using a potion",
        "They are brothers",
        "Hyde is Jekyll's servant",
        "They are business partners"
      ],
      correct_answer: 0,
      explanation: "Dr Jekyll creates a potion that transforms him into the evil Mr Hyde, allowing him to indulge his darker impulses without social consequences.",
      difficulty: 1
    },
    {
      question: "What is the main theme of Jekyll and Hyde?",
      options: [
        "The duality of human nature — the battle between good and evil within everyone",
        "Romantic love",
        "The importance of science education",
        "Social class and poverty"
      ],
      correct_answer: 0,
      explanation: "The novella explores the idea that every person has both good and evil within them, and the danger of repressing the darker side of human nature.",
      difficulty: 2
    },
    {
      question: "Who narrates most of the story?",
      options: ["Mr Utterson (a lawyer)", "Dr Jekyll", "Mr Hyde", "Dr Lanyon"],
      correct_answer: 0,
      explanation: "Mr Utterson, Jekyll's loyal friend and lawyer, is the main narrator. His rational perspective makes the supernatural events more unsettling.",
      difficulty: 2
    },
    {
      question: "What does Hyde represent in the context of Victorian society?",
      options: [
        "The repressed, darker side of human nature that Victorian society tried to hide",
        "The upper class",
        "Scientific progress",
        "Religious devotion"
      ],
      correct_answer: 0,
      explanation: "Hyde represents the primitive, immoral desires that Victorian gentlemen suppressed to maintain their respectable public image. Stevenson critiques this hypocrisy.",
      difficulty: 3
    },
  ],

  "power-conflict-poetry": [
    {
      question: "Who wrote 'Ozymandias'?",
      options: ["Percy Bysshe Shelley", "William Blake", "Wilfred Owen", "Ted Hughes"],
      correct_answer: 0,
      explanation: "Percy Bysshe Shelley wrote 'Ozymandias' (1818), a sonnet about the transience of power and the arrogance of rulers.",
      difficulty: 1
    },
    {
      question: "What is the main theme of 'London' by William Blake?",
      options: [
        "Suffering, corruption, and the abuse of power in London",
        "The beauty of the English countryside",
        "Romantic love in the city",
        "The joys of childhood"
      ],
      correct_answer: 0,
      explanation: "Blake's 'London' exposes the suffering of ordinary people, the corruption of institutions (church, monarchy), and the 'mind-forg'd manacles' of oppression.",
      difficulty: 2
    },
    {
      question: "'Remains' by Simon Armitage is about:",
      options: [
        "A soldier haunted by the memory of killing a looter in a warzone",
        "A love story set during wartime",
        "A description of a beautiful landscape",
        "A celebration of military victory"
      ],
      correct_answer: 0,
      explanation: "'Remains' explores the psychological trauma (PTSD) of a soldier who cannot forget shooting a looter. The memory 'remains' with him.",
      difficulty: 2
    },
    {
      question: "What poetic form is 'My Last Duchess' by Robert Browning written in?",
      options: ["Dramatic monologue", "Sonnet", "Ballad", "Free verse"],
      correct_answer: 0,
      explanation: "'My Last Duchess' is a dramatic monologue — the Duke speaks to an envoy, revealing his controlling nature and the implied murder of his wife.",
      difficulty: 2
    },
    {
      question: "'Exposure' by Wilfred Owen explores:",
      options: [
        "The suffering of soldiers in WWI trenches due to extreme cold and boredom",
        "A beautiful winter scene",
        "A romantic relationship during wartime",
        "The excitement of battle"
      ],
      correct_answer: 0,
      explanation: "'Exposure' shows that the real enemy is not the opposing army but the brutal weather. Owen repeats 'But nothing happens' to emphasise the futile waiting.",
      difficulty: 2
    },
  ],

  "unseen-poetry": [
    {
      question: "In the AQA unseen poetry section, how many poems do you analyse in total?",
      options: ["Two", "One", "Three", "Four"],
      correct_answer: 0,
      explanation: "You analyse one poem in detail for Q1 (27 marks allocated as 24+3), then compare it with a second poem for Q2 (8 marks).",
      difficulty: 1
    },
    {
      question: "How many marks is the first unseen poetry question (Q1) worth?",
      options: ["24 marks", "8 marks", "16 marks", "40 marks"],
      correct_answer: 0,
      explanation: "Q1 is worth 24 marks and requires a detailed analysis of one unseen poem, exploring how the poet uses language, structure, and form.",
      difficulty: 1
    },
    {
      question: "What should you comment on when analysing an unseen poem?",
      options: [
        "Language, structure, form, and their effects on the reader",
        "Only the rhyme scheme",
        "The poet's biography",
        "How many stanzas it has, nothing more"
      ],
      correct_answer: 0,
      explanation: "A strong analysis covers language techniques (imagery, word choice), structure (how the poem develops), form (sonnet, free verse, etc.), and their effects.",
      difficulty: 2
    },
    {
      question: "What does the second unseen poetry question (Q2) ask you to do?",
      options: [
        "Compare how the poets present a specific theme or idea in both poems",
        "Rewrite the poem in your own words",
        "Write your own poem",
        "Only discuss the second poem"
      ],
      correct_answer: 0,
      explanation: "Q2 asks you to compare how the methods used in the second poem are similar or different to the first poem, focusing on a specific theme.",
      difficulty: 2
    },
    {
      question: "How should you approach an unseen poem you have never seen before?",
      options: [
        "Read it multiple times, annotate key words, identify themes and techniques",
        "Only read it once quickly",
        "Skip to the questions without reading",
        "Memorise the entire poem word for word"
      ],
      correct_answer: 0,
      explanation: "Read the poem at least twice: first for overall meaning and mood, then to annotate techniques, key words, structure, and how they create effects.",
      difficulty: 1
    },
  ],
};

// ============================================
// SEED FUNCTION
// ============================================

async function seedQuizzes() {
  console.log("🎯 Seeding quiz questions into Supabase...\n");

  // 1. Fetch all topics with their subject information
  const { data: topics, error: topicsError } = await supabase
    .from("topics")
    .select("id, slug, name, subject_id, subjects(name, slug)")
    .order("slug");

  if (topicsError) {
    console.error("Error fetching topics:", topicsError);
    process.exit(1);
  }

  if (!topics || topics.length === 0) {
    console.error("No topics found. Please run the seed script first.");
    process.exit(1);
  }

  console.log(`Found ${topics.length} topics in database.\n`);

  // Build a slug → topic_id map
  const slugToTopicId: Record<string, string> = {};
  for (const topic of topics) {
    slugToTopicId[topic.slug] = topic.id;
  }

  // 2. Prepare all questions for insertion
  const allQuestions: Array<{
    topic_id: string;
    question: string;
    options: string[];
    correct_answer: number;
    explanation: string;
    difficulty: number;
  }> = [];

  let matchedTopics = 0;
  let unmatchedSlugs: string[] = [];

  for (const [slug, questions] of Object.entries(questionsByTopicSlug)) {
    const topicId = slugToTopicId[slug];
    if (!topicId) {
      unmatchedSlugs.push(slug);
      continue;
    }

    matchedTopics++;

    for (const q of questions) {
      allQuestions.push({
        topic_id: topicId,
        question: q.question,
        options: q.options,
        correct_answer: q.correct_answer,
        explanation: q.explanation,
        difficulty: q.difficulty,
      });
    }
  }

  console.log(`Matched ${matchedTopics} topics with questions.`);
  if (unmatchedSlugs.length > 0) {
    console.warn(`⚠️  Unmatched slugs: ${unmatchedSlugs.join(", ")}`);
  }
  console.log(`Total questions to insert: ${allQuestions.length}\n`);

  // 3. Insert in batches of 50
  const BATCH_SIZE = 50;
  let inserted = 0;
  let errors = 0;

  for (let i = 0; i < allQuestions.length; i += BATCH_SIZE) {
    const batch = allQuestions.slice(i, i + BATCH_SIZE);
    const { error: insertError } = await supabase
      .from("quiz_questions")
      .insert(batch);

    if (insertError) {
      console.error(`Error inserting batch ${Math.floor(i / BATCH_SIZE) + 1}:`, insertError);
      errors++;
    } else {
      inserted += batch.length;
      console.log(`  Inserted batch ${Math.floor(i / BATCH_SIZE) + 1}: ${batch.length} questions (total: ${inserted})`);
    }
  }

  // 4. Verify count
  const { count, error: countError } = await supabase
    .from("quiz_questions")
    .select("*", { count: "exact", head: true });

  console.log("\n========================================");
  console.log(`✅ Seeding complete!`);
  console.log(`   Questions inserted this run: ${inserted}`);
  console.log(`   Errors: ${errors}`);
  if (!countError) {
    console.log(`   Total quiz questions in database: ${count}`);
  }
  console.log("========================================");
}

seedQuizzes().catch(console.error);
