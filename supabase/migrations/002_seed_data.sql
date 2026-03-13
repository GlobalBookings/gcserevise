-- Seed exam boards
INSERT INTO exam_boards (name, code, region) VALUES
  ('AQA', 'aqa', 'England'),
  ('Edexcel', 'edexcel', 'England'),
  ('OCR', 'ocr', 'England'),
  ('WJEC/Eduqas', 'wjec', 'Wales'),
  ('CCEA', 'ccea', 'Northern Ireland')
ON CONFLICT (code) DO NOTHING;

-- Seed AQA subjects
WITH aqa AS (SELECT id FROM exam_boards WHERE code = 'aqa')
INSERT INTO subjects (board_id, name, slug, icon, color, topic_count) VALUES
  ((SELECT id FROM aqa), 'Mathematics', 'maths', 'calculator', '#3b82f6', 24),
  ((SELECT id FROM aqa), 'Biology', 'biology', 'flask', '#10b981', 14),
  ((SELECT id FROM aqa), 'Chemistry', 'chemistry', 'flask', '#f59e0b', 10),
  ((SELECT id FROM aqa), 'Physics', 'physics', 'zap', '#ef4444', 8),
  ((SELECT id FROM aqa), 'English Language', 'english-language', 'book', '#a855f7', 8),
  ((SELECT id FROM aqa), 'English Literature', 'english-literature', 'book', '#8b5cf6', 7)
ON CONFLICT (board_id, slug) DO NOTHING;

-- ============================================
-- MATHS TOPICS
-- ============================================
WITH subj AS (
  SELECT s.id FROM subjects s
  JOIN exam_boards b ON s.board_id = b.id
  WHERE b.code = 'aqa' AND s.slug = 'maths'
)
INSERT INTO topics (subject_id, paper, name, slug, spec_ref, tier, difficulty, estimated_minutes, order_index) VALUES
  ((SELECT id FROM subj), 'Paper 1/2/3', 'Integers, Decimals & Place Value', 'integers-decimals', 'N1-N2', 'both', 1, 25, 1),
  ((SELECT id FROM subj), 'Paper 1/2/3', 'Fractions, Decimals & Percentages', 'fractions-decimals-percentages', 'N2-N12', 'both', 2, 30, 2),
  ((SELECT id FROM subj), 'Paper 1/2/3', 'Indices & Standard Form', 'indices-standard-form', 'N6-N9', 'both', 3, 30, 3),
  ((SELECT id FROM subj), 'Paper 1/2/3', 'Surds', 'surds', 'N8', 'higher', 4, 25, 4),
  ((SELECT id FROM subj), 'Paper 1/2/3', 'Algebraic Expressions', 'algebraic-expressions', 'A1-A4', 'both', 2, 30, 5),
  ((SELECT id FROM subj), 'Paper 1/2/3', 'Solving Linear Equations', 'linear-equations', 'A17', 'both', 2, 25, 6),
  ((SELECT id FROM subj), 'Paper 1/2/3', 'Solving Quadratic Equations', 'quadratic-equations', 'A18', 'both', 3, 35, 7),
  ((SELECT id FROM subj), 'Paper 1/2/3', 'Simultaneous Equations', 'simultaneous-equations', 'A19', 'both', 4, 30, 8),
  ((SELECT id FROM subj), 'Paper 1/2/3', 'Sequences', 'sequences', 'A23-A25', 'both', 2, 25, 9),
  ((SELECT id FROM subj), 'Paper 1/2/3', 'Straight Line Graphs', 'straight-line-graphs', 'A9-A11', 'both', 2, 30, 10),
  ((SELECT id FROM subj), 'Paper 1/2/3', 'Quadratic & Other Graphs', 'quadratic-graphs', 'A12-A14', 'both', 3, 30, 11),
  ((SELECT id FROM subj), 'Paper 1/2/3', 'Inequalities', 'inequalities', 'A22', 'both', 3, 25, 12),
  ((SELECT id FROM subj), 'Paper 1/2/3', 'Ratio & Proportion', 'ratio-proportion', 'R1-R10', 'both', 2, 30, 13),
  ((SELECT id FROM subj), 'Paper 1/2/3', 'Rates of Change & Growth', 'rates-of-change', 'R11-R16', 'both', 3, 30, 14),
  ((SELECT id FROM subj), 'Paper 1/2/3', 'Angles & Polygons', 'angles-polygons', 'G1-G4', 'both', 2, 30, 15),
  ((SELECT id FROM subj), 'Paper 1/2/3', 'Area & Perimeter', 'area-perimeter', 'G16-G17', 'both', 2, 25, 16),
  ((SELECT id FROM subj), 'Paper 1/2/3', 'Volume & Surface Area', 'volume-surface-area', 'G16-G17', 'both', 3, 30, 17),
  ((SELECT id FROM subj), 'Paper 1/2/3', 'Transformations', 'transformations', 'G7-G8', 'both', 2, 25, 18),
  ((SELECT id FROM subj), 'Paper 1/2/3', 'Pythagoras & Trigonometry', 'pythagoras-trigonometry', 'G20-G22', 'both', 3, 35, 19),
  ((SELECT id FROM subj), 'Paper 1/2/3', 'Vectors', 'vectors', 'G24-G25', 'higher', 4, 30, 20),
  ((SELECT id FROM subj), 'Paper 1/2/3', 'Circle Theorems', 'circle-theorems', 'G10', 'higher', 4, 30, 21),
  ((SELECT id FROM subj), 'Paper 1/2/3', 'Collecting & Representing Data', 'data-representation', 'S1-S3', 'both', 1, 25, 22),
  ((SELECT id FROM subj), 'Paper 1/2/3', 'Averages & Spread', 'averages-spread', 'S4-S5', 'both', 2, 25, 23),
  ((SELECT id FROM subj), 'Paper 1/2/3', 'Probability', 'probability', 'P1-P9', 'both', 3, 30, 24)
