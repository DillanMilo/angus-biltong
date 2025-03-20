import { NextRequest, NextResponse } from "next/server";

if (!process.env.BIGCOMMERCE_STORE_HASH || !process.env.BIGCOMMERCE_ACCESS_TOKEN) {
  throw new Error("BigCommerce credentials are missing in .env.local");
}

const storeHash = process.env.BIGCOMMERCE_STORE_HASH;
const accessToken = process.env.BIGCOMMERCE_ACCESS_TOKEN;

export async function POST(request: NextRequest) {
  try {
    const { email, password, firstName, lastName, phone, address1, address2, city, country, state, zip } = await request.json();

    const res = await fetch(
      `https://api.bigcommerce.com/stores/${storeHash}/v3/customers`,
      {
        method: "POST",
        headers: {
          "X-Auth-Token": accessToken,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          email,
          phone,
          addresses: [
            {
              address1,
              address2,
              city,
              country_code: country,
              state_or_province: state,
              postal_code: zip,
            },
          ],
          authentication: { force_password_reset: false, password },
        }),
      }
    );

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.title || errorData.detail || "Failed to create account");
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Registration failed" },
      { status: 400 }
    );
  }
}
