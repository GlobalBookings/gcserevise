import Link from "next/link";
import { BookOpenCheck } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500"><BookOpenCheck className="h-4 w-4" /></span>
              <span className="font-black">
                GCSE<span className="text-indigo-400">Revise</span>
              </span>
            </Link>
            <p className="mt-3 max-w-xs text-sm leading-6 text-slate-400">
              A clearer, smarter way to revise Maths, Science, Geography and History.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold">Subjects</h4>
            <ul className="mt-3 space-y-2 text-sm text-slate-400">
              <li><Link href="/subjects/aqa/maths" className="hover:text-indigo-600">Maths</Link></li>
              <li><Link href="/subjects/aqa/biology" className="hover:text-indigo-600">Biology</Link></li>
              <li><Link href="/subjects/aqa/chemistry" className="hover:text-indigo-600">Chemistry</Link></li>
              <li><Link href="/subjects/aqa/physics" className="hover:text-indigo-600">Physics</Link></li>
              <li><Link href="/subjects/aqa/geography" className="hover:text-indigo-600">Geography</Link></li>
              <li><Link href="/subjects/aqa/history" className="hover:text-indigo-600">History</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold">Resources</h4>
            <ul className="mt-3 space-y-2 text-sm text-slate-400">
              <li><Link href="/past-papers" className="hover:text-indigo-600">Past Papers</Link></li>
              <li><Link href="/subjects" className="hover:text-indigo-600">All Subjects</Link></li>
              <li><Link href="/my-revision" className="hover:text-indigo-600">My Revision</Link></li>
              <li><Link href="/#premium" className="hover:text-indigo-600">Premium</Link></li>
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
