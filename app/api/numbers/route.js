import { createConnection } from '../../lib/db.js';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const db = await createConnection();

    const sql = `
      SELECT 
       comments.id AS comment_id,
       numbers.number, 
       comments.comment, 
       comments.rank, 
       comments.created_at
      FROM comments
      JOIN numbers ON comments.number_id = numbers.id
      ORDER BY comments.created_at DESC
      LIMIT 10
    `;

    const [numbers] = await db.execute(sql);

    return NextResponse.json({ numbers });
  } catch (e) {
    console.error("Database Error:", e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
