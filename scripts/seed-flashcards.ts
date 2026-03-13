// Run with: npx tsx scripts/seed-flashcards.ts
// Seeds flashcards into Supabase for all 71 GCSE topics (8 per topic = 568 flashcards)

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://wmncmoauedmlzbfxajtj.supabase.co";
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

if (!supabaseKey) {
  console.error("Missing SUPABASE_SERVICE_ROLE_KEY environment variable");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

interface Flashcard {
  term: string;
  definition: string;
  hint: string;
}

// ============================================
// FLASHCARD DATA BY TOPIC SLUG
// All content accurate to UK AQA GCSE curriculum
// ============================================

const flashcardsByTopicSlug: Record<string, Flashcard[]> = {

  // ========== MATHS (24 topics) ==========

  "integers-decimals": [
    { term: "Integer", definition: "A whole number that can be positive, negative, or zero (e.g. -3, 0, 7).", hint: "Think of numbers without any decimal point." },
    { term: "Place Value", definition: "The value of a digit determined by its position in a number. For example, in 345 the 3 represents 300.", hint: "Each column is worth 10 times more than the one to its right." },
    { term: "BIDMAS/BODMAS", definition: "The order of operations: Brackets, Indices (or Orders), Division, Multiplication, Addition, Subtraction.", hint: "The mnemonic that tells you which calculation to do first." },
    { term: "Factor", definition: "A whole number that divides exactly into another number with no remainder. E.g. factors of 12 are 1, 2, 3, 4, 6, 12.", hint: "Numbers that go into another number perfectly." },
    { term: "Multiple", definition: "The result of multiplying a number by any positive integer. E.g. multiples of 5 are 5, 10, 15, 20, …", hint: "Think of times tables results for that number." },
    { term: "Prime Number", definition: "A number greater than 1 that has exactly two factors: 1 and itself. E.g. 2, 3, 5, 7, 11.", hint: "It can only be divided by 1 and the number itself." },
    { term: "LCM (Lowest Common Multiple)", definition: "The smallest number that is a multiple of two or more given numbers. E.g. LCM of 4 and 6 is 12.", hint: "The first number that appears in both times tables." },
    { term: "HCF (Highest Common Factor)", definition: "The largest number that divides exactly into two or more given numbers. E.g. HCF of 12 and 18 is 6.", hint: "The biggest number that goes into both numbers." },
  ],

  "fractions-decimals-percentages": [
    { term: "Equivalent Fractions", definition: "Fractions that represent the same value, e.g. 1/2 = 2/4 = 3/6.", hint: "Multiply or divide the top and bottom by the same number." },
    { term: "Improper Fraction", definition: "A fraction where the numerator is greater than or equal to the denominator, e.g. 7/4.", hint: "The top number is bigger than the bottom number." },
    { term: "Mixed Number", definition: "A number consisting of a whole number and a proper fraction, e.g. 1¾.", hint: "Part whole number, part fraction." },
    { term: "Recurring Decimal", definition: "A decimal number that has a digit or group of digits that repeat infinitely, e.g. 0.333… = 1/3.", hint: "The same digits keep going forever, shown with a dot above." },
    { term: "Percentage Increase", definition: "New value = original × (1 + percentage/100). To increase by 15%, multiply by 1.15.", hint: "The multiplier is always greater than 1." },
    { term: "Percentage Decrease", definition: "New value = original × (1 − percentage/100). To decrease by 20%, multiply by 0.80.", hint: "The multiplier is always less than 1." },
    { term: "Percentage Change Formula", definition: "(Change ÷ Original) × 100. Used to find the percentage increase or decrease.", hint: "Divide the difference by what you started with." },
    { term: "Compound Interest", definition: "Interest calculated on the original amount and on accumulated interest. Formula: amount = P × (1 + r/100)ⁿ.", hint: "Interest on interest — the amount grows each year." },
  ],

  "indices-standard-form": [
    { term: "Index / Power", definition: "A small number written above and to the right of a base number indicating how many times to multiply it by itself. E.g. 2³ = 2 × 2 × 2 = 8.", hint: "The little number that tells you how many times to multiply." },
    { term: "Law of Indices: Multiplication", definition: "aᵐ × aⁿ = aᵐ⁺ⁿ. When multiplying with the same base, add the powers.", hint: "Same base? Add the indices together." },
    { term: "Law of Indices: Division", definition: "aᵐ ÷ aⁿ = aᵐ⁻ⁿ. When dividing with the same base, subtract the powers.", hint: "Same base? Subtract the indices." },
    { term: "Negative Index", definition: "a⁻ⁿ = 1/aⁿ. A negative power means the reciprocal.", hint: "Flip it — move it to the bottom of a fraction." },
    { term: "Zero Index", definition: "a⁰ = 1 for any non-zero value of a. Any number to the power of zero equals 1.", hint: "No matter the base, the answer is always the same." },
    { term: "Fractional Index", definition: "a^(1/n) = ⁿ√a and a^(m/n) = (ⁿ√a)ᵐ. A fractional power means a root.", hint: "The denominator of the fraction tells you which root." },
    { term: "Standard Form", definition: "A number written as A × 10ⁿ where 1 ≤ A < 10 and n is an integer. E.g. 4500 = 4.5 × 10³.", hint: "One digit before the decimal point, multiplied by a power of 10." },
    { term: "Standard Form (Small Numbers)", definition: "Small numbers use negative powers of 10. E.g. 0.003 = 3 × 10⁻³.", hint: "Count how many places you move the decimal point to the right." },
  ],

  "surds": [
    { term: "Surd", definition: "An irrational root that cannot be simplified to a whole number, e.g. √2, √3, √5.", hint: "A root that stays as a root because it's not a perfect square." },
    { term: "Simplifying Surds", definition: "Express the number under the root as a product involving a perfect square. E.g. √12 = √(4×3) = 2√3.", hint: "Look for the largest square number that is a factor." },
    { term: "Multiplying Surds", definition: "√a × √b = √(ab). Multiply the numbers under the roots. E.g. √3 × √5 = √15.", hint: "Combine them under one root sign." },
    { term: "Dividing Surds", definition: "√a ÷ √b = √(a/b). Divide the numbers under the roots.", hint: "Put both numbers under one root and simplify." },
    { term: "Adding/Subtracting Surds", definition: "You can only add or subtract surds with the same root. E.g. 3√2 + 5√2 = 8√2.", hint: "Treat the surd like a variable — collect like terms." },
    { term: "Rationalising the Denominator", definition: "Remove the surd from the denominator by multiplying top and bottom by the surd. E.g. 1/√3 = √3/3.", hint: "Multiply the fraction by the surd over itself." },
    { term: "Rationalising (Two Terms)", definition: "For denominators like (a + √b), multiply by the conjugate (a − √b) to eliminate the surd.", hint: "Use the difference of two squares to remove the root." },
    { term: "Expanding Double Brackets with Surds", definition: "Use FOIL to expand. E.g. (2+√3)(1+√3) = 2 + 2√3 + √3 + 3 = 5 + 3√3.", hint: "Multiply each term and remember √a × √a = a." },
  ],

  "algebraic-expressions": [
    { term: "Variable", definition: "A letter or symbol used to represent an unknown value in an expression or equation, e.g. x, y.", hint: "The letter that can take different values." },
    { term: "Term", definition: "A single number, variable, or number multiplied by a variable, e.g. 3x, −5, 2y².", hint: "Parts of an expression separated by + or − signs." },
    { term: "Coefficient", definition: "The number in front of a variable. In 5x, the coefficient is 5.", hint: "The number multiplying the letter." },
    { term: "Collecting Like Terms", definition: "Simplifying an expression by combining terms with the same variable and power. E.g. 3x + 5x = 8x.", hint: "Only combine terms that have the same letter and power." },
    { term: "Expanding Single Brackets", definition: "Multiply each term inside the bracket by the term outside. E.g. 3(x + 4) = 3x + 12.", hint: "The outside term multiplies everything inside." },
    { term: "Expanding Double Brackets", definition: "Use FOIL: multiply First, Outer, Inner, Last terms. E.g. (x+3)(x+2) = x² + 5x + 6.", hint: "Every term in the first bracket multiplies every term in the second." },
    { term: "Factorising (Single Bracket)", definition: "Take out the highest common factor. E.g. 6x + 9 = 3(2x + 3).", hint: "What's the biggest number/letter that goes into every term?" },
    { term: "Factorising Quadratics", definition: "Write ax² + bx + c as a product of two brackets. E.g. x² + 5x + 6 = (x+2)(x+3).", hint: "Find two numbers that multiply to c and add to b." },
  ],

  "linear-equations": [
    { term: "Linear Equation", definition: "An equation where the highest power of the variable is 1. It produces a straight line when graphed. E.g. 2x + 3 = 11.", hint: "No squares or cubes — just x to the power of 1." },
    { term: "Solving by Inverse Operations", definition: "Undo operations in reverse order to isolate the variable. E.g. to solve 2x + 3 = 11, subtract 3 then divide by 2.", hint: "Do the opposite operation to both sides." },
    { term: "Equations with Unknowns on Both Sides", definition: "Collect variable terms on one side and constants on the other. E.g. 5x − 2 = 3x + 8 → 2x = 10 → x = 5.", hint: "Get all the letters on one side first." },
    { term: "Equations with Brackets", definition: "Expand brackets first, then solve as normal. E.g. 3(x + 4) = 21 → 3x + 12 = 21 → x = 3.", hint: "Expand first, then rearrange." },
    { term: "Equations with Fractions", definition: "Multiply both sides by the denominator to eliminate fractions. E.g. x/3 = 5 → x = 15.", hint: "Multiply through by the bottom number to clear the fraction." },
    { term: "Forming Equations", definition: "Translate a word problem into an algebraic equation, then solve. E.g. 'Three more than twice a number is 17' → 2x + 3 = 17.", hint: "Turn the words into maths using a letter for the unknown." },
    { term: "Solution / Root", definition: "The value of the variable that makes the equation true. E.g. if 2x = 10, the solution is x = 5.", hint: "The number you substitute in to make both sides equal." },
    { term: "Identity vs Equation", definition: "An identity (≡) is true for all values of x. An equation (=) is true only for specific values.", hint: "An identity uses the ≡ symbol and works for every number." },
  ],

  "quadratic-equations": [
    { term: "Quadratic Equation", definition: "An equation of the form ax² + bx + c = 0 where a ≠ 0. The highest power of x is 2.", hint: "The x² term is what makes it quadratic." },
    { term: "Factorising to Solve", definition: "Write ax² + bx + c = 0 as (x + p)(x + q) = 0, then set each bracket equal to zero.", hint: "If two things multiply to make zero, one of them must be zero." },
    { term: "Quadratic Formula", definition: "x = (−b ± √(b² − 4ac)) / 2a. Used to solve any quadratic equation ax² + bx + c = 0.", hint: "The formula with ± that gives you two possible answers." },
    { term: "Discriminant", definition: "b² − 4ac. It determines the number of real roots: positive = 2 roots, zero = 1 root, negative = no real roots.", hint: "The part under the square root in the quadratic formula." },
    { term: "Completing the Square", definition: "Write x² + bx + c in the form (x + b/2)² − (b/2)² + c. Used to solve quadratics and find the vertex.", hint: "Half the coefficient of x goes inside the bracket." },
    { term: "Difference of Two Squares", definition: "a² − b² = (a + b)(a − b). A special factorisation pattern.", hint: "Two square terms separated by a minus sign." },
    { term: "Parabola", definition: "The U-shaped curve produced when graphing a quadratic function. Opens upward if a > 0, downward if a < 0.", hint: "The curved shape of a quadratic graph." },
    { term: "Roots / Solutions", definition: "The values of x where the quadratic equals zero. Graphically, these are the x-intercepts of the parabola.", hint: "Where the curve crosses the x-axis." },
  ],

  "simultaneous-equations": [
    { term: "Simultaneous Equations", definition: "Two or more equations with the same unknowns that are solved together to find values satisfying all equations.", hint: "Multiple equations that share the same variables." },
    { term: "Elimination Method", definition: "Add or subtract the equations to eliminate one variable, then solve for the other. May need to multiply first.", hint: "Make the coefficients match, then add or subtract." },
    { term: "Substitution Method", definition: "Rearrange one equation to express a variable in terms of the other, then substitute into the second equation.", hint: "Replace one letter with an expression from the other equation." },
    { term: "Linear Simultaneous Equations", definition: "Both equations are linear (degree 1). The solution is the point where two straight lines intersect.", hint: "Two straight-line equations — they cross at one point." },
    { term: "Non-linear Simultaneous Equations", definition: "One equation is quadratic and one is linear. Solved by substituting the linear into the quadratic.", hint: "One equation has x² — substitute the simpler one in." },
    { term: "Graphical Solution", definition: "Plot both equations on a graph; the solution is the coordinates of the point(s) of intersection.", hint: "Where the lines cross gives you the answer." },
    { term: "No Solution", definition: "Parallel lines have the same gradient but different y-intercepts, so they never meet — no solution exists.", hint: "The lines never cross because they go in the same direction." },
    { term: "Forming Simultaneous Equations", definition: "Translate a word problem into two equations with two unknowns, then solve. E.g. 'Total of 20 coins worth £3.50'.", hint: "Write two different facts about the same unknowns." },
  ],

  "sequences": [
    { term: "Arithmetic Sequence", definition: "A sequence where the difference between consecutive terms is constant. E.g. 3, 7, 11, 15 (common difference = 4).", hint: "You add the same number each time." },
    { term: "Common Difference", definition: "The fixed amount added to each term to get the next in an arithmetic sequence. Found by subtracting consecutive terms.", hint: "What you add each time — second term minus first term." },
    { term: "nth Term (Linear)", definition: "The formula for the nth term of an arithmetic sequence: a + (n−1)d, or equivalently dn + (a−d).", hint: "It always looks like 'something × n + something'." },
    { term: "Geometric Sequence", definition: "A sequence where each term is found by multiplying the previous term by a constant ratio. E.g. 2, 6, 18, 54.", hint: "You multiply by the same number each time." },
    { term: "Common Ratio", definition: "The fixed multiplier between consecutive terms in a geometric sequence. Found by dividing a term by the previous term.", hint: "Divide any term by the one before it." },
    { term: "Quadratic Sequence", definition: "A sequence where the second differences are constant. The nth term contains an n² term.", hint: "The differences between terms aren't constant, but the differences of the differences are." },
    { term: "Fibonacci-type Sequence", definition: "A sequence where each term is the sum of the two preceding terms. E.g. 1, 1, 2, 3, 5, 8, 13.", hint: "Add the previous two terms to get the next one." },
    { term: "Triangular Numbers", definition: "Numbers formed by T(n) = n(n+1)/2. The sequence is 1, 3, 6, 10, 15, 21, …", hint: "Like stacking dots in a triangle — add one more row each time." },
  ],

  "straight-line-graphs": [
    { term: "Gradient (Slope)", definition: "A measure of how steep a line is. Calculated as rise ÷ run, or (y₂ − y₁) ÷ (x₂ − x₁).", hint: "How much the line goes up for every 1 across." },
    { term: "y = mx + c", definition: "The equation of a straight line where m is the gradient and c is the y-intercept.", hint: "m tells you the steepness, c tells you where it crosses the y-axis." },
    { term: "y-intercept", definition: "The point where a line crosses the y-axis. In y = mx + c, the y-intercept is (0, c).", hint: "Set x = 0 and see what y equals." },
    { term: "Parallel Lines", definition: "Lines with the same gradient but different y-intercepts. They never intersect.", hint: "Same steepness, different positions — they never meet." },
    { term: "Perpendicular Lines", definition: "Lines whose gradients multiply to give −1. If one gradient is m, the other is −1/m.", hint: "The gradients are negative reciprocals of each other." },
    { term: "x-intercept", definition: "The point where a line crosses the x-axis. Found by setting y = 0 and solving for x.", hint: "Where the line meets the horizontal axis." },
    { term: "Positive Gradient", definition: "A line that slopes upward from left to right has a positive gradient.", hint: "The line goes up as you move to the right." },
    { term: "Finding the Equation of a Line", definition: "Use y − y₁ = m(x − x₁) with the gradient m and a known point (x₁, y₁).", hint: "You need the gradient and one point on the line." },
  ],

  "quadratic-graphs": [
    { term: "Parabola", definition: "The U-shaped (or inverted U-shaped) curve of a quadratic function y = ax² + bx + c.", hint: "The shape every quadratic graph makes." },
    { term: "Turning Point / Vertex", definition: "The maximum or minimum point of a parabola. Found by completing the square or using x = −b/(2a).", hint: "The point where the curve changes direction." },
    { term: "Line of Symmetry", definition: "A quadratic graph is symmetric about the vertical line x = −b/(2a), passing through the vertex.", hint: "The vertical line that splits the parabola into two mirror halves." },
    { term: "Roots of a Quadratic Graph", definition: "The x-coordinates where the parabola crosses the x-axis (where y = 0).", hint: "The points where the curve touches or crosses the horizontal axis." },
    { term: "Cubic Graph", definition: "A graph of y = ax³ + bx² + cx + d. It has an S-shape and can have up to 3 x-intercepts.", hint: "The graph with the wiggle — the highest power is 3." },
    { term: "Reciprocal Graph", definition: "A graph of y = k/x. It has two separate curves (hyperbolas) in opposite quadrants and never touches the axes.", hint: "The curves get close to the axes but never reach them." },
    { term: "Exponential Graph", definition: "A graph of y = aˣ where a > 0. It curves steeply upward and has a horizontal asymptote at y = 0.", hint: "The graph that grows faster and faster — or decays towards zero." },
    { term: "Asymptote", definition: "A line that a curve approaches but never actually reaches or crosses.", hint: "The invisible boundary the graph gets infinitely close to." },
  ],

  "inequalities": [
    { term: "Inequality", definition: "A mathematical statement showing that one expression is greater than, less than, or not equal to another. Uses <, >, ≤, ≥.", hint: "Like an equation but with a crocodile mouth instead of an equals sign." },
    { term: "Solving Linear Inequalities", definition: "Solve like an equation but reverse the inequality sign when multiplying or dividing by a negative number.", hint: "Same as equations, but watch out for negatives — they flip the sign!" },
    { term: "Number Line Representation", definition: "Show solutions on a number line: open circle (○) for < or >, filled circle (●) for ≤ or ≥.", hint: "Filled means included, empty means not included." },
    { term: "Double Inequality", definition: "An inequality with a variable between two bounds, e.g. −3 < x ≤ 5. Solve the middle part.", hint: "The variable is sandwiched between two values." },
    { term: "Graphical Inequalities", definition: "Shade the region satisfying the inequality on a coordinate grid. Use solid lines for ≤/≥ and dashed for </> .", hint: "Dashed line = not included, solid line = included." },
    { term: "Set Notation", definition: "Writing solution sets using braces. E.g. {x : x > 3} means the set of all x values greater than 3.", hint: "The curly brackets with a colon describing which values are in the set." },
    { term: "Quadratic Inequalities", definition: "Solve by finding roots, sketching the graph, and reading off where the curve is above or below zero.", hint: "Solve the quadratic = 0 first, then use the graph shape." },
    { term: "Integer Solutions", definition: "When asked for integer values satisfying an inequality, list only the whole numbers in the range.", hint: "Only whole numbers — no fractions or decimals." },
  ],

  "ratio-proportion": [
    { term: "Ratio", definition: "A way of comparing two or more quantities. Written as a:b. E.g. mixing paint in the ratio 3:2 means 3 parts of one colour to 2 parts of another.", hint: "A comparison using a colon between the numbers." },
    { term: "Simplifying Ratios", definition: "Divide all parts of the ratio by their HCF. E.g. 12:8 = 3:2.", hint: "Like simplifying fractions — find the biggest number that goes into both." },
    { term: "Sharing in a Given Ratio", definition: "Add the ratio parts to find total shares, divide the amount by total shares, then multiply by each part.", hint: "Find the value of one share first." },
    { term: "Direct Proportion", definition: "Two quantities are directly proportional if when one increases, the other increases at the same rate. y = kx.", hint: "Double one, double the other." },
    { term: "Inverse Proportion", definition: "Two quantities are inversely proportional if when one increases, the other decreases. y = k/x.", hint: "Double one, halve the other." },
    { term: "Unitary Method", definition: "Find the value of one unit first, then scale up or down. E.g. if 5 items cost £20, one costs £4.", hint: "Work out the cost (or amount) for just one." },
    { term: "Scale Factor", definition: "The multiplier used to enlarge or reduce a shape or convert between measurements. E.g. scale factor 3 means 3 times bigger.", hint: "How many times bigger or smaller something becomes." },
    { term: "Proportionality Constant (k)", definition: "In y = kx (direct) or y = k/x (inverse), k is the constant of proportionality found using given values.", hint: "The fixed number that links the two variables together." },
  ],

  "rates-of-change": [
    { term: "Speed", definition: "Distance travelled per unit of time. Speed = distance ÷ time. Measured in m/s or km/h.", hint: "How far you go in a given amount of time." },
    { term: "Density", definition: "Mass per unit volume. Density = mass ÷ volume. Measured in g/cm³ or kg/m³.", hint: "How heavy something is for its size." },
    { term: "Pressure", definition: "Force per unit area. Pressure = force ÷ area. Measured in N/m² or Pascals.", hint: "How much force is spread over a surface." },
    { term: "Compound Measures", definition: "Measures involving two or more units, such as speed (m/s), density (g/cm³), and flow rate (litres/min).", hint: "A measurement that combines two different units." },
    { term: "Percentage Growth", definition: "After n periods at r% growth: final = original × (1 + r/100)ⁿ. The multiplier compounds.", hint: "Like compound interest — it builds on itself." },
    { term: "Depreciation", definition: "Decrease in value over time. After n years at r% depreciation: value = original × (1 − r/100)ⁿ.", hint: "The multiplier is less than 1 because the value drops." },
    { term: "Gradient of a Curve", definition: "The rate of change at a point on a curve, found by drawing a tangent line at that point and calculating its gradient.", hint: "Draw a tangent and find its steepness." },
    { term: "Area Under a Graph", definition: "For a speed-time graph, the area under the curve represents the total distance travelled.", hint: "Use the shapes under the line (triangles, rectangles, trapeziums)." },
  ],

  "angles-polygons": [
    { term: "Angles on a Straight Line", definition: "Angles on a straight line add up to 180°.", hint: "A straight line is half a full turn." },
    { term: "Angles at a Point", definition: "Angles around a full point add up to 360°.", hint: "A complete turn is 360 degrees." },
    { term: "Vertically Opposite Angles", definition: "When two straight lines cross, the opposite angles are equal.", hint: "The angles across from each other at an X shape." },
    { term: "Interior Angles of a Polygon", definition: "Sum of interior angles = (n − 2) × 180° where n is the number of sides.", hint: "Subtract 2 from the number of sides, then multiply by 180." },
    { term: "Exterior Angles of a Polygon", definition: "Exterior angles of any convex polygon always sum to 360°. Each exterior angle of a regular polygon = 360° ÷ n.", hint: "The outside angles always add up to a full turn." },
    { term: "Regular Polygon", definition: "A polygon with all sides equal length and all angles equal in size.", hint: "Everything is the same — equal sides and equal angles." },
    { term: "Angles in a Triangle", definition: "The three interior angles of any triangle add up to 180°.", hint: "Tear off the corners and they make a straight line." },
    { term: "Alternate Angles (Z-angles)", definition: "When a transversal crosses parallel lines, alternate angles are equal. They form a Z-shape.", hint: "Look for the Z pattern between parallel lines." },
  ],

  "area-perimeter": [
    { term: "Perimeter", definition: "The total distance around the outside of a 2D shape. Add up all the side lengths.", hint: "Imagine walking around the edge — how far would you go?" },
    { term: "Area of a Rectangle", definition: "Area = length × width.", hint: "Multiply the two side lengths together." },
    { term: "Area of a Triangle", definition: "Area = ½ × base × height (perpendicular height, not slant height).", hint: "Half of a rectangle — half base times height." },
    { term: "Area of a Parallelogram", definition: "Area = base × perpendicular height.", hint: "Like a rectangle but use the vertical height, not the slant." },
    { term: "Area of a Trapezium", definition: "Area = ½ × (a + b) × h, where a and b are the parallel sides and h is the perpendicular height.", hint: "Average the two parallel sides, then multiply by the height." },
    { term: "Area of a Circle", definition: "Area = πr², where r is the radius.", hint: "Pi times the radius squared." },
    { term: "Circumference of a Circle", definition: "Circumference = 2πr = πd, where r is the radius and d is the diameter.", hint: "Pi times the diameter, or 2 × pi × radius." },
    { term: "Area of a Sector", definition: "Area = (θ/360) × πr², where θ is the angle of the sector.", hint: "It's a fraction of the full circle's area." },
  ],

  "volume-surface-area": [
    { term: "Volume of a Cuboid", definition: "Volume = length × width × height.", hint: "Multiply all three dimensions together." },
    { term: "Volume of a Prism", definition: "Volume = area of cross-section × length. Works for any prism shape.", hint: "Find the area of the end face and multiply by how long it is." },
    { term: "Volume of a Cylinder", definition: "Volume = πr²h, where r is the radius of the base and h is the height.", hint: "The cross-section is a circle — area of circle times height." },
    { term: "Volume of a Cone", definition: "Volume = ⅓πr²h. It's one third of the volume of a cylinder with the same base and height.", hint: "A third of the cylinder formula." },
    { term: "Volume of a Sphere", definition: "Volume = (4/3)πr³.", hint: "Four thirds pi r cubed." },
    { term: "Surface Area of a Cuboid", definition: "SA = 2(lw + lh + wh). Add up the area of all six faces.", hint: "Three pairs of identical rectangular faces." },
    { term: "Surface Area of a Cylinder", definition: "SA = 2πr² + 2πrh. Two circular ends plus the curved surface.", hint: "Two circles plus a rectangle that wraps around." },
    { term: "Surface Area of a Sphere", definition: "SA = 4πr².", hint: "Four times the area of the great circle." },
  ],

  "transformations": [
    { term: "Translation", definition: "A transformation that moves every point of a shape the same distance in the same direction. Described by a column vector.", hint: "Sliding the shape without rotating or flipping it." },
    { term: "Column Vector", definition: "Used to describe a translation: the top number is horizontal movement, the bottom is vertical. E.g. (3, −2) means 3 right, 2 down.", hint: "Top number = left/right, bottom number = up/down." },
    { term: "Rotation", definition: "A transformation that turns a shape around a fixed centre point by a given angle and direction.", hint: "Describe it with three things: centre, angle, and direction." },
    { term: "Reflection", definition: "A transformation that produces a mirror image of a shape across a line of reflection.", hint: "The shape flips — each point is the same distance from the mirror line." },
    { term: "Enlargement", definition: "A transformation that changes the size of a shape by a scale factor from a centre of enlargement.", hint: "The shape gets bigger or smaller from a fixed point." },
    { term: "Scale Factor (Enlargement)", definition: "The multiplier for each length. SF > 1 makes it bigger, 0 < SF < 1 makes it smaller, negative SF inverts it.", hint: "Multiply all lengths by this number." },
    { term: "Congruent", definition: "Shapes that are exactly the same size and shape. Translations, rotations, and reflections produce congruent shapes.", hint: "Identical in size and shape — like a perfect copy." },
    { term: "Similar", definition: "Shapes that have the same angles but different sizes. Enlargements produce similar shapes.", hint: "Same shape, different size — proportionally scaled." },
  ],

  "pythagoras-trigonometry": [
    { term: "Pythagoras' Theorem", definition: "In a right-angled triangle: a² + b² = c², where c is the hypotenuse (the longest side, opposite the right angle).", hint: "The two shorter sides squared add up to the longest side squared." },
    { term: "Hypotenuse", definition: "The longest side of a right-angled triangle, opposite the right angle.", hint: "It's always across from the 90° angle." },
    { term: "SOH CAH TOA", definition: "Sin = Opposite/Hypotenuse, Cos = Adjacent/Hypotenuse, Tan = Opposite/Adjacent. Used to find angles and sides in right-angled triangles.", hint: "The mnemonic for remembering the three trig ratios." },
    { term: "Sine (sin θ)", definition: "The ratio of the opposite side to the hypotenuse in a right-angled triangle. sin θ = O/H.", hint: "Opposite over Hypotenuse — SOH." },
    { term: "Cosine (cos θ)", definition: "The ratio of the adjacent side to the hypotenuse in a right-angled triangle. cos θ = A/H.", hint: "Adjacent over Hypotenuse — CAH." },
    { term: "Tangent (tan θ)", definition: "The ratio of the opposite side to the adjacent side in a right-angled triangle. tan θ = O/A.", hint: "Opposite over Adjacent — TOA." },
    { term: "Sine Rule", definition: "a/sin A = b/sin B = c/sin C. Used in non-right-angled triangles when you know a side-angle pair.", hint: "Match each side with the sine of its opposite angle." },
    { term: "Cosine Rule", definition: "a² = b² + c² − 2bc cos A. Used when you know two sides and the included angle (or all three sides).", hint: "Like Pythagoras but with an extra cosine correction." },
  ],

  "vectors": [
    { term: "Vector", definition: "A quantity that has both magnitude (size) and direction. Represented by a column vector or an arrow.", hint: "It tells you how far and in which direction." },
    { term: "Scalar", definition: "A quantity that has magnitude only, with no direction. E.g. speed, mass, temperature.", hint: "Just a number — no direction attached." },
    { term: "Column Vector", definition: "A vector written as (x, y) where x is the horizontal component and y is the vertical component.", hint: "Top number = horizontal, bottom number = vertical." },
    { term: "Adding Vectors", definition: "Add the corresponding components: (a, b) + (c, d) = (a+c, b+d).", hint: "Add the top numbers together and the bottom numbers together." },
    { term: "Subtracting Vectors", definition: "Subtract components: a⃗ − b⃗ means go along a⃗ then backwards along b⃗.", hint: "Reverse the direction of the second vector and add." },
    { term: "Scalar Multiplication", definition: "Multiply each component by the scalar: k(a, b) = (ka, kb). This scales the vector.", hint: "Multiply both parts by the same number." },
    { term: "Magnitude of a Vector", definition: "|v⃗| = √(x² + y²) for vector (x, y). This gives the length of the vector.", hint: "Use Pythagoras to find the length." },
    { term: "Resultant Vector", definition: "The single vector that has the same effect as two or more vectors combined. Found by adding vectors.", hint: "The overall effect — where you end up after following all vectors." },
  ],

  "circle-theorems": [
    { term: "Angle at Centre Theorem", definition: "The angle at the centre of a circle is twice the angle at the circumference when subtended by the same arc.", hint: "Centre angle = 2 × circumference angle from the same arc." },
    { term: "Angle in a Semicircle", definition: "The angle inscribed in a semicircle (with diameter as one side) is always 90°.", hint: "If the triangle sits on the diameter, the top angle is always a right angle." },
    { term: "Angles in the Same Segment", definition: "Angles at the circumference subtended by the same arc are equal.", hint: "Angles on the same side of a chord, touching the circumference, are equal." },
    { term: "Cyclic Quadrilateral", definition: "A quadrilateral inscribed in a circle. Opposite angles sum to 180°.", hint: "All four vertices touch the circle — opposite angles add up to 180°." },
    { term: "Tangent-Radius Relationship", definition: "A tangent to a circle is perpendicular to the radius at the point of contact (they meet at 90°).", hint: "The tangent and radius make a right angle where they meet." },
    { term: "Tangents from an External Point", definition: "Two tangents drawn from the same external point to a circle are equal in length.", hint: "Draw two lines from outside touching the circle — they're the same length." },
    { term: "Alternate Segment Theorem", definition: "The angle between a tangent and a chord equals the angle in the alternate segment.", hint: "The angle at the tangent equals the angle on the other side of the chord." },
    { term: "Perpendicular from Centre to Chord", definition: "A perpendicular line from the centre of a circle to a chord bisects (halves) the chord.", hint: "A line from the centre at right angles to a chord cuts it in half." },
  ],

  "data-representation": [
    { term: "Discrete Data", definition: "Data that can only take specific values, usually counted in whole numbers. E.g. number of siblings.", hint: "You count it — it can't be 2.5 siblings." },
    { term: "Continuous Data", definition: "Data that can take any value within a range, usually measured. E.g. height, weight, time.", hint: "You measure it — it can be any value, including decimals." },
    { term: "Bar Chart", definition: "A chart using rectangular bars to represent discrete data. Bars are separated by gaps.", hint: "Separate bars with gaps — one bar per category." },
    { term: "Histogram", definition: "A chart for continuous grouped data where frequency density is plotted on the y-axis. Bars have no gaps. Frequency = frequency density × class width.", hint: "No gaps between bars and the y-axis is frequency density, not frequency." },
    { term: "Pie Chart", definition: "A circular chart divided into sectors where each sector angle represents the proportion of each category. Angle = (frequency ÷ total) × 360°.", hint: "Divide 360° according to each category's share." },
    { term: "Scatter Diagram", definition: "A graph plotting pairs of values to show the relationship (correlation) between two variables.", hint: "Dots on a graph — look for a pattern or trend." },
    { term: "Correlation", definition: "The relationship between two variables. Positive: both increase together. Negative: one increases as the other decreases. None: no pattern.", hint: "Positive goes up together, negative goes opposite ways." },
    { term: "Line of Best Fit", definition: "A straight line drawn through a scatter diagram that best represents the trend of the data.", hint: "The line that goes through the middle of the dots." },
  ],

  "averages-spread": [
    { term: "Mean", definition: "The sum of all values divided by the number of values. Mean = Σx ÷ n.", hint: "Add them all up and share equally." },
    { term: "Median", definition: "The middle value when data is arranged in order. For n values, the median is the (n+1)/2 th value.", hint: "Put them in order and find the one in the middle." },
    { term: "Mode", definition: "The value that appears most frequently in a data set. There can be more than one mode.", hint: "The most popular value — the one that shows up the most." },
    { term: "Range", definition: "The difference between the largest and smallest values: range = max − min.", hint: "Biggest take away smallest." },
    { term: "Interquartile Range (IQR)", definition: "IQR = Q3 − Q1. The range of the middle 50% of the data. Less affected by outliers.", hint: "Upper quartile minus lower quartile." },
    { term: "Quartiles", definition: "Q1 (lower quartile) = 25th percentile, Q2 (median) = 50th percentile, Q3 (upper quartile) = 75th percentile.", hint: "They split the data into four equal parts." },
    { term: "Estimated Mean from a Frequency Table", definition: "Use midpoints of each class. Estimated mean = Σ(midpoint × frequency) ÷ Σfrequency.", hint: "Multiply each midpoint by its frequency, add up, then divide by total." },
    { term: "Outlier", definition: "An extreme value that lies far from the rest of the data. Often defined as more than 1.5 × IQR from the quartiles.", hint: "A data point that doesn't fit the pattern — unusually high or low." },
  ],

  "probability": [
    { term: "Probability", definition: "A measure of how likely an event is to occur, ranging from 0 (impossible) to 1 (certain). P(event) = favourable outcomes ÷ total outcomes.", hint: "Number of ways it can happen divided by total possibilities." },
    { term: "Sample Space", definition: "The set of all possible outcomes of an experiment. E.g. for a die: {1, 2, 3, 4, 5, 6}.", hint: "A complete list of everything that could happen." },
    { term: "Mutually Exclusive Events", definition: "Events that cannot happen at the same time. P(A or B) = P(A) + P(B).", hint: "If one happens, the other can't — add their probabilities." },
    { term: "Independent Events", definition: "Events where the outcome of one does not affect the other. P(A and B) = P(A) × P(B).", hint: "They don't influence each other — multiply probabilities." },
    { term: "Tree Diagram", definition: "A branching diagram showing all possible outcomes and their probabilities. Multiply along branches, add between branches.", hint: "Branches show choices — multiply along, add across." },
    { term: "Relative Frequency", definition: "An estimate of probability based on experiments: relative frequency = number of successes ÷ number of trials.", hint: "Experimental probability — what actually happened in practice." },
    { term: "Complementary Events", definition: "P(not A) = 1 − P(A). The probability of an event NOT happening.", hint: "Subtract from 1 to find the probability of the opposite." },
    { term: "Conditional Probability", definition: "The probability of an event given that another event has already occurred. Shown on tree diagrams with changed probabilities on second branches.", hint: "The probabilities change because something already happened." },
  ],

  // ========== BIOLOGY (14 topics) ==========

  "cell-structure": [
    { term: "Nucleus", definition: "Contains genetic material (DNA) that controls the activities of the cell and carries instructions for making proteins.", hint: "The control centre of the cell." },
    { term: "Cell Membrane", definition: "A semi-permeable membrane surrounding the cell that controls what enters and leaves.", hint: "The gatekeeper that decides what goes in and out." },
    { term: "Cytoplasm", definition: "A jelly-like substance where most chemical reactions take place in the cell.", hint: "The jelly filling where reactions happen." },
    { term: "Mitochondria", definition: "The site of aerobic respiration, where glucose is broken down to release energy (ATP).", hint: "The powerhouses of the cell." },
    { term: "Ribosome", definition: "Small structures in the cytoplasm where protein synthesis occurs.", hint: "The protein factories — they read the genetic code." },
    { term: "Cell Wall", definition: "A rigid layer made of cellulose found in plant cells. It provides structural support and protection.", hint: "The tough outer layer that gives plant cells their shape." },
    { term: "Chloroplast", definition: "Found in plant cells; contains chlorophyll and is the site of photosynthesis.", hint: "The green organelle that captures light energy." },
    { term: "Vacuole", definition: "A large permanent structure in plant cells filled with cell sap. Maintains turgor pressure to support the cell.", hint: "The big fluid-filled bag in plant cells." },
  ],

  "cell-division": [
    { term: "Mitosis", definition: "Cell division that produces two genetically identical daughter cells. Used for growth, repair, and asexual reproduction.", hint: "Makes two identical copies — growth and repair division." },
    { term: "Meiosis", definition: "Cell division that produces four genetically different haploid gametes (sex cells). Involves two divisions.", hint: "Makes four different sex cells — halves the chromosome number." },
    { term: "Chromosome", definition: "A thread-like structure of coiled DNA found in the nucleus. Humans have 23 pairs (46 total).", hint: "Tightly wound DNA — humans have 46 of these." },
    { term: "DNA", definition: "Deoxyribonucleic acid — a double helix polymer that carries the genetic code for making proteins.", hint: "The twisted ladder molecule that stores genetic instructions." },
    { term: "Gene", definition: "A short section of DNA on a chromosome that codes for a specific protein.", hint: "A small part of DNA that gives one instruction." },
    { term: "Stem Cell", definition: "An undifferentiated cell that can divide and develop into different types of specialised cells.", hint: "A blank cell that hasn't decided what to become yet." },
    { term: "Differentiation", definition: "The process by which a cell becomes specialised for a particular function.", hint: "When a cell takes on a specific job and changes shape." },
    { term: "Cell Cycle", definition: "The series of stages a cell goes through: growth (G1), DNA replication (S), more growth (G2), and mitosis (M).", hint: "The repeating stages of cell life — grow, copy DNA, divide." },
  ],

  "transport-in-cells": [
    { term: "Diffusion", definition: "The net movement of particles from an area of higher concentration to an area of lower concentration. It is a passive process (no energy required).", hint: "Particles spread out from where there are lots to where there are few." },
    { term: "Osmosis", definition: "The movement of water molecules from a dilute solution to a more concentrated solution through a partially permeable membrane.", hint: "Water moves through a membrane towards the stronger solution." },
    { term: "Active Transport", definition: "The movement of substances from a lower concentration to a higher concentration (against the concentration gradient), requiring energy from respiration.", hint: "Going the wrong way — needs energy to push against the flow." },
    { term: "Concentration Gradient", definition: "The difference in concentration between two areas. Substances move down their concentration gradient in diffusion.", hint: "Like a hill — particles roll downhill from high to low concentration." },
    { term: "Partially Permeable Membrane", definition: "A membrane that allows some molecules through but not others, based on size.", hint: "A selective barrier — small molecules pass, large ones can't." },
    { term: "Turgid", definition: "A plant cell that is firm and swollen because it has absorbed water by osmosis and the vacuole pushes against the cell wall.", hint: "A plant cell full of water — firm like an inflated balloon." },
    { term: "Plasmolysed", definition: "A plant cell that has lost water by osmosis, causing the cell membrane to pull away from the cell wall.", hint: "A shrivelled plant cell — the membrane pulls away from the wall." },
    { term: "Surface Area to Volume Ratio", definition: "Smaller organisms have a larger SA:V ratio, making diffusion more efficient. Larger organisms need transport systems.", hint: "Smaller things have relatively more surface — that's why they don't need lungs." },
  ],

  "organisation-animals": [
    { term: "Tissue", definition: "A group of similar cells working together to perform a specific function. E.g. muscle tissue, epithelial tissue.", hint: "Lots of the same type of cell doing one job." },
    { term: "Organ", definition: "A structure made of different tissues working together. E.g. the stomach contains muscular, glandular, and epithelial tissue.", hint: "Different tissues grouped together in one structure." },
    { term: "Organ System", definition: "A group of organs working together to perform a particular function. E.g. the digestive system.", hint: "Multiple organs cooperating for a big body function." },
    { term: "Enzyme", definition: "A biological catalyst that speeds up chemical reactions without being used up. Made of protein with a specific active site.", hint: "A protein that speeds up reactions — lock and key shape." },
    { term: "Active Site", definition: "The region on an enzyme where the substrate binds. It has a specific shape complementary to the substrate.", hint: "The specially-shaped part where the substrate fits in." },
    { term: "Denatured", definition: "When an enzyme's active site changes shape (due to high temperature or extreme pH) so the substrate can no longer fit.", hint: "The enzyme's shape is permanently changed — it stops working." },
    { term: "Digestive System", definition: "The organ system that breaks down food into small soluble molecules for absorption: mouth → oesophagus → stomach → small intestine → large intestine.", hint: "The long tube from mouth to bottom that processes food." },
    { term: "Villi", definition: "Tiny finger-like projections lining the small intestine that increase surface area for absorption of digested food.", hint: "Tiny fingers in the small intestine that soak up nutrients." },
  ],

  "organisation-plants": [
    { term: "Xylem", definition: "Hollow, dead tubes in plants that transport water and dissolved minerals from roots to leaves. Movement is one-way upward.", hint: "Dead tubes carrying water UP — think of them as the plant's water pipes." },
    { term: "Phloem", definition: "Living tubes that transport dissolved sugars (sucrose) from leaves to the rest of the plant (translocation). Moves both ways.", hint: "Living tubes carrying sugar — can go up or down." },
    { term: "Transpiration", definition: "The loss of water vapour from the leaves through stomata. Creates a transpiration stream that pulls water up through xylem.", hint: "Water evaporating from leaves — it pulls more water up." },
    { term: "Stomata", definition: "Tiny pores (holes) on the underside of leaves that allow gas exchange (CO₂ in, O₂ out) and water loss.", hint: "The tiny holes in leaves that open and close." },
    { term: "Guard Cells", definition: "Specialised cells that surround stomata and control their opening and closing.", hint: "The cells that open and close the stomata doors." },
    { term: "Translocation", definition: "The movement of dissolved sugars from the leaves (source) to other parts of the plant (sink) through phloem.", hint: "Sugar transport from where it's made to where it's needed." },
    { term: "Root Hair Cell", definition: "A specialised cell with a long extension that increases surface area for absorption of water and minerals from the soil.", hint: "A cell with a long finger reaching into the soil." },
    { term: "Meristem Tissue", definition: "Found at the tips of roots and shoots; contains undifferentiated cells that can divide rapidly for growth.", hint: "The growing points of a plant — where new cells are made." },
  ],

  "communicable-diseases": [
    { term: "Pathogen", definition: "A microorganism that causes disease. Includes bacteria, viruses, fungi, and protists.", hint: "A germ that makes you ill." },
    { term: "Bacteria", definition: "Single-celled prokaryotic organisms that cause disease by releasing toxins. Treated with antibiotics. E.g. Salmonella.", hint: "Simple cells with no nucleus — antibiotics fight them." },
    { term: "Virus", definition: "A non-living particle that reproduces inside host cells, damaging them. Much smaller than bacteria. E.g. HIV, measles.", hint: "Tiny invaders that hijack your cells to copy themselves." },
    { term: "White Blood Cells", definition: "Immune cells that defend the body: phagocytes engulf pathogens, lymphocytes produce antibodies and antitoxins.", hint: "Your body's army — they fight infections." },
    { term: "Antibody", definition: "A protein produced by lymphocytes that is specific to a particular antigen on a pathogen. Locks onto the pathogen to destroy it.", hint: "A protein that sticks to a specific germ like a key in a lock." },
    { term: "Vaccination", definition: "Injecting a dead or weakened form of a pathogen to stimulate the immune system to produce antibodies, creating memory cells.", hint: "A harmless version of the germ that trains your immune system." },
    { term: "Antibiotic", definition: "A medicine that kills bacteria or stops their growth inside the body. Antibiotics do NOT work on viruses.", hint: "Medicine for bacterial infections — doesn't work on viruses." },
    { term: "Antibiotic Resistance", definition: "When bacteria evolve and are no longer killed by antibiotics due to natural selection. E.g. MRSA.", hint: "Bacteria that survive antibiotics and pass on their resistance genes." },
  ],

  "non-communicable-diseases": [
    { term: "Non-communicable Disease", definition: "A disease that cannot be passed from one person to another. E.g. cancer, heart disease, type 2 diabetes.", hint: "You can't catch it from someone else." },
    { term: "Risk Factor", definition: "Something that increases the likelihood of developing a disease. Can be lifestyle (smoking, diet) or genetic.", hint: "Something that makes you more likely to get ill." },
    { term: "Cardiovascular Disease", definition: "Diseases of the heart and blood vessels, including coronary heart disease. Often caused by fatty deposits (atheroma) in arteries.", hint: "Heart and blood vessel problems — often from blocked arteries." },
    { term: "Stent", definition: "A small mesh tube inserted into a narrowed coronary artery to hold it open and restore blood flow.", hint: "A tiny tube that props open a blocked artery." },
    { term: "Statin", definition: "A drug that reduces blood cholesterol levels, slowing the rate of fatty deposits forming in arteries.", hint: "A cholesterol-lowering drug." },
    { term: "Cancer", definition: "A disease caused by uncontrolled cell division (mitosis), forming a tumour. Benign tumours don't spread; malignant tumours can (metastasis).", hint: "Cells dividing out of control — malignant ones spread." },
    { term: "Benign Tumour", definition: "A non-cancerous growth of cells contained in one area. It does not invade other tissues.", hint: "A lump that stays in one place and isn't cancer." },
    { term: "Malignant Tumour", definition: "A cancerous growth that can invade neighbouring tissues and spread to other parts of the body (metastasis).", hint: "A dangerous lump that can spread — this is cancer." },
  ],

  "photosynthesis": [
    { term: "Photosynthesis Equation", definition: "6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂ (carbon dioxide + water → glucose + oxygen). Requires light energy.", hint: "CO₂ and water go in, glucose and oxygen come out." },
    { term: "Chlorophyll", definition: "The green pigment found in chloroplasts that absorbs light energy for photosynthesis.", hint: "The green chemical that captures sunlight." },
    { term: "Endothermic Reaction", definition: "A reaction that takes in energy from the surroundings. Photosynthesis is endothermic — it absorbs light energy.", hint: "Energy goes IN — the surroundings get cooler." },
    { term: "Limiting Factor", definition: "A factor that restricts the rate of photosynthesis when in short supply: light intensity, CO₂ concentration, or temperature.", hint: "The thing in shortest supply that holds the rate back." },
    { term: "Light Intensity", definition: "As light intensity increases, the rate of photosynthesis increases — up to a point where another factor becomes limiting.", hint: "More light = faster photosynthesis, until something else limits it." },
    { term: "Carbon Dioxide Concentration", definition: "Increasing CO₂ concentration increases the rate of photosynthesis until another factor becomes limiting.", hint: "More CO₂ = faster photosynthesis, up to a point." },
    { term: "Inverse Square Law (Light)", definition: "Light intensity is inversely proportional to the square of the distance from the light source: I ∝ 1/d².", hint: "Double the distance, quarter the light intensity." },
    { term: "Uses of Glucose", definition: "Plants use glucose for: respiration, making cellulose (cell walls), making amino acids (with nitrates), making starch (storage), making lipids (oils).", hint: "Energy, building materials, storage — glucose is very versatile." },
  ],

  "respiration": [
    { term: "Aerobic Respiration Equation", definition: "C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O (+ energy). Glucose + oxygen → carbon dioxide + water + energy.", hint: "The opposite of photosynthesis — uses oxygen." },
    { term: "Anaerobic Respiration (Animals)", definition: "Glucose → lactic acid (+ small amount of energy). Occurs without oxygen, e.g. during intense exercise.", hint: "No oxygen available — makes the acid that causes muscle cramps." },
    { term: "Anaerobic Respiration (Plants/Yeast)", definition: "Glucose → ethanol + carbon dioxide (+ small amount of energy). Also called fermentation.", hint: "This is how yeast makes alcohol and bread rises." },
    { term: "Exothermic Reaction", definition: "A reaction that releases energy to the surroundings. Respiration is exothermic — it transfers energy.", hint: "Energy comes OUT — the surroundings get warmer." },
    { term: "Mitochondria", definition: "The organelle where aerobic respiration occurs. Has a folded inner membrane to increase surface area for reactions.", hint: "The cell's powerhouse — where oxygen is used to release energy." },
    { term: "Oxygen Debt", definition: "The extra oxygen needed after anaerobic exercise to break down the accumulated lactic acid.", hint: "Why you keep breathing hard after sprinting — paying back the oxygen." },
    { term: "Fermentation", definition: "Anaerobic respiration in yeast: glucose → ethanol + CO₂. Used in brewing and bread-making.", hint: "Yeast without oxygen — makes alcohol and bubbles." },
    { term: "Metabolism", definition: "The sum of all chemical reactions in an organism. Includes both building up (anabolic) and breaking down (catabolic) reactions.", hint: "All the chemical reactions happening in your body." },
  ],

  "homeostasis": [
    { term: "Homeostasis", definition: "The maintenance of a constant internal environment in response to internal and external changes.", hint: "Keeping conditions inside the body just right." },
    { term: "Negative Feedback", definition: "A control mechanism where a change in a condition triggers a response that reverses the change, returning to the optimum.", hint: "The body detects a change and brings it back to normal." },
    { term: "Thermoregulation", definition: "Maintaining body temperature at about 37°C. Controlled by the thermoregulatory centre in the brain (hypothalamus).", hint: "Keeping your body at 37°C — sweating or shivering." },
    { term: "Vasoconstriction", definition: "Blood vessels near the skin surface narrow to reduce blood flow and heat loss when the body is too cold.", hint: "Blood vessels get smaller to keep heat in." },
    { term: "Vasodilation", definition: "Blood vessels near the skin surface widen to increase blood flow and heat loss when the body is too hot.", hint: "Blood vessels get wider to release more heat." },
    { term: "Blood Glucose Regulation", definition: "Controlled by the pancreas: insulin lowers blood glucose (stores as glycogen), glucagon raises it (breaks down glycogen).", hint: "Insulin brings sugar down, glucagon brings it up." },
    { term: "Insulin", definition: "A hormone produced by the pancreas that causes cells to take up glucose from the blood and the liver to convert glucose to glycogen.", hint: "The hormone that lowers blood sugar." },
    { term: "Type 1 Diabetes", definition: "An autoimmune condition where the pancreas produces little or no insulin. Treated with insulin injections.", hint: "The body attacks its own insulin-making cells — needs injections." },
  ],

  "hormones-reproduction": [
    { term: "Hormone", definition: "A chemical messenger produced by endocrine glands, transported in the blood to target organs where it causes a response.", hint: "Chemical messages carried in the blood." },
    { term: "Endocrine System", definition: "The system of glands that produce hormones: pituitary, thyroid, adrenal, pancreas, ovaries, testes.", hint: "The network of glands that make hormones." },
    { term: "Pituitary Gland", definition: "The 'master gland' in the brain that secretes hormones controlling other glands, including FSH and LH.", hint: "The boss gland that controls all the others." },
    { term: "Oestrogen", definition: "A hormone produced by the ovaries that controls female secondary sexual characteristics and helps regulate the menstrual cycle.", hint: "The main female hormone — thickens the uterus lining." },
    { term: "Testosterone", definition: "The main male sex hormone produced by the testes. Controls male secondary sexual characteristics and sperm production.", hint: "The main male hormone." },
    { term: "Menstrual Cycle", definition: "A ~28-day cycle controlled by FSH, LH, oestrogen, and progesterone. Involves egg maturation, ovulation, and uterus lining changes.", hint: "The monthly cycle controlled by four interacting hormones." },
    { term: "Contraception", definition: "Methods to prevent pregnancy: hormonal (pill, implant), barrier (condom), surgical (sterilisation), or IUD.", hint: "Ways to prevent pregnancy — hormonal, barrier, or surgical." },
    { term: "IVF (In Vitro Fertilisation)", definition: "A fertility treatment: FSH and LH stimulate egg production, eggs are collected, fertilised with sperm in a dish, then embryos are implanted.", hint: "Fertilisation in a lab dish — the egg and sperm meet outside the body." },
  ],

  "inheritance-variation": [
    { term: "Allele", definition: "A version of a gene. Organisms inherit two alleles for each gene — one from each parent.", hint: "Different versions of the same gene." },
    { term: "Dominant Allele", definition: "An allele that is always expressed in the phenotype, even if only one copy is present. Shown with a capital letter.", hint: "One copy is enough for it to show — capital letter." },
    { term: "Recessive Allele", definition: "An allele that is only expressed when two copies are present (homozygous recessive). Shown with a lowercase letter.", hint: "Needs two copies to show up — lowercase letter." },
    { term: "Genotype", definition: "The combination of alleles an organism has for a particular gene. E.g. BB, Bb, or bb.", hint: "The letters — the genetic makeup." },
    { term: "Phenotype", definition: "The observable physical characteristics of an organism, determined by genotype and environment.", hint: "What you can see — the physical trait." },
    { term: "Heterozygous", definition: "Having two different alleles for a gene, e.g. Bb.", hint: "Two different letters — one of each." },
    { term: "Homozygous", definition: "Having two identical alleles for a gene, e.g. BB (homozygous dominant) or bb (homozygous recessive).", hint: "Two of the same letter." },
    { term: "Punnett Square", definition: "A diagram used to predict the possible genotypes and phenotypes of offspring from a genetic cross.", hint: "The grid that shows all possible combinations of alleles." },
  ],

  "evolution-classification": [
    { term: "Natural Selection", definition: "The process by which organisms with advantageous traits are more likely to survive, reproduce, and pass on their genes.", hint: "Survival of the fittest — better adapted organisms thrive." },
    { term: "Evolution", definition: "The gradual change in the inherited characteristics of a population over many generations through natural selection.", hint: "Species changing over millions of years." },
    { term: "Charles Darwin", definition: "Proposed the theory of evolution by natural selection after studying finches on the Galápagos Islands.", hint: "The scientist who sailed on the Beagle and studied finches." },
    { term: "Adaptation", definition: "A feature (structural, behavioural, or functional) that helps an organism survive in its environment.", hint: "A characteristic that helps a living thing survive." },
    { term: "Species", definition: "A group of organisms that can interbreed to produce fertile offspring.", hint: "Animals that can mate and have babies that can also have babies." },
    { term: "Classification", definition: "Organising living organisms into groups based on shared characteristics. The Linnaean system uses: Kingdom, Phylum, Class, Order, Family, Genus, Species.", hint: "King Philip Came Over For Good Spaghetti." },
    { term: "Extinction", definition: "When no living members of a species remain. Caused by environmental changes, new predators, new diseases, or competition.", hint: "When every last one of a species has died out." },
    { term: "Fossil Record", definition: "Preserved remains or traces of organisms from millions of years ago, providing evidence for evolution.", hint: "Ancient remains in rocks that show how life changed over time." },
  ],

  "ecology": [
    { term: "Ecosystem", definition: "A community of living organisms (biotic) interacting with their non-living environment (abiotic).", hint: "All the living and non-living things in an area, working together." },
    { term: "Community", definition: "All the populations of different species living and interacting in an area.", hint: "All the different species in one habitat." },
    { term: "Population", definition: "All the organisms of one species living in a habitat.", hint: "All the individuals of the same species in one place." },
    { term: "Food Chain", definition: "A diagram showing the flow of energy from producer → primary consumer → secondary consumer → tertiary consumer.", hint: "Who eats whom — energy flows from left to right." },
    { term: "Biodiversity", definition: "The variety of different species of organisms on Earth or within an ecosystem.", hint: "How many different types of living things there are." },
    { term: "Abiotic Factor", definition: "A non-living factor that affects an ecosystem, e.g. temperature, light intensity, water availability, soil pH.", hint: "Non-living conditions in the environment." },
    { term: "Biotic Factor", definition: "A living factor that affects an ecosystem, e.g. predation, competition, disease, food availability.", hint: "Living things that affect other organisms." },
    { term: "Quadrat", definition: "A square frame (often 0.5m × 0.5m) placed on the ground to sample and estimate the population of organisms in an area.", hint: "A square frame for counting organisms in a sample area." },
  ],

  // ========== CHEMISTRY (10 topics) ==========

  "atomic-structure": [
    { term: "Atom", definition: "The smallest part of an element that can exist. Made up of protons, neutrons (in the nucleus), and electrons (in shells).", hint: "The tiny building block of all matter." },
    { term: "Proton", definition: "A positively charged subatomic particle found in the nucleus. Relative mass = 1, relative charge = +1.", hint: "Positive particle in the nucleus." },
    { term: "Neutron", definition: "A neutral subatomic particle found in the nucleus. Relative mass = 1, relative charge = 0.", hint: "No charge, same mass as a proton, in the nucleus." },
    { term: "Electron", definition: "A negatively charged subatomic particle orbiting the nucleus in energy levels (shells). Relative mass ≈ 0 (1/1836), charge = −1.", hint: "Tiny negative particle whizzing around the outside." },
    { term: "Atomic Number", definition: "The number of protons in the nucleus of an atom. It defines the element and equals the number of electrons in a neutral atom.", hint: "The smaller number on the periodic table — counts the protons." },
    { term: "Mass Number", definition: "The total number of protons and neutrons in the nucleus. Mass number = protons + neutrons.", hint: "The bigger number — add protons and neutrons." },
    { term: "Isotope", definition: "Atoms of the same element with the same number of protons but different numbers of neutrons.", hint: "Same element, different mass — the neutron count varies." },
    { term: "Electronic Configuration", definition: "The arrangement of electrons in energy levels. The first shell holds 2, the second holds 8, the third holds 8. E.g. sodium = 2,8,1.", hint: "2, 8, 8 — fill the shells from the inside out." },
  ],

  "bonding-structure": [
    { term: "Ionic Bonding", definition: "The transfer of electrons from a metal to a non-metal, forming positive and negative ions that attract each other.", hint: "Metals give electrons to non-metals — opposites attract." },
    { term: "Covalent Bonding", definition: "The sharing of pairs of electrons between non-metal atoms. Each shared pair forms one bond.", hint: "Non-metals share electrons to get full outer shells." },
    { term: "Metallic Bonding", definition: "A lattice of positive metal ions surrounded by a 'sea' of delocalised electrons.", hint: "Metal ions in a sea of free-moving electrons." },
    { term: "Ion", definition: "An atom or group of atoms with an electrical charge, formed by gaining or losing electrons.", hint: "A charged particle — lost or gained electrons." },
    { term: "Giant Ionic Lattice", definition: "A regular arrangement of alternating positive and negative ions. High melting point, conducts when dissolved or molten.", hint: "A 3D grid of alternating + and − ions." },
    { term: "Simple Molecular (Covalent)", definition: "Small molecules with strong covalent bonds within molecules but weak intermolecular forces between them. Low melting/boiling points.", hint: "Strong bonds inside, weak forces between — they're easy to separate." },
    { term: "Giant Covalent Structure", definition: "A huge network of atoms connected by covalent bonds. Very high melting points. E.g. diamond, graphite, silicon dioxide.", hint: "Billions of atoms all bonded together — incredibly hard to break apart." },
    { term: "Diamond vs Graphite", definition: "Diamond: 4 bonds per carbon, very hard, doesn't conduct. Graphite: 3 bonds per carbon, layers slide, conducts electricity (delocalised electrons).", hint: "Diamond is hard and insulating; graphite is slippery and conducts." },
  ],

  "quantitative-chemistry": [
    { term: "Relative Atomic Mass (Ar)", definition: "The average mass of atoms of an element compared to 1/12 of a carbon-12 atom. Found on the periodic table.", hint: "The number on the periodic table — it's a weighted average." },
    { term: "Relative Formula Mass (Mr)", definition: "The sum of the relative atomic masses of all atoms in a formula. E.g. Mr of H₂O = (2×1) + 16 = 18.", hint: "Add up all the Ar values in the formula." },
    { term: "Mole", definition: "The amount of substance containing 6.02 × 10²³ particles (Avogadro's number). Moles = mass ÷ Mr.", hint: "6 × 10²³ particles — that's Avogadro's number." },
    { term: "Conservation of Mass", definition: "In a chemical reaction, no atoms are lost or made — the total mass of reactants equals the total mass of products.", hint: "What goes in must come out — atoms are rearranged, not created or destroyed." },
    { term: "Balancing Equations", definition: "Adjusting coefficients so the number of each type of atom is equal on both sides of the equation.", hint: "Make sure you have the same number of each atom on both sides." },
    { term: "Concentration (g/dm³)", definition: "The amount of solute dissolved in a given volume of solution. Concentration = mass of solute ÷ volume of solution.", hint: "How much stuff is dissolved per litre." },
    { term: "Concentration (mol/dm³)", definition: "Concentration in moles per cubic decimetre. Concentration = moles ÷ volume (in dm³).", hint: "Moles per litre — divide moles by volume." },
    { term: "Atom Economy", definition: "A measure of efficiency: (Mr of desired product ÷ sum of Mr of all products) × 100%. Higher is better.", hint: "What percentage of atoms end up in the useful product?" },
  ],

  "chemical-changes": [
    { term: "Oxidation", definition: "The gain of oxygen or loss of electrons. In terms of electrons: OIL (Oxidation Is Loss).", hint: "OIL — Oxidation Is Loss of electrons." },
    { term: "Reduction", definition: "The loss of oxygen or gain of electrons. In terms of electrons: RIG (Reduction Is Gain).", hint: "RIG — Reduction Is Gain of electrons." },
    { term: "Reactivity Series", definition: "A list of metals in order of reactivity: K, Na, Ca, Mg, Al, C, Zn, Fe, H, Cu, Ag, Au (most to least reactive).", hint: "Potassium at the top, gold at the bottom." },
    { term: "Displacement Reaction", definition: "A more reactive element displaces a less reactive one from its compound. E.g. Zn + CuSO₄ → ZnSO₄ + Cu.", hint: "The more reactive metal pushes out the less reactive one." },
    { term: "Electrolysis", definition: "Using electricity to decompose an ionic compound (molten or in solution). Positive ions go to the cathode (−), negative ions to the anode (+).", hint: "Electricity splits compounds — positive to negative electrode." },
    { term: "pH Scale", definition: "A scale from 0-14 measuring acidity/alkalinity. pH < 7 = acid, pH 7 = neutral, pH > 7 = alkali.", hint: "Below 7 is acid, above 7 is alkali, 7 is neutral." },
    { term: "Neutralisation", definition: "Acid + alkali → salt + water. The H⁺ ions react with OH⁻ ions to form water: H⁺ + OH⁻ → H₂O.", hint: "Acid meets alkali — they cancel each other out." },
    { term: "Strong vs Weak Acid", definition: "Strong acids fully ionise in water (e.g. HCl, H₂SO₄). Weak acids only partially ionise (e.g. ethanoic acid, citric acid).", hint: "Strong = fully split into ions, weak = only some molecules split." },
  ],

  "energy-changes": [
    { term: "Exothermic Reaction", definition: "A reaction that transfers energy to the surroundings, causing the temperature to rise. E.g. combustion, neutralisation.", hint: "Energy exits — the surroundings get hotter." },
    { term: "Endothermic Reaction", definition: "A reaction that takes in energy from the surroundings, causing the temperature to fall. E.g. thermal decomposition, photosynthesis.", hint: "Energy enters — the surroundings get colder." },
    { term: "Activation Energy", definition: "The minimum amount of energy needed for a reaction to occur. Represented by the initial rise on an energy profile diagram.", hint: "The energy hill that reactants must climb over." },
    { term: "Bond Breaking", definition: "Breaking bonds is an endothermic process — it requires energy input.", hint: "It takes energy to pull atoms apart." },
    { term: "Bond Making", definition: "Making bonds is an exothermic process — it releases energy.", hint: "Atoms coming together releases energy." },
    { term: "Energy Profile Diagram", definition: "A diagram showing the energy levels of reactants and products. If products are lower, the reaction is exothermic; higher = endothermic.", hint: "The graph with the hump — compare the heights of reactants and products." },
    { term: "Catalyst", definition: "A substance that speeds up a reaction without being used up. It provides an alternative pathway with lower activation energy.", hint: "Speeds things up but is still there at the end." },
    { term: "Reaction Profile (Overall Energy Change)", definition: "If energy released in bond making > energy used in bond breaking, the reaction is exothermic (and vice versa).", hint: "Compare making vs breaking — whichever is bigger wins." },
  ],

  "rate-of-reaction": [
    { term: "Rate of Reaction", definition: "How fast reactants are converted into products. Rate = amount of reactant used (or product formed) ÷ time.", hint: "How quickly the reaction happens." },
    { term: "Collision Theory", definition: "For a reaction to occur, particles must collide with sufficient energy (≥ activation energy) and correct orientation.", hint: "Particles must hit each other hard enough and at the right angle." },
    { term: "Effect of Temperature", definition: "Increasing temperature increases the rate: particles move faster, collide more frequently, and more collisions have energy ≥ activation energy.", hint: "Hotter = faster particles = more successful collisions." },
    { term: "Effect of Concentration", definition: "Higher concentration means more particles in the same volume, so collisions are more frequent, increasing the rate.", hint: "More particles in the space = more chance of colliding." },
    { term: "Effect of Surface Area", definition: "Smaller pieces (greater surface area) react faster because more particles are exposed to react.", hint: "Crushing it up exposes more particles." },
    { term: "Effect of a Catalyst", definition: "A catalyst provides an alternative reaction pathway with lower activation energy, increasing the rate.", hint: "Lowers the energy hill so more particles can get over it." },
    { term: "Reversible Reaction", definition: "A reaction that can proceed in both forward and reverse directions, shown by the ⇌ symbol.", hint: "It can go both ways — products can turn back into reactants." },
    { term: "Dynamic Equilibrium", definition: "In a closed system, the rate of the forward reaction equals the rate of the reverse reaction. Concentrations remain constant.", hint: "Both directions happening at the same speed — nothing appears to change." },
  ],

  "organic-chemistry": [
    { term: "Hydrocarbon", definition: "A molecule made of hydrogen and carbon atoms only. Alkanes and alkenes are hydrocarbons.", hint: "Only two elements: hydrogen and carbon." },
    { term: "Alkane", definition: "A saturated hydrocarbon with only single C–C bonds. General formula: CₙH₂ₙ₊₂. E.g. methane CH₄, ethane C₂H₆.", hint: "Single bonds only — the saturated ones." },
    { term: "Alkene", definition: "An unsaturated hydrocarbon with at least one C=C double bond. General formula: CₙH₂ₙ. E.g. ethene C₂H₄.", hint: "Contains a double bond — the unsaturated ones." },
    { term: "Crude Oil", definition: "A finite resource (fossil fuel) — a mixture of hydrocarbons that is separated by fractional distillation.", hint: "A fossil fuel mixture separated in a tall column." },
    { term: "Fractional Distillation", definition: "Separating crude oil into fractions based on boiling point. Shorter chains have lower boiling points and rise higher in the column.", hint: "Small molecules rise to the top, big ones stay at the bottom." },
    { term: "Cracking", definition: "Breaking long-chain hydrocarbons into shorter, more useful ones (including alkenes). Done by thermal or catalytic cracking.", hint: "Snapping big molecules into smaller, more useful pieces." },
    { term: "Combustion", definition: "Burning a hydrocarbon in oxygen. Complete: hydrocarbon + O₂ → CO₂ + H₂O. Incomplete: also produces CO or carbon (soot).", hint: "Burning in oxygen — complete gives CO₂ and water." },
    { term: "Polymerisation", definition: "Joining many small alkene molecules (monomers) to form a long-chain polymer. E.g. ethene → poly(ethene).", hint: "Lots of small molecules joining to make a long chain." },
  ],

  "chemical-analysis": [
    { term: "Pure Substance", definition: "A single element or compound with a fixed melting and boiling point. Not a mixture.", hint: "One type of substance — it melts and boils at exact temperatures." },
    { term: "Mixture", definition: "Two or more substances not chemically bonded, which can be separated by physical methods.", hint: "Different substances mixed together but not joined." },
    { term: "Chromatography", definition: "A technique for separating mixtures of dissolved substances based on how they move through a stationary phase with a solvent. Rf = distance moved by substance ÷ distance moved by solvent.", hint: "The technique that separates colours — dots travel different distances." },
    { term: "Rf Value", definition: "Retention factor: distance moved by substance ÷ distance moved by solvent front. Used to identify substances.", hint: "A ratio that identifies what a substance is." },
    { term: "Flame Test", definition: "A method to identify metal ions by the colour of flame they produce. Li⁺ = crimson, Na⁺ = yellow, K⁺ = lilac, Cu²⁺ = green/blue.", hint: "Hold it in a flame — the colour tells you which metal." },
    { term: "Test for Hydrogen", definition: "Hold a burning splint near the gas. Hydrogen makes a squeaky pop.", hint: "A burning splint goes 'pop'!" },
    { term: "Test for Oxygen", definition: "Insert a glowing splint into the gas. Oxygen relights a glowing splint.", hint: "A glowing splint bursts back into flame." },
    { term: "Test for Carbon Dioxide", definition: "Bubble the gas through limewater (calcium hydroxide solution). CO₂ turns limewater milky/cloudy.", hint: "Limewater goes cloudy." },
  ],

  "atmosphere": [
    { term: "Current Atmosphere Composition", definition: "Approximately 78% nitrogen, 21% oxygen, 0.04% carbon dioxide, and small amounts of other gases (mainly argon ~0.9%).", hint: "About four-fifths nitrogen and one-fifth oxygen." },
    { term: "Greenhouse Effect", definition: "Greenhouse gases (CO₂, methane, water vapour) absorb and re-emit infrared radiation, keeping Earth warm enough to support life.", hint: "Gases trap heat like a blanket around the Earth." },
    { term: "Global Warming", definition: "The increase in Earth's average temperature due to increased levels of greenhouse gases from human activities.", hint: "The planet getting hotter because of extra greenhouse gases." },
    { term: "Carbon Dioxide Increase", definition: "CO₂ levels are rising due to burning fossil fuels and deforestation. This enhances the greenhouse effect.", hint: "Burning things and cutting down trees adds more CO₂." },
    { term: "Climate Change", definition: "Long-term changes in global weather patterns caused by global warming: rising sea levels, extreme weather, ice cap melting.", hint: "Not just hotter — more extreme weather, flooding, and ice melting." },
    { term: "Carbon Footprint", definition: "The total amount of greenhouse gases released over the full life cycle of a product, service, or event.", hint: "How much CO₂ (and other gases) something produces in total." },
    { term: "Early Atmosphere", definition: "Earth's early atmosphere was mainly CO₂ with little or no oxygen, similar to Mars and Venus today. Volcanic activity released gases.", hint: "Volcanoes released CO₂ — no oxygen for billions of years." },
    { term: "How Oxygen Increased", definition: "Photosynthetic organisms (cyanobacteria and plants) produced oxygen over billions of years, gradually increasing it to ~21%.", hint: "Plants and algae made the oxygen we breathe today." },
  ],

  "using-resources": [
    { term: "Finite Resource", definition: "A resource that is being used up faster than it can be replaced. E.g. fossil fuels, metal ores.", hint: "Once it's gone, it's gone — it runs out." },
    { term: "Renewable Resource", definition: "A resource that can be replenished at the same rate it is used. E.g. timber, fresh water (with management).", hint: "It can be replaced as fast as we use it." },
    { term: "Potable Water", definition: "Water that is safe to drink. It is not pure water — it contains dissolved substances but at safe levels.", hint: "Safe to drink but not chemically pure." },
    { term: "Desalination", definition: "Removing salt from seawater to produce potable water. Done by distillation or reverse osmosis. Energy-intensive.", hint: "Taking the salt out of seawater — expensive and energy-hungry." },
    { term: "Life Cycle Assessment (LCA)", definition: "Assessing the environmental impact of a product through its entire life: raw materials, manufacture, use, and disposal.", hint: "Cradle to grave — tracking the environmental cost from start to finish." },
    { term: "Reduce, Reuse, Recycle", definition: "The three Rs of sustainability: reduce the amount used, reuse products, recycle materials to reduce waste and resource use.", hint: "The three strategies for using less and wasting less." },
    { term: "Phytomining", definition: "Growing plants on land containing low-grade metal ore; the plants absorb metal ions, which are extracted by burning the plants.", hint: "Plants absorb metals from the soil — then you harvest the plants." },
    { term: "Bioleaching", definition: "Using bacteria to extract metals from low-grade ores. Bacteria produce acidic solutions that dissolve metals.", hint: "Bacteria eat the rock and release the metal." },
  ],

  // ========== PHYSICS (8 topics) ==========

  "energy": [
    { term: "Kinetic Energy", definition: "The energy stored in a moving object. KE = ½mv² (m = mass in kg, v = speed in m/s).", hint: "Half times mass times velocity squared." },
    { term: "Gravitational Potential Energy", definition: "The energy stored in an object due to its height above the ground. GPE = mgh (m = mass, g = 9.8 m/s², h = height).", hint: "Mass times gravity times height." },
    { term: "Elastic Potential Energy", definition: "The energy stored in a stretched or compressed object. EPE = ½ke² (k = spring constant, e = extension).", hint: "Half times spring constant times extension squared." },
    { term: "Conservation of Energy", definition: "Energy cannot be created or destroyed, only transferred from one store to another.", hint: "Energy is never lost — it just moves or changes form." },
    { term: "Efficiency", definition: "Efficiency = (useful energy output ÷ total energy input) × 100%. Always less than 100% due to waste energy.", hint: "Useful output divided by total input — as a percentage." },
    { term: "Power", definition: "The rate of energy transfer. Power = energy transferred ÷ time. Measured in watts (W). 1W = 1 J/s.", hint: "How fast energy is transferred — joules per second." },
    { term: "Specific Heat Capacity", definition: "The energy needed to raise the temperature of 1 kg of a substance by 1°C. E = mcΔθ.", hint: "Energy = mass × SHC × temperature change." },
    { term: "Dissipated Energy", definition: "Energy that is 'wasted' and spread out to the surroundings, usually as heat, making it less useful.", hint: "The energy that escapes and heats up the surroundings." },
  ],

  "electricity": [
    { term: "Current (I)", definition: "The rate of flow of electrical charge. I = Q/t (charge ÷ time). Measured in amperes (A).", hint: "How much charge flows per second." },
    { term: "Potential Difference (V)", definition: "The energy transferred per unit of charge. V = E/Q (energy ÷ charge). Measured in volts (V).", hint: "How much energy each coulomb of charge carries." },
    { term: "Resistance (R)", definition: "A measure of how difficult it is for current to flow. R = V/I. Measured in ohms (Ω).", hint: "Voltage divided by current — higher means harder to flow." },
    { term: "Ohm's Law", definition: "V = IR. The current through a resistor at constant temperature is directly proportional to the potential difference across it.", hint: "Voltage equals current times resistance." },
    { term: "Series Circuit", definition: "Components connected in a single loop. Current is the same everywhere; voltage is shared between components.", hint: "One path — same current throughout, voltages add up." },
    { term: "Parallel Circuit", definition: "Components connected on separate branches. Voltage is the same across each branch; current splits between branches.", hint: "Multiple paths — same voltage, current divides." },
    { term: "Power (Electrical)", definition: "P = IV (power = current × voltage). Also P = I²R and P = V²/R. Measured in watts.", hint: "Current times voltage gives you electrical power." },
    { term: "Energy Transferred", definition: "E = Pt (energy = power × time) or E = QV (charge × voltage). Measured in joules (J).", hint: "Power times time, or charge times voltage." },
  ],

  "particle-model": [
    { term: "Density", definition: "Mass per unit volume. ρ = m/V. Measured in kg/m³ or g/cm³.", hint: "How heavy something is for its size — mass divided by volume." },
    { term: "States of Matter", definition: "Solid: fixed shape, particles vibrate in fixed positions. Liquid: takes shape of container, particles move around each other. Gas: fills container, particles move freely.", hint: "Solid = vibrate, liquid = slide, gas = fly around." },
    { term: "Internal Energy", definition: "The total kinetic and potential energy of all the particles in a system.", hint: "Add up all the movement energy and stored energy of every particle." },
    { term: "Specific Latent Heat", definition: "The energy needed to change the state of 1 kg of a substance without changing its temperature. E = mL.", hint: "Energy for a state change — temperature stays the same." },
    { term: "Latent Heat of Fusion", definition: "The energy needed to change 1 kg from solid to liquid (or liquid to solid) at constant temperature.", hint: "Energy to melt or freeze — fusion means melting." },
    { term: "Latent Heat of Vaporisation", definition: "The energy needed to change 1 kg from liquid to gas (or gas to liquid) at constant temperature.", hint: "Energy to boil or condense — vaporisation means boiling." },
    { term: "Gas Pressure", definition: "Caused by gas particles colliding with the walls of their container. More frequent/harder collisions = higher pressure.", hint: "Particles bashing against the container walls." },
    { term: "Pressure and Temperature", definition: "For a fixed volume, increasing temperature increases gas pressure because particles move faster and collide more forcefully.", hint: "Hotter gas = faster particles = higher pressure." },
  ],

  "atomic-radiation": [
    { term: "Alpha Particle (α)", definition: "A helium nucleus (2 protons + 2 neutrons) emitted from an unstable nucleus. Strongly ionising, low penetration (stopped by paper/skin).", hint: "Big and heavy — stopped by paper but very ionising." },
    { term: "Beta Particle (β)", definition: "A high-speed electron emitted when a neutron turns into a proton. Moderately ionising, stopped by aluminium.", hint: "A fast electron from the nucleus — aluminium stops it." },
    { term: "Gamma Ray (γ)", definition: "An electromagnetic wave emitted from the nucleus. Weakly ionising but highly penetrating — only reduced by thick lead or concrete.", hint: "A wave, not a particle — needs thick lead to stop it." },
    { term: "Half-life", definition: "The time taken for half the radioactive nuclei in a sample to decay, or for the activity/count rate to halve.", hint: "The time for half of it to decay away." },
    { term: "Radioactive Decay", definition: "The random process by which an unstable nucleus emits radiation to become more stable. It is spontaneous and cannot be predicted.", hint: "Unstable atoms randomly spit out radiation to become stable." },
    { term: "Nuclear Fission", definition: "A large unstable nucleus splits into two smaller nuclei, releasing energy and neutrons. Used in nuclear power stations.", hint: "A big atom splits in two — this powers nuclear reactors." },
    { term: "Nuclear Fusion", definition: "Two small nuclei join together to form a larger nucleus, releasing huge amounts of energy. Occurs in stars.", hint: "Small atoms join together — this powers the Sun." },
    { term: "Contamination vs Irradiation", definition: "Contamination: unwanted radioactive material on/in a body. Irradiation: exposure to radiation from a source outside the body.", hint: "Contamination = radioactive stuff on you; irradiation = radiation hitting you from elsewhere." },
  ],

  "forces": [
    { term: "Newton's First Law", definition: "An object remains stationary or at constant velocity unless acted upon by a resultant force.", hint: "No resultant force = no change in motion." },
    { term: "Newton's Second Law", definition: "Force = mass × acceleration (F = ma). The acceleration of an object is proportional to the resultant force and inversely proportional to mass.", hint: "F = ma — more force means more acceleration." },
    { term: "Newton's Third Law", definition: "When two objects interact, the forces they exert on each other are equal and opposite.", hint: "Every action has an equal and opposite reaction." },
    { term: "Weight", definition: "The force of gravity acting on an object. W = mg (mass × gravitational field strength). Measured in newtons.", hint: "Mass times gravity — measured in newtons, not kilograms." },
    { term: "Resultant Force", definition: "The single force that has the same effect as all the forces acting on an object combined.", hint: "Add up all the forces — what's left over determines the motion." },
    { term: "Stopping Distance", definition: "Total stopping distance = thinking distance + braking distance. Affected by speed, reaction time, road conditions.", hint: "How far you think plus how far you brake." },
    { term: "Terminal Velocity", definition: "The maximum velocity reached when the driving force equals the resistive force (e.g. weight = air resistance for a skydiver).", hint: "When drag matches weight — you stop accelerating." },
    { term: "Momentum", definition: "Momentum = mass × velocity (p = mv). Measured in kg m/s. Momentum is conserved in collisions.", hint: "Mass times velocity — the heavier and faster, the more momentum." },
  ],

  "waves": [
    { term: "Transverse Wave", definition: "A wave where the oscillations are perpendicular to the direction of energy transfer. E.g. light, water waves, S-waves.", hint: "Vibrations go up and down while the wave travels sideways." },
    { term: "Longitudinal Wave", definition: "A wave where the oscillations are parallel to the direction of energy transfer. E.g. sound waves, P-waves.", hint: "Vibrations go back and forth in the same direction the wave travels." },
    { term: "Wavelength (λ)", definition: "The distance from one point on a wave to the equivalent point on the next wave (e.g. crest to crest). Measured in metres.", hint: "The length of one complete wave — peak to peak." },
    { term: "Frequency (f)", definition: "The number of complete waves passing a point per second. Measured in hertz (Hz).", hint: "How many waves go past each second." },
    { term: "Wave Speed Equation", definition: "v = fλ (wave speed = frequency × wavelength). Speed in m/s, frequency in Hz, wavelength in m.", hint: "Speed equals frequency times wavelength." },
    { term: "Reflection", definition: "When a wave bounces off a surface. The angle of incidence equals the angle of reflection.", hint: "The wave bounces — the angles are always equal." },
    { term: "Refraction", definition: "The change in direction of a wave when it passes from one medium to another, caused by a change in speed.", hint: "The wave bends because it changes speed at a boundary." },
    { term: "Electromagnetic Spectrum", definition: "Radio, Microwave, Infrared, Visible, Ultraviolet, X-ray, Gamma ray — in order of increasing frequency and decreasing wavelength.", hint: "Red Men In Violet Underwear X-ray Gamma — low to high frequency." },
  ],

  "magnetism": [
    { term: "Magnetic Field", definition: "The region around a magnet where a magnetic force acts on magnetic materials or other magnets.", hint: "The invisible area of force around a magnet." },
    { term: "Permanent Magnet", definition: "A magnet that produces its own magnetic field. It always has a north and south pole.", hint: "Always magnetic — it doesn't need electricity." },
    { term: "Electromagnet", definition: "A magnet created by passing electric current through a coil of wire (solenoid), often with an iron core.", hint: "A magnet you can switch on and off with electricity." },
    { term: "Solenoid", definition: "A coil of wire that produces a magnetic field when current flows through it. The field inside is strong and uniform.", hint: "A coil of wire — current makes it act like a bar magnet." },
    { term: "Motor Effect", definition: "A current-carrying conductor in a magnetic field experiences a force. F = BIl (force = magnetic flux density × current × length).", hint: "Current in a magnetic field creates a force — this is how motors work." },
    { term: "Fleming's Left-Hand Rule", definition: "Used to find the direction of force on a current-carrying conductor in a magnetic field. Thumb = force, first finger = field, second finger = current.", hint: "Thumb = thrust, First finger = Field, seCond finger = Current." },
    { term: "Electromagnetic Induction", definition: "A potential difference is induced when a conductor moves through a magnetic field or when a magnetic field changes around a conductor.", hint: "Moving a wire through a magnetic field generates voltage." },
    { term: "Transformer", definition: "A device that changes the voltage of an alternating current using electromagnetic induction. Vp/Vs = Np/Ns.", hint: "Coils of wire that step voltage up or down." },
  ],

  "space-physics": [
    { term: "Solar System", definition: "The Sun and everything that orbits it: 8 planets, dwarf planets, moons, asteroids, and comets.", hint: "Our star and all the objects held by its gravity." },
    { term: "Orbit", definition: "The curved path of a planet around a star, or a moon around a planet, caused by gravitational attraction.", hint: "The circular or elliptical path held by gravity." },
    { term: "Life Cycle of a Star (Sun-sized)", definition: "Nebula → protostar → main sequence star → red giant → white dwarf → (eventually) black dwarf.", hint: "Born in a nebula, lives as a main sequence star, swells, then fades away." },
    { term: "Life Cycle of a Massive Star", definition: "Nebula → protostar → main sequence → red supergiant → supernova → neutron star or black hole.", hint: "Big stars die explosively — supernova! Then neutron star or black hole." },
    { term: "Red Shift", definition: "Light from galaxies moving away from us is shifted towards the red end of the spectrum. Greater red shift = moving faster.", hint: "Galaxies racing away stretch their light towards red." },
    { term: "Big Bang Theory", definition: "The theory that the universe began from a very small, extremely hot and dense point approximately 13.8 billion years ago and has been expanding ever since.", hint: "Everything started from a tiny point and has been expanding." },
    { term: "Cosmic Microwave Background Radiation (CMBR)", definition: "Low-frequency electromagnetic radiation filling the universe, left over from the Big Bang. It is evidence for the Big Bang theory.", hint: "The leftover glow from the beginning of the universe." },
    { term: "Dark Energy", definition: "A mysterious force causing the expansion of the universe to accelerate. Makes up about 68% of the universe.", hint: "The unknown force pushing the universe apart faster and faster." },
  ],

  // ========== ENGLISH LANGUAGE (8 topics) ==========

  "paper1-reading-comprehension": [
    { term: "Explicit Information", definition: "Information that is directly stated in the text — you can point to the exact words.", hint: "It's right there in black and white — no reading between the lines." },
    { term: "Inference", definition: "Working out something that isn't directly stated by using clues and evidence in the text.", hint: "Reading between the lines — what is the writer suggesting?" },
    { term: "Paraphrase", definition: "Expressing the meaning of a text in your own words while keeping the original meaning.", hint: "Say the same thing but in your own words." },
    { term: "Quotation", definition: "The exact words from the text, placed in quotation marks, used as evidence to support a point.", hint: "Copy the exact words and put them in speech marks." },
    { term: "Synthesis", definition: "Combining information from different parts of a text (or two texts) to present a coherent summary.", hint: "Pulling together information from different places." },
    { term: "Perceptive Reading", definition: "Showing sophisticated understanding of the text — going beyond the obvious to explore deeper meanings and implications.", hint: "Reading at a deeper level — showing real insight." },
    { term: "Textual Evidence", definition: "Specific words, phrases, or quotations from the text used to support your analysis or interpretation.", hint: "Proof from the text — use the writer's own words." },
    { term: "AQA Paper 1 Section A", definition: "Reading section based on one fiction extract (20th/21st century). Questions test retrieval, language, structure, and evaluation.", hint: "One fiction text — four reading questions worth 40 marks total." },
  ],

  "paper1-language-analysis": [
    { term: "Metaphor", definition: "A figure of speech that directly compares one thing to another without using 'like' or 'as'. E.g. 'The classroom was a zoo.'", hint: "Says something IS something else — no 'like' or 'as'." },
    { term: "Simile", definition: "A comparison using 'like' or 'as'. E.g. 'Her eyes sparkled like diamonds.'", hint: "Uses 'like' or 'as' to compare two things." },
    { term: "Personification", definition: "Giving human qualities or actions to non-human things. E.g. 'The wind whispered through the trees.'", hint: "Making non-human things act like people." },
    { term: "Pathetic Fallacy", definition: "Using weather or the environment to reflect the mood or emotions of characters. E.g. a storm during a tense scene.", hint: "The weather matches the mood — not just any personification." },
    { term: "Sibilance", definition: "The repetition of 's' and 'sh' sounds, often creating a sinister, soothing, or secretive effect.", hint: "Repeated 's' sounds — think snakes." },
    { term: "Semantic Field", definition: "A group of words from the same topic or theme used throughout a text. E.g. 'battle, fight, war, conflict' = semantic field of conflict.", hint: "A cluster of related words all pointing to the same theme." },
    { term: "Juxtaposition", definition: "Placing two contrasting ideas, images, or words close together for effect. Highlights differences.", hint: "Putting opposites side by side to create contrast." },
    { term: "Connotation", definition: "The associated or suggested meaning of a word beyond its literal definition. E.g. 'red' can connote danger or passion.", hint: "What a word makes you think of — the hidden meaning." },
  ],

  "paper1-structure-analysis": [
    { term: "Narrative Perspective", definition: "The viewpoint from which a story is told: first person (I), second person (you), or third person (he/she/they).", hint: "Who is telling the story — I, you, or he/she?" },
    { term: "Chronological Structure", definition: "Events arranged in time order, from beginning to end.", hint: "In the order things happened — start to finish." },
    { term: "Flashback", definition: "A structural device where the narrative shifts to an earlier time to reveal background information.", hint: "The story jumps back in time." },
    { term: "Foreshadowing", definition: "Hints or clues about events that will happen later in the text, creating suspense.", hint: "Clues dropped early that point to what's coming." },
    { term: "Shift in Focus", definition: "When the writer moves attention from one subject, character, place, or time to another.", hint: "The camera moves — the writer points your attention somewhere new." },
    { term: "Cyclical Structure", definition: "A narrative that ends where it began, creating a sense of completeness or emphasising change.", hint: "The ending mirrors the beginning — it comes full circle." },
    { term: "Climax", definition: "The point of greatest tension or drama in a narrative — the turning point.", hint: "The most dramatic, intense moment of the story." },
    { term: "Paragraph Length as a Structural Device", definition: "Short paragraphs create pace and tension. Long paragraphs slow the reader down for description or reflection.", hint: "Short = fast and tense. Long = slow and detailed." },
  ],

  "paper1-evaluation": [
    { term: "Evaluation", definition: "Making a judgement about a text and its effectiveness, supported by evidence and analysis.", hint: "Do you agree with the statement? Say why, using evidence." },
    { term: "Critical Analysis", definition: "Examining and assessing the writer's choices of language, structure, and form and their effects on the reader.", hint: "Break down the writer's techniques and judge how well they work." },
    { term: "Writer's Intention", definition: "The purpose behind the writer's choices — what effect they wanted to create on the reader.", hint: "Why did the writer make that particular choice?" },
    { term: "Reader Response", definition: "How the reader thinks, feels, or reacts to the text as a result of the writer's methods.", hint: "What does the text make YOU think or feel?" },
    { term: "Sustained Argument", definition: "A consistently developed viewpoint throughout your response, with points that build on each other.", hint: "Keep your argument going — each point should connect to the last." },
    { term: "Counter-argument", definition: "Acknowledging an alternative interpretation before explaining why your view is stronger.", hint: "Some might argue... however, I believe..." },
    { term: "Embedding Quotations", definition: "Weaving short quotations seamlessly into your own sentences rather than writing them separately.", hint: "Blend the quote into your sentence so it reads naturally." },
    { term: "AO4 (Assessment Objective 4)", definition: "Evaluate texts critically and support this with appropriate textual references. Worth 20 marks on Q4.", hint: "The skill of judging a text — the highest-mark reading question." },
  ],

  "paper1-creative-writing": [
    { term: "Narrative Voice", definition: "The character or persona through which the story is told. First person (I) creates intimacy; third person allows broader perspective.", hint: "Who is telling the story and how it affects the reader." },
    { term: "Show, Don't Tell", definition: "Conveying emotions and atmosphere through actions, senses, and details rather than directly stating them.", hint: "Don't write 'she was scared' — show the trembling hands and racing heart." },
    { term: "Sensory Language", definition: "Words and phrases that appeal to the five senses: sight, sound, touch, taste, smell.", hint: "Make the reader see, hear, feel, taste, and smell the scene." },
    { term: "Varied Sentence Structures", definition: "Using a mix of simple, compound, and complex sentences, including short sentences for impact and longer ones for detail.", hint: "Mix it up — short for drama, long for description." },
    { term: "Ambitious Vocabulary", definition: "Using precise, sophisticated word choices that create vivid imagery and show language control.", hint: "Choose interesting, specific words — not just 'nice' or 'good'." },
    { term: "Opening Hook", definition: "An engaging first line or paragraph that captures the reader's attention immediately.", hint: "Make the reader want to keep reading from the very first line." },
    { term: "Pathetic Fallacy in Creative Writing", definition: "Deliberately using weather and setting to mirror or contrast with the mood of your narrative.", hint: "Use the weather to set the mood — dark skies for tension." },
    { term: "Paragraph for Effect", definition: "Using single-sentence or single-word paragraphs for dramatic emphasis and pacing.", hint: "One word. On its own line. For impact." },
  ],

  "paper2-reading-comprehension": [
    { term: "Non-fiction Text", definition: "A text based on real events, people, or information. Includes articles, speeches, letters, blogs, autobiographies.", hint: "Real, factual writing — not made up." },
    { term: "19th Century Source", definition: "AQA Paper 2 includes one text from the 19th century (1800s). Language may be more formal and complex.", hint: "The older text — Victorian-era writing with formal language." },
    { term: "True/False Statements (Q1)", definition: "Paper 2 Q1: select four true statements from a list of eight about one source. Worth 4 marks.", hint: "Find four that match the text — quick marks." },
    { term: "Summary (Q2)", definition: "Paper 2 Q2: write a summary of differences (or similarities) between the two sources on a given topic.", hint: "Compare what both texts say about the same theme." },
    { term: "Purpose", definition: "The reason a text was written: to inform, persuade, argue, advise, entertain, describe, instruct, or explain.", hint: "Why was it written — what is the writer trying to do?" },
    { term: "Audience", definition: "The intended reader of a text. This affects the language, tone, and formality used by the writer.", hint: "Who is it written for — teenagers, adults, experts?" },
    { term: "Bias", definition: "When a writer presents a one-sided view, deliberately leaving out information that contradicts their argument.", hint: "Only showing one side of the story." },
    { term: "Tone", definition: "The attitude or feeling conveyed by the writer's word choices. E.g. humorous, angry, formal, sarcastic.", hint: "The mood of the writing — is it funny, serious, angry?" },
  ],

  "paper2-comparison": [
    { term: "Comparison (Q4)", definition: "AQA Paper 2 Q4: compare how two writers convey their different perspectives on a topic. Worth 16 marks.", hint: "How do both writers get their viewpoint across — compare their methods." },
    { term: "Connectives for Comparison", definition: "Words to compare: similarly, likewise, both, in the same way. Words to contrast: however, whereas, on the other hand, conversely.", hint: "Use linking words that show similarity or difference." },
    { term: "Writer's Perspective", definition: "The writer's viewpoint, opinion, or attitude towards the subject they are writing about.", hint: "What does the writer think or feel about the topic?" },
    { term: "Methods", definition: "The techniques a writer uses to convey their perspective: language, structure, rhetorical devices, tone.", hint: "HOW the writer gets their point across — the tools they use." },
    { term: "Cross-referencing", definition: "Referring to both texts in your answer, showing connections and differences between them.", hint: "Keep going back and forth between both texts." },
    { term: "Rhetorical Question", definition: "A question asked for effect, not expecting an answer. Used to make the reader think or agree with the writer.", hint: "A question that doesn't need an answer — it makes a point." },
    { term: "Direct Address", definition: "Using 'you' or 'we' to speak directly to the reader, creating a personal connection.", hint: "Talking straight to the reader — 'you' makes it personal." },
    { term: "Anecdote", definition: "A short personal story used to illustrate a point and engage the reader.", hint: "A little story from real life that supports the writer's argument." },
  ],

  "paper2-viewpoint-writing": [
    { term: "Viewpoint Writing", definition: "AQA Paper 2 Q5: write to present a viewpoint — typically a speech, article, letter, or essay. Worth 40 marks.", hint: "Give your opinion convincingly — it's worth the most marks." },
    { term: "AFOREST", definition: "A mnemonic for persuasive techniques: Alliteration, Facts, Opinions, Rhetorical questions, Emotive language, Statistics, Triplets (rule of three).", hint: "The memory aid for persuasive writing techniques." },
    { term: "Rule of Three (Triplet)", definition: "Using three words, phrases, or ideas in a list for emphasis and rhythm. E.g. 'education, equality, and empowerment'.", hint: "Three things in a row — it sounds powerful and memorable." },
    { term: "Emotive Language", definition: "Words chosen to provoke an emotional response from the reader. E.g. 'devastating', 'innocent', 'tragic'.", hint: "Words that tug at the heartstrings." },
    { term: "Counter-argument", definition: "Acknowledging the opposing viewpoint before explaining why your position is stronger.", hint: "Address what the other side thinks, then knock it down." },
    { term: "Formal Register", definition: "A style of writing appropriate for articles, letters, and speeches — standard English, no slang, structured paragraphs.", hint: "Write properly — no text speak or slang." },
    { term: "Discourse Markers", definition: "Words and phrases that organise and connect ideas: furthermore, consequently, in addition, on the other hand.", hint: "Linking words that guide the reader through your argument." },
    { term: "Engaging Opening", definition: "Starting with a bold statement, rhetorical question, statistic, or anecdote to immediately hook the reader.", hint: "Grab attention from the very first sentence." },
  ],

  // ========== ENGLISH LITERATURE (7 topics) ==========

  "macbeth": [
    { term: "Tragic Hero", definition: "Macbeth begins as a noble, brave soldier but is destroyed by his fatal flaw (hamartia) — ambition — leading to his downfall.", hint: "A great man brought down by his own weakness." },
    { term: "Hamartia (Fatal Flaw)", definition: "Macbeth's fatal flaw is his vaulting ambition, which drives him to murder and tyranny.", hint: "The one weakness that destroys everything." },
    { term: "The Witches / Supernatural", definition: "The three witches represent the supernatural and the theme of fate vs free will. Their prophecies ignite Macbeth's ambition.", hint: "Three mysterious figures who predict the future." },
    { term: "Lady Macbeth", definition: "Macbeth's wife who initially drives the murder plot, calling on spirits to 'unsex' her. Later descends into guilt and madness.", hint: "The ambitious wife who pushes Macbeth — then crumbles." },
    { term: "Kingship", definition: "Shakespeare contrasts the tyrannical rule of Macbeth with the good kingship of Duncan and later Malcolm.", hint: "What makes a good king versus a bad one." },
    { term: "Guilt", definition: "A central theme — shown through Macbeth's hallucinations (the dagger, Banquo's ghost) and Lady Macbeth's sleepwalking.", hint: "The psychological torment that haunts both Macbeth and his wife." },
    { term: "'Fair is foul, and foul is fair'", definition: "The witches' opening line establishing the theme of appearance vs reality — nothing is as it seems.", hint: "Good is bad and bad is good — things aren't what they appear." },
    { term: "The Great Chain of Being", definition: "The Jacobean belief that God ordered all of creation in a hierarchy. Killing a king (regicide) disrupts the natural order.", hint: "God's order — kill the king and nature itself revolts." },
  ],

  "romeo-and-juliet": [
    { term: "Star-crossed Lovers", definition: "Romeo and Juliet are described as 'star-crossed lovers' — fated to die, their love doomed from the start.", hint: "The stars are against them — destiny leads to tragedy." },
    { term: "The Prologue", definition: "A 14-line sonnet that reveals the entire plot, including the lovers' deaths, creating dramatic irony throughout.", hint: "The opening speech that tells you the ending before it begins." },
    { term: "Family Feud (Montagues vs Capulets)", definition: "The ancient grudge between the two families is the central conflict that prevents the lovers from being together.", hint: "Two households, both alike in dignity — but they hate each other." },
    { term: "Love vs Hate", definition: "The central juxtaposition of the play — passionate love exists alongside violent hatred.", hint: "The play constantly puts these two opposites side by side." },
    { term: "Fate and Free Will", definition: "The play questions whether events are predestined or the result of characters' choices and bad timing.", hint: "Were they always doomed, or could things have been different?" },
    { term: "Friar Lawrence", definition: "A well-meaning priest who secretly marries the lovers and devises the sleeping potion plan that ultimately fails.", hint: "The priest who tries to help but whose plan goes tragically wrong." },
    { term: "Patriarchal Society", definition: "Juliet lives in a male-dominated world where her father controls her marriage and future.", hint: "Men are in charge — Juliet has little say in her own life." },
    { term: "'O Romeo, Romeo, wherefore art thou Romeo?'", definition: "Juliet's famous line meaning 'Why are you called Romeo?' — lamenting that his name makes him her enemy.", hint: "She's not asking where he is — she's asking why he has THAT name." },
  ],

  "inspector-calls": [
    { term: "Inspector Goole", definition: "A mysterious figure who arrives to interrogate the Birlings about Eva Smith's death. His name sounds like 'ghoul' — possibly supernatural.", hint: "The inspector with a ghostly name who knows everything." },
    { term: "Eva Smith / Daisy Renton", definition: "A working-class woman who is mistreated by every member of the Birling family, leading to her suicide.", hint: "The victim — each family member wronged her in turn." },
    { term: "Social Responsibility", definition: "Priestley's central message: we are all responsible for each other. 'We are members of one body.'", hint: "Priestley says we must look after one another — not just ourselves." },
    { term: "Mr Birling", definition: "A wealthy businessman who represents capitalism and selfishness. His confident predictions are all wrong (dramatic irony).", hint: "The arrogant capitalist father who learns nothing." },
    { term: "Sheila Birling", definition: "The daughter who represents the younger generation. She accepts responsibility and changes — Priestley's hope for the future.", hint: "The one who actually learns her lesson." },
    { term: "Dramatic Irony", definition: "When the audience knows something the characters don't. E.g. Birling says the Titanic is 'unsinkable' and there won't be a war.", hint: "The audience knows he's wrong — we know what happened." },
    { term: "Class Division", definition: "Priestley criticises the class system where the wealthy exploit the working class.", hint: "Rich vs poor — the upper class look down on workers." },
    { term: "'Fire and blood and anguish'", definition: "The Inspector's final speech warning that if people don't learn social responsibility, they will face consequences — referencing the World Wars.", hint: "The Inspector's powerful warning about what happens when we don't care." },
  ],

  "christmas-carol": [
    { term: "Ebenezer Scrooge", definition: "The protagonist who transforms from a cold, miserly man into a generous, kind person after being visited by three spirits.", hint: "The famous miser who learns to change his ways." },
    { term: "'Bah! Humbug!'", definition: "Scrooge's famous dismissal of Christmas, showing his contempt for generosity and celebration.", hint: "Scrooge's catchphrase — he thinks Christmas is nonsense." },
    { term: "Jacob Marley's Ghost", definition: "Scrooge's dead business partner who warns him to change or face eternal punishment, dragging heavy chains.", hint: "The ghost in chains who warns Scrooge about his fate." },
    { term: "Ghost of Christmas Past", definition: "Shows Scrooge memories of his lonely childhood and lost love (Belle), revealing how he became cold and greedy.", hint: "The spirit that shows Scrooge his own history." },
    { term: "Ghost of Christmas Present", definition: "Shows Scrooge the Cratchit family and Tiny Tim, highlighting poverty and the joy of togetherness despite hardship.", hint: "The jolly spirit who shows what's happening right now." },
    { term: "Tiny Tim", definition: "Bob Cratchit's ill son who represents the innocent poor suffering due to society's neglect. His potential death motivates Scrooge.", hint: "The sick child whose fate depends on Scrooge changing." },
    { term: "Social Criticism", definition: "Dickens criticises Victorian society's treatment of the poor and the selfishness of the wealthy, using Scrooge as a symbol.", hint: "Dickens wants rich Victorians to help the poor." },
    { term: "Redemption", definition: "The central theme — Scrooge's transformation from selfish miser to generous benefactor shows that anyone can change.", hint: "It's never too late to become a better person." },
  ],

  "jekyll-hyde": [
    { term: "Duality of Man", definition: "The central theme — every person has both good and evil within them. Jekyll and Hyde represent these two sides.", hint: "Everyone has a good side and a dark side." },
    { term: "Dr Jekyll", definition: "A respected, wealthy scientist who creates a potion to separate his good and evil natures, transforming into Mr Hyde.", hint: "The respectable doctor hiding a terrible secret." },
    { term: "Mr Hyde", definition: "Jekyll's evil alter ego — described as small, deformed, and repulsive. Represents the primitive, violent side of human nature.", hint: "The small, ugly embodiment of pure evil." },
    { term: "Victorian Repression", definition: "Stevenson explores how Victorian society's strict moral codes forced people to hide their true desires, leading to hypocrisy.", hint: "Respectable on the outside, hiding dark secrets within." },
    { term: "Science and Religion", definition: "The novella questions the dangers of science going too far, challenging God and natural order — a Victorian concern.", hint: "Should science meddle with nature and human identity?" },
    { term: "Gothic Genre", definition: "Jekyll and Hyde uses Gothic conventions: mystery, horror, fog, darkness, and the supernatural.", hint: "Dark, mysterious, foggy London — classic horror elements." },
    { term: "'Man is not truly one, but truly two'", definition: "Jekyll's realisation that human nature is dual — we are not simply good or evil but contain both.", hint: "Jekyll's key insight about the divided nature of humanity." },
    { term: "Reputation", definition: "A key theme — characters like Utterson and Enfield are deeply concerned with maintaining respectability and avoiding scandal.", hint: "In Victorian society, your public image was everything." },
  ],

  "power-conflict-poetry": [
    { term: "'Ozymandias' (Shelley)", definition: "A sonnet about a ruined statue of a once-powerful king, exploring the theme that human power is temporary.", hint: "A broken statue in the desert — power doesn't last forever." },
    { term: "'London' (Blake)", definition: "A poem criticising the suffering and corruption in London, using imagery of 'chartered' streets and 'mind-forged manacles'.", hint: "Blake walks through London seeing misery everywhere." },
    { term: "'The Charge of the Light Brigade' (Tennyson)", definition: "A poem commemorating the bravery of soldiers in a doomed cavalry charge during the Crimean War.", hint: "Into the valley of Death rode the six hundred." },
    { term: "'Exposure' (Owen)", definition: "A WW1 poem showing soldiers suffering from freezing conditions, emphasising that the real enemy is nature, not the opposing army.", hint: "The soldiers' worst enemy is the bitter cold — 'nothing happens'." },
    { term: "'Bayonet Charge' (Hughes)", definition: "A poem capturing the terrifying experience of a soldier going 'over the top' in a charge across no man's land.", hint: "A soldier running into battle — fear replaces patriotism." },
    { term: "'Remains' (Armitage)", definition: "A poem about a soldier haunted by guilt after shooting a looter in Iraq — exploring PTSD and the lasting impact of conflict.", hint: "The dead man's image stays with the soldier — he can't forget." },
    { term: "'Kamikaze' (Garland)", definition: "A poem about a Japanese pilot who turns back from a suicide mission and faces shame and social exclusion.", hint: "He chose to live — but was treated as if he were dead." },
    { term: "Comparison Techniques", definition: "In the exam, compare two poems on themes (power, conflict, identity), methods (language, structure), and effects on the reader.", hint: "Always compare themes AND methods — use connectives." },
  ],

  "unseen-poetry": [
    { term: "Unseen Poetry", definition: "In the AQA exam, you analyse a poem you've never seen before. Section C of Paper 2 — worth 32 marks total.", hint: "A brand new poem — use your analysis skills, not memorised quotes." },
    { term: "SMILE Analysis", definition: "A framework: Structure, Meaning, Imagery, Language, Effect. Use it to systematically analyse any unseen poem.", hint: "Structure, Meaning, Imagery, Language, Effect — cover all angles." },
    { term: "Enjambment", definition: "When a sentence or phrase runs over from one line to the next without punctuation, creating a sense of flow or urgency.", hint: "The line doesn't stop — it spills over into the next one." },
    { term: "Caesura", definition: "A pause in the middle of a line of poetry, created by punctuation. Used for emphasis or to create a dramatic break.", hint: "A pause in the middle of a line — look for commas, full stops, or dashes." },
    { term: "Volta", definition: "A 'turn' or shift in a poem — a change in tone, mood, subject, or argument. Common in sonnets.", hint: "The moment the poem changes direction." },
    { term: "Stanza", definition: "A group of lines in a poem, separated by a space. Like a paragraph in prose.", hint: "A verse — the poem's version of a paragraph." },
    { term: "Tone", definition: "The mood or attitude conveyed in the poem — e.g. melancholic, celebratory, angry, reflective.", hint: "How does the poem feel — what's the emotion behind the words?" },
    { term: "Personal Response", definition: "Your own interpretation of the poem, supported by evidence. There is no single 'right' answer for unseen poetry.", hint: "What do YOU think the poem means? Just prove it with evidence." },
  ],
};

// ============================================
// MAIN SCRIPT
// ============================================

async function seedFlashcards() {
  console.log("🃏 Seeding flashcards into Supabase...\n");

  // Step 1: Fetch all topics with their subject info
  const { data: topics, error: topicsError } = await supabase
    .from("topics")
    .select("id, slug, name, subjects(name, slug)")
    .order("order_index");

  if (topicsError) {
    console.error("Error fetching topics:", topicsError);
    process.exit(1);
  }

  if (!topics || topics.length === 0) {
    console.error("No topics found in the database. Run seed.ts first.");
    process.exit(1);
  }

  console.log(`Found ${topics.length} topics in the database.\n`);

  // Step 2: Build flashcard rows
  const allFlashcards: Array<{
    topic_id: string;
    term: string;
    definition: string;
    hint: string;
    order_index: number;
  }> = [];

  let matchedTopics = 0;
  let unmatchedTopics: string[] = [];

  for (const topic of topics) {
    const cards = flashcardsByTopicSlug[topic.slug];
    if (!cards) {
      unmatchedTopics.push(`${topic.slug} (${topic.name})`);
      continue;
    }

    matchedTopics++;
    cards.forEach((card, index) => {
      allFlashcards.push({
        topic_id: topic.id,
        term: card.term,
        definition: card.definition,
        hint: card.hint,
        order_index: index + 1,
      });
    });
  }

  console.log(`Matched ${matchedTopics} topics with flashcard data.`);
  if (unmatchedTopics.length > 0) {
    console.log(`⚠️  Unmatched topics (${unmatchedTopics.length}): ${unmatchedTopics.join(", ")}`);
  }
  console.log(`Total flashcards to insert: ${allFlashcards.length}\n`);

  // Step 3: Insert in batches (Supabase has limits on row count per request)
  const BATCH_SIZE = 100;
  let totalInserted = 0;

  for (let i = 0; i < allFlashcards.length; i += BATCH_SIZE) {
    const batch = allFlashcards.slice(i, i + BATCH_SIZE);
    const { error: insertError } = await supabase
      .from("flashcards")
      .insert(batch);

    if (insertError) {
      console.error(`Error inserting batch ${Math.floor(i / BATCH_SIZE) + 1}:`, insertError);
      continue;
    }

    totalInserted += batch.length;
    console.log(`  Inserted batch ${Math.floor(i / BATCH_SIZE) + 1}: ${batch.length} flashcards (total: ${totalInserted})`);
  }

  console.log(`\n✅ Seeding complete! ${totalInserted} flashcards inserted successfully.`);
}

seedFlashcards().catch(console.error);
