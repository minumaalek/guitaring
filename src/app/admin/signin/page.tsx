import Input from "@/components/common/input";
export default function AdminSignInPage() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-1/3 flex-col-center bg-blue-400/50 p-10 rounded-2xl h-80">
        <h1 className="text-blue-600 mb-10">Sign in as an admin</h1>
        <div className="w-2/3 flex-col-center">
          <Input placeholder="Username" />
          <Input placeholder="Password" />
          <button className="main-gradient">Sign in</button>
        </div>
      </div>
    </div>
  );
}
