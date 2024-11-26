import bcrypt from 'bcryptjs';
import { user } from '../../repository/users';

export async function POST(request: Request): Promise<Response> {
    const { username, password } = await request.json();
    console.log("1");
    if (username === user.username && bcrypt.compareSync(password, user.password)) {
        console.log("2");
        return new Response(JSON.stringify({ isAuthenticated: true }), { status: 200 });
    } else {
        return new Response(JSON.stringify({ isAuthenticated: false }), { status: 401 });
    }
}