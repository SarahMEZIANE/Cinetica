import bcrypt from 'bcryptjs';
import { user } from '../../repository/users';

export async function POST(request: Request): Promise<Response> {
    const { username, password } = await request.json();
    
    if (username === user.username && bcrypt.compareSync(password, user.password)) {
        return new Response(JSON.stringify({ isAuthenticated: true }), { status: 200 });
        console.log(username);
    console.log(password);
    } else {
        return new Response(JSON.stringify({ isAuthenticated: false }), { status: 401 });
    }
}