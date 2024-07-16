"use client";
import scss from "./TelegramContact.module.scss";
import { SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";

interface IFromTelegram {
  username: string;
  email: string;
  subject: string;
  description: string;
}

const TelegramContact = () => {
  const { register, handleSubmit } = useForm<IFromTelegram>();

  const TOKEN = process.env.NEXT_PUBLIC_TG_TOKEN;
  const CHAT_ID = process.env.NEXT_PUBLIC_TG_CHAT_ID;

  const messageModel = (data: IFromTelegram) => {
    let messageTG = `Username: <b>${data.username}</b>\n`;
    messageTG += `Email Addrass: <b> ${data.email}</b>\n`;
    messageTG += `Subject: <b> ${data.subject}</b>\n`;
    messageTG += `Description: <b>${data.description}</b>`;
    return messageTG;
  };

  const onSubmit: SubmitHandler<IFromTelegram> = async (data) => {
    try {
      const res = await axios.post(
        `https://api.telegram.org/bot${TOKEN}/sendMessage`,
        {
          chat_id: CHAT_ID,
          parse_mode: "html",
          text: messageModel(data),
        }
      );
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className={scss.TelegramContact}>
      <div className="container">
        <div className={scss.content}>
          <h1>TelegramContact</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              placeholder="username"
              type="text"
              {...register("username", { required: true })}
            />
            <input
              placeholder="email"
              type="text"
              {...register("email", { required: true })}
            />
            <input
              placeholder="subject"
              type="text"
              {...register("subject", { required: true })}
            />
            <input
              placeholder="description"
              type="text"
              {...register("description", { required: true })}
            />
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TelegramContact;
