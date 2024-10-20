import React, { useEffect, useState, useMemo } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useTypedSelector } from "@/redux/hooks/useTypedSelector";
import { usePaymentMutation } from "@/redux/features/payment/payment.api";
import { useUserUpdateMutation } from "@/redux/features/auth/auth.api";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/features/auth/authSlice";
import { useGetPostByUserIdQuery } from "@/redux/features/posts/posts.api";
import { IPost } from "@/types/post.type";

const CheckoutForm = ({ price }: { price: number }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch();

  const token = useTypedSelector((state) => state.auth.token);
  const user = useTypedSelector((state) => state.auth.user);
  const userId = user?.id;

  const data = useMemo(() => ({ price }), [price]);

  const [makePayment] = usePaymentMutation();
  const [statusUpdate] = useUserUpdateMutation();

  useEffect(() => {
    const createPaymentIntent = async () => {
      try {
        const res = await makePayment({ token, data });
        console.log(res);

        if (res?.data?.clientSecret) {
          setClientSecret(res.data.clientSecret);
        }
      } catch (error) {
        console.log(error);
        setError("Failed to initialize payment.");
      }
    };

    createPaymentIntent();
  }, [makePayment, token, data]);

  const { data: userPosts, isLoading } = useGetPostByUserIdQuery(
    { userId, token },
    { skip: !data }
  );
  if (isLoading) {
    return (
      <div className="flex justify-center items-center m-auto">
        <span className="loading loading-spinner loading-lg text-info"></span>
      </div>
    );
  }

  const totalUpvote = userPosts?.data?.reduce(
    (acc: number, curr: IPost) => acc + curr.upvotes,
    0
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (user?.isPremium === true) {
      return toast.error("You already a premium member");
    }
    if (totalUpvote < 1) {
      return toast.error("You don't have minimum upvote to get verified");
    }

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    if (!card) {
      return;
    }

    const { error: cardError } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (cardError) {
      setError(cardError.message || "");
      return;
    }

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email,
            name: user?.name,
          },
        },
      });

    if (confirmError) {
      setError(confirmError.message || "");
      return;
    }

    if (paymentIntent?.status === "succeeded") {
      setTransactionId(paymentIntent.id);
      const updateInfo = {
        isPremium: true,
      };

      try {
        const res = await statusUpdate({ token, updateInfo });
        if (res.data.success === true) {
          toast.success("payment complete you are now premium member");

          const newUserUpdate = {
            id: user?.id,
            email: user?.email,
            name: user?.name,
            role: user?.role,
            avatar: user?.avatar,
            isPremium: true,
          };
          dispatch(setUser({ user: newUserUpdate, token }));
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ textAlign: "center" }}>
      <CardElement />
      <button
        className="btn hover:bg-cyan-800 bg-rose-300"
        type="submit"
        disabled={!stripe || !clientSecret}
        style={{
          marginTop: 50,
          textAlign: "center",
          padding: 5,
          width: 100,
          backgroundColor: "#2DA64D",
          color: "white",
          fontWeight: "bold",
        }}
      >
        Pay
      </button>
      {error && <p>{error}</p>}
      {transactionId && <p>Your transaction id: {transactionId}</p>}
    </form>
  );
};

export default CheckoutForm;
