import { createConnection } from '../../lib/db.js';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const db = await createConnection();
        const sql = "SELECT * FROM numbers";
        
        // Using execute(), db.execute returns an array with [rows, fields]
        const [numbers] = await db.execute(sql);
        
        return NextResponse.json({ numbers });
    } catch (e) {
        console.error("Database Error:", e);
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}
