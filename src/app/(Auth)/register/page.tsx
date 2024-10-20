"use client";

import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Flex, Form, Input, Typography } from "antd";
import toast from "react-hot-toast";
import Link from "next/link";
import UploadImageComponent from "@/components/UploadImage/UploadImageComponent";
import { useState } from "react";
import { useRegisterMutation } from "@/redux/features/auth/auth.api";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface ApiError {
  data?: {
    errorMessages?: { message: string }[];
  };
}

const Register = () => {
  const [imgLink, setImgLink] = useState<string>("");
  const [addUser] = useRegisterMutation();
  const router = useRouter();

  const handleImageUpload = (link: string) => {
    setImgLink(link);
  };

  const onFinish = async (values: any) => {
    const userInfo = {
      ...values,
      role: "user",
      avatar: imgLink || "",
      isPremium: false,
    };
    console.log(values, imgLink || "");

    const toastId = toast.loading("Loading for Sign up");

    try {
      const res = await addUser(userInfo).unwrap();
      console.log(res);

      if (res?.success === true) {
        toast.success("Sign up Successful", { id: toastId, duration: 2000 });
        router.push("/login");
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
        className="pt-12 lg:pt-24 lg:flex-row flex-col max-w-7xl mx-auto"
        justify="space-between"
        align="center"
      >
        <Flex className="w-[45%]">
          <Image
            src={"https://i.ibb.co.com/yfwfG4n/login.png"}
            alt={"image"}
            className="w-full object-cover"
            width={200}
            height={200}
          />
        </Flex>
        <Flex className="w-[45%]" style={{ flexDirection: "column" }}>
          <Typography.Title level={1} style={{ textAlign: "center" }}>
            Register
          </Typography.Title>

          <Form
            name="register"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            style={{ width: "100%", marginTop: "40px" }}
          >
            <Form.Item
              name="name"
              rules={[{ required: true, message: "Please input your Name!" }]}
            >
              <Input prefix={<UserOutlined />} placeholder="Name" />
            </Form.Item>
            <Form.Item
              name="email"
              rules={[{ required: true, message: "Please input your Email!" }]}
            >
              <Input prefix={<MailOutlined />} placeholder="Email" />
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

            <UploadImageComponent onImageUpload={handleImageUpload} />

            <Form.Item>
              <Button block type="primary" htmlType="submit">
                Register
              </Button>
            </Form.Item>
            <p className="text-center mx-auto">
              {`Already have an account?`}{" "}
              <Link href="/login" className="text-rose-500">
                Log in now!
              </Link>
            </p>
          </Form>
        </Flex>
      </Flex>
    </div>
  );
};

export default Register;
