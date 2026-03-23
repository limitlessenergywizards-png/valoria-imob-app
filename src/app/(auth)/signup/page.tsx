import { Metadata } from 'next'
import { SignupForm } from '@/features/auth/components/SignupForm'

export const metadata: Metadata = {
  title: 'Criar Conta',
}

export default function SignupPage() {
  return <SignupForm />
}
