import { ActionFunctionArgs, json, redirect } from "@remix-run/node";
import { parseWithZod } from "@conform-to/zod";
import {
  formIntentSchema,
  firstTimerSchema,
  partnershipSchema,
} from "~/utils/schemas";
import { sendFirstTimerForm, sendPartnershipForm } from "~/lib/email.server";

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const parsedIntent = formIntentSchema.safeParse(formData.get("intent"));

  if (!parsedIntent.success) {
    return json({
      status: "error",
      submission: parsedIntent.error.flatten(),
      error: "Invalid form submission",
    });
  }

  if (parsedIntent.data === "register-first-timer") {
    const submission = parseWithZod(formData, { schema: firstTimerSchema });
    if (submission.status !== "success") {
      return submission.reply();
    }

    try {
      const result = await sendFirstTimerForm(submission.value);

      if (!result.success) {
        return json(
          {
            status: "error",
            submission,
            error: "Failed to send email. Please try again.",
          },
          { status: 500 }
        );
      }

      return redirect("/");
    } catch (error) {
      return json(
        {
          status: "error",
          submission,
          error: "An unexpected error occurred. Please try again.",
        },
        { status: 500 }
      );
    }
  }

  if (parsedIntent.data === "register-partnership") {
    const submission = parseWithZod(formData, { schema: partnershipSchema });
    if (submission.status !== "success") {
      return submission.reply();
    }

    try {
      const result = await sendPartnershipForm(submission.value);

      if (!result.success) {
        return json(
          {
            status: "error",
            submission,
            error: "Failed to send email. Please try again.",
          },
          { status: 500 }
        );
      }

      return redirect("/");
    } catch (error) {
      return json(
        {
          status: "error",
          submission,
          error: "An unexpected error occurred. Please try again.",
        },
        { status: 500 }
      );
    }
  }
}
