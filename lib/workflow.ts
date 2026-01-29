import { Client as WorkflowClient } from "@upstash/workflow";
import { Client as QStashClient, resend } from "@upstash/qstash";
import config from "@/lib/config";
import emailjs from '@emailjs/nodejs';

export const workflowClient = new WorkflowClient({
  baseUrl: config.env.upstash.qstashUrl,
  token: config.env.upstash.qstashToken,
});

const qstashClient = new QStashClient({
  token: config.env.upstash.qstashToken,
});


export const sendEmail = async ({
  email,
  subject,
  message,
}: {
  email: string;
  subject: string;
  message: string;
}) => {
  try {
    const body = {
      from: "Bookwise <onboarding@emailjs.dev>",
      to: email, 
      subject: subject,    
      message: message,  
    };

    const response = await emailjs.send(
      config.env.emailjs.serviceId,
      config.env.emailjs.templateId,
      body,
      {publicKey: config.env.emailjs.publicKey, privateKey: config.env.emailjs.privateKey},
    );

    return response;
  } catch (error) {
    console.error("EmailJS Error:", error);
    throw error;
  }
};



// export const sendEmail = async ({
//   email,
//   subject,
//   message,
// }: {
//   email: string;
//   subject: string;
//   message: string;
// }) => {
//   await qstashClient.publishJSON({
//     api: {
//       name: "email",
//       provider: resend({ token: config.env.resendToken }),
//     },
//     body: {
//       from: "Thierry <developerthierry@gmail.com>",
//       to: [email],
//       subject,
//       html: message,
//     },
//   });
// };