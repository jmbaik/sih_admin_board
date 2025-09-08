import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { IAdminUser } from "../../actions/admin.user";

export interface AdminUserState {
  adminUser: IAdminUser | null;
  setAdminUser: (adminUser: IAdminUser) => void;
  clearAdminUser: () => void;
}

const useAdminUserStore = create<AdminUserState>()(
  persist(
    (set) => ({
      adminUser: null,
      setAdminUser: (adminUser: IAdminUser) => set({ adminUser }),
      clearAdminUser: () => set({ adminUser: null }),
    }),
    {
      name: "sihAdminBoardStore",
      // storage: createJSONStorage(() => localStorage),
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export default useAdminUserStore;
