import { z } from "zod";
import { Resend } from "resend";

import { firstTimerSchema } from "~/utils/schemas";

type FirstTimer = z.infer<typeof firstTimerSchema>;

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendFirstTimerForm(data: FirstTimer) {
  try {
    const response = await resend.emails.send({
      from: `RCN Website <${process.env.SENDER_EMAIL}>`,
      to: process.env.FIRST_TIMERS_RECIPIENT_EMAIL!,
      subject: "First timer",
      html: `
        <h2>New First timer submission</h2>
        <p><strong>Name:</strong>${data.fullName}</p>
        <p><strong>Phone number:</strong>${data.phoneNumber.countryCode}${
        data.phoneNumber.phone
      }</p>
        <p><strong>Email:</strong>${data.email}</p>
        <p><strong>Address:</strong><br/>${data.address.street},<br /> ${
        data.address.city
      }, ${data.address.state},<br/> ${data.address.postalCode}, ${
        data.address.country
      }</p>
        <p><strong>Gender:</strong>${data.gender}</p>
        <p><strong>Marital Status:</strong>${data.maritalStatus}</p>
        <p><strong>Are they born again?:</strong>${data.isBornAgain}</p>
        <p><strong>Are they baptized by immersion?:</strong>${
          data.isBaptized
        }</p>
        <p><strong>Do they speak in tongues?:</strong>${
          data.isTongueSpeaker
        }</p>
        <p><strong>Do they want to receive the Holy Ghost?:</strong>${
          data.wantsHolySpirit
        }</p>
        <p><strong>Can we add them to our mailing list and whatsapp?:</strong>${
          data.willBeMessaged
        }</p>
        <p><strong>Any particular department of the workforce they want to join?:</strong>${
          data.departmentOfInterest ?? "none"
        }</p>
        <p><strong>Session of service they were blessed by:</strong>${
          data.description.service ?? ""
        }</p>
        <p><strong>A prayer request:</strong>${
          data.description.prayerRequest ?? ""
        }</p>
      `,
    });

    return { success: true, data: response };
  } catch (error) {
    return { success: false, error };
  }
}
