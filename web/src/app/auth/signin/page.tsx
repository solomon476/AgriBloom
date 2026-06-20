import Link from "next/link";

export default function SignIn() {
  return (
    <div className="w-full max-w-md mx-auto space-y-8 p-8 bg-white rounded-2xl shadow-xl border border-primary/10 mt-12">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-extrabold text-primary">Welcome Back</h1>
        <p className="text-foreground/70">Sign in to your AgriBloom account</p>
      </div>

      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-foreground/80 mb-1">Email or Phone Number</label>
          <input 
            type="text" 
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
            placeholder="0712345678"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground/80 mb-1">Password</label>
          <input 
            type="password" 
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
            placeholder="••••••••"
          />
        </div>

        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" className="rounded text-primary focus:ring-primary" />
            <span>Remember me</span>
          </label>
          <a href="#" className="text-primary hover:underline font-medium">Forgot password?</a>
        </div>

        <Link href="/dashboard" className="block w-full text-center bg-primary hover:bg-primary/90 text-white py-3 rounded-lg font-bold text-lg transition-all shadow-md mt-4">
          Sign In
        </Link>
      </form>

      <p className="text-center text-sm text-foreground/60">
        Don't have an account? <a href="#" className="text-primary hover:underline font-medium">Sign up</a>
      </p>
    </div>
  );
}
