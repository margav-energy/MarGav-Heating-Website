import { useMemo, useState } from 'react';

const TERM_OPTIONS = [
  { value: 12, label: '12 months (1 year)' },
  { value: 24, label: '24 months (2 years)' },
  { value: 36, label: '36 months (3 years)' },
  { value: 48, label: '48 months (4 years)' },
  { value: 60, label: '60 months (5 years)' },
  { value: 120, label: '120 months (10 years)' },
  { value: 180, label: '180 months (15 years)' },
];

const INTEREST_FREE_APR = 0;
const INTEREST_BEARING_APR = 9.9;
const ONE_YEAR_TERM = 12;
const APR_TERM_MAP: Record<number, number[]> = {
  [INTEREST_FREE_APR]: [12],
  [INTEREST_BEARING_APR]: [24, 36, 48, 60, 120, 180],
};

const formatGBP = (value: number) =>
  new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Number.isFinite(value) ? value : 0);

const parseAmount = (rawValue: string) => {
  const parsed = Number(rawValue);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 0;
};

const calculateMonthlyPayment = (principal: number, apr: number, termMonths: number) => {
  if (principal <= 0 || termMonths <= 0) return 0;
  const monthlyRate = apr / 100 / 12;

  if (monthlyRate === 0) {
    return principal / termMonths;
  }

  const factor = Math.pow(1 + monthlyRate, termMonths);
  return (principal * monthlyRate * factor) / (factor - 1);
};

const APR_OPTIONS = [INTEREST_FREE_APR, INTEREST_BEARING_APR];

