import { createConnection } from '../../lib/db.js';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { number, comment, rank } = await req.json();
    console.log(`Number: ${number}, Comment: ${comment}, Rating Type: ${rank}`); // Debugging

    if (!number || !comment || !rank) {
      return NextResponse.json(
        { error: 'Missing number, comment, or rating type.' },
        { status: 400 }
      );
    }

    const db = await createConnection();

    // 1. Get the number ID
    const [numberRows] = await db.execute(
      'SELECT id FROM numbers WHERE number = ?',
      [number]
    );

    if (numberRows.length === 0) {
      return NextResponse.json({ error: 'Number not found.' }, { status: 404 });
    }

    const numberId = numberRows[0].id;

    // 2. Insert the comment with the rating (rank)
    const allowedRatings = ['useful', 'safe', 'neutral', 'annoying', 'dangerous'];

    if (!allowedRatings.includes(rank)) {
      return NextResponse.json({ error: 'Invalid rating type.' }, { status: 400 });
    }

    // Insert the comment and its rating
    await db.execute(
      'INSERT INTO comments (number_id, comment, created_at, `rank`) VALUES (?, ?, NOW(), ?)',
      [numberId, comment, rank]
    );

    return NextResponse.json({ success: true }, { status: 200 });

  } catch (error) {
    console.error('Error saving comment and rating:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
