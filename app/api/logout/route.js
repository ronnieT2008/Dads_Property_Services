import { NextRequest, NextResponse } from "next/server";

export const POST = async () => {
    try {
        const res = NextResponse.json({ message: 'user logged out', success: true })
        res.cookies.set('token', '', { httpOnly: true, expires: new Date(0) })
        return res
    } catch (err) {
        console.log(err)
        return NextResponse.json({ message: 'Something went wrong' }, { status: 500 })
    }
}