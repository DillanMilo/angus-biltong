import { NextRequest, NextResponse } from "next/server";

if (!process.env.BIGCOMMERCE_STORE_HASH || !process.env.BIGCOMMERCE_ACCESS_TOKEN) {
  throw new Error("BigCommerce credentials are missing in .env.local");
}

const storeHash = process.env.BIGCOMMERCE_STORE_HASH;
const accessToken = process.env.BIGCOMMERCE_ACCESS_TOKEN;

export async function POST(request: NextRequest) {
  try {
    const { email, password, firstName, lastName, phone, address1, address2, city, country, state, zip } = await request.json();

    // Validate required fields
    if (!email || !password || !firstName || !lastName || !phone || !address1 || !city || !country || !state || !zip) {
      return NextResponse.json(
        { error: "All required fields must be provided" },
        { status: 400 }
      );
    }

    // Check if customer already exists
    const checkCustomer = await fetch(
      `https://api.bigcommerce.com/stores/${storeHash}/v3/customers?email:in=${email}`,
      {
        headers: {
          "X-Auth-Token": accessToken,
          "Content-Type": "application/json",
        },
      }
    );

    const customerData = await checkCustomer.json();
    if (customerData.data && customerData.data.length > 0) {
      return NextResponse.json(
        { error: "An account with this email already exists" },
        { status: 400 }
      );
    }

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
              first_name: firstName,
              last_name: lastName,
              address1,
              address2: address2 || "",
              city,
              country_code: country,
              state_or_province: state,
              postal_code: zip,
              phone,
            },
          ],
          authentication: {
            force_password_reset: false,
            password,
          },
          accepts_marketing: true,
        }),
      }
    );

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(
        errorData.title || errorData.detail || "Failed to create account"
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Registration failed" },
      { status: 400 }
    );
  }
}
