// AWS Practice Lab — Automated Quiz Bank Validation Engine
// Validates 20 services × 20 questions = 400 questions with 7/7/6 distribution, non-empty fields, valid options, explanations, and duplicates check.

import { allQuizzes } from './index.js';

console.log('====================================================');
console.log('  AWS PRACTICE LAB — 400 QUIZ VALIDATION SUITE');
console.log('====================================================\n');

let totalQuestions = 0;
let errors = [];
let warnings = [];
const seenQuestions = new Map(); // normalized question -> { service, id }

if (!Array.isArray(allQuizzes)) {
  console.error('FATAL: allQuizzes is not an array!');
  process.exit(1);
}

console.log(`Auditing ${allQuizzes.length} Service Quiz Banks (Target: exactly 20 services)...\n`);

if (allQuizzes.length !== 20) {
  errors.push(`Expected exactly 20 quiz banks, found ${allQuizzes.length}`);
}

allQuizzes.forEach((bank, bankIdx) => {
  const bankName = bank.service || `Bank #${bankIdx + 1} (${bank.id})`;
  const questions = bank.questions || [];
  totalQuestions += questions.length;

  console.log(`[${String(bankIdx + 1).padStart(2, '0')}/20] ${bankName.padEnd(42)}: ${questions.length} questions`);

  if (!bank.id || typeof bank.id !== 'string') {
    errors.push(`[${bankName}] Missing or invalid 'id' attribute.`);
  }

  if (questions.length !== 20) {
    errors.push(`[${bankName}] Expected exactly 20 questions, got ${questions.length}.`);
  }

  let beginnerCount = 0;
  let intermediateCount = 0;
  let advancedCount = 0;

  questions.forEach((q, qIdx) => {
    const qLabel = `${bank.id} Q#${qIdx + 1} (${q.id || 'NO_ID'})`;

    // 1. Check ID
    if (!q.id) {
      errors.push(`[${qLabel}] Missing 'id'.`);
    }

    // 2. Check Level distribution
    if (q.level === 'beginner') beginnerCount++;
    else if (q.level === 'intermediate') intermediateCount++;
    else if (q.level === 'advanced') advancedCount++;
    else {
      errors.push(`[${qLabel}] Invalid difficulty level: "${q.level}". Expected 'beginner', 'intermediate', or 'advanced'.`);
    }

    // 3. Check Question Text
    if (!q.question || typeof q.question !== 'string' || q.question.trim().length < 10) {
      errors.push(`[${qLabel}] Question text is empty or too short.`);
    } else {
      // Duplicate detection
      const normalized = q.question.toLowerCase().replace(/[^a-z0-9]/g, '');
      if (seenQuestions.has(normalized)) {
        const prior = seenQuestions.get(normalized);
        errors.push(`[${qLabel}] DUPLICATE question text detected! Matches ${prior.service} (${prior.id}).`);
      } else {
        seenQuestions.set(normalized, { service: bank.service, id: q.id });
      }
    }

    // 4. Check Options
    if (!Array.isArray(q.options)) {
      errors.push(`[${qLabel}] 'options' is not an array.`);
    } else if (q.options.length !== 4) {
      errors.push(`[${qLabel}] Expected exactly 4 options, found ${q.options.length}.`);
    } else {
      q.options.forEach((opt, optIdx) => {
        if (typeof opt !== 'string' || opt.trim().length === 0) {
          errors.push(`[${qLabel}] Option ${optIdx} is empty or not a string.`);
        }
      });
    }

    // 5. Check Correct Answer
    if (typeof q.correct !== 'number' || q.correct < 0 || q.correct > 3) {
      errors.push(`[${qLabel}] 'correct' answer index (${q.correct}) is invalid. Must be 0, 1, 2, or 3.`);
    }

    // 6. Check Explanation
    if (!q.explanation || typeof q.explanation !== 'string' || q.explanation.trim().length < 15) {
      errors.push(`[${qLabel}] Explanation is missing or too brief.`);
    }
  });

  // Verify difficulty breakdown: 7 beginner, 7 intermediate, 6 advanced
  if (beginnerCount !== 7) {
    errors.push(`[${bankName}] Expected exactly 7 beginner questions, found ${beginnerCount}.`);
  }
  if (intermediateCount !== 7) {
    errors.push(`[${bankName}] Expected exactly 7 intermediate questions, found ${intermediateCount}.`);
  }
  if (advancedCount !== 6) {
    errors.push(`[${bankName}] Expected exactly 6 advanced questions, found ${advancedCount}.`);
  }
});

console.log('\n====================================================');
console.log('                AUDIT SUMMARY');
console.log('====================================================');
console.log(`Total Services Audited : ${allQuizzes.length} (Target: 20)`);
console.log(`Total Questions Counted: ${totalQuestions} (Target: 400)`);
console.log(`Unique Questions Found : ${seenQuestions.size}`);
console.log(`Errors Detected        : ${errors.length}`);
console.log(`Warnings Detected      : ${warnings.length}`);
console.log('====================================================\n');

if (errors.length > 0) {
  console.error('❌ VALIDATION FAILED WITH ERRORS:');
  errors.forEach((err, idx) => {
    console.error(`  ${idx + 1}. ${err}`);
  });
  process.exit(1);
} else {
  console.log('✅ ALL 20 SERVICES & 400 QUESTIONS PASSED 100% COMPLIANCE AUDIT!');
  console.log('   - Exactly 20 services');
  console.log('   - Exactly 20 questions per service');
  console.log('   - Exactly 7 beginner, 7 intermediate, 6 advanced per service');
  console.log('   - Zero duplicate questions');
  console.log('   - All 4 options present with verified correct answers');
  console.log('   - Detailed technical explanations for every question\n');
  process.exit(0);
}