ON CONFLICT (subject_id, slug) DO NOTHING;

-- ============================================
-- BIOLOGY TOPICS
-- ============================================
WITH subj AS (
  SELECT s.id FROM subjects s
  JOIN exam_boards b ON s.board_id = b.id
  WHERE b.code = 'aqa' AND s.slug = 'biology'
)
INSERT INTO topics (subject_id, paper, name, slug, spec_ref, tier, difficulty, estimated_minutes, order_index) VALUES
  ((SELECT id FROM subj), 'Paper 1', 'Cell Structure', 'cell-structure', '4.1.1', 'both', 2, 30, 1),
  ((SELECT id FROM subj), 'Paper 1', 'Cell Division', 'cell-division', '4.1.2', 'both', 3, 30, 2),
  ((SELECT id FROM subj), 'Paper 1', 'Transport in Cells', 'transport-in-cells', '4.1.3', 'both', 3, 25, 3),
  ((SELECT id FROM subj), 'Paper 1', 'Organisation in Animals', 'organisation-animals', '4.2.1', 'both', 2, 30, 4),
  ((SELECT id FROM subj), 'Paper 1', 'Organisation in Plants', 'organisation-plants', '4.2.2', 'both', 2, 25, 5),
  ((SELECT id FROM subj), 'Paper 1', 'Communicable Diseases', 'communicable-diseases', '4.3.1', 'both', 2, 30, 6),
  ((SELECT id FROM subj), 'Paper 1', 'Non-Communicable Diseases', 'non-communicable-diseases', '4.3.2', 'both', 2, 25, 7),
  ((SELECT id FROM subj), 'Paper 1', 'Photosynthesis', 'photosynthesis', '4.4.1', 'both', 3, 30, 8),
  ((SELECT id FROM subj), 'Paper 1', 'Respiration', 'respiration', '4.4.2', 'both', 3, 25, 9),
  ((SELECT id FROM subj), 'Paper 2', 'Homeostasis & Response', 'homeostasis', '4.5', 'both', 3, 35, 10),
  ((SELECT id FROM subj), 'Paper 2', 'Hormones & Human Reproduction', 'hormones-reproduction', '4.5.3', 'both', 3, 30, 11),
  ((SELECT id FROM subj), 'Paper 2', 'Inheritance & Variation', 'inheritance-variation', '4.6', 'both', 4, 35, 12),
  ((SELECT id FROM subj), 'Paper 2', 'Evolution & Classification', 'evolution-classification', '4.6.3', 'both', 2, 25, 13),
  ((SELECT id FROM subj), 'Paper 2', 'Ecology', 'ecology', '4.7', 'both', 2, 30, 14)
