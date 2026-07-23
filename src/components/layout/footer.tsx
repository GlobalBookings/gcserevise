import Link from "next/link";
import { BrandLogo } from "@/components/brand/brand-logo";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" aria-label="GCSERevise home" className="inline-flex rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950">
              <BrandLogo inverted compact />
            </Link>
            <p className="mt-3 max-w-xs text-sm leading-6 text-slate-400">
              A clearer, smarter way to revise Maths, Science, English, Geography and History.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold">Subjects</h4>
            <ul className="mt-3 space-y-2 text-sm text-slate-400">
              <li><Link href="/subjects/aqa/combined-science" className="hover:text-indigo-600">Combined Science</Link></li>
              <li><Link href="/subjects/aqa/maths" className="hover:text-indigo-600">Maths</Link></li>
              <li><Link href="/subjects/aqa/biology" className="hover:text-indigo-600">Biology</Link></li>
              <li><Link href="/subjects/aqa/chemistry" className="hover:text-indigo-600">Chemistry</Link></li>
              <li><Link href="/subjects/aqa/physics" className="hover:text-indigo-600">Physics</Link></li>
              <li><Link href="/subjects/aqa/geography" className="hover:text-indigo-600">Geography</Link></li>
              <li><Link href="/subjects/aqa/history" className="hover:text-indigo-600">History</Link></li>
              <li><Link href="/subjects/aqa/english-language" className="hover:text-indigo-600">English Language</Link></li>
              <li><Link href="/subjects/aqa/english-literature" className="hover:text-indigo-600">English Literature</Link></li>
              <li><Link href="/subjects/aqa/religious-studies" className="hover:text-indigo-600">Religious Studies</Link></li>
              <li><Link href="/subjects/aqa/computer-science" className="hover:text-indigo-600">Computer Science</Link></li>
              <li><Link href="/subjects/aqa/business" className="hover:text-indigo-600">Business</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold">Resources</h4>
            <ul className="mt-3 space-y-2 text-sm text-slate-400">
              <li><Link href="/past-papers" className="hover:text-indigo-600">Past Papers</Link></li>
              <li><Link href="/subjects" className="hover:text-indigo-600">All Subjects</Link></li>
              <li><Link href="/my-revision" className="hover:text-indigo-600">My Revision</Link></li>
              <li><Link href="/search" className="hover:text-indigo-600">Search</Link></li>
              <li><Link href="/exam-resources" className="hover:text-indigo-600">Exam Resources</Link></li>
              <li><Link href="/premium" className="hover:text-indigo-600">Premium</Link></li>
              <li><Link href="/editorial-standards" className="hover:text-indigo-600">Editorial Standards</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold">Exam Boards</h4>
            <ul className="mt-3 space-y-2 text-sm text-slate-400">
              <li><Link href="/subjects/aqa" className="hover:text-indigo-600">AQA</Link></li>
              <li><Link href="/subjects/edexcel" className="hover:text-indigo-600">Edexcel</Link></li>
              <li><Link href="/subjects/ocr" className="hover:text-indigo-600">OCR</Link></li>
              <li><Link href="/subjects/wjec" className="hover:text-indigo-600">WJEC</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-slate-800 pt-8">
          <p className="text-center text-sm text-slate-500">
            &copy; {new Date().getFullYear()} GCSERevise. Not affiliated with any exam board.
          </p>
        </div>
      </div>
    </footer>
  );
}
