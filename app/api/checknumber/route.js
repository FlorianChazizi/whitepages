import { createConnection } from '../../lib/db.js';
import { NextResponse } from 'next/server';



export async function POST(req){
  try {
    const { number } = await req.json();
    if (!number) {
      return NextResponse.json({ error: 'Phone number is required' }, { status: 400 });
    }
    
    const db = await createConnection();
    const [rows] = await db.execute('SELECT * FROM numbers WHERE number = ?', [number]);
    if (rows.length > 0) {
      await db.execute('UPDATE numbers SET views = views + 1, last_time_viewed = NOW() WHERE number = ?', [number]);
      const [updatedRows] = await db.execute('SELECT * FROM numbers WHERE number = ?', [number]);
      return NextResponse.json(updatedRows[0], { status: 200 });    } else {
      await db.execute('INSERT INTO numbers (number) VALUES (?)', [number]);
      return NextResponse.json({number }, { status: 201 });
    
    }
  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
    
  }
}