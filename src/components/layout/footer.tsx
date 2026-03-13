import Link from "next/link";
import { BookOpen } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-indigo-600" />
              <span className="font-bold">
                GCSE<span className="text-indigo-600">Revise</span>
              </span>
            </Link>
            <p className="mt-3 text-sm text-zinc-500 dark:text-zinc-400">
              Free GCSE revision for every student in the UK. All exam boards, all subjects.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold">Subjects</h4>
            <ul className="mt-3 space-y-2 text-sm text-zinc-500 dark:text-zinc-400">
              <li><Link href="/subjects/aqa/maths" className="hover:text-indigo-600">Maths</Link></li>
              <li><Link href="/subjects/aqa/english-language" className="hover:text-indigo-600">English</Link></li>
              <li><Link href="/subjects/aqa/biology" className="hover:text-indigo-600">Biology</Link></li>
              <li><Link href="/subjects/aqa/chemistry" className="hover:text-indigo-600">Chemistry</Link></li>
              <li><Link href="/subjects/aqa/physics" className="hover:text-indigo-600">Physics</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold">Resources</h4>
            <ul className="mt-3 space-y-2 text-sm text-zinc-500 dark:text-zinc-400">
              <li><Link href="/past-papers" className="hover:text-indigo-600">Past Papers</Link></li>
              <li><Link href="/subjects" className="hover:text-indigo-600">All Subjects</Link></li>
              <li><Link href="/auth/signup" className="hover:text-indigo-600">Sign Up</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold">Exam Boards</h4>
            <ul className="mt-3 space-y-2 text-sm text-zinc-500 dark:text-zinc-400">
              <li><Link href="/subjects/aqa" className="hover:text-indigo-600">AQA</Link></li>
              <li><Link href="/subjects/edexcel" className="hover:text-indigo-600">Edexcel</Link></li>
              <li><Link href="/subjects/ocr" className="hover:text-indigo-600">OCR</Link></li>
              <li><Link href="/subjects/wjec" className="hover:text-indigo-600">WJEC</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-zinc-200 pt-8 dark:border-zinc-800">
          <p className="text-center text-sm text-zinc-400">
            &copy; {new Date().getFullYear()} GCSERevise. Free for all UK students. Not affiliated with any exam board.
          </p>
        </div>
      </div>
    </footer>
  );
}
