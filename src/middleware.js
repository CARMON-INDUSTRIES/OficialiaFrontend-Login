import { NextResponse } from "next/server";

export function middleware(request) {
  const token = request.cookies.get("token")?.value; // Ajusta esto según cómo guardes el JWT

  if (!token) {
    // Redirigir al login si no hay token
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

// Aplica el middleware a todas las rutas internas
export const config = {
  matcher: [ "/formulario, /roles"], // Agrega más rutas protegidas si es necesario
};
