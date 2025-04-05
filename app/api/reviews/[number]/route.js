import { createConnection } from '../../../lib/db.js';
import { NextResponse } from 'next/server';

export async function GET(req, { params }) {
    const { number } = await params;
    try {
      const db = await createConnection();
  
      const [numberRows] = await db.execute(
        'SELECT id FROM numbers WHERE number = ?',
        [number]
      );
  
      if (numberRows.length === 0) {
        return NextResponse.json({ error: 'Number not found.' }, { status: 404 });
      }
  
      const numberId = numberRows[0].id;
  
      const [countResult] = await db.execute(
        'SELECT COUNT(*) AS totalReviews FROM comments WHERE number_id = ?',
        [numberId]
      );
  
      const totalReviews = countResult[0].totalReviews;
  
      const [latestResult] = await db.execute(
        'SELECT created_at FROM comments WHERE number_id = ? ORDER BY created_at DESC LIMIT 1',
        [numberId]
      );
  
      const lastReviewedAt = latestResult.length > 0 ? latestResult[0].created_at : null;
      console.log(` this is last review at ${lastReviewedAt}`)
      return NextResponse.json({
        totalReviews,
        lastReviewedAt,
      });
  
    } catch (error) {
      console.error('Error fetching review stats:', error);
      return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
  }