export function FinanceCalculator() {
  const [selectedApr, setSelectedApr] = useState<number>(INTEREST_FREE_APR);
  const [purchasePriceInput, setPurchasePriceInput] = useState('');
  const [depositInput, setDepositInput] = useState('');
  const [termMonthsInput, setTermMonthsInput] = useState(String(ONE_YEAR_TERM));

  const availableTermOptions = TERM_OPTIONS.filter((option) =>
    APR_TERM_MAP[selectedApr]?.includes(option.value),
  );

  const calculations = useMemo(() => {
    const purchasePrice = parseAmount(purchasePriceInput);
    const deposit = parseAmount(depositInput);
    const termMonths = Number(termMonthsInput) || 0;
    const principal = Math.max(purchasePrice - deposit, 0);
    const apr = selectedApr;
    const monthlyPayment = calculateMonthlyPayment(principal, apr, termMonths);
    const totalRepayable = monthlyPayment * termMonths;
    const interestPaid = Math.max(totalRepayable - principal, 0);
    const financeMode = apr === 0 ? 'Interest Free' : 'Interest Bearing';

    return {
      purchasePrice,
      deposit,
      termMonths,
      principal,
      apr,
      monthlyPayment,
      totalRepayable,
      interestPaid,
      financeMode,
    };
  }, [depositInput, purchasePriceInput, selectedApr, termMonthsInput]);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="inline-block text-sm font-semibold text-[#3333cc] uppercase tracking-wide">
            Finance Calculator
          </span>
          <h1 className="mt-2 text-3xl md:text-4xl font-bold text-gray-900">
            Estimate your monthly repayments
          </h1>
          <p className="mt-4 text-gray-600 leading-relaxed">
            Estimate monthly repayments for your installation. Figures are a guide only and final
            terms are confirmed during application.
          </p>
        </div>

        <div className="mx-auto max-w-3xl bg-gray-50 rounded-2xl border border-gray-200 p-6 md:p-10">
          <div
            className="mb-6 grid grid-cols-2 overflow-hidden rounded-full border border-[#3333cc]"
            role="group"
            aria-label="APR selection"
          >
            {APR_OPTIONS.map((aprOption) => (
              <button
                key={aprOption}
                type="button"
                className={`px-4 py-3 text-center text-xs font-bold uppercase tracking-wide transition-colors ${
                  selectedApr === aprOption
                    ? 'bg-[#3333cc] text-white'
                    : 'bg-white text-[#3333cc] hover:bg-[#3333cc]/10'
                }`}
                onClick={() => {
                  setSelectedApr(aprOption);
                  const nextTerms = APR_TERM_MAP[aprOption] || [];
                  const nextValue = Number(termMonthsInput);
                  setTermMonthsInput(
                    nextTerms.includes(nextValue) ? String(nextValue) : String(nextTerms[0] || ''),
                  );
                }}
              >
                {aprOption.toFixed(2)}% APR
              </button>
            ))}
          </div>

          <div className="mb-6 grid gap-4 md:grid-cols-2">
            <label className="text-sm font-semibold text-gray-900">
              Total system cost (GBP)
              <input
                type="number"
                min="0"
                step="100"
                value={purchasePriceInput}
                onChange={(e) => setPurchasePriceInput(e.target.value)}
                placeholder="Enter total system cost"
                className="mt-2 w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-sm text-gray-900 focus:outline-none focus:border-[#3333cc]"
              />
            </label>

            <label className="text-sm font-semibold text-gray-900">
              Deposit (GBP)
              <input
                type="number"
                min="0"
                step="100"
                value={depositInput}
                onChange={(e) => setDepositInput(e.target.value)}
                placeholder="Enter deposit amount"
                className="mt-2 w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-sm text-gray-900 focus:outline-none focus:border-[#3333cc]"
              />
            </label>

            <label className="text-sm font-semibold text-gray-900 md:col-span-2">
              Select Loan Term
              <select
                value={termMonthsInput}
                onChange={(e) => setTermMonthsInput(e.target.value)}
                className="mt-2 w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-sm text-gray-900 focus:outline-none focus:border-[#3333cc]"
              >
                <option value="">Select Loan Term</option>
                {availableTermOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="mb-2 text-right text-lg font-bold text-gray-900">{calculations.financeMode}</div>

          <div className="rounded-2xl border border-gray-200 bg-white">
            <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
              <span className="text-gray-600">Amount of credit</span>
              <strong className="text-lg text-gray-900">{formatGBP(calculations.principal)}</strong>
            </div>
            <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
              <span className="text-gray-600">Monthly</span>
              <strong className="text-lg text-gray-900">{formatGBP(calculations.monthlyPayment)}</strong>
            </div>
            <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
              <span className="text-gray-600">Total repayable</span>
              <strong className="text-lg text-gray-900">{formatGBP(calculations.totalRepayable)}</strong>
            </div>
            <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
              <span className="text-gray-600">Interest paid</span>
              <strong className="text-lg text-gray-900">{formatGBP(calculations.interestPaid)}</strong>
            </div>
            <div className="flex items-center justify-between px-6 py-4">
              <span className="text-gray-600">APR</span>
              <strong className="text-lg text-[#3333cc]">{calculations.apr.toFixed(2)}% APR</strong>
            </div>
          </div>

          <div className="mt-6 space-y-3 text-xs leading-relaxed text-gray-600">
            <p>
              <strong className="text-gray-900">Margav Renewables Ltd</strong> is an Introducer Appointed
              Representative of Ideal Sales Solutions Ltd, t/a Ideal4Finance. Ideal Sales Solutions Ltd is a
              credit broker and not a lender (FRN 703401). Finance available subject to status. The rate offered
              is always provisional and will depend upon your personal circumstances, the loan amount and the
              term.
            </p>
            <p>
              Representative example: <strong className="text-gray-900">{calculations.apr.toFixed(2)}% APR</strong>{' '}
              based on a loan of <strong className="text-gray-900">{formatGBP(calculations.principal)}</strong>{' '}
              repayable over <strong className="text-gray-900">{calculations.termMonths || 0}</strong> months at
              an interest rate of <strong className="text-gray-900">{calculations.apr.toFixed(2)}% APR</strong>{' '}
              pa (fixed), with monthly repayment of{' '}
              <strong className="text-gray-900">{formatGBP(calculations.monthlyPayment)}</strong> and total
              amount payable <strong className="text-gray-900">{formatGBP(calculations.totalRepayable)}</strong>.
            </p>
            <p>
              Please note: the finance calculator provides only a guide and the exact amounts will be confirmed
              during the application process.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
