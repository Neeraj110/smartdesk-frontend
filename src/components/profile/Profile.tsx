import { useState } from "react";
import {
  User,
  Mail,
  Calendar,
  Edit,
  Save,
  X,
  Shield,
  Clock,
  UserCircle,
  LogOut,
  Settings,
  Camera,
} from "lucide-react";
import {
  useGetCurrentUserQuery,
  useLogoutMutation,
  useUpdateUserMutation,
} from "@/redux/user/userApi";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import type { User as UserData } from "@/types/types";
import { useDispatch } from "react-redux";
import { clearUser } from "@/redux/user/userSlice";

function Profile() {
  const { data: user, isLoading, isError } = useGetCurrentUserQuery();
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();
  const [logout, { isLoading: isLoggingOut }] = useLogoutMutation();
  const dispatch = useDispatch();

  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState("");
  const [editedEmail, setEditedEmail] = useState("");
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const userData: UserData | undefined = user?.data || user;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleEditStart = () => {
    setEditedName(userData?.name || "");
    setEditedEmail(userData?.email || "");
    setIsEditing(true);
  };

  const handleEditCancel = () => {
    setIsEditing(false);
    setEditedName("");
  };

  const handleEditSave = async () => {
    if (!editedName.trim() && !editedEmail.trim()) {
      toast.error("Name cannot be empty");
      return;
    }
    try {
      await updateUser({
        name: editedName.trim(),
        email: editedEmail.trim(),
      }).unwrap();
      toast.success("Profile updated successfully");
      setIsEditing(false);
    } catch (error) {
      toast.error("Failed to update profile");
      console.error("Update error:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      dispatch(clearUser());
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error("Failed to logout");
      console.error("Logout error:", error);
    }
    setShowLogoutConfirm(false);
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const getMembershipDuration = (createdAt: string) => {
    const created = new Date(createdAt);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - created.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 30) {
      return `${diffDays} days`;
    } else if (diffDays < 365) {
      const months = Math.floor(diffDays / 30);
      return `${months} month${months > 1 ? "s" : ""}`;
    } else {
      const years = Math.floor(diffDays / 365);
      return `${years} year${years > 1 ? "s" : ""}`;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 p-4 sm:p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 dark:border-purple-500"></div>
          </div>
        </div>
      </div>
    );
  }

  if (isError || !userData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 p-4 sm:p-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-red-100 to-red-200 dark:from-red-900/20 dark:to-red-800/20 mb-4">
              <User className="h-8 w-8 text-red-500 dark:text-red-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-2">
              Error loading profile
            </h3>
            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base">
              Please try refreshing the page
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 p-4 sm:p-6 transition-all duration-300">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-xl bg-gradient-to-br from-blue-500/10 to-purple-600/10 dark:from-purple-500/10 dark:to-pink-600/10 border border-blue-500/20 dark:border-purple-500/20">
              <UserCircle className="h-6 w-6 text-blue-500 dark:text-purple-500" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-slate-100">
              Profile
            </h1>
          </div>
          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base">
            Manage your account settings and preferences
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-white/80 dark:bg-slate-800/80 rounded-xl border border-slate-200/50 dark:border-slate-700/50 shadow-lg backdrop-blur-sm">
              <div className="relative p-6 sm:p-8">
                <div className="absolute top-4 right-4">
                  {!isEditing ? (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={handleEditStart}
                      className="text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                  ) : (
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={handleEditSave}
                        disabled={isUpdating}
                        className="text-green-600 dark:text-green-500 hover:bg-green-50 dark:hover:bg-green-900/20"
                      >
                        <Save className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={handleEditCancel}
                        className="text-red-600 dark:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>

                <div className="flex items-start gap-4 sm:gap-6">
                  <div className="relative">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 dark:from-purple-500 dark:to-pink-600 flex items-center justify-center shadow-lg">
                      <span className="text-white font-bold text-xl sm:text-2xl">
                        {getInitials(userData.name)}
                      </span>
                    </div>
                  </div>

                  {/* User Info */}
                  <div className="flex-1 min-w-0">
                    {!isEditing ? (
                      <h2 className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-slate-100 mb-1">
                        {userData.name}
                      </h2>
                    ) : (
                      <input
                        type="text"
                        value={editedName}
                        onChange={(e) => setEditedName(e.target.value)}
                        className="text-xl sm:text-2xl font-bold bg-transparent border-b-2 border-blue-500 dark:border-purple-500 text-slate-800 dark:text-slate-100 focus:outline-none mb-1 w-full"
                        autoFocus
                      />
                    )}
                    <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                      <Mail className="h-4 w-4" />
                      {!isEditing ? (
                        <span className="text-sm sm:text-base truncate">
                          {userData.email}
                        </span>
                      ) : (
                        <input
                          type="text"
                          value={editedEmail}
                          onChange={(e) => setEditedEmail(e.target.value)}
                          className="text-sm sm:text-base font-bold bg-transparent border-b-2 border-blue-500 dark:border-purple-500 text-slate-800 dark:text-slate-100 focus:outline-none mb-1 w-full"
                          autoFocus
                        />
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 mt-2">
                      <Shield className="h-4 w-4" />
                      <span className="text-sm">
                        Member for {getMembershipDuration(userData.createdAt)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 sm:p-8 border-t border-slate-200 dark:border-slate-700">
                <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4">
                  Account Information
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-600 dark:text-slate-300">
                      Email Address
                    </label>
                    <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700">
                      <span className="text-sm text-slate-700 dark:text-slate-300">
                        {userData.email}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white/80 dark:bg-slate-800/80 rounded-xl border border-slate-200/50 dark:border-slate-700/50 shadow-lg backdrop-blur-sm p-6">
              <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4">
                Account Timeline
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900/20">
                    <Calendar className="h-4 w-4 text-green-600 dark:text-green-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-800 dark:text-slate-100">
                      Account Created
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {formatDate(userData.createdAt)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/20">
                    <Clock className="h-4 w-4 text-blue-600 dark:text-blue-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-800 dark:text-slate-100">
                      Last Updated
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {formatDate(userData.updatedAt)}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white/80 dark:bg-slate-800/80 rounded-xl border border-slate-200/50 dark:border-slate-700/50 shadow-lg backdrop-blur-sm p-6">
              <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4">
                Quick Actions
              </h3>
              <div className="space-y-3">
                <Button
                  variant="ghost"
                  className="w-full justify-start text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                  onClick={() => toast.info("Feature coming soon!")}
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Account Settings
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => setShowLogoutConfirm(true)}
                  className="w-full justify-start text-red-600 dark:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </Button>
              </div>
            </div>
          </div>
        </div>

       
        {showLogoutConfirm && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-md w-full">
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-full bg-red-100 dark:bg-red-900/20">
                    <LogOut className="h-5 w-5 text-red-600 dark:text-red-500" />
                  </div>
                  <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100">
                    Sign Out
                  </h2>
                </div>
                <p className="text-slate-600 dark:text-slate-300 mb-6">
                  Are you sure you want to sign out? You'll need to sign in
                  again to access your account.
                </p>
                <div className="flex gap-3">
                  <Button
                    variant="ghost"
                    onClick={() => setShowLogoutConfirm(false)}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleLogout}
                    disabled={isLoggingOut}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white"
                  >
                    {isLoggingOut ? "Signing out..." : "Sign Out"}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;
