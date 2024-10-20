"use client";

import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Flex, Form, Input, Typography } from "antd";
import Lottie from "lottie-react";
import signup from "../../assests/signup.json";
import toast from "react-hot-toast";
import Link from "next/link";
import { useLoginMutation } from "@/redux/features/auth/auth.api";
import { verifyToken } from "@/utils/verifyToken";
import { useAppDispatch } from "@/redux/hooks/useTypedSelector";
import { setUser } from "@/redux/features/auth/authSlice";
import { useRouter } from "next/navigation";

interface ApiError {
  data?: {
    errorMessages?: { message: string }[];
  };
}

const Login = () => {
  const dispatch = useAppDispatch();

  const [userLogin] = useLoginMutation();
  const router = useRouter();
  const onFinish = async (values: any) => {
    const toastId = toast.loading("Loading for Login");

    try {
      const res = await userLogin(values).unwrap();
      if (res?.success === true) {
        const user = verifyToken(res?.token);
        console.log("user", user);
        //* set user & token to local state
        dispatch(setUser({ user: user, token: res?.token }));
        toast.success("Login Successful", { id: toastId, duration: 2000 });
        router.push("/");
      }
    } catch (err) {
      const typedErr = err as ApiError;
      const errorMessage =
        typedErr.data?.errorMessages?.[0]?.message || "Something went wrong";
      toast.error(errorMessage, { id: toastId, duration: 2000 });
      // console.log(err);
    }
  };
  return (
    <div className="bg-white h-screen">
      <Flex
        className="pt-24 max-w-7xl mx-auto"
        justify="space-between"
        align="center"
      >
        <Flex className="w-[45%]">          
        <Lottie animationData={signup} loop={true} width={400} height={400} />
        </Flex>
        <Flex className="w-[45%]" style={{ flexDirection: "column" }}>
          <Typography.Title level={1} style={{ textAlign: "center" }}>
            LOGIN
          </Typography.Title>

          <Form
            name="login"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            style={{ width: "100%", marginTop: "40px" }}
          >
            <Form.Item
              name="email"
              rules={[
                { required: true, message: "Please input your Username!" },
              ]}
            >
              <Input prefix={<UserOutlined />} placeholder="Email" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your Password!" },
              ]}
            >
              <Input
                prefix={<LockOutlined />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item>
              <Flex justify="space-between" align="center">
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox>Remember me</Checkbox>
                </Form.Item>
              </Flex>
            </Form.Item>

            <Form.Item>
              <Button block type="primary" htmlType="submit">
                Log in
              </Button>
            </Form.Item>
            <p className="text-center mx-auto">
              {`Don't have an account?`}{" "}
              <Link href="/register" className="text-rose-500">
                Register now!
              </Link>
            </p>
          </Form>
        </Flex>
      </Flex>
    </div>
  );
};

export default Login;
