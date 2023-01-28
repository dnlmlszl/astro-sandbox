import { FieldError, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import type { ReactNode } from "react";

type Values = {
  email: string;
  name: string;
};

const schema = yup.object({
  email: yup.string().email().required("Email address is required!"),
  name: yup.string().required("Name is required!"),
});

const ContactUsForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Values>({
    resolver: yupResolver(schema),
  });
  const onSubmit = (values: Values) => {
    console.log(values);
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="border border-gray-200 rounded-lg w-[576px] mt-8 py-4 px-5"
    >
      <input
        type="text"
        {...register("name")}
        className="w-full block border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-200"
        placeholder="John Doe"
      />
      {errors.name && <ErrorMessage error={errors.name} />}
      <input
        type="email"
        {...register("email")}
        className="w-full block border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-200 mt-4"
        placeholder="example@example.com"
      />
      {errors.email && <ErrorMessage error={errors.email} />}
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2.5 mt-3.5 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-500 focus:outline-none active:ring-4 active:ring-blue-500"
      >
        Submit Form
      </button>
    </form>
  );
};

type ErrorMessageProps = {
  error?: FieldError;
};

const ErrorMessage = ({ error }: ErrorMessageProps) => {
  return <div className="mt-2 text-red-700">{error?.message}</div>;
};

export default ContactUsForm;
