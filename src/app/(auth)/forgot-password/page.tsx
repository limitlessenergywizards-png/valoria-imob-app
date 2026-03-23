import { Metadata } from 'next'
import { ForgotPasswordForm } from '@/features/auth/components/ForgotPasswordForm'

export const metadata: Metadata = {
  title: 'Esqueceu a Senha',
}

export default function ForgotPasswordPage() {
  return <ForgotPasswordForm />
}
