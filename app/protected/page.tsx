import { InfoIcon } from "lucide-react";

// Dummy user data
const dummyUser = {
  id: "1",
  name: "John Doe",
  email: "john@example.com",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
  role: "user"
}

export default async function ProtectedPage() {
  return (
    <div className="flex-1 w-full flex flex-col gap-12">
      <div className="w-full">
        <div className="bg-accent text-sm p-3 px-5 rounded-md text-foreground flex gap-3 items-center">
          <InfoIcon size="16" strokeWidth={2} />
          This is a protected page that you can only see as an authenticated
          user
        </div>
      </div>
      <div className="flex flex-col gap-2 items-start">
        <h2 className="font-bold text-2xl mb-4">Your user details</h2>
        <div className="flex items-center gap-4 p-4 border rounded-lg">
          <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
            <span className="text-lg font-bold text-gray-600">
              {dummyUser.name.charAt(0)}
            </span>
          </div>
          <div>
            <h3 className="font-semibold">{dummyUser.name}</h3>
            <p className="text-sm text-gray-600">{dummyUser.email}</p>
            <p className="text-xs text-gray-500">Role: {dummyUser.role}</p>
          </div>
        </div>
      </div>
      <div>
        <h2 className="font-bold text-2xl mb-4">Recent Bills</h2>
        <div className="space-y-3">
          <div className="p-4 border rounded-lg">
            <h3 className="font-medium">Mario&apos;s Pizzeria</h3>
            <p className="text-sm text-gray-600">£35.96 • 3 people</p>
            <p className="text-xs text-gray-500">July 23, 2025</p>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-medium">Coffee Shop</h3>
            <p className="text-sm text-gray-600">£12.50 • 2 people</p>
            <p className="text-xs text-gray-500">July 22, 2025</p>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-medium">Thai Restaurant</h3>
            <p className="text-sm text-gray-600">£45.20 • 4 people</p>
            <p className="text-xs text-gray-500">July 21, 2025</p>
          </div>
        </div>
      </div>
    </div>
  );
}
