import { randomUUID } from 'node:crypto'
import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { NextResponse } from 'next/server'
import { getAdminKey, isAdminRequestAuthorized } from '@/lib/adminAuth'

export const dynamic = 'force-dynamic'

const allowedImageTypes = new Map([
  ['image/jpeg', 'jpg'],
  ['image/png', 'png'],
  ['image/webp', 'webp'],
  ['image/gif', 'gif'],
  ['video/mp4', 'mp4'],
])

const maximumImageUploadSize = 50 * 1024 * 1024
const maximumVideoUploadSize = 300 * 1024 * 1024

export async function POST(request: Request) {
  if (!getAdminKey()) {
    return NextResponse.json(
      { message: 'Set ADMIN_CONTENT_KEY before using admin uploads in production.' },
      { status: 503 },
    )
  }

  if (!isAdminRequestAuthorized(request)) {
    return NextResponse.json({ message: 'Kunci admin tidak cocok.' }, { status: 401 })
  }

  const formData = await request.formData()
  const image = formData.get('image')

  if (!(image instanceof File)) {
    return NextResponse.json({ message: 'Pilih file terlebih dahulu.' }, { status: 400 })
  }

  const extension = allowedImageTypes.get(image.type)

  if (!extension) {
    return NextResponse.json({ message: 'Format file harus JPG, PNG, WEBP, GIF, atau MP4.' }, { status: 400 })
  }

  const maximumUploadSize = image.type.startsWith('video/')
    ? maximumVideoUploadSize
    : maximumImageUploadSize

  if (image.size > maximumUploadSize) {
    const maximumSizeLabel = image.type.startsWith('video/') ? '300 MB' : '50 MB'
    return NextResponse.json({ message: `Ukuran file maksimal ${maximumSizeLabel}.` }, { status: 400 })
  }

  const uploadDirectory = path.join(process.cwd(), 'public', 'uploads', 'content')
  const fileName = `${Date.now()}-${randomUUID()}.${extension}`
  const bytes = Buffer.from(await image.arrayBuffer())

  await mkdir(uploadDirectory, { recursive: true })
  await writeFile(path.join(uploadDirectory, fileName), bytes)

  return NextResponse.json({ url: `/uploads/content/${fileName}` })
}
