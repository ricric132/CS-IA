'use server';
import nodemailer from 'nodemailer';
import { UserRole } from '@prisma/client';
import { Task, Project } from '@prisma/client';;

const SMTP_SERVER_HOST = process.env.SMTP_SERVER_HOST;
const SMTP_SERVER_USERNAME = process.env.SMTP_SERVER_USERNAME;
const SMTP_SERVER_PASSWORD = process.env.SMTP_SERVER_PASSWORD;

const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: SMTP_SERVER_HOST,
  port: 587,
  secure: true,
  auth: {
    user: SMTP_SERVER_USERNAME,
    pass: SMTP_SERVER_PASSWORD,
  },
});

export async function sendVerificationEmail(email: string, token: string, role:UserRole) {
  try {
    const isVerified = await transporter.verify();
  } catch (error) {
    console.error('Something Went Wrong', SMTP_SERVER_USERNAME, SMTP_SERVER_PASSWORD, error);
    return;
  }

  const verifyLink = `http://localhost:3000/confirm?token=${token}`

  const info = await transporter.sendMail({
    from: email,
    to: "ricric.games@gmail.com",
    subject: "Verify Account",
    html: `<p>Click <a href="${verifyLink}">here<a> to verify the registration of email ${email} with ${role} permissions<p>`,
  });
  console.log('Message Sent', info.messageId);
  return info;
}

export async function sendTaskAssignEmail(email: string, task: Task, project: Project) {
  try {
    const isVerified = await transporter.verify();
  } catch (error) {
    console.error('Something Went Wrong', SMTP_SERVER_USERNAME, SMTP_SERVER_PASSWORD, error);
    return;
  }


  const info = await transporter.sendMail({
    from: email,
    to: email,
    subject: "Task assigned from project: "+project?.name,
    html: `<p>You have been assigned a task in project: ${project?.name}<p>
    <p>Task Details: <br>
    Name: ${task.name} <br>
    Description: ${task.description} <br> 
    Deadline: ${task.deadline}<p>`,
  });
  console.log('Message Sent', info.messageId);
  return info;
}