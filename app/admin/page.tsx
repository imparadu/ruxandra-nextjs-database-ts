export default function AuthPage() {
  return (
    <div className="flex justify-center min-h-screen">
      <form className="flex flex-col space-y-4 p-6 bg-white shadow-md rounded-md">
        <input
          type="email"
          className="px-4 py-2 border rounded-md"
          placeholder="Email"
        />
        <input
          type="password"
          className="px-4 py-2 border rounded-md"
          placeholder="Password"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Login
        </button>
      </form>
    </div>
  );
}
