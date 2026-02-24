import cron from "node-cron";
import User from "../models/User.js";
import { sendEmail } from "./nodemailer.js";

export const subscriptionReminderJob = () => {

  console.log("✅ Subscription Reminder Cron Started");

  // =============================
  // 🔴 FOR TESTING → every minute
  // =============================
  // cron.schedule("* * * * *", async () => {

  // =============================
  // ✅ PRODUCTION → every day 9 AM
  // =============================
  cron.schedule("0 9 * * *", async () => {

    try {
      console.log("🔥 Running subscription reminder job...");

      const today = new Date();

      // Date after 7 days
      const reminderDate = new Date();
      reminderDate.setDate(today.getDate() + 7);

      // Start of that day
      const start = new Date(reminderDate);
      start.setHours(0, 0, 0, 0);

      // End of that day
      const end = new Date(reminderDate);
      end.setHours(23, 59, 59, 999);

      // Find users expiring in 7 days
      const users = await User.find({
        "subscription.expireDate": { $gte: start, $lte: end },
        "subscription.status": "active",
      });

      console.log(`📦 Found ${users.length} users to remind`);

      for (let user of users) {

        const planName =
          user.subscription.plan === "basic" ? "Basic Plan" :
          user.subscription.plan === "standard" ? "Standard Plan" :
          "Premium Plan";

        await sendEmail(
          user.email,
          "⚠ STREAMPLAY Subscription Expiry Reminder",
          `
Hello ${user.name},

⏳ Your STREAMPLAY subscription is expiring soon.

📦 Plan: ${planName}
📅 Expiry Date: ${user.subscription.expireDate.toDateString()}

Please renew to continue watching premium content.

— STREAMPLAY Team
`
        );

        console.log(`📧 Reminder sent to ${user.email}`);
      }

      console.log("✅ Reminder job finished");

    } catch (err) {
      console.log("❌ Error in reminder job:", err.message);
    }

  });
};