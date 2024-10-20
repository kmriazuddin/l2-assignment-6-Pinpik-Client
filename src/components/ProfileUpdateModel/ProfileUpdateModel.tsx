import React, { useState } from "react";
import UploadImageComponent from "../UploadImage/UploadImageComponent";
import { useUserUpdateMutation } from "@/redux/features/auth/auth.api";
import { useTypedSelector } from "@/redux/hooks/useTypedSelector";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/features/auth/authSlice";

type TModal = {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const ProfileUpdateModal = ({ showModal, setShowModal }: TModal) => {
  const [updateUser] = useUserUpdateMutation();
  const token = useTypedSelector((state) => state.auth.token);
  const user = useTypedSelector((state) => state.auth.user);
  const [imgLink, setImgLink] = useState<string>("");
  const dispatch = useDispatch();
  const handleImageUpload = (link: string) => {
    setImgLink(link);
  };

  const handleUpdateProfile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    console.log(name, email);
    const updateInfo = {
      name,
      email,
      avatar: imgLink || user?.avatar,
    };

    try {
      const res = await updateUser({ token, updateInfo });
      if (res.data.success === true) {
        toast.success("You have successfuly chaged the profile");
        const newUserUpdate = {
          id: user?.id,
          email: user?.email,
          name: name || user?.name,
          role: user?.role,
          avatar: imgLink || user?.avatar,
          isPremium: true,
        };
        dispatch(setUser({ user: newUserUpdate, token }));
        setShowModal(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {showModal && (
        <dialog id="my_modal_3" className="modal" open>
          <div className="modal-box bg-white">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button
                onClick={() => setShowModal(false)}
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              >
                ✕
              </button>
            </form>
            <form className="card-body" onSubmit={handleUpdateProfile}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  defaultValue={user?.name}
                  type="text"
                  name="name"
                  placeholder="Name"
                  className="input input-bordered bg-slate-200 text-black"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  defaultValue={user?.email}
                  type="email"
                  name="email"
                  placeholder="email"
                  className="input input-bordered bg-slate-200 text-black"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Avatar</span>
                </label>
                <UploadImageComponent
                  onImageUpload={handleImageUpload}
                ></UploadImageComponent>
              </div>
              <div className="form-control mt-6">
                <button
                  type="submit"
                  className="btn bg-cyan-500 hover:bg-cyan-600 text-white font-bold"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </dialog>
      )}
    </>
  );
};

export default ProfileUpdateModal;
