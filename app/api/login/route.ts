import { NextResponse } from 'next/server';
import {user} from '../../repository/users';
import bcrypt from 'bcryptjs';


export async function POST(request:Request) {

  try {
    
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json({ message: "Nom d'utilisateur et mot de passe requis" }, { status: 400 });
    }

    if (username === user.username && bcrypt.compareSync(password,user.password) ) {
      return NextResponse.json({ message: "Connexion réussie"},{status:200});
    } else {
      return NextResponse.json({ message: "Nom d'utilisateur ou mot de passe incorrect" }, { status: 401 });
    }
    
    
  } catch {
    return NextResponse.json('An error occurred', { status: 500 });
  }
}
