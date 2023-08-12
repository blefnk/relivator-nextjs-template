import { NextResponse } from "next/server";
import translate from "translate";
import { z } from "zod";

const bodySchema = z.object({
  from: z.string().optional(),
  to: z.string().optional(),
  text: z.string(),
});

export async function POST(req: Request) {
  const { from, to, text } = bodySchema.parse(req.body);

  try {
    const translatedText = translate(text, {
      from: from || "en",
      to: to || "en",
    });
    return NextResponse.json({ result: translatedText }, { status: 200 });
  } catch (err) {
    if (err instanceof Error) {
      return NextResponse.json({ message: err.message }, { status: 400 });
    } else {
      console.error(err);
      return NextResponse.json(
        { message: "An unexpected error occurred" },
        { status: 500 },
      );
    }
  }
}
