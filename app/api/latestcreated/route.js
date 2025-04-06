import { createConnection } from '../../lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const db = await createConnection();
    const sql = `
      SELECT 
        numbers.number, 
        numbers.views, 
        (SELECT COUNT(*) FROM comments WHERE comments.number_id = numbers.id) AS comments
      FROM numbers
      ORDER BY numbers.created_at DESC
      LIMIT 10
    `;

    const [results] = await db.execute(sql);

    return NextResponse.json({ numbers: results });
  } catch (e) {
    console.error("Database Error:", e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
