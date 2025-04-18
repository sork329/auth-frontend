'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useTheme } from 'next-themes'
import Link from 'next/link'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input
} from '@/shared/components/ui'

import { useLoginMutation } from '../hooks'
import { LoginSchema, type TypeLoginSchema } from '../schemes'

import { AuthWrapper } from './index'

/**
 * Форма для входа в систему.
 */
export function LoginForm() {
  const { theme } = useTheme()
  const [isShowTwoFactor, setIsShowFactor] = useState(false)

  const form = useForm<TypeLoginSchema>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const { login, isLoadingLogin } = useLoginMutation(setIsShowFactor)

  // Функция для обработки отправки формы
  const onSubmit = async (values: TypeLoginSchema) => {
    try {
      // Передаем объект с ключом 'values' в login
      await login({ values })  // Передаем именно объект с 'values'
    } catch (error) {
      toast.error('Ошибка при отправке данных')
    }
  }

  return (
    <AuthWrapper
      heading='Войти'
      description='Чтобы войти на сайт введите ваш email и пароль'
      backButtonLabel='Еще нет аккаунта? Регистрация'
      backButtonHref='/auth/register'
      isShowSocial
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='grid gap-2 space-y-2'
        >
          {isShowTwoFactor && (
            <FormField
              control={form.control}
              name='code'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Код</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='123456'
                      disabled={isLoadingLogin}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          {!isShowTwoFactor && (
            <>
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Почта</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='ivan@example.com'
                        disabled={isLoadingLogin}
                        type='email'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem>
                    <div className='flex items-center justify-between'>
                      <FormLabel>Пароль</FormLabel>
                      <Link
                        href='/auth/reset-password'
                        className='ml-auto inline-block text-sm underline'
                      >
                        Забыли пароль?
                      </Link>
                    </div>
                    <FormControl>
                      <Input
                        placeholder='******'
                        disabled={isLoadingLogin}
                        type='password'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}
          <Button type='submit' disabled={isLoadingLogin}>
            Войти в аккаунт
          </Button>
        </form>
      </Form>
    </AuthWrapper>
  )
}
