import { createConnection } from '../../../lib/db.js';
import { NextResponse } from 'next/server';

export async function GET(req, { params }) {
    const { number } = await params;
    try {
        const db = await createConnection();
    
        // Get the number ID
        const [numberRows] = await db.execute(
            'SELECT id FROM numbers WHERE number = ?',
            [number]
        );
    
        if (numberRows.length === 0) {
            return NextResponse.json({ error: 'Number not found.' }, { status: 404 });
        }
    
        const numberId = numberRows[0].id;
    
        // Fetch comments with rank for the number
        const [comments] = await db.execute(
            'SELECT comment, created_at, `rank` FROM comments WHERE number_id = ?',
            [numberId]
        );

        //calculate dabger score
        const weights = {
            safe: 0,
            useful: 0,
            neutral: 1,
            annoying: 2,
            dangerous: 3,
        };
        let totalScore = 0;
        let maxScore = comments.length * 3;
        comments.forEach(comment => {
            totalScore += weights[comment.rank] ?? 0;
        });
        const dangerRate = maxScore === 0 ? 0 : Math.round((totalScore / maxScore) * 100);

        return NextResponse.json({
            comments,
            dangerRate
        });

    } catch (error) {
        console.error('Error fetching comments:', error);
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}
