import { createConnection } from '../../../lib/db';
import { NextResponse } from "next/server";

export async function GET(req, { params}) {
  const { number } = await params;
console.log(`This is in the backend the id: ${number}`); // Debugging
  try {
    const db = await createConnection();
    const [rows] = await db.execute('SELECT * FROM numbers WHERE number = ?', [number]);

    if (rows.length === 0) {
      return NextResponse.json({ error: "Number not found" }, { status: 404 });
    }
    return NextResponse.json(rows[0],{ status: 200})
  } catch (error) {
    console.error('Database Error:', error);
      return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

// export async function POST(req, res) {
//   // Handle POST request if needed
//   res.status(405).json({ error: 'Method Not Allowed' }); // If POST is not allowed, return this
// }

// export async function PUT(req, res) {
//   // Handle PUT request if needed
//   res.status(405).json({ error: 'Method Not Allowed' }); // If PUT is not allowed, return this
// }

// export async function DELETE(req, res) {
//   // Handle DELETE request if needed
//   res.status(405).json({ error: 'Method Not Allowed' }); // If DELETE is not allowed, return this
// }
