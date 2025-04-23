import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../../lib/bdo'
import bcrypt from 'bcryptjs'

export async function POST(req: NextRequest) {
  const { email, password, restaurantName, slug } = await req.json()

  if (
    typeof email !== 'string' ||
    typeof password !== 'string' ||
    typeof restaurantName !== 'string' ||
    typeof slug !== 'string'
  ) {
    return NextResponse.json({ error: 'Datos inválidos' }, { status: 400 })
  }

  // Verifica si el usuario ya existe
  const existingUser = await prisma.user.findUnique({ where: { email } })
  if (existingUser) {
    return NextResponse.json({ error: 'El usuario ya existe' }, { status: 400 })
  }

  // Hashea la contraseña
  const hashedPassword = await bcrypt.hash(password, 10)

  // Crea el usuario
  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      restaurantName,
      slug,
    },
  })

  return NextResponse.json({ success: true, user: { id: user.id, email: user.email } })
}
