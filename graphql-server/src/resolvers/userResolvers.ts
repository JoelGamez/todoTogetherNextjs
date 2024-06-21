// src/userResolvers.ts
import User from "../../../src/models/user";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import path from "path";
import { log } from "console";
import redisClient from "../../../src/lib/redisClient";
import nodemailer from "nodemailer";
import sgMail from "@sendgrid/mail";
import { ApolloError } from "apollo-server-express";
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const userResolvers = {
  Query: {
    users: async () => {
      try {
        return await User.findAll();
      } catch (error) {
        console.error("Error fetching users:", error);
        throw new Error("Error fetching users");
      }
    },
  },
  Mutation: {
    addUser: async (
      _: any,
      {
        username,
        email,
        password,
      }: {
        username: string;
        email: string;
        password: string;
      }
    ) => {
      try {
        return await User.create({ username, email, password });
      } catch (error) {
        console.error("Error adding user:", error);
        throw new Error("Error adding user");
      }
    },
    authenticateUser: async (
      _: any,
      {
        email,
        password,
      }: {
        email: string;
        password: string;
      }
    ) => {
      try {
        const user = await User.findOne({ where: { email } });
        if (user && (await bcrypt.compare(password, user.password))) {
          const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, {
            expiresIn: "7d",
          });
          return { user, token };
        } else {
          throw new Error("Invalid email or password");
        }
      } catch (error) {
        console.error("Error authenticating user:", error);
        throw new Error("Error authenticating user");
      }
    },
    logoutUser: async (_: unknown, { token }: { token: string }) => {
      // Check if the token exists
      if (!token) {
        throw new Error("No token provided");
      }
      try {
        // Calculate the remaining time until the token expires
        const payload = JSON.parse(atob(token.split(".")[1]));
        console.log("payload", payload);
        const now = Math.floor(Date.now() / 1000);
        const remainingTime = payload.exp - now;

        // Check if the token has already expired
        if (remainingTime > 0) {
          await redisClient.set(token, "blacklisted", { EX: remainingTime });
        } else {
          console.error(
            "Error in logoutUser resolver: Token has already expired"
          );
          return false;
        }

        return true;
      } catch (error) {
        console.error("Error in logoutUser resolver:", error);
        throw new ApolloError(
          "An error occurred while processing your request."
        );
      }
    },
    requestPasswordReset: async (_: unknown, { email }: { email: string }) => {
      try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
          throw new Error("User not found");
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, {
          expiresIn: "1h",
        });
        await redisClient.set(`resetPassword:${token}`, user.id, { EX: 3600 }); // Store token in Redis for 1 hour

        // // Configure Nodemailer and send email
        // const transporter = nodemailer.createTransport({
        //   /* SMTP server or service configuration */
        // });
        // await transporter.sendMail({
        //   from: '"HoneyDoo" joelgamez14six+HoneyDoo@gmail.com',
        //   to: email,
        //   subject: "Password Reset",
        //   text: `To reset your password, please click the following link: ${process.env.FRONTEND_URL}/reset-password/${token}`,
        //   html: `<p>To reset your password, please click the following link: <a href="${process.env.FRONTEND_URL}/reset-password/${token}">Reset Password</a></p>`,
        // });
        sgMail.setApiKey(process.env.SENDGRID_API_KEY!);
        const msg = {
          to: email, // Recipient's email address
          from: "honeydooproject@gmail.com", // Verified SendGrid sender
          subject: "Password Reset",
          text: `To reset your password, please click the following link: ${process.env.FRONTEND_URL}/reset-password/${token}`,
          html: `<p>To reset your password, please click the following link: <a href="${process.env.FRONTEND_URL}/reset-password/${token}">Reset Password</a></p>`,
        };

        try {
          await sgMail.send(msg);
          console.log("Password reset email sent successfully");
          return true;
        } catch (error) {
          console.error("Failed to send password reset email", error);
          return false;
        }
        return true;
      } catch (error) {
        console.error("Error in requestPasswordReset resolver:", error);
        return false;
      }
    },
    resetPassword: async (
      _: unknown,
      { token, password }: { token: string; password: string }
    ) => {
      try {
        const userId = await redisClient.get(`resetPassword:${token}`);
        if (!userId) {
          throw new Error("Invalid or expired token");
        }
        console.log(password, "newPassword");
        // Optionally, add token signature verification here

        const userExists = await User.findOne({ where: { id: userId } });
        if (!userExists) {
          throw new Error("User does not exist");
        }
        const salt = await bcrypt.genSalt(10);
        console.log("salt", salt);
        try {
          const saltRounds = 10; // Define saltRounds here
          const hashedPassword = await bcrypt.hash(password, saltRounds);
          console.log("hashedPassword", hashedPassword);
          await User.update(
            { password: hashedPassword },
            { where: { id: userId } }
          );
          await redisClient.del(`resetPassword:${token}`); // Invalidate the token

          return true;
        } catch (error) {
          console.error("Error hashing new password:", error);
          return false;
        }
      } catch (error) {
        console.error("Error in resetPassword resolver:", error);
        return false;
      }
    },
  },
};

export default userResolvers;