ON CONFLICT (subject_id, slug) DO NOTHING;

-- ============================================
-- CHEMISTRY TOPICS
-- ============================================
WITH subj AS (
  SELECT s.id FROM subjects s
  JOIN exam_boards b ON s.board_id = b.id
  WHERE b.code = 'aqa' AND s.slug = 'chemistry'
)
INSERT INTO topics (subject_id, paper, name, slug, spec_ref, tier, difficulty, estimated_minutes, order_index) VALUES
  ((SELECT id FROM subj), 'Paper 1', 'Atomic Structure & Periodic Table', 'atomic-structure', '4.1', 'both', 2, 30, 1),
  ((SELECT id FROM subj), 'Paper 1', 'Bonding, Structure & Properties', 'bonding-structure', '4.2', 'both', 3, 35, 2),
  ((SELECT id FROM subj), 'Paper 1', 'Quantitative Chemistry', 'quantitative-chemistry', '4.3', 'both', 4, 35, 3),
  ((SELECT id FROM subj), 'Paper 1', 'Chemical Changes', 'chemical-changes', '4.4', 'both', 3, 30, 4),
  ((SELECT id FROM subj), 'Paper 1', 'Energy Changes', 'energy-changes', '4.5', 'both', 3, 25, 5),
  ((SELECT id FROM subj), 'Paper 2', 'Rate & Extent of Reactions', 'rate-of-reaction', '4.6', 'both', 3, 30, 6),
  ((SELECT id FROM subj), 'Paper 2', 'Organic Chemistry', 'organic-chemistry', '4.7', 'both', 3, 30, 7),
  ((SELECT id FROM subj), 'Paper 2', 'Chemical Analysis', 'chemical-analysis', '4.8', 'both', 2, 25, 8),
  ((SELECT id FROM subj), 'Paper 2', 'Chemistry of the Atmosphere', 'atmosphere', '4.9', 'both', 2, 25, 9),
  ((SELECT id FROM subj), 'Paper 2', 'Using Resources', 'using-resources', '4.10', 'both', 2, 25, 10)
ON CONFLICT (subject_id, slug) DO NOTHING;

-- ============================================
-- PHYSICS TOPICS
-- ============================================
WITH subj AS (
  SELECT s.id FROM subjects s
  JOIN exam_boards b ON s.board_id = b.id
  WHERE b.code = 'aqa' AND s.slug = 'physics'
)
INSERT INTO topics (subject_id, paper, name, slug, spec_ref, tier, difficulty, estimated_minutes, order_index) VALUES
  ((SELECT id FROM subj), 'Paper 1', 'Energy Stores & Transfers', 'energy', '4.1', 'both', 2, 30, 1),
  ((SELECT id FROM subj), 'Paper 1', 'Electricity', 'electricity', '4.2', 'both', 3, 35, 2),
  ((SELECT id FROM subj), 'Paper 1', 'Particle Model of Matter', 'particle-model', '4.3', 'both', 2, 25, 3),
  ((SELECT id FROM subj), 'Paper 1', 'Atomic Structure & Radiation', 'atomic-radiation', '4.4', 'both', 3, 30, 4),
  ((SELECT id FROM subj), 'Paper 2', 'Forces', 'forces', '4.5', 'both', 3, 35, 5),
  ((SELECT id FROM subj), 'Paper 2', 'Waves', 'waves', '4.6', 'both', 3, 30, 6),
  ((SELECT id FROM subj), 'Paper 2', 'Magnetism & Electromagnetism', 'magnetism', '4.7', 'both', 3, 30, 7),
  ((SELECT id FROM subj), 'Paper 2', 'Space Physics', 'space-physics', '4.8', 'higher', 3, 25, 8)
