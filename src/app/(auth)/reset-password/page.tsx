import { Metadata } from 'next'
import { ResetPasswordForm } from '@/features/auth/components/ResetPasswordForm'

export const metadata: Metadata = {
  title: 'Redefinir Senha',
}

export default function ResetPasswordPage() {
  return <ResetPasswordForm />
}
