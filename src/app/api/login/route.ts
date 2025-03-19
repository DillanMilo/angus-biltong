import { NextRequest, NextResponse } from "next/server";

if (!process.env.BIGCOMMERCE_STORE_HASH || !process.env.BIGCOMMERCE_ACCESS_TOKEN) {
  throw new Error("BigCommerce credentials are missing in .env.local");
}

const storeHash = process.env.BIGCOMMERCE_STORE_HASH;
const accessToken = process.env.BIGCOMMERCE_ACCESS_TOKEN;

// API Route for logging in users
export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    // Input validation
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    const res = await fetch(
      `https://api.bigcommerce.com/stores/${storeHash}/v3/customers/validate-credentials`, // Updated to v3 API
      {
        method: "POST",
        headers: {
          "X-Auth-Token": accessToken,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      }
    );

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(
        errorData.title || errorData.detail || "Invalid credentials"
      );
    }

    await res.json(); // Just validate the response

    // Get customer details after successful validation
    const customerRes = await fetch(
      `https://api.bigcommerce.com/stores/${storeHash}/v3/customers?email:in=${email}`,
      {
        headers: {
          "X-Auth-Token": accessToken,
          "Content-Type": "application/json",
        },
      }
    );

    const customerData = await customerRes.json();
    const customer = customerData.data[0];

    // Return customer data and success status
    return NextResponse.json({
      success: true,
      customer: {
        id: customer.id,
        email: customer.email,
        firstName: customer.first_name,
        lastName: customer.last_name,
      },
    });
  } catch (error: unknown) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Login failed" },
      { status: 400 }
    );
  }
}