ON CONFLICT (subject_id, slug) DO NOTHING;

-- ============================================
-- ENGLISH LANGUAGE TOPICS
-- ============================================
WITH subj AS (
  SELECT s.id FROM subjects s
  JOIN exam_boards b ON s.board_id = b.id
  WHERE b.code = 'aqa' AND s.slug = 'english-language'
)
INSERT INTO topics (subject_id, paper, name, slug, spec_ref, tier, difficulty, estimated_minutes, order_index) VALUES
  ((SELECT id FROM subj), 'Paper 1', 'Reading Fiction - Comprehension (Q1-3)', 'paper1-reading-comprehension', 'P1', 'both', 2, 30, 1),
  ((SELECT id FROM subj), 'Paper 1', 'Reading Fiction - Language Analysis (Q2)', 'paper1-language-analysis', 'P1', 'both', 3, 30, 2),
  ((SELECT id FROM subj), 'Paper 1', 'Reading Fiction - Structure Analysis (Q3)', 'paper1-structure-analysis', 'P1', 'both', 3, 25, 3),
  ((SELECT id FROM subj), 'Paper 1', 'Reading Fiction - Evaluation (Q4)', 'paper1-evaluation', 'P1', 'both', 4, 30, 4),
  ((SELECT id FROM subj), 'Paper 1', 'Creative Writing (Q5)', 'paper1-creative-writing', 'P1', 'both', 3, 35, 5),
  ((SELECT id FROM subj), 'Paper 2', 'Reading Non-Fiction - Comprehension (Q1-2)', 'paper2-reading-comprehension', 'P2', 'both', 2, 25, 6),
  ((SELECT id FROM subj), 'Paper 2', 'Reading Non-Fiction - Comparison (Q4)', 'paper2-comparison', 'P2', 'both', 4, 30, 7),
  ((SELECT id FROM subj), 'Paper 2', 'Viewpoint Writing (Q5)', 'paper2-viewpoint-writing', 'P2', 'both', 3, 35, 8)
ON CONFLICT (subject_id, slug) DO NOTHING;

-- ============================================
-- ENGLISH LITERATURE TOPICS
-- ============================================
WITH subj AS (
  SELECT s.id FROM subjects s
  JOIN exam_boards b ON s.board_id = b.id
  WHERE b.code = 'aqa' AND s.slug = 'english-literature'
)
INSERT INTO topics (subject_id, paper, name, slug, spec_ref, tier, difficulty, estimated_minutes, order_index) VALUES
  ((SELECT id FROM subj), 'Paper 1', 'Macbeth', 'macbeth', 'Shakespeare', 'both', 3, 40, 1),
  ((SELECT id FROM subj), 'Paper 1', 'Romeo and Juliet', 'romeo-and-juliet', 'Shakespeare', 'both', 3, 40, 2),
  ((SELECT id FROM subj), 'Paper 2', 'An Inspector Calls', 'inspector-calls', 'Modern Text', 'both', 3, 35, 3),
  ((SELECT id FROM subj), 'Paper 2', 'A Christmas Carol', 'christmas-carol', '19th Century', 'both', 3, 35, 4),
  ((SELECT id FROM subj), 'Paper 2', 'Dr Jekyll & Mr Hyde', 'jekyll-hyde', '19th Century', 'both', 3, 35, 5),
  ((SELECT id FROM subj), 'Paper 2', 'Power & Conflict Poetry', 'power-conflict-poetry', 'Poetry', 'both', 4, 40, 6),
  ((SELECT id FROM subj), 'Paper 2', 'Unseen Poetry', 'unseen-poetry', 'Poetry', 'both', 4, 30, 7)
ON CONFLICT (subject_id, slug) DO NOTHING;
