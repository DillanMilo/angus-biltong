import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // BigCommerce API endpoint for creating gift certificates
    const url = `https://api.bigcommerce.com/stores/${process.env.BIGCOMMERCE_STORE_HASH}/v3/gift-certificates`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Auth-Token': process.env.BIGCOMMERCE_ACCESS_TOKEN as string,
      },
      body: JSON.stringify({
        to_name: data.recipientName,
        to_email: data.recipientEmail,
        from_name: data.yourName,
        from_email: data.yourEmail,
        amount: parseFloat(data.amount),
        message: data.message,
        theme: data.theme,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to create gift certificate');
    }

    const result = await response.json();
    return NextResponse.json(result);
  } catch (error) {
    console.error('Gift certificate creation error:', error);
    return NextResponse.json(
      { error: 'Failed to create gift certificate' },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');

  if (!code) {
    return NextResponse.json(
      { error: 'Gift certificate code is required' },
      { status: 400 }
    );
  }

  try {
    const url = `https://api.bigcommerce.com/stores/${process.env.BIGCOMMERCE_STORE_HASH}/v3/gift-certificates/${code}`;
    
    const response = await fetch(url, {
      headers: {
        'X-Auth-Token': process.env.BIGCOMMERCE_ACCESS_TOKEN as string,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch gift certificate');
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Gift certificate lookup error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch gift certificate' },
      { status: 500 }
    );
  }
} 