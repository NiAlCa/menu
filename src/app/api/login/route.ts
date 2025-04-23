import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../../lib/bdo'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'tu_secreto_super_seguro'

export async function POST(req: NextRequest) {
  const { email, password } = await req.json()
  const user = await prisma.user.findUnique({ where: { email } })
  console.log('Usuario encontrado:', user)
  if (!user) {
    return NextResponse.json({ error: 'Credenciales inválidas' }, { status: 401 })
  }
  const passwordMatch = await bcrypt.compare(password, user.password)
  console.log('Password match:', passwordMatch)
  if (!passwordMatch) {
    return NextResponse.json({ error: 'Credenciales inválidas' }, { status: 401 })
  }

  // Generar el token
  const token = jwt.sign(
    { userId: user.id, email: user.email },
    JWT_SECRET,
    { expiresIn: '1d' }
  )

  // Devuelve JSON y setea la cookie
  const response = NextResponse.json({ success: true })
  response.cookies.set('token', token, {
    httpOnly: true,
    path: '/',
    maxAge: 60 * 60 * 24, // 1 día
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production', // <-- agrega esto
  })
  return response
}
