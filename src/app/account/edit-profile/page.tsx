import EditProfileForm from "@/components/account/edit-profile-form";
import { getSession } from "@/lib/check-auth";
import { updateProfile, changePassword } from "@/actions/auth-actions";
export default async function EditProfilePage() {
  const session = await getSession();
  return (
    <div>
      <h1>Edit your profile</h1>
      <EditProfileForm
        info={session?.user}
        updateProfile={updateProfile}
        changePassword={changePassword}
      />
    </div>
  );
}
