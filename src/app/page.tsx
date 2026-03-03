import { toast } from "sonner";
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";
export default function Home() {

return (
  <div className="flex items-center justify-center min-h-screen bg-background">
    <OrganizationSwitcher />
    <UserButton />
  </div>
);
}