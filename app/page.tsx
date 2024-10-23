import Link from 'next/link';

// Landing page
export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold mb-8">Welcome to Our App</h1>
      <p className="text-xl mb-8">Discover amazing features and boost your productivity!</p>
      <Link href="/login">
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
          Login
        </button>
      </Link>
    </div>
  );
}